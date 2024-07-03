---
app_id: postgres
app_uuid: e6b3c5ec-b293-4a22-9145-277a12a9abd4
assets:
  dashboards:
    postgresql: assets/dashboards/postgresql_dashboard.json
    postgresql_screenboard: assets/dashboards/postgresql_screenboard_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - postgresql.connections
      - postgresql.max_connections
      metadata_path: metadata.csv
      prefix: postgresql.
    process_signatures:
    - postgres -D
    - pg_ctl start -l logfile
    - postgres -c 'pg_ctl start -D -l
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28
    source_type_name: Postgres
  monitors:
    percent_usage_connections: assets/monitors/percent_usage_connections.json
    replication_delay: assets/monitors/replication_delay.json
  saved_views:
    operations: assets/saved_views/operations.json
    postgres_pattern: assets/saved_views/postgres_pattern.json
    postgres_processes: assets/saved_views/postgres_processes.json
    sessions_by_host: assets/saved_views/sessions_by_host.json
    slow_operations: assets/saved_views/slow_operations.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
- notifications
- tracing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/postgres/README.md
display_on_public_website: true
draft: false
git_integration_title: postgres
integration_id: postgres
integration_title: Postgres
integration_version: 18.3.0
is_public: true
manifest_version: 2.0.0
name: postgres
public_title: Postgres
short_description: データベースパフォーマンスと健全性のメトリクスを豊富に収集
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::ログの収集
  - Category::Notifications
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: データベースパフォーマンスと健全性のメトリクスを豊富に収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Postgres
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![PostgreSQL Graph][1]

## 概要

Postgres インテグレーションは、Postgres データベースの健全性とパフォーマンスに関するメトリクスをほぼリアルタイムで提供します。提供されるダッシュボードでこれらのメトリクスを可視化するとともに、モニターを作成して PostgreSQL の状態についてチームに警告を発することができます。

[データベースモニタリング][2] (DBM) を有効にすると、クエリのパフォーマンスとデータベースの健全性について詳細なインサイトを取得できます。標準のインテグレーションに加え、Datadog DBM では、クエリレベルのメトリクス、リアルタイムおよび過去のクエリスナップショット、待機イベントの分析情報、データベースの負荷、クエリ実行計画、ブロッキングを引き起こしているクエリについてのインサイトが提供されます。

## セットアップ

<div class="alert alert-info">このページでは、標準的な Postgres Agent のインテグレーションについて説明します。Postgres のデータベースモニタリング製品をお求めの場合は、<a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog データベースモニタリング</a>をご覧ください。</div>

### インストール

PostgreSQL チェックは Agent にパッケージ化されています。PostgreSQL メトリクスとログの収集を開始するには、[Agent をインストールします][3]。

### 構成

**注**: PostgreSQL 用のデータベースモニタリングをインストールするには、[データベースモニタリングドキュメント][4]でご利用のホスティングソリューションを選択して、手順を確認してください。

標準のインテグレーションを単体でインストールする場合のみ、このガイドの下記の手順に進んでください。

#### Postgres の準備

標準の PostgreSQL インテグレーションを開始するには、PostgreSQL サーバーへの適切なアクセス権を持つ読み取り専用 `datadog` ユーザーを作成します。PostgreSQL データベースで `psql` を起動します。

PostgreSQL バージョン 10 以上の場合、次を実行します。

```shell
create user datadog with password '<PASSWORD>';
grant pg_monitor to datadog;
grant SELECT ON pg_stat_database to datadog;
```

それより前の PostgreSQL バージョンの場合、次を実行します。

```shell
create user datadog with password '<パスワード>';
grant SELECT ON pg_stat_database to datadog;
```

アクセス許可が正しいことを確認するには、次のコマンドを実行します。

```shell
psql -h localhost -U datadog postgres -c \
"select * from pg_stat_database LIMIT(1);" \
&& echo -e "\e[0;32mPostgres connection - OK\e[0m" \
|| echo -e "\e[0;31mCannot connect to Postgres\e[0m"
```

