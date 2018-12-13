---
title: Can the Datadog Agent be used to send logs only?
kind: faq
disable_toc: true
further_reading:
- link: "logs/log_collection/#custom-log-collection"
  tag: "Documentation"
  text: "Learn more about Log collection with the Agent"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---


It is not recommended to use the Agent for log collection only. Using metric collection ensures that your logs, metrics, and traces from the same host share the same hostname and therefore the same tags.

However, it is still possible to configure the Agent to only collect logs.

The Agent sends metrics and other payloads to Datadog. To make sure that the Agent only sends logs, it is possible to disable payloads sent by the Agent since the Agent version 6.4 with the following steps:

{{< tabs >}}
{{% tab "Configuration file" %}}

1. Open the `datadog.yaml` file ([locate this configuration file for your platform][1]).
2. Add the `enable_payloads` attribute as below:

    ```
    enable_payloads:
      series: false
      events: false
      service_checks: false
      sketches: false
    ```

3. Configure the Agent to collect logs as explained in the [log documentation page][2].
4. [Restart the Agent][3]


[1]: /agent/faq/agent-configuration-files/?tab=agentv6
[2]: /logs/log_collection
[3]: /agent/faq/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Environment Variables" %}}

Set the following environment variables to `false`:

```
DD_ENABLE_PAYLOADS_EVENTS
DD_ENABLE_PAYLOADS_SERIES
DD_ENABLE_PAYLOADS_SERVICE_CHECKS
DD_ENABLE_PAYLOADS_SKETCHES
```

Then [restart the Agent][1].


[1]: /agent/faq/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
