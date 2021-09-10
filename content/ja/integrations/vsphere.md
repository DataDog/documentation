---
aliases:
  - /ja/integrations/vmware/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    vsphere-overview: assets/dashboards/vsphere_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: true
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md
display_name: vSphere
draft: false
git_integration_title: vsphere
guid: 930b1839-cc1f-4e7a-b706-0e8cf3218464
integration_id: vsphere
integration_title: vSphere
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vsphere.
metric_to_check: vsphere.vm.count
name: vsphere
public_title: Datadog-vSphere インテグレーション
short_description: vSphere のリソース使用状況がアプリケーションに与える影響を把握
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Vsphere のグラフ][1]

## 概要

このチェックは、vSphere クラスターの CPU、ディスク、メモリ、ネットワークの使用量から、リソース使用状況のメトリクスを収集します。また、vCenter サーバーでイベントを監視し、それを Datadog へ送信します。

## セットアップ

### インストール

vSphere チェックは [Datadog Agent][2] パッケージに含まれています。vCenter サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

vCenter の **管理** セクションで、`datadog-readonly` という読み取り専用ユーザーを追加します。

次に、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `vsphere.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル vsphere.d/conf.yaml][4] を参照してください。

[Agent を再起動][5]すると、vSphere メトリクスとイベントが Datadog に送信されます。

**注**: Datadog Agent が vSphere アプライアンスソフトウェアと同じサーバー上にある必要はありません。vSphere チェックが有効になっている Agent は、OS がどこで実行されているかにかかわらず vSphere アプライアンスサーバーをポイントするようにセットアップできます。各インスタンスに応じて `<HOSTNAME>` を更新してください。

### 互換性

Agent バージョン 6.18.0/7.18.0 に付属のチェックバージョン 5.0.0 より、インテグレーションの新しい実装が導入されたことに伴い、コンフィギュレーションの変更が必要になりました。後方互換を維持するため、`use_legacy_implementation` というコンフィギュレーションパラメーターが一時的に利用可能になっています。
インテグレーションの旧バージョンをアップグレードする際、このパラメーターはコンフィグで未設定となっており、これまでの実装が強制されます。
初めてインテグレーションを構成する場合、または新機能 (タグ収集や高度なフィルターオプションなど) を利用したい場合は、[サンプル vsphere.d/conf.yaml][4] コンフィギュレーションファイルを参照してください。特に、`use_legacy_implementation: false` を必ず設定するようにしてください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `vsphere` を探します。

## 収集データ

チェックコンフィギュレーションで設定した `collection_level` の値によっては、以下のすべてのメトリクスが収集されるわけではありません。特定の収集レベルでどのメトリクスが収集されるかを確認するには、[Vsphere データ収集レベルのドキュメント][7]を参照してください。

### メトリクス
{{< get-metrics-from-git "vsphere" >}}


### イベント

このチェックは vCenter イベントマネージャーでイベントを監視し、それを Datadog に送信します。以下のイベントタイプを送信します。

- AlarmStatusChangedEvent:Gray
- VmBeingHotMigratedEvent
- VmReconfiguredEvent
- VmPoweredOnEvent
- VmMigratedEvent
- TaskEvent: パワーオンの初期化
- TaskEvent: 仮想マシンのパワーオフ
- TaskEvent: 仮想マシンのパワーオン
- TaskEvent: 仮想マシンの再構成
- TaskEvent: 仮想マシンの再配置
- TaskEvent: 仮想マシンの一時停止
- TaskEvent: 仮想マシンの移行
- VmMessageEvent
- VmSuspendedEvent
- VmPoweredOffEvent

### サービスのチェック
{{< get-service-checks-from-git "vsphere" >}}


## トラブルシューティング

- [VMWare インテグレーションを使用してプルされる VM の数を制限できますか？][10]
- [私の vSphere VM がインフラストラクチャーリストビューに複製されています][11]

## その他の参考資料

Datadog を使用した vSphere 環境の監視については、Datadog の[ブログ記事][12]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.monitoring.doc/GUID-25800DE4-68E5-41CC-82D9-8811E27924BC.html
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/vsphere/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration/
[11]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[12]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers