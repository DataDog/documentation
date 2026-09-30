---
aliases:
- /ko/data_jobs/databricks
description: 'OAuth 또는 개인 액세스 토큰 인증과 Datadog Agent 설치를 사용하여 Databricks 작업 공간에 대해 Data
  Observability: Jobs Monitoring을 활성화합니다.'
further_reading:
- link: /data_jobs
  tag: 설명서
  text: 'Data Observability: Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: 블로그
  text: Databricks 서버리스 작업 모니터링으로 문제를 감지하고 비용 최적화하기
title: 'Databricks용 Data Observability: Jobs Monitoring 활성화'
---
[Data Observability: Jobs Monitoring][7]은 클러스터 또는 서버리스 컴퓨트에서 실행되는 Databricks 작업 및 워크플로의 성능과 안정성을 가시화합니다.

## 설정 {#setup}

<div class="alert alert-info">Databricks 작업 공간에 <a href="https://docs.databricks.com/en/security/network/front-end/index.html">네트워킹 제한</a>이 활성화된 경우 Datadog의 IP 주소를 {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} 허용 목록에 추가하세요. 작업 공간에서 Private Link를 사용하는 경우 아래의 <strong>Private Link Connectivity</strong> 탭을 참조하세요.</div>

다음 단계에 따라 Databricks용 Data Observability: Jobs Monitoring을 활성화합니다.

