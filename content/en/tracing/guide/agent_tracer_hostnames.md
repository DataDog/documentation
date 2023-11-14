---
title: Understand the Difference Between the Agent Host and the Tracer Host
kind: guide
---

## Overview

In Datadog APM, the `host` tag correlates spans and traces to infrastructure monitoring data, so host metrics are associated with hosts from spans and traces.

## Datadog Agent vs. Tracer hostname

The **Agent host** is the host on which the Datadog Agent is running. The **Tracer host** is the host on which the application instrumented with the tracing library is running.

The Agent host and the Tracer host may differ based on how you deploy the Datadog Agent on your infrastructure:


When the Agent is deployed on the same host as the application (for example, using a [DaemonSet][1]), the Agent host and the Tracer host are the same.

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="Agent deployed on the same host as the application" style="width:80%;" >}}

When the Agent is deployed on a remote host, the Agent host is different from the Tracer host.

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="Agent deployed on a remote host, different from the application" style="width:80%;" >}}

### When are the Tracer and Agent hosts set on spans?

- The Datadog Agent hostname is always set on spans.
- The Tracer hostname is set on spans if `DD_TRACE_REPORT_HOSTNAME` is `true` (default is `false`).

 Language | Config | Environment Variable
----------|--------|---------------------
Ruby | `tracing.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
C++ | `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`
Node.js | `reportHostname` | `DD_TRACE_REPORT_HOSTNAME`
Go | - | `DD_TRACE_REPORT_HOSTNAME`
Python | - | `DD_TRACE_REPORT_HOSTNAME`
PHP | `datadog.trace.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
Java |  `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`

### When does APM use host information? 

APM uses host information when you create [retention filters][2], generate [metrics from spans][3], or create [sensitive data scanner rules][4] using host tag filters in queries. For example, host tag filters like `availability-zone` and `cluster-name` are enriched from the Datadog Agent host information.






[1]: /containers/kubernetes/apm/?tab=daemonset
[2]: /tracing/trace_pipeline/trace_retention
[3]: /tracing/trace_pipeline/generate_metrics
[4]: /sensitive_data_scanner/