---
description: 'Private Action Runner를 사용하여 Private Link Connectivity로 배포된 Databricks
  작업 영역에 대한 Data Observability: Jobs Monitoring을 설정합니다.'
further_reading:
- link: /data_observability/jobs_monitoring/databricks
  tag: 문서
  text: 'Databricks용 Data Observability: Jobs Monitoring'
- link: /actions/private_actions
  tag: 문서
  text: Private Action Runner
title: Private Link Connectivity
---
<div class="alert alert-info">Private Link Connectivity를 통한 Databricks 모니터링은 미리 보기로 제공되고 있습니다.</div>

[Private Link Connectivity][1]를 사용하여 배포된 Databricks 작업 영역은 공용 인터넷으로부터 격리되어 있으므로 Datadog이 Databricks API에 직접 액세스할 수 없습니다. 이러한 작업 영역을 모니터링하려면 환경에 [Private Action Runner][2](PAR)를 배포하세요. 러너는 Datadog에 요청을 폴링하고, Databricks API에 대해 로컬로 실행하며, 기존 [Datadog VPC 엔드포인트][3]를 통해 결과를 다시 보냅니다.

## 아키텍처 {#architecture}

Private Link 모니터링은 Private Action Runner의 [폴링 아키텍처][4]를 기반으로 구축되었습니다. Datadog은 Databricks API 쿼리를 위한 [스크립트][5]가 포함된 Private Action Runner 이미지의 사용자 지정 버전을 제공합니다.

{{< img src="data_jobs/databricks/privatelink-architecture-2.png" alt="Private Action Runner가 Datadog에 요청을 폴링하고, Databricks API에 대해 실행하며, VPC 엔드포인트를 통해 결과를 반환하는 과정을 보여주는 아키텍처 다이어그램입니다." style="width:100%;" >}}

요청 흐름은 다음과 같이 작동합니다.

1. [Private Action Runner][2]가 Datadog 백엔드에 연결(공용 인터넷 또는 [Private Link][3] 사용)하여 보류 중인 요청을 쿼리합니다. 요청이 발견되면 세부 정보가 러너에게 반환됩니다.
1. Databricks 자격 증명(클라이언트 ID 및 시크릿)이 시크릿 스토리지에서 검색됩니다. 해당 자격 증명을 사용하여 러너에서 Databricks API를 호출하면 세션용 토큰이 생성됩니다.
1. 러너가 가져온 쿼리를 Databricks API에 대해 실행합니다. 결과가 러너로 반환됩니다.
1. 러너가 처리를 위해 결과를 Datadog 백엔드로 다시 전달합니다.

Datadog에 대한 모든 인증은 기본 Private Action Runner에 의해 처리됩니다. 설치 중에 러너에 로컬로 구성된 허용 목록이 설정되어 필요한 액션만 수행할 수 있도록 제한됩니다. Datadog 내에서 액세스 제어를 구성하여 러너를 사용할 수 있는 사용자와 팀을 관리할 수도 있습니다. 자세한 내용은 [Private Action Runner에 대한 액세스 관리][16]를 참조하세요.

## 설치 {#installation}

### 1단계: Datadog 전제 조건 {#step-1-datadog-prerequisites}

1. 다음 방법 중 **하나**를 사용하여 VPC 내에서 Datadog API 엔드포인트에 대한 연결을 설정합니다.
   - 공용 인터넷으로의 송신(NAT 게이트웨이 등을 통해)
   - Private Link VPC 엔드포인트 또는 서비스를 통한 Datadog으로의 송신:
     - **AWS**: [VPC 엔드포인트 설정][3](US1, AP1, AP2에서 사용 가능)
     - **Azure**: [Private Link 서비스 설정][6](US3에서만 사용 가능). 이를 위해서는 Datadog Azure 계정의 승인이 필요합니다. 지침에 명시된 대로 Datadog 지원팀에 문의하세요.
     - **GCP**: [Private Service Connect 엔드포인트 설정][7](US5 및 EU1에서 사용 가능)
1. Datadog 서비스 계정을 만듭니다.
   1. [서비스 계정][8] 페이지로 이동합니다.
   1. **New Service Account**를 클릭합니다.
   1. 서비스 계정의 이름과 이메일 주소를 입력합니다.
   1. **Assign Roles**에서 **Datadog Standard Role**을 선택합니다. 또는 `Connections Resolve` 권한이 있는 사용자 지정 역할을 선택합니다.
   1. **Create Service Account**를 클릭합니다.
