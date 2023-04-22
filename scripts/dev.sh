#!/usr/bin/env bash

source $(dirname "$0")/common.sh

usage()
{
    cat <<EOF
Usage: yarn dev [CMD]

  A wrapper to simplify dev work

  help                                      Displays this help.

  setup|reset                               Build and start all services for developement.
  
  stop                                      Stop and remove all containers.
  
  build [SERVICE?]                          Build all services for development. 
                                            You can also add a list of services optionnaly.
                                            eg: yarn dev start crm persons customers
                                            Check the docker-compose.yml for available services list.
  
  start [-p profile] [SERVICE?]             Start all services on development.
                                            You can add a list of profiles optionnaly. Defaulting to all.
                                            eg: yarn dev start -p crm -p docs
                                            You can also add a list of services optionnaly.
                                            eg: yarn dev start crm persons customers
                                            Check the docker-compose.yml for available profiles and services list.

EOF
}

dev_build() {
  yarn clean:install
  base_build
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 DOCKER_IMAGE_VERSION=dev infisical run -- docker compose -f docker-compose.prod.yml -f docker-compose.yml build $@ --parallel
}

dev_stop() {
	DOCKER_IMAGE_VERSION=dev infisical run -- docker compose -f docker-compose.prod.yml -f docker-compose.yml --profile all down
}

dev_start() {
  profiles=""
  while getopts "p:" profile; do
    profiles="--profile ${OPTARG} ${profiles}"
  done

  if (( ${#profiles} == 0 )); then
    profiles="--profile all"
  fi

  shift $((OPTIND - 1))

  dev_stop
  
  # # We have to start first pubsub and sleep for 10s to allow topic creation
  # DOCKER_IMAGE_VERSION=dev infisical run -- docker compose -f docker-compose.prod.yml -f docker-compose.yml up pubsub &
  # pubsub_pid=$!
  # sleep 10

  # After the sleeping period we run the rest of the commands and containers
  yarn watch:packages 
  # &
  # trap "pkill -9 $! $pubsub_pid" INT
  
  DOCKER_IMAGE_VERSION=dev infisical run -- docker compose -f docker-compose.prod.yml -f docker-compose.yml $profiles up $@
}

case "$CMD" in
  help|--help|-h)
    usage
    exit 0
    ;;
  build)
    dev_build $@
    ;;
  start)
    dev_start $@
    ;;
  stop)
    dev_stop
    ;;
  setup|reset)
    dev_build
    dev_start
    ;;
  *)
    usage
    exit 1
    ;;
esac