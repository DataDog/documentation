---
title: 分散型トレーシング
kind: ドキュメント
further_reading:
  - link: tracing/serverless_functions
    tag: Documentation
    text: AWS X-Ray のインストール
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースのサーバーレス機能"  style="width:100%;">}}

Datadog では、サーバーレストレースをメトリクスに接続することで、アプリケーションのパフォーマンスに関する豊富な情報を提供します。これにより、サーバーレスアプリケーションの性質である分散型の環境でもパフォーマンスの問題を的確にトラブルシューティングできます。

## トレーシングライブラリを選択する

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Datadog で AWS Lambda をトレースするためのアーキテクチャ図" >}}

言語設定とコンフィギュレーションに応じて、トレースに Datadog APM または AWS X-Ray のいずれが必要かを選択し、設定します。AWS X-Ray でトレースする方法について、詳しくは[こちらのページ][1]をご参照ください。

## Datadog APM を使用した分散型トレース

Datadog APM は Datadog にトレースデータをリアルタイムで送信するため、Live Search ビューで全く、またはほとんど遅延なくトレースを監視できます。Datadog APM はテールベースのサンプリングを使用して、より適切なサンプリング決定を行います。 

Datadog Python、Node.js、Ruby トレースライブラリは、AWS Lambda の分散トレースをサポートし、より多くのランタイムが間もなく登場します。アプリケーションにトレースを追加する最も簡単な方法は、依存関係として Datadog トレースライブラリを含む [Datadog Lambda ライブラリ][2] を使用することです。

[サーバーレスホームページ][3]、[トレース検索および App Analytics][4]、[サービスマップ][5]でトレースを視覚化します。

### ログとトレースの相関

Datadog APM と Datadog Log Management の間の相関関係は、ログの属性としてトレース ID、スパン ID、env、service、version を挿入することで改善されています。これらのフィールドを使用すると、特定のサービスとバージョンに関連付けられた正確なログ、または観測されたトレースに関連付けられたすべてのログを見つけることができます。

### Live Search

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

APM Live Search を使用すると、過去 15 分間に収集されたスパンを任意のタグで即時に検索できます。スパンは、Datadog Agent から送信された時点で、Datadog がインデックス化する前に表示されます。

## Datadog APM を有効にする

Datadog Python、Node.js、Ruby トレースライブラリは、AWS Lambda の分散トレースをサポートし、より多くのランタイムが間もなく登場します。ご使用の関数にトレースを有効にするには、[インストール手順][6] に従ってください。

ご使用の関数のログを有効にせずに Datadog APM を有効にするには、Datadog Forwarder で `DdForwarderLog` 環境変数が `false` に設定することをご確認ください。

[1]: /ja/tracing/serverless_functions/
[2]: /ja/serverless/datadog_lambda_library/
[3]: https://app.datadoghq.com/functions
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/apm/map
[6]: https://docs.datadoghq.com/ja/serverless/installation