---
description: Google Cloud 환경에 대한 포괄적인 모니터링을 설정하세요. 서비스 계정을 구성하고, 메트릭 수집을 사용 설정하며,
  로그 전달 및 Agent 설치를 살펴보세요.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
  tag: 설명서
  text: Google Cloud 통합
- link: https://docs.datadoghq.com/account_management/billing/google_cloud/
  tag: 가이드
  text: Google Cloud 통합 청구
- link: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
  tag: 가이드
  text: Cloud 메트릭 지연
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 가이드
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
- link: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  tag: 블로그
  text: 신규 GKE 대시보드 및 메트릭으로 환경에 관한 보다 심층적인 가시성 제공하기
- link: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
  tag: 블로그
  text: Datadog에 비공개로 액세스하고 Google Cloud Private Service Connect 사용량 모니터링하기
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: 블로그
  text: Datadog으로 BigQuery 모니터링하기
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: 블로그
  text: Datadog을 통해 엔지니어가 Google Cloud 비용을 직접 관리하도록 지원하기
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Google Cloud Run 서비스에서 트레이스, 로그, 커스텀 메트릭 수집하기
- link: https://learn.datadoghq.com/courses/getting-started-gcp
  tag: 학습 센터
  text: Datadog을 활용한 Google Cloud 관측 가능성 시작하기
title: Google Cloud 시작하기
---
## 개요 {#overview}

이 가이드를 사용하여 Google Cloud 환경 모니터링을 시작하세요. 이 접근 방식은 여러 프로젝트가 있는 Google Cloud 환경의 설정을 간소화하여 모니터링 범위를 극대화합니다.

## Google Cloud 데이터가 Datadog에 도달하는 방식 {#how-google-cloud-data-reaches-datadog}

{{% google-cloud-data-collection-paths %}}

## 설정 {#setup}

