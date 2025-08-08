---
description: Google Cloud SQL 관리형 MySQL을 위한 데이터베이스 모니터링을 설정하고 설치합니다.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: Google Cloud SQL 관리형 MySQL을 위한 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 InnoDB 스토리지 엔진의 쿼리 메트릭, 쿼리 샘플, 설명 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 표시하여 MySQL 데이터베이스를 구체적으로 가시화합니다.

에이전트는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스로데이터베이스 모니터링을 활성화하려면 다음과 같이 설정하세요.

1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [에이전트를 설치 및 설정합니다](#install-and-configure-the-agent).
1. [클라우드 SQL 통합 설치](#Install-the-cloud-sql-integration)

## 시작 전 참고 사항

지원되는 MySQL 버전
: 5.6, 5.7, 또는 8.0+

지원되는 에이전트 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 에이전트 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog 에이전트를 모니터링 중인 호스트에 직접 연결해야 하며, 가급적이면 Google Cloud 콘솔에서 제공한 IP 주소를 통해 연결해야 합니다. 에이전트를 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결하면 안 됩니다. 에이전트를 실행했는데 다른 호스트에 연결되는 경우(페일오버, 로드밸런싱 등) 에이전트가 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: 에이전트가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.

## MySQL 설정 구성


설정을 적용하려면 다음 [Database Flags][3]를 설정한 후 **서버를 재시작**합니다.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| 파라미터| 값| 설명|
| --- | --- | --- |
| `performance_schema`| `on`| 필수 사항. [성능 스키마][9]를 활성화합니다. |
| `max_digest_length`| `4096`| 보다 대규모 쿼리를 수집하는 데 필요합니다. `events_statements_*` 테이블에서 SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code>| `4096`|  `max_digest_length`와 일치해야 합니다.|

[9]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema`|`on`| 필수 사항. [성능 스키마][9]를 활성화합니다. |
| `max_digest_length`| `4096`| 보다 대규모 쿼리를 수집하는 데 필요합니다. `events_statements_*` 테이블에서 SQL 다이제스트 텍스트 크기를 늘립니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다.

[9]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## 에이전트에 접근 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침은 `datadog@'%'`를 사용하는 모든 호스트에서 로그인할 수 있도록 에이전트에 권한을 부여합니다. `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인하도록 `datadog` 사용자를 제한할 수 있습니다. 자세한 정보는 [MySQL 설명서][11]를 참조하세요.

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

다음 스키마를 생성하세요.

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

에이전트가 설명 계획을 수집할 수 있도록 `explain_statement` 절차를 생성합니다.

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

인덱스 메트릭을 수집하려면, `datadog` 사용자에게 추가 권한을 부여합니다.

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

Datadog Agent는 v7.65부터 MySQL 데이터베이스에서 스키마 정보를 수집할 수 있습니다. Agent에 수집 권한을 부여하는 방법은 아래 [스키마 수집][12] 섹션을 참조하세요.

### 런타임 설정 컨슈머
다음 절차를 생성하여 에이전트가 런타임에 `performance_schema.events_*` 컨슈머를 실행할 수 있는 기능을 제공하도록 합니다.

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

### 비밀번호를 안전하게 저장하기
{{% dbm-secret %}}

### 확인

다음 명령을 사용해 `<UNIQUEPASSWORD>`를 위에서 생성한 비밀번호로 변경하여 사용자가 성공적으로 생성되었는지 확인합니다.

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


## 에이전트 설치 및 구성

Cloud SQL 호스트를 모니터링하려면 인프라스트럭처에 Datadog 에이전트를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결하도록 설정합니다. 에이전트는 데이터베이스에서 실행할 필요가 없으며 데이터베이스에 연결하기만 하면 됩니다. 여기에 언급되지 않은 추가 에이전트 설치 방법은 [에이전트 설치 지침][4]을 참조하세요.


{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행 중인 에이전트에 대해 이 검사를 구성하려면 다음과 같이 실행하세요(예: 에이전트가 Google Cloud SQL 데이터베이스에서 수집할 수 있도록 작은 GCE 인스턴스를 프로비저닝하는 경우).

[에이전트의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집합니다. 커스텀 메트릭을 포함하여 사용 가능한 모든 설정 옵션은 [sample mysql.d/conf.yaml][2]에서 확인하세요.

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # 프로젝트 및 인스턴스를 추가한 후 GCP(Datadog Google Cloud) 통합을 통해 CPU, 메모리 등 추가 클라우드 데이터를 풀링합니다.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

`project_id` 및 `instance_id` 필드 설정에 대한 자세한 내용은 [`mysql.conf.yaml` 파일의 GCP 섹션][4]을 참조하세요.

[에이전트를 재시작][3]하여 MySQL 메트릭을 Datadog에 전송하기 시작합니다.


[1]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example

{{% /tab %}}
{{% tab "Docker" %}}

Google Cloud Run과 같이 Docker 컨테이너에서 실행되는 Database Monitoring 에이전트를 설정하려면 에이전트 컨테이너에서 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정합니다.

**참고**: 에이전트에 Docker 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

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

`Dockerfile`에서도 레이블을 지정할 수 있어 인프라스트럭처 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

`project_id` 및 `instance_id` 필드 설정에 대한 자세한 내용은 [`mysql.conf.yaml` 파일의 GCP 섹션][2]을 참조하세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example

{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에서  [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 아직 활성화되지 않은 경우 지침에 따라 [클러스터 검사 활성화][2]를 수행합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 사용하거나 서비스 주석을 사용하여 MySQL 설정을 선언할 수 있습니다.

### Helm

다음 단계를 완료해 쿠버네티스 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 내 계정과 환경에 맞게 값을 변경하세요.

1. Helm용 [Datadog 에이전트 설치 지침][3]을 완료하세요.
2. 다음을 포함하도록 YAML 설정 파일(클러스터 에이전트 설치 지침의 `datadog-values.yaml`)을 업데이트하세요.
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <INSTANCE_ADDRESS>
              port: 3306
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              gcp:
                project_id: '<PROJECT_ID>'
                instance_id: '<INSTANCE_ID>'

    clusterChecksRunner:
      enabled: true
    ```

3. 명령줄에서 위의 설정 파일로 에이전트를 배포합니다.
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows의 경우 <code>--set targetSystem=windows</code>를 <code>helm 설치</code>명령에 추가하세요.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site
[3]: /ko/containers/kubernetes/installation/?tab=helm#installation

### 연결된 파일로 설정

연결된 구성 파일로 클러스터 검사를 구성하려면 `/conf.d/mysql.yaml` 경로의 Cluster 에이전트 컨테이너에서 설정 파일을 연결하세요.

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    # After adding your project and instance, configure the Datadog Google Cloud (GCP) integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
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
          "host": "<INSTANCE_ADDRESS>",
          "port": 3306,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
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

`project_id` 및 `instance_id` 필드 설정에 대한 자세한 내용은 [`mysql.conf.yaml` 파일의 GCP 섹션][4]을 참조하세요.

Cluster 에이전트가 자동으로 이 설정을 등록하고 MySQL 검사를 실행합니다. 

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example

{{% /tab %}}

{{< /tabs >}}

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 점검섹션에서 `mysql`을 찾습니다. 또는 [데이터베이스][6] 페이지를 확인하여 시작합니다.

## 에이전트 설정 예시
{{% dbm-mysql-agent-config-examples %}}

## Cloud SQL 통합 설치

Google Cloud에서 보다 포괄적인 데이터베이스 메트릭을 수집하려면 [클라우드 SQL 통합][7](선택사항)을 설치합니다.


## 트러블슈팅

설명한 대로 통합 및 에이전트를 설치 및 설정하였으나 제대로 작동하지 않는 경우 [트러블슈팅][8]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://cloud.google.com/sql/docs/mysql/flags
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ko/integrations/google_cloudsql
[8]: /ko/database_monitoring/troubleshooting/?tab=mysql
[9]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[10]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[11]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[12]: /ko/database_monitoring/setup_mysql/gcsql?tab=mysql57#collecting-schemas