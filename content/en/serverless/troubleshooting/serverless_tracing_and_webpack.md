---
title: Node.js Lambda Tracing and Webpack Compatibility 
kind: documentation
further_reading:
- link: '/serverless/installation/nodejs'
  tag: 'Documentation'
  text: 'Instrumenting Node.js Applications'
---

# Compatibility

Datadog's tracing libraries (`dd-trace`) are known to be not compatible with [webpack][1] due to the use of conditional imports and other issues. While webpack cannot *build* `dd-trace`, your application can still *use* `dd-trace` and `datadog-lambda-js` provided by the *prebuilt* Datadog Lambda layer. Follow the instructions below:

1. Follow the [installation instructions for Node.js][2] and ensure the Datadog Lambda layer is added to your Lambda function. 

1. Mark `datadog-lambda-js` and `dd-trace` as [externals][3] for webpack, so webpack knows to skip building them as dependencies, because they are already available in the Lambda runtime provided by the Datadog Lambda layer.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // we use webpack-node-externals to excludes all node deps.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

1. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process.

1. If you are using `serverless-webpack` and the Serverless Framework, exclude `datadog-lambda-js` and `dd-trace` from your `serverless.yml`.

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
