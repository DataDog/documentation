---
aliases:
- /ko/integrations/gcp/
categories:
- cloud
- google cloud
- iot
- log collection
- network
dependencies: []
description: 다양한 GCP 메트릭을 수집하고 호스트 맵에서 인스턴스를 시각화하세요
doc_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: 블로그
  text: Datadog을 통해 Google Cloud 환경의 규정 준수 및 보안 상태를 개선하세요
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 Google Cloud Vertex AI를 모니터링하세요
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: 블로그
  text: Datadog으로 Dataflow 파이프라인을 모니터링하세요
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  tag: Terraform
  text: Terraform으로 Google Cloud 통합을 생성하고 관리하세요
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: 블로그
  text: Datadog으로 BigQuery를 모니터링하세요
git_integration_title: google_cloud_platform
has_logo: true
integration_id: google-cloud-platform
integration_title: Google Cloud Platform
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_platform
public_title: Datadog-Google Cloud Platform Integration
short_description: 다양한 GCP 메트릭을 수집하고 호스트 맵에서 인스턴스를 시각화하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog에서 모든 Google Compute Engine(GCE) 호스트를 보려면 Google Cloud Platform에 연결하세요. Datadog의 인프라스트럭처 개요에서 호스트를 확인하고 정렬할 수 있습니다. Datadog이 자동으로 GCE 호스트 태그와 추가한 GCE 라벨을 사용하여 호스트에 태그를 지정하기 때문입니다.

<div class="alert alert-warning">
Datadog의 GCP 통합은 <a href="https://cloud.google.com/monitoring/api/metrics_gcp">모든 Google Cloud 메트릭</a>을 수집하도록 구축되었습니다. Datadog은 모든 하위 통합에 대한 정보 제공을 위해 문서를 지속적으로 업데이트하고 있으나 클라우드 서비스는 새로운 메트릭과 서비스를 빠르게 출시하기 때문에 통합 목록이 미처 업데이트되지 못한 경우가 있습니다.
</div>

| 통합                         | 설명                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | 확장 가능한 애플리케이션을 구축하기 위한 PaaS(Platform as a Service)                           |
| [Big Query][2]                      | 엔터프라이즈 데이터 웨어하우스                                                             |
| [Bigtable][3]                       | NoSQL Big Data 데이터베이스 서비스                                                       |
| [Cloud SQL][4]                      | MySQL 데이터베이스 서비스                                                                |
| [Cloud APIs][5]                     | 모든 Google Cloud Platform 서비스를 위한 프로그래밍 방식 인터페이스                        |
| [Cloud Armor][6]                   | 서비스 거부 및 웹 공격으로부터 보호하는 데 도움이 되는 네트워크 보안 서비스    |
| [Cloud Composer][7]                 | 완전 관리형 워크플로 오케스트레이션 서비스                                        |
| [Cloud Dataproc][8]                 | Apache Spark 및 Apache Hadoop 클러스터를 실행하기 위한 클라우드 서비스                   |
| [Cloud Dataflow][9]                | 스트림 및 배치 모드에서 데이터를 변환하고 강화하기 위한 완전 관리형 서비스 |
| [Cloud Filestore][10]                | 고성능, 완전 관리형 파일 스토리지                                          |
| [Cloud Firestore][11]                | 모바일, 웹, 서버 개발을 위한 유연하고 확장 가능한 데이터베이스                 |
| [Cloud Interconnect][12]            | 하이브리드 연결                                                                   |
| [Cloud IoT][13]                     | 안전한 디바이스 연결 및 관리                                               |
| [Cloud Load Balancing][14]          | 부하가 분산된 컴퓨팅 리소스 배포                                            |
| [Cloud Logging][15]                 | 실시간 로그 관리 및 분석                                                 |
| [Cloud Memorystore for Redis][16]   | 완전 관리형 인메모리 데이터 저장소 서비스                                          |
| [Cloud Router][17]                  | BGP를 사용하여 VPC와 온프레미스 네트워크 간에 경로를 교환                |
| [Cloud Run][18]                     | HTTP를 통해 상태 스테이트리스 컨테이너를 실행하는 관리형 컴퓨팅 플랫폼                  |
| [Cloud Security Command Center][19] | Security Command Center는 위협 보고 서비스입니다.                                |
| [Cloud Tasks][20]                   | 분산된 작업 대기열                                                               |
| [Cloud TPU][21]                     | 머신 러닝 모델 학습 및 실행                                                 |
| [Compute Engine][22]                | 고성능 가상 머신                                                     |
| [Container Engine][23]              | Google이 관리하는 Kubernetes                                                         |
| [Datastore][24]                     | NoSQL 데이터베이스                                                                        |
| [Firebase][25]                      | 애플리케이션 개발을 위한 모바일 플랫폼                                           |
| [Functions][26]                     | 이벤트 기반 마이크로서비스 구축을 위한 서버리스 플랫폼                            |
| [Kubernetes Engine][27]             | 클러스터 관리자 및 오케스트레이션 시스템                                              |
| [Machine Learning][28]              | 머신 러닝 서비스                                                             |
| [Pub/Sub][29]                       | 실시간 메시징 서비스                                                           |
| [Spanner][30]                       | 수평적으로 확장 가능하고 전 세계적으로 일관된 관계형 데이터베이스 서비스               |
| [Storage][31]                       | 통합 객체 스토리지                                                                |
| [Vertex AI][32]                     | 커스텀 머신 러닝(ML) 모델을 구축, 교육 및 배포합니다.                          |
| [VPN][33]                           | 관리형 네트워크 기능                                                         |

