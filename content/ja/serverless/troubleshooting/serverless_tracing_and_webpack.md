---
title: Node.js Lambda トレースと Webpack の互換性 
kind: documentation
further_reading:
    - link: serverless/installation/node
      tag: ドキュメント
---

# 互換性

Datadog のトレースライブラリ (`dd-trace`) は、条件付きインポートの使用やその他の問題により、[webpack][1] と互換性がないことが知られています。webpack を使用し、Node.js サーバーレス関数をトレースする場合:

1. `datadog-lambda-js` と `dd-trace` を webpack の[外部][2]としてマークします。これにより、webpack はこれらの依存関係が Lambda ランタイムで利用可能になることを認識します。

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // we use webpack-node-externals to excludes all node deps.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

2. `package.json` とビルドプロセスから `datadog-lambda-js` と `dd-trace` を削除します。代わりに、[Lambda レイヤー][3]を介してこれらのパッケージをインポートしていることを確認してください。
3. `serverless-webpack` と Serverless Framework を使用している場合は、`serverless.yml` から `datadog-lambda-js` と `dd-trace` を除外します。

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
[2]: https://webpack.js.org/configuration/externals/
[3]: https://github.com/DataDog/datadog-lambda-js/releases
