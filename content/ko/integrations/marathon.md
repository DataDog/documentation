---
app_id: marathon
categories:
- 설정 및 배포
- 컨테이너
- 로그 수집
custom_kind: 통합
description: '애플리케이션 메트릭 추적: 필요한 메모리와 디스크 용량, 인스턴스 수 등'
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
title: Marathon
---
## 개요

Agent Marathon 점검을 통해 다음을 수행할 수 있습니다.

- 모든 애플리케이션의 상태를 추적합니다. 구성된 메모리, 디스크, CPU, 인스턴스를 확인하고 정상 작업과 비정상 작업 수를 모니터링하세요.
- 대기 중인 애플리케이션 수 및 배포 수 모니터링

## 설정

### 설치

Marathon 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

### 설정

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [Containerized](#containerized) 섹션을 참조하세요.

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에서 `marathon.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 marathon.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example)을 참고하세요.

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

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Marathon은 로그백을 사용하므로 커스텀 로그 형식을 지정할 수 있습니다. Datadog을 사용하면 기본적으로 Marathon에서 제공하는 기본 형식과 Datadog 권장 형식이라는 두 가지 형식이 지원됩니다. 다음 예와 같이 구성에 파일 어펜더를 추가하고 선택한 형식으로 `$PATTERN$`를 바꿉니다.

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

1. Marathon 로그 수집을 시작하려면 `marathon.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `marathon`                             |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `marathon`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **marathon.apps** <br>(gauge) | 애플리케이션 수|
| **marathon.backoffFactor** <br>(gauge) | 연속된 작업 실행 실패마다 적용되는 백오프 시간의 곱셈 계수; app_id 및 버전으로 태그됨|
| **marathon.backoffSeconds** <br>(gauge) | 작업 백오프 기간; app_id 및 버전으로 태그됨<br>_second로 표시됨_ |
| **marathon.cpus** <br>(gauge) | 특정 애플리케이션의 각 인스턴스에 구성된 CPU 수|
| **marathon.deployments** <br>(gauge) | 실행 중이거나 대기 중인 배포 수|
| **marathon.disk** <br>(gauge) | 특정 애플리케이션의 각 인스턴스에 구성된 CPU<br>_mebibyte로 표시됨_ |
| **marathon.instances** <br>(gauge) | 특정 애플리케이션의 인스턴스 수; app_id와 버전으로 태그 지정됨|
| **marathon.mem** <br>(gauge) | 특정 애플리케이션의 각 인스턴스에 구성된 메모리; app_id와 버전으로 태그됨<br>_mebibyte로 표시됨_ |
| **marathon.queue.count** <br>(gauge) | 실행해야 할 인스턴스 수<br>_task로 표시됨_ |
| **marathon.queue.delay** <br>(gauge) | 다음 실행 시도 전 대기 시간<br>_second로 표시됨_ |
| **marathon.queue.offers.processed** <br>(gauge) | 이번 실행 시도에서 처리된 오퍼 수<br>_task로 표시됨_ |
| **marathon.queue.offers.reject.last** <br>(gauge) | 최근 모든 오퍼에서 사용되지 않은 오퍼 요약<br>_task로 표시됨_ |
| **marathon.queue.offers.reject.launch** <br>(gauge) | 이번 실행 시도에서 사용되지 않은 오퍼 요약<br>_task로 표시됨_ |
| **marathon.queue.offers.unused** <br>(gauge) | 이번 실행 시도에서 사용되지 않은 오퍼 수<br>_task로 표시됨_ |
| **marathon.queue.size** <br>(gauge) | 애플리케이션 오퍼 대기열 수<br>_task로 표시됨_ |
| **marathon.taskRateLimit** <br>(gauge) | 특정 애플리케이션 작업 속도 제한; app_id 및 버전으로 태그됨|
| **marathon.tasksHealthy** <br>(gauge) | 특정 애플리케이션의 정상 작업 수; app_id와 버전으로 태그됨<br>_task로 표시됨_ |
| **marathon.tasksRunning** <br>(gauge) | 특정 애플리케이션에서 실행 중인 작업 수; app_id와 버전으로 태그됨<br>_task로 표시됨_ |
| **marathon.tasksStaged** <br>(gauge) | 특정 애플리케이션에 준비된 작업 수; app_id와 버전으로 태그됨<br>_task로 표시됨_ |
| **marathon.tasksUnhealthy** <br>(gauge) | 특정 애플리케이션의 비정상 작업 수; app_id와 버전으로 태그됨<br>_task로 표시됨_ |

### 이벤트

Marathon 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**marathon.can_connect**

API 엔드포인트에 연결할 수 없거나 실행 중인 애플리케이션 인스턴스가 없는 경우 CRITICAL. 애플리케이션이 감지되지 않으면 WARN. 수집 시점의 응답 상태에 관한 추가 정보가 점검 메시지에 포함됩니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.