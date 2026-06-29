---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-hpux-agent
app_uuid: 5e611b0d-a099-4823-a4ba-e42b1012b3b5
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.hpux_agent
      metadata_path: metadata.csv
      prefix: rapdev.hpux_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10185
    source_type_name: RapDev HP-UX 에이전트
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_hpux_agent
integration_id: rapdev-hpux-agent
integration_title: HP-UX 에이전트
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_hpux_agent
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.hpux_agent
  product_id: hpux-agent
  short_description: 호스트별 유닛 비용
  tag: 호스트
  unit_label: HP-UX 에이전트
  unit_price: 100.0
public_title: HP-UX 에이전트
short_description: hppa 및 itanium용 HP-UX 11.31에 대한 메트릭을 제공하는 시스템 에이전트
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: hppa 및 itanium용 HP-UX 11.31에 대한 메트릭을 제공하는 시스템 에이전트
  media:
  - caption: 인프라스트럭처 목록
    image_url: images/1.png
    media_type: image
  - caption: 호스트 메트릭
    image_url: images/2.png
    media_type: image
  - caption: 로그
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: HP-UX 에이전트
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 개요

HP-UX 에이전트로 Datadog 내에서 시스템 메트릭을 수집 및 보고할 수 있습니다. 본 통합은 PA-RISC 및 Itanium 아키텍처 모두에서 HP-UX 11.31을 지원합니다. HP-UX 에이전트는 기본 HP-UX Perl 시스템 배포를 사용하며 추가 라이브러리 종속성이 필요하지 않아 설치 및 호환성이 간소화됩니다.

HP-UX 에이전트는 Datadog 인프라스트럭처 목록을 지원하는 데 필요한 호스트 메타데이터를 제공하여 조직이 지원되는 다른 Datadog 호스트 운영 체제와 유사한 HP-UX 호스트 시스템으로 작업할 수 있도록 도와드립니다.

HP-UX 에이전트는 기본 에이전트와 동일한 URL 및 포트를 사용합니다. HP-UX 에이전트는 현재 코어 인프라스트럭처 메트릭, 프로세스 점검, 로그 테일을 지원합니다. 커스텀 에이전트 점검, 통합 또는 서비스 점검은 지원하지 않습니다.

## 지원

지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io 
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222 

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.