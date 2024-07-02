---
description: Google Cloud SQL에서 SQL Server 관리형용 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: SQL Server 통합
title: Google Cloud SQL 관리형 SQL Server에서 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 수집해 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 완료하세요.

1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
2. [에이전트 설치](#install-the-agent)
3. [Cloud SQL 통합 설치](#Install-the-cloud-sql-integration)

## 시작 전 참고 사항

지원되는 SQL Server 버전
: 2012, 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## 에이전트 액세스 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

[Cloud SQL 인스턴스][1]에 `datadog` 사용자를 생성합니다.

에이전트에 읽기 전용 액세스 권한을 유지하려면 `CustomerDbRootRole` 기본값에서 `datadog` 사용자를 제거합니다. 그리고 에이전트에 필요한 명시적인 권한을 부여합니다.

```SQL
GRANT VIEW SERVER STATE to datadog as CustomerDbRootRole;
GRANT VIEW ANY DEFINITION to datadog as CustomerDbRootRole;
ALTER SERVER ROLE CustomerDbRootRole DROP member datadog;
```

각 애플리케이션 추가 데이터베이스에 `datadog` 사용자를 생성합니다.
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Google Cloud SQL에서는 `CONNECT ANY DATABASE`를 허용하지 않기 때문에 이 단계를 실행해야 합니다. Datadog 에이전트가 각 데이터베이스에 연결되어 있어야 해당 데이터베이스에 맞는 파일 I/O 통계를 수집할 수 있습니다.

## 에이전트 설치하기

Google Cloud에서는 호스트에 바로 액세스하는 것을 허용하지 않기 때문에 SQL 서버 호스트와 통신할 수 있는 별도 호스트에 Datadog 에이전트를 설치해야 합니다. 에이전트를 설치하고 실행하는 데는 여러 가지 방법이 있습니다.

{{< tabs >}}
{{% tab "Windows Host" %}}
SQL Server 텔레메트리를 수집하려면 먼저 [Datadog 에이전트를 설치][1]합니다.

SQL Server 설정 파일 `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`을 생성합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [설정 파일 샘플][2]을 참고하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    provider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # 프로젝트와 인스턴스를 추가한 후에는 CPU, 메모리 등과 같은 추가 클라우드 데이터를 풀하도록 Datadog Google Cloud(GCP) 통합을 설정합니다.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][3]을 참고하세요.

[Windows Authentification][4]을 사용하려면 `connection_string: "Trusted_Connection=yes"` 설정에서 `username`과 `password` 필드를 비워둡니다.

`service`와 `env` 태그를 사용하여 일반적인 태깅 체계를 통해 데이터베이스 텔레메트리를 다른 텔레메트리와 연결합니다. Datadog에서 이 같은 태그를 사용하는 방법을 알아보려면 [통합 서비스 태깅][5]을 참고하세요.

### 지원되는 드라이버

#### Microsoft ADO

권장하는 [ADO][6] 공급자는 [Microsoft OLE DB Driver][7]입니다. 에이전트가 실행되는 호스트에 드라이버를 설치했는지 확인하세요.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # 버전 18 이하에서는 MSOLEDBSQL로 교체
```

다른 공급자인 `SQLOLEDB`와 `SQLNCLI`는 Microsoft에서 더 이상 사용되지 않기 때문에 사용하지 않습니다.

#### ODBC

권장하는 ODBC 드라이버는 [Microsoft ODBC DB Driver][8]입니다. 에이전트가 실행되는 호스트에 드라이버를 설치했는지 확인하세요.

```yaml
connector: odbc
driver: '{ODBC Driver 17 for SQL Server}'
```

에이전트 설정이 모두 완료되면 [Datadog 에이전트를 다시 시작][9]하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][10]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 시작하려면 Datadog의 [Databases][11] 페이지로 이동하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Linux Host" %}}
SQL Server 텔레메트리를 수집하려면 먼저 [Datadog 에이전트를 설치][1]합니다.

Linux의 경우 Datadog 에이전트에 ODBC SQL Server 드라이버(예: [Microsoft ODBC 드라이버][2])를 추가 설치해야 합니다. ODBC SQL Server가 설치되면 `odbc.ini`과 `odbcinst.ini` 파일을 `/opt/datadog-agent/embedded/etc` 폴더에 복사하세요.

`odbc` 커넥터를 사용해 `odbcinst.ini` 파일에 명시된 대로 적절한 드라이버를 지정합니다.

SQL Server 에이전트 설정 파일 `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`을 생성합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [설정 파일 샘플][3]을 참고하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # 프로젝트와 인스턴스를 추가한 후에는 CPU, 메모리 등과 같은 추가 클라우드 데이터를 풀하도록 Datadog Google Cloud(GCP) 통합을 설정합니다.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][4]을 참고하세요.

`service`와 `env` 태그를 사용하여 일반적인 태깅 체계를 통해 데이터베이스 텔레메트리를 다른 텔레메트리와 연결합니다. Datadog에서 이 같은 태그를 사용하는 방법을 알아보려면 [통합 서비스 태깅][5]을 참고하세요.

에이전트 설정이 모두 완료되면 [Datadog 에이전트를 다시 시작][6]하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][7]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 시작하려면 Datadog의 [Databases][8] 페이지로 이동하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [Autodiscovery Integration Templates][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블에 대한 읽기 권한이 있어야 작동합니다. 

값을 내 계정과 환경에 맞게 변경하세요. 사용할 수 있는 설정 옵션을 모두 보려면 [설정 파일 샘플][2]을 참고하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.35.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>",
    "port": <SQL_PORT>,
    "connector": "odbc",
    "driver": "FreeTDS",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][3]을 참고하세요.

`service`와 `env` 태그를 사용하여 일반적인 태깅 체계를 통해 데이터베이스 텔레메트리를 다른 텔레메트리와 연결합니다. Datadog에서 이 같은 태그를 사용하는 방법을 알아보려면 [통합 서비스 태깅][4]을 참고하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 또는 Datadog의 [Databases][6] 페이지에서 시작할 수도 있습니다.

[1]: /ko/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에 [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 클러스터 점검을 아직 활성화하지 않은 경우 [클러스터 확인 활성화][2] 지침에 따라 활성화합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 이용하거나 쿠버네티스 서비스 주석을 이용해 클러스터 에이전트를 설정할 수 있습니다.

### Helm을 사용한 명령줄

다음 [Helm][3] 명령을 실행해 쿠버네티스(Kubernetes) 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 계정 및 환경에 맞게 값을 교체하세요.

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterAgent.confd.sqlserver\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>
    port: 1433
    username: datadog
    password: "<PASSWORD>"
    connector: "odbc"
    driver: "FreeTDS"
    tags:  # Optional
      - "service:<CUSTOM_SERVICE>"
      - "env:<CUSTOM_ENV>"
    gcp:
      project_id: "<PROJECT_ID>"
      instance_id: "<INSTANCE_ID>"' \
  datadog/datadog
```

### 연결된 파일로 설정

연결된 설정 파일로 클러스터 점검을 설정하려면 다음 경로로 설정 파일을 클러스터 에이전트 컨테이너에 연결합니다. `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>'
    port: <SQL_PORT>
    username: datadog
    password: '<PASSWORD>'
    connector: "odbc"
    driver: "FreeTDS"
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # 프로젝트와 인스턴스를 추가한 후에는 CPU, 메모리 등과 같은 추가 클라우드 데이터를 풀하도록 Datadog Google Cloud(GCP) 통합을 설정합니다.
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
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>",
          "port": <SQL_PORT>,
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "FreeTDS",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],  # Optional
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
          }
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][4]을 참고하세요.

클러스터 에이전트가 자동으로 설정을 등록하고 SQL Server 점검을 실행합니다.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][5]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /ko/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

## 에이전트 설정 예시
{{% dbm-sqlserver-agent-config-examples %}}

## Google Cloud SQL 통합 설치

Google Cloud SQL에서 좀 더 포괄적인 데이터베이스를 수집하려면 [Google Cloud SQL 통합][2]을 설치하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/sql/docs/sqlserver/create-manage-users#creating
[2]: /ko/integrations/google_cloudsql