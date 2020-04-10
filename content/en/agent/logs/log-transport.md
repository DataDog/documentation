---
title: Log Transport
kind: documentation
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: "agent/logs/advanced_log_collection/#filter-logs"
  tag: "Documentation"
  text: "Filter logs sent to Datadog"
- link: "agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs"
  tag: "Documentation"
  text: "Scrub sensitive data from your logs"
- link: "agent/logs/advanced_log_collection/#multi-line-aggregation"
  tag: "Documentation"
  text: "Multi-line log aggregation"
- link: "agent/logs/advanced_log_collection/#tail-directories-by-using-wildcards"
  tag: "Documentation"
  text: "Tail directories by using wildcards"
- link: "agent/logs/advanced_log_collection/#global-processing-rules"
  tag: "Documentation"
  text: "Global processing rules"
---

Datadog recommends that you send compressed logs over HTTPS with the Datadog Agent (default since v6.19+, available in v6.14+), enable log collection in the Agent’s main configuration file (datadog.yaml):

## Default agent behavior

Starting from the version 6.19 and 7.19 of the agent, the default transport is HTTPS with compression instead of TCP.
At agent start, if log collection is enabled, the agent will run a HTTPS connectivity test:

* if the connectivity test succeed, then the agent will use HTTPS transport
* if the connectivity test failed, then the agent will fall back to TCP transport

This connectivity test mechanism is only running at agent startup. If the connectivity is failing for both HTTPS and TCP at agent startup time, then the agent will use TCP transport until restart it (and then rerun a new Connectivity test)

To check which transport is used by the agent, run the [agent stauts command][1].

## Enforce a specific transport

The default agent behavior can overwritten by enforcing a specific transport.

{{< tabs >}}
{{% tab "HTTP" %}}

To enforce HTTP transport, update the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED`
* `DD_LOGS_CONFIG_USE_HTTP`

[1]: /agent/guide/agent-configuration-files
{{% /tab %}}
{{% tab "TCP" %}}

To enforce TCP transport, update the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_tcp: true
```
To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED`
* `DD_LOGS_CONFIG_USE_HTCP`

By default, the Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

[1]: /agent/guide/agent-configuration-files


{{% /tab %}}
{{< /tabs >}}

Note: 
logs_config.socks5_proxy_address setting will enforce TCP transport because socks5 proxies are not yet supported in HTTPS with compression

## HTTPS Transport

**HTTPS log forwarding is the recommended configuration** because a 200 response is returned only if the logs have been written in the Datadog storage:

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="HTTPS Intake Schema"  style="width:80%;">}}

The Agent sends HTTPS batches with the following limits:

* Maximum content size per payload: 1MB
* Maximum size for a single log: 256kB
* Maximum array size if sending multiple logs in an array: 200 entries logs.

### Log compression

The `compression_level` parameter (or `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) accepts values from `0` (no compression) to `9` (maximum compression but higher resource usage). The default value is `6`.

See the [Datadog Agent overhead section][10] for more information about Agent resource usage when compression is enabled.

### Configure the batch wait time

The Agent waits up to 5 seconds to fill each batch (either in content size or number of logs). Therefore, in the worst case scenario (when very few logs are generated) switching to HTTPS might add a 5-second latency compared to TCP, which sends all logs in real time.

To change the maximum time the Datadog Agent waits to fill each batch, add the following in the Agent's [main configuration file][3] (`datadog.yaml`):

```yaml
logs_config:
  batch_wait: 2
```

Or use the `DD_LOGS_CONFIG_BATCH_WAIT` environment variable.
The unit is seconds and must be an integer between `1` and `10`.

### HTTPS Proxy configuration

When logs are sent through HTTPS, use the same [set of proxy settings][11] as the other data types to send logs through a web proxy.


Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

[1]: /agent/guide/agent-commands/?tab=agentv6v7#agent-information

