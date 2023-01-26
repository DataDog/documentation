---
title: How Remote Configuration Works
kind: guide
is_beta: true
private: true
aliases:
- /agent/guide/how_rc_works
further_reading:
- link: "https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection"
  tag: "Documentation"
  text: "How App Sec works"
- link: "https://www.datadoghq.com/blog/dash-2022-new-feature-roundup/#application-security-management-protection"
  tag: "Blog"
  text: "Application Security Protection"
- link: "https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "https://docs.datadoghq.com/security/cloud_workload_security/getting_started/?tab=kubernetes#overview"
  tag: "Documentation"
  text: "Getting Started with Cloud Workload Security"

---
{{< site-region region="gov" >}}

Remote configuration is not available on the US1-FED Datadog site.

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu" >}}

## Overview
Remote Configuration is a Datadog capability that allows you to remotely configure the behavior of Datadog resources (for example, Agents and tracing libraries) deployed in your infrastructure, for select product features. Using Remote Configuration makes it easier to apply Agent and tracing library configurations in your environment on demand, decreasing management costs and reducing friction between teams, accelerating resolution times. For Datadog security products, Application Security Management and Cloud Workload Security, Remote Configuration enabled Agents and compatible tracing libraries provide real-time security updates and responses, enhancing security posture for your applications and cloud infrastructure. 

## How it works
Once you enable Remote Configuration on the Datadog Agent, it will poll the configured [Datadog site](https://docs.datadoghq.com/getting_started/site/) periodically, to determine if there are any configuration changes to apply to your Remote Configuration enabled Agents or tracing libraries.

After submitting configuration changes in the respective Datadog product UI for a Remote Configuration enabled product feature, the changes are stored in Datadog. When your Agents are enabled with Remote Configuration, they will poll Datadog for any configuration changes they should receive and apply automatically.

The following diagram describes how Remote Configuration works:

{{<img src="agent/guide/RC_Diagram_v2.png" alt="RC Diagram" width="90%" style="center">}}

1. Configure select product features through Datadog UI.
2. Configurations are stored securely within Datadog.
3. Agents in your environments securely poll, receive, and automatically apply configurations from Datadog.

**Note**: The configuration changes applied through Remote Configuration are not visible in the Agent configuration file.

## Product and feature capabilities
The following products and features are supported with Remote Config: 

#### Application Security Management (ASM):  
<div class="alert alert-info">This feature is in beta.</div>

- **1-click ASM activation**: This feature allows you to enable ASM in 1-click from the Datadog UI.
- **In-App Web Application Firewall (WAF) automated attack patterns updates**: this feature allows your service to receive the newest attack patterns as Datadog releases them, following new vulnerabilities or attack vectors being disclosed.
- **Protect**: This feature allows you to block attackers' IPs, authenticated users, and suspicious requests that are flagged in ASM Security Signals/Traces temporarily or permanently through the Datadog UI.

#### Application Performance Monitoring (APM):  
<div class="alert alert-info">This feature is only available in private beta.</div>

- **Remotely set agent sampling rate**: This features provides you the ability to remotely configure the Datadog Agent to change its trace sampling rates and set rules to scale your organization's trace ingestion according to your needs, without needing to restart your Datadog Agent. This feature works across all languages.

#### Application Performance Monitoring (APM) Dynamic Instrumentation:
<div class="alert alert-info">This feature is only available in private beta.</div>

- **Dynamic Instrumentation**: This feature provides you the ability to send critical metrics, traces, and logs from your live applications with no code changes.

#### Cloud Workload Security (CWS):
<div class="alert alert-info">This feature is only available in private beta.</div>

- **Automatic default agent rule updates**: This feature allows you to automatically receive and update the default agent rules maintained by Datadog Product Detection Engineering (PDE) as new agent detections and enhancements are released. 

## Security for Remote Config
 
To ensure confidentiality, integrity, and availability of configurations received and applied by your Agents and tracing libraries, Datadog has implemented the following safeguards:

* Agents deployed in your infrastructure request configurations from Datadog.
* Datadog never sends configurations unless requested by Agents, and only sends configurations relevant to the requesting Agent.
* Since these requests are initiated from your Agents to Datadog , there is no need to open additional ports in your network firewall.
* The communication between your Agents and Datadog is encrypted using HTTPS, and is authenticated and authorized using your Datadog API key. 
* Only users with the right RBAC permissions are authorized to enable Remote Configuration scope on the API key and use the supported product features. 
* Your configuration changes submitted via the Datadog UI are signed and validated on the Agent and tracing libraries, which verifies the integrity of the configuration from its receipt to delivery.

## Enabling Remote Configuration

#### Pre-requisites to enable Remote Configuration:

To use Remote Configuration, you need to meet the following prerequisites:

1. Datadog Agent version `7.41.1` or higher must be installed on your hosts or containers. 
2. For features that use tracing libraries (APM, ASM), use the following minimum versions of Datadog tracing libraries:


| Product feature                        | Go            | Java          | .Net          | NodeJS          
|----------------------------------------|---------------|---------------|---------------|---------------|
| APM (feature: Dynamic Instrumentation) |               | 1.5.0         | 2.22.0        |               |
| ASM feature: Protection                | 1.45.1        | 1.4.0         | 2.16.0        | 3.11.0        |
| ASM feature: 1-click activation        |               | 1.4.0         | 2.17.0        | 3.9.0         |

#### Setup:
Once you've ensured that you meet the prerequisites, you can proceed with enabling Remote Configuration using the following steps: 

1.  To authenticate and authorize your Agent to use Remote Configuration, you need to add Remote Configuration scope on your Datadog API key. [Contact support](https://docs.datadoghq.com/help/) to have your Organization added for Remote Config capability on API key.

2. Ensure your RBAC permissions include [api_keys_write](https://docs.datadoghq.com/account_management/api-app-keys/) so you can add Remote Configuration scope on an existing API key, or create a new API key. Contact your organization's Datadog administrator and update your permissions if you don't have it.

3. In your [Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) page, either click on your existing API key, or click to Create a new API key.

4. After creating a new API key, or clicking to edit your existing API key, you will see a screen to enable Remote Configuration:

{{<img src="agent/guide/RC_Key_updated.png" alt="RC Key Updated" width="90%" style="center">}}

5. Update your agent configuration file:

{{< tabs >}}
{{% tab "Configuration yaml" %}}
Add the following to your configuration yaml.
Ensure your Agent configuration is using the `api_key` that has Remote Config scope enabled. 
```yaml
api_key: xxx
remote_configuration:
  enabled: true
  ```

6. Restart your Datadog Agent for the changes to take effect.  

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following to your Datadog Agent manifest.
Ensure your Agent configuration is using the `api_key` that has Remote Config scope enabled. 
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

With this configuration, your Agent requests its configuration from Datadog, and the features that use remote configuration are enabled:
- CWS [default agent rules](https://docs.datadoghq.com/security/default_rules/#cat-workload-security) update automatically as released.
- APM Agent-level [sampling rates](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level) are applied.  
- [Dynamic Instrumentation](https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration) is enabled.
- [ASM](https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection) 1-Click enablement, IP blocking, and attack pattern updates are enabled.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

{{< /site-region >}}