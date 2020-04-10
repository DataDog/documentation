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
- if the connectivity test succeed, then the agent will use HTTPS transport
- if the connectivity test failed, then the agent will fall back to TCP transport
This connectivity test mechanism is only running at agent startup. If the connectivity is failing for both HTTPS and TCP at agent startup time, then the agent will use TCP transport until restart it (and then rerun a new Connectivity test)

To check which transport id used by the agent, run the `datadog-agent status` command.

## Enforce a specific transport

The default agent behavior can overwritten by enforcing a specific transport.

{{< tabs >}}
{{% tab "HTTP" %}}


```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
```

To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED`
* `DD_LOGS_CONFIG_USE_HTTP`
* `DD_LOGS_CONFIG_USE_COMPRESSION`

For more details about the compression perfomances and batching size, refer to the [HTTPS section][2].


{{% /tab %}}
{{% tab "TCP" %}}

TCP log forwarding is the default behaviour of the Datadog Agent. Enable log collection in the Agent's [main configuration file][1] (`datadog.yaml`):

```yaml
logs_enabled: true
```

By default, the Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

[1]: /agent/guide/agent-configuration-files


{{% /tab %}}
{{< /tabs >}}

Note: 
logs_config.socks5_proxy_address setting will enforce TCP transport because socks5 proxies are not yet supported in HTTPS with compression

## Compression

Using the HTTP transport, a compression ratio can be specify in the agent log config

