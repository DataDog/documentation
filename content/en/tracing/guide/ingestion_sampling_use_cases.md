---
title: Trace Sampling use cases
kind: guide
further_reading:
- link: "/tracing/guide/trace_ingestion_volume_control/"
  tag: "Guide"
  text: "How to control ingested volumes"
---

## Overview

Trace data is very repetitive. A problem in your application is rarely identified in a single trace. 
For high throughput services, in the case of an incident that would require your attention, the issue will show symptoms in multiple traces. As a result, there’s usually no need for you to collect every single trace of a service / endpoint. 
In order to optimize visibility into trace data and cut down the noise, Datadog [Ingestion Control Mechanisms][1] helps you keep the visibility that you need to troubleshoot problems while remaining within budget.

This guide helps you understand when and how to use ingestion control configurations depending on the main use cases you might be encountering. 

These Ingestion Mechanisms are controllable from the Datadog Agent and from Datadog tracing libraries. If you are using OpenTelemetry SDKs to instrument your applications, you can refer to the dedicated guide on [Ingestion Sampling with OpenTelemetry][2].

## Knowing which ingestion mechanisms are used

In order to identify what current ingestion mechanisms are used in your Datadog environment, navigate to  the [Ingestion Control Page][3].

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Ingestion Control Page" style="width:90%;" >}}

The table gives insights on ingested volumes **by service:**

The configuration column indicating `CONFIGURED` or `AUTOMATIC` provides a first indication of the current set up : 
- `AUTOMATIC` if the sampling rate calculated in the Datadog Agent is applied for the traces starting from the service. Read more about the specifics of the Datadog Agent logic in the documentation.
- `CONFIGURED` if a custom sampling rate configured in the tracing library is applied for the traces starting from the service.

Clicking on the various services to view  details as to what are the sampling decision makers in each service, as well as what [ingestion sampling mechanisms][1] are leveraged for ingested spans' services. 

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service_ingestion_summary.png" alt="Service Ingestion Summary" style="width:90%;" >}}

## Configuring ingestion sampling to keep visibility over relevant traces and spans

### Keeping entire transaction traces

#### Why ? 

Ingesting entire transaction traces ensures to keep visibility over the **end-to-end service request flow** for specific individual requests.

#### What solutions does Datadog provide ?

Complete traces can be ingested with [head-based sampling][4] mechanisms: the decision of keeping or dropping the trace is taken at the trace creation (trace head), and that this decision is propagated in the request context to downstream callee services.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head_based_sampling.png" alt="Head-based Sampling" style="width:70%;" >}}


To decide which requests to keep and drop, the Datadog Agent computes automatic sampling rates for each service to apply at the root of the trace.
You can also configure the sampling rate by service: see keep more traces for specific services

#### How to configure head-based sampling ?

Sampling rates are calculated to target 10 complete traces per second per Agent. You can increase or decrease this target by configuring the Datadog Agent parameter `max_traces_per_second` or the environment variable `DD_APM_MAX_TPS`.
Read more about this [ingestion mechanisms][5] in the documentation.

**Note:** Changing the Agent configuration will impact the percentage sampling rates applied for all services reporting traces to the Datadog Agent.

For most scenarios, relying on the Agent-level configuration is enough to stay within the allotted quota and have enough visibility on what’s happening on your applications to make appropriate decisions for your business. 

### Keep more traces for some specific services / resources for better visibility

#### Why ?

If some services and requests are critical to your business, you may want to send all related traces to Datadog to be able to look into any of the individual transactions.

#### What solutions does Datadog provide ?

By default, sampling rates are calculated to target 10 traces per second per Datadog Agent. You can override the default calculated sampling rate by configuring **[sampling rules][6]** in the tracing library. 

You can configure sampling rules by service. For traces starting from the service targeted by the sampling rule, the defined percentage sampling rate will be applied instead of the default sampling rate calculated by the Datadog Agent.

#### How to configure a sampling rule ?

You can configure sampling rules by setting the environment variable `DD_TRACE_SAMPLING_RULES`. 

For example, to send `20%` of the traces for the service named `my-service`:

```
DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.2}]
```

Read more about this [ingestion mechanisms][6] in the documentation.

### Keep more errors traces

#### Why ?

Traces with error spans are often symptoms of system failures. Keeping a higher proportion of transactions with errors ensures to always be able to investigate example individual requests.

#### What solutions does Datadog provide ?



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_mechanisms/
[2]: /opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules