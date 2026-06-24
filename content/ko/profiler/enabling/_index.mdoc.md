---
aliases:
- /ko/tracing/faq/profiling_migration/
- /ko/tracing/profiler/enabling/
- /ko/tracing/profiler/enabling/java/
- /ko/tracing/profiler/enabling/python/
- /ko/tracing/profiler/enabling/go/
- /ko/tracing/profiler/enabling/ruby/
- /ko/tracing/profiler/enabling/nodejs/
- /ko/tracing/profiler/enabling/dotnet/
- /ko/tracing/profiler/enabling/php/
- /ko/profiler/enabling/java/
- /ko/profiler/enabling/python/
- /ko/profiler/enabling/go/
- /ko/profiler/enabling/ruby/
- /ko/profiler/enabling/nodejs/
- /ko/profiler/enabling/dotnet/
- /ko/profiler/enabling/php/
- /ko/profiler/enabling/graalvm/
- /ko/tracing/profiler/enabling/linux/
- /ko/tracing/profiler/enabling/ddprof/
- /ko/profiler/enabling/ddprof/
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
  tag: 설명서
  text: 프로파일러 시작
- link: profiler/profile_visualizations
  tag: 설명서
  text: 사용 가능한 프로파일 시각화에 대해 자세히 알아보기
- link: profiler/profiler_troubleshooting
  tag: 설명서
  text: 프로파일러를 사용하는 동안 발생한 문제 해결
title: 프로파일러 활성화
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

## 다음에 무엇을 해야 할지 잘 모르시겠습니까? {% #not-sure-what-to-do-next %}

[프로파일러 시작히기][1] 가이드는 성능 문제를 포함하는 샘플 서비스를 제공하여 Continuous Profiler가 문제를 이해하고 해결하는 방법을 보여줍니다.

[1]: /ko/getting_started/profiler/