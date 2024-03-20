---
title: (LEGACY) Working with Data
kind: Documentation
aliases:
  - /integrations/observability_pipelines/working_with_data/
  - /observability_pipelines/working_with_data/
further_reading:
  - link: /observability_pipelines/legacy/setup/
    tag: Documentation
    text: Set up Observability Pipelines
  - link: /observability_pipelines/legacy/reference/transforms/#awsec2metadata
    tag: Documentation
    text: Parsing metadata emitted by AWS EC2 instance
  - link: /observability_pipelines/legacy/reference/transforms/#lua
    tag: Documentation
    text: Modifying events with Lua
  - link: /observability_pipelines/legacy/reference/transforms/#logtometric
    tag: Documentation
    text: Convert logs to metric events
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

Observability Pipelines enables you to shape and transform observability data. Similar to Logging without Limits™ pipelines, you can configure pipelines for Observability Pipelines that are composed of a series of transform components. These transforms allow you to parse, structure, and enrich data with built-in type safety.

## Remap data

The [`remap` transform][1] can modify events or specify conditions for routing and filtering events. Use Datadog Processing Language (DPL), or Vector Remap Language (VRL), in the `remap` transform to manipulate arrays and strings, encode and decode values, encrypt and decrypt values, and more. See [Datadog Processing Language][2] for more information and the [DPL Functions reference][3] for a full list of DPL built-in functions.

### Basic `remap` configuration example

To get started, see the following YAML configuration example for a basic `remap` transform that contains a DPL/VRL program in the `source` field:

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

In this example, the `type` field is set to a `remap` transform. The `inputs` field defines where it receives events from the previously defined `previous_component_id` source. The first line in the `source` field deletes the `.user_info` field. At scale, dropping fields is particularly useful for reducing the payload of your events and cutting down on spend for your downstream services.

The second line adds the `.timestamp` field and the value to the event, changing the content of every event that passes through this transform.

## Parse data

Parsing provides more advanced use cases of DPL/VRL.

### Parsing example

#### Log event example

The below snippet is an HTTP log event in JSON format:

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```
#### Configuration example

The following YAML configuration example uses DPL/VRL to modify the log event by:

- Parsing the raw string into JSON.
- Reformatting the time into a UNIX timestamp.
- Removing the username field.
- Converting the message to lowercase.

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

#### Configuration output

The configuration returns the following:

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## Sample, reduce, filter, and aggregate data

Sampling, reducing, filtering, and aggregating are common transforms to reduce the volume of observability data delivered to downstream services. Observability Pipelines offers a variety of ways to control your data volume:

- [Sample events][4] based on supplied criteria and at a configurable rate.
- [Reduce and collapse][5] multiple events into a single event.
- Remove unnecessary fields.
- [Deduplicate][6] events. 
- [Filter events][7] based on a set of conditions.
- [Aggregate multiple metric events][8] into a single metric event based on a defined interval window.

See [Control Log Volume and Size][10] for examples on how to use these transforms.

## Route data

Another commonly used transform is `route`, which allows you to split a stream of events into multiple substreams based on supplied conditions. This is useful when you need to send observability data to different destinations or operate differently on streams of data based on their use case.

### Routing to different destinations example

#### Log example

The below snippet is an example log that you want to route to different destinations based on the value of the `level` field.

```
{
  "logs": {
    "kind": "absolute",
    "level": "info,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

#### Configuration examples

The following YAML configuration example routes data based on the `level` value:

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

Each row under the `route` field defines a route identifier, followed by a logical condition representing the filter of the `route`. The end result of this `route` can then be referenced as an input by other components with the name `<transform_name>.<route_id>`.

For example, if you wish to route logs with `level` field values of `warn` and `error` to Datadog, see the following example:

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

See the [`route` transform reference][11] for more information.

## Throttle data

Downstream services can sometimes get overwhelmed when there is a spike in volume, which can lead to data being dropped. Use the `throttle` transform to safeguard against this scenario and also enforce usage quotas on users. The `throttle` transform rate limits logs passing through a topology.

### Throttle configuration example

The following YAML configuration example is for a `throttle` transform:

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

The `threshold` field defines the number of events allowed for a given bucket. `window_secs` defines the time frame in which the configured threshold is applied. In the example configuration, when the component receives more than 100 events in a span of 1 second, any additional events are dropped.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/reference/transforms/#remap
[2]: /observability_pipelines/legacy/reference/processing_language/
[3]: /observability_pipelines/legacy/reference/processing_language/functions/
[4]: /observability_pipelines/legacy/reference/transforms/#sample
[5]: /observability_pipelines/legacy/reference/transforms/#reduce
[6]: /observability_pipelines/legacy/reference/transforms/#dedupe
[7]: /observability_pipelines/legacy/reference/transforms/#filter
[8]: /observability_pipelines/legacy/reference/transforms/#aggregate
[9]: /observability_pipelines/legacy/reference/transforms/#metrictolog
[10]: /observability_pipelines/legacy/guide/control_log_volume_and_size/
[11]: /observability_pipelines/legacy/reference/transforms/#route
