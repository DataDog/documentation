---
title: Trace Sampling Use Cases
kind: guide
further_reading:
- link: "/tracing/guide/trace_ingestion_volume_control/"
  tag: "Guide"
  text: "How to control ingested volumes"
---

## Overview

Trace data tends to be repetitive. A problem in your application is rarely identified in a single trace. For high throughput services, particularly for incidents that require your attention, an issue shows symptoms in multiple traces. Consequently, there’s usually no need for you to collect every single trace for a service or endpoint. Datadog APM [ingestion control mechanisms][1] help you keep the visibility that you need to troubleshoot problems, while cutting down the noise and managing costs.

Ingestion mechanisms are controllable from the Datadog Agent and from Datadog tracing libraries. If you are using OpenTelemetry SDKs to instrument your applications, read [Ingestion Sampling with OpenTelemetry][2].

This guide helps you understand when and how to use ingestion control configurations depending on the main use cases you might encounter. It covers:

- [Determining which ingestion mechanisms are used](#determining-which-ingestion-mechanisms-are-used) for a given service
- [Use cases that focus on keeping particular types of traces](#keeping-certain-types-of-traces)
- [Use cases that focus on reducing ingested traces](#reducing-ingestion-for-high-volume-services)


## Determining which ingestion mechanisms are used

To identify what ingestion mechanisms are currently used in your Datadog environment, navigate to the [Ingestion Control Page][3].

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Ingestion Control Page" style="width:90%;" >}}

The table gives insights on ingested volumes *by service*. The Configuration column provides a first indication of the current set up. It shows: 
- `AUTOMATIC` if the sampling rate calculated in the Datadog Agent is applied to the traces that start from the service. Read more about the specifics of [Datadog Agent ingestion logic][5].
- `CONFIGURED` if a custom sampling rate configured in the tracing library is applied to the traces that start from the service.

Click on services to see details about what sampling decision makers are used for each service, as well as what [ingestion sampling mechanisms][1] are leveraged for ingested spans' services. 

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service_ingestion_summary.png" alt="Service Ingestion Summary" style="width:90%;" >}}

## Keeping certain types of traces

### Keeping entire transaction traces

Ingesting entire transaction traces ensures visibility over the **end-to-end service request flow** for specific individual requests.

#### Solution: Head-based sampling

Complete traces can be ingested with [head-based sampling][4] mechanisms: the decision of keeping or dropping the trace is taken at the point of trace creation (trace root span), and this decision is propagated in the request context to downstream services.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head_based_sampling_keep.png" alt="Head-based Sampling" style="width:100%;" >}}

To decide which traces to keep and drop, the Datadog Agent computes default sampling rates for each service to apply at trace creation, based on the application traffic:
- For low-traffic applications, a sampling rate of 100% is applied.
- For high-traffic applications, a lower sampling rate is applied with a target of 10 complete traces per second per Agent.

You can also override the default Agent sampling rate by configuring the sampling rate by service. See how to [keep more traces for specific services](#keeping-more-traces-for-high-visibility-into-specific-services-or-resources) for more information.

#### Configuring head-based sampling

Default sampling rates are calculated to target 10 complete traces per second per Agent. You can increase or decrease this target by configuring the Datadog Agent parameter `max_traces_per_second` or the environment variable `DD_APM_MAX_TPS`. Read more about [head-based sampling ingestion mechanisms][5].

**Note:** Changing an Agent configuration impacts the percentage sampling rates for *all services* reporting traces to this Datadog Agent.

For most scenarios, relying on the Agent-level configuration is suited to stay within the allotted quota, to have enough visibility into your application's performance, and to make appropriate decisions for your business. 

### Keeping more traces for high visibility into specific services or resources

If some services and requests are critical to your business, you may want to send all related traces to Datadog so that you can look into any of the individual transactions.

#### Solution: Sampling rules

By default, sampling rates are calculated to target 10 traces per second per Datadog Agent. You can override the default calculated sampling rate by configuring **[sampling rules][6]** in the tracing library. 

You can configure sampling rules by service. For traces starting from the service targeted by the sampling rule, the defined percentage sampling rate will be applied instead of the default sampling rate calculated by the Datadog Agent.

#### Configuring a sampling rule

You can configure sampling rules by setting the environment variable `DD_TRACE_SAMPLING_RULES`. 

For example, to send `20%` of the traces for the service named `my-service`:

```
DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.2}]
```

Read more about this [ingestion mechanisms][6] in the documentation.

### Keeping more errors traces

#### Why ?

Traces with error spans are often symptoms of system failures. Keeping a higher proportion of transactions with errors ensures to always be able to investigate example individual requests.

#### What solutions does Datadog provide ?

In addition to head-based sampled traces, each Agent keeps additional error spans out of the traffic **not captured** by head-based sampling. 

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error_sampling.png" alt="Error Sampling" style="width:100%;" >}}

**Note:** Distributed pieces of the trace chunks might not be ingested as the sampling happens locally at the Datadog Agent level.

#### How to configure error sampling ?

You can configure the number of error chunks per second per Agent that you want to capture by setting the environment variable `DD_APM_ERROR_TPS`. The default value is set to `10` errors per second.

To ensure to ingest **all errors**, set the Agent parameter to an arbitrary high value. To disable the error sampler, set `DD_APM_ERROR_TPS` to `0`.

## Reducing ingestion for high volume services

### Reducing volume fromm database or cache services

#### Why ? 

Traced database calls may represent a large amount of ingested data while the application performance metrics (errors, request hits, latency…) are enough to monitor database health.

#### What solutions does Datadog provide ?

In order to reduce the span volume created by tracing database calls, sampling must be configured at the head of the trace. 

Database services are very rarely starting a trace. Most of the time, client database spans are children of an instrumented backend service span. 

To know **which services start traces** where a database is called, leverage the `Top Sampling Decision Makers` top list graph of the ingestion control page [Service Ingestion Summary][7]. Configuring head-based sampling for these specific services will reduce the volume of ingested database spans, while making sure that no incomplete traces are ingested: distributed traces are either kept or dropped altogether.

#### How to configure sampling to drop database spans ?

Refer to the [sampling rule configuration section](#how-to-configure-a-sampling-rule) for more information about sampling rules syntax.

For example, if a backend service `my-service` is calling a postgresql database multiple times per trace, which is creating a lot of unwanted span volume: 

- configure a trace sampling rule for the backend service `my-service`. This will ensure 10% of entire traces are kept, including postgresql spans.

```
DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.1}]
```

- _\[Optional\]_ configure a **single span sampling rule** to keep 100% of the spans for the backend service `my-service`, for instance if some [span-based metrics][8] are built on top of `my-service` data.

```
DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 1}]
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/drop_database_spans.png" alt="Database spans sampling" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_mechanisms/
[2]: /opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[7]: /tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary
[8]: /tracing/trace_pipeline/generate_metrics/