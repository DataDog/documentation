---
title: Tag Cardinality Limit
---
Limits the cardinality of tags on metric events, protecting against
accidental high cardinality usage that can commonly disrupt the stability
of metrics storages.

The default behavior is to drop the tag from incoming metrics when the configured
limit would be exceeded. Note that this is usually only useful when applied to
incremental counter metrics and can have unintended effects when applied to other
metric types. The default action to take can be modified with the
`limit_exceeded_action` option.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>cache_size_per_key</td><td>The size of the cache for detecting duplicate tags, in bytes.

The larger the cache size, the less likely it is to have a false positive, or a case where
we allow a new value for tag even after we have reached the configured limits.</td></tr><tr><td>limit_exceeded_action</td><td>Possible actions to take when an event arrives that would exceed the cardinality limit for one
or more of its tags.</td></tr><tr><td>mode</td><td>Controls the approach taken for tracking tag cardinality.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>value_limit</td><td>How many distinct values to accept for any given key.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>tag_value_limit_exceeded_total</td><td>The total number of events discarded because the tag has been rejected after
hitting the configured `value_limit`.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
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
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>value_limit_reached_total</td><td>The total number of times new values for a key have been rejected because the
value limit has been reached.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr></tbody></table>

# How It Works
## Intended Usage
This transform is intended to be used as a protection mechanism to prevent
upstream mistakes. Such as a developer accidentally adding a `request_id`
tag. When this is happens, it is recommended to fix the upstream error as soon
as possible. This is because Vector's cardinality cache is held in memory and it
will be erased when Vector is restarted. This will cause new tag values to pass
through until the cardinality limit is reached again. For normal usage this
should not be a common problem since Vector processes are normally long-lived.

## Failed Parsing
This transform stores in memory a copy of the key for every tag on every metric
event seen by this transform.  In mode `exact`, a copy of every distinct
value *for each key* is also kept in memory, until `value_limit` distinct values
have been seen for a given key, at which point new values for that key will be
rejected.  So to estimate the memory usage of this transform in mode `exact`
you can use the following formula:

```text
(number of distinct field names in the tags for your metrics * average length of
the field names for the tags) + (number of distinct field names in the tags of
your metrics * `value_limit` * average length of the values of tags for your
metrics)
```

In mode `probabilistic`, rather than storing all values seen for each key, each
distinct key has a bloom filter which can probabilistically determine whether
a given value has been seen for that key.  The formula for estimating memory
usage in mode `probabilistic` is:

```text
(number of distinct field names in the tags for your metrics * average length of
the field names for the tags) + (number of distinct field names in the tags of
-your metrics * `cache_size_per_tag`)
```

The `cache_size_per_tag` option controls the size of the bloom filter used
for storing the set of acceptable values for any single key. The larger the
bloom filter the lower the false positive rate, which in our case means the less
likely we are to allow a new tag value that would otherwise violate a
configured limit. If you want to know the exact false positive rate for a given
`cache_size_per_tag` and `value_limit`, there are many free on-line bloom filter
calculators that can answer this. The formula is generally presented in terms of
'n', 'p', 'k', and 'm' where 'n' is the number of items in the filter
(`value_limit` in our case), 'p' is the probability of false positives (what we
want to solve for), 'k' is the number of hash functions used internally, and 'm'
is the number of bits in the bloom filter. You should be able to provide values
for just 'n' and 'm' and get back the value for 'p' with an optimal 'k' selected
for you.   Remember when converting from `value_limit` to the 'm' value to plug
into the calculator that `value_limit` is in bytes, and 'm' is often presented
in bits (1/8 of a byte).

## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.

## Restarts
This transform's cache is held in memory, and therefore, restarting Vector
will reset the cache. This means that new values will be passed through until
the cardinality limit is reached again. See [intended usage](#intended-usage)
for more info.


