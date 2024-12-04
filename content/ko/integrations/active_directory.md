---
app_id: active-directory
app_uuid: e03a0916-8708-4417-82e4-1f0c7bbee655
assets:
  dashboards:
    Active Directory: assets/dashboards/active_directory.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: active_directory.dra.inbound.objects.persec
      metadata_path: metadata.csv
      prefix: active_directory.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10068
    source_type_name: Active Directory
  monitors:
    '[Active Directory] Anomalous number of sessions for connected LDAP clients for host: {{host.name}}': assets/monitors/ldap_client_sessions.json
    '[Active Directory] Anomalous number of successful LDAP bindings for host: {{host.name}}': assets/monitors/ldap_binding_successful.json
    '[Active Directory] Elevated LDAP binding duration for host {{host.name}}': assets/monitors/ldap_binding.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: active_directory
integration_id: active-directory
integration_title: Active Directory
integration_version: 2.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: active_directory
public_title: Active Directory
short_description: Microsoft Active Directory 메트릭을 수집하고 그래프로 표시하세요
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & 시스템
  configuration: README.md#Setup
  description: Microsoft Active Directory 메트릭을 수집하고 그래프로 표시하세요
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Active Directory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Microsoft Active Directory의 메트릭을 통해 성능을 시각화하고 모니터링합니다.

## 설정

### 설치

Agent의 Active Directory 검사는 [Datadog Agent][1] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

도메인 환경에 Datadog Agent를 설치하는 경우 [Agent 설치 요구 사항][2]을 참조하세요.

### 설정

#### 메트릭 수집

1. [Agent의 설정 디렉터리][3] 루트에서 `conf.d/` 폴더에 있는 `active_directory.d/conf.yaml` 파일을 편집하여 Active Directory 성능 데이터 수집을 시작하세요. 기본 설정에서는 이미 로컬호스트에 대한 메트릭을 수집해야 합니다. 사용 가능한 모든 설정 옵션은 [샘플 active_directory.d/conf.yaml][4]을 참조하세요.

2. [Agent를 재시작합니다][5]

**참고**: 이 검사의 1.13.0 이상 버전에서는 메트릭 수집을 위한 새로운 구현을 사용하므로 Python 3이 필요합니다. Python 3을 사용할 수 없거나 이 검사의 레거시 버전을 사용하려는 호스트의 경우 다음 [설정][6]을 참조하세요.

### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `active_directory`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "active_directory" >}}


### 이벤트

Active Directory 검사에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Active Directory 검사에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/