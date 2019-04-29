---
title: Application Tracing Setup
kind: documentation
aliases:
    - /tracing/languages
    - /tracing/proxies
disable_toc: true
---

After you have [installed the Datadog Agent][1], [enabled trace collection][2], and [configured your environment][3], begin tracing by instrumenting your application.

**Note**: If you're using Kubernetes, make sure to [enable APM in your Daemonset setup][4]. If you're using Docker, [enable the Trace Agent in your application][5].


{{< whatsnext desc="Select one of the following supported languages or proxy configurations to start instrumenting your application:">}}
  {{< nextlink href="tracing/languages/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
  {{< nextlink href="tracing/languages/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
  {{< nextlink href="tracing/languages/cpp" tag="C++" >}}C++ language instrumentation.{{< /nextlink >}}
  {{< nextlink href="/tracing/setup/envoy/" tag="envoy" >}}Envoy proxy configuration.{{< /nextlink >}}
  {{< nextlink href="/tracing/setup/nginx/" tag="nginix" >}}NGINX proxy configuration.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /agent
[2]: /agent/apm/?tab=agent630#agent-configuration
[3]: /agent/apm/#primary-tags
[4]: /agent/kubernetes/daemonset_setup
[5]: /agent/docker/apm/?tab=java
