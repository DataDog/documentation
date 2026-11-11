---
description: Azure에서 관리되는 MySQL용 데이터베이스 모니터링을 설치하고 구성하세요.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
- link: /database_monitoring/guide/rds_autodiscovery
  tag: 설명서
  text: RDS용 Autodiscovery
title: Amazon RDS 관리형 MySQL용 데이터베이스 모니터링 설정
---
데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 실행 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 노출하여 MySQL에 대한 높은 가시성을 제공합니다.

**참고**: MariaDB를 사용하는 경우 대신 [MariaDB 설정][13]을 참조하세요.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 설정을 수행하세요.

1. [AWS 통합 구성](#configure-the-aws-integration)
1. [데이터베이스 파라미터 구성](#configure-mysql-settings)
1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치 및 구성](#install-and-configure-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 MySQL 버전
: 5.6, 5.7, 8.0+

지원되는 Agent 버전
: 7.36.1 이상

성능 영향
: Database Monitoring을 위한 기본 Agent 구성은 보수적이지만, 수집 간격 및 쿼리 샘플링 비율과 같은 구성을 조정하여 환경에 맞게 최적화할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만, CPU 사용량의 1% 미만을 차지합니다. <br/><br/>
Database Monitoring은 기본 Agent 위에서 실행되는 통합 기능입니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 대상 호스트에 직접 연결해야 하며, 가급적이면 인스턴스 엔드포인트를 통해 연결하는 것이 좋습니다. Agent는 프록시, 로드 밸런서, 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. Agent가 실행 중에 다른 호스트로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 이를 안전하게 보호하는 방법에 대해서는 [민감한 정보][2]를 참조하세요.

## AWS 통합 구성 {#configure-the-aws-integration}

[Amazon Web Services 통합 타일][10]의 {{< ui >}}Resource Collection{{< /ui >}} 섹션에서 {{< ui >}}Standard Collection{{< /ui >}}을 활성화합니다.

## MySQL 설정 구성{#configure-mysql-settings}

[DB 파라미터 그룹][3]에서 다음을 설정한 후 설정이 효력을 발휘하려면 **서버를 재시작**해야 합니다.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수입니다. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length` | `4096` | 더 긴 쿼리 수집에 필요합니다. 표 내 `events_statements_*` SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 유지하면 `1024`자를 초과하는 쿼리는 수집되지 않습니다. |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length`와 일치해야 합니다. |
| `performance_schema_max_sql_text_length` | `4096` | `max_digest_length`와 일치해야 합니다. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수입니다. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length` | `4096` | 더 긴 쿼리 수집에 필요합니다. 표 내 `events_statements_*` SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 유지하면 `1024`자를 초과하는 쿼리는 수집되지 않습니다. |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length`와 일치해야 합니다. |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Agent에 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침에 따라 Agent가 `datadog@'%'`를 사용하여 모든 호스트에서 로그인할 수 있는 권한을 부여합니다. `datadog@'localhost'`를 사용하여 `datadog` 사용자가 로컬호스트를 통해서만 로그인하도록 제한할 수 있습니다. 자세한 내용은 [MySQL 설명서][4]를 참조하세요.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

다음 스키마를 생성합니다.

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Agent가 실행 계획을 수집할 수 있도록 `explain_statement` 프로시저를 생성합니다.

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

또한 실행 계획을 수집하려는 **모든 스키마**에 이 프로시저를 생성합니다. `<YOUR_SCHEMA>`를 데이터베이스 스키마로 바꿉니다.

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

인덱스 메트릭을 수집하려면 `datadog` 사용자에게 추가 권한을 부여합니다.

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

Agent v7.65부터 Datadog Agent는 MySQL 데이터베이스에서 스키마 정보를 수집할 수 있습니다. 이 수집 작업에 필요한 Agent 권한 부여 방법에 대한 자세한 내용은 아래의 [스키마 수집][12] 섹션을 참조하세요.

### 런타임 설정 컨슈머 {#runtime-setup-consumers}
RDS의 경우, 구성에서 성능 스키마 컨슈머를 영구적으로 활성화할 수 없습니다. Agent가 런타임에 `performance_schema.events_*` 컨슈머를 활성화할 수 있도록 다음 프로시저를 생성합니다.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

## Agent 설치 및 구성 {#install-and-configure-the-agent}

RDS 호스트를 모니터링하려면 인프라에 Datadog Agent를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결되도록 구성하세요. Agent는 데이터베이스에서 실행될 필요가 없으며, 데이터베이스에 연결만 할 수 있으면 됩니다. 여기에서 언급되지 않은 추가 Agent 설치 방법은 [Agent 설치 지침][5]을 참조하세요.

{{< tabs >}}
{{% tab "호스트" %}}

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면(예: Agent가 RDS 데이터베이스에서 수집할 작은 EC2 인스턴스를 프로비저닝하는 경우) 다음 단계를 따르세요.

[Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `mysql.d/conf.yaml` 파일을 편집하여 MySQL 메트릭 수집을 시작합니다. 사용자 지정 메트릭 옵션을 포함하여 사용 가능한 모든 구성 옵션은 [샘플 mysql.d/conf.yaml][2]을 참조하세요.

이 구성 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집합니다.

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
```

IAM 인증을 사용할 경우 `region` 및 `instance_endpoint` 파라미터를 지정하고 `managed_authentication.enabled`를 `true`로 설정하세요.

**참고**: IAM 인증을 사용하려는 경우에만 `managed_authentication`을 활성화하세요. IAM 인증은 `password` 필드보다 우선합니다.

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
      managed_authentication:
        enabled: true
```

RDS 인스턴스에서 IAM 인증을 구성하는 방법에 대한 정보는 [관리형 인증으로 연결하기][3]를 참조하세요.

[Agent를 재시작][4]하여 MySQL 메트릭을 Datadog으로 전송하기 시작합니다.


[1]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/database_monitoring/guide/managed_authentication/?tab=mysql#configure-iam-authentication
[4]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

ECS 또는 Fargate 등 Docker 컨테이너에서 실행되는 데이터베이스 모니터링 에이전트를 설정하려면, 에이전트 컨테이너에서 [Autodiscovery Integration Templates][1]을 설정할 수 있습니다.

**참고**: 레이블에 대한 Autodiscovery가 작동하려면 Agent에 Docker 소켓에 대한 읽기 권한이 있어야 합니다.

### 명령줄 {#command-line}

다음 명령을 실행하여 명령줄에서 빠르게 에이전트를 실행합니다. 사용 중인 계정과 환경에 맞는 값으로 교체합니다.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": <PORT>,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "aws": {
      "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
      "region": "<AWS_REGION>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile {#dockerfile}

`Dockerfile`에서도 레이블을 지정할 수 있습니다.그러므로 인프라 설정을 변경할 필요 없이 사용자 지정 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": <PORT>,"username": "datadog","password": "ENC[datadog_user_database_password]", "aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<AWS_REGION>"}}]'
```

[1]: /ko/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스(Kubernetes) 클러스터를 보유한 경우 데이터베이스 모니터링에 [Datadog 클러스터 에이전트][1]를 사용하세요.

Kubernetes 클러스터에서 아직 활성화하지 않았다면 지침에 따라 [클러스터 검사를 활성화][2]합니다. Cluster Agent 컨테이너에 마운트된 정적 파일이나 서비스 주석을 사용하여 MySQL 구성을 선언할 수 있습니다.

### Operator {#operator}

[Kubernetes and Integrations의 Operator 지침][3]을 참고하여 다음 단계에 따라 MySQL 통합을 설정하세요.

1. 다음 구성을 사용하여 `datadog-agent.yaml` 파일을 생성 또는 업데이트합니다.

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              mysql.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <AWS_REGION>
    ```

2. 다음 명령을 사용하여 변경 사항을 Datadog Operator에 적용합니다.

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

1. Helm용 [Datadog Agent 설치 지침][4]을 완료하세요.
2. YAML 구성 파일(Cluster Agent 설치 지침의 `datadog-values.yaml`)이 다음을 포함하도록 업데이트합니다.
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <AWS_INSTANCE_ENDPOINT>
              port: <PORT>
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              aws:
                instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                region: <AWS_REGION>

    clusterChecksRunner:
      enabled: true
    ```

3. 명령줄에서 위의 구성 파일을 사용하여 Agent 배포:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows에서는 <code>--set targetSystem=windows</code> 를 <code>helm install</code> 명령에 추가합니다.
</div>

### 마운팅된 파일로 구성 {#configure-with-mounted-files}

마운트된 구성 파일을 사용하여 클러스터 검사를 구성하려면 Cluster Agent 컨테이너의 `/conf.d/mysql.yaml` 경로에 구성 파일을 마운트합니다.

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <AWS_REGION>
```

### Kubernetes 서비스 주석으로 구성 {#configure-with-kubernetes-service-annotations}

파일을 마운팅하지 않고 인스턴스 구성을 Kubernetes Service로 선언할 수 있습니다. Kubernetes에서 실행되는 Agent에 이 검사를 구성하려면 다음 구문을 사용하여 서비스를 생성합니다.


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": <PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "aws": {
            "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
            "region": "<AWS_REGION>"
          }
        }
      ]
