---
title: Upgrade the Worker Guide
description: Learn about new features, enhancements, and fixes for Worker versions 2.7 to 2.17.
disable_toc: false
aliases:
    - /observability_pipelines/guide/upgrade_worker_2_7/
---

## Overview

<div class="alert alert-info">
Datadog recommends updating the Observability Pipelines Worker (OPW) with every minor and patch release, or monthly at a minimum. <br><br> Upgrading to the latest major OPW version and keeping it updated is the only supported way to get new OPW functionalities, fixes, and security updates.
</div>

This guide goes over how to upgrade to a specific Worker version and the updates for that version.

## Worker version 2.17.0

To upgrade to Worker version 2.17.0:

- Docker: Run the `docker pull` command for the [2.17.0 image][46].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.17.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.17.0`.

<div class="alert alert-warning"><strong>Breaking change:</strong> The Generate Metrics processor now emits the raw field name as the tag key for <code>group_by</code> entries that contain characters outside of <code>[a-zA-Z0-9_@]</code>, such as <code>http.status_code</code> and <code>kube-cronjob</code>. Previously, the processor added a trailing underscore (<code>_</code>) to tag keys that contained those characters. For example, the tag key <code>http.status_code</code> became <code>http.status_code_</code> because the key contained a period (<code>.</code>).<br><br>After upgrading to Worker 2.17, update any dashboards, monitors, alerts, or notebooks that use tag keys with the trailing underscore to use those tag keys without the underscore. Historical datapoints remain queryable under the old tag key. Pipelines whose <code>group_by</code> entries only use names matching <code>[a-zA-Z0-9_@]+</code> are not affected.</div>

Worker version 2.17.0 gives you access to the following:

#### New features

- For the Custom Processor:
    - VRL string literals now support `\u{HEX}` Unicode escape sequences. Any valid Unicode scalar value can be expressed, such as `"hello\u{1F30E}world"`. Invalid sequences, such as empty braces, non-hex digits, surrogate codepoints, or values above U+10FFFF, are reported as compile-time errors.
    - The `parse_regex` function now accepts dynamic regex patterns (variables and runtime expressions), consistent with `parse_regex_all`. When the pattern is a literal, return type information remains precise based on named capture groups.

#### Enhancements

- The Generate Metrics processor's performance has been improved to reduce CPU overhead when using `group_by` tag labels.
- For the Custom Processor, the performance of `parse_regex_all` has been improved by reusing the compiled regex across invocations.
- The Splunk HEC source now supports the `enabled` field on `valid_tokens` entries. Disabled tokens are excluded from authentication and enrichment.

#### Fixes

- HTTP metrics emitted by the Quota processor's background sync now have correct component tags (`component_kind:transform`, `component_type:quota`, `component_id:quota_global_state`).
- The Enrichment Table processor using Reference Tables now skips sending empty event batches, preventing fatal errors with disk buffers.
- The Generate Metrics processor now uses a static component ID so that associated metrics share the same `component_id` across Workers and restarts.
- An issue with parsing filter queries that contain whitespace inside parentheses, such as `service:( web OR api )`, has been fixed.
- Live Capture now works correctly for sources with multiple named output ports, such as the OpenTelemetry source.
- An issue where a Worker crash could occur if a source or a processor sends an empty event batch to the next component has been fixed.
- For the Custom Processor:
    - Error messages and unused variable diagnostics have been fixed. The processor now reports every unhandled error in a single compilation.
    - You can now use `SCREAMING_SNAKE` case in functions such as `pascalcase` and `camelcase`.
    - The `encode_proto` and `parse_proto` functions now support proto maps whose keys are integers or Booleans, not only strings.

---

## Worker version 2.16.1

To upgrade to Worker version 2.16.1:

- Docker: Run the `docker pull` command for the [2.16.1 image][45].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.16.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.16.1`.

Worker version 2.16.1 gives you access to the following:

#### Fixes

- The Worker no longer fails when fetching configurations in non-US1 data centers.

---

## Worker version 2.16.0

To upgrade to Worker version 2.16.0:

