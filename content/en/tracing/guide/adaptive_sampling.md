---
title: Adaptive sampling

disable_toc: false
private: true
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/ingestion_controls"
  tag: "Documentation"
  text: "Ingestion Control Page"
- link: "/tracing/guide/resource_based_sampling/"
  tag: "Documentation"
  text: "Resource-based sampling"
---

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" d_target="#signupModal" btn_hidden="false" header="Request access to the Preview!" >}}
Adaptive sampling is in Preview. To request access, complete the form.
{{< /callout >}}

## Overview

Datadog Adaptive Sampling helps you capture more relevant traces while remaining close to a specific budget (ingested gigabytes). This feature allows you to set a target monthly volume for trace ingestion and enroll one or more services to adaptive sampling. This ensures that the consumption of these services matches the target volume at the end of the month, while keeping visibility over all services and endpoints.

Adaptive Sampling uses granular configuration of existing [sampling rules][7] to adjust rates based on resource, service, and environment. Using [remote configuration][3], Datadog dynamically manages these rates to match your specified monthly budget and ensure visibility for low-traffic services and endpoints.

To enroll new services to adaptive sampling and manage ingested volumes from the [Datadog Ingestion control page][1], follow the instructions listed below.


## Requirements

- Datadog Agent [7.53.0][2] or higher.
- [Remote Configuration][3]  enabled for your Agent.
- `APM Remote Configuration Write` [permissions][4]. If you don’t have these permissions, ask your Datadog admin to update your permissions from your organization settings.

### Tracing library version

The following table lists minimum tracing library version required for Adaptive Sampling:

| Language    | Minimum version required |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v2.9.6][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         |  Not available           |

## View sampling rates by resource

To see configured sampling rates:

1. Navigate to the Ingestion controls [Service Ingestion summary][1].
2. View the table listing applied sampling rates by resource of the service.

{{< img src="/tracing/guide/resource_based_sampling/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

- The `Ingested bytes` column surfaces the ingested bytes from spans of the service and resource, while the `Downstream bytes` column surfaces the ingested bytes from spans where the sampling decision is made starting from that service and resource, including bytes from downstream services in the call chain.
- The `Configuration` column surfaces where the resource sampling rate is being applied from: 
  - `Automatic` if the [default head-based sampling mechanism][8] from the Agent applies.
  - `Local Configured` if a [sampling rule][7] was set locally in the tracing library.
  - `Remote Configured` if a remote sampling rule was set from the Datadog UI. To learn how to configure sampling rules from the Ingestion Control page, read the section on [remotely configuring sampling rules][15].
  - `Adaptive` if the sampling rules are set remotely by Datadog.

## Remotely configure sampling rules for the service

To configure adaptive sampling for the service:
1. Click **Manage Ingestion rate**. If the remote configuration option is disabled, make sure that the listed [requirements](#compatibility-requirements) are all met.
   {{< img src="/tracing/guide/adaptive_sampling/ingestion_control_page.png" alt="Ingestion Control Page" style="width:100%;">}}
1. Configure a **Monthly Ingestion Target** for adaptive sampling.
   {{< img src="/tracing/guide/adaptive_sampling/monthly_ingestion_target.png" alt="Monthly Ingestion Target" style="width:100%;">}}
1. For your service, go to **Manage Ingestion Rate**
   {{< img src="/tracing/guide/adaptive_sampling/enroll_service.png" alt="Enroll Service to Adaptive Sampling" style="width:100%;">}}
1. Set your service's sampling strategy to **Datadog Adaptive Sampling Rates** and click **Apply** to save the configuration.
   {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_rate.png" alt="Datadog Adaptive Sampling Rates" style="width:100%;">}}
1. (Optional) Set **Sampling Rates for some Resources** in addition to  **Datadog Adaptive Sampling Rates** for additional control of your ingestion.
   {{< img src="/tracing/guide/adaptive_sampling/resource_sampling.png" alt="Resource-Based Sampling Rules" style="width:100%;">}}

The configuration should take effect in less than a minute. You can observe the configuration changes from the [Live Search Explorer][9].

From the **Service Ingestion Summary**, resources for which the sampling rate are remotely applied should show as `Remote Configured` in the **Configuration** column.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /agent/remote_config
[4]: /account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.6
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /tracing/guide/resource_based_sampling/
