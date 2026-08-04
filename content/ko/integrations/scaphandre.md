---
app_id: scaphandre
app_uuid: 0aa80baa-7ba6-4264-97ae-5475a6f796dc
assets:
  dashboards:
    scaphandre_overview: assets/dashboards/scaphandre_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - scaphandre.host.cpu.frequency
      metadata_path: metadata.csv
      prefix: scaphandre.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15882148
    source_type_name: Scaphandre
  logs: {}
author:
  homepage: https://github.com/hubblo-org/scaphandre
  name: Sarah
  sales_email: sarah.witt@datadoghq.com
  support_email: sarah.witt@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scaphandre/README.md
display_on_public_website: true
draft: false
git_integration_title: scaphandre
integration_id: scaphandre
integration_title: Scaphandre
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scaphandre
public_title: Scaphandre
short_description: 베어 메탈 머신의 전력 사용량을 측정하는 모니터링 에이전트
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::OS & System
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 베어 메탈 머신의 전력 사용량을 측정하는 모니터링 에이전트
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Scaphandre
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 베어 메탈 머신의 전력 사용량을 측정하기 위해 파워캡을 통해 RAPL과 MsrRAPL을 사용하는 모니터링 Agent인 [Scaphandre][1]를 모니터링합니다. 해당 프로젝트의 목표는 회사 또는 개인이 기술 서비스의 전력 소비를 측정하고, 해당 데이터를 편리한 형식으로 가져와 모니터링 또는 데이터 분석 툴 체인을 통해 전송할 수 있게 하는 것입니다.

## 설정

### 설치

다음에 따라 호스트에 Scaphandre 점검을 설치합니다.


1. 머신에 [개발자 툴킷][2]을 설치합니다. 설치해야 하는 특정 개발자 툴킷은 플랫폼과 아키텍처에 따라 다릅니다.

2. 다음 명령을 실행하여 패키지를 빌드합니다.
    ```
    ddev release build scaphandre
    ```

3. [Datadog Agent를 다운로드][3]합니다.

4. 빌드 아티팩트를 Agent가 있는 호스트에 업로드하고 다음 명령을 실행합니다.
    ```
    datadog-agent integration install -w path/to/scaphandre/dist/<ARTIFACT_NAME>.whl
    ```

### 설정

[Agent 구성 디렉터리][4] 루트의 `conf.d/` 폴더에 있는 `scaphandre.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 구성 옵션 전체를 보려면 [샘플 scaphandre.d/conf.yaml][5]를 참고하세요. 예를 들어, Scaphandre 명령줄 태그를 보호하고 민감한 데이터가 Datadog으로 전송되지 않도록 하려면 `exclude_labels` config 옵션을 사용합니다.

[Agent를 다시 시작][6]하여 Datadog으로 Scaphandre 메트릭을 전송하기 시작합니다.

### 검증

[Agent 상태 하위 명령][7]을 실행하고 **Checks** 섹션에서 `scaphandre`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "scaphandre" >}}


### 서비스 점검

Scaphandre는 서비스 점검을 포함하지 않습니다.

### 이벤트

Scaphandre는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://github.com/hubblo-org/scaphandre
[2]: https://docs.datadoghq.com/ko/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/scaphandre/datadog_checks/scaphandre/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/scaphandre/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/