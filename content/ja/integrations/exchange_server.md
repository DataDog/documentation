---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Exchange Server Overview: assets/dashboards/overview.json
  logs:
    source: exchange-server
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md
display_name: Exchange Server
draft: false
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
integration_id: exchange-server
integration_title: Microsoft Exchange Server
integration_version: 1.13.1
is_public: true
kind: インテグレーション
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

- Exchange サーバーのパフォーマンスを視覚化および監視できます。

## セットアップ

### インストール

Exchange チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Exchange Server のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `exchange_server.d/conf.yaml` ファイルを編集します。

2. [Agent を再起動します][3]。

**注**: このチェックのバージョン 1.11.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][4]を参照してください。

### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Exchange Server のログの収集を開始するには、次のコンフィギュレーションブロックを `exchange_server.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\CommonDiagnosticsLog\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\ThrottlingService\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\Hub\\Connectivity\\*"
       source: exchange-server
   ```
   **注**: Exchange Server はさまざまな種類のログを出力するため、サポートされるログは CommonDiagnosticsLog、ThrottlingService、および Connectivity Logs のみです。他のログ形式をご希望の場合は、[Datadog サポート][5]までお問い合わせください。

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル exchange_server.d/conf.yaml][6] を参照してください。

3. [Agent を再起動します][3]。


### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `exchange_server` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "exchange_server" >}}


### イベント

Exchange Server チェックには、イベントは含まれません。

### サービスのチェック

Exchange Server チェックには、サービスのチェック機能は含まれません。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv