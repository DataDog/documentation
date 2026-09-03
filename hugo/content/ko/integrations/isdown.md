---
app_id: isdown
app_uuid: 22560cfe-27cc-492f-a978-64dfcdc3b3c0
assets:
  dashboards:
    IsDown: assets/dashboards/isdown_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10323
    source_type_name: IsDown
  oauth: assets/oauth_clients.json
author:
  homepage: https://isdown.app
  name: IsDown
  sales_email: sales@isdown.app
  support_email: support@isdown.app
categories:
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/isdown/README.md
display_on_public_website: true
draft: false
git_integration_title: isdown
integration_id: isdown
integration_title: IsDown
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: isdown
public_title: IsDown
short_description: IsDown은 기업이 모든 타사 상태 페이지를 한 곳에서 모니터링할 수 있도록 도와줍니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Offering::Integration
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: IsDown은 기업이 모든 타사 상태 페이지를 한 곳에서 모니터링할 수 있도록 도와줍니다.
  media:
  - caption: IsDown과 Datadog Flow
    image_url: images/isdown_datadog_flow.jpg
    media_type: image
  - caption: IsDown Dashboards
    image_url: images/isdown_dashboards.jpg
    media_type: image
  - caption: Datadog 대시보드
    image_url: images/isdown_datadog_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/
  support: README.md#Support
  title: IsDown
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[IsDown][1]은 기업이 종속성을 모니터링하는 데 도움이 되는 상태 페이지 애그리게이터 및 중단 모니터링 도구입니다. 모든 도구와 클라우드 제공업체의 중단에 대한 실시간 모니터링과 즉각적인 알림을 팀에 제공할 수 있습니다. IsDown은 2000개 이상의 상태 페이지를 모니터링합니다.

이 통합을 통해 Datadog의 타사 종속성으로부터 경고를 받고, 비즈니스에 중요한 서비스를 모니터링하고, 기본 대시보드 내에서 중단 빈도를 이해할 수 있습니다.

## 설정

1. 기존 계정을 사용하거나 [IsDown][1]에서 새 계정을 만듭니다.
2. 계정에 로그인하고 **Notifications** 페이지로 이동합니다.
3. 체크박스를 클릭하여 Datadog을 선택한 다음 **Connect to Datadog**을 클릭합니다.
4. 그런 다음 애플리케이션을 인증하기 위해 Datadog으로 리디렉션됩니다. IsDown은 IsDown이 Datadog에 이벤트 및 서비스 검사를 보내는 데 필요한 항목에만 액세스할 수 있는 API 키를 생성합니다.
5. 승인 후에는 IsDown으로 리디렉션됩니다.
6. 모니터링할 서비스를 선택합니다.
7. 각 서비스에 대해 원하는 알림 설정을 구성합니다.


### 삭제

1. IsDown에서 **Notifications** 페이지로 이동합니다.
2. Datadog을 선택 취소하고 **Save**를 클릭합니다.
3. Datadog의 [API 키 관리 페이지][2]에서 IsDown을 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인합니다.


## 수집한 데이터

### 서비스 점검
{{< get-service-checks-from-git "isdown" >}}


### 이벤트

IsDown은 모니터링하는 서비스에서 발생하는 각 중단에 대한 이벤트를 보냅니다. 이는 두 가지 유형의 이벤트를 전송합니다. 하나는 중단 시작을 위한 이벤트이고 다른 하나는 중단 종료를 위한 이벤트입니다. 이벤트는 다음 속성과 함께 전송됩니다.
- 제목: 중단된 서비스의 이름
- 본문: 중단에 대한 설명
- 태그: `isdown` 및 `isdown:service_name`

## 트러블슈팅

도움이 필요하신가요? [IsDown 지원팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

[IsDown 및 Datadog을 사용하여 서비스 제공업체 중단 추적][5]

[1]: https://isdown.app
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: assets/service_checks.json
[4]: mailto:support@isdown.app
[5]: https://www.datadoghq.com/blog/track-provider-outages-isdown-datadog/