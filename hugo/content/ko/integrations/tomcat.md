---
app_id: tomcat
app_uuid: 9497c2d8-63cb-4d90-b73c-f32065349fe1
assets:
  dashboards:
    tomcat: assets/dashboards/metrics.json
    tomcat--overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tomcat.threads.count
      metadata_path: metadata.csv
      prefix: tomcat.
    process_signatures:
    - java tomcat
    - java org.apache.catalina.startup.Bootstrap
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 43
    source_type_name: Tomcat
  monitors:
    All threads are busy: assets/monitors/thread_count_max.json
    Busy threads number is high: assets/monitors/thread_busy.json
    Error rate is high: assets/monitors/error_count.json
    Processing time has a spike: assets/monitors/max_proc_time.json
    Processing time is anomalous: assets/monitors/processing_time.json
    Request rate is anomalous: assets/monitors/req_count.json
  saved_views:
    tomcat_4xx: assets/saved_views/tomcat_4xx.json
    tomcat_5xx: assets/saved_views/tomcat_5xx.json
    tomcat_overview: assets/saved_views/tomcat_overview.json
    tomcat_processes: assets/saved_views/tomcat_processes.json
    tomcat_status_code_overview: assets/saved_views/tomcat_status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md
display_on_public_website: true
draft: false
git_integration_title: tomcat
integration_id: tomcat
integration_title: Tomcat
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: tomcat
public_title: Tomcat
short_description: 초당 요청, 제공된 바이트, 캐시 히트, servlet 메트릭 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 초당 요청, 제공된 바이트, 캐시 히트, servlet 메트릭 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-tomcat-metrics
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/tomcat-architecture-and-performance
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/analyzing-tomcat-logs-and-metrics-with-datadog
  support: README.md#Support
  title: Tomcat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Tomcat 대시보드][1]

## 개요

이 점검은 Tomcat 메트릭을 수집합니다. 예:

- 전체 활동 메트릭: 오류 수, 요청 수, 처리 시간 등
- 스레드 풀 메트릭: 스레드 수, 사용 중인 스레드 수 등
- Sevlet 처리 시간

## 설정

### 설치

Tomcat 점검은 [Datadog Agent[2]] 패키지에 포함되어 있으므로 Tomcat 서버에 아무 것도 설치할 필요가 없습니다.

