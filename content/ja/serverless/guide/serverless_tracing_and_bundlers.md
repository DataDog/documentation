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

Datadog のトレーシングライブラリ (`dd-trace`) は、条件付きインポートの使用やその他の問題により、[Webpack][1] や [esbuild][2] などのバンドラーと互換性がないことが知られています。バンドラーは `dd-trace` をビルドできませんが、アプリケーションは、ビルド済みの Datadog Lambda レイヤーによって提供される `dd-trace` および `datadog-lambda-js` ライブラリを引き続き使用できます。以下の手順に従ってください。

## Webpack
1. [Node.js のインストール手順][3]に従い、Node.js の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` は `package.json` から削除するか[除外ルール][4]を設定して除外します。除外することで、Datadog Lambda レイヤーが提供する Lambda ランタイムで既に利用可能なため、依存関係としてのビルドをスキップするようバンドラーに指示します。
3. 依存関係を[外部][5]としてマークします。これは、出力バンドルからそれらを除外するようバンドラーに指示します。代わりに、それらは `node_modules` にパッケージされます。

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

   `serverless-webpack` プラグインを使用していて、オプション `includeModules` に `false` 以外の値を設定している場合、プラグインは自動的に [`node_modules` 以下に外部モジュールをパックします][6]。そのため、`datadog-lambda-js` と `dd-trace` を強制的に除外する必要があります。`serverless-webpack` を使用しない場合、または `serverless.yml` に `includeModules` オプションがない場合は、このステップをスキップしてください。

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

    どのような依存関係を含めるかをよりコントロールするために、`serverless-webpack` の構成に `webpack.config.js` を含めることができます。

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
1. [Node.js のインストール手順][3]に従い、Node.js の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `datadog-lambda-js` と `dd-trace` は Datadog Lambda レイヤーが提供する Lambda ランタイムで既に利用可能なので、`package.json` やビルドプロセスから削除します。
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