---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    oracle: assets/dashboards/oracle_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/oracle/README.md'
display_name: Oracle Database
draft: false
git_integration_title: oracle
guid: 6c4ddc46-2763-4c56-8b71-c838b7f82d7b
integration_id: oracle
integration_title: Oracle
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oracle.
metric_to_check: oracle.session_count
name: Oracle
public_title: Datadog-Oracle インテグレーション
short_description: エンタープライズグリッドコンピューティング向け Oracle リレーショナルデータベースシステム
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Oracle ダッシュボード][1]

## 概要

Oracle Database サーバーからメトリクスをリアルタイムに取得して、可用性とパフォーマンスを視覚化および監視できます。

## セットアップ

### インストール

#### 前提条件

Oracle インテグレーションを使用するには、Oracle Instant Client ライブラリをインストールするか、Oracle JDBC Driver をダウンロードする必要があります (Linux のみ)。
ライセンスの制約により、これらのライブラリは Datadog Agent に含まれていませんが、Oracle から直接ダウンロードできます。

##### Oracle Instant Client

{{< tabs >}}
{{% tab "Linux" %}}
###### Linux

1. [Linux 用の Oracle Instant Client のインストール][1]に従ってください。

2. 以下を確認してください。
    - *Instant Client Basic* パッケージと *SDK* パッケージの両方がインストールされます。これらは[ダウンロードページ][2]にあります。

      Instant Client ライブラリのインストール後に、ランタイムリンカがライブラリを見つけることができることを確認します。たとえば、`ldconfig` を使用します。

       ```shell
       # Put the library location in an ld configuration file.

       sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
           /etc/ld.so.conf.d/oracle-instantclient.conf"

       # Update the bindings.

       sudo ldconfig
       ```

    - 両方のパッケージは、特定のマシン上のすべてのユーザーが使用できる単一のディレクトリ (たとえば、`/opt/oracle`) に解凍されます。
       ```shell
       mkdir -p /opt/oracle/ && cd /opt/oracle/
       unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
       unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
       ```

{{< /tabs >}}
{{% tab "Windows" %}}
###### Windows

1. [Oracle Windows インストールガイド][3]に従って、Oracle Instant Client を構成します。

2. 以下を確認してください。
    - [Microsoft Visual Studio 2017 再頒布可能パッケージ][4]または適切なバージョンが Oracle Instant Client にインストールされます。

    - この[ダウンロードページ][2]の *Instant Client Basic* パッケージと *SDK* パッケージの両方がインストールされます。

    - 両方のパッケージは、特定のマシン上のすべてのユーザーが使用できる単一のディレクトリ (たとえば、`C:\oracle`) に抽出されます。

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html
[2]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
[3]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[4]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
{{% /tab %}}
{{< /tabs >}}

##### JDBC Driver

*注*: この方法は Linux でのみ機能します。

Java 8 以降は、JDBC ドライバーを使用するときに Agent が使用するライブラリの 1 つである JPype のシステムに必要です。

インストールしたら、次の手順を実行します。

1. [JDBC Driver jar ファイルをダウンロード][2]します。
2. ダウンロードしたファイルのパスを `$CLASSPATH` に追加するか、チェック構成ファイルの `jdbc_driver_path` の下に追加します ([サンプル oracle.yaml][3] を参照)。

#### Datadog ユーザーの作成

{{< tabs >}}
{{% tab "スタンドアロン" %}}

