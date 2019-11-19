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
  - 'https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md'
display_name: Btrfs
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
integration_id: btrfs
integration_title: Btrfs
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: btrfs.
metric_to_check: system.disk.btrfs.total
name: btrfs
public_title: Datadog-Btrfs インテグレーション
short_description: Btrfs ボリュームに空きがなくなる前に対応できるように使用状況を監視 up.
support: コア
supported_os:
  - linux
  - mac_os
---
![BTRFS メトリクス][1]

## 概要

Btrfs サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

* Btrfs の状態を視覚化および監視できます。
* Btrfs のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Btrfs チェックは [Datadog Agent][3] パッケージに含まれています。少なくとも 1 つの Btrfs ファイルシステムを使用しているサーバーでは、追加のインストールは必要ありません。

### コンフィグレーション

1. 必要に応じて Agent を構成し、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `btrfs.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル btrfs.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `btrfs` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "btrfs" >}}


### イベント
Btrfs チェックには、イベントは含まれません。

### サービスのチェック
Btrfs チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[9]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}