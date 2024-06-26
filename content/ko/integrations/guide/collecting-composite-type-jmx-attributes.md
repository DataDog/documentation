---
aliases:
- /ko/integrations/faq/collecting-composite-type-jmx-attributes/
kind: 가이드
title: 복합 유형 JMX 속성 수집
---

## JMXFetch

에이전트에서 다음 통합 yaml 파일은 모두 JMXFetch에서 읽힙니다.

* [Active MQ][1]
* [Cassandra][2]
* [Java][3]
* [Solr][4]
* [Tomcat][5]

## JMXFetch 속성

JMXFetch가 수집할 수 있는 JMX 속성에는 두 유형이 있습니다(단순형과 복합형).

### 단순 속성

단순 속성에는 `integer`, `float`, `double`, `long`, `boolean` 등이 있습니다.

**참고**: 부울 값이 참일 경우에는 1, 거짓일 경우에는 0입니다. [지원되는 유형 목록 확인][6]

현재 JMX 통합에서 무엇을 수집 중인지 알아보려면 `list` 명령을 사용하세요. 다음은 단순 속성을 보여 주는 코드 조각 예시이니 참고하세요.

```text
Matching: x/350. Bean name: java.lang - Attribute name: attribute_1 - Attribute type: java.lang.Integer
```

그러면 다음 속성이 나타납니다.

```yaml
- include:
     domain: java.lang
     attribute:
       attribute_1:
         metric_type: counter
         alias: java.lang.Integer
```

JMXFetch는 속성 값을 직접 추출해 메트릭 값으로 사용합니다. 수집하는 방법을 배우려면 [JMX 설명서][3]를 참고하세요.

### 복합 속성

복합 속성은 배열, 해시맵, 또는 '단순' 속성으로 구성된 개체일 수 있습니다.

```text
Matching: x/350. Bean name: java.lang - Attribute name: HeapMemoryUsage - Attribute type: javax.management.openmbean.CompositeData
```

이 경우, JMXFetch에 이 '복합' 속성을 사용해 메트릭 숫자 값을 생성하는 방법에 관한 상세 정보를 추가해야 합니다.

그러려면 구성 요소를 지정할 때 `.`를 사용하세요.

```yaml
- include:
    domain: java.lang
    type: Memory
    attribute:
      HeapMemoryUsage.used:
        alias: jvm.heap_memory
        metric_type: gauge
      HeapMemoryUsage.committed:
        alias: jvm.heap_memory_committed
        metric_type: gauge

      # (...)
```

### 복합 속성의 다음 단계를 보려면 어떻게 해야 하나요?

최적의 방법은 JMXterm을 사용하는 것입니다(아래 참고).

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

참고로 **에이전트 v5.32.8 이상**에서는 `jmxterm` JAR이 함께 제공되지 않습니다. `jmxterm`을 다운로드하고 사용하려면 [업스트림 프로젝트][7]를 참고하세요.

그 후 get 명령을 사용해 특정 메트릭을 가져옵니다.

[1]: /ko/integrations/activemq/
[2]: /ko/integrations/cassandra/
[3]: /ko/integrations/java/
[4]: /ko/integrations/solr/
[5]: /ko/integrations/tomcat/
[6]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[7]: https://github.com/jiaqi/jmxterm