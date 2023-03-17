---
title: Journald
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>batch_size</td><td>The systemd journal is read in batches, and a checkpoint is set at the end of each batch.

This option limits the size of the batch.</td></tr><tr><td>current_boot_only</td><td>Only include entries that occurred after the current boot of the system.</td></tr><tr><td>data_dir</td><td>The directory used to persist file checkpoint positions.

By default, the global `data_dir` option is used. Make sure the running user has write
permissions to this directory.</td></tr><tr><td>exclude_matches</td><td>A list of sets of field/value pairs that, if any are present in a journal entry, will cause
the entry to be excluded from this source.

If `exclude_units` is specified, it will be merged into this list.</td></tr><tr><td>exclude_matches.*</td><td>The set of field values to match in journal entries that are to be excluded.</td></tr><tr><td>exclude_units</td><td>A list of unit names to exclude from monitoring.

Unit names lacking a `.` will have `.service` appended to make them a valid service unit
name.</td></tr><tr><td>include_matches</td><td>A list of sets of field/value pairs to monitor.

If empty or not present, all journal fields are accepted.

If `include_units` is specified, it will be merged into this list.</td></tr><tr><td>include_matches.*</td><td>The set of field values to match in journal entries that are to be included.</td></tr><tr><td>include_units</td><td>A list of unit names to monitor.

If empty or not present, all units are accepted.

Unit names lacking a `.` will have `.service` appended to make them a valid service unit name.</td></tr><tr><td>journal_directory</td><td>The full path of the journal directory.

If not set, `journalctl` will use the default system journal path.</td></tr><tr><td>journalctl_path</td><td>The full path of the `journalctl` executable.

If not set, a search is done for the `journalctl` path.</td></tr><tr><td>remap_priority</td><td>Enables remapping the `PRIORITY` field from an integer to string value.

Has no effect unless the value of the field is already an integer.</td></tr><tr><td>since_now</td><td>Only include entries that appended to the journal after the entries have been read.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>invalid_record_total</td><td>The total number of invalid records that have been discarded.</td></tr><tr><td>invalid_record_bytes_total</td><td>The total number of bytes from invalid records that have been discarded.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Communication Strategy
To ensure the `journald` source works across all platforms, Vector interacts
with the systemd journal via the `journalctl` command. This is accomplished by
spawning a [subprocess](https://docs.rs/subprocess) that Vector interacts
with. If the `journalctl` command is not in the environment path you can
specify the exact location via the `journalctl_path` option. For more
information on this communication strategy please see
[issue #1473](https://github.com/vectordotdev/vector/issues/1473).

## State
This component is stateless, meaning its behavior is consistent across each input.

## Checkpointing
Vector checkpoints the current read position after each
successful read. This ensures that Vector resumes where it left
off if restarted, preventing data from being read twice. The
checkpoint positions are stored in the data directory which is
specified via the global `data_dir` option, but can be overridden
via the `data_dir` option in the file source directly.

## Non-ASCII Messages
When `journald` has stored a message that is not strict ASCII,
`journalctl` will output it in an alternate format to prevent data
loss. Vector handles this alternate format by translating such messages
into UTF-8 in "lossy" mode, where characters that are not valid UTF-8
are replaced with the Unicode replacement character, `�`.

## Context
By default, the `journald` source augments events with helpful
context keys.


