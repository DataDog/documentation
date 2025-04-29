---
title: Configuration at Runtime
further_reading:
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
---

<div class="alert alert-info">This feature is in Preview.</div>

## Overview

Configuration at runtime lets you modify APM library configuration from the Datadog UI, without needing to restart your application or service. You don't need to wait for a new deployment or code change to update your configuration. Instead, update it right away with configuration at runtime.

{{< img src="/tracing/runtime_config/runtime-config-nav.mp4" alt="Walk through Software Catalog to use configuration at runtime." video="true" style="width:100%;">}}

## Prerequisites

- [Datadog Agent][2] 7.47.0 or higher installed on your hosts or containers.
- Upgrade your tracing libraries to a Remote Configuration-compatible version. For more information, see the [Supported configuration options](#supported-configuration-options) section.
- Ensure your RBAC permissions include [`org_management`][7], so you can enable Remote Configuration for your organization.
- Ensure your RBAC permissions include [`api_keys_write`][5], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.
- Ensure you have the `APM Remote Configuration Read` and `APM Remote Configuration Write` [permissions][4].
  **Note**: If you don't have these permissions, ask your Datadog Admin to update your permissions from your Organization Settings.

## Set up Remote Configuration

1. Enable [Remote Configuration for your organization][8]. This enables Datadog components across your organization to receive configurations from Datadog.
1. Select an existing API key or create a new API key, and enable the Remote Configuration capability on the key if it is not already enabled.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}
1. Restart your Agent.

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

### Review Remote Configuration status of Tracing libraries

You can gain visibility into the Remote Configuration status of your Tracer libraries through the [Remote Configuration UI][6].

The following table describes the meaning of each Tracing library status:

  | Tracing library Status| Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | The Tracing library is successfully connected to the Remote Configuration service through the associated Agent. This is the optimal state you want your Tracing library to be in for Remote Configuration.                                               |
  | UNAUTHORIZED          | The Tracing library is associated with an Agent which doesn't have `Remote Config Read` permission on its API key. To fix the issue, you need to enable Remote Configuration capability on the API Key used by the Agent associated with the Tracing library.|
  | CONNECTION ERROR        |   The Tracing library deployed in your environment is associated with an Agent that has remote_config.enabled set to true in its `datadog.yaml` configuration file, however, the agent cannot be found in the Remote Configuration service. The most likely cause of this is that the associated Agent is unable to reach Remote Configuration [endpoints][7]. To fix the issue, you need to allow outbound HTTPS access to Remote Configuration endpoints from your environment.
  | DISABLED       |   The Tracing library deployed in your environment is associated with an Agent that has `remote_config.enabled` set to false in its `datadog.yaml` configuration file. This could be set deliberately or mistakenly. To enable Remote Configuration on the associated Agent, set `remote_config.enabled` to true.  |
  | NOT CONNECTED       | The Tracing library cannot be found in the Remote Configuration service and is associated with an Agent that could have `remote_config.enabled` set to true or false in its `datadog.yaml` configuration file. Check your local Agent configuration or your proxy settings.|
  | UNSUPPORTED AGENT   | The Tracing library is associated with an Agent which is not Remote Configuration capable. To fix this issue, update the associated Agent software to the latest available version. |
  | NOT DETECTED   | The Tracing library does not support Remote Configuration. To fix this issue, update the Tracing library software to the latest available version. |
  | UNKNOWN   | The Tracing library status is unknown, and it can't be determined if an Agent is associated with the Tracing library. For example, this could be because the Agent is deployed on a fully managed serverless container service like AWS Fargate. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /agent/
[3]: /tracing/software_catalog/
[4]: /account_management/rbac/permissions/
[5]: /tracing/trace_explorer/trace_view
[6]: https://app.datadoghq.com/organization-settings/remote-config
[7]: /agent/configuration/network
