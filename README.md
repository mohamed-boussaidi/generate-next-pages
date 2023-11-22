generate-next-pages generates Next Crud Pages from static <a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noopener noreferrer">OpenAPI</a> schemas quickly using only Node.js. It is fast, lightweight, (almost) dependency-free.

## Features

- ✅ Supports OpenAPI 3.0 and 3.1 (including advanced features like <a href="https://spec.openapis.org/oas/v3.1.0#discriminator-object" target="_blank" rel="noopener noreferrer">discriminators</a>)
- ✅ Generate runtime-free types that outperform old-school codegen
- ✅ Generate Next Crud Pages
- ✅ Native Node.js code is fast and generates Pages within milliseconds

## Setup openapi-typescript

This library requires the latest version of <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">Node.js</a> installed (18.x or higher recommended). With that present, run the following in your project:

```bash
npm i -D openapi-typescript
```


## Setup generate-next-pages


```bash
npm i -D @m.boussaidi/generate-next-pages
```

## Basic usage

First, generate a local type file by running `npx openapi-typescript`:

```bash
npx openapi-typescript https://myapi.dev/api/v1/openapi.yaml -o ./types/index.d.ts
# 🚀 ./path/to/my/schema.yaml -> ./types/index.d.ts [7ms]
```
> ⚠️ Be sure to <a href="https://redocly.com/docs/cli/commands/lint/" target="_blank" rel="noopener noreferrer">validate your schemas</a>! generate-next-pages will err on invalid schemas.


Second, generate crud pages by running `npx @m.boussaidi/generate-next-pages`:

```bash
npx @m.boussaidi/generate-next-pages https://myapi.dev/api/v1/openapi.json https://petstore.swagger.io/v2/swagger.json -r pet  -o ./
# 🚀 https://myapi.dev/api/v1/openapi.json -> ./pages/pet [7ms]
```

> ⚠️ Be sure to <a href="https://redocly.com/docs/cli/commands/lint/" target="_blank" rel="noopener noreferrer">validate your schemas</a>! generate-next-pages will err on invalid schemas.


_Thanks, [@mohamed-boussaidi](https://github.com/mohamed-boussaidi)!_
