---
description: RDS Oracle のデータベースモニタリングをインストールして構成する
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
title: RDS Oracle のデータベースモニタリングの設定
---

{{% dbm-oracle-definition %}}

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Agent は、監視対象のホストに直接接続する必要があります。Agent をプロキシ、ロードバランサー、コネクションプーラーを経由してデータベースに接続しないようご注意ください。また、各 Agent は基礎となるホスト名を把握し、フェイルオーバーの場合でも常に 1 つのホストのみを使用する必要があります。Datadog Agent が実行中に異なるホストに接続すると、メトリクス値の正確性が失われます。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][6]を参照してください。

## セットアップ

Oracle データベースで Database Monitoring を有効にするには、次の手順を完了してください。

1. [Datadog ユーザーの作成](#create-the-datadog-user)
1. [ユーザーにデータベースへのアクセス権を付与する](#grant-the-user-access-to-the-database)
1. [Agent をインストールする](#install-the-agent)
1. [Agent の構成](#configure-the-agent)
1. [Oracle インテグレーションをインストールまたは検証する](#install-or-verify-the-oracle-integration)
1. [セットアップの検証](#validate-the-setup)

### Datadog ユーザーの作成

{{% dbm-create-oracle-user %}}

### ユーザーにデータベースへのアクセス権を付与する

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
### パスワードを安全に保管
{{% dbm-secret %}}

### Agent のインストール

Agent をどこにインストールするかについては、[DBM セットアップアーキテクチャ][10]のドキュメントを参照してください。Agent は外部の Oracle クライアントを必要としません。

インストール手順については、[Agent インストール手順][8]を参照してください。

### Agent の構成

Oracle Agent のコンフィギュレーションファイル `/etc/datadog-agent/conf.d/oracle.d/conf.yaml` を作成します。使用可能なすべての構成オプションは、[サンプルコンフィギュレーションファイル][9]を参照してください。

**注:** `7.53.0` 未満の Agent リリースの構成サブディレクトリは `oracle-dbm.d` です。

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB サービス名
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB サービス名
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

すべての Agent の構成が完了したら、[Datadog Agent を再起動][2]します。

### Oracle インテグレーションをインストールまたは検証する

#### 初めてインストールする場合

Datadog の Integrations ページで、組織用の [Oracle インテグレーション][7]をインストールしてください。これにより、Oracle データベースのパフォーマンスをモニタリングするために使用できる [Oracle ダッシュボード][5]がアカウントにインストールされます。

#### すでにインストール済みの場合

{{% dbm-existing-oracle-integration-setup %}}

### セットアップの検証

[Agent の status サブコマンドを実行][3]し、**Checks** セクションで `oracle` を探します。Datadog の[ダッシュボード][5]と[データベース][4]のページに移動して開始します。

## カスタムクエリ

Database Monitoring は、Oracle データベースのカスタムクエリをサポートしています。使用可能な構成オプションの詳細については、[conf.yaml.example][9] を参照してください。

<div class="alert alert-danger">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: /ja/database_monitoring/data_collected/#sensitive-information
[7]: https://app.datadoghq.com/integrations/oracle
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[10]: /ja/database_monitoring/architecture/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}