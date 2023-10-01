# nest-schematics

[![npm@latest](https://img.shields.io/npm/v/@byndyusoft/nest-schematics/latest.svg)](https://www.npmjs.com/package/@byndyusoft/nest-schematics)
[![test](https://github.com/Byndyusoft/nest-schematics/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/nest-schematics/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

NestJS schematics

## Requirements

- Node.js v18 LTS or later
- Yarn

## Install

```bash
yarn add -D @byndyusoft/nest-schematics
```

## Usage

### NestJS CLI

Use `@byndyusoft/nest-schematics` instead of `@nestjs/schematics` in `nest-cli.json`:

```diff
-  "collection": "@nestjs/schematics",
+  "collection": "@byndyusoft/nest-schematics",
```

### Generate new application

```bash
corepack yarn@stable dlx -p @byndyusoft/nest-schematics -p @nestjs/cli nest g app -c @byndyusoft/nest-schematics app-name
```

### Generate new application locally

```bash
corepack yarn@stable dlx -p @byndyusoft/nest-schematics@portal:/path/to/nest-schematics -p @nestjs/cli nest g app -c @byndyusoft/nest-schematics app-name
```

### Add TypeOrm

```bash
yarn nest g typeorm
```

## Add new schema

- The "Angular schematics" is taken as a basis
- Add a new schema by analogy and register it in [collection.json](./src/collection.json)

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)
- [@KillWolfVlad](https://github.com/KillWolfVlad)
- [@argus-xd](https://github.com/argus-xd)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
