---
aliases:
- /ko/integrations/google_cloud_platform
app_id: google-cloud-platform
categories:
- cloud
- google cloud
- iot
- log collection
- network
custom_kind: integration
description: Google Cloud Platform은 여러 웹 서비스가 결합된 클라우드 컴퓨팅 플랫폼입니다.
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: 블로그
  text: Datadog으로 Google Cloud 환경의 컴플라이언스와 보안 상태를 개선하세요
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 Google Cloud Vertex AI 모니터링
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: 블로그
  text: Datadog으로 Dataflow 파이프라인 모니터링
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  tag: 기타
  text: Google Cloud Platform
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: 블로그
  text: Datadog으로 BigQuery 모니터링
- link: https://www.datadoghq.com/blog/recent-changes-tab/
  tag: 블로그
  text: Resource Catalog의 Recent Changes를 통해 인프라 변경 문제를 빠르게 해결
media: []
title: Google Cloud Platform
---
## 개요

이 가이드를 참고하여 Google Cloud 환경 모니터링을 시작하세요. 여러 프로젝트가 있는 Google Cloud 환경에서도 간단하게 설정하여 모니터링 범위를 최대한 확보할 수 있습니다.

{{% collapse-content title="Google Cloud 통합 전체 목록 보기" level="h4" %}}

<div class="alert alert-warning">
Datadog의 Google Cloud 통합은 <a href="https://cloud.google.com/monitoring/api/metrics_gcp">모든 Google Cloud 메트릭</a>을 수집합니다. Datadog은 연관된 모든 통합 정보를 지속적으로 업데이트하지만, 통합 목록이 최신 클라우드 서비스 메트릭 및 서비스보다 뒤처질 수 있습니다.

특정 Google Cloud 서비스용 통합을 찾을 수 없다면 <a href="https://www.datadoghq.com/support/">Datadog 지원팀</a>에 문의하세요.

</div>

