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

To track or monitor your usage of Tracing without Limits™, see the [Usage Metrics][1] documentation.

## Retention Filters

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

After spans have been ingested by Datadog, some will be kept for 15 days according to the retention filters that have been set on your account.  By default, the only retention filter enabled will be the [Intelligent Retention Filter](#datadog-intelligent-retention-filter), which retains error traces and traces from different latency distributions.

You can also create any number of additional [tag-based retention filters](#create-your-own-retention-filter) for your services.

**Note**: Admin rights are required to create, modify, or disable retention filters.

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Retention Filters" >}}

In the Datadog app, on the [Retention Filters tab][2], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Filter Name                | The name of each filter used to index spans.  By default, the only filter is [Datadog Intelligent Retention](#datadog-intelligent-retention-filter).   |
| Filter Query             | The tag-based query for each filter.      |
| Retention Rate                | A percentage from 0 to 100% of how many matching spans will be indexed by Datadog. |
| Spans Indexed             | The number of spans indexed by the filter over the selected time period.   |
| Last Updated            | The date and user who last modified the retention filter.  |
| Enabled toggle                 |  Allows filters to be turned on and off.  |

In addition to the 'Spans Indexed' column per retention filter, there is also the metric `datadog.estimated_usage.apm.indexed_spans` that you can use to track spans indexed by retention filters.

For more information, refer to the [Usage Metrics][1] documentation, or see the [dashboard][3] available in your account.

### Datadog intelligent retention filter

Intelligent retention is always active for your services, and it keeps a proportion of traces to help you monitor the health of your applications. All [top level spans][12] are indexed for the traces kept by the intelligent retention filter.

Intelligent Retention retains:

 - A representative selection of errors, ensuring error diversity (for example, response code 400s, 500s).
 - High Latency in the different quartiles `p75`, `p90`, `p95`.
 - All Resources with any traffic will have associated Traces in the past for any time window selection.
 - True maximum duration trace for each time window.

If there are specific tags, facets, or groups of traces that you want to investigate _in detail_, meaning you want to retain more than what Intelligent Retention retains, then [create your own retention filter](#create-your-own-retention-filter). For example, you might want to keep more than a representative selection of errors from your production environment. To ensure _all_ production errors are retained and available for search and analytics for 15 days, create a 100 percent retention filter scoped to `env:prod` and `status:error`. As discussed below, this may have an impact on your bill.

### Create your own Retention Filter

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify, and disable additional filters based on tags, and set a percentage of spans matching each filter to be retained. Any span that is retained will have its corresponding trace saved as well, and when it is viewed, the complete trace will be available.  In order to be searched by tag in [Search and Analytics][4], however, the span that directly contains the searched-upon tag must have been indexed by a retention filter.

1. Name your filter.
2. Set the tags you would like to index spans that match **all** of.
3. Select whether this filter will retain any span that matches the criteria, or only [top level spans][5].
4. Set a percentage of spans matching these tags to be indexed.
5. Save your new filter.

**Note:** Selecting "Top-Level Spans for Services Only" means the retention filter will retain only the selected proportion of [top level spans][5] of service and index them. Use this if you want to only index top level spans with matching tags. If "All Spans" is selected, the retention filter will retain the selected proportion of all spans of the distributed trace, irrespective of their hierarchy, and index them.  This may have an impact on your bill, and the visual indicator within the app while setting a retention filter will inform you how many matching spans have been detected over the time period.

For example, you can create filters to keep all traces for:

- Credit card transactions over $100.
- High-priority customers using a mission-critical feature of your SaaS solution.
- Specific versions of an online delivery service application.

## Ingestion Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Ingestion Controls affect what traces are sent by your applications to Datadog.  Stats and metrics are always calculated based on all traces, and are not impacted by ingestion controls.

Many instrumented services will send 100% of their traces to Datadog by default.  The Datadog Agent will not drop or sample any spans by default at volumes of up to 50 traces per second.   High-volume services or services that experience intermittent traffic are likelier to not send 100% of spans by default. This 50-traces-per-second default ingestion is based on Intelligent Retention and will keep diverse traces by default.

For the best experience, set services to send 100% of their traces so that all traces can be used for live search and analytics.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:100%;" alt="Retention Filters" >}}

**Note:** If you are seeing numbers below 100% for Ingestion Rate, ensure you are using Agent 6.19+ or 7.19+ as these versions increased the default rate.

In the Datadog app, on the ['Ingestion Controls' tab][6], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Root Service                 | The name of each service instrumented and sending traces to Datadog.   |
| Data Ingested             | Amount of data ingested by Datadog over the selected time period.      |
| Ingestion Rate                 | A percentage from 0 to 100% of how many of the spans that are produced by the service are being ingested by Datadog.  Any number lower than 100% means some traces are not being ingested by Datadog from the Datadog Agent, and these traces will be dropped by the Datadog Agent after metrics and stats have been calculated.      |
| Ingestion Breakdown             | A detailed breakdown of the destination of every trace generated by the service. See [Ingestion Breakdown](#ingestion-breakdown) for more information.    |
| Tracers Configuration            | Will show `Default` unless changed by using the instructions in-app to configure the tracer. See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) for more information. If all hosts with this service deployed are configured to send a specific volume of traces, this indicator will display as `Fully Configured`.  If only a portion of hosts with this service deployed are configured, the label will instead show `Partially Configured`.   |
| Dropped Spans                |  The percentage of incoming spans dropped by the Datadog Agent.  If this percent is higher than 0%, the service can be configured by clicking anywhere on the service row.  See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) for more information.     |
| Traces Ingested per Second                |   Average number of traces per second ingested into Datadog for the service over the selected time period.   |
| Spans Ingested            | Number of spans ingested by Datadog over the selected time period.        |

In addition to the Data Ingestion column for each retention filter, there are also two metrics `datadog.estimated_usage.apm.ingested_spans` and `datadog.estimated_usage.apm.ingested_bytes`. These metrics are tagged by `service` and `env`, and top lists are available within the [Trace Analytics Dashboard][3] to show where the highest ingestion volumes are occurring. See the [Usage Metrics][1] documentation for more information.

### Change the Default Ingestion Rate

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate3.gif" style="width:100%;" alt="Change the Data Ingestion Rate" >}}

To specify that a specific percentage of a service's traffic should be sent, add a generated code snippet to your tracer configuration for that service.

1. Select the service you want to change the ingested span percent for.
2. Choose the service language.
3. Choose the desired ingestion percentage.
4. Apply the appropriate configuration generated from these choices to the indicated service and redeploy.
5. Confirm on the Data Ingestion page that your new percentage has been applied.

#### (Recommended) Setting the global ingestion rate to 100%

In order to ingest 100% of your traces in Datadog for all services for live search and analytics as well as to have the most control with retention filters, Datadog recommends configuring all services to send 100% of traces by default.

To configure for 100% ingestion on every service instrumented with a Datadog tracing library, set the following environment variable in the tracer configuration:

```
DD_TRACE_SAMPLE_RATE=1.0
```

### Ingestion Breakdown

The Ingestion Breakdown column breaks down the destination of all traces originating from the service. It can help you understand lower than expected ingestion rates and missing traces.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionBreakdown.png" style="width:100%;" alt="breakdown of traces ingested" >}}

The breakdown is composed of the following parts:

- **Complete traces ingested** (green): The percentage of traces that have been ingested by Datadog.
- **Complete traces not retained** (gray): The percentage of traces that have intentionally not been forwarded to Datadog by the agent or the tracer. This can happen for one of two reasons depending on your configuration:

    1. By default, the agent and the tracers intelligently set the service ingestion rate. See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) to configure this behavior.
    2. When you change the default ingestion rate to less than 100%.

- **Complete traces dropped by the tracer rate limiter** (orange): When you choose to [configure the ingestion rate of a service](#change-the-default-ingestion-rate), you explicitly define the ingestion rate that your service should have. However, as a protection mechanism, a rate limiter set to 100 traces per second by default is automatically enabled. To configure this rate limiter, [open a support ticket][7] so we can guide you through the process.

- **Traces dropped due to the agent CPU limit** (red): The agent has a configuration option allowing users to limit the usage of the CPU. After this limit is reached the agent will stop accepting traces from the tracers. Change the [agent configuration][8] to configure how much CPU to allocate to the agent.

### Traces dropped before ingestion

You won't get 100% trace ingestion if you have not set the environment variable configuration `DD_TRACE_SAMPLE_RATE=1.0` for Tracing without Limits, and:
- your applications generate above 50 traces per second;
- your applications send intermittent traffic loads; or
- your applications traces are large in size or otherwise have complicated trace payloads.

In this case, some traces will be dropped by the Datadog Agent *after* stats are computed, so that metrics calculated will be based on 100% of your traces.

If you are seeing ingestion rates below 100% within Datadog and would like to send all your traces, enable Tracing without Limits by setting the environment variable as described above. If you have questions, contact our [support team][7].

{{< img src="tracing/trace_indexing_and_ingestion/VisualIndicator.png" style="width:100%;" alt="Root services not sending 100% of traces" >}}


## App Analytics to Tracing Without Limits

Before October 20, 2020, Datadog offered App Analytics to index spans for performing analytics. While this is no longer the recommended setup configuration and is not needed to use [Trace Search and Analytics][9], the legacy instructions are available within the [App Analytics][10] setup page.

All existing App Analytics filters have been automatically transitioned to Retention Filters. You can continue to use the unchanged filters or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters.

**Note:** Existing App Analytics filters can be edited within Datadog, but only by editing the transitioned [retention filters][2].  Legacy filters are now read only on the [settings][11] page in-app.

{{< img src="tracing/trace_indexing_and_ingestion/MigratedRetentionFilter.png" style="width:100%;" alt="Visual indicator of App Analytics filter migrated to a retention filter" >}}

[1]: /tracing/trace_retention_and_ingestion/usage_metrics
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /tracing/trace_search_and_analytics/#historical-search-mode
[5]: /tracing/visualization/#top-level-span
[6]: https://app.datadoghq.com/apm/traces/ingestion-control
[7]: /help/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml#L736-L741
[9]: /tracing/trace_search_and_analytics
[10]: /tracing/legacy_app_analytics/
[11]: https://app.datadoghq.com/apm/settings
[12]: /tracing/visualization/#top-level-span
