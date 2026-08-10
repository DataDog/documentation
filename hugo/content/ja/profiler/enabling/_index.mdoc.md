---
aliases:
- /ja/tracing/faq/profiling_migration/
- /ja/tracing/profiler/enabling/
- /ja/tracing/profiler/enabling/java/
- /ja/tracing/profiler/enabling/python/
- /ja/tracing/profiler/enabling/go/
- /ja/tracing/profiler/enabling/ruby/
- /ja/tracing/profiler/enabling/nodejs/
- /ja/tracing/profiler/enabling/dotnet/
- /ja/tracing/profiler/enabling/php/
- /ja/profiler/enabling/java/
- /ja/profiler/enabling/python/
- /ja/profiler/enabling/go/
- /ja/profiler/enabling/ruby/
- /ja/profiler/enabling/nodejs/
- /ja/profiler/enabling/dotnet/
- /ja/profiler/enabling/php/
- /ja/profiler/enabling/graalvm/
- /ja/tracing/profiler/enabling/linux/
- /ja/tracing/profiler/enabling/ddprof/
- /ja/profiler/enabling/ddprof/
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
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/profile_visualizations
  tag: ドキュメント
  text: 使用可能なプロファイルの視覚化の詳細
- link: profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラーの使用中に発生する問題を修正
title: プロファイラーの有効化
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

## 次のステップ{% #not-sure-what-to-do-next %}

[プロファイラーの概要][1]ガイドで、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

[1]: /ja/getting_started/profiler/