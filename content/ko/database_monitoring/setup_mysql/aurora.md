---
description: Aurora에서 MySQL 관리형용 데이터베이스 모니터링을 설치하고 구성하세요.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: Aurora 관리형 MySQL에서 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 설명 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 표시하여 MySQL 데이터베이스에 대해 구체적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스로데이터베이스 모니터링을 활성화하려면 다음대로 설정하세요.

1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작 전 참고 사항

지원되는 MySQL 버전
: 5.6, 5.7, 또는 8.0 이상

지원되는 Agent 버전
: 7.36.1 이상

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 중인 호스트에 직접 연결해야 하며, 가급적이면 인스턴스 엔드포인트를 통해 연결해야 합니다. Agent는 프록시, 로드 밸런서, 연결 풀러 또는 **Aurora 클러스터 엔드포인트**를 통해 데이터베이스에 연결해서는 안됩니다. 클러스터 엔드포인트에 연결된 경우 Agent는 하나의 무작위 복제본에서 데이터를 수집하고 해당 복제본에 대한 가시성만 제공합니다. Agent가 실행되는 동안 다른 호스트에 연결하는 경우(실패 조치, 로드밸런싱 등) Agent는 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.


## MySQL 설정 구성

[DB 클러스터 파라미터 그룹][3]에서 다음을 구성한 후 **서버를 다시 시작**하여 설정을 적용합니다.

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수. [Performance Schema][1]를 활성화함. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 필수. 현재 실행 중인 쿼리를 모니터링할 수 있음. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 필수. 대기 이벤트의 컬렉션을 활성화함. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | 선택. 스레드별로 최근 쿼리 기록을 추적할 수 있음. 활성화하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아짐. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | 선택. 모든 스레드에서 더 많은 수의 최근 쿼리를 추적할 수 있음. 활성화하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아짐. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수. [Performance Schema][1]를 활성화함. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 필수. 현재 실행 중인 쿼리를 모니터링할 수 있음. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 필수. 대기 이벤트의 컬렉션을 활성화함. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | 선택. 스레드별로 최근 쿼리 기록을 추적할 수 있음. 활성화하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아짐.|
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | 선택. 모든 스레드에서 더 많은 수의 최근 쿼리를 추적할 수 있음. 활성화하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아짐. |
| <code style="word-break:break-all;">performance_schema_max_digest_length</code> | `4096` | `events_statements_*` 테이블의 SQL 다이제스트 텍스트 크기를 늘림. 기본값을 그대로 두면 `1024`자를 초과하는 쿼리는 수집되지 않음. |
| <code style="word-break:break-all;">performance_schema_max_sql_text_length</code> | `4096` | <code style="word-break:break-all;">performance_schema_max_digest_length</code>와 일치해야 함. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

**참고**: Agent 액세스 권한 부여의 일부로 Agent가 런타임에서 동적으로 `performance-schema-consumer-*` 설정을 사용하도록 허용합니다. [런타임 설정 컨슈머](#runtime-setup-consumers)를 참조하세요.

## 에이전트에 접근 권한 부여

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침은 `datadog@'%'`를 사용하는 모든 호스트에서 로그인할 수 있도록 Agent에 권한을 부여합니다. `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인하도록 `datadog` 사용자를 제한할 수 있습니다. 자세한 정보는 [MySQL 설명서][4]를 참조하세요.

{{< tabs >}}
{{% tab "MySQL 5.6" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
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
{{< /tabs >}}

다음 스키마를 생성하세요:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Agent가 설명 계획을 수집할 수 있도록 `explain_statement` 절차를 생성합니다:

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

또한 설명 계획을 수집하려는 **모든 스키마에서** 이 절차를 생성합니다. `<YOUR_SCHEMA>`를 해당 데이터베이스 스키마로 변경하세요.

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

### 런타임 설정 컨슈머
다음 절차를 생성하여 Agent가 런타임에 `performance_schema.events_*` 컨슈머를 실행할 수 있는 기능을 제공하도록 합니다.

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

## 에이전트 설치

Aurora 호스트를 모니터링하려면 인프라스트럭처에 Datadog Agent를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결하도록 구성합니다. Agent는 데이터베이스에서 실행할 필요가 없으며 데이터베이스에 연결하기만 하면 됩니다. 여기에 언급되지 않은 추가 Agent 설치 방법은 [Agent 설치 지침][5]을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 (예: Agent가 Aurora 데이터베이스에서 수집할 작은 EC2 인스턴스를 프로비저닝하는 경우) 다음을 수행합니다.

[Agent의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집합니다. 커스텀 메트릭을 포함하여 사용 가능한 모든 설정 옵션은 [sample mysql.d/conf.yaml][2]에서 확인하세요.

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 이전 CREATE USER 단계에서

    # 프로젝트와 인스턴스를 추가한 후 CPU 및 메모리와 같은 추가 클라우드 데이터를 가져오도록 Datadog AWS 통합을 구성합니다.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

<div class="alert alert-warning"><strong>중요</strong>: 여기에서는 클러스터 엔드포인트가 아니라 Aurora 인스턴스 엔드포인트를 사용하세요.</div>

**참고**: 특수 문자가 있는 경우 비밀번호를 작은따옴표로 묶어 입력하세요.


[에이전트를 재시작][3]하여 MySQL 메트릭을 Datadog에 전송하기 시작합니다.

**Datadog Agent는 클러스터에 있는 모든 Aurora 엔드포인트의 [자동탐지][10]를 지원합니다.**


[1]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/database_monitoring/guide/aurora_autodiscovery/?tab=mysql
{{% /tab %}}
{{% tab "도커" %}}

ECS나 Fargate와 같은 도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [자동탐지 통합 템플릿][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

### 명령줄

명령줄에 다음 명령을 실행해 빠르게 에이전트를 실행합니다. 내 계정과 환경에 맞게 값을 변경하세요.

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

`Dockerfile`에서도 레이블을 지정할 수 있어 인프라스트럭처 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

<div class="alert alert-warning"><strong>중요</strong>: 호스트로 클러스트 엔드포인트가 아니라 Aurora 인스턴스 엔드포인트를 사용하세요.</div>

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][2]를 이용해 `ENC[]` 구문을 사용하여 암호를 선언하거나 [자동탐지 템플릿 변수 설명서][3]에서 환경 변수로 암호를 전달하는 방법을 살펴보세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: /ko/agent/configuration/secrets-management
[3]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에서  [Datadog 클러스터 에이전트][1]를 사용하세요.

Kubernetes 클러스터에서 아직 활성화되지 않은 경우 지침에 따라 [클러스터 검사 활성화][2]를 수행합니다. Cluster Agent 컨테이너에 마운트된 정적 파일을 사용하거나 서비스 주석을 사용하여 MySQL 설정을 선언할 수 있습니다.

### Helm 명령줄

다음 [Helm][3] 명령을 실행해 쿠버네티스 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 내 계정과 환경에 맞게 값을 변경하세요.

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

### 연결된 파일로 설정

마운트된 설정 파일로 클러스터 검사를 구성하려면 `/conf.d/mysql.yaml` 경로의 Cluster Agent 컨테이너에서 설정 파일을 마운트합니다.

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

파일을 연결하는 대신 쿠버네티스 서비스로 인스턴스 설정을 지정할 수 있습니다. 쿠버네티스가 실행되는 에이전트에서 이 점검을 설정하려면 Datadog 클러스터 에이전트와 동일한 네임스페이스로 서비스를 생성하세요.


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
<div class="alert alert-warning"><strong>중요</strong>: 여기에서는 Aurora 클러스터 엔드포인트가 아니라 Aurora 인스턴스 엔드포인트를 사용하세요.</div>

Cluster Agent가 자동으로 이 설정을 등록하고 MySQL 검사를 실행합니다. 

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][4]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ko/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행하고][6] 점검 섹션에서 `mysql`을 찾습니다. 또는 [데이터베이스][7] 페이지를 방문하여 시작합니다.

## 에이전트 설정 예시
{{% dbm-mysql-agent-config-examples %}}

## RDS 통합 설치

DBM에서 데이터베이스 원격 분석과 함께 CPU와 같은 AWS의 인프라스트럭처 메트릭을 확인하려면 [RDS 통합][8](선택 사항)을 설치하세요.

## 트러블슈팅

설명에 따라 에이전트와 통합을 설치하고 구성했는데 제대로 작동하지 않을 경우 [트러블슈팅][9]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/5.7/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ko/integrations/amazon_rds
[9]: /ko/database_monitoring/troubleshooting/?tab=mysql