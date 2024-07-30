---
app_id: altostra
app_uuid: c22d6f84-3404-4638-99bc-7cb19ab4508a
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: altostra.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10181
    source_type_name: Altostra
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Altostra
  sales_email: support@altostra.com
  support_email: support@altostra.com
categories:
- 자동화
- cloud
- 설정 및 배포
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_on_public_website: true
draft: false
git_integration_title: altostra
integration_id: altostra
integration_title: Altostra
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: altostra
public_title: Altostra
short_description: Altostra에서 Datadog로 애플리케이션 로그 자동으로 보내기
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
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  configuration: README.md#Setup
  description: Altostra에서 Datadog로 애플리케이션 로그 자동으로 보내기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Altostra
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Altostra는 클라우드 컴퓨팅 서비스와 통합되어 개발 팀에게 엔드투엔드 워크플로우를 제공합니다.

Datadog Altostra 통합을 사용하면 배포 중 자동으로 Altostra 프로젝트를 계측해 Datadog 계정으로 로그와 메트릭을 전송할 수 있습니다. 배포 환경 별로 통합 구성을 제어할 수 있습니다.

## 설정

### 설치

Datadog Altostra 통합은 내장되어 있습니다. 설치가 필요 없습니다.

### 설정

Datadog 통합은 계정 설정 페이지에 있는 Altostra Web Console의 [통합][1] 아래에서 사용할 수 있습니다.

1. Altostra 계정 설정에서 [통합][1] 섹션으로 이동하세요.
2. **Datadog** 통합에서 **Connect**를 클릭하세요.
3. 통합의 **디스플레이 이름**을 입력하세요
4. Datadog 계정 **API 키**를 입력하세요.
5. **OK**를 클릭해 통합 구성을 완료합니다.
6. [Environments][2]로 이동해 로그 전송을 구성하고 싶은 환경을 클릭하세요.
7. _Settings_ 아래로 이동한 다음 이전 **Log Shipping** 단계에서 구성하려고 선택한 통합을 선택하세요.
8. **변경 사항 저장**을 클릭합니다.

### 검증

1. Datadog로 로그를 전송하도록 구성한 환경에 Lambda 함수를 포함한 Altostra 프로젝트를 배포하세요.
2. Lambda 함수를 호출합니다.
3. Datadog의 _Logs_ 보기에 Lambda 함수가 나타납니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: /ko/help