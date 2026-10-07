---
app_id: winkmem
app_uuid: 70d34855-e504-4716-be0a-cc9d7d82e5ab
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: winkmem.paged_pool_bytes
      metadata_path: metadata.csv
      prefix: winkmem.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10254
    source_type_name: Windows Kernel Memory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- 윈도우즈(Windows)
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/winkmem/README.md
display_on_public_website: true
draft: false
git_integration_title: winkmem
integration_id: winkmem
integration_title: Windows Kernel Memory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: winkmem
public_title: Windows Kernel Memory
short_description: Windows Kernel 메모리 할당을 모니터링합니다.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - Category::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Windows Kernel 메모리 할당을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Kernel 메모리
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog에서 시각화 및 모니터 생성을 위해 Windows Kernel 메모리 사용량을 가져옵니다.

**참고:** 이 통합으로 수집된 메트릭 목록은 부 Agent 버전에 따라 변경될 수 있습니다. 이러한 변경 사항은 Agent의 변경 로그에 언급되지 않을 수 있습니다.

## 설정

### 설치

Windows Kernel Memory 통합은 [Datadog Agent][1] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 설정

1. [Agent 설정 디렉터리][2] 루트에 있는 `conf.d/` 폴더에서 `winkmem.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 설정 옵션은 [샘플 winkmem.d/conf.yaml.example][3]을 참조하세요.

2. [Agent를 재시작합니다][4].

### 검증

[Agent 상태 하위 명령을 실행하고][5] 점검 섹션에서 `winkmem`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "winkmem" >}}


### 이벤트

Windows Kernel Memory 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Windows Kernel Memory 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/winkmem.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/winkmem/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/