---
title: Ingestion and Indexing Controls
kind: documentation
description: "Learn how to control Ingestion and Indexing rates with Tracing without Limits."
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

With Tracing without Limits™, both the ingestion of traces to Datadog as well as the indexing of those traces for 15 days are fully customizable.

## Ingestion Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Ingestion Controls affect what is sent by your applications to Datadog.

### Span Ingestion

{{< img src="tracing/trace_indexing_and_ingestion/DataIngestion2.png" style="width:100%;" alt="Data Ingestion" >}}

Many instrumented services will send 100% of their traffic to Datadog by default.  The Datadog Agent will not drop or sample any spans by default at volumes of up to 50 traces per second.   High-volume services or services that experience intermittent traffic are likelier to not send 100% of spans by default.

**Note:** If you are seeing numbers below 100% for Ingestion Rate, ensure you are using Agent 6.19+ or 7.19+ as these versions increased the default rate.

In the Datadog app, on the ['Data Ingestion' view][1], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Service                 | The name of each service instrumented and sending traces to Datadog.   |
| Data Ingested             | Amount of data ingested by Datadog over the selected time period.      |
| Ingestion Rate                 | A percentage from 0 to 100% of how many of the spans that are produced by the service are being ingested by Datadog.  Any number lower than 100% means sampling is occurring in the Datadog Agent prior to Ingestion.      |
| Status             | Will show `Default` unless changed by using the instructions in-app to configure the tracer. See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) for more information.    |
| Requests per second                 |   Average number of requests per second received by the service over the selected time period. Services with intermittent traffic or high volume are likelier to not send 100% of spans by default.    |
| Spans Ingested            | Number of spans ingested by Datadog over the selected time period.        |

### Change the Default Ingestion Rate

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate2.gif" style="width:100%;" alt="Change the Data Ingestion Rate" >}}

To specify that a specific percentage of a service's traffic should be sent, add a generated code snippet to your tracer configuration for that service.

1. Select the service you want to change the ingested span percent for.
2. Choose the service language.
3. Choose the desired ingestion percentage.
4. Apply the appropriate configuration generated from these choices to the indicated service and redeploy.
5. Confirm on the Data Ingestion page that your new percentage has been applied.

## Indexing Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Indexing Controls affect what is stored by Datadog for 15 days.

### Retention Filters

After spans have been ingested by Datadog, they will be retained for 15 days according to the indexing filters that have been set on your account.  By default, the only retention filter enabled per service will be the [Intelligent Sampling Filter](#datadog-intelligent-sampling-filter), which retains error traces and traces from different latency distributions.

You can also create any number of additional [tag-based retention filters](#create-your-own-filter) for your services.

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing2.png" style="width:100%;" alt="Span Indexing" >}}

| Column                | Data |
| ----------------------- | ---------- |
| Filter Name                | The name of each filter used to index spans.  By default, the only filter is [Datadog Intelligent Sampling](#datadog-intelligent-sampling-filter).   |
| Filter Query             | The tag-based query for each filter.      |
| Retention Rate                | A percentage from 0 to 100% of how many matching spans will be indexed by Datadog. |
| Spans Indexed             | The number of spans indexed by the filter over the selected time period.   |
| Enabled toggle                 |  Allows filters to be turned on and off.  |

### Datadog Intelligent Sampling Filter

Intelligent Sampling is always active for your services, and it will keep an assortment of traces to help you monitor the health of your applications.

Intelligent Sampling retains:

 - Errors, including Error Diversity (response code 400s, 500s, etc).
 - High Latency in the different quartiles `p75`, `p90`, `p95`.
 - All Resources with any traffic will have associated Traces in the past for any time window selection.
 - True maximum duration trace for each time window.

### Create your own filter

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify and disable additional filters based on tags, and set a percentage of spans matching each filter to be retained. Any span that is retained will have its corresponding trace saved as well, and when it is viewed the full trace context will be available.  In order to be searched by tag in [Historical Search and Analytics][2], however, the span containing the relevant tag must have been indexed.

1. Name your filter.
2. Set the relevant tags you would like to index spans that match ALL of.
3. Set a percentage of spans matching these tags to be indexed.
4. Save your new filter.

## Legacy App Analytics

While this is no longer the recommended setup configuration, if needed there are instructions for configuring legacy [App Analytics][1] setups.

[1]: /tracing/app_analytics/
