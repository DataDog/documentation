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
  - link: /integrations/amazon_xray/
    tag: X-Ray インテグレーション
    text: AWS X-Ray インテグレーション
  - link: /integrations/amazon_lambda/
    tag: AWS Lambda インテグレーション
    text: AWS Lambda インテグレーション
  - link: 'https://www.datadoghq.com/blog/monitoring-lambda-containers/'
    tag: ブログ
    text: コンテナイメージを使用してデプロイされた AWS Lambda 関数を監視する
---
{{< img src="serverless/datadog_serverless_overview.png" alt="Datadog サーバレスの概要"  style="width:100%;">}}

## 概要

サーバーレスとは、すべての計算リソースをクラウドプロバイダーが管理し、ユーザーはイベント駆動型コードを記述したら、それをクラウドプロバイダーにアップロードして使用するという考え方です。[Datadog Serverless][1] は、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack コミュニティー</a>の <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャンネルで交わされるディスカッションを必ずチェックしましょう。</div>

## はじめに

1. [AWS インテグレーション][2]をインストールします。これにより、Datadog は AWS CloudWatch から Lambda メトリクスを取り込むことができます。
2. AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][3]をインストールします。
   **注**: [AWS インテグレーション][2] CloudFormation スタックの一部として Forwarder 関数がすでにインストールされている場合は、この手順をスキップしてください。
3. アプリケーションをインスツルメントします。サーバーレスアプリケーションをインスツルメントする手順については、以下の Lambda ランタイムを選択してください。

{{< partial name="serverless/getting-started-languages.html" >}}

## その他のサービス

### Azure App Service

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレースもサポートしています。Azure のトレーシング設定について詳しくは、[Azure App Service 拡張機能についてのドキュメント][4]を参照してください。

### Google Cloud Functions

Google Cloud Functions は、単一目的の小規模な関数を作成できる、軽量、イベントベース、かつ非同期のコンピューティングソリューションです。Google Cloud Platform で実行中のサーバレス機能を監視するには、[Google Cloud Platform インテグレーション][5]を有効にします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/serverless/forwarder
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/google_cloud_platform/