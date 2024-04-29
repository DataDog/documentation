---
kind: faq
title: JMX와 AWS 통합 모두 "이름" 태그 을 사용합니다. 어떻게 해야 하나요?
---

"이름" 태그는 [AWS 통합] [1]에서 기본값으로 적용되는 수많은 호스트-레벨 태그 중 하나입니다. 그러나 이는 (JMX에서 매칭되는 "bean 이름"에 따른) JMX 기반 통합이 메트릭-레벨로 기본 적용하는 태그이기도 합니다. 두 태그 모두 유용하지만, 두 가지를 동시에 사용하면 태그-충돌이 발생하여 부정확한 집계 값이 발생할 수 있습니다. 그렇다면 어떻게 해야 할까요?

가장 좋은 방법은 JMX 통합 "이름" 태그를 다른 이름(예: "bean_name")으로 변경하는 것입니다. JMX 기반 통합에는 이를 해결할 수 있는 설정 기능 두 가지가 있습니다. 1. 설정으로 기본 태그를 제외하는 기능. 2. 특정 bean 속성을 사용자 지정 메트릭 태그로 추가하는 기능입니다.

예를 들어, 다음 kafka.yaml 설정은 메트릭 중  "name:messagesinpersec" 태그가 지정된 "kafka.messages_in.rate" 메트릭을 수집합니다.
```yaml
- include:
domain: 'kafka.server'
bean: 'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec'
attribute:
  Count:
    metric_type: rate
    alias: kafka.messages_in.rate
```

AWS "이름" 태그와 충돌하는 것을 방지하려면, 다음과 같이 메트릭 설정을 변경할 수 있습니다.
```yaml
  - include:
    domain: 'kafka.server'
    bean: 'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec'
    attribute:
      Count:
        metric_type: rate
        alias: kafka.messages_in.rate
    exclude_tags:
      - name
    tags:
        bean_name: $name
```

이 경우, 동일한 메트릭이 수집되지만 "bean_name:messagesinpersec" "이름" 태그가 적용되어 AWS "이름" 태그 키와 더 이상 충돌하지 않습니다.
{{< img src="integrations/faq/jmx_metric_collected.png" alt="jmx_metric_collected" >}}

[1]: /ko/integrations/amazon_web_services/