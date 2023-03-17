---
title: MongoDB Metrics
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>endpoints</td><td>A list of MongoDB instances to scrape.

Each endpoint must be in the [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/).</td></tr><tr><td>namespace</td><td>Overrides the default namespace for the metrics emitted by the source.

If set to an empty string, no namespace is added to the metrics.

By default, `mongodb` is used.</td></tr><tr><td>scrape_interval_secs</td><td>The interval between scrapes, in seconds.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>collect_completed_total</td><td>The total number of metrics collections completed for this component.</td></tr><tr><td>collect_duration_seconds</td><td>The duration spent collecting of metrics for this component.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>request_errors_total</td><td>The total number of requests errors for this component.</td></tr><tr><td>parse_errors_total</td><td>The total number of errors parsing metrics for this component.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of deserialized bytes from the returned BSON documents</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## MongoDB `serverStatus` command
The [serverStatus](https://docs.mongodb.com/manual/reference/command/serverStatus/) command
returns a document that provides an overview of the database’s
state. The output fields vary depending on the version of
MongoDB, underlying operating system platform, the storage
engine, and the kind of node, including `mongos`, `mongod` or
`replica set` member.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `mongodb_metrics` source augments events with helpful
context keys.


