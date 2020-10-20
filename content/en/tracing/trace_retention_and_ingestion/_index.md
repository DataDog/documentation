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

In the Datadog app, on the [Retention Filters tab][1], you can see the following information:

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

 - Errors, including Error Diversity (for example, response code 400s, 500s).
 - High Latency in the different quartiles `p75`, `p90`, `p95`.
 - All Resources with any traffic will have associated Traces in the past for any time window selection.
 - True maximum duration trace for each time window.

### Create your own Retention Filter

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify, and disable additional filters based on tags, and set a percentage of spans matching each filter to be retained. Any span that is retained will have its corresponding trace saved as well, and when it is viewed, the complete trace will be available.  In order to be searched by tag in [Search and Analytics][2], however, the span that directly contains the searched-upon tag must have been indexed by a retention filter.

1. Name your filter.
2. Set the tags you would like to index spans that match **all** of.
3. Select whether this filter will retain any span that matches the criteria, or only [top level spans][3].
4. Set a percentage of spans matching these tags to be indexed.
5. Save your new filter.

**Note:** Selecting "Top-Level Spans for Services Only" means the retention filter will retain only the selected proportion of [top level spans][3] of service and index them. Use this if you want to only index top level spans with matching tags. If "All Spans" is selected, the retention filter will retain the selected proportion of all spans of the distributed trace, irrespective of their hierarchy, and index them.  This may have an impact on your bill, and the visual indicator within the app while setting a retention filter will inform you how many matching spans have been detected over the time period.

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

In the Datadog app, on the ['Ingestion Controls' tab][4], you can see the following information:

| Column                | Data |
| ----------------------- | ---------- |
| Root Service                 | The name of each service instrumented and sending traces to Datadog.   |
| Data Ingested             | Amount of data ingested by Datadog over the selected time period.      |
| Ingestion Rate                 | A percentage from 0 to 100% of how many of the spans that are produced by the service are being ingested by Datadog.  Any number lower than 100% means some traces are not being ingested by Datadog from the Datadog Agent, and these traces will be dropped by the Datadog Agent after metrics and stats have been calculated.      |
| Ingestion Breakdown             | A detailed breakdown of the destination of every traces generated by the service. See [Ingestion Breakdown](#ingestion-breakdown) for more details.    |
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

#### (Recommended) Setting the global ingestion rate to 100%

In order to ingest 100% of your traces in Datadog for all services for live search and analytics as well as to have the most control with retention filters, Datadog recommends configuring all services to send 100% of traces by default.

To configure for 100% ingestion on every service instrumented with a Datadog tracing library, set the following environment variable in the tracer configuration:

```
DD_TRACE_SAMPLE_RATE=1.0
```

### Ingestion Breakdown

The ingestion breakdown column breaks down the destination of all traces originating from the service. It can help you explain lower than expected ingestion rates and missing traces.

The breakdown is composed of the following parts:

**Complete traces ingested (Green)**:

Shows you the percentage of the service traces that have been ingested by Datadog.

**Complete traces not retained by the default ingestion algorithm (Grey)**:

By default, the agent and the tracers intelligently decide which traces should be retained and forwarded to Datadog's intake. See [Change the Default Ingestion Rate](#change-the-default-ingestion-rate) if you wish to configure this behavior.

**Complete traces not retained by the configured ingestion rate (Grey)**:

If you decide to [configure the ingestion rate](#change-the-default-ingestion-rate) of a service to less than 100%, this part of the breakdown will show you the percentage of traces dropped by the tracer based on that configuration.

**Complete traces dropped by the tracer rate limiter (Orange)**:

By default, when the tracer has a [configured the ingestion rate](#change-the-default-ingestion-rate) for your service, the number of traces forwarded to Datadog is limited to 100 trace/second. Refer to your tracer configuration if you wish to configure this rate limiter.

**Traces dropped due to the agent CPU limit (Red)**:

The agent has a configuration option allowing users to limit the usage of the CPU. After this limit is reached the agent will stop accepting traces from the tracers. Refer to the agent configuration to [configure how much CPU](https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml#L736-L741) you wish to allocate to the agent.

### Traces dropped before ingestion

You won't get 100% trace ingestion if you have not set the environment variable configuration `DD_TRACE_SAMPLE_RATE=1.0` for Tracing without Limits, and:
- your applications generate above 50 traces per second;
- your applications send intermittent traffic loads; or
- your applications traces are large in size or otherwise have complicated trace payloads.

In this case, some traces will be dropped by the Datadog Agent *after* stats are computed, so that metrics calculated will be based on 100% of your traces.

If you are seeing ingestion rates below 100% within Datadog and would like to send all your traces, enable Tracing without Limits by setting the environment variable as described above. If you have questions, contact our [support team][5].

{{< img src="tracing/trace_indexing_and_ingestion/VisualIndicator.png" style="width:100%;" alt="Root services not sending 100% of traces" >}}


## App Analytics to Tracing Without Limits

Before October 20, 2020, Datadog offered App Analytics to index spans for performing analytics. While this is no longer the recommended setup configuration and is not needed to use [Trace Search and Analytics][6], the legacy instructions are available within the [App Analytics][7] setup page.

All existing App Analytics filters have been automatically transitioned to Retention Filters. You can continue to use the unchanged filters or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters.

**Note:** Existing App Analytics filters can be edited within Datadog, but only by editing the transitioned [retention filters][1].  Legacy filters are now read only on the [settings][8] page in-app.

{{< img src="tracing/trace_indexing_and_ingestion/MigratedRetentionFilter.png" style="width:100%;" alt="Visual indicator of App Analytics filter migrated to a retention filter" >}}

[1]: https://app.datadoghq.com/apm/traces/retention-filters
[2]: /tracing/trace_search_and_analytics/#historical-search-mode
[3]: /tracing/visualization/#top-level-span
[4]: https://app.datadoghq.com/apm/traces/ingestion-controls
[5]: /help/
[6]: /tracing/trace_search_and_analytics
[7]: /tracing/legacy_app_analytics/
[8]: https://app.datadoghq.com/apm/settings
