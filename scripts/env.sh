#!/usr/bin/env bash

echo -e "\033[34mEnvironment...\n\033[0m";

lerna exec --parallel -- cp -rf ../../tslint.json ./tslint.json
lerna exec --parallel -- cp -rf ../../tsconfig.json ./tsconfig.json
lerna exec --parallel --scope @service/* -- cp -rf .env.sample .env.development
