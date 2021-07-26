---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    btrfs: assets/dashboards/btrfs_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md'
display_name: Btrfs
draft: false
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
integration_id: btrfs
integration_title: Btrfs
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: btrfs.
metric_to_check: system.disk.btrfs.total
name: btrfs
public_title: Datadog-Btrfs インテグレーション
short_description: Btrfs ボリュームに空きがなくなる前に対応できるように使用状況を監視。
support: コア
supported_os:
  - linux
  - mac_os
---
![BTRFS メトリクス][1]

## 概要

Btrfs からメトリクスをリアルタイムに取得すると、以下のことができます。

- Btrfs の状態を視覚化および監視できます。
- Btrfs のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Btrfs チェックは [Datadog Agent][2] パッケージに含まれています。少なくとも 1 つの Btrfs ファイルシステムを使用しているサーバーでは、追加のインストールは必要ありません。

### コンフィギュレーション

1. 必要に応じて Agent を構成し、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `btrfs.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル btrfs.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `btrfs` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "btrfs" >}}


### イベント

Btrfs チェックには、イベントは含まれません。

### サービスのチェック

Btrfs チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/