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

---

## Overview 

The Datadog Agent can be used along with [Vector][1]. In this scenario Agents will send data
to Vector which will aggregate data from multiple upstream Agents:

`Agents ---> Vector ---> Datadog`

This scenario differs from using a [proxy][2] since Vector is able to process data before sending
it to Datadog and other destinations. Vector capabilities include, among others:
others:

* [Log parsing, structuring, and enrichment][3]
* Cost reduction through [sampling][4]
* [Redaction of PII][5] and sensitive data before it leaves your network
* [Deriving metrics from logs][6] for cost effective analysis
* [Routing to multiple destinations][7]

**Note**: Only logs aggregation is currently supported.

**Note**: Vector can also directly collect logs from alternative sources. If doing so, it is likely that 
third party logs won't come with proper tagging. A convenient way to [add tags][8], source or service
values is to use the [Vector Remap Language][3].

## Configuration

### Agent configuration
To send logs to Vector, update the Agent configuration file, `datadog.yaml`.
Only the logs data type is currently supported. Update the following values in the `datadog.yaml` file:
```yaml
logs_config:
  logs_dd_url: "<VECTOR_HOST>:<VECTOR_PORT>"
  logs_no_ssl: true # If TLS/SSL is not enabled on the vector side
```

### Vector configuration
To receive logs from Datadog Agent, configure Vector with a [datadog_logs source][9].
To send logs to Datadog, Vector should be configured with at least one [datadog_logs sink][10].

See the official [Vector documentation][11] for all available configuration parameters and
all transforms that can be applied to logs while they are processed by Vector.

Here is a configuration example that adds a tag to every log using the Vector Remap Language:
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

### Using Kubernetes

Using the official Datadog chart the following values need to be updated:

```yaml
agents:
  useConfigMap: true
  agents.customAgentConfig:
    logs_dd_url: "<VECTOR_HOST>:<VECTOR_PORT>"
    logs_no_ssl: true # If TLS/SSL is not enabled on the vector side
```

For additional details about the Datadog Helm chart, see [the Kubernetes documentation][12].

Vector provides an [official chart for aggregating data][13] that comes with a Datadog
logs source preconfigured. For more information about installing Vector using Helm,
see to the [official Vector documentation][14].

To ultimately sent logs to Datadog, a `datadog_logs` sink need to be added to the Vector
configuration. Vector's chart supports adding additional sinks in the `values.yaml` file.

A sample `datadog_logs` sink should ideally include a `remap` transform
that adds a Datadog tag to recognize logs forwarded by Vector:

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

## Manipulating Datadog logs with Vector

Logs sent to Vector can benefit from the full capabilities of Vector, including [VRL][3] manipulation.
When received by Vector, logs sent by the Datadog Agent are structured using the expected schema. When
submitting logs directly to the Datadog API, please refer to the [API documentation][15]
for a complete schema descriptions.

Logs collected by Vector from other sources can be [fully enriched][8]. VRL can be used to adjust those logs
to fill relevant fields according to the expected schema. 

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
[9]: https://vector.dev/docs/reference/configuration/sources/datadog_logs/
[10]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[11]: https://vector.dev/docs/reference/configuration/
[12]: /agent/kubernetes/?tab=helm
[13]: https://github.com/timberio/vector/tree/master/distribution/helm/vector-aggregator
[14]: https://vector.dev/docs/setup/installation/package-managers/helm/
[15]: api/latest/logs/#send-logs
