---
app_id: activemq
app_uuid: ab0b15e8-b7ae-4570-bde2-433a079cdb83
assets:
  dashboards:
    activemq: assets/dashboards/activemq_dashboard.json
    artemis: assets/dashboards/artemis_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - activemq.queue.size
      - activemq.artemis.queue.message_count
      metadata_path: metadata.csv
      prefix: activemq.
    process_signatures:
    - activemq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 40
    source_type_name: ActiveMQ
  logs:
    source: activemq
  monitors:
    '[ActiveMQ Artemis] High disk store usage': assets/monitors/activemq_artemis_high_disk_store.json
    '[ActiveMQ Artemis] High unrouted messages': assets/monitors/activemq_artemis_unrouted_messages.json
  saved_views:
    activemq_processes: assets/saved_views/activemq_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- message queues
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/activemq/README.md
display_on_public_website: true
draft: false
git_integration_title: activemq
integration_id: activemq
integration_title: ActiveMQ
integration_version: 3.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: activemq
public_title: ActiveMQ
short_description: 브로커와 큐, 프로듀서와와 컨슈머 등을 위해 메트릭을 수집하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::로그 수집
  - Category::메시지 큐
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 브로커와 큐, 프로듀서, 컨슈머 등을 위해 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ActiveMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

ActiveMQ 점검으로 브로커와 큐, 프로듀서, 컨슈머 등을 위해 메트릭을 수집합니다.

**참고:** 본 점검은 ActiveMQ Artemis(향후 ActiveMQ 버전 `6`) 또한 지원하며, `activemq.artemis` 네임스페이스에서 메트릭을 보고합니다. 본 통합이 제공하는 메트릭 목록을 확인하려면  [metadata.csv][1]를 참조하세요.

**참고**: ActiveMQ 5.8.0 이전 버전을 실행 중이라면 [에이전트 5.10.x 릴리스 샘플 파일][2]을 참조하세요.

## 설정

### 설치

에이전트의 ActiveMQ 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있으므로 ActiveMQ 노드에 추가로 설치할 필요가 없습니다.

본 점검 기능으로 [JMXFetch][4]를 활용하여 JMX에서 메트릭 을 수집합니다. 에이전트에서 JMXFetch를 실행하려면 각 노드에 JVM이 필요합니다. Datadog은 오라클 제공 JVM을 사용할 것을 권장합니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. **ActiveMQ 서버에 [JMX Remote가 활성화][1]되어 있는지 확인합니다.**
2. 에이전트를 설정하여 ActiveMQ에 연결합니다.  [Agent 설정 디렉터리][2] 루트의 `conf.d/` 폴더에서 `activemq.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션을 확인하려면 [sample mysql.d/conf.yaml][3]을 참조합니다. 기본 수집 메트릭 목록을 보려면 [`metrics.yaml` 파일][4]을 확인하세요. 

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

3. [에이전트 재시작][5]

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. ActiveMQ 로그 수집을 시작하려면 다음 설정 블록을 `activemq.d/conf.yaml` 파일에 추가합니다.

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [에이전트를 재시작합니다][5].

[1]: https://activemq.apache.org/jmx.html
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `activemq`                           |
| `<INIT_CONFIG>`      | `"is_jmx": true`                     |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%","port":"1099"}` |

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/containers/guide/autodiscovery-with-jmx/?tab=containeragent
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `activemq`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "activemq" >}}
ActiveMQ Artemis flavor와 연관된 메트릭 이름에는 `artemis` 이 들어가고, 그 외에는 모두 ActiveMQ "클래식"으로 보고됩니다.

### 이벤트

ActiveMQ 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "activemq" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [ActiveMQ 아키텍처 및 키 메트릭][7]
- [ActiveMQ 메트릭 및 성능 모니터링][8]




<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## ActiveMQ XML 통합

## 개요

ActiveMQ XML에서 다음 목적으로 메트릭을 실시간으로 가져옵니다:

- ActiveMQ XML 상태 시각화 및 모니터링.
- ActiveMQ XML 장애 및 이벤트에 대한 알림 수신.

## 설정

### 설치

ActiveMQ XML 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있으므로 서버에 설치할 필요가 없습니다.

### 설정

호스트에서 실행되는 에이전트의 경우 하단의 지침에 따라 점검을 설정합니다. 컨테이너화된 환경이라면 [컨테이너화](#containerized) 섹션을 참조하세요.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. `url` 통계 [에이전트 구성 디렉터리][9] 루트에 있는 `conf.d/` 폴더에서 `activemq_xml.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 설정 옵션 전체를 확인하려면 [activemq_xml.d/conf.yaml 샘플][10]을 참고하세요.

   **참고**: ActiveMQ XML 통합 설정은 [커스텀 메트릭][11]을 내보낼 가능성이 있으며, [빌링][12]에 영향을 미칠 수도 있습니다. 이는 350 메트릭의 기본값으로 제한되어 있습니다. 메트릭이 추가로 필요한 경우 [Datadog 지원 팀][6]에 문의하세요.

2. [에이전트를 다시 시작합니다][13].

##### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. ActiveMQ 로그 수집을 시작하려면 다음 설정 블록을 `activemq_xml.d/conf.yaml` 또는 `activemq.d/conf.yaml` 파일에 추가합니다.

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [에이전트를 다시 시작합니다][13].

<!-- xxz tab xxx -->
<!-- xxx tab "컨테이너화된 환경" xxx -->

#### 컨테이너화된 환경

컨테이너화된 환경이라면 [JMX 자동탐지][14] 지침을 참조하세요.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `activemq_xml`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "activemq_xml" >}}


### 이벤트

ActiveMQ XML 점검에는 이벤트가 포함되지 않습니다.

### 서비스 검사

ActiveMQ XML 점검에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

- [ActiveMQ 메트릭 및 성능 모니터링][8]


[1]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[2]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/jmxfetch
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[8]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ko/developers/metrics/custom_metrics/
[12]: https://docs.datadoghq.com/ko/account_management/billing/custom_metrics/
[13]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent