---
title: Enabling the Profiler
content_filters:
  - trait_id: prog_lang
    option_group_id: profiler_language_options
    label: "Language"
  - trait_id: runtime
    option_group_id: java_profiler_runtime_options
    label: "Runtime"
    show_if:
      - prog_lang: ["java"]
aliases:
  - /tracing/faq/profiling_migration/
  - /tracing/profiler/enabling/
  - /tracing/profiler/enabling/java/
  - /tracing/profiler/enabling/python/
  - /tracing/profiler/enabling/go/
  - /tracing/profiler/enabling/ruby/
  - /tracing/profiler/enabling/nodejs/
  - /tracing/profiler/enabling/dotnet/
  - /tracing/profiler/enabling/php/
  - /profiler/enabling/java/
  - /profiler/enabling/python/
  - /profiler/enabling/go/
  - /profiler/enabling/ruby/
  - /profiler/enabling/nodejs/
  - /profiler/enabling/dotnet/
  - /profiler/enabling/php/
  - /profiler/enabling/graalvm/
  - /tracing/profiler/enabling/linux/
  - /tracing/profiler/enabling/ddprof/
  - /profiler/enabling/ddprof/
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<!-- Library-based languages -->
{% if not(includes($prog_lang, ["php", "c", "cpp", "rust", "dot_net"])) %}
The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.
{% /if %}

<!-- .NET: self-contained (complex multi-tab install/enable flow) -->
{% if equals($prog_lang, "dot_net") %}
{% partial file="profiler/enabling/dotnet.mdoc.md" /%}
{% /if %}

<!-- C/C++/Rust: self-contained (standalone profiler tool) -->
{% if includes($prog_lang, ["c", "cpp", "rust"]) %}
{% partial file="profiler/enabling/ddprof.mdoc.md" /%}
{% /if %}

{% if not(includes($prog_lang, ["dot_net", "c", "cpp", "rust"])) %}

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

{% if equals($prog_lang, "java") %}
{% partial file="profiler/enabling/java_requirements.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="profiler/enabling/python_requirements.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="profiler/enabling/go_requirements.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="profiler/enabling/ruby_requirements.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="profiler/enabling/nodejs_requirements.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="profiler/enabling/php_requirements.mdoc.md" /%}
{% /if %}

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

{% if equals($prog_lang, "java") %}
{% partial file="profiler/enabling/java_installation.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="profiler/enabling/python_installation.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="profiler/enabling/go_installation.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="profiler/enabling/ruby_installation.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="profiler/enabling/nodejs_installation.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="profiler/enabling/php_installation.mdoc.md" /%}
{% /if %}

{% if not(includes($prog_lang, ["node_js", "php"])) %}

## Configuration

{% if equals($prog_lang, "java") %}
{% partial file="profiler/enabling/java_configuration.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="profiler/enabling/python_configuration.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="profiler/enabling/go_configuration.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="profiler/enabling/ruby_configuration.mdoc.md" /%}
{% /if %}

{% /if %}

{% /if %}

## Not sure what to do next?

The [Getting Started with Profiler][7] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[7]: /getting_started/profiler/
