---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md'
display_name: Kubelet
draft: false
git_integration_title: kubelet
guid: 55039e21-7e89-41fb-968c-ab8bf8f25da0
integration_id: kubelet
integration_title: Kubelet
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.2.0
metric_prefix: kubernetes.
metric_to_check: kubernetes.cpu.usage.total
name: kubelet
public_title: Datadog-Kubelet インテグレーション
short_description: Kubelet からコンテナ統計を収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションは、kubelet からコンテナメトリクスを収集して、以下のことができます。

- kubelet 統計を視覚化および監視できます。
- kubelet のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Kubelet チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

サーバーとポートを指定し、メトリクスと共に送信するタグを設定するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `kubelet.d/conf.yaml` ファイルを編集します。

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `kubelet` を探します。

### 互換性

kubelet チェックは 2 つのモードで実行できます。

- prometheus モード (デフォルト) は、バージョン 1.7.6 以降の Kubernetes と互換性があります。
- cAdvisor モード (`cadvisor_port` オプションの設定により有効) は、バージョン 1.3 以降の Kubernetes と互換性があります。一貫したタグ付けとフィルタリングを行うには、Agent のバージョン 6.2 以降が必要です。

## OpenShift <3.7 のサポート

OpenShift では、cAdvisor 4194 ポートはデフォルトで無効になっています。これを有効にするには、
[node-config ファイル][4]に次の行を追加する必要があります。

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

ポートをオープンできない場合は、次のように設定して、コンテナメトリクス収集の両方のソースを無効にできます。

- `cadvisor_port` を `0` に
- `metrics_endpoint` を `""` に

この状態でも、このチェックは次の情報を収集できます。

- kubelet 健全性サービスチェック
- ポッド実行中/停止メトリクス
- ポッド制限およびリクエスト数
- ノード容量メトリクス

## 収集データ

### サービスのチェック
{{< get-service-checks-from-git "kubelet" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[5]: https://github.com/DataDog/integrations-core/blob/master/kubelet/assets/service_checks.json
[6]: https://docs.datadoghq.com/ja/help/