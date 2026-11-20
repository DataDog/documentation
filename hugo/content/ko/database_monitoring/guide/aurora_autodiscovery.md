---
aliases:
- /ko/database_monitoring/aurora_autodiscovery
title: Amazon Aurora DB 클러스터에 대하여 Database Monitoring 구성
---
이 가이드에서는 Database Monitoring을 Amazon Aurora [Postgres][1] 또는 [MySQL][11] 데이터베이스에 대하여 구성한 것으로 가정합니다.

## 시작 전 참고 사항 {#before-you-begin}

지원되는 데이터베이스
: Postgres, MySQL

지원되는 Agent 버전
: 7.53.0+

## 개요 {#overview}

Datadog의 [Autodiscovery][4]를 사용하면 동적 인프라에서 모니터링을 구성할 수 있습니다. 이 기능을 사용하면 개별적인 데이터베이스 호스트 엔드포인트(예: `postgres.d/conf.yaml`)를 목록으로 나열하지 않고도 Aurora 클러스터를 모니터링할 수 있습니다. 이것은 특히 연결성이나 워크로드 변동에 대응하여 Aurora Replicas의 수를 동적으로 조정하는 기능인 [Aurora Auto Scaling][6]을 사용하는 클러스터에 유용합니다. Autodiscovery는 기본 및 복제본 엔드포인트 인스턴스를 둘 다 자동으로 검색하고 모니터링합니다.

Autodiscovery 및 Database Monitoring을 사용하면 Postgres 또는 MySQL 검사에 대한 구성 템플릿을 정의하여 각 검사를 어느 클러스터에 적용할지 지정할 수 있습니다.

## Aurora 클러스터에 대하여 Autodiscovery 활성화 {#enabling-autodiscovery-for-aurora-clusters}

