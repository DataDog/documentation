---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md'
display_name: PGBouncer
git_integration_title: pgbouncer
guid: 51386802-4502-4991-b592-27eff1ca111c
integration_id: pgbouncer
integration_title: PGBouncer
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pgbouncer.
metric_to_check: pgbouncer.pools.sv_idle
name: pgbouncer
process_signatures:
  - pgbouncer
public_title: Datadog-PGBouncer インテグレーション
short_description: 接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックを監視
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

PgBouncer チェックは、接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックの監視を可能にします。

## セットアップ

### インストール

PgBouncer チェックは [Datadog Agent][1] パッケージに含まれています。PgBouncer ノードに追加でインストールする必要はありません。

このチェックには、PgBouncer インスタンスを照会するための関連ユーザーが必要です。

1. PgBouncer の `pgbouncer.ini` ファイルに Datadog ユーザーを作成します。

   ```ini
   stats_users = datadog
   ```

2. PgBouncer の `userlist.txt` ファイルに `datadog` ユーザーの関連パスワードを追加します。

   ```text
   "datadog" "<PASSWORD>"
   ```

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

##### メトリクスの収集

1. [Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `pgbouncer.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル pgbouncer.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

2. [Agent を再起動します][4]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Pgbouncer のログの収集を開始するには、次の構成ブロックを `pgbouncer.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/postgresql/pgbouncer.log
       source: pgbouncer
       service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル pgbouncer.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `oracle`                                                                                               |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                          |
| `<INSTANCE_CONFIG>`  | `{"database_url": "postgresql://datadog:<パスワード>@%%host%%:%%port%%/<データベース_URL>?sslmode=require"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集のドキュメント][7]を参照してください。

| パラメーター      | 値                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `pgbouncer` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "pgbouncer" >}}


**注**: PgBouncer のバージョンによっては、すべてのメトリクスを使用できないことがあります。

### イベント

PgBouncer チェックには、イベントは含まれません。

### サービスのチェック

**pgbouncer.can_connect**:<br>
Agent が PgBouncer に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[7]: https://docs.datadoghq.com/ja/agent/docker/log/
[8]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/metadata.csv
[9]: https://docs.datadoghq.com/ja/help