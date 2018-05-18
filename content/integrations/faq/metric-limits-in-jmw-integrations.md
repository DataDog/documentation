---
title: Metric limits in JMX integrations
kind: faq
---

JMX integrations such as: [Cassandra][1], [Tomcat][2], [Kafka][3], etc... can potentially generate thousands of metrics and by default, these integrations are limited to 350. If you'd like this number increased, email [us][4]

To check the current metric list, run the JMX list_everything command that is provided via the Agent:
```
sudo /etc/init.d/datadog-agent jmx list_everything
```

To list attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics collected:

```
sudo /etc/init.d/datadog-agent jmx list_limited_attributes
```

[1]: /integrations/cassandra
[2]: /integrations/tomcat
[3]: /integrations/kafka
[4]: /help
