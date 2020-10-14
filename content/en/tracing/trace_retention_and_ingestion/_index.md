---
title: Trace Retention and Ingestion
kind: documentation
aliases:
    - /account_management/billing/usage_control_apm/
    - /tracing/app_analytics/
description: "Learn how to control Ingestion and Indexing rates with Tracing without Limits."
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

With Tracing without Limits™, both the ingestion of traces to Datadog as well as the retention of those traces for 15 days are fully customizable.

## Retention Filters

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

After spans have been ingested by Datadog, they will be kept for 15 days according to the retention filters that have been set on your account.  By default, the only retention filter enabled will be the [Intelligent Retention Filter](#datadog-intelligent-retention-filter), which retains error traces and traces from different latency distributions.

You can also create any number of additional [tag-based retention filters](#create-your-own-retention-filter) for your services.

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Retention Filters" >}}

In the Datadog app, on the ['Retention Filters' tab][1], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Filter Name                | The name of each filter used to index spans.  By default, the only filter is [Datadog Intelligent Retention](#datadog-intelligent-retention-filter).   |
| Filter Query             | The tag-based query for each filter.      |
| Retention Rate                | A percentage from 0 to 100% of how many matching spans will be indexed by Datadog. |
| Spans Indexed             | The number of spans indexed by the filter over the selected time period.   |
| Last Updated            | The date and user who last modified the retention filter.  |
| Enabled toggle                 |  Allows filters to be turned on and off.  |

### Datadog Intelligent Retention Filter

Intelligent Retention is always active for your services, and it will keep a proportion of traces to help you monitor the health of your applications.

Intelligent Retention retains:

 - Errors, including Error Diversity (response code 400s, 500s, etc).
 - High Latency in the different quartiles `p75`, `p90`, `p95`.
 - All Resources with any traffic will have associated Traces in the past for any time window selection.
 - True maximum duration trace for each time window.

### Create your own Retention Filter

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify and disable additional filters based on tags, and set a percentage of spans matching each filter to be retained. Any span that is retained will have its corresponding trace saved as well, and when it is viewed the complete trace will be available.  In order to be searched by tag in [Search and Analytics][2], however, the span containing the relevant tag must have been indexed by a [retention filter](#retention-filters).

1. Name your filter.
2. Set the relevant tags you would like to index spans that match ALL of.
3. Set a percentage of spans matching these tags to be indexed.
4. Save your new filter.

## Ingestion Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Ingestion Controls affect what is sent by your applications to Datadog.

Many instrumented services will send 100% of their traffic to Datadog by default.  The Datadog Agent will not drop or sample any spans by default at volumes of up to 50 traces per second.   High-volume services or services that experience intermittent traffic are likelier to not send 100% of spans by default.

For the best experience, we recommend you set services to send 100% of their traffic so all traces can be used for live search and analytics.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:100%;" alt="Retention Filters" >}}

**Note:** If you are seeing numbers below 100% for Ingestion Rate, ensure you are using Agent 6.19+ or 7.19+ as these versions increased the default rate.

In the Datadog app, on the ['Ingestion Controls' tab][3], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Root Service                 | The name of each service instrumented and sending traces to Datadog.   |
| Data Ingested             | Amount of data ingested by Datadog over the selected time period.      |
| Ingestion Rate                 | A percentage from 0 to 100% of how many of the spans that are produced by the service are being ingested by Datadog.  Any number lower than 100% means sampling is occurring in the Datadog Agent prior to Ingestion.      |
| Tracers Configuration            | Will show `Default` unless changed by using the instructions in-app to configure the tracer. See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) for more information. If all hosts with this service deployed are configured to send a specific volume of traces, this indicator will display as `Fully Configured`.  If only a portion of hosts with this service deployed are configured, the label will instead show `Partially Configured`.   |
| Dropped Spans                |  The percentage of incoming spans dropped by the Datadog Agent.  If this percent is higher than 0%, the service can be configured by clicking anywhere on the service row.  See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) for more information.     |
| Traces Ingested per Second                |   Average number of traces per second ingested into Datadog for the service over the selected time period.   |
| Spans Ingested            | Number of spans ingested by Datadog over the selected time period.        |

### Change the Default Ingestion Rate

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate3.gif" style="width:100%;" alt="Change the Data Ingestion Rate" >}}

To specify that a specific percentage of a service's traffic should be sent, add a generated code snippet to your tracer configuration for that service.

1. Select the service you want to change the ingested span percent for.
2. Choose the service language.
3. Choose the desired ingestion percentage.
4. Apply the appropriate configuration generated from these choices to the indicated service and redeploy.
5. Confirm on the Data Ingestion page that your new percentage has been applied.

## Legacy App Analytics

While this is no longer the recommended setup configuration and is not needed to use [Trace Search and Analytics][4], if needed there are instructions for configuring legacy [App Analytics][5] setups.

All existing App Analytics filters are automatically transitioned to Retention Filters. You can continue to let the filters remain unchanged or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters.


[1]: https://app.datadoghq.com/apm/traces/retention-filters
[2]: /tracing/trace_search_and_analytics/#historical-search-mode
[3]: https://app.datadoghq.com/apm/traces/ingestion-controls
[4]: /tracing/trace_search_and_analytics
[5]: /tracing/legacy_app_analytics/
