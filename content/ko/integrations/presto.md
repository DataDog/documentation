---
app_id: presto
app_uuid: b725cadc-d041-4199-8b86-c714ee9a318f
assets:
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: presto.failure_detector.active_count
      metadata_path: metadata.csv
      prefix: presto.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10057
    source_type_name: Presto
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    error_patterns: assets/saved_views/error_patterns.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/presto/README.md
display_on_public_website: true
draft: false
git_integration_title: presto
integration_id: presto
integration_title: Presto
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: presto
public_title: Presto
short_description: PrestoSQL 클러스터의 성능 및 사용 통계를 수집하고 그 외 여러 기능을 제공합니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: PrestoSQL 클러스터의 성능 및 사용 통계를 수집하고 그 외 여러 기능을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Presto
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 다음과 같은 [Presto][1] 메트릭을 수집합니다.

- 전반적인 활동 메트릭: 완료/실패한 쿼리, 데이터 입력/출력 크기, 실행 시간.
- 성능 메트릭: 클러스터 메모리, 입력 CPU, 실행 CPU 시간.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

Presto 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다. 사용 및 성능 메트릭을 수집하려는 각 Coordinator 및 Worker 노드에 Agent 를 설치합니다.

### 설정

1. Agent의 구성 디렉토리 루트에 있는 `conf.d/` 폴더에서 `presto.d/conf.yaml` 파일을 편집하여 Presto 성능 데이터 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 presto.d/conf.yaml][4]을 참조하세요.

    이 점검에는 인스턴스당 350개의 메트릭이 제한됩니다. 반환된 메트릭의 수는 [상태 페이지][5]에 표시됩니다. 아래 구성을 편집하여 관심 있는 메트릭을 지정할 수 있습니다. 수집할 메트릭을 커스터마이징하려면 [JMX 점검 설명서][6]에서 자세한 지침을 확인해 보세요. 더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][7]에 문의하세요.

2. [에이전트를 재시작합니다][8].

#### 메트릭 수집

Presto 메트릭 수집을 활성화하려면 `presto.d/conf.yaml` 파일의 기본 구성을 사용합니다. 사용 가능한 모든 구성 옵션은 샘플 [presto.d/conf.yaml][4]을 참조하세요.

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. Presto 로그 수집을 시작하려면 `presto.d/conf.yaml` 파일에 이 구성 블록을 추가합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/presto/*.log
       source: presto
       service: "<SERVICE_NAME>"
   ```

    `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 샘플 [presto.d/conf.yaml][4]을 참조하세요.

3. [에이전트를 재시작합니다][8].

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `presto`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "presto" >}}


### 이벤트

Presto는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "presto" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/integrations/presto/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/integrations/java/
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json