Databricks 작업 공간에 대해 1. [Datadog-Databricks 통합](#configure-the-datadog-databricks-integration)을 구성합니다.
작업 공간의 Databricks 클러스터에 1. [Datadog Agent](#install-the-datadog-agent)를 설치합니다.


### Datadog-Databricks 통합 구성 {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "OAuth용 서비스 주체 사용" %}}

<div class="alert alert-danger">새 작업 공간 통합은 OAuth를 사용하여 인증해야 합니다. 이미 개인 액세스 토큰으로 통합된 작업 공간은 계속 작동하며 언제든지 OAuth로 전환할 수 있습니다. 작업 공간이 OAuth 사용을 시작하면 다시 개인 액세스 토큰으로 되돌릴 수 없습니다.</div>

#### Databricks에서 서비스 주체 생성 및 구성 {#create-and-configure-the-service-principal-in-databricks}

1. **Databricks 작업 공간 관리자** 권한으로 작업 공간 오른쪽 상단의 프로필을 클릭하여 {{< ui >}}Settings{{< /ui >}}로 이동합니다.
1. {{< ui >}}Identity and access{{< /ui >}} 탭에서 {{< ui >}}Service principals{{< /ui >}} 옆의 {{< ui >}}Manage{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Add service principal{{< /ui >}}을 클릭한 다음 {{< ui >}}Add new{{< /ui >}}를 클릭합니다.

   <div class="alert alert-warning">Azure Databricks의 경우 관리 유형으로 'Databricks managed'를 선택하세요. Datadog은 'Microsoft Entra ID managed' 서비스 주체를 지원하지 않습니다.</div>
1. 이름을 입력하고 서비스 주체에 대해 다음 작업 공간 권한을 활성화합니다.
   - {{< ui >}}Workspace access{{< /ui >}}
   - {{< ui >}}Databricks SQL access{{< /ui >}}
   - {{< ui >}}Admin access{{< /ui >}}: Datadog에 필요한 작업 공간 관리자 액세스 권한을 부여합니다. 이는 서비스 주체를 `admins` 그룹에 추가하는 것과 동일합니다.

   <div class="alert alert-info"><strong>관리자 액세스</strong> 권한을 부여할 수 없는 경우, '고급 구성'의 <a href="#permissions">권한</a> 섹션에 설명된 대로 세분화된 액세스 권한을 대신 프로비저닝하세요.</div>
1. **Add**를 클릭합니다.

1. 새로 생성한 서비스 주체의 이름을 클릭합니다. {{< ui >}}Secrets{{< /ui >}} 탭에서 {{< ui >}}Generate secret{{< /ui >}}을 클릭합니다.
   1. {{< ui >}}Lifetime (days){{< /ui >}} 값을 허용되는 최대값(730)으로 설정합니다.

   1. {{< ui >}}Generate{{< /ui >}}를 클릭합니다.

   1. 클라이언트 ID와 클라이언트 시크릿을 기록해 둡니다.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="Databricks에서는 새 OAuth 시크릿과 연결된 클라이언트 ID 및 시크릿을 표시하는 모달 창이 나타납니다." style="width:70%;" >}}

1. {{< ui >}}Permissions{{< /ui >}} 탭에서 {{< ui >}}Grant access{{< /ui >}}를 클릭합니다. 새 서비스 주체를 검색한 후 {{< ui >}}Manage{{< /ui >}} 권한을 부여하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### Databricks 작업 공간을 Datadog에 추가 {#add-the-databricks-workspace-to-datadog}

1. Datadog에서 Databricks 통합 타일을 엽니다.
1. {{< ui >}}Configure{{< /ui >}} 탭에서 {{< ui >}}Add Databricks Workspace{{< /ui >}}를 클릭합니다.
1. 작업 공간 이름, Databricks 작업 공간 URL, 그리고 생성한 클라이언트 ID 및 시크릿을 입력합니다.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="Datadog-Databricks 통합 타일에는 Databricks 작업 공간이 표시됩니다. 이 작업 공간에는 이름, URL, 클라이언트 ID 및 클라이언트 시크릿이 포함됩니다." style="width:100%;" >}}
1. Datadog이 쿼리할 [Databricks SQL Warehouse][19]의 ID를 제공하세요. 이를 통해 Jobs Monitoring 또는 [Cloud Cost Management][18]에서 Databricks 비용을 파악할 수 있으며 [Quality Monitoring][21] 기능에 대한 지원이 제공됩니다.
   1. Databricks에서 {{< ui >}}SQL Warehouses{{< /ui >}}로 이동하여 Datadog이 사용할 웨어하우스를 선택합니다. Pro 또는 Serverless여야 합니다. Classic Warehouse는 지원되지 않습니다. 비용을 절감하려면 Auto Stop을 5~10분으로 구성한 전용 2XS 웨어하우스를 사용하세요.
   1. 웨어하우스의 개요 페이지에서 ID를 복사하여(웨어하우스 URL의 마지막 세그먼트이기도 함) 통합 타일에 입력합니다.
   1. 웨어하우스의 {{< ui >}}Permissions{{< /ui >}} 탭(오른쪽 상단)에서 서비스 주체에 `CAN USE`를 부여합니다.
   1. 서비스 주체에 Unity Catalog [시스템 테이블][20]에 대한 읽기 액세스 권한을 부여합니다. {{< ui >}}SQL Editor{{< /ui >}}에서 서비스 주체의 클라이언트 ID(표시 이름 아님)를 사용하여 다음 명령을 실행합니다.

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">이 명령을 실행하는 사용자는 <code>MANAGE</code> 권한을 <code>CATALOG system</code>에서 보유해야 합니다.</div>
1. **Select products to set up integration** 섹션에서 Data Observability: Jobs Monitoring이 {{< ui >}}Enabled{{< /ui >}} 상태인지 확인합니다.
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} 섹션에서 다음 중 하나를 선택합니다.
    - [Datadog에서 관리(권장)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog이 작업 공간에 전역 초기화 스크립트를 설치하고 Agent를 관리합니다.
    - [수동](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): 특정 Databricks 클러스터 또는 전체 환경에 Agent를 설치하기 위한 초기화 스크립트를 설치 및 관리하려면 아래의 [지침](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)을 따르세요.

[18]: https://docs.datadoghq.com/ko/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ko/data_observability/quality_monitoring/data_warehouses/databricks/

{{% /tab %}}

{{% tab "Private Link Connectivity" %}}

Databricks 작업 공간이 [Private Link Connectivity][25]를 사용하여 배포된 경우 Datadog은 Databricks API에 직접 액세스할 수 없습니다. 이 경우 사용자 환경에 배포된 [Private Action Runner][26]를 사용해야 합니다.

전체 설정 방법은 [Private Link Connectivity (Preview)][15]를 참조하세요.

[15]: /ko/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/ko/actions/private_actions/

{{% /tab %}}

{{% tab "개인 액세스 토큰 사용(레거시)" %}}

<div class="alert alert-danger">이 옵션은 2025년 7월 7일 이전에 생성된 작업 공간 통합에서만 사용할 수 있습니다. 새 작업 공간 통합은 OAuth를 사용하여 인증해야 합니다.</div>

1. Databricks 작업 공간에서 오른쪽 상단의 프로필을 클릭한 후 {{< ui >}}Settings{{< /ui >}}로 이동합니다. 왼쪽 사이드바에서 {{< ui >}}Developer{{< /ui >}}를 선택합니다. {{< ui >}}Access tokens{{< /ui >}} 옆의 {{< ui >}}Manage{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Generate new token{{< /ui >}}을 클릭한 후, {{< ui >}}Comment{{< /ui >}} 필드에 'Datadog Integration'을 입력하고, {{< ui >}}Lifetime (days){{< /ui >}} 값을 허용된 최대값(730일)으로 설정한 다음, 토큰 만료 전에 갱신할 수 있도록 알림을 생성합니다. 그런 다음 {{< ui >}}Generate{{< /ui >}}를 클릭합니다. 생성된 토큰을 기록해 둡니다.

   **중요:**
   * [Datadog 관리 초기화 스크립트 설치(권장)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent)를 사용하는 경우, 토큰의 주체가 <strong>Workspace Admin</strong>이어야 합니다.
   * 초기화 스크립트를 수동으로 설치하는 경우, 토큰의 주체에 모니터링하려는 Databricks 작업 및 클러스터에 대한 [CAN VIEW 액세스][9] 권한이 있어야 합니다.

   대안으로, [Databricks 공식 문서][10]를 따라 [서비스 주체][11]용 액세스 토큰을 생성할 수 있습니다. 서비스 주체에는 [<strong>작업 공간 액세스</strong> 권한][17]이 활성화되어 있어야 하며, 위에서 설명한 <strong>Workspace Admin</strong> 또는 [CAN VIEW 액세스][9] 권한이 있어야 합니다.
1. Datadog에서 Databricks 통합 타일을 엽니다.
1. {{< ui >}}Configure{{< /ui >}} 탭에서 {{< ui >}}Add Databricks Workspace{{< /ui >}}를 클릭합니다.
1. 작업 공간 이름, Databricks 작업 공간 URL 및 생성한 Databricks 토큰을 입력합니다.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="Datadog-Databricks 통합 타일에는 Databricks 작업 공간이 표시됩니다. 이 작업 공간에는 이름, URL 및 API 토큰이 포함됩니다." style="width:100%;" >}}
1. Datadog이 쿼리할 [Databricks SQL Warehouse][19]의 ID를 제공하세요. 이를 통해 Jobs Monitoring 또는 [Cloud Cost Management][18]에서 Databricks 비용을 파악할 수 있으며 [Quality Monitoring][21] 기능에 대한 지원이 제공됩니다.
   1. Databricks에서 {{< ui >}}SQL Warehouses{{< /ui >}}로 이동하여 Datadog이 사용할 웨어하우스를 선택합니다. Pro 또는 Serverless여야 합니다. Classic Warehouse는 지원되지 않습니다. 비용을 절감하려면 Auto Stop을 5~10분으로 구성한 전용 2XS 웨어하우스를 사용하세요.
   1. 웨어하우스의 개요 페이지에서 ID를 복사하여(웨어하우스 URL의 마지막 세그먼트이기도 함) 통합 타일에 입력합니다.
   1. 웨어하우스의 {{< ui >}}Permissions{{< /ui >}} 탭(오른쪽 상단)에서 토큰의 주체에 `CAN USE`를 부여합니다.
   1. 토큰의 주체에 Unity Catalog [시스템 테이블][20]에 대한 읽기 액세스 권한을 부여합니다. {{< ui >}}SQL Editor{{< /ui >}}에서 주체의 클라이언트 ID(표시 이름 아님)를 사용하여 다음 명령을 실행합니다.

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">이 명령을 실행하는 사용자는 <code>MANAGE</code> 권한을 <code>CATALOG system</code>에서 보유해야 합니다.</div>
1.  **Select products to set up integration** 섹션에서 Data Observability: Jobs Monitoring 제품이 **Enabled** 상태인지 확인합니다.
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} 섹션에서 다음 중 하나를 선택합니다.
    - [Datadog에서 관리(권장)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog이 작업 공간에 전역 초기화 스크립트를 설치하고 Agent를 관리합니다.
    - [수동](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): 특정 Databricks 클러스터 또는 전체 환경에 Agent를 설치하기 위한 초기화 스크립트를 설치 및 관리하려면 아래의 [지침](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)을 따르세요.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/ko/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ko/data_observability/quality_monitoring/data_warehouses/databricks/


{{% /tab %}}

{{< /tabs >}}

### Datadog Agent 설치 {#install-the-datadog-agent}

Databricks 작업 클러스터 또는 범용 클러스터에서 실행되는 Databricks 작업을 모니터링하려면 Datadog Agent를 Databricks 클러스터에 설치해야 합니다. 이 단계는 [서버리스 컴퓨트][4]에서 실행되는 작업을 모니터링하는 경우에는 필요하지 않습니다.

{{< tabs >}}
{{% tab "Datadog 관리 전역 초기화 스크립트(권장)" %}}

Datadog은 Databricks 작업 공간에 전역 초기화 스크립트를 설치하고 관리할 수 있습니다. Datadog Agent는 작업 공간 내의 모든 클러스터가 시작될 때 자동으로 설치됩니다.

<div class="alert alert-danger">
<ul>
<li>이 설정은 <strong>Standard</strong> 액세스 모드의 Databricks 클러스터에서는 작동하지 않습니다. 해당 클러스터에는 전역 초기화 스크립트를 설치할 수 없기 때문입니다. <strong>Standard</strong> 액세스 모드를 사용하는 클러스터의 경우 Datadog은 여러 클러스터에 대해 <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">클러스터 정책 수동 구성</a> 또는 <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">특정 클러스터에 수동 설치</a>를 권장합니다.</li>
<li>Datadog이 전역 초기화 스크립트를 설치하고 관리하는 이 설치 방식은 <strong>Workspace Admin</strong> 권한이 있는 Databricks 액세스 토큰을 필요로 합니다. CAN VIEW 권한만 있는 토큰으로는 Datadog이 Databricks 계정의 전역 초기화 스크립트를 관리할 수 없습니다.</li>
</ul>
</div>

#### Datadog과 작업 공간을 통합할 때 {#when-integrating-a-workspace-with-datadog}

1.  **Select products to set up integration** 섹션에서 Data Observability: Jobs Monitoring 제품이 **Enabled** 상태인지 확인합니다.
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} 섹션에서 {{< ui >}}Managed by Datadog{{< /ui >}} 토글 버튼을 선택합니다.
1. {{< ui >}}Select API Key{{< /ui >}}를 클릭하여 기존 Datadog API 키를 선택하거나 새 Datadog API 키를 생성합니다.
1. (선택 사항) 작업과의 연관 분석을 위해 드라이버 및 워커 로그를 수집하지 않으려면 {{< ui >}}Enable Log Collection{{< /ui >}}을 비활성화합니다.
1. {{< ui >}}Save Databricks Workspace{{< /ui >}}를 클릭합니다.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="Datadog-Databricks 통합 타일의 Datadog Agent 설정 화면(새 Databricks 작업 공간 추가 시). Datadog은 전역 초기화 스크립트를 설치하고 관리할 수 있습니다." style="width:100%;" >}}

#### 이미 Datadog과 통합된 Databricks 작업 공간에 초기화 스크립트를 추가할 때 {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. **Configure** 탭에서 작업 공간 목록의 해당 작업 공간을 클릭합니다.
1. {{< ui >}}Configured Products{{< /ui >}} 탭을 클릭합니다.
1. Data Observability: Jobs Monitoring 제품이 **Enabled** 상태인지 확인합니다.
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} 섹션에서 {{< ui >}}Managed by Datadog{{< /ui >}} 토글 버튼을 선택합니다.
1. {{< ui >}}Select API Key{{< /ui >}}를 클릭하여 기존 Datadog API 키를 선택하거나 새 Datadog API 키를 생성합니다.
1. (선택 사항) 작업과의 연관 분석을 위해 드라이버 및 워커 로그를 수집하지 않으려면 {{< ui >}}Enable Log Collection{{< /ui >}}을 비활성화합니다.
1. 브라우저 창 하단의 **Save Databricks Workspace**를 클릭합니다.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="Datadog-Databricks 통합 타일의 Datadog Agent 설정 화면(이미 추가된 Databricks 작업 공간) Datadog은 전역 초기화 스크립트를 설치하고 관리할 수 있습니다." style="width:100%;" >}}

선택적으로, Databricks UI에서 클러스터의 {{< ui >}}Advanced Configuration{{< /ui >}} 섹션에서 다음 환경 변수를 구성하거나 Databricks API를 통해 [Spark 환경 변수][2]로 구성하면, Databricks 클러스터 및 Spark 성능 메트릭에 태그를 추가할 수 있습니다.

