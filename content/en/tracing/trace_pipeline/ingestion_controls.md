---
title: Ingestion Controls
kind: documentation
aliases:
    - /tracing/trace_ingestion/control_page
    - /tracing/trace_ingestion/ingestion_control_page
    - /account_management/billing/usage_control_apm/
    - /tracing/app_analytics/
    - /tracing/guide/ingestion_control_page/
    - /tracing/trace_ingestion/ingestion_controls
description: "Learn how to control Ingestion rates with APM."
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms/"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/metrics/"
  tag: "Documentation"
  text: "Usage Metrics"
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Ingestion Sampling Rules" >}}

Ingestion controls affect what traces are sent by your applications to Datadog. [APM metrics][1] are always calculated based on all traces, and are not impacted by ingestion controls.

The Ingestion Control page provides visibility at the Agent and tracing libraries level into the ingestion configuration of your applications and services. From the [ingestion control configuration page][2], you can:
- Gain visibility on your service-level ingestion configuration and adjust trace sampling rates for high throughput services.
- Understand which ingestion mechanisms are responsible for sampling most of your traces.
- Investigate and act on potential ingestion configuration issues, such as limited CPU or RAM resources for the Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control Page Overview" >}}

All metrics used in the page are based on live traffic data of the **past 1 hour**. Any Agent or library configuration change is reflected in the page.

## Summary across all environments

Get an overview of the total ingested data over the past hour, and an estimation of your monthly usage against your monthly allocation, calculated with the active APM infrastructure (hosts, Fargate tasks, and serverless functions).

If the monthly usage is under `100%`, the projected ingested data fits in your [monthly allotment][3]. A monthly usage value over `100%` means that the monthly ingested data is projected to be over your monthly allotment.

## Managing ingestion for all services at the Agent level

Before going into your services' ingestion configuration in tracing libraries, a share of the ingested volume is controllable from the Datadog Agent.

Click **Manage Agent Ingestion** to get instructions for configuring the Agent sampling controls.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent Level Configuration Modal" >}}

You can control three ingestion mechanisms by configuring sampling in the Datadog Agent:
- **[Head-based Sampling][4]**: When no sampling rules are set for a service, the Datadog Agent automatically computes sampling rates to be applied in libraries, targeting 10 traces per second per Agent. The setting `DD_APM_MAX_TPS` allows you to change the target number of traces per second.
-  **[Error Spans Sampling][5]**: For traces not caught by head-based sampling, the Datadog Agent catches local error traces up to 10 traces per second per Agent. The setting `DD_APM_ERROR_TPS` allows you to change the target number of traces per second.
-  **[Rare Spans Sampling][6]**: For traces not caught by head-based sampling, the Datadog Agent catches local rare traces up to 5 traces per second per Agent. This setting is disabled by default. The setting `DD_APM_ENABLE_RARE_SAMPLER` allows you to enable the collection of rare traces.

**Note**: The `Other Ingestion Reasons` (gray) section of the pie chart represents other ingestion reasons which _are not configurable_ at the Datadog Agent level.

### Remotely configure Agent ingestion settings

<div class="alert alert-warning"> Remote configuration for ingestion configuration is in beta. Contact <a href="/help/">Datadog Support</a> to request access.</div>

You can remotely configure these parameters if you are using Agent version [7.42.0][13] or higher. Read [How Remote Configuration Works][14] for information about enabling remote configuration in your Agents.

With remote configuration, you can change parameters without having to restart the Agent. Click `Apply` to save the configuration changes, and the new configuration takes effect immediately.

**Note**: Remotely configured parameters take precedence over local configurations such as environment variables and `datadog.yaml` configuration.

## Managing ingestion for an individual service at the library level

The service table contains information about the ingested volumes and ingestion configuration, broken down by service:

Type
: The service type: web service, database, cache, browser, etc...

Name
: The name of each service sending traces to Datadog. The table contains root and non-root services for which data was ingested in the past one hour.

Ingested Traces/s
: Average number of traces per second ingested starting from the service over the past one hour.

Ingested Bytes/s
: Average number of bytes per second ingested into Datadog for the service over the past one hour.

Downstream Bytes/s
: Average number of bytes per second ingested for which the service *makes the sampling decision*. This includes the bytes of all downstream child spans that follow the decision made at the head of the trace, as well as spans caught by the [Error sampler][5], the [Rare sampler][6], and the [App Analytics][7] mechanism.

