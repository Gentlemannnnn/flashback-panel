#!/usr/bin/env bash

SERVICES=$@
source $(dirname "$0")/common.sh

[ -z "$TAGS" ] && _error "missing TAGS environment variable"

base_build
gcloud auth configure-docker europe-west1-docker.pkg.dev
for TAG in $(echo $TAGS | tr " " "\n")
do
  COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 DOCKER_IMAGE_VERSION=$TAG infisical run -- docker compose -f docker-compose.prod.yml build $SERVICES --parallel
  COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 DOCKER_IMAGE_VERSION=$TAG infisical run -- docker compose -f docker-compose.prod.yml push $SERVICES
done
