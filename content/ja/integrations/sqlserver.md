---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md'
display_name: SQL Server
git_integration_title: sqlserver
guid: 635cb962-ee9f-4788-aa55-a7ffb9661498
integration_id: sql-server
integration_title: SQL Server
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sqlserver.
metric_to_check: sqlserver.stats.connections
name: sqlserver
public_title: Datadog-SQL Server インテグレーション
short_description: SQL Server の重要なパフォーマンスメトリクスと健全性メトリクスを収集
support: コア
supported_os:
  - linux
  - windows
---
![SQL Server のグラフ][1]

## 概要

このチェックを使用して、SQL Server インスタンスのパフォーマンスを追跡できます。ユーザー接続の数、SQL のコンパイル率などのメトリクスを収集できます。

チェックでカスタムクエリを実行することで、独自のメトリクスを作成することもできます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

SQL Server チェックは [Datadog Agent][3] パッケージに含まれています。SQL Server インスタンスに追加でインストールする必要はありません。

サーバーのプロパティで "SQL Server and Windows Authentication mode" を有効にして、SQL Server インスタンスが SQL Server 認証をサポートするようにします。
それには、**Server Properties** -> **Security** -> **SQL Server and Windows Authentication mode** を指定します。

### コンフィグレーション

1. 読み取り専用ログインを作成してサーバーに接続します。

    ```
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

2. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーにファイル `sqlserver.d/conf.yaml` を作成します。
    使用可能なすべての構成オプションの詳細については、[サンプル sqlserver.d/conf.yaml][5] を参照してください。

    ```yaml
        init_config:

        instances:
          - host: <SQL_HOST>,<SQL_PORT>
            username: datadog
            password: <YOUR_PASSWORD>
            connector: odbc # alternative is 'adodbapi'
            driver: SQL Server
    ```

    カスタムクエリを使用して独自のメトリクスを作成する方法など、すべてのオプションの詳細については、[チェック構成の例][5]を参照してください。

    **注**: (デフォルトの) プロバイダー `SQLOLEDB` は、非推奨になります。新しい `MSOLEDBSQL` プロバイダーを使用するには、[Microsoft][6] からこのプロバイダーをダウンロードし、`sqlserver.d/conf.yaml`ファイルで `adoprovider` 変数を `MSOLEDBSQL` に設定します。
    **注**: また、以下のように指定することで、Windows 認証を使用する際に、ユーザー名とパスワードの入力を求めないようにすることもできます。
    ```yaml
    connection_string: "Trusted_Connection=yes"
    ```

3. [Agent を再起動][7]すると、Datadog への SQL Server メトリクスの送信が開始されます。

#### Linux

Linux ホスト上で SQL Server インテグレーションを実行するには、以下のような追加の構成設定が必要です。

1. ODBC SQL Server ドライバー ([Microsoft ODBC ドライバー][8]など) をインストールします。
2. `odbc.ini` ファイルと `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。
3. `odbc` コネクターを使用し、`odbcinst.ini ファイル`で指定された正しいドライバーを指定するように `conf.yaml` ファイルを設定します。

### 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションの `sqlserver` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "sqlserver" >}}


これらのメトリクスのほとんどは、SQL Server の `sys.dm_os_performance_counters` テーブルにあります。

### イベント
SQL Server チェックには、イベントは含まれません。

### サービスのチェック

**sqlserver.can_connect**:

Agent が SQL Server に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法については、[メインドキュメント][12]を参照してください。

### テストのガイドライン

#### Windows

Windows でテストを実行する際は、MSSQL のインスタンスがホストで実行されることが必要です。データベースインスタンスの名前と認証情報は、CI 環境にある情報が使用されます。このため、ローカルの開発環境では、これらをそのまま使用できない場合があります。

#### Linux

Linux では、MSSQL インスタンスを実行する Docker コンテナが、テストの実行前に自動的に起動されます。データベースとの対話には unixODBC と [FreeTDS][13] が使用されます。このため、Linux ディストリビューションによっては、テストを実行する前に、ローカルの開発環境に追加の依存関係をインストールする必要があります。たとえば、Ubuntu 14.04 の場合のインストール手順は以下のとおりです。

```
sudo apt-get install unixodbc unixodbc-dev tdsodbc
```

#### OSX

Linux と同様に、MSSQL は Docker コンテナで実行され、データベースとの対話には unixODBC と [FreeTDS][13] が使用されます。[homebrew][14] を使用して必要なパッケージをインストールできます。

```
brew install unixodbc
brew install freetds --with-unixodbc
```

## その他の参考資料

* [Datadog を使用した Azure SQL Database の監視][15]
* [SQL Server 監視のためのキーメトリクス][16]
* [SQL Server 監視ツール][17]
* [Datadog を使用した SQL Server パフォーマンスの監視][18]
* [カスタム SQL Server メトリクスによる詳細な監視][19]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[6]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/metadata.csv
[11]: https://docs.datadoghq.com/ja/help
[12]: https://docs.datadoghq.com/ja/developers/integrations
[13]: http://www.freetds.org
[14]: https://brew.sh
[15]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[16]: https://www.datadoghq.com/blog/sql-server-monitoring
[17]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[18]: https://www.datadoghq.com/blog/sql-server-performance
[19]: https://www.datadoghq.com/blog/sql-server-metrics


{{< get-dependencies >}}