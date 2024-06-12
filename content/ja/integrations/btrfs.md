---
app_id: btrfs
app_uuid: 471f9447-678b-4199-9503-7170b65d07c5
assets:
  dashboards:
    btrfs: assets/dashboards/btrfs_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.btrfs.total
      metadata_path: metadata.csv
      prefix: system.disk.btrfs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 89
    source_type_name: Btrfs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md
display_on_public_website: true
draft: false
git_integration_title: btrfs
integration_id: btrfs
integration_title: Btrfs
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: btrfs
public_title: Btrfs
short_description: Btrfs ボリュームに空きがなくなる前に対応できるように使用状況を監視。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::OS とシステム
  configuration: README.md#Setup
  description: Btrfs ボリュームに空きがなくなる前に対応できるように使用状況を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Btrfs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![BTRFS メトリクス][1]

## 概要

Btrfs からメトリクスをリアルタイムに取得すると、以下のことができます。

- Btrfs の状態を視覚化および監視できます。

## 計画と使用

### インフラストラクチャーリスト

Btrfs チェックは [Datadog Agent][2] パッケージに含まれています。少なくとも 1 つの Btrfs ファイルシステムを使用しているサーバーでは、追加のインストールは必要ありません。

### ブラウザトラブルシューティング

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `btrfs.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル btrfs.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `btrfs` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "btrfs" >}}


### ヘルプ

Btrfs チェックには、イベントは含まれません。

### ヘルプ

Btrfs チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/