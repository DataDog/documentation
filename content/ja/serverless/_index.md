---
aliases:
- /ja/graphing/infrastructure/cloudfunctions
- /ja/graphing/infrastructure/serverless_functions
- /ja/graphing/infrastructure/serverless/
- /ja/infrastructure/serverless/
- /ja/tracing/serverless_functions/datadog_apm
- /ja/integrations/amazon_lambda/docs.datadoghq.com/serverless/
cascade:
  algolia:
    rank: 70
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
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: ブログ
  text: Datadog で Azure Container Apps を監視する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: サーバーレスモニタリングについて詳しく知ることができるインタラクティブなセッションに参加できます
title: サーバーレス
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack コミュニティー</a>の <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャンネルで交わされるディスカッションを必ずチェックしましょう。</div>

[Datadog サーバーレスモニタリング][1]は、コンピューティングからのリアルタイムメトリクス、ログ、トレースおよび関連するフルマネージド API、キュー、ストリーム、データストアを収集することで、サーバーレスアプリケーションを稼働させるすべてのマネージドサービスに関する完全な可視性を提供します。

Datadog は、[AWS Lambda](#aws-lambda)、[Azure App Service](#azure-app-service)、[Azure Container Apps](#azure-container-apps)、[Google Cloud Run](#google-cloud-run) をモニタリングするためのソリューションを提供しています。

### AWS Lambda

[AWS Lambda のサーバーレスモニタリング][2]を使用すると、AWS リソースからの高レベルメトリクスを Lambda 関数のメトリクスと関連付けられるため、問題をすばやく発見し調査を開始することができます。

[高度な Lambda メトリクス][3]は、Datadog で `aws.lambda.enhanced` のプレフィックスで表示され、秒単位の粒度で、ほぼリアルタイムで利用できます。高度な Lambda メトリクスは、すべての Lambda 関数におけるコールドスタート、推定 AWS コスト、タイムアウト、メモリ不足エラー、そしてメモリ使用量に関するアラートや SLO に使用できます。

ログやトレースからメトリクスを生成したり、Datadog Lambda 拡張機能を使用したり、Datadog Forwarder Lambda を使用することで、Lambda 関数から [カスタムメトリクス][4]を送信できます。

[分散型トレーシング][5]なら、サーバーレストレースをメトリクスに接続することで、アプリケーションのパフォーマンスに関する豊富な情報を入手できます。Datadog Python、Node.js、Ruby、Go、Java、.NET トレーシングライブラリは、AWS Lambda の分散型トレーシングをサポートしています。

[デプロイ追跡][6]なら、サーバーレスコード、コンフィギュレーション、そしてデプロイメントの変更をメトリクス、トレース、そして関数からのログと関連付け、リアルタイムのインサイトによりこのような変更がアプリケーションの正常性やパフォーマンスに与える影響を確認できます。

### AWS Step Functions (公開ベータ版)

AWS Step Functions は、サーバーレスのオーケストレーションサービスで、開発者は AWS でマルチステップのアプリケーションワークフローを作成し、管理することができます。 

[AWS Step Functions インテグレーション][13]から取得したメトリクスやログを監視し、Serverless アプリビュー内でクラウドネイティブなテレメトリーを表示できます。

[実行トレース][14]でバグやボトルネックを特定できます。ステップ関数のトレースは、Step Function ログから生成でき、ステートマシンの実行パス、各ステップの入出力、ステップの実行時間を含む、詳細な実行情報を提供します。

Step Function の拡張メトリクスは、`aws.states.enhanced` のプレフィックス付きで Datadog に表示され、秒単位の粒度で利用でき、Datadog 内で直接生成されます。

### Azure App Service

[Datadog の Azure App Service 向け拡張機能][7]は、Azure Web Apps のトレーシングもサポートしています。

[Azure App Service ビュー][8]を使用すると、次のことができます。

- レイテンシーやエラーの多いアプリをすばやく特定

- Web App、Function App、App Service Plan の使用量を追跡

- アクティブなインスタンスの数を視覚化し、Datadog にトレースまたはログを送信している実行中のアプリを確認することで、App Service Plan のコストに関する洞察を取得

- App Service Plan で実行されているアプリをマッピングして、コストやパフォーマンスに影響を与える可能性のあるアプリを特定

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレースもサポートしています。Azure のトレーシング設定について詳しくは、[Azure App Service][7] を参照してください。

### Azure Container Apps

Azure Container Apps は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[Azure インテグレーション][9]を通して Container Apps のモニタリングとログ収集を提供しています。

また、Datadog は現在ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で [Container Apps アプリケーションをインスツルメントする][10]ソリューションも提供しています。

### Google Cloud Run

Google Cloud Run は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。Google Cloud Platform で実行中のサーバーレス関数を監視するには、[Google Cloud Platform インテグレーション][11]を有効にします。

また、Datadog は現在公開ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で [Container Run アプリケーションをインスツルメントする][12]ソリューションも提供しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ja/serverless/aws_lambda
[3]: /ja/serverless/enhanced_lambda_metrics
[4]: /ja/serverless/custom_metrics
[5]: /ja/serverless/distributed_tracing
[6]: /ja/serverless/deployment_tracking
[7]: /ja/infrastructure/serverless/azure_app_services/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /ja/integrations/azure/#log-collection
[10]: /ja/serverless/azure_container_apps
[11]: /ja/integrations/google_cloud_platform/
[12]: /ja/serverless/google_cloud_run
[13]: /ja/integrations/amazon_step_functions
[14]: /ja/serverless/step_functions/installation