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
short_description: Amazon OpenSearch Service は、OpenSearch のデプロイと運用を簡単にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  configuration: README.md#Setup
  description: Amazon OpenSearch Service は、OpenSearch のデプロイと運用を簡単にします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon OpenSearch Service は、AWS Cloud における OpenSearch クラスターのデプロイ、運用、スケーリングを容易にするマネージドサービスです。OpenSearch は、ログ分析、リアルタイムアプリケーション監視、クリックストリーム分析などのユースケースに対応する、完全にオープンソースの検索・分析エンジンです。

このインテグレーションを有効にすると、OpenSearch Service のカスタムタグをすべて Datadog で確認することができます。なお、このインテグレーションは Amazon AWS OpenSearch Service 用であり、Amazon AWS の外部でホストされているスタンドアロンの Elasticsearch インスタンス用ではありません (そのようなインスタンスの場合は、代わりに [Elasticsearch インテグレーション][1]を使用してください)。

注: このインテグレーションでは、'es:ListTags'、'es:ListDomainNames'、'es:DescribeElasticsearchDomains' の権限が完全に有効になっている必要があります。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `ES` が有効になっていることを確認します。
2. [Datadog - Amazon OpenSearch Service インテグレーション][4]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_es" >}}


### ヘルプ

Amazon OpenSearch Service インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon OpenSearch Service インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/elastic
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/