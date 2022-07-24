---
title: Working with Data
kind: Documentation
dependencies:
  ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/working_with_data.md"]
further_reading:
  - link: https://vector.dev/docs/reference/configuration/transforms/aws_ec2_metadata/
    tag: Documentation
    text: Parsing metadata emitted by AWS EC2 instance
  - link: https://vector.dev/docs/reference/configuration/transforms/lua/
    tag: Documentation
    text: Modifying events with Lua
  - link: https://vector.dev/docs/reference/configuration/transforms/tag_cardinality_limit/ 
    tag: Documentation
    text: Limit the cardinality of tags on metrics to safeguard against cardinality explosion
  - link: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
    tag: Documentation
    text: Convert logs to metric events
  - link: https://vector.dev/docs/reference/configuration/transforms/metric_to_log/ 
    tag: Documentation
    text: Convert metrics to log events
  - link: https://vector.dev/docs/reference/configuration/transforms/geoip/
    tag: Documentation
    text: Enrich events with GeoIP metadata
  - link: https://vector.dev/guides/level-up/csv-enrichment-guide/
    tag: Documentation
    text: Use CSV enrichment to provide more context to your data
  - link: https://docs.datadoghq.com/agent/vector_aggregation/ 
    tag: Documentation
    text: Configure Datadog agents to send data to Vector aggregators
  - link: /integrations/observability_pipelines/vector_configurations/
    tag: Documentation
    text: Learn more about Vector configurations
---

## Overview

Vector enables you to shape and transform observability data. Similar to Logging without Limits™ pipelines, you can configure Vector pipelines that are composed of a series of Vector `transform` components. These transforms allow you to parse, structure, and enrich data with built-in type safety.

## Remap data with Vector Remap Language

Vector Remap Language (VRL) is an expression-oriented, domain specific language designed for transforming observability data (logs and metrics). It features a simple syntax and [built-in functions][1] tailored to observability use cases.

Vector Remap Language is supported in Vector’s `remap` transform. 

Remap transforms act on a single event and can be used to transform them or specify conditions for routing and filtering. You can use VRL in the following ways:

- Manipulate [arrays][2], [strings][3], and other data types.
- Encode and decode values using [Codec][4].
- [Encrypt][5] and [decrypt][6] values.
- [Coerce][7] one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values][8] to read-able values.
- Enrich values by using [enrichment tables][9].
- [Manipulate IP values][10].
- [Parse][11] values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata][12] and [paths][13].

See [VRL Function Reference][1] for a full list of VRL built-in functions.

