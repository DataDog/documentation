---
app_id: pgbouncer
app_uuid: 8aabdf7d-2d07-4d77-a76e-0ade64d8e70f
assets:
  dashboards:
    pgbouncer: assets/dashboards/pgbouncer_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pgbouncer.pools.sv_idle
      metadata_path: metadata.csv
      prefix: pgbouncer.
    process_signatures:
    - pgbouncer
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 118
    source_type_name: PGBouncer
  logs:
    source: pgbouncer
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    instance_overview: assets/saved_views/instance_overview.json
    pgbouncer_processes: assets/saved_views/pgbouncer_processes.json
    user_overview: assets/saved_views/user_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md
display_on_public_website: true
draft: false
git_integration_title: pgbouncer
integration_id: pgbouncer
integration_title: PGBouncer
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: pgbouncer
public_title: PGBouncer
short_description: 接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックを監視
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Data Stores
  - Category::ログの収集
  configuration: README.md#Setup
  description: 接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PGBouncer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

PgBouncer チェックは、接続プールメトリクスを追跡し、アプリケーションに出入りするトラフィックの監視を可能にします。

## 計画と使用

### インフラストラクチャーリスト

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

3. 認証情報を確認するには、次のコマンドを実行します。

   ```shell
   psql -h localhost -U datadog -p 6432 pgbouncer -c \
   "SHOW VERSION;" \
   && echo -e "\e[0;32mpgBouncer connection - OK\e[0m" \
   || echo -e "\e[0;31mCannot connect to pgBouncer\e[0m"
   ```

   パスワードの入力を要求されたら、`userlist.txt` に追加したパスワードを入力します。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `pgbouncer.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル pgbouncer.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url (ie. "pgbouncer")
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

   **注**: PgBouncer のインスタンスに SSL サポートがない場合は、`sslmode=require` を `sslmode=allow` と置換してサーバーエラーを防ぎます。詳細は、[SSL サポート][3]の Postgres ドキュメントを参照してください。

2. [Agent を再起動します][4]。

##### 収集データ

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
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `pgbouncer`                                                                                            |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                          |
| `<INSTANCE_CONFIG>`  | `{"database_url": "postgresql://datadog:<パスワード>@%%host%%:%%port%%/<データベース_URL>?sslmode=require"}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `pgbouncer` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "pgbouncer" >}}


**注**: PgBouncer のバージョンによっては、すべてのメトリクスを使用できないことがあります。

### ヘルプ

PgBouncer チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "pgbouncer" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/