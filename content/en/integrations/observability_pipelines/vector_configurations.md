---
title: Vector Configurations
kind: Documentation
dependencies:
  ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/vector_configurations.md"]
further_reading:
  - link: /integrations/observability_pipelines/working_with_data/
    tag: Documentation
    text: Working with data using Vector
  - link: https://vector.dev/releases/ 
    tag: Documentation
    text: Check out the new release for Vector
  - link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
    tag: Documentation
    text: Datadog Agent as a source for Vector
  - link: /agent/vector_aggregation/ 
    tag: Documentation
    text: Configure Datadog Agents to send data to Vector aggregators
---

## Overview

Vector configurations can collect, transform, and route your logs, metrics, and traces from any source to any destination. Vector is configured using a configuration file and supports YAML, TOML, and JSON. The three main configuration components are sources, transforms, and sinks.

## Set up an example source

[Source components][1] define how Vector collects or receives data from observability data sources. 

Create a configuration file, for example,`vector.toml`. Then, add the following source example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
   type = "demo_logs"
   format = "syslog"
   count = 100
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
}
```

{{% /tab %}}
{{< /tabs >}}

This `source` component has a unique ID of `generate_syslog`. This unique ID is important for transforming and routing the data with the`sink` component.

`type` is the source type that the Vector configuration collects observability data from. This example uses a `demo_logs` source, which creates sample log data that enables you to simulate different types of events in various formats. The `format` option tells the `demo_logs` source which type of logs to emit, in this case, Syslog format. The `count` option tells the `demo_logs` source how many lines to emit.

See all supported sources in the [Sources documentation][1].

## Set up an example transform

Use the following example to define a [transform component][2] that manipulates the data collected from the `demo_logs` source.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.remap_syslog]
   inputs = ["generate_syslog" ]
   type = "remap"
   source = '''
     structured = parse_syslog!(.message)
     . = merge(., structured)
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  }
```

{{% /tab %}}
{{< /tabs >}}

In this `transforms.remap_syslog` component, the `inputs` option is set to `generate_syslog`, which means it receives events from the previously defined `generate_syslog` source. The transform's component type is `remap`.

The `source` contains the list of remapping transformations to apply to each event that Vector receives. In this example, only one operation, `parse_syslog`, is performed, but multiple operations can be added. 

The  `parse_syslog` function receives a single field called `message`, which contains the Syslog event that is generated in the `generate_syslog` source. This function parses the content of the Syslog-formatted message and emits it as a structured event. 

This transform example showcases only a portion of Vector’s ability to shape and transform your logs, metrics, and traces. See the [Transforms documentation][2] for all supported transforms, ranging from sampling, filtering, enrichment, and more.

## Set up an example sink

With the data parsed in the `transform` component, use the following [sink][3] example to route the data to a destination. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

This `sink` (or destination) component has the ID of `emit_syslog`. The `inputs` option specifies that the events generated by the `remap_syslog` transform are processed with this sink. The `encoding` option tells the sink to emit the events in JSON format.

See the [Sinks documentation][3] for all supported sinks.

## Put it all together

With these three basic components, a source, transform, and sink, you now have a working Vector configuration file. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)

sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog" ]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
  . = merge(., structured)
'''

[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
  },
  "transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  },
  "sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Run the following command to compile and run this configuration:

```
vector --config ./<configuration_filename>
```

If successfully setup, the parsed demo logs are printed in JSON format. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/configuration/sources/
[2]: https://vector.dev/docs/reference/configuration/transforms/
[3]: https://vector.dev/docs/reference/configuration/sinks/
