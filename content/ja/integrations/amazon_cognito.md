---
"categories":
- aws
- cloud
- log collection
- mobile
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon Cognito metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_cognito/"
"draft": false
"git_integration_title": "amazon_cognito"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Cognito"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_cognito"
"public_title": "Datadog-Amazon Cognito Integration"
"short_description": "Track key Amazon Cognito metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Cognito is a service that you can use to create unique identities for your users, authenticate these identities with identity providers, and save mobile user data in the AWS Cloud.

Enable this integration to see your Cognito Advanced Security metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Cognito` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Cognito integration][3].

**Note**: Advanced Security must be enabled in AWS. See the AWS documentation to add [Advanced Security to a User Pool][4].

### Log collection

#### Enable logging

Configure Amazon Cognito to send logs either to a S3 bucket or to CloudWatch.

**Note**: Only user pool logs can be sent. Amazon does not support the sending of other Cognito logs.

**Note**: If you log to a S3 bucket, make sure that `amazon_cognito` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Cognito logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cognito" >}}


### イベント

The Amazon Cognito integration does not include any events.

### サービスチェック

The Amazon Cognito integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cognito
[4]: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[9]: https://docs.datadoghq.com/help/

