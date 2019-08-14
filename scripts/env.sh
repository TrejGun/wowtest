#!/usr/bin/env bash

echo "\033[34mEnvironment...\n\033[0m";

lerna exec --parallel -- cp -rf ../../tsconfig.json ./tsconfig.json
lerna exec --parallel --scope --scope @service/* -- cp -rf .env.sample .env.development
