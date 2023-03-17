---
title: Remap
---
Is the recommended transform for parsing, shaping, and transforming data in Vector. It implements the
[Vector Remap Language](/docs/reference/vrl) (VRL), an expression-oriented language designed for processing
observability data (logs and metrics) in a safe and performant manner.

Please refer to the [VRL reference](/docs/reference/vrl) when writing VRL scripts.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>drop_on_abort</td><td>Drops any event that is manually aborted during processing.

Normally, if a VRL program is manually aborted (via [`abort`][vrl_docs_abort]) when
processing an event, the original, unmodified event will be sent downstream. In some cases,
you may not wish to send the event any further, such as if certain transformation or
enrichment is strictly required. Setting `drop_on_abort` to `true` allows you to ensure
these events do not get processed any further.

Additionally, dropped events can potentially be diverted to a specially-named output for
further logging and analysis by setting `reroute_dropped`.

[vrl_docs_abort]: https://vector.dev/docs/reference/vrl/expressions/#abort</td></tr><tr><td>drop_on_error</td><td>Drops any event that encounters an error during processing.

Normally, if a VRL program encounters an error when processing an event, the original,
unmodified event will be sent downstream. In some cases, you may not wish to send the event
any further, such as if certain transformation or enrichment is strictly required. Setting
`drop_on_error` to `true` allows you to ensure these events do not get processed any
further.

Additionally, dropped events can potentially be diverted to a specially named output for
further logging and analysis by setting `reroute_dropped`.</td></tr><tr><td>file</td><td>File path to the [Vector Remap Language][vrl] (VRL) program to execute for each event.

If a relative path is provided, its root is the current working directory.

Required if `source` is missing.

[vrl]: https://vector.dev/docs/reference/vrl</td></tr><tr><td>metric_tag_values</td><td>When set to `single`, metric tag values will be exposed as single strings, the
same as they were before this config option. Tags with multiple values will show the last assigned value, and null values
will be ignored.

When set to `full`, all metric tags will be exposed as arrays of either string or null
values.</td></tr><tr><td>reroute_dropped</td><td>Reroutes dropped events to a named output instead of halting processing on them.

When using `drop_on_error` or `drop_on_abort`, events that are "dropped" are processed no
further. In some cases, it may be desirable to keep the events around for further analysis,
debugging, or retrying.

In these cases, `reroute_dropped` can be set to `true` which will forward the original event
to a specially-named output, `dropped`. The original event will be annotated with additional
fields describing why the event was dropped.</td></tr><tr><td>source</td><td>The [Vector Remap Language][vrl] (VRL) program to execute for each event.

Required if `file` is missing.

[vrl]: https://vector.dev/docs/reference/vrl</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>timezone</td><td>The name of the timezone to apply to timestamp conversions that do not contain an explicit
time zone.

This overrides the [global `timezone`][global_timezone] option. The time zone name may be
any name in the [TZ database][tz_database], or `local` to indicate system local time.

[global_timezone]: https://vector.dev/docs/reference/configuration//global-options#timezone
[tz_database]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr></tbody></table>

# How It Works
## Vector Remap Language
The Vector Remap Language (VRL) is a restrictive, fast, and safe language we
designed specifically for mapping observability data. It avoids the need to
chain together many fundamental Vector transforms to accomplish rudimentary
reshaping of data.

The intent is to offer the same robustness of full language runtime (ex: Lua)
without paying the performance or safety penalty.

Learn more about Vector's Remap Language in the
[Vector Remap Language reference](/docs/reference/vrl).

## Event Data Model
You can use the `remap` transform to handle both log and metric events.

Log events in the `remap` transform correspond directly to Vector's [log schema](/docs/about/under-the-hood/architecture/data-model/log),
which means that the transform has access to the whole event and no restrictions on how the event can be
modified.

With [metric events](/docs/about/under-the-hood/architecture/data-model/metric), VRL is much more restrictive. Below is a field-by-field
breakdown of VRL's access to metrics:

Field | Access | Specific restrictions (if any)
:-----|:-------|:------------------------------
`type` | Read only |
`kind` | Read/write | You can set `kind` to either `incremental` or `absolute` but not to an arbitrary value.
`name` | Read/write |
`timestamp` | Read/write/delete | You assign only a valid [VRL timestamp](/docs/reference/vrl/expressions//#timestamp) value, not a [VRL string](/docs/reference/vrl/expressions//#string).
`namespace` | Read/write/delete |
`tags` | Read/write/delete | The `tags` field must be a [VRL object](/docs/reference/vrl/expressions//#object) in which all keys and values are strings.

It's important to note that if you try to perform a disallowed action, such as deleting the `type`
field using `del(.type)`, Vector doesn't abort the VRL program or throw an error. Instead, it ignores
the disallowed action.

## Lazy Event Mutation
When you make changes to an event through VRL's path assignment syntax, the change
isn't immediately applied to the actual event. If the program fails to run to
completion, any changes made until that point are dropped and the event is kept in
its original state.

If you want to make sure your event is changed as expected, you have to rewrite
your program to never fail at runtime (the compiler can help you with this).

Alternatively, if you want to ignore/drop events that caused the program to fail,
you can set the `drop_on_error` configuration value to `true`.

Learn more about runtime errors in the [Vector Remap Language
reference](/docs/reference/vrl/errors/#runtime-errors).

## State
This component is stateless, meaning its behavior is consistent across each input.

## Emitting multiple log events
Multiple log events can be emitted from remap by assigning an array to the root path
`.`. One log event is emitted for each input element of the array.

If any of the array elements isn't an object, a log event is created that uses the
element's value as the `message` key. For example, `123` is emitted as:

```json
{
  "message": 123
}
```


