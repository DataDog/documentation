---
title: Upgrade the Worker Guide
description: Learn about new features, enhancements and fixes for Worker versions 2.7 to 2.13.
disable_toc: false
aliases:
    - /observability_pipelines/guide/upgrade_worker_2_7/
---

## Overview

<div class="alert alert-info">
Datadog recommends updating the Observability Pipelines Worker (OPW) with every minor and patch release, or monthly at a minimum. <br><br> Upgrading to the latest major OPW version and keeping it updated is the only supported way to get new OPW functionalities, fixes, and security updates.
</div>

This guide goes over how to upgrade to a specific Worker version and the updates for that version.

## Worker version 2.13.1

To upgrade to Worker version 2.13.1:

- Docker: Run the `docker pull` command for the [2.13.1 image][22].
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.13.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.13.1`.

Worker version 2.13.1 gives you access to the following:

#### Fixes

- All processors have been updated to gracefully handle incorrect filter query syntax.

---

## Worker version 2.13.0

To upgrade to Worker version 2.13.0:

- Docker: Run the `docker pull` command for the [2.13.0 image][23].
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.13.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.13.0`.

Worker version 2.13.0 gives you access to the following:

#### New features

- [Custom Processor][24] for metrics: Use VRL to transform metric events.
- [Secrets Management][31]: Observability Pipelines can retrieve secrets using Datadog Secrets Management.
- [Live capture][25] is available for metrics pipelines.
- The [Enrichment Tables][28] processor can use datasets in Reference Tables.

#### Enhancements

- [Disk buffers][26] have been updated to drop logs when the buffer is full.
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
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.12.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.12.0`.

Worker version 2.12.0 gives you access to the following:

#### New features

- [HTTP destination][29] for metrics pipelines: Routes metrics to an HTTP client endpoint.
- [MySQL Source][30]: Sends logs from a MySQL database to Observability Pipelines.

#### Enhancements

- The HTTP Client source and destination have been updated so you can set a custom authorization strategy.
- Filtering metrics on `kind` and `value` (name only) is supported.
- Processor groups that route and process only targeted events have been updated to reduce processing overhead.
- The Datadog Agent source has been updated to support timeouts, incrementing the `component_timed_out_events_total` and `component_timed_out_requests_total` metrics.

#### Fixes

- The Amazon S3 destination has been updated to ensure the `message` field is always a string, JSON-encoding it if necessary.
- Worker bug has been fixed to ensure Worker logs are reported correctly.
- The hostname is renamed to host when shipping logs to Datadog archives.
- For metrics sources, Workers have been updated to use their own copy of the Datadog key for authentication, disregarding any keys sent in by the Datadog Agent to prevent the use of stale keys.
- The Worker uses proxy settings configured with environment variables (for example, the `DD_PROXY_HTTPS` environment variable) or in the bootstrap file when it publishes events to Live Capture.

---

## Worker Version 2.11.0

To upgrade to Worker version 2.11.0:

- Docker: Run the `docker pull` command for the [2.11.0 image][1].
- Kubernetes: See the [Helm chart][2].
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
- Kubernetes: See the [Helm chart][2].
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
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.9.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.9.1`.

Worker version 2.9.1 gives you access to the following:

#### Fixes

- The Microsoft Sentinel destination has been limited to batch sizes of 1 MB when reading logs using the Azure Logs Ingestion API. The limit size was determined based on the [Azure documentation][8].

---

## Worker Version 2.9.0

To upgrade to Worker version 2.9.0:

- Docker: Run the `docker pull` command to pull the [2.9.0 image][9].
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.9.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.9.0`.

Worker version 2.9.0 gives you access to the following:

#### New features

- [OpenTelemetry Collector source][10]: Ingest logs from your OpenTelemetry Collector into Observability Pipelines.
- [Datadog CloudPrem destination][11]: Route logs to the Datadog CloudPrem destination.
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
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.8.1`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.8.1`.

Worker version 2.8.1 gives you access to the following:

#### Fixes

- The HTTP Client source's authorization strategy has been fixed.

---

## Worker Version 2.8.0

To upgrade to Worker version 2.8.0:

- Docker: Run the `docker pull` command to pull the [2.8.0 image][14].
- Kubernetes: See the [Helm chart][2].
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
- Kubernetes: See the [Helm chart][2].
- APT: Run the command `apt-get install observability-pipelines-worker=2.7.0`.
- RPM: Run the command `sudo yum install observability-pipelines-worker-2.7.0`.

Worker version 2.7.0 gives you access to the following:

#### New features

- [The HTTP Client destination][16]: Send logs to an HTTP Client, such as a logging platform or SIEM.
- [Processor Groups][17]: Organize your processors into logical groups to help you manage them.
- [Disk][18] and [memory][19] buffering options are available for destinations.

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
[11]: /observability_pipelines/destinations/cloudprem/
[12]: /observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /observability_pipelines/destinations/http_client/
[17]: /observability_pipelines/processors/#processor-groups
[18]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior
[19]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#component-buffers
[20]: /observability_pipelines/processors/sample/#group-by-example
[21]: /observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /observability_pipelines/processors/custom_processor
[25]: /observability_pipelines/configuration/live_capture/
[26]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /observability_pipelines/processors/enrichment_table/
[29]: /observability_pipelines/destinations/http_client/
[30]: /observability_pipelines/sources/mysql/
[31]: /observability_pipelines/configuration/secrets_management