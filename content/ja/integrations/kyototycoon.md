---
app_id: kyoto-tycoon
app_uuid: 5cc7578e-8f8e-43c3-890a-4360581634e7
assets:
  dashboards:
    kyototycoon: assets/dashboards/kyototycoon_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kyototycoon.records
      metadata_path: metadata.csv
      prefix: kyototycoon.
    process_signatures:
    - ktserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 62
    source_type_name: Kyoto Tycoon
  saved_views:
    kyoto-tycoon_processes: assets/saved_views/kyoto-tycoon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md
display_on_public_website: true
draft: false
git_integration_title: kyototycoon
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
integration_version: 2.5.1
is_public: true
manifest_version: 2.0.0
name: kyototycoon
public_title: Kyoto Tycoon
short_description: 取得/設定/削除操作の追跡とレプリケーションラグの監視。
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
  - Category::Data Stores
  - Category::ログの収集
  configuration: README.md#Setup
  description: 取得/設定/削除操作の追跡とレプリケーションラグの監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kyoto Tycoon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Agent の KyotoTycoon チェックは、取得/設定/削除の操作を追跡し、レプリケーションラグを監視します。

## セットアップ

### インストール

KyotoTycoon チェックは [Datadog Agent][1] パッケージに含まれています。KyotoTycoon サーバーに追加でインストールする必要はありません。

### 構成

1. [Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `kyototycoon.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル kyototycoon.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param report_url - string - required
     ## The report URL should be a URL to the Kyoto Tycoon "report" RPC endpoint.
     #
     - report_url: http://localhost:1978/rpc/report
   ```

2. [Agent を再起動します][4]。

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Kyoto Tycoon のログの収集を開始するには、次の構成ブロックを `kyototycoon.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /var/data/ktserver.log
        source: kyototycoon
    ```

    `path` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[kyototycoon.d/conf.yaml のサンプル][3]を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `kyototycoon` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kyototycoon" >}}


### イベント

KyotoTycoon チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "kyototycoon" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/