### 전제 조건 {#prerequisites}
1) [Datadog 계정][1]을 생성합니다.
2) Google Cloud 프로젝트 중 하나에서 [서비스 계정][2]을 설정합니다.
3) 다음 Google Cloud 필수 구성 요소를 확인하세요.

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● 조직에서 도메인별로 ID를 제한하는 경우 Datadog의 고객 ID `C0147pk0i`를 정책의 허용 값으로 추가해야 합니다.
{{% /site-region %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Google Cloud 통합을 사용하려면 모니터링하려는 **각 프로젝트**에 대해 아래 API를 사용 설정해야 합니다.

<div class="alert alert-danger">모니터링 중인 프로젝트가 다른 여러 프로젝트에서 메트릭을 가져오는 <a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">범위 지정 프로젝트</a>로 구성되지 않았는지 확인합니다.</div>

[Cloud Monitoring API][3]
: Datadog이 Google Cloud 메트릭 데이터를 쿼리할 수 있도록 허용합니다.

[Compute Engine API][4]
: Datadog이 컴퓨팅 인스턴스 데이터를 검색할 수 있습니다.

[Cloud Asset API][5]
: Datadog이 Google Cloud 리소스를 요청하고 관련 라벨을 메트릭에 태그로 연결할 수 있습니다.

[Cloud Resource Manager API][6]
: Datadog이 메트릭에 올바른 리소스와 태그를 추가할 수 있습니다.

[IAM API][7]
: Datadog이 Google Cloud에서 인증할 수 있습니다.

[Cloud Billing API][8]
: 개발자가 Google Cloud Platform 프로젝트의 청구를 프로그래밍 방식으로 관리할 수 있도록 허용합니다. 자세한 내용은 [Cloud Cost Management(CCM)](#cloud-cost-management-ccm) 섹션을 참조하세요.

<div class="alert alert-info">이러한 API가 활성화되어 있는지 확인하려면 <a href="https://console.cloud.google.com/apis/dashboard">Enabled APIs & Services</a>로 이동하세요.</div>

### 메트릭 수집 {#metric-collection}

{{% google-cloud-collection-scope %}}

<div class="alert alert-info">Google Cloud 조직에서 <a href="https://cloud.google.com/vpc-service-controls/docs/overview">VPC Service Controls</a>를 사용하는 경우, Datadog 서비스 계정이 보호된 리소스에 액세스할 수 있도록 명시적으로 허용해야 합니다. 이러한 서비스 계정이 서비스 경계 내에서 허용되지 않으면 메트릭, 리소스 및 메타데이터 수집이 실패할 수 있습니다. 사이트 또는 리전의 서비스 계정 식별자에 대해서는 <a href="/help/">Datadog 지원팀</a>에 문의하세요.</div>

{{< tabs >}}

{{% tab "조직 수준" %}}

조직 내에서 향후 생성될 수 있는 모든 프로젝트를 포함하여 모든 프로젝트를 포괄적으로 다루려면 조직 수준 모니터링을 권장합니다.

**참고**: Google Cloud에서 설정을 완료하려면 [Google Cloud Identity][408] 사용자 계정에 원하는 범위에서 `Admin` 역할이 할당되어 있어야 합니다(예: `Organization Admin`).

{{% collapse-content title="1. 기본 프로젝트에서 Google Cloud 서비스 계정 생성" level="h4" %}}
1. [Google Cloud Platform 콘솔][401]을 엽니다.
2. {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}Service Accounts{{< /ui >}}로 이동합니다.
3. 상단에서 {{< ui >}}Create service account{{< /ui >}}를 클릭합니다.
4. 서비스 계정에 고유한 이름을 지정합니다.
5. {{< ui >}}Done{{< /ui >}}을 클릭하여 서비스 계정 생성을 완료합니다.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. 조직 또는 폴더 수준에서 서비스 계정 추가" level="h4" %}}
1. Google Cloud 콘솔에서 {{< ui >}}IAM{{< /ui >}} 페이지로 이동합니다.
2. 폴더 또는 조직을 선택합니다.
3. 리소스에 아직 다른 역할이 없는 주체에게 역할을 부여하려면 {{< ui >}}Grant Access{{< /ui >}}를 클릭한 다음 이전에 만든 서비스 계정의 이메일을 입력합니다.
4. 서비스 계정의 이메일 주소를 입력합니다.
5. 다음 역할을 할당합니다.
   - [컴퓨팅 뷰어][402]는 Compute Engine 리소스를 가져오고 나열할 수 있는 **읽기 전용** 액세스 권한을 제공합니다.
   - [모니터링 뷰어][403]는 Google Cloud 환경에서 사용 가능한 모니터링 데이터에 대한 **읽기 전용** 액세스 권한을 제공합니다.
   - [클라우드 자산 뷰어][404]는 클라우드 자산 메타데이터에 대한 **읽기 전용** 액세스 권한을 제공합니다.
   - [브라우저][405]는 프로젝트 계층 구조를 탐색할 수 있는 **읽기 전용** 액세스 권한을 제공합니다.
   - [Service Usage Consumer][406](**선택 사항**, 다중 프로젝트 환경용)는 [프로젝트별 비용 및 API 할당량 귀속](#enable-per-project-cost-and-api-quota-attribution)을 제공합니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: `Browser` 역할은 서비스 계정의 기본 프로젝트에만 필요합니다. 다른 프로젝트에는 나열된 다른 역할만 필요합니다.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. 서비스 계정에 Datadog 주체를 추가합니다." level="h4" %}}
**참고**: 이전에 공유 Datadog 주체를 사용하여 액세스를 구성한 경우 이 단계를 완료한 후 해당 주체에 대한 권한을 취소할 수 있습니다.

1. Datadog에서 {{< ui >}}Integrations{{< /ui >}} > [{{< ui >}}Google Cloud Platform{{< /ui >}}][407]로 이동합니다.
2. {{< ui >}}Add Google Cloud Account{{< /ui >}}를 클릭합니다.
설정된 프로젝트가 없는 경우 이 페이지로 자동 리디렉션됩니다.
3. Datadog 주체를 복사하여 다음 섹션에서 사용할 수 있도록 보관합니다.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog의 Google Cloud 통합 타일에서 새 Google Cloud 계정을 추가하기 위한 페이지" style="width:70%;">}}

**참고**: 섹션 4에서 사용할 수 있도록 이 창을 열어 둡니다.

4. [Google Cloud 콘솔][409]의 {{< ui >}}Service Accounts{{< /ui >}} 메뉴에서 섹션 1에서 생성한 서비스 계정을 찾습니다.
5. {{< ui >}}Permissions{{< /ui >}} 탭으로 이동하여 {{< ui >}}Grant Access{{< /ui >}}를 클릭합니다.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Service Accounts 아래의 Permissions 탭을 보여주는 Google Cloud 콘솔 인터페이스" style="width:70%;">}}

6. Datadog 주체를 {{< ui >}}New principals{{< /ui >}} 텍스트 상자에 붙여넣습니다.
7. {{< ui >}}Service Account Token Creator{{< /ui >}} 역할을 할당합니다.
8.  {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Datadog에서 통합 설정을 완료합니다." level="h4" %}}
1. Google Cloud 콘솔에서 {{< ui >}}Service Account{{< /ui >}} > {{< ui >}}Details{{< /ui >}} 탭으로 이동합니다. 이 페이지에서 이 Google 서비스 계정과 연결된 이메일을 찾습니다. 형식은 `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`입니다.
2. 이 이메일을 복사합니다.
3. Datadog의 통합 구성 타일로 돌아갑니다(이전 섹션에서 Datadog 주체를 복사했던 곳).
4. {{< ui >}}Add Service Account Email{{< /ui >}}에 복사한 이메일을 붙여넣습니다.
5. {{< ui >}}Verify and Save Account{{< /ui >}}를 클릭합니다.
{{% /collapse-content %}}

메트릭은 설정 후 약 **15분** 뒤에 Datadog에 나타납니다.

[408]: https://cloud.google.com/identity/docs/overview

{{% /tab %}}

{{% tab "프로젝트 수준 및 폴더 수준" %}}

{{% collapse-content title="Quick Start(권장)" level="h4" expanded=false id="quickstart-setup" %}}

### 전제 조건 {#prerequisites-1}

Quick Start 방법을 사용하려면 Datadog 사용자 역할에 API 및 애플리케이션 키를 생성할 수 있는 권한이 있어야 합니다. [Datadog 관리형 역할][202]을 사용하는 경우 {{< ui >}}Datadog Admin role{{< /ui >}}이 있어야 합니다. [사용자 지정 역할][203]을 사용하는 경우, 해당 역할에 최소한 `api_keys_write` 및 `user_app_keys` 권한이 있어야 합니다.

### 다음과 같은 경우 Quick Start 설정을 선택하세요. {#choose-quick-start-setup-if}

- Google Cloud 통합을 처음 설정하는 경우
- UI 기반 워크플로를 선호하고 필요한 모니터링 권한이 있는 서비스 계정을 생성하는 데 걸리는 시간을 최소화하려는 경우
- 스크립트나 CI/CD 파이프라인에서 설정 단계를 자동화하려는 경우

### 지침 {#instructions}

1. [Google Cloud 통합 페이지][200]에서 {{< ui >}}+ Add GCP Account{{< /ui >}}를 선택합니다.
2. {{< ui >}}Quick Start{{< /ui >}}를 클릭합니다.
3. 설정 스크립트 섹션에서 {{< ui >}}Copy{{< /ui >}}를 클릭합니다.<br>
   **참고**: Datadog은 이 스크립트를 [gcloud CLI][201]를 통해 로컬에서 실행하는 것을 권장하며, 이 방법이 더 빠를 수 있습니다. 이를 위해서는 Google Cloud 자격 증명을 로컬에서 사용할 수 있어야 하며, 컴퓨터에 gcloud CLI가 설치되어 있어야 합니다.
4. {{< ui >}}Open Google Cloud Shell{{< /ui >}}을 클릭하거나 [Google Cloud Shell][204]로 이동합니다.
5. 셸 프롬프트에 스크립트를 붙여넣고 실행합니다.
6. 모니터링할 폴더와 프로젝트를 선택합니다. 필요한 액세스 및 권한이 있는 프로젝트와 폴더만 볼 수 있습니다.
7. {{< ui >}}Provide Service Account Details{{< /ui >}}에서 다음을 수행합니다.
   1. 서비스 계정에 이름을 지정합니다.
   2. 서비스 계정을 포함할 프로젝트를 선택합니다.
8. {{< ui >}}Metric Collection{{< /ui >}}을 구성합니다(선택 사항).
   1. 예상되는 GCE 인스턴스 종료 및 자동 확장 이벤트에 대해 모니터링을 음소거하는 옵션을 비활성화할지 여부를 선택합니다.
   2. 생성된 서비스 계정과 연결된 메트릭에 태그를 적용할지 여부를 선택합니다.
   3. Google Cloud Monitoring 비용을 제어하기 위해 특정 Google Cloud 서비스에 대한 메트릭 수집을 비활성화할지 여부를 선택합니다.
   4. 메트릭 수집이 활성화된 Google Cloud 서비스에 대해 세분화된 메트릭 필터를 적용할지 여부를 선택합니다.
   5. Datadog 비용을 제어하기 위해 GCP 리소스 유형 `Cloud Run Revision`, `VM Instance` 또는 `Cloud Function`에 대한 태그별로 메트릭을 필터링할지 여부를 선택합니다.
   **참고**: `VM Instance` 필터링은 관련 `gcp.logging.*` 메트릭에 영향을 미치지 않으며, 해당 메트릭에 대한 요금에도 영향을 주지 않습니다.
9. {{< ui >}}Resource Collection{{< /ui >}}을 구성합니다(Google Cloud 환경 내 리소스의 속성 및 구성 정보, 선택 사항).
10. 수행될 변경 사항의 요약이 표시됩니다. 확인하면 스크립트는 다음을 수행합니다.
    - 필수 API를 활성화합니다.
    - 선택한 각 프로젝트 및 폴더를 모니터링하는 데 필요한 권한을 할당합니다.
    - Datadog에서 통합 설정을 완료합니다.

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /ko/account_management/rbac/permissions/#managed-roles
[203]: /ko/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### 다음과 같은 경우 Terraform 설정을 선택하세요. {#choose-terraform-setup-if}

- 코드형 인프라를 관리하고 Datadog Google Cloud 통합에 대한 버전 관리를 유지하려는 경우
- 재사용 가능한 공급자 블록으로 여러 폴더 또는 프로젝트를 일관되게 구성해야 하는 경우
- Terraform 관리 환경에 적합한 반복 가능하고 감사 가능한 배포 프로세스를 원하는 경우

### 지침 {#instructions-1}

1. [Google Cloud 통합 페이지][500]에서 {{< ui >}}+ Add GCP Account{{< /ui >}}를 선택합니다.
2. {{< ui >}}Terraform{{< /ui >}}을 선택합니다.
3. {{< ui >}}Provide GCP Resources{{< /ui >}} 아래에서 모니터링할 프로젝트 ID와 폴더 ID를 추가합니다.
4. 모니터링할 폴더와 프로젝트를 선택합니다.
5. {{< ui >}}Provide Service Account Details{{< /ui >}}에서 다음을 수행합니다.
   1. 서비스 계정에 이름을 지정합니다.
   2. 서비스 계정을 포함할 프로젝트를 선택합니다.
6. {{< ui >}}Metric Collection{{< /ui >}}을 구성합니다(선택 사항).
   1. 예상되는 GCE 인스턴스 종료 및 자동 확장 이벤트에 대해 모니터링을 음소거하는 옵션을 비활성화할지 여부를 선택합니다.
   2. 생성된 서비스 계정과 연결된 메트릭에 태그를 적용할지 여부를 선택합니다.
   3. Google Cloud Monitoring 비용을 제어하기 위해 특정 Google Cloud 서비스에 대한 메트릭 수집을 비활성화할지 여부를 선택합니다.
   4. 메트릭 수집이 활성화된 Google Cloud 서비스에 대해 세분화된 메트릭 필터를 적용할지 여부를 선택합니다.
   5. Datadog 비용을 제어하기 위해 GCP 리소스 유형 `Cloud Run Revision`, `VM Instance` 또는 `Cloud Function`에 대한 태그별로 메트릭을 필터링할지 여부를 선택합니다.
7. {{< ui >}}Resource Collection{{< /ui >}}을 구성합니다(Google Cloud 환경 내 리소스의 속성 및 구성 정보).
8. 제공된 {{< ui >}}Terraform Code{{< /ui >}}를 복사합니다.
9. 코드를 `.tf` 파일에 붙여넣고 {{< ui >}}Initialize and apply the Terraform{{< /ui >}} 명령을 실행합니다. 성공하면 명령은 다음을 수행합니다.
   - 필수 API를 활성화합니다.
   - 선택한 각 프로젝트 및 폴더를 모니터링하는 데 필요한 권한을 할당합니다.
   - Datadog에서 통합 설정을 완료합니다.

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="수동" level="h4" expanded=false id="manual-setup" %}}

### 다음과 같은 경우 수동 설정을 선택하세요. {#choose-manual-setup-if}

- 더 적은 수의 프로젝트나 폴더에 대해 수동으로 액세스를 설정해야 하는 경우
- GCP UI 내에서 권한 및 자격 증명 할당을 단계별로 더욱 세밀하게 제어하려는 경우

### 지침 {#instructions-2}

1. [Google Cloud 통합 페이지][600]에서 {{< ui >}}+ Add GCP Account{{< /ui >}}를 선택합니다.
2. {{< ui >}}Manual{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Datadog Principal{{< /ui >}} 값을 복사하고 {{< ui >}}Open the Google Console{{< /ui >}}을 클릭합니다.
4. 서비스 계정 생성:
   1. 서비스 계정을 설명하는 이름을 입력하고 {{< ui >}}Create and continue{{< /ui >}}를 클릭합니다.
   2. {{< ui >}}Permissions{{< /ui >}}에서 드롭다운을 통해 {{< ui >}}Service Account Token Creator{{< /ui >}} 역할을 검색하여 추가하고 {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
   3. {{< ui >}}Principals with access{{< /ui >}}에서 {{< ui >}}Datadog Principal{{< /ui >}} 값을 {{< ui >}}Service account users role{{< /ui >}} 필드에 붙여넣고 {{< ui >}}Done{{< /ui >}}을 클릭합니다.
5. {{< ui >}}Email{{< /ui >}} 열 아래에 있는 서비스 계정 링크를 클릭합니다.
6. {{< ui >}}Email{{< /ui >}} 값을 복사합니다.
7. Datadog에서 {{< ui >}}Add Service Account Email{{< /ui >}} 섹션에 서비스 계정 이메일을 붙여넣습니다.
8. {{< ui >}}Metric Collection{{< /ui >}}을 구성합니다(선택 사항).
   1. 예상되는 GCE 인스턴스 종료 및 자동 확장 이벤트에 대해 모니터링을 음소거하는 옵션을 비활성화할지 여부를 선택합니다.
   2. 생성된 서비스 계정과 연결된 메트릭에 태그를 적용할지 여부를 선택합니다.
   3. Google Cloud Monitoring 비용을 제어하기 위해 특정 Google Cloud 서비스에 대한 메트릭 수집을 비활성화할지 여부를 선택합니다.
   4. 메트릭 수집이 활성화된 Google Cloud 서비스에 대해 세분화된 메트릭 필터를 적용할지 여부를 선택합니다.
   5. Datadog 비용을 제어하기 위해 GCP 리소스 유형 `Cloud Run Revision`, `VM Instance` 또는 `Cloud Function`에 대한 태그별로 메트릭을 필터링할지 여부를 선택합니다.
9. {{< ui >}}Resource Collection{{< /ui >}}을 구성합니다(Google Cloud 환경 내 리소스의 속성 및 구성 정보, 선택 사항).
10. {{< ui >}}Verify and Save Account{{< /ui >}}를 클릭합니다.

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### 검증 {#validation}

메트릭을 조회하려면 왼쪽 메뉴에서 {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}}로 이동한 다음 `gcp`를 검색하세요.

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="GCP로 시작하는 메트릭으로 필터링된 Datadog의 메트릭 요약 페이지" style="width:100%;" >}}

### Google Cloud 통합 {#google-cloud-integrations}

Google Cloud 통합은 Google Cloud Monitoring API를 통해 프로젝트에서 사용 가능한 모든 [Google Cloud 메트릭][12]을 수집합니다. Datadog이 BigQuery와 같은 Google Cloud 계정에서 수집되는 데이터를 인식하면 통합이 자동으로 설치됩니다.

{{% collapse-content title="Datadog이 메트릭을 수집하는 Google Cloud 통합 확인" level="h4" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

여러 주요 서비스를 모니터링하는 방법을 자세히 알아보려면 아래에 링크된 블로그를 확인하세요.

{{% collapse-content title="통합 블로그" level="h4" %}}
[Cloud Armor][20]
: Google Cloud Armor는 DDoS 및 애플리케이션 공격으로부터 보호하는 네트워크 보안 서비스입니다.

[BigQuery][21]
: BigQuery는 비즈니스 데이터에서 유용한 인사이트를 제공하는 서버리스 멀티 클라우드 데이터 웨어하우스입니다.

[Cloud Run][22]
: Cloud Run은 Google Cloud의 확장 가능한 인프라에서 코드를 직접 실행할 수 있는 완전 관리형 플랫폼입니다.

[Cloud SQL][23]
: Cloud SQL은 MySQL, PostgreSQL 및 SQL Server를 지원하는 완전 관리형 관계형 데이터베이스 서비스입니다.

[Compute Engine][24]
: Compute Engine은 Google Cloud에서 가상 머신을 생성하고 실행할 수 있는 기능을 제공하는 컴퓨팅 및 호스팅 서비스입니다.

[Dataflow][25]
: Dataflow는 자동 확장 및 실시간 데이터 처리를 사용하는 완전 관리형 스트리밍 분석 서비스입니다.

[Eventarc][26]
: Eventarc는 이벤트 기반 아키텍처를 구축할 수 있도록 지원하는 완전 관리형 서비스입니다.

[Google Kubernetes Engine (GKE)][27]
: GKE는 완전 관리형 Kubernetes 서비스입니다.

[Private Service Connect][28]
: Private Service Connect를 사용하면 VPC 네트워크 내에서 관리형 Google 서비스에 비공개로 액세스할 수 있습니다.

[Security Command Center][29]
: Security Command Center는 코드, ID, 데이터에 대한 보안 태세 관리 및 위협 탐지 기능을 제공합니다.

[Vertex AI][30]
: Vertex AI는 완전 관리형 생성형 AI 개발 플랫폼입니다.
{{% /collapse-content %}}

### 메트릭 수집 필터 제한{#limit-metric-collection-filters}

메트릭을 수집할 서비스와 리소스를 선택할 수 있습니다. 이렇게 하면 사용자를 대신하여 수행되는 API 호출 수를 줄여 비용을 제어하는 데 도움이 될 수 있습니다.

{{% collapse-content title="Google Cloud 서비스 및 세분화된 메트릭 필터별 메트릭 수집 제한" level="h4" %}}

Datadog의 [Google Cloud 통합 페이지][11]에 있는 {{< ui >}}Metric Collection{{< /ui >}} 탭에서 제외할 메트릭 네임스페이스를 선택 해제합니다.

활성화된 서비스에 세분화된 메트릭 필터링을 적용하려면 해당 서비스를 클릭하고 `Add filters for gcp.<service>` 필드에 필터를 적용합니다.

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="Datadog Google Cloud 통합 페이지의 메트릭 수집 탭으로, AI Platform 서비스가 확장되어 gcp.ml 필드에 대한 필터 추가가 표시됩니다." style="width:80%;">}}

**필터 예시**:

`subscription.*` `topic.*`
: **`gcp.<service>.subscription.*`**또는**`gcp.<service>.topic.*`** 중 하나와 일치하는 메트릭으로 수집을 제한합니다.

`!*_cost` `!*_count`
: **`gcp.<service>.*_cost`**또는**`gcp.<service>.*_count`** 중 어느 것과도 일치하지 않는 메트릭으로 수집을 제한합니다.

`snapshot.*` `!*_by_region`
: **`gcp.<service>.snapshot.*`**과 일치하지만 ****`gcp.<service>.*_by_region`과는 일치하지 않는 메트릭으로 수집을 제한합니다.

{{% /collapse-content %}}

{{% collapse-content title="Google Cloud 리전 및 글로벌 리소스별 메트릭 수집 제한" level="h4" %}}

Datadog의 [Google Cloud 통합 페이지][11]에 있는 {{< ui >}}Metric Collection{{< /ui >}} 탭에서 메트릭 수집에서 제외할 리전을 선택 해제합니다.

체크박스에 리전 또는 위치 값이 표시되지 않으면 {{< ui >}}Additional Locations{{< /ui >}} 필드에 추가합니다. 필터는 Google Cloud에서 보고한 라벨 값과 정확히 일치하므로 리소스에 표시된 대로 정확하게 값을 입력합니다(예: `us-central`).

리전과 연결되지 않은 글로벌 메트릭도 사용 중지할 수 있습니다.

{{< img src="integrations/google_cloud_platform/metric_region_filtering.png" alt="Datadog Google Cloud 통합 페이지의 메트릭 수집 탭으로, Enable Global Metrics 옵션이 강조 표시되어 있고 일부 리전이 선택되어 있습니다. Additional Locations 옵션도 강조 표시되어 있으며 다중 리전 필터가 정의되어 있습니다." style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="호스트 또는 Cloud Run 인스턴스별로 메트릭 수집 제한" level="h4" %}}
1. Datadog으로 모니터링하려는 호스트 또는 Cloud Run 인스턴스에 태그(예: `datadog:true`)를 할당합니다.
2. Datadog의 [Google Cloud 통합 페이지][11]에 있는 {{< ui >}}Metric Collection{{< /ui >}} 탭에서 {{< ui >}}Limit Metric Collection Filters{{< /ui >}} 텍스트 상자에 태그를 입력합니다. 정의된 태그 중 하나와 일치하는 호스트만 Datadog으로 가져옵니다. 와일드카드(`?`는 단일 문자, `*`는 다중 문자)를 사용하여 여러 호스트와 일치시키거나 `!`를 사용하여 특정 호스트를 제외할 수 있습니다. 이 예시는 `c1*` 크기의 모든 인스턴스를 포함하지만 스테이징 호스트는 제외합니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

자세한 내용은 Google 문서의 [라벨 생성 및 관리][44]를 참조하세요.
{{% /collapse-content %}}

아래 예시에서는 라벨 `datadog:true`가 지정된 Google Cloud 호스트만 Datadog에서 모니터링됩니다.

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="Google Cloud 통합 타일에서 메트릭 수집을 제한하는 필드" style="width:100%;" >}}

