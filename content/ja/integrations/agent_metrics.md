---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md'
display_name: Agent メトリクス
git_integration_title: agent_metrics
guid: 032333e3-5272-4044-90d5-a05997667513
integration_id: datadog-agent
integration_title: Agent メトリクス
is_public: false
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datadog.agent.
metric_to_check: datadog.agent.collector.cpu.used
name: agent_metrics
public_title: Datadog-Agent メトリクスインテグレーション
short_description: agent_metrics の説明。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Agent Metrics サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- `agent_metrics` の状態を視覚化および監視できます。
- `agent_metrics` のフェイルオーバーとイベントの通知を受けることができます。

**注**: Agent v6 では、新しい内部アーキテクチャを利用するために、Agent Metrics チェックは Go で書き直されています。このチェックは引き続きメンテナンスされていますが、**メジャーバージョン 6 より前の Agent でのみ動作します**。

Agent v6 以降で Agent メトリクスを収集するには、Agent にパッケージ化されている [`agent_stats.yaml` 構成ファイル][2]と [Go-expvar チェック][1]を使用してください。

## セットアップ

### インストール

Agent Metrics チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. サーバーとポートを指定し、監視するマスターを設定するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `agent_metrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル agent_metrics.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### メトリクスの収集

Agent Metrics インテグレーションでは[カスタムメトリクス][7]を送信することができますが、これはお客様の[課金][8]に影響します。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `agent_metrics` を探します。

## 収集データ

収集されたすべてのデータは、Agent v5 でのみ使用できます。

### メトリクス
{{< get-metrics-from-git "agent_metrics" >}}


### イベント

Agent Metrics チェックには、イベントは含まれません。

### サービスのチェック

Agent Metrics チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/go_expvar
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/agent-v5/agent_metrics/datadog_checks/agent_metrics/data/conf.yaml.default
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[8]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/agent_metrics/metadata.csv
[11]: https://docs.datadoghq.com/ja/help