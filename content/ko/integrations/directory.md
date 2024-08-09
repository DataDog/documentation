---
app_id: 시스템
app_uuid: b30c1062-d2cd-4fb7-be84-c144913b8266
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.directory.file.bytes
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: 디렉토리
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/directory/README.md
display_on_public_website: true
draft: false
git_integration_title: 디렉토리
integration_id: 시스템
integration_title: 디렉토리
integration_version: 2.1.1
is_public: true
manifest_version: 2.0.0
name: 디렉토리
public_title: 디렉토리
short_description: 통합 디렉토리는 지정된 디렉토리 파일의 메트릭을 보고합니다.
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
  - Category::OS & 시스템
  configuration: README.md#Setup
  description: 통합 디렉토리는 지정된 디렉토리 파일의 메트릭을 보고합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 디렉토리
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

원하는 디렉토리와 파일에서 메트릭을 캡처합니다. 에이전트는 다음 항목을 수집합니다.

- 파일 수
- 파일 크기
- 마지막 수정 날짜
- 생성 날짜

## 설정

### 설치

디렉토리 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 설정

1. 디렉토리 성능 데이터 수집을 시작하려면 [에이전트 설정 디렉토리][2] 루트에 있는 `conf.d/` 폴더에서 `directory.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [directory.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param directory - string - required
     ## The directory to monitor. On windows, please make sure you escape back-slashes otherwise the YAML
     ## parser fails (eg. - directory: "C:\\Users\\foo\\Downloads").
     #
     - directory: "<DIRECTORY_PATH>"
   ```

    에이전트 프로세스(보통 `datadog-agent`)을 실행하는 사용자에게 디렉토리, 하위 디렉토리, 파일 읽기 권한이 있는지 확인합니다.

    **참고**: 윈도우즈(Windows)에서 디렉토리를 추가할 때 단일 백슬래시 (`C:\path\to\directory`) 대신 이중 백슬래시 (`C:\\path\\to\\directory`)를 사용하여 점검을 실행합니다. 그렇지 않으면 디렉토리 점검이 실패하고 `found unknown escape character in "<string>"` 오류를 발생시키는 트레이스백이 발생합니다.

2. [에이전트를 다시 시작합니다][4].

### 검증

[에이전트의 상태 하위 명령을 실행][5]하고 점검 섹션에서 `directory`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "directory" >}}


### 이벤트

디렉토리 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "directory" >}}


## 트러블슈팅

대규모 디렉토리 점검을 실행할 시 재귀문이 true로 설정되어 있다면 I/O 및 CPU 사용량이 상당한 작업이 될 수 있다는 점에 유의하세요. 기본 점검 빈도(매 15초마다)를 조정해야 할 수도 있습니다. 

예를 들어, 15,000개의 파일과 하위 디렉토리가 있는 디렉토리가 있고 점검 실행 빈도는 30~40초로 CPU 사용량이 상당한 경우, 점검 빈도를 낮게 설정하지 않으면 CPU 사용량이 높은 점검이 효율적, 지속적으로 실행됩니다.

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/directory/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/help/