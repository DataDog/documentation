---
title: Upgrade the Worker Guide
description: Learn about new features, enhancements and fixes for Worker versions 2.x.
disable_toc: false
---

## Overview

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates.
</div>

This guide goes over Worker version releases and how to upgrade to that version.

## Worker Version 2.11.0

To upgrade to Worker version 2.11.0:

- Docker: Run the `docker pull` command to pull the [2.11.0 image][24].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

<div class="alert alert-info">After you have upgraded to Worker 2.11.0, you must manually update your processors' filter queries to the new Search Syntax.<br><br>See <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">Upgrade Your Filter Queries to the New Search Syntax</a> for more information.</a></div>

Version 2.11.0 gives you access to the following:

#### New features

- More than 100 out-of-the-box rules for the Sensitive Data Scanner processor have been added. These rules redact Personally Identifiable Information (PII) and access key information that focus on GDPR compliance and secrets.
- An upgraded [Search Syntax][22] that lets you:
    - Dereference arrays
    - Perform case insensitive search within log messages
    - Deterministically target log attributes without using `@` symbol

---

## Worker Version 2.10.0

To upgrade to Worker version 2.10.0:

- Docker: Run the `docker pull` command to pull the [2.10.0 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.10.0 gives you access to the following:

#### New features

- The [Kafka destination][11]: Send logs from Observability Pipelines to your Kafka topics.
- New and updated [Custom Processor functions][12]:
    - The `pop` function removes the last item from an array.
    - The cryptographic functions `encrypt_ip` and `decrypt_ip` for IP address encryption.
        - These functions use the IPCrypt specification and support both IPv4 and IPv6 addresses with two encryption modes:
            - aes128 (IPCrypt deterministic, 16-byte key)
            - pfx (IPCryptPfx, 32-byte key).
            - Both algorithms are format-preserving (output is a valid IP address) and deterministic.
    - The `xxhash` function implements `xxh32`, `xxh64`, `xxh3_64`, and `xxh3_128` hashing algorithms.
    - The `parse_aws_alb_log` function has an optional `strict_mode` parameter.
        - When `strict_mode` is set to `false`, the parser ignores any newly added or trailing fields in AWS ALB logs, instead of failing.
        - Defaults to `true` to preserve current behavior.

#### Enhancements

- Performance enhancement for the Custom Processor.
- Workers use their own copy of the Datadog key to authenticate, disregarding any keys sent in by the Datadog Agent to prevent the use of stale keys.
- Error reporting has been improved when validating JSON schema in custom functions that use the `validate_json_schema` function.

#### Fixes

- Group-level filtering logic was fixed to exclude correct logs.

---

## Worker Version 2.9.1

To upgrade to Worker version 2.9.1:

- Docker: Run the `docker pull` command to pull the [2.9.1 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.9.1 gives you access to the following:

#### Fixes

- The Microsoft Sentinel destination has been limited to batch sizes of 1 MB when reading logs using the Azure Logs Ingestion API. The limit is based on [Azure documentation][10].

---

## Worker Version 2.9.0

To upgrade to Worker version 2.9.0:

- Docker: Run the `docker pull` command to pull the [2.9.0 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.9.0 gives you access to the following:

#### New features

- [OpenTelemetry Collector source][7]: Send logs from your OpenTelemetry Collector to Observability Pipelines.
- [Datadog CloudPrem destination][8]: Send logs from Observability Pipelines to Datadog CloudPrem.
- [Google Pub/Sub destination][9]: Send logs from Observability Pipelines to the Google Pub/Sub messaging system.
- The `haversine` custom function to calculate haversine distance and bearing.

#### Enhancements

- The Datadog API key is partially redacted (first 28 characters only) in the Observability Pipelines Worker's internal logs, to help investigate API-key related issues.
- Performance enhancement for Remote Configuration delivery time.
- The `parse_cef` and `parse_syslog` custom functions has enhanced parsing.

---

## Worker Version 2.8.1

To upgrade to Worker version 2.8.1:

- Docker: Run the `docker pull` command to pull the [2.8.1 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.8.1 gives you access to the following:

#### Fixes

- THe HTTP Client source's authorization strategy has been updated.

---

## Worker Version 2.8.0

To upgrade to Worker version 2.8.0:

- Docker: Run the `docker pull` command to pull the [2.8.0 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.8.0 gives you access to the following:

#### New features

- All sources and destination have custom environment variable support.

#### Enhancements

- Data streams in the Elasticsearch destination is available as an indexing strategy.
- The HTTP Client destination supports template syntax.

#### Fixes

- Fixes for TLS enablement in the HTTP Server source.
- Fixes for worker health metrics.
- A fix for basic authentication in OpenSearch.

---

## Worker Version 2.7.0

To upgrade to Worker version 2.7.0:

- Docker: Run the `docker pull` command to pull the [2.7.0 image][].
- Kubernetes:
- APT and RPM: See [Upgrade the Worker][25].

Worker version 2.7.0 gives you access to the following:

#### New features

- [The HTTP Client destination][1]: Send logs to an HTTP client, such as a logging platform or SIEM.
- [Processor Groups][2]: Organize your processors into logical groups to help you manage them.
- [Disk][3] and [memory][4] buffering options are available for destinations.

#### Enhancements

- The `decode_lz4` function supports decompressing `lz4` frame data.
- The Azure Blob Storage and Google Cloud Storage archive destinations' prefix fields support template syntax.
- The Splunk HEC destination has a custom environment variable.
- The sample processor has an optional `group_by` parameter.

#### Fixes

- The Datadog Logs destination's default compression has been updated to `zstd`, which matches Datadog Agent's default compression.
- Amazon S3, Google Cloud Storage, and Azure Blob Storage destinations correctly resolves log timestamps.
- Performance improvements for custom OCSF mapper.
- Enabled flag logic in the filter processor to pass events to the next processor.

[1]: /observability_pipelines/destinations/http_client/
[2]: /observability_pipelines/processors/#processor-groups
[3]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#disk-buffers
[4]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#in-memory-buffering-for-components
[7]: /observability_pipelines/sources/opentelemetry/
[8]: /observability_pipelines/destinations/cloudprem/
[9]: /observability_pipelines/destinations/google_pubsub/
[10]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[11]: /observability_pipelines/destinations/kafka/
[12]: /observability_pipelines/processors/custom_processor/#custom-functions
[22]: /observability_pipelines/search_syntax/
[23]: /observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/
[24]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[25]: /observability_pipelines/configuration/install_the_worker/?tab=docker#upgrade-the-worker