1. [AWS 권한 부여](#grant-aws-permissions)
2. [Aurora 태그 구성](#configure-aurora-tags)
3. [Datadog Agent 구성](#configure-the-datadog-agent)
4. [구성 템플릿 만들기](#create-a-configuration-template)

### AWS 권한 부여 {#grant-aws-permissions}

Datadog Agent에 AWS 계정에서 `rds:DescribeDBClusters` 및 `rds:DescribeDBInstances`를 실행할 권한이 필요합니다. Datadog에서는 Agent를 실행 중인 EC2 인스턴스에 IAM 역할 정책을 연결할 것을 권장합니다.

이러한 권한을 부여하는 정책의 예:

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

[`AmazonRDSReadOnlyAccess`][3] 정책을 연결할 수도 있습니다.

### Aurora 태그 구성 {#configure-aurora-tags}

리스너는 Agent가 실행 중인 계정과 리전에서 `datadoghq.com/scrape:true` 태그가 적용된 모든 Aurora 클러스터를 검색합니다. Agent가 특정 태그를 포함한 클러스터를 검색하도록 구성할 수도 있습니다.

이러한 태그를 DB 클러스터에 적용해야 합니다(역할: `Regional cluster`). RDS 리소스 태깅에 관한 자세한 내용은 [AWS 설명서][7]를 참조하세요.

`tags`를 빈 배열로 구성하면 Autodiscovery가 해당 계정 및 리전의 모든 클러스터를 검색합니다.

### Datadog Agent 구성 {#configure-the-datadog-agent}

Autodiscovery는 Agent 서비스 리스너를 사용하며, 이 리스너는 Aurora 클러스터의 모든 데이터베이스 호스트 엔드포인트를 검색하고 검색된 모든 엔드포인트를 기존 Agent 검사 스케줄링 파이프라인으로 전달합니다. 리스너는 `datadog.yaml` 파일에서 구성할 수 있습니다.

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**참고**: Agent는 Agent와 동일한 리전에서 실행 중인 Aurora 인스턴스만 검색합니다. Agent는 인스턴스의 리전을 판단하기 위해 [IMDS(Instance Metadata Service)][8]를 사용합니다. EC2 인스턴스에 `IMDSv2`가 필요한 경우, Agent가 `IMDSv2`를 사용하도록 구성해야 하며, 그러면 아래 표시된 것과 같이 `datadog.yaml`에서 `ec2_prefer_imdsv2: true`를 설정합니다.

``` yaml {hl_lines=[1]}
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true

```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for Aurora cluster discovery in the `datadog.yaml` file:

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

To monitor all clusters in the account and region:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags: []

```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

The listener provides an `%%extra_dbm%%` variable that can be used to enable or disable DBM for the instance. This value defaults to `true` if the tag `datadoghq.com/dbm:true` is present. To specify a custom tag for this value use `dbm_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag: "use_dbm:true"

```

The `%%extra_dbm%%` value is true if the tag is present, and false otherwise. It does not set its value to the value of the tag.

The listener provides an `%%extra_global_view_db%%` variable that can be used to set the `global_view_db` for the instance. This value defaults to the value of the tag `datadoghq.com/global_view_db`. To specify a custom tag for this value use `global_view_db_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      global_view_db_tag: "my_db_tag"
```

### Create a configuration template 

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

먼저, Aurora 관리형 Postgres의 `ad_identifier`를 구성 템플릿(`postgres.d/conf_aws_aurora.yaml`) 파일에 추가합니다.

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

그런 다음, 템플릿의 나머지 부분을 정의합니다. 변경될 수 있는 파라미터(예: `host` 및 `port`)에 대하여 [템플릿 변수](#supported-template-variables)를 사용하세요.

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    database_autodiscovery:
      enabled: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

이 예시에서는 템플릿 변수 `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` 및 `%%extra_region%%`이 Aurora 클러스터에서 가져온 정보를 사용해 동적으로 채워졌습니다.

#### 인증 {#authentication}

인증에 비밀번호를 사용하는 경우, 이 템플릿 파일에 입력한 비밀번호가 검색된 모든 데이터베이스에 사용됩니다.

{{% collapse-content title="비밀번호 안전하게 저장" level="h5" id="securely-store-your-password" %}}
##### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

다음 구성 템플릿 예시가 Aurora 클러스터에서 검색된 모든 인스턴스에 적용됩니다.

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your Aurora cluster, use the following template:

``` yaml {hl_lines=["12-13"]}
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

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /ko/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% collapse-content title="Custom global_view_db (7.75.0+)" level="h5" id="global-view-db" %}}
##### 사용자 지정 전역 조회 데이터베이스 {#custom-global-view-database}

사용자 지정 전역 조회 데이터베이스를 데이터베이스 자동 검색을 위해 설정하려면 Agent 버전 7.75.0 이상을 사용하고 다음 템플릿을 사용해야 합니다.

``` yaml {hl_lines=["11"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    database_autodiscovery:
      enabled: true
      global_view_db: "%%extra_global_view_db%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"

```
{{% /collapse-content %}}
{{% /tab %}}

{{% tab "MySQL" %}}
First, add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

#### Authentication 

If you are using password for authentication note that the password provided in this template file will be used across every database discovered.

{{% collapse-content title="비밀번호 안전하게 저장" level="h5" id="securely-store-your-password" %}}
##### 비밀번호 안전하게 저장 {#securely-store-your-password-1}
{{% dbm-secret %}}

다음 구성 템플릿 예시가 Aurora 클러스터에서 검색된 모든 인스턴스에 적용됩니다.

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication (7.67.0+)" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your RDS instance, make sure that you are using Agent version 7.67.0 or above and use the following template:

``` yaml {hl_lines=["12-13"]}
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
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /ko/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

통합을 사용하여 Autodiscovery를 구성하는 방법에 관한 자세한 내용은 [Autodiscovery 설명서][5]를 참조하세요.

#### 지원되는 템플릿 변수 {#supported-template-variables}

| 템플릿 변수                        | 소스                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | Aurora 인스턴스 엔드포인트                                                                                                                  |
| %%port%%                                 | Aurora 인스턴스의 포트                                                                                                               |
| %%extra_region%%                         | 인스턴스가 있는 AWS 리전                                                                                                  |
| %%extra_dbclusteridentifier%%            | 검색된 Aurora 클러스터의 클러스터 식별자                                                                                       |
| %%extra_dbm%% | DBM이 클러스터에서 활성화되었는지 여부. `dbm_tag` 유무에 따라 결정되며, 기본값은 `datadoghq.com/dbm:true`.                                              |
| %%extra_managed_authentication_enabled%% | IAM 인증이 클러스터에서 활성화되었는지 여부. <br/>이것은 연결을 위해 관리형 인증을 사용해야 하는지 결정하는 데 사용됨 |
| %%extra_global_view_db%%                       | `global_view_db_tag`의 값, 기본값은 `datadoghq.com/global_view_db`.                                                      |

[1]: /ko/database_monitoring/setup_postgres/aurora/?tab=postgres10
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /ko/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /ko/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /ko/database_monitoring/setup_mysql/aurora?tab=mysql56