To get started, see the following example for a basic remap transform that contains a VRL program in the `source` field:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  modify:
    type: remap
    inputs:
      - previous_component_id
    source: |2
        del(.user_info)
        .timestamp = now()
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.modify]
type = "remap"
inputs = ["previous_component_id"]
source = '''
  del(.user_info)
  .timestamp = now()
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "modify": {
      "type": "remap",
      "inputs": [
        "previous_component_id"
      ],
      "source": "  del(.user_info)\n  .timestamp = now()\n"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

In this example, the `type` field is set to a `remap` transform. The `inputs` field defines where it receives events from the previously defined `previous_component_id` source. The first line in the `source` field deletes the `.user_info` field. At scale, dropping fields is particularly useful for reducing the payload of your events and cutting down on spend for your downstream services. 

The second line adds the `.timestamp` field and the value to the event, changing the content of every event that passes through this transform.

See [VRL References][14] and [Vector Configurations][15] for more information.

## Parse data

Parsing showcases more advanced use cases of VRL. The below snippet is an HTTP log event in JSON format:

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```

The configuration below uses VRL to modify the log event by: 

- Parsing the raw string into JSON. 
- Reformatting the time into a UNIX timestamp. 
- Removing the username field.
- Converting the message to lowercase. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  parse_syslog_id:
    type: remap
    inputs:
      - previous_component_id
    source: |2
         . = parse_json!(string!(.message))
         .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
         del(.username)
         .message = downcase(string!(.message))
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.parse_syslog_id]
type = "remap"
inputs = ["previous_component_id"]
source = '''
   . = parse_json!(string!(.message))
   .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
   del(.username)
   .message = downcase(string!(.message))
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "parse_syslog_id": {
      "type": "remap",
      "inputs": [
        "previous_component_id"
      ],
      "source": "   . = parse_json!(string!(.message))\n   .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))\n   del(.username)\n   .message = downcase(string!(.message))\n"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

This configuration returns the following:

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## Sample, reduce, filter, and aggregate data

Sampling, reducing, filtering, and aggregating are common transforms to reduce the volume of observability data delivered to downstream services. Vector offers a variety of ways to control your data volume:

- [Sample events][16] based on supplied criteria and at a configurable rate.
- [Reduce and collapse][17] multiple events into a single event.
- Remove unnecessary fields.
- [Deduplicate][18] events. 
- [Filter events][19] based on a set of conditions.
- [Aggregate multiple metric events][20] into a single metric event based on a defined interval window.
- [Convert metrics to logs][21].

See [Control Log Volume and Size][22] for examples on how to use these transforms.

## Route data

Another commonly used transform is `route`, which allows you to split a stream of events into multiple substreams based on supplied conditions. This is useful when you need to send observability data to different destinations or operate differently on streams of data based on their use case. 

The below snippet is an example log that you want to route to different destinations based on the value of the `level` field: 

```
{
  "logs": {
    "kind": "absolute",
    “level”: “info”,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

To route based on the `level` value, see the below configuration example:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  splitting_logs_id:
    type: route
    inputs:
      - my-source-or-transform-id
    route:
      debug: .level == "debug"
      info: .level == "info"
      warn: .level == "warn"
      error: .level == "error"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.splitting_logs_id]
type = "route"
inputs = [ "my-source-or-transform-id" ]

  [transforms.splitting_logs_id.route]
  debug = '.level == "debug"'
  info = '.level == "info"'
  warn = '.level == "warn"'
  error = '.level == "error"'
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "route",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "route": {
        "debug": ".level == \"debug\"",
        "info": ".level == \"info\"",
        "warn": ".level == \"warn\"",
        "error": ".level == \"error\""
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Each row under the `route` field defines a route identifier, followed by a logical condition representing the filter of the `route`. The end result of this `route` can then be referenced as an input by other components with the name `<transform_name>.<route_id>`. 

For example, if you wish to route logs with `level` field values of `warn` and `error` to Datadog, see the following example: 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  my_sink_id:
    type: datadog_logs
    inputs:
      - splitting_logs_id.warn
      - splitting_logs_id.error
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
    compression: gzip
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.my_sink_id]
type = "datadog_logs"
inputs = [ "splitting_logs_id.warn", "splitting_logs_id.error" ]
default_api_key = "${DATADOG_API_KEY_ENV_VAR}"
compression = "gzip"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "my_sink_id": {
      "type": "datadog_logs",
      "inputs": [
        "splitting_logs_id.warn",
        "splitting_logs_id.error"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
      "compression": "gzip"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

See the [Route Transform documentation][23] for more information.

## Throttle data

Downstream services can sometimes get overwhelmed when there is a spike in volume, which can lead to data being dropped. Use the `throttle` transform to safeguard against this scenario and also enforce usage quotas on users. The `throttle` transform rate limits logs passing through a topology. See the following example of a `throttle` transform configuration:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: throttle
    inputs:
      - my-source-or-transform-id
    exclude: null
    threshold: 100
    window_secs: 1
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "throttle"
inputs = [ "my-source-or-transform-id" ]
threshold = 100
window_secs = 1
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "throttle",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": null,
      "threshold": 100,
      "window_secs": 1
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

The `threshold` field defines the number of events allowed for a given bucket. `window_secs` defines the time frame in which the configured threshold is applied. In the example configuration, when the component receives more than 100 events in a span of 1 second, any additional events are dropped. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/vrl/functions/
[2]: https://vector.dev/docs/reference/vrl/functions/#array-functions
[3]: https://vector.dev/docs/reference/vrl/functions/#string-functions
[4]: https://vector.dev/docs/reference/vrl/functions/#codec-functions
[5]: https://vector.dev/docs/reference/vrl/functions/#encrypt
[6]: https://vector.dev/docs/reference/vrl/functions/#decrypt
[7]: https://vector.dev/docs/reference/vrl/functions/#coerce-functions
[8]: https://vector.dev/docs/reference/vrl/functions/#convert-functions
[9]: https://vector.dev/docs/reference/vrl/functions/#enrichment-functions
[10]: https://vector.dev/docs/reference/vrl/functions/#ip-functions
[11]: https://vector.dev/docs/reference/vrl/functions/#parse-functions
[12]: https://vector.dev/docs/reference/vrl/functions/#event-functions
[13]: https://vector.dev/docs/reference/vrl/functions/#path-functions
[14]: https://vector.dev/docs/reference/vrl/#reference
[15]: /integrations/observability_pipelines/vector_configurations
[16]: https://vector.dev/docs/reference/configuration/transforms/sample/
[17]: https://vector.dev/docs/reference/configuration/transforms/reduce/
[18]: https://vector.dev/docs/reference/configuration/transforms/dedupe/
[19]: https://vector.dev/docs/reference/configuration/transforms/filter/
[20]: https://vector.dev/docs/reference/configuration/transforms/aggregate/
[21]: https://vector.dev/docs/reference/configuration/transforms/metric_to_log/
[22]: /integrations/observability_pipelines/guide/control_log_volume_and_size/
[23]: https://vector.dev/docs/reference/configuration/transforms/route/
