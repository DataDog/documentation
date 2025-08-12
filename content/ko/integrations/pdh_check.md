---
app_id: pdh
app_uuid: 75f6813c-934c-4f1a-b8f4-71f9f1911165
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10065
    source_type_name: PDH
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md
display_on_public_website: true
draft: false
git_integration_title: pdh_check
integration_id: pdh
integration_title: PDH Check
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: pdh_check
public_title: PDH Check
short_description: 모든 Windows 성능 카운터를 수집하고 그래프화하세요.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & 시스템
  - Offering::Integration
  configuration: README.md#Setup
  description: 모든 Windows 성능 카운터를 수집하고 그래프화하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PDH 점검
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

**참고:** PDH 점검 사용은 권장되지 않습니다. 대신 [Windows 성능 카운터][1]를 사용할 수 있습니다.

Windows 성능 카운터에서 실시간으로 메트릭을 수집하여 다음을 수행하세요.

- PDH API를 통해 Windows 성능 카운터를 시각화하고 모니터링하세요.

## 설정

### 설치

PDH 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다. 추가 설치가 필요하지 않습니다.

### 구성

1. [에이전트 설정 디렉터리][3] 루트에 `conf.d/` 폴더에서 `pdh_check.d/conf.yaml` 파일을 편집하여 Windows 성능 데이터를 수집할 수 있습니다. 사용 가능한 모든 설정 옵션은 [sample pdh_check.d/conf.yaml][4]을 참조하세요.

2. [Agent를 재시작합니다][5].

### 검증

[에이전트 상태 하위 명령][6]을 실행하여 점검 섹션에서 `pdh_check`을 찾습니다.

## 수집한 데이터

### 메트릭

PDH 점검에서 수집한 모든 메트릭이 [커스텀 메트릭][7]으로 Datadog로 전달됩니다. 이는 [빌링][8]에 영향을 미칠 수 있습니다.

### 이벤트

PDH 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

PDH 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/ko/account_management/billing/custom_metrics/
[9]: https://docs.datadoghq.com/ko/help/