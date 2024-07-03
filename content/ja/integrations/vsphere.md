---
app_id: vsphere
app_uuid: d9b9104f-ffd1-42be-8e18-d8a3aa289b98
assets:
  dashboards:
    VMware vSphere - Property Metrics: assets/dashboards/vmware_vsphere-_property_metrics.json
    VMware vSphere TKG - Overview: assets/dashboards/vmware_vsphere_tkg_-_overview.json
    vsphere-overview: assets/dashboards/vsphere_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - vsphere.cpu.usage.avg
      - vsphere.vm.count
      metadata_path: metadata.csv
      prefix: vsphere.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 85
    source_type_name: vSphere
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md
display_on_public_website: true
draft: false
git_integration_title: vsphere
integration_id: vsphere
integration_title: vSphere
integration_version: 7.5.3
is_public: true
manifest_version: 2.0.0
name: vsphere
public_title: vSphere
short_description: Understand how vSphere resource usage affects your application.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Understand how vSphere resource usage affects your application.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: vSphere
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Vsphere Graph][1]

## Overview

This check collects resource usage metrics from your vSphere cluster-CPU, disk, memory, and network usage. It also watches your vCenter server for events and emits them to Datadog.

## セットアップ

### インストール

The vSphere check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your vCenter server.

### 構成

In the **Administration** section of vCenter, add a read-only user called `datadog-readonly` and apply the read-only user permissions to the resources that need monitoring. To monitor all child objects in the resource hierarchy, select the "Propagate to children" option. 

Then, edit the `vsphere.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample vsphere.d/conf.yaml][4] for all available configuration options.

[Restart the Agent][5] to start sending vSphere metrics and events to Datadog.

**Note**: The Datadog Agent doesn't need to be on the same server as the vSphere appliance software. An Agent with the vSphere check enabled can be set up to point to a vSphere appliance server. Update your `<HOSTNAME>` for each instance accordingly.

### Compatibility

Starting with v5.0.0 of the check, shipped in Agent v6.18.0/7.18.0, a new implementation was introduced which required changes to the configuration file. To preserve backwards compatibility, a configuration parameter called `use_legacy_check_version` was temporarily introduced.
If you are upgrading from an older version of the integration, this parameter is unset in the config and forces the Agent to use the older implementation.
If you are configuring the integration for the first time or if you want to benefit from the new features (like tag collection and advanced filtering options), see the [sample vsphere.d/conf.yaml][4] configuration file. In particular, make sure to set `use_legacy_check_version: false`.

### Validation

Run the [Agent's status subcommand][6] and look for `vsphere` under the Checks section.

## 収集データ

Depending of the `collection_level` value you set in your check configuration, not all metrics below are collected. See [Data Collection Levels][7] to display metrics collected for a given collection.

### メトリクス
{{< get-metrics-from-git "vsphere" >}}


#### Collecting per-instance metrics

**Note**: The vSphere integration has the ability to collect both per-resource metrics (such as those related to CPUs), and per-instance metrics (such as those related to CPU cores). As such, there are metrics that are only per-resource, per-instance, or both. 
A resource represents a physical or virtual representation of a machine. This can be represented by vm, host, datastore, cluster in vSphere.
An instance represents individual entities found within a resource. More information on vSphere resources can be found in the [VMWare Infrastructure Architecture Overview white paper][9].

By default, the vSphere integration only collects per-resource metrics, which causes some metrics that are per-instance to be ignored. These can be configured using the `collect_per_instance_filters` option. See below for an example:

```
collect_per_instance_filters:
  host:
    - 'disk\.totalLatency\.avg'
    - 'disk\.deviceReadLatency\.avg'
```

`disk` metrics are specific for each disk on the host, therefore these metrics need to be enabled using `collect_per_instance_filters` to be collected.

### イベント

This check watches vCenter's Event Manager for events and emits them to Datadog. The check defaults to emit the following event types:

- AlarmStatusChangedEvent
- VmBeingHotMigratedEvent
- VmReconfiguredEvent
- VmPoweredOnEvent
- VmMigratedEvent
- TaskEvent
- VmMessageEvent
- VmSuspendedEvent
- VmPoweredOffEvent

However, events can be added or removed using the `vsphere.d/conf.yaml` file. See the `include_events` parameter section in the [sample vsphere.d/conf.yaml][4].

### サービスチェック
{{< get-service-checks-from-git "vsphere" >}}


## トラブルシューティング

- [vSphere による重複ホストのトラブルシューティング][11]

### VM を制限する

VMWare インテグレーションで取り込む VM の数は、`vsphere.d/conf.yaml` ファイルを使用して制限することができます。[サンプル vsphere.d/conf.yaml][4] の `resource_filters` パラメーターのセクションを参照してください。

### vSphere Tanzu Kubernetes Grid (TKG) の監視

Datadog vSphere インテグレーションは、[TKG][12] VM とコントロールプレーン VM からメトリクスとイベントを自動的に収集します。コンテナ、ポッド、ノードレベルのメトリクスを含む、TKG クラスターのより詳細な情報を収集するには、クラスターに [Datadog Agent][13] をインストールすることができます。TKG に特化したコンフィギュレーションファイルの例については、[ディストリビューションドキュメント][14]を参照してください。

## その他の参考資料

- [Datadog で vSphere を監視する][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.monitoring.doc/GUID-25800DE4-68E5-41CC-82D9-8811E27924BC.html
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://www.vmware.com/pdf/vi_architecture_wp.pdf
[10]: https://github.com/DataDog/integrations-core/blob/master/vsphere/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[12]: https://tanzu.vmware.com/kubernetes-grid
[13]: https://docs.datadoghq.com/ja/containers/kubernetes/installation/?tab=operator
[14]: https://docs.datadoghq.com/ja/containers/kubernetes/distributions/?tab=operator#TKG
[15]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers