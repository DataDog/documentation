---
title: Metric limits in JMX integrations
kind: faq
customnav: main_references
---

JMX integrations such as: [Cassandra](/integrations/cassandra), [Tomcat](/integrations/tomcat), [Kafka](/integrations/kafka), etc... can potentially generate thousands of metrics and by default, these integrations are limited to 350. If you'd like this number increased, please email [us](/help)

To check the current metric list, run the JMX list_everything command that is provided via the agent:
```
sudo /etc/init.d/datadog-agent jmx list_everything
```

To list attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics collected:

```
sudo /etc/init.d/datadog-agent jmx list_limited_attributes
```
