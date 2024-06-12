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
custom_kind: integration
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
| [Private Service Connect][29]       | 프라이빗 VPC 연결로 관리형 서비스에 액세스
| [Pub/Sub][30]                       | 실시간 메시징 서비스                                                           |
| [Spanner][31]                       | 수평적으로 확장 가능하고 전 세계적으로 일관된 관계형 데이터베이스 서비스               |
| [Storage][32]                       | 통합 객체 스토리지                                                                |
| [Vertex AI][33]                     | 커스텀 머신 러닝(ML) 모델을 구축, 학습 및 배포합니다.                          |
| [VPN][34]                           | 관리형 네트워크 기능                                                         |

## 설정

Datadog의 Google Cloud 통합을 설정하여 Google Cloud 서비스에서 메트릭과 로그를 수집하세요.

### 필수 구성 요소

* 조직에서 도메인별로 ID를 제한하는 경우 Datadog의 고객 ID 를 정책에 허용되는 값으로 추가해야 합니다. Datadog의 고객 ID: `C0147pk0i`

* 서비스 계정 가장 및 프로젝트 자동 검색은 프로젝트를 모니터링할 수 있는 특정 역할과 API를 사용하도록 설정해야 합니다. 시작하기 전에 모니터링하려는 프로젝트에 대해 다음 API가 활성화되어 있는지 확인하세요.
  * [Cloud Resource Manager API][35]
  * [Google Cloud Billing API][36]
  * [Cloud Monitoring API][37]
  * [Compute Engine API][38]
  * [Cloud Asset API][39]
  * [IAM API][40]

### 메트릭 수집

#### 설치

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    {{< region-param key="dd_site_name" >}} 사이트에서는 서비스 계정 가장 기능을 이용할 수 없습니다.
</div>
{{% /site-region %}}
[Google Cloud][42]와 Datadog를 통합할 때 [서비스 계정 가장][41]과 자동 프로젝트 감지 기능을 사용할 수 있습니다.

이 방법을 사용하면 관련 프로젝트에 IAM 역할을 부여해 서비스 계정에서 볼 수 있는 모든 프로젝트를 모니터링할 수 있습니다. 이 역할을 개별 프로젝트에 부여하거나 조직이나 폴더 수준에서 역할을 부여하여 Datadog가 프로젝트 그룹을 모니터링하도록 구성할 수 있습니다. 이처럼 역할을 부여하면 Datadog가 자동으로 주어진 범위 내 모든 프로젝트를 자동으로 감지하고 모니터링할 수 있습니다. 향후 새 프로젝트가 추가되면 자동으로 모니터링에 추가됩니다.

#### 1. Google Cloud 서비스 계정 생성

1. [Google Cloud 콘솔][43]을 엽니다.
2. **IAM & Admin** > **Service Accounts**로 이동합니다.
3. 상단에 **Create service account**를 클릭합니다.
4. 서비스 계정에 고유 이름을 부여하고 **Create and continue**를 클릭합니다.
5. 서비스 계정에 다음 역할을 추가합니다.
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. **Continue**를 클릭한 후 **Done**을 선택하면 서비스 계정 생성이 완료됩니다.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="'서비스 계정 생성' 플로우를 보여주는 Google Cloud 콘솔 인터페이스. 'Grant this service account access to project' 아래 설명에 있는 역할 네 개가 추가됨." style="width:70%;">}}

#### 2. 서비스 계정에 Datadog 보안 주체 추가

1. Datadog에서 [**Integrations** > **Google Cloud Platform**][44]으로 이동하세요.
2. **Add GCP Account**를 클릭하세요. 구성한 프로젝트가 없을 경우 자동으로 이 페이지로 넘어갑니다.
3. 조직에 Datadog 보안 주체를 아직 생성하지 않은 경우 **Generate Principal** 버튼을 누르세요.
4. 다음 섹션에서 사용할 수 있도록 Datadog 보안 주체를 복사한 후 보관해 두세요.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="'새 GCP 계정 추가' 플로우를 보여주는 Datadog 통합 인터페이스. 사용자가 Datadog 보안 주체를 생성하고 클립보드에 복사할 수 있는 텍스트 상자. 두 번째 단계인 '서비스 계정 이메일 추가'에는 사용자가 섹션 3에서 완료할 수 있는 텍스트 상자가 있음." style="width:70%;">}}
   [다음 섹션](#3-complete-the-integration-setup-in-datadog)에서 이 창을 열어두세요.
5. [Google Cloud 콘솔][43]의 **Service Acounts** 메뉴 아래에서 [첫 번째 섹션](#1-create-your-google-cloud-service-account)에서 생성한 서비스 계정을 찾으세요.
6. **Permissions** 탭으로 이동하고 **Grant Access**를 클릭하세요.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Service Accounts 아래 Permissions 탭을 보여주는 Google Cloud 콘솔 인터페이스" style="width:70%;">}}
7. 보안 주체를 **New principals** 텍스트 상자에 붙여 넣으세요.
8. **Service Account Token Creator** 역할을 부여하고 **Save**를 클릭하세요.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="'보안 주체 추가' 상자와 '역할 할당' 인터페이스를 보여주는 Google Cloud 콘솔 인터페이스" style="width:70%;">}}