이 점검은 JMX 기반이므로, Tomcat 서버에서 JMX Remote를 활성화해야 합니다. [Tomcat 모니터링 및 관리][3]의 지침을 따릅니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. `tomcat.d/conf.yaml` 파일을 [Agent 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 수정하여 Tomcat 메트릭과 [로그](#log-collection)를 수집하세요. 사용 가능한 모든 설정 옵션은 [샘플 tomcat.d/conf.yaml][2]에서 확인할 수 있습니다.

2. [에이전트를 재시작][3]하세요.

모든 JMX 기반 점검에서 사용할 수 있는 구성 옵션 목록은 [JMX 점검 설명서][4]를 참조하세요.

#### 메트릭 목록

`conf` 파라미터는 연동에서 수집할 지표의 목록입니다. 두 개의 키만 허용됩니다.

- `include` (**필수**): 필터 사전입니다. 이 필터와 일치하는 모든 속성은 `exclude` 필터와도 일치하지 않는 한 수집됩니다(아래 참조).
- `exclude` (**옵션**): 필터 사전입니다. 이 필터와 일치하는 속성은 수집되지 않습니다.

주어진 bean에 메트릭은 다음과 같은 방식으로 태그가 지정됩니다.

```text
mydomain:attr0=val0,attr1=val1
```

이 예제에서 메트릭은 `mydomain` (또는 bean 내부의 속성에 따라 일부 변형)이며 `attr0:val0`, `attr1:val1`, `domain:mydomain` 태그가 있습니다.

`include` 키에 _카멜(camel) 케이스_ 형식의 별칭을 지정하면 _스네이크(snake) 케이스_로 변환됩니다. 예를 들어 `MyMetricName`는 Datadog에서 `my_metric_name`로 표시됩니다.

##### 속성 필터

`attribute` 필터는 다음 두 가지 유형의 값을 허용합니다.

- 키가 속성 이름인 사전입니다(아래 참조). 이 경우 Datadog에서 메트릭의 별칭을 지정해 메트릭 이름으로 사용할 수 있습니다. 메트릭 유형을 게이지 또는 카운터로 지정할 수도 있습니다. 카운터를 선택하면 해당 메트릭의 초당 비율이 계산됩니다.

  ```yaml
  conf:
    - include:
      attribute:
        maxThreads:
          alias: tomcat.threads.max
          metric_type: gauge
        currentThreadCount:
          alias: tomcat.threads.count
          metric_type: gauge
        bytesReceived:
          alias: tomcat.bytes_rcvd
          metric_type: counter
  ```

- 속성 이름 목록입니다(아래 참조). 이 경우 메트릭 유형은 게이지이고 메트릭 이름은 `jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]`입니다.

  ```yaml
  conf:
    - include:
      domain: org.apache.cassandra.db
      attribute:
        - BloomFilterDiskSpaceUsed
        - BloomFilterFalsePositives
        - BloomFilterFalseRatio
        - Capacity
        - CompressionRatio
        - CompletedTasks
        - ExceptionCount
        - Hits
        - RecentHitRate
  ```

#### 로그 수집


1. Datadog에 로그를 제출하려면 Tomcat은 `log4j` 로거를 사용합니다. 8.0 이전 버전의 Tomcat의 경우 `log4j`가 기본적으로 구성됩니다. Tomcat 8.0 이상의 경우 `log4j`를 사용하도록 Tomcat을 구성해야 합니다([Log4j 사용하기][5] 참조). 해당 지침의 첫 번째 단계에서 `$CATALINA_BASE/lib` 디렉터리에 있는 `log4j.properties` 파일을 다음과 같이 편집합니다.

   ```conf
     log4j.rootLogger = INFO, CATALINA

     # Define all the appenders
     log4j.appender.CATALINA = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.CATALINA.File = /var/log/tomcat/catalina.log
     log4j.appender.CATALINA.Append = true

     # Roll-over the log once per day
     log4j.appender.CATALINA.layout = org.apache.log4j.PatternLayout
     log4j.appender.CATALINA.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.LOCALHOST = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.LOCALHOST.File = /var/log/tomcat/localhost.log
     log4j.appender.LOCALHOST.Append = true
     log4j.appender.LOCALHOST.layout = org.apache.log4j.PatternLayout
     log4j.appender.LOCALHOST.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.MANAGER.File = /var/log/tomcat/manager.log
     log4j.appender.MANAGER.Append = true
     log4j.appender.MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.HOST-MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.HOST-MANAGER.File = /var/log/tomcat/host-manager.log
     log4j.appender.HOST-MANAGER.Append = true
     log4j.appender.HOST-MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.HOST-MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender
     log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout
     log4j.appender.CONSOLE.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     # Configure which loggers log to which appenders
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost] = INFO, LOCALHOST
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager] =\
       INFO, MANAGER
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager] =\
       INFO, HOST-MANAGER
   ```
   그런 다음 [Tomcat 설명서][5]의 나머지 단계에 따라 `log4j`를 구성합니다.

2. 기본적으로 Datadog 통합 파이프라인은 다음과 같은 전환 패턴을 지원합니다.

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
   ```

    다른 형식이 있는 경우 [통합 파이프라인][6]을 복제하여 편집하세요. Tomcat 로깅 기능에 대한 자세한 내용은 [Tomcat에서 로깅하기][7]를 참조하세요.

3. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

4. 이 구성 블록을 `tomcat.d/conf.yaml` 파일에 추가하여 Tomcat 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/tomcat/*.log
       source: tomcat
       service: "<SERVICE>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 tomcat.yaml][2]을 참조하세요.

5. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/integrations/java/
[5]: https://tomcat.apache.org/tomcat-8.0-doc/logging.html#Using_Log4j
[6]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
[7]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [JMX를 사용한 자동탐지][1] 가이드를 참조하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent 상태 하위 명령][4]을 실행하고 **Checks** 섹션에서 `tomcat`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "tomcat" >}}


### 이벤트

Tomcat 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "tomcat" >}}


## 트러블슈팅

### 누락된 `tomcat.*` 메트릭

Datadog Agent는 Datadog Agent 버전 **7.49.0** 이상에서 `Catalina` 또는 `Tomcat`을 빈 도메인 이름으로 사용하여 JMX 메트릭을 수집합니다. 이전 버전에서는 `Catalina`를 빈 도메인 이름으로 사용하는 메트릭만 수집했습니다.
독립 실행형 Tomcat 배포에는 `Catalina` 도메인에 메트릭이 포함되지만, 임베디드 Tomcat 배포(예: Spring Boot)에는 `Tomcat` 도메인에 메트릭이 포함됩니다.

버전이 **7.49.0**보다 오래된 경우 및 Datadog Agent 버전이 **7.49.0**보다 이전 버전이고 노출된 Tomcat 메트릭에 `Tomcat`가 같은 다른 빈 도메인 이름이 접두사로 붙은 경우, `metrics.yaml` 파일의 기본 메트릭을 `tomcat.d/conf.yaml` 파일의 `conf` 섹션으로 복사하고 해당 빈 도메인 이름을 사용하도록 `domain` 필터를 수정합니다.

```yaml
- include:
    domain: Tomcat
    type: ThreadPool
    attribute:
      maxThreads:
        alias: tomcat.threads.max
        metric_type: gauge
      currentThreadCount:
        alias: tomcat.threads.count
        metric_type: gauge
      currentThreadsBusy:
        alias: tomcat.threads.busy
        metric_type: gauge
```

자세한 내용은 [JMX 점검 설명서][5]를 참조하세요.

### 사용 가능한 메트릭을 보기 위한 명령

`datadog-agent jmx` 명령을 사용하면 JMXFetch 통합에서 트러블슈팅 명령을 실행할 수 있습니다. Linux 시스템에서는 명령 앞에 `sudo -u dd-agent`를 추가해 Datadog Agent가 올바른 사용자로 실행되도록 해야 합니다.

#### datadog-agent jmx collect
`datadog-agent jmx collect`를 실행하면 현재 구성에 따라 메트릭 수집이 시작되고 콘솔에 표시됩니다.

#### datadog-agent jmx list
`datadog-agent jmx list`에는 사용 가능한 여러 하위 명령이 있습니다.
- `collected` - 현재 인스턴스의 구성으로 실제로 수집되는 속성을 나열합니다.
- `everything` - JMXFetch에서 지원하는 유형이 있는 사용 가능한 모든 속성을 나열합니다.
- `limited` - 인스턴스의 구성 중 하나와 일치하지만 수집할 수 있는 메트릭 수를 초과하여 수집되지 않는 속성을 나열합니다.
- `matching` - 인스턴스의 구성 중 하나 이상과 일치하는 속성을 나열합니다.
- `not-matching` - 인스턴스의 구성과 일치하지 않는 속성을 나열합니다.
- `with-metrics` - 인스턴스의 구성 중 하나 이상과 일치하는 속성 및 메트릭 데이터를 나열합니다.
- `with-rate-metrics` - 요금 및 카운터를 포함하여 인스턴스의 구성 중 하나 이상과 일치하는 속성 및 메트릭 데이터를 나열합니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 사용해 Tomcat 메트릭 모니터링][6]
- [Tomcat 모니터링을 위한 주요 메트릭][7]
- [Datadog를 사용해 Tomcat 로그 및 메트릭 분석하기][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://tomcat.apache.org/tomcat-10.1-doc/monitoring.html
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/integrations/java/
[6]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[7]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance
[8]: https://www.datadoghq.com/blog/analyzing-tomcat-logs-and-metrics-with-datadog