---
aliases:
- /ja/graphing/infrastructure/cloudfunctions
- /ja/graphing/infrastructure/serverless_functions
- /ja/graphing/infrastructure/serverless/
- /ja/infrastructure/serverless/
- /ja/tracing/serverless_functions/datadog_apm
- /ja/integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: リリースノート
  text: Serverless の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/state-of-serverless
  tag: ブログ
  text: サーバーレスの状態
- link: /serverless/installation/
  tag: ドキュメント
  text: サーバーレスモニタリングのインストール
- link: /serverless/configuration/
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: ブログ
  text: コンテナイメージを使用してデプロイされた AWS Lambda 関数を監視する
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: ブログ
  text: サーバーレスログを収集、管理するためのベストプラクティス
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: ブログ
  text: 実稼働準備が整った AWS サーバーレスアプリケーションの設計
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: ブログ
  text: AWS の Well-Architected フレームワークに従うサーバーレスアプリケーション構築のためのベストプラクティス
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: ブログ
  text: AWS Lambda 関数のエフェメラルストレージ使用量を監視。
kind: ドキュメント
title: サーバーレス
---

{{< vimeo 543362476 >}}

<br/>

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack コミュニティー</a>の <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャンネルで交わされるディスカッションを必ずチェックしましょう。</div>

[Datadog サーバーレスモニタリング][1]は、コンピューティングからのリアルタイムメトリクス、ログ、トレースおよび関連するフルマネージド API、キュー、ストリーム、データストアを収集することで、サーバーレスアプリケーションを稼働させるすべてのマネージドサービスに関する完全な可視性を提供します。

以下のセクションでは、AWS サーバーレスアプリケーションおよび Lambda 関数を監視するための Datadog ソリューションについて解説します。また、[Azure サーバーレス][2]および [Google サーバーレス][3]アプリケーションのモニタリングに関するサポートについてもご紹介します。

## AWS Lambda のための Datadog サーバーレスモニタリングを確認する

まずは、[インストール手順][4]に従って、サーバーレスアプリケーションからメトリクス、トレース、ログを収集します。

### サーバーレスビューでサーバーレススタック全体を監視

サーバーレスビューを使用すると、AWS リソースからの高レベルメトリクスを Lambda 関数と関連付けられるため、問題をすばやく発見し調査を開始することができます。

デフォルトで、サーバーレスビューではサービス別にサーバーレスリソースがグループ化され、アプリケーションの各部のパフォーマンスを視覚化できます。各サービスに属する関数と、それを呼び出すリソース (Amazon API Gateway、SNS、SQS、DynamoDB、S3、EventBridge、Kinesis) を確認できます。

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog サーバーレスモニタリング"  style="width:100%;" >}}

### 呼び出しペイロードを監視することで、AWS Lambda 関数の障害を迅速に解決する

Datadog で自動的に関数リクエストが収集されてすべての関数呼び出しに応答し、問題のトラブルシューティングに役立つ重要な情報が提供されます。たとえば、ある Lambda 関数に障害が発生しているという通知を受けた場合、関連するリクエストのペイロードを分析し、不足しているパラメーター、リソースアドレスの入力間違い、または障害の背後にある構成ミスなどをチェックすることができます。

失敗したリクエストの構成ミスを特定することで、開発環境で問題を容易に再生し、バグ修正を確認するためのテストを実行できます。

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog サーバーレスモニタリング"  style="width:100%;" >}}

### Lambda 関数環境全体で問題をアラートするリアルタイムメトリクス

Datadog の高度な Lambda メトリクスは、Datadog で `aws.lambda.enhanced` のプレフィックスで表示され、秒単位の粒度で、ほぼリアルタイムで利用できます。高度な Lambda メトリクスは、すべての Lambda 関数におけるコールドスタート、推定 AWS コスト、タイムアウト、メモリ不足エラー、そしてメモリ使用量に関するアラートや SLO に使用できます。これにより、サーバーレス環境で発生するパフォーマンスの問題を確認し、直ちにトラブルシューティングすることが可能になります。

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog サーバーレスモニタリング"  style="width:100%;" >}}

### デプロイメント追跡でサーバーレスコンフィギュレーションの変更を監視

サーバーレスコード、コンフィギュレーション、そしてデプロイメントの変更をメトリクス、トレース、そして関数からのログと容易に関連付け、リアルタイムのインサイトによりこのような変更がアプリケーションの正常性やパフォーマンスに与える影響を確認できます。

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog サーバーレスモニタリング"  style="width:100%;" >}}

## 他のサーバーレスクラウドのための Datadog サーバーレスモニタリング

### Azure App Service

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレーシングもサポートしています。

[Azure App Service ビュー][5]を使用すると、次のことができます。

- レイテンシーやエラーの多いアプリをすばやく特定

- Web App、Function App、App Service Plan の使用量を追跡

- アクティブなインスタンスの数を視覚化し、Datadog にトレースまたはログを送信している実行中のアプリを確認することで、App Service Plan のコストに関する洞察を取得

- App Service Plan で実行されているアプリをマッピングして、コストやパフォーマンスに影響を与える可能性のあるアプリを特定

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレースもサポートしています。Azure のトレーシング設定について詳しくは、[Azure App Service 拡張機能についてのドキュメント][6]を参照してください。

### Google Cloud Functions

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。Google Cloud Platform で実行中のサーバレス機能を監視するには、[Google Cloud Platform インテグレーション][7]を有効にします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ja/serverless/#azure-app-service
[3]: /ja/serverless/#google-cloud-functions
[4]: /ja/serverless/installation
[5]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[6]: /ja/infrastructure/serverless/azure_app_services/#overview
[7]: /ja/integrations/google_cloud_platform/