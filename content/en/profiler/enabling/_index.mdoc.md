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

<!-- Java -->
{% if equals($prog_lang, "java") %}
{% partial file="profiler/enabling/java.mdoc.md" /%}
{% /if %}

<!-- Python -->
{% if equals($prog_lang, "python") %}
{% partial file="profiler/enabling/python.mdoc.md" /%}
{% /if %}

<!-- Go -->
{% if equals($prog_lang, "go") %}
{% partial file="profiler/enabling/go.mdoc.md" /%}
{% /if %}

<!-- Ruby -->
{% if equals($prog_lang, "ruby") %}
{% partial file="profiler/enabling/ruby.mdoc.md" /%}
{% /if %}

<!-- Node.js -->
{% if equals($prog_lang, "node_js") %}
{% partial file="profiler/enabling/nodejs.mdoc.md" /%}
{% /if %}

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}
{% partial file="profiler/enabling/dotnet.mdoc.md" /%}
{% /if %}

<!-- PHP -->
{% if equals($prog_lang, "php") %}
{% partial file="profiler/enabling/php.mdoc.md" /%}
{% /if %}

<!-- C / C++ / Rust (ddprof) -->
{% if includes($prog_lang, ["c", "cpp", "rust"]) %}
{% partial file="profiler/enabling/ddprof.mdoc.md" /%}
{% /if %}

## Not sure what to do next?

The [Getting Started with Profiler][1] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

[1]: /getting_started/profiler/
