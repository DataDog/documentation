---
aliases:
- /ja/serverless/troubleshooting/serverless_tracing_and_bundlers
- /ja/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Node.js アプリケーションのインスツルメンテーション
title: Node.js Lambda トレースとバンドラーの互換性
---

## 概要

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
            exclude: [
              // AWS SDK v3
              /^@aws-sdk.*/,
              // AWS SDK v2
              /aws-sdk/,
              /datadog-lambda-js/,
              /dd-trace/
            ],
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
            # @aws-sdk for the AWS SDK v3
            - @aws-sdk
            # aws-sdk for the AWS SDK v2
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
          # @aws-sdk for the AWS SDK v3
          - @aws-sdk
          # aws-sdk for the AWS SDK v2
          - aws-sdk
          - datadog-lambda-js
          - dd-trace
        webpackConfig: 'webpack.config.js'
    ```

## esbuild
1. Follow the [installation instructions for Node.js][3] and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process, since they are already available in the Lambda runtime provided by the Datadog Lambda layer.
3. 依存関係を[外部][7]としてマークします。これは、出力バンドルからそれらを除外するようバンドラーに指示します。代わりに、それらは `node_modules` にパッケージされます。

    **esbuild.config.js**

    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
      // ... your existing esbuild configuration
      // Same effect as manually passing each dependency to `external`
      packages: 'external'
    })
    ```

   `serverless-esbuild` プラグインを使用している場合、`esbuild-node-externals` で全ての依存関係を esbuild プラグインとして外部化することが可能です。自動的に[外部モジュールを `node_modules` の下にパック][8]します。

    **serverless.yml**

    ```yaml
    custom:
      esbuild:
        exclude: 
          # @aws-sdk for the AWS SDK v3
          - @aws-sdk
          # aws-sdk for the AWS SDK v2
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

## AWS CDK

If you deploy Node.js Lambda functions using the `NodeJsFunction` construct, but aren't using `esbuild` or Typescript, you can still use Datadog to observe your serverless applications.

1. Follow the installation instructions for Node.js and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process, since they are already available in the Lambda runtime provided by the Datadog Lambda Layer.
3. Use the `NodejsFunction` construct in the CDK. Ensure you set the `entry` property to be the path to the file containing your Lambda function handler, the `depsLockFilePath` to the path to your lock file for the package manager you are using, and the `bundling.commandHooks.beforeBundling` to ensure all dependencies are installed.

   **lambdaFunction.ts**
    ```typescript    
    const nodeFunction = new NodejsFunction(this, "test", {
      runtime: Runtime.NODEJS_20_X,
      entry: './functions/consumer/index.js', // The Javascript file for your Lambda function handler
      handler: 'handler',
      depsLockFilePath: './package-lock.json', // The path to the lock file for your respective package manager (npm, yarn etc)
      bundling: {
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string) {
            return [
              `cd ${inputDir}`,
              'npm install', // Ensure all dependencies are installed before your Javascript file is zipped and deployed
            ]
          },
          beforeInstall() {
            return []
          },
          afterBundling() {
            return []
          }
        },
        externalModules: ['@aws-sdk/client-dynamodb'] // The AWS SDK is included as part of the NodeJS Lambda runtime
      }
    });
    ```

## AWS CDK & esbuild

The `NodeJsFunction` construct in the AWS CDK uses esbuild. The default configuration is not compatible with Datadog's tracing libraries. The CDK allows you to override the default configuration and provide a custom esbuild file to support bundling and the Datadog tracing libraries:

1. Follow the installation instructions for Node.js and ensure the Datadog Lambda layer for Node.js is added to your Lambda function.
2. Remove `datadog-lambda-js` and `dd-trace` from your `package.json` and the build process, since they are already available in the Lambda runtime provided by the Datadog Lambda Layer.
3. Create an `esbuild` file for each of your Lambda functions. A seperate `esbuild` file is required per Lambda function so that each entry point can be specified seperately. Notice the `entryPoint` and `outfile` properties. For example, if you had a second Lambda function in your project named `producer`, then the entry point would be `./functions/producer.ts` and the outfile would be `/out/producer/index.js`

    **buildConsumer.js**
    ```javascript
    const ddPlugin = require('dd-trace/esbuild')
    const esbuild = require('esbuild')

    esbuild.build({
      entryPoints: ['./functions/consumer.ts'],
      outfile: 'out/consumer/index.js',
      plugins: [ddPlugin],
      // Other esbuild configuration
      external: [
        // esbuild cannot bundle native modules
        '@datadog/native-metrics',

        // required if you use profiling
        '@datadog/pprof',

        // required if you use Datadog security features
        '@datadog/native-appsec',
        '@datadog/native-iast-taint-tracking',
        '@datadog/native-iast-rewriter',

        // required if you encounter graphql errors during the build step
        'graphql/language/visitor',
        'graphql/language/printer',
        'graphql/utilities',
        '@aws-sdk/client-sqs'

        // if you are using the package, instead of the layer
        'datadog-lambda-js'
      ]
    }).catch((err) => {
      console.error(err)
      process.exit(1)
    })
    ```

4. When defining your `NodeJsFunction` in the CDK, use the `Code.fromCustomCommand` function to specify the path to your custom `esbuild` file and an output folder. For each separate Lambda function, specify the individual `esbuild` file defined in step three. The output folder should match the folder of the `outfile` in your `esbuild` file.

    **lambdaFunction.ts**
    ```typescript
    // This path will likely be different for each individual Lambda function
    const pathToBuildFile = '../functions/buildConsumer.js';

    // Ensure the files for each Lambda function are generated into their own directory
    const pathToOutputFolder = '../out/consumer/';

    const code = Code.fromCustomCommand(
      pathToOutputFolder,
      ['node', pathToBuildFile],
    );

    const consumerLambdaFunction = new NodejsFunction(this, props.functionName, {
      runtime: Runtime.NODEJS_20_X,
      code: code,
      handler: 'index.handler',
      memorySize: 512,
      bundling: {
        platform: 'node',
        esbuildArgs: {
          "--bundle": "true"
        },
        target: 'node20'
      }
    });
    ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: https://esbuild.github.io/
[3]: /ja/serverless/installation/nodejs
[4]: https://webpack.js.org/configuration/module/#ruleexclude
[5]: https://webpack.js.org/configuration/externals/
[6]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[7]: https://esbuild.github.io/api/#external
[8]: https://www.npmjs.com/package/esbuild-node-externals