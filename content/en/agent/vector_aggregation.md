---
title: Aggregating Multiple Agents Using Vector
kind: documentation
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/agent/proxy/"
  tag: "Documentation"
  text: "Configure the Agent to use a proxy"
- link: "https://vector.dev/docs/"
  tag: "Documentation"
  text: "Vector documentation"

---

## Overview

The Datadog Agent can be used along with [Vector][1]. In this scenario Agents send data
to Vector, which aggregates data from multiple upstream Agents:

`Agents -> Vector -> Datadog`

This scenario differs from using a [proxy][2] since Vector is able to process data before sending
it to Datadog and other destinations. Vector capabilities include:

* [Log parsing, structuring, and enrichment][3]
* Cost reduction through [sampling][4]
* [Redaction of PII][5] and sensitive data before it leaves your network
* [Deriving metrics from logs][6] for cost effective analysis
* [Routing to multiple destinations][7]

**Notes**:

- Only logs and metrics aggregation is supported.
- Vector can directly collect logs and metrics from alternative sources. When doing so, third party logs may not include proper tagging. A convenient way to [add tags][8], source or service values is to use the [Vector Remap Language][9].

## Configuration

### Agent configuration

This configuration requires Datadog Agent version >= 6.35 or 7.35.

To send logs to Vector, update the Agent configuration file, `datadog.yaml`.

```yaml
vector:
  logs.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Vector side
  logs.url: "http://<VECTOR_HOST>:<VECTOR_PORT>"
# Uncomment the following line if you use a version of Vector before v0.17.0
# logs_config.use_v2_api: false
```

For metrics, update the following values in the `datadog.yaml` file:

```yaml
vector:
  metrics.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Vector side
  metrics.url: "http://<VECTOR_HOST>:<VECTOR_PORT>"
```

Where `VECTOR_HOST` is the hostname of the system running Vector and `VECTOR_PORT` is the TCP port on which
the Vector `datadog_agent` source is listening.

### Docker configuration

If you are using Docker, add the following to your Agent configuration file.

```
-e DD_VECTOR_METRICS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_METRICS_ENABLED=true
-e DD_VECTOR_LOGS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_LOGS_ENABLED=true
```

### Vector configuration
To receive logs or metrics from the Datadog Agent, configure Vector with a [datadog_agent source][10]. To send logs to
Datadog, Vector must be configured with at least one [datadog_logs sink][11]. Similarly to send metrics to Datadog,
Vector must be configured with at least one [datadog_metrics sink][12].

See the official [Vector documentation][13] for all available configuration parameters and transforms that can be
applied to logs while they are processed by Vector.

Here is a configuration example that adds a tag to every log and metric using the Vector Remap Language:

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    # The <VECTOR_PORT> mentioned above should be set to the port value used here
    address: "[::]:8080"
    multiple_outputs: true # To automatically separate metrics and logs

transforms:
  tag_logs:
    type: remap
    inputs:
      - datadog_agents.logs
    source: |
      # The `!` shorthand is used here with the `string` function, it errors if
      # .ddtags is not a "string".
      # The .ddtags field is always expected to be a string.
      .ddtags = string!(.ddtags) + ",sender:vector"
  tag_metrics:
    type: remap
    inputs:
      - datadog_agents.metrics
    source: |
      .tags.sender = "vector"

sinks:
  log_to_datadog:
    type: datadog_logs
    inputs:
       - tag_logs
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    encoding:
      codec: json
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
```

### Using Kubernetes

Using the official Datadog chart the [Agent configuration settings](#agent-configuration) described above can be added
to the `agents.customAgentConfig` value. **Note**: `agent.useConfigMap` must be set to `true`
for `agents.customAgentConfig` to be taken into account.

For additional details about the Datadog Helm chart, see [the Kubernetes documentation][14].

Vector provides an [official chart for aggregating data][15] that comes with a Datadog
logs source preconfigured. For more information about installing Vector using Helm,
see to the [official Vector documentation][16].

To send logs to Datadog, a `datadog_logs` sink needs to be added to the Vector configuration. Similarly, to send metrics
to Datadog, a `datadog_metrics` sinks needs to be added to Vector configuration. Vector's chart can hold any valid Vector
configuration in the `values.yaml` file using the `customConfig` field. To enable `datadog_logs`, the same kind of
configuration as described under [Vector configuration](#vector-configuration) can be directly included as-is in the
Vector chart configuration.

## Manipulating Datadog logs and metrics with Vector

Logs and metrics sent to Vector can benefit from the full capabilities of Vector, including [Vector Remap Language][3]
for transformations.

When received by Vector, logs sent by the Datadog Agent are structured using the expected schema. When submitting logs
using the Datadog API, see the [API documentation][17] for a complete schema description.

Logs and metrics collected by Vector from other sources can be [fully enriched][8]. VRL can be used to adjust logs
and metrics to fill relevant fields according to the expected schema.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /agent/proxy
[3]: https://vector.dev/docs/reference/configuration/transforms/remap/
[4]: https://vector.dev/docs/reference/configuration/transforms/sample/
[5]: https://vector.dev/docs/reference/vrl/functions/#redact
[6]: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
[7]: https://vector.dev/docs/reference/configuration/transforms/route/
[8]: /getting_started/tagging
[9]: https://vector.dev/docs/reference/vrl/
[10]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[11]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[12]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[13]: https://vector.dev/docs/reference/configuration/
[14]: /agent/kubernetes/?tab=helm
[15]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[16]: https://vector.dev/docs/setup/installation/package-managers/helm/
[17]: /api/latest/logs/#send-logs
