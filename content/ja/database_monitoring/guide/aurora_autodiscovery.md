---
title: Configuring Database Monitoring for Amazon Aurora DB Clusters
---

{{< beta-callout url="#" btn_hidden="true" >}}
Aurora クラスターのオートディスカバリーはベータ機能です。この機能に関するフィードバックがありましたら、support@datadoghq.com までご連絡ください。
{{< /beta-callout >}}

このガイドでは、Amazon Aurora [Postgres][1] または [MySQL][11] データベースに対して Database Monitoring を構成していることを前提としています。

## はじめに

対応データベース
: Postgres、MySQL

Supported Agent versions
: 7.53.0+

## 概要

Datadog の[オートディスカバリー][4]を使用すると、動的インフラストラクチャーでモニタリングを構成することができます。この機能を使用すると、個々のデータベースホストエンドポイントをリストすることなく、Aurora クラスターを監視することができます。これは、接続性やワークロードの変動に応じて Aurora Replica の数を動的に調整する [Aurora Auto Scaling][6] を使用するクラスターに特に役立ちます。オートディスカバリーは、プライマリとレプリカの両方のエンドポイントインスタンスを自動的に発見し監視します。

オートディスカバリーと Database Monitoring を使用すると、Postgres または MySQL チェックの構成テンプレートを定義し、各チェックを適用するクラスターを指定できます。

## Aurora クラスターでオートディスカバリーを有効にする

1. [AWS 権限の付与](#grant-aws-permissions)
2. [Aurora タグの構成](#configure-aurora-tags)
3. [Datadog Agent の構成](#configure-the-datadog-agent)
4. [構成テンプレートの作成](#create-a-configuration-template)

### AWS 権限の付与

Datadog Agent が AWS アカウント内で `rds:DescribeDBClusters` および `rds:DescribeDBInstances` を実行するためには権限が必要です。Datadog は、Agent を実行している EC2 インスタンスに IAM ロールポリシーを割り当てることを推奨しています。

これらの権限を与えるポリシーの例:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

また、[`AmazonRDSReadOnlyAccess`][3] ポリシーを割り当てることもできます。

### Aurora タグの構成

デフォルトでは、リスナーは Agent が動作しているアカウントとリージョンで、`datadoghq.com/scrape:true` タグが適用されているすべての Aurora クラスターを発見します。特定のタグを持つクラスターを発見するように Agent を構成することもできます。

これらのタグは DB クラスター (ロール: `Regional cluster`) に適用する必要があります。RDS リソースへのタグ付けの詳細については、[AWS ドキュメント][7]を参照してください。

### Datadog Agent の構成

オートディスカバリーは Agent サービスリスナーを使用します。Agent サービスリスナーは Aurora クラスター内のすべてのデータベースホストエンドポイントを発見し、発見されたエンドポイントを既存の Agent チェックスケジューリングパイプラインに転送します。リスナーは `datadog.yaml` ファイルで構成できます。

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**注**: Agent は、Agent と同じリージョンで実行している Aurora インスタンスのみを発見します。インスタンスのリージョンを決定するために、Agent は [IMDS (Instance Metadata Service)][8] を使用します。EC2 インスタンスが `IMDSv2` を必要とする場合、以下のように `datadog.yaml` で `ec2_prefer_imdsv2: true` を設定して、Agent が `IMDSv2` を使用するように構成する必要があります。

```yaml
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

デフォルトでは、リスナーは Agent が動作しているアカウントとリージョンの Aurora クラスターと、`datadoghq.com/scrape:true` タグを持つ Aurora クラスターのみを発見します。特定のタグを持つクラスターを発見するようにリスナーを構成することもできます。

`datadog.yaml` ファイルに Aurora クラスター発見用のカスタムタグを指定するには

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

リスナーは AWS API にホストのリストを繰り返しクエリします。リスナーが AWS API にクエリする頻度は秒単位で、`datadog.yaml` ファイルで構成できます。

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

### 構成テンプレートの作成

Datadog Agent は、Postgres と MySQL インテグレーション用の構成テンプレートをサポートしています。監視したい Aurora クラスターの構成テンプレートを定義します。

{{< tabs >}}
{{% tab "Postgres" %}}

まず、構成テンプレート (`postgres.d/conf_aws_aurora.yaml`) ファイルに Aurora が管理する Postgres 用の`ad_identifier`を追加します。

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

次に、テンプレートの残りの部分を定義します。`host` や `port` のような変更される可能性のあるパラメーターには[テンプレート変数](#supported-template-variables)を使用します。

以下の構成テンプレートの例は、Aurora クラスターで発見されたすべてのインスタンスに適用されます。

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

この例では、テンプレート変数 `%%host%%`、`%port%%`、`%extra_dbclusteridentifier%%`、`%extra_region%%` が Aurora クラスターからの情報で動的に置き換えられます。

[IAM 認証][2]を使用して Aurora クラスターに接続するには、以下のテンプレートを使用します。

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

インスタンスが IAM 認証を使用している場合、テンプレート変数 `%%extra_managed_authentication_enabled%%` は `true` に解決されます。

{{% /tab %}}
{{% tab "MySQL" %}}

まず、Aurora が管理する Postgres に対応する構成テンプレート (`mysql.d/conf_aws_aurora.yaml`) ファイルに `ad_identifier` を追加します。

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

次に、テンプレートの残りの部分を定義します。`host` や `port` のような変更される可能性のあるパラメーターには[テンプレート変数](#supported-template-variables)を使用します。

以下の構成テンプレートの例は、Aurora クラスターで発見されたすべてのインスタンスに適用されます。

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

この例では、テンプレート変数 `%%host%%`、`%port%%`、`%extra_dbclusteridentifier%%`、`%extra_region%%` が Aurora クラスターからの情報で動的に置き換えられます。

{{% /tab %}}
{{< /tabs >}}

インテグレーションによるオートディスカバリーの構成の詳細については、[オートディスカバリーのドキュメント][5]を参照してください。

#### サポートされているテンプレート変数

| テンプレート変数                        | ソース                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | Aurora インスタンスエンドポイント                                                                                                                  |
| %%port%%                                 | Aurora インスタンスのポート                                                                                                               |
| %%extra_region%%                         | インスタンスが配置されている AWS リージョン                                                                                                  |
| %%extra_dbclusteridentifier%%            | 発見された Aurora クラスターのクラスター識別子                                                                                       |
| %%extra_managed_authentication_enabled%% | クラスターで IAM 認証が有効かどうか。<br/>これは Postgres でマネージド認証を使用するかどうかを決定するために使用されます。 |

[1]: /ja/database_monitoring/setup_postgres/aurora/?tab=postgres10
[2]: /ja/database_monitoring/guide/managed_authentication/#configure-iam-authentication
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /ja/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /ja/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /ja/database_monitoring/setup_mysql/aurora?tab=mysql56