---
app_id: amazon-es
app_uuid: c00f4e38-7cc5-42ae-9ea1-519776f5f350
assets:
  dashboards:
    aws_es: assets/dashboards/amazon_es_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.es.cpuutilization
      metadata_path: metadata.csv
      prefix: aws.es.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 148
    source_type_name: Amazon ES
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_es
integration_id: amazon-es
integration_title: Amazon OpenSearch Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_es
public_title: Amazon OpenSearch Service
short_description: Amazon OpenSearch Service makes it easy to deploy and operate OpenSearch.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  configuration: README.md#Setup
  description: Amazon OpenSearch Service makes it easy to deploy and operate OpenSearch.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon OpenSearch Service is a managed service that makes it easy to deploy, operate, and scale OpenSearch clusters in the AWS Cloud. OpenSearch is a fully open-source search and analytics engine for use cases such as log analytics, real-time application monitoring, and clickstream analysis.

Enable this integration to see in Datadog all your OpenSearch Service custom tags. Please note, this integration is for Amazon AWS OpenSearch Service and NOT a standalone Elasticsearch instance hosted outside of Amazon AWS. (For such instances, use the [Elasticsearch integration][1] instead.)

Note: This integration requires the permissions 'es:ListTags', 'es:ListDomainNames' and 'es:DescribeElasticsearchDomains' to be fully enabled.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `ES` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon OpenSearch Service integration][4].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_es" >}}


### イベント

The Amazon OpenSearch Service integration does not include any events.

### サービスチェック

The Amazon OpenSearch Service integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://docs.datadoghq.com/ja/integrations/elastic
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/