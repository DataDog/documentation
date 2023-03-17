---
title: File
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>data_dir</td><td>The directory used to persist file checkpoint positions.

By default, the [global `data_dir` option][global_data_dir] is used. Make sure the running user has write
permissions to this directory.

[global_data_dir]: https://vector.dev/docs/reference/configuration/global-options/#data_dir</td></tr><tr><td>encoding</td><td>Character set encoding.</td></tr><tr><td>encoding.charset</td><td>Encoding of the source messages.

Takes one of the encoding [label strings](https://encoding.spec.whatwg.org/#concept-encoding-get) defined as
part of the [Encoding Standard](https://encoding.spec.whatwg.org/).

When set, the messages are transcoded from the specified encoding to UTF-8, which is the encoding that is
assumed internally for string-like data. Enable this transcoding operation if you need your data to
be in UTF-8 for further processing. At the time of transcoding, any malformed sequences (that can't be mapped to
UTF-8) is replaced with the Unicode [REPLACEMENT
CHARACTER](https://en.wikipedia.org/wiki/Specials_(Unicode_block)#Replacement_character) and warnings are
logged.</td></tr><tr><td>exclude</td><td>Array of file patterns to exclude. [Globbing](https://vector.dev/docs/reference/configuration/sources/file/#globbing) is supported.

Takes precedence over the `include` option. Note: The `exclude` patterns are applied _after_ the attempt to glob everything
in `include`. This means that all files are first matched by `include` and then filtered by the `exclude`
patterns. This can be impactful if `include` contains directories with contents that are not accessible.</td></tr><tr><td>file_key</td><td>Overrides the name of the log field used to add the file path to each event.

The value will be the full path to the file where the event was read message.

Set to `""` to suppress this key.</td></tr><tr><td>fingerprint</td><td>Configuration for how files should be identified.

This is important for `checkpointing` when file rotation is used.</td></tr><tr><td>fingerprint.ignored_header_bytes</td><td>The number of bytes to skip ahead (or ignore) when reading the data used for generating the checksum.

This can be helpful if all files share a common header that should be skipped.</td></tr><tr><td>fingerprint.lines</td><td>The number of lines to read for generating the checksum.

If your files share a common header that is not always a fixed size,

If the file has less than this amount of lines, it won’t be read at all.</td></tr><tr><td>fingerprint.strategy</td><td>The strategy used to uniquely identify files.

This is important for checkpointing when file rotation is used.</td></tr><tr><td>glob_minimum_cooldown_ms</td><td>Delay between file discovery calls.

This controls the interval at which files are searched. A higher value results in greater
chances of some short-lived files being missed between searches, but a lower value increases
the performance impact of file discovery.</td></tr><tr><td>host_key</td><td>Overrides the name of the log field used to add the current hostname to each event.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

Set to `""` to suppress this key.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>ignore_checkpoints</td><td>Whether or not to ignore existing checkpoints when determining where to start reading a file.

Checkpoints are still written normally.</td></tr><tr><td>ignore_not_found</td><td>Ignore missing files when fingerprinting.

This may be useful when used with source directories containing dangling symlinks.</td></tr><tr><td>ignore_older_secs</td><td>Ignore files with a data modification date older than the specified number of seconds.</td></tr><tr><td>include</td><td>Array of file patterns to include. [Globbing](https://vector.dev/docs/reference/configuration/sources/file/#globbing) is supported.</td></tr><tr><td>line_delimiter</td><td>String sequence used to separate one file line from another.</td></tr><tr><td>max_line_bytes</td><td>The maximum size of a line before it will be discarded.

This protects against malformed lines or tailing incorrect files.</td></tr><tr><td>max_read_bytes</td><td>An approximate limit on the amount of data read from a single file at a given time.</td></tr><tr><td>multiline</td><td>Multiline aggregation configuration.

If not specified, multiline aggregation is disabled.</td></tr><tr><td>multiline.condition_pattern</td><td>Regular expression pattern that is used to determine whether or not more lines should be read.

This setting must be configured in conjunction with `mode`.</td></tr><tr><td>multiline.mode</td><td>Aggregation mode.

This setting must be configured in conjunction with `condition_pattern`.</td></tr><tr><td>multiline.start_pattern</td><td>Regular expression pattern that is used to match the start of a new message.</td></tr><tr><td>multiline.timeout_ms</td><td>The maximum amount of time to wait for the next additional line, in milliseconds.

Once this timeout is reached, the buffered message is guaranteed to be flushed, even if incomplete.</td></tr><tr><td>offset_key</td><td>Enables adding the file offset to each event and sets the name of the log field used.

The value will be the byte offset of the start of the line within the file.

Off by default, the offset is only added to the event if this is set.</td></tr><tr><td>oldest_first</td><td>Instead of balancing read capacity fairly across all watched files, prioritize draining the oldest files before moving on to read data from younger files.</td></tr><tr><td>read_from</td><td>File position to use when reading a new file.</td></tr><tr><td>remove_after_secs</td><td>Timeout from reaching `EOF` after which file will be removed from filesystem, unless new data is written in the meantime.

If not specified, files will not be removed.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>checkpoint_write_errors_total</td><td>The total number of errors writing checkpoints. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>checkpoints_total</td><td>The total number of files checkpointed.</td></tr><tr><td>checksum_errors_total</td><td>The total number of errors identifying files via checksum.</td></tr><tr><td>file_delete_errors_total</td><td>The total number of failures to delete a file. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>file_watch_errors_total</td><td>The total number of errors encountered when watching files. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>files_added_total</td><td>The total number of files Vector has found to watch.</td></tr><tr><td>files_deleted_total</td><td>The total number of files deleted.</td></tr><tr><td>files_resumed_total</td><td>The total number of times Vector has resumed watching a file.</td></tr><tr><td>files_unwatched_total</td><td>The total number of times Vector has stopped watching a file.</td></tr><tr><td>fingerprint_read_errors_total</td><td>The total number of times Vector failed to read a file for fingerprinting. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>glob_errors_total</td><td>The total number of errors encountered when globbing paths. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Autodiscovery
Vector will continually look for new files matching any of your
include patterns. The frequency is controlled via the
`glob_minimum_cooldown` option. If a new file is added that matches
any of the supplied patterns, Vector will begin tailing it. Vector
maintains a unique list of files and will not tail a file more than
once, even if it matches multiple patterns. You can read more about
how we identify files in the Identification section.

## Compressed Files
Vector will transparently detect files which have been compressed
using Gzip and decompress them for reading. This detection process
looks for the unique sequence of bytes in the Gzip header and does
not rely on the compressed files adhering to any kind of naming
convention.

One caveat with reading compressed files is that Vector is not able
to efficiently seek into them. Rather than implement a
potentially-expensive full scan as a seek mechanism, Vector
currently will not attempt to make further reads from a file for
which it has already stored a checkpoint in a previous run. For
this reason, users should take care to allow Vector to fully
process any compressed files before shutting the process down or moving the
files to another location on disk.

## File Deletion
When a watched file is deleted, Vector will maintain its open file
handle and continue reading until it reaches `EOF`. When a file is
no longer findable in the `includes` option and the reader has
reached `EOF`, that file's reader is discarded.

## File Read Order
By default, Vector attempts to allocate its read bandwidth fairly
across all of the files it's currently watching. This prevents a
single very busy file from starving other independent files from
being read. In certain situations, however, this can lead to
interleaved reads from files that should be read one after the
other.

For example, consider a service that logs to timestamped file,
creating a new one at an interval and leaving the old one as-is.
Under normal operation, Vector would follow writes as they happen to
each file and there would be no interleaving. In an overload
situation, however, Vector may pick up and begin tailing newer files
before catching up to the latest writes from older files. This would
cause writes from a single logical log stream to be interleaved in
time and potentially slow down ingestion as a whole, since the fixed
total read bandwidth is allocated across an increasing number of
files.

To address this type of situation, Vector provides the
`oldest_first` option. When set, Vector will not read from any file
younger than the oldest file that it hasn't yet caught up to. In
other words, Vector will continue reading from older files as long
as there is more data to read. Only once it hits the end will it
then move on to read from younger files.

Whether or not to use the oldest_first flag depends on the
organization of the logs you're configuring Vector to tail. If your
`include` option contains multiple independent logical log streams
(e.g. Nginx's access.log and error.log, or logs from multiple
services), you are likely better off with the default behavior. If
you're dealing with a single logical log stream or if you value
per-stream ordering over fairness across streams, consider setting
the `oldest_first` option to true.

## File Rotation
Vector supports tailing across a number of file rotation strategies.
The default behavior of `logrotate` is simply to move the old log
file and create a new one. This requires no special configuration of
Vector, as it will maintain its open file handle to the rotated log
until it has finished reading and it will find the newly created
file normally.

A popular alternative strategy is `copytruncate`, in which
`logrotate` will copy the old log file to a new location before
truncating the original. Vector will also handle this well out of
the box, but there are a couple configuration options that will help
reduce the very small chance of missed data in some edge cases. We
recommend a combination of `delaycompress` (if applicable) on the
`logrotate` side and including the first rotated file in Vector's
`include` option. This allows Vector to find the file after rotation,
read it uncompressed to identify it, and then ensure it has all of
the data, including any written in a gap between Vector's last read
and the actual rotation event.

## Fingerprinting
By default, Vector identifies files by running a [cyclic redundancy
check](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) (CRC) on the first N lines of the file. This serves as a
*fingerprint* that uniquely identifies the file. The number of lines, N, that are
read can be set using the [`fingerprint.lines`](#fingerprint.lines) and
[`fingerprint.ignored_header_bytes`](#fingerprint.ignored_header_bytes) options.

This strategy avoids the common pitfalls associated with using device and inode
names since inode names can be reused across files. This enables Vector to properly
tail files across various rotation strategies.

## Globbing
[Globbing](https://en.wikipedia.org/wiki/Glob_(programming)) is supported in all provided file paths,
files will be autodiscovered continually at a rate defined by the
`glob_minimum_cooldown` option.

## Line Delimiters
Each line is read until a new line delimiter (by default, `
` i.e.
the `0xA` byte) or `EOF` is found. If needed, the default line
delimiter can be overridden via the `line_delimiter` option.

## Multiline Messages
Sometimes a single log event will appear as multiple log lines. To
handle this, Vector provides a set of `multiline` options. These
options were carefully thought through and will allow you to solve the
simplest and most complex cases. Let's look at a few examples:

## File permissions
To be able to source events from the files, Vector must be able
to read the files and execute their parent directories.

If you have deployed Vector as using one our distributed
packages, then you will find Vector running as the `vector`
user. You should ensure this user has read access to the desired
files used as `include`. Strategies for this include:

* Create a new unix group, make it the group owner of the
  target files, with read access, and  add `vector` to that
  group
* Use [POSIX ACLs](https://www.usenix.org/legacy/publications/library/proceedings/usenix03/tech/freenix03/full_papers/gruenbacher/gruenbacher_html/main.html) to grant access to the
  files to the `vector` user
* Grant the `CAP_DAC_READ_SEARCH` [Linux
  capability](https://man7.org/linux/man-pages/man7/capabilities.7.html). This capability
  bypasses the file system permissions checks to allow
  Vector to read any file. This is not recommended as it gives
  Vector more permissions than it requires, but it is
  recommended over running Vector as `root` which would grant it
  even broader permissions. This can be granted via SystemD by
  creating an override file using `systemctl edit vector` and
  adding:

  ```
  AmbientCapabilities=CAP_DAC_READ_SEARCH
  CapabilityBoundingSet=CAP_DAC_READ_SEARCH
  ```

On Debian-based distributions, the `vector` user is
automatically added to the [`adm`
group](https://wiki.debian.org/SystemGroups), if it exists, which has
permissions to read `/var/log`.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Checkpointing
Vector checkpoints the current read position after each
successful read. This ensures that Vector resumes where it left
off if restarted, preventing data from being read twice. The
checkpoint positions are stored in the data directory which is
specified via the global `data_dir` option, but can be overridden
via the `data_dir` option in the file source directly.

## Read Position
By default, Vector will read from the beginning of newly discovered
files. You can change this behavior by setting the `read_from` option to
`"end"`.

Previously discovered files will be [checkpointed](#checkpointing), and
the read position will resume from the last checkpoint. To disable this
behavior, you can set the `ignore_checkpoints` option to `true`.  This
will cause Vector to disregard existing checkpoints when determining the
starting read position of a file.

## Context
By default, the `file` source augments events with helpful
context keys.


