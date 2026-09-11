---
app_id: tenable
app_uuid: 09a46b1b-a940-4aba-8e9f-bde9e5ae2c3f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10089
    source_type_name: Tenable
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tenable/README.md
display_on_public_website: true
draft: false
git_integration_title: tenable
integration_id: tenable
integration_title: Tenable Nessus
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: tenable
public_title: Tenable Nessus
short_description: Nessus 백엔드 및 웹서버 로그 추적
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Nessus 백엔드 및 웹서버 로그 추적
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable Nessus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

이 통합은 Datadog Agent를 통해 [Tenable Nessus][1] 로그를 모니터링합니다.

## 설정

하단 지침에 따라 호스트에서 실행 중인 Agent에 본 통합을 구성합니다.

### 설치

Agent에 Tenable 통합 구성 설치 방법

**참고**: Agent 버전 >= 7.18.0에서는 해당 단계를 실행할 필요가 없습니다.

1. 1.0 릴리스(`tenable==1.0.0`)를 [설치][2]합니다.

### 구성

Agent는 Tenable Nessus `webserver` 및 `backend` 로그를 추적하여 Nessus 스캔 데이터를 수집합니다.

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `tenable.d/conf.yaml`의 하단에 이 구성 블록의 주석 처리를 해제하고 편집합니다.

   사용 가능한 모든 설정 옵션은 [tenable.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
      logs:
       - type: file
         path: /opt/nessus/var/nessus/logs/backend.log
         service: nessus_backend
         source: tenable

       - type: file
         path: /opt/nessus/var/nessus/logs/www_server.log
         service: nessus_webserver
         source: tenable
   ```

    환경에 따라 필요한 경우 `path` 및 `service` 파라미터 값을 사용자 지정합니다.

3. [Agent를 재시작합니다][4].

#### 수집된 로그 데이터

1. Nessus 백엔드 로그는 스캔 이름, 시작 시간, 중지 시간, 지속 기간, 대상에 대한 데이터를 수집합니다.
2. Nessus 웹 서버 로그는 Client IP, User Agent, 로그인 시도/성공/실패 등, Nessus 웹 서버의 액세스 로그 데이터를 수집합니다.

### 메트릭

이 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

이 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/help/