---
categories:
- cloud
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key Amazon Managed Workflows for Apache Airflow (MWAA) metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: ''
integration_title: Amazon Managed Workflows for Apache Airflow (MWAA)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mwaa
public_title: Datadog-Amazon Managed Workflows for Apache Airflow (MWAA) Integration
short_description: Track key Amazon Managed Workflows for Apache Airflow (MWAA) metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Managed Workflows for Apache Airflow (MWAA) is a managed service
for Apache Airflow that makes it easy for you to build and manage your workflows
in the cloud.

Enable this integration to see all your Amazon MWAA metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `MWAA` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Managed Workflows for Apache Airflow (MWAA) Integration][3].

### Log collection

1. Configure AWS MWAA to [send logs to CloudWatch][4].
2. [Send the logs to Datadog][5].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mwaa" >}}


### イベント

The Amazon Managed Workflows for Apache Airflow (MWAA) integration does not include any events.

### サービスチェック

The Amazon Managed Workflows for Apache Airflow (MWAA) integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mwaa
[4]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[5]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/