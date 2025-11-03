---
app_id: snmp
app_uuid: 4fc8e176-17ce-4346-9544-bec30ac47a00
assets:
  dashboards:
    BGP & OSPF Overview: assets/dashboards/bgp_ospf_overview.json
    Datacenter Overview: assets/dashboards/datacenter_overview.json
    Datadog NDM Environment: assets/dashboards/ndm_troubleshooting.json
    Interface Performance: assets/dashboards/interface_performance.json
    Netflow Monitoring: assets/dashboards/netflow_monitoring.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snmp.devices_monitored
      metadata_path: metadata.csv
      prefix: snmp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 78
    source_type_name: SNMP
  monitors:
    BGP peer state is stuck in an unestablished state: assets/monitors/bgp_peer_state_stuck.json
    Device is down: assets/monitors/device_down.json
    Interface bandwidth usage for incoming traffic is high: assets/monitors/high_interface_bandwidth_usage_in.json
    Interface bandwidth usage for outgoing traffic is high: assets/monitors/high_interface_bandwidth_usage_out.json
    Interface is down on SNMP device: assets/monitors/interface_down.json
    LinkDown Trap Interface is down on SNMP device: assets/monitors/traps_linkDown.json
    SNMP Device is unreachable: assets/monitors/device_unreachable.json
    SNMP device CPU usage is high: assets/monitors/high_cpu.json
    SNMP device memory usage is high: assets/monitors/high_memory.json
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
- https://github.com/DataDog/integrations-core/blob/master/snmp/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp
integration_id: snmp
integration_title: SNMP
integration_version: 10.0.0
is_public: true
manifest_version: 2.0.0
name: snmp
public_title: SNMP
short_description: ネットワークデバイスから SNMP メトリクスを収集。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ネットワーク
  - Category::Notifications
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: ネットワークデバイスから SNMP メトリクスを収集。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  - resource_type: guide
    url: https://datadoghq.dev/integrations-core/tutorials/snmp/introduction/
  support: README.md#Support
  title: SNMP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Simple Network Management Protocol (SNMP) は、ルーター、スイッチ、サーバー、ファイアウォールなど、ネットワークに接続されたデバイスの監視に使用される標準のプロトコルです。このチェックは、ネットワークデバイスから SNMP メトリクスを収集します。

SNMP は、sysObjectID (システムオブジェクト識別子) を使用してデバイスを一意に識別し、OID (オブジェクト識別子) を使用して管理するオブジェクトを一意に識別します。OID の形式は階層ツリーパターンになっています。ルートの下は番号 1 の ISO、次のレベルは番号 3 の ORG で、各レベルは `.` で区切られます。

MIB (管理情報ベース) は、OID を可読名に変換する翻訳機として機能すると共に、階層の一部を編成します。ツリーの構造上、ほとんどの SNMP 値の先頭には同じオブジェクトが付加されます。

* `1.3.6.1.1`: (MIB-II) アップタイム、インターフェイス、ネットワークスタックなどのシステム情報を保持する標準です。
* `1.3.6.1.4.1`: ベンダー固有の情報を保持する標準です。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][1]のドキュメントを参照してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][2]
* [SNMP 入門][3]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup
[2]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/introduction/
[4]: https://docs.datadoghq.com/ja/help/