---
title: Can the Datadog Agent be used to send logs only?
kind: faq
disable_toc: true
further_reading:
- link: "logs/log_collection/#custom-log-collection"
  tag: "Documentation"
  text: Learn more about Log collection with the Agent
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---


It is not recommended to use the Agent for log collection only. Using metric collection ensures that your logs, metrics, and traces from the same host share the same hostname and therefore the same [tags][1].

However, it is still possible to configure the Agent to only collect logs.

The Agent sends metrics and other payloads to Datadog. To make sure that the agent only sends logs, it is possible to disable the payloads sent by the agent since the version 6.4 thanks to the following steps:

1. Open `datadog.yaml` ([locate this configuration file on your instance][3])
2. Add the `enable_payloads` attribute as below:

```
enable_payloads:
  series: false
  events: false
  service_checks: false
  sketches: false
```

3. Configure the Agent to collect logs as explained in our [log documentation page][2].
4. [Restart the Agent][4]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging
[2]: https://docs.datadoghq.com/logs/log_collection/
[3]: /agent/basic_agent_usage/#configuration-file
[4]: /agent/faq/agent-commands/#restart-the-agent
