---
description: Amazon RDS에서 MySQL 매니지드에 대한 데이터베이스 모니터링을 설치하고 구성하세요.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: Amazon RDS 매니지드 MySQL에 대한 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 실행 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 노출하여 MySQL에 대한 높은 가시성을 제공합니다.

에이전트는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. 다음 설정을 통해 MySQL 데이터베이스를 사용해 데이터베이스 모니터링을 활성화하세요.

1. [AWS 통합 설정](#configure-the-aws-integration)
1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [데이터베이스에 에이전트 액세스 허가](#grant-the-agent-access)
1. [에이전트 설치](#install-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작 전 참고 사항

지원하는 MySQL 버전
: 5.6, 5.7, or 8.0+

지원되는 에이전트 버전
: 7.36.1+

성능 영향
: 데이터베이스 모니터링을 위한 기본 에이전트 설정은 보수적이지만 수집 간격 및 쿼리 샘플 등 설정을 조정해 요구 사항을 더 잘 충족할 수 있습니다. 대부분의 워크로드의 경우 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU 비율의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서, 연결 풀러
: 에이전트는 모니터링되는 호스트에 직접 연결해야 합니다. 인스턴스 엔드포인트를 통하는 것이 좋습니다. 에이전트는 프록시, 로드 밸런서 또는 연결 풀러를 통해 연결해선 안 됩니다. 클라이언트 애플리케이션의 경우 안티패턴이 될 수 있지만 각 에이전트는 기본 호스트 이름에 대한 지식을 보유하고 수명 주기 동안 패일오버가 있는 경우에도 단일 호스트를 고수해야 합니다. Datadog 에이전트가 실행되는 동안 각기 다른 호스트에 연결되면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려 사항
: 에이전트가 데이터베이스에서 수집하는 데이터와 데이터를 보호하는 방법에 대한 정보는 [민감한 정보][2]를 참조하세요.

## AWS 통합 설정

[Amazon Web Services 통합 타일][10] **리소스 수집** 섹션에서 **표준 수집**을 활성화합니다.

## MySQL 설정 구성

[DB 파라미터 그룹][3]에서 다음을 설정한 후 설정이 효력을 발휘하려면 **서버를 재시작해야** 합니다. 

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수입니다. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length` | `4096` | 더 많은 쿼리 수집에 필요합니다. `events_statements_*` 표에서 SQL 다이제스트 텍스트 크기를 향상합니다. 기본값으로 두면 `1024`자 미만의 쿼리가 수집되지 않습니다. |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length`와 일치해야 합니다. |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수입니다. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length` | `4096` | 더 많은 쿼리 수집에 필요합니다. `events_statements_*` 표의 SQL 다이제스트 텍스트 크기를 향상합니다. 기본값으로 두면 `1024`자 미만의 쿼리가 수집되지 않습니다. |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length`와 일치해야 합니다. |
| `performance_schema_max_sql_text_length` | `4096` | `max_digest_length`와 일치해야 합니다. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## 에이전트 액세스 허가

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침은 `datadog@'%'`를 사용하는 모든 호스트에서 로그인할 수 있도록 에이전트에 권한을 부여합니다. `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인하도록 `datadog` 사용자를 제한할 수 있습니다. 자세한 정보는 [MySQL 설명서][4]를 참조하세요.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 & 5.7" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

다음 스키마 생성:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

`explain_statement` 절차를 생성하여 에이전트가 실행 계획을 수집하도록 합니다.

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

추가로 실행 계획에서 수집하려는 **모든 스키마에서** 이 절차를 생성합니다. `<YOUR_SCHEMA>`를 데이터베이스 스키마와 교체합니다.

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

### 런타임 설정 소비자
RDS를 사용하면 성능 스키마 컨슈머가 설정에서 영구적으로 활성화될 수 없습니다. 다음 절차를 생성하여 에이전트가 런타임에서 `performance_schema.events_*` 컨슈머를 활성화할 수 있는 권한을 제공합니다.

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

## 에이전트 설치하기

RDS 호스트를 모니터링하려면 인프라에서 Datadog 에이전트를 설치하고 설정하여 각 인스턴스 엔드포인트가 원격으로 연결되도록 합니다. 에이전트는 데이터베이스에서 실행될 필요가 없고 연결하기만 하면 됩니다. 여기에서 언급되지 않은 부수적인 에이전트 설치 메서드는 [에이전트 설치 지침][5]을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행되는 에이전트에 대해 이 점검을 설정하려면, 예를 들어, RDS 데이터베이스에서 수집하기 위해 에이전트에 작은 EC2 인스턴스를 제공하려면,

[에이전트 설정 디렉터리]의 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집하여 MySQL 메트릭 수집을 시작하세요. 커스텀 메트릭을 포함한 사용 가능한 모든 설정 옵션의 경우 [sample mysql.d/conf.yaml][2]을 참조하세요.

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

인스턴스:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier


     # 프로젝트 및 인스턴스를 추가한 후 Datadog AWS 통합을 설정하여 CPU, 메모리 등 부수적인 클라우드 데이터를 풀링합니다.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

**참고**: 특수 문자가 존재하는 경우 따옴표 안에 암호를 넣으세요.

[에이전트를 재시작][3]하여 MySQL 메트릭을 Datadog에 전송하기 시작합니다.


[1]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "도커(Docker)" %}}

ECS 또는 Fargate 등 도커(Docker) 컨테이너에서 실행되는 데이터베이스 모니터링 에이전트를 설정하려면, 에이전트 컨테이너에서 [자동탐지 통합 템플릿][1]을 설정할 수 있습니다.

**참고**: 에이전트에 도커 자동탐지 레이블에 대한 읽기 권한이 있어야 작동합니다. 

### 명령줄

다음 명령을 실행하여 명령줄에서 빠르게 에이전트를 실행하세요. 계정과 환경에 맞는 값으로 교체하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

레이블은 또한 `Dockerfile`에 지정될 수 있습니다. 그러므로 인프라 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

일반 텍스트에서 `datadog` 사용자 암호를 노출하지 않으며면 에이전트의 [비밀 관리 패키지][2]를 사용하고 `ENC[]` 구문을 사용해 암호를 지정합니다. 또는 [자동탐지 템플릿 변수 설명서][3]를 참조하여 환경 변수로 암호를 전달하는 방법을 학습하세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: /ko/agent/guide/secrets-management
[3]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스(Kubernetes) 클러스터를 보유한 경우 데이터베이스 모니터링에 [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스(Kubernetes) 클러스터에서 이미 활성화되지 않은 경우 지침을 따라 [클러스터 점검][2]을 활성화하세요. 클러스터 에이전트 컨테이너에 마운트된 고정 파일이나 서비스 주석을 사용하여 MySQL 설정을 지정할 수 있습니다.

### Helm을 사용한 명령줄

다음 [Helm][3] 명령을 실행해 쿠버네티스(Kubernetes) 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 계정 및 환경에 맞게 값을 교체하세요.

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterAgent.confd.mysql\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ADDRESS>
    port: 3306
    username: datadog
    password: "<UNIQUEPASSWORD>"' \
  datadog/datadog
```

### 마운팅된 파일 설정

마운팅된 설정 파일을 사용해 클러스터 점검을 설정하려면 `/conf.d/mysql.yaml` 경로에서 클러스터 에이전트 컨테이너의 설정 파일을 마운팅하세요.

```yaml
cluster_check: true  # 이 플래그를 포함하도록 하세요.
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
```

### 쿠버네티스 서비스 주석으로 설정

파일을 마운팅하는 대신 쿠버네티스 서비스로 인스턴스 설정을 지정하세요. 쿠버네티스가 실행되는 에이전트에서 이 점검을 설정하려면 Datadog 클러스터 에이전트와 동일한 네임스페이스로 서비스를 생성하세요.


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
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```

클러스터 에이전트가 자동으로 이 설정을 등록하고 MySQL 점검 실행을 시작합니다.

일반 텍스트에서 `datadog` 사용자 암호 노출을 피하려면 에이전트의 [비밀 관리 패키지][4]를 사용하고 `ENC[]` 구문을 통해 암호를 지정하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ko/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행하고][6] 점검 섹션에서 `mysql`을 찾습니다. 또는 [데이터베이스][7] 페이지를 방문하여 시작합니다.

## 예시 에이전트 설정
{{% dbm-mysql-agent-config-examples %}}

## RDS 통합 설치

AWS에서 보다 종합적인 데이터베이스 메트릭을 수집하려면 [RDS 통합][8](선택 사항)을 설치하세요.

## 문제 해결

통합과 에이전트를 설명한 대로 설치하고 구성하였는데 예상대로 작동하지 않는 경우 [트러블슈팅][9]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage#agent-overhead
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ko/integrations/amazon_rds
[9]: /ko/database_monitoring/troubleshooting/?tab=mysql
[10]: https://app.datadoghq.com/integrations/amazon-web-services