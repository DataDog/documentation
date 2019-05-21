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

{{< partial name="apm/apm-languages.html" >}}

[1]: /agent
[2]: /agent/apm/?tab=agent630#agent-configuration
[3]: /agent/apm/#primary-tags
[4]: /agent/kubernetes/daemonset_setup
[5]: /agent/docker/apm/?tab=java