## 설정

### 메트릭 수집

#### 설치

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    서비스 계정 가장은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

[서비스 계정 가장][34]과 자동 프로젝트 검색을 사용하여 Datadog을 [Google Cloud][35]와 통합할 수 있습니다.

이 방법을 사용하면 관련 프로젝트에 IAM 역할을 할당하여 서비스 계정에 표시되는 모든 프로젝트를 모니터링할 수 있습니다. 이러한 역할을 프로젝트에 개별적으로 할당하거나 조직 또는 폴더 수준에서 이러한 역할을 할당하여 프로젝트 그룹을 모니터링하도록 Datadog을 구성할 수 있습니다. 이러한 방식으로 역할을 할당하면 Datadog이 향후 그룹에 추가될 수 있는 새 프로젝트를 포함하여 지정된 범위의 모든 프로젝트를 자동으로 검색하고 모니터링할 수 있습니다.

##### 필수 요건

* 조직에서 도메인별로 ID를 제한하는 경우 Datadog의 고객 ID를 정책에 허용되는 값으로 추가해야 합니다. Datadog의 고객 ID: `C0147pk0i`

* 서비스 계정 가장과 자동 프로젝트 검색은 프로젝트를 모니터링하기 위해 특정 역할과 API를 활성화해야 합니다. 시작하기 전에 모니터링하려는 프로젝트에 대해 다음 API가 활성화되어 있는지 확인하세요.:
  * [Cloud Resource Manager API][36]
  * [Google Cloud Billing API][37]
  * [Cloud Monitoring API][38]
  * [Compute Engine API][39]
  * [Cloud Asset API][40]
  * [IAM API][41]

##### 1. Google Cloud 서비스 계정 만들기

1. [Google Cloud 콘솔][42]을 엽니다.
2. **IAM & Admin** > **Service Accounts**로 이동합니다.
3. 상단의 **Create service account**를 클릭합니다.
4. 서비스에 고유한 이름을 지정한 후 **Create and continue**를 클릭합니다.
5. 서비스 계정에 다음과 같은 역할을 추가합니다:
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. **Continue**를 클릭한 후 서비스 계정 생성을 완료하기 위해 **Done**을 클릭합니다.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="'Create service account' 플로우를 보여주는 Google Cloud 콘솔 인터페이스. 'Grant this service account access to project' 아래에 지침에 있는 네 가지 역할이 추가됩니다." style="width:70%;">}}

##### 2. 서비스 계정에 Datadog 프린시플 추가하기 