#### 프로젝트별 비용 및 API 할당량 귀속 활성화 {#enable-per-project-cost-and-api-quota-attribution}

기본적으로 Google Cloud는 모니터링 API 호출 비용과 API 할당량 사용량을 이 통합을 위한 서비스 계정이 포함된 프로젝트에 귀속시킵니다. 여러 프로젝트가 있는 Google Cloud 환경의 모범 사례로, 모니터링 API 호출 비용과 API 할당량 사용량을 프로젝트별로 귀속하도록 설정하세요. 이 기능을 활성화하면 비용과 할당량 사용량이 서비스 계정이 포함된 프로젝트가 아닌 *쿼리되는* 프로젝트에 귀속됩니다. 이를 통해 각 프로젝트에서 발생하는 모니터링 비용을 파악할 수 있으며 API 속도 제한에 도달하는 것을 방지하는 데도 도움이 됩니다.

이 기능을 활성화하려면 다음 단계를 따르세요.
1. Datadog 서비스 계정에 원하는 범위(폴더 또는 조직)에서 [Service Usage Consumer][410] 역할이 있는지 확인합니다.
2. [Google Cloud 통합 페이지][411]의 {{< ui >}}Projects{{< /ui >}} 탭에서 {{< ui >}}Enable Per Project Quota{{< /ui >}} 토글을 클릭합니다.

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## 로그 수집 {#log-collection}