パスワードの入力を要求された場合は、最初のコマンドで使用したパスワードを入力します。

**注**: PostgreSQL バージョン 9.6 以前で `pg_stat_activity` から読み取るには、次のコマンドを実行して `SECURITY DEFINER` を作成します。

```shell
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

{{< tabs >}}
{{% tab "ホスト" %}}

**注**: その他の表へのクエリを必要とするカスタムメトリクスを生成する際は、`datadog` ユーザーにそれらの表への `SELECT` 権限を付与する必要があります。例: `grant SELECT on <TABLE_NAME> to datadog;`。詳しくは、[よくあるご質問セクション][1]をご確認ください。

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. `postgres.d/conf.yaml` ファイルを編集して、`host` / `port` を指定し、監視するマスターを設定します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル postgres.d/conf.yaml][2] を参照してください。

    ```yaml
    init_config:

    instances:
      ## @param host - string - required
      ## The hostname to connect to.
      ## NOTE: Even if the server name is "localhost", the agent connects to
      ## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.
      #
      - host: localhost

        ## @param port - integer - required
        ## Port to use when connecting to PostgreSQL.
        #
        port: 5432

        ## @param user - string - required
        ## Datadog Username created to connect to PostgreSQL.
        #
        username: datadog

        ## @param pass - string - required
        ## Password associated with the Datadog user.
        #
        password: "<PASSWORD>"

        ## @param dbname - string - optional - default: postgres
        ## Name of the PostgresSQL database to monitor.
        ## Note: If omitted, the default system postgres database is queried.
        #
        dbname: "<DB_NAME>"

        # @param disable_generic_tags - boolean - optional - default: false
        # The integration will stop sending server tag as is redundant with host tag
        disable_generic_tags: true
    ```

2. リレーションメトリクスを収集するには、Agent をすべての論理データベースに接続します。これらのデータベースは自動的に発見することも、構成で明示的に列挙することもできます。

    - 特定のインスタンスで論理データベースを自動的に発見するには、そのインスタンスでオートディスカバリーを有効にします。

    ```yaml
    instances:
      - host: localhost
        port: 5432
        database_autodiscovery:
          enabled: true
          # Optionally, set the include field to specify
          # a set of databases you are interested in discovering
          include:
            - mydb.*
            - example.*
        relations:
          - relation_regex: .*
    ```

    - または、構成に各論理データベースをインスタンスとして列挙することもできます。

    ```yaml
    instances:
      - host: example-service-primary.example-host.com
        port: 5432
        username: datadog
        password: '<PASSWORD>'
        relations:
          - relation_name: products
          - relation_name: external_seller_products
      - host: example-service-replica-1.example-host.com
        port: 5432
        username: datadog
        password: '<PASSWORD>'
        relations:
          - relation_regex: inventory_.*
            relkind:
              - r
              - i
      - host: example-service-replica-2.example-host.com
        port: 5432
        username: datadog
        password: '<PASSWORD>'
        relations:
          - relation_regex: .*
    ```
3. [Agent を再起動します][3]。

##### トレースの収集

Datadog APM は Postgres を統合して、分散システム全体のトレースを確認します。Datadog Agent v6 以降では、トレースの収集はデフォルトで有効化されています。トレースの収集を開始するには、以下の手順に従います。

1. [Datadog でトレースの収集を有効にします][4]。
2. [Postgres へのリクエストを作成するアプリケーションをインスツルメントします][5]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

PostgreSQL のデフォルトのログは `stderr` に記録され、ログに詳細な情報は含まれません。ログ行のプレフィックスに指定された詳細を追加してファイルに記録することをお勧めします。詳細は PostgreSQL のドキュメント[エラーレポートとログ][6]を参照してください。

1. ロギングはファイル `/etc/postgresql/<バージョン>/main/postgresql.conf` 内で構成されます。ステートメント出力を含む通常のログ結果の場合、ログセクションの次のパラメーターのコメントを外します。

   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
     log_file_mode = 0644
     ## For Windows
     #log_destination = 'eventlog'
   ```

