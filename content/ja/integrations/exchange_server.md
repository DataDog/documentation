---
app_id: exchange-server
app_uuid: e334d30a-a7df-4c06-9d1f-d8b6663df38a
assets:
  dashboards:
    Exchange Server Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: exchange.processor.cpu_user
      metadata_path: metadata.csv
      prefix: exchange.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10023
    source_type_name: Exchange Server
  logs:
    source: exchange_server
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md
display_on_public_website: true
draft: false
git_integration_title: exchange_server
integration_id: exchange-server
integration_title: Microsoft Exchange Server
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: exchange_server
public_title: Microsoft Exchange Server
short_description: Microsoft Exchange Server のメトリクスを収集してグラフ化
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Microsoft Exchange Server のメトリクスを収集してグラフ化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Exchange Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Microsoft Exchange Server からメトリクスを取得して、以下のことができます。

- Exchange サーバーのパフォーマンスを視覚化および監視できます。

## 計画と使用

### インフラストラクチャーリスト

Exchange チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. Exchange Server のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `exchange_server.d/conf.yaml` ファイルを編集します。

2. [Agent を再起動します][3]。

**注**: このチェックのバージョン 1.11.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][4]を参照してください。

### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "exchange_server" >}}


### ヘルプ

Exchange Server チェックには、イベントは含まれません。

### ヘルプ

Exchange Server チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv