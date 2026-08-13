---
app_id: data-runner
app_uuid: ad7b5a3c-497d-45e0-9bcf-50f2d1365247
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://datadoghq.com
  name: Datadog
  sales_email: sales@datadog.com
  support_email: help@datadoghq.com
categories: []
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/data_runner/README.md
display_on_public_website: true
draft: false
git_integration_title: data_runner
integration_id: data-runner
integration_title: The Data Runner
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: data_runner
public_title: The Data Runner
short_description: Datadog 대시보드에 표시할 메트릭을 재밌게 찾을 수 있는 게임
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
  - Offering::UI Extension
  configuration: README.md#Setup
  description: Datadog 대시보드에 표시할 메트릭을 재밌게 찾을 수 있는 게임
  media:
  - caption: The Data Runner
    image_url: images/data-runner.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: The Data Runner
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Data Runner는 캐릭터가 라이브러리 환경에서 플레이어 지정 메트릭을 찾는 게임입니다. 캐릭터가 지정 메트릭을 찾으면 메트릭의 값이 플레이어 점수에 추가됩니다. Data Runner를 Datadog 대시보드에 위젯으로 추가할 수 있습니다.

이 확장 프로그램을 [Datadog 앱][1]으로 실행할 수 있습니다. Datadog 앱을 사용하면 네이티브로 지원할 수 있는 타사 컨텐츠를 사용자 인터페이스로 확장할 수 있습니다. Datadog 경험을 비즈니스나 재미있는 경험으로 확장하고 싶다면 [나만의 앱이나 게임을 빌드][1]해 보세요.

Data Runner와 관련한 자세한 정보는 GitHub에서 [stuartlangridge/data-runner][2]를 참고하세요.

## 설정

1. 내 대시보드에 Data Runner를 표시하려면 위젯을 추가할 [대시보드][3]를 여세요.

2. **+ Add Widgets** 버튼을 눌러 사용할 수 있는 위젯 목록을 여세요. Data Runner 위젯을 대시보드의 원하는 위치에 드래그 앤 드롭하세요.

3. 게임 캐릭터가 찾아야 하는 메트릭을 선택하세요.

## 수집한 데이터

### 메트릭

Data Runner에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Data Runner에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Data Runner에는 서비스 점검이 포함되어 있지 않습니다.

## 지원

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

내 Datadog 앱을 빌드하고 싶으면 [Datadog 앱 개발자 설명서][1]를 참고하세요.

[1]: https://docs.datadoghq.com/ko/developers/datadog_apps
[2]: https://github.com/stuartlangridge/data-runner
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://www.datadoghq.com/support/