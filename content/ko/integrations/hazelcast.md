---
app_id: hazelcast
app_uuid: 00434289-3c74-4c25-8841-9e0c826510c2
assets:
  dashboards:
    Hazelcast Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - hazelcast.mc.license_expiration_time
      - hazelcast.instance.running
      metadata_path: metadata.csv
      prefix: hazelcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10095
    source_type_name: Hazelcast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 저장소
- 캐싱(caching)
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md
display_on_public_website: true
draft: false
git_integration_title: Hazelcast
integration_id: Hazelcast
integration_title: Hazelcast
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: Hazelcast
public_title: Hazelcast
short_description: Hazelcast 회원 및 관리 센터를 모니터링합니다.
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
  - 카테고리::데이터 저장
  - 카테고리::캐싱(Caching)
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Hazelcast 회원 및 관리 센터를 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hazelcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검 는 [헤이즐캐스트][1] v4.0 이상을 모니터링합니다.

## 설정

### 설치

헤이즐캐스트 점검 는 [Datadog 에이전트 ][2] 패키지 에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면 

##### 메트릭 수집

1. 루트의 `conf.d/` 폴더에 있는 `hazelcast.d/conf.yaml` 파일을 편집합니다.
   에이전트의 설정 디렉터리에서 Hazelcast 성능 데이터 수집을 시작하세요.
   사용 가능한 모든 설정 옵션은 [hazelcast.d/conf.yaml 샘플][1]을 참조하세요.

   이 점검은 인스턴스당 350개 메트릭으로 제한됩니다. 반환된 메트릭 개수는 [상태 페이지][2]에 표시됩니다.
   아래 구성을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭 을 사용자 지정하는 방법을 알아보려면 [JMX 점검 설명서][3]에서 자세한 지침을 참조하세요.
   더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][4]에 문의하세요.

2. [에이전트를 재시작합니다][5].

##### 로그 수집

1. Hazelcast는 다양한 [로깅 어댑터][6]를 지원합니다. 다음은 `log4j2.properties` 파일의 예입니다:

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

2. 기본적으로 Datadog 의 통합 파이프라인은 다음과 같은 변환[패턴][7]을 지원합니다:

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

    다른 형식이 있는 경우 [통합 파이프라인][8]을 복제하여 편집합니다.

3. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

4. `hazelcast.d/conf.yaml` 파일에 다음 설정 블록을 추가합니다. 환경 에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [hazelcast.d/conf.yaml 샘플][1]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [에이전트를 재시작합니다][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/integrations/java/
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[7]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[8]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화

##### 메트릭 수집

컨테이너화된 환경의 경우 [JMX를 사용한 자동탐지][1] 가이드를 참조하세요.

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있습니다. 활성화하려면 [도커(Docker) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hazelcast", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ko/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[ 에이전트 의 상태 하위 명령어][3]를 실행하고 **JMXFetch** 섹션에서 `hazelcast` 을 찾습니다:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hazelcast" >}}


### 서비스 점검
{{< get-service-checks-from-git "hazelcast" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.



[1]: https://hazelcast.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/