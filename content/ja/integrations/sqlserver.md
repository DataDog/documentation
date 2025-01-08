---
app_id: sql-server
app_uuid: bfa2f276-da05-4153-b8d4-48d4e41f5e40
assets:
  dashboards:
    SQLServer-AlwaysOn: assets/dashboards/SQLServer-AlwaysOn_dashboard.json
    SQLServer-Overview: assets/dashboards/SQLServer-Overview_dashboard.json
    sqlserver: assets/dashboards/sqlserver_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sqlserver.stats.connections
      metadata_path: metadata.csv
      prefix: sqlserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 45
    source_type_name: SQL Server
  monitors:
    Auto-parameterization attempts are failing: assets/monitors/sqlserver_high_number_failed_auto_param.json
    Availability Group is not healthy: assets/monitors/sqlserver_ao_not_healthy.json
    Database is not online: assets/monitors/sqlserver_db_not_online.json
    Database not in sync: assets/monitors/sqlserver_db_not_sync.json
    Processes are blocked: assets/monitors/sqlserver_high_processes_blocked.json
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
- https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md
display_on_public_website: true
draft: false
git_integration_title: sqlserver
integration_id: sql-server
integration_title: SQL Server
integration_version: 20.2.0
is_public: true
manifest_version: 2.0.0
name: sqlserver
public_title: SQL Server
short_description: SQL Server の重要なパフォーマンスメトリクスと健全性メトリクスを収集。
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
  - Offering::Integration
  configuration: README.md#Setup
  description: SQL Server の重要なパフォーマンスメトリクスと健全性メトリクスを収集。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-monitoring
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-monitoring-tools
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-performance
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  support: README.md#Support
  title: SQL Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![SQL Server のグラフ][1]

## 概要

SQL Server インテグレーションを使用して、SQL Server インスタンスのパフォーマンスを追跡できます。ユーザー接続の数、SQL のコンパイル率などのメトリクスを収集できます。

[データベースモニタリング][2] (DBM) を有効にすると、クエリのパフォーマンスとデータベースの健全性について詳細なインサイトを取得できます。標準のインテグレーションに加え、Datadog DBM では、クエリレベルのメトリクス、リアルタイムおよび過去のクエリスナップショット、待機イベントの分析情報、データベースの負荷、クエリ実行計画、ブロッキングを引き起こしているクエリについてのインサイトが提供されます。

SQL Server 2012、2014、2016、2017、2019、2022 がサポートされています。

## セットアップ

<div class="alert alert-info">このページでは、SQL Server Agent の標準インテグレーションについて説明します。SQL Server のデータベースモニタリング製品をお求めの場合は、<a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog データベースモニタリング</a>をご覧ください。</div>

### インストール

SQL Server チェックは [Datadog Agent][3] パッケージに含まれています。SQL Server インスタンスに追加でインストールする必要はありません。

サーバーのプロパティで "SQL Server and Windows Authentication mode" を有効にして、SQL Server インスタンスが SQL Server 認証をサポートするよう、次のように指定します。

_Server Properties_ -> _Security_ -> _SQL Server and Windows Authentication mode_

### 前提条件

**注**: Database Monitoring for SQL Server をインストールするには、[ドキュメントサイト][4]でホスティングソリューションを選択し、手順を確認してください。

SQL Server チェックでサポートされる SQL Server のバージョンは Database Monitoring と同じです。現在サポートされているバージョンは、[SQL Server のセットアップページ][5]の**セルフホスト**の見出しを参照してください。

標準のインテグレーションを単体でインストールする場合のみ、このガイドの下記の手順に進んでください。

