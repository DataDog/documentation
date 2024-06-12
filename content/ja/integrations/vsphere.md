---
app_id: vsphere
app_uuid: d9b9104f-ffd1-42be-8e18-d8a3aa289b98
assets:
  dashboards:
    VMware vSphere TKG - Overview: assets/dashboards/vmware_vsphere_tkg_-_overview.json
    vsphere-overview: assets/dashboards/vsphere_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: vsphere.vm.count
      metadata_path: metadata.csv
      prefix: vsphere.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: vSphere
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md
display_on_public_website: true
draft: false
git_integration_title: vsphere
integration_id: vsphere
integration_title: vSphere
integration_version: 6.3.0
is_public: true
manifest_version: 2.0.0
name: vsphere
public_title: vSphere
short_description: vSphere のリソース使用状況がアプリケーションに与える影響を把握
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::ネットワーク
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: vSphere のリソース使用状況がアプリケーションに与える影響を把握
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: vSphere
---



![Vsphere のグラフ][1]

## 概要

このチェックは、vSphere クラスターの CPU、ディスク、メモリ、ネットワークの使用量から、リソース使用状況のメトリクスを収集します。また、vCenter サーバーでイベントを監視し、それを Datadog へ送信します。

## セットアップ

### インストール

vSphere チェックは [Datadog Agent][2] パッケージに含まれています。vCenter サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

vCenter の **Administration** セクションで、`datadog-readonly` という読み取り専用のユーザーを追加し、監視が必要なリソースに読み取り専用のユーザー権限を適用します。リソース階層内のすべての子オブジェクトを監視するには、"Propagate to children” オプションを選択します。

次に、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `vsphere.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル vsphere.d/conf.yaml][4] を参照してください。

[Agent を再起動][5]すると、vSphere メトリクスとイベントが Datadog に送信されます。

**注**: Datadog Agent が vSphere アプライアンスソフトウェアと同じサーバー上にある必要はありません。vSphere チェックが有効になっている Agent は、vSphere アプライアンスサーバーをポイントするようにセットアップできます。各インスタンスに応じて `<HOSTNAME>` を更新してください。

### 互換性

Agent v6.18.0/7.18.0 に付属のチェック v5.0.0 より、新しい実装が導入されたことに伴い、コンフィギュレーションの変更が必要になりました。後方互換を維持するため、`use_legacy_check_version` というコンフィギュレーションパラメーターが一時的に利用可能になっています。
インテグレーションの旧バージョンをアップグレードする際、このパラメーターはコンフィグで未設定となっており、これまでの実装が強制されます。
初めてインテグレーションを構成する場合、または新機能 (タグ収集や高度なフィルターオプションなど) を利用したい場合は、[サンプル vsphere.d/conf.yaml][4] コンフィギュレーションファイルを参照してください。特に、`use_legacy_check_version: false` を必ず設定するようにしてください。

### 検証

[Agent の status サブコマンド][6]を実行し、Checks セクションで `vsphere` を探します。

## 収集データ

チェックコンフィギュレーションで設定した `collection_level` の値によっては、以下のすべてのメトリクスが収集されるわけではありません。特定のコレクションに対して収集されたメトリクスを表示するには、[データ収集レベル][7]を参照してください。

### メトリクス
{{< get-metrics-from-git "vsphere" >}}


#### インスタンスごとのメトリクスを収集

**注**: vSphere インテグレーションは、リソースごとのメトリクス（たとえば CPU に関するもの）とインスタンスごとのメトリクス（たとえば CPU コアに関するもの）の両方を収集できます。つまり、メトリクスにはリソースごとのみ、インスタンスごとのみ、または両方に関連するものがあります。
リソースとは、現実的または仮想的なマシンのことです。vSphere の VM、ホスト、データストア、クラスターで表されます。
インスタンスとは、リソース内に見つかる個々のエンティティのことです。vSphere のリソースに関する詳細は、[VMWare インフラストラクチャーアーキテクチャの概要ホワイトペーパー][9]をご参照ください。

デフォルトで、vSphere インテグレーションではリソースごとのメトリクスのみが収集されるため、インスタンスごとのメトリクスの一部が無視されることがあります。これは、`collect_per_instance_filters` オプションを使用して構成することが可能です。以下に例を示します。

```
collect_per_instance_filters:
  host:
    - 'disk\.totalLatency\.avg'
    - 'disk\.deviceReadLatency\.avg'
```

`disk` メトリクスは、ホストの各ディスクに特定されるため、収集するには `collect_per_instance_filters` を使用してこのメトリクスを有効にする必要があります。

### イベント

このチェックは vCenter イベントマネージャーでイベントを監視し、それを Datadog に送信します。以下のイベントタイプを送信します。

- AlarmStatusChangedEvent
- VmBeingHotMigratedEvent
- VmReconfiguredEvent
- VmPoweredOnEvent
- VmMigratedEvent
- TaskEvent
- VmMessageEvent
- VmSuspendedEvent
- VmPoweredOffEvent

### サービスのチェック
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
[2]: https://app.datadoghq.com/account/settings#agent
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