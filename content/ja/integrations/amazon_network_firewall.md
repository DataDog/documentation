---
"categories":
- cloud
- aws
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Monitor your AWS Network Firewall."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_network_firewall/"
"draft": false
"git_integration_title": "amazon_network_firewall"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Network Firewall"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_network_firewall"
"public_title": "Datadog-AWS Network Firewall"
"short_description": "Monitor your AWS Network Firewall."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Network Firewall is a stateful, service that allows customers to filter traffic at the perimeter of their VPC.

Enable this integration to see all of your AWS Network Firewall metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `Network Firewall` is enabled under the `Metric Collection` tab.

2. Install the [Datadog - AWS Network Firewall integration][3].

### Log collection

#### Enable logging

Configure AWS Network Firewall to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_network_firewall` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Network Firewall logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_network_firewall" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS Network Firewall integration does not include any events.

### サービスチェック

The AWS Network Firewall integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-firewall
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_network_firewall/amazon_network_firewall_metadata.csv
[8]: https://docs.datadoghq.com/help/

