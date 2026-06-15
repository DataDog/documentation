---
app_id: rethinkdb
app_uuid: f8348717-0ba8-4d42-b856-983e0cde0314
assets:
  dashboards:
    RethinkDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rethinkdb.config.servers
      metadata_path: metadata.csv
      prefix: rethinkdb.
    process_signatures:
    - rethinkdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10092
    source_type_name: RethinkDB
  saved_views:
    rethinkdb_processes: assets/saved_views/rethinkdb_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md
display_on_public_website: true
draft: false
git_integration_title: rethinkdb
integration_id: rethinkdb
integration_title: RethinkDB
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: rethinkdb
public_title: RethinkDB
short_description: RethinkDB 클러스터에서 상태, 성능 및 기타 메트릭 를 수집합니다.
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
  description: RethinkDB 클러스터에서 상태, 성능 및 기타 메트릭 를 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RethinkDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[RethinkDB][1]는 분산형 문서 지향 NoSQL 데이터베이스로 실시간
피드 변경을 최우선 지원합니다.

이 점검은 Datadog 에이전트로 RethinkDB 클러스터를 모니터링하고 성능에 대한 메트릭,
데이터 가용성, 클러스터 설정 등을 수집합니다.

**참고**: 본 통합은 RethinkDB **버전 2.3.6 이상**과 호환됩니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요.
컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을
참조하세요.

### 설치

RethinkDB 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있으므로 서버에 추가로 설치할 필요가 없습니다.

### 설정

1. RethinkDB 2.4 이상을 사용하는 경우, `rethinkdb` 데이터베이스에 읽기 전용 권한이 있는 `datadog-agent` 사용자를 추가합니다.
다음 ReQL 명령을 사용할 수 있으며, 자세한 내용은 [권한 및 사용자 계정][4]
을 참조하세요.

    ```python
    r.db('rethinkdb').table('users').insert({'id': 'datadog-agent', 'password': '<PASSWORD>'})
    r.db('rethinkdb').grant('datadog-agent', {'read': True})
    ```

    **참고**: RethinkDB 2.3.x는 `rethinkdb` 데이터베이스 권한 부여를 지원하지 않습니다.
    이 단계를 건너뛰고 대신 아래의 [관리자 계정][5]을 사용합니다.

2. [에이전트의 설정 디렉토리][6] 루트에 있는 `conf.d/` 폴더에서 `rethinkdb.d/conf.yaml`를 편집합니다.
사용 가능한 모든 설정 옵션은 [rethinkdb.d/conf.yaml 샘플][7]을
참조하세요.

    ```yaml
    init_config:

    instances:
      - host: localhost
        port: 28015
        user: "<USER>"
        password: "<PASSWORD>"
    ```

3. [에이전트를 재시작합니다][8].

**참고**: 본 통합은 클러스터의 모든 서버에서 메트릭을 수집하므로 단일 에이전트만 필요합니다.

#### 로그 수집


1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
    logs_enabled: true
    ```

2. 이 설정 블록을 `rethinkdb.d/conf.yaml` 파일에서 편집하여 RethinkDB 로그 수집을 시작합니다.

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: rethinkdb
        service: "<SERVICE_NAME>"
    ```


    환경에 따라 `path` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [conf.yaml 샘플][7]을 참조하세요.

3. [에이전트를 재시작합니다][8].

쿠버네티스(Kubernetes) 환경의 로그 수집을 활성화하려면 [쿠버네티스 로그 수집][9]을 참조하세요.

### 검증

[에이전트 상태 하위 명령을 실행][10]하고 점검 섹션에서 `rethinkdb`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "rethinkdb" >}}


### 이벤트

RethinkDB는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "rethinkdb" >}}


## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.


[1]: https://rethinkdb.com
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://rethinkdb.com/docs/permissions-and-accounts/
[5]: https://rethinkdb.com/docs/security/#the-admin-account
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/datadog_checks/rethinkdb/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/assets/service_checks.json
[13]: https://docs.datadoghq.com/ko/help/