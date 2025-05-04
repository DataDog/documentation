---
title: Set up Fleet Automation
disable_toc: false
---

To ensure you have access to all Fleet Automation features, upgrade your Agents to version 7.41.1 or later and ensure you've followed the setup instructions below. Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features.

## Enable Remote Configuration

To use Fleet Automation, you must enable Remote Configuration.

### Prerequisites

- Datadog Agent version `7.41.1`

### Setup

1. Ensure your RBAC permissions include [`org_management`][1], so you can enable Remote Configuration for your organization.

2. Ensure your RBAC permissions include [`api_keys_write`][2], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.

3. On the [Remote Configuration][3] page, enable Remote Configuration. This enables Datadog components across your organization to receive configurations from Datadog.

4. Select an existing API key or create a new API key, and enable the Remote Configuration capability on the key. If your new organization fulfills the conditions mentioned in step 3, Remote Configuration is enabled on your API keys be default.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

5. Update your Agent configuration file:

   **Note:** This step is required only for Agent versions 7.46.0 or lower. Starting with Agent version 7.47.0, `remote_configuration.enabled` is set to `true` by default in the Agent. To opt-out of Remote Configuration use, see the [opt-out section](#opting-out-of-remote-configuration).

   {{< tabs >}}
   {{% tab "Configuration YAML file" %}}
   Add the following to your configuration YAML file, specifying the API key that has Remote Configuration capability enabled:
   ```yaml
   api_key: xxx
   remote_configuration:
     enabled: true
   ```

   {{% /tab %}}
   {{% tab "Environment variable" %}}
   Add the following to your Datadog Agent manifest, specifying the API key that has Remote Configuration capability enabled:
   ```yaml
   DD_API_KEY=xxx
   DD_REMOTE_CONFIGURATION_ENABLED=true
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}
   Add the following to your Helm chart, specifying the API key that has Remote Configuration capability enabled:
   ```yaml
   datadog:
     apiKey: xxx
   remoteConfiguration:
     enabled: true
   ```

   {{% /tab %}}
   {{< /tabs >}}


6. Restart your Agent for the changes to take effect.

### Configuration order precedence

Configurations set by higher-priority sources take precedence in the active configuration displayed in Fleet Automation.

Sources from highest to lowest priority:

1. Remote Configuration
   
   **Note**: Configuration changes applied through Remote Configuration are not shown in your local configuration file (`datadog.yaml`).
2. Environment variables set by tools like Helm
3. Configuration files (`datadog.yaml`) that are managed locally or by configuration management tools like Ansible, Chef, or Puppet

Configurations issued by higher-priority sources override configurations issued by lower-priority sources.

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| Permission | Description |
|--------------|---------------|
| `API keys read`| Restricts which users can view and search Agents by API key. |
| `Agent flare collection` | Restricts which users can remotely send flares. |

For information on setting up roles and permissions, see [Access Control][2].


### Review Remote Configuration status of Agents

Gain visibility into the Remote Configuration status of your Agent through the [Remote Configuration UI][6].

The following table describes the meaning of each Agent status:

  | Agent Status     | Description                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | The Agent deployed in your environment is able to reach, authenticate, and authorize successfully to Datadog. This is the optimal state you want your Agents to be in for Remote Configuration.                                               |
  | UNAUTHORIZED          | The Agent deployed in your environment is able to reach Datadog but is not able to authenticate and authorize with Datadog for Remote Configuration operation. The most likely cause is the API Key used by the Agent is not Remote Configuration-enabled. To fix the issue, enable Remote Configuration capability on the API Key used by the Agent.                                                 |
  | CONNECTION ERROR        |   The Agent deployed in your environment has `remote_config.enabled` set to true in its `datadog.yaml` configuration file, however, the Agent cannot be found in the Remote Configuration service. The most likely cause is that the Agent is unable to reach Remote Configuration [endpoints][17]. To fix the issue, allow outbound HTTPS access to Remote Configuration endpoints from your environment. This status displays when the Agent version is `7.45.0` or higher.
  | DISABLED       |   The Agent deployed in your environment has `remote_config.enabled` set to false in its `datadog.yaml` configuration file. Set `remote_config.enabled` to true if you want to enable Remote Configuration on the Agent. This status displays when the Agent version is `7.45.0` or higher. |
  | NOT CONNECTED       | The Agent cannot be found in the Remote Configuration service and could have `remote_config.enabled` set to true or false in its `datadog.yaml` configuration file. Check your local Agent configuration or your proxy settings. This status displays when the Agent version is higher than `7.41.1` but lower than `7.45.0`.            |
  | UNSUPPORTED AGENT   | The Agent is on a version that is not Remote Configuration capable. To fix this issue, update the Agent to the latest available version. |

## Troubleshooting

If you experience issues using Remote Configuration, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][15].

### Restart the Agent

After the Agent configuration is updated in the [`datadog.yaml`][16] file, restart the Agent for th change to take effect.

### Ensure Datadog Remote Configuration endpoints are reachable from your environment

To use Remote Configuration, the Agent deployed in your environment needs access to the Datadog Remote Configuration [endpoints][17]. For a private network connection between your environment and Datadog, you can also connect to Remote Configuration Virtual Private Cloud [endpoints][25]. Ensure that outbound HTTPS has access to Remote Configuration endpoints from your environment. If you also have a proxy in between Datadog and your environment, update your [proxy settings][18] to incorporate Remote Configuration endpoints.

### Enable Remote Configuration on the API key

To authenticate and authorize the Agent to receive configuration, enable Remote Configuration on the relevant API Key. Only users who have the [`api_keys_write`][5] RBAC permission can enable Remote Configuration on the API Key.

**Note:** If you have [`api_keys_write`][5] RBAC permission, but are missing Remote Configuration [Organization][8] level permissions, you cannot enable Remote Configuration on a new or an existing API Key. You only have permission to disable Remote Configuration on an existing API Key.

## Opting out of Remote Configuration

To opt out of Remote Configuration use, you can disable Remote Configuration at the organization level. Optionally, you can also disable Remote Configuration capability at the API key level and Agent level.

### At the Organization level

Disable Remote Configuration at the organization level on the [Remote Configuration][8] page. This disables Datadog components across your organization to receive configurations from Datadog. You need the [`org_management`][7] permission to disable Remote Configuration at the organization level.

### At the API key level
Disable the API key of your choice on the [API Keys][24] page. You need the [`api_keys_write`][5] permission to disable Remote Configuration on an API key.

### At the Agent level
Starting with Agent version 7.47.0, `remote_configuration.enabled` is set to `true` by default in the Agent. This setting causes the Agent to request configuration updates from the Datadog site.

To receive configurations from Datadog, you also need to take the following steps:
- Enable Remote Configuration at the organization level.
- Enable Remote Configuration capability on your API Key from the Datadog UI.
- Allow outbound HTTPS access to Remote Configuration [endpoints][17] from your environment.

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

[1]: /account_management/rbac/permissions#api-and-application-keys
[2]: /account_management/rbac/permissions#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config


/getting_started/site/
/security/threats/setup
/observability_pipelines/#observability-pipelines-worker

[6]: /security/application_security/threats/setup/compatibility/


[9]: /security/default_rules/#cat-workload-security
[10]: /tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /security/application_security/how-appsec-works/#built-in-protection
[13]: /account_management/audit_trail
[14]: /monitors/
[15]: /help/
[16]: /agent/remote_config/?tab=configurationyamlfile#setup
[17]: /agent/configuration/network
[18]: /agent/configuration/proxy/
[19]: /tracing/software_catalog/
[20]: /dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /tracing/trace_collection/runtime_config/
[23]: /agent/remote_config/?tab=configurationyamlfile#opting-out-of-remote-configuration-at-the-agent-level
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /agent/fleet_automation/#send-a-remote-flare
[28]: /security/sensitive_data_scanner/?tab=usingtheagent
[29]: /agent/fleet_automation/remote_management#remotely-upgrade-your-agents
[30]: /actions/private_actions/use_private_actions/
[31]: /agent/fleet_automation/setup/