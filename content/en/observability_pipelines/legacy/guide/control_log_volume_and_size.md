---
title: (LEGACY) Control Log Volume and Size
kind: guide
aliases:
  - /integrations/observability_pipelines/guide/control_log_volume_and_size/
  - /observability_pipelines/guide/control_log_volume_and_size/
further_reading:
  - link: "/observability_pipelines/legacy/working_with_data/"
    tag: "Documentation"
    text: "Working with data using Observability Pipelines"
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
---

## Overview

Because your log volume grows as your organization scales, the cost of ingesting and indexing in your downstream services (for example, log management solutions, SIEMs, and so forth) also rises. This guide walks you through using Observability Pipelines' transforms to cut down on log volume and trim down the size of your logs to control your costs *before* data leaves your infrastructure or network. 

## Prerequisites
- You have [installed and configured the Observability Pipelines Worker][1] to collect data from your sources and route it to your destinations.
- You are familiar with [the basics of configuring Observability Pipelines][2].

## Use transforms to manage log volumes

In Observability Pipelines, a transform performs an action that modifies events, where events are logs flowing through the pipeline. 

### Deduplicate events 

Use the [dedupe transform][3] to remove copies of data passing through your pipeline by adding the following component in your configuration. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: dedupe
    inputs:
      - my-source-or-transform-id
    cache: null
    fields: null
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "dedupe"
inputs = [ "my-source-or-transform-id" ]
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "dedupe",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "cache": null,
      "fields": null
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

The Observability Pipelines Worker assigns every event a unique identifier to track deduplicated events. The `cache` option enables you to cache recent events to be used to check for duplicated data in the future, and defaults to 5,000 events. The `fields` option lists which fields are used to determine if an event is a duplicate.

### Filter events

Use the [filter transform][4] when you want only certain logs that meet a specific criteria to pass through a component of your pipeline. For example, those conditions could be where the logs contain:

- A specific tag, such as `env`.
- A specific field value, such as the `status` field must be `400`.

In those cases, insert a component that contains a [filter transform][4] to filter logs that uses the [Datadog Processing Language (DPL) / Vector Remap Language (VRL)][5] or [Datadog Log Search syntax][6] to set the conditions. Logs that don't match the conditions are dropped. 

The example below uses the filter transform and DPL/VRL to send only logs with a `status` of `500`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: 
      type: "vrl"
      source: ".status == 500"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "filter"
inputs = [ "my-source-or-transform-id" ]

  [transforms.my_transform_id.condition]
  type = "vrl"
  source = ".status == 500"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "filter",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "condition": {
        "type": "vrl",
        "source": ".status == 500"
        }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Sample logs

When analyzing data that comes in large volumes or contains a lot of noise, such as CDN logs, sending all the logs to a destination is unnecessary. Instead, use the [sample transform][7] to send only the logs necessary to perform analysis that is statistically significant.

The `exclude` field excludes events from being sampled, and also supports DPL/VRL or Datadog Log Search syntax. The example below shows a configuration that samples every 10 events, which is set by the `rate`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: sample
    inputs:
      - my-source-or-transform-id
    exclude: 
       type: "datadog_search"
       source: "*stack"
    rate: 10
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "sample"
inputs = [ "my-source-or-transform-id" ]
rate = 10

  [transforms.my_transform_id.exclude]
  type = "datadog_search"
  source = "*stack"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "sample",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": {
        "type": "datadog_search",
        "source": "*stack"
      },
      "rate": 10
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Convert logs to metrics

In scenarios where you want to understand behavior over time, metrics around an event's data point(s) would be more useful than a series of logs. As logs flow through your pipeline, use the [log to metric transform][8] to cut down on log volume by generating metrics based on specific tags. 

You can generate four types of metrics:

- Counter, which is useful to count the number of instances of logs with a specific tag. A count can be incremented, or reset to zero. 
- Distribution, which represents the distribution of sampled values. This is useful for generating summaries and histograms.
- Gauge, which represents a single numerical value that can arbitrarily go up or down. This is useful to track values that fluctuate frequently. 
- Set, which consolidates unique values in an array. This can be useful to collect unique IP addresses, for example. 

The example below illustrates a configuration for generating a `counter` metric , where `metrics` defines the key/value pairs to be added to the event.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: log_to_metric
    inputs:
      - my-source-or-transform-id
    metrics:
      - type: counter
        field: status
        name: response_total
        namespace: service
        tags:
          status: "{{status}}"
          host: "{{host}}"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "log_to_metric"