1. Datadog에서 [**Integrations** > **Google Cloud Platform**][43]으로 이동합니다.
2. **Add GCP Account**를 클릭합니다. 설정된 프로젝트가 없으면 자동으로 이 페이지로 리디렉션됩니다.
3. 조직에 대한 Datadog 프린시플을 생성하지 않은 경우, **Generate Principal** 버튼을 클릭합니다.
4. Datadog 프린시플을 복사하고 다음 섹션을 위해 보관하세요.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="'Add New GCP Account' 플로우를 보여주는 Datadog 인터페이스 첫 번째 단계인 'Google에 Datadog Principal 추가'에는 사용자가 Datadog Principal을 생성하고 이를 클립보드에 복사할 수 있는 텍스트 상자가 있습니다. 두 번째 단계인 '서비스 계정 이메일 추가'에는 사용자가 섹션 3에서 완료할 수 있는 텍스트 상자가 있습니다." style="width:70%;">}}
   [다음 섹션]을 위해 이 창을 열어두세요(#3-complete-the-integration-setup-in-datadog).
5. [Google Cloud 콘솔][42]에서  **Service Acounts** 메뉴의 [첫 번째 섹션]에서 생성한 서비스 계정을 찾습니다.(#1-create-your-google-cloud-service-account).
6. **Permissions** 탭으로 이동해 **Grant Access**를 클릭합니디ㅏ.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Service Acounts의 Permissions 탭이 표시된 Google Cloud 콘솔 인터페이스" style="width:70%;">}}
7. Datadog 프린시플을 **New principals** 텍스트 상자에 붙여넣습니다.
8. **Service Account Token Creator** 역할을 할당한 후 **Save**를 클릭합니다.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="'Add principals' 상자와 'Assign roles'' 인터페이스를 보여주는 Google Cloud 콘솔 인터페이스." style="width:70%;">}}

**참고**: 이전에 공유 Datadog 프린시플을 사용하여 액세스를 설정했다면 이 단계를 완료한 후 해당 프린시플에 대한 권한을 취소할 수 있습니다.

##### 3. Datadog에서 통합 설정을 완료하기

