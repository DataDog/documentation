---
title: Ingestion volume control with APM Distributed Tracing
kind: guide
further_reading:
- link: "/tracing/trace_ingestion/ingestion_controls/"
  tag: "Documentation"
  text: "Ingestion Control Page"
---

## Overview

The [Ingestion control page][1] provides granular visibility into the ingestion configuration for all services, in the agent and in the tracing libraries. All [Ingestion Mechanisms][2] are publicly documented and configurable.

With the ingestion control page, you have full visibility and complete control of your span volume. Consequently, you are be able to:
- Ingest the data that is most relevant to your business and your observability goals.
- Reduce network costs by avoiding sending unused trace data to the Datadog platform.
- Control and manage your overall costs.


## Effects of reducing trace ingestion volume


{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="APM ingestion sampling displaying 25 percent complete traces ingested" style="width:70%;" >}}

If you decide to reduce the ingestion volume for certain services, the **request, error, and latency metrics** (known as RED metrics, for Requests, Errors, and Duration) remain 100% accurate, as they are being calculated based on 100% of the application's traffic, regardless of any sampling configuration. These metrics are included when purchasing Datadog APM. In order to make sure you have full visibility into your application's traffic, you can use these metrics to spot potential errors on a service or a resource, by creating dashboards, monitors, and SLOs.

Trace data is very repetitive, which means trace samples to investigate any issues are still available with ingestion sampling. For high throughput services, there's usually no need for you to collect every single request - an important enough problem should always show symptoms in multiple traces. Ingestion controls helps you to have the visibility that you need to troubleshoot problems while remaining within budget.

## Assess your services' ingestion configuration

To assess the current state of applications' instrumentation, leverage the [Trace Ingestion Control page][1] that provides detailed information on agent and tracing library configuration.



### Understanding if you are within your monthly ingestion allocation

Use the ingestion monthly usage KPI to get an estimation of your usage compared to the monthly allocation of 150 GB of ingested spans per APM host (summed across all APM hosts).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="Ingestion Overage KPI displaying 170 percent estimated monthly usage of 23.3 monthly available TB across all infrastructure" style="width:40%;" >}}

### Advanced APM usage investigation

The ingestion configuration can be investigated for each service. Click on a service row to see the Service Ingestion Summary, which surfaces:
- **Ingestion reason breakdown**: which [ingestion mechanism][2] is responsible for the ingestion volume
- **Top sampling decision makers**: which upstream services are taking sampling decisions for the spans ingested in regards to the [default ingestion mechanism][3]

An [out-of-the-box dashboard][4] is also available to get more insights on historical trends related to your ingestion usage and volume. Clone this dashboard to be able to edit widgets and perform further analysis.

## Reduce your ingestion volume

### Identify services responsible for most of the ingestion volume

To identify which services are responsible for most of the ingestion volume, sort the table by **Downstream Bytes/s**. This column allows you to spot which services take most of the sampling decisions, which also impact downstream services.

If the service is starting the span, **Downstream Bytes/s** also encompasses the volume of spans coming from downstream services for which the service took the sampling decision.

By configuring sampling rates for a few high-throughput services, most of the “exceeding” ingestion volume can be lowered.

### Identify which ingestion mechanisms are responsible for most of the ingestion volume

The **Traffic Breakdown** column gives a good indication of the service's sampling configuration.

If the service has a high Downstream Bytes/s rate and a high sampling rate (displayed as the blue filled section of the traffic breakdown column), reducing the sampling rate for this service is expected to have a high impact on the ingestion volume.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="APM ingestion sampling displaying 99 percent complete traces ingested, meaning no sampling" style="width:70%;" >}}

To get more details, click on the service and look at the **Ingestion reasons breakdown** in the side panel, which gives an overview of the share of ingestion volume attributed to each mechanism.

The default mechanism to sample traces is _head-based sampling_. The decision whether to sample a trace or not is taken at the beginning of its lifecycle, and propagated downstream in the context of the requests in order to ensure that you can always view and analyze complete traces. Read more about the [default sampling mechanism][3].

Some additional ingestion reasons, surfaced in the ingestion control page, and as a tag of `datadog.estimated_usage.apm.ingested_bytes` metric may be responsible for your ingestion volume:

- `auto`: agent distributed rates to libraries
- `rule`: libraries' sampling percentage for specific services
- `manual`: in-code decision override to keep/drop a span and its children
- `analytics`: deprecated ingestion mechanism that samples single spans without the full trace
- `error`: sampling of errors uncaught by the head-based sampling
- `rare`: sampling of rare traces (catching all combinations of a set span tags)

Additionally, other products can be responsible for sampled span volume:

- `synthetics` & `synthetics-browser`: API and browser tests are connected to the trace generated by the test.
- `rum`: Requests from web and mobile applications are linked to the corresponding backend traces.
- `lambda` & `xray`: Traces generated from AWS lambda functions instrumented with X-Ray or Datadog libraries.

### Configure the ingestion sampling rate at the library level

If the main reason for most of the ingestion volume is `auto` or `rule`, the volume can be configured by setting a sampling rule at the tracing library level.

Click the **Manage Ingestion Rate** button to configure a sampling rate for the service. Select the service language and the ingestion sampling rate you want to apply.

**Note:** The application needs to be redeployed in order to apply the configuration changes. Datadog recommends applying the changes by setting [environment variables][5].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_ingestion/ingestion_controls
[2]: /tracing/trace_ingestion/mechanisms
[3]: /tracing/trace_ingestion/mechanisms/#head-based-default-mechanism
[4]: /tracing/trace_retention/usage_metrics/
[5]: /tracing/trace_ingestion/mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
