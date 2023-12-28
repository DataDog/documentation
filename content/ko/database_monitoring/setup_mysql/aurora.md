---
description: Aurora에서 MySQL 관리형용 데이터베이스 모니터링을 설치하고 구성하세요.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
kind: 설명서
title: Aurora 관리형 MySQL에서 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">데이터베이스 모니터링은 이 사이트에 지원되지 않습니다.</div>
{{< /site-region >}}


데이터베이스 모니터링는 쿼리 메트릭, 쿼리 샘플, 실행 계획, 연결 데이터, 시스템 메트릭, InnoDB 스토리지 엔진 원격 분석과 같은 데이터를 통해 MSQL 데이터베이스에 관한 심도 있는 가시성을 제공합니다.

에이전트가 읽기 전용 사용자로 로그인해 원격 분석 결과를 바로 수집합니다. MySQL 데이터베이스에서 데이터베이스 모니터링을 사용하려면 다음 설정을 따르세요.

1. [데이터베이스 파라미터 구성](#configure-mysql-settings)
1. [데이터베이스에 에이전트 액세스 허용](#grant-the-agent-access)
1. [에이전트 설치](#install-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작하기 전 알아두어야 할 사항

지원되는 MySQL 버전
: 5.6, 5.7, 8.0 이상

지원되는 에이전트 버전
: 7.36.1 이상

성능 영향
: 데이터베이스 모니터링을 사용하기 위한 에이전트 기본 구성은 보수적인 편이나 필요에 따라 수집 간격 및 쿼리 샘플링률과 같은 설정을 조정할 수 있습니다. 대부분의 워크로드에서 에이전트가 데이터베이스 쿼리 실행에 소모하는 시간은 1% 미만이며 CPU 사용률도 1% 미만입니다. <br/><br/>
에이전트는 기본 에이전트에 통합된 기능의 일부로 실행됩니다([벤치마크를 확인하세요][1]).

프록시, 로드 밸런서, 연결 풀러
: 에이전트는 모니터링하는 호스트에 바로 연결되어야 하며, 인스턴스 엔드포인트를 통해 연결하는 것이 좋습니다. 프록시, 로드 밸런서, 연결 풀러, **Aurora 클러스터 엔드포인트** 등을 통해 에이전트를 데이터베이스에 연결하지 마세요. 이는 클라이언트 애플리케이션에 비효율적인 방법일 수 있으나, 장애 조치 시에도 각 에이전트는 기본 호스트 이름을 알아야 하고 수명기간 동안 단일 호스트에 연결되어 있어야 합니다. Datadog 에이전트가 실행되는 동안 다른 호스트에 연결되면 메트릭 값이 정확하지 않게 됩니다.

데이터 보안 고려 사항
: 에이전트가 데이터베이스에서 수집하는 정보와 보안을 지킬 수 있는 방법에 관한 자세한 내용은 [민감한 정보][2]를 참고하세요. 


## MySQL 설정 구성

[DB 파라미터 그룹][3]에서 다음을 구성하고 **서버를 재시작**해야 설정이 적용됩니다.

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수. [성능 스키마][1] 활성화. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 필수. 현재 실행 중인 쿼리 모니터링 활성화. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 필수. 대기 이벤트 수집 활성화. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | 선택. 스레드 당 최근 쿼리 내역 추적 활성화. 활성화하면 간헐적인 쿼리 실행 상세 정보를 캡처할 가능성이 높아짐. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | 선택. 스레드 전체에서 최근 쿼리의 대량 추적을 활성화. 활성화하면 간헐적인 쿼리 실행 상세 정보를 캡처할 가능성이 높아짐. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `1` | 필수. [성능 스키마] 활성화[1]. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 필수. 현재 실행 중인 쿼리 모니터링 활성화. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 필수. 대기 이벤트 수집 활성화. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | 선택. 스레드 당 최근 쿼리 내역 추적 활성화. 활성화하면 간헐적인 쿼리 실행 상세 정보를 캡처할 가능성이 높아짐. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | 선택. 스레드 전체에서 최근 쿼리의 대량 추적을 활성화. 활성화하면 간헐적인 쿼리 실행 상세 정보를 캡처할 가능성이 높아짐. |
| <code style="word-break:break-all;">performance_schema_max_digest_length</code> | `4096` | Increases the size of`events_statements_*` 테이블에 있는 SQL 다이제스트 텍스트 크기를 증가시킴. 기본값으로 설정해 두면 `1024` 문자보다 긴 쿼리를 수집하지 않음. |
| <code style="word-break:break-all;">performance_schema_max_sql_text_length</code> | `4096` | <code style="word-break:break-all;">performance_schema_max_digest_length</code>와 동일해야 함. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

**참고**: 에이전트에 액세스를 허용할 때 에이전트가 런타임 중에 `performance-schema-consumer-*` 설정을 동적으로 활성화 할 수 있도록 하는 것을 권장합니다. [런타임 설정 구성 요소](#runtime-setup-consumers)를 참고하세요.

## Grant the Agent access

통계와 쿼리를 수집하려면 Datadog 에이전트가 읽기 전용 액세스 권한이 있어야 합니다.

다음 지침에 따라 에이전트가 `datadog@'%'`을 사용해 어떤 호스트에서든 로그인할 수 있도록 권한을 부여할 수 있습니다.  `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인할 수 있도록 `datadog` 사용자를 제한할 수 있습니다. 더 자세한 정보는 [MySQL 설명서][4]를 참고하세요.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여합니다.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}

{{% tab "MySQL 5.6" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여합니다.

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
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

`explain_statement` 절차를 생성해 에이전트가 실행 계획을 수집하도록 합니다.

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

또 이 절차를 실행 계획을 수집하고자 하는 **모든 스키마**에 생성합니다. `<YOUR_SCHEMA>`를 데이터베이스 스키마로 대체합니다.

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

### 런타임 설정 구성 요소
Datadog에서는 런타임 중 에이전트가 `performance_schema.events_*` 구성 요소를 사용할 수 있도록 다음 절차를 생성하기를 권장합니다.

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

호스트를 모니터링하려면 인프라스트럭처에 Datadog 에이전트를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결되도록 설정합니다. 에이전트를 데이터베이스에서 실행할 필요가 없고, 연결되기만 하면 됩니다. 여기에 언급되지 않은 다른 설치 메서드를 보려면 [에이전트 설치 지침][5]을 보세요.

{{< tabs >}}
{{% tab "호스트" %}}

호스트에서 실행 중인 에이전트에 이 점검을 설정하려면(예: 소규모 E2C 인스턴스를 프로비전하여 에이전트가 Aurora 데이터베이스에서 데이터를 수집하려는 경우) 다음을 따릅니다.

[에이전트 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더 내 `mysql.d/conf.yaml` 파일을 편집합니다. 커스텀 메트릭을 포함해 사용할 수 있는 설정 옵션을 모두 보려면 [mysql.d/conf.yaml 샘플][2]을 참고하세요.

`mysql.d/conf.yaml`에 설정 블록을 추가해 MySQL 메트릭을 수집합니다.

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
```

<div class="alert alert-warning"><strong>중요</strong>: 여기에서는 클러스터 엔드포인트가 아니라 인스턴스 엔드포인트를 사용하세요.</div>

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

<div class="alert alert-warning"><strong>중요</strong>: 클러스터 엔드포인트가 아니라 호스트로서 Aurora 인스턴스 엔드포인트를 사용하세요.</div>

일반 텍스트로 `datadog` 사용자 암호를 노출하지 않으려면 에이전트의 [비밀 관리 패키지][2]를 사용하고 `ENC[]` 구문을 사용해 암호를 지정합니다. 또는 [자동탐지 템플릿 변수 설명서][3]를 참조하여 환경 변수로 암호를 전달하는 방법을 알아보세요.


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
<div class="alert alert-warning"><strong>중요</strong>: 여기에서는 Aurora 클러스터 엔드포인트가 아니라 Aurora 인스턴스 엔드포인트를 사용하세요.</div>

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

## 트러블슈팅

설명에 따라 에이전트와 통합을 설치하고 구성했는데 제대로 작동하지 않을 경우 [트러블슈팅][9]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/basic_agent_usage#agent-overhead
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/5.7/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ko/integrations/amazon_rds
[9]: /ko/database_monitoring/troubleshooting/?tab=mysql