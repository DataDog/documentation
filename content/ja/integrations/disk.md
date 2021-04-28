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
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/disk/README.md'
display_name: Disk
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: system
integration_title: Disk
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.free
name: disk
public_title: Datadog-Disk インテグレーション
short_description: ディスクチェックで、マウントされたディスクのメトリクスを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

ディスクの使用状況および IO に関連したメトリクスを収集します。

## セットアップ

### インストール

ディスクチェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

ディスクチェックはデフォルトで有効になっています。Agent は、すべてのローカルパーティションに関するメトリクスを収集します。カスタムオプション付きでチェックを構成する場合は、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `disk.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル disk.d/conf.yaml][3] を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `disk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "disk" >}}


### イベント

Disk チェックには、イベントは含まれません。

### サービスのチェック

**disk.read_write**:<br>
ファイルシステムが読み取り専用モードの場合、`CRITICAL` を返します。**注**: このサービスチェックは、[disk.d/conf.yaml][3] の `service_check_rw` で有効にする必要があります。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
