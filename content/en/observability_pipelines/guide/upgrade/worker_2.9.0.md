---
title: Upgrade to Worker Version 2.9.0
description: Learn more about Worker version 2.9.0.
disable_toc: false
---

Upgrade to Worker version 2.9.0 to have access to the following new features and enhancements.

## New features

- [OpenTelemetry Collector source][1]: Send logs from your OpenTelemetry Collector to Observability Pipelines.
- [Datadog CloudPrem destination][2]: Send logs from Observability Pipelines to Datadog CloudPrem.
- [Google Pub/Sub destination][3]: Send logs from Observability Pipelines to the Google Pub/Sub messaging system.
- The `haversine` custom function to calculate haversine distance and bearing.

## Enhancements

- The Datadog API key is partially redacted (first 28 characters only) in the Observability Pipelines Worker's internal logs, to help investigate API-key related issues.
- Performance enhancement for Remote Configuration delivery time.
- The `parse_cef` and `parse_syslog` custom functions has enhanced parsing.

[1]: /observability_pipelines/sources/opentelemetry/
[2]: /observability_pipelines/destinations/cloudprem/
[3]: /observability_pipelines/destinations/google_pubsub/