inputs = [ "my-source-or-transform-id" ]

  [[transforms.my_transform_id.metrics]]
  type = "counter"
  field = "status"
  name = "response_total"
  namespace = "service"

    [transforms.my_transform_id.metrics.tags]
    status = "{{status}}"
    host = "{{host}}"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "log_to_metric",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "metrics": [
        {
          "type": "counter",
          "field": "status",
          "name": "response_total",
          "namespace": "service",
          "tags": {
            "status": "{{status}}",
            "host": "{{host}}"
          }
        }
      ]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

If the following log is passed through the configuration above:

```
{
  "log": {
    "host": "10.22.11.222",
    "message": "Sent 200 in 54.2ms",
    "status": 200
  }
}
```

The following metric is generated:

```
{"metric":{"counter":{"value":1},"kind":"incremental","name":"response_total","namespace":"service","tags":{"host":"10.22.11.222","status":"200"}}}]

```

### Collapse multiple events into a single log

In some cases, multiple logs can be consolidated into a single log. Thus, another way to cut down on log volume is to merge multiple logs into a single log. Use the [reduce transform][9] to reduce multiple logs into one. 

The example below uses a reduce transform configuration to merge multiple Ruby log exceptions events.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: reduce
    inputs:
      - my-source-or-transform-id
    group_by:
      - host
      - pid
      - tid
    merge_strategies:
      message: concat_newline
    starts_when: match(string!(.message), r'^[^\\s]')
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "reduce"
inputs = [ "my-source-or-transform-id" ]
group_by = [ "host", "pid", "tid" ]
starts_when = "match(string!(.message), r'^[^\\s]')"

[transforms.my_transform_id.merge_strategies]
  message = "concat_newline"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "reduce",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "group_by": [
        "host",
        "pid",
        "tid"
      ],
      "merge_strategies": {
        "message": "concat_newline"
      },
      "starts_when": "match(string!(.message), r'^[^\\s]')"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

In the reduce transform, `group_by` is an ordered list of fields used to group events. In this example, the events are grouped by `host`, `pid`, and `tid` fields. 

`merge_strategies` is a map of field names to custom merge strategies. There are different merge strategies, including `array`, where each value is appended to an array, and `sum`, which adds all numeric values. In this example, `concat_newline` is used, where each string value is concatenated, then delimited by a newline.

`starts_when` is a condition used to distinguish the first event of a transaction. If this condition resolves to `true` for an event, the previous transaction is flushed without this event, and a new transaction is started. In this example, events with `.message` that do not match the `^[^\\s]` regular expression condition are reduced into a single event. 

If the following Ruby exception logs are passed through the configuration above:

```
[{"log":{
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0(ZeroDivisionError)",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:6:in `bar'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:2:in `foo'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,"tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

The following logs are generated:

```
[{
"log": {
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0 (ZeroDivisionError)\n
               from foobar.rb:6:in `bar'\n
               from foobar.rb:2:in `foo'\n
               from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

## Use transforms to manage log size

### Removing unnecessary fields to trim down your logs

Logs can contain fields that are unnecessary. When processing terabytes of data a day, dropping fields that are superfluous can significantly reduce the total number of logs your destination ingests and indexes. 

To remove unnecessary fields, use the [DPL/VRL][5] to remap your log data. The following example removes unnecessary tags using `del`. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: remap
    inputs:
      - my-source-or-transform-id
    source: |-
      del(.unecessary_env_field)
      del(.unecessary_service_field)
      del(.unecessary_tag_field)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "remap"
inputs = [ "my-source-or-transform-id" ]
source = """
del(.unecessary_env_field)
del(.unecessary_service_field)
del(.unecessary_tag_field)"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "remap",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "source": "del(.unecessary_env_field)\ndel(.unecessary_service_field)\ndel(.unecessary_tag_field)"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/setup/
[2]: /observability_pipelines/legacy/configurations/
[3]: /observability_pipelines/legacy/reference/transforms/#dedupe
[4]: /observability_pipelines/legacy/reference/transforms/#filter
[5]: /observability_pipelines/legacy/reference/processing_language/
[6]: /logs/explorer/search_syntax/
[7]: /observability_pipelines/legacy/reference/transforms/#sample
[8]: /observability_pipelines/legacy/reference/transforms/#logtometric
[9]: /observability_pipelines/legacy/reference/transforms/#reduce