Oracle Database サーバーへの適切なアクセス権を持つ、読み取り専用の `datadog` ユーザーを作成します。管理者ユーザー (SYSDBA` または `SYSOPER`) で Oracle Database に接続し、以下を実行します。

```text
-- Oracle Script を有効にします。
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- Datadog ユーザーを作成します。パスワードのプレースホルダーは、安全なパスワードに置き換えてください。
CREATE USER datadog IDENTIFIED BY <パスワード>;

-- Datadog ユーザーにアクセス権を付与します。
GRANT CONNECT TO datadog;
GRANT SELECT ON GV_$PROCESS TO datadog;
GRANT SELECT ON gv_$sysmetric TO datadog;
GRANT SELECT ON sys.dba_data_files TO datadog;
GRANT SELECT ON sys.dba_tablespaces TO datadog;
GRANT SELECT ON sys.dba_tablespace_usage_metrics TO datadog;
```

**注**: Oracle 11g を使用している場合、次の行を実行する必要はありません。

```text
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```

{{% /tab %}}
{{% tab "マルチテナント" %}}

##### Oracle 12c または 19c

管理者としてルートデータベースにログインして、`datadog` ユーザーを作成し、アクセス許可を付与します。

```text
alter session set container = cdb$root;
CREATE USER c##datadog IDENTIFIED BY password CONTAINER=ALL;
GRANT CREATE SESSION TO c##datadog CONTAINER=ALL;
Grant select any dictionary to c##datadog container=all;
GRANT SELECT ON GV_$PROCESS TO c##datadog CONTAINER=ALL;
GRANT SELECT ON gv_$sysmetric TO c##datadog CONTAINER=ALL;
```

{{% /tab %}}
{{< /tabs >}}

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `oracle.d/conf.yaml` ファイルを編集します。`server` と `port` を更新し、監視するマスターを設定します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル oracle.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The IP address or hostname of the Oracle Database Server.
     #
     - server: localhost:1521

       ## @param service_name - string - required
       ## The Oracle Database service name. To view the services available on your server,
       ## run the following query:
       ## `SELECT value FROM v$parameter WHERE name='service_names'`
       #
       service_name: "<SERVICE_NAME>"

       ## @param user - string - required
       ## The username for the user account.
       #
       user: datadog

       ## @param password - string - required
       ## The password for the user account.
       #
       password: "<PASSWORD>"
   ```

2. [Agent を再起動します][3]。

#### カスタムクエリのみ

インスタンスのデフォルトのメトリクスチェックをスキップし、既存のメトリクス収集ユーザーでのみカスタムクエリを実行するには、値が true のタグ `only_custom_queries` を挿入します。これにより、Oracle インテグレーションの構成済みインスタンスがシステム、プロセス、およびテーブルスペースメトリクスの実行をスキップし、[Datadog ユーザー作成](#datadog-user-creation)セクションで説明されているアクセス許可なしでカスタムクエリを実行できます。この構成エントリが省略された場合、指定したユーザーには、カスタムクエリを実行するためのテーブルアクセス許可が必要です。

```yaml
init_config:

instances:
  ## @param server - string - required
  ## The IP address or hostname of the Oracle Database Server.
  #
  - server: localhost:1521

    ## @param service_name - string - required
    ## The Oracle Database service name. To view the services available on your server,
    ## run the following query:
    ## `SELECT value FROM v$parameter WHERE name='service_names'`
    #
    service_name: "<SERVICE_NAME>"

    ## @param user - string - required
    ## The username for the user account.
    #
    user: <USER>

    ## @param password - string - required
    ## The password for the user account.
    #
    password: "<PASSWORD>"

    ## @param only_custom_queries - string - optional
    ## Set this parameter to any value if you want to only run custom
    ## queries for this instance.
    #
    only_custom_queries: true
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `oracle`                                                                                                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                             |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%:1521", "service_name":"<サービス名>", "user":"datadog", "password":"<パスワード>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `oracle` を探します。

## カスタムクエリ

カスタムクエリの指定もサポートされています。各クエリには、次の 3 つのパラメーターを含める必要があります。

| パラメーター       | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_prefix` | 各メトリクスのプレフィックス。                                                                                                                                                                                                                                                                                                                                                                                                         |
| `query`         | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。                                                                                                                                                                                                                                                                                                                        |
| `columns`       | 列を表すリストです。左から右の順に並べられます。次の 2 つの必須データがあります。<br> a. `type` - 送信方法 (`gauge`、`count` など)。<br> b. name - メトリクス名のサフィックス。これが `metric_prefix` に付加されて完全な名前になります。`type` が `tag` の場合、この列は、このクエリによって収集されるすべてのメトリクスに適用されるタグと見なされます。 |

オプションで、`tags` パラメーターを使用して、収集される各メトリクスにタグのリストを適用できます。

以下のメトリクスは

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

以下の構成例から作成されます。

```yaml
- metric_prefix: oracle.custom_query
  query: |  # 複数行のスクリプトが必要な場合は、パイプを使用します。
   SELECT columns
   FROM tester.test_table
   WHERE conditions
  columns:
  # スキップする列にはこれを入れます。
  - {}
  - name: metric1
    type: gauge
  - name: tag1
    type: tag
  - name: metric2
    type: count
  tags:
  - tester:oracle
```

使用可能なすべての構成オプションの詳細については、[サンプル oracle.d/conf.yaml][3] を参照してください。

### 例

データベースロックの識別に役立つクエリコンフィギュレーションを作成します。

1. カスタムクエリを含めるには、`conf.d\oracle.d\conf.yaml` を変更します。`custom_queries` ブロックのコメントを解除し、必要なクエリと列を追加して、Agent を再起動します。

```yaml
  init_config:
  instances:
      - server: localhost:1521
        service_name: orcl11g.us.oracle.com
        user: datadog
        password: xxxxxxx
        jdbc_driver_path: /u01/app/oracle/product/11.2/dbhome_1/jdbc/lib/ojdbc6.jar
        tags:
          - db:oracle
        custom_queries:
          - metric_prefix: oracle.custom_query.locks
            query: |
              select blocking_session, username, osuser, sid, serial# as serial, wait_class, seconds_in_wait
              from v_$session
              where blocking_session is not NULL order by blocking_session
            columns:
              - name: blocking_session
                type: gauge
              - name: username
                type: tag
              - name: osuser
                type: tag
              - name: sid
                type: tag
              - name: serial
                type: tag
              - name: wait_class
                type: tag
              - name: seconds_in_wait
                type: tag
```

2. `v_$session` にアクセスするには、`DATADOG` にアクセス許可を付与し、アクセス許可をテストします。

```text
SQL> grant select on sys.v_$session to datadog;

##アクセスを検証するために DD ユーザーと接続します。


SQL> show user
USER is "DATADOG"


##ビューを表示するための同義語の作成
SQL> create synonym datadog.v_$session for sys.v_$session;


Synonym created.


SQL> select blocking_session,username,osuser, sid, serial#, wait_class, seconds_in_wait from v_$session
where blocking_session is not NULL order by blocking_session;
```

3. 構成が完了すると、`oracle.custom_query.locks` メトリクスに基づいて[モニター][5]を作成できます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oracle" >}}


### イベント

Oracle Database チェックには、イベントは含まれません。

### サービスのチェック

**oracle.can_connect**<br>
データベースが使用可能で接続を受け入れているかを検証します。

## トラブルシューティング

### 一般的な問題
#### Oracle Instant Client
- Oracle Instant Client ファイルと SDK ファイルの両方が同じディレクトリにあることを確認します。
ディレクトリの構造は次のようになります。

```text
|____sdk/
|____network/
|____libociei.dylib
|____libocci.dylib
|____libocci.dylib.10.1
|____adrci
|____uidrvci
|____libclntsh.dylib.19.1
|____ojdbc8.jar
|____BASIC_README
|____liboramysql19.dylib
|____libocijdbc19.dylib
|____libocci.dylib.19.1
|____libclntsh.dylib
|____xstreams.jar
|____libclntsh.dylib.10.1
|____libnnz19.dylib
|____libclntshcore.dylib.19.1
|____libocci.dylib.12.1
|____libocci.dylib.18.1
|____libclntsh.dylib.11.1
|____BASIC_LICENSE
|____SDK_LICENSE
|____libocci.dylib.11.1
|____libclntsh.dylib.12.1
|____libclntsh.dylib.18.1
|____ucp.jar
|____genezi
|____SDK_README

```

##### Linux
- [Oracle][6] の Linux インストールドキュメントを参照してください。

##### Windows
- ご使用のバージョンで Microsoft Visual Studio <YEAR> 再頒布可能パッケージの要件が満たされていることを確認します。詳細については、[Windows ダウンロードページ][7]を参照してください。
- [Oracle][8] の詳細な Windows インストールドキュメントを参照してください。


#### JDBC ドライバー (Linux のみ)
- `JVMNotFoundException` が発生した場合:

    ```text
    JVMNotFoundException("No JVM shared library file ({jpype._jvmfinder.JVMNotFoundException: No JVM shared library file (libjvm.so) found. Try setting up the JAVA_HOME environment variable properly.})"
    ```

    - `JAVA_HOME` 環境変数が設定され、正しいディレクトリを指していることを確認してください。
    - 環境変数を `/etc/environment` に追加します:
        ```text
        JAVA_HOME=/path/to/java
        ```
    - 次に、Agent を再起動します。

- Agent から次のコマンドを実行して、環境変数が正しく設定されていることを確認します。
表示された出力が正しい値と一致することを確認してください。

    ```shell script
      sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/python -c "import os; print("JAVA_HOME:{}".format(os.environ.get("JAVA_HOME")))"
    ```

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[3]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/monitors/monitor_types/metric/?tab=threshold
[6]: https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html
[7]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
[8]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[9]: https://docs.datadoghq.com/ja/help/