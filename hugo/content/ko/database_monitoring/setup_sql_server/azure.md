---
description: Azure에서 관리되는 SQL Server용 Database Monitoring을 설치하고 구성합니다.
further_reading:
- link: /integrations/sqlserver/
  tag: 설명서
  text: 기본 SQL Server 통합
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: 설명서
  text: 일반적인 이슈 해결
- link: /database_monitoring/guide/sql_deadlock/
  tag: 설명서
  text: Deadlock Monitoring 구성
- link: /database_monitoring/guide/sql_extended_events/
  tag: 설명서
  text: 쿼리 완료 및 쿼리 오류 수집 구성
- link: /database_monitoring/guide/parameterized_queries/
  tag: 설명서
  text: SQL 쿼리 파라미터 값 캡처
title: Azure SQL Server용 Database Monitoring 설정
---
Database Monitoring은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트와 같은 정보를 노출하여 Microsoft SQL Server 데이터베이스에 관한 상세한 정보를 가시화합니다.

데이터베이스에서 Database Monitoring을 활성화하려면 다음 단계를 따르세요.

1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
2. [Agent 설치 및 구성](#install-and-configure-the-agent)
3. [Azure 통합 설치](#install-the-azure-integration)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 SQL Server 버전
: 2014, 2016, 2017, 2019, 2022, 2025(Agent 7.79+ 필요)

{{% dbm-sqlserver-before-you-begin %}}

## Agent에 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계 및 쿼리를 수집하려면 데이터베이스 서버에 대한 읽기 전용 액세스 권한이 필요합니다.

{{< tabs >}}

{{% tab "Azure SQL 데이터베이스" %}}

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 [Azure SQL 역할][1]을 부여하세요.

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

이 서버에 있는 각 추가 Azure SQL 데이터베이스에 접근할 수 있도록 에이전트에 권한을 부여합니다.

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**참고:** Microsoft Entra ID 관리형 ID 인증도 지원됩니다. Azure SQL DB 인스턴스에 대해 이를 구성하는 방법은 [가이드][3]를 참조하세요.

Datadog Agent를 구성할 때 특정 Azure SQL DB 서버에 있는 각 애플리케이션 데이터베이스에 대해 하나의 검사 인스턴스를 지정하세요. `master` 및 기타 [시스템 데이터베이스][2]는 포함하지 마세요. 개별 데이터베이스는 격리된 컴퓨팅 환경에서 실행되므로 Datadog Agent는 Azure SQL DB의 각 애플리케이션 데이터베이스에 직접 연결해야 합니다. `database_autodiscovery`가 Azure SQL DB에서 작동하지 않음을 의미하기도 하므로 활성화해서는 안 됩니다.

**참고:** Azure SQL 데이터베이스는 격리된 네트워크에서 데이터베이스를 배포하며, 각 데이터베이스는 단일 호스트로 취급됩니다. 즉, 엘라스틱 풀에서 Azure SQL 데이터베이스를 실행하는 경우 풀의 각 데이터베이스는 별도의 호스트로 취급됩니다.

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'

  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'
```

Datadog Agent를 설치하고 구성하는 방법에 관한 상세한 지침은 [Agent 설치](#install-the-agent)를 참고하세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /ko/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL 관리 인스턴스" %}}

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

#### SQL Server 버전 2014+의 경우{#for-sql-server-versions-2014}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

**참고:** Azure 관리형 ID 인증도 지원됩니다. Azure SQL DB 인스턴스에 대해 이를 구성하는 방법은 [가이드][1]를 참조하세요.

[1]: /ko/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Windows Azure VM의 SQL Server" %}}

[Windows Azure VM의 SQL Server][1]의 경우 Windows Server 호스트 VM에 바로 Datadog Agent를 설치하려면 [자체 호스팅 SQL Server에서 Database Monitoring 설정][2] 설명서에 안내된 지침을 따르세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /ko/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

## Agent 설치 및 구성 {#install-and-configure-the-agent}

Azure는 직접적인 호스트 액세스 권한 부여하지 않기 때문에 Datadog Agent는 SQL Server 호스트와 통신할 수 있는 별도의 호스트에 설치되어야 합니다. Agent를 설치하고 실행하는 데 몇 가지 옵션이 있습니다.

{{< tabs >}}
{{% tab "Windows 호스트" %}}

SQL Server 텔레메트리 수집을 시작하려면 우선 [Datadog Agent][1]를 설치합니다.

SQL Server Agent conf 파일 `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`을 생성합니다. 사용 가능한 모든 구성 옵션은 [샘플 conf 파일][2]을 참조하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

`deployment_type` 및 `fully_qualified_domain_name` 필드 설정에 관한 자세한 정보는 [SQL Server 통합 사양][3]을 참조하세요.

[Windows Authentication][4]을 사용하려면 `connection_string: "Trusted_Connection=yes"`를 설정하고 `username` 및 `password` 필드를 생략합니다.

`service` 및 `env` 태그를 사용하여 데이터베이스 텔레메트리를 공통의 태깅 체계를 통해 다른 텔레메트리와 연결합니다. 이러한 태그가 Datadog 전반에서 어떻게 사용되는지는 [Unified Service Tagging][5]을 참조하세요.

### 지원되는 드라이버 {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

권장 [ADO][6] 공급자는 [Microsoft OLE DB Driver][7]입니다. Agent가 실행되는 호스트에 드라이버를 설치해야 합니다.

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

다른 두 공급자 `SQLOLEDB` 및 `SQLNCLI`는 Microsoft에서 지원이 중단된 것으로 간주되며, 더 이상 사용해서는 안 됩니다.

#### ODBC {#odbc}

권장 ODBC 드라이버는 [Microsoft ODBC Driver][8]입니다. Agent 7.51부터는 SQL Server용 ODBC Driver 18이 Linux용 Agent에 포함되어 있습니다. Windows의 경우, Agent가 실행 중인 호스트에 드라이버를 설치해야 합니다.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

모든 Agent 구성이 완료되었으면 [Datadog Agent를 재시작][9]합니다.

### 검증 {#validate}

[Agent의 상태 하위 명령을 실행][10]하고 **검사** 섹션에서 `sqlserver`를 찾습니다. Datadog의 [데이터베이스][11] 페이지로 이동하여 시작합니다.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Linux 호스트" %}}
SQL Server 텔레메트리 수집을 시작하려면 우선 [Datadog Agent][1]를 설치합니다.

Linux에서 Datadog Agent는 추가로 ODBC SQL Server 드라이버(예: [Microsoft ODBC 드라이버][2])를 설치해야 합니다. ODBC SQL Server가 설치되면 `odbc.ini` 및 `odbcinst.ini` 파일을 `/opt/datadog-agent/embedded/etc` 폴더로 복사하세요.

`odbc` 커넥터를 사용하고 `odbcinst.ini` 파일에 표시된 것과 같이 적절한 드라이버를 지정합니다.

SQL Server Agent conf 파일 `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`을 생성합니다. 사용 가능한 모든 구성 옵션은 [샘플 conf 파일][3]을 참조하세요.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

`deployment_type` 및 `fully_qualified_domain_name` 필드 설정에 관한 자세한 정보는 [SQL Server 통합 사양][4]을 참조하세요.

`service` 및 `env` 태그를 사용하여 데이터베이스 텔레메트리를 공통의 태깅 체계를 통해 다른 텔레메트리와 연결합니다. 이러한 태그가 Datadog 전반에서 어떻게 사용되는지는 [Unified Service Tagging][5]을 참조하세요.

모든 Agent 구성이 완료되었으면 [Datadog Agent를 재시작][6]합니다.

### 검증 {#validate-1}

[Agent의 상태 하위 명령을 실행][7]하고 **검사** 섹션에서 `sqlserver`를 찾습니다. Datadog의 [데이터베이스][8] 페이지로 이동하여 시작합니다.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Docker 컨테이너에서 실행되는 Database Monitoring Agent를 구성하려면 Agent 컨테이너에서 [Autodiscovery Integration 템플릿][1]을 Docker 레이블로 설정합니다.

**참고**: 레이블에 대한 Autodiscovery가 작동하려면 Agent에 Docker 소켓에 대한 읽기 권한이 있어야 합니다.

값을 계정 및 환경과 일치하도록 교체합니다. 사용 가능한 모든 구성 옵션은 [샘플 conf 파일][2]을 참조하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<PORT>",
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
      "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

`deployment_type` 및 `fully_qualified_domain_name` 필드 설정에 관한 자세한 정보는 [SQL Server 통합 사양][3]을 참조하세요.

`service` 및 `env` 태그를 사용하여 데이터베이스 텔레메트리를 공통의 태깅 체계를 통해 다른 텔레메트리와 연결합니다. 이러한 태그가 Datadog 전반에서 어떻게 사용되는지는 [Unified Service Tagging][4]을 참조하세요.

### 검증 {#validate-2}

[Agent의 상태 하위 명령을 실행][5]하고 **검사** 섹션에서 `sqlserver`를 찾습니다. 또는 Datadog의 [데이터베이스][6] 페이지로 이동하여 시작합니다.


[1]: /ko/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Kubernetes 클러스터를 실행 중인 경우 Database Monitoring을 활성화하려면 [Datadog Cluster Agent][1]를 사용하세요. 클러스터 검사가 이미 활성화되어 있지 않은 경우, [이 지침][2]을 따라 활성화한 다음에 계속 진행합니다.

### Operator {#operator}

아래 단계를 따라 SQL Server 통합을 설정합니다. [Kubernetes and Integrations의 Operator 지침][6]을 참고 자료로 사용하세요.

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
              sqlserver.yaml: |-
                cluster_check: true # Make sure to include this flag
                init_config:
                instances:
                - host: <HOSTNAME>,<PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'odbc'
                  driver: 'ODBC Driver 18 for SQL Server'
                  dbm: true
                  # Optional: For additional tags
                  tags:
                    - 'service:<CUSTOM_SERVICE>'
                    - 'env:<CUSTOM_ENV>'
                  # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
                  azure:
                    deployment_type: '<DEPLOYMENT_TYPE>'
                    fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
    ```

2. 다음 명령을 사용하여 변경 사항을 Datadog Operator에 적용합니다.

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Kubernetes 클러스터에서 [Datadog Cluster Agent][1]를 설치하려면 다음 단계를 완료합니다. 값을 계정 및 환경과 일치하도록 교체합니다.

1. Helm에 대한 [Datadog Agent 설치 지침][3]대로 완료합니다.
2. YAML 구성 파일(Cluster Agent 설치 지침의 `datadog-values.yaml`)이 다음을 포함하도록 업데이트합니다.
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true # Required for cluster checks
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>,<PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: 'ODBC Driver 18 for SQL Server'
            # Optional: For additional tags
            tags:
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'
            # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
            azure:
              deployment_type: '<DEPLOYMENT_TYPE>'
              fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'

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

마운팅된 구성 파일을 사용하여 클러스터 검사를 구성하려면, 구성 파일을 Cluster Agent 컨테이너의 경로 `/conf.d/sqlserver.yaml`에 마운팅합니다.

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,<PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # Optional: For additional tags
    tags:
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

### Kubernetes 서비스 주석으로 구성 {#configure-with-kubernetes-service-annotations}

파일을 마운팅하지 않고 인스턴스 구성을 Kubernetes Service로 선언할 수 있습니다. Kubernetes에서 실행되는 Agent에 이 검사를 구성하려면 다음 구문을 사용하여 서비스를 생성합니다.

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
          "host": "<HOSTNAME>,<PORT>",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],
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

`deployment_type` 및 `fully_qualified_domain_name` 필드 설정에 관한 자세한 정보는 [SQL Server 통합 사양][4]을 참조하세요.

Cluster Agent가 자동으로 이 구성을 등록하고 SQL Server 검사를 실행하기 시작합니다.

`datadog` 사용자의 비밀번호가 일반 텍스트로 노출되지 않도록 하려면 Agent의 [시크릿 관리 패키지][5]를 사용하고 `ENC[]` 구문을 사용하여 비밀번호를 선언하세요.


[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: /ko/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /ko/agent/configuration/secrets-management
[6]: /ko/containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Azure 통합 설치 {#install-the-azure-integration}

Azure에서 좀 더 포괄적인 데이터베이스 메트릭과 로그를 수집하려면 [Azure 통합][1]을 설치하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/azure