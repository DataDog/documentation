---
app_id: amazon-api-gateway
app_uuid: 431bfc66-cc6e-40c5-b7f0-dbb2990322c8
assets:
  dashboards:
    Amazon API Gateway: assets/dashboards/aws_api_gateway_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.apigateway.latency
      metadata_path: metadata.csv
      prefix: aws.apigateway
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 166
    source_type_name: Amazon API Gateway
  monitors:
    '[AWS] API Gateway Elevated 4XX Error Rate for REST API {{apiname.name}}': assets/monitors/rec_mon_4xx_errors.json
    '[AWS] API Gateway Elevated 5XX Error Rate for REST API {{apiname.name}}': assets/monitors/rec_mon_5xx_errors.json
    '[AWS] API Gateway High Response Time (latency) on {{apiname.name}}': assets/monitors/rec_mon_high_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_api_gateway
integration_id: amazon-api-gateway
integration_title: Amazon API Gateway
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_api_gateway
public_title: Amazon API Gateway インテグレーション
short_description: Amazon API Gateway は API のマネージドサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  configuration: README.md#Setup
  description: Amazon API Gateway は API のマネージドサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon API Gateway インテグレーション
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon API Gateway は、開発者があらゆる規模で API の作成、公開、保守、監視、およびセキュリティ保護を簡単に行えるフルマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての API Gateway メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `API Gateway` が有効になっていることを確認します。

2. API Gateway ステージにカスタムタグを適用するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `apigateway:GET`
    - `tag:GetResources`

3. [Datadog - Amazon API Gateway インテグレーション][4]をインストールします。


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: CloudWatch の詳細メトリクスを有効にしている場合、ステージ内のすべてのリソースまたはルートで有効にする必要があります。無効の場合、Datadog の集計値が不正確になります。

### 収集データ

API Gateway ログを有効にするには

1. AWS コンソールで API Gateway に移動します。
2. 目的の API を選択し、Stages セクションに移動します。
3. **Logs** タブで、**Enable CloudWatch Logs** と **Enable Access Logging** を有効にします。
4. `INFO` レベルを選択して、すべてのリクエストが取得されるようにします。
5. **CloudWatch Group** の名前が `api-gateway` で開始することを確認します。
6. JSON 形式を選択し (CLF と CSV もサポートされています)、**Log format** ボックスに以下を追加します。

    ```text
    {
        "apiId": "$context.apiId",
        "stage": "$context.stage",
        "requestId":"$context.requestId",
        "ip":"$context.identity.sourceIp",
        "caller":"$context.identity.caller",
        "user":"$context.identity.user",
        "requestTime":$context.requestTimeEpoch,
        "httpMethod":"$context.httpMethod",
        "resourcePath":"$context.resourcePath",
        "status":$context.status,
        "protocol":"$context.protocol",
        "responseLength":$context.responseLength
    }
    ```

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で API Gateway ログを含む CloudWatch ロググループにトリガーを追加します。
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。

完了したら、[Logs ページ][6]に移動し、ログの検索を開始します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_api_gateway" >}}



### ヘルプ

Amazon API Gateway インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon API Gateway インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-api-gateway
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/