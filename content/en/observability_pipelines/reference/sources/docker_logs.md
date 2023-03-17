---
title: Docker
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>auto_partial_merge</td><td>Enables automatic merging of partial events.</td></tr><tr><td>docker_host</td><td>Docker host to connect to.

Use an HTTPS URL to enable TLS encryption.

If absent, the `DOCKER_HOST` environment variable is used. If `DOCKER_HOST` is also absent,
the default Docker local socket (`/var/run/docker.sock` on Unix platforms,
`//./pipe/docker_engine` on Windows) is used.</td></tr><tr><td>exclude_containers</td><td>A list of container IDs or names of containers to exclude from log collection.

Matching is prefix first, so specifying a value of `foo` would match any container named `foo` as well as any
container whose name started with `foo`. This applies equally whether matching container IDs or names.

By default, the source will collect logs for all containers. If `exclude_containers` is configured, any
container that matches a configured exclusion will be excluded even if it is also included via
`include_containers`, so care should be taken when utilizing prefix matches as they cannot be overridden by a
corresponding entry in `include_containers` e.g. excluding `foo` by attempting to include `foo-specific-id`.

This can be used in conjunction with `include_containers`.</td></tr><tr><td>host_key</td><td>Overrides the name of the log field used to add the current hostname to each event.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>include_containers</td><td>A list of container IDs or names of containers to include in log collection.

Matching is prefix first, so specifying a value of `foo` would match any container named `foo` as well as any
container whose name started with `foo`. This applies equally whether matching container IDs or names.

By default, the source will collect logs for all containers. If `include_containers` is configured, only
containers that match a configured inclusion and are also not excluded will be matched.

This can be used in conjunction with `exclude_containers`.</td></tr><tr><td>include_images</td><td>A list of image names to match against.

If not provided, all images will be included.</td></tr><tr><td>include_labels</td><td>A list of container object labels to match against when filtering running containers.

Labels should follow the syntax described in the [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) documentation.</td></tr><tr><td>multiline</td><td>Multiline aggregation configuration.

If not specified, multiline aggregation is disabled.</td></tr><tr><td>multiline.condition_pattern</td><td>Regular expression pattern that is used to determine whether or not more lines should be read.

This setting must be configured in conjunction with `mode`.</td></tr><tr><td>multiline.mode</td><td>Aggregation mode.

This setting must be configured in conjunction with `condition_pattern`.</td></tr><tr><td>multiline.start_pattern</td><td>Regular expression pattern that is used to match the start of a new message.</td></tr><tr><td>multiline.timeout_ms</td><td>The maximum amount of time to wait for the next additional line, in milliseconds.

Once this timeout is reached, the buffered message is guaranteed to be flushed, even if incomplete.</td></tr><tr><td>partial_event_marker_field</td><td>Overrides the name of the log field used to mark an event as partial.

If `auto_partial_merge` is disabled, partial events will be emitted with a log field, controlled by this
configuration value, is set, indicating that the event is not complete.</td></tr><tr><td>retry_backoff_secs</td><td>The amount of time to wait before retrying after an error.</td></tr><tr><td>tls</td><td>Configuration of TLS when connecting to the Docker daemon.

Only relevant when connecting to Docker via an HTTPS URL.

If not configured, the environment variable `DOCKER_CERT_PATH` is used. If `DOCKER_CERT_PATH` is absent, then` DOCKER_CONFIG` is used. If both environment variables are absent, the certificates in `~/.docker/` are read.</td></tr><tr><td>tls.ca_file</td><td>Path to the CA certificate file.</td></tr><tr><td>tls.crt_file</td><td>Path to the TLS certificate file.</td></tr><tr><td>tls.key_file</td><td>Path to the TLS key file.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>communication_errors_total</td><td>The total number of errors stemming from communication with the Docker daemon.</td></tr><tr><td>container_metadata_fetch_errors_total</td><td>The total number of errors encountered when fetching container metadata.</td></tr><tr><td>container_processed_events_total</td><td>The total number of container events processed.</td></tr><tr><td>containers_unwatched_total</td><td>The total number of times Vector stopped watching for container logs.</td></tr><tr><td>containers_watched_total</td><td>The total number of times Vector started watching for container logs.</td></tr><tr><td>logging_driver_errors_total</td><td>The total number of logging driver errors encountered caused by not using either
the `jsonfile` or `journald` driver.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Merging Split Messages
Docker, by default, splits log messages that exceed 16kb. This can be a
rather frustrating problem because it produces malformed log messages that are
difficult to work with. Vector's solves this by default, automatically merging
these messages into a single message. You can turn this off via the
`auto_partial_merge` option. Furthermore, you can adjust the marker
that we use to determine if an event is partial via the
`partial_event_marker_field` option.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `docker_logs` source augments events with helpful
context keys.


