---
aliases:
  - /ja/integrations/vmware/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md'
display_name: vSphere
git_integration_title: vsphere
guid: 930b1839-cc1f-4e7a-b706-0e8cf3218464
integration_id: vsphere
integration_title: vSphere
is_public: true
kind: integration
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][11]のガイドを参照してこの手順を行ってください。

### インストール

vSphere チェックは [Datadog Agent][2] パッケージに含まれています。vCenter サーバーに追加でインストールする必要はありません。

### コンフィグレーション

vCenter の **管理** セクションで、`datadog-readonly` という読み取り専用ユーザーを追加します。

次に、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `vsphere.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル vsphere.d/conf.yaml][4] を参照してください。

```
init_config:

instances:
  - name: main-vcenter # メトリクスを 'vcenter_server:main-vcenter' のようにタグ付けします
    host: <VCENTER_HOSTNAME>          # 例: myvcenter.example.com
    username: <USER_YOU_JUST_CREATED> # 例: datadog-readonly@vsphere.local
    password: <PASSWORD>
```

[Agent を再起動][5]すると、vSphere メトリクスとイベントが Datadog に送信されます。

**注**: Datadog Agent が vSphere アプライアンスソフトウェアと同じサーバー上にある必要はありません。vSphere チェックが有効になっている Agent は、OS がどこで実行されているかにかかわらず vSphere アプライアンスサーバーをポイントするようにセットアップできます。それに応じて `<VCENTER_HOSTNAME>` を更新してください。

### 互換性

Agent バージョン 6.5.0/5.27.0 に付属しているバージョン 3.3.0 以降のチェックでは、vCenter から収集するメトリクスを新しいオプションパラメーター `collection_level` で選択できるようになり、オプションパラメーター `all_metrics` は非推奨になりました。この変更に伴い、インテグレーションによって Datadog へ送信されるメトリクスの名前が変更され、vCenter が公開するメトリクスのロールアップタイプを指定するサフィックス (`.avg`、`.sum`など) が加えられました。

バージョン 3.3.0 以降では、デフォルトで、`collection_level` は 1 に設定され、サフィックスが追加された新しいメトリクス名がインテグレーションによって送信されます。

以下では、vSphere インテグレーションを使用する際に考えられるシナリオごとに説明します。
1. これまでインテグレーションを使用したことがなく、バージョン 6.5.0+ / 5.27.0+ の Agent をインストールしたばかりの場合は、特別な作業は必要ありません。インテグレーションを使用し、`collection_level` を構成し、Datadog でメトリクスを表示します。

2. 6.5.0/5.27.0 より古い Agent でインテグレーションを使用しており、新しいバージョンにアップグレードした場合。
    - 構成で `all_metrics` パラメーターを `true` または `false` に明示的に設定していれば、これまでと何も変わりません (同じメトリクスが Datadog に送信されます)。ただし、`all_metrics` は非推奨になり、最終的には削除されるため、新しい `collection_level` パラメーターに切り替える前に、新しいメトリクス名を使用するようにダッシュボードとモニターを更新する必要があります。
    - 構成で `all_metrics` パラメーターを指定していなければ、アップグレードされたインテグレーションは、デフォルトで `collection_level` パラメーターを 1 に設定し、メトリクスを新しい名前で Datadog に送信します。
    **警告**: この場合、送信されなくなった非推奨のメトリクスを使用しているダッシュボードのグラフやモニターは機能しなくなります。これを防ぐには、構成で `all_metrics: false` を明示的に設定して、同じメトリクスが引き続き報告されるようにします。その後、新しいメトリクスを使用するようにダッシュボードとモニターを更新してから、`collection_level` の使用に切り替えます。

#### 構成オプション

| オプション                   | 必須 | 説明                                                                                                                                                                                                                                                                               |
|---------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ssl_verify`              | いいえ       | vCenter に接続する際の SSL 検証を無効にするには、false に設定します。                                                                                                                                                                                                                     |
| `ssl_capath`              | いいえ       | PEM 形式の CA 証明書を含むディレクトリの絶対ファイルパスを設定します。                                                                                                                                                                                                    |
| `host_include_only_regex` | いいえ       | このチェックで、これらの ESXi ホストとそこで実行されている VM のメトリクスのみを取得する場合は、このような正規表現を使用します。                                                                                                                                                                         |
| `vm_include_only_regex`   | いいえ       | パターンに一致する VM のみを含めるために正規表現を使用します。                                                                                                                                                                                                                       |
| `include_only_marked`     | いいえ       | 値 'DatadogMonitored' を使用してカスタムフィールドとしてマークされた vSphere VM のメトリクスのみを収集する場合は、true に設定します。カスタムフィールドを設定するには、UI を使用してタグを適用するか、[PowerCLI][6] で CLI を使用します。VSphere 5.1 で動作する例: `Get-VM VM | Set-CustomField -Name "DatadogMonitored" -Value "DatadogMonitored"`.|
| `collection_level`        | いいえ       | 送信するメトリクスの数を指定する 1 ～ 4 の数値。1 は重要な監視メトリクスのみを送信し、4 は取得可能なすべてのメトリクスを送信することを意味します。                                                                                                                                          |
| `all_metrics`             | いいえ       | (非推奨) true に設定すると、vCenter からすべてのメトリクスが収集されます。この場合、メトリクスは大量になります。false に設定すると、監視対象として選択した一部のメトリクスだけが収集されます。                                                                                    |
| `event_config`            | いいえ       | イベント構成は辞書です。現在、オンにできるスイッチは `collect_vcenter_alarms` だけです。これは、vCenter でイベントとして設定されているアラームを送信します。                                                                                                                                           |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `vsphere` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "vsphere" >}}


### イベント

このチェックは vCenter イベントマネージャーでイベントを監視し、それを Datadog に送信します。以下のタイプのイベントは送信されません。

* AlarmStatusChangedEvent:Gray
* VmBeingHotMigratedEvent
* VmResumedEvent
* VmReconfiguredEvent
* VmPoweredOnEvent
* VmMigratedEvent
* TaskEvent: パワーオンの初期化
* TaskEvent: 仮想マシンのパワーオフ
* TaskEvent: 仮想マシンのパワーオン
* TaskEvent: 仮想マシンの再構成
* TaskEvent: 仮想マシンの再配置
* TaskEvent: 仮想マシンの一時停止
* TaskEvent: 仮想マシンの移行
* VmMessageEvent
* VmSuspendedEvent
* VmPoweredOffEvent

### サービスのチェック

`vcenter.can_connect`:
Agent が vCenter に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング

* [VMWare インテグレーションを使用してプルされる VM の数を制限できますか][9]

## その他の参考資料
Datadog を使用した vSphere 環境の監視については、Datadog の[ブログ記事][10]を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.powercli.cmdletref.doc%2FSet-CustomField.html
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://docs.datadoghq.com/ja/integrations/faq/can-i-limit-the-number-of-vms-that-are-pulled-in-via-the-vmware-integration
[10]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers
[11]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}