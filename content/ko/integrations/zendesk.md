---
app_id: zendesk
app_uuid: 8943eea8-230f-4b1b-9895-8d60d5593e7b
assets:
  dashboards:
    zendesk: assets/dashboards/zendesk_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - zendesk.ticket.count
      metadata_path: metadata.csv
      prefix: zendesk
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 146
    source_type_name: Zendesk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- log collection
- event management
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zendesk
integration_id: zendesk
integration_title: Zendesk
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zendesk
public_title: Zendesk
short_description: Zendesk는 고객 서비스 및 지원 티켓을 위한 SaaS(서비스형 소프트웨어)입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::로그 수집
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Zendesk는 고객 서비스 및 지원 티켓을 위한 SaaS(서비스형 소프트웨어)입니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  support: README.md#Support
  title: Zendesk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/zendesk/zendesk_dash.png" alt="Zendesk Dashboard" popup="true">}}

## 개요

Zendesk는 고객 문의를 수신, 추적, 응답하기 위한 고객 서비스 및 지원 티켓 플랫폼입니다. 이 통합을 활성화하면 Datadog 티켓 메트릭을 확인하고, Datadog에서 티켓을 생성 및 업데이트할 수 있습니다.

Zendesk와의 통합을 통해 다음 이점을 누리세요.

- 상태, 사용자, 만족도별 티켓 개수 메트릭을 모니터링하고 그래프화합니다.
- 새로운 Zendesk 티켓이 개시될 때마다 Datadog 이벤트를 수신합니다.
- 모니터 알림에서 `@zendesk` 멘션을 사용하여 티켓을 생성하고 업데이트합니다.
- [감사 로그][1]를 수집하여 보관 데이터를 관리하고 [Cloud SIEM][2] 탐지 규칙을 활용합니다.

## 설정

### 설치

이 통합을 설치하려면 Zendesk API 토큰을 생성합니다.

1. 왼쪽 메뉴에서 _관리자_ 톱니 아이콘을 클릭한 뒤, 메뉴 항목 목록의 _채널_ 섹션에서 _API_를 선택하여 API 설정 페이지로 이동합니다.
2. 이미 활성화되어 있지 않은 경우 토큰 액세스를 활성화합니다.
3. 더하기 기호를 클릭해 새로운 토큰을 생성합니다.
4. "Datadog-Zendesk 통합" 등 정보를 담은 API 토큰 설명을 설정합니다.
5. API 토큰을 복사합니다. **_중요_**: 저장되면 숨김 처리되므로 이 토큰을 임시 저장해야 합니다.
6. _Save_를 클릭하세요.

통합을 완료하려면 [Datadog][3]에 정보를 입력합니다.

1. [Zendesk 통합 타일][4]로 이동하여 _구성_ 탭을 클릭합니다.
2. Zendesk 도메인을 입력합니다. 도메인은 `zendesk.com` 전에 표시되어 있는 문자입니다. 예를 들어 Zendesk URL이 `https://my-company.zendesk.com` 인 경우 도메인은 `my-company`입니다.
3. Zendesk 사용자 이름을 입력합니다.
4. 위 5단계에서 수신한 Zendesk API 토큰을 입력합니다.
5. 설치 통합 버튼을 클릭합니다.

#### Zendesk RUM 앱 설치

Datadog [실제 사용자 모니터링(RUM)][5]을 사용하면 앱에 대한 사용자 세션을 확인하고, 최종 사용자에 대한 성능 및 오류를 이해하고, 병목 현상을 파악하고, 시간이 지남에 따른 사용자 트렌드를 분석할 수 있습니다.

Datadog RUM 앱을 사용하면, 지원 직원이 현재 선택한 Zendesk 티켓을 생성한 사용자와 연결된 최신 Datadog RUM 세션을 확인할 수 있습니다.

{{< img src="integrations/zendesk/zendesk_rum_app_1.png" alt="Zendesk RUM 앱" popup="true">}}

1. 통합 [설치 지침][6]을 따릅니다.
2. Zendesk 마켓플레이스에서 [Datadog RUM 앱][7]으로 이동하여 `Install`을 클릭합니다.
3. 앱 설치 설정을 구성합니다.
   1. Datadog API 및 애플리케이션 키는 [조직 설정][8]에서 찾을 수 있습니다. 각 키를 붙여넣기합니다.
   2. [Zendesk 통합 타일][9]로 이동하고 **RUM App Settings** 탭에서 `Secret Key`를 복사합니다. 이 키를 앱에 대한 `Secret Key` 설정 아래에 이 키를 붙여넣기합니다.
   3. [Datadog 사이트][10]를 입력합니다. 예를 들어 `us1`, `eu1`, `us3`, `us5`, `ap1` 또는 `fed`입니다.
4. [Zendesk 통합 타일][9]을 이동합니다.
5. **RUM App Settings** 탭 아래의 드롭다운 목록에서 사용자 바인딩 값을 고릅니다. 앱이 Zendesk 티켓 요청자로부터 RUM 세션을 쿼리하는 데 사용하는 사용자 속성입니다.
6. **저장**을 클릭합니다.
7. 계정에서 Zendesk 티켓으로 이동한 다음, Datadog RUM 사이드바 앱을 클릭하여 사용자 RUM 세션을 확인합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "zendesk" >}}


### 이벤트

이 통합은 새로운 Zendesk 티켓이 개시될 때마다 이벤트를 생성합니다.

{{< img src="integrations/zendesk/zendesk_event.png" alt="Datadog 이벤트 탐색기의 Zendesk 이벤트" popup="true">}}

### 서비스 점검

Zendesk 통합은 서비스 점검을 포함하지 않습니다.

## 기능

### 티켓 생성

Zendesk 티켓을 생성하여 그룹에 할당할 수 있습니다. 먼저 Datadog의 [Zendesk 통합 타일][4]에 그룹 이름을 추가한 다음, Datadog 모니터와 주석에서 `@zendesk-group-name`을 사용하세요. 예를 들어, 티켓을 생성하여 Zendesk 그룹 _지원_에 할당하려면 해당 그룹을 추가하고 `@zendesk-support`를 사용합니다.

## 참고 자료

- 블로그 게시물: [Zendesk와 Datadog Session Replay를 통해 사용자에게 발생하는 문제를 시각적으로 재생하세요.][12]

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.

[1]: https://developer.zendesk.com/api-reference/ticketing/account-configuration/audit_logs/
[2]: https://app.datadoghq.com/security/siem/home
[3]: https://app.datadoghq.com
[4]: https://app.datadoghq.com/account/settings#integrations/zendesk
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/
[6]: https://docs.datadoghq.com/ko/integrations/zendesk/#installation
[7]: https://www.zendesk.com/marketplace/apps/support/993138/datadog/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://app.datadoghq.com/integrations/zendesk
[10]: https://docs.datadoghq.com/ko/getting_started/site/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/zendesk/zendesk_metadata.csv
[12]: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
[13]: https://docs.datadoghq.com/ko/help/