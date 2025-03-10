---
title: Oracle インテグレーションの設定 (Agent バージョン 7.50.1 未満)
---

## 概要

本ガイドでは、Datadog Agent のバージョンが 7.50.1 より低い場合における Oracle インテグレーションの設定方法を説明します。Agent の新しいバージョンでの設定方法など、Oracle インテグレーションに関する詳細については、[Oracle インテグレーションのドキュメント][1]を参照してください。

## セットアップ

### インストール

#### 前提条件

Oracle インテグレーションを使用するためには、ネイティブクライアント (追加のインストール手順は不要)、または Oracle Instant Client のいずれかを使用できます。

##### Oracle Instant Client

{{< tabs >}}
{{% tab "Linux" %}}
1. [Linux 用の Oracle Instant Client のインストール][1]に従ってください。

2. 以下を確認してください。
    - *Instant Client Basic* パッケージと *SDK* パッケージの両方がインストールされます。Oracle の[ダウンロードページ][2]にあります。

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

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html
[2]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
{{% /tab %}}

{{% tab "Windows" %}}
1. [Oracle Windows インストールガイド][1]に従って、Oracle Instant Client を構成します。

2. 以下を確認してください。
    - [Microsoft Visual Studio 2017 再頒布可能パッケージ][2]または適切なバージョンが Oracle Instant Client にインストールされます。

    - Oracle の[ダウンロードページ][18]の *Instant Client Basic* パッケージと *SDK* パッケージの両方がインストールされます。

    - 両方のパッケージは、特定のマシン上のすべてのユーザーが使用できる単一のディレクトリ (たとえば、`C:\oracle`) に抽出されます。

[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
{{% /tab %}}
{{< /tabs >}}

##### JDBC Driver

*注*: この方法は Linux でのみ機能します。

Java 8 以降は、JDBC Driver を使用するときに Agent が使用するライブラリの 1 つである JPype のシステムに必要です。

インストールしたら、次の手順を実行します。

1. [JDBC Driver JAR ファイルをダウンロード][4]します。
2. ダウンロードしたファイルのパスを `$CLASSPATH` に追加するか、チェックコンフィギュレーションファイルの `jdbc_driver_path` の下に追加します ([サンプル oracle.yaml][5] を参照)。

#### Datadog ユーザーの作成

{{< tabs >}}
{{% tab "スタンドアロン" %}}
Oracle Database サーバーへの適切なアクセス権を持つ、読み取り専用の `datadog` ユーザーを作成します。`SYSDBA` や `SYSOPER` などの管理者ユーザーで Oracle Database に接続し、以下を実行します。

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

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}
ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent の構成ディレクトリ][2]の root にある `conf.d/` フォルダーの `oracle.d/conf.yaml` ファイルを編集します。`server` と `port` を更新し、監視対象のデータベースを設定します。使用可能なすべての構成オプションの詳細については、[oracle.d/conf.yaml のサンプル][1]を参照してください。

   ```yaml
   init_config:

   instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1521

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query: `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: <SERVICE_NAME>

        ## @param username - string - required
        ## The username for the Datadog user account.
        #
        username: <USERNAME>

        ## @param password - string - required
        ## The password for the Datadog user account.
        #
        password: <PASSWORD>
   ```

2. [Agent を再起動します][3]。


#### カスタムクエリのみ

インスタンスのデフォルトのメトリクスチェックをスキップし、既存のメトリクス収集ユーザーでのみカスタムクエリを実行するには、値が `true` のタグ `only_custom_queries` を挿入します。これにより、Oracle インテグレーションの構成済みインスタンスがシステム、プロセス、およびテーブルスペースメトリクスの実行を防ぎ、[Datadog ユーザー作成](#datadog-user-creation)セクションで説明されているアクセス許可なしでカスタムクエリを実行できます。この構成エントリが省略された場合、指定したユーザーには、カスタムクエリを実行するためのテーブルアクセス許可が必要です。

```yaml
init_config:

instances:
  ## @param server - 文字列 - 必須
  ## Oracle Database Server の IP アドレスまたはホスト名。
  #
  - server: localhost:1521

    ## @param service_name - 文字列 - 必須
    ## Oracle Database サービス名。サーバーで利用可能なサービスを表示するには、
    ## 次のクエリを実行します。
    ## `SELECT value FROM v$parameter WHERE name='service_names'`
    #
    service_name: "<SERVICE_NAME>"

    ## @param username - 文字列 - 必須
    ## ユーザーアカウントのユーザー名。
    #
    username: <USER>

    ## @param password - 文字列 - 必須
    ## ユーザーアカウントのパスワード。
    #
    password: "<PASSWORD>"

    ## @param only_custom_queries - 文字列 - 任意
    ## このインスタンスに対してカスタムクエリのみを実行する場合は、
    ## このパラメーターを任意の値に設定します。
    #
    only_custom_queries: true