spec:
  ports:
  - port: <PORT>
    protocol: TCP
    targetPort: <PORT>
    name: mysql
```

Cluster Agent가 자동으로 이 설정을 등록하고 MySQL 검사를 실행합니다.

`datadog` 사용자의 비밀번호가 일반 텍스트로 노출되지 않도록 하려면 Agent의 [시크릿 관리 패키지][6]를 사용하고 `ENC[]` 구문을 사용하여 비밀번호를 선언하세요.

[1]: /ko/containers/cluster_agent/setup/
[2]: /ko/containers/cluster_agent/clusterchecks/
[3]: /ko/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /ko/containers/kubernetes/integrations/?tab=helm
[5]: /ko/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /ko/agent/configuration/secrets-management

{{% /tab %}}
{{< /tabs >}}

### 검증 {#validate}

[Agent 상태 하위 명령을 실행][6]하고 검사 섹션에서 `mysql`을 찾거나 [데이터베이스][7] 페이지를 참조하여 시작하세요!

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## RDS 통합 설치 {#install-the-rds-integration}

DBM의 데이터베이스 텔레메트리와 함께 CPU와 같은 AWS의 인프라 메트릭을 보려면 [RDS 통합][8](선택 사항)을 설치하세요.

## 문제 해결 {#troubleshooting}

통합과 에이전트를 설명한 대로 설치하고 구성하였는데 예상대로 작동하지 않는 경우 [트러블슈팅][9]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ko/integrations/amazon_rds
[9]: /ko/database_monitoring/troubleshooting/?tab=mysql
[10]: https://app.datadoghq.com/integrations/amazon-web-services
[12]: /ko/database_monitoring/setup_mysql/rds?tab=mysql57#collecting-schemas
[13]: /ko/database_monitoring/setup_mariadb/