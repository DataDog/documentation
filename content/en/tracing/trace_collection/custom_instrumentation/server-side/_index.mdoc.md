---
title: Server-Side Languages
description: Add custom spans, tags, and instrumentation to capture application-specific observability data using Datadog APIs and OpenTelemetry.
aliases:
  # Java aliases
  - /tracing/opentracing/java
  - /tracing/manual_instrumentation/java
  - /tracing/custom_instrumentation/java
  - /tracing/setup_overview/custom_instrumentation/java
  - /tracing/trace_collection/custom_instrumentation/java
  - /tracing/trace_collection/custom_instrumentation/java/dd-api
  - /tracing/trace_collection/custom_instrumentation/java/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/java
  - /tracing/trace_collection/otel_instrumentation/java/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
  # Python aliases
  - /tracing/opentracing/python
  - /tracing/manual_instrumentation/python
  - /tracing/custom_instrumentation/python
  - /tracing/setup_overview/custom_instrumentation/python
  - /tracing/trace_collection/custom_instrumentation/python
  - /tracing/trace_collection/custom_instrumentation/python/dd-api
  - /tracing/trace_collection/custom_instrumentation/python/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/python
  - /tracing/trace_collection/otel_instrumentation/python/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
  # Node.js aliases
  - /tracing/opentracing/nodejs
  - /tracing/manual_instrumentation/nodejs
  - /tracing/custom_instrumentation/nodejs
  - /tracing/setup_overview/custom_instrumentation/nodejs
  - /tracing/trace_collection/custom_instrumentation/nodejs
  - /tracing/trace_collection/custom_instrumentation/nodejs/dd-api
  - /tracing/trace_collection/custom_instrumentation/nodejs/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
  - /tracing/trace_collection/otel_instrumentation/nodejs/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
  # Go aliases
  - /tracing/opentracing/go
  - /tracing/manual_instrumentation/go
  - /tracing/custom_instrumentation/go
  - /tracing/setup_overview/custom_instrumentation/go
  - /tracing/trace_collection/custom_instrumentation/go
  - /tracing/trace_collection/custom_instrumentation/go/dd-api
  - /tracing/trace_collection/custom_instrumentation/go/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/go
  - /tracing/trace_collection/otel_instrumentation/go/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
  # Ruby aliases
  - /tracing/opentracing/ruby
  - /tracing/manual_instrumentation/ruby
  - /tracing/custom_instrumentation/ruby
  - /tracing/setup_overview/custom_instrumentation/ruby
  - /tracing/trace_collection/custom_instrumentation/ruby
  - /tracing/trace_collection/custom_instrumentation/ruby/dd-api
  - /tracing/trace_collection/custom_instrumentation/ruby/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
  - /tracing/trace_collection/otel_instrumentation/ruby/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
  # .NET aliases
  - /tracing/opentracing/dotnet
  - /tracing/manual_instrumentation/dotnet
  - /tracing/custom_instrumentation/dotnet
  - /tracing/setup_overview/custom_instrumentation/dotnet
  - /tracing/trace_collection/custom_instrumentation/dotnet
  - /tracing/trace_collection/custom_instrumentation/dotnet/dd-api
  - /tracing/trace_collection/custom_instrumentation/dotnet/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
  - /tracing/trace_collection/otel_instrumentation/dotnet/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
  # PHP aliases
  - /tracing/opentracing/php
  - /tracing/manual_instrumentation/php
  - /tracing/custom_instrumentation/php
  - /tracing/setup_overview/custom_instrumentation/php
  - /tracing/trace_collection/custom_instrumentation/php
  - /tracing/trace_collection/custom_instrumentation/php/dd-api
  - /tracing/trace_collection/custom_instrumentation/php/otel
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/php
  - /tracing/trace_collection/otel_instrumentation/php/
  - /tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
  # C++ aliases
  - /tracing/manual_instrumentation/cpp
  - /tracing/custom_instrumentation/cpp
  - /tracing/setup_overview/custom_instrumentation/cpp
  - /tracing/trace_collection/custom_instrumentation/cpp
  - /tracing/trace_collection/custom_instrumentation/cpp/dd-api
  - /tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
  # Rust aliases
  - /tracing/trace_collection/custom_instrumentation/rust
  # Elixir aliases
  - /tracing/trace_collection/custom_instrumentation/elixir
