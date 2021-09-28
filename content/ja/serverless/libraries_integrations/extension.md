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

Datadog 拡張機能は、カスタムメトリクス、拡張メトリクス、トレース、およびログを[非同期的に][4]送信します。拡張機能を使用した Lambda ログの送信は、すべての Lambda ランタイムでサポートされています。カスタム メトリクス、強化されたメトリクス、およびトレースの送信は、Node.js、Python、および Go Lambda ランタイムでサポートされています。

## インストール

Datadog Lambda 拡張機能をインストールしてお使いの AWS サーバーレスアプリケーションをインスツルメントする方法については、[サーバーレスインストール手順][5]を参照してください。

## ログの収集

拡張機能を使用した AWS Lambda ログの Datadog への送信を無効にするには、Lambda 関数で環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。

## トレースの収集

拡張機能を使用した AWS Lambda トレースの Datadog への送信を無効にするには、Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。

## タグ付け

Datadog では、拡張機能を使用する際、Lambda 関数に以下の環境変数を追加してタグを適用することを推奨しています。

- `DD_ENV`: Datadog に `env` タグを設定します。このタグを使って、ステージング環境、開発環境、本番環境を分けることができます。
- `DD_SERVICE`: Datadog に `service` タグを設定します。関連するLambda 関数を 1 つのサービスにまとめる際に使用します。
- `DD_VERSION`: Datadog の `version` タグを設定します。[デプロイ追跡][6]を有効にするために使用します。
- `DD_TAGS`: Datadog のカスタムタグを設定します。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります (例: `layer:api,team:intake`)

Datadog の AWS インテグレーションを有効にしている場合、AWS Lambda 関数に適用された AWS リソースタグは Datadog でも自動的に適用されます。

## オーバーヘッド

Datadog Lambda 拡張機能を初期化する際には、Lambda 関数のコールドスタート (init の実行時間が増加) に多少のオーバーヘッドが発生します。Datadog は Lambda 拡張機能のパフォーマンスを継続的に最適化しているため、常に最新のリリースを使用することをお勧めします。

また、Lambda 関数で報告された実行時間が増加する場合もありますが、これは Datadog Lambda 拡張機能が Datadog API にデータをフラッシュバックする必要があるためです。拡張機能がデータをフラッシュするのにかかった時間は実行時間の一部として報告されますが、この報告は AWS が関数のレスポンスをクライアントに*返した後*に行われます。つまり、実行時間が延びたからといって Lambda 関数が遅くなる訳ではありません。その他の技術的な詳細は、こちらの [AWS についてのブログ記事][7]をご覧ください。

デフォルトでは、拡張機能は各呼び出しの最後にデータを Datadog に送り返します。これにより、トラフィックの少ないアプリケーション、cron ジョブ、および手動テストからの散発的な呼び出しに対するデータ到着の遅延を回避できます。拡張機能が安定した頻繁な呼び出しパターン (1 分に 1 回以上) を検出すると、複数の呼び出しからデータをバッチ処理し、期限が来た呼び出しの最初に定期的にフラッシュを行います。これは、*関数が頻繁に呼び出されるようになるほど、呼び出しごとの平均実行時間のオーバーヘッドが低くなる*ことを意味します。

Datadog サイトから離れた地域にデプロイされた Lambda 関数の場合、例えば eu-west-1 にデプロイされた Lambda 関数が US1 の Datadog サイトにデータを報告すると、ネットワークレイテンシーの影響で実行時間のオーバーヘッドが高くなることがあります。Lambda 関数で環境変数 `DD_SERVERLESS_FLUSH_STRATEGY` と値 `periodically,30000` を設定して、デフォルトの 10 秒ごとではなく 30 秒ごとにデータをフラッシュするようにすると、通常は呼び出しごとの実行時間の*平均*オーバーヘッドが大幅に低くなります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/enhanced_lambda_metrics
[2]: /ja/serverless/custom_metrics
[3]: /ja/serverless/distributed_tracing
[4]: /ja/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[5]: /ja/serverless/installation
[6]: /ja/tracing/deployment_tracking/
[7]: https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/