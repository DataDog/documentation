---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-gmeet
app_uuid: 0aa39e5e-89dd-4437-8411-33ca5a69174f
assets:
  dashboards:
    Google Meet Dashboard: assets/dashboards/google_meet_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.gmeet.call_ended
      metadata_path: metadata.csv
      prefix: rapdev.gmeet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10434
    source_type_name: RapDev Gmeet
  monitors:
    Google Meets Integration Failed to Connect: assets/monitors/rapdev_google_meet_monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 협업
- 이벤트 관리
- marketplace
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gmeet
integration_id: rapdev-gmeet
integration_title: Google Meet
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gmeet
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.gmeet
  product_id: gmeet
  short_description: 활성 사용자당 유닛 비용
  tag: display_name
  unit_label: 활성 사용자
  unit_price: 1
public_title: Google Meet
short_description: Google Meet 미팅 세부 정보 및 성과를 메트릭과 이벤트로 시각화합니다.
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
  - Category::Collaboration
  - '카테고리:: 이벤트 관리'
  - Category::Marketplace
  - 카테고리::메트릭
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Google Meet 미팅 세부 정보 및 성과를 메트릭과 이벤트로 시각화합니다.
  media:
  - caption: RapDev Google Meet 개요 대시보드
    image_url: images/dashboard_example.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Google Meet
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
Google Meet은 회의 및 통화를 위한 화상 커뮤니케이션 서비스입니다.

Google Meet 통합은 통화가 종료되는 즉시 통화 성능 메트릭을 보고합니다. 본 통합은 오디오, 비디오, 화면 캐스팅 전반의 레이턴시를 보고하여 통화 성능을 모니터합니다. 또한 사용자가 미팅에서 나가면 Datadog으로 이벤트가 전송되어 조직 전체의 인구 통계를 시각화할 수 있습니다.
다음은 수집되는 인사이트입니다.
- 조직에서 주최하는 미팅에 참여하는 외부 사용자 수
- 지역별 기기 유형 분석
- 사용자별 통화 시간 분석
- 통화 품질 등급 분석 및 요약

참고: 워크스페이스에서 이 정보를 폴링하도록 내부 서비스 계정을 설정하려면 Google Workspace Admin이 서비스 계정에 도메인 전체 권한을 위임해야 합니다.

### 메트릭 수집

`conf.yaml` 파일에서 Datadog으로 보고할 파라미터를 사용자 지정합니다.

이 통합은 [Google Activities API][2]가 반환하는 내용을 바탕으로 Datadog에 메트릭을 전송합니다. 본 통합은 [발신자 이탈 이벤트][3]를 활용합니다. 
추가 메트릭을 가져오려면 `conf.yaml`에 `network_recv_jitter_msec_max`와 같은 추가 필드를 추가합니다.

각 메트릭에는 다음 태그가 포함됩니다.
  - `meeting_code`: Google Meet 회의의 미팅 코드(예: 'abc-hexp-tqy')입니다. 반복되는 회의는 동일한 미팅 코드를 사용합니다.
  - `location_country`: 참가자가 합류한 국가입니다.
  - `organizer_email`: 미팅 생성자의 이메일 주소입니다.
  - `location_region`: 참가자가 참여한 국가 내의 도시 또는 지리적 위치(예: 보스턴)입니다.
  - `ip_address`: 참가자의 외부 IP 주소입니다.
  - `device_type`: 참가자의 기기 유형(예: Android,  Chromebox, iOS, Web, Jamboard, PSTN_IN)입니다.
  - `identifier`: 고유 참가자 식별자(예: 이메일 주소, 전화번호 또는 디바이스 ID)입니다.
  - `display_name`: 회의에 표시되는, 사람이 읽을 수 있는 사용자 이름입니다.
  - `is_external`: 참가자가 조직 외부인인지 나타냅니다. 기본적으로 Google Admin API는 외부 참가자의 식별자 일부를 마스킹합니다.

`conf.yaml` 파일의 기본 메트릭은 대부분의 사용 사례에 충분합니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

- 지원 팀: [support@rapdev.io][9]
- 영업 팀: [sales@rapdev.io][1]
- 채팅: [rapdev.io][10]
- 전화: 855-857-0222
---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: mailto:sales@rapdev.io
[2]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet
[3]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet#call_ended
[4]: https://console.cloud.google.com/projectcreate
[5]: https://console.cloud.google.com/apis/library/admin.googleapis.com
[6]: https://console.cloud.google.com/iam-admin/serviceaccounts/create
[7]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: mailto:support@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-gmeet" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.