1. Google Cloud 콘솔에서 **Service Account** > **Details** 탭으로 이동합니다. 여기에서 이 Google 서비스 계정과 연결된 이메일을 찾을 수 있습니다. `<sa-name>@<project-id>.iam.gserviceaccount.com`과 같은 형식입니다.
2. 이 이메일을 복사합니다.
3. Datadog의 통합 설정 타일로 돌아갑니다([이전 섹션]에서 Datadog 프린시플을 복사한 위치).(#2-add-the-datadog-principal-to-your-service-account)).
4.**Add Service Account Email** 아래 상자에 복사한 이메일을 붙여넣습니다.
5. **Verify and Save Account**를 클릭합니다.

약 15분 후에 Datadog에 메트릭이 나타납니다.

##### 4. 다른 프로젝트에 역할 할당(선택 사항)

자동 프로젝트 검색은 모니터링할 추가 프로젝트를 추가하는 프로세스를 단순화합니다. 서비스 계정에 다른 프로젝트, 폴더 또는 조직에 대한 액세스 권한을 부여하면 Datadog은 이러한 프로젝트(및 폴더 또는 조직에 중첩된 모든 프로젝트)를 검색하고 자동으로 통합 타일에 추가합니다.

1. 원하는 범위에서 역할을 할당할 수 있는 적절한 권한이 있는지 확인합니다.
   * Project IAM Admin (또는 이상)
   * Folder Admin
   * Organization Admin
2. Google Cloud 콘솔에서 **IAM** 페이지로 이동합니다.
3. 프로젝트, 폴더, 조직을 선택합니다. 
4. 아직 리소스에 대한 다른 역할이 없는 주 구성원에게 역할을 부여하려면 **Grant Access**를 클릭한 다음 앞서 만든 서비스 계정의 이메일을 입력합니다.
5. 다음 역할을 할당합니다.
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer
  **참고**: 브라우저 역할은 서비스 계정의 기본 프로젝트에만 필요합니다.
6. **Save**를 저장합니다.

#### 설정

(선택 사항) 특정 프로젝트의 드롭다운 메뉴 아래에 있는 **Limit Metric Collection** 텍스트 상자에 태그를 입력하여 Datadog에 주입되는 GCE 인스턴스를 제한할 수 있습니다. 정의된 태그 중 하나와 일치하는 호스트만 Datadog로 가져옵니다. 여러 호스트와 일치하는 와일드카드(단일 문자의 경우 `?`, 여러 문자의 경우, `*`), 또는 특정 호스트만 제외하는 `!`를 사용할 수 있습니다. 다음 예에서는 `c1*` 크기의 인스턴스가 포함되지만 스테이징 호스트는 제외됩니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

자세한 내용은 [라벨 생성 및 관리][44]에 대한 Google 문서를 참조하세요.

### 로그 수집

[Google Cloud Dataflow][45] 및 [Datadog 템플릿][46]을 사용하여 Google Cloud 서비스의 로그를 Datadog으로 전달합니다. 이 방법은 Datadog으로 전달하기 전에 이벤트를 압축하고 일괄 처리하는 기능을 모두 제공합니다. 이 섹션의 지침에 따라 다음을 수행하세요.

[1](#1-create-a-cloud-pubsub-topic-and-subscription). Pub/Sub [주제][47]를 만들고 [서브스크립션을 가져와][48] 설정된 로그 싱크에서 로그를 수신하세요.
[2](#2-create-a-custom-dataflow-worker-service-account). Dataflow 파이프라인 작업자에게 [최소 권한][49]을 제공하기 위해 커스텀 Dataflow 작업자 서비스 계정을 만듭니다. 
[3](#3-export-logs-from-google-cloud-pubsub-topic).Pub/Sub 주제에 로그를 게시하려면 [로그 싱크][50]를 만드세요.
[4](#4-create-and-run-the-dataflow-job). [Datadog 템플릿][46]을 사용하여 Dataflow 작업을 만들어 Pub/Sub 서브스크립션에서 Datadog으로 로그를 스트리밍합니다.

GCE 및 GKE 로그를 포함하여 로그 싱크에서 생성한 로깅 필터를 통해 Datadog으로 전송되는 로그를 완전히 제어할 수 있습니다. 필터 작성에 대한 자세한 내용은 Google의 [로깅 쿼리 언어 페이지][51]를 참조하세요.

**참고**: Google Cloud Dataflow를 사용하려면 Dataflow API를 활성화해야 합니다. 자세한 내용은 Google Cloud 문서의 [API 활성화][52]를 참조하세요.

GCE 또는 GKE에서 실행되는 애플리케이션에서 로그를 수집하려면 [Datadog Agent][53]를 사용할 수도 있습니다.

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push 서브스크립션을 통한 Google Cloud 로그 수집</a> 다음과 같은 이유로 지원이 중단될 수 있습니다.
- Google Cloud VPC가 있는 경우 Push 서브스크립션은 VPC 외부 엔드포인트에 액세스할 수 없습니다.
- Push 서브스크립션은 이벤트 압축이나 일괄 처리를 제공하지 않으므로 매우 적은 양의 로그에만 적합합니다.

<strong>Push</strong>서브스크립션에 대한 문서는 레거시 설정 문제 해결 또는 수정을 위해서만 유지됩니다. 대신 Datadog Dataflow 템플릿과 함께 <strong>Pull</strong>서브스크립션을 사용하여 Google Cloud 로그를 Datadog에 전달하세요.

</div>

#### 1. Cloud Pub/Sub 주제 및 서브스크립션 만들기

1. [Cloud Pub/Sub 콘솔][54]로 이동하여 새 주제를 만듭니다. 간단하게 설정하려면 **Add a default subscription** 옵션을 선택하세요.

   **참고**: **Pull** 전송 유형을 사용하여 [Cloud Pub/Sub 서브스크립션][55]을 수동으로 설정할 수도 있습니다. Pub/Sub 서브스크립션을 수동으로 만드는 경우 `Enable dead lettering` 체크박스를 **선택 해제**하세요. 자세한 내용은 [지원되지 않는 Pub/Sub 기능][56]을 참조하세요.

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="기본 서브스크립션 추가 체크박스가 선택된 Google Cloud Console의 주제 만들기 페이지" style="width:80%;">}}

2. 해당 주제에 `export-logs-to-datadog`과 같은 명시적인 이름을 지정하고 **Create**를 클릭합니다.

3. Datadog API에서 거부된 로그 메시지를 처리하기 위해 추가 주제와 기본 서브스크립션을 생성합니다. 이 주제의 이름은 `outputDeadletterTopic` [템플릿 파라미터][57]에 대한 경로 설정의 일부로 Datadog Dataflow 템플릿 내에서 사용됩니다. 실패한 메시지의 문제를 검사하고 수정한 후 [Pub/Sub to Pub/Sub 템플릿][58] 작업을 실행하여 문제를 원래 `export-logs-to-datadog` 주제로 다시 보냅니다.

4. Datadog에서는 나중에 Datadog Dataflow 템플릿에서 사용할 수 있도록 유효한 Datadog API 키 값을 사용하여 [Secret Manager][59]에서 비밀을 생성할 것을 권장합니다.

**경고**: Cloud Pub/Sub에는 [Google Cloud 할당량 및 제한사항][60]이 적용됩니다. 보유한 로그 수가 해당 제한을 초과하는 경우 Datadog에서는 로그를 여러 주제로 분할할 것을 권장합니다. 해당 제한에 도달하는 경우 모니터 알림 설정에 대한 자세한 내용은 [Pub/Sub 로그 전달 모니터링 섹션](#monitor-the-cloud-pubsub-log-forwarding)을 참조하세요.

#### 2. 커스텀 Dataflow 작업자 서비스 계정 만들기

Dataflow 파이프라인 작업자의 기본 동작은 프로젝트의 모든 리소스에 권한을 부여하는 프로젝트의 [Compute Engine 기본 서비스 계정][61]을 사용하는 것입니다. **프로덕션** 환경에서 로그를 전달하는 경우 필요한 역할과 권한만 있는 커스텀 작업자 서비스 계정을 만들고 이 서비스 계정을 Dataflow 파이프라인 작업자에 할당해야 합니다.

1. Google Cloud 콘솔의 [Service Accounts][62] 페이지로 이동하여 프로젝트를 선택합니다.
2. **CREATE SERVICE ACCOUNT**를 클릭하고 서비스 계정에 설명이 포함된 이름을 지정합니다. 그런 다음**CREATE AND CONTINUE**를 클릭합니다.
3. 필수 권한 테이블에 역할을 추가하고 **DONE**을 클릭하세요.

##### 필수 권한

| 역할                                 | 경로                                 | 설명                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][63]                 | `roles/dataflow.admin`               | 이 서비스 계정이 Dataflow 관리 작업을 수행하도록 허용합니다.                                                               |
| [Dataflow Worker][64]                | `roles/dataflow.worker`              | 이 서비스 계정이 Dataflow 작업을 수행하도록 허용합니다.                                                                     |
| [Pub/Sub Viewer][65]                 | `roles/pubsub.viewer`                | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 서브스크립션의 메시지를 볼 수 있도록 허용합니다.                             |
| [Pub/Sub Subscriber][66]             | `roles/pubsub.subscriber`            | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 서브스크립션의 메시지를 사용하도록 허용합니다.                          |
| [Pub/Sub Publisher][67]              | `roles/pubsub.publisher`             | 이 서비스 계정이 실패한 메시지를 별도의 서브스크립션에 게시하도록 허용합니다. 이를 통해 로그를 분석하거나 다시 보낼 수 있습니다. |
| [Secret Manager Secret Accessor][68] | `roles/secretmanager.secretAccessor` | 이 서비스 계정이 Secret Manager의 Datadog API 키에 액세스하도록 허용합니다.                                                        |
| [Storage Object Admin][69]           | `roles/storage.objectAdmin`          | 이 서비스 계정이 파일 준비용으로 지정된 Cloud Storage 버킷을 읽고 쓸 수 있도록 허용합니다.                              |

**참고**: Dataflow 파이프라인 작업자에 대한 커스텀 서비스 계정을 만들지 않는 경우 기본 Compute Engine 서비스 계정에 위의 필수 권한이 ​​있는지 확인하세요.

#### 3. Google Cloud Pub/Sub 주제에서 로그 내보내기

1. Google Cloud 콘솔에서 [Logs Explorer 페이지][70]로 이동합니다.
2. **Log Router** 탭에서 **Create Sink**를 선택합니다.
3. 싱크의 이름을 제공합니다.
4. _Cloud Pub/Sub_를 대상으로 선택하고 해당 목적으로 생성된 Cloud Pub/Sub 주제를 선택합니다. **참고**: Cloud Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

5. 선택적 포함 또는 제외 필터를 사용하여 싱크에 포함하려는 로그를 선택하세요. 검색어를 사용하여 로그를 필터링하거나 [샘플 함수][71]를 사용할 수 있습니다. 예를 들어 `ERROR`의 `severity` 레벨이 있는 로그 중 10%만 포함하려면 `severity="ERROR" AND sample(insertId, 0.01)`를 사용하여 포함 필터를 만듭니다.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="심각도=ERROR 및 샘플(insertId, 0.1) 쿼리가 포함된 Google Cloud 로깅 싱크의 포함 필터" >}}

6. **Create Sink**를 클릭합니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크를 사용하여 동일한 Cloud Pub/Sub 주제로 여러 내보내기를 만들 수 있습니다.

#### 4. Dataflow 작업 생성 및 실행하기

1. Google Cloud 콘솔의 [Create job from template][72] 페이지로 이동합니다.
2. 작업 이름을 지정하고 Dataflow 리전 엔드포인트를 선택합니다.
3. **Dataflow template** 드롭다운에서 `Pub/Sub to Datadog`을 선택하면 **Required parameters** 섹션이 나타납니다.
   a. **Pub/Sub input subscription** 드롭다운에서 인풋 서브스크립션을 선택합니다.
   b. **Datadog Logs API URL** 필드에 다읍을 입력합니다:  

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **참고**: 위의 URL을 복사하기 전에 페이지 오른쪽에 있는 Datadog 사이트 선택기가 [Datadog 사이트][66]로 설정되어 있는지 확인하세요.

   c. **Output deadletter Pub/Sub topic** 드롭다운에서 메시지 오류를 수신하기 위해 생성된 주제를 선택합니다.
   d. **Temporary location** 필드에 저장소 버킷의 임시 파일 경로를 지정합니다.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow 템플릿의 필수 파라미터" style="width:80%;">}}  

4. [1단계](#1-create-a-cloud-pubsub-topic-and-subscription)에서 언급한 대로 Datadog API 키 값을 사용하여 Secret Manager에서 비밀을 생성한 경우 **Google Cloud Secret Manager ID** 필드에서 해당 비밀의 **리소스 이름**을 입력하세요.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Google Cloud Secret Manager ID와 API 키 전달 소스 필드가 모두 강조표시된 Datadog Dataflow 템플릿의 선택적 파라미터" style="width:80%;">}}  

사용 가능한 다른 옵션 사용에 대한 자세한 내용은 Dataflow 템플릿의 [템플릿 파라미터][57]를 참조하세요.

   - `apiKeyKMSEncryptionKey`와 함께 `apiKeySource=KMS`를  [Cloud KMS][73] 키 ID로 설정하고 `apiKey`를 암호화된 API 키로 설정 
   - **권장하지 않음**: `apiKey`와 `apiKeySource=PLAINTEXT`가 플레인 텍스트 API 키로 설정된 경우

5. 커스텀 작업자 서비스 계정을 만든 경우 **Service account email** 드롭다운에서 선택합니다.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="서비스 계정 이메일 드롭다운이 강조표시된 Datadog Dataflow 템플릿의 선택적 파라미터" style="width:80%;">}}

