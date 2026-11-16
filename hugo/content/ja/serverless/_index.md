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
- link: /serverless/installation/
  tag: ドキュメント
  text: Serverless Monitoring のインストール
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Serverless Monitoring の詳細については、インタラクティブセッションにご参加ください
- link: https://www.datadoghq.com/state-of-serverless
  tag: ブログ
  text: サーバーレスの状態
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: ブログ
  text: Datadog で Azure Container Apps を監視する
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: リリースノート
  text: 最新の Serverless リリースをチェックしてください。(アプリログインが必要です)。
title: Serverless
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info">Datadog Slack コミュニティの <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャネルで行われているディスカッションをぜひチェックしてください<a href="https://chat.datadoghq.com/">。</a></div>

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Serverless Monitoring を活用することで、チームの俊敏性を維持し、運用オーバーヘッドを削減しながら、収益を生み出すアプリケーションの構築に時間を集中させる方法をご覧ください。
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1] は、サーバーレスコンピューティングからのリアルタイムメトリクス、ログ、トレースおよび関連するフルマネージド API、キュー、ストリーム、データストアを収集することで、サーバーレスアプリケーションを稼働させるすべてのマネージドサービスに関する完全な可視性を提供します。

Datadog は、[AWS Lambda](#aws-lambda)、[Azure App Service](#azure-app-service)、[Azure Container Apps](#azure-container-apps)、[Google Cloud Run](#google-cloud-run) を監視するためのソリューションを提供しています。

### AWS Lambda {#aws-lambda}

[Serverless Monitoring for AWS Lambda][2] を使用すると、AWS リソースからの高レベルメトリクスを Lambda 関数のメトリクスと関連付けられるため、問題をすばやく発見し調査を開始することができます。

[拡張 Lambda メトリクス][3]は、`aws.lambda.enhanced` のプレフィックス付きで Datadog に表示され、秒単位の粒度でほぼリアルタイムに利用できます。拡張 Lambda メトリクスを使用して、すべての Lambda 関数にわたるコールドスタート、推定 AWS コスト、タイムアウト、メモリ不足エラー、メモリ使用量に関するアラートや SLO を設定できます。

ログやトレースからメトリクスを生成したり、Datadog Lambda Extension を使用したり、Datadog Forwarder Lambda を使用することで、Lambda 関数から [カスタムメトリクス][4]を送信できます。

[分散型トレーシング][5]を使用すると、Serverless のトレースをメトリクスに接続し、アプリケーションのパフォーマンスをコンテキストが豊富な形で把握できます。Datadog Python、Node.js、Ruby、Go、Java、.NET SDK は、AWS Lambda の分散型トレーシングをサポートしています。

[デプロイ追跡][6]なら、サーバーレスコード、コンフィギュレーション、そしてデプロイメントの変更をメトリクス、トレース、そして関数からのログと関連付け、リアルタイムのインサイトによりこのような変更がアプリケーションの正常性やパフォーマンスに与える影響を確認できます。

### AWS Step Functions {#aws-step-functions}

AWS Step Functions は、サーバーレスのオーケストレーションサービスで、開発者は AWS でマルチステップのアプリケーションワークフローを作成し、管理することができます。

[AWS Step Functions インテグレーション][13]から取得したメトリクスやログを監視し、{{< ui >}}Serverless{{< /ui >}} アプリ表示内でクラウドネイティブなテレメトリを表示できます。

[実行トレース][14]でバグやボトルネックを特定できます。ステップ関数のトレースは、ステップ関数ログから生成でき、ステートマシンの実行パス、各ステップの入出力、ステップの実行時間を含む、詳細な実行情報を提供します。

ステップ関数の拡張メトリクスは、`aws.states.enhanced` のプレフィックス付きで Datadog に表示され、秒単位の粒度で利用でき、Datadog 内で直接生成されます。

### Azure App Service {#azure-app-service}

[Datadog の Azure App Service 向け拡張機能][7]は、Azure Web Apps のトレーシングもサポートしています。

[{{< ui >}}Azure App Service{{< /ui >}} ビュー][8]を使用して、以下のことができます。

- レイテンシーやエラーの多いアプリをすばやく特定

- Web Apps、Function Apps、App Service Plan の使用量を追跡

- アクティブなインスタンスの数を視覚化し、Datadog にトレースまたはログを送信している実行中のアプリを確認することで、App Service Plan のコストに関する洞察を取得

- App Service Plan で実行されているアプリをマッピングして、コストやパフォーマンスに影響を与える可能性のあるアプリを特定

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレーシングもサポートしています。Azure でのトレーシングの設定の詳細については、[Azure App Service][7] を参照してください。

### Azure Container Apps {#azure-container-apps}

Azure Container Apps は、コンテナベースのアプリケーションをデプロイおよびスケーリングするためのフルマネージド型サーバーレスプラットフォームです。Datadog は、[Azure インテグレーション][9]を通じて Container Apps を監視し、ログを収集します。

また、Datadog は、トレース、カスタムメトリクス、直接ログ収集を可能にする Serverless Agent で [Container Apps アプリケーションをインスツルメントする][10]ソリューションも提供しています。

### Google Cloud Run {#google-cloud-run}

Google Cloud Run は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。Google Cloud Platform 上で実行されるサーバーレス関数を監視するには、[Google Cloud Platform インテグレーション][11]を有効にします。

また、Datadog は、トレース、カスタムメトリクス、直接ログ収集を可能にする Serverless Agent で [Cloud Run アプリケーションをインスツルメントする][12]ソリューションも提供しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ja/serverless/aws_lambda
[3]: /ja/serverless/enhanced_lambda_metrics
[4]: /ja/serverless/custom_metrics
[5]: /ja/serverless/distributed_tracing
[6]: /ja/serverless/deployment_tracking
[7]: /ja/serverless/azure_app_service/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /ja/integrations/azure/#log-collection
[10]: /ja/serverless/azure_container_apps
[11]: /ja/integrations/google_cloud_platform/
[12]: /ja/serverless/google_cloud_run
[13]: /ja/integrations/amazon_step_functions
[14]: /ja/serverless/step_functions/installation