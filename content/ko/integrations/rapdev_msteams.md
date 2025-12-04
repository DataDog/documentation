---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-msteams
app_uuid: 38da0072-43b5-44e8-a303-1e504bcc0879
assets:
  dashboards:
    MS Teams CQ Call Overview: assets/dashboards/ms_teams_cq_call_overview.json
    MS Teams CQ Lookup Metadata: assets/dashboards/ms_teams_cq_lookup_metadata.json
    MS Teams CQ Lookup Performance Classifiers: assets/dashboards/ms_teams_cq_lookup_performance_classifiers.json
    MS Teams CQ User Devices: assets/dashboards/ms_teams_cq_user_devices.json
    MS Teams CQ User Experience: assets/dashboards/ms_teams_cq_user_experience.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.msteams.call.duration
      metadata_path: metadata.csv
      prefix: rapdev.msteams.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10297
    source_type_name: RapDev MSTeams
  logs:
    source: rapdev_msteams
  monitors:
    Call session packet utilization is poor: assets/monitors/performance_audio_packet_utilization.json
    Network jitter is too high: assets/monitors/performance_audio_average_jitter.json
    Packet loss rate is too high: assets/monitors/performance_audio_packet_loss.json
    Roundtrip time is too high: assets/monitors/performance_audio_rtt.json
    Video frame loss is too high: assets/monitors/performance_video_frame_loss_percentage.json
    Video frame rate is too low: assets/monitors/performance_video_average_frame_rate.json
    Video packet loss is too high after packet corrections: assets/monitors/performance_video_fecplr.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 협업
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_msteams
integration_id: rapdev-msteams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_msteams
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.msteams
  product_id: msteams
  short_description: 회의 참석자당 단가
  tag: meeting_participant
  unit_label: 회의 참석자
  unit_price: 0.1
public_title: Microsoft Teams
short_description: 사용자 및 디바이스의 Microsoft Teams 통화 품질 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: 사용자 및 디바이스의 Microsoft Teams 통화 품질 모니터링
  media:
  - caption: 통화 품질 개요
    image_url: images/1.jpg
    media_type: image
  - caption: 통화 품질 사용자 경험 개요
    image_url: images/2.jpg
    media_type: image
  - caption: 통화 품질 사용자 경험 오디오 및 비디오
    image_url: images/3.jpg
    media_type: image
  - caption: 통화 품질 사용자 디바이스
    image_url: images/4.jpg
    media_type: image
  - caption: 성능 지표 구분값 룩업 테이블
    image_url: images/5.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 개요

RapDev Microsoft Teams 통합은 통화 품질 보고서를 모니터링하고 통화 활동과 경험에 관한 인사이트를 제공하는 메트릭, 모니터, 대시보드를 제공합니다.

이 통합에는 다음이 포함됩니다.
1. 여러 대시보드
2. 통화 품질 메트릭 모니터링에 권장되는 모니터
3. 통화 메타데이터 및 성능 지표 구분값에 관한 메트릭 룩업 테이블

Microsoft Teams 통합에는 Active Directory 테넌트에 대한 최소한의 권한이 필요하며 설치가 간편하여 조직에서 Microsoft Teams 통화 품질 보고서를 빠르게 배포하고 보고를 시작할 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널로 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io 
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222 

---

Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*


---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-msteams" target="_blank">Marketplace에서 구매하세요</a>.