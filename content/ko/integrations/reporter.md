---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-reporter
app_uuid: debb66b8-6675-4273-85a2-55d806e68e1b
assets:
  dashboards:
    Reporter: assets/dashboards/reporter_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ''
    service_checks:
      metadata_path: service_checks.json
    source_type_id: 10110
    source_type_name: 리포터
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
git_integration_title: 리포터
integration_id: rapdev-reporter
integration_title: 리포터
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: 리포터
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: 리포터
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 299
public_title: 리포터
short_description: 모든 Datadog 대시보드에서 이메일 리포트 생성하기
supported_os:
- linux
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: 모든 Datadog 대시보드에서 이메일 리포트 생성하기
  media:
  - caption: 리포터 소개
    image_url: images/video.png
    media_type: 비디오
    vimeo_id: 630489700
  - caption: 이메일 보고서 샘플
    image_url: images/3.png
    media_type: image
  - caption: 리포트 설정 페이지
    image_url: images/1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 리포터
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[{{< img src="marketplace/reporter/images/video.png" alt="리포터 소개" >}}](https://www.youtube.com/watch?v=GK5cGDUr1CA)

Datadog 리포터로 리포트를 예약하고 설정된 시간 간격으로 이메일을 발송할 수 있습니다. 기존 대시보드를 선택하고 리포터 웹 애플리케이션에 URL을 추가한 후 메일 발송 간격을 설정하여 리포트를 발송합니다. 해당 리포트는 사용자에게 첨부파일로 이메일로 전송되며, 사용자는 이를 열어 볼 수 있습니다. 현재 생성하고 보낼 수 있는 리포트 수에는 제한이 없습니다.

본 통합은 Datadog 인스턴스에 **Datadog 리포터**라는 새 대시보드를 설정합니다. 이 애플리케이션은 대시보드로 이동한 다음 해당 아이프레임에서 새 사용자를 생성하여 직접 액세스할 수 있습니다. *Datadog 계정은 DD 리포터 애플리케이션에서 작동하지 않습니다. 별도의 계정을 등록해야 합니다*.

## 지원

지원 또는 기능 요청은 다음 채널로 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io 
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222 

---
 Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-reporter" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.