1. Datadog 계정에 [Remote Configuration][17]이 활성화되어 있는지 확인합니다.

### 2단계: Databricks 전제 조건 {#step-2-databricks-prerequisites}

{{< tabs >}}

{{% tab "Databricks 관리형 서비스 주체" %}}

1. Databricks 서비스 주체를 생성합니다([Databricks 설명서][9]).
   1. 작업 영역 관리자로 Databricks 작업 영역에 로그인합니다.
   1. 상단 표시줄에서 사용자 이름을 클릭하고 **Settings**를 선택합니다.
   1. **Identity and access** 탭을 클릭합니다.
   1. **Service principals** 옆의 **Manage**를 클릭합니다.
   1. **Add service principal**을 클릭한 다음 **Add new**를 클릭하고 이름을 입력합니다.
      - 또는 다른 작업 영역의 서비스 주체를 재사용하려면 기존 서비스 주체를 선택하고 다음 단계를 건너뜁니다.
   1. **Add**를 클릭합니다.
1. Databricks 서비스 주체에 대한 시크릿을 생성합니다([Databricks 설명서][10]).
   1. 위에서 생성한 서비스 주체를 선택합니다.
   1. **Secrets** 탭을 클릭한 다음 **Generate secret**을 클릭합니다.
   1. 시크릿의 수명을 일 단위로 설정합니다(최대 730일).
   1. **Generate**를 클릭합니다.
   1. 다음 방법 중**하나**를 사용하여 Databricks 자격 증명을 러너에서 사용할 수 있도록 설정합니다.
      - **클라우드 시크릿 스토리지**(AWS Secrets Manager, AWS Parameter Store, Azure Key Vault 또는 Google Cloud Secret Manager): 자격 증명을 JSON Blob으로 저장합니다.
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>"}
        ```
        Make note of the secret path (AWS ARN, AKV URL, or Google Cloud resource name). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. 서비스 주체에 대한 작업 영역 액세스 및 권한을 프로비저닝합니다. 자세한 내용은 [권한][11]을 참조하세요.
   1. 서비스 주체에 **Workspace Admin** 권한을 부여합니다. 이렇게 하면 Datadog이 초기화 스크립트 설치 및 업데이트를 자동으로 관리할 수 있습니다. 또는 작업, 클러스터 및 쿼리 모니터링을 위해 더 [세분화된 권한][11]을 할당합니다.
      1. **Identity and access** 탭을 클릭합니다.
      1. **Groups** 옆의 **Manage**를 클릭합니다.
      1. **관리자** 그룹을 선택합니다.
      1. **Add members**를 클릭하고 위에서 추가한 서비스 주체를 선택합니다.
      1. **Add**를 클릭합니다.
   1. Databricks 비용 데이터에 액세스하거나 Serverless 작업을 모니터링하려면 SQL 웨어하우스에서 서비스 주체에 `CAN USE` 권한을 부여하고 Unity Catalog의 [시스템 표][20]에 대한 읽기 액세스 권한을 부여합니다. 자세한 내용은 [권한][11]를 참조하세요.
   1. Serverless 작업을 모니터링하거나 SQL 웨어하우스 및 쿼리 모니터링을 사용하려면, 서비스 주체를 `databricks_pii_access` 계정 수준 그룹에 추가합니다. Databricks는 이 그룹 외부의 주체에 대해 SQL 쿼리 텍스트를 마스킹합니다. 자세한 내용은 [쿼리 텍스트 액세스][21]를 참조하세요.

[9]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals?language=Workspace%C2%A0admin%C2%A0settings#-add-service-principals-to-your-account
[10]: https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m#-step-1-create-an-oauth-secret
[11]: /ko/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ko/data_observability/jobs_monitoring/databricks/#query-text-access

{{% /tab %}}

{{% tab "Microsoft Entra ID 관리형 서비스 주체" %}}

1. 서비스 주체에 대한 Microsoft Entra ID 애플리케이션을 등록합니다([Microsoft Entra 설명서][22]).
   1. [Microsoft Entra 관리 센터][23]에 최소 Cloud Application Administrator 권한으로 로그인합니다.
   1. **Entra ID > App registrations**로 이동한 다음 **New registration**을 클릭합니다.
   1. 이름을 입력하고 **Register**를 클릭합니다.
   1. 애플리케이션의 **Overview** 페이지에서 **Application(클라이언트) ID** 및 **Directory(테넌트) ID**를 기록해 둡니다.
1. 애플리케이션에 대한 클라이언트 시크릿을 생성합니다([Microsoft Entra 설명서][22]).
   1. 애플리케이션 페이지에서 **Certificates & secrets**를 클릭합니다.
   1. **Client secrets** 탭을 클릭한 다음 **New client secret**을 클릭합니다.
   1. 설명과 수명 기간을 입력한 다음 **Add**를 클릭합니다.
   1. 생성된 시크릿 값을 복사합니다. 이 값은 한 번만 표시됩니다.
   1. 다음 방법 중**하나**를 사용하여 Databricks 자격 증명을 러너에서 사용할 수 있도록 설정합니다.
      - **클라우드 시크릿 스토리지**(AWS Secrets Manager, AWS Parameter Store 또는 Azure Key Vault): 자격 증명을 JSON Blob으로 저장합니다.
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>", "tenant_id": "<TENANT_ID>"}
        ```
        Make note of the secret path (AWS ARN or AKV URL). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID`, `DATABRICKS_CLIENT_SECRET`, and `DATABRICKS_AZURE_TENANT_ID` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. 애플리케이션을 Microsoft Entra ID 관리형 서비스 주체로 Databricks에 추가합니다([Databricks 설명서][24]).
   1. 작업 영역 관리자로 Databricks 작업 영역에 로그인합니다.
   1. 상단 표시줄에서 사용자 이름을 클릭하고 **Settings**를 선택합니다.
   1. **Identity and access** 탭을 클릭합니다.
   1. **Service principals** 옆의 **Manage**를 클릭합니다.
   1. **Add service principal**을 클릭한 다음 **Add new**를 클릭합니다.
   1. **Microsoft Entra ID managed**를 선택한 다음, 위에서 기록해 둔 **Application(클라이언트) ID**를 붙여넣습니다.
   1. 이름을 입력하고 **Add**를 클릭합니다.
1. 서비스 주체에 대한 작업 영역 액세스 및 권한을 프로비저닝합니다. 자세한 내용은 [권한][11]을 참조하세요.
   1. 서비스 주체에 **Workspace Admin** 권한을 부여합니다. 이렇게 하면 Datadog이 초기화 스크립트 설치 및 업데이트를 자동으로 관리할 수 있습니다. 또는 작업, 클러스터 및 쿼리 모니터링을 위해 더 [세분화된 권한][11]을 할당합니다.
      1. **Identity and access** 탭을 클릭합니다.
      1. **Groups** 옆의 **Manage**를 클릭합니다.
      1. **관리자** 그룹을 선택합니다.
      1. **Add members**를 클릭하고 위에서 추가한 서비스 주체를 선택합니다.
      1. **Add**를 클릭합니다.
   1. Databricks 비용 데이터에 액세스하거나 Serverless 작업을 모니터링하려면 SQL 웨어하우스에서 서비스 주체에 `CAN USE` 권한을 부여하고 Unity Catalog의 [시스템 표][20]에 대한 읽기 액세스 권한을 부여합니다. 자세한 내용은 [권한][11]를 참조하세요.
   1. Serverless 작업을 모니터링하거나 SQL 웨어하우스 및 쿼리 모니터링을 사용하려면, 서비스 주체를 `databricks_pii_access` 계정 수준 그룹에 추가합니다. Databricks는 이 그룹 외부의 주체에 대해 SQL 쿼리 텍스트를 마스킹합니다. 자세한 내용은 [쿼리 텍스트 액세스][21]를 참조하세요.

[11]: /ko/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ko/data_observability/jobs_monitoring/databricks/#query-text-access
[22]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal
[23]: https://entra.microsoft.com
[24]: https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/manage-service-principals#add-service-principals-to-your-account

{{% /tab %}}

{{< /tabs >}}

### 3단계: Private Action Runner 설정 {#step-3-set-up-the-private-action-runner}

다음 옵션 중 **하나**를 사용하여 Private Action Runner를 설정합니다.

{{< tabs >}}

{{% tab "Helm(Kubernetes)" %}}

1. Kubernetes 클러스터에 Private Action Runner를 설치합니다([추가 문서][1], [Helm 차트][2]).
   1. [Private Action Runner 설정][3] 페이지로 이동합니다.
   1. **Script** 옵션을 선택한 다음 **Next**를 클릭합니다.
   1. **Kubernetes** 아래의 지침을 따릅니다.
   1. Private Action Runner가 하단에 "successfully installed."로 표시되어야 합니다.
1. 기존 `values.yaml`을 업데이트합니다([Helm 차트 값][4] 참조).
   1. `image.repository`를 `gcr.io/datadoghq/dd-data-observability-par`로 설정합니다.
   1. `image.tag`를 `1.21.0-3`으로 설정합니다.
1. 다음 방법 중 하나를 사용하여 Private Action Runner에서 자격 증명을 구성합니다.
    - 러너에서 직접 `DATABRICKS_CLIENT_ID` 및 `DATABRICKS_CLIENT_SECRET` 환경 변수를 설정합니다. Microsoft Entra ID 관리형 서비스 주체를 사용하는 경우 `DATABRICKS_AZURE_TENANT_ID`도 설정합니다. 통합 타일의 "Secret Path"는 비워 두세요.
    - 클라우드 시크릿 스토리지를 사용합니다. [2단계](#step-2-databrick-prerequisites)에서 생성된 시크릿을 읽을 수 있는 권한이 있는 ID가 포드에 할당되었는지 확인하고([Azure Workload Identity][5], [AWS IAM Role][6] 또는 [GKE Workload Identity][7]), `DATABRICKS_SECRET_PATH` 환경 변수를 통해 또는 통합 타일의 'Secret Path' 필드에 제공하여 시크릿 경로를 지정하세요.
1. 이러한 변경 사항을 적용하려면 배포를 다시 시작합니다.

[1]: https://docs.datadoghq.com/ko/actions/private_actions/set_up_standalone/?tab=kuberneteshelm#install-the-runner
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[3]: https://app.datadoghq.com/actions/private-action-runners/new
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[5]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster?tabs=new-cluster
[6]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-association.html
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity

{{% /tab %}}

{{% tab "Docker(VM/EC2)" %}}

1. Docker를 사용하여 Private Action Runner를 설치합니다([추가 문서][1]).
   1. [Private Action Runner 설정][2] 페이지로 이동합니다.
   1. **Script** 옵션을 선택한 다음 **Next**를 클릭합니다.
   1. **Docker**의 지침을 따릅니다.

      **중요**: `gcr.io/datadoghq/private-action-runner:v1.21.0-large`를 `gcr.io/datadoghq/dd-data-observability-par:1.21.0-3`으로 바꿉니다.

   1. Private Action Runner가 하단에 "successfully installed."로 표시되어야 합니다.
1. 다음 방법 중 하나를 사용하여 Private Action Runner에서 자격 증명을 구성합니다.
    - 러너에서 직접 `DATABRICKS_CLIENT_ID` 및 `DATABRICKS_CLIENT_SECRET` 환경 변수를 설정합니다. Microsoft Entra ID 관리형 서비스 주체를 사용하는 경우 `DATABRICKS_AZURE_TENANT_ID`도 설정합니다. 통합 타일의 "Secret Path"는 비워 두세요.
    - 클라우드 시크릿 스토리지를 사용합니다. [2단계](#step-2-databricks-prerequisites)에서 생성된 시크릿을 읽을 수 있는 권한이 있는 ID가 인스턴스에 할당되었는지 확인하고([Azure Managed Identity][5], [AWS IAM Role][6] 또는 [GCE Service Account][7]), `DATABRICKS_SECRET_PATH` 환경 변수를 통해 또는 통합 타일의 'Secret Path' 필드에 제공하여 시크릿 경로를 지정하세요.

1. 변경 사항을 적용하려면 Docker 컨테이너를 다시 시작합니다.

[1]: https://docs.datadoghq.com/ko/actions/private_actions/set_up_standalone/?tab=docker#install-the-runner
[2]: https://app.datadoghq.com/actions/private-action-runners/new
[3]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[5]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[7]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances

{{% /tab %}}

{{< /tabs >}}

**참고:** `gcr.io`에 액세스할 수 없는 경우 다른 미러를 사용할 수 있습니다.
- `docker.io/datadog/dd-data-observability-par`
- `public.ecr.aws/datadog/dd-data-observability-par`
- `datadoghq.azurecr.io/dd-data-observability-par`
- `asia-docker.pkg.dev/datadoghq/asia.gcr.io/dd-data-observability-par`

### 4단계: Datadog 구성 {#step-4-configure-datadog}

1. Private Action Runner에 연결을 추가합니다.
   1. [Private Action Runner][12] 페이지로 이동합니다.
   1. 설치된 러너를 선택합니다.
   1. **Finish Setup**을 선택합니다.
   1. **Script**를 선택합니다.
   1. **Path to File**을 `/etc/data-observability/config/script.yaml`로 설정합니다.
   1. **Next, Confirm Access**를 선택합니다.
   1. [1단계](#step-1-datadog-prerequisites)에서 생성한 서비스 계정을 **Resolver** 액세스 권한과 함께 추가합니다. 이 단계는 필수입니다. 러너는 이 서비스 계정을 사용하여 Datadog 요청을 인증하며, 이 계정이 없으면 통합이 작동하지 않습니다.
   1. **Create and Test**를 선택합니다. 테스트 결과에 오류가 반환되지 않는지 확인합니다.
1. Databricks 통합을 설정합니다.
   1. [Databricks 통합][13] 타일로 이동합니다.
   1. **Credentials**에서 **Private Action Runner**를 선택합니다.
      1. **Connection**에서 이전 단계에서 생성한 연결을 선택합니다.
      1. **서비스 계정** 아래에서 [1단계](#step-1-datadog-prerequisites)에서 생성한 서비스 계정을 선택합니다.
      1. **Secret Path** 아래에 [2단계](#step-2-databricks-prerequisites)의 시크릿 경로를 입력합니다. `DATABRICKS_CLIENT_ID` 및 `DATABRICKS_CLIENT_SECRET` 환경 변수를 사용하여 자격 증명을 설정했거나 러너에서 `DATABRICKS_SECRET_PATH` 환경 변수를 사용하여 경로를 설정한 경우 이 필드를 비워 두세요.
   1. [Datadog-Databricks 통합 구성][14]에 설명된 대로 나머지 통합 설정을 완료합니다.
      1. **Workspace Name**, **Workspace URL** 및 **System Tables SQL Warehouse ID**를 입력합니다.
      1. 관심 있는 제품을 활성화합니다.
         **참고:** 현재 Private Link를 통한 모델 서빙은 지원되지 않습니다.
      1. 만약 **Jobs Monitoring**을 활성화한 경우, Datadog Agent 초기화 스크립트를 배포하여 클래식 컴퓨팅에서 작업 및 클러스터를 모니터링합니다. [Datadog Agent 설치][19]의 지침에 따라 초기화 스크립트를 설정한 다음, 실행 중인 클러스터를 다시 시작하여 변경 사항을 적용하세요.
   1. **Save Databricks Workspace**를 클릭합니다.
   1. 저장 시 오류가 없는지 확인합니다.

## 유효성 검사 {#validation}

설정을 완료하면 [Data Observability: Jobs Monitoring][15]에 작업 및 클러스터 정보가 곧 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[2]: https://docs.datadoghq.com/ko/actions/private_actions/
[3]: https://docs.datadoghq.com/ko/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us
[4]: https://docs.datadoghq.com/ko/actions/private_actions/#private-action-runner
[5]: https://docs.datadoghq.com/ko/actions/private_actions/run_script/
[6]: https://docs.datadoghq.com/ko/agent/guide/azure-private-link/?site=us3
[7]: https://docs.datadoghq.com/ko/agent/guide/gcp-private-service-connect/?site=us5
[8]: https://app.datadoghq.com/organization-settings/service-accounts
[12]: https://app.datadoghq.com/actions/private-action-runners/
[13]: https://app.datadoghq.com/integrations?search=databr&configPage=new&integrationId=databricks
[14]: /ko/data_observability/jobs_monitoring/databricks/#configure-the-datadog-databricks-integration
[15]: https://app.datadoghq.com/data-jobs/
[16]: https://docs.datadoghq.com/ko/actions/private_actions/enroll_runner/#manage-access-to-owned-runners
[17]: https://app.datadoghq.com/organization-settings/remote-config
[19]: /ko/data_observability/jobs_monitoring/databricks/#install-the-datadog-agent