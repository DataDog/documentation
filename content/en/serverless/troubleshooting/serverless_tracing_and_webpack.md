---
title: Node.js Lambda Tracing and Webpack Compatibility 
kind: documentation
further_reading:
- link: '/serverless/installation/nodejs'
  tag: 'Documentation'
  text: 'Instrumenting Node.js Applications'
---

# Compatibility

Datadog's tracing libraries (`dd-trace`) are known to be not compatible with [webpack][1] due to the use of conditional imports and other issues. While webpack cannot build `dd-trace`, your application can still use the `dd-trace` and `datadog-lambda-js` libraries provided by the prebuilt Datadog Lambda layer. Follow the instructions below:

1. Follow the [installation instructions for Node.js][2] and ensure the Datadog Lambda layer is added to your Lambda function. 
2. Mark `datadog-lambda-js` and `dd-trace` as [externals][3] for webpack. This tells webpack to skip building them as dependencies, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

3. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process.
4. If you are using `serverless-webpack` and the Serverless Framework, exclude `datadog-lambda-js` and `dd-trace` from your `serverless.yml`.

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```

    **Note:** This exclusion may not be enough if you have at least one dependency that itself depends on `datadog-lambda-js` or `dd-trace` (transitive dependencies). In this case, **forceExclude** won't avoid the inclusion of one of these libraries. If this is your case, you can try to remove them manually using something like this:

    ```
    custom:
      webpack:
        packagerOptions:
          scripts:
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
