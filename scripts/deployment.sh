#!/usr/bin/env bash

WORKSPACE=$1
shift
source $(dirname "$0")/common.sh
TARGET=$1

usage()
{
    cat <<EOF
Usage:
  - Production: yarn production [CMD]
  - Staging: yarn staging [CMD]

  A wrapper to simplify deployment

  help                                      Displays this help.

  inspect [TARGET]                          Run terraform plan command on specific target on specified environnment

  deploy [TARGET]                           Run terraform apply command on specific target on specified environnment
EOF
}

terraform_init() {
  [[ $TARGET != 'infra' && $TARGET != 'services' ]] && _error "missing target option. Must be infra or services"
  cd .cloud/terraform/$TARGET
  eval "terraform init"
  eval "terraform workspace select ${WORKSPACE}"
}

case "$CMD" in
  help|--help|-h)
    usage
    exit 0
    ;;
  inspect)
    terraform_init
    eval "terraform plan -var-file=vars/${WORKSPACE}.tfvars -input=false"
    ;;
  deploy)
    terraform_init
    eval "terraform apply -var-file=vars/${WORKSPACE}.tfvars -input=false --auto-approve"
    ;;
  *)
    usage
    exit 1
    ;;
esac