Google Cloud 환경에서 로그를 전달하면 조직이나 폴더에서 발생하는 리소스 및 활동을 실시간에 가깝게 모니터링할 수 있습니다. [로그 모니터][37]를 설정하여 문제에 대한 알림을 받거나, [Cloud SIEM][38]을 사용하여 위협을 탐지하거나, [Watchdog][39]을 활용하여 알려지지 않은 문제나 비정상적인 동작을 식별할 수 있습니다.

[Datadog Dataflow 템플릿][14]을 사용하여 로그 이벤트를 일괄 처리 및 압축한 후 [Google Cloud Dataflow][15]를 통해 Datadog으로 전달하세요. 이는 로그를 전달하는 가장 네트워크 효율적인 방법입니다. 전달할 로그를 지정하려면 Google Cloud의 [로깅 쿼리 언어][56]를 사용하여 포함 또는 제외 쿼리로 [Google Cloud 로깅 싱크][40]를 구성하세요. 로그 전달 설정 옵션(Terraform 포함) 및 지침은 [Google Cloud 로그 전달 설정 페이지][67]를 참조하세요.

<div class="alert alert-danger">Google Cloud Dataflow를 사용하려면 <b>Dataflow API</b>가 활성화되어 있어야 합니다. 자세한 내용은 Google Cloud 설명서의 <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>API 활성화</b></a>를 참조하세요.</div>

