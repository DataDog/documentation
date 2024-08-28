---
title: Both my JMX and AWS integrations use "name" tags. What do I do?

---

The "name" tag is one of many host-level tags that are applied by default from the [AWS integration][1]. But it is also a tag that's often applied by default at the metric-level by our JMX-based integrations (based on the "bean names" matched in JMX). Both tags are useful, but using both at the same time can cause tag-conflicts that result in inappropriately aggregated values. So what to do about this?

The best approach is to rename your JMX integration's "name" tag to be something else (e.g, "bean_name"). With our JMX-based integrations, there are two configuration features that make this possible: 1, the ability to exclude default tags via configuration, and 2, the ability to add specified bean attributes as customized metric tags.

For example, the following configuration of your kafka.yaml would collect a metric called "kafka.messages_in.rate" that would be tagged, among other things, by "name:messagesinpersec".
```yaml
- include:
domain: 'kafka.server'
bean: 'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec'
attribute:
  Count:
    metric_type: rate
    alias: kafka.messages_in.rate
```

To stop this from conflicting with an AWS "name" tag, you could change that metric's configuration to the following:
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

In this case, the same metric would be collected, but with the "name" tag applied as "bean_name:messagesinpersec" instead, which would no longer conflict with the AWS "name" tag key.
{{< img src="integrations/faq/jmx_metric_collected.png" alt="jmx_metric_collected" >}}

[1]: /integrations/amazon_web_services/
