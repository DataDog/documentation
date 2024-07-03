---
app_id: snmp-american-power-conversion
app_uuid: 6b5325b8-443d-42e0-8545-f7dc42acacb4
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10329
    source_type_name: American Power Conversion
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- notifications
- snmp
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_american_power_conversion/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_american_power_conversion
integration_id: snmp-american-power-conversion
integration_title: American Power Conversion
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_american_power_conversion
public_title: American Power Conversion
short_description: Collect SNMP metrics from your American Power Conversion network
  devices.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Collect SNMP metrics from your American Power Conversion network devices.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: American Power Conversion
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

APC provides IT physical infrastructure products including surge protection, and battery back-up power.

Configure the APC integration and collect SNMP metrics from devices such as APC Uninterruptible Power Supply (UPS) products.

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## 収集データ

### メトリクス

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## トラブルシューティング

Need help? Contact [Datadog support][3].

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][4]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/