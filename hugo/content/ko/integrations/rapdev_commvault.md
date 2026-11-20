---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-commvault
app_uuid: 2d6e8413-e850-4eff-a139-170946be2ffc
assets:
  dashboards:
    Rapdev Commvault Overview: assets/dashboards/rapdev_commvault_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.rapdev.commvault
      metadata_path: metadata.csv
      prefix: rapdev.commvault
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10438
    source_type_name: Rapdev Commvault
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- cloud
- marketplace
- 준수
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_commvault
integration_id: rapdev-commvault
integration_title: Commvault
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_commvault
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.commvault
  product_id: commvault
  short_description: 테라바이트당 월별 요금
  tag: terrabyte_count
  unit_label: Terrabyte
  unit_price: 10.0
public_title: Commvault
short_description: Commvault 작업, 라이브러리 상태, 경고 및 이벤트를 모니터링하세요
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - "\b카테고리::클라우드"
  - Category::Marketplace
  - Category::Compliance
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Commvault 작업, 라이브러리 상태, 경고 및 이벤트를 모니터링하세요
  media:
  - caption: Commvault Overview Dashboard
    image_url: images/full_view.png
    media_type: image
  - caption: Commvault Overview Dashboard 환경 개요 섹션 1/5
    image_url: images/overview.png
    media_type: image
  - caption: Commvault Overview Dashboard 경고 및 이벤트 개요 섹션 2/5
    image_url: images/alerts_and_events.png
    media_type: image
  - caption: Commvault Overview Dashboard 작업 운영 개요 섹션 3/5
    image_url: images/jobs.png
    media_type: image
  - caption: Commvault Overview Dashboard 라이브러리 운영 섹션 4/5
    image_url: images/libraries.png
    media_type: image
  - caption: Commvault Overview Dashboard 스토리지 풀 섹션 5/5
    image_url: images/storage_pools.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Commvault
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Commvault는 데이터베이스, 가상 머신, 애플리케이션 등 다양한 소스에서 데이터를 백업하여 데이터 보호, 사이버 복구 및 사이버 복원력을 간소화합니다. 

Rapdev Commvault 통합은 백업 환경에 대한 실시간 인사이트를 제공합니다. 이 통합을 통해 진행 중인 작업, 스토리지 라이브러리, 콘솔 경고 및 이벤트와 관련된 다양한 메트릭을 추적할 수 있습니다.

- 경고에 대한 자세한 데이터를 통해 경고의 성격, 기간 및 총 개수에 대한 정보를 지속적으로 확인하여 모든 문제에 신속하게 대응할 수 있습니다.
- 작업 모니터링 측면에서는 데이터 크기(바이트), 작업 기간 등 각 백업 작업에 대한 중요한 정보를 캡처하여 성능 최적화 및 트렌드 분석이 가능합니다.
- 스토리지 라이브러리 모니터링은 각 라이브러리에 대한 세부 정보, 사용 가능한 바이트, 지난 시간에 백업된 데이터, 총 용량, 여유 공간 및 마지막 백업 시간을 포함하여 스토리지 환경에 대한 세부적인 보기를 제공합니다.

Rapdev Commvault 통합은 Command Center의 데이터를 Datadog 계정으로 가져오므로 Datadog의 향상된 대시보드 시각화, 모니터링 및 경고 기능을 활용할 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.
- 고객지원: [support@rapdev.io][4]  
- 세일즈: [sales@rapdev.io][5]  
- 채팅: [rapdev.io][6]  
- 전화: 855-857-0222

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[2]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7  
[3]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[4]: mailto:support@rapdev.io  
[5]: mailto:sales@rapdev.io  
[6]: https://www.rapdev.io/#Get-in-touch  
[7]: https://documentation.commvault.com/v11/essential/4237_web_console.html 

---
Made with ❤️ in Boston
*다른 통합이 필요하거나 조직에 필요한 특정 기능이 있을 경우 RapDev 이메일(mailto:support@rapdev.io)로 요청해 주세요.*
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault" target="_blank">Marketplace에서 구매하세요</a>.