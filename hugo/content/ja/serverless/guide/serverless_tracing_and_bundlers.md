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

Datadog のトレーシングライブラリ (`dd-trace`) は、条件付きインポートなどの問題により [Webpack][1] や [esbuild][2] といったバンドラーと互換性がないことが知られています。バンドラーが `dd-trace` をビルドできなくても、事前ビルド済みの Datadog Lambda レイヤーに含まれる `dd-trace` と `datadog-lambda-js` ライブラリをアプリケーションで引き続き利用できます。以下の手順に従ってください。

## Webpack
1. [Node.js 用のインストール手順][3] に従い、Node.js 用の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` を `package.json` から削除するか、または [exclude ルール][4] を設定して除外します。これにより、バンドラーはこれらを依存関係としてビルドしなくなります (Datadog Lambda レイヤーのランタイムですでに利用可能なため)。
3. 依存関係を [externals][5] としてマークします。これにより、バンドラーは依存関係を出力バンドルに含めず、`node_modules` にパッケージします。

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

    `serverless-webpack` プラグインを使用していて、`includeModules` オプションが `false` 以外に設定されている場合、このプラグインでは外部モジュールは自動的に `node_modules` 配下へパッケージ化されます。そのため、`datadog-lambda-js` と `dd-trace` を必ず除外してください。`serverless-webpack` を使っていない場合、または `serverless.yml` に `includeModules` オプションが存在しない場合は、この手順をスキップできます。

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

    依存関係の取り込みをより細かく制御したい場合は、`serverless-webpack` 設定に `webpack.config.js` を含めることも可能です。

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
1. [Node.js 用のインストール手順][3] に従い、Node.js 用の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` を `package.json` およびビルドプロセスから削除します。これらは Datadog Lambda レイヤーのランタイムにすでに含まれています。
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

`NodeJsFunction` コンストラクトを使って Node.js Lambda 関数をデプロイしているが、`esbuild` や TypeScript を使用していない場合でも、Datadog を利用してサーバーレスアプリケーションを監視できます。

1. Node.js 用のインストール手順に従い、Node.js 用の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` を `package.json` から削除し、ビルドプロセスからも除外します。これらは Datadog Lambda レイヤーのランタイムにすでに含まれています。
3. CDK の `NodejsFunction` コンストラクトを使用します。`entry` プロパティには Lambda 関数 **の** ハンドラーを含むファイルのパス、`depsLockFilePath` には利用しているパッケージマネージャのロックファイルのパス、`bundling.commandHooks.beforeBundling` にはすべての依存関係をインストールするコマンドを設定してください。

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
        externalModules: ['@aws-sdk/client-dynamodb'] // The AWS SDK is included as part of the Node.js Lambda runtime
      }
    });
    ```

## AWS CDK & esbuild

AWS CDK の `NodeJsFunction` コンストラクトは内部で esbuild を使用します。デフォルト設定は Datadog のトレーシングライブラリと互換性がありませんが、CDK ではデフォルト設定を上書きし、バンドリングおよび Datadog トレーシングライブラリをサポートするカスタム esbuild ファイルを指定できます。

1. Node.js 用のインストール手順に従い、Node.js 用の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` を `package.json` から削除し、ビルドプロセスからも除外します。これらは Datadog Lambda レイヤーのランタイムにすでに含まれています。
3. 各 Lambda 関数ごとに `esbuild` ファイルを作成します。エントリーポイントを個別に指定する必要があるため、Lambda 関数ごとに別々の `esbuild` ファイルが必要です。ここで `entryPoint` と `outfile` プロパティを設定する点に注意してください。たとえば、プロジェクトに `producer` という 2 つ目の Lambda 関数がある場合、`entryPoint` は `./functions/producer.ts`、`outfile` は `/out/producer/index.js` となります。

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
        '@datadog/wasm-js-rewriter',

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

4. CDK で `NodeJsFunction` を定義する際、`Code.fromCustomCommand` を使用してカスタム `esbuild` ファイルのパスと出力フォルダーを指定します。個別の Lambda 関数ごとに、ステップ 3 で定義した `esbuild` ファイルを指定してください。出力フォルダーは `esbuild` ファイル内の `outfile` と同じフォルダーにする必要があります。

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
