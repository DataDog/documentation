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

For Agent v6.19+/v7.19+, the default transport used for your logs is compressed HTTPS instead of TCP for the previous versions.
When the Agent starts, if log collection is enabled, it runs a HTTPS connectivity test. If successful, then the Agent uses the compressed HTTPS transport, otherwise the Agent falls back to a TCP transport.

This connectivity test mechanism is only running at Agent startup and only test HTTPS. If the Agent has no connectivity for both TCP and HTTP when the agent start, then the Agent will uses TCP transport when the connectivity will be back and this won't change until its next restart.

To check which transport is used by the Agent, run the [Agent status command][1].

{{< img src="agent/logs/agent-status.png" alt="Agent status"  style="width:70%;">}}

**Notes**:

* For older Agent versions, TCP transport is used by default. Datadog strongly recommends you to enforce HTTPS transport if you are running v6.14+/v7.14+ and HTTPS compression if you are running v6.16+/v7.16+. 
* Always enforce a specific transport (either TCP or HTTPS) when using a proxy to forwards logs to Datadog

## Enforce a specific transport

Enforce the use of TCP or HTTPS transport by using the following configurations.

{{< tabs >}}
{{% tab "HTTPS" %}}

To enforce HTTPS transport with Agent versions v6.14+/v7.14+ , update the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_HTTP=true`


[1]: /agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "TCP" %}}

To enforce TCP transport, update the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_tcp: true
```
To send logs with environment variables, configure the following:

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_TCP=true`

By default, the Datadog Agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication (on port `10516` for Datadog US site and port `443`for Datadog EU site).



[1]: /agent/guide/agent-configuration-files/
{{% /tab %}}
{{< /tabs >}}

**Note**: Setting up a [SOCKS5 proxy][2] server enforces TCP transport because socks5 proxies are not yet supported in HTTPS with compression.

## HTTPS transport

**HTTPS log forwarding is the recommended configuration** for the best log collection reliability as the`200` status code is returned by the Datadog storage system:

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="HTTPS Intake Schema"  style="width:80%;">}}

Using HTTP, the Agent sends log batches with the following limits:

* Maximum batch size: 1MB
* Maximum size for a single log: 256kB
* Maximum number of logs in a batch: 200

### Log compression

The `compression_level` parameter (or `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) accepts values from `0` (no compression) to `9` (maximum compression but higher resource usage). The default value is `6`.

See the [Datadog Agent overhead section][3] for more information about Agent resource usage when compression is enabled.

For Agent versions prior to 6.19 / 7.19, you need to enforce compression by updating the Agent's [main configuration file][1] (`datadog.yaml`) with:

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### Configure the batch wait time

The Agent waits up to 5 seconds to fill each batch (either in content size or number of logs). Therefore, in the worst case scenario (when very few logs are generated) switching to HTTPS might add a 5-second latency compared to the TCP transport which sends all logs in real time.

To change the maximum time the Datadog Agent waits to fill each batch, add the following configuration in the Agent's [main configuration file][1] (`datadog.yaml`):

```yaml
logs_config:
  batch_wait: 2
```

Or use the `DD_LOGS_CONFIG_BATCH_WAIT=2` environment variable. The unit is in seconds and must be an integer between `1` and `10`.

### HTTPS proxy configuration

When logs are sent through HTTPS, use the same [set of proxy settings][4] as the other data types to send logs through a web proxy.


[1]: /agent/guide/agent-configuration-files/
[2]: /agent/logs/proxy/?tab=socks5
[3]: /agent/basic_agent_usage/#agent-overhead
[4]: /agent/proxy/
