---
app_id: sleuth
app_uuid: 7923b3ef-2436-4315-bf2e-7631a6975886
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sleuth.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10118
    source_type_name: Sleuth
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sleuth
  sales_email: support@sleuth.io
  support_email: support@sleuth.io
categories:
- 설정 및 배포
- 문제 추적
- orchestration
- 소스 컨트롤
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sleuth/README.md
display_on_public_website: true
draft: false
git_integration_title: sleuth
integration_id: sleuth
integration_title: Sleuth
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sleuth
public_title: Sleuth
short_description: Sleuth 배포 트래커
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - 카테고리::이슈 추적
  - Category::Orchestration
  - Category::Source Control
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Sleuth 배포 트래커
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sleuth
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Sleuth는 DevOps 스택 전체에서 소프트웨어 배포를 추적할 수 있는 배포 추적 도구입니다. Datadog와 통합된 Sleuth는 실행 가능하고 의미 있는 실시간 데이터를 제공하여 사용자와 팀이 코드 변경이 미치는 영향을 명확하게 파악할 수 있도록 지원합니다.

## 설정

Datadog 통합을 추가하는 방법:

1. [Sleuth 계정][1]에 로그인합니다.
2. 사이드바에 있는 **Integrations**를 클릭합니다.
3. _Metric Trackers_ 탭을 클릭한 다음 Datadog 카드에서 **enable**을 클릭합니다.
4. 해당 필드에 Datadog API 키와 애플리케이션 키를 입력합니다.
5. Datadog 서버가 EU에 있는 경우, _My Datadog servers are in the EU_ 체크박스를 선택합니다. 확실하지 않다면 선택하지 마세요.
6. **Save**를 클릭합니다.

Datadog API 키와 애플리케이션 키는 **Integrations** &gt; **API**에서 확인할 수 있습니다. 또는 Sleuth 대화 상자(아래 참고)에서 **generate** 링크를 클릭하면 Datadog 콘솔의 API/Applications Keys 영역으로 이동합니다.

![][2]

Datadog 통합이 성공적으로 설치되면 **Datadog is connected**라는 메시지가 표시됩니다.

![][3]

### 설치

Datadog Sleuth 통합은 Sleuth 계정에서만 설치됩니다. Datadog 계정에서는 Sleuth에 Datadog API 및 애플리케이션 키를 제공하는 것 외에는 별도의 설정이나 구성이 필요하지 않습니다.

### 구성

- **Add metric** 드롭다운을 클릭하고 수신되는 Datadog 메트릭을 처리할 Sleuth 프로젝트를 선택합니다. Sleuth 조직 내의 모든 프로젝트가 드롭다운에 표시됩니다.

![][4]

> 통합은 Sleuth 조직 수준에서 이루어지며, 해당 조직 내의 모든 프로젝트에 사용할 수 있습니다. 통합의 개별 설정은 프로젝트 수준에서 이루어집니다.

구성이 완료되면 Sleuth가 배포 시 Datadog 메트릭을 표시합니다. Sleuth 배포 카드에서 메트릭이 어떻게 전달되는지에 대한 자세한 내용은 [**대시보드**][5]를 참고하세요.


## 수집한 데이터

### 메트릭

Sleuth 통합은 메트릭을 포함하지 않습니다.

### 서비스 점검

Sleuth 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

Sleuth 통합은 이벤트를 포함하지 않습니다.

## 제거

1. Sleuth 대시보드에서 왼쪽 사이드바의 **Integrations**를 클릭한 다음 **Metric Trackers**를 클릭합니다.
2. Datadog 통합 카드에서 **disable**을 클릭합니다.

Datadog 통합이 연결 해제되어 해당 조직 내의 모든 프로젝트에서 더 이상 사용할 수 없습니다. Datadog 통합에 적용한 프로젝트 수준의 수정 사항은 모두 손실됩니다.

## 트러블슈팅

도움이 필요하신가요? 이 통합의 [유지 관리자][6]에게 연락하세요.

[1]: https://app.sleuth.io/accounts/login/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration-api-key.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-enabled-metric-pick.png
[5]: https://help.sleuth.io/dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/sleuth/manifest.json