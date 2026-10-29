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
    - link: "https://learn.datadoghq.com/courses/profiling-timeline"
      tag: "Learning Center"
      text: "Optimize Request Latency with Profiling Timeline"
---

<!-- Java -->
{% if equals($prog_lang, "java") %}
{% skill-callout
  title="Set up Continuous Profiler for Java with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided Java profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_java"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/java.mdoc.md" /%}
{% /if %}

<!-- Python -->
{% if equals($prog_lang, "python") %}
{% skill-callout
  title="Set up Continuous Profiler for Python with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided Python profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_python"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/python.mdoc.md" /%}
{% /if %}

<!-- Go -->
{% if equals($prog_lang, "go") %}
{% skill-callout
  title="Set up Continuous Profiler for Go with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided Go profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_go"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/go.mdoc.md" /%}
{% /if %}

<!-- Ruby -->
{% if equals($prog_lang, "ruby") %}
{% skill-callout
  title="Set up Continuous Profiler for Ruby with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided Ruby profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_ruby"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/ruby.mdoc.md" /%}
{% /if %}

<!-- Node.js -->
{% if equals($prog_lang, "node_js") %}
{% skill-callout
  title="Set up Continuous Profiler for Node.js with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided Node.js profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_node_js"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/nodejs.mdoc.md" /%}
{% /if %}

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}
{% skill-callout
  title="Set up Continuous Profiler for .NET with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided .NET profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_dot_net"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/dotnet.mdoc.md" /%}
{% /if %}

<!-- PHP -->
{% if equals($prog_lang, "php") %}
{% skill-callout
  title="Set up Continuous Profiler for PHP with an agent"
  text="Install the `dd-profiler-setup` skill in your AI coding agent for guided PHP profiler setup."
  action_name="copy_dd_profiler_setup_skill_install_cmd_php"
%}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-profiler-setup --full-depth -y
{% /skill-callout %}

{% partial file="profiler/enabling/php.mdoc.md" /%}
{% /if %}

<!-- C / C++ / Rust (ddprof) -->
{% if includes($prog_lang, ["c", "cpp", "rust"]) %}
{% partial file="profiler/enabling/ddprof.mdoc.md" /%}
{% /if %}

## Not sure what to do next?

The [Getting Started with Profiler][1] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

[1]: /getting_started/profiler/
