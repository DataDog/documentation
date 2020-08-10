---
title: サーバーレス
kind: ドキュメント
aliases:
  - /ja/graphing/infrastructure/cloudfunctions
  - /ja/graphing/infrastructure/serverless_functions
  - /ja/graphing/infrastructure/serverless/
  - /ja/infrastructure/serverless/
further_reading:
  - link: /integrations/amazon_xray/
    tag: X-Ray インテグレーション
    text: AWS X-Ray インテグレーション
  - link: /integrations/amazon_lambda/
    tag: AWS Lambda インテグレーション
    text: AWS Lambda インテグレーション
---
{{< img src="serverless/datadog_serverless_overview.png" alt="Datadog サーバレスの概要"  style="width:100%;">}}

## 概要

サーバーレスとは、すべての計算リソースをクラウドプロバイダーが管理し、ユーザーはイベント駆動型コードを記述したら、それをクラウドプロバイダーにアップロードして使用するという考え方です。[Datadog Serverless][1] は、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack コミュニティー</a>の <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> チャンネルで交わされるディスカッションを必ずチェックしましょう。</div>

## はじめに

### 1. AWS インテグレーションをインストール

[AWS インテグレーション][2] をインストールすることから始めます。これにより、Datadog は AWS Lambda から Amazon CloudWatch メトリクスを取り込めるようになります。AWS インテグレーションをインストールすることで、AWS Lambda トレース、拡張メトリクス、カスタムカスタムメトリクス、ログの取り込みに必要な Datadog Forwarder も構成されます。

### 2. アプリケーションをインスツルメント

{{< partial name="serverless/getting-started-languages.html" >}}

## AWS Lambda をお使いではありませんか？

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