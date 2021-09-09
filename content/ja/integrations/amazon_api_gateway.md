---
aliases:
  - /ja/integrations/awsapigateway/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: ゲートウェイエラー、キャッシュのヒット/ミス、リクエストレイテンシーを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_api_gateway/
draft: false
git_integration_title: amazon_api_gateway
has_logo: true
integration_id: amazon-api-gateway
integration_title: Amazon API Gateway
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_api_gateway
public_title: Datadog-Amazon API Gateway インテグレーション
short_description: Amazon API ゲートウェイエラーを追跡。
version: '1.0'
---
## 概要

Amazon API Gateway は、開発者があらゆる規模で API の作成、公開、保守、監視、およびセキュリティ保護を簡単に行えるフルマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての API Gateway メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`API Gateway` をオンにします。

2. API Gateway ステージにカスタムタグを適用するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `apigateway:GET`
    - `tag:GetResources`

3. [Datadog - AWS API Gateway インテグレーション][4]をインストールします。

**注**: CloudWatch の詳細メトリクスを有効にしている場合、ステージ内のすべてのリソースまたはルートで有効にする必要があります。無効の場合、Datadog の集計値が不正確になります。

### ログの収集

API Gateway ログを有効化します。

1. AWS コンソールで API Gateway に移動します。
2. 目的の API を選択し、Stages セクションに移動します。
3. **Logs** タブで、**Enable CloudWatch Logs** と **Enable Access Logging** を有効にします。
4. `INFO` レベルを選択して、すべてのリクエストが取得されるようにします。
5. **CloudWatch Group** の名前が `api-gateway` で開始することを確認します。
6. JSON 形式を選択し (CLF と CSV もサポートされています)、**Log format** ボックスに以下を追加します。

    ```text
    {
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

完了したら、[Datadog Log セクション][6]に移動し、ログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_api_gateway" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS API Gateway インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS API Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_api_gateway
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/