- Docker: Run the `docker pull` command for the [2.16.0 image][44].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.16.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.16.0`.

Worker version 2.16.0 gives you access to the following:

#### New features

- [Databricks Zerobus][47] destination: Send log data to Databricks Unity Catalog tables using the Zerobus ingestion service. The Databricks destination supports OAuth 2.0 authentication, automatic schema fetching from Unity Catalog, and protobuf batch encoding.
- The Splunk HEC source now accepts an optional `valid_tokens` list for token-based authentication managed using environment variables or a configured secrets backend.
- The Splunk HEC source now supports enriching incoming log events using the VRL decoder.
- The Amazon S3 destination now supports Apache Parquet batch encoding with flexible schema definitions and configurable compression (Snappy, ZSTD, GZIP, LZ4, or none).
- For the Custom Processor:
    - The `encode_proto` function now accepts an `allow_lossy_string_coercion` argument.
    - Protobuf encoding now coerces compatible scalar types into the target field type: integers and strings are accepted for `bool` fields, and integers are accepted for `float` or `double` fields.

#### Enhancements

- mTLS support has been added to the following sources: Fluent, Logstash, OpenTelemetry (logs and metrics), Splunk HEC, Splunk TCP, HTTP/S Server, Socket, and Syslog.
- Live Capture events now include the UUID of the Worker that sent the event.
- The Reference Tables processor's buffer now emits `buffer_size_events` and `buffer_size_bytes` gauge metrics to replace the deprecated `buffer_events` and `buffer_byte_size` metrics. The deprecated metrics are still being sent for backward compatibility.
- The Datadog Logs destination now supports overrides for per-site logs endpoint using the bootstrap `logs-sites` field or `DD_OP_LOGS_<SITE>` environment variable, such as `DD_OP_LOGS_US1`. Environment variables take precedence over the bootstrap file.
- Sources now record these distribution metrics:
    - `source_send_latency_seconds`: The time it takes for the source to send a chunk of events to the next component.
    - `source_send_batch_latency_seconds`: The time it takes for the source to send a batch, which can contain multiple event chunks, to the next component.

#### Fixes

- A race condition in the Reference Tables processor has been fixed to prevent dropping buffered events during a Worker shutdown.
- Live Capture was updated to improve handling of bursty traffic and metrics from the Generate Metrics processor.
- The Worker no longer logs `Root metadata expired` or `potential freeze attack` on startup after refreshing embedded Remote Config trusted-root metadata.
- The Splunk HEC source now emits `authentication_failed` as the `error_type` in error logs and metrics when authentication fails due to a missing or invalid authorization header.
- Fixed the Datadog Logs destination health check endpoint computation to preserve site prefixes, such as `us3.`, `us5.`, `ap1.`, when deriving the API URL from intake endpoints.
- An issue where a destination with a configured disk buffer would stall for `batch.timeout_sec` before gracefully reloading has been fixed. This fix also resolves cases where the Worker ignored SIGINT during a pipeline stall.
- Fixed the Custom Processor so an `else` or `else if` keyword can be on a new line after the closing curly brace (`}`) of an `if`-block.

---

## Worker version 2.15.1

To upgrade to Worker version 2.15.1:

- Docker: Run the `docker pull` command for the [2.15.1 image][43].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.15.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.15.1`.

Worker version 2.15.1 gives you access to the following:

#### New features

- The Custom Processor now supports the `to_entries` and `from_entries` functions for converting between objects and arrays of key-value pairs (jq-style).

#### Enhancements

- The Datadog Metrics destination now uses zstd compression for Datadog API v2 and sketches endpoints, reducing CPU, memory, and bandwidth usage.
- The `flatten` function in the Custom Processor now accepts an optional `except` argument to exclude specific keys from flattening.

#### Fixes

- A performance regression in buffer metrics tracking has been fixed.
- The Datadog Agent source has been fixed to preserve the `device` tag from Datadog API v2 resources.

---

## Worker version 2.15.0

To upgrade to Worker version 2.15.0:

