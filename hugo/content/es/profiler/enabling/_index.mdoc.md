---
aliases:
- /es/tracing/faq/profiling_migration/
- /es/tracing/profiler/enabling/
- /es/tracing/profiler/enabling/java/
- /es/tracing/profiler/enabling/python/
- /es/tracing/profiler/enabling/go/
- /es/tracing/profiler/enabling/ruby/
- /es/tracing/profiler/enabling/nodejs/
- /es/tracing/profiler/enabling/dotnet/
- /es/tracing/profiler/enabling/php/
- /es/profiler/enabling/java/
- /es/profiler/enabling/python/
- /es/profiler/enabling/go/
- /es/profiler/enabling/ruby/
- /es/profiler/enabling/nodejs/
- /es/profiler/enabling/dotnet/
- /es/profiler/enabling/php/
- /es/profiler/enabling/graalvm/
- /es/tracing/profiler/enabling/linux/
- /es/tracing/profiler/enabling/ddprof/
- /es/profiler/enabling/ddprof/
content_filters:
- label: Language
  option_group_id: profiler_language_options
  trait_id: prog_lang
- label: Runtime
  option_group_id: java_profiler_runtime_options
  show_if:
  - prog_lang:
    - java
  trait_id: runtime
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Introducción al Profiler
- link: profiler/profile_visualizations
  tag: Documentación
  text: Aprende más sobre las visualizaciones de perfil disponibles
- link: profiler/profiler_troubleshooting
  tag: Documentación
  text: Solucione los problemas que encuentre al usar el Profiler
title: Habilitando el Profiler
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

## ¿No está seguro de qué hacer a continuación? {% #not-sure-what-to-do-next %}

La guía [Introducción al Profiler][1] toma un servicio de muestra con un problema de rendimiento y le muestra cómo usar Continuous Profiler para entender y solucionar el problema.

[1]: /es/getting_started/profiler/