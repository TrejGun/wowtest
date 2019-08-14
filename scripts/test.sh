#!/usr/bin/env bash


echo -e "\033[34mTesting...\n\033[0m";

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

export NODE_ENV=test

bash scripts/env.sh
lerna bootstrap --hoist

lerna run lint --stream --parallel

lerna exec --parallel --scope @service/* -- npm run migration:run
lerna exec --parallel -- npm t
