---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/network/README.md
display_name: Network
draft: false
git_integration_title: ネットワーク
guid: 43631795-8a1f-404d-83ae-397639a84050
integration_id: システム
integration_title: Network
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.net.bytes_rcvd
name: ネットワーク
public_title: Datadog-Network インテグレーション
short_description: 送受信バイト数およびパケット数、接続状態、ラウンドトリップ回数などを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Network ダッシュボード][1]

## 概要

ネットワークチェックは、ホストオペレーティングシステムから TCP/IP 統計を収集します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

ネットワークチェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

このインテグレーションを使用してメトリクスを収集するには、ホストで conntrack モジュールがアクティブにされていることを確認します。アクティブにされていない場合は、次のコマンドを実行します。

```shell
sudo modprobe nf_conntrack
sudo modprobe nf_conntrack_ipv4
sudo modprobe nf_conntrack_ipv6
```

*注*: Agent イメージに conntrack バイナリをインストールする必要がある場合があります。

### コンフィギュレーション

1. Agent はデフォルトでネットワークチェックを有効にしますが、チェックを自分で構成する場合は、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `network.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル network.d/conf.yaml][4] を参照してください。

2. [Agent を再起動][5]すると、構成の変更が有効になります。

**注**:

一部の conntrack メトリクスを取得するには、特権的なアクセスで conntrack を実行する必要があります。

Linux: それには、次の sudoers ルールを構成します。

```shell
dd-agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

Kubernetes: Conntrack メトリクスは、Kubernetes v1.11 未満の場合はデフォルトで、Kubernetes v1.11 以上の場合は `host` ネットワークモードを使用している場合に使用できます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `network` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "network" >}}


**注**: `system.net.conntrack` メトリクスは Agent v6.12 以降で使用できます。詳細については、[CHANGELOG][8] を参照してください。

### イベント

ネットワークチェックには、イベントは含まれません。

### サービスのチェック

ネットワークチェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

- [Datadog API 経由で TCP/UDP ホストメトリクスを送信するには][9]

## その他の参考資料

- [HTTP チェックでネットワークモニターを構築][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/network/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/network/CHANGELOG.md#1110--2019-05-14
[9]: https://docs.datadoghq.com/ja/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api/
[10]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/