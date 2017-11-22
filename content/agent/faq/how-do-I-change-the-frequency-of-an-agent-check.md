---
title: How do I change the frequency of an agent check?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: Agent
  text: Learn more about the Datadog Agent
- link: "/agent/agent_checks"
  tag: Agent
  text: Learn more about Agent checks
---

We typically recommend not adjusting the default frequency of an agent check, however, this may be achieved by adding a new parameter to your integrations YAML configuration.

For example, if you need to run an http check every 60 seconds rather than the default 15 seconds, add the following to the `http_check.yaml` config file:

```
min_collection_interval: 60
```

You can add this parameter at the **init_config** level or at the **instance** level.

Note: the agent runs every 15 seconds and this parameter makes the agent not collect new instance data unless data was collected for the same instance more than `min_collection_interval` seconds ago. This only works for values > 15, it's not possible to have the agent collect data more frequently this way.

Note: As of version 5.14 of the Datadog Agent, the `min_collection_interval` parameter is available for [Java based checks](/integrations/java/) (jmx.yaml, cassandra.yaml, tomcat.yaml, solr.yaml, activemq.yaml, activemq_xml.yaml).

{{< partial name="whats-next/whats-next.html" >}}