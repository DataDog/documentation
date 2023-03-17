---
title: EventStoreDB Metrics
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>default_namespace</td><td>Overrides the default namespace for the metrics emitted by the source.

By default, `eventstoredb` is used.</td></tr><tr><td>endpoint</td><td>Endpoint to scrape stats from.</td></tr><tr><td>proxy</td><td>Proxy configuration.

Configure to proxy traffic through an HTTP(S) proxy when making external requests.

Similar to common proxy configuration convention, users can set different proxies
to use based on the type of traffic being proxied, as well as set specific hosts that
should not be proxied.</td></tr><tr><td>proxy.enabled</td><td>Enables proxying support.</td></tr><tr><td>proxy.http</td><td>Proxy endpoint to use when proxying HTTP traffic.

Must be a valid URI string.</td></tr><tr><td>proxy.https</td><td>Proxy endpoint to use when proxying HTTPS traffic.

Must be a valid URI string.</td></tr><tr><td>proxy.no_proxy</td><td>A list of hosts to avoid proxying.

Multiple patterns are allowed:

| Pattern             | Example match                                                               |
| ------------------- | --------------------------------------------------------------------------- |
| Domain names        | `example.com` matches requests to `example.com`                     |
| Wildcard domains    | `.example.com` matches requests to `example.com` and its subdomains |
| IP addresses        | `127.0.0.1` matches requests to `127.0.0.1`                         |
| [CIDR][cidr] blocks | `192.168.0.0/16` matches requests to any IP addresses in this range     |
| Splat               | `*` matches all hosts                                                   |

[cidr]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing</td></tr><tr><td>scrape_interval_secs</td><td>The interval between scrapes, in seconds.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>http_request_errors_total</td><td>The total number of HTTP request errors for this component.</td></tr><tr><td>parse_errors_total</td><td>The total number of errors parsing metrics for this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `eventstoredb_metrics` source augments events with helpful
context keys.


