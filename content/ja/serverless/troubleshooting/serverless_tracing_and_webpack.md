---
title: Node.js Lambda トレースと Webpack の互換性
kind: documentation
further_reading:
  - link: /serverless/installation/nodejs
    tag: ドキュメント
    text: Node.js アプリケーションのインスツルメンテーション
---
# 互換性

Datadog のトレーシングライブラリ (`dd-trace`) は、条件付きインポートの使用やその他の問題により、[Webpack][1] と互換性がないことが知られています。Webpack は `dd-trace` をビルドできませんが、アプリケーションは、ビルド済みの Datadog Lambda レイヤーによって提供される `dd-trace` および `datadog-lambda-js` ライブラリを引き続き使用できます。以下の手順に従ってください。

1. [Node.js のインストール手順][2]に従い、Datadog Lambda レイヤーが Lambda 関数に追加されていることを確認します。
2. Webpack の [externals][3] として `datadog-lambda-js` と `dd-trace` をマークします。これは、Datadog Lambda レイヤーによって提供される Lambda ランタイムですでに利用可能であるため、依存関係としてのビルドをスキップするように Webpack に指示します。

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

3. `package.json` とビルドプロセスから `datadog-lambda-js` と `dd-trace` を削除します。
4. `serverless-webpack` と Serverless Framework を使用している場合は、`serverless.yml` から `datadog-lambda-js` と `dd-trace` を除外します。

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /ja/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/