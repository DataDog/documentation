---
title: サーバーレス
kind: ドキュメント
aliases:
  - /ja/graphing/infrastructure/cloudfunctions
  - /ja/graphing/infrastructure/serverless_functions
  - /ja/graphing/infrastructure/serverless/
  - /ja/infrastructure/serverless/
  - /ja/tracing/serverless_functions/datadog_apm
  - /ja/integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
  - link: 'https://www.datadoghq.com/state-of-serverless'
    tag: ブログ
    text: サーバーレスの状態
  - link: /integrations/amazon_xray/
    tag: ドキュメント
    text: AWS X-Ray インテグレーション
  - link: /integrations/amazon_lambda/
    tag: ドキュメント
    text: AWS Lambda インテグレーション
  - link: 'https://www.datadoghq.com/blog/monitoring-lambda-containers/'
    tag: ブログ
    text: コンテナイメージを使用してデプロイされた AWS Lambda 関数を監視する
---
{{< vimeo 543362476 >}}


サーバーレスとは、すべての計算リソースをクラウドプロバイダーが管理し、ユーザーはイベント駆動型コードを記述したら、それをクラウドプロバイダーにアップロードして使用するという考え方です。[Datadog Serverless][1] は、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack コミュニティー</a>の <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャンネルで交わされるディスカッションを必ずチェックしましょう。</div>

## はじめに

1. [AWS インテグレーション][2]をインストールします。これにより、Datadog は AWS CloudWatch から Lambda メトリクスを取り込むことができます。
2. アプリケーションをインスツルメントします。サーバーレスアプリケーションをインスツルメントする手順については、以下の Lambda ランタイムを選択してください。

{{< partial name="serverless/getting-started-languages.html" >}}

## その他のサービス

### Azure App Service

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレースもサポートしています。Azure のトレーシング設定について詳しくは、[Azure App Service 拡張機能についてのドキュメント][3]を参照してください。

### Google Cloud Functions

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。Google Cloud Platform で実行中のサーバレス機能を監視するには、[Google Cloud Platform インテグレーション][4]を有効にします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/infrastructure/serverless/azure_app_services/#overview
[4]: /ja/integrations/google_cloud_platform/