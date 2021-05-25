---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    pgbouncer: assets/dashboards/pgbouncer_dashboard.json
  logs:
    source: pgbouncer
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    instance_overview: assets/saved_views/instance_overview.json
    pgbouncer_processes: assets/saved_views/pgbouncer_processes.json
    user_overview: assets/saved_views/user_overview.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md'
display_name: PGBouncer
draft: false
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

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `pgbouncer.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル pgbouncer.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

  **注**: PgBouncer のインスタンスに SSL サポートがない場合は、`sslmode=require` を `sslmode=allow` と置換してサーバーエラーを防ぎます。SSL サポートに関する詳細は、[Postgres ドキュメント][3]を参照してください。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル pgbouncer.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][5]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[3]: https://www.postgresql.org/docs/9.1/libpq-ssl.html
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<インテグレーション名>` | `pgbouncer`                                                                                               |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                          |
| `<インスタンスコンフィギュレーション>`  | `{"database_url": "postgresql://datadog:<パスワード>@%%host%%:%%port%%/<データベース_URL>?sslmode=require"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `pgbouncer` を探します。

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

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/