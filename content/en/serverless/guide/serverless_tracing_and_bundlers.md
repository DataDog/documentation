---
title: Node.js Lambda Tracing and Bundlers Compatibility 
kind: documentation
further_reading:
- link: '/serverless/installation/nodejs'
  tag: 'Documentation'
  text: 'Instrumenting Node.js Applications'
aliases:
    - /serverless/troubleshooting/serverless_tracing_and_bundlers
    - /serverless/troubleshooting/serverless_tracing_and_webpack
---

## Overview

Datadog's tracing libraries (`dd-trace`) are known to be not compatible with bundlers, like [Webpack][1] or [esbuild][2], due to the use of conditional imports and other issues. While bundlers cannot build `dd-trace`, your application can still use the `dd-trace` and `datadog-lambda-js` libraries provided by the prebuilt Datadog Lambda layer. Follow the instructions below.

## Webpack
1. Follow the [installation instructions for Node.js][3] and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Exclude `datadog-lambda-js` and `dd-trace`, either by removing them from your `package.json` or by setting an [exclude rule][4]. Excluding them tells the bundler to skip building them as dependencies, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.
3. Mark your dependencies as [externals][5]. This tells the bundler to exclude them from the output bundle; instead, they are packaged in `node_modules`.

    **webpack.config.js**

    ```javascript
    const nodeExternals = require("webpack-node-externals");

    module.exports = {
      // Use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            // Provided by the Datadog Lambda layer and the Lambda Runtime.
            exclude: ['/aws-sdk/', '/datadog-lambda-js/', '/dd-trace/'],
          }
        ]
      },
    }
    ```

    If you are using the `serverless-webpack` plugin and have the option `includeModules` set to any value other than `false`, the plugin automatically [packs external modules under `node_modules`][6]. Therefore, you must force exclude `datadog-lambda-js` and `dd-trace`. Skip this step if you don't use `serverless-webpack` or you don't have the `includeModules` option in your `serverless.yml`.

    **serverless.yml**

    ```yaml
    custom:
      webpack:
        # You only need the following if you already have the includeModules option configured.
        includeModules:
          # ... your existing configuration for includeModules
          forceExclude:
            - aws-sdk
            - datadog-lambda-js
            - dd-trace
        packagerOptions:
          scripts:
            # Optional, only needed when they are included as transitive dependencies 
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

    To have more control around what dependencies are included, you could also include your `webpack.config.js` in your `serverless-webpack` configuration:

    ```yaml
    custom:
      webpack:
        forceExclude:
          - aws-sdk
          - datadog-lambda-js
          - dd-trace
        webpackConfig: 'webpack.config.js'
    ```

## esbuild
1. Follow the [installation instructions for Node.js][3] and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.
3. Mark your dependencies as [externals][7]. This tells the bundler to eclude them from the output bundle; instead, they are packaged in `node_modules`.
    
    **esbuild.config.js**
    
    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
      // ... your existing esbuild configuration
      // Same effect as manually passing each dependency to `external`
      packages: 'external'
    })
    ```

    If you are using the `serverless-esbuild` plugin, you can externalize all dependencies with the `esbuild-node-externals` as an esbuild plugin. automatically [packs external modules under `node_modules`][8].

    **serverless.yml**

    ```yaml
    custom:
      esbuild:
        exclude: 
          # aws-sdk is needed because it is the default value for `exclude`
          - aws-sdk
          - datadog-lambda-js
          - dd-trace
        plugins: plugins.js
        # You can also set the specific dependencies to externalize instead of using `plugins`
        external: [...]
    ```

    ```javascript
    // plugins.js
    const { nodeExternalsPlugin } = require('esbuild-node-externals')
    
    module.exports = [nodeExternalsPlugin()]
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: https://esbuild.github.io/
[3]: /serverless/installation/nodejs
[4]: https://webpack.js.org/configuration/module/#ruleexclude
[5]: https://webpack.js.org/configuration/externals/
[6]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[7]: https://esbuild.github.io/api/#external
[8]: https://www.npmjs.com/package/esbuild-node-externals