```

#### TCPS による Oracle への接続

1. TCPS (TCP with SSL) を使って Oracle に接続するには、`protocol` 構成オプションのコメントを解除して、`TCPS` を選択します。`server` オプションを更新して、監視する TCPS サーバーを設定します。

    ```yaml
    init_config:

    instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1522

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query:
        ## `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: "<SERVICE_NAME>"

        ## @param username - string - required
        ## The username for the user account.
        #
        username: <USER>

        ## @param password - string - required
        ## The password for the user account.
        #
        password: "<PASSWORD>"

        ## @param protocol - string - optional - default: TCP
        ## The protocol to connect to the Oracle Database Server. Valid protocols include TCP and TCPS.
        ##
        ## When connecting to Oracle Database via JDBC, `jdbc_truststore` and `jdbc_truststore_type` are required.
        ## More information can be found from Oracle Database's whitepaper:
        ##
        ## https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
        #
        protocol: TCPS
    ```

2. Oracle Database で TCPS 接続を許可するために、`sqlnet.ora`、`listener.ora`、`tnsnames.ora` を更新します。

##### JDBC を使用しない Oracle 経由の TCPS

JDBC を使用していない場合、Datadog Agent がデータベースに接続できることを確認します。構成オプションに入力された情報を使って、`sqlplus` コマンドラインツールを使用します。

```shell
sqlplus <USER>/<PASSWORD>@(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCPS)(HOST=<HOST>)(PORT=<PORT>))(SERVICE_NAME=<SERVICE_NAME>)))
```

[Oracle Instant Client][5] による接続を使用する際は、アプリケーションによって使用されるクライアントライブラリの `network/admin` ディレクトリに 3 つのファイルを移動します。
  * `tnsnames.ora`: アプリケーションの接続文字列で使用されるネットサービス名をデータベースサービスにマッピングします。
  * `sqlnet.ora`: Oracle Network の設定を構成します。
  * `cwallet.sso`: SSL または TLS 接続を有効にします。このファイルの安全性を確保するようにしてください。

##### JDBC による TCPS

JDBC を使用して Oracle Database に接続している場合は、`jdbc_truststore_path`、`jdbc_truststore_type`、および Truststore にパスワードがある場合は `jdbc_truststore_password` (オプション) も指定する必要があります。

**注**: SSO のトラストストアはパスワードを必要としません。

```yaml
    # `instances:` セクションで
    ...

    ## @param jdbc_truststore_path - 文字列 - オプション
    ## JDBC トラストストアのファイルパス。
    #
    jdbc_truststore_path: /path/to/truststore

    ## @param jdbc_truststore_type - 文字列 - オプション
    ## JDBC トラストストアのファイルタイプ。サポートされているトラストストアのタイプには、JKS、SSO、および PKCS12 があります。
    #
    jdbc_truststore_type: SSO

    ## @param jdbc_truststore_password - 文字列 - オプション
    ## JDBC で接続する際のトラストストアのパスワード。
    #
    # jdbc_truststore_password: <JDBC_TRUSTSTORE_PASSWORD>
```

TCPS on JDBC による Oracle Database への接続の詳細については、公式の [Oracle ホワイトペーパー][4]を参照してください。

[1]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
[5]: https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#install-the-wallet-and-network-configuration-files

{{% /tab %}}

{{% tab "コンテナ" %}}
コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `oracle`                                                                                                  |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                             |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%:1521", "service_name":"<SERVICE_NAME>", "username":"datadog", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/

{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `oracle` を探します。

## カスタムクエリ

カスタムクエリの指定もサポートされています。各クエリには、次の 2 つのパラメーターを含める必要があります。

| パラメーター       | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`         | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。                                                                                                                                                                                                                                                                                                                        |
| `columns`       | 列を表すリストです。左から右の順に並べられます。次の 2 つの必須データがあります。<br> a. `type` - 送信方法 (`gauge`、`count` など)。<br> b. name - メトリクス名のサフィックス。これは、完全なメトリクス名を形成するために使用されるサフィックスです。`type` が `tag` の場合、この列は、このクエリによって収集されるすべてのメトリクスに適用されるタグと見なされます。 |

