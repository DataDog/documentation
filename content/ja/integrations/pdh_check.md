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
  - 'https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md'
display_name: PDH
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
integration_id: pdh
integration_title: PDH チェック
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pdh.
name: pdh_check
public_title: Datadog-PDH チェックインテグレーション
short_description: Windows のパフォーマンスカウンターを収集およびグラフ化
support: コア
supported_os:
  - windows
---
## 概要

Windows のパフォーマンスカウンターからメトリクスをリアルタイムに取得して、以下のことができます。

* PDH API を使用して Windows のパフォーマンスカウンターを視覚化および監視できます。

## セットアップ
### インストール

PDH チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィグレーション

1. Windows のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `pdh_check.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル pdh_check.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションの `pdh_check` を探します。

## 収集データ
### メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][6] を参照してください。

#### カスタムメトリクス

PDH チェックでは[カスタムメトリクス][7]を送信することができますが、これはお客様の[課金][8]に影響します。

### イベント

PDH チェックには、イベントは含まれません。

### サービスのチェック

PDH チェックには、サービスのチェック機能は含まれません。


[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/metadata.csv
[7]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[8]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent


{{< get-dependencies >}}