---
algolia:
  subcategory: Marketplace 통합
app_id: fairwinds-insights
app_uuid: a488d774-fd45-4765-b947-e48792c6ab32
assets:
  dashboards:
    Insights Overview: assets/dashboards/overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: fairwinds.insights.action_items
      metadata_path: metadata.csv
      prefix: fairwinds.insights.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10112
    source_type_name: Fairwinds Insights
author:
  homepage: https://www.fairwinds.com
  name: Fairwinds
  sales_email: datadog-marketplace@fairwinds.com
  support_email: insights@fairwinds.com
  vendor_id: fairwinds
categories:
- 컨테이너
- cost management
- 쿠버네티스(Kubernetes)
- marketplace
- 프로비저닝
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fairwinds_insights
integration_id: fairwinds-insights
integration_title: Fairwinds Insights
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: fairwinds_insights
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.fairwinds.insights
  product_id: insights
  short_description: Kubernetes 보안 및 거버넌스 소프트웨어
  tag: insights_node
  unit_label: Kubernetes Node
  unit_price: 100
public_title: Fairwinds Insights
short_description: 미션 크리티컬 Kubernetes 애플리케이션을 보호하고 최적화하세요
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Provisioning
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 미션 크리티컬 Kubernetes 애플리케이션을 보호하고 최적화하세요
  media:
  - caption: Fairwinds Insights는 보안 경고, 가드레일, 규정 준수 결과, 비용 최적화 조언을 제공하는 Kubernetes
      거버넌스 및 보안 소프트웨어입니다. Fairwinds Insights는 Datadog과 통합되므로 한 곳에서 모든 보고서를 볼 수 있습니다.
    image_url: images/Video_Front_Cover.png
    media_type: 비디오
    vimeo_id: 619368230
  - caption: Fairwinds Insights Admission Controller는 클러스터에 새 리소스가 추가될 때마다 실행됩니다.
      리소스가 조직의 정책을 위반하는 경우 Admission Controller는 이를 거부하고 클라이언트에게 알립니다.
    image_url: images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights는 보안 설정에 대해 여러 클러스터를 지속적으로 모니터링하여 리스크를 줄이고 모범 사례를 준수하는지
      확인합니다. Insights는 컨테이너 및 Kubernetes 리스크를 정확히 찾아내고 위험 우선순위를 지정하며 해결 가이드 및 상태 추적을
      제공합니다.
    image_url: images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    media_type: image
  - caption: 팀은 OPA를 통해 맞춤형 정책을 구축 및 시행하고 CI/CD 파이프라인, 승인 컨트롤러 및 클러스터 내 에이전트를 포함한
      Fairwinds Insights의 모든 부분에 통합할 수 있습니다. Insights에는 OPA 템플릿 라이브러리가 포함되어 있습니다.
    image_url: images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    media_type: image
  - caption: Insights는 CPU 및 메모리 사용량을 모니터링하여 리소스 제한 및 요청에 대한 권장 사항을 제공합니다. Kubernetes
      워크로드에 대한 CPU 및 메모리 활용 효율성을 극대화합니다.
    image_url: images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights는 CI/CD 파이프라인에 긴밀하게 통합되어 보안에 대한 부담을 덜어줍니다. DevOps 팀은
      수동 개입 없이도 CI/CD 전반에서 잘못된 구성을 방지하고 개발자에게 수정 사항을 제공할 수 있습니다. 개발자는 안전망이 갖춰진 상태에서
      자유롭게 개발할 수 있습니다.
    image_url: images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights는 컨테이너 런타임 모니터링을 제공하고 CI/CD 프로세스에 통합됩니다. Insights는
      컨테이너의 알려진 취약점을 추적하고 심각도에 따라 발견 사항의 우선순위를 정하며 해결 방법을 제공합니다. 교정 상태 추적을 위해 티켓팅
      및 할당 워크플로와 통합됩니다.
    image_url: images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
  - resource_type: 설명서
    url: https://insights.docs.fairwinds.com/
  support: README.md#Support
  title: Fairwinds Insights
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

미션 크리티컬 Kubernetes 애플리케이션을 보호하고 최적화하는 소프트웨어

#### 개발부터 운영까지 핸드오프 간소화

* 여러 클러스터에 걸쳐 사용자 맞춤 정책 정의 및 제어
* 승인 컨트롤러를 통해 가드레일과 모범 사례 강화
* CI/CD 워크플로에 컨테이너 스캐닝 및 배포 검증 통합

