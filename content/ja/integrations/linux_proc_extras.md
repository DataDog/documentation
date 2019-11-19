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
  - 'https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md'
display_name: Linux proc extras
git_integration_title: linux_proc_extras
guid: 47f243d7-5df4-47b5-9f1a-923b4f7cefe7
integration_id: system
integration_title: Linux Proc Extras
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.inodes.total
name: linux_proc_extras
public_title: Datadog-Linux Proc Extras インテグレーション
short_description: linux_proc_extras の状態を視覚化および監視
support: コア
supported_os:
  - linux
---
## 概要
linux_proc_extras サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* linux_proc_extras の状態を視覚化および監視できます。
* linux_proc_extras のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照してこの手順を行ってください。

### インストール

Linux_proc_extras チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `linux_proc_extras.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル linux_proc_extras.d/conf.yaml][3] を参照してください。

#### メトリクスの収集
Linux Proc Extras チェックでは[カスタムメトリクス][4]を送信することができますが、これはお客様の[課金][5]に影響します。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `linux_proc_extras` を探します。

## 収集データ
### メトリクス
Linux Proc Extras チェックには、メトリクスは含まれません。

### イベント
Linux Proc Extras チェックには、イベントは含まれません。

### サービスのチェック
Linux Proc Extras チェックには、サービスチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[5]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}