オプションで、`tags` パラメーターを使用して、収集される各メトリクスにタグのリストを適用できます。

以下のメトリクスは

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

以下の構成例から作成されます。

```yaml
- query: | # 複数行のスクリプトが必要な場合は、パイプを使用します。
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

使用可能なすべての構成オプションの詳細については、[サンプル oracle.d/conf.yaml][5] を参照してください。

### 例

データベースロックの識別に役立つクエリコンフィギュレーションを作成します。

1. カスタムクエリを含めるには、`conf.d\oracle.d\conf.yaml` を変更します。`custom_queries` ブロックのコメントを解除し、必要なクエリと列を追加して、Agent を再起動します。

```yaml
  init_config:
  instances:
      - server: localhost:1521
        service_name: orcl11g.us.oracle.com
        username: datadog
        password: xxxxxxx
        jdbc_driver_path: /u01/app/oracle/product/11.2/dbhome_1/jdbc/lib/ojdbc6.jar
        tags:
          - db:oracle
        custom_queries:
          - query: |
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

3. 構成が完了すると、`oracle.custom_query.locks` メトリクスに基づいて[モニター][10]を作成できます。

## トラブルシューティング

### 一般的な問題

#### Oracle Native Client
- `DPY-6000: cannot connect to database` のエラーが発生した場合
  ```text
  Failed to connect to Oracle DB, error: DPY-6000: cannot connect to database. Listener refused connection. (Similar to ORA-12660)
  ```
 - Native Network Encryption または Checksumming が有効になっていないことを確認してください。有効になっている場合は、`use_instant_client: true` を設定して Instant Client 方式を使用する必要があります。

Oracle Instant Client のセットアップについて、詳しくは [Oracle インテグレーションに関するドキュメント][3]を参照してください。

#### Oracle Instant Client
- Oracle Instant Client ファイルと SDK ファイルの両方が同じディレクトリにあることを確認します。
ディレクトリの構造は次のようになります。
  ```text
  |___ BASIC_LITE_LICENSE
  |___ BASIC_LITE_README
  |___ adrci
  |___ genezi
  |___ libclntsh.so -> libclntsh.so.19.1
  |___ libclntsh.so.10.1 -> libclntsh.so.19.1
  |___ libclntsh.so.11.1 -> libclntsh.so.19.1
  |___ libclntsh.so.12.1 -> libclntsh.so.19.1
  |___ libclntsh.so.18.1 -> libclntsh.so.19.1
  |___ libclntsh.so.19.1
  |___ libclntshcore.so.19.1
  |___ libipc1.so
  |___ libmql1.so
  |___ libnnz19.so
  |___ libocci.so -> libocci.so.19.1
  |___ libocci.so.10.1 -> libocci.so.19.1
  |___ libocci.so.11.1 -> libocci.so.19.1
  |___ libocci.so.12.1 -> libocci.so.19.1
  |___ libocci.so.18.1 -> libocci.so.19.1
  |___ libocci.so.19.1
  |___ libociicus.so
  |___ libocijdbc19.so
  |___ liboramysql19.so
  |___ listener.ora
  |___ network
  |   `___ admin
  |       |___ README
  |       |___ cwallet.sso
  |       |___ sqlnet.ora
  |       `___ tnsnames.ora
  |___ ojdbc8.jar
  |___ ucp.jar
  |___ uidrvci
  `___ xstreams.jar
  ```

#### JDBC Driver (Linux のみ)
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

- もし `Unsupported major.minor version 52.0` というエラーが発生した場合は、使用している Java のバージョンが古すぎることを意味します。システムの Java を更新するか、または新しいバージョンを追加でインストールし、上記のとおり `JAVA_HOME` 変数を新しいインストール先に指定する必要があります。

- Agent から次のコマンドを実行して、環境変数が正しく設定されていることを確認します。
表示された出力が正しい値と一致することを確認してください。

    ```shell script
      sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/python -c "import os; print(\"JAVA_HOME:{}\".format(os.environ.get(\"JAVA_HOME\")))"
    ```

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/oracle/?tab=linux
[2]: https://oracle.github.io/python-oracledb/
[3]: https://github.com/DataDog/integrations-core/tree/7.41.x/oracle#oracle-instant-client
[4]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[5]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/monitors/monitor_types/metric/?tab=threshold
[11]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/oracle/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/
[18]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm