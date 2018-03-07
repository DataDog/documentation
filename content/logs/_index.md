---
title: Log Management
kind: Documentation
description: "Configure your Datadog agent to gather logs from your host, containers & services."
---

{{< vimeo 243374392 >}}

## Getting started with the Agent

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface that is used for log collection.

If you are not using it already, please follow [the agent installation instruction](/agent).

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
logs_enabled: true
```

The Datadog agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

## Enabling log collection from integrations
To start collecting logs for a given integration, uncomment the logs section in that integration's yaml file, and configure it for your environment.  

<div class="alert alert-warning">
Not all integrations include out of the box log configurations.  <a href="https://docs.datadoghq.com/integrations/#cat-log-collection">Consult the current list of supported integrations available</a>.
</div>

If an integration does not support logs by default, [use the custom file configuration](/logs/log_collection).


## Further Reading

{{< whatsnext >}}
    {{< nextlink href="/logs/explore" tag="Documentation" >}}Learn how to explore your logs{{< /nextlink >}}
    {{< nextlink href="/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers" tag="FAQ" >}}How to Send Logs to Datadog via External Log Shippers{{< /nextlink >}}
    {{< nextlink href="/logs/parsing" tag="Documentation" >}}Learn more about parsing{{< /nextlink >}}
{{< /whatsnext >}}
