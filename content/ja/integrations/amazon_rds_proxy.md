---
categories:
- aws
- cloud
- data stores
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key Amazon RDS Proxy metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
draft: false
git_integration_title: amazon_rds_proxy
has_logo: true
integration_id: ''
integration_title: Amazon RDS Proxy
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_rds_proxy
public_title: Datadog-Amazon RDS Proxy Integration
short_description: Track key Amazon RDS Proxy metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon RDS Proxy is a fully managed, highly available database proxy for Amazon Relational Database Service (RDS) that makes applications more scalable, more resilient to database failures, and more secure.

Enable this integration to see all your RDS Proxy metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].
Enabling the [Amazon RDS integration][2] is also required.

### Metric collection

1. In the [AWS integration page][3], ensure that `RDS Proxy` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon RDS Proxy integration][4].

### Log collection

#### Enable logging

When creating an RDS Proxy, logging can be enabled in the advanced configuration. Follow instructions in [Getting started with RDS Proxy][5] to start sending your RDS Proxy logs to Cloudwatch.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][6].
2. Once the Lambda function is installed, manually add a trigger on the CloudWatch log group that contains your RDS Proxy logs. Select the corresponding CloudWatch log group, add a filter name (optional), and add the trigger.

Once done, go to the  [Datadog Log Explorer][7] to analyze your logs.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_rds_proxy" >}}


### イベント

The Amazon RDS Proxy integration does not include any events.

### サービスチェック

The Amazon RDS Proxy integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_rds/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-rds-proxy
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html#rds-proxy-creating
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds_proxy/amazon_rds_proxy_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/