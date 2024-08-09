---
description: Azure에서 관리되는 MySQL용 데이터베이스 모니터링을 설치 및 구성합니다.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: Azure Database for MySQL을 위한 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 설명 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 표시하여 MySQL 데이터베이스에 대해 구체적인 가시성을 제공합니다.

에이전트는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 완료하세요:

1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)
1. [Azure MySQL 통합 설치](#install-the-azure-mysql-integration)

## 시작 전 참고 사항

지원되는 MySQL 버전
: 5.7 또는 8.0+

지원되는 Azure MySQL 배포 유형
: Azure VM의 MySQL, 단일 서버, 유연한 서버(유연한 서버에서는 쿼리 활동 및 대기 이벤트 수집이 지원되지 않음)

지원되는 Agent 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 중인 호스트에 직접 연결해야 하며, 가급적이면 인스턴스 엔드포인트를 통해 연결해야 합니다. Agent는 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결하면 안 됩니다. Agent가 실행되는 동안 다른 호스트에 연결하는 경우(페일오버, 로드밸런싱 등) Agent는 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.

## MySQL 설정 구성

설정을 적용하려면 [서버 파라미터][3]에서 다음을 설정한 다음 **서버 재시작**을 실행합니다:

| 파라미터 | 값 | 설명 |
| --- | -- | --- |
| `performance_schema` | `ON` | 필수사항. [Performance Schema][1]를 활성화합니다. |

또한 에이전트가 현재 실행 중인 쿼리를 수집하려면 `performance_schema.events_statements_*` 컨슈머가  `ON`으로 설정되어야 합니다. 기본적으로 Azure MySQL 데이터베이스는 성능 스키마 컨슈머를 활성화하므로 추가 설정이 필요하지 않습니다.

## 에이전트에 접근 권한 부여

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

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

## 에이전트 설치

Azure 호스트를 모니터링하려면 인프라스트럭처에 Datadog Agent를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결하도록 설정합니다. Agent는 데이터베이스에서 실행할 필요가 없으며 데이터베이스에 연결하기만 하면 됩니다. 여기에 언급되지 않은 추가 Agent 설치 방법은 [Agent 설치 지침][5]을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 다음대로 실행하세요 (예: Agent가 데이터베이스에서 수집하도록 소규모 가상 시스템을 프로비저닝하는 경우).

[Agent의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집하여 MySQL 메트릭 수집을 시작하세요. 커스텀 메트릭을 포함하여 사용 가능한 모든 설정 옵션은 [sample mysql.d/conf.yaml][2]에서 확인하세요.

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 이전의 CREATE USER 단계에서

    # 프로젝트와 인스턴스를 추가한 후 CPU 및 메모리와 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

설정 `deployment_type` 및 `name` 필드에 대한 자세한 내용은 [MySQL 통합 사양][4]을 참조하세요.

**참고**: 특수 문자가 있는 경우 비밀번호를 작은따옴표로 묶어 입력하세요.


[에이전트를 재시작][3]하여 MySQL 메트릭을 Datadog에 전송하기 시작합니다.


[1]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{% tab "도커" %}}

도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [Autodiscovery Integration Templates][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

### 명령줄

명령줄에서 에이전트를 실행하려면 다음 명령을 실행합니다. 사용자 계정과 환경에 맞게 값을 바꿉니다:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

`Dockerfile`에서도 레이블을 지정할 수 있어 인프라스트럭처 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

설정 `deployment_type` 및 `name` 필드에 대한 자세한 내용은 [MySQL 통합 사양][4]을 참조하세요.

일반 텍스트에서 `datadog` 사용자의 암호가 노출되지 않도록 하려면 Agent의 [비밀 관리 패키지][2]를 사용하고`ENC[]` 구문을 사용하여 암호를 선언하세요. 또는 환경 변수로 암호를 전달하는 방법에 대해 알아보려면 [자동탐지 템플릿 변수 설명서][3]를 참조하세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: /ko/agent/configuration/secrets-management
[3]: /ko/agent/faq/template_variables/
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
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
    password: "<UNIQUEPASSWORD>"
    azure:
      deployment_type: "<DEPLOYMENT_TYPE>"
      fully_qualified_domain_name: "<AZURE_INSTANCE_ENDPOINT>"' \
  datadog/datadog
```

### 연결된 파일로 설정

마운트된 설정 파일로 클러스터 검사를 구성하려면 `/conf.d/mysql.yaml` 경로의 Cluster Agent 컨테이너에서 설정 파일을 마운트합니다.

```yaml
cluster_check: true  # 이 플래그를 포함해야 합니다.
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
    # 프로젝트와 인스턴스를 추가한 후 CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
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
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
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

설정 `deployment_type` 및 `name` 필드에 대한 자세한 내용은 [MySQL 통합 사양][5]을 참조하세요.

Cluster Agent가 자동으로 이 설정을 등록하고 MySQL 검사를 실행합니다. 

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][4]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ko/agent/configuration/secrets-management
[5]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 **Checks** 섹션에서 `mysql`을 찾습니다. 또는 [Databases][7] 페이지를 방문하여 시작합니다.

## 에이전트 설정 예시
{{% dbm-mysql-agent-config-examples %}}

## Azure MySQL 통합 설치

Azure에서 보다 포괄적인 데이터베이스 메트릭을 수집하려면 [MySQL 통합][8](선택사항)을 설치하세요.

## 트러블슈팅

설명대로 통합 및 Agent를 설치 및 설정하였으나 제대로 작동하지 않는 경우 [트러블슈팅][9]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.microsoft.com/en-us/azure/mysql/howto-server-parameters
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ko/integrations/azure_db_for_mysql
[9]: /ko/database_monitoring/setup_mysql/troubleshooting
[10]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html