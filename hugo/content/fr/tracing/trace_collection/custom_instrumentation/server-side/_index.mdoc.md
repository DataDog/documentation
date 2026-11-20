---
aliases:
- /fr/tracing/opentracing/java
- /fr/tracing/manual_instrumentation/java
- /fr/tracing/custom_instrumentation/java
- /fr/tracing/setup_overview/custom_instrumentation/java
- /fr/tracing/trace_collection/custom_instrumentation/java
- /fr/tracing/trace_collection/custom_instrumentation/java/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/java/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/java
- /fr/tracing/trace_collection/otel_instrumentation/java/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
- /fr/tracing/opentracing/python
- /fr/tracing/manual_instrumentation/python
- /fr/tracing/custom_instrumentation/python
- /fr/tracing/setup_overview/custom_instrumentation/python
- /fr/tracing/trace_collection/custom_instrumentation/python
- /fr/tracing/trace_collection/custom_instrumentation/python/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/python/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/python
- /fr/tracing/trace_collection/otel_instrumentation/python/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
- /fr/tracing/opentracing/nodejs
- /fr/tracing/manual_instrumentation/nodejs
- /fr/tracing/custom_instrumentation/nodejs
- /fr/tracing/setup_overview/custom_instrumentation/nodejs
- /fr/tracing/trace_collection/custom_instrumentation/nodejs
- /fr/tracing/trace_collection/custom_instrumentation/nodejs/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/nodejs/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
- /fr/tracing/trace_collection/otel_instrumentation/nodejs/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
- /fr/tracing/opentracing/go
- /fr/tracing/manual_instrumentation/go
- /fr/tracing/custom_instrumentation/go
- /fr/tracing/setup_overview/custom_instrumentation/go
- /fr/tracing/trace_collection/custom_instrumentation/go
- /fr/tracing/trace_collection/custom_instrumentation/go/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/go/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/go
- /fr/tracing/trace_collection/otel_instrumentation/go/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
- /fr/tracing/opentracing/ruby
- /fr/tracing/manual_instrumentation/ruby
- /fr/tracing/custom_instrumentation/ruby
- /fr/tracing/setup_overview/custom_instrumentation/ruby
- /fr/tracing/trace_collection/custom_instrumentation/ruby
- /fr/tracing/trace_collection/custom_instrumentation/ruby/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/ruby/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
- /fr/tracing/trace_collection/otel_instrumentation/ruby/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
- /fr/tracing/opentracing/dotnet
- /fr/tracing/manual_instrumentation/dotnet
- /fr/tracing/custom_instrumentation/dotnet
- /fr/tracing/setup_overview/custom_instrumentation/dotnet
- /fr/tracing/trace_collection/custom_instrumentation/dotnet
- /fr/tracing/trace_collection/custom_instrumentation/dotnet/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/dotnet/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
- /fr/tracing/trace_collection/otel_instrumentation/dotnet/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
- /fr/tracing/opentracing/php
- /fr/tracing/manual_instrumentation/php
- /fr/tracing/custom_instrumentation/php
- /fr/tracing/setup_overview/custom_instrumentation/php
- /fr/tracing/trace_collection/custom_instrumentation/php
- /fr/tracing/trace_collection/custom_instrumentation/php/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/php/otel
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/php
- /fr/tracing/trace_collection/otel_instrumentation/php/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
- /fr/tracing/manual_instrumentation/cpp
- /fr/tracing/custom_instrumentation/cpp
- /fr/tracing/setup_overview/custom_instrumentation/cpp
- /fr/tracing/trace_collection/custom_instrumentation/cpp
- /fr/tracing/trace_collection/custom_instrumentation/cpp/dd-api
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
- /fr/tracing/trace_collection/custom_instrumentation/rust
- /fr/tracing/trace_collection/custom_instrumentation/elixir
- /fr/tracing/trace_collection/custom_instrumentation/swift
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
content_filters:
- label: Language
  option_group_id: custom_instrumentation_language_options
  trait_id: prog_lang
- label: API
  option_group_id: custom_instrumentation_api_options
  trait_id: api_type
description: Ajoutez des spans, des balises et une instrumentation personnalisée pour
  capturer des données d'observabilité spécifiques à l'application en utilisant les
  API Datadog et OpenTelemetry.
further_reading:
- link: tracing/guide/instrument_custom_method
  text: Instrumenter une méthode personnalisée pour analyser en détail votre logique
    métier
- link: tracing/connect_logs_and_traces
  text: Associer vos logs à vos traces
- link: tracing/visualization/
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: En savoir plus sur Datadog et l'initiative OpenTelemetry
title: Instrumentation personnalisée côté serveur
---
<!-- ============================================== -->
<!-- API AVAILABILITY NOTICES - SHOW FIRST -->
<!-- ============================================== -->

<!-- C++ only supports Datadog API -->
{% if equals($prog_lang, "cpp") %}
{% if equals($api_type, "otel_api") %}
{% alert level="danger" %}
C++ ne prend pas en charge l'API OpenTelemetry. Sélectionnez **Datadog** dans le menu déroulant de l'API pour voir la documentation sur l'instrumentation personnalisée C++.
{% /alert %}
{% /if %}
{% /if %}

<!-- Rust only supports OpenTelemetry API -->
{% if equals($prog_lang, "rust") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Rust ne prend pas en charge l'API Datadog. Sélectionnez **OpenTelemetry** dans le menu déroulant de l'API pour voir la documentation sur l'instrumentation personnalisée Rust.
{% /alert %}
{% /if %}
{% /if %}

<!-- Elixir only supports OpenTelemetry API -->
{% if equals($prog_lang, "elixir") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Elixir ne prend pas en charge l'API Datadog. Sélectionnez **OpenTelemetry** dans le menu déroulant de l'API pour voir la documentation sur l'instrumentation personnalisée Elixir.
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- OPENTELEMETRY API CONTENT -->
<!-- ============================================== -->

{% if equals($api_type, "otel_api") %}

<!-- Elixir: show only the Elixir-specific note, no overview -->
{% if equals($prog_lang, "elixir") %}
Datadog ne fournit pas de SDK Elixir. Pour envoyer des traces à Datadog, utilisez le [SDK OpenTelemetry pour Elixir][8].
{% /if %}

<!-- Full content for languages with full OTel support (not C++, not Elixir) -->
{% if not(includes($prog_lang, ["cpp", "elixir"])) %}

## Aperçu {% #overview %}

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

## Aperçu {% #overview-1 %}

Utilisez l'API Datadog pour créer, modifier ou supprimer des traces à envoyer à Datadog de manière programmatique. Ceci est utile pour tracer le code interne non capturé par l'instrumentation automatique, pour supprimer les spans indésirables des traces et pour offrir une visibilité plus approfondie ainsi qu'un contexte plus précis pour les spans, y compris l'ajout de balises de span.

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