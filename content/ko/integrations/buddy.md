---
app_id: buddy
app_uuid: f9d740e2-31b5-427c-a65b-41984656cc73
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: buddy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10004
    source_type_name: Buddy
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Buddy
  sales_email: support@buddy.works
  support_email: support@buddy.works
categories:
- automation
- developer tools
- event management
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md
display_on_public_website: true
draft: false
git_integration_title: buddy
integration_id: buddy
integration_title: Buddy
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: buddy
public_title: Buddy
short_description: 웹 개발자용 웹사이트 미리보기를 제공하는 원클릭 전송 자동화입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Developer Tools
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 웹 개발자용 웹사이트 미리보기를 제공하는 원클릭 전송 자동화입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Buddy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Buddy는 지속적 통합 자동화 플랫폼으로 웹사이트와 애플리케이션을 빌드, 테스트 및 배포하는 데 사용할 수 있습니다.

Buddy 통합을 통해 다음 작업을 실행할 수 있습니다.

- Buddy의 Datadog 배포에 대한 이벤트를 전송합니다.
- Datadog 메트릭을 포함하는 배포 상세 정보를 연계합니다.
- 파이프라인에서 성능의 급증 원인을 탐지합니다.

![datadog-integration][1]

## 설정

- Datadog 계정 설정에서 [통합 -> API][2]로 이동해 **API 키** 토큰을 복사합니다.

- [Buddy 계정에 로그인하고][3] 추적하려는 배포 작업을 포함하는 파이프라인으로 이동합니다.

- 파이프라인 끝의 더하기(+)를 클릭한 다음 **알림** 섹션에서 **Datadog**를 선택합니다.

- Datadog 계정 이름을 입력한 다음 복사한 API 키를 붙여넣기합니다.

- [Buddy 파라미터][4]를 사용해 이벤트 제목과 전송된 콘텐츠를 정의합니다. 예는 다음과 같습니다.

```text
# Event title
${'${execution.pipeline.name} execution #${execution.id}'}

# Content
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- 준비되면 **작업 추가**를 클릭한 다음 파이프라인을 실행합니다. 성공적인 배포마다 Buddy에서 Datadog에 이벤트를 전송합니다.

![snapshot][5]

## 수집한 데이터

### 메트릭

Buddy 점검은 메트릭을 포함하지 않습니다.

### 이벤트

모든 Buddy 배포 이벤트는 [Datadog 이벤트 스트림][6]으로 전송됩니다.

### 서비스 검사

Buddy 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/ko/events/
[7]: https://docs.datadoghq.com/ko/help/