- Docker: Run the `docker pull` command for the [2.15.0 image][40].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.15.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.15.0`.

Worker version 2.15.0 gives you access to the following:

#### New features

- New OCSF mappings have been added for the following log types:
    - AWS GuardDuty for all finding types (for example, EKS Audit, EC2, Lambda, IAM, DNS) in a single mapping named `AWS GuardDuty`.
    - Infoblox NIOS: DNS Activity, DHCP Activity, audit (Authentication and API Activity), and port and syslog Base Event (Infoblox DNS Query, Infoblox DHCP, Infoblox Audit Authentication, Infoblox Audit API, Infoblox Port).
    - Zscaler ZPA App Connector Status logs to OCSF schema version 1.3.0 (Authentication, class 3002) with `datetime` and `host` profiles.
    - Zscaler ZPA User Activity logs to OCSF schema version 1.3.0 (Network Activity, class 4001) with `datetime`, `host`, `network_proxy`, and `security_control` profiles.
    - AWS WAF Web ACL logs. Transforms WAF log events into OCSF HTTP Activity (class 4002) with `cloud` and `security_control` profiles.
    - Zscaler ZPA User Status logs to OCSF schema version 1.3.0 (Authentication, class 3002) with `datetime` and `host` profiles.
- The OpenTelemetry source now supports metrics pipelines.
- The Elasticsearch destination is now available for metrics pipelines.
- The `parse_yaml` function is now available for the Custom Processor. This function parses YAML according to the [YAML 1.1 spec][41].
- The Enrichment Table file option now supports a `field` option that accepts an event field path or a metadata secret as the lookup key source. Plain text is supported for backwards compatibility.
    - Explicit event path example:
        - Observability Pipelines simplified syntax: `field: {event: "message"}`
        - VRL syntax for the Custom Processor: `field: {vrl: ".message"}`
    - Metadata secret reference example: `field: {secret: "splunk_hec_token"}`
    - Plain string (for backwards compatibility):
        - Observability Pipelines simplified syntax: `field: "message"`
        - VRL syntax for the Custom Processor: `field: ".message"`

#### Enhancements

- The Amazon S3 source now accepts compressed data.
- The Elasticsearch destination has been updated with new options: `auto_routing`, `compression`, `id_key`, `pipeline`, `request_retry_partial`, `sync_fields`, and `tls`.
- Mapping array-of-object source fields into OCSF array-of-object destinations is now supported.
- The Datadog Metrics destination now defaults to the Datadog series v2 endpoint (`/api/v2/series`).
- The Enrichment Table processor's GeoIP option now includes a network field containing the CIDR network associated with the lookup result. The network field is available for all database types (City, ISP/ASN, Connection-Type, Anonymous-IP).
- The Custom Processor now has an `encode_csv` function that encodes an array of values into a CSV-formatted string. This is the inverse of the `parse_csv` function and supports an optional single-byte delimiter (defaults to `,`).
- Field names now support `.`, such as `foo."bar.baz"`.

#### Fixes

- Improved the accuracy of the buffer utilization metric tracking.
- For the Custom Processor, incorrect parameter types for `floor`, `md5`, `parse_key_value`, `precision`, and `seahash` have been fixed.

---

## Worker version 2.14.1

To upgrade to Worker version 2.14.1:

- Docker: Run the `docker pull` command for the [2.14.1 image][42].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.14.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.14.1`.

Worker version 2.14.1 gives you access to the following:

#### Fixes

- Fixed how an empty path in a processor field is handled. For example, how the Parse JSON processor handles the `Field to parse JSON on` with the value `.`.

---

## Worker version 2.14.0

To upgrade to Worker version 2.14.0:

- Docker: Run the `docker pull` command for the [2.14.0 image][38].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.14.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.14.0`.

Worker version 2.14.0 gives you access to the following:

#### New features

- OCSF mappings for Palo Alto Networks Threat events have been added.
- The Database source has been updated with timeout-related changes.
- The `component_latency_seconds` histogram and `component_latency_mean_seconds` gauge internal metrics have been added. The metrics are based on the time an event spends in a single processor, including in the processor buffer.

#### Enhancements

- Enrichment Table error reporting now uses Reference Tables metrics to reduce the count of similar logs.
- The Splunk HEC destination now supports extracting index fields from events.
- The OCSF mapper now has an option to retain unmatched fields.
- For the Enrichment Table processor, the local cache retention time of entries not found in a Reference Table has been increased. The retention time is now 30 minutes, up from 10 minutes.
- The Database Source SQL validation checks have been improved.
- The Sensitive Data Scanner library now has new and updated out-of-the-box scanning rules for PII, credentials, and financial data. Minor bugs have also been fixed.
- The `observability-pipelines-worker top` command has new keybinds for scrolling, sorting, and filtering.
- The Datadog Logs destination has been updated to default to `zstd` compression instead of no compression.
- The environment variable for the Datadog Agent source address is now configurable.

#### Fixes

- Fixed a bug with sticky error state when Remote Configuration is successfully polled.
- Fixed buffer utilization metrics to properly record actual utilization level.
- Fixed a Worker shutdown race condition between closing the memory buffer and in-progress send operations that could potentially cause event loss.
- The Generate Metrics processor now handles aggregated histogram and aggregated summary metrics correctly.
- Live Capture now supports child events in the split array processor.
- Reference Tables buffer size and request frequency have been reduced to avoid out-of-memory (OOM) and rate limit errors.
- The Reference Tables processor now rejects empty or blank lookup keys and supports integer keys.

---

## Worker version 2.13.2

To upgrade to Worker version 2.13.2:

- Docker: Run the `docker pull` command for the [2.13.2 image][39].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.13.2`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.13.2`.

Worker version 2.13.2 gives you access to the following:

#### Fixes

- Fixed `exists` and `missing` queries to match with objects.

---

## Worker version 2.13.1

To upgrade to Worker version 2.13.1:

- Docker: Run the `docker pull` command for the [2.13.1 image][22].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.13.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.13.1`.

Worker version 2.13.1 gives you access to the following:

#### Fixes

- All processors have been updated to gracefully handle incorrect filter query syntax.

---

## Worker version 2.13.0

To upgrade to Worker version 2.13.0:

- Docker: Run the `docker pull` command for the [2.13.0 image][23].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.13.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.13.0`.

Worker version 2.13.0 gives you access to the following:

#### New features

- [Custom Processor][24] for metrics: Use VRL to transform metric events.
- [Secrets Management][31]: Observability Pipelines can retrieve secrets using Datadog Secrets Management.
- [Live capture][25] is available for metrics pipelines.
- The [Enrichment Tables][28] processor can use datasets in Reference Tables.

#### Enhancements

- [Disk buffers][18] have been updated to drop logs when the buffer is full.
- The Dedupe processor has been updated with a configurable cache size.
- The Datadog Agent source has been updated with configurable request timeouts.
- Source buffers have been updated to record the utilization level of the buffer with these metrics:
    - `source_buffer_max_byte_size`
    - `source_buffer_max_event_size`
    - `source_buffer_utilization`
    - `source_buffer_utilization_level`
- Processor buffers have been updated to record the utilization level of the buffers with these metrics:
    - `transform_buffer_max_byte_size`
    - `transform_buffer_max_event_size`
    - `transform_buffer_utilization`
    - `transform_buffer_utilization_level`
- The TLS implementation has been updated to store credentials in FIPS-compliant PEM format.

#### Fixes

- Live Capture has been updated and bugs have been fixed.
- The Search Syntax bug with handling hyphenated segments has been fixed.
- The syslog source in UDP mode emits the standard `component_received` metrics, like how it does with TCP mode:
    - `component_received_events_total`
    - `component_received_event_bytes_total`
    - `component_received_bytes_total`

---

## Worker version 2.12.0

To upgrade to Worker version 2.12.0:

- Docker: Run the `docker pull` command for the [2.12.0 image][27].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.12.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.12.0`.

Worker version 2.12.0 gives you access to the following:

#### New features

- [HTTP destination][29] for metrics pipelines: Routes metrics to an HTTP client endpoint.
- [MySQL Source][30]: Sends logs from a MySQL database to Observability Pipelines.

#### Enhancements

- The HTTP Client source and destination have been updated so you can set a custom authorization strategy.
- The metrics filter processor was updated to filter metrics on `kind` and `value`.
- Processor groups that route and process only targeted events have been updated to reduce processing overhead.
- The Datadog Agent source has been updated to support timeouts, incrementing the `component_timed_out_events_total` and `component_timed_out_requests_total` metrics.

#### Fixes

- The Amazon S3 destination has been updated to ensure the `message` field is always a string, JSON-encoding it if necessary.
- A Worker bug has been fixed to ensure Worker logs are reported correctly.
- The `hostname` is renamed to `host` when sending logs to Datadog Archives.
- For metrics sources, Workers have been updated to use their own copy of the Datadog key for authentication, disregarding any keys sent in by the Datadog Agent to prevent the use of stale keys.
- The Worker uses proxy settings configured with environment variables (for example, the `DD_PROXY_HTTPS` environment variable) or in the bootstrap file when it publishes events to Live Capture.

