#!/usr/bin/env bash

echo -e "\033[34mInstalling...\n\033[0m";

npm i
npm run bootstrap
bash scripts/env.sh
npm run build
