---
"categories":
- automation
- aws
- cloud
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon Textract metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_textract/"
"draft": false
"git_integration_title": "amazon_textract"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Textract"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_textract"
"public_title": "Datadog-Amazon Textract Integration"
"short_description": "Track key Amazon Textract metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->

## Overview

Amazon Textract is a machine learning service that automatically extracts text, handwriting, and data from scanned documents.

Enable this integration to see all your Amazon Textract metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Textract` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Textract integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_textract" >}}


### イベント

The Amazon Textract integration does not include any events.

### サービスチェック

The Amazon Textract integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-textract
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_textract/amazon_textract_metadata.csv
[5]: https://docs.datadoghq.com/help/

