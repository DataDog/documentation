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
  - 'https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md'
display_name: Exchange Server
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
integration_id: exchange-server
integration_title: Microsoft Exchange Server
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: exchange.
metric_to_check: exchange.processor.cpu_user
name: exchange_server
public_title: Datadog-Microsoft Exchange Server インテグレーション
short_description: Microsoft Exchange Server のメトリクスを収集してグラフ化
support: コア
supported_os:
  - windows
---
## 概要

Microsoft Exchange Server からメトリクスを取得して、以下のことができます。

* Exchange サーバーのパフォーマンスを視覚化および監視できます。

## セットアップ
### インストール

Exchange チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Exchange Server のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `exchange_server.d/conf.yaml` ファイルを編集します。

  ```yaml
  init_config:
  instances:
    - host: .
  ```

2. [Agent を再起動します][4]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `exchange_server` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "exchange_server" >}}


### イベント
Exchange Server チェックには、イベントは含まれません。

### サービスのチェック
Exchange Server チェックには、サービスのチェック機能は含まれません。


[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv


{{< get-dependencies >}}