---
title: Lambda ハンドラーをコードでラップする
---

Python や Node.js の Lambda 関数では、個々の呼び出しをインスツルメントするために、Datadog Lambda ライブラリが Lambda ハンドラー関数にラップする必要があります。これは、関数のハンドラーを Datadog のハンドラー関数、例えば `datadog_lambda.handler.handler` に設定し、環境変数 `DD_LAMBDA_HANDLER` に、Datadog ハンドラーから呼ばれるオリジナルのハンドラー関数を設定すれば実現できます。

Lambda 関数の構成が Datadog ハンドラーのリダイレクトと互換性がない場合、代わりに関数コードで Datadog ラッパーを適用することができます。

1. [Python][1] または [Node.js][2] の **Custom** インストール手順に従い、Datadog サーバーレスモニタリングをインストールします。
2. ハンドラー関数を構成するステップをスキップします。
3. 環境変数 `DD_LAMBDA_HANDLER` を設定するステップをスキップします。
4. 関数コードで Datadog ラッパーを適用します。
    ```python
    # for python
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    @datadog_lambda_wrapper
    def my_lambda_handle(event, context):
        # your function code
    ```

    ```js
    // for node.js
    const { datadog } = require("datadog-lambda-js");
    const tracer = require("dd-trace").init({
      // optional tracer options
    });

    module.exports.myHandler = datadog(myHandler, {
      // my function code
    }, {
      // optional datadog config, e.g., custom trace context extractor
      traceExtractor: () => {},
    });
    ```

[1]: /ja/serverless/installation/python?tab=custom
[2]: /ja/serverless/installation/nodejs?tab=custom