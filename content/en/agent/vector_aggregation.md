---
title: Aggregating multiple agents using Vector
kind: documentation
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/agent/proxy/"
  tag: "Documentation"
  text: "Configure the Agent to use a proxy"

---

## Overview 

The Datadog agent can be used along with [Vector][1], in this scenario Agents will send data
to Vector that will aggregate data from multiple incoming Agent:

`Agents ---> Vector ---> Datadog`

This scenario differs from using a [proxy][2] in the extend that Vector is able to
process data before sending them to Datadog. Vector capabilities include, among others:
* Log sampling
* Log deduplication to avoid duplicated log to be send
* Transforming logs using the [Vector Remap Language][3]


**Note**: Only logs aggregation is supported, support for other data type (metrics, processes, traces, etc.)
will be available later.

**Note**: Vector can also directly collect logs from alternative sources, if doing so it is likely that those 
third party logs won't come with proper tagging. A convenient way of [adding tags][4], source or service values is to do so using the [Vector Remap Language][3].

## Configuration

### Agent configuration
To send logs to vector the Agent configuration file, `datadog.yaml` should be update to send data to Vector.
As only logs data type are currently supported, you need to update the following values in your `datadog.yaml`:
```yaml
logs_config:
  logs_dd_url: "<VECTOR_HOST>:<VECTOR_PORT>"
  logs_no_ssl: true # If TLS/SSL is not enabled on the vector side
```

### Vector configuration
To receive logs from Datadog Agent Vector should be configured with a [datadog_logs source][5].
To send logs to Datadog, Vector should be configured with at least one [datadog_logs sink][6].

Please check the official [Vector documentation][7] for all available configuration parameters and
all transforms that can be applied to logs while they are processed by Vector.

Sample configuration that simply add a tag to every log using the Vector Remap Language:
```yaml
sources:
  datadog_agents:
    type: datadog_logs
    address: "[::]:8080"

transforms:
  add_tags:
    type: remap
    inputs:
      - datadog_agents
    source: |
      .ddtags = add_datadog_tags!(.ddtags, ["sender:vector"])

sinks:
  to_datadog:
    type: datadog_logs
    inputs:
       - add_tags
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
    encoding:
      codec: json
    healthcheck:
      enabled: true
```

### Using Kubernetes
Using the official Datadog chart the following values need to be updated:
```yaml
agents:
  useConfigMap: true
  agents.customAgentConfig:
    logs_dd_url: "<VECTOR_HOST>:<VECTOR_PORT>"
    logs_no_ssl: true # If TLS/SSL is not enabled on the vector side
```

For additional details about the Datadog chart, please check [this page][8].

Vector provide an [offical chart for aggregating data][9] that comes with a Datadog
logs source preconfigured. For more information about installing Vector using Helm
please refer to the [official Vector documentation][10].

To ultimately sent logs to Datadog, a `datadog_logs` sinks need to be added to the Vector
configuration. The Vector's chart easily support adding additional sinks in its `values.yaml` file.

A sample `datadog_logs` sinks would consist in the following additions, it includes a `remap` transform
that simply adds a Datadog tag to recognize logs forwarded by Vector:

```yaml
transforms:
  add_tags:
    type: remap
    inputs:
      - datadog_logs # It's the name of the preconfigured Datadog source
    source: |
      .ddtags = .ddtags + ",sender:vector"

sinks:
  to_datadog:
    type: datadog_logs
    inputs:
       - add_tags
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
    encoding:
      codec: json
    healthcheck:
      enabled: true
```

## Manipulating Datadog Logs with Vector

Logs sent to Vector can benefit from the full capabilities of Vector, including [VRL][3] manipulation.
When received by Vector, logs sent by a Datadog Agent are structured using the expected schema when
submitting logs directly to the Datadog API, please refer to the [API documention][11]
for a complete schema description.

Logs collected by Vector from other sources can be fully enriched according to
[Datadog recommandation][4], VRL can be used to adjust those logs to fill relevant
fields according to the expected schema. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /agent/proxy
[3]: https://vector.dev/docs/reference/configuration/transforms/remap/
[4]: /getting_started/tagging
[5]: https://vector.dev/docs/reference/configuration/sources/datadog_logs/
[6]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[7]: https://vector.dev/docs/reference/configuration/
[8]: /agent/kubernetes/?tab=helm
[9]: https://github.com/timberio/vector/tree/master/distribution/helm/vector-aggregator
[10]: https://vector.dev/docs/setup/installation/package-managers/helm/
[11]: api/latest/logs/#send-logs
