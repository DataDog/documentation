---
title: AWS Lambda ペイロードを収集する
kind: documentation
description: 呼び出しペイロードを監視することで、AWS Lambda 関数の障害を迅速に解決する
further_reading:
  - link: serverless
    text: Datadog でのサーバーレスモニタリング
  - link: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
    text: 呼び出しペイロードを監視することで、AWS Lambda 関数の障害を迅速に解決する
    tag: ブログ
---
{{< img src="serverless/serverless_collect_lambda_payloads.png" alt="AWS Lambda ペイロードを収集する"  style="width:100%;" >}}

## 概要

Datadog を使用して AWS Lambda 関数の JSON リクエストとレスポンスのペイロードを収集し可視化することで、[サーバーレスアプリケーションへの深い洞察と Lambda 関数障害のトラブルシューティングを支援][1]することが可能です。

## コンフィギュレーション

Lambda 関数を初めてインスツルメントする場合は、[サーバーレスのインストール手順][2]に従ってください。AWS Lambda ペイロードの取り込みには、[APM が関数に設定されていること][3]が必要で、以下の Lambda ランタイムで利用可能です。
- Python ([v49+][4])
- Node.js ([v64+][5])

Lambda のリクエストとレスポンスのペイロードを Datadog に送信する各関数で、環境変数 `DD_CAPTURE_LAMBDA_PAYLOAD` を `true` に設定します。

この機能は、AWS X-Ray にも対応しています。Datadog-AWS X-Ray インテグレーション][6]の手順に従い、Datadog の Lambda Libraries で AWS Lambda 関数の X-Ray セグメントをリッチ化することができます。

## ペイロードコンテンツの難読化

リクエストやレスポンスの JSON オブジェクト内の機密データ (アカウント ID やアドレスなど) が Datadog に送信されないようにするには、特定のパラメータを Datadog に送信しないようにスクラブすることが可能です。

そのためには、Lambda 関数のコードと同じフォルダに、新しいファイル `datadog.yaml` を追加してください。Lambda ペイロードのフィールドの難読化は、`datadog.yaml` の `apm_config` 設定内の [replace_tags ブロック][7]で行うことができます。

```yaml
apm_config:
  replace_tags:
    # 任意のタグに出現する "foobar" をすべて "REDACTED" に置き換えます:
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # キーが "auth" のヘッダーをすべて削除し、空の文字列に置き換えます
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # レスポンスペイロードから "apiToken" を削除し、"****" に置き換えます
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

別の方法として、Lambda 関数に環境変数 `DD_APM_REPLACE_TAGS` を設定し、特定のフィールドを難読化することもできます。

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads
[2]: /ja/serverless/installation
[3]: /ja/serverless/distributed_tracing
[4]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v49
[5]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v4.64.0
[6]: https://docs.datadoghq.com/ja/integrations/amazon_xray/?tab=nodejs#enriching-xray-segments-with-datadog-libraries
[7]: /ja/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering