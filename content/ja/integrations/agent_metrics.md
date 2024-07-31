---
app_id: datadog-agent
app_uuid: 4af17310-84ad-4bac-b05d-85917bc378cb
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Agent メトリクス
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: agent_metrics
integration_id: datadog-agent
integration_title: Agent メトリクス
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: agent_metrics
public_title: Agent メトリクス
short_description: agent_metrics の説明。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: agent_metrics の説明。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Agent メトリクス
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog Agent から内部メトリクスを取得し、Datadog で視覚化やモニターを作成します。

**注:** このインテグレーションによって収集されるメトリクスのリストは、マイナーな Agent のバージョン間で変更される可能性があります。そのような変更は、Agent の変更履歴に記載されない場合があります。

## 計画と使用

### インフラストラクチャーリスト

[go_expvar][1] チェックに基づく Agent Metrics インテグレーションは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. [Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダ内の [`go_expvar.d/agent_stats.yaml.example`][3] ファイルの名前を `go_expvar.d/agent_stats.yaml` に変更します。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `go_expvar` を探します。

## リアルユーザーモニタリング

### データセキュリティ

Agent Metrics インテグレーションは、[`agent_stats.yaml.example`][3] で定義されたメトリクスを収集します。

### ヘルプ

Agent Metrics インテグレーションには、イベントは含まれません。

### ヘルプ

Agent Metrics インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/go_expvar/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/