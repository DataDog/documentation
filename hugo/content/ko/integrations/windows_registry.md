---
app_id: windows-registry
app_uuid: cc166a5c-6742-4811-b3e1-93dbec0ac5b2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8444609
    source_type_name: windows-registry
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
- https://github.com/DataDog/integrations-core/blob/master/windows_registry/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_registry
integration_id: windows-registry
integration_title: Windows Registry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: windows_registry
public_title: Windows Registry
short_description: Windows 호스트에서 레지스트리 키 변경 사항을 모니터링합니다.
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
  description: Windows 호스트에서 레지스트리 키 변경 사항을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Registry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Windows Registry 키 변경 사항을 확인하고 Datadog으로 포워딩하세요. 다음 통합을 활성화합니다.

- Windows Registry 값으로 시스템 및 애플리케이션 수준의 서비스 상태와 정상 동작 여부를 파악합니다.
- 보안과 규정 준수 요구 사항에 영향을 미치는 예상치 못한 변경 사항을 모니터링합니다.

## 설정

### 설치

Windows Registry 통합은 [Datadog Agent][1] 패키지에 포함되어 있어 추가 설치가 필요하지 않습니다.

### 설정

본 통합은 다음 두 가지 방법을 사용하여 Windows Registry 정보를 수집 및 보고합니다.

- [Datadog 메트릭][2]으로
- [Datadog 로그][3]로


1. Windows Registry 정보 수집을 시작하려면 Agent [설정 디렉터리][4] 루트에 있는 `conf.d/` 폴더에서 `windows_registry.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [windows_registry.d/conf.yaml 샘플][5]을 참조하세요.

2. 레지스트리 값 및 변경 사항을 로그로 전송하려면 Datadog Agent에서 로그 수집을 활성화해야 합니다. 로그 수집을 활성화하려면 `datadog.yaml` 파일에 다음을 추가하세요.

    ```yaml
    logs_enabled: true
    ```

3. [에이전트를 재시작하세요][6].


### 검증

Datadog Agent Manager의 정보 페이지를 확인하거나 Agent의 `status` [하위 명령][7]을 실행하고 **Checks** 섹션에서 `windows_registry`를 찾습니다. 

## 수집한 데이터

### 메트릭

Windows Registry 통합이 수집한 모든 메트릭이 [커스텀 메트릭][11]으로 Datadog에 포워딩되며, 이는 빌링에 영향을 미칠 수 있습니다.

### 로그

Windows Registry 통합이 수집한 모든 로그가 [커스Datadog으로 포워딩되며, [로그 빌링][8]이 적용됩니다.

### 서비스 점검

Windows Registry 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Agent Flare][10]로 [Datadog 지원팀][9]에 문의하세요.

[10]:https://docs.datadoghq.com/ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[11]:https://docs.datadoghq.com/ko/account_management/billing/custom_metrics/?tab=countrate
[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://docs.datadoghq.com/ko/metrics/#overview
[3]: https://docs.datadoghq.com/ko/logs/
[4]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/windows_registry.d/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/account_management/billing/log_management/
[9]: https://docs.datadoghq.com/ko/help/