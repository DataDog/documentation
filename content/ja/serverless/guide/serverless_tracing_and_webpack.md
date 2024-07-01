---
title: Node.js Lambda Tracing and Webpack Compatibility 
kind: documentation
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenting Node.js Applications
aliases:
    - /serverless/troubleshooting/serverless_tracing_and_webpack
---

## Overview

Datadog's tracing libraries (`dd-trace`) are known to be not compatible with bundlers like [webpack][1] due to the use of conditional imports and other issues. While webpack cannot build `dd-trace`, your application can still use the `dd-trace` and `datadog-lambda-js` libraries provided by the prebuilt Datadog Lambda layer. Follow the instructions below.

## webpack
1. Follow the [installation instructions for Node.js][2] and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process.
3. Mark `datadog-lambda-js` and `dd-trace` as [externals][3]. This tells the bundler to skip building them as dependencies, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

4. If you are using the `serverless-webpack` and have the option `includeModules` set to any value other than `false`, serverless-webpack automatically [packs external modules under node_modules][5]. Therefore, you must force exclude `datadog-lambda-js` and `dd-trace`. Skip this step if you don't use `serverless-webpack` or you don't have the `includeModules` option in your serverless.yml.

    **serverless.yml**

    ```
    custom:
      webpack:
        # Note: You only need the following if you already have the includeModules option configured
        includeModules:
          # ... your existing configuration for includeModules
          forceExclude:
            - dd-trace
            - datadog-lambda-js
        packagerOptions:
          scripts:
            # optional, only needed when they are included as transitive dependencies 
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

## esbuild
1. Follow the [installation instructions for Node.js][2] and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process.
3. Mark `datadog-lambda-js` and `dd-trace` as [externals][4]. This tells the bundler to skip building them as dependencies, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.
4. Follow the steps on the [Esbuild support][6] page to use Datadog's Esbuild plugin. This enables instrumentation of bundled dependencies.

    **esbuild.config.js (if using esbuild-config)**

    ```
    {
      "external": ["dd-trace", "datadog-lambda-js"],
    }
    ```

    **serverless.yml (if using serverless-esbuild)**

    ```
    custom:
      esbuild:
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is needed because it is the default value for `exclude`
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
[4]: https://esbuild.github.io/api/#external
[5]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[6]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#esbuild-support