Traffic Breakdown
: A detailed breakdown of traffic sampled and unsampled for traces starting from the service. See [Traffic breakdown](#traffic-breakdown) for more information.

Ingestion Configuration
: Shows `Automatic` if the [default head-based sampling mechanism][4] from the Agent applies. If the ingestion was configured in the tracing libraries with [trace sampling rules][8], the service is marked as `Configured`. For more information about configuring ingestion for a service, read about [changing the default ingestion rate](#configure-the-service-ingestion-rate).

Infrastructure
: Hosts, containers, and functions on which the service is running.

Service status
: Shows `Limited Resource` when some spans are dropped due to the Datadog Agent reaching CPU or RAM limits set [in its configuration][9], `Legacy Setup` when some spans are ingested through the legacy [App Analytics mechanism][7], or `OK` otherwise.

Filter the page by environment, configuration, and status to view services for which you need to take an action. To reduce the global ingestion volume, sort the table by the `Downstream Bytes/s` column to view services responsible for the largest share of your ingestion.

**Note**: The table is powered by the [usage metrics][10] `datadog.estimated_usage.apm.ingested_spans` and `datadog.estimated_usage.apm.ingested_bytes`. These metrics are tagged by `service`, `env` and `ingestion_reason`.

### Traffic breakdown

The Traffic Breakdown column breaks down the destination of all traces originating from the service. It gives you an estimate of the share of traffic that is ingested and dropped, and for which reasons.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Traffic breakdown of trace ingestion" >}}

The breakdown is composed of the following parts:

- **Complete traces ingested** (blue): The percentage of traces that have been ingested by Datadog.
- **Complete traces not retained** (gray): The percentage of traces that have intentionally not been forwarded to Datadog by the Agent or the tracing library. This can happen for one of two reasons depending on your configuration:

    1. By default, the [Agent distributes an ingestion rate][4] to services depending on service traffic.
    2. When the service is manually [configured][8] to ingest a certain percentage of traces at the tracing library level.

- **Complete traces dropped by the tracer rate limiter** (orange): When you choose to manually set the service ingestion rate as a percentage with trace sampling rules, a rate limiter is automatically enabled, set to 100 traces per second by default. See the [rate limiter][8] documentation to manually configure this rate.

- **Traces dropped due to the Agent CPU or RAM limit** (red): This mechanism may drop spans and create incomplete traces. To fix this, increase the CPU and memory allocation for the infrastructure that the Agent runs on.

## Service ingestion summary

Click on any service row to view the Service Ingestion Summary, a detailed view providing actionable insights on the ingestion configuration of the service.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Service Ingestion Summary" >}}

Explore the **Ingestion reasons breakdown** to see which mechanisms are responsible for your service ingestion. Each ingestion reason relates to one specific [ingestion mechanism][11]. After changing your service ingestion configuration, you can observe the increase or decrease of ingested bytes and spans in this timeseries graph based on the past hour of ingested data.

If most of your service ingestion volume is due to decisions taken by upstream services, investigate the detail of the **Sampling decision makers** top list. For example, if your service is non-root, (meaning that it **never decides** to sample traces), observe all upstream services responsible for your non-root service ingestion. Configure upstream root services to reduce your overall ingestion volume.

For further investigations, use the [APM Trace - Estimated Usage Dashboard][12], which provides global ingestion information as well as breakdown graphs by `service`, `env` and `ingestion reason`.

### Agent and tracing library versions

See the **Datadog Agent and tracing library versions** your service is using. Compare the versions in use to the latest released versions to make sure you are running recent and up-to-date Agents and libraries.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent and tracing library versions" >}}

**Note**: You need to upgrade the Agent to v6.34 or v7.34 for the version information to be reported.

### Configure the service ingestion rate

Click **Manage Ingestion Rate** to get instructions on how to configure your service ingestion rate.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="Change the Service Ingestion Rate" >}}

To specify a specific percentage of a service's traffic to be sent, add an environment variable or a generated code snippet to your tracing library configuration for that service.

1. Select the service you want to change the ingested span percent for.
2. Choose the service language.
3. Choose the desired ingestion percentage.
4. Apply the appropriate configuration generated from these choices to the indicated service and redeploy the service. **Note**: The service name value is case sensitive. It should match the case of your service name.
5. Confirm on the Ingestion Control Page that your new percentage has been applied by looking at the Traffic Breakdown column, which surfaces the sampling rate applied. The ingestion reason for the service is shown as `ingestion_reason:rule`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
[4]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /tracing/trace_pipeline/metrics
[11]: /tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /agent/remote_config/#enabling-remote-configuration