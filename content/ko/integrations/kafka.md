---
app_id: kafka
app_uuid: 39640d5e-54be-48ff-abf1-8871499e2fd3
assets:
  dashboards:
    kafka: assets/dashboards/kafka_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kafka.net.bytes_out
      - kafka.net.bytes_out.rate
      metadata_path: metadata.csv
      prefix: kafka.
    process_signatures:
    - java kafka.kafka
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 64
    source_type_name: Kafka
  monitors:
    Partition is offline: assets/monitors/kafka_offline_partition.json
    Produce latency is high: assets/monitors/broker_produce_latency.json
    Produce request rate is high: assets/monitors/kafka_high_producer_request_rate.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    kafka_patterns: assets/saved_views/kafka_patterns.json
    kafka_processes: assets/saved_views/kafka_processes.json
    logger_overview: assets/saved_views/logger_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- message queues
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kafka/README.md
display_on_public_website: true
draft: false
git_integration_title: kafka
integration_id: kafka
integration_title: Kafka Broker
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: kafka
public_title: Kafka Broker
short_description: 생산자 및 소비자, 복제, 최대 지연 등에 관한 메트릭 수집하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  - Product::데이터 스트림 모니터링
  configuration: README.md#Setup
  description: 생산자 및 소비자, 복제, 최대 지연 등에 대한 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
  - resource_type: other
    url: https://www.datadoghq.com/knowledge-center/apache-kafka/
  support: README.md#Support
  title: Kafka Broker
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kafka 대시보드][1]

## 개요

Kafka 브로커 메트릭을 확인하여 Kafka 클러스터 상태와 성능을 실시간으로 전방위 모니터링하세요. 이 통합을 통해, Kafka 배포에서 메트릭과 로그를 수집하여 텔레메트리를 시각화하고 Kafka 스택 성능에 대한 알림을 받을 수 있습니다.

**참고**: 
- 이 점검은 인스턴트당 350개 메트릭으로 제한됩니다. 반환되는 메트릭의 수는 에이전트 상태 출력에 나와 있습니다. 아래 설정을 편집하여 관심 있는 메트릭을 지정할 수 있습니다. 수집하려는 메트릭을 커스터마이즈하는 방법에 대한 자세한 지침은 [JMX 점검 설명서][2]를 참조하세요.
- 이 통합이 첨부된 샘플 설정은 Kafka >= 0.8.2에서만 작동합니다.
그 이전 버전을 실행 중인 경우 [에이전트 v5.2.x 릴리스 샘플 파일][3]을 참조하세요.
- Kafka 소비자 메트릭을 수집하려면 [kafka_consumer 점검][4]을 참조하세요.

Kafka 통합을 강화하려면 [Data Streams Monitoring][5]을 고려해 보세요. 이 솔루션은 파이프라인 시각화 및 지연 추적 기능을 제공하여 병목 현상을 파악하고 해결하는 데 도움을 줍니다.

## 설정

### 설치

에이전트의 Kafka 점검에는 [Datadog 에이전트][6] 패키지가 포함되어 있으므로 Kafka 노드 외 다른 것을 설치할 필요가 없습니다.

점검은 [JMXFetch][7]를 사용해 JMX에서 메트릭 을 수집합니다. 에이전트에서 JMXFetch를 실행하려면 각 kafka 노드에 JVM이 필요합니다. 이를 위해 Kafka가 사용하는 것과 동일한 JVM을 사용할 수 있습니다.

**참고**: Kafka 점검은 Apache Kafka(Amazon MSK) 관리형 스트리밍과 함께 사용할 수 없습니다. 대신 [Amazon MSK 통합][8]을 사용하세요.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [에이전트 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `kafka.d/conf.yaml` 파일을 편집합니다. Kafka 빈 이름은 실행 중인 실제 Kafka 버전에 따라 달라집니다. 에이전트와 함께 제공되는 [예시 설정 파일][2]이 가장 최신 설정이므로 이 파일을 기본으로 사용합니다. **참고**: 예시의 에이전트 버전은 설치한 것보다 더 최신 에이전트 버전일 수 있습니다.

2. [에이전트를 다시 시작합니다][3].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Kafka는 기본적으로 `log4j` 로거를 사용합니다. 파일에 로깅을 활성화하고 형식을 커스터마이즈하려면 `log4j.properties` 파일을 편집하세요.

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/kafka/server.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
   ```

2. 기본적으로 Datadog 통합 파이프라인은 다음과 같은 변환 패턴을 지원합니다.

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
     [%d] %p %m (%c)%n
   ```

   다른 형식을 사용하는 경우 [통합 파이프라인][4]을 복제하여 편집합니다.

3. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

4. `kafka.d/conf.yaml` 파일에 다음 설정 블록을 추가합니다. 환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [kafka.d/conf.yaml 샘플][2]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/kafka/server.log
       source: kafka
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

5. [에이전트를 다시 시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

##### 메트릭 수집

컨테이너화된 환경의 경우 [JMX를 사용한 자동탐지][1] 가이드를 참조하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kafka", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령어][9]를 실행하고 **JMXFetch** 섹션에서 `kafka`를 찾습니다.

```text
========
JMXFetch
========
  Initialized checks
  ==================
    kafka
      instance_name : kafka-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kafka" >}}


### 이벤트

Kafka 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kafka" >}}


## 트러블슈팅

- [트러블슈팅 및 Kafka에 대한 심층 분석][10]
- [에이전트 RMIServer 스텁을 검색하지 못했습니다][11]

## 참고 자료

- [Kafka 성능 메트릭 모니터링][12]
- [Kafka 성능 수집 메트릭][13]
- [Datadog를 사용한 Kafka 모니터링][14]
- [기술 문서 센터의 Kafka 개요][15]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Kafka Consumer 통합

![Kafka 대시보드][16]

## 개요

이 Agent 통합은 Kafka 컨슈머로부터 메시지 오프셋 메트릭을 수집합니다. 이 점검은 Kafka 브로커에서 하이워터 오프셋, Kafka(또는 기존 컨슈머의 경우 Zookeeper)에 저장된 컨슈머 오프셋을 가져온 다음, 컨슈머 지연(브로커 오프셋과 컨슈머 오프셋의 차이)을 계산합니다.

**참고:** 
- 이 통합은 브로커 오프셋보다 컨슈머 오프셋을 먼저 확인하도록 하기 때문에, 최악의 경우 컨슈머 지연이 실제보다 더 커보일 수 있습니다. 이 오프셋을 역순으로 확인하면, 컨슈머 지연이 과소평가되어 음수 값이 나타날 수 있으며, 이는 메시지를 건너뛰고 있음을 나타내는 심각한 상황입니다.
- Kafka 브로커 또는 Java 기반 컨슈머/프로듀서로부터 JMX 메트릭을 수집하려면 [Kafka Broker 통합][17]을 참조하세요.


## 설정

### 설치

Agent의 Kafka 컨슈머 점검은 [Datadog Agent][6] 패키지에 포함되어 있습니다. 따라서, Kafka 노드에 추가로 설치할 필요가 없습니다.

### 구성

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### 호스트

Kafka 소비자를 실행하는 호스트에서 실행되는 에이전트 점검을 설정하려면

##### 메트릭 수집

1. [에이전트 설정 디렉토리][18] 루트의 `conf.d/` 폴더에 있는 `kafka_consumer.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [kafka_consumer.d/conf.yaml 샘플][19]을 참조하세요.

2. [에이전트를 다시 시작합니다][20].

##### 로그 수집

이 점검은 추가 로그를 수집하지 않습니다. Kafka 브로커에서 로그를 수집하려면 [Kafka 로그 수집 지침][21]을 참조하세요.

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][22] 아래 파라미터 적용에 대한 지침을 참조하세요.

##### 메트릭 수집

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `kafka_consumer`                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"kafka_connect_str": <KAFKA_CONNECT_STR>}` <br/>예: `{"kafka_connect_str": "server:9092"}` |

##### 로그 수집

이 점검은 추가 로그를 수집하지 않습니다. Kafka 브로커에서 로그를 수집하려면 [Kafka 로그 수집 지침][21]을 참조하세요.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 검증

[에이전트 상태 하위 명령을 실행][9]하고 점검 섹션에서 `kafka_consumer`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kafka-consumer" >}}


### 이벤트

**소비자_지연**:<br>
 Datadog 에이전트는 `consumer_lag` 메트릭 값이 0 이하로 내려가면 `topic`, `partition` 및 `consumer_group`과 함께 태깅하여 이벤트를 내보냅니다.

### 서비스 점검

Kafka 소비자 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

- [트러블슈팅 및 Kafka에 대한 심층 분석][10]
- [에이전트 RMIServer 스텁을 검색하지 못했습니다][11]

**Kerberos GSSAPI 인증**

Kafka 클러스터 의 케베로스(Kerberos) 설정에 따라 다음을 설정해야 할 수도 있습니다.

* Datadog 에이전트가 Kafka 브로커에 연결하도록 설정된 Kafka 클라이언트입니다. Kafka 클라이언트는 케베로스 주체로 추가하고 케베로스 키탭으로 추가해야 합니다. Kafka 클리이언트는 또한 유효한 케베로스 티켓을 보유해야 합니다.
* Kafka 브로커에 대한 보안 연결을 인증하는 TLS 인증서입니다.
  * JKS 키 저장소를 사용하는 경우, 키 저장소에서 인증서를 내보내야 하며 파일 경로는 해당 `tls_cert` 및/또는 `tls_ca_cert` 옵션으로 설정해야 합니다. 
  * 인증서를 인증하는 데 개인 키가 필요한 경우, `tls_private_key` 옵션으로 설정해야 합니다. 해당되는 경우, 개인 키 비밀번호는 `tls_private_key_password`로 설정해야 합니다. 
* `KRB5_CLIENT_KTNAME` 환경 변수가 기본 경로(예: `KRB5_CLIENT_KTNAME=/etc/krb5.keytab`)와 다른 경우 클라이언트의 케베로스 키 탭 위치를 가리키는 환경 변수를 의미합니다.
* `KRB5CCNAME` 환경 변수가 기본 경로(예: `KRB5CCNAME=/tmp/krb5cc_xxx`)와 다른 경우 Kafka 클라이언트 의 Kerberos 자격 증명 티켓 캐시를 가리키는 환경 변수를 의미합니다.
* Datadog 에이전트가 해당 환경 변수에 액세스할 수 없는 경우 운영 체제의 Datadog 에이전트 서비스 설정 재정의 파일에 있는 환경 변수를 설정합니다. Datadog 에이전트 서비스 유닛 파일 수정 절차는 리눅스(Linux) 운영 체제에 따라 달라질 수 있습니다. 예를 들어 리눅스 `systemd` 환경을 생각해 볼 수 있습니다.

**리눅스 시스템 예시**

1. 환경 파일에서 환경 변수를 수정합니다.
   예: `/path/to/environment/file`

  ```
  KRB5_CLIENT_KTNAME=/etc/krb5.keytab
  KRB5CCNAME=/tmp/krb5cc_xxx
  ```

2. Datadog 에이전트 서비스 설정 재정의 파일을 생성합니다. `sudo systemctl edit datadog-agent.service`

3. 재정의 파일에 다음을 설정합니다.

  ```
  [Service]
  EnvironmentFile=/path/to/environment/file
  ```

4. 다음 명령을 실행하여 systemd 데몬, Datadog-에이전트 서비스, Datadog 에이전트를 다시 로드합니다.

```
sudo systemctl daemon-reload
sudo systemctl restart datadog-agent.service
sudo service datadog-agent restart
```

## 참고 자료

- [Kafka 성능 메트릭 모니터링][12]
- [Kafka 성능 수집 메트릭][13]
- [Datadog를 사용한 Kafka 모니터링][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://docs.datadoghq.com/ko/integrations/java/
[3]: https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example
[4]: https://docs.datadoghq.com/ko/integrations/kafka/?tab=host#kafka-consumer-integration
[5]: https://docs.datadoghq.com/ko/data_streams/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/jmxfetch
[8]: https://docs.datadoghq.com/ko/integrations/amazon_msk/#pagetitle
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[11]: https://docs.datadoghq.com/ko/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/
[12]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[13]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
[15]: https://www.datadoghq.com/knowledge-center/apache-kafka/
[16]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[17]: https://app.datadoghq.com/integrations/kafka?search=kafka
[18]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[19]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[20]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[21]: https://docs.datadoghq.com/ko/integrations/kafka/#log-collection
[22]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/