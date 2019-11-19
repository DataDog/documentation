---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/disk/README.md'
display_name: Disk
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: system
integration_title: Disk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.free
name: disk
public_title: Datadog-Disk インテグレーション
short_description: ディスクチェックは、マウントされたディスクに関するメトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

ディスクの使用状況および IO に関連したメトリクスを収集します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

disk チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

ディスクチェックはデフォルトで有効になっています。Agent は、すべてのローカルパーティションに関するメトリクスを収集します。
カスタムオプション付きでチェックを構成する場合は、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `disk.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル disk.d/conf.yaml][4] を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `disk` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "disk" >}}


### イベント
Disk チェックには、イベントは含まれません。

### サービスのチェック
**`disk.read_write`**:
ファイルシステムが読み取り専用モードの場合は、`CRITICAL` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[7]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}