---
title: Understand Datadog retention policy to efficiently retain trace data
kind: guide
---

## Overview

When using Datadog APM, the `host` tag is used to correlate spans and traces to Infrastructure Monitoring data, in order to see host metrics associated with the host from the span/trace.

### Datadog Agent vs. Tracer hostname

The **Agent host** is the host on which the Datadog Agent is running. The **Tracer host** is the host on which the application instrumented with the tracing library is running.

Depending on how the Datadog Agent on your infrastructure, the Agent host and the Tracer host might differ:

When the Agent is deployed on the same host as the application (e.g. using a [Daemonset][1]), the Agent host and the Tracer host are the same.

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="Agent deployed on the same host as the application" style="width:80%;" >}}

When the Agent is deployed on a remote host, the Agent host is different from the Tracer host.

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="Agent deployed on a remote host, different from the application" style="width:80%;" >}}

### When are the Tracer and Agent hosts set on spans ?

- The Datadog Agent hostname is always set on spans.
- The Tracer hostname is set on spans iif `DD_TRACE_REPORT_HOSTNAME` is set to `true` (default `false`).

## When is the host information used in APM ? 

When creating [retention filters][2], [metrics from spans][3] or [sensitive data scanner rules][4] using host tag filters (e.g. `availbility-zone`, `cluster-name`) in queries, these host tags are enriched from the **Datadog Agent host** information.






[1]: /containers/kubernetes/apm/?tab=daemonset
[2]: /tracing/trace_pipeline/trace_retention
[3]: /tracing/trace_pipeline/generate_metrics
[4]: /sensitive_data_scanner/