---
"app_id": "amazon-network-monitor"
"app_uuid": "6130fd16-af31-4424-bf08-80e01ec1846d"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.networkmonitor.health_indicator
      "metadata_path": metadata.csv
      "prefix": aws.networkmonitor.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10444"
    "source_type_name": Amazon CloudWatch Network Monitor
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- モニター
- cloud
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_network_monitor"
"integration_id": "amazon-network-monitor"
"integration_title": "Amazon CloudWatch Network Monitor"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_network_monitor"
"public_title": "Amazon CloudWatch Network Monitor"
"short_description": "Amazon CloudWatch Network Monitor provides monitoring for global networks."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  "configuration": "README.md#Setup"
  "description": Amazon CloudWatch Network Monitor provides monitoring for global networks.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/amazon-cloudwatch-network-monitor-datadog/"
  "support": "README.md#Support"
  "title": Amazon CloudWatch Network Monitor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon CloudWatch Network Monitor is a service that provides centralized management and monitoring for global networks on AWS or on-premises.

Enable this integration to get visibility into metrics from Amazon CloudWatch Network Monitor.

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

### メトリクスの収集

Install the [Datadog - CloudWatch Network Monitor integration][2].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_network_monitor" >}}


### イベント

The CloudWatch Network Monitor integration does not include any events.

### サービスチェック

The CloudWatch Network Monitor integration does not include any service checks.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Track and alert on Amazon CloudWatch Network Monitor metrics with Datadog][5]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-network-monitor
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_network_monitor/metadata.csv
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/amazon-cloudwatch-network-monitor-datadog/

