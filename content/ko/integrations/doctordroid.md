---
app_id: doctordroid
app_uuid: 5e75658c-065e-460f-b9f8-42bf100e361d
assets:
  dashboards:
    doctor_droid_overview: assets/dashboards/doctor_droid_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10443
    source_type_name: doctor_droid
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.drdroid.io
  name: Doctor Droid
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
categories:
- 자동화
- incidents
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/doctordroid/README.md
display_on_public_website: true
draft: false
git_integration_title: doctordroid
integration_id: doctordroid
integration_title: Doctor Droid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: doctordroid
public_title: Doctor Droid
short_description: 경고를 분석하고, 추세를 파악하고, 노이즈와 커버리지를 개선하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Automation
  - Category::Incidents
  - Offering::Integration
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Traces
  - Queried Data Type::Events
  - Queried Data Type::Incidents
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 경고를 분석하고, 추세를 파악하며, 노이즈와 커버리지를 개선하세요.
  media:
  - caption: Doctor Droid 개요 대시보드
    image_url: images/doctor_droid_overview.png
    media_type: image
  - caption: Datadog 경고 발생 추세
    image_url: images/alert_occurence_count_trends.png
    media_type: image
  - caption: Top 5 경고 발생 분포
    image_url: images/top_5_alerts_distribution.png
    media_type: image
  - caption: Top 10 평생 경고 유형 및 영향을 받는 서비스
    image_url: images/top_10_lifetime_alert_counts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Doctor Droid는 디버깅 및 진단 워크플로 간소화에 도움이 되는 경고 강화 및 조사 도구입니다.
* 경고가 트리거되면 자동으로 Datadog, 클라우드 제공업체 및 기타 옵저버빌리티 도구에서 메트릭을 가져오고 _관련 데이터를 팀에 다시 표시_합니다.
* 몇 초 안에 Datadog 대시보드 및 각 모니터에 조사 인사이트를 게시하여 기존 워크플로 내에서 쉽게 액세스하고 검토할 수 있습니다.
* 팀의 요구 사항과 애플리케이션 아키텍처를 기반으로 커스터마이징할 수 있습니다.

Datadog 통합은 Datadog 내에서 사용 중인 기능과 필요한 조사 유형을 기준으로 메트릭, 트레이스 및/또는 이벤트를 가져옵니다.

## 설정

### 설치
1. Datadog에서 [Doctor Droid 통합 타일][1]로 이동합니다. 
1. *Configure* 탭에서 **Connect Accounts**를 클릭합니다. [Doctor Droid][2] 내에서 통합 페이지로 이동합니다.
1. Doctor Droid에서 [통합 페이지][3]로 이동한 다음 Datadog 통합을 추가합니다.
1. Datadog OAuth 흐름에 대한 지침에 따라 Doctor Droid가 Datadog 계정에서 APM 및 인프라스트럭처 메트릭을 쿼리할 수 있도록 액세스 권한을 부여합니다.

### 구성
통합을 추가한 후 Doctor Droid 내에서 경고 기록을 탐색하여 추세를 알아보세요. 보고서와 플레이북을 만들어 생성된 경고 데이터를 강화할 수 있습니다.

## 삭제

Doctor Droid에서 Datadog 통합을 제거하려면:
1.  [Doctor Droid 통합 페이지][3]로 이동합니다. 
1. **Delete**를 클릭합니다. 
1. [Datadog 통합 페이지][4]로 이동한 다음 Doctor Droid의 통합 타일을 찾아서 선택합니다.
1. Doctor Droid 통합 타일에서 **Uninstall Integration** 버튼을 클릭하여 Datadog에서 제거합니다.

이 통합을 제거한 후에는 이전 인증이 모두 취소됩니다.

또한 [API Keys 관리 페이지][5]에서 통합 이름을 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인합니다.

## 지원

도움이 필요하신가요? [Doctor Droid 지원팀][6]에 문의하세요.

[1]: https://app.datadoghq.com/integrations?integrationId=doctordroid
[2]: https://alertops-app.drdroid.io/
[3]: https://alertops-app.drdroid.io/integrations
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Doctor%20Droid
[6]: mailto:support@drdroid.io