---

## Worker Version 2.11.0

To upgrade to Worker version 2.11.0:

- Docker: Run the `docker pull` command for the [2.11.0 image][1].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.11.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.11.0`.

<div class="alert alert-info">For pipelines that are running Worker 2.10 or older:<br>- After you upgrade to Worker 2.11, your processor filter queries continue to run the legacy search syntax.<br>- You must manually update your filter queries to the new Search Syntax.<br>- Then, enable the <b>New Search Syntax</b> toggle in the UI, or set <code>use_legacy_search_syntax</code> to <code>false</code> using the API or Terraform.<br><br>See <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">Upgrade Your Filter Queries to the New Search Syntax</a> for more information.</a></div>

Version 2.11.0 gives you access to the following:

#### New features

- More than 100 out-of-the-box rules for the Sensitive Data Scanner processor have been added. These rules redact Personally Identifiable Information (PII) and access key information.
- The updated [Search Syntax][3] that lets you:
    - Dereference arrays
    - Perform case insensitive search within log messages
    - Deterministically target log attributes without using `@` symbol

---

## Worker Version 2.10.0

To upgrade to Worker version 2.10.0:

- Docker: Run the `docker pull` command for the [2.10.0 image][4].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.10.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.10.0`.

Worker version 2.10.0 gives you access to the following:

#### New features

- [Kafka destination][5]: Send logs from Observability Pipelines to your Kafka topics.
- New and updated [Custom Processor functions][6]:
    - The `pop` function removes the last item from an array.
    - The cryptographic functions `encrypt_ip` and `decrypt_ip` for IP address encryption.
        - These functions use the IPCrypt specification and support both IPv4 and IPv6 addresses with two encryption modes:
            - aes128 (IPCrypt deterministic, 16-byte key)
            - pfx (IPCryptPfx, 32-byte key).
            - Both algorithms are format-preserving (output is a valid IP address) and deterministic.
    - The `xxhash` function implements `xxh32`, `xxh64`, `xxh3_64`, and `xxh3_128` hashing algorithms.
    - The `parse_aws_alb_log` function has been updated with an optional `strict_mode` parameter.
        - When `strict_mode` is set to `false`, the parser ignores any newly added or trailing fields in AWS ALB logs, instead of failing.
        - Defaults to `true` to preserve current behavior.
    - [Metrics pipelines][32]:
        - [Datadog Agent source][33]: Send metrics from the Datadog Agent to Observability Pipelines for processing.
        - [Filter processor][35]: Filter the metrics you want to process.
        - [Tag processor][36]: Include or exclude specific tags in your metrics.
        - [Datadog Metrics destination][34]: Send your processed metrics Datadog.

#### Enhancements

- The Custom Processor's performance has been improved.
- Workers have been updated to use their own copy of the Datadog key for authentication, disregarding any keys sent in by the Datadog Agent to prevent the use of stale keys.
- Error reporting has been improved when validating JSON schema in custom functions that use the `validate_json_schema` function.

#### Fixes

- Group-level filtering logic has been fixed to exclude correct logs.

---

## Worker Version 2.9.1

To upgrade to Worker version 2.9.1:

- Docker: Run the `docker pull` command to pull the [2.9.1 image][7].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.9.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.9.1`.

Worker version 2.9.1 gives you access to the following:

#### Fixes

- The Microsoft Sentinel destination has been limited to batch sizes of 1 MB when reading logs using the Azure Logs Ingestion API. The limit size was determined based on the [Azure documentation][8].

---

## Worker Version 2.9.0

To upgrade to Worker version 2.9.0:

- Docker: Run the `docker pull` command to pull the [2.9.0 image][9].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.9.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.9.0`.

Worker version 2.9.0 gives you access to the following:

#### New features

- [OpenTelemetry Collector source][10]: Ingest logs from your OpenTelemetry Collector into Observability Pipelines.
- [Datadog BYOC Logs destination][11]: Route logs to the Datadog BYOC Logs destination.
- [Google Pub/Sub destination][12]: Send logs from Observability Pipelines to the Google Pub/Sub messaging system.
- The `haversine` custom function to calculate haversine distance and bearing.

