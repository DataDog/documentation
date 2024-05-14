---
app_id: oracle
app_uuid: 34835d2b-a812-4aac-8cc2-d298db851b80
assets:
  dashboards:
    DBM Oracle Database Overview: assets/dashboards/dbm_oracle_database_overview.json
    oracle: assets/dashboards/oracle_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: oracle.session_count
      metadata_path: metadata.csv
      prefix: oracle.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10000
    source_type_name: Oracle Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- network
- oracle
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oracle/README.md
display_on_public_website: true
draft: false
git_integration_title: oracle
integration_id: oracle
integration_title: Oracle
integration_version: 5.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: oracle
public_title: Oracle
short_description: エンタープライズグリッドコンピューティング向け Oracle リレーショナルデータベースシステム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::ネットワーク
  - Category::Oracle
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: エンタープライズグリッドコンピューティング向け Oracle リレーショナルデータベースシステム
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Oracle ダッシュボード][1]

## 概要

Oracle インテグレーションは、Oracle データベースの健全性とパフォーマンスに関するメトリクスをほぼリアルタイムで提供します。提供されるダッシュボードでこれらのメトリクスを可視化するとともに、モニターを作成して Oracle データベースの状態についてチームに警告を発することができます。

[Database Monitoring][2] (DBM) を有効にすると、クエリのパフォーマンスとデータベースの健全性について詳細なインサイトを取得できます。標準のインテグレーション機能に加え、Datadog DBM では、クエリレベルのメトリクス、リアルタイムおよび過去のクエリスナップショット、待機イベントの分析情報、データベースの負荷、クエリ実行計画、ブロッキングを引き起こしているクエリについてのインサイトが提供されます。


## 計画と使用

### インフラストラクチャーリスト

#### 前提条件

Oracle インテグレーションを使用するためには、ネイティブクライアント (追加のインストール手順は不要)、または Oracle Instant Client のいずれかを使用できます。

##### Oracle Instant Client

Instant Client を使用していない場合は、この手順をスキップしてください。

{{< tabs >}}

{{% tab "Linux" %}}
###### Linux

1. [Linux 用の Oracle Instant Client のインストール][1]に従ってください。

2. *Instant Client Basic* パッケージがインストールされていることを確認します。Oracle の[ダウンロードページ][2]を参照してください。

   Instant Client ライブラリのインストール後に、ランタイムリンカがライブラリを見つけることができることを確認します。例:

      ```shell
      # Put the library location in the /etc/datadog-agent/environment file.

      echo "LD_LIBRARY_PATH=/u01/app/oracle/product/instantclient_19" \
      >> /etc/datadog-agent/environment
      ```

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/19/mxcli/installing-and-removing-oracle-database-client.html
[2]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}

{{% tab "Windows" %}}
###### ログの収集

1. [Oracle Windows インストールガイド][1]に従って、Oracle Instant Client を構成します。

2. 以下を確認してください。
    - [Microsoft Visual Studio 2017 再頒布可能パッケージ][2]または適切なバージョンが Oracle Instant Client にインストールされます。

    - Oracle の[ダウンロードページ][3]にある *Instant Client Basic* パッケージがインストールされ、指定されたマシン上のすべてのユーザーが使用できる (例: `C:\oracle\instantclient_19`)。

    - 環境変数 `PATH` には、Instant Client のあるディレクトリ (例: `C:\oracle\instantclient_19`) が含まれている。


[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
[3]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}
{{< /tabs >}}

#### Datadog ユーザーの作成

{{< tabs >}}
{{% tab "マルチテナント" %}}
##### マルチテナント

###### ユーザーの作成

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```

###### 権限付与

`sysdba` としてログオンし、以下の権限を付与します。

```SQL
grant create session to c##datadog ;
grant select on v_$session to c##datadog ;
grant select on v_$database to c##datadog ;
grant select on v_$containers to c##datadog;
grant select on v_$sqlstats to c##datadog ;
grant select on v_$instance to c##datadog ;
grant select on dba_feature_usage_statistics to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$PROCESS to c##datadog ;
grant select on V_$SESSION to c##datadog ;
grant select on V_$CON_SYSMETRIC to c##datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to c##datadog ;
grant select on CDB_TABLESPACES to c##datadog ;
grant select on V_$SQLCOMMAND to c##datadog ;
grant select on V_$DATAFILE to c##datadog ;
grant select on V_$SYSMETRIC to c##datadog ;
grant select on V_$SGAINFO to c##datadog ;
grant select on V_$PDBS to c##datadog ;
grant select on CDB_SERVICES to c##datadog ;
grant select on V_$OSSTAT to c##datadog ;
grant select on V_$PARAMETER to c##datadog ;
grant select on V_$SQLSTATS to c##datadog ;
grant select on V_$CONTAINERS to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$SQL to c##datadog ;
grant select on V_$PGASTAT to c##datadog ;
grant select on v_$asm_diskgroup to c##datadog ;
grant select on v_$rsrcmgrmetric to c##datadog ;
grant select on v_$dataguard_config to c##datadog ;
grant select on v_$dataguard_stats to c##datadog ;
grant select on v_$transaction to c##datadog;
grant select on v_$locked_object to c##datadog;
grant select on dba_objects to c##datadog;
grant select on cdb_data_files to c##datadog;
grant select on dba_data_files to c##datadog;
```

プラグ可能データベース (PDB) 上で実行するカスタムクエリを構成した場合は、`C##DATADOG` ユーザーに `set container` 権限を付与する必要があります。

