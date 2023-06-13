---
title: Remote Configuration
kind: documentation
aliases:
- /agent/guide/how_rc_works
- /agent/guide/how_remote_config_works
further_reading:
- link: "/security/application_security/how-appsec-works/#built-in-protection"
  tag: "Documentation"
  text: "How Application Security Monitoring Works"
- link: "/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "/security/cloud_workload_security/setup/?tab=kubernetes#overview"
  tag: "Documentation"
  text: "Setting Up Cloud Workload Security"
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: "Blog"
  text: "Using Datadog Audit Trail"
- link: "https://www.datadoghq.com/blog/remote-configuration-for-datadog/"
  tag: "Blog"
  text: "Apply real-time updates to Datadog components with Remote Configuration"
---

{{% site-region region="gov" %}}

<div class="alert alert-warning">Remote configuration is not available on the US1-FED Datadog site.</div>

{{% /site-region %}}

## Overview
Remote Configuration is a Datadog capability that allows you to remotely configure the behavior of Datadog components (for example, Agents, tracing libraries, and Observability Pipelines Worker) deployed in your infrastructure, for select product features. Use Remote Configuration to apply configurations to Datadog components in your environment on demand, decreasing management costs, reducing friction between teams, and accelerating issue resolution times.

For Datadog security products, Application Security Management and Cloud Workload Security, Remote Configuration-enabled Agents and compatible tracing libraries provide real-time security updates and responses, enhancing security posture for your applications and cloud infrastructure.

## How it works
Once you enable Remote Configuration on the Datadog Agent, it periodically polls the configured [Datadog site][1], to determine whether there are configuration changes to apply to your Remote Configuration-enabled Agents or tracing libraries.

After you submit configuration changes in the respective Datadog product UI for a Remote Configuration-enabled product feature, the changes are stored in Datadog.

The following diagram illustrates how Remote Configuration works:

{{<img src="agent/guide/RC_Diagram_v4.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. You configure select product features in the Datadog UI.
2. The product feature configurations are securely stored within Datadog.
3. Agents in your environments securely poll, receive, and automatically apply configuration updates from Datadog.

**Note**: Configuration changes applied through Remote Configuration are not shown in your Agent configuration file.

## Product and feature capabilities
The following products and features are supported with Remote Config:

### Application Security Management (ASM)

- **1-click ASM activation**: Enable ASM in 1-click from the Datadog UI.
- **In-App attack patterns updates**: Receive the newest Web Application Firewall (WAF) attack patterns automatically as Datadog releases them, following newly disclosed vulnerabilities or attack vectors.
- **Protect**: Block attackers' IPs, authenticated users, and suspicious requests that are flagged in ASM Security Signals and Traces temporarily or permanently through the Datadog UI.

### Application Performance Monitoring (APM)
<div class="alert alert-info">This feature is in private beta.</div>

- **Remotely instrument your Kubernetes services with APM**: Remotely instrument your services in Kubernetes with Datadog APM through Datadog Library Injection, and manage your deployments all within the Datadog UI. Available for Java, Node and Python applications. See [Setting up Remote instrumentation][2] for more information.
- **Remotely set Agent sampling rate**: Remotely configure the Datadog Agent to change its trace sampling rates and set rules to scale your organization's trace ingestion according to your needs, without needing to restart your Datadog Agent.

### Dynamic Instrumentation
<div class="alert alert-info">This feature is in beta.</div>

- Send critical metrics, traces, and logs from your live applications with no code changes.

### Cloud Workload Security (CWS)

<div class="alert alert-info">This feature is in beta.</div>

- **Automatic default agent rule updates**: Automatically receive and update the default Agent rules maintained by Datadog as new Agent detections and enhancements are released. See [Setting Up Cloud Workload Security][3] for more information.

### Observability Pipelines
<div class="alert alert-info">This feature is in private beta.</div>

- **Remotely deploy and update [Observability Pipelines Workers][4] (OPW)**: Build and edit pipelines in the Datadog UI, rolling out your configuration changes to OPW instances running in your environment.

## Security considerations

Datadog implements the following safeguards to protect the confidentiality, integrity, and availability of configurations received and applied by your Datadog components:

* Agents deployed in your infrastructure request configurations from Datadog.
* Datadog never sends configurations unless requested by Agents, and only sends configurations relevant to the requesting Agent.
* Because the configuration requests are initiated from your Agents to Datadog over HTTPS (port 443), there is no need to open additional ports in your network firewall.
* The communication between your Agents and Datadog is encrypted using HTTPS, and is authenticated and authorized using your Datadog API key.
* Only users with the [`api_keys_write`][5] permissions are authorized to enable or disable Remote Configuration capability on the API key and use the supported product features.
* Your configuration changes submitted through the Datadog UI are signed and validated on the Agent and requesting Datadog components, verifying integrity of the configuration.

## Enabling Remote Configuration

### Prerequisites


- Datadog Agent version `7.41.1`  (`7.42.0` for APM sampling rate, `7.43.0` for APM Remote Instrumentation) or higher installed on your hosts or containers. 
- For features that use tracing libraries, the following minimum versions of Datadog tracing libraries include:

  | Product feature                        | Go            | Java          | .Net          | NodeJS
  |----------------------------------------|---------------|---------------|---------------|---------------|
  | Dynamic Instrumentation |               | 1.5.0         | 2.22.0        |               |

  For ASM Protection capabilities and ASM 1-click activation, see [Compatibility Requirements][6].

### Setup

To enable Remote Configuration:

1. Ensure your RBAC permissions include [`org_management`][7], so you can enable Remote Configuration for your organization.

2. Ensure your RBAC permissions include [`api_keys_write`][5], so you can create a new API key with the Remote Configuration capability, or add the capability to an existing API key. Contact your organization's Datadog administrator to update your permissions if you don't have it. A key with this capability allows you to authenticate and authorize your Agent to use Remote Configuration.

3. On the [Remote Configuration][8] page, enable Remote Configuration. This enables Datadog components across your organization to receive configurations from Datadog.

4. Select an existing API key or create a new API key, and enable the Remote Config capability on the key:

   {{<img src="agent/guide/RC_Key_updated.png" alt="API Key properties with Remote Config capability Enable button." width="90%" style="center">}}

5. Update your Agent configuration file:

{{< tabs >}}
{{% tab "Configuration YAML file" %}}
Add the following to your configuration YAML file, specifying the API key that has Remote Config capability enabled:
```yaml
api_key: xxx
remote_configuration:
  enabled: true
``` 

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following to your Datadog Agent manifest, specifying the API key that has Remote Config capability enabled:
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
Add the following to your Helm chart, specifying the API key that has Remote Config capability enabled:
```yaml
datadog:
  apiKey: xxx
  remoteConfiguration:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}


6. Restart your Agent for the changes to take effect. 

After you perform these steps, your Agent requests its configuration from Datadog, and the features that use remote configuration are enabled:
- [CWS default agent rules][9] update automatically as released.
- [Datadog Remote instrumentation][2] is enabled.
- [APM Agent-level sampling rates][10] are applied.  
- [Dynamic Instrumentation][11] is enabled.
- [ASM 1-Click enablement, IP blocking, and attack pattern updates][12] are enabled.

## Best practices

### Datadog Audit Trail

Use [Datadog Audit Trail][13] to monitor organization access and Remote Configuration enabled events. Audit Trail allows your administrators and security teams to track the creation, deletion, and modification of Datadog API and application keys. After Audit Trail is configured, you can view events related to Remote Configuration enabled features and who has requested these changes. Audit Trail allows you to reconstruct sequences of events, and establish robust Datadog monitoring for Remote Configuration. 

### Monitors

Configure [monitors][14] to receive notifications when an event of interest is encountered.

## Troubleshooting

If you experience issues using Remote Configuration, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][15].

### Restart the Agent

After the Agent configuration is updated in the [`datadog.yaml`][16] file, restart the Agent for this change to take effect. 

### Ensure Datadog Remote Configuration endpoints are reachable from your environment	

To use Remote Configuration, both the Agent and the Observability Pipelines Worker deployed in your environment communicate to Datadog Remote Config [endpoints][17]. Ensure that outbound HTTPS has access to these endpoints from your environment. If you also have a proxy in between Datadog and your environment, update your [proxy settings][18] to incorporate Remote Config endpoints.

### Enable Remote Configuration at the organization level

To enable Remote Configuration at the [Organization][8] level in the Datadog UI, follow the **Organization Settings > Security > Remote Configuration** menu. This allows your authenticated and authorized Datadog components to remotely receive configurations and security detection rules of supported features from Datadog. Only users who have the [`org_management`][7] RBAC permission can enable Remote Configuration at the Organization level.

### Enable Remote Configuration on the API key

To authenticate and authorize the Agent to receive configurations and security detection rules, and to allow the Observability Pipelines Worker to receive configurations, enable Remote Configuration on the relevant API Key. Only users who have the [`api_keys_write`][5] RBAC permission can enable Remote Configuration on the API Key.

**Note:** If you have [`api_keys_write`][5] RBAC permission, but are missing Remote Configuration [Organization][8] level permissions, you cannot enable Remote Configuration on a new or an existing API Key. You only have permission to disable Remote Configuration on an existing API Key.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /tracing/trace_collection/library_injection_remote/
[3]: /security/cloud_workload_security/setup
[4]: /observability_pipelines/#observability-pipelines-worker
[5]: /account_management/rbac/permissions#api-and-application-keys
[6]: /security/application_security/enabling/compatibility/
[7]: /account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /security/default_rules/#cat-workload-security
[10]: /tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /security/application_security/how-appsec-works/#built-in-protection
[13]: /account_management/audit_trail
[14]: /monitors/
[15]: /help/
[16]: /agent/remote_config/?tab=configurationyamlfile#setup
[17]: /agent/guide/network
[18]: /agent/proxy/