**참고**: 공유 Datadog 보안 주체를 사용해 이미 액세스를 구성한 경우에는 이 단계를 완료한 후 기존 보안 주체 권한을 취소할 수 있습니다.

#### 3. Datadog에서 통합 설정 완료

1. Google Cloud 콘솔에서 **Service Account** > **Details** 탭으로 이동합니다. 여기에서 Google 서비스 계정과 연결된 이메일을 찾을 수 있습니다(예: `<sa-name>@<project-id>.iam.gserviceaccount.com`).
2. 이 이메일을 복사하세요.
3. Datadog 통합 구성으로 돌아가세요([이전 섹션](#2-add-the-datadog-principal-to-your-service-account)에서 Datadog 보안 주체를 복사한 화면).
4. **Add Service Account Email** 아래 상자에서 이전에 복사한 이메일을 붙여 넣으세요.
5. **Verify and Save Account**를 클릭하세요.

In approximately fifteen minutes, metrics appear in Datadog.

#### 4. 다른 프로젝트에 역할 부여(선택사항)

자동 프로젝트 감지 기능을 통해 모니터링할 프로젝트 추가 과정이 간편해졌습니다. 다른 프로젝트, 폴더, 또는 조직에 서비스 계정 액세스를 허용하면 Datadog가 관련 프로젝트를 자동으로 감지하고(폴더나 조직에 중첩된 프로젝트 포함) 통합 타일에 추가합니다.

1. 원하는 범위로 역할을 부여할 올바른 권한이 있는지 확인해야 합니다.
   * Project IAM Admin (이상)
   * Folder Admin
   * Organization Admin
2. Google Cloud 콘솔에서 **IAM** 페이지로 이동하세요.
3. 프로젝트, 폴더, 또는 조직을 선택하세요.
4. 리소스에서 기존 역할이 없는 보안 주체에 역할을 부여하려면 **Grant Access**를 클릭하고 이전에 생성한 서비스 계정 이메일을 입력하세요.
5. 다음 역할을 부여하세요.
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer
   **참고**: Browser 역할은 서비스 계정 기본 프로젝트에만 필요합니다.
6. **Save**를 클릭하세요.

#### 구성

또는 해당 프로젝트의 드롭다운 메뉴에서 **Limit Metric Collection** 텍스트 상자에 태그를 입력해 Datadog로 불러오는 GCE 인스턴스를 제한할 수 있습니다. 이렇게 하면 정의된 태그와 일치하는 호스트만 Datadog로 가져옵니다. 불러오고 싶은 호스트가 많을 경우 와일드카드(단일 문자일 경우 `?` 사용, 다수 문자일 경우 `*` 사용)를 사용하거나, 특정 호스트를 제외하고 싶을 경우에는 `!`를 사용하세요. 이 예시의 경우 크기가 `c1*`인 인스턴스를 모두 포함하나 스테이징 호스트를 제외합니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

자세한 내용은 Google 설명서 [레이블 생성 및 관리][45]를 참고하세요.

### 로그 수집

[Google Cloud Dataflow][46]와 [Datadog 템플릿][47]을 사용해 Google Cloud 서비스에서 Datadog로 로그를 전송하세요. 이 방법을 사용해 Datadog로 전송하기 전에 이벤트를 압축 및 일괄 처리할 수 있습니다. 이 섹션에서는 다음에 관한 지침을 제공합니다.

[1](#1-create-a-cloud-pubsub-topic-and-subscription). Pub/Sub [주제][48]를 생성하고 [구독을 풀하여][49] 구성된 로그 싱크에서 로그 수신
[2](#2-create-a-custom-dataflow-worker-service-account). 커스텀 Dataflow 작업자 서비스 계정을 생성하여 Dataflow 파이프라인 작업자에 [최소 권한][50]을 제공
[3](#3-export-logs-from-google-cloud-pubsub-topic). [로그 싱크][51]를 생성하여 Pub/Sub 주제로 로그 게재 
[4](#4-create-and-run-the-dataflow-job). [Datadog 템플릿][47]을 사용해 Dataflow 작업을 생성하여 Pub/Sub 구독에서 Datadog로 로그 스트림 

로그 싱크에서 생성한 로그 필터로 GCE와 GKE 로그를 포함해 Datadog로 전송할 로그를 완전 통제할 수 있습니다. 필터 쓰기에 관한 자세한 내용은 Google의 [로그 쿼리 언어 페이지][52]를 참고하세요.

**참고**: Google Cloud Dataflow를 이용하려면 Dataflow API를 활성화해야 합니다. 자세한 내용은 Google Cloud 설명서 [API 활성화][53]를 참고하세요.

GCE나 GKE에서 실행 중인 애플리케이션에서 로그를 수집하려면 [Datadog 에이전트][54]를 사용할 수도 있습니다.

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push 구독으로 Google Cloud 로그를 수집</a>하는 단계는 다음과 같은 이유로 서비스 중단되었습니다.

- Google Cloud VPC가 있을 경우 Push 구독이 VPC 외부 엔드포인트에 접근할 수 없음
- Push 구독에서 이벤트 압축이나 일괄 처리 기능을 제공하지 않음. 로그 볼륨이 매우 적은 경우에만 사용할 수 있음

트러블슈팅이나 레거시 설정 변경용으로 <strong>Push</strong> 구독 설명서를 남겨두었습니다. 대신 Datadog Dataflow 템플릿으로 구독을 <strong>Pull</strong>하여 Google Cloud 로그를 Datadog로 전송하세요.
</div>

#### 1. Cloud Pub/Sub 주제 및 구독 생성

1. [Cloud Pub/Sub 콘솔][55]로 이동하여 새 주제를 만듭니다. 간단하게 설정하려면 **Add a default subscription** 옵션을 선택하세요.

   **참고**: **Pull** 전송 유형을 사용하여 [Cloud Pub/Sub 구독][56]을 수동으로 설정할 수도 있습니다. Pub/Sub 구독을 수동으로 만드는 경우 `Enable dead lettering` 체크박스를 **선택 해제**하세요. 자세한 내용은 [지원되지 않는 Pub/Sub 기능][57]을 참고하세요.

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="기본 구독 추가 체크박스가 선택된 Google Cloud Console 주제 생성 페이지" style="width:80%;">}}

2. 해당 주제에 `export-logs-to-datadog`과 같은 명확한 이름을 지정하고 **Create**를 클릭합니다.

3. Datadog API에서 거부된 로그 메시지를 처리하기 위해 추가 주제과 기본 구독을 생성합니다. 이 주제 이름은 `outputDeadletterTopic` [템플릿 파라미터][58] 경로 설정의 일부로 Datadog Dataflow 템플릿 내에서 사용됩니다. 실패한 메시지의 문제를 검사하고 수정한 후 [Pub/Sub to Pub/Sub 템플릿][59] 작업을 실행하여 문제를 원래 `export-logs-to-datadog` 주제로 다시 보냅니다.

4. Datadog에서는 나중에 Datadog Dataflow 템플릿에서 사용할 수 있도록 유효한 Datadog API 키 값을 사용하여 [Secret Manager][60]에서 비밀을 생성할 것을 권장합니다.

**경고**: Cloud Pub/Sub에는 [Google Cloud 할당량 및 제한사항][61]이 적용됩니다. 보유한 로그 수가 해당 제한을 초과하는 경우 Datadog에서는 로그를 여러 주제로 분할할 것을 권장합니다. 해당 제한에 도달하는 경우 모니터 알림 설정에 대한 자세한 내용은 [Pub/Sub Log Forwarding 섹션 모니터링](#monitor-the-cloud-pubsub-log-forwarding)을 참고하세요.

#### 2. 커스텀 Dataflow 작업자 서비스 계정 생성

Dataflow 파이프라인 작업자의 기본 동작은 프로젝트의 모든 리소스에 권한을 부여하는 프로젝트의 [Compute Engine 기본 서비스 계정][62]을 사용하는 것입니다. **프로덕션** 환경에서 로그를 전달하는 경우 필요한 역할과 권한만 있는 커스텀 작업자 서비스 계정을 만들고 이 서비스 계정을 Dataflow 파이프라인 작업자에 할당해야 합니다.

1. Google Cloud 콘솔의 [Service Accounts][63] 페이지로 이동하여 프로젝트를 선택합니다.
2. **CREATE SERVICE ACCOUNT**를 클릭하고 서비스 계정에 설명이 포함된 이름을 지정합니다. 그런 다음**CREATE AND CONTINUE**를 클릭합니다.
3. 필수 권한 테이블에 역할을 추가하고 **DONE**을 클릭합니다.

##### 필수 권한

| 역할                                 | 경로                                 | 설명                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][64]                 | `roles/dataflow.admin`               | 이 서비스 계정이 Dataflow 관리 작업을 수행하도록 허용합니다.                                                               |
| [Dataflow Worker][65]                | `roles/dataflow.worker`              | 이 서비스 계정이 Dataflow 작업을 실행하도록 허용합니다.                                                                     |
| [Pub/Sub Viewer][66]                 | `roles/pubsub.viewer`                | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 구독 메시지를 볼 수 있도록 허용합니다.                             |
| [Pub/Sub Subscriber][67]             | `roles/pubsub.subscriber`            | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 구독의 메시지를 사용하도록 허용합니다.                          |
| [Pub/Sub Publisher][68]              | `roles/pubsub.publisher`             | 이 서비스 계정이 실패한 메시지를 별도의 구독에 게시하도록 허용합니다. 이를 통해 로그를 분석하거나 다시 보낼 수 있습니다. |
| [Secret Manager Secret Accessor][69] | `roles/secretmanager.secretAccessor` | 이 서비스 계정이 Secret Manager의 Datadog API 키에 액세스하도록 허용합니다.                                                        |
| [Storage Object Admin][70]           | `roles/storage.objectAdmin`          | 이 서비스 계정이 파일 준비용으로 지정된 Cloud Storage 버킷을 읽고 쓸 수 있도록 허용합니다.                              |

**참고**: Dataflow 파이프라인 작업자에 커스텀 서비스 계정을 만들지 않는 경우 기본 Compute Engine 서비스 계정에 위의 필수 권한이 ​​있는지 확인하세요.

#### 3. Google Cloud Pub/Sub 주제에서 로그 내보내기

1. Google Cloud 콘솔에서 [Logs Explorer 페이지][71]로 이동합니다.
2. **Log Router** 탭에서 **Create Sink**를 선택합니다.
3. 싱크의 이름을 제공합니다.
4. _Cloud Pub/Sub_를 대상으로 선택하고 해당 목적으로 생성된 Cloud Pub/Sub 주제를 선택합니다. **참고**: Cloud Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

5. 선택적 포함 또는 제외 필터를 사용하여 싱크에 포함하려는 로그를 선택하세요. 검색어를 사용하여 로그를 필터링하거나 [샘플 함수][72]를 사용할 수 있습니다. 예를 들어 `ERROR`에서 `severity` 레벨이 있는 로그 중 10%만 포함하려면 `severity="ERROR" AND sample(insertId, 0.01)`를 사용하여 포함 필터를 만듭니다.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="심각도=ERROR 및 샘플(insertId, 0.1) 쿼리가 포함된 Google Cloud 로깅 싱크의 포함 필터" >}}

6. **Create Sink**를 클릭합니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크를 사용하여 동일한 Cloud Pub/Sub 주제로 여러 내보내기를 만들 수 있습니다.

#### 4. Dataflow 작업 생성 및 실행하기

1. Google Cloud 콘솔의 [Create job from template][73] 페이지로 이동합니다.
2. 작업 이름을 지정하고 Dataflow 리전 엔드포인트를 선택합니다.
3. **Dataflow template** 드롭다운에서 `Pub/Sub to Datadog`을 선택하면 **Required parameters** 섹션이 나타납니다.
   a. **Pub/Sub input subscription** 드롭다운에서 입력 구독을 선택합니다.
   b. **Datadog Logs API URL** 필드에 다읍을 입력합니다:  

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **참고**: 위의 URL을 복사하기 전에 페이지 오른쪽에 있는 Datadog 사이트 선택기가 [Datadog 사이트][67]로 설정되어 있는지 확인하세요.

   c. **Output deadletter Pub/Sub topic** 드롭다운에서 메시지 오류를 수신하기 위해 생성된 주제를 선택합니다.
   d. **Temporary location** 필드에 저장소 버킷의 임시 파일 경로를 지정합니다.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow 템플릿의 필수 파라미터" style="width:80%;">}}  

4. [1단계](#1-create-a-cloud-pubsub-topic-and-subscription)에서 언급한 대로 Datadog API 키 값을 사용하여 Secret Manager에서 비밀을 생성한 경우 **Google Cloud Secret Manager ID** 필드에서 해당 비밀의 **리소스 이름**을 입력하세요.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow 템플릿의 선택적 파라미터(Google Cloud Secret Manager ID 및 전달된 API 키의 소스 필드가 모두 강조 표시됨)." style="width:80%;">}}  

사용 가능한 다른 옵션 사용에 대한 자세한 내용은 Dataflow 템플릿의 [템플릿 파라미터][58]를 참고하세요.

   - `apiKeyKMSEncryptionKey`와 함께 `apiKeySource=KMS`를  [Cloud KMS][74] 키 ID로 설정하고 `apiKey`를 암호화된 API 키로 설정 
   - **권장하지 않음**: `apiKey`와 `apiKeySource=PLAINTEXT`가 플레인 텍스트 API 키로 설정된 경우

5. 커스텀 작업자 서비스 계정을 만든 경우 **Service account email** 드롭다운에서 해당 계정을 선택합니다.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="서비스 계정 이메일 드롭다운이 강조표시된 Datadog Dataflow 템플릿의 선택적 파라미터" style="width:80%;">}}

6. **RUN JOB**을 클릭합니다.

**참고**: 공유 VPC가 있는 경우 `Network` 및 `Subnetwork` 파라미터 지정과 관련한 지침은 Dataflow 설명서 [네트워크 및 서브네트워크 지정][75] 페이지를 참고하세요.

#### 검증

Cloud Pub/Sub 주제에 전달된 새로운 로깅 이벤트가 [Datadog Log Explorer][76]에 표시됩니다.

**참고**: [Google Cloud Pricing Calculator][77]를 사용하여 잠재적 비용을 계산할 수 있습니다.

#### Cloud Pub/Sub 로그 전달 모니터링

[Google Cloud Pub/Sub 통합][30]은 로그 전달 상태를 모니터링하는 데 유용한 메트릭을 제공합니다.

   - 전달 보류 중인 메시지 수: `gcp.pubsub.subscription.num_undelivered_messages`
   - 구독에서 가장 오래된 확인되지 않은 메시지의 기간: `gcp.pubsub.subscription.oldest_unacked_message_age`

[메트릭 모니터][78]와 함께 위 메트릭을 사용해 입력 및 데드레터 구독 메시지와 관련한 경고를 받습니다.

#### Dataflow 파이프라인 모니터링

Datadog의 [Google Cloud Dataflow 통합][9]을 사용하여 Dataflow 파이프라인의 모든 측면을 모니터링하세요. Dataflow 워크로드를 실행하는 GCE 인스턴스 및 Pub/Sub 처리량에 대한 정보와 같은 상황별 데이터가 풍부한 기본 대시보드에서 모든 주요 Dataflow 메트릭을 확인할 수 있습니다.

사전 설정된 [권장 모니터][79]를 사용하여 파이프라인의 백로그 시간 증가와 관련한 알림을 설정할 수도 있습니다. 자세한 내용은 Datadog 블로그에서 [Datadog으로 Dataflow 파이프라인 모니터링하기][79]를 읽어보세요.

## 수집한 데이터

### 메트릭

메트릭에 대해서는 개별 Google Cloud 통합 페이지를 참조하세요.

#### 누적 메트릭

누적 메트릭은 각 메트릭 이름에 대한 `.delta` 메트릭과 함께 Datadog으로 가져옵니다. 누적 메트릭은 시간이 지남에 따라 값이 지속적으로 증가하는 메트릭입니다. 예를 들어 `sent bytes` 메트릭은 누적될 수 있습니다. 각 값은 해당 시점에 서비스에서 보낸 총 바이트 수를 기록합니다. 델타 값은 이전 측정 이후의 변화를 나타냅니다.

예시:

`gcp.gke.container.restart_count`는 CUMULATIVE 메트릭입니다. 이 메트릭을 누적 메트릭으로 가져오는 동안 Datadog은 델타 값(CUMULATIVE 메트릭의 일부로 방출된 집계 값과 반대)을 포함하는 `gcp.gke.container.restart_count.delta` 메트릭을 추가합니다. 자세한 내용은 [Google Cloud 메트릭 종류][81]를 참고하세요.

### 이벤트

Google Cloud Platform에서 생성된 모든 서비스 이벤트는 [Datadog Events Explorer][82]로 전달됩니다.

### 서비스 점검

Google Cloud Platform 통합에는 서비스 검사가 포함되지 않습니다.

### 태그

태그는 다양한 Google Cloud Platform 및 Google Compute Engine 설정 옵션에 따라 자동으로 할당됩니다. `project_id` 태그가 모든 메트릭에 추가됩니다. 추가 태그는 가능한 경우 Google Cloud Platform에서 수집되며 메트릭 유형에 따라 다릅니다.

또한 Datadog은 다음을 태그로 수집합니다.

- `<key>:<value>` 라벨이 있는 모든 호스트.
- Google Pub/Sub, GCE, Cloud SQL, Cloud Storage의 커스텀 라벨.

## 트러블슈팅

### 사용자 정의 gcp.logging 메트릭에 대한 메타데이터가 잘못되었나요?

[Datadog의 기본 로깅 메트릭][83] 이외의 메트릭과 같은 비표준 _gcp.logging_ 메트릭의 경우 적용된 메타데이터가 Google Cloud Logging과 일치하지 않을 수 있습니다.

이러한 경우 [메트릭 요약 페이지][84]로 이동하여 문제의 메트릭을 검색 및 선택한 후 메타데이터 옆에 있는 연필 아이콘을 클릭하여 메타데이터를 수동으로 설정해야 합니다.

도움이 필요하신가요? [Datadog 지원팀][85]에 문의하세요.

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
[29]: https://docs.datadoghq.com/ko/integrations/google_cloud_private_service_connect/
[30]: https://docs.datadoghq.com/ko/integrations/google_cloud_pubsub/
[31]: https://docs.datadoghq.com/ko/integrations/google_cloud_spanner/
[32]: https://docs.datadoghq.com/ko/integrations/google_cloud_storage/
[33]: https://docs.datadoghq.com/ko/integrations/google_cloud_vertex_ai/
[34]: https://docs.datadoghq.com/ko/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[37]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[38]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[39]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[40]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[41]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[42]: /ko/integrations/google_cloud_platform/
[43]: https://console.cloud.google.com/
[44]: https://app.datadoghq.com/integrations/google-cloud-platform
[45]: https://cloud.google.com/compute/docs/labeling-resources
[46]: https://cloud.google.com/dataflow
[47]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[48]: https://cloud.google.com/pubsub/docs/create-topic
[49]: https://cloud.google.com/pubsub/docs/create-subscription
[50]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[51]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[52]: https://cloud.google.com/logging/docs/view/logging-query-language
[53]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[54]: https://docs.datadoghq.com/ko/agent/
[55]: https://console.cloud.google.com/cloudpubsub/topicList
[56]: https://console.cloud.google.com/cloudpubsub/subscription/
[57]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[58]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[59]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[60]: https://console.cloud.google.com/security/secret-manager
[61]: https://cloud.google.com/pubsub/quotas#quotas
[62]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[63]: https://console.cloud.google.com/iam-admin/serviceaccounts
[64]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[65]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[66]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[67]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[68]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[69]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[70]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[71]: https://console.cloud.google.com/logs/viewer
[72]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[73]: https://console.cloud.google.com/dataflow/createjob
[74]: https://cloud.google.com/kms/docs
[75]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[76]: https://app.datadoghq.com/logs
[77]: https://cloud.google.com/products/calculator
[78]: https://docs.datadoghq.com/ko/monitors/types/metric/
[79]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[80]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[81]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[82]: https://app.datadoghq.com/event/stream
[83]: https://docs.datadoghq.com/ko/integrations/google_stackdriver_logging/#metrics
[84]: https://app.datadoghq.com/metric/summary
[85]: https://docs.datadoghq.com/ko/help/