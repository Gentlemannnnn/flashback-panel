ARG NODE_BASE_IMAGE=flashback-panel/node:latest
ARG SERVE_IMAGE


FROM $NODE_BASE_IMAGE as base
ARG WORKSPACE
ARG WORKSPACE_PATH
ENV NODE_ENV=production
ENV WORKSPACE=$WORKSPACE
ENV YARN_CACHE_FOLDER=.yarn-cache
USER node


FROM base as pruner
COPY ./ ./
RUN turbo prune --scope=$WORKSPACE --docker


FROM base as dev-deps
ENV NODE_ENV=development
COPY --chown=node:node --from=pruner $APP_PATH/out/json/ ./
COPY --chown=node:node --from=pruner $APP_PATH/out/yarn.lock .
RUN yarn config delete proxy && \
  yarn config delete https-proxy && \
  yarn install --frozen-lockfile --network-timeout 100000


FROM dev-deps as serve-dev
ENV HOST=0.0.0.0
ENV PORT=3000
RUN rm -rf $APP_PATH/${YARN_CACHE_FOLDER}
COPY --chown=node:node --from=pruner $APP_PATH/out/full/ .
COPY .prettier* ./
EXPOSE $PORT
CMD yarn workspace $WORKSPACE dev
# CMD turbo run dev --filter=$WORKSPACE


FROM serve-dev AS builder
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_GATEWAY_URI
RUN turbo run build --filter=$WORKSPACE...
RUN find -type d -name '*node_modules*' -prune -exec rm -rf {} +
RUN find -mindepth 2 -type f -not \( -wholename '*.build*' -o -wholename '*next*' -o -wholename '*public*' -or -name '*package.json' \) -prune -exec rm -rf {} +
RUN find . -empty -type d -delete


FROM dev-deps as prod-deps
RUN yarn install --production --prefer-offline --ignore-scripts
RUN rm -rf $APP_PATH/${YARN_CACHE_FOLDER}

FROM base
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --chown=node:node --from=prod-deps $APP_PATH/ .
COPY --chown=node:node --from=builder $APP_PATH/ .
EXPOSE $PORT
CMD yarn workspace ${WORKSPACE} start
