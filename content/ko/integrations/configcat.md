---
app_id: configcat
app_uuid: 22b2d616-b246-457e-8883-a79bee8c467d
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: configcat.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10094
    source_type_name: ConfigCat
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ConfigCat
  sales_email: developer@configcat.com
  support_email: developer@configcat.com
categories:
- 설정 및 배포
- 알림
- 프로비저닝
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/configcat/README.md
display_on_public_website: true
draft: false
git_integration_title: configcat
integration_id: configcat
integration_title: ConfigCat
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: configcat
public_title: ConfigCat
short_description: Datadog이 추적하는 변경 이벤트 설정하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::설정 및 배포
  - 카테고리::알림
  - 카테고리::프로비저닝
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  configuration: README.md#Setup
  description: Datadog이 추적하는 변경 이벤트 설정하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ConfigCat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

코드를 다시 배포하지 않아도 [ConfigCat 기능 플래그][1]를 사용하여 기능을 관리하고 소프트웨어 설정을 변경할 수 있습니다. [10분 트레이닝 대시보드][2]를 사용하면 기술 전문가가 아닌 팀원도 직접 해당 기능을 관리할 수 있습니다. 확신이 들면 언제든 배포하고 릴리스하세요. 새로운 아이디어로 특정 사용자 그룹을 먼저 타겟팅하세요. A/B/n 테스트 및 소프트 런칭을 지원합니다. 모든 웹, 모바일 또는 백엔드 애플리케이션에서 쉽게 통합해 사용할 수 있는 [오픈 소스 SDK][3]를 제공해 드립니다.

본 통합은 ConfigCat의 모든 설정 변경 사항이 이벤트로 Datadog에 전송되게 합니다.

*Example:*
![DatadogEvent][4]

## 설정

1. [Datadog 구독][5] 상태여야 합니다.
2. [Datadog API 키][6]를 받습니다.
    ![DatadogEvent][7] 
4. ConfigCat 대시보드에서 [통합 탭][8]을 엽니다.
5. Datadog의 _CONNECT_ 버튼을 클릭하고 Datadog API 키를 설정합니다.
6. 모든 준비가 완료되었습니다. 기능 플래그를 몇 가지 변경한 다음 Datadog에서 이벤트를 점검하세요.


### 설치 제거

1. ConfigCat 대시보드에서 [통합 탭][8]을 엽니다.
2. Datadog의 DISCONNECT 버튼을 클릭하고 Datadog API 키를 설정합니다.

## 수집한 데이터

### 메트릭

ConfigCat 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

수집된 모든 ConfigCat 관련 이벤트는 Datadog 이벤트 스트림에 `source:configcat` 속성으로 표시됩니다. 해당 속성은 프로덕트, 설정, 환경 이름으로 태깅됩니다.

예를 들어, 프로덕션 환경 `source:configcat production`에서 발생한 이벤트 검색 방법은 다음과 같습니다.

![Filtering][9]

### 서비스 점검

ConfigCat 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [ConfigCat 문서][10]를 참조하거나 [ConfigCat 지원 팀][11]에 문의하세요.

[1]: https://configcat.com
[2]: https://app.configcat.com
[3]: https://github.com/configcat
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_event.png
[5]: https://www.datadoghq.com
[6]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_apikey.png
[8]: https://app.configcat.com/product/integrations
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_filtering.png
[10]: https://configcat.com/docs/integrations/datadog/
[11]: https://configcat.com/support