2. 詳細な期間メトリクスを収集し、Datadog インターフェイスで検索可能にするには、ステートメント自体を使用してインラインで構成する必要があります。上記の例と推奨構成との違いについては、以下を参照してください。**注**: log_statement` と `log_duration` オプションは両方ともコメントアウトされています。このトピックについては、[statement/duration のログを同一行に記録する][7]を参照してください。

   この構成では、すべてのステートメントをログに記録します。期間に応じて出力を減らすには、`log_min_duration_statement` の値を希望の最小期間 (ミリ秒単位) に設定します。

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. PostgreSQL のログの収集を開始するには、次の構成ブロックを `postgres.d/conf.yaml` ファイルに追加し、編集します。

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

      `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションについては、[postgres.d/conf.yaml のサンプル][2]を参照してください。

5. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/integrations/postgres/?tab=host#faq
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/tracing/send_traces/
[5]: https://docs.datadoghq.com/ja/tracing/setup/
[6]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[7]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%", "port":5432,"username":"datadog","password":"<PASSWORD>"}]'
```

##### ログ収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"postgresql","service":"postgresql"}]'
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][4] を参照してください。

次に、[Postgres にリクエストを送信するアプリケーションのコンテナをインスツルメント][3]し、Agent のコンテナ名に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgresql.check_names: '["postgres"]'
    ad.datadoghq.com/postgresql.init_configs: '[{}]'
    ad.datadoghq.com/postgresql.instances: |
      [
        {
          "host": "%%host%%",
          "port":"5432",
          "username":"datadog",
          "password":"<PASSWORD>"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"5432",
              "username":"datadog",
              "password":"<PASSWORD>"
            }
          ]
        }
      }
spec:
  containers:
    - name: postgres
```

##### ログ収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.logs: '[{"source":"postgresql","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: postgres
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][6]および [Kubernetes DaemonSet のセットアップ][7]を参照してください。

そして、[Postgres へのリクエストを作成するアプリケーションコンテナをインスツルメントします][4]。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/service_checks.json
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "postgres",
    "image": "postgres:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"postgres\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\", \"port\":5432,\"username\":\"datadog\",\"password\":\"<PASSWORD>\"}]"
    }
  }]
}
```

##### ログ収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "postgres",
    "image": "postgres:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"postgresql\",\"service\":\"postgresql\"}]"
    }
  }]
}
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][4] を参照してください。

次に、[Postgres にリクエストを送信するアプリケーションのコンテナをインスツルメント][3]し、[EC2 プライベート IP アドレス][5]に `DD_AGENT_HOST` を設定します。

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ja/agent/docker/apm/
[5]: https://docs.datadoghq.com/ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `postgres` を探します。

## 収集データ

以下に記載されているメトリクスのいくつかには、追加の構成が必要です。すべての構成オプションについては、[サンプル postgres.d/conf.yaml][6] を参照してください。

### メトリクス
{{< get-metrics-from-git "postgres" >}}


Agent のバージョン `7.32.0` 以降では、Database Monitoring を有効にすると、`postgresql.connections` メトリクスに `state`、`app`、`db` および `user` がタグ付けされます。

### イベント

PostgreSQL チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "postgres" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

### よくあるご質問

- [PostgreSQL カスタムメトリクスの収集の説明][8]

### ブログ記事

- [1 行の変更で Postgres のパフォーマンスを 100 倍高速化][9]
- [PostgreSQL 監視のキーメトリクス][10]
- [PostgreSQL 監視ツールでメトリクスを収集][11]
- [Datadog で PostgreSQL データを収集および監視する方法][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://docs.datadoghq.com/ja/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/database_monitoring/#postgres
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/integrations/faq/postgres-custom-metric-collection-explained/
[9]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[10]: https://www.datadoghq.com/blog/postgresql-monitoring
[11]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[12]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog