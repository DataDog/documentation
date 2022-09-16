---
title: Integrate Vector with Datadog
kind: documentation
dependencies:
  ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/integrate_vector_with_datadog.md"]
aliases:
  - /agent/vector_aggregation/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Learn more about Datadog Log Management"
- link: "/agent/proxy/"
  tag: "Documentation"
  text: "Configure the Agent to use a proxy"
- link: "https://vector.dev/docs/"
  tag: "Documentation"
  text: "Vector documentation"
- link: "/integrations/observability_pipelines/vector_configurations/"
  tag: "Documentation"
  text: "Learn more about Vector configurations"
- link: "/integrations/observability_pipelines/working_with_data/"
  tag: "Documentation"
  text: "Working with data using Vector"
---

## Overview

Vector integrates with Datadog to aggregate logs and metrics from Datadog Agents and route collected telemetry to Datadog.

Data flows along the following path:
`Datadog Agent -> Vector -> Datadog`

Before collecting your observability data from the Datadog Agent using Vector, you must:

- Have the [Datadog Agent v6.35+ or v7.35+ installed][1].
- Have [Vector installed][2]. 
- Have a [basic understanding of configuring Vector][3].

## Set up the Datadog Agent and your environment

You must configure the [Datadog Agent](#datadog-agent-configuration) before setting up Vector to collect, transform, and route logs or metrics from the Datadog Agent to Datadog. If you are using Kubernetes, you must also configure [Kubernetes](#kubernetes-configuration) before setting up Vector.

### Datadog Agent configuration

#### Send logs to Vector

To send logs to Vector, update the Agent configuration file, `datadog.yaml`, with the following:

```yaml
vector:
  logs.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Vector side
  logs.url: "http://<VECTOR_HOST>"

```

#### Send metrics to Vector

To send metrics, update the `datadog.yaml` file with the following:

```yaml
vector:
  metrics.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Vector side
  metrics.url: "http://<VECTOR_HOST>"
```

`VECTOR_HOST` is the hostname of the system running Vector, which should include the TCP port on which the Vector `datadog_agent` source is listening.

#### Using Docker

If you are using Docker, add the following to your Agent configuration file, `datadog.yaml`:

```
-e DD_VECTOR_METRICS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_METRICS_ENABLED=true
-e DD_VECTOR_LOGS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_LOGS_ENABLED=true
```

### Kubernetes configuration

Use the official Datadog Helm chart, and add the [Agent configuration settings](#datadog-agent-configuration) to the `agents.customAgentConfig` value.

**Note:** `agent.useConfigMap` must be set to `true` for `agents.customAgentConfig` to be taken into account.

For additional details about the Datadog Helm chart, see [the Kubernetes documentation][4].

Vector provides an [official chart for aggregating data][5] that comes with a Datadog
log source pre-configured. For more information about installing Vector using Helm,
see the [official Vector documentation][6].

Vector's chart can hold any valid Vector configuration in the `values.yaml` file using the `customConfig` field. To enable `datadog_logs`, these [Vector configurations](#vector-configurations) can be directly included as-is in the Vector chart configuration.

## Vector configurations

See the [Vector documentation][7] for all available configuration parameters and transforms that can be applied to all data processed by Vector.

### Source configuration

To receive data from the Datadog Agent, configure Vector with a [datadog_agent source][8]:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    address: "[::]:8080"
    multiple_outputs: true # To automatically separate metrics and logs
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
sources:
  datadog_agents:
    type: datadog_agent
    address: '[::]:8080'
    multiple_outputs: true
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "datadog_agents": {
      "type": "datadog_agent",
      "address": "[::]:8080",
      "multiple_outputs": true
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Add Vector-specific tags

Logs and metrics sent by the Datadog Agent to Vector can be manipulated or formatted as explained in [working with data][9]. When submitting logs using the Datadog API, see the [Datadog reserved attributes][10] for more information.

Vector can also directly collect logs and metrics from [alternative sources][11]. When doing so, third-party logs may not include proper tagging. Use the [Vector Remap Language][12] to [add tags][13], sources, or service values.

#### Logs

You can include specific Vector tags when sending logs to Datadog. Adding these tags is useful if you are migrating to Vector. In this example, we'll tag all logs sent to Datadog with the Vector host.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
remap_logs_for_datadog:
  type: remap
  inputs:
        - datadog_agents
  source: |
  # Parse the received .ddtags field so we can easily access the contained tags
    .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":" field_delimiter: ",")
    .ddtags.sender = "vector"
    .ddtags.vector_aggregator = get_hostname!()

  # Re-encode Datadog tags as a string for the `datadog_logs` sink
    .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  # Datadog Agents pass a "status" field that is stripped when ingested
    del(.status)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[remap_logs_for_datadog]
type = "remap"
inputs = [ "datadog_agents" ]
source = """
# Parse the received .ddtags field so we can more easily access the contained tags
  .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")
  .ddtags.sender = "vector"
  .ddtags.vector_aggregator = get_hostname!()
# Re-encode Datadog tags as a string for the `datadog_logs` sink
  .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")
# Datadog Agents pass a 'status' field that is stripped when ingested
  del(.status)
"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "remap_logs_for_datadog": {
    "type": "remap",
    "inputs": [
      "datadog_agents"
    ],
    "source":
"# Parse the received .ddtags field so we can more easily access the contained tags
.ddtags = parse_key_value!(.ddtags, key_value_delimiter: \":\", field_delimiter: \",\")
.ddtags.sender = \"vector\"\n.ddtags.vector_aggregator = get_hostname!()

# Re-encode Datadog tags as a string for the `datadog_logs` sink
.ddtags = encode_key_value(.ddtags, key_value_delimiter: \":\", field_delimiter: \",\")

# Datadog Agents pass a \"status\" field that is stripped when ingested
del(.status)"

  }
}

```

{{% /tab %}}
{{< /tabs >}}

These tags can be used to validate whether Vector sent the data. More specifically, if you are migrating to Vector, use these tags as attributes to determine whether the data has been moved over correctly.

**Note:** The `del(.status)` in this configuration handles container logs that are categorized as `ERROR` by the Datadog Agent. This status is usually stripped out by the logs ingestion endpoint, but since Vector receives the raw payload from the Agent, Vector must perform this processing itself.

#### Metrics

Similarly, to send metrics to Datadog with Vector specific tags, see the following example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
remap_metrics_for_datadog:
  type: remap
  inputs:
    - some_input_id
  source: |
    .tags.sender = "vector"
    .tags.vector_aggregator = get_hostname!()
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[remap_metrics_for_datadog]
type = "remap"
inputs = [ "some_input_id" ]
source = """
    .tags.sender = "vector"
    .tags.vector_aggregator = get_hostname!()
"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "remap_metrics_for_datadog": {
    "type": "remap",
    "inputs": [
      "some_input_id"
    ],
    "source":
       .tags.sender = "vector"
       .tags.vector_aggregator = get_hostname!()
  }
}
```

{{% /tab %}}
{{< /tabs >}}


### Sink configuration

#### Logs

To send logs to Datadog, Vector must be configured with at least one [datadog_logs sink][14]. See the following example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  log_to_datadog:
    type: datadog_logs
    inputs:
       - remap_logs_for_datadog
    default_api_key: "${DATADOG_API_KEY}"
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.log_to_datadog]
type = "datadog_logs"
inputs = [ "remap_logs_for_datadog" ]
default_api_key = "${DATADOG_API_KEY}"

  [sinks.log_to_datadog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "log_to_datadog": {
      "type": "datadog_logs",
      "inputs": [
        "remap_logs_for_datadog"
      ],
      "default_api_key": "${DATADOG_API_KEY}",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Metrics

Similarly to send metrics to Datadog, Vector must be configured with at least one [datadog_metrics sink][15]. See the following example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
      - tag_metrics
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
   compression: gzip
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "metrics_to_datadog": {
      "type": "datadog_metrics",
      "inputs": [
        "tag_metrics"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
    compression: gzip
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}


## Advanced Vector configurations

### Disk buffers

Datadog recommends enabling disk buffers to prevent data loss. Vector uses [disk buffers][17] to ensure no data is lost when there is a spike in data being sent or the downstream service is sending back pressure.  See the configuration below for setting buffers at the sink level.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
    buffer:
         type: disk
         max_size: 309237645312
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.metrics_to_datadog]
type = "datadog_metrics"
inputs = [ "some_input_id" ]
default_api_key = "${DATADOG_API_KEY_ENV_VAR}"
compression = "gzip"

  [sinks.metrics_to_datadog.buffer]
  type = "disk"
  max_size = 309_237_645_312

```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "metrics_to_datadog": {
      "type": "datadog_metrics",
      "inputs": [
        "tag_metrics"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
    compression: gzip,
    “buffer”: {
         “type”: “disk”
         “max_size”: 309237645312
     }
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Disk space

You should provision at least 36 GiB per vCPU * of disk space. If you follow the recommendation of 8 vCPUs, you would provision 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs), allocating ​​48 GiB for metrics and 240 GiB for logs. You can add a volume to the Vector instances to hold the buffer in your Helm chart:

{{< tabs >}}
{{% tab "AWS" %}}

```
vector:
  persistence:
    enabled: true
    storageClassName: "io2"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{% tab "Azure" %}}

```
vector:
  persistence:
    enabled: true
    storageClassName: "default"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{% tab "GKE" %}}

```json
vector:
  persistence:
    enabled: true
    storageClassName: "premium-rwo"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{< /tabs >}}

Read more about [architecting buffers][18].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/?tabs=agentv6v7
[2]: /integrations/observability_pipelines/setup/#install-vector
[3]: /integrations/observability_pipelines/vector_configurations/
[4]: /agent/kubernetes/?tab=helm
[5]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[6]: https://vector.dev/docs/setup/installation/package-managers/helm/
[7]: https://vector.dev/docs/reference/configuration/
[8]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[9]: /integrations/observability_pipelines/working_with_data
[10]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[11]: /integrations/observability_pipelines/integrations/#sources
[12]: https://vector.dev/docs/reference/vrl/
[13]: /getting_started/tagging
[14]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[15]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[17]: https://vector.dev/docs/about/concepts/#buffers
[18]: https://vector.dev/docs/setup/going-to-prod/architecting/#buffering-data
