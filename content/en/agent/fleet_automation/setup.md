---
title: Set up Fleet Automation
disable_toc: false
---

< **HH**: I've dumped a bunch of relevant information into this page, but I haven't organized it yet >

## Enable Remote Configuration

### Prerequisites

< **HH**: Some of this might be more relevant to tracing. I'll figure that out >

- Datadog Agent version `7.41.1`  (`7.42.0` for APM sampling rate, `7.43.0` for APM Remote Instrumentation) or higher installed on your hosts or containers.
- For Datadog products that use tracing libraries, you also need to upgrade your tracing libraries to a Remote Configuration-compatible version. For ASM Protection capabilities and ASM 1-click activation, see [ASM compatibility requirements][6]. For Dynamic Instrumentation, see [Dynamic Instrumentation prerequisites][20].

### Setup

1. Ensure your RBAC permissions include [`org_management`][7], so you can enable Remote Configuration for your organization.

2. Ensure your RBAC permissions include [`api_keys_write`][5], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.

3. On the [Remote Configuration][8] page, enable Remote Configuration. This enables Datadog components across your organization to receive configurations from Datadog.

   **Note:** Beginning April 8, 2024, Remote Configuration is on by default for:

   - New child organizations that are created by existing Datadog customers who already have enabled Remote Configuration at the parent organization level **and** are in the same Datadog site as their parent organization.
   - Organizations created by new Datadog customers.

   To opt out of Remote Configuration use, see the [opt-out section][23].

4. Select an existing API key or create a new API key, and enable the Remote Configuration capability on the key. If your new organization fulfills the conditions mentioned in step 3, Remote Configuration is enabled on your API keys be default.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

5. Update your Agent configuration file:

   **Note:** This step is required only for Agent versions 7.46.0 or lower. Starting with Agent version 7.47.0, `remote_configuration.enabled` is set to `true` by default in the Agent. To opt-out of Remote Configuration use, see the [opt-out section][23].

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

## Configure Fleet Automation

Fleet Automation incorporates several Datadog features, which are all enabled automatically in Agent version 7.49/6.49 or later. To ensure you have access to all of the features, upgrade your Agents to version 7.49/6.49 or later.

If you're using an older Agent, you might still be able to enable the following Datadog features individually:
- **Remote Configuration**: For information on supported Agent versions and configuration steps, see [Enabling Remote Configuration][3].
- **Agent configuration**: Agent version 7.39/6.39 or later is required to enable the Agent configuration tab. It is enabled by default in Agent versions 7.47.0/6.47.0 or later. To enable Agent configuration manually, set `inventories_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable.
- **Agent integration configuration**: Agent integration configuration is enabled by default on Agent versions 7.49/6.49 or later. To enable Agent integration configuration manually, set `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `true`. Alternatively, use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features.

## Control access to Fleet Automation

Fleet Automation is available to all users in a Datadog organization. You can control access to specific functionality:

| Permission | Description |
|--------------|---------------|
| `API keys read`| Restricts which users can view and search Agents by API key. |
| `Agent flare collection` | Restricts which users can remotely send flares. |

For information on setting up roles and permissions, see [Access Control][5].

