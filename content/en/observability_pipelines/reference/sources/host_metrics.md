---
title: Host Metrics
---
Examines system data sources on the local system and generates metrics
describing utilization of various system resources, such as CPU, memory,
disk, and network utilization.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>cgroups</td><td>Options for the “cgroups” (controller groups) metrics collector.

This collector is only available on Linux systems, and only supports either version 2 or hybrid cgroups.</td></tr><tr><td>cgroups.base</td><td>The base cgroup name to provide metrics for.</td></tr><tr><td>cgroups.groups</td><td>Lists of cgroup name patterns to include or exclude in gathering
usage metrics.</td></tr><tr><td>cgroups.groups.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>cgroups.groups.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>cgroups.levels</td><td>The number of levels of the cgroups hierarchy for which to report metrics.

A value of `1` means just the root or named cgroup.</td></tr><tr><td>collectors</td><td>The list of host metric collector services to use.

Defaults to all collectors.</td></tr><tr><td>disk</td><td>Options for the “disk” metrics collector.</td></tr><tr><td>disk.devices</td><td>Lists of device name patterns to include or exclude in gathering
I/O utilization metrics.</td></tr><tr><td>disk.devices.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>disk.devices.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>filesystem</td><td>Options for the “filesystem” metrics collector.</td></tr><tr><td>filesystem.devices</td><td>Lists of device name patterns to include or exclude in gathering
usage metrics.</td></tr><tr><td>filesystem.devices.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>filesystem.devices.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>filesystem.filesystems</td><td>Lists of filesystem name patterns to include or exclude in gathering
usage metrics.</td></tr><tr><td>filesystem.filesystems.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>filesystem.filesystems.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>filesystem.mountpoints</td><td>Lists of mount point path patterns to include or exclude in gathering
usage metrics.</td></tr><tr><td>filesystem.mountpoints.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>filesystem.mountpoints.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>namespace</td><td>Overrides the default namespace for the metrics emitted by the source.</td></tr><tr><td>network</td><td>Options for the “network” metrics collector.</td></tr><tr><td>network.devices</td><td>Lists of device name patterns to include or exclude in gathering
network utilization metrics.</td></tr><tr><td>network.devices.excludes</td><td>Any patterns which should be excluded.

The patterns are matched using globbing.</td></tr><tr><td>network.devices.includes</td><td>Any patterns which should be included.

The patterns are matched using globbing.</td></tr><tr><td>scrape_interval_secs</td><td>The interval between metric gathering, in seconds.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `host_metrics` source augments events with helpful
context keys.


