---
title: Setting up Remote Configuration for Tracing
description: Learn how to set up and use Remote Configuration to dynamically manage tracing library settings without restarting applications.
further_reading:
- link: "remote_configuration"
  tag: "Documentation"
  text: "Remote Configuration"
---

This guide covers setting up and using Remote Configuration with your tracing libraries. For more information on how Remote Configuration works, see [Remote Configuration][1].

## Prerequisites

- [Datadog Agent][2] 7.47.0 or higher installed on your hosts or containers.
- Upgrade your tracing libraries to a Remote Configuration-compatible version. For more information, see the [Supported configuration options][7] section.
- Ensure your RBAC permissions include [`org_management`][3], so you can enable Remote Configuration for your organization.
- Ensure your RBAC permissions include [`api_keys_write`][4], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.
- Ensure you have the `APM Remote Configuration Read` and `APM Remote Configuration Write` [permissions][3].
  **Note**: If you don't have these permissions, ask your Datadog Admin to update your permissions from your Organization Settings.

## Set up Remote Configuration

1. Ensure that [Remote Configuration is enabled for your organization][5]. This enables Datadog components across your organization to receive configurations from Datadog.
1. Select an existing API key or create a new API key, and enable the Remote Configuration capability on the key if it is not already enabled.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}
1. Restart your Agent.

## Review Remote Configuration status of tracing libraries

You can gain visibility into the Remote Configuration status of your Tracer libraries through the [Remote Configuration UI][5].

The following table describes the meaning of each tracing library status:

  | Tracing library Status| Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | The tracing library is successfully connected to the Remote Configuration service through the associated Agent. This is the optimal state you want your tracing library to be in for Remote Configuration.                                               |
  | UNAUTHORIZED          | The tracing library is associated with an Agent which doesn't have `APM Remote Configuration Read` permission on its API key. To fix the issue, you need to enable Remote Configuration capability on the API Key used by the Agent associated with the tracing library.|
  | CONNECTION ERROR        |   The tracing library deployed in your environment is associated with an Agent that has `remote_config.enabled` set to true in its `datadog.yaml` configuration file, however, the Agent cannot be found in the Remote Configuration service. The most likely cause of this is that the associated Agent is unable to reach Remote Configuration [endpoints][6]. To fix the issue, you need to allow outbound HTTPS access to Remote Configuration endpoints from your environment.
  | DISABLED       |   The tracing library deployed in your environment is associated with an Agent that has `remote_config.enabled` set to false in its `datadog.yaml` configuration file. This could be set deliberately or mistakenly. To enable Remote Configuration on the associated Agent, set `remote_config.enabled` to true.  |
  | NOT CONNECTED       | The tracing library cannot be found in the Remote Configuration service and is associated with an Agent that could have `remote_config.enabled` set to true or false in its `datadog.yaml` configuration file. Check your local Agent configuration or your proxy settings.|
  | UNSUPPORTED AGENT   | The tracing library is associated with an Agent which is not Remote Configuration capable. To fix this issue, update the associated Agent software to the latest available version. |
  | NOT DETECTED   | The tracing library does not support Remote Configuration. To fix this issue, update the tracing library software to the latest available version. |
  | UNKNOWN   | The tracing library status is unknown, and it can't be determined if an Agent is associated with the tracing library. For example, this could be because the Agent is deployed on a fully managed serverless container service like AWS Fargate. |

## Opting out of Remote Configuration for Fleet Automation

You can disable Remote Configuration capabilities:
- at the API key level
- at the Agent level
- at the organization level (**not recommended**)

### At the API key level

Disable the API key of your choice on the [API Keys][8] page. You need the [`api_keys_write`][4] permission to disable Remote Configuration on an API key.

### At the Agent level

Starting with Agent version 7.47.0, `remote_configuration.enabled` is set to `true` by default in the Agent. This setting causes the Agent to request configuration updates from the Datadog site.

If you don't want your Agent to send configuration requests to Datadog, you can set `remote_configuration.enabled` to `false` in the Agent.

{{< tabs >}}
{{% tab "Configuration YAML file" %}}
Change `remote_configuration.enabled` from `true` to `false` in your [configuration YAML file][101]:
```yaml
remote_configuration:
  enabled: false
```

[101]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following to your Datadog Agent manifest:
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Add the following to your Helm chart:
```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### At the organization level

<div class="alert alert-warning"><strong>Datadog does not recommend disabling Remote Configuration at the organization level. Disabling Remote Configuration at the organization level prevents Datadog components in several products across your organization from receiving configurations from Datadog.</strong></div>

To disable Remote Configuration at the organization level:
1. Ensure you have the required `org_management` permission.
1. Go to the [Remote Configuration][5] settings page.
1. Click **Disable**.
1. When the warning message appears, click **Disable** again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration
[2]: /agent/
[3]: /account_management/rbac/permissions/
[4]: /account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /agent/configuration/network
[7]: /tracing/trace_collection/runtime_config/#supported-configuration-options
[8]: https://app.datadoghq.com/organization-settings/api-keys