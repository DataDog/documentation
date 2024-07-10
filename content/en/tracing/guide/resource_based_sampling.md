---
title: Resource-based sampling

disable_toc: false
private: true
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/ingestion_controls"
  tag: "Documentation"
  text: "Ingestion Control Page"
---

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Request access to the beta!" >}}
Remotely configured sampling rules are in Beta. To request access, complete the form.
{{< /callout >}}

## Overview

Remote configuration allows you to dynamically set ingestion [sampling rates by service and resource name][7], from the Datadog UI, without having to redeploy your service.

## Requirements

- Datadog Agent [7.41.1][2] or higher.
- [Remote Configuration][3]  enabled for your Agent.
- `APM Remote Configuration Write` [permissions][4]. If you don’t have these permissions, ask your Datadog admin to update your permissions from your organization settings.

### Tracing library version

Find below the minimum tracing library version required for the feature:

Language  | Minimum version required
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.0.0][11]
Node.js   | [v5.16.0][12]
PHP       | _Coming soon_
.NET      | [v.2.53.2][13]
C++       | _Coming soon_

## See sampling rates by resource in the Ingestion Control page

To see configured sampling rates by resource, navigate to the Ingestion controls [Service Ingestion summary][1]. The table lists the applied sampling rate by resource of the service.

{{< img src="/tracing/guide/resource_based_sampling/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

- The `Ingested bytes` column surfaces the ingested bytes from spans of the service and resource, while the `Downstream bytes` column surfaces the ingested bytes from spans where the sampling decision is made starting from that service and resource, including bytes from downstream services in the call chain.
- The `Configuration` column surfaces where the resource sampling rate is being applied from: 
  - `Automatic` if the [default head-based sampling mechanism][8] from the Agent applies.
  - `Local Configured` if a [sampling rule][7] was set locally in the tracing library.
  - `Remote Configured` if a remote sampling rule was set from the Datadog UI. To learn how to configure sampling rules from the Ingestion Control page, read the section on [remotely configuring sampling rules](#remotely-configure-sampling-rules-for-the-service).

## Remotely configure sampling rules for the service

To configure sampling rates for the service by resource name: 
1. Click **Manage Ingestion rate**. If the remote configuration option is disabled, make sure that the listed [requirements](#compatibility-requirements) are all met.
   {{< img src="/tracing/guide/resource_based_sampling/sampling_configuration_modal.png" alt="Configuration Modal" style="width:100%;">}}
1. Click **Add new rule** to set sampling rates for some resources. Sampling rules use glob pattern matching, so you can use wildcards (`*`) to match against multiple resources at the same time.
1. Click **Apply** to save the configuration.

The configuration should take effect in less than a minute. You can observe the configuration changes from the [Live Search Explorer][9].

From the **Service Ingestion Summary**, resources for which the sampling rate are remotely applied should show as `Remote Configured` in the **Configuration** column.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /agent/remote_config
[4]: /account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2