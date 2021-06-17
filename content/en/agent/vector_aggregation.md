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

This scenario differs from using a <a href="/agent/proxy">proxy</a> in the extend that Vector is able to
process data before sending them to Datadog. Vector capabilities include, among others:
* Log sampling
* Log deduplication to avoid duplicated log to be send
* Transforming logs using the [Vector Remap Language][2]


**Note**: Only logs aggregation is supported, support for other data type (metrics, processes, traces, etc.)
is scheduled for later.

**Note**: Vector can also directly collect logs from alternative sources, if doing so it is likely that those 
third party logs won't come with proper tagging. A convenient way of <a href="/getting_started/tagging/">adding tags</a>, source or service values is to do so using the [Vector Remap Language][2].

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
To receive logs from Datadog Agent Vector should be configured with a [datadog_logs source][3].
To send logs to Datadog, Vector should be configured with at least one [datadog_logs sink][4].

Please check the official [Vector documentation][5] for all available configuration parameters and
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

For additional details about the Datadog chart, please check <a href="/agent/kubernetes/?tab=helm">this page</a>.

Vector provide an [offical chart for aggregating data][6] that comes with a Datadog
logs source preconfigured. For more information about installing Vector using Helm
please refer to the [official Vector documentation][7].

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: https://vector.dev/docs/reference/configuration/transforms/remap/
[3]: https://vector.dev/docs/reference/configuration/sources/datadog_logs/
[4]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[5]: https://vector.dev/docs/reference/configuration/
[6]: https://github.com/timberio/vector/tree/master/distribution/helm/vector-aggregator
[7]: https://vector.dev/docs/setup/installation/package-managers/helm/
