---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: sqlserver
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
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
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sqlserver.
metric_to_check: sqlserver.stats.connections
name: sqlserver
public_title: Datadog-SQL Server インテグレーション
short_description: SQL Server の重要なパフォーマンスメトリクスと健全性メトリクスを収集。
support: コア
supported_os:
  - linux
  - mac_os
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

### 前提条件

読み取り専用ログインを作成してサーバーに接続します。

   ```text
       CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
       CREATE USER datadog FOR LOGIN datadog;
       GRANT SELECT on sys.dm_os_performance_counters to datadog;
       GRANT VIEW SERVER STATE to datadog;
   ```

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `sqlserver.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル sqlserver.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: odbc # alternative is 'adodbapi'
       driver: SQL Server
   ```

    カスタムクエリを使用して独自のメトリクスを作成する方法など、すべてのオプションの詳細については、[チェックコンフィギュレーションの例][2]を参照してください。

    **注**: (デフォルトの) プロバイダー `SQLOLEDB` は、非推奨になります。新しい `MSOLEDBSQL` プロバイダーを使用するには、[Microsoft][3] からこのプロバイダーをダウンロードし、`sqlserver.d/conf.yaml`ファイルで `adoprovider` 変数を `MSOLEDBSQL` に設定します。また、以下のように指定することで、Windows 認証を使用する際に、ユーザー名とパスワードの入力を求めないようにすることもできます。

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```

2. [Agent を再起動します][4]。

##### Linux

Linux ホスト上で SQL Server インテグレーションを実行するには、以下のような追加の構成設定が必要です。

1. ODBC SQL Server ドライバー ([Microsoft ODBC ドライバー][5]など) をインストールします。
2. `odbc.ini` ファイルと `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。
3. `odbc` コネクターを使用し、`odbcinst.ini ファイル` で指定された正しいドライバーを指定するように `conf.yaml` ファイルを構成します。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. SQL Server のログの収集を開始するには、次の構成ブロックを `sqlserver.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    `path` パラメーターと `service` パラメーターの値を環境に合わせて変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[sqlserver.d/conf.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][4]。

Kubernetes 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][6]を参照してください。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `sqlserver`                                                                                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                                                    |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<UNIQUEPASSWORD>", "connector": "odbc", "driver": "FreeTDS"}` |

`<UNIQUEPASSWORD>` をラベルではなく環境変数として渡す方法について、詳細は[オートディスカバリーテンプレート変数][2]を参照してください。

##### ログの収集

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

[Agent の `status` サブコマンドを実行][4]し、Checks セクションの `sqlserver` を探します。

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

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法については、[メインドキュメント][6]を参照してください。

### テストのガイドライン

#### Windows

Windows でテストを実行する際は、MSSQL のインスタンスがホストで実行されることが必要です。データベースインスタンスの名前と認証情報は、CI 環境にある情報が使用されます。このため、ローカルの開発環境では、これらをそのまま使用できない場合があります。

#### Linux

Linux では、MSSQL インスタンスを実行する Docker コンテナが、テストの実行前に自動的に起動されます。データベースとの対話には unixODBC と [FreeTDS][7] が使用されます。このため、Linux ディストリビューションによっては、テストを実行する前に、ローカルの開発環境に追加の依存関係をインストールする必要があります。たとえば、Ubuntu 14.04 の場合のインストール手順は以下のとおりです。

```shell
sudo apt-get install unixodbc unixodbc-dev tdsodbc
```

#### OSX

Linux と同様に、MSSQL は Docker コンテナで実行され、データベースとの対話には unixODBC と [FreeTDS][7] が使用されます。[homebrew][8] を使用して必要なパッケージをインストールできます。

```shell
brew install unixodbc freetds
```

## その他の参考資料

- [Datadog を使用した Azure SQL Database の監視][9]
- [SQL Server 監視のためのキーメトリクス][10]
- [SQL Server 監視ツール][11]
- [Datadog を使用した SQL Server パフォーマンスの監視][12]
- [カスタム SQL Server メトリクスによる詳細な監視][13]





[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://docs.datadoghq.com/ja/developers/integrations/
[7]: http://www.freetds.org
[8]: https://brew.sh
[9]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[10]: https://www.datadoghq.com/blog/sql-server-monitoring
[11]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[12]: https://www.datadoghq.com/blog/sql-server-performance
[13]: https://www.datadoghq.com/blog/sql-server-metrics