| 변수                 | 설명                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Databricks 클러스터 및 Spark 성능 메트릭에 태그를 추가합니다. 쉼표 또는 공백으로 구분된 키:값 쌍을 사용합니다. [Datadog 태그 규칙][1]을 따르세요. 예: `env:staging,team:data_engineering` |
| DD_ENV                   | 이 클러스터에서 생성되는 메트릭, 트레이스 및 로그의 `env` 환경 태그를 재정의합니다. 기본적으로 Databricks 작업 공간 이름이 env로 사용됩니다.|
| DD_LOGS_CONFIG_PROCESSING_RULES | 처리 규칙을 사용하여 수집되는 로그를 필터링합니다 자세한 내용은 [고급 로그 수집][3]을 참조하세요. |


[1]: /ko/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /ko/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "클러스터 정책 수동 구성" %}}

이 방법은 **Standard** 액세스 모드의 클러스터에 권장됩니다.

**초기화 스크립트 생성**

1. Databricks에서 다음 내용을 포함하는 초기화 스크립트 파일을 [Unity Catalog 볼륨][26]에 생성합니다. 볼륨 경로(예: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)를 기록해 두세요.

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. 초기화 스크립트에 읽기 전용 권한 부여:
    1. 볼륨 수준에서 모든 계정 사용자에게 `READ VOLUME` 권한을 부여합니다.
    1. 카탈로그 수준에서 모든 계정 사용자에게 `USE CATALOG` 권한을 부여합니다.

   <div class="alert alert-info">Databricks는 클러스터를 실행하는 주체가 아닌 <strong>클러스터 소유자</strong>를 기준으로 Unity Catalog 볼륨 권한을 평가합니다.</div>

1. **초기화 스크립트를 허용 목록에 추가**: **Standard** 액세스 모드 클러스터의 경우 초기화 스크립트 경로를 Unity Catalog 허용 목록에 추가해야 합니다. 초기화 스크립트 경로를 허용 목록에 추가하려면 [Databricks 설명서][27]의 지침을 따르세요.

**컴퓨팅 정책 구성**

1. {{< ui >}}Compute{{< /ui >}}에서 {{< ui >}}Policies{{< /ui >}} 탭으로 이동합니다. 이미 클러스터에 적용된 정책이 있는 경우 해당 정책을 열어 편집합니다. 이 방법이 더 간단한 이유는 해당 정책을 사용하는 모든 클러스터에 자동으로 적용되기 때문입니다. 그렇지 않은 경우 {{< ui >}}Create Policy{{< /ui >}}를 클릭하여 새 정책을 생성합니다.
1. 클러스터 정책에 초기화 스크립트를 추가하려면 {{< ui >}}Definition{{< /ui >}} 섹션에서 {{< ui >}}Add Definition{{< /ui >}}을 클릭합니다. 열리는 모달 창에서 다음 필드를 입력합니다.
   1. {{< ui >}}Field{{< /ui >}} 드롭다운에서 {{< ui >}}init_scripts{{< /ui >}}를 선택합니다.
   1. {{< ui >}}Source{{< /ui >}} 드롭다운에서 {{< ui >}}Volume{{< /ui >}}을 선택합니다.
   1. {{< ui >}}Destination{{< /ui >}}에 초기화 스크립트의 볼륨 경로를 입력합니다.
   1. {{< ui >}}Add{{< /ui >}}를 클릭합니다.
