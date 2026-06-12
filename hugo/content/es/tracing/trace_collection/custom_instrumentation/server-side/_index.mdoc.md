---
aliases:
- /es/tracing/opentracing/java
- /es/tracing/manual_instrumentation/java
- /es/tracing/custom_instrumentation/java
- /es/tracing/setup_overview/custom_instrumentation/java
- /es/tracing/trace_collection/custom_instrumentation/java
- /es/tracing/trace_collection/custom_instrumentation/java/dd-api
- /es/tracing/trace_collection/custom_instrumentation/java/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/java
- /es/tracing/trace_collection/otel_instrumentation/java/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
- /es/tracing/opentracing/python
- /es/tracing/manual_instrumentation/python
- /es/tracing/custom_instrumentation/python
- /es/tracing/setup_overview/custom_instrumentation/python
- /es/tracing/trace_collection/custom_instrumentation/python
- /es/tracing/trace_collection/custom_instrumentation/python/dd-api
- /es/tracing/trace_collection/custom_instrumentation/python/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/python
- /es/tracing/trace_collection/otel_instrumentation/python/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
- /es/tracing/opentracing/nodejs
- /es/tracing/manual_instrumentation/nodejs
- /es/tracing/custom_instrumentation/nodejs
- /es/tracing/setup_overview/custom_instrumentation/nodejs
- /es/tracing/trace_collection/custom_instrumentation/nodejs
- /es/tracing/trace_collection/custom_instrumentation/nodejs/dd-api
- /es/tracing/trace_collection/custom_instrumentation/nodejs/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
- /es/tracing/trace_collection/otel_instrumentation/nodejs/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
- /es/tracing/opentracing/go
- /es/tracing/manual_instrumentation/go
- /es/tracing/custom_instrumentation/go
- /es/tracing/setup_overview/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/go/dd-api
- /es/tracing/trace_collection/custom_instrumentation/go/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/go
- /es/tracing/trace_collection/otel_instrumentation/go/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
- /es/tracing/opentracing/ruby
- /es/tracing/manual_instrumentation/ruby
- /es/tracing/custom_instrumentation/ruby
- /es/tracing/setup_overview/custom_instrumentation/ruby
- /es/tracing/trace_collection/custom_instrumentation/ruby
- /es/tracing/trace_collection/custom_instrumentation/ruby/dd-api
- /es/tracing/trace_collection/custom_instrumentation/ruby/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
- /es/tracing/trace_collection/otel_instrumentation/ruby/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
- /es/tracing/opentracing/dotnet
- /es/tracing/manual_instrumentation/dotnet
- /es/tracing/custom_instrumentation/dotnet
- /es/tracing/setup_overview/custom_instrumentation/dotnet
- /es/tracing/trace_collection/custom_instrumentation/dotnet
- /es/tracing/trace_collection/custom_instrumentation/dotnet/dd-api
- /es/tracing/trace_collection/custom_instrumentation/dotnet/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
- /es/tracing/trace_collection/otel_instrumentation/dotnet/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
- /es/tracing/opentracing/php
- /es/tracing/manual_instrumentation/php
- /es/tracing/custom_instrumentation/php
- /es/tracing/setup_overview/custom_instrumentation/php
- /es/tracing/trace_collection/custom_instrumentation/php
- /es/tracing/trace_collection/custom_instrumentation/php/dd-api
- /es/tracing/trace_collection/custom_instrumentation/php/otel
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/php
- /es/tracing/trace_collection/otel_instrumentation/php/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
- /es/tracing/manual_instrumentation/cpp
- /es/tracing/custom_instrumentation/cpp
- /es/tracing/setup_overview/custom_instrumentation/cpp
- /es/tracing/trace_collection/custom_instrumentation/cpp
- /es/tracing/trace_collection/custom_instrumentation/cpp/dd-api
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
- /es/tracing/trace_collection/custom_instrumentation/rust
- /es/tracing/trace_collection/custom_instrumentation/elixir
- /es/tracing/trace_collection/custom_instrumentation/swift
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
content_filters:
- label: Language
  option_group_id: custom_instrumentation_language_options
  trait_id: prog_lang
- label: API
  option_group_id: custom_instrumentation_api_options
  trait_id: api_type
description: Agrega tramos, etiquetas e instrumentación personalizados para capturar
  datos de observabilidad específicos de la aplicación utilizando las API de Datadog
  y OpenTelemetry.
further_reading:
- link: tracing/guide/instrument_custom_method
  text: Instrumenta un método personalizado para obtener visibilidad profunda de tu
    lógica de negocio.
- link: tracing/connect_logs_and_traces
  text: Conecta tus registros y trazas.
- link: tracing/visualization/
  text: Explora tus servicios, recursos y trazas.
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Aprende más sobre Datadog y la iniciativa de OpenTelemetry.
title: Instrumentación personalizada del lado del servidor.
---
<!-- ============================================== -->
<!-- API AVAILABILITY NOTICES - SHOW FIRST -->
<!-- ============================================== -->

<!-- C++ only supports Datadog API -->
{% if equals($prog_lang, "cpp") %}
{% if equals($api_type, "otel_api") %}
{% alert level="danger" %}
C++ no soporta la API de OpenTelemetry. Selecciona **Datadog** del menú desplegable de API para ver la documentación de instrumentación personalizada de C++.
{% /alert %}
{% /if %}
{% /if %}

<!-- Rust only supports OpenTelemetry API -->
{% if equals($prog_lang, "rust") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Rust no soporta la API de Datadog. Selecciona **OpenTelemetry** del menú desplegable de API para ver la documentación de instrumentación personalizada de Rust.
{% /alert %}
{% /if %}
{% /if %}

<!-- Elixir only supports OpenTelemetry API -->
{% if equals($prog_lang, "elixir") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Elixir no soporta la API de Datadog. Selecciona **OpenTelemetry** del menú desplegable de API para ver la documentación de instrumentación personalizada de Elixir.
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- OPENTELEMETRY API CONTENT -->
<!-- ============================================== -->

{% if equals($api_type, "otel_api") %}

<!-- Elixir: show only the Elixir-specific note, no overview -->
{% if equals($prog_lang, "elixir") %}
Datadog no proporciona un SDK para Elixir. Para enviar trazas a Datadog, utiliza el [SDK de OpenTelemetry para Elixir][8].
{% /if %}

<!-- Full content for languages with full OTel support (not C++, not Elixir) -->
{% if not(includes($prog_lang, ["cpp", "elixir"])) %}

## Descripción general {% #overview %}

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
{% if not(includes($prog_lang, ["rust", "elixir"])) %}

## Descripción general {% #overview-1 %}

Utiliza la API de Datadog para crear, modificar o eliminar trazas de manera programática para enviar a Datadog. Esto resulta útil para rastrear el código interno que no se captura con la instrumentación automática, eliminar tramos no deseados de las trazas y ofrecer mayor visibilidad y contexto sobre los tramos, incluida la adición de etiquetas de tramo.

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