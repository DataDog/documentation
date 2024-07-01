---
description: Azure에서 SQL Server 관리형용 데이터베이스 모니터링을 설치하고 구성합니다.
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: 기본 SQL Server 통합
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: 설명서
  text: 일반적인 문제 트러블슈팅
title: Azure SQL Server에서 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 수집해 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 따르세요.

1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
2. [Agent 설치](#install-the-agent)
3. [Azure 통합 설치](#install-the-azure-integration)

## 시작 전 참고 사항

지원되는 SQL Server 버전
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## 에이전트에 접근 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

{{< tabs >}}

{{% tab "Azure SQL 데이터베이스" %}}

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 [Azure SQL 역할][1]을 부여하세요.
```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
-- Log Shipping Monitoring(Agent v7.50+에서 사용 가능)을 사용하려면 다음 세 줄의 주석을 제거하세요.
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

이 서버에 있는 각 추가 Azure SQL 데이터베이스에 접근할 수 있도록 에이전트에 권한을 부여합니다.

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**참고:** Microsoft Entra ID 관리형 ID 인증도 지원됩니다. Azure SQL DB 인스턴스에 대해 이를 구성하는 방법은 [가이드][3]를 참조하세요.

Datadog 에이전트를 설정할 때 해당 Azure SQL DB 서버에 있는 각 애플리케이션 데이터베이스의 점검 인스턴스 하나를 지정하세요. `master`나 다른 [시스템 데이터베이스][2]를 포함하지 마세요. Datadog 에이전트는 격리된 컴퓨팅 환경에서 실행 중인 Azure SQL DB의 각 애플리케이션 데이터베이스에 직접 연결되어야 합니다. 따라서 `database_autodiscovery`가 Azure SQL DB에서 작동하지 않으며 비활성화되어야 합니다.

**참고:** Azure SQL Database에서는 격리된 네트워크에서 데이터베이스를 배포하며 데이터베이스를 단일 호스트로 취급합니다. 따라서 탄력적인 풀에서 Azure SQL Database를 실행하면 풀에 있는 각 데이터베이스가 별도 호스트로 취급됩니다.

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,1433'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'
    # 프로젝트와 인스턴스를 추가한 후, CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'

  - host: '<SERVER_NAME>.database.windows.net,1433'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
    # 프로젝트와 인스턴스를 추가한 후, CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'
```

Datadog 에이전트를 설치하고 구성하는 방법에 관한 상세한 지침은 [에이전트 설치](#install-the-agent)를 참고하세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /ko/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL 관리형 인스턴스" %}}

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

#### SQL Server 버전 2014+

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- 로그 전송 모니터링(에이전트 v7.50+에서 사용 가능) 기능을 활용하려면 다음 세 줄의 주석 처리를 해제하세요.
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

**참고:** Azure 관리형 ID 인증도 지원됩니다. Azure SQL DB 인스턴스에서 이를 설정하는 방법을 보려면 [가이드][1]를 참고하세요.

[3]: /ko/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Windows Azure VM의 SQL Server" %}}

[Windows Azure VM의 SQL Server][1]의 경우 Windows Server 호스트 VM에 바로 Datadog 에이전트를 설치하려면 [자체 호스팅 SQL Server에서 데이터베이스 모니터링 설정][2] 설명서에 안내된 지침을 따르세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /ko/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

## 에이전트 설치

Azure는 직접적인 호스트 액세스를 허용하지 않기 때문에 Datadog Agent는 SQL Server 호스트와 통신할 수 있는 별도의 호스트에 설치되어야 합니다. Agent 설치 및 실행에는 여러 가지 옵션이 있습니다.

{{< tabs >}}
{{% tab "Windows Host" %}}

SQL Server 원격 측정 수집을 시작하려면 먼저 [Datadog Agent를 설치][1]하세요.

SQL Server 설정 파일 `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`을 생성합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [설정 파일 샘플][2]을 참고하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # 프로젝트와 인스턴스를 추가한 후에는 CPU, 메모리 등과 같은 추가 클라우드 데이터를 풀하도록 Datadog Azure 통합을 설정합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][3]을 참고하세요.

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

권장되는 ODBC 드라이버는 [Microsoft ODBC Driver][8]입니다. Agent 7.51부터 SQL Server용 ODBC Driver 18이 Linux용 Agent에 포함됩니다. Windows의 경우 Agent가 실행 중인 호스트에 드라이버가 설치되어 있는지 확인하세요.

```yaml
connector: odbc
driver: '{ODBC Driver 18 for SQL Server}'
```

에이전트 설정이 모두 완료되면 [Datadog 에이전트를 다시 시작][9]하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][10]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 시작하려면 Datadog의 [Databases][11] 페이지로 이동하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Linux Host" %}}
SQL Server 원격 측정을 수집하려면 먼저 [Datadog Agent를 설치][1]합니다.

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
    # 프로젝트와 인스턴스를 추가한 후에는 CPU, 메모리 등과 같은 추가 클라우드 데이터를 풀하도록 Datadog Azure 통합을 설정합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][4]을 참고하세요.

`service`와 `env` 태그를 사용하여 일반적인 태깅 체계를 통해 데이터베이스 텔레메트리를 다른 텔레메트리와 연결합니다. Datadog에서 이 같은 태그를 사용하는 방법을 알아보려면 [통합 서비스 태깅][5]을 참고하세요.

에이전트 설정이 모두 완료되면 [Datadog 에이전트를 다시 시작][6]하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][7]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 시작하려면 Datadog의 [Databases][8] 페이지로 이동하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [Autodiscovery Integration Templates][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

값을 내 계정과 환경에 맞게 변경하세요. 사용할 수 있는 설정 옵션을 모두 보려면 [설정 파일 샘플][2]을 참고하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.51.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<SQL_PORT>",
    "connector": "odbc",
    "driver": "ODBC Driver 18 for SQL Server",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][3]을 참고하세요.

`service`와 `env` 태그를 사용하여 일반적인 태깅 체계를 통해 데이터베이스 텔레메트리를 다른 텔레메트리와 연결합니다. Datadog에서 이 같은 태그를 사용하는 방법을 알아보려면 [통합 서비스 태깅][4]을 참고하세요.

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `sqlserver`를 찾아보세요. 또는 Datadog의 [Databases][6] 페이지에서 시작할 수도 있습니다.


[1]: /ko/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에 [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 클러스터 점검을 아직 활성화하지 않은 경우 [클러스터 확인 활성화][2] 지침에 따라 활성화합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 이용하거나 쿠버네티스 서비스 주석을 이용해 클러스터 에이전트를 설정할 수 있습니다.

### Helm 명령줄

다음 [Helm][3] 명령을 실행해 쿠버네티스 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 내 계정과 환경에 맞게 값을 변경하세요.

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterChecksRunner.enabled=true' \
  --set "clusterAgent.confd.sqlserver\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>\,1433
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    include_ao_metrics: true  # 선택 사항: AlwaysOn 사용자의 경우 
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'" \
  datadog/datadog
```

### 연결된 파일로 설정

연결된 설정 파일로 클러스터 점검을 설정하려면 다음 경로로 설정 파일을 클러스터 에이전트 컨테이너에 연결합니다. `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # 이 플래그를 포함해야 합니다.
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: "odbc"
    driver: "ODBC Driver 18 for SQL Server"
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # 프로젝트와 인스턴스를 추가한 후 CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
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
          "host": "<HOSTNAME>,<SQL_PORT>",
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],  # 선택 사항
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
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

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [SQL Server 통합 스펙][4]을 참고하세요.

클러스터 에이전트가 자동으로 설정을 등록하고 SQL Server 점검을 실행합니다.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][5]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.


[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /ko/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

## 에이전트 설정 예시
{{% dbm-sqlserver-agent-config-examples %}}

## Azure 통합 설치

Azure에서 좀 더 포괄적인 데이터베이스 메트릭과 로그를 수집하려면 [Azure 통합][1]을 설치하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/azure