## Datadog Agent 활용 {#leveraging-the-datadog-agent}

Google Cloud 통합이 구성되면 Datadog은 자동으로 Google Cloud 메트릭 수집을 시작합니다. 하지만 Datadog Agent를 사용하여 인프라에 대한 더 심층적인 인사이트를 얻을 수 있습니다.

[Datadog Agent][31]는 인프라에서 [가장 세분화된 저지연 메트릭][32]을 제공하여 Google Cloud 호스트의 CPU, 메모리, 디스크 사용량 등에 대한 실시간 인사이트를 제공합니다.
Agent는 [GKE][33]를 포함한 모든 호스트에 설치할 수 있습니다.

또한 Agent는 광범위한 [통합][34]을 지원하여 호스트에서 실행 중인 특정 서비스 및 데이터베이스에 대한 가시성을 확장할 수 있습니다.

Agent를 통해 수집된 [트레이스][35]는 포괄적인 Application Performance Monitoring(APM)을 지원하여 엔드투엔드 서비스 성능을 파악하는 데 도움이 됩니다.

Agent를 통해 수집된 [로그][57]는 Google Cloud 리소스와 Google Cloud 환경에서 발생하는 활동에 대한 가시성을 제공합니다.

클라우드 인스턴스에 Agent를 설치하면 어떤 이점이 있는지 자세히 알아보려면 [클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유][36]를 참조하세요.

