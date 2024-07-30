---
aliases:
- /ja/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: ドキュメント
  text: Node.js アプリケーションのインスツルメンテーション
title: Node.js Lambda トレースと Webpack の互換性
---

## 概要

Datadog のトレーシングライブラリ (`dd-trace`) は、条件付きインポートの使用やその他の問題により、[Webpack][1] などのバンドラーと互換性がないことが知られています。Webpack は `dd-trace` をビルドできませんが、アプリケーションは、ビルド済みの Datadog Lambda レイヤーによって提供される `dd-trace` および `datadog-lambda-js` ライブラリを引き続き使用できます。以下の手順に従ってください。

## Webpack
1. [Node.js のインストール手順][2]に従い、Node.js の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `package.json` とビルドプロセスから `datadog-lambda-js` と `dd-trace` を削除します。
3. [externals][3] として `datadog-lambda-js` と `dd-trace` をマークします。これは、Datadog Lambda レイヤーによって提供される Lambda ランタイムですでに利用可能であるため、依存関係としてのビルドをスキップするようにバンドラーに指示します。

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

4. `serverless-webpack` を使用していて、オプション `includeModules` に `false` 以外の値を設定している場合、serverless-webpack は自動的に [node_modules 以下に外部モジュールをパックします][5]。そのため、`datadog-lambda-js` と `dd-trace` を強制的に除外する必要があります。`serverless-webpack` を使用しない場合、または serverless.yml に `includeModules` オプションがない場合は、このステップをスキップしてください。

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
1. [Node.js のインストール手順][2]に従い、Node.js の Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. `package.json` とビルドプロセスから `datadog-lambda-js` と `dd-trace` を削除します。
3. [externals][4] として `datadog-lambda-js` と `dd-trace` をマークします。これは、Datadog Lambda レイヤーによって提供される Lambda ランタイムですでに利用可能であるため、依存関係としてのビルドをスキップするようにバンドラーに指示します。
4. [Esbuild サポート][6]のページの手順に従って、Datadog の Esbuild プラグインを使用します。これにより、バンドルされた依存関係のインスツルメンテーションが可能になります。

    **esbuild.config.js (esbuild-config を使用している場合)**

    ```
    {
      "external": ["dd-trace", "datadog-lambda-js"],
    }
    ```

    **serverless.yml (serverless-esbuild を使用している場合)**

    ```
    custom:
      esbuild:
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is needed because it is the default value for `exclude`
    ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /ja/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
[4]: https://esbuild.github.io/api/#external
[5]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[6]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#esbuild-support