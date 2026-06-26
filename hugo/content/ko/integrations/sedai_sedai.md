---
algolia:
  subcategory: Marketplace 통합
app_id: sedai-sedai-license
app_uuid: a87aa14a-36af-42dd-850e-30fc70c8cd91
assets: {}
author:
  homepage: http://www.sedai.io
  name: Sedai
  sales_email: sales@sedai.io
  support_email: support@sedai.io
  vendor_id: sedai
categories:
- 자동화
- cloud
- 비용 관리
- marketplace
- 알림
- orchestration
- 프로비저닝
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sedai_sedai
integration_id: sedai-sedai-license
integration_title: Sedai
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: sedai_sedai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: sedai
  short_description: 월별 라이선스(최대 1,300만 건 호출까지).
  unit_price: 125.0
public_title: Sedai
short_description: 클라우드 애플리케이션을 지능적으로 관리하는 자율 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - "\b카테고리::클라우드"
  - Category::Cost Management
  - Category::Marketplace
  - Category::Notifications
  - Category::Orchestration
  - 카테고리::프로비저닝
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 클라우드 애플리케이션을 지능적으로 관리하는 자율 플랫폼
  media:
  - caption: Sedai는 프로덕션 환경의 모든 기능을 지속적으로 최적화하여 성능을 향상시킵니다.
    image_url: images/sedai_1.png
    media_type: image
  - caption: Sedai는 Lambda 함수를 자율적으로 최적화하여 성능을 향상시킵니다. 실행 시간이 줄어들면 더 빠른 Lambda 함수를
      경험할 수 있습니다.
    image_url: images/sedai_2.png
    media_type: image
  - caption: Sedai를 사용하면 전역 설정 또는 개별 함수 수준에서 최적화 파라미터를 정의할 수 있습니다. 비용이나 성능, 또는 두 마리
      토끼를 다 잡으세요!
    image_url: images/sedai_3.png
    media_type: image
  - caption: Sedai는 모든 애플리케이션 또는 기능에 SLO를 자율적으로 설정 및 유지합니다.
    image_url: images/sedai_4.png
    media_type: image
  - caption: Sedai는 프로덕션 환경에 배포한 릴리스를 분석하여 최근 릴리스와 비교한 성능, 오류, 시간 초과, 실행 시간 등을 기준으로
      점수를 매깁니다.
    image_url: images/sedai_5.png
    media_type: image
  - caption: 프로덕션 환경에서 Sedai가 실행할 수정 작업을 선택합니다.
    image_url: images/sedai_6.png
    media_type: image
  - caption: Sedai는 OOTB 대시보드를 자동 입력하여 Datadog에서 Sedai가 하는 모든 작업을 즉시 시각화합니다!
    image_url: images/sedai_7.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/autonomous-cloud-management-aws-lambda-sedai-datadog/
  support: README.md#Support
  title: Sedai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 개요

Sedai는 프로덕션을 선제적으로 관리하여 환경 문제를 예방하고 가용성, 성능 및 클라우드 비용을 개선하는 자율 클라우드 플랫폼입니다. SRE를 위한 지능형 자동 조종 장치인 Sedai는 모니터링 데이터를 독립적으로 감지, 우선순위를 지정 및 분석하여 임계값 없이 안전하고 자율적으로 프로덕션에서 작동합니다.

Datadog 통합과 당사 소프트웨어 라이선스를 같이 사용하면, Sedai가 프로덕션 환경에서 자율적으로 실행하는 작업의 알림을 Datadog에서 받아볼 수 있습니다.

### 작동 방식

* **에이전트 없이 사용 가능:** 클라우드 계정에 원활하게 연결하여 프로덕션 환경을 자동으로 검색하고 이해합니다.

* **무료 구성:** Datadog API 에 쉽게 연결하여 메트릭 행동을 지능적으로 식별하고 우선순위를 정해 학습합니다.

* **선제적 조치:** 사용자를 대신해 프로덕션 환경에서 안전하게 작업하여 리소스가 가용성 문제를 방지하고 항상 최적으로 실행되도록 합니다.

## 지원

지원이나 기능 요청은 다음 채널을 통해 Sedai에 문의하세요.

- 이메일: [support@sedai.io][5]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Sedai 및 Datadog으로 AWS Lambda 배포 자율 최적화][6]

[1]: mailto:support@sedai.io
[2]: https://app.datadoghq.com/integrations/sedai
[3]: https://www.sedai.io/
[4]: mailto:sales@sedai.io
[5]: mailto:support@sedai.io
[6]: https://www.datadoghq.com/blog/autonomous-cloud-management-aws-lambda-sedai-datadog/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/sedai-sedai-license" target="_blank">Marketplace에서 구매하세요</a>.