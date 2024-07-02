---
"categories":
- aws
- caching
- cloud
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon DynamoDB Accelerator (DAX) metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_dynamodb_accelerator/"
"draft": false
"git_integration_title": "amazon_dynamodb_accelerator"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon DynamoDB Accelerator (DAX)"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_dynamodb_accelerator"
"public_title": "Datadog-Amazon DynamoDB Accelerator (DAX) Integration"
"short_description": "Track key Amazon DynamoDB Accelerator (DAX) metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon DynamoDB Accelerator (DAX) is a DynamoDB-compatible caching service that enables you to benefit from fast in-memory performance for demanding applications.

Enable this integration to see all your Amazon DynamoDB Accelerator (DAX) metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration tile][2], ensure that `DynamoDBAccelerator` is checked
   under metric collection.
2. Install the [Datadog - Amazon DynamoDB Accelerator integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_dynamodb_accelerator" >}}


### イベント

The Amazon DynamoDB Accelerator (DAX) integration does not include any events.

### サービスチェック

The Amazon DynamoDB Accelerator (DAX) integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-DynamoDB-accelerator
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_DynamoDB_accelerator/amazon_DynamoDB_accelerator_metadata.csv
[5]: https://docs.datadoghq.com/help/