```SQL
connect / as sysdba
alter session set container = your_pdb ;
grant set container to c##datadog ;
```

{{% /tab %}}

{{% tab "Non-CDB" %}}
##### Non-CDB

###### ユーザーの作成

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```

###### 権限付与

`sysdba` としてログオンし、以下の権限を付与します。

```SQL
grant create session to datadog ;
grant select on v_$session to datadog ;
grant select on v_$database to datadog ;
grant select on v_$containers to datadog;
grant select on v_$sqlstats to datadog ;
grant select on v_$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$PROCESS to datadog ;
grant select on V_$SESSION to datadog ;
grant select on V_$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V_$SQLCOMMAND to datadog ;
grant select on V_$DATAFILE to datadog ;
grant select on V_$SYSMETRIC to datadog ;
grant select on V_$SGAINFO to datadog ;
grant select on V_$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V_$OSSTAT to datadog ;
grant select on V_$PARAMETER to datadog ;
grant select on V_$SQLSTATS to datadog ;
grant select on V_$CONTAINERS to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$SQL to datadog ;
grant select on V_$PGASTAT to datadog ;
grant select on v_$asm_diskgroup to datadog ;
grant select on v_$rsrcmgrmetric to datadog ;
grant select on v_$dataguard_config to datadog ;
grant select on v_$dataguard_stats to datadog ;
grant select on v_$transaction to datadog;
grant select on v_$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{% tab "RDS" %}}
##### Splunk

###### ユーザーの作成

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### 権限付与

```SQL
grant create session to datadog ;
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATABASE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$INSTANCE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_FEATURE_USAGE_STATISTICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PROCESS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CON_SYSMETRIC','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACE_USAGE_METRICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACES','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLCOMMAND','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAFILE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SGAINFO','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SYSMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PDBS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_SERVICES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$OSSTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PARAMETER','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PGASTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$ASM_DISKGROUP','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$RSRCMGRMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_CONFIG','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_STATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TRANSACTION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOCKED_OBJECT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_OBJECTS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
```

{{% /tab %}}

{{% tab "Oracle Autonomous Database" %}}
##### Oracle Autonomous Database

###### ユーザーの作成

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### 権限付与

```SQL
grant create session to datadog ;
grant select on v$session to datadog ;
grant select on v$database to datadog ;
grant select on v$containers to datadog;
grant select on v$sqlstats to datadog ;
grant select on v$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$PROCESS to datadog ;
grant select on V$SESSION to datadog ;
grant select on V$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V$SQLCOMMAND to datadog ;
grant select on V$DATAFILE to datadog ;
grant select on V$SYSMETRIC to datadog ;
grant select on V$SGAINFO to datadog ;
grant select on V$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V$OSSTAT to datadog ;
grant select on V$PARAMETER to datadog ;
grant select on V$SQLSTATS to datadog ;
grant select on V$CONTAINERS to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$SQL to datadog ;
grant select on V$PGASTAT to datadog ;
grant select on v$asm_diskgroup to datadog ;
grant select on v$rsrcmgrmetric to datadog ;
grant select on v$dataguard_config to datadog ;
grant select on v$dataguard_stats to datadog ;
grant select on v$transaction to datadog;
grant select on v$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{< /tabs >}}

### ブラウザトラブルシューティング

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent の構成ディレクトリ][3]の root にある `conf.d/` フォルダーの `oracle.d/conf.yaml` ファイルを編集します。`server` と `port` を更新し、監視するマスターを設定します。使用可能なすべての構成オプションの詳細については、[oracle.d/conf.yaml のサンプル][4]を参照してください。

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

**注:** `7.50.1` (このバージョンを含む) から `7.53.0` (このバージョンを含まない) までの Agent リリースでは、構成サブディレクトリは `oracle-dbm.d` です。その他のすべての Agent リリースでは、構成ディレクトリは `oracle.d` です。

Oracle Real Application Cluster (RAC) を使用する場合は、RAC ノードごとに Agent を構成する必要があります。Agent は `V$` ビューに問い合わせることで、各ノードから個別に情報を収集します。さらに、インターコネクトトラフィックの発生を避けるために、`GV$` ビューにはクエリしません。

2. [Agent を再起動します][5]。

#### TCPS による Oracle への接続

TCPS (TCP with SSL) を使って Oracle に接続するには、`protocol` 構成オプションのコメントを解除して、`TCPS` を選択します。`server` オプションを更新して、監視する TCPS サーバーを設定します。

    ```yaml
    init_config:

    instances:
      ## @param server - 文字列 - 必須
      ## Oracle Database Server の IP アドレスまたはホスト名。
      #
      - server: localhost:1522

        ## @param service_name - 文字列 - 必須
        ## Oracle Database サービス名。サーバーで利用可能なサービスを表示するには、
        ## 次のクエリを実行します。
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

        ## @param protocol - 文字列 - 任意 - デフォルト: TCP
        ## Oracle Database Server に接続するためのプロトコル。有効なプロトコルには TCP と TCPS があります。
        ##
        #
        protocol: TCPS
    ```

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `oracle` を探します。

### カスタムクエリ

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

使用可能なすべてのコンフィギュレーションオプションの詳細については、[oracle.d/conf.yaml のサンプル][4]を参照してください。

## データ収集

### メトリクス
{{< get-metrics-from-git "oracle" >}}


### イベント

Oracle Database チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "oracle" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://docs.datadoghq.com/ja/database_monitoring/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/