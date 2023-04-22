#!/usr/bin/env bash
set -e
set -o pipefail

# Regular Colors
ResetColor="\033[0m"
LightRed="\033[1;31m"
Green="\033[0;32m"
LightGray="\033[0;37m"
Yellow="\e[33m"

_print() { printf "${Green}%s${ResetColor}\n" "$1"; }
_error() { printf "${LightRed}ERROR: ${ResetColor}%s\n" "$1" >&2; exit 1; }
_warn() { printf "${Yellow}WARNING: ${ResetColor}: %s\n" "$1" >&2; }
_trace()
{
  printf "${LightGray}+ ${*}${ResetColor}\n" >&2;
  eval "$*"
}
_cmd_exists() { command -v "$1" >/dev/null 2>&1; }
_docker_tag_exists() { docker manifest inspect "$1" >/dev/null 2>&1; }

base_build() {
	DOCKER_BUILDKIT=1 docker build . -f docker/base.Dockerfile -t flashback-panel/node:latest --target "base"
	# DOCKER_BUILDKIT=1 docker build . -f docker/base.Dockerfile -t flashback-panel/node-ppt:latest --target "ppt_base"
}

if [ $# -eq 0 ]; then
  CMD=
else
  CMD=$1
  shift
fi