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
- https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md
display_name: PDH
draft: false
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
integration_id: pdh
integration_title: PDH Check
integration_version: 1.16.1
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pdh.
name: pdh_check
public_title: Datadog-PDH Check インテグレーション
short_description: Windows のパフォーマンスカウンターを収集およびグラフ化。
support: コア
supported_os:
- windows
---



## 概要

**注:** PDH チェックの使用は推奨されません。代わりに [Windows パフォーマンスカウンターチェック][1]を使用してください。

Windows のパフォーマンスカウンターからメトリクスをリアルタイムに取得して、以下のことができます。

- PDH API を使用して Windows のパフォーマンスカウンターを視覚化および監視できます。

## セットアップ

### インストール

PDH チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィギュレーション

1. Windows のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `pdh_check.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル pdh_check.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンド][6]を実行し、Checks セクションの `pdh_check` を探します。

## 収集データ

### メトリクス

PDH チェックにより収集されたすべてのメトリクスは、[カスタムメトリクス][7]として Datadog に送信できますが、これはお客様への[請求][8]に影響します。

### イベント

PDH チェックには、イベントは含まれません。

### サービスのチェック

PDH チェックには、サービスのチェック機能は含まれません。

[1]: https://docs.datadoghq.com/ja/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/