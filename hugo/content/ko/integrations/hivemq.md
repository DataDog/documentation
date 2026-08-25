---
app_id: hivemq
app_uuid: ba1769d1-c71b-4cf1-8169-8ce3b66629dd
assets:
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hivemq.messages.queued.count
      metadata_path: metadata.csv
      prefix: hivemq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10101
    source_type_name: HiveMQ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- iot
- 로그 수집
- 메시지 큐
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md
display_on_public_website: true
draft: false
git_integration_title: hivemq
integration_id: hivemq
integration_title: HiveMQ
integration_version: 1.8.0
is_public: true
manifest_version: 2.0.0
name: hivemq
public_title: HiveMQ
short_description: HiveMQ 클러스터를 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::IoT
  - Category::Log Collection
  - 카테고리::메세지 큐
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: HiveMQ 클러스터를 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  support: README.md#Support
  title: HiveMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[HiveMQ][1]는 MQTT 기반 메시지 플랫폼으로, 연결된 IoT 디바이스에서 또는 해당 디바이스로 빠르고 효율적이며 안정적인 데이터 전송이 가능하도록 설계되었습니다.
MQTT 3.1, 3.1.1 및 5.0 준수 브로커입니다.

## 설정

### 설치

HiveMQ 점검이 [Datadog 에이전트][2] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. 루트의 `conf.d/` 폴더에 있는 `hivemq.d/conf.yaml` 파일을 편집합니다.
   에이전트의 설정 디렉터리를 사용하여 HiveMQ 성능 데이터 수집을 시작하세요.
   사용 가능한 모든 설정 옵션은 [hivemq.d/conf.yaml 샘플][1]을 참조하세요.

   이 점검은 인스턴스당 350개 메트릭으로 제한됩니다. 반환된 메트릭 개수는 [상태 페이지][2]에 표시됩니다.
   아래 구성을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   수집을 위해 메트릭을 사용자 지정하는 방법을 알아보려면 [JMX 점검 설명서][3]에서 자세한 지침을 확인하세요.
   더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][4]에 문의하세요.

2. [에이전트 재시작][5]

##### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `hivemq.d/conf.yaml` 파일에 다음 설정 블록을 추가합니다. 환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [hivemq.d/conf.yaml 샘플][1]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

3. [에이전트를 재시작합니다][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/integrations/java
[4]: https://docs.datadoghq.com/ko/help
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화

##### 메트릭 수집

컨테이너화된 환경의 경우 [JMX를 사용한 자동탐지][1] 가이드를 참조하세요.

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있습니다. 활성화하려면 [도커(Docker) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<SERVICE_NAME>"}` |

### 검증

[에이전트 상태 하위 명령어][3]를 실행하고 **JMXFetch** 섹션에서 `hivemq`를 찾습니다.

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

[1]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ko/agent/docker/log/
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hivemq" >}}


### 서비스 점검
{{< get-service-checks-from-git "hivemq" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog에서 HiveMQ 및 OpenTelemetry를 사용하여 IoT 애플리케이션을 모니터링하세요.][4]


[1]: https://www.hivemq.com/hivemq/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/help
[4]: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/