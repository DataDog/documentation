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
  - 'https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md'
display_name: Linux proc extras
draft: false
git_integration_title: linux_proc_extras
guid: 47f243d7-5df4-47b5-9f1a-923b4f7cefe7
integration_id: システム
integration_title: Linux Proc Extras
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.inodes.total
name: linux_proc_extras
public_title: Datadog-Linux Proc Extras インテグレーション
short_description: linux_proc_extras の状態を視覚化および監視。
support: コア
supported_os:
  - linux
---
## 概要

linux_proc_extras サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- linux_proc_extras の状態を視覚化および監視できます。
- linux_proc_extras のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Linux_proc_extras チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `linux_proc_extras.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル linux_proc_extras.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `linux_proc_extras` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "linux_proc_extras" >}}


### イベント

Linux Proc Extras チェックには、イベントは含まれません。

### サービスのチェック

Linux Proc Extras チェックには、サービスチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/