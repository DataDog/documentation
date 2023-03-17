---
title: Lua
---
Transform events with a full embedded [Lua](https://www.lua.org) 5.4 engine.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>hooks</td><td>Lifecycle hooks.

These hooks can be set to perform additional processing during the lifecycle of the transform.</td></tr><tr><td>hooks.init</td><td>The function called when the first event comes in, before `hooks.process` is called.

It can produce new events using the `emit` function.

This can either be inline Lua that defines a closure to use, or the name of the Lua function to call. In both
cases, the closure/function takes a single parameter, `emit`, which is a reference to a function for emitting events.</td></tr><tr><td>hooks.process</td><td>The function called for each incoming event.

It can produce new events using the `emit` function.

This can either be inline Lua that defines a closure to use, or the name of the Lua function to call. In both
cases, the closure/function takes two parameters. The first parameter, `event`, is the event being processed,
while the second parameter, `emit`, is a reference to a function for emitting events.</td></tr><tr><td>hooks.shutdown</td><td>The function called when the transform is stopped.

It can produce new events using the `emit` function.

This can either be inline Lua that defines a closure to use, or the name of the Lua function to call. In both
cases, the closure/function takes a single parameter, `emit`, which is a reference to a function for emitting events.</td></tr><tr><td>metric_tag_values</td><td>When set to `single`, metric tag values will be exposed as single strings, the
same as they were before this config option. Tags with multiple values will show the last assigned value, and null values
will be ignored.

When set to `full`, all metric tags will be exposed as arrays of either string or null
values.</td></tr><tr><td>search_dirs</td><td>A list of directories to search when loading a Lua file via the `require` function.

If not specified, the modules are looked up in the configuration directories.</td></tr><tr><td>source</td><td>The Lua program to initialize the transform with.

The program can be used to to import external dependencies, as well as define the functions
used for the various lifecycle hooks. However, it's not strictly required, as the lifecycle
hooks can be configured directly with inline Lua source for each respective hook.</td></tr><tr><td>timers</td><td>A list of timers which should be configured and executed periodically.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>version</td><td>Transform API version.

Specifying this version ensures that backward compatibility is not broken.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>lua_memory_used_bytes</td><td>The total memory currently being used by the Lua runtime.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
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
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr></tbody></table>

# How It Works
## Event Data Model
The `process` hook takes an `event` as its first argument.
Events are represented as [tables](https://www.lua.org/pil/2.5.html) in Lua
and follow Vector's data model exactly. Please refer to
Vector's [data model reference](/docs/about/under-the-hood/architecture/data-model/) for the event
schema. How Vector's types map to Lua's type are covered below.

## Learning Lua
In order to write non-trivial transforms in Lua, one has to have
basic understanding of Lua. Because Lua is an easy to learn
language, reading a few first chapters of
[the official book](https://www.lua.org/pil/) or consulting
[the manual](https://www.lua.org/manual/5.4/manual.html) would suffice.

## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.

## Search Directories
Vector provides a `search_dirs` option that allows you to specify
absolute paths that will be searched when using the
[Lua `require` function](https://www.lua.org/manual/5.4/manual.html#pdf-require). If this option is not
set, the directories of the configuration files will be used instead.


