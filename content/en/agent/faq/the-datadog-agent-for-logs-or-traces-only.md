---
title: Use the Datadog Agent for Logs or Traces Only
kind: faq
disable_toc: true
aliases:
  - /logs/faq/can-the-datadog-agent-be-used-to-send-only-logs/
further_reading:
- link: "/logs/log_collection"
  tag: "Documentation"
  text: "Learn more about Log collection with the Agent"
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn more about Trace collection with the Agent"
---


<div class="alert alert-danger">
Datadog does not recommend using the Agent for only log or trace collection. Using metric collection ensures that your logs, metrics, and traces from the same host share the same hostname and therefore the same tags.
</div>

Even though not recommended, it is still possible to configure the Agent for only log and trace collection. To disable the unwanted payloads, you must be running Agent v6.4+, and then follow these steps:

### Configuration file

* Open the `datadog.yaml` file ([locate this configuration file for your platform][1]).
* Add the `enable_payloads` attribute with the following settings:

    ```
    enable_payloads:
      series: false
      events: false
      service_checks: false
      sketches: false
    ```

{{< tabs >}}
{{% tab "Logs" %}}

* Configure the Agent to collect logs as explained in the [log documentation][1].

[1]: /logs/log_collection
{{% /tab %}}
{{% tab "APM" %}}

* Configure the Agent to collect traces as explained in the [APM documentation][1].

[1]: /agent/apm/#agent-configuration
{{% /tab %}}
{{< /tabs >}}

* [Restart the Agent][2].

### Environment variables

If you are using the container Agent, set the following environment variables to `false`:

```
DD_ENABLE_PAYLOADS_EVENTS
DD_ENABLE_PAYLOADS_SERIES
DD_ENABLE_PAYLOADS_SERVICE_CHECKS
DD_ENABLE_PAYLOADS_SKETCHES
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/?tab=agentv6
[2]: /agent/guide/agent-commands/#restart-the-agent