#### Kubernetes 비용 모니터링 및 최적화

* 워크로드 리소스 사용량 및 예상 비용에 대한 가시성 확보
* 워크로드에 적합한 CPU 및 메모리 설정 결정

#### 시간 절약

* Kubernetes 구성 권장 사항을 기존 Datadog 대시보드와 통합
* Slack 통합으로 협업 개선

#### 리스크 감소

* 알려진 취약점이 있는지 컨테이너 모니터링
* Kubernetes 배포 구성 검증

## 수집한 데이터

### 메트릭

Fairwinds Insights의 작업 항목은 필요한 분석을 수행할 수 있도록 태그와 함께 Datadog에 표시됩니다.

### 서비스 점검

Fairwinds Insights는 서비스 점검을 포함하지 않습니다.

### 이벤트

* 통합을 처음 설정할 때 나타나는 초기 이벤트
* Fairwinds Insights의 새로운 액션 아이템 당 이벤트
* Fairwinds Insights 이벤트 수정된 액션 아이템 당 이벤트

## 지원

지원이나 요청이 필요하시면 다음 채널을 통해 Fairwinds에 문의하세요.

- 연락처: +1 617-202-3659 
- 이메일: [sales@fairwinds.com][2]

### 자주 하는 질문

**Fairwinds Insights는 어떻게 작동하나요?**

Fairwinds Insights는 보안, 효율성, 안정성이라는 세 가지 카테고리의 Kubernetes 구성 문제에 대해 통합된 멀티 클러스터 보기를 제공합니다. Fairwinds Insights를 사용하면 하나의 Helm 설치를 통해 여러 오픈 소스 도구를 쉽게 배포할 수 있습니다. 한번 설치해 두면 엔지니어는 각 도구를 설치하고 구성하기 위한 커스텀 작업을 피할 수 있습니다. 또한 엔지니어링 팀이 Kubernetes 클러스터에 배포하기 위한 가드레일을 정의하고 시행할 수 있도록 정책 관리 기능을 추가합니다.

**플러그인이란 무엇인가요?**

소프트웨어와 통합된 도구를 '플러그인'으로 참조합니다.

** Agent란 무엇인가요?**

포함된 Helm 차트를 'Fairwinds Insights Agent'로 참조합니다.

**데이터는 어떻게 되나요?**

Fairwinds Insights는 각 플러그인의 결과를 집계하고 멀티 클러스터 뷰에 게시합니다. 이를 통해 쉽게 소비하고, 우선 순위를 지정하며 문제를 추적할 수 있습니다.

**Fairwinds Insights에는 어떤 플러그인이 포함되어 있나요?**

Fairwinds Insights는 다음과 같은 다양한 오픈 소스 도구에 대한 통합을 제공합니다 [Polaris](https://github.com/FairwindsOps/polaris), [Goldilocks](https://github.com/FairwindsOps/goldilocks/), [Open Policy Agent](https://www.openpolicyagent.org/), [Trivy Container Scanning](https://github.com/aquasecurity/trivy). 전체 목록을 보려면 [Fairwinds Insights 문서 센터](https://insights.docs.fairwinds.com/)를 방문하세요. 다음은 예시 결과의 일부입니다.

* 컨테이너 취약성
* Kubernetes 배포 관련 보안 문제(예: 루트로 실행되도록 구성된 배포)
* 클러스터 수준 약점(예: 노출된 파드, 정보 공개 등)
* Kubernetes CVE
* 오래된 Helm 차트에 대한 자동 알림
* 커스텀 Kubernetes 정책 및 구성 확인

### 환불 정책

Insights 취소 및 환불 정책

Fairwinds Insights는 월별 구독으로 제공되므로 고객은 Datadog 마켓플레이스 계정을 사용하여 언제든지 이용을 중단할 수 있습니다. 구독을 중지하면 해당 월 청구 기간의 남은 기간에 대해서만 요금이 청구됩니다. Insights는 이미 결제한 요금에 대해서는 환불을 제공하지 않습니다.

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace의 Fairwinds Insights 제품으로 Kubernetes 모니터링][2]
- [Fairwinds Insights 문서][3]

[1]: https://insights.fairwinds.com
[2]: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
[3]: https://insights.docs.fairwinds.com/
---
이 애플리케이션은 Datadog 마켓플레이스를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/fairwinds-insights" target="_blank">마켓플레이스에서 이 애플리케이션을 구매하세요</a>.