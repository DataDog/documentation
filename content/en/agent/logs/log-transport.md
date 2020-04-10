---
title: Agent Transport for logs
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


## Default agent behavior

Since Agent v6.19+/v7.19+, the default transport is HTTPS with compression instead of TCP.
At agent start, if log collection is enabled, the agent runs a HTTPS connectivity test:

* if successfull, then the agent will use HTTPS transport
* otherwise the agent fallbacks to TCP transport

This connectivity test mechanism is only running at agent startup. If the connectivity is failing for both HTTPS and TCP at agent startup time, then the agent will use TCP transport until its next restart (and then rerun a new Connectivity test)

To check which transport is used by the agent, run the [agent statuts command][1].

For older version of the agent, TCP is used by default. We strongly recommend you to enforce HTTPS transport if you are running v6.14+/v7.14+ and HTTPS transport and compression if you are running v6.16+/v7.16+. 

Note: Setting up a [SOCKS5 proxy][4] server will also enforce TCP transport because socks5 proxies are not yet supported in HTTPS with compression.

## Enforce a specific transport

The default agent behavior can be overwritten through configuration.

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

Note: HTTPS transport is supported with data agent version 6.14+/7.14+

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
* `DD_LOGS_CONFIG_USE_TCP`

By default, the Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

[1]: /agent/guide/agent-configuration-files


{{% /tab %}}
{{< /tabs >}}

## HTTPS Transport

**HTTPS log forwarding is the recommended configuration**. With HTTPS, you have a guarantee that Datadog has received your log.

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="HTTPS Intake Schema"  style="width:80%;">}}

Using HTTP, the Agent sends log batches with the following limits:

* Maximum batch size: 1MB
* Maximum size for a single log: 256kB
* Maximum number of logs in a batch: 200

### Log compression

The `compression_level` parameter (or `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) accepts values from `0` (no compression) to `9` (maximum compression but higher resource usage). The default value is `6`.

See the [Datadog Agent overhead section][2] for more information about Agent resource usage when compression is enabled.

For agent version before 6.19 / 7.19, you need to enforce compression updating the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### Configure the batch wait time

The Agent waits up to 5 seconds to fill each batch (either in content size or number of logs). Therefore, in the worst case scenario (when very few logs are generated) switching to HTTPS might add a 5-second latency compared to TCP, which sends all logs in real time.

To change the maximum time the Datadog Agent waits to fill each batch, add the following in the Agent's [main configuration file][1] (`datadog.yaml`):

```yaml
logs_config:
  batch_wait: 2
```

Or use the `DD_LOGS_CONFIG_BATCH_WAIT` environment variable.
The unit is seconds and must be an integer between `1` and `10`.

### HTTPS Proxy configuration

When logs are sent through HTTPS, use the same [set of proxy settings][3] as the other data types to send logs through a web proxy.


[1]: /agent/guide/agent-configuration-files
[2]: /agent/basic_agent_usage/#agent-overhead
[3]: /agent/proxy
[4]: /agent/logs/proxy/?tab=socks5