1. 환경 변수를 구성합니다. 생성한 클러스터 정책에 다음 환경 변수를 각각 추가해야 합니다.

   | 키                  | 설명                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | [Datadog API 키][1].   |
   | DD_SITE              | [Datadog 사이트][2].      |
   | DATABRICKS_WORKSPACE | Databricks Workspace의 이름. [Datadog-Databricks 통합 단계](#configure-the-datadog-databricks-integration)에서 제공한 이름과 일치해야 합니다. |

   1. 위 변수 각각에 대해 {{< ui >}}Definition{{< /ui >}} 섹션에서 {{< ui >}}Add Definition{{< /ui >}}을 클릭합니다. 열리는 모달 창에서 다음 필드를 입력합니다.
       1. {{< ui >}}Field{{< /ui >}} 드롭다운에서 {{< ui >}}spark_env_vars{{< /ui >}}를 선택합니다.
       1. {{< ui >}}Key{{< /ui >}} 필드에 환경 변수 키를 입력합니다.
       1. {{< ui >}}Value{{< /ui >}} 필드에 환경 변수 값을 입력합니다.
       1. {{< ui >}}Type{{< /ui >}} 드롭다운에서 {{< ui >}}Fixed{{< /ui >}}를 선택합니다.
       1. 민감한 값 노출을 줄이기 위해 {{< ui >}}Hidden{{< /ui >}} 확인란을 선택합니다.
   1. 선택적으로 `DD_ENV`, `DD_SERVICE` 등의 다른 초기화 스크립트 파라미터와 Datadog 환경 변수를 설정할 수 있습니다. 다음 파라미터를 사용하여 스크립트를 구성할 수 있습니다.

      | 변수                 |  설명                                                                                                                                                      |  기본값 |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Datadog에서 Spark 드라이버 로그를 수집합니다.                                                                                                                          | false   |
      | WORKER_LOGS_ENABLED      | Datadog에서 Spark 워커 로그를 수집합니다.                                                                                                                            | false   |
      | DD_TAGS                  | Databricks 클러스터 및 Spark 성능 메트릭에 태그를 추가합니다. 쉼표 또는 공백으로 구분된 키:값 쌍을 사용합니다. [Datadog 태그 규칙][4]을 따르세요. 예: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | 이 클러스터에서 생성되는 메트릭, 트레이스 및 로그의 `env` 환경 태그를 재정의합니다. 기본적으로 Databricks 작업 공간 이름이 env로 사용됩니다.                                                                                         |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | 처리 규칙을 사용하여 수집되는 로그를 필터링합니다 자세한 내용은 [고급 로그 수집][5]을 참조하세요. |         |

1. 새 정책을 생성하는 경우 {{< ui >}}Create{{< /ui >}}를 클릭하고, 기존 정책을 업데이트하는 경우 {{< ui >}}Save{{< /ui >}}를 클릭합니다. 기존 정책을 업데이트하면 해당 정책을 사용하는 모든 클러스터에 다음 재시작 시 변경 사항이 자동으로 적용됩니다. 새 정책을 생성한 경우 아래 단계에 따라 클러스터에 적용하세요.

**클러스터에 정책 적용**

1. {{< ui >}}Compute{{< /ui >}}에서 업데이트할 클러스터를 선택하거나 새 클러스터를 생성하려면 {{< ui >}}Create Compute{{< /ui >}}를 클릭합니다.
1. 상단의 {{< ui >}}Policy{{< /ui >}} 드롭다운에서 생성한 정책을 선택합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭하여 변경 사항을 저장합니다. 정책이 적용되려면 클러스터를 다시 시작해야 합니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ko/getting_started/tagging/
[5]: /ko/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "전역 초기화 스크립트 수동 설치" %}}

<div class="alert alert-danger">
이 설정은 <strong>Standard</strong> 액세스 모드의 Databricks 클러스터에서는 작동하지 않습니다. 해당 클러스터에는 전역 초기화 스크립트를 설치할 수 없기 때문입니다. <strong>Standard</strong> 액세스 모드를 사용하는 클러스터의 경우 Datadog은 <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">클러스터 정책 수동 구성</a> 또는 <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">특정 클러스터에 수동 설치</a>를 권장합니다.
</div>

1. Databricks에서 페이지 오른쪽 상단의 표시 이름(이메일 주소)을 클릭합니다.
1. {{< ui >}}Settings{{< /ui >}}를 선택한 다음 {{< ui >}}Compute{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}All purpose clusters{{< /ui >}} 섹션에서 {{< ui >}}Global init scripts{{< /ui >}} 옆의 {{< ui >}}Manage{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Add{{< /ui >}}를 클릭합니다. 스크립트 이름을 입력합니다. 그런 다음 {{< ui >}}Script{{< /ui >}} 필드에 아래 스크립트를 복사하여 붙여넣고, 자리 표시자를 실제 파라미터 값으로 교체합니다.

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   위 스크립트는 필수 파라미터를 설정하고 Databricks용 Data Observability: Jobs Monitoring의 최신 초기화 스크립트를 다운로드하여 실행합니다. 특정 버전에 고정하려면 URL의 파일 이름을 예를 들어 `install-databricks-0.14.0.sh`로 변경하여 버전 `0.14.0`을 사용할 수 있습니다. 이 스크립트를 생성하는 데 사용된 소스 코드와 스크립트 버전 간 변경 사항은 [Datadog Agent 리포지토리][3]에서 확인할 수 있습니다.

1. 새로 생성되거나 재시작되는 모든 클러스터에서 스크립트를 활성화하려면 {{< ui >}}Enabled{{< /ui >}}를 켭니다.
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI, 관리자 설정, 전역 초기화 스크립트 'install-datadog-agent'라는 스크립트가 활성화 토글과 함께 목록에 표시됩니다." style="width:100%;" >}}
1. {{< ui >}}Add{{< /ui >}}를 클릭합니다.

#### 필수 초기화 스크립트 파라미터 설정 {#set-the-required-init-script-parameters}

전역 초기화 스크립트의 시작 부분에 초기화 스크립트 파라미터 값을 입력합니다.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

선택적으로 `DD_ENV`, `DD_SERVICE`와 같은 다른 초기화 스크립트 파라미터 및 Datadog 환경 변수도 설정할 수 있습니다. 스크립트는 다음 파라미터를 사용하여 구성할 수 있습니다.

| 변수                 | 설명                                                                                                                                                      | 기본값 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API 키][1].                                                                                                                                        |         |
| DD_SITE                  | [Datadog 사이트][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Databricks Workspace의 이름. [Datadog-Databricks 통합 단계](#configure-the-datadog-databricks-integration)에서 제공한 이름과 일치해야 합니다. 공백이 포함된 경우 이름을 큰따옴표로 묶으세요. |         |
| DRIVER_LOGS_ENABLED      | Datadog에서 Spark 드라이버 로그를 수집합니다.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Datadog에서 Spark 워커 로그를 수집합니다.                                                                                                                         | false   |
| DD_TAGS                  | Databricks 클러스터 및 Spark 성능 메트릭에 태그를 추가합니다. 쉼표 또는 공백으로 구분된 키:값 쌍을 사용합니다. [Datadog 태그 규칙][4]을 따르세요. 예: `env:staging,team:data_engineering` |         |
| DD_ENV                   | 이 클러스터에서 생성되는 메트릭, 트레이스 및 로그의 `env` 환경 태그를 재정의합니다. 기본적으로 Databricks 작업 공간 이름이 env로 사용됩니다.                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 처리 규칙을 사용하여 수집되는 로그를 필터링합니다 자세한 내용은 [고급 로그 수집][5]을 참조하세요. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ko/getting_started/tagging/
[5]: /ko/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "특정 클러스터에 수동 설치" %}}

