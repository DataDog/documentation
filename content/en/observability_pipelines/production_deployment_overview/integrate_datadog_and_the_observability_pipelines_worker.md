---
title: Integrate Datadog and the Observability Pipelines Worker
kind: documentation
aliases:
  - /agent/vector_aggregation/
  - /integrations/observability_pipelines/integrate_vector_with_datadog/
  - /observability_pipelines/integrate_vector_with_datadog/
  - /observability_pipelines/integrations/integrate_vector_with_datadog/
  - /observability_pipelines/guide/configure_observability_pipelines_with_datadog/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Learn more about Datadog Log Management"
- link: "/agent/proxy/"
  tag: "Documentation"
  text: "Configure the Agent to use a proxy"
- link: "/observability_pipelines/configurations/"
  tag: "Documentation"
  text: "Learn more about Observability Pipelines configurations"
- link: "/observability_pipelines/working_with_data/"
  tag: "Documentation"
  text: "Working with data using Observability Pipelines"
---

## Overview

The Observability Pipelines Worker integrates with Datadog to aggregate logs and metrics from Datadog Agents and route collected telemetry to Datadog.

Data flows along the following path:
`Datadog Agent -> Observability Pipelines Worker -> Datadog`

Before collecting your observability data from the Datadog Agent using the Observability Pipelines Worker, you must:

- Have the [Datadog Agent v6.35+ or v7.35+ installed][1].
- Have the [Observability Pipelines Worker installed][2]. 
- Have a [basic understanding of configuring the Observability Pipelines Worker][3].

## Set up the Datadog Agent and your environment

You must configure the [Datadog Agent](#datadog-agent-configuration) before setting up the Observability Pipelines Worker to collect, transform, and route logs or metrics from the Datadog Agent to Datadog. If you are using Kubernetes, you must also configure [Kubernetes](#kubernetes-configuration) beforehand.

### Datadog Agent configuration

#### Send logs to the Observability Pipelines Worker

To send logs to the Observability Pipelines Worker, update the Agent configuration file, `datadog.yaml`, with the following:

```yaml
observability_pipelines_worker:
  logs.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  logs.url: "http://<OPW_HOST>"

```

#### Send metrics to Observability Pipelines Worker

To send metrics, update the `datadog.yaml` file with the following:

```yaml
observability_pipelines_worker:
  metrics.enabled: true
  # Adjust protocol to https if TLS/SSL is enabled on the Observability Pipelines Worker
  metrics.url: "http://<OPW_HOST>"
```

`OPW_HOST` is the hostname of the system running the Observability Pipelines Worker, which should include the TCP port on which the `datadog_agent` source is listening.

#### Using Docker

If you are using Docker, add the following to your Agent configuration file, `datadog.yaml`:

```
-e DD_OBSERVABILITY_PIPELINES_WORKER_URL=http://<OPW_HOST>:<OPW_PORT>
-e DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED=true
-e DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL=http://<OPW_HOST>:<OPW_PORT>
-e DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED=true
```

### Kubernetes configuration

Use the official Datadog Helm chart, and add the [Agent configuration settings](#datadog-agent-configuration) to the `agents.customAgentConfig` value.

**Note:** `agent.useConfigMap` must be set to `true` for `agents.customAgentConfig` to be taken into account.

For additional details about the Datadog Helm chart, see [the Kubernetes documentation][4].

The Observability Pipelines Worker's [chart][5] can hold any valid configuration in the `values.yaml` file using the `customConfig` field. To enable `datadog_logs`, these [configurations](#observability-pipelines-worker-configurations) can be directly included as-is in the chart configuration.

## Observability Pipelines Worker configurations

### Source configuration

To receive data from the Datadog Agent, configure the Observability Pipelines Worker with a [datadog_agent][6] source:

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
[sources.datadog_agents]
type = "datadog_agent"
address = "[::]:8080"
multiple_outputs = true
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

### Add Observability Pipelines Worker tags

Logs and metrics sent by the Datadog Agent to the Observability Pipelines Worker can be manipulated or formatted as explained in [working with data][7]. When submitting logs using the Datadog API, see the [Datadog reserved attributes][8] for more information.

The Worker can also directly collect logs and metrics from [alternative sources][9]. When doing so, third-party logs may not include proper tagging. Use the [Vector Remap Language][10] (VRL) to [add tags][11], sources, or service values.

#### Logs

You can include specific Observability Pipelines Worker tags when sending logs to Datadog. Adding these tags is useful if you are migrating to the Worker. In this example, all logs sent to Datadog is tagged with the Worker host.

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
    .ddtags.sender = "observability_pipelines_worker"
    .ddtags.opw_aggregator = get_hostname!()

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

These tags can be used to validate whether the Observability Pipelines Worker sent the data. More specifically, if you are migrating to the Worker, use these tags as attributes to determine whether the data has been moved over correctly.

**Note:** The `del(.status)` in this configuration handles container logs that are categorized as `ERROR` by the Datadog Agent. This status is usually stripped out by the logs ingestion endpoint, but since the Worker receives the raw payload from the Agent, the Worker must perform this processing itself.

#### Metrics

Similarly, to send metrics to Datadog with Observability Pipelines Worker tags, see the following example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
remap_metrics_for_datadog:
  type: remap
  inputs:
    - some_input_id
  source: |
    .tags.sender = "observability_pipelines_worker"
    .tags.opw_aggregator = get_hostname!()
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

To send logs to Datadog, the Observability Pipelines Worker must be configured with at least one [datadog_logs][12] sink. See the following example:

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

Similarly to send metrics to Datadog, the Observability Pipelines Worker must be configured with at least one [datadog_metrics][13] sink. See the following example:

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
[sinks.metrics_to_datadog]
type = "datadog_metrics"
inputs = [ "tag_metrics" ]
default_api_key = "${DATADOG_API_KEY_ENV_VAR}"
compression = "gzip"
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
    "compression": "gzip"
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}


## Advanced configurations

### Disk buffers

Datadog recommends enabling disk buffers to prevent data loss. The Observability Pipelines Worker uses disk buffers to ensure no data is lost when there is a spike in data being sent or the downstream service is sending back pressure. See the configuration below for setting buffers at the sink level.

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
    "buffer": {
         "type": "disk"
         "max_size": 309237645312
     }
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Disk space

You should provision at least 36 GiB per vCPU of disk space. If you follow the recommendation of 8 vCPUs, you would provision 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs), allocating ​​48 GiB for metrics and 240 GiB for logs. You can add a volume to the the Observability Pipelines Worker instances to hold the buffer in your Helm chart:

{{< tabs >}}
{{% tab "AWS" %}}

```
observability_pipelines_worker:
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
observability_pipelines_worker:
  persistence:
    enabled: true
    storageClassName: "default"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{% tab "GKE" %}}

```
observability_pipelines_worker:
  persistence:
    enabled: true
    storageClassName: "premium-rwo"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{< /tabs >}}

Read more about [architecting buffers][14].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/?tabs=agentv6v7
[2]: /observability_pipelines/installation/
[3]: /observability_pipelines/configurations/
[4]: /agent/kubernetes/?tab=helm
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/README.md
[6]: /observability_pipelines/reference/sources/#datadogagent
[7]: /observability_pipelines/working_with_data
[8]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[9]: /observability_pipelines/reference/sources/
[10]: https://vector.dev/docs/reference/vrl/
[11]: /getting_started/tagging
[12]: /observability_pipelines/reference/sinks/#datadoglogs
[13]: /observability_pipelines/reference/sinks/#datadogmetrics
[14]: /observability_pipelines/production_deployment_overview/architecture_design_and_principles/#buffering-data
