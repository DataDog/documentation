---
title: Upgrade to Worker Version 2.9.0
description: Learn more about Worker version 2.9.0.
disable_toc: false
---

Upgrade to Worker version 2.9.0 to have access to the following new features and enhancements.

## New features

- OpenTelemetry Collector source: Send logs from your OpenTelemetry Collector to Observability Pipelines.
- Datadog CloudPrem destination: Send logs from Observability Pipelines to Datadog CloudPrem.
- Google Pub/Sub destination: Send logs from Observability Pipelines to Google Pub/Sub.
- The `haversine` custom function to calculate haversine distance and bearing.

## Enhancements

- Partially redact Datadog API key (first 28 characters only) in the Observability Pipelines Worker's internal logs, to help investigate API-key related issues.
- Performance enhancement for Remote Configuration delivery time.
- Enhanced parsing for `parse_cef` and `parse_syslog` custom functions.