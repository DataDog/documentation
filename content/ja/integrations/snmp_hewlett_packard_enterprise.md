---
app_id: snmp-hewlett-packard-enterprise
app_uuid: 48134faf-2af6-4512-9853-ebe2a8620515
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10332
    source_type_name: Hewlett-Packard Enterprise
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- notifications
- snmp
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_hewlett_packard_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_hewlett_packard_enterprise
integration_id: snmp-hewlett-packard-enterprise
integration_title: Hewlett-Packard Enterprise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_hewlett_packard_enterprise
public_title: Hewlett-Packard Enterprise
short_description: Hewlett-Packard Enterprise のネットワークデバイスから SNMP メトリクスを収集します。
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Hewlett-Packard Enterprise のネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Hewlett-Packard Enterprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

HPE is a multinational IT company that develops and works in servers, networking, data storage, and containerization software. 

Configure the HPE integration and collect SNMP metrics from devices such as HP iLO and HP Proliant. 

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## Setup

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## Vendor profiles

Specific supported vendor profiles for this integration can be found on the [network vendors][3] page.

## Data Collected

### Metrics

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][5]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/