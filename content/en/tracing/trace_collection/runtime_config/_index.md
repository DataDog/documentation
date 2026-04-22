---
title: Configuration at Runtime
site_support_id: configuration_at_runtime
further_reading:
- link: "/remote_configuration"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

Configuration at runtime lets you modify APM library configuration from the Datadog UI, without needing to restart your application or service. You don't need to wait for a new deployment or code change to update your configuration. Instead, update it right away with configuration at runtime.

{{< img src="/tracing/runtime_config/runtime-config-nav.mp4" alt="Walk through Software Catalog to use configuration at runtime." video="true" style="width:100%;">}}

## Setup

Before you can use configuration at runtime, you must set up Remote Configuration. For more information, see [Setting up Remote Configuration for Tracing][1].

## Using configuration at runtime

To make changes to a service's configuration at runtime:

1. Go to the [Software Catalog][3] in APM.
1. Hover over the service for which you want to update configuration.
1. Click **Full Page** next to the service name.
1. Click **Service Info**.
1. From the **Setup Guidance** tab, click **Edit**.
1. Change the configuration options as needed. See [supported configuration options](#supported-configuration-options) for more details.
1. Click **Apply Configuration**.

In **Active Library Configuration**, you can see which options are configured for this service and the selected environment:

{{< img src="/tracing/runtime_config/active-library-config.png" alt="From the Setup Guidance tab, you can see your active library configuration." style="width:100%;">}}

In this example, you can see that Log Injection is enabled for the Staging environment across two instances. An instance refers to an instance of the Remote Configuration client. There should be one instance per process of your application.

You can tell when the configuration changes have been successfully applied by referencing the **X Applied** text. In this example, the configuration applied successfully to all two instances.

## Supported configuration options

The following options are supported with configuration at runtime. The required tracer version is listed for each language:

| Option                                                                                                                                 | Java      | Node.js                 | Python   | .NET      | Ruby      | Go        | C++ |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------|----------|-----------|-----------|-----------|-|
| <h5>Custom sampling rate</h5>Set a global sampling rate for the library using `DD_TRACE_SAMPLE_RATE`.                                  | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.4.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | `0.2.0+` |
| <h5>Log injection</h5>Automatically inject trace correlation identifiers to correlate logs and traces by enabling `DD_LOGS_INJECTION`. | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` |           | |
| <h5>HTTP header tags</h5>Add HTTP header values as tags on traces using `DD_TRACE_HEADER_TAGS`.                                        | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | |
| <h5>Custom span tags</h5>Add specified tags to each span using `DD_TAGS`.                                                              | `1.31.0+` | `4.23.0+` `3.44.0+`     | `2.5.0+` | `2.44.0+` |           | `1.59.0+` | `0.2.0+` |
| <h5>Resource-based sampling</h5>Set sampling rates by service and resource name, from the Datadog UI using `DD_TRACE_SAMPLING_RULES`.                                                              | `1.34.0+` | `5.16.0+`     | `2.9.0+` | `2.53.2+` | `2.0.0+` | `1.64.0+` | `0.2.2+` |
| <h5>Adaptive Sampling</h5>let Datadog control sampling rates on your behalf to match a configured monthly ingested volume budget.                                                              | `1.34.0+` | `5.16.0+`     | `2.9.6+` | `2.54.0+` | `2.0.0+` | `1.68.0+` | `0.2.2+` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/remote_config/
[2]: /agent/
[3]: /tracing/software_catalog/
[4]: /account_management/rbac/permissions/
[5]: /tracing/trace_explorer/trace_view
[6]: https://app.datadoghq.com/organization-settings/remote-config
[7]: /agent/configuration/network
