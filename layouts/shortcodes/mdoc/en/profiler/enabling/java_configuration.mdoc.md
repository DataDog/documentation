<!--
Configuration for Java profiler.
Parent page must declare: prog_lang, runtime filters.
-->

In addition to the environment, service, and version variables shown in the installation steps, you can apply custom tags to uploaded profiles with `DD_TAGS` (a comma-separated list of `<key>:<value>` pairs such as `layer:api, team:intake`).

{% if equals($runtime, "jvm") %}
For additional configuration options, see the [Configuration reference][1] in the troubleshooting guide.
{% /if %}

{% if equals($runtime, "graalvm_native_image") %}
For profile type configuration options, see the [Configuration reference][1] in the Java profiler troubleshooting guide.
{% /if %}

[1]: /profiler/profiler_troubleshooting/java/#configuration-reference
