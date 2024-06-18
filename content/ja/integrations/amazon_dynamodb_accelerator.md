---
categories:
- AWS
- キャッシュ
- クラウド
- ログの収集
dependencies: []
description: Amazon DynamoDB Accelerator (DAX) のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb_accelerator/
draft: false
git_integration_title: amazon_dynamodb_accelerator
has_logo: true
integration_id: amazon-dynamodb-accelerator
integration_title: Amazon DynamoDB Accelerator (DAX)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_dynamodb_accelerator
public_title: Datadog-Amazon DynamoDB Accelerator (DAX) インテグレーション
short_description: Amazon DynamoDB Accelerator (DAX) のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

Amazon DynamoDB Accelerator (DAX) は DynamoDB と互換性のあるキャッシュサービスで、要求の厳しいアプリケーションで高速なインメモリパフォーマンスの恩恵を受けることができます。

このインテグレーションを有効にすると、すべての Amazon DynamoDB Accelerator (DAX) メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `DynamoDBAccelerator` にチェックが入っていることを
   確認します。
2. [Datadog - Amazon DynamoDB Accelerator インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_dynamodb_accelerator" >}}


### イベント

Amazon DynamoDB Accelerator (DAX) インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon DynamoDB Accelerator (DAX) インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-DynamoDB-accelerator
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_DynamoDB_accelerator/amazon_DynamoDB_accelerator_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/