---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-zoom
app_uuid: a79217b7-6499-4de5-8ebd-73a91d227644
assets:
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Phones Overview: assets/dashboards/rapdev_zoom_phones_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.zoom.meetings.count
      metadata_path: metadata.csv
      prefix: rapdev.zoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10150
    source_type_name: RapDev Zoom
  logs: {}
  monitors:
    API usage has hit the rate limit: assets/monitors/zoom_api_rate_limit.json
    Zoom Room has a problem: assets/monitors/zoom_room_has_problem.json
    Zoom Room's Component has a problem: assets/monitors/zoom_room_component_has_problem.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 클라우드
- 협업
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_zoom
integration_id: rapdev-zoom
integration_title: Zoom
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_zoom
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.zoom
  product_id: zoom
  short_description: 사용자 또는 장치당 유닛 비용
  tag: zoom_user_email
  unit_label: Zoom 등록 사용자 및 Phone 장치
  unit_price: 1
public_title: Zoom
short_description: Zoom 계정 모니터링 및 라이선스 최적화
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Zoom 계정 모니터링 및 라이선스 최적화
  media:
  - caption: 미팅 개요
    image_url: images/meetings.png
    media_type: image
  - caption: Zoom Rooms 대시보드
    image_url: images/rooms.png
    media_type: image
  - caption: 미팅 품질 개요
    image_url: images/meeting_quality.png
    media_type: image
  - caption: 사용자 세부 정보 대시보드
    image_url: images/user_details.png
    media_type: image
  - caption: 지리적 위치 개요
    image_url: images/geo.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Zoom 통합은 미팅, 룸, 사용자, 네트워크 통계 및 지리적 위치 개요를 모니터링하는 기능을 갖추고 있어 전 세계 어디서든 직원에게 최적의 환경을 제공해 드립니다. 본 통합에는 가장 중요한 정보가 잘 보이게 표시되는, 사용자 지정 가능한 대시보드 4개가 기본 내장되어 있습니다. 또한 최고 경영진, 관리자, 기술 책임자, 엔지니어 등에게 변경 없이 전달할 수 있도록 시각화를 설계하였습니다!

### 모니터링

1. Zoom Room에 문제가 있음
2. Zoom Room의 구성요소에 문제가 있음

### 대시보드

1. RapDev Zoom Meetings 개요
2. RapDev Zoom Rooms 대시보드
3. RapDev Zoom Meetings 품질
4. RapDev Zoom 사용자 세부 정보
5. RapDev Zoom Geo 개요
6. RapDev Zoom Phones 개요

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원 팀: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information


---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-zoom" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.