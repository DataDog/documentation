---
title: Configuration at Runtime
kind: documentation
further_reading:
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

Configuration at runtime lets you modify APM library configuration from the Datadog UI, without needing to restart your application or service. You don't need to wait for a new deployment or code change to update your configuration. Instead, update it right away with configuration at runtime.

This feature uses [Remote Configuration][1] to apply configurations to Datadog components in your environment.

{{< img src="/tracing/runtime_config/runtime-config-nav.mp4" alt="Walk through Service Catalog to use configuration at runtime." video="true" style="width:100%;">}}

## Prerequisites

- [Datadog Agent][2] 7.41.1 or higher.
- [Remote Configuration][1] is enabled for your Agent.
- `APM Remote Configuration Read` and `APM Remote Configuration Write` [permissions][4].  
  **Note**: If you don't have these permissions, ask your Datadog Admin to update your permissions from your Organization Settings.

## Using configuration at runtime

To make changes to a service's configuration at runtime:

1. Go to the [Service Catalog][3] in APM.
1. Hover over the service for which you want to update configuration.
1. Click **Full Page** next to the service name.
1. Click **Service Info**.
1. From the **Setup Guidance** tab, click **Edit**.
1. Change the configuration options as needed. See [supported configuration options](#supported-configuration-options) for more details.
1. Click **Apply Configuration**.

**Note**: You can also access configuration at runtime from the Trace View panel. Make sure you select an environment for your service to see it.

In **Active Library Configuration**, you can see which options are configured for this service and the selected environment:

{{< img src="/tracing/runtime_config/active-library-config.png" alt="From the Setup Guidance tab, you can see your active library configuration." style="width:100%;">}}

In this example, you can see that Log Injection is enabled for the Staging environment across two instances. An instance refers to an instance of the Remote Configuration client. There should be one instance per process of your application.

You can tell when the configuration changes have been successfully applied by referencing the **X Applied** text. In this example, the configuration applied successfully to all two instances.

## Supported configuration options

The following options are supported with configuration at runtime. The required tracer version is listed for each language: 

| Option                                                                                                                                 | Java      | Javascript | Python | .NET      | Ruby      | Go | PHP | C++ |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|------------|--------|-----------|-----------|----|-----|-----|
| <h5>Custom sampling rate</h5>Set a global sampling rate for the library using `DD_TRACE_SAMPLE_RATE`.                                  | `1.17.0+` | `4.11+`    | `?`    | `2.33.0+` | `1.13.0+` |    |     |     |
| <h5>Log injection</h5>Automatically inject trace correlation identifiers to correlate logs and traces by enabling `DD_LOGS_INJECTION`. | `3.32+`   |            |        |           |           |    |     |     |
| <h5>HTTP header tags</h5>Add HTTP header values as tags on traces using `DD_TRACE_HEADER_TAGS`.                                        | `2.45+`   |            |        |           |           |    |     |     |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /agent/
[3]: /tracing/service_catalog/
[4]: /account_management/rbac/permissions/
