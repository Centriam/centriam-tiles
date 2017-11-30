#!/usr/bin/env bash

###
###  Run docker-bash inside of a shell
###

cd $(dirname $0)/..
docker run --rm -v${PWD}:/opt/centriam-tiles -it node:9.1-slim bash -c 'cd /opt/centriam-tiles; /bin/bash'
