---
algolia:
  subcategory: Marketplace 통합
app_id: doctor-droid-doctor-droid
app_uuid: 21cab2f6-0f10-4302-9b61-7d99433a9294
assets: {}
author:
  homepage: https://drdroid.io/
  name: Doctor Droid
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
  vendor_id: doctor-droid
categories:
- ai/ml
- 자동화
- incidents
- alerting
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: doctor_droid_doctor_droid
integration_id: doctor-droid-doctor-droid
integration_title: Doctor Droid
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: doctor_droid_doctor_droid
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: datadog.marketplace.doctor-droid.usage
  product_id: doctor-droid
  short_description: 쿼리 100개당 $10(처음 100개 쿼리는 무료)
  tag: queries
  unit_label: queries
  unit_price: 10.0
public_title: Doctor Droid
short_description: 자동화된 근본 원인 분석, On-call Intelligence 및 Runbook 자동화
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - 카테고리::자동화
  - Category::Incidents
  - Category::Alerting
  - Category::Marketplace
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Offering::Software License
  configuration: README.md#Setup
  description: 자동화된 근본 원인 분석, On-call Intelligence & Runbook 자동화
  media:
  - caption: 워크스페이스에 Doctor Droid의 Slack 통합을 추가하세요.
    image_url: images/1.png
    media_type: image
  - caption: 모니터에 Doctor Droid 웹훅을 대상으로 추가하세요.
    image_url: images/2.png
    media_type: image
  - caption: Doctor Droid에서 기존 플레이북을 연결하세요.
    image_url: images/3.png
    media_type: image
  - caption: 받은 편지함에서 직접 플레이북 분석에 대한 응답을 받으세요.
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Doctor Droid은 모니터링 및 옵저버빌리티 관련 문제 해결 도구를 구축합니다. Doctor Droid Playbooks는 반복적인 수동 작업을 간소화하여 엔지니어의 수고를 덜어주는 자동화 도구입니다.

Doctor Droid는 다양한 데이터 소스와 원활하게 통합되며 강력한 사용자 정의 플레이북을 생성할 수 있는 플랫폼을 제공합니다. 또한 로그 검색, 데이터베이스 쿼리, 메트릭 모니터링, 운영 메트릭 통합 보기에 대해서도 지원합니다.

Doctor Droid는 시스템 전반의 다른 이상 징후에 대해 Datadog 계정의 알림을 강화하고 자동 분석합니다.

**사용 방법**

1.  [Doctor Droid 통합][1]을 설치합니다.
2.  Doctor Droid의 조사 단계를 플레이북으로 정의합니다(예: 다운스트림 메트릭 확인, 최근 배포 확인, 오류 로그 확인 등).
3.  모니터에 Doctor Droid 웹훅을 추가합니다.
4.  모니터가 트리거되면 자동으로 조사 요약 및 인사이트를 얻을 수 있습니다.

## 지원

도움이 필요하시면 support@drdroid.io로 문의해 주세요.


[1]: https://app.datadoghq.com/integrations/doctordroid

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/doctor-droid-doctor-droid" target="_blank">Marketplace에서 구매하세요</a>.