---
"aliases":
- "/integrations/awsworkspaces/"
"categories":
- "cloud"
- "aws"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "失敗した接続、セッションのレイテンシー、正常に動作していないワークスペースなどを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_workspaces/"
"draft": false
"git_integration_title": "amazon_workspaces"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon WorkSpaces"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_workspaces"
"public_title": "Datadog-Amazon WorkSpaces Integration"
"short_description": "Track failed connections, session latency, unhealthy workspaces, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon WorkSpaces is a fully managed, secure desktop computing service which runs on the AWS cloud.

Enable this integration to see in Datadog all your Amazon WorkSpaces metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first. There are no other installation steps that need to be performed.

### Metric collection

1. In the [AWS integration page][2], ensure that `WorkSpaces` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon WorkSpaces integration][3].

### Log collection

#### Enable logging

Configure Amazon WorkSpaces to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_workspace` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon WorkSpaces logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_workspaces" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon WorkSpaces integration does not include any events.

### サービスチェック

The Amazon WorkSpaces integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-workspaces
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_workspaces/amazon_workspaces_metadata.csv
[8]: https://docs.datadoghq.com/help/