1. 読み取り専用ログインを作成してサーバーに接続します。

    ```SQL
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

   データベースごとにファイルサイズのメトリクスを収集するには、作成したユーザー (`datadog`) にデータベースへの[接続権限アクセス][6]があることを確認するために、以下を実行します。

   ```SQL
       GRANT CONNECT ANY DATABASE to datadog; 
   ```

2. (AlwaysOn および `sys.master_files` メトリクスの場合に必要metrics) AlwaysOn および `sys.master_files` メトリクスを収集するには、以下の追加権限を付与します。

    ```SQL
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `sqlserver.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル sqlserver.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: odbc # alternative is 'adodbapi'
       driver: SQL Server
   ```

    ポートオートディスカバリーを使用する場合は、`SQL_PORT` に `0` を使用します。カスタムクエリを使用して独自のメトリクスを作成する方法など、すべてのオプションの詳細については、[チェックコンフィギュレーションの例][2]を参照してください。

    **注**: (デフォルトの) プロバイダー `SQLOLEDB` は、非推奨になります。新しい `MSOLEDBSQL` プロバイダーを使用するには、[Microsoft][3] からこのプロバイダーをダウンロードし、`sqlserver.d/conf.yaml`ファイルで `adoprovider` 変数を `MSOLEDBSQL19` に設定します。`MSOLEDBSQL` バージョン 18 以下を使用している場合は、代わりに `adoprovider` 変数を `MSOLEDBSQL` に設定します。また、以下のように指定することで、Windows 認証を使用し、ユーザー名とパスワードを指定せずに済ますこともできます。

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```


2. [Agent を再起動します][4]。

##### Linux

Linux ホスト上で SQL Server インテグレーションを実行するには、以下のような追加の構成設定が必要です。

1. ODBC SQL Server ドライバー ([Microsoft ODBC ドライバー][5]または [FreeTDS ドライバー][6]) をインストールします。
2. `odbc.ini` ファイルと `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。
3. `odbc` コネクターを使用し、`odbcinst.ini` ファイルで指定された正しいドライバーを指定するように `conf.yaml` ファイルを構成します。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. SQL Server のログの収集を開始するには、次の構成ブロックを `sqlserver.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    `path` パラメーターと `service` パラメーターの値を環境に合わせて変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[sqlserver.d/conf.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][4]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: http://www.freetds.org/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `sqlserver`                                                                                                                      |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<UNIQUEPASSWORD>", "connector": "odbc", "driver": "FreeTDS"}` |

`<UNIQUEPASSWORD>` をラベルではなく環境変数として渡す方法について、詳細は[オートディスカバリーテンプレート変数][2]を参照してください。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sqlserver", "service": "sqlserver"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションの `sqlserver` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sqlserver" >}}


これらのメトリクスのほとんどは、SQL Server の `sys.dm_os_performance_counters` テーブルにあります。

### イベント

SQL Server チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "sqlserver" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

ARM aarch64 プロセッサで Agent を実行している場合、Agent バージョン 7.48.0 にバンドルされているこのチェックのバージョン 14.0.0 以降、既知の問題があります。Python の依存関係がロードに失敗し、[Agent の status サブコマンド][7]を実行すると以下のメッセージが表示されます。

```
Loading Errors
  ==============
    sqlserver
    ---------
      Core Check Loader:
        Check sqlserver not found in Catalog
      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so
      Python Check Loader:
        unable to import module 'sqlserver': No module named 'sqlserver'
```

この問題は、チェックのバージョン 15.2.0 および Agent のバージョン 7.49.1 以降で修正されています。

## その他の参考資料

- [Datadog を使用した Azure SQL Database の監視][9]
- [SQL Server 監視のためのキーメトリクス][10]
- [SQL Server 監視ツール][11]
- [Datadog を使用した SQL Server パフォーマンスの監視][12]
- [カスタム SQL Server メトリクスによる詳細な監視][13]
- [Datadog で SQL ワークロードの Azure 移行を戦略化する][14]
- [Datadog Database Monitoring で SQL Server のパフォーマンスを最適化する][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard_02_2024.png
[2]: https://docs.datadoghq.com/ja/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/database_monitoring/#sqlserver
[5]: https://docs.datadoghq.com/ja/database_monitoring/setup_sql_server/
[6]: https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-server-permissions-transact-sql?view=sql-server-ver15
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[10]: https://www.datadoghq.com/blog/sql-server-monitoring
[11]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[12]: https://www.datadoghq.com/blog/sql-server-performance
[13]: https://www.datadoghq.com/blog/sql-server-metrics
[14]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
[15]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/