1. Databricks에서 다음 내용을 포함하는 초기화 스크립트 파일을 [Unity Catalog 볼륨][26]에 생성합니다. 볼륨 경로(예: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)를 기록해 두세요.

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   위 스크립트는 Databricks용 Data Observability: Jobs Monitoring의 최신 초기화 스크립트를 다운로드하여 실행합니다. 특정 버전에 고정하려면 URL의 파일 이름(예: `install-databricks-0.14.0.sh`)을 변경하여 버전 `0.14.0`을 사용할 수 있습니다. 이 스크립트를 생성하는 데 사용된 소스 코드와 스크립트 버전 간 변경 사항은 [Datadog Agent 리포지토리][3]에서 확인할 수 있습니다.

1. 초기화 스크립트에 읽기 전용 권한 부여:
    1. 볼륨 수준에서 모든 계정 사용자에게 `READ VOLUME` 권한을 부여합니다.
    1. 카탈로그 수준에서 모든 계정 사용자에게 `USE CATALOG` 권한을 부여합니다.

   <div class="alert alert-info">Databricks는 클러스터를 실행하는 주체가 아닌 <strong>클러스터 소유자</strong>를 기준으로 Unity Catalog 볼륨 권한을 평가합니다.</div>

1. **초기화 스크립트를 허용 목록에 추가** (**Standard** 액세스 모드 클러스터의 경우 필수): 클러스터가 **Standard** 액세스 모드를 사용하는 경우 초기화 스크립트 경로를 Unity Catalog 허용 목록에 추가해야 합니다. 초기화 스크립트 경로를 허용 목록에 추가하려면 [Databricks 설명서][27]의 지침을 따르세요.

1. 클러스터 구성 페이지에서 {{< ui >}}Advanced options{{< /ui >}} 토글을 클릭합니다.
1. 페이지 하단에서 {{< ui >}}Init Scripts{{< /ui >}} 탭으로 이동합니다.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI, 클러스터 구성 고급 옵션, Init Scripts 탭 'Destination' 드롭다운과 'Init script path' 파일 선택기." style="width:80%;" >}}

   - {{< ui >}}Destination{{< /ui >}} 드롭다운에서 {{< ui >}}Volume{{< /ui >}}을 선택합니다.
   - {{< ui >}}Init script path{{< /ui >}}에 초기화 스크립트의 볼륨 경로를 입력합니다.
   - {{< ui >}}Add{{< /ui >}}를 클릭합니다.

#### 필수 초기화 스크립트 파라미터 설정 {#set-the-required-init-script-parameters-1}

1. Databricks의 클러스터 구성 페이지에서 {{< ui >}}Advanced options{{< /ui >}} 토글을 클릭합니다.
2. 페이지 하단에서 {{< ui >}}Spark{{< /ui >}} 탭으로 이동합니다.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Databricks UI, 클러스터 구성 고급 옵션, Spark 탭. 'Environment variables'라는 텍스트 상자에 DD_API_KEY 및 DD_SITE 값이 포함되어 있습니다." style="width:100%;" >}}

   {{< ui >}}Environment variables{{< /ui >}} 텍스트 상자에 초기화 스크립트 파라미터 값을 입력합니다.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   선택적으로 `DD_ENV`, `DD_SERVICE`와 같은 다른 초기화 스크립트 파라미터 및 Datadog 환경 변수도 설정할 수 있습니다. 스크립트는 다음 파라미터를 사용하여 구성할 수 있습니다.

