---
aliases:
- /ko/tracing/opentracing/java
- /ko/tracing/manual_instrumentation/java
- /ko/tracing/custom_instrumentation/java
- /ko/tracing/setup_overview/custom_instrumentation/java
- /ko/tracing/trace_collection/custom_instrumentation/java
- /ko/tracing/trace_collection/custom_instrumentation/java/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/java/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/java
- /ko/tracing/trace_collection/otel_instrumentation/java/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
- /ko/tracing/opentracing/python
- /ko/tracing/manual_instrumentation/python
- /ko/tracing/custom_instrumentation/python
- /ko/tracing/setup_overview/custom_instrumentation/python
- /ko/tracing/trace_collection/custom_instrumentation/python
- /ko/tracing/trace_collection/custom_instrumentation/python/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/python/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/python
- /ko/tracing/trace_collection/otel_instrumentation/python/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
- /ko/tracing/opentracing/nodejs
- /ko/tracing/manual_instrumentation/nodejs
- /ko/tracing/custom_instrumentation/nodejs
- /ko/tracing/setup_overview/custom_instrumentation/nodejs
- /ko/tracing/trace_collection/custom_instrumentation/nodejs
- /ko/tracing/trace_collection/custom_instrumentation/nodejs/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/nodejs/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
- /ko/tracing/trace_collection/otel_instrumentation/nodejs/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
- /ko/tracing/opentracing/go
- /ko/tracing/manual_instrumentation/go
- /ko/tracing/custom_instrumentation/go
- /ko/tracing/setup_overview/custom_instrumentation/go
- /ko/tracing/trace_collection/custom_instrumentation/go
- /ko/tracing/trace_collection/custom_instrumentation/go/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/go/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/go
- /ko/tracing/trace_collection/otel_instrumentation/go/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
- /ko/tracing/opentracing/ruby
- /ko/tracing/manual_instrumentation/ruby
- /ko/tracing/custom_instrumentation/ruby
- /ko/tracing/setup_overview/custom_instrumentation/ruby
- /ko/tracing/trace_collection/custom_instrumentation/ruby
- /ko/tracing/trace_collection/custom_instrumentation/ruby/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/ruby/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
- /ko/tracing/trace_collection/otel_instrumentation/ruby/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
- /ko/tracing/opentracing/dotnet
- /ko/tracing/manual_instrumentation/dotnet
- /ko/tracing/custom_instrumentation/dotnet
- /ko/tracing/setup_overview/custom_instrumentation/dotnet
- /ko/tracing/trace_collection/custom_instrumentation/dotnet
- /ko/tracing/trace_collection/custom_instrumentation/dotnet/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/dotnet/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
- /ko/tracing/trace_collection/otel_instrumentation/dotnet/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
- /ko/tracing/opentracing/php
- /ko/tracing/manual_instrumentation/php
- /ko/tracing/custom_instrumentation/php
- /ko/tracing/setup_overview/custom_instrumentation/php
- /ko/tracing/trace_collection/custom_instrumentation/php
- /ko/tracing/trace_collection/custom_instrumentation/php/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/php/otel
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/php
- /ko/tracing/trace_collection/otel_instrumentation/php/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
- /ko/tracing/manual_instrumentation/cpp
- /ko/tracing/custom_instrumentation/cpp
- /ko/tracing/setup_overview/custom_instrumentation/cpp
- /ko/tracing/trace_collection/custom_instrumentation/cpp
- /ko/tracing/trace_collection/custom_instrumentation/cpp/dd-api
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
- /ko/tracing/trace_collection/custom_instrumentation/rust
- /ko/tracing/trace_collection/custom_instrumentation/elixir
- /ko/tracing/trace_collection/custom_instrumentation/swift
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
content_filters:
- label: Language
  option_group_id: custom_instrumentation_language_options
  trait_id: prog_lang
- label: API
  option_group_id: custom_instrumentation_api_options
  trait_id: api_type
description: 사용자 지정 스팬, 태그, 계측을 추가하여 Datadog API 및 OpenTelemetry를 사용해 애플리케이션별 관측 가능성을
  캡처하세요.
further_reading:
- link: tracing/guide/instrument_custom_method
  text: 사용자 지정 메서드를 계측하여 비즈니스 로직에 대한 심층 가시성 확보
- link: tracing/connect_logs_and_traces
  text: 로그 및 트레이스를 연결
- link: tracing/visualization/
  text: 서비스, 리소스, 트레이스 둘러보기
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog 및 OpenTelemetry 이니셔티브에 관해 자세히 알아보기
title: 서버 측 사용자 지정 계측
---
<!-- ============================================== -->
<!-- API AVAILABILITY NOTICES - SHOW FIRST -->
<!-- ============================================== -->

<!-- C++ only supports Datadog API -->
{% if equals($prog_lang, "cpp") %}
{% if equals($api_type, "otel_api") %}
{% alert level="danger" %}
C++은 OpenTelemetry API를 지원하지 않습니다. API 드롭다운에서 **Datadog**을 선택하여 C++ 사용자 지정 계측 설명서를 참조하세요.
{% /alert %}
{% /if %}
{% /if %}

<!-- Rust only supports OpenTelemetry API -->
{% if equals($prog_lang, "rust") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Rust는 Datadog API를 지원하지 않습니다. API 드롭다운에서 **OpenTelemetry**를 선택하여 Rust 사용자 지정 계측 설명서를 참조하세요.
{% /alert %}
{% /if %}
{% /if %}

<!-- Elixir only supports OpenTelemetry API -->
{% if equals($prog_lang, "elixir") %}
{% if equals($api_type, "dd_api") %}
{% alert level="danger" %}
Elixir는 Datadog API를 지원하지 않습니다. API 드롭다운에서 **OpenTelemetry**를 선택하여 Elixir 사용자 지정 계측 설명서를 참조하세요.
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- OPENTELEMETRY API CONTENT -->
<!-- ============================================== -->

{% if equals($api_type, "otel_api") %}

<!-- Elixir: show only the Elixir-specific note, no overview -->
{% if equals($prog_lang, "elixir") %}
Datadog은 Elixir SDK를 제공하지 않습니다. Datadog에 트레이스를 보내려면 [Elxir용 OpenTelemetry SDK][8]를 사용하세요.
{% /if %}

<!-- Full content for languages with full OTel support (not C++, not Elixir) -->
{% if not(includes($prog_lang, ["cpp", "elixir"])) %}

## 개요 {% #overview %}

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

## 개요 {% #overview-1 %}

Datadog API를 사용하여 Datadog으로 보내는 트레이스를 프로그래밍 방식으로 생성, 수정 또는 삭제하세요. 이 기능은 자동 계측으로 캡처되지 않은 내부 코드를 추적하고, 트레이스에서 원치 않는 스팬을 제거하는 데, 그리고 스팬에 대한 심층 가시성과 컨텍스트를 제공하는 데(스팬 태그 추가 포함) 유용합니다.

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