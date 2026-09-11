---
aliases:
- /fr/tracing/faq/profiling_migration/
- /fr/tracing/profiler/enabling/
- /fr/tracing/profiler/enabling/java/
- /fr/tracing/profiler/enabling/python/
- /fr/tracing/profiler/enabling/go/
- /fr/tracing/profiler/enabling/ruby/
- /fr/tracing/profiler/enabling/nodejs/
- /fr/tracing/profiler/enabling/dotnet/
- /fr/tracing/profiler/enabling/php/
- /fr/profiler/enabling/java/
- /fr/profiler/enabling/python/
- /fr/profiler/enabling/go/
- /fr/profiler/enabling/ruby/
- /fr/profiler/enabling/nodejs/
- /fr/profiler/enabling/dotnet/
- /fr/profiler/enabling/php/
- /fr/profiler/enabling/graalvm/
- /fr/tracing/profiler/enabling/linux/
- /fr/tracing/profiler/enabling/ddprof/
- /fr/profiler/enabling/ddprof/
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
  tag: Documentation
  text: Prise en main du profileur
- link: profiler/profile_visualizations
  tag: Documentation
  text: En savoir plus sur les visualisations de profils disponibles
- link: profiler/profiler_troubleshooting
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profiler
title: Activer le profileur
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

## Vous ne savez pas quoi faire ensuite ? {% #not-sure-what-to-do-next %}

Le guide [Premier pas avec le profileur en continu][1] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

[1]: /fr/getting_started/profiler/