6. **RUN JOB**을 클릭합니다.

**참고**: 공유 VPC가 있는 경우 `Network` 및 `Subnetwork` 파라미터 지정에 대한 지침은 Dataflow 문서의 [네트워크 및 서브네트워크 지정][74] 페이지를 참조하세요.

#### 검증

Cloud Pub/Sub 주제에 전달된 새로운 로깅 이벤트가 [Datadog Log Explorer][75]에 표시됩니다.

**참고**: [Google Cloud Pricing Calculator][76]를 사용하여 잠재적 비용을 계산할 수 있습니다.

#### Cloud Pub/Sub 로그 전달 모니터링

[Google Cloud Pub/Sub 통합][29]은 로그 전달 상태를 모니터링하는 데 유용한 메트릭을 제공합니다.

   - 전달 보류 중인 메시지 수: `gcp.pubsub.subscription.num_undelivered_messages`
   - 서브스크립션에서 가장 오래된 확인되지 않은 메시지의 기간: `gcp.pubsub.subscription.oldest_unacked_message_age`

[메트릭 모니터][77]와 함께 위의 메트릭을 사용하여 인풋 및 데드레터 서브스크립션에서의 메시지에 대한 경고를 받습니다.

#### Dataflow 파이프라인 모니터링

Datadog의 [Google Cloud Dataflow 통합][9]을 사용하여 Dataflow 파이프라인의 모든 측면을 모니터링하세요. Dataflow 워크로드를 실행하는 GCE 인스턴스 및 Pub/Sub 처리량에 대한 정보와 같은 상황별 데이터가 풍부한 기본 대시보드에서 모든 주요 Dataflow 메트릭을 확인할 수 있습니다.