| 변수                 | 설명                                                                                                                                                      | 기본값 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API 키][1].                                                                                                                                        |         |
| DD_SITE                  | [Datadog 사이트][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Databricks Workspace의 이름. [Datadog-Databricks 통합 단계](#configure-the-datadog-databricks-integration)에서 제공한 이름과 일치해야 합니다. |         |
| DRIVER_LOGS_ENABLED      | Datadog에서 Spark 드라이버 로그를 수집합니다.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Datadog에서 Spark 워커 로그를 수집합니다.                                                                                                                         | false   |
| DD_TAGS                  | Databricks 클러스터 및 Spark 성능 메트릭에 태그를 추가합니다. 쉼표 또는 공백으로 구분된 키:값 쌍을 사용합니다. [Datadog 태그 규칙][4]을 따르세요. 예: `env:staging,team:data_engineering` |         |
| DD_ENV                   | 이 클러스터에서 생성되는 메트릭, 트레이스 및 로그의 `env` 환경 태그를 재정의합니다. 기본적으로 Databricks 작업 공간 이름이 env로 사용됩니다.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 처리 규칙을 사용하여 수집되는 로그를 필터링합니다 자세한 내용은 [고급 로그 수집][5]을 참조하세요. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ko/getting_started/tagging/
[5]: /ko/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

3. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

{{% /tab %}}

{{< /tabs >}}

### 이미 실행 중인 클러스터 재시작 {#restart-already-running-clusters}

초기화 스크립트는 클러스터가 시작될 때 Agent를 설치합니다.

초기화 스크립트가 Datadog Agent를 설치할 수 있으려면 이미 실행 중인 범용 클러스터 또는 장기간 실행되는 작업 클러스터를 수동으로 재시작해야 합니다.

작업 클러스터에서 실행되는 예약 작업의 경우, 초기화 스크립트가 다음 실행 시 Datadog Agent를 자동으로 설치합니다.

## 검증 {#validation}

Datadog에서 [Data Observability: Jobs Monitoring][6] 페이지를 열어 Databricks 작업 목록을 확인합니다.

일부 작업이 보이지 않는 경우 원인을 확인하기 위해 [Configuration][9] 페이지로 이동하세요. 이 페이지에는 아직 클러스터에 Agent가 구성되지 않은 Databricks 작업 목록과 설정 완료를 위한 안내가 표시됩니다.

## 문제 해결 {#troubleshooting}

제품 설치 후 Jobs Monitoring에 데이터가 보이지 않으면 다음 단계를 따르세요.

### 초기화 스크립트가 실행되지 않거나 실패함 {#init-script-not-running-or-failing}

1. **클러스터 재시작**: 초기화 스크립트는 클러스터 시작 시에만 실행됩니다. 초기화 스크립트가 추가된 후 클러스터가 재시작되었는지 확인하세요.
1. **초기화 스크립트 실행 확인**: Databricks에서 클러스터를 클릭하고 {{< ui >}}Event log{{< /ui >}} 탭으로 이동합니다. `INIT_SCRIPTS_STARTED`가 없으면 이 클러스터가 초기화 스크립트를 픽업하지 않은 것입니다. [설치 단계](#install-the-datadog-agent)로 돌아가 초기화 스크립트가 클러스터에 추가되었는지 확인하세요.
1. **초기화 스크립트 성공 확인**: 이벤트 로그에서 `INIT_SCRIPTS_FINISHED` 액션을 찾아 클릭하고 JSON을 검사하여 초기화 스크립트가 실패 후 종료되었는지 여부를 확인합니다.
1. **초기화 스크립트 실패 조사**: `INIT_SCRIPTS_FINISHED`에 실패가 표시되면 [클러스터 로그 전송][29]을 활성화하여 초기화 스크립트 로그를 원하는 대상으로 전송합니다. 로그를 Unity Catalog 볼륨으로 전송하는 것이 권장됩니다.
   {{< img src="data_jobs/databricks/compute_logging_config.png" alt="로그 전송 대상을 구성하는 옵션이 있는 Logging 탭을 보여주는 Databricks 클러스터 구성 페이지입니다." style="width:100%;" >}}
   로그 전송을 활성화한 상태에서 클러스터를 재시작한 후 로그 대상으로 이동합니다. stdout 및 stderr 로그는 다음 경로에서 찾을 수 있습니다.
   ```
   <cluster-log-path>/<cluster-id>/init_scripts/<cluster-id>_<script-hash>/
   ```

### 초기화 스크립트 실행 성공 후 데이터가 표시되지 않음 {#data-not-appearing-after-a-successful-init-script-run}

1. **API 키 검증:** 초기화 스크립트를 수동으로 설치한 경우 [API 키 엔드포인트 검증][25]을 사용하여 스크립트에 지정된 Datadog API 키가 유효한지 확인합니다.
1. **Agent 검증:** 초기화 스크립트는 Datadog Agent를 설치합니다. Agent가 올바르게 설치되었는지 확인하려면 SSH를 통해 클러스터에 연결한 후 다음 Agent 상태 명령을 실행합니다.
  ```shell
  sudo datadog-agent status
  ```

## 고급 구성 {#advanced-configuration}

### 클러스터의 로그 수집 필터링 {#filter-log-collection-on-clusters}

#### 개별 클러스터에서 모든 로그 수집 제외 {#exclude-all-log-collection-from-an-individual-cluster}
Databricks UI에서 클러스터의 {{< ui >}}Advanced Configuration{{< /ui >}} 섹션에서 다음 환경 변수를 구성하거나 Databricks API에서 [Spark 환경 변수][18]로 구성합니다.

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### 권한 {#permissions}
Databricks 작업 공간에 연결하는 사용자 또는 서비스 주체에 대해 아래에 설명된 권한 외에도 다음 작업 공간 권한을 활성화해야 합니다.

- {{< ui >}}Workspace access{{< /ui >}}
- {{< ui >}}Databricks SQL access{{< /ui >}}

#### 작업 공간 권한 {#workspace-permissions}

사용자 또는 서비스 주체에 대해 다음 접근 방식 중 하나를 선택하세요.

- **작업 공간 관리자 권한**(권장): {{< ui >}}Workspace Admin{{< /ui >}} 권한을 부여하세요. 이렇게 하면 Datadog이 초기화 스크립트 설치 및 업데이트를 자동으로 관리할 수 있어 구성 오류 위험을 줄일 수 있습니다.
- **세부 권한**: 보다 세분화된 제어가 필요한 경우에도 작업 공간 내의 모든 작업, 클러스터 및 쿼리를 모니터링할 수 있도록 다음 [작업 공간 수준 객체][19]에 최소 권한을 부여하세요.

  | 객체                 | 권한                                                                                                                                                      |
  |--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | [Job][20]                              | CAN VIEW
  | [Compute][21]                          | CAN ATTACH TO
  | [Lakeflow Declarative Pipelines][22]   | CAN VIEW
  | [Query][23]                            | CAN VIEW
  | [SQL warehouse][24]                    | CAN MONITOR

#### 비용 데이터 권한 {#cost-data-permissions}

또한 Data Observability: Jobs Monitoring 또는 [Cloud Cost Management][26]에서 Datadog이 Databricks 비용 데이터에 액세스할 수 있으려면 [시스템 테이블][27]을 조회하는 데 사용되는 사용자 또는 서비스 주체에 다음 권한이 있어야 합니다.
   SQL Warehouse에 대한 - `CAN USE` 권한
   - Unity Catalog 내 [시스템 테이블][27]에 대한 읽기 권한. Databricks에서 {{< ui >}}SQL Editor{{< /ui >}}를 열고 서비스 주체의 클라이언트 ID(표시 이름 아님)를 사용하여 다음 명령을 실행합니다.
   ```sql
   GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
   GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
   GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
   ```
   이 권한을 부여하는 사용자는 `CATALOG system`에 대한 `MANAGE` 권한을 보유해야 합니다.


### 런타임 시 스팬 태그 지정 {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### 클러스터 태그 구성 {#configure-cluster-tags}

Databricks 사용자 지정 클러스터 태그는 자동으로 캡처되며 Data Observability: Jobs Monitoring 및 Datadog 플랫폼 전반에서 사용할 수 있습니다. 유일한 예외는 Azure 리소스 그룹의 태그로, 이는 자동으로 캡처되지 않습니다.

태그를 수동으로 추가하려면 클러스터의 Spark 환경 변수에 `DD_TAGS` 환경 변수를 설정하세요. 이는 Databricks 사용자 지정 클러스터 태그와 동일한 효과를 갖지만 수동 구성이 필요합니다. [Datadog 태그 규칙][28]에 따라 쉼표 또는 공백으로 구분된 키:값 쌍을 사용하세요.

```text
DD_TAGS=env:staging,team:data_engineering
```

### 일회성 작업 실행의 클러스터 메트릭 집계 {#aggregate-cluster-metrics-from-one-time-job-runs}
   이 구성은 [일회성 실행 API 엔드포인트][8]를 통해 각 실행마다 새로운 작업과 클러스터를 생성하면서 작업의 클러스터 리소스 사용률 데이터를 수집하려는 경우에 적용됩니다(Airflow 또는 Azure Data Factory와 같은 Databricks 외부 오케스트레이션 도구를 사용하는 경우에 일반적임).

   [일회성 실행 API 엔드포인트][8]를 통해 Databricks 작업을 제출하는 경우 각 작업 실행에는 고유한 작업 ID가 할당됩니다. 이로 인해 일시적 클러스터를 사용하는 작업의 클러스터 메트릭을 그룹화하고 분석하기 어려울 수 있습니다. 동일한 작업의 클러스터 사용률을 집계하고 여러 실행에 걸친 성능을 평가하려면 모든 `new_cluster`의 `spark_env_vars` 내부에 있는 `DD_JOB_NAME` 변수를 요청 페이로드의 `run_name`과 동일한 값으로 설정해야 합니다.

   다음은 일회성 작업 실행 요청 본문의 예입니다.

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Databricks Networking Restrictions 환경에서 Data Observability: Jobs Monitoring 설정 {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
[Databricks Networking Restrictions][12]를 사용하는 경우 Datadog이 Databricks API에 액세스하지 못할 수 있습니다. Databricks 작업 실행에 대한 트레이스와 태그 및 기타 메타데이터를 수집하려면 Databricks API 액세스가 필요합니다.

[IP 액세스 목록][13]을 사용하여 Databricks API 액세스를 제어하는 경우 Datadog의 특정 {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} 를 허용 목록에 추가하면 Datadog이 작업 공간의 Databricks API에 연결할 수 있습니다. Datadog에 API 액세스 권한을 부여하기 위한 개별 작업 공간의 IP 액세스 목록 구성 방법은 Databricks의 [개별 작업 공간][16] 설명서를 참조하세요.

[Databricks Private Link][14] 연결을 사용하는 작업 공간을 모니터링하려면 [Private Link Connectivity (Preview)][15]를 참조하세요.

[15]: /ko/data_observability/jobs_monitoring/databricks/private_link

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /ko/data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://app.datadoghq.com/data-jobs/configuration
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
[25]: https://docs.datadoghq.com/ko/api/latest/authentication/?code-lang=curl#validate-api-key
[26]: https://docs.datadoghq.com/ko/cloud_cost_management
[27]: https://docs.databricks.com/aws/en/admin/system-tables/
[28]: /ko/getting_started/tagging/
[29]: https://docs.databricks.com/aws/en/compute/configure#compute-log-delivery