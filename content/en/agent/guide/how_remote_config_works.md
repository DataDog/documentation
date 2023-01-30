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
  text: "How Application Security Monitoring Works"
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
Remote Configuration is a Datadog capability that allows you to remotely configure the behavior of Datadog resources (for example, Agents and tracing libraries) deployed in your infrastructure, for select product features. Using Remote Configuration makes it easier to apply Agent and tracing library configurations in your environment on demand, decreasing management costs and reducing friction between teams, accelerating resolution times. 

For Datadog security products, Application Security Management and Cloud Workload Security, Remote Configuration-enabled Agents and compatible tracing libraries provide real-time security updates and responses, enhancing security posture for your applications and cloud infrastructure. 

## How it works
Once you enable Remote Configuration on the Datadog Agent, it will periodically poll the configured [Datadog site](https://docs.datadoghq.com/getting_started/site/), to determine whether there are configuration changes to apply to your Remote Configuration-enabled Agents or tracing libraries.

After you submit configuration changes in the respective Datadog product UI for a Remote Configuration enabled product feature, the changes are stored in Datadog. 

The following diagram illustrates how Remote Configuration works:

{{<img src="agent/guide/RC_Diagram_v2.png" alt="RC Diagram" width="90%" style="center">}}

1. You configure select product features in the Datadog UI.
2. The product feature configurations are securely stored within Datadog.
3. Agents in your environments securely poll, receive, and automatically apply configuration updates from Datadog.

**Note**: Configuration changes applied through Remote Configuration are not shown in your Agent configuration file.

## Product and feature capabilities
The following products and features are supported with Remote Config: 

### Application Security Management (ASM):  
<div class="alert alert-info">This feature is in beta.</div>

- **1-click ASM activation**: Enable ASM in 1-click from the Datadog UI.
- **In-App attack patterns updates**: Receive the newest Web Application Firewall (WAF) attack patterns automatically as Datadog releases them, following new vulnerabilities or attack vectors being disclosed.
- **Protect**: Block attackers' IPs, authenticated users, and suspicious requests that are flagged in ASM Security Signals and Traces temporarily or permanently through the Datadog UI.

### Application Performance Monitoring (APM):  
<div class="alert alert-info">This feature is in private beta.</div>

- **Remotely set Agent sampling rate**: Remotely configure the Datadog Agent to change its trace sampling rates and set rules to scale your organization's trace ingestion according to your needs, without needing to restart your Datadog Agent. 

### Dynamic Instrumentation:
<div class="alert alert-info">This feature is in private beta.</div>

- * Send critical metrics, traces, and logs from your live applications with no code changes.

### Cloud Workload Security (CWS):
<div class="alert alert-info">This feature is in private beta.</div>

- **Automatic default agent rule updates**: Automatically receive and update the default Agent rules maintained by Datadog as new Agent detections and enhancements are released. 

## Security Considerations
 
Datadog implements the following safeguards, designed to protect the confidentiality, integrity, and availability of configurations received and applied to your Agents and tracing libraries:

* Agents deployed in your infrastructure request configurations from Datadog.
* Datadog never sends configurations unless requested by Agents, and only sends configurations relevant to the requesting Agent.
* Because the configuration requests are initiated from your Agents to Datadog over HTTPS (port 443), there is no need to open additional ports in your network firewall.
* The communication between your Agents and Datadog is encrypted using HTTPS, and is authenticated and authorized using your Datadog API key. 
* Only users with the right RBAC permissions are authorized to enable Remote Configuration scope on the API key and use the supported product features. 
* Your configuration changes submitted through the Datadog UI are signed and validated on the Agent and tracing libraries, verifying integrity of the configuration.

## Enabling Remote Configuration

### Prerequisites


- Datadog Agent version `7.41.1`  (`7.42.0` for APM sampling rate) or higher installed on your hosts or containers. 
- For features that use tracing libraries (Dynamic Instrumentation, ASM), the following minimum versions of Datadog tracing libraries:


| Product feature                        | Go            | Java          | .Net          | NodeJS          
|----------------------------------------|---------------|---------------|---------------|---------------|
| Dynamic Instrumentation |               | 1.5.0         | 2.22.0        |               |
| ASM Protect                | 1.45.1        | 1.4.0         | 2.16.0        | 3.11.0        |
| ASM 1-click activation        |               | 1.4.0         | 2.17.0        | 3.9.0         |

### Setup
To enable Remote Configuration: 

1.  To authenticate and authorize your Agent to use Remote Configuration, you need to add Remote Configuration scope on your Datadog API key. [Contact support](https://docs.datadoghq.com/help/) to have your Organization added for Remote Config capability on API key.

2. Ensure your RBAC permissions include [api_keys_write](https://docs.datadoghq.com/account_management/api-app-keys/) so you can add Remote Configuration scope on an existing API key, or create a new API key. Contact your organization's Datadog administrator and update your permissions if you don't have it.

3. In your [Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) page, either click on your existing API key, or click to Create a new API key.

4. Enable Remote Config scope on the key:

   {{<img src="agent/guide/RC_Key_updated.png" alt="API Key properties with Remote Config scope Enable button." width="90%" style="center">}}

5. Update your Agent configuration:

{{< tabs >}}
{{% tab "Configuration YAML file" %}}
Add the following to your configuration YAML file, specifying the API key that has Remote Config scope enabled:
```yaml
api_key: xxx
remote_configuration:
  enabled: true
```

6. Restart your Agent for the changes to take effect.  

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following to your Datadog Agent manifest, specifying the API key that has Remote Config scope enabled: 
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