---
title: Datadog Lambda 拡張機能 (プレビュー)
kind: ドキュメント
further_reading:
    - link: serverless/custom_metrics
      tag: Documentation
      text: AWS Lambda からのカスタムメトリクスの送信
---

## 概要

<div class="alert alert-warning">Datadog AWS Lambda 拡張機能は公開プレビューです。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

AWS Lambda 拡張機能は、Lambda 関数を拡張できるコンパニオンプロセスです。Lambda の実行環境内で、Lambda 関数コードとともに動作します。Datadog 拡張機能は、最低限のパフォーマンスオーバーヘッドでコードと一緒に実行するよう構築された、Datadog Agent の軽量バージョンです。

Datadog 拡張機能は、AWS Lambda 関数の実行中にカスタムメトリクスおよびログの[同期的][1]送信をサポートします。つまり、[Datadog Forwarder][2] を使わずにテレメトリーデータを送信できます。**注**: トレースを Datadog に送信するには、依然として Datadog Forwarder が必要です。

## セットアップ

Datadog 拡張機能は、独自の Lambda レイヤー ([Datadog Lambda ライブラリ][3]とは別) として配布され、Node.js と Python ランタイムをサポートします。

1. [Python][4] または [Node.js][5] アプリケーションをインスツルメントします。

2. Datadog 拡張機能用 Lambda レイヤーを AWS Lambda 関数に追加します。

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:6
    ```

    Lambda レイヤー ARN のプレイスホルダー `AWS_REGION` を適切な値に置き換えます。

3. Node.js または Python を使用している場合は、[Datadog ライブラリ][7]の Lambda レイヤーを AWS Lambda 関数に追加します。

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
    ```

    使用できる `RUNTIME` オプションは、`Node10-x`、`Node12-x`、`Python37`、`Python38` です。`VERSION` については、[Node.js][8] または [Python][9] の最新リリースを参照してください。

4. カスタムメトリクスを送信するには、[サンプルコード][10]を参照します。

### ログの収集

Extension を使用して AWS Lambda ログを Datadog に送信するには、関数の環境変数 `DD_LOGS_ENABLED` を `true` に設定します。さらに、この設定により Datadog の[拡張メトリクス][11]が生成されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[2]: /ja/serverless/forwarder
[3]: /ja/serverless/datadog_lambda_library
[4]: /ja/serverless/installation/python
[5]: /ja/serverless/installation/nodejs
[6]: /ja/serverless/installation/go
[7]: https://docs.datadoghq.com/ja/serverless/datadog_lambda_library
[8]: https://github.com/DataDog/datadog-lambda-js/releases
[9]: https://github.com/DataDog/datadog-lambda-python/releases
[10]: /ja/serverless/custom_metrics#custom-metrics-sample-code
[11]: /ja/serverless/enhanced_lambda_metrics
