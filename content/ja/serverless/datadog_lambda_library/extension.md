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

現在 Datadog 拡張機能は、Node.js と Python rランタイムをサポートします。

### Lambda レイヤーとして

Datadog Lambda 拡張機能は、独自の Lambda レイヤー ([Datadog Lambda ライブラリ][3]とは別) として配布されます。

1. Datadog Lambda ライブラリをインストールして、[Python][4] または [Node.js][5] アプリケーションをインスツルメントします。

2. Datadog 拡張機能用 Lambda レイヤーを次の ARN で AWS Lambda 関数に追加します。

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<VERSION_NUMBER>
    ```

    ARN のプレイスホルダーの値を次のように置き換えます。
    - Replace `<AWS_REGION>` を Lambda 関数と同じ AWS リージョンに置き換えます。例、 `us-east-1`
    - `<VERSION_NUMBER>` を使用する Datadog Lambda 拡張機能のバージョン（たとえば `7` ）に置き換えます。 現在のバージョンを確認するには、[Amazon ECR リポジトリ][11]で最新のイメージタグを表示します。

    **注**: このレイヤーは Datadog Lambda ライブラリとは別のものです。Datadog Lambda ライブラリを Lambda レイヤーとしてインストールした場合、
    関数には 2 つの Lambda レイヤーがアタッチされることになります。

3. カスタムメトリクスを送信するには、[サンプルコード][10]を参照します。

### コンテナイメージとして

関数をコンテナイメージとしてデプロイする場合は、関数に Lambda レイヤーを追加することはできません。代わりに、Datadog Lambda ライブラリとDatadog Lambda 拡張機能を、関数イメージに直接インストールする必要があります。

まず、[Node.js][5] または [Python][4] のインストール手順に従い、Datadog Lambda ライブラリをインストールします。コンテナイメージとしてデプロイされる機能に特化したインストレーション手順を使用してください。

次に、Dockerfile に以下を追加して、Datadog Lambda 関数をコンテナイメージに追加します。

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

`<TAG>` を特定のバージョン番号（たとえば `6` ）または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][11]で確認できます。

## ログの収集

拡張機能を使用して AWS Lambda ログを Datadog に送信するには、関数の環境変数 `DD_LOGS_ENABLED` を `true` に設定します。

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
[11]: https://gallery.ecr.aws/datadog/lambda-extension
