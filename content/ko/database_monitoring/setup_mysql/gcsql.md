---
description: Google Cloud SQL 관리형 MySQL을 위한 데이터베이스 모니터링을 설정하고 설치합니다.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: Google Cloud SQL 관리형 MySQL을 위한 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}


데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 설명 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 표시하여 MySQL 데이터베이스에 대해 구체적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스로데이터베이스 모니터링을 활성화하려면 다음대로 설정하세요.

1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [Agent에 데이터베이스에 대한 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)
1. [클라우드 SQL 통합 설치](#Install-the-cloud-sql-integration)

## 시작 전 참고 사항

지원하는 MySQL 버전
: 5.6, 5.7, 또는 8.0+

지원되는 Agent 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서, 연결 풀러
:  Agent는 모니터링 대상 호스트에 직접 연결해야 하며, 가급적이면 Google Cloud 콘솔에 제공된 IP 주소를 통해 연결해야 합니다. Agent는 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. 이는 클라이언트 애플리케이션에 대한 안티 패턴이 될 수 있지만, 각  Agent는 기본 호스트 이름을 알고 있어야 하며 장애 조치 시에도 수명 기간 동안 단일 호스트를 고수해야 합니다. Datadog Agent 가 실행되는 동안 다른 호스트에 연결하면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.

## MySQL 설정 구성


설정을 적용하려면 다음 [Database Flags][3]를 설정한 후 **서버를 재시작**합니다.

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema`|`on`| 필수 사항. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length`| `4096`| 더 큰 쿼리를 수집하는 데 필요합니다. `events_statements_*` 테이블에서 SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다.

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| 파라미터| 값| 설명|
| --- | --- | --- |
| `performance_schema`| `on`| 필수 사항. [성능 스키마][1]를 활성화합니다. |
| `max_digest_length`| `4096`| 더 큰 쿼리를 수집하는 데 필요합니다. `events_statements_*` 테이블에서 SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code>| `4096`|  `max_digest_length`와 일치해야 합니다.|

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Agent에 액세스 권한 부여

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침은 `datadog@'%'`를 사용하는 모든 호스트에서 로그인할 수 있도록 Agent에 권한을 부여합니다. `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인하도록 `datadog` 사용자를 제한할 수 있습니다. 자세한 정보는 [MySQL 설명서][4]를 참조하세요.

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

다음 스키마를 생성하세요:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

`explain_statement` 절차를 생성하여 Agent가 설명 계획을 수집하도록 합니다.

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

### 확인

다음 명령을 사용해 `<UNIQUEPASSWORD>`를 위에서 생성한 비밀번호로 변경하여 사용자가 성공적으로 생성되었는지 확인합니다:

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```


## 에이전트 설치하기

Cloud SQL 호스트를 모니터링하려면 인프라스트럭처에 Datadog Agent를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결하도록 설정합니다. Agent는 데이터베이스에서 실행할 필요가 없으며 데이터베이스에 연결하기만 하면 됩니다. 여기에 언급되지 않은 추가 Agent 설치 방법은 [Agent 설치 지침][4]을 참조하세요.


{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 다음대로 실행하세요 (예: Agent가 Google Cloud SQL 데이터베이스에서 수집할 수 있도록 작은 GCE 인스턴스를 프로비저닝하는 경우)

[Agent의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집합니다. 커스텀 메트릭을 포함하여 사용 가능한 모든 설정 옵션은 [sample mysql.d/conf.yaml][2]에서 확인하세요.

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>' # 앞의 CREATE USER 단계에서

    #프로젝트와 인스턴스를 추가한 후 CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Google Cloud (GCP) 통합을 설정합니다.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

**참고**: 특수 문자가 있는 경우 비밀번호를 작은따옴표로 묶어 입력하세요.


설정 `project_id` 및 `instance_id` 필드에 대한 자세한 내용은 [MySQL 통합 사양][3]을 참조하세요.

[에이전트를 재시작][3]하여 MySQL 메트릭을 Datadog에 전송하기 시작합니다.


[1]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "도커(Docker)" %}}

Google Cloud Run과 같이 Docker 컨테이너에서 실행되는 Database Monitoring Agent를 설정하려면 Agent 컨테이너에서 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정합니다.

**참고**: 자동탐지 레이블이 작동하려면 Agent에 Docker 소켓에 대한 읽기 권한이 있어야 합니다.

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
    "host": "<INSTANCE_ADDRESS>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

레이블을 `Dockerfile`에서 지정할 수도 있습니다. 이를 통해 인프라스트럭처 설정을 변경하지 않고, 커스텀 에이전트를 빌드 및 배포할 수 있습니다.

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "<UNIQUEPASSWORD>", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

설정 `project_id` 및 `instance_id` 필드에 대한 자세한 내용은 [MySQL 통합 사양][2]을 참조하세요.

일반 텍스트에서 `datadog` 사용자의 암호가 노출되지 않도록 하려면 Agent의 [비밀 관리 패키지][3]를 사용하고`ENC[]` 구문을 사용하여 암호를 선언하세요. 또는 환경 변수로 암호를 전달하는 방법에 대해 알아보려면 [자동탐지 템플릿 변수 설명서][2]를 참조하세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: /ko/agent/faq/template_variables/
[3]: /ko/agent/guide/secrets-management
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 클러스터가 있는 경우 데이터베이스 모니터링을 위해 [Datadog Cluster Agent][1]를 사용하세요.

Kubernetes 클러스터에서 아직 활성화되지 않은 경우 지침에 따라 [클러스터 검사 활성화][2]를 수행합니다. Cluster Agent 컨테이너에 마운트된 정적 파일을 사용하거나 서비스 주석을 사용하여 MySQL 설정을 선언할 수 있습니다.

### Helm 명령줄

다음 [Helm][3] 명령을 실행해 Kubernetes 클러스터에서 [Datadog Cluster Agent][1]를 설치하세요. 계정 및 환경에 맞게 값을 교체하세요.

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
    password: "<UNIQUEPASSWORD>"
    gcp:
      project_id: "<PROJECT_ID>"
      instance_id: "<INSTANCE_ID>"' \
  datadog/datadog
```

### 마운트된 파일 설정

마운트된 설정 파일로 클러스터 검사를 구성하려면 `/conf.d/mysql.yaml` 경로의 Cluster Agent 컨테이너에서 설정 파일을 마운트합니다.

```yaml
cluster_check: true  # 다음 플래그를 포함해야 합니다.
init_config:
instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
    # 프로젝트와 인스턴스를 추가한 후 CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Google Cloud (GCP) 통합을 설정합니다.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

### Kubernetes 서비스 주석으로 설정

파일을 마운트하는 대신 Kubernetes 서비스로 인스턴스 설정을 지정하세요. Kubernetes에서 실행 중인 Agent에 대해 이 검사를 설정하려면 Datadog Cluster Agent와 동일한 네임스페이스에서 서비스를 생성합니다.

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
          "host": "<INSTANCE_ADDRESS>",
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
          }
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```

설정 `project_id` 및 `instance_id` 필드에 대한 자세한 내용은 [MySQL 통합 사양][4]을 참조하세요.

Cluster Agent가 자동으로 이 설정을 등록하고 MySQL 검사를 실행합니다. 

일반 텍스트에서 `datadog` 사용자 암호 노출을 피하려면 Agent의 [비밀 관리 패키지][4]를 사용하고 `ENC[]` 구문을 통해 암호를 지정하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ko/agent/guide/secrets-management
{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `mysql`을 찾습니다. 또는 [Databases][6] 페이지를 방문하여 시작합니다.

## Agent 설정 예시
{{% dbm-mysql-agent-config-examples %}}

## 클라우드 SQL 통합 설치

Google Cloud에서 보다 포괄적인 데이터베이스 메트릭을 수집하려면 [클라우드 SQL 통합][7](선택사항)을 설치합니다.


## 트러블슈팅

설명한 대로 통합 및 Agent를 설치 및 설정하였으나 제대로 작동하지 않는 경우 [트러블슈팅][8]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://cloud.google.com/sql/docs/mysql/flags
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ko/integrations/google_cloudsql
[8]: /ko/database_monitoring/troubleshooting/?tab=mysql