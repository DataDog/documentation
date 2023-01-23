---
title: How Remote Configuration Works
kind: guide
#is_beta:true
#private:true
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

**Note**: The configuration changes applied through Remote Configuration take priority over Agent configuration file and environment variables, don't overwrite your existing configuration settings, and are not visible in the Agent configuration file.

## Product and feature capabilities
The following products and features are supported with Remote Config: 

#### Application Security Management (ASM):  
<div class="alert alert-info">This feature is in public beta.</div>

- **1-click ASM activation**: This feature allows you to enable ASM in 1-click from the Datadog UI.
- **In-App Web Application Firewall (WAF) automated attack patterns updates**: this feature allows your service to receive the newest attack patterns as Datadog releases them, following new vulnerabilities or attack vectors being disclosed.
- **Protect**: This feature allows you to block attackers' IPs, authenticated users, and suspicious requests that are flagged in ASM Security Signals/Traces temporarily or permanently through the Datadog UI.

#### Application Performance Management (APM) Dynamic Instrumentation:
- **Dynamic Instrumentation**: This feature provides you the ability to send critical metrics, traces, and logs from your live applications with no code changes.

{{< beta-callout url="https://www.datadoghq.com/dynamic-instrumentation-request/" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Dynamic Instrumentation is in private beta. Fill out this form if you would like to
  access it.
{{< /beta-callout >}}
#### Cloud Workload Security (CWS):
<div class="alert alert-info">This feature is only available in private beta.</div>

- **Automatic rules updates**: This feature allows you to automatically receive and update the default agent rules maintained by Datadog as new enhancements are released.

## Security Considerations
 
To ensure confidentiality, integrity, and availability of configurations received and applied by your Agents and tracing libraries, Datadog has implemented the following safeguards:

* Agents deployed in your infrastructure request configurations from Datadog 
* Datadog never sends configurations unless requested by Agents, and only sends configurations relevant to the requesting Agent.
* Since these requests are initiated from your Agents to Datadog , there is no need to open additional ports in your network firewall.
* The communication between your Agents and Datadog is encrypted using HTTPS, and is authenticated and authorized using your Datadog API key. 
* Only users with the right RBAC permissions can add Remote Configuration scope on the API key and use the supported product features. 
* Your configuration changes submitted via the Datadog UI are signed and validated on the Agent and tracing libraries, guaranteeing end-to-end integrity of the configuration.

## Enabling Remote Configuration

#### Pre-requisites to enable Remote Configuration:

To use Remote Configuration, you need to meet the following prerequisites:

1. Agents and tracing libraries are required to be installed on your hosts and/or containers in your environment.
2. Agent version `7.41.1` or higher is required. If your Agent is on a version below `7.41.1`, please upgrade your Agent.
3. Datadog tracing libraries should be at the minimum versions shown. Please update the software on your tracing libraries if you are not running one of the supported minimum versions.

| Product feature                        | Go            | Java          | Python        | .Net          | NodeJS        |
|----------------------------------------|---------------|---------------|---------------|---------------|---------------|
| APM (Feature: Dynamic Instrumentation) |               | 1.5.0         | x.y.z         | 2.22.0        |               |
| ASM feature: Protection                | 1.45.1        | 1.4.0         |               | 2.16.0        | 3.11.0        |
| ASM feature: 1-click activation        |               | 1.4.0         |               | 2.17.0        | 3.9.0         |


#### Setup:
Once you've ensured that you meet the prerequisites, you can proceed with enabling Remote Configuration using the following steps: 

1. To authenticate and authorize your Agent to use Remote Configuration, you need to add Remote Configuration scope on your Datadog API key. You can add Remote Configuration scope on either your existing API key or you may choose to create a new API key. 

2. In your [Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) page, either click on your existing API key, or click to Create a new API key.

3. After creating a new API key, or clicking to edit your existing API key, you will see a screen to enable Remote Configuration:

{{<img src="agent/guide/RC_Key_updated.png" alt="RC Key Updated" width="90%" style="center">}}

**Note**: RBAC permissions [api_keys_write](https://docs.datadoghq.com/account_management/api-app-keys/) are required to add Remote Configuration scope on an existing API key or create a new API key. Contact your organization's Datadog administrator to add Remote Configuration scope on your API key.

4. Update your agent configuration file:

{{< tabs >}}
{{% tab "Configuration yaml" %}}
Add the following to your datadog-agent `datadog.yaml`: You only need to update the `api_key` field if you are creating a new API key.

```yaml
api_key: xxx
remote_configuration:
  enabled: true
  ```

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following environment variable to your Agent manifest: You only need to update the `api_key` field  if you are creating a new API key.

```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

After completing the steps listed above, your Agent is ready to receive remotely issued configurations. To use the features outlined above, follow the [ASM](https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection) and [APM](https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration) specific instructions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}