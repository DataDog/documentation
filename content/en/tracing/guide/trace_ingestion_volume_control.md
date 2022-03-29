---
title: Ingestion volume control with APM Distributed Tracing
kind: guide
further_reading:
- link: "/tracing/trace_ingestion/ingestion_controls/"
  tag: "Documentation"
  text: "Ingestion Control Page"
---

## Overview

The [Ingestion control page][1] provides granular visibility over the ingestion configuration for all services, in the agent and in the tracing libraries. All [Ingestion Mechanisms][2] are publicly documented and configurable.

With the page, you have full visibility and control your span volume. Consequently, you are be able to:
- Ingest the data that is most relevant to your business and your observability goals.
- Reduce network costs by avoiding sending unused trace data to the Datadog platform.
- Control and manage your overall costs


## What happens if I decide to reduce my ingested trace volume?

Sampling does not mean less value out of Datadog APM

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="APM ingestion sampling" style="width:70%;" >}}

Even by reducing the ingestion volume for certain services, the **request, error, and latency metrics** (RED metrics) will remain 100% accurate as they are being calculated based on 100% of the applications’ traffic, regardless of any sampling configuration (i.e. this is done by a different system). These metrics are included when purchasing Datadog APM. In order to make sure you have full visibility into your application’s traffic, you can use these metrics to spot potential errors on a service or a resource, by creating monitors and SLOs.

Then, because trace data is very repetitive, you will have enough trace samples to investigate any issues. For high throughput services, there should not be any need for you to collect every single request - an important enough problem will always show symptoms in multiple traces. Datadog puts the control in your hands, allowing you to have the visibility that you need to solve problems while remaining within budget.

## How to assess the current state of my services` ingestion configuration ?

To assess the current state of applications’ instrumentation, leverage the [Trace Ingestion Control page][1] that provides observability over agent and tracing library configuration.



### How can I tell if I’m within my monthly ingestion allocation?

Use the ingestion monthly usage KPI to get an estimation of the magnitude of overage compared to the monthly allocation of 150 GB of ingested spans per APM host (summed across all APM hosts).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="Ingestion Overage KPI" style="width:40%;" >}}

### How to further investigate my APM usage ?

The ingestion configuration can be investigated for each service. Click on a service row to see the Service Ingestion Summary, which surfaces:
- `Breakdown by ingestion reason`: which ingestion mechanism is responsible for the ingestion volume
- `Upstream service sampling decision makers`: which upstream services are taking sampling decisions for the spans ingested in regards to the [default ingestion mechanism][3]

An [out-of-the-box dashboard][4] is also available to get more insights on historical trends around the ingestion usage and volume. Clone this dashboard to be able to edit widgets and perform further analysis.

## How do I reduce my ingestion volume ?

### 1. Identify services responsible for most of the ingestion volume

To identify which services are responsible for most of the ingestion volume, sort the table by `Downstream Bytes/s`. This column allows you to spot which services take most of the sampling decisions.
If the service is starting the span, `Downstream Bytes/s` will also encompasses the volume from downstream services for which the service took the sampling decision.

By configuring sampling rates for a few top services, most of the “exceeding” ingestion volume will already be lowered.

### 2. Identify which ingestion mechanisms are responsible for most of the ingestion volume

The `Traffic Breakdown` column should give a good indication of the sampling configuration of the service.

If the service has a high Downstream Bytes/s rate and a high sampling rate (blue section of the traffic breakdown column), reducing the sampling rate for this service should have a high impact on the ingestion volume.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="APM no ingestion sampling" style="width:70%;" >}}

To get more details, click on the service and look at the `Ingestion Reasons Breakdown` in the side panel. This gives an overview of the share of ingestion volume attributed to each mechanism.

The main mechanism to sample traces is `head-based sampling`. The decision is taken at the beginning of the trace, and propagated downstream in the context of the requests in order to make sure we keep complete traces. Read more about the [default sampling mechanism][3].

Some additional ingestion reasons, surfaced in the ingestion control page, and as a tag of `datadog.estimated_usage.apm.ingested_bytes` metric may be responsible for your volume
- `auto`: agent distributed rates to libraries
- `rule`: libraries sampling percentage for specific services
- `manual`: in-code decision override to keep/drop a span and its children.
- `analytics`: deprecated ingestion mechanism that samples single spans without the full trace
- `error`: Sampling of errors uncatched by the head-based sampling
- `rare`: Sampling of rare traces (catching all combinations of a set span tags)

Additionally, other products can be responsible for span volume sampled
- `synthetics` & `synthetics-browser`: API and browser tests are connected to the trace generated by the test
- `rum`: Requests from web and mobile applications are linked to the corresponding backend traces.
- `lambda` & `xray`: Traces generated from lambdas instrumented with Xray of datadog libraries.

To understand which ingestion reason has the most impact, use the out-of-the-box dashboard [APM Ingestion reason analysis][5] that provides a breakdown of which of these ingestion reasons has the most impact over your ingestion volume

### 3. Configure the ingestion sampling rate at the library level

If the main reason for most of the ingestion volume is `auto` or `rule`, the volume can be configured by setting a rule at the tracing library level.
Click on the `Manage Ingestion Rate` CTA to configure a sampling rate for the service. Select the service language, the ingestion sampling rate to apply and copy the code snippet to apply.

**Note:** The application needs to be redeployed in order to apply the configuration changes. The changes can also be applied by setting [environment variables][6]


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_ingestion/ingestion_controls
[2]: /tracing/trace_ingestion/ingestion_mechanisms
[3]: /tracing/trace_ingestion/mechanisms/#head-based-default-mechanism
[4]: /tracing/trace_retention/usage_metrics/
[5]: https://app.datadoghq.com/
[6]: /tracing/trace_ingestion/mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