사전 설정된 [권장 모니터][78]를 사용하여 파이프라인의 백로그 시간 증가에 대한 알림을 설정할 수도 있습니다. 자세한 내용은 Datadog 블로그에서 [Datadog으로 Dataflow 파이프라인 모니터링하기][79]를 읽어보세요.

## 수집한 데이터

### 메트릭

메트릭은 개별 Google Cloud 통합 페이지를 참조하세요.

### 이벤트

Google Cloud Platform에서 생성된 모든 서비스 이벤트는 [Datadog Events Explorer][80]로 전달됩니다.

### 서비스 검사

Google Cloud Platform 통합에는 서비스 검사가 포함되지 않습니다.

### 태그

태그는 다양한 Google Cloud Platform 및 Google Compute Engine 설정 옵션에 따라 자동으로 할당됩니다. `project_id` 태그가 모든 메트릭에 추가됩니다. 추가 태그는 가능한 경우 Google Cloud Platform에서 수집되며 메트릭 유형에 따라 다릅니다.

또한 Datadog은 다음을 태그로 수집합니다.

- `<key>:<value>` 라벨이 있는 모든 호스트.
- Google Pub/Sub, GCE, Cloud SQL, Cloud Storage의 커스텀 라벨.

## 트러블슈팅

### 사용자 정의 gcp.logging 메트릭에 대한 메타데이터가 잘못되었나요?