content_filters:
  - trait_id: prog_lang
    option_group_id: custom_instrumentation_language_options
    label: "Language"
  - trait_id: api_type
    option_group_id: custom_instrumentation_api_options
    label: "API"
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

<!-- ============================================== -->
<!-- API AVAILABILITY NOTICES - SHOW FIRST -->
<!-- ============================================== -->

<!-- C++ only supports Datadog API -->
{% if equals($prog_lang, "cpp") %}
{% if equals($api_type, "otel_api") %}
{% alert level="danger" %}
C++ does not support the OpenTelemetry API. Select **Datadog** from the API dropdown to see C++ custom instrumentation documentation.
{% /alert %}
{% /if %}
{% /if %}

<!-- Rust, Elixir only support OpenTelemetry API -->
{% if or(equals($prog_lang, "rust"), equals($prog_lang, "elixir")) %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Rust and Elixir do not support the Datadog API. Select **OpenTelemetry** from the API dropdown to see custom instrumentation documentation.
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- OPENTELEMETRY API CONTENT -->
<!-- ============================================== -->

{% if equals($api_type, "otel_api") %}

<!-- Elixir: show only the Elixir-specific note, no overview -->
{% if equals($prog_lang, "elixir") %}
Datadog does not provide an Elixir tracing library. To send traces to Datadog, use the [OpenTelemetry SDK for Elixir][8].
{% /if %}

<!-- Full content for languages with full OTel support (not C++, not Elixir) -->
{% if not(or(equals($prog_lang, "cpp"), equals($prog_lang, "elixir"))) %}

## Overview

{% partial file="opentelemetry/traces/otel-custom-instrumentation-overview.mdoc.md" /%}

{% if equals($prog_lang, "java") %}
{% partial file="opentelemetry/traces/java.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="opentelemetry/traces/python.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="opentelemetry/traces/nodejs.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="opentelemetry/traces/go.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="opentelemetry/traces/ruby.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "dot_net") %}
{% partial file="opentelemetry/traces/dotnet.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="opentelemetry/traces/php.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "rust") %}
{% partial file="opentelemetry/traces/rust.mdoc.md" /%}
{% /if %}

{% /if %}
{% /if %}
<!-- END OTEL API CONTENT -->

<!-- ============================================== -->
<!-- DATADOG API CONTENT -->
<!-- ============================================== -->

<!-- Only show DD API content for languages that support it (not Rust/Elixir) -->
{% if equals($api_type, "dd_api") %}
{% if not(or(equals($prog_lang, "rust"), equals($prog_lang, "elixir"))) %}

## Overview

Use the Datadog API to programmatically create, modify, or delete traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, and providing deeper visibility and context into spans, including adding span tags.

{% if equals($prog_lang, "java") %}
{% partial file="tracing/custom_instrumentation/dd_api/java.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="tracing/custom_instrumentation/dd_api/python.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="tracing/custom_instrumentation/dd_api/nodejs.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="tracing/custom_instrumentation/dd_api/go.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="tracing/custom_instrumentation/dd_api/ruby.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "dot_net") %}
{% partial file="tracing/custom_instrumentation/dd_api/dotnet.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="tracing/custom_instrumentation/dd_api/php.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "cpp") %}
{% partial file="tracing/custom_instrumentation/dd_api/cpp.mdoc.md" /%}
{% /if %}

{% /if %}
{% /if %}
<!-- END DATADOG API CONTENT -->

[8]: https://opentelemetry.io/docs/languages/beam/
