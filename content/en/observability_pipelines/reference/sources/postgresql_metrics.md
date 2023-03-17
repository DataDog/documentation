---
title: PostgreSQL Metrics
---
[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 30 years
of active development that has earned it a strong reputation for reliability, feature robustness, and
performance.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>endpoints</td><td>A list of PostgreSQL instances to scrape.

Each endpoint must be in the [Connection URI
format](https://www.postgresql.org/docs/current/libpq-connect.html#id-1.7.3.8.3.6).</td></tr><tr><td>exclude_databases</td><td>A list of databases to match (by using [POSIX Regular
Expressions](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-POSIX-REGEXP)) against
the `datname` column for which you don’t want to collect metrics from.

Specifying `""` will include metrics where `datname` is `NULL`.

This can be used in conjunction with `include_databases`.</td></tr><tr><td>include_databases</td><td>A list of databases to match (by using [POSIX Regular
Expressions](https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-POSIX-REGEXP)) against
the `datname` column for which you want to collect metrics from.

If not set, metrics are collected from all databases. Specifying `""` will include metrics where `datname` is
`NULL`.

This can be used in conjunction with `exclude_databases`.</td></tr><tr><td>namespace</td><td>Overrides the default namespace for the metrics emitted by the source.</td></tr><tr><td>scrape_interval_secs</td><td>The interval between scrapes.</td></tr><tr><td>tls</td><td>Configuration of TLS when connecting to PostgreSQL.</td></tr><tr><td>tls.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>collect_completed_total</td><td>The total number of metrics collections completed for this component.</td></tr><tr><td>collect_duration_seconds</td><td>The duration spent collecting of metrics for this component.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>request_errors_total</td><td>The total number of requests errors for this component.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Required Privileges
PostgreSQL Metrics component collects metrics by making queries to the configured PostgreSQL server.
Ensure the configured user is allowed to make the select queries against the following views:

- `pg_stat_database`
- `pg_stat_database_conflicts`
- `pg_stat_bgwriter`

## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `postgresql_metrics` source augments events with helpful
context keys.


