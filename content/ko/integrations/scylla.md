---
app_id: scylla
app_uuid: 1d655820-3010-4ae3-8273-a3798321d4d4
assets:
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scylla.node.operation_mode
      metadata_path: metadata.csv
      prefix: scylla.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10087
    source_type_name: 실라
  monitors:
    Node State is abnormal: assets/monitors/instance_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/scylla/README.md
display_on_public_website: true
draft: false
git_integration_title: scylla
integration_id: scylla
integration_title: 실라
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: scylla
public_title: 실라
short_description: 클러스터 리소스, 지연 시간, 상태 등을 추적하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 클러스터 리소스, 지연 시간, 상태 등을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 실라
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 Datadog-[Scylla][1] 통합은 기본적으로 노출된 메트릭의 대부분을 수집하며, 특정 사용자 요구에 따라 추가 그룹을 커스터마이즈할 수 있습니다.

Scylla는 "드롭인 방식의 Apache Cassandra 대안"으로 사용할 수 있는 오픈 소스 NoSQL 데이터 스토리지입니다. 최신 하드웨어에 맞게 조정된 Cassandra 모델을 재설계하여 필요한 클러스터 크기를 줄이면서 이론적 처리량과 성능을 개선했습니다.

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

Scylla 점검은 [Datadog 에이전트][2] 패키지 에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 설정

1. 에이전트 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `scylla.d/conf.yaml` 파일을 편집하여 스카일라 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 scylla.d/conf.yaml][3]을 참조하세요. 이전에 통합을 구현한 경우 [레거시 예제][4]를 참조하세요.

2. [에이전트를 재시작하세요][5].

##### 로그 수집

Scylla는 실행 중인 환경에 따라 로그를 출력하는 모드가 다릅니다. 애플리케이션이 로그를 생성하는 방법에 대한 자세한 내용은 [Scylla 설명서][6]를 참조하세요.

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

      ```yaml
       logs_enabled: true
     ```

2. `scylla.d/conf.yaml` 파일에서 로그 설정 블록의 주석을 해제하고 편집합니다. `type`, `path`, `service` 파라미터 값을 환경에 따라 변경합니다. 사용 가능한 모든 설정 옵션은 [샘플 scylla.d/conf.yaml][3]을 참조하세요.

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: scylla
           service: <SERVICE_NAME>
           #To handle multi line that starts with yyyy-mm-dd use the following pattern
           #log_processing_rules:
           #  - type: multi_line
           #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #    name: new_log_start_with_date
     ```

3. [에이전트를 재시작하세요][5].

쿠버네티스(Kubernetes) 환경에 대한 로그를 활성화하려면 [쿠버네티스 로그 수집][7]을 참조하세요.

### 검증

[에이전트 상태 하위 명령을 실행][8]하고 점검 섹션에서 `scylla`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "scylla" >}}


### 이벤트

Scylla 점검 에는 이벤트.

### 서비스 점검
{{< get-service-checks-from-git"scylla" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://scylladb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.50.x/scylla/datadog_checks/scylla/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.scylladb.com/getting-started/logging/
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/scylla/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/