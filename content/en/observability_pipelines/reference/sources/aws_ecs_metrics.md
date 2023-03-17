---
title: AWS ECS Metrics
---
Collects the docker container stats for tasks running in AWS ECS or AWS
Fargate.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>endpoint</td><td>Base URI of the task metadata endpoint.

If empty, the URI will be automatically discovered based on the latest version detected.

By default:
- The version 4 endpoint base URI is stored in the environment variable `ECS_CONTAINER_METADATA_URI_V4`.
- The version 3 endpoint base URI is stored in the environment variable `ECS_CONTAINER_METADATA_URI`.
- The version 2 endpoint base URI is `169.254.170.2/v2/`.</td></tr><tr><td>namespace</td><td>The namespace of the metric.

Disabled if empty.</td></tr><tr><td>scrape_interval_secs</td><td>The interval between scrapes, in seconds.</td></tr><tr><td>version</td><td>The version of the task metadata endpoint to use.

If empty, the version is automatically discovered based on environment variables.

By default:
- Version 4 is used if the environment variable `ECS_CONTAINER_METADATA_URI_V4` is defined.
- Version 3 is used if the environment variable `ECS_CONTAINER_METADATA_URI_V4` is not defined, but the
  environment variable `ECS_CONTAINER_METADATA_URI` _is_ defined.
- Version 2 is used if neither of the environment variables `ECS_CONTAINER_METADATA_URI_V4` or
  `ECS_CONTAINER_METADATA_URI` are defined.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>http_error_response_total</td><td>The total number of HTTP error responses for this component.</td></tr><tr><td>http_request_errors_total</td><td>The total number of HTTP request errors for this component.</td></tr><tr><td>parse_errors_total</td><td>The total number of errors parsing metrics for this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>requests_completed_total</td><td>The total number of requests completed by this component.</td></tr><tr><td>request_duration_seconds</td><td>The total request duration in seconds.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `aws_ecs_metrics` source augments events with helpful
context keys.


