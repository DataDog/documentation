---

title: 에이전트가 RMIServer 스텁 가져오기에 실패할 경우
---

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

Datadog 에이전트가 Kafka 인스턴스에 연결되지 않아 RMI 프로토콜을 통해 노출된 mBeans에서 메트릭을 가져올 수 없습니다.

이 문제를 해결하려면 Kafka 인스턴스를 시작할 때 다음 JVM 인수를 포함합니다*(별도 Java 인스턴스이기 때문에 Producer, Consumer, Broker에 모두 필요)

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```