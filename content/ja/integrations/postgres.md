---
aliases:
  - /ja/integrations/postgresql
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/postgres/README.md'
display_name: Postgres
git_integration_title: postgres
guid: e9ca29d5-5b4f-4478-8989-20d89afda0c9
integration_id: postgres
integration_title: Postgres SQL
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postgresql.
metric_to_check: postgresql.connections
name: postgres
process_signatures:
  - postgres -D
  - pg_ctl start -l logfile
  - postgres -c 'pg_ctl start -D -l
public_title: Datadog-Postgres SQL インテグレーション
short_description: データベースパフォーマンスと健全性のメトリクスを豊富に収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![PostgreSQL Graph][1]

## 概要

PostgreSQL サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* PostgreSQL の状態を視覚化および監視できます。
* PostgreSQL のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

PostgreSQL チェックは Agent にパッケージ化されています。PostgreSQL メトリクスとログの収集を開始するには、[Agent をインストールします][3]。

### コンフィグレーション

PostgreSQL の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `postgres.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル postgres.d/conf.yaml][5] を参照してください。

#### Postgres の準備

PostgreSQL インテグレーションを開始するには、PostgreSQL サーバーへの適切なアクセス権を持つ読み取り専用 `datadog` ユーザーを作成します。PostgreSQL データベースで `psql` を起動し、次のコマンドを実行します。

PostgreSQL バージョン 10 以上の場合
```
create user datadog with password '<PASSWORD>';
grant pg_monitor to datadog;
```

それより前の PostgreSQL バージョンの場合
```
create user datadog with password '<PASSWORD>';
grant SELECT ON pg_stat_database to datadog;
```

**注**: その他のテーブルをクエリする必要があるカスタムメトリクスを生成する場合は、`datadog` ユーザーにそれらのテーブルに対する `CONNECT` アクセス許可を付与する必要があります。

アクセス許可が正しいことを確認するには、次のコマンドを実行します。

```
psql -h localhost -U datadog postgres -c \
"select * from pg_stat_database LIMIT(1);" \
&& echo -e "\e[0;32mPostgres connection - OK\e[0m" \
|| echo -e "\e[0;31mCannot connect to Postgres\e[0m"
```

パスワードの入力を要求された場合は、最初のコマンドで使用したパスワードを入力します。

#### メトリクスの収集

* `postgres.d/conf.yaml` ファイルを編集して、サーバー/ポートを指定し、監視するマスターを設定します。使用可能なすべての構成オプションの詳細については、[サンプル postgres.d/conf.yaml][5] を参照してください。

| オプション                              | 必須 | 説明                                                                                                                                                                                        |
|-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`username`**                      | いいえ       | 上の[インストール](#installation)セクションで作成した、メトリクスの収集に使用されるユーザーアカウント。                                                                                              |
| **`password`**                      | いいえ       | ユーザーアカウントのパスワード。                                                                                                                                                                 |
| **`dbname`**                        | いいえ       | 監視するデータベースの名前。                                                                                                                                                      |
| **`ssl`**                           | いいえ       | デフォルトは `False` です。SSL 接続を使用するかどうかを示します。                                                                                                                                   |
| **`tags`**                          | いいえ       | 収集されるすべてのメトリクスに適用されるタグのリスト。タグは、単純な文字列またはキー/値ペアです。                                                                                                    |
| **`relations`**                     | いいえ       | デフォルトでは、すべてのスキーマが含まれます。スキーマリレーションに関するメトリクスを収集するには、ここでスキーマを追加します。リレーションごとに 10 個のメトリクスが生成され、インデックスごとに 10 個のメトリクスが追加されます。                |
| **`collect_function_metrics`**      | いいえ       | `pg_stat_user_functions` から PL/pgSQL 関数に関するメトリクスを収集します。                                                                                                                        |
| **`collect_count_metrics`**         | いいえ       | カウントメトリクスを収集します。下位互換性を維持するため、デフォルト値は `True` ですが、低速になる可能性があります。推奨値は `False` です。                                                           |
| **`collect_activity_metrics`**      | いいえ       | デフォルトは `False` です。`pg_stat_activity` からトランザクションに関するメトリクスを収集します。このオプションを有効にする前に、ユーザーが `pg_stat_activity` からの読み取りに必要な権限を持つことを確認してください。     |
| **`collect_database_size_metrics`** | はい      | データベースサイズメトリクスを収集します。デフォルト値は `True` ですが、大規模なデータベースでは低速になる可能性があります。                                                                                                |
| **`collect_default_database`**      | いいえ       | デフォルトは `False` です。デフォルトのデータベース `postgres` の統計をチェックメトリクスに含めます。                                                                                                 |

PostgreSQL バージョン 9.6 以前で `pg_stat_activity` から読み取るには、次のコマンドを実行して `SECURITY DEFINER` を作成します。
```
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

* [Agent を再起動][6]すると、Datadog への PostgreSQL メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

PostgreSQL のデフォルトのログは `stderr` に記録され、ログに詳細な情報は含まれません。ログ行のプレフィックスに指定された詳細を追加してファイルに記録することをお勧めします。

1. PostgreSQL 構成ファイル `/etc/postgresql/<version>/main/postgresql.conf` を編集して、ログセクション内の以下のパラメーターのコメントを解除します。

    ```conf
      logging_collector = on
      log_directory = 'pg_log'  # directory where log files are written,
                                # can be absolute or relative to PGDATA
      log_filename = 'pg.log'   #log file name, can include pattern
      log_statement = 'all'     #log all queries
      log_line_prefix= '%m [%p] %d %a %u %h %c '
      log_file_mode = 0644
      ## For Windows
      #log_destination = 'eventlog'
    ```

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

3.  PostgreSQL のログの収集を開始するには、次の構成ブロックを `postgres.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
          - type: file
            path: /var/log/pg_log/pg.log
            source: postgresql
            sourcecategory: database
            service: myapp
            #To handle multi line that starts with yyyy-mm-dd use the following pattern
            #log_processing_rules:
            #  - type: multi_line
            #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
            #    name: new_log_start_with_date
    ```

    `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル postgres.d/conf.yaml][5] を参照してください。

4. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `postgres` を探します。

## 収集データ

以下に記載されているメトリクスのいくつかには、追加の構成が必要です。すべての構成オプションについては、[サンプル postgres.d/conf.yaml][5] を参照してください。

### メトリクス
{{< get-metrics-from-git "postgres" >}}


### イベント
PostgreSQL チェックには、イベントは含まれません。

### サービスのチェック

**postgres.can_connect**:<br>
監視対象の PostgreSQL インスタンスに Agent が接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

### よくあるご質問
* [PostgreSQL カスタムメトリクスの収集の説明][10]

### ブログ記事
* [1 行の変更で Postgres のパフォーマンスを 100 倍高速化][11]
* [PostgreSQL 監視のキーメトリクス][12]
* [PostgreSQL 監視ツールでメトリクスを収集][13]
* [Datadog で PostgreSQL データを収集および監視する方法][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/metadata.csv
[10]: https://docs.datadoghq.com/ja/integrations/faq/postgres-custom-metric-collection-explained
[11]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[12]: https://www.datadoghq.com/blog/postgresql-monitoring
[13]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[14]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog


{{< get-dependencies >}}