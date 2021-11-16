---
title: Datadog Lambda 拡張機能
kind: documentation
further_reading:
  - link: serverless/custom_metrics
    tag: ドキュメント
    text: AWS Lambda からのカスタムメトリクスの送信
aliases:
  - /ja/serverless/datadog_lambda_library/extension/
---
## 概要

AWS Lambda 拡張機能は、Lambda 関数を拡張できるコンパニオンプロセスです。Lambda の実行環境内で、Lambda 関数コードとともに動作します。Datadog 拡張機能は、最低限のパフォーマンスオーバーヘッドでコードと一緒に実行するよう構築された、Datadog Agent の軽量バージョンです。

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="AWS サーバーレスアプリケーションをインスツルメントする"  style="width:100%;">}}

Datadog Lambda 拡張機能は以下を担当します。
- Datadog Lambda ライブラリから Datadog へのリアルタイムの[強化された Lambda メトリクス][1]、[カスタムメトリクス][2]、および[トレース][3]のプッシュ。
- ログの Lambda 関数から Datadog への転送。

Datadog 拡張機能は、カスタムメトリクス、拡張メトリクス、トレース、およびログを[非同期的に][4]送信します。拡張機能を使用した Lambda ログの送信は、すべての Lambda ランタイムでサポートされています。カスタム メトリクス、強化されたメトリクス、およびトレースの送信は、Node.js および Python Lambda ランタイムでサポートされています。

## Datadog Lambda 拡張機能

AWS サーバーレスアプリケーションをインスツルメントするには、[サーバーレスインストール手順][5]を参照してください。

### Lambda レイヤーとして

Datadog Lambda 拡張機能は、独自の Lambda レイヤー ([Datadog Lambda ライブラリ][6]とは別) として配布されます。 

1. Datadog Lambda ライブラリをインストールして、[Python][7] または [Node.js][8] アプリケーションをインスツルメントします。

2. Datadog 拡張機能用 Lambda レイヤーを次の ARN で AWS Lambda 関数に追加します。

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
    ```

    ARN のプレイスホルダーの値を次のように置き換えます。
    - Replace `<AWS_REGION>` を Lambda 関数と同じ AWS リージョンに置き換えます。例、 `us-east-1`
    - `<EXTENSION_VERSION>` を使用したい Datadog Lambda 拡張機能のバージョンに置き換えます。最新バージョンは `{{< latest-lambda-layer-version layer="extension" >}} です。

    **注**: このレイヤーは Datadog Lambda ライブラリとは別のものです。Datadog Lambda ライブラリを Lambda レイヤーとしてインストールした場合、
    関数には 2 つの Lambda レイヤーがアタッチされることになります。

3. 環境変数 `DD_API_KEY` を追加し、[API 管理ページ][10]で Datadog API キーに値を設定します。

4. カスタムメトリクスを送信するには、[サンプルコード][11]を参照します。

### コンテナイメージとして

関数をコンテナイメージとしてデプロイする場合は、関数に Lambda レイヤーを追加することはできません。代わりに、Datadog Lambda ライブラリとDatadog Lambda 拡張機能を、関数イメージに直接インストールする必要があります。

1. [Node.js][8] または [Python][7] のインストール手順に従い、Datadog Lambda ライブラリをインストールします。コンテナイメージとしてデプロイされる機能に特化したインストレーション手順を使用してください。

2. Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

`<TAG>` を特定のバージョン番号 (たとえば `{{< latest-lambda-layer-version layer="python" >}}`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][9]で確認できます。

3. 環境変数 `DD_API_KEY` を追加し、[API 管理ページ][10]で Datadog API キーに値を設定します。

4. カスタムメトリクスを送信するには、[サンプルコード][11]を参照します。

## ログの収集

拡張機能を使用した AWS Lambda ログの Datadog への送信を無効にするには、Lambda 関数で環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/enhanced_lambda_metrics
[2]: /ja/serverless/custom_metrics
[3]: /ja/serverless/distributed_tracing
[4]: /ja/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[5]: /ja/serverless/installation
[6]: /ja/serverless/datadog_lambda_library
[7]: /ja/serverless/installation/python
[8]: /ja/serverless/installation/nodejs
[9]: https://gallery.ecr.aws/datadog/lambda-extension
[10]: https://app.datadoghq.com/account/settings#api
[11]: /ja/serverless/custom_metrics#custom-metrics-sample-code