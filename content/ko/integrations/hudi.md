---
app_id: hudi
app_uuid: ee9cd120-9667-4a81-a309-c34f5942406a
assets:
  dashboards:
    Hudi Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hudi.action.duration
      metadata_path: metadata.csv
      prefix: hudi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10217
    source_type_name: Hudi
  monitors:
    Commit duration is high: assets/monitors/commit_duration.json
  saved_views:
    hudi_error_logs: assets/saved_views/error_logs.json
    hudi_overview: assets/saved_views/hudi_overview.json
    hudi_patterns: assets/saved_views/hudi_patterns.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hudi/README.md
display_on_public_website: true
draft: false
git_integration_title: hudi
integration_id: hudi
integration_title: Hudi
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: hudi
public_title: Hudi
short_description: Hudi 구성에 대한 메트릭을 추적하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Hudi 구성에 대한 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hudi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [Hudi][1]를 모니터링합니다.
Hudi [버전][2] `0.10.0` 이상과 호환됩니다.

## 설정

### 설치

Hudi 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Hudi에서 [JMX Metrics Reporter][5]를 [구성합니다][4]:

    ```
    hoodie.metrics.on=true
    hoodie.metrics.reporter.type=JMX
    hoodie.metrics.jmx.host=<JMX_HOST>
    hoodie.metrics.jmx.port=<JMX_PORT>
    ```


2. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `hudi.d/conf.yaml`를 편집하여
   Hudi 성능 데이터를 수집합니다.
   사용 가능한 모든 구성 옵션은 [샘플 hudi.d/conf.yaml][6]을 참조하세요.

   이 점검에는 인스턴스당 메트릭이 350개로 제한됩니다. 반환된 메트릭 수는 Datadog Agent [상태 명령][7]을 실행할 때 표시됩니다.
   [구성][6]을 편집하여 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭을 사용자 정의하는 자세한 방법은 [JMX Checks 문서][8]를 참조하세요.
   더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][9]에 문의하세요.

3. [Agent를 재시작합니다][10]


### 검증

[Agent의 `status` 하위 명령을 실행][11]하고 Checks 섹션에서 `hudi`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hudi" >}}



### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Hudi는 기본적으로 `log4j` 로거를 사용합니다. 형식을 사용자 정의하려면 [Flink][13] 또는 [Spark][14] `conf` 디렉터리에서 `log4j.properties` 파일을 편집하세요. 예제 `log4j.properties` 파일은 다음과 같습니다:

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. 기본적으로 Datadog 의 통합 파이프라인은 다음과 같은 변환 패턴을 지원합니다.

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   유효한 타임스탬프의 예는 `2020-02-03 18:43:12,251`입니다.

   형식이 다른 경우 [통합 파이프라인][15]을 복제하고 편집합니다.

3. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

4. `hudi.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집합니다. 환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 hudi.d/conf.yaml][6]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/hudi.log
       source: hudi
       log_processing_rules:
         - type: multi_line
           pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           name: new_log_start_with_date
   ```
### 이벤트

Hudi 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "hudi" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://hudi.apache.org/
[2]: https://github.com/apache/hudi/releases
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://hudi.apache.org/docs/configurations#Metrics-Configurations
[5]: https://hudi.apache.org/docs/metrics/#jmxmetricsreporter
[6]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/integrations/java/
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/hudi/metadata.csv
[13]: https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf
[14]: https://github.com/apache/spark/tree/v3.1.2/conf
[15]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines