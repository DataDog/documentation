---
app_id: druid
app_uuid: 15b15f01-b342-4001-89ac-9e92fc4f3234
assets:
  dashboards:
    Druid Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: druid.service.health
      metadata_path: metadata.csv
      prefix: druid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10074
    source_type_name: Druid
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
- https://github.com/DataDog/integrations-core/blob/master/druid/README.md
display_on_public_website: true
draft: false
git_integration_title: druid
integration_id: druid
integration_title: Druid
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: druid
public_title: Druid
short_description: '쿼리, 수집, 조정과 관련된 메트릭을 추적합니다. '
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
  description: 쿼리, 수집, 조정과 관련된 메트릭을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Druid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Druid Dashboard][1]

## 개요

Datadog Agent는 [DogStatsD][2]를 사용하여 Druid로부터 메트릭을 수집합니다. DogStatsD는 Druid 쿼리, 수집 및 조정 데이터에 대한 메트릭을 수집합니다. 자세한 내용은 [Druid 메트릭 문서][3]를 참조하세요.

메트릭을 수집하는 것 외에 Agent는 Druid의 상태와 관련된 Service Check도 보냅니다.

## 설정

### 사전 요구 사항

이 통합이 제대로 작동하려면 Druid 0.16 이상이 필요합니다.

### 설치

Druid 통합이 제대로 작동하려면 아래 두 단계가 모두 필요합니다. 시작하기 전에 [Datadog Agent를 설치][4]해야 합니다.

#### 1단계: 상태 메트릭 및 서비스 점검을 수집하도록 Druid 구성

[Datadog Agent][5] 패키지에 포함된 Druid 검사를 구성하여 상태 메트릭 및 서비스 점검을 수집합니다.

1. Druid 서비스 점검 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `druid.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 druid.d/conf.yaml][6]을 참조하세요.
2. [에이전트를 다시 시작][7]합니다.

#### 2단계: 확장 프로그램 `statsd-emitter`을 사용하여 메트릭 수집을 위해 Druid를 DogStatsD(Datadog Agent에 포함됨)에 연결합니다.

대부분의 [Druid 메트릭][3]을 수집하도록 확장 프로그램 `statsd-emitter`을 구성하는 단계입니다.

1. Druid 확장 프로그램 [`statsd-emitter`][8]을 설치합니다.

   ```shell
   $ java \
     -cp "lib/*" \
     -Ddruid.extensions.directory="./extensions" \
     -Ddruid.extensions.hadoopDependenciesDir="hadoop-dependencies" \
     org.apache.druid.cli.Main tools pull-deps \
     --no-default-hadoop \
     -c "org.apache.druid.extensions.contrib:statsd-emitter:0.15.0-incubating"
   ```

   이 단계에 대한 자세한 내용은 [Druid 확장 프로그램 로드에 대한 공식 가이드][9]에서 확인할 수 있습니다.

2. 다음 구성을 추가하여 Druid Java 속성을 업데이트합니다.

   ```conf
   # Add `statsd-emitter` to the extensions list to be loaded
   druid.extensions.loadList=[..., "statsd-emitter"]

   # By default druid emission period is 1 minute (PT1M).
   # We recommend using 15 seconds instead:
   druid.monitoring.emissionPeriod=PT15S

   # Use `statsd-emitter` extension as metric emitter
   druid.emitter=statsd

   # Configure `statsd-emitter` endpoint
   druid.emitter.statsd.hostname=127.0.0.1
   druid.emitter.statsd.port:8125

   # Configure `statsd-emitter` to use dogstatsd format. Must be set to true, otherwise tags are not reported correctly to Datadog.
   druid.emitter.statsd.dogstatsd=true
   druid.emitter.statsd.dogstatsdServiceAsTag=true
   ```

3. Druid를 다시 시작하여 DogStatsD를 통해 Druid 메트릭을 Agent로 전송합니다. 

#### 통합 서비스 점검

`druid.d/conf.yaml` 파일의 기본 구성을 사용하여 Druid 서비스 점검 수집을 활성화합니다. 사용 가능한 모든 구성 옵션은 샘플 [druid.d/conf.yaml][6]을 참조하세요.

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. datadog.yaml 파일에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

2. `druid.d/conf.yaml`의 하단에서 이 구성 블록의 주석 처리를 제거하고 편집합니다.

   ```yaml
   logs:
     - type: file
       path: '<PATH_TO_DRUID_DIR>/var/sv/*.log'
       source: druid
       service: '<SERVICE_NAME>'
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-\d{2}\-\d{2}
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다.

3. [에이전트를 다시 시작][7]합니다.

### 검증

[Agent의 상태 하위 명령을 실행][10]하고 Checks 섹션에서 `druid`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "druid" >}}


### 이벤트

Druid 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "druid" >}}


## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/druid/images/druid_dashboard_overview.png
[2]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[3]: https://druid.apache.org/docs/latest/operations/metrics.html
[4]: https://docs.datadoghq.com/ko/agent/
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://druid.apache.org/docs/latest/development/extensions-contrib/statsd.html
[9]: https://druid.apache.org/docs/latest/operations/including-extensions.html
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/druid/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/druid/assets/service_checks.json
[13]: https://docs.datadoghq.com/ko/help/