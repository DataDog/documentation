---
app_id: marathon
app_uuid: fe9a038e-3948-4646-9a1c-ea1f1cc59977
assets:
  dashboards:
    marathon-overview: assets/dashboards/marathon-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marathon.apps
      metadata_path: metadata.csv
      prefix: marathon.
    process_signatures:
    - start --master mesos marathon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 82
    source_type_name: Marathon
  saved_views:
    marathon_processes: assets/saved_views/marathon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/marathon/README.md
display_on_public_website: true
draft: false
git_integration_title: marathon
integration_id: marathon
integration_title: Marathon
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: marathon
public_title: Marathon
short_description: '애플리케이션 메트릭을 추적하세요: 필요한 메모리, 디스크, 인스턴스 수 등.'
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: '애플리케이션 메트릭을 추적하세요: 필요한 메모리, 디스크, 인스턴스 수 등.'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Marathon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Agent Marathon 점검을 통해 다음을 수행할 수 있습니다.

- 모든 애플리케이션의 상태를 추적합니다. 구성된 메모리, 디스크, CPU, 인스턴스를 확인하고 정상 작업과 비정상 작업 수를 모니터링하세요.
- 대기 중인 애플리케이션 수 및 배포 수 모니터링

## 설정

### 설치

 Marathon 점검은 [Datadog Agent][1] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 구성

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [Containerized](#containerized) 섹션을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1]의 루트의 `conf.d/` 폴더에 있는 `marathon.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [sample marathon.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     # the API endpoint of your Marathon master; required
     - url: "https://<SERVER>:<PORT>"
       # if your Marathon master requires ACS auth
       #   acs_url: https://<SERVER>:<PORT>

       # the username for Marathon API or ACS token authentication
       username: "<USERNAME>"

       # the password for Marathon API or ACS token authentication
       password: "<PASSWORD>"
   ```

   `username` 및 `password` 의 기능은 `acs_url` 구성 여부에 따라 달라집니다. 그렇게 하면 Agent는 이를 사용하여 ACS에서 인증 토큰을 요청한 다음 이를 Marathon API에 인증하는 데 사용합니다. 그렇지 않은 경우 Agent는 `username` 및 `password` 를 사용하여 Marathon API에 직접 인증합니다.

2. [에이전트를 재시작][3]하세요.

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. Marathon은 로그백을 사용하므로 커스텀 로그 형식을 지정할 수 있습니다. Datadog을 사용하면 기본적으로 Marathon에서 제공하는 기본 형식과 Datadog 권장 형식이라는 두 가지 형식이 지원됩니다. 다음 예와 같이 구성에 파일 어펜더를 추가하고 선택한 형식으로 `$PATTERN$`를 바꿉니다.

   - Marathon 기본값: `[%date] %-5level %message \(%logger:%thread\)%n`
   - Datadog 권장: `%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n`

   ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <configuration>
         <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
         <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
             <encoder>
                 <pattern>[%date] %-5level %message \(%logger:%thread\)%n</pattern>
             </encoder>
         </appender>
         <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
             <appender-ref ref="stdout" />
             <queueSize>1024</queueSize>
         </appender>
         <appender name="FILE" class="ch.qos.logback.core.FileAppender">
             <file>/var/log/marathon.log</file>
             <append>true</append>
             <!-- set immediateFlush to false for much higher logging throughput -->
             <immediateFlush>true</immediateFlush>
             <encoder>
                 <pattern>$PATTERN$</pattern>
             </encoder>
         </appender>
         <root level="INFO">
             <appender-ref ref="async"/>
             <appender-ref ref="FILE"/>
         </root>
     </configuration>
   ```

3. Marathon 로그 수집을 시작하려면 `marathon.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

4. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `marathon`                             |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][2]하고 Checks 섹션에서 `marathon`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "marathon" >}}


### 이벤트

Marathon 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "marathon" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/