#### Enhancements

- The Observability Pipelines Worker's internal logs have been updated to partially redact the Datadog API key (first 28 characters only), to help investigate API-key related issues.
- The performance of Remote Configuration delivery time has been improved.
- The `parse_cef` and `parse_syslog` custom functions have enhanced parsing.

---

## Worker Version 2.8.1

To upgrade to Worker version 2.8.1:

- Docker: Run the `docker pull` command to pull the [2.8.1 image][13].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.8.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.8.1`.

Worker version 2.8.1 gives you access to the following:

#### Fixes

- The HTTP Client source's authorization strategy has been fixed.

---

## Worker Version 2.8.0

To upgrade to Worker version 2.8.0:

- Docker: Run the `docker pull` command to pull the [2.8.0 image][14].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.8.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.8.0`.

Worker version 2.8.0 gives you access to the following:

#### New features

- All sources and destinations have been updated to support custom environment variables.

#### Enhancements

- The Elasticsearch destination's [indexing strategy][21] has been updated to include data streams.
- The HTTP Client destination supports template syntax.

#### Fixes

- The HTTP Server source's TLS enablement has been fixed.
- Worker health metrics have been fixed.
- OpenSearch's basic authentication has been fixed.

---

## Worker Version 2.7.0

To upgrade to Worker version 2.7.0:

- Docker: Run the `docker pull` command to pull the [2.7.0 image][15].
- Kubernetes: See the [Helm chart][2] and [Upgrade the Worker][37].
- APT: Run the command `apt-get install observability-pipelines-worker=2.7.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.7.0`.

Worker version 2.7.0 gives you access to the following:

#### New features

- [The HTTP Client destination][16]: Send logs to an HTTP Client, such as a logging platform or SIEM.
- [Processor Groups][17]: Organize your processors into logical groups to help you manage them.
- [Disk and memory][18] buffering options are available for destinations.

#### Enhancements

- The `decode_lz4` custom function has been updated to support decompressing `lz4` frame data.
- The Azure Blob Storage and Google Cloud Storage archive destinations' prefix fields support template syntax.
- The Splunk HEC destination has a custom environment variable.
- The sample processor has an optional [`group_by` parameter][20].

#### Fixes

- The Datadog Logs destination's default compression has been updated to `zstd`, which matches Datadog Agent's default compression.
- The Amazon S3, Google Cloud Storage, and Azure Blob Storage destinations have been fixed to resolve log timestamps correctly.
- The custom OCSF mapper's performance has been improved.
- The filter processor has flag logic enabled to pass events to the next processor.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#observability-pipelines-worker
[3]: /observability_pipelines/search_syntax/logs/
[4]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.10
[5]: /observability_pipelines/destinations/kafka/
[6]: /observability_pipelines/processors/custom_processor/#custom-functions
[7]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.1
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[9]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.0
[10]: /observability_pipelines/sources/opentelemetry/
[11]: /observability_pipelines/destinations/datadog_byoc_logs/
[12]: /observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /observability_pipelines/destinations/http_client/
[17]: /observability_pipelines/processors/#processor-groups
[18]: /observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[20]: /observability_pipelines/processors/sample/#group-by-example
[21]: /observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /observability_pipelines/processors/custom_processor
[25]: /observability_pipelines/configuration/live_capture/
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /observability_pipelines/processors/enrichment_table/
[29]: /observability_pipelines/destinations/http_client/
[30]: /observability_pipelines/sources/mysql/
[31]: /observability_pipelines/configuration/secrets_management
[32]: /observability_pipelines/configuration/set_up_pipelines/?tab=metrics#set-up-a-pipeline-in-the-ui
[33]: /observability_pipelines/sources/datadog_agent/?tab=metrics
[34]: /observability_pipelines/destinations/datadog_metrics/?tab=secretsmanagement
[35]: /observability_pipelines/processors/filter/?tab=metrics
[36]: /observability_pipelines/processors/tag_allow_block_list/
[37]: /observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management#upgrade-the-worker
[38]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.0
[39]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.2
[40]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.0
[41]: https://yaml.org/spec/1.1/
[42]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.1
[43]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.1
[44]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.0
[45]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.1
[46]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.17.0
[47]: /observability_pipelines/destinations/databricks/
