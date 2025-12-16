---
title: Remote Configuration for Fleet Automation
description: Configure Remote Configuration with Fleet Automation to enable Agent flares, remote upgrades, and centralized configuration management.
disable_toc: false
further_reading:
- link: "/remote_configuration"
  tag: "Documentation"
  text: "Find out more about Remote Configuration"
- link: "/agent/fleet_automation"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/infrastructure/list/#agent-configuration"
  tag: "Documentation"
  text: "Learn about the Agent configuration view"
- link: "https://www.datadoghq.com/blog/fleet-automation/"
  tag: "Blog"
  text: "Centrally govern and remotely manage Datadog Agents at scale with Fleet Automation"
---

This page covers configuring and using {{< tooltip glossary="Remote Configuration" case="title" >}} with [Fleet Automation][11]. The following Fleet Automation features require Remote Configuration:
| Feature | Description | Minimum Agent Version |
|---------|-------------|------------------------|
| **[Agent flares][9]** | Send a flare from the Datadog site using Fleet Automation | 7.47+<br>7.66+ recommended |
| **[Agent upgrades][10]** | Remotely upgrade your Agents | 7.66+ |
| **[Agent configuration][11]** | Remotely configure your Agents | 7.73+ |

Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features.

## Prerequisites

- Datadog recommends Datadog Agent version `7.66` or later. Although some features might work with earlier versions of the Agent, version `7.66` introduced [breaking changes][12] to Remote Agent Management.
- Ensure your RBAC permissions include [`org_management`][1], so you can enable Remote Configuration for your organization.
- Ensure your RBAC permissions include [`api_keys_write`][2], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.

## Enable Remote Configuration

In most cases, Remote Configuration is enabled by default for your organization. You can check if Remote Configuration is enabled on your organization from the [Remote Configuration][3] settings page. If you need to enable it:
1. Ensure your RBAC permissions include [`org_management`][7], so you can enable Remote Configuration for your organization.
1. From your Organization Settings page, enable [**Remote Configuration**][11]. This enables Datadog components across your organization to receive configurations from Datadog.

## Agent Remote Configuration status

You can gain visibility into the Remote Configuration status of your Agent using the [Remote Configuration UI][3].

The following table describes the meaning of each Agent status:

  | Agent Status     | Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | The Agent deployed in your environment is able to reach, authenticate, and authorize successfully to Datadog. This is the optimal state you want your Agents to be in for Remote Configuration.                                               |
  | UNAUTHORIZED          | The Agent deployed in your environment is able to reach Datadog but is not able to authenticate and authorize with Datadog for Remote Configuration operation. The most likely cause is the API Key used by the Agent is not Remote Configuration-enabled. To fix the issue, enable Remote Configuration capability on the API Key used by the Agent.                                                 |
  | CONNECTION ERROR        |   The Agent deployed in your environment has `remote_config.enabled` set to true in its `datadog.yaml` configuration file, however, the Agent cannot be found in the Remote Configuration service. The most likely cause is that the Agent is unable to reach Remote Configuration [endpoints][4]. To fix the issue, allow outbound HTTPS access to Remote Configuration endpoints from your environment. This status displays when the Agent version is `7.45.0` or higher.
  | DISABLED       |   The Agent deployed in your environment has `remote_config.enabled` set to false in its `datadog.yaml` configuration file. Set `remote_config.enabled` to true if you want to enable Remote Configuration on the Agent. This status displays when the Agent version is `7.45.0` or higher. |
  | NOT CONNECTED       | The Agent cannot be found in the Remote Configuration service and could have `remote_config.enabled` set to true or false in its `datadog.yaml` configuration file. Check your local Agent configuration or your proxy settings. This status displays when the Agent version is higher than `7.41.1` but lower than `7.45.0`.            |
  | UNSUPPORTED AGENT   | The Agent is on a version that is not Remote Configuration capable. To fix this issue, update the Agent to the latest available version. |

## Opting out of Remote Configuration for Fleet Automation

You can disable Remote Configuration capabilities:
- at the API key level
- at the Agent level
- at the organization level (**not recommended**)

### At the API key level

Disable the API key of your choice on the [API Keys][5] page. You need the [`api_keys_write`][2] permission to disable Remote Configuration on an API key.

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
1. Go to the [Remote Configuration][3] settings page. 
1. Click **Disable**. 
1. When the warning message appears, click **Disable** again.

## Troubleshooting

If you experience issues using Remote Configuration with your Agents, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][6].

### Restart the Agent

After the Agent configuration is updated in the [`datadog.yaml`][16] file, restart the Agent for the change to take effect.

### Ensure Datadog Remote Configuration endpoints are reachable from your environment

To use Remote Configuration, the Agent deployed in your environment needs access to the Datadog Remote Configuration [endpoints][4]. For a private network connection between your environment and Datadog, you can also connect to Remote Configuration Virtual Private Cloud [endpoints][7]. Ensure that outbound HTTPS has access to Remote Configuration endpoints from your environment. If you also have a proxy in between Datadog and your environment, update your [proxy settings][8] to incorporate Remote Configuration endpoints.

### Enable Remote Configuration on the API key

To authenticate and authorize the Agent to receive configuration, enable Remote Configuration on the relevant API Key. Only users who have the [`api_keys_write`][2] RBAC permission can enable Remote Configuration on the API Key.

**Note:** If you have [`api_keys_write`][2] RBAC permission, but are missing Remote Configuration [Organization][3] level permissions, you cannot enable Remote Configuration on a new or an existing API Key. You only have permission to disable Remote Configuration on an existing API Key.

[1]: /account_management/rbac/permissions#access-management
[2]: /account_management/rbac/permissions#api-and-application-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /agent/configuration/network
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /help/
[7]: /agent/guide#cloud-infrastructure-guides
[8]: /agent/configuration/proxy/
[9]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[10]: /agent/fleet_automation/remote_management#remotely-upgrade-your-agents
[11]: https://app.datadoghq.com/organization-settings/remote-config

[11]: /agent/fleet_automation/
[12]: /agent/fleet_automation/remote_management#datadog-installer-incompatible-with-agent-pre-766

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