| 통합                         | 설명                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine](https://docs.datadoghq.com/integrations/google-app-engine/)                     | 확장 가능한 애플리케이션을 구축하기 위한 PaaS(Platform as a Service)                           |
| [BigQuery](https://docs.datadoghq.com/integrations/google-cloud-bigquery/)                       | 엔터프라이즈 데이터 웨어하우스                                                             |
| [Bigtable](https://docs.datadoghq.com/integrations/google-cloud-bigtable/)                       | NoSQL Big Data 데이터베이스 서비스                                                       |
| [Cloud SQL](https://docs.datadoghq.com/integrations/google-cloudsql/)                      | MySQL 데이터베이스 서비스                                                                |
| [Cloud APIs](https://docs.datadoghq.com/integrations/google-cloud-apis/)                     | 모든 Google Cloud Platform 서비스를 위한 프로그래밍 방식 인터페이스                        |
| [Cloud Armor](https://docs.datadoghq.com/integrations/google-cloud-armor/)                   | 서비스 거부 및 웹 공격으로부터 보호하는 네트워크 보안 서비스    |
| [Cloud Composer](https://docs.datadoghq.com/integrations/google-cloud-composer/)                 | 완전 관리형 워크플로 오케스트레이션 서비스                                        |
| [Cloud Dataproc](https://docs.datadoghq.com/integrations/google-cloud-dataproc/)                 | Apache Spark 및 Apache Hadoop 클러스터를 실행하기 위한 클라우드 서비스                   |
| [Cloud Dataflow](https://docs.datadoghq.com/integrations/google-cloud-dataflow/)                | 스트림 및 배치 모드에서 데이터를 변환하고 강화하기 위한 완전 관리형 서비스 |
| [Cloud Filestore](https://docs.datadoghq.com/integrations/google-cloud-filestore/)                | 고성능, 완전 관리형 파일 스토리지                                          |
| [Cloud Firestore](https://docs.datadoghq.com/integrations/google-cloud-firestore/)                | 모바일, 웹, 서버 개발을 위한 유연하고 확장 가능한 데이터베이스                 |
| [Cloud Interconnect](https://docs.datadoghq.com/integrations/google-cloud-interconnect/)            | 하이브리드 연결                                                                   |
| [Cloud IoT](https://docs.datadoghq.com/integrations/google-cloud-iot/)                     | 안전한 디바이스 연결 및 관리                                               |
| [Cloud Load Balancing](https://docs.datadoghq.com/integrations/google-cloud-loadbalancing/)          | 부하가 분산된 컴퓨팅 리소스 배포                                            |
| [Cloud Logging](https://docs.datadoghq.com/integrations/google-stackdriver-logging/)                 | 실시간 로그 관리 및 분석                                                 |
| [Cloud Memorystore for Redis](https://docs.datadoghq.com/integrations/google-cloud-redis/)   | 완전 관리형 인메모리 데이터 저장소 서비스                                          |
| [Cloud Router](https://docs.datadoghq.com/integrations/google-cloud-router/)                  | BGP를 사용하여 VPC와 온프레미스 네트워크 간에 경로를 교환                |
| [Cloud Run](https://docs.datadoghq.com/integrations/google-cloud-run/)                     | HTTP를 통해 스테이트리스 컨테이너를 실행하는 관리형 컴퓨팅 플랫폼                  |
| [Cloud Security Command Center](https://docs.datadoghq.com/integrations/google-cloud-security-command-center/) | Security Command Center는 위협 보고 서비스입니다                                |
| [Cloud Tasks](https://docs.datadoghq.com/integrations/google-cloud-tasks/)                   | 분산된 작업 대기열                                                               |
| [Cloud TPU](https://docs.datadoghq.com/integrations/google-cloud-tpu/)                     | 머신 러닝 모델 학습 및 실행                                                 |
| [Compute Engine](https://docs.datadoghq.com/integrations/google-compute-engine/)                | 고성능 가상 머신                                                     |
| [Container Engine](https://docs.datadoghq.com/integrations/google-container-engine/)              | Google이 관리하는 Kubernetes                                                         |
| [Datastore](https://docs.datadoghq.com/integrations/google-cloud-datastore/)                     | NoSQL 데이터베이스                                                                        |
| [Firebase](https://docs.datadoghq.com/integrations/google-cloud-firebase/)                      | 애플리케이션 개발을 위한 모바일 플랫폼                                           |
| [Functions](https://docs.datadoghq.com/integrations/google-cloud-functions/)                     | 이벤트 기반 마이크로서비스 구축을 위한 서버리스 플랫폼                            |
| [Kubernetes Engine](https://docs.datadoghq.com/integrations/google-kubernetes-engine/)             | 클러스터 관리자 및 오케스트레이션 시스템                                              |
| [Machine Learning](https://docs.datadoghq.com/integrations/google-cloud-ml/)              | 머신 러닝 서비스                                                             |
| [Private Service Connect](https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/)       | 프라이빗 VPC 연결로 관리형 서비스에 액세스                                  |
| [Pub/Sub](https://docs.datadoghq.com/integrations/google-cloud-pubsub/)                       | 실시간 메시징 서비스                                                           |
| [Spanner](https://docs.datadoghq.com/integrations/google-cloud-spanner/)                       | 수평적으로 확장 가능하고 전 세계적으로 일관된 관계형 데이터베이스 서비스               |
| [Storage](https://docs.datadoghq.com/integrations/google-cloud-storage/)                       | 통합 객체 스토리지                                                                |
| [Vertex AI](https://docs.datadoghq.com/integrations/google-cloud-vertex-ai/)                     | 사용자 지정 머신러닝(ML) 모델을 구축, 학습 및 배포                          |
| [VPN](https://docs.datadoghq.com/integrations/google-cloud-vpn/)                           | 관리형 네트워크 기능                                                         |

{{% /collapse-content %}}

## 설정

Datadog의 Google Cloud 통합을 설정하여 Google Cloud 서비스에서 메트릭과 로그를 수집하세요.

### 사전 필수 조건

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1\. 조직에서 도메인별로 ID를 제한하는 경우, 정책에 Datadog 고객 ID를 허용 값으로 추가해야 합니다. Datadog 고객 ID: `C0147pk0i`
{{< /site-region >}}

{{< site-region region="gov" >}}
1\. 조직에서 도메인별로 ID를 제한하는 경우, 정책에 Datadog 고객 ID를 허용 값으로 추가해야 합니다. Datadog 고객 ID: `C03lf3ewa`
{{< /site-region >}}

2\. 서비스 계정 가장 및 자동 프로젝트 검색 기능을 사용하려면 프로젝트 모니터링에 필요한 특정 역할과 API가 활성화되어 있어야 합니다. 시작하기 전에 모니터링하려는 **각 프로젝트**에  다음 API가 활성화되어 있는지 확인하세요.

[Cloud Monitoring API](https://console.cloud.google.com/apis/library/monitoring.googleapis.com)
: Datadog이 Google Cloud 메트릭 데이터를 쿼리할 수 있도록 합니다.

[Compute Engine API](https://console.cloud.google.com/apis/library/compute.googleapis.com)
: Datadog이 컴퓨팅 인스턴스 데이터를 검색할 수 있도록 합니다.

[Cloud Asset API](https://console.cloud.google.com/apis/library/cloudasset.googleapis.com)
: Datadog이 Google Cloud 리소스를 요청하고 관련 레이블을 태그로 메트릭에 연결할 수 있도록 합니다.

[Cloud Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
: Datadog이 메트릭에 올바른 리소스와 태그를 추가할 수 있도록 합니다.

[IAM API](https://console.cloud.google.com/apis/library/iam.googleapis.com)
: Datadog이 Google Cloud에 인증할 수 있도록 합니다.

[Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
: 개발자가 Google Cloud Platform 프로젝트의 결제를 프로그래밍 방식으로 관리할 수 있도록 합니다. 자세한 내용은 [Cloud Cost Management (CCM)](https://docs.datadoghq.com/cloud_cost_management/setup/google_cloud/) 문서를 참고하세요.

3\. 모니터링되는 프로젝트가 다른 여러 프로젝트의 메트릭을 가져오는 [범위 지정 프로젝트](https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.)로 구성되어 있지 않은지 확인하세요.

### 메트릭 수집

#### 설치

{{< tabs >}}

{{% tab "조직 및 폴더 수준의 프로젝트 검색" %}}

조직 수준(또는 폴더 수준) 모니터링을 사용하면 조직 또는 폴더에 생성되는 향후 프로젝트를 포함하여 모든 프로젝트를 포괄적으로 관리할 수 있습니다.

**참고**: Google Cloud에서 설정을 완료하려면 [Google Cloud Identity](https://cloud.google.com/identity/docs/overview) 사용자 계정에 원하는 범위에 `Admin` 역할(예: `Organization Admin`)이 할당되어 있어야 합니다.

{{% collapse-content title="1. 기본 프로젝트에서 Google Cloud 서비스 계정을 생성합니다" level="h5" %}}

1. [Google Cloud 콘솔](https://console.cloud.google.com/)을 엽니다.
1. **IAM 및 관리자** > **서비스 계정**으로 이동합니다.
1. 상단의 **Create service account**를 클릭합니다.
1. 서비스 계정에 고유한 이름을 지정합니다.
1. **Done**을 클릭해 서비스 계정 생성을 완료합니다.

{{% /collapse-content %}}

{{% collapse-content title="2. 조직 또는 폴더 수준에서 서비스 계정을 추가합니다" level="h5" %}}

1. Google 클라우드 콘솔에서 **IAM** 페이지로 이동합니다.
1. 폴더 또는 조직을 선택합니다.
1. 리소스에 아직 다른 역할이 없는 주체에게 역할을 부여하려면 **액세스 권한 부여**를 클릭한 다음 이전에 만든 서비스 계정의 이메일을 입력합니다.
1. 서비스 계정 이메일 주소를 입력합니다.
1. 다음 역할을 할당합니다.

- [Compute Viewer](https://cloud.google.com/compute/docs/access/iam#compute.viewer)는 Compute Engine 리소스를 가져오고 목록을 표시할 수 있는 **읽기 전용** 액세스를 제공합니다.
- [Monitoring Viewer](https://cloud.google.com/monitoring/access-control#monitoring_roles)는 Google Cloud 환경에서 사용 가능한 모니터링 데이터에 **읽기 전용** 액세스를 제공합니다.
- [Cloud Asset Viewer](https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer)는 클라우드 자산 메타데이터에 **읽기 전용** 액세스를 제공합니다.
- [Browser](https://cloud.google.com/resource-manager/docs/access-control-proj#browser)는 프로젝트 계층 구조를 탐색할 수 있는 **읽기 전용** 액세스를 제공합니다.
- [Service Usage Consumer](https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer) (다중 프로젝트 환경에서는 **선택 사항**)는 Datadog 지원팀에서 이 기능을 활성화한 후에 [프로젝트별 비용 및 API 할당량 귀속](#enable-per-project-cost-and-api-quota-attribution) 기능을 제공합니다.

6. **Save**를 클릭합니다.

**참고**: `Browser` 역할은 서비스 계정의 기본 프로젝트에서만 필요합니다. 다른 프로젝트에서는 안내된 다른 역할만 필요합니다.

{{% /collapse-content %}}

{{% collapse-content title="3. Datadog 주체를 서비스 계정에 추가합니다" level="h5" %}}

**참고**: 이전에 공유 Datadog 주체를 사용하여 액세스를 구성한 경우 이 단계를 완료한 후 해당 주체에 대한 권한을 취소할 수 있습니다.

1. Datadog에서 **Integrations** > [**Google Cloud Platform**](https://app.datadoghq.com/integrations/google-cloud-platform)으로 이동합니다.
1. **Add Google Cloud Account**를 클릭합니다.
   설정된 프로젝트가 없는 경우 자동으로 이 페이지로 이동합니다.
1. Datadog 주체를 복사하여 다음 섹션을 위해 보관하세요.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog의 Google Cloud 통합 타일에서 새 Google Cloud 계정을 추가하는 페이지" style="width:70%;">}}

**참고**: Section 4를 위해 이 창을 열어 두세요.

4. [Google Cloud 콘솔](https://console.cloud.google.com/)의 **Service Accounts** 메뉴에서 Section 1에서 생성한 서비스 계정을 찾습니다.
1. **Permissions** 탭으로 이동 후 **Grant Access**를 클릭합니다.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google 클라우드 콘솔 인터페이스, 서비스 계정 아래에 탭 권한이 표시됨." 스타일="width:70%;">}}

6. Datadog 주체를 **새 주체** 텍스트 상자에 붙여넣습니다.
1. **Service Account Token Creator** 역할을 할당합니다.
1. **Save**를 클릭합니다.

{{% /collapse-content %}}

{{% collapse-content title="4. Datadog에서 통합 설정을 완료합니다" level="h5" %}}

1. Google Cloud 콘솔에서 **Service Account** > **Details** 탭으로 이동합니다. 이 페이지에서 이 Google 서비스 계정과 연결된 이메일을 찾습니다. 형식은 `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`입니다.
1. 이 이메일을 복사합니다.
1. Datadog의 통합 구성 타일(이전 섹션에서 Datadog 주체를 복사한 위치)로 돌아갑니다.
1. 복사한 이메일을 **Add Service Account Email**에 붙여넣습니다.
1. **Verify and Save Account**를 클릭합니다.

{{% /collapse-content %}}

설정 후 약 **15분**이 지나면 Datadog에 메트릭이 나타납니다.

#### 여러 프로젝트를 모니터링할 때 권장 방법

##### 프로젝트별 비용 및 API 할당량 귀속 기능 활성화

기본적으로 Google Cloud는 API 호출 모니터링 비용과 API 할당량 사용량을 이 통합에 사용되는 서비스 계정이 포함된 프로젝트에 귀속시킵니다. 여러 프로젝트가 있는 Google Cloud 환경에서는 API 호출 모니터링과 API 할당량 사용량의 프로젝트별 비용 귀속을 활성화하는 것이 좋습니다. 이렇게 하면 비용과 할당량 사용량이 서비스 계정이 포함된 프로젝트가 아닌 *쿼리 대상* 프로젝트에 귀속됩니다. 이를 통해 각 프로젝트에서 발생하는 모니터링 비용을 명확하게 파악할 수 있으며, API 사용량 제한에 도달하는 것을 방지할 수 있습니다.

이 기능을 활성화하는 방법:

1. Datadog 서비스 계정에 원하는 범위(폴더 또는 조직)의 [Service Usage Consumer](https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer) 역할이 있는지 확인하세요.
1. [Google Cloud 통합 페이지](https://app.datadoghq.com/integrations/google-cloud-platform)의 **Projects** 탭에서 **Enable Per Project Quota** 토글을 클릭합니다.

{{% /tab %}}

{{% tab "프로젝트 수준 메트릭 수집" %}}

[서비스 계정 가장 기능](https://cloud.google.com/iam/docs/service-account-impersonation) 및 자동 프로젝트 검색 기능을 사용하여 Datadog을 [Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/)와 통합할 수 있습니다.

이 방법을 사용하면 관련 프로젝트에 IAM 역할을 할당하여 서비스 계정에 표시되는 모든 프로젝트를 모니터링할 수 있습니다. 이러한 역할을 프로젝트에 개별적으로 할당하거나 조직 또는 폴더 수준에서 이러한 역할을 할당하여 Datadog가 프로젝트 그룹을 모니터링하도록 설정할 수 있습니다. 이러한 방식으로 역할을 할당하면 Datadog가 향후 그룹에 추가될 수 있는 새 프로젝트를 포함해 지정된 범위의 모든 프로젝트를 자동으로 검색하고 모니터링할 수 있습니다.

{{% collapse-content title="1. Google 클라우드 서비스 계정을 만듭니다" level="h5" id="create-service-account" %}}

1. [Google Cloud 콘솔](https://console.cloud.google.com/)을 엽니다.
1. **IAM 및 관리자** > **서비스 계정**으로 이동합니다.
1. 상단의 ** 서비스 계정 생성**을 클릭합니다.
1. 서비스 계정에 고유한 이름을 지정한 다음 **생성 후 계속**을 클릭합니다.
1. 서비스 계정에 다음 역할을 추가합니다.
   - [Monitoring Viewer](https://cloud.google.com/monitoring/access-control#monitoring_roles)는 Google Cloud 환경에서 사용 가능한 모니터링 데이터에 **읽기 전용** 액세스를 제공합니다.
   - [Compute Viewer](https://cloud.google.com/compute/docs/access/iam#compute.viewer)는 Compute Engine 리소스를 가져오고 목록을 표시할 수 있는 **읽기 전용** 액세스를 제공합니다.
   - [Cloud Asset Viewer](https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer)는 클라우드 자산 메타데이터에 **읽기 전용** 액세스를 제공합니다.
   - [Browser](https://cloud.google.com/resource-manager/docs/access-control-proj#browser)는 접근 가능한 프로젝트를 검색하는 **읽기 전용** 액세스를 제공합니다.
1. **계속**을 클릭한 다음 **완료**를 클릭하여 서비스 계정 생성을 완료합니다.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Google Cloud 콘솔 인터페이스는 '서비스 계정 생성' 흐름을 보여주는 그림입니다. '이 서비스 계정에 프로젝트 액세스 권한 부여' 아래에 지침의 네 가지 역할이 추가됩니다." 스타일="width:70%;">}}

{{% /collapse-content %}}

{{% collapse-content title="2. Datadog 주체를 서비스 계정에 추가합니다" level="h5" id="add-principal-to-service-account" %}}

1. Datadog에서 [**Integrations** > **Google Cloud Platform**](https://app.datadoghq.com/integrations/google-cloud-platform)으로 이동합니다.

1. **GCP 계정 추가**를 클릭합니다. 설정된 프로젝트가 없는 경우 이 페이지로 자동 리디렉션됩니다.

1. 조직에 대한 Datadog 주체를 생성하지 않은 경우 **주체 생성** 버튼을 클릭합니다.

1. Datadog 주체를 복사하여 다음 섹션을 위해 보관하세요.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="'새 GCP 계정 추가' 흐름을 보여주는 Datadog 인터페이스. 첫 번째 단계인 'Google에 데이터독 주체 추가'에는 사용자가 Datadog 주체를 생성하고 클립보드에 복사할 수 있는 텍스트 상자가 있습니다. 두 번째 단계인 '서비스 계정 이메일 추가'에는 사용자가 섹션 3에서 작성할 수 있는 텍스트 상자가 있습니다." style="width:70%;">}}

   **참고:** 다음 섹션을 위해 이 창을 열어 두세요.

1. [Google Cloud 콘솔](https://console.cloud.google.com/)의 **Service Accounts** 메뉴에서 [첫 번째 섹션](#create-service-account)에서 생성한 서비스 계정을 찾습니다.

1. **권한** 탭 으로 이동하여 **액세스 권한 부여**를 클릭합니다.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google 클라우드 콘솔 인터페이스, 서비스 계정 아래에 탭 권한이 표시됨." 스타일="width:70%;">}}

1. Datadog 주체를 **새 주체** 텍스트 상자에 붙여넣습니다.

1. **Service Account Token Creator** 역할을 할당하고 **SAVE**를 클릭합니다.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google 클라우드 콘솔 인터페이스, '주체 추가' 상자와 '역할 할당' 인터페이스가 표시되어 있습니다." style="width:70%;">}}

**참고**: 이전에 공유 Datadog 주체를 사용하여 액세스를 구성한 경우 이 단계를 완료한 후 해당 주체에 대한 권한을 취소할 수 있습니다.

{{% /collapse-content %}}

{{% collapse-content title="3. Datadog에서 통합 설정을 완료합니다" level="h5" %}}

1. Google 클라우드 콘솔에서 **서비스 계정** > ** 세부정보** 탭으로 이동합니다. 여기에서 이 Google 서비스 계정과 연결된 이메일을 찾을 수 있습니다. `<sa-name>@<project-id>.iam.gserviceaccount.com`과 유사합니다.
1. 이 이메일을 복사합니다.
1. Datadog의 통합 구성 타일([이전 섹션](#add-principal-to-service-account)에서 Datadog 주체를 복사한 위치)로 돌아갑니다.
1. **서비스 계정 이메일 추가** 아래에 있는 상자에 이전에 복사한 이메일을 붙여넣습니다.
1. **계정 확인 및 저장**을 클릭합니다.

약 15분 후 Datadog 에 메트릭이 나타납니다.

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### 검증

메트릭을 보려면 왼쪽 메뉴에서 **Metrics** > **Summary**로 이동한 다음 `gcp`를 검색합니다.

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="Datadog의 Metric Summary 페이지에서 GCP로 시작하는 메트릭만 필터링." style="width:100%;" >}}

#### 설정

{{% collapse-content title="메트릭 네임스페이스별로 메트릭 수집 제한" level="h5" %}}

필요에 따라 Datadog으로 모니터링할 Google Cloud 서비스를 선택할 수 있습니다. 특정 Google 서비스와 관련한 메트릭 수집을 구성하면 중요한 서비스의 가시성을 유지하면서 Google Cloud Monitoring API 비용을 최적화할 수 있습니다.

Datadog [Google Cloud 통합 페이지](https://app.datadoghq.com/integrations/google-cloud-platform)의 **Metric Collection** 탭에서 제외할 메트릭 네임스페이스를 선택 해제합니다. 모든 메트릭 네임스페이스의 수집을 비활성화할 수도 있습니다.

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="Datadog Google Cloud 통합 페이지의 Metric Collection 탭" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="태그별로 메트릭 수집 제한" level="h5" %}}

기본적으로 Datadog의 인프라 개요에는 모든 Google Compute Engine(GCE) 인스턴스가 표시됩니다. Datadog은 GCE 호스트 태그와 사용자가 추가한 GCE 레이블을 자동으로 인스턴스에 지정합니다.

필요에 따라 태그를 사용하여 Datadog으로 가져오는 인스턴스를 제한할 수 있습니다. 프로젝트의 **Metric Collection** 탭에서 **Limit Metric Collection Filters** 텍스트 상자에 태그를 입력합니다. 정의된 태그 중 하나와 일치하는 호스트만 Datadog으로 가져옵니다. 와일드카드(단일 문자는 `?`, 여러 문자는 `*`)를 사용하여 여러 호스트와 일치시키거나 `!`를 사용하여 특정 호스트를 제외할 수 있습니다. 이 예에서는 모든 `c1*` 크기의 인스턴스를 포함하지만 스테이징 호스트는 제외합니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

자세한 내용은 Google의 [레이블을 사용하여 리소스 정리](https://cloud.google.com/compute/docs/labeling-resources) 페이지를 참고하세요.

{{% /collapse-content %}}

#### Datadog Agent 활용하기

[Datadog Agent](https://docs.datadoghq.com/agent/)를 사용하여 인프라에서 [가장 세밀하고 지연 시간이 짧은 메트릭](https://docs.datadoghq.com/data_security/data_retention_periods/)을 수집하세요. [GKE](https://docs.datadoghq.com/integrations/google-kubernetes-engine/)를 포함한 모든 호스트에 Agent를 설치하면 Agent가 수집하는 [트레이스](https://docs.datadoghq.com/tracing/) 및 [로그](https://docs.datadoghq.com/logs/)에서 더 심층적인 인사이트를 얻을 수 있습니다. 자세한 내용은 [클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유](https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/)를 참고하세요.

## 로그 수집

{{< tabs >}}

{{% tab "Dataflow 방식 (권장)" %}}

Google Cloud Dataflow(https://cloud.google.com/dataflow)와 Datadog 템플릿(https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog)을 사용하여 Google Cloud 서비스의 로그를 Datadog으로 전달하세요. 이 방식은 Datadog으로 전달하기 전에 이벤트를 압축하고 일괄 처리합니다.

Terraform을 통해 이 인프라를 관리하려면 [terraform-gcp-datadog-integration](https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration) 모듈을 사용하거나, 이 섹션의 지침을 따르세요.

1. 구성된 로그 싱크에서 로그를 수신하려면  Pub/Sub [토픽](https://docs.datadoghq.com/integrations/google-cloud-pubsub/) 및 [Pull 구독](https://cloud.google.com/pubsub/docs/create-subscription)을 생성합니다.
1. Dataflow 파이프라인 워커에 최소 권한(https://www.datadoghq.com/blog/datadog-recommended-monitors/)을 부여하려면 사용자 지정 Dataflow 워커 서비스 계정을 생성합니다.
1. Pub/Sub 토픽에 로그를 게시하려면 [로그 싱크](https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink)를 생성합니다.
1. [Datadog 템플릿](https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog)을 사용하여 Dataflow 작업을 생성하고 Pub/Sub 구독에서 Datadog으로 로그를 스트리밍합니다.

로그 싱크에서 생성하는 로깅 필터를 통해 GCE 및 GKE 로그를 포함하여 Datadog으로 전송되는 로그를 완벽하게 제어할 수 있습니다. 필터 작성와 관련한 자세한 내용은 Google의 [로깅 쿼리 언어 페이지](https://cloud.google.com/logging/docs/view/logging-query-language)를 참고하세요. 구축된 아키텍처에 대한 자세한 내용은 Cloud Architecture Center의 [Google Cloud에서 Datadog으로 로그 스트리밍](https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog)을 참고하세요.

**참고**: Google Cloud Dataflow를 사용하려면 **Dataflow API**를 활성화해야 합니다. 자세한 내용은 Google Cloud의 [API 활성화](https://cloud.google.com/apis/docs/getting-started#enabling_apis) 문서를 참고하세요.

GCE 또는 GKE에서 실행되는 애플리케이션 로그를 수집하려면 [Datadog Agent](https://docs.datadoghq.com/agent/)를 사용할 수도 있습니다.

#### 1. Cloud Pub/Sub 주제 및 구독 생성

1. [Cloud Pub/Sub 콘솔](https://console.cloud.google.com/cloudpubsub/topicList)로 이동하여 새 토픽을 만듭니다. 설정을 간소화하려면 **Add a default subscription** 옵션을 선택하세요.

   **참고**: 수동으로 [Cloud Pub/Sub 구독](https://console.cloud.google.com/cloudpubsub/subscription/)을 구성하여 **Pull** 전송 유형을 선택할 수도 있습니다. Pub/Sub 구독을 수동으로 생성하는 경우 `Enable dead lettering` 상자를 **선택 해제**하세요. 자세한 내용은 [지원되지 않는 Pub/Sub 기능]https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer)을 참고하세요.

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="기본 구독 추가 체크박스가 선택된 Google Cloud Console 주제 생성 페이지" style="width:80%;">}}

2. 해당 주제에 `export-logs-to-datadog`과 같은 명확한 이름을 지정하고 **Create**를 클릭합니다.

1. Datadog API에서 거부된 로그 메시지를 처리하기 위해 추가 토픽과 기본 구독을 생성합니다. 이 토픽의 이름은 Datadog Dataflow 템플릿에서 `outputDeadletterTopic` [템플릿 파라미터](https://cloud.google.com/apis/docs/getting-started#enabling_apis)의 경로 구성의 일부로 사용됩니다. 실패한 메시지의 문제를 조사하고 수정한 후에는 [Pub/Sub to Pub/Sub 템플릿](https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub) 작업을 실행하여 원래 `export-logs-to-datadog` 토픽으로 다시 전송합니다.

1. Datadog은 Datadog Dataflow 템플릿에서 나중에 사용할 수 있도록 유효한 Datadog API 키 값을 사용하여 [Secret Manager](https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/)에서 시크릿을 생성할 것을 권장합니다.

**경고**: Cloud Pub/Sub는 [Google Cloud 할당량 및 제한](https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink)의 적용을 받습니다. 로그 수가 제한을 초과하는 경우 Datadog에서는 로그를 여러 토픽으로 분할하는 것을 권장합니다. 제한에 가까워지면 [Pub/Sub 로그 전달 모니터링 섹션](#monitor-the-cloud-pubsub-log-forwarding)에서 모니터링 알림 설정 방법을 확인하세요.

#### 2. 커스텀 Dataflow 작업자 서비스 계정 생성

Dataflow 파이프라인 워커의 기본 동작은 프로젝트의 [Compute Engine 기본 서비스 계정](https://console.cloud.google.com/dataflow/createjob)을 사용하는 것입니다. 이 계정은 프로젝트의 모든 리소스의 권한을 부여합니다. **Production** 환경에서 로그를 전달하는 경우, 필요한 역할과 권한만 있는 사용자 지정 워커 서비스 계정을 생성하고 이 서비스 계정을 Dataflow 파이프라인 워커에 할당해야 합니다.

1. Google Cloud 콘솔에서 [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) 페이지로 이동하여 프로젝트를 선택합니다.
1. **CREATE SERVICE ACCOUNT**를 클릭하고 서비스 계정에 설명이 포함된 이름을 지정합니다. 그런 다음**CREATE AND CONTINUE**를 클릭합니다.
1. 필수 권한 테이블에 역할을 추가하고 **DONE**을 클릭합니다.

##### 필수 권한

[Dataflow Admin](https://cloud.google.com/kms/docs)
: `roles/dataflow.admin` <br> 이 서비스 계정이 Dataflow 관리 작업을 할 수 있도록 허용합니다.

[Dataflow Worker](https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared)
: `roles/dataflow.worker` <br> 이 서비스 계정이 Dataflow 작업을 할 수 있도록 허용합니다.

[Pub/Sub Viewer](https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker)
: `roles/pubsub.viewer` <br> 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 구독의 메시지를 볼 수 있도록 허용합니다.

[Pub/Sub Subscriber](https://console.cloud.google.com/logs/viewer)
: `roles/pubsub.subscriber` <br> 이 서비스 계정이 Google Cloud 로그를 사용하여 Pub/Sub 구독 메시지를 소비할 수 있도록 허용합니다.

[Pub/Sub Publisher](https://cloud.google.com/dataflow)
: `roles/pubsub.publisher`<br> 이 서비스 계정이 실패한 메시지를 별도의 구독으로 게시할 수 있도록 허용하여 로그를 분석하거나 재전송할 수 있도록 합니다.

[Secret Manager Secret Accessor](https://cloud.google.com/logging/docs/view/logging-query-language#sample)
: `roles/secretmanager.secretAccessor` <br> 이 서비스 계정이 Secret Manager에서 Datadog API 키에 액세스할 수 있도록 합니다.

[Storage Object Admin](https://app.datadoghq.com/logs)
: `roles/storage.objectAdmin`<br> 이 서비스 계정이 스테이징 파일용으로 지정된 Cloud Storage 버킷에 읽기 및 쓰기 권한을 갖도록 허용합니다.

**참고**: Dataflow 파이프라인 작업자에 커스텀 서비스 계정을 만들지 않는 경우 기본 Compute Engine 서비스 계정에 위의 필수 권한이 ​​있는지 확인하세요.

#### 3. Google Cloud Pub/Sub 주제에서 로그 내보내기

1. Google Cloud 콘솔에서 [Logs Explorer 페이지](https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber)로 이동합니다.

1. **Log Router** 탭에서 **Create Sink**를 선택합니다.

1. 싱크의 이름을 제공합니다.

1. _Cloud Pub/Sub_를 대상으로 선택하고 해당 목적으로 생성된 Cloud Pub/Sub 주제를 선택합니다. **참고**: Cloud Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. 필요에 따라 포함/제외 필터를 적용하여 싱크에 포함할 로그를 선택합니다. 검색 쿼리를 사용하거나 [샘플 함수](https://cloud.google.com/pubsub/docs/create-subscription)를 사용하여 로그를 필터링할 수 있습니다. 예를 들어, `ERROR` 수준이 `severity`인 로그 중 10%만 포함하려면 `severity="ERROR" AND sample(insertId, 0.1)`를 사용하여 포함 필터를 생성하세요. 

   {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="쿼리 severity=ERROR and sample(insertId, 0.1)를 사용한 Google Cloud 로깅 싱크용 포함 필터" >}}

1. **Create Sink**를 클릭합니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크를 사용하여 동일한 Cloud Pub/Sub 주제로 여러 내보내기를 만들 수 있습니다.

#### 4. Dataflow 작업 생성 및 실행하기

1. Google Cloud 콘솔에서 [Create job from template](https://console.cloud.google.com/dataflow/createjob) 페이지로 이동합니다.

1. 작업 이름을 지정하고 Dataflow 리전 엔드포인트를 선택합니다.

1. **Dataflow template** 드롭다운 메뉴에서 `Pub/Sub to Datadog`을 선택하면 **Required parameter** 섹션이 나타납니다.
   a. **Pub/Sub input subscription** 드롭다운 메뉴에서 입력 구독을 선택합니다.
   b. 다음을 **Datadog Logs API URL** 필드에 입력합니다.

   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **참고**: 위 URL을 복사하기 전에 페이지 오른쪽에 있는 Datadog 사이트 선택기가 [Datadog 사이트](https://console.cloud.google.com/logs/viewer)로 설정되어 있는지 확인하세요.

   c. **Output deadletter Pub/Sub topic** 드롭다운에서 메시지 오류를 수신할 토픽을 선택합니다.
   d. 스토리지 버킷의 **Temporary location** 필드에 임시 파일의 경로를 지정합니다.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow 템플릿의 필수 파라미터" style="width:80%;">}}

4. 아래 **부수적인 파라미터**에서  `Include full Pub/Sub message in the payload`를 확인하세요.

1. [1단계](#1-create-a-cloud-pubsub-topic-and-subscription)에서 언급된 대로 Datadog API 키 값을 사용하여 Secret Manager에서 시크릿을 생성한 경우 **Google Cloud Secret Manager ID** 필드에 해당 시크릿의 **리소스 이름**을 입력합니다.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow 템플릿의 선택적 파라미터로, Google Cloud Secret Manager ID와 API 키 전달 필드의 출처(Source)가 모두 강조 표시됨" style="width:80%;">}}

다른 옵션 사용 방법에 관한 자세한 내용은 Dataflow 템플릿의 [템플릿 파라미터](https://cloud.google.com/apis/docs/getting-started#enabling_apis)를 참고하세요.

- `apiKeyKMSEncryptionKey`를 [Cloud KMS](https://cloud.google.com/kms/docs) 키 ID로 설정하고, `apiKey`는 암호화된 API 키로 설정한 `apiKeySource=KMS`
- **권장하지 않음**: `apiKey`와 `apiKeySource=PLAINTEXT`가 플레인 텍스트 API 키로 설정된 경우

6. 사용자 지정 워커 서비스 계정을 생성한 경우 **Service account email** 드롭다운 메뉴에서 해당 계정을 선택합니다.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="서비스 계정 이메일 드롭다운이 강조표시된 Datadog Dataflow 템플릿의 선택적 파라미터" style="width:80%;">}}

7. **작업 실행**을 클릭합니다.

**참고**: 공유 VPC를 사용하는 경우 `Network` 및 `Subnetwork` 파라미터 지정에 관한 지침은 Dataflow 문서의 [네트워크 및 서브네트워크 지정](https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared) 페이지를 참고하세요.

#### 검증

Cloud Pub/Sub 토픽으로 전달되는 새로운 로깅 이벤트는 [Datadog Log Explorer](https://app.datadoghq.com/logs)에 표시됩니다. 

**참고**: 예상 비용을 계산하려면 [Google Cloud Pricing Calculator (https://cloud.google.com/products/calculator)를 사용하세요.

#### Cloud Pub/Sub 로그 전달 모니터링

[Google Cloud Pub/Sub 통합](https://docs.datadoghq.com/integrations/google-cloud-pubsub/)은 로그 전달 상태를 모니터링하는 데 유용한 메트릭을 제공합니다.

- 전달 보류 중인 메시지 수: `gcp.pubsub.subscription.num_undelivered_messages`
- 구독에서 가장 오래된 확인되지 않은 메시지의 기간: `gcp.pubsub.subscription.oldest_unacked_message_age`

위의 메트릭을 [메트릭 모니터](https://docs.datadoghq.com/monitors/types/metric/)와 함께 사용하여 입력 및 데드레터 구독에 있는 메시지 알림을 받으세요.

#### Dataflow 파이프라인 모니터링

Datadog의 [Google Cloud Dataflow 통합](https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher)을 사용하여 Dataflow 파이프라인의 모든 측면을 모니터링하세요. 기본 제공되는 대시보드에서 모든 주요 Dataflow 메트릭을 확인할 수 있으며, Dataflow 워크로드를 실행하는 GCE 인스턴스 정보 및 Pub/Sub 처리량과 같은 상황별 데이터도 함께 제공됩니다.

미리 구성된 [권장 모니터](https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor)를 사용하여 파이프라인의 백로그 시간 증가 알림을 설정할 수도 있습니다. 자세한 내용은 Datadog 블로그의 [Datadog을 사용하여 Dataflow 파이프라인 모니터링](https://cloud.google.com/storage/docs/access-control/iam-roles/)을 참고하세요.

{{% /tab %}}

{{% tab "Pub/Sub Push 방식 (레거시)" %}}

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push 구독을 이용한 Google Cloud 로그 수집</a>은 **더 이상 지원되지 않을 예정**입니다.

위의 **Push** 구독 관련 문서는 문제 해결 또는 기존 설정 수정 용도로만 유지됩니다.

Google Cloud 로그를 Datadog으로 전달하려면 [Dataflow 방식](http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended)에 설명된 대로 Datadog Dataflow 템플릿과 함께 **Pull** 구독을 사용하세요.

{{% /tab %}}

{{< /tabs >}}

## 확장된 BigQuery 모니터링

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Preview에 가입하세요!" >}}
확장된 BigQuery 모니터링은 Preview 단계입니다. 쿼리 성능에 관한 인사이트를 얻으려면 이 양식을 작성하여 가입하세요.
{{< /callout >}}

확장된 BigQuery 모니터링 기능으로 BigQuery 환경에 관한 세부적인 가시성을 확보할 수 있습니다.

### BigQuery 작업 성능 모니터링

BigQuery 작업 성능을 모니터링하려면 각 Google Cloud 프로젝트용 Datadog 서비스 계정에 [BigQuery Resource Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer) 역할을 부여하세요.

**참고**:

- [설정 섹션](#setup)에 설명된 대로 Datadog에서 Google Cloud 서비스 계정을 인증해야 합니다.
- 확장된 BigQuery 모니터링을 위해 로그를 수집할 때 Dataflow를 설정할 필요는 **없습니다**.

1. Google Cloud 콘솔에서 [IAM 페이지](https://console.cloud.google.com/iam-admin/)로 이동합니다.
1. **Grant access**를 클릭합니다.
1. **New principals**에 서비스 계정 이메일을 입력합니다.
1. [BigQuery Resource Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer) 역할을 할당합니다.
1. **SAVE**를 클릭합니다.
1. Datadog의 [Google Cloud 통합 페이지](https://app.datadoghq.com/integrations/google-cloud-platform)에서 **BigQuery** 탭을 클릭합니다.
1. **Enable Query Performance** 토글을 클릭합니다.

### BigQuery 데이터 품질 모니터링

BigQuery 데이터 품질 모니터링은 BigQuery 테이블의 품질 메트릭(예: 최신성, 행 수 및 크기 변경)을 제공합니다. [Data Quality Monitoring 페이지](https://app.datadoghq.com/datasets/tables/explore)에서 테이블 데이터를 자세히 살펴보세요.

품질 메트릭을 수집하려면 사용 중인 각 BigQuery 테이블용 Datadog 서비스 계정에 [BigQuery Metadata Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer) 역할을 부여하세요.

**참고**: BigQuery Metadata Viewer는 BigQuery 테이블, 데이터 세트, 프로젝트 또는 조직 수준에서 적용할 수 있습니다.

- 데이터 세트 내 모든 테이블에 Data Quality Monitoring을 하려면 데이터 세트 수준에서 접근 권한을 부여하세요.
- 프로젝트 내 모든 데이터 세트에 Data Quality Monitoring을 하려면 프로젝트 수준에서 접근 권한을 부여하세요.

1. [BigQuery](https://console.cloud.google.com/bigquery)로 이동합니다.
1. Explorer에서 원하는 BigQuery 리소스를 찾습니다.
1. 해당 리소스 옆에 있는 점 3개 메뉴를 클릭한 다음 **Share -> Manage Permissions**을 클릭합니다.

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="BigQuery 데이터 세트 리소스를 위한 Manage Permissions 메뉴 옵션" style="width:80%;">}}

4. **ADD PRINCIPAL**을 클릭합니다.
1. 새로운 Principal 입력란에 Google Cloud 통합을 위해 설정된 Datadog 서비스 계정을 입력합니다.
1. [BigQuery Metadata Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer) 역할을 할당합니다.
1. **SAVE**를 클릭합니다.
1. Datadog의 [Google Cloud 통합 페이지](https://app.datadoghq.com/integrations/google-cloud-platform)에서 **BigQuery** 탭을 클릭합니다.
1. **Enable Data Quality** 토글을 클릭합니다.

### BigQuery 작업 로그 보존

Datadog은 `data-observability-queries`라는 새 [로그 인덱스](https://app.datadoghq.com/logs/pipelines/indexes])를 설정하고 BigQuery 작업 로그를 15일 동안 인덱싱할 것을 권장합니다. 다음 인덱스 필터를 사용하여 로그를 가져오세요.

```bash
service:data-observability @platform:*
```

비용 견적은 [Log Management 가격 페이지](https://www.datadoghq.com/pricing/?product=log-management#products)를 참고하세요.

## Resource Changes Collection

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
<strong>Resource changes collection</strong>은  Preview 단계입니다! 이용하려면 첨부된 양식을 사용하세요.
{{< /callout >}}

Google Cloud 통합 페이지의 [Resource Collection 탭](https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources)에서 **Enable Resource Collection**을 선택합니다. 이렇게 하면 Google의 [Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes)에서 클라우드 리소스 변경 사항이 감지될 때 Datadog에서 리소스 이벤트를 수신할 수 있습니다.

다음으로, 아래 단계를 따라 Pub/Sub 토픽의 변경 이벤트를 Datadog [Event Explorer](https://app.datadoghq.com/event/explorer)에 전달합니다.

{{% collapse-content title="Google Cloud CLI" level="h4" %}}

### Cloud Pub/Sub 토픽 및 구독 생성

#### 주제 만들기

1. [Google Cloud Pub/Sub 토픽 페이지](https://console.cloud.google.com/cloudpubsub/topicList)에서 **CREATE TOPIC**을 클릭합니다.
1. 주제에 이름을 지정합니다.
1. 기본 구독을 추가하기위해 옵션을 **선택 취소**합니다.
1. **CREATE**를 클릭합니다.

#### 구독 만들기

1. [Google Cloud Pub/Sub 구독 페이지](https://console.cloud.google.com/cloudpubsub/subscription/)에서 **CREATE SUBSCRIPTION**을 클릭합니다.
1. 구독 이름에 `export-asset-changes-to-datadog`을 입력합니다.
1. 이전에 생성된 Cloud Pub/Sub 주제를 선택합니다.
1. 전달 유형으로 ***Pull**을 선택합니다.
1. **CREATE**를 클릭합니다.

### 액세스 부여

이 Pub/Sub 구독에서 읽으려면 통합에 사용되는 Google Cloud 서비스 계정에 구독에 대한 `pubsub.subscriptions.consume` 권한이 필요합니다. 이를 허용하는 최소한의 권한이 있는 기본 역할은 **Pub/Sub subscriber** 역할입니다. 이 역할을 부여하려면 아래 단계를 따르세요.

1. [Google Cloud Pub/Sub 구독 페이지](https://console.cloud.google.com/cloudpubsub/subscription/)에서 `export-asset-changes-to-datadog` 구독을 클릭합니다.
1. 페이지 오른쪽의 **정보 패널**에서 **Permissions** 탭을 클릭합니다. 정보 패널이 표시되지 않으면**SHOW INFO PANEL**을 클릭합니다.
1. **ADD PRINCIPAL**을 클릭합니다.
1. Datadog Google Cloud 통합에 사용된 **서비스 계정 이메일**을 입력합니다. 서비스 계정은 Datadog의 [Google Cloud 통합 페이지](https://app.datadoghq.com/integrations/google-cloud-platform)의 **Configuration** 탭 왼쪽에 표시됩니다.

### 자산 피드 만들기

[Cloud Shell](https://cloud.google.com/shell) 또는 [gcloud CLI](https://cloud.google.com/sdk/gcloud)에서 아래 명령어를 실행하여 위에서 생성한 Pub/Sub 토픽으로 변경 이벤트를 전송하는 Cloud Asset Inventory Feed를 생성합니다.

{{< tabs >}}

{{% tab "프로젝트" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<PROJECT_ID>`: Google Cloud 프로젝트 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결된 Pub/Sub 주제 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{% tab "Folder" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<FOLDER_ID>`: Google Cloud 폴더 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결된 Pub/Sub 주제 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{% tab "Organization" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<ORGANIZATION_ID>`: Your Google Cloud 조직 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결된 Pub/Sub 주제 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" %}}

### 자산 피드 만들기

다음 Terraform 템플릿을 복사하고 필요한 인수를 대체하세요.

{{< tabs >}}

{{% tab "Project" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_project_feed" "project_feed" {
  project      = local.project_id
  feed_id      = "<FEED_NAME>"
  content_type = "<CONTENT_TYPE>" # 선택 사항. 사용하지 않으면 제거.

  asset_names = ["<ASSET_NAMES>"] #asset_types를 지정하는 경우 선택 사항. 사용하지 않으면 제거.
  asset_types = ["<ASSET_TYPES>"] # asset_names를 지정하는 경우 선택 사항. 사용하지 않으면 제거.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<PROJECT_ID>`: Google Cloud 프로젝트 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결될 Pub/Sub 토픽의 이름.
- `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud 통합에서 사용하는 서비스 계정 이메일.
- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{% tab "Folder" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_folder_feed" "folder_feed" {
  billing_project = local.project_id
  folder          = "<FOLDER_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # 선택 사항. 사용하지 않으면 제거.

  asset_names = ["<ASSET_NAMES>"] # asset_types를 지정하면 선택 사항. 사용하지 않으면 제거.
  asset_types = ["<ASSET_TYPES>"] # asset_names를 지정하면 선택 사항. 사용하지 않으면 제거.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<PROJECT_ID>`: Google Cloud 프로젝트 ID.
- `<FOLDER_ID>`: 이 피드를 생성할 폴더의 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결될 Pub/Sub 토픽의 이름.
- `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud 통합에서 사용하는 서비스 계정 이메일.
- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{% tab "Organization" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_organization_feed" "organization_feed" {
  billing_project = local.project_id
  org_id          = "<ORGANIZATION_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # 선택 사항. 사용하지 않으면 제거.

  asset_names = ["<ASSET_NAMES>"] # asset_types를 지정하면 선택 사항. 사용하지 않으면 제거.
  asset_types = ["<ASSET_TYPES>"] # asset_names를 지정하면 선택 사항. 사용하지 않으면 제거.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

표시된 대로 플레이스홀더 값을 업데이트합니다.

- `<PROJECT_ID>`: Google Cloud 프로젝트 ID.
- `<TOPIC_NAME>`: `export-asset-changes-to-datadog` 구독과 연결될 Pub/Sub 토픽의 이름.
- `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud 통합에서 사용하는 서비스 계정 이메일.
- `<ORGANIZATION_ID>`: Your Google Cloud 조직 ID.
- `<FEED_NAME>`: Cloud Asset Inventory Feed를 설명하는 이름.
- `<ASSET_NAMES>`: 변경 이벤트를 수신할 쉼표로 구분된 리소스 [전체 이름](https://cloud.google.com/asset-inventory/docs/resource-name-format) 목록. `asset-types`을 지정하는 경우 **선택 사항**.
- `<ASSET_TYPES>`: 변경 이벤트를 수신할 쉼표로 구분된 [자산 유형](https://cloud.google.com/asset-inventory/docs/supported-asset-types) 목록. `asset-names`을 지정할 경우 **선택 사항**.
- `<CONTENT_TYPE>`: **선택 사항** 변경 이벤트를 수신할 자산 [콘텐츠 유형](https://cloud.google.com/asset-inventory/docs/overview#content_types).

{{% /tab %}}

{{< /tabs >}}

{{% /collapse-content %}}

Datadog에서는 `asset-types` 파라미터를 정규식 `.*`로 설정하여 모든 리소스에 대한 변경 사항을 수집할 것을 권장합니다.

**참고**: `asset-names` 또는 `asset-types` 파라미터에 적어도 하나의 값을 지정해야 합니다.

구성 가능한 파라미터 전체 목록은 [gcloud asset feeds create](https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create) 참고 문서를 확인하세요.

### Resource Changes Collection 활성화

Google Cloud 통합 페이지의 [Resource Collection 탭](https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources)에서 **Enable Resource Changes Collection**을 클릭합니다.

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="Datadog의 Google Cloud 통합 타일에 있는 Enable Resource Changes Collection 토글" popup="true" style="width:80%;">}}

#### 검증

[Datadog Event Explorer](https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory)에서 해당 자산 변경 이벤트를 찾습니다.

## Private Service Connect

{{< site-region region="us,us3,ap1,gov" >}}

<div class="alert alert-info">Private Service Connect는 US5 및 EU Datadog 사이트에서만 사용할 수 있습니다.</div>
{{< /site-region >}}

[Google Cloud Private Service Connect 통합](https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/)을 사용하여 Private Service Connect를 통한 연결, 전송된 데이터 및 손실된 패킷을 시각화할 수 있습니다. 이를 통해 생산자와 소비자 모두 Private Service Connect 연결에서 중요한 메트릭을 파악할 수 있습니다.
[Private Service Connect(PSC)](https://cloud.google.com/vpc/docs/private-service-connect)는 Google Cloud 네트워킹 제품으로, Virtual Private Cloud (VPC)에서 [Google Cloud 서비스](https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services), [타사 파트너 서비스](https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services) 및 회사 소유 애플리케이션에 직접 액세스할 수 있도록 지원합니다.

자세한 내용은 Datadog 블로그의 [Datadog에 비공개로 액세스하고 Google Cloud Private Service Connect 사용량 모니터링](https://www.datadoghq.com/blog/google-cloud-private-service-connect/)을 참고하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.gce.instance.cpu.utilization** <br>(gauge) | 현재 인스턴스에서 사용 중인 할당된 CPU의 비율. 일부 머신 유형은 100% 이상의 사용량까지 버스트가 허용됩니다.<br>_fraction으로 표시됨_ |

#### 누적 메트릭

누적 메트릭은 각 메트릭 이름에 대한 `.delta` 메트릭과 함께 Datadog으로 가져옵니다. 누적 메트릭은 시간이 지남에 따라 값이 지속적으로 증가하는 메트릭입니다. 예를 들어 `sent bytes` 메트릭은 누적될 수 있습니다. 각 값은 해당 시점에 서비스에서 보낸 총 바이트 수를 기록합니다. 델타 값은 이전 측정 이후의 변화를 나타냅니다.

예시:

`gcp.gke.container.restart_count`은 CUMULATIVE 메트릭입니다. Datadog은 이 메트릭을 누적 메트릭으로 가져올 때 CUMULATIVE 메트릭의 일부로 출력되는 집계 값과 달리 델타 값을 포함하는 `gcp.gke.container.restart_count.delta` 메트릭을 추가합니다. 자세한 내용은 [Google Cloud 메트릭 유형](https://cloud.google.com/monitoring/api/v3/kinds-and-types)을 참고하세요.

### 이벤트

Google Cloud Platform에서 생성된 모든 서비스 이벤트는 [Datadog Events Explorer](https://app.datadoghq.com/event/stream)로 전달됩니다.

### 서비스 점검

Google Cloud Platform 통합에는 서비스 검사가 포함되지 않습니다.

### 태그

태그는 다양한 Google Cloud Platform 및 Google Compute Engine 설정 옵션에 따라 자동으로 할당됩니다. `project_id` 태그가 모든 메트릭에 추가됩니다. 추가 태그는 가능한 경우 Google Cloud Platform에서 수집되며 메트릭 유형에 따라 다릅니다.

또한 Datadog은 다음을 태그로 수집합니다.

- `<key>:<value>` 라벨이 있는 모든 호스트
- Google Pub/Sub, GCE, Cloud SQL, Cloud Storage의 커스텀 라벨

## 트러블슈팅

### 사용자 정의 gcp.logging 메트릭에 대한 메타데이터가 잘못되었나요?

[Datadog의 기본 로깅 메트릭](https://docs.datadoghq.com/integrations/google-stackdriver-logging/#metrics) 외의 메트릭과 같은 비표준 _gcp.logging_ 메트릭의 경우 적용되는 메타데이터가 Google Cloud Logging과 일치하지 않을 수 있습니다.

이러한 경우에는 [메트릭 요약 페이지](https://app.datadoghq.com/metric/summary)로 이동하여 해당 메트릭을 검색 및 선택하고 메타데이터 옆에 있는 연필 아이콘을 클릭하여 메타데이터를 수동으로 설정해야 합니다.

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Google Cloud 환경의 컴플라이언스와 보안 상태 개선](https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/)
- [Datadog으로 Google Cloud Vertex AI 모니터링](https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/)
- [Datadog으로 Dataflow 파이프라인 모니터링](https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/)
- [Terraform으로 Google Cloud 통합 생성 및 관리](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts)
- [Datadog으로 BigQuery 모니터링](https://www.datadoghq.com/blog/track-bigquery-costs-performance/)
- Resource Catalog의 Recent Changes를 통해 인프라 변경 문제를 빠르게 해결(https://www.datadoghq.com/blog/recent-changes-tab/)
- [Google Cloud에서 Datadog으로 로그 스트리밍](https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog)