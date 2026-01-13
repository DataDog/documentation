---
title: Go Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Go application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
- /tracing/trace_collection/otel_instrumentation/go/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

## Overview

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog supported library instrumentation.
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

{% partial file="opentelemetry/traces/go.mdoc.md" /%}
