---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: sqlserver
  metrics_metadata: metadata.csv
  monitors:
    SQLServer ao not healthy: assets/recommended_monitors/sqlserver_ao_not_healthy.json
    SQLServer db not in sync: assets/recommended_monitors/sqlserver_db_not_sync.json
    SQLServer db not online: assets/recommended_monitors/sqlserver_db_not_online.json
    SQLServer high failed auto param: assets/recommended_monitors/sqlserver_high_number_failed_auto_param.json
    SQLServer high processes blocked: assets/recommended_monitors/sqlserver_high_processes_blocked.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md'
display_name: SQL Server
draft: false
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

SQL Server チェックを使用して、SQL Server インスタンスのパフォーマンスを追跡できます。ユーザー接続の数、SQL のコンパイル率などのメトリクスを収集できます。

チェックでカスタムクエリを実行することで、独自のメトリクスを作成することもできます。

## セットアップ

### インストール

SQL Server チェックは [Datadog Agent][2] パッケージに含まれています。SQL Server インスタンスに追加でインストールする必要はありません。

サーバーのプロパティで "SQL Server and Windows Authentication mode" を有効にして、SQL Server インスタンスが SQL Server 認証をサポートするよう、次のように指定します。

_Server Properties_ -> _Security_ -> _SQL Server and Windows Authentication mode_

### 前提条件

1. 読み取り専用ログインを作成してサーバーに接続します。

    ```text
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

2. SQL Server インスタンスが、特定の固定ポートをリッスンしていることを確認します。デフォルトでは、名前付きインスタンスおよび SQL Server Express は動的ポート用に構成されています。詳細は、[Microsoft のドキュメント][3] をご参照ください。

3. (AlwaysOn メトリクスに必須)  AlwaysOn メトリクスを収集するには、追加の権限が必要です。

    ```text
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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
        encoding: utf-16-le
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

[Agent の status サブコマンドを実行][4]し、Checks セクションの `sqlserver` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sqlserver" >}}


これらのメトリクスのほとんどは、SQL Server の `sys.dm_os_performance_counters` テーブルにあります。

### イベント

SQL Server チェックには、イベントは含まれません。

### サービスのチェック

**sqlserver.can_connect**:<br>
Agent が SQL Server に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法については、[メインドキュメント][6]を参照してください。

## その他の参考資料

- [Datadog を使用した Azure SQL Database の監視][7]
- [SQL Server 監視のためのキーメトリクス][8]
- [SQL Server 監視ツール][9]
- [Datadog を使用した SQL Server パフォーマンスの監視][10]
- [カスタム SQL Server メトリクスによる詳細な監視][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.microsoft.com/en-us/sql/tools/configuration-manager/tcp-ip-properties-ip-addresses-tab
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://docs.datadoghq.com/ja/developers/integrations/
[7]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[8]: https://www.datadoghq.com/blog/sql-server-monitoring
[9]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[10]: https://www.datadoghq.com/blog/sql-server-performance
[11]: https://www.datadoghq.com/blog/sql-server-metrics