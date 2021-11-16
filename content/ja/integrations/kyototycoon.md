---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    kyototycoon: assets/dashboards/kyototycoon_dashboard.json
  logs:
    source: kyototycoon
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    kyoto-tycoon_processes: assets/saved_views/kyoto-tycoon_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md'
display_name: Kyoto Tycoon
draft: false
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kyototycoon.
metric_to_check: kyototycoon.records
name: kyototycoon
process_signatures:
  - ktserver
public_title: Datadog-Kyoto Tycoon インテグレーション
short_description: 取得/設定/削除操作の追跡とレプリケーションラグの監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Agent の KyotoTycoon チェックは、取得/設定/削除の操作を追跡し、レプリケーションラグを監視します。

## セットアップ

### インストール

KyotoTycoon チェックは [Datadog Agent][1] パッケージに含まれています。KyotoTycoon サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

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

##### ログの収集

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

### サービスのチェック

**kyototycoon.can_connect**:<br>
Agent が KyotoTycoon に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/