## 리소스 변경 수집 {#resource-changes-collection}

리소스 변경 수집을 통해 Google Cloud 환경의 인프라 변경 사항을 모니터링할 수 있습니다. Google의 Cloud Asset Inventory가 클라우드 리소스의 변경 사항을 감지하면 Cloud Pub/Sub 토픽 및 구독을 통해 Datadog의 [Event Management][62]로 이벤트가 전달됩니다. 이러한 이벤트를 사용하여 인프라의 위험한 변경 사항에 대해 사전에 알림을 받고 문제 해결에 활용하세요.

자세한 설정 지침은 Google Cloud 통합 문서의 [리소스 변경 수집 섹션][18]을 참조하세요.

## 관련 서비스 탐색 {#explore-related-services}

### Private Service Connect {#private-service-connect}

<div class="alert alert-info">Private Service Connect는 US5 및 EU Datadog 사이트에서만 사용할 수 있습니다.</div>

[Google Cloud Private Service Connect 통합][58]을 사용하여 Private Service Connect를 통한 연결, 전송된 데이터 및 삭제된 패킷을 시각화하세요. 이를 통해 생산자와 소비자 모두의 Private Service Connect 연결과 관련된 주요 메트릭을 확인할 수 있습니다.
[Private Service Connect(PSC)][59]는 Virtual Private Cloud(VPC)에서 [Google Cloud 서비스][60], [타사 파트너 서비스][61] 및 회사 소유 애플리케이션에 직접 액세스할 수 있게 해주는 Google Cloud 네트워킹 제품입니다.

자세한 내용은 Datadog 블로그의 [Datadog에 비공개로 액세스하고 Google Cloud Private Service Connect 사용량 모니터링하기][28]를 참조하세요.

### Google Cloud Run {#google-cloud-run}

[Google Cloud Run 통합][42]을 사용하여 메트릭 및 감사 로그와 같은 Cloud Run 컨테이너에 대한 자세한 정보를 조회하세요.

### Cloud Cost Management(CCM) {#cloud-cost-management-ccm}

Datadog의 [Google Cloud Cost Management][45]는 엔지니어링 팀과 재무 팀이 인프라 변경이 비용에 미치는 영향을 이해하고, 조직 전체에 비용을 배분하며, 잠재적인 개선 사항을 식별할 수 있도록 지원합니다.

### Cloud SIEM {#cloud-siem}

Cloud SIEM은 기본 제공 통합 및 규칙을 사용하여 운영 및 보안 로그를 실시간으로 분석하고 위협을 감지 및 조사합니다.
이 기능을 사용하려면 [Cloud SIEM 시작하기][46]를 참조하세요.

[Google Cloud Security Command Center][47]의 보안 탐지 결과를 Cloud SIEM에서 조회하려면 {{< ui >}}Security Findings{{< /ui >}} 탭에서 {{< ui >}}Enable collection of security findings{{< /ui >}} 옵션을 전환하고 [Google Cloud Security Command Center 가이드][48]의 설정 지침을 따르세요.

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="Google Cloud 통합 타일의 보안 탐지 결과 탭" style="width:90%;" >}}

### Cloud Security {#cloud-security}

Datadog Cloud Security는 클라우드 인프라 전반에 걸쳐 실시간 위협 감지 및 지속적인 구성 감사를 제공합니다.
시작하려면 [Cloud Security 설정 가이드][49]를 참조하세요.

Cloud Security를 설정한 후 {{< ui >}}Resource Collection{{< /ui >}} 탭에서 {{< ui >}}Enable Resource Collection{{< /ui >}} 옵션을 전환하여 [Resource Catalog][50] 및 Cloud Security를 위한 구성 데이터 수집을 시작하세요. 그런 다음 다음 지침에 따라 Google Cloud에서 [구성 오류 및 ID 위험(CIEM)][51]을 활성화하세요.

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="Google Cloud 통합 타일의 리소스 수집 탭" style="width:100%;" >}}

### 확장된 BigQuery 모니터링 {#expanded-bigquery-monitoring}

확장된 BigQuery 모니터링은 BigQuery 환경에 대한 세부적인 가시성을 제공합니다. 자세한 내용은 [BigQuery Data Observability][68] 문서를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[4]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[5]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[6]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[7]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[8]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[10]: https://console.cloud.google.com/
[11]: https://app.datadoghq.com/integrations/google-cloud-platform
[12]: https://cloud.google.com/monitoring/api/metrics_gcp
[13]: https://cloud.google.com/compute/docs/labeling-resources
[14]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[15]: https://cloud.google.com/dataflow
[18]: /ko/integrations/google_cloud_platform/#resource-changes-collection
[19]: /ko/help/
[20]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[21]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[22]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[23]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[24]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[25]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[26]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[27]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[28]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[29]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[30]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[31]: /ko/agent/
[32]: /ko/extend/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[33]: /ko/integrations/gke/?tab=standard
[34]: /ko/integrations/
[35]: /ko/tracing/
[36]: /ko/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[37]: /ko/monitors/types/log/
[38]: /ko/security/cloud_siem/
[39]: /ko/watchdog/
[40]: https://cloud.google.com/logging/docs/routing/overview#sinks
[41]: /ko/integrations/google_cloud_platform/#setup
[42]: /ko/integrations/google_cloud_run/
[43]: /ko/integrations/google_cloud_run/#log-collection
[44]: /ko/cloud_cost_management/
[45]: /ko/cloud_cost_management/setup/google_cloud/
[46]: /ko/getting_started/cloud_siem/
[47]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[48]: /ko/integrations/google_cloud_security_command_center/#installation
[49]: /ko/security/cloud_security_management/setup/
[50]: /ko/infrastructure/resource_catalog/
[51]: /ko/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[52]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[53]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[54]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[55]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[56]: https://cloud.google.com/logging/docs/view/logging-query-language
[57]: /ko/logs/
[58]: /ko/integrations/google_cloud_private_service_connect/
[59]: https://cloud.google.com/vpc/docs/private-service-connect
[60]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[61]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[62]: https://app.datadoghq.com/event/overview
[63]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/ko/logs/guide/google-cloud-log-forwarding
[68]: https://docs.datadoghq.com/ko/data_observability/quality_monitoring/data_warehouses/bigquery/