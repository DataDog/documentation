---
"categories":
- cloud
- aws
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon Translate metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_translate/"
"draft": false
"git_integration_title": "amazon_translate"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Translate"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_translate"
"public_title": "Datadog-Amazon Translate Integration"
"short_description": "Track key Amazon Translate metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Translate is a neural machine translation service for translating text to and from English across a breadth of supported languages.

Enable this integration to see all your Translate metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Translate` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Translate integration][3].

### Log collection

#### Enable logging

Configure Amazon Translate to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_translate` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Translate logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_translate" >}}


### イベント

The Amazon Translate integration does not include any events.

### サービスチェック

The Amazon Translate integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-translate
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_translate/amazon_translate_metadata.csv
[8]: https://docs.datadoghq.com/help/

