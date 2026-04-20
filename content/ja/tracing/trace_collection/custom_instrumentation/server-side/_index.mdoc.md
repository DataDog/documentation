---
aliases:
- /ja/tracing/opentracing/java
- /ja/tracing/manual_instrumentation/java
- /ja/tracing/custom_instrumentation/java
- /ja/tracing/setup_overview/custom_instrumentation/java
- /ja/tracing/trace_collection/custom_instrumentation/java
- /ja/tracing/trace_collection/custom_instrumentation/java/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/java/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/java
- /ja/tracing/trace_collection/otel_instrumentation/java/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
- /ja/tracing/opentracing/python
- /ja/tracing/manual_instrumentation/python
- /ja/tracing/custom_instrumentation/python
- /ja/tracing/setup_overview/custom_instrumentation/python
- /ja/tracing/trace_collection/custom_instrumentation/python
- /ja/tracing/trace_collection/custom_instrumentation/python/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/python/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/python
- /ja/tracing/trace_collection/otel_instrumentation/python/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
- /ja/tracing/opentracing/nodejs
- /ja/tracing/manual_instrumentation/nodejs
- /ja/tracing/custom_instrumentation/nodejs
- /ja/tracing/setup_overview/custom_instrumentation/nodejs
- /ja/tracing/trace_collection/custom_instrumentation/nodejs
- /ja/tracing/trace_collection/custom_instrumentation/nodejs/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/nodejs/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
- /ja/tracing/trace_collection/otel_instrumentation/nodejs/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
- /ja/tracing/opentracing/go
- /ja/tracing/manual_instrumentation/go
- /ja/tracing/custom_instrumentation/go
- /ja/tracing/setup_overview/custom_instrumentation/go
- /ja/tracing/trace_collection/custom_instrumentation/go
- /ja/tracing/trace_collection/custom_instrumentation/go/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/go/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/go
- /ja/tracing/trace_collection/otel_instrumentation/go/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
- /ja/tracing/opentracing/ruby
- /ja/tracing/manual_instrumentation/ruby
- /ja/tracing/custom_instrumentation/ruby
- /ja/tracing/setup_overview/custom_instrumentation/ruby
- /ja/tracing/trace_collection/custom_instrumentation/ruby
- /ja/tracing/trace_collection/custom_instrumentation/ruby/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/ruby/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
- /ja/tracing/trace_collection/otel_instrumentation/ruby/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
- /ja/tracing/opentracing/dotnet
- /ja/tracing/manual_instrumentation/dotnet
- /ja/tracing/custom_instrumentation/dotnet
- /ja/tracing/setup_overview/custom_instrumentation/dotnet
- /ja/tracing/trace_collection/custom_instrumentation/dotnet
- /ja/tracing/trace_collection/custom_instrumentation/dotnet/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/dotnet/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
- /ja/tracing/trace_collection/otel_instrumentation/dotnet/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
- /ja/tracing/opentracing/php
- /ja/tracing/manual_instrumentation/php
- /ja/tracing/custom_instrumentation/php
- /ja/tracing/setup_overview/custom_instrumentation/php
- /ja/tracing/trace_collection/custom_instrumentation/php
- /ja/tracing/trace_collection/custom_instrumentation/php/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/php/otel
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/php
- /ja/tracing/trace_collection/otel_instrumentation/php/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
- /ja/tracing/manual_instrumentation/cpp
- /ja/tracing/custom_instrumentation/cpp
- /ja/tracing/setup_overview/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/cpp/dd-api
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
- /ja/tracing/trace_collection/custom_instrumentation/rust
- /ja/tracing/trace_collection/custom_instrumentation/elixir
- /ja/tracing/trace_collection/custom_instrumentation/swift
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
content_filters:
- label: Language
  option_group_id: custom_instrumentation_language_options
  trait_id: prog_lang
- label: API
  option_group_id: custom_instrumentation_api_options
  trait_id: api_type
description: Datadog APIとOpenTelemetryを使用して、アプリケーション固有の可観測性データをキャプチャするために、カスタムスパン、タグ、および計測を追加します。
further_reading:
- link: tracing/guide/instrument_custom_method
  text: ビジネスロジックの深い可視性を得るために、カスタムメソッドを計測します。
- link: tracing/connect_logs_and_traces
  text: ログとトレースを接続します。
- link: tracing/visualization/
  text: サービス、リソース、およびトレースを探索します。
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: DatadogとOpenTelemetryイニシアチブについてもっと学びましょう。
title: サーバーサイドのカスタム計測
---
<!-- ============================================== -->
<!-- API AVAILABILITY NOTICES - SHOW FIRST -->
<!-- ============================================== -->

<!-- C++ only supports Datadog API -->
{% if equals($prog_lang, "cpp") %}
{% if equals($api_type, "otel_api") %}
{% alert level="danger" %}
C++はOpenTelemetry APIをサポートしていません。APIのドロップダウンから**Datadog**を選択して、C++のカスタム計測ドキュメントを確認してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- Rust only supports OpenTelemetry API -->
{% if equals($prog_lang, "rust") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
RustはDatadog APIをサポートしていません。APIのドロップダウンから**OpenTelemetry**を選択して、Rustのカスタム計測ドキュメントを確認してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- Elixir only supports OpenTelemetry API -->
{% if equals($prog_lang, "elixir") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
ElixirはDatadog APIをサポートしていません。APIのドロップダウンから**OpenTelemetry**を選択して、Elixirのカスタム計測ドキュメントを確認してください。
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- OPENTELEMETRY API CONTENT -->
<!-- ============================================== -->

{% if equals($api_type, "otel_api") %}

<!-- Elixir: show only the Elixir-specific note, no overview -->
{% if equals($prog_lang, "elixir") %}
DatadogはElixirトレースライブラリを提供していません。Datadogにトレースを送信するには、[Elixir用OpenTelemetry SDK][8]を使用してください。
{% /if %}

<!-- Full content for languages with full OTel support (not C++, not Elixir) -->
{% if not(includes($prog_lang, ["cpp", "elixir"])) %}

## 概要

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

## 概要

Datadog APIを使用して、プログラム的にトレースを作成、変更、または削除してDatadogに送信します。これは、自動計測によってキャプチャされない社内コードのトレース、トレースからの不要なスパンの削除、スパンへのタグの追加を含む、スパンに対するより深い可視性とコンテキストを提供するのに役立ちます。

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