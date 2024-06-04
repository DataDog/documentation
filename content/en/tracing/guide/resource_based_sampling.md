---
title: Resource-based sampling
kind: Guide
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

{{< callout url="https://forms.gle/WCG57yTCG27BCBB67" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Request access to the beta!" >}}
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
Python    | _Coming soon_
Ruby      | _Coming soon_
Node.js   | _Coming soon_
PHP       | _Coming soon_
.NET      | _Coming soon_
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

To configure sampling rates for the service, by resource name, click the `Manage Ingestion rate` button. If the remote configuration option is disabled, make sure that the listed [requirements](#compatibility-requirements) are all met.

{{< img src="/tracing/guide/resource_based_sampling/sampling_configuration_modal.png" alt="Configuration Modal" style="width:100%;">}}

From the modal, set sampling rates for some resources by clicking `Add new rule`. Sampling rules use glob pattern matching, so you can use wildcards (`*`) to match against multiple resources at the same time. Click `Apply` to save the configuration: a confirmation pop-over will appear. The configuration should take effect in less than a minute, which you can be observe from the [Live Search Explorer][9].

From the Service Ingestion Summary, the resources for which the sampling rate remotely applied is  should show `Remote Configured` in the `Configuration` column.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /agent/remote_config
[4]: /account_management/rbac/permissions/
[5]: github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /tracing/trace_explorer/#live-search-for-15-minutes