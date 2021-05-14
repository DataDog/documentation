---
title: Node.js Lambda Tracing and Webpack Compatibility 
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
---

# Compatibility

Datadog's tracing libraries (`dd-trace`) are known to be not compatible with [webpack][1] due to the use of conditional imports and other issues. If using webpack and tracing your Node.js serverless functions:

1. Mark `datadog-lambda-js` and `dd-trace` as [externals][5] for webpack, so webpack knows these dependencies will be available in the Lambda runtime.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // we use webpack-node-externals to excludes all node deps.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process. Instead, ensure you're importing these packages via [Lambda Layers][2].
3. If you are using `serverless-webpack` and the Serverless Framework, exclude `datadog-lambda-js` and `dd-trace` from your `serverless.yml`.

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```


[1]: https://webpack.js.org
[2]: https://github.com/DataDog/datadog-lambda-js/releases