[Datadog의 기본 로깅 메트릭][81] 이외의 메트릭과 같은 비표준 _gcp.logging_ 메트릭의 경우 적용된 메타데이터가 Google Cloud Logging과 일치하지 않을 수 있습니다.

이러한 경우 [메트릭 요약 페이지][82]로 이동하여 문제의 메트릭을 검색 및 선택한 후 메타데이터 옆에 있는 연필 아이콘을 클릭하여 메타데이터를 수동으로 설정해야 합니다.

도움이 필요하신가요? [Datadog 지원팀][83]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/ko/integrations/google_bigquery/
[3]: https://docs.datadoghq.com/ko/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/ko/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/ko/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/ko/integrations/google_cloud_armor/
[7]: https://docs.datadoghq.com/ko/integrations/google_cloud_composer/
[8]: https://docs.datadoghq.com/ko/integrations/google_cloud_dataproc/
[9]: https://docs.datadoghq.com/ko/integrations/google_cloud_dataflow/
[10]: https://docs.datadoghq.com/ko/integrations/google_cloud_filestore/
[11]: https://docs.datadoghq.com/ko/integrations/google_cloud_firestore/
[12]: https://docs.datadoghq.com/ko/integrations/google_cloud_interconnect/
[13]: https://docs.datadoghq.com/ko/integrations/google_cloud_iot/
[14]: https://docs.datadoghq.com/ko/integrations/google_cloud_loadbalancing/
[15]: https://docs.datadoghq.com/ko/integrations/google_stackdriver_logging/
[16]: https://docs.datadoghq.com/ko/integrations/google_cloud_redis/
[17]: https://docs.datadoghq.com/ko/integrations/google_cloud_router/
[18]: https://docs.datadoghq.com/ko/integrations/google_cloud_run/
[19]: https://docs.datadoghq.com/ko/integrations/google_cloud_security_command_center/
[20]: https://docs.datadoghq.com/ko/integrations/google_cloud_tasks/
[21]: https://docs.datadoghq.com/ko/integrations/google_cloud_tpu/
[22]: https://docs.datadoghq.com/ko/integrations/google_compute_engine/
[23]: https://docs.datadoghq.com/ko/integrations/google_container_engine/
[24]: https://docs.datadoghq.com/ko/integrations/google_cloud_datastore/
[25]: https://docs.datadoghq.com/ko/integrations/google_cloud_firebase/
[26]: https://docs.datadoghq.com/ko/integrations/google_cloud_functions/
[27]: https://docs.datadoghq.com/ko/integrations/google_kubernetes_engine/
[28]: https://docs.datadoghq.com/ko/integrations/google_cloud_ml/
[29]: https://docs.datadoghq.com/ko/integrations/google_cloud_pubsub/
[30]: https://docs.datadoghq.com/ko/integrations/google_cloud_spanner/
[31]: https://docs.datadoghq.com/ko/integrations/google_cloud_storage/
[32]: https://docs.datadoghq.com/ko/integrations/google_cloud_vertex_ai/
[33]: https://docs.datadoghq.com/ko/integrations/google_cloud_vpn/
[34]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[35]: /ko/integrations/google_cloud_platform/
[36]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[37]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[38]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[39]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[40]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[41]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[42]: https://console.cloud.google.com/
[43]: https://app.datadoghq.com/integrations/google-cloud-platform
[44]: https://cloud.google.com/compute/docs/labeling-resources
[45]: https://cloud.google.com/dataflow
[46]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[47]: https://cloud.google.com/pubsub/docs/create-topic
[48]: https://cloud.google.com/pubsub/docs/create-subscription
[49]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[50]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[51]: https://cloud.google.com/logging/docs/view/logging-query-language
[52]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[53]: https://docs.datadoghq.com/ko/agent/
[54]: https://console.cloud.google.com/cloudpubsub/topicList
[55]: https://console.cloud.google.com/cloudpubsub/subscription/
[56]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[57]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[58]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[59]: https://console.cloud.google.com/security/secret-manager
[60]: https://cloud.google.com/pubsub/quotas#quotas
[61]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[62]: https://console.cloud.google.com/iam-admin/serviceaccounts
[63]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[64]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[65]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[66]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[67]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[68]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[69]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[70]: https://console.cloud.google.com/logs/viewer
[71]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[72]: https://console.cloud.google.com/dataflow/createjob
[73]: https://cloud.google.com/kms/docs
[74]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[75]: https://app.datadoghq.com/logs
[76]: https://cloud.google.com/products/calculator
[77]: https://docs.datadoghq.com/ko/monitors/types/metric/
[78]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[79]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[80]: https://app.datadoghq.com/event/stream
[81]: https://docs.datadoghq.com/ko/integrations/google_stackdriver_logging/#metrics
[82]: https://app.datadoghq.com/metric/summary
[83]: https://docs.datadoghq.com/ko/help/