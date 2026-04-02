---
description: Oracle RAC のデータベースモニタリングをインストールして構成する
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
title: Oracle RAC のデータベースモニタリングの設定
---

{{% dbm-oracle-definition %}}

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][6]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Agent は、監視対象のホストに直接接続する必要があります。Agent をプロキシ、ロードバランサー、コネクションプーラーを経由してデータベースに接続しないようご注意ください。また、各 Agent は基礎となるホスト名を把握し、フェイルオーバーの場合でも常に 1 つのホストのみを使用する必要があります。Datadog Agent が実行中に異なるホストに接続すると、メトリクス値の正確性が失われます。

Data security considerations
: See [Sensitive information][7] for information about what data the Agent collects from your databases and how to ensure it is secure.

## セットアップ

Oracle データベースでデータベースモニタリングを有効にするには、以下を実行します。

1. [Datadog ユーザーの作成](#create-the-datadog-user)
1. [Agent をインストールする](#install-the-agent)
1. [Agent の構成](#configure-the-agent)
1. [Oracle インテグレーションをインストールまたは検証する](#install-or-verify-the-oracle-integration)
1. [セットアップの検証](#validate-the-setup)

### Datadog ユーザーの作成

{{% dbm-create-oracle-user %}}

### Securely store your password
{{% dbm-secret %}}

### Agent のインストール

See the [DBM Setup Architecture][12] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][9].

### Agent の構成

Configure the Agent for each RAC node by following the instructions for [self-hosted Oracle databases][3].

Agent は `V$` ビューに対してクエリを実行することで、すべてのノードから個別に情報を収集するため、Agent の構成は各 Real Application Cluster (RAC) ノードに対して行う必要があります。Agent は、インターコネクトトラフィックの生成を避けるため、いかなる `GV$` ビューに対してもクエリを実行しません。各 RAC ノードから収集されたデータは、フロントエンドで集計されます。

```yaml
init_config:
instances:
  - server: '<RAC_NODE_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RAC_NODE_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Agent CDB にのみ接続します。CDB に接続している間、PDB に関する情報をクエリします。個別の PDB に対する接続を作成しないでください。

Set the `rac_cluster` configuration parameter to the name of your RAC cluster or some user friendly alias. The `rac_cluster` filter helps you select all RAC nodes in the [DBM Oracle Database Overview dashboard][4]. You can set an additional filter for the database of interest.

### Oracle インテグレーションをインストールまたは検証する

#### 初めてインストールする場合

On the Integrations page in Datadog, install the [Oracle integration][10] for your organization. This installs an [Oracle dashboard][11] in your account that can be used to monitor the performance of your Oracle databases.

#### すでにインストール済みの場合

{{% dbm-existing-oracle-integration-setup %}}

### セットアップの検証

[Run the Agent's status subcommand][1] and look for `oracle` under the **Checks** section. Navigate to the [Dashboard][11] and [Databases][2] page in Datadog to get started.

## カスタムクエリ

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][5] to learn more about the configuration options available.

<div class="alert alert-danger">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/databases
[3]: /ja/database_monitoring/setup_oracle/selfhosted
[4]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[6]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: /ja/database_monitoring/data_collected/#sensitive-information
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://app.datadoghq.com/integrations/oracle
[11]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[12]: /ja/database_monitoring/architecture/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}