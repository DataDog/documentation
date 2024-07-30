---
app_id: confluent-platform
app_uuid: 14e9ea66-bd7c-4c84-b642-a0290166deb4
assets:
  dashboards:
    Confluent Platform Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: confluent.kafka.producer.outgoing_byte_rate
      metadata_path: metadata.csv
      prefix: confluent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10091
    source_type_name: Confluent Platform
  monitors:
    '[Confluent Platform] Unclean leader election': assets/monitors/unclean_leader_election.json
    '[Confluent Platform] Unused topic partition': assets/monitors/unused_partition.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/confluent_platform/README.md
display_on_public_website: true
draft: false
git_integration_title: confluent_platform
integration_id: confluent-platform
integration_title: Confluent Platform
integration_version: 1.10.2
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: confluent_platform
public_title: Confluent Platform
short_description: Confluent Platform 컴포넌트를 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Confluent Platform 컴포넌트를 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Confluent Platform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog Agent를 통해 Confluent Platform 및 Kafka 컴포넌트를 모니터링합니다.

이 통합은 다음 컴포넌트에 대한 JMX 메트릭을 수집합니다.

- Broker
- Connect
- Replicator
- Schema Registry
- ksqlDB Server
- Streams
- REST Proxy

## 설정


### 설치

Confluent Platform 점검은 [Datadog Agent][1] 패키지에 포함되어 있습니다. Confluent Platform 컴포넌트 서버에는 추가 설치가 필요하지 않습니다.

**참고**: 이 점검은 JMX를 사용하여 메트릭을 수집합니다. Agent가 [jmxfetch][2]를 실행하려면 각 노드에 JVM이 필요합니다. Oracle에서 제공하는 JVM 사용을 권장합니다.


### 구성

1. Confluent Platform 성능 데이터를 수집하려면 Agent 설정 디렉터리 루트의 `conf.d/` 폴더에서 `confluent_platform.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 confluent_platform.d/conf.yaml][3]을 참조하세요.

   각 컴포넌트에 대해 JMX 메트릭을 수집하려면 별도의 인스턴스를 생성해야 합니다. 수집된 기본 메트릭 목록은 다음 예와 같이 [`metrics.yaml` 파일][4]에 나타납니다.

    ```yaml
    instances:
     - host: localhost
       port: 8686
       name: broker_instance
       user: username
       password: password
     - host: localhost
       port: 8687
       name: schema_registry_instance
     - host: localhost
       port: 8688
       name: rest_proxy_instance
    ```

2. [Agent를 재시작합니다][5].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Confluent Platform 컴포넌트 로그 수집을 시작하려면 `confluent_platform.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

   ```yaml
     logs:
       - type: file
         path: <CONFLUENT_COMPONENT_PATH>/logs/*.log
         source: confluent_platform
         service: <SERVICE_NAME>
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 confluent_platform.d/conf.yaml][3]을 참조하세요.

3. [Agent를 재시작합니다][6].

##### 메트릭 수집

컨테이너화된 환경의 경우 [JMX를 통한 자동탐지][7] 가이드를 참조하세요.

### 검증

[Agent의 상태 하위 명령을 실행][8]하고 **JMXFetch**에서 `confluent_platform`을 찾습니다.

```
    ========
    JMXFetch
    ========

      Initialized checks
      ==================
        confluent_platform
          instance_name : confluent_platform-localhost-31006
          message :
          metric_count : 26
          service_check_count : 0
          status : OK
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "confluent_platform" >}}


### 이벤트

Confluent Platform 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "confluent_platform" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/jmxfetch
[3]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv
[7]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/