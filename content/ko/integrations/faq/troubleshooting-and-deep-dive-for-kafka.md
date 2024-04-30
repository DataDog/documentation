---
aliases:
- /ko/integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
kind: faq
title: Kafka 트러블슈팅 및 심층 분석
---

## 개요

"KafkaTM로 실시간 데이터 파이프라인을 구축하고 앱을 스트리밍할 수 있습니다. KafkaTM는 수직적 규모 조정 기능과 내결함성을 갖추고 있음은 물론, 속도가 매우 빠릅니다. 이미 수천 개의 기업에서 프로덕션 단계에 KafkaTM를 사용하고 있습니다." - [Kafka 공식 웹 사이트][1]

Kafka는 강력하고 빠른 메시지 조정 시스템으로, 다수의 애플리케이션에서 또 다른 다수의 애플리케이션으로 페이로드/메시지를 전송하는 데 사용됩니다. Kafka는 Java 기반 애플리케이션이며 메트릭을 mBeans로 노출합니다.

## Kafka의 구성 요소

Kafka에는 주요 구성 요소가 네 개 있습니다.

* **브로커**: 메시지의 읽기 및 쓰기 메커니즘을 구축하는 노드 클러스터입니다(Kafka의 핵심 구성 요소로, 항상 Java 기반이며, 보통 Apache Zookeeper로 관리됨).
* **프로듀서**: 보고 싶은 메시지를 쓰는 애플리케이션입니다(보통 Java 기반이나 다른 언어일 경우도 있음).
* **컨슈머**: 내 메시지 세트를 수신하는 애플리케이션입니다(보통 Java 기반이나 다른 언어일 경우도 있음).
* **토픽**: 프로듀서와 컨슈머가 구독하는 메시지 사서함입니다. Kafka에서 메시지를 쓰거나 읽을 때 읽을 '토픽' 종류를 지정해야 합니다. Slack에서 게시물을 게시하고 읽을 채널을 선택하는 것과 유사하다고 생각하면 됩니다. 각 토픽에는 지금까지 읽은 메시지 수와 읽지 않은 메시지 수를 알려 주는 오프셋 목록이 있습니다.

[Kafka 심층 분석][2]과 [Datadog 블로그 포스트][3]를 참고하세요.

## Datadog Kafka 통합

Datadog에는 두 종류의 Kafka 통합이 있습니다. 첫 번째 통합의 이름은 [Kafka][4]이고, 두 번째 통합의 이름은 [Kafka_Consumer][4]입니다.

[Kafka 통합][4]의 경우, Cassandra, JMX, Tomcat 등과 같은 다른 Java 기반 애플리케이션과 마찬가지로 [Datadog의 JMXFetch][5] 애플리케이션을 사용해 메트릭을 가져옵니다. 이 경우 mBeans를 사용해 메트릭을 가져오는데, 엔지니어 팀에서 일반적으로 자주 사용되는 mBeans 목록을 Kafka.yaml 파일에 포함해 두었습니다. 사용자가 원하는 다른 Beans로 확장하거나 Kafka 버전에 따라 지원하는 추가 메트릭을 사용할 수도 있습니다.

[Kafka_Consumer 통합][6]의 경우 표준 Python 기반 점검과 같은 방법으로 메트릭을 수집합니다. 이때 내부 Zookeeper API를 사용합니다. Zookeeper는 Apache 애플리케이션으로, 노드 클러스터인 Kafka 브로커의 구성을 관리합니다(Kafka 버전 0.9의 경우에는 약간 다름, Zookeeper가 필요하지 않음, 자세한 정보는 트러블슈팅 섹션 참고). 이 점검에서는 세 가지 메트릭을 수집하며, JMXFetch에서 수집되지 않습니다.

## 트러블슈팅

### 에이전트 구 버전

이 문제는 [Datadog 에이전트][7] *<5.20* 버전에만 발생합니다. Kafka 구 버전의 경우 컨슈머 오프셋이 Zookeeper에만 저장되었고, Kafka_Consumer 에이전트 점검이 처음 개발될 때 이와 같은 제한 사항을 고려하여 개발되었습니다. 이 때문에 오프셋이 Kafka에 저장되어 있고 에이전트 구 버전을 사용하는 경우에는 `kafka.consumer_lag` 메트릭을 얻을 수 없습니다. [에이전트 최신 버전으로 업그레이드][8]하면 해당 메트릭을 볼 수 있습니다.

### 인스턴스에 연결할 수 없음

Datadog-Kafka 통합에 다음과 같은 오류 메시지가 나타날 수 있습니다.

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

이 오류는 Datadog 에이전트가 노출된 mBeans에서 메트릭을 가져오려고 RMI 프로토콜을 통해 Kafka 인스턴스에 연결을 시도했지만 실패했다는 뜻입니다. 이 오류는 Kafka 인스턴스를 시작할 때 다음 JVM(Java Virtual Machine) 인수를 포함해 해결할 수 있습니다(프로듀서, 컨슈머, 브로커의 각 Java 인스턴스에 모두 필요). 

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```

### 프로듀서 및 컨슈머 메트릭 누락됨

기본적으로 Datadog에서는 브로커 기반 메트릭만 수집합니다.

Java 기반 프로듀서 및 컨슈머 메트릭을 수집하려면 `conf.yaml`에 다음을 추가하고 필요한 설정을 업데이트하세요. 사용할 수 있는 구성 옵션 전체를 보려면 [kafka.d/conf.yaml 샘플][9]을 참고하세요.
```yaml
- host: remotehost
  port: 9998 # Producer
  tags:
    - kafka: producer0
- host: remotehost
  port: 9997 # Consumer
  tags:
    - kafka: consumer0
```

**참고**: 다른 언어로 개발한 커스텀 프로듀서나 컨슈머 클라이언트를 사용하거나 mBeans를 노출하지 않는 방법을 사용할 경우에는 이 방법이 통하지 않습니다. 코드로 메트릭을 제출하려면 [DogStatsD][10]를 사용하세요.

### 파티션이 존재하지 않음

이 문제는 Kafka Consumer 에이전트 점검에만 발생합니다. `kafka_consumer.d/conf.yaml`에 환경에 없는 파티션을 지정하면 다음과 같은 오류가 나타납니다.

```text
instance - #0 [Error]: ''
```

이 문제를 해결하려면 토픽에 따라 올바른 파티션을 지정하세요. 해당 문제 해결은 다음 줄과 관련되어 있습니다.

```yaml
#     <TOPIC_NAME_1>: [0, 1, 4, 12]
```

### 파티션 컨텍스트 제한

파티션 컨텍스트 수집은 500개로 제한되어 있습니다. 이보다 더 많은 컨텍스트가 필요한 경우 [Datadog 지원팀][11]에 문의하세요.

[1]: https://kafka.apache.org
[2]: https://sookocheff.com/post/kafka/kafka-in-a-nutshell
[3]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[4]: /ko/integrations/kafka/
[5]: https://github.com/DataDog/jmxfetch
[6]: /ko/integrations/kafka/#agent-check-kafka-consumer
[7]: /ko/agent/
[8]: /ko/agent/versions/upgrade_to_agent_v6/
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: /ko/developers/dogstatsd/
[11]: /ko/help/