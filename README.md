# WOW

Welcome to WOW test monorepo
Currently there is only one micro-service WOW-BE


## Pre Install

I assume you have nodejs, npm and postgres installed
You must also create `wow-development` database manually, script only creates schema for you
In order to run test you must create `wow-test` database manually

## Installation

There is installation script which will install all dependencies, populate .env files and run build command for you

```bash
bash scripts/install.sh
```

Then you can run project

```bash
npm start
```

## Configuration

For fine tune check services READMEs
