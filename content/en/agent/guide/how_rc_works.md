---
title: How Remote Configuration Works
kind: guide
further_reading:
- link: ""
  tag: "Documentation"
  text: "description of doc"
- link: ""
  tag: "Documentation"
  text: "description of doc"
---

## Overview
Remote Configuration is a Datadog capability that allows you to remotely configure the behavior of Datadog resources (for example, Agents and tracers) deployed in your infrastructure, for select product features. Using Remote Configuration makes it easier to apply Agent and tracer configurations in your environment on demand, decreasing management costs and reduces friction between teams, accelerating resolution times. For Datadog security products, Application Security Management and Cloud Workload Security, Remote Configuration enabled Agents and tracers provide real-time security updates, enhancing security posture for your applications and cloud infrastructure.  

## How it works
Once you enable Remote Configuration on the Datadog Agent, it will poll the configured [Datadog site](https://docs.datadoghq.com/getting_started/site/) periodically, to determine if there are any configuration changes to apply to your Remote Configuration enabled Agents or Tracers.

After submitting configuration changes in the respective Datadog product UI for a Remote Configuration enabled product feature, the changes are stored in Datadog. When your Agents are enabled with Remote Configuration, they will poll Datadog for any configuration changes they should receive and apply automatically.

**Note**: The configuration changes are stored in Datadog and applied to your Agents and tracers, and not applied to the Agent configuration file on your host.

{{<img src="agent/guide/RC_Diagram.png" alt="RC Diagram" width="90%" style="center">}}<br>

1. Configure select product features through Datadog UI.
2. These configurations are stored securely within Datadog.
3. Agents in your environments securely poll and receive, and automatically apply configurations from Datadog.

**Note**: The configuration changes applied through Remote Configuration take priority over  Agent configuration file and environment variables, don’t overwrite your existing configuration settings, and are not visible in the Agent configuration file.

## Product and capabilities
The following products and features are supported with Remote Config: 

#### ASM (Application Security Management):  
ASM features available in Public Beta:

- **1-click ASM activation**: This feature allows you to enable ASM in 1-click from Datadog UI.

- **Protect**: This feature allows you to block attackers' IPs, authenticated users, and suspicious requests that are flagged in ASM Security Signals/Traces temporarily or permanently through the Datadog UI. See [How App Sec works](https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection) for more information<br>
[placeholder link to ASM specific RC docs]

#### CWS (Cloud Workload Security):
Available in Private Beta only

- **Automatic rules updates**: This feature allows you to automatically receive and update the default agent rules maintained by Datadog as new enhancements are released.

#### Application Performance Management (APM) Dynamic Instrumentation: 
Available in Private Beta only

- **Ability to send critical metrics, traces, and logs from your live applications with no code changes**. See [How to configure Remote config for Dynamic Instrumentation](https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration) for more information

## Security Considerations
 
To ensure confidentiality, integrity, and availability of configurations received and applied by your Agent, Datadog follows a zero-trust policy and has implemented the following safeguards:

* Agents deployed in your infrastructure always request configurations from Datadog. Datadog never sends configurations unless requested by Agents and only sends configurations relevant to the requesting Agent.
* The communication to request configurations is initiated from Agents to Datadog so you don't need to open up any additional ports in your network firewall to use Remote Configuration. 
* The communication between Agents and Datadog is encrypted using HTTPS. 
* The communication between Agents and Datadog is authenticated and authorized using your Datadog API key.
* Only users with the correct RBAC permissions are allowed to add Remote Configuration scope on the API key and use the supported product capabilities. 
* Your configuration submitted via the Datadog UI is signed and validated on the Agent and Tracer, guaranteeing end-to-end integrity of the configuration.


## Enabling Remote Configuration

#### Pre-requisites:
*Agent installation is required*<br>
Datadog Agent version `7.41.1` or higher<br>
Tracer versions/languages -

| Product feature                        | Go            | Java          | Python        | .Net          | NodeJS        |
|----------------------------------------|---------------|---------------|---------------|---------------|---------------|
| APM (Feature: Dynamic Instrumentation) | Coming Soon   | 1.5.0         | x.y.z         | 2.22.0        | Coming Soon   |
| ASM feature: Protection                | 1.45.1        | 1.4.0         | Coming Soon   | 2.16.0        | 3.11.0        |
| ASM feature: 1-click activation        | Coming Soon   | 1.4.0         | Coming Soon   | 2.17.0        | 3.9.0         |
| ASM feature: Datadog Event Rules       | Coming Soon   | Coming Soon   | Coming Soon   | Coming Soon   | Coming Soon   |
| ASM feature: Custom Event Rules        | Coming Soon   | Coming Soon   | Coming Soon   | Not supported | Coming Soon   |



#### Setup:
Remote Configuration capability needs to be enabled on either your existing API key, or you may choose to create a new API key that has Remote Configuration capability enabled.

1. In your [Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) page, either click on your existing API key, or click to Create a new API key.

2. After saving your new key, or clicking to edit your existing key, you will be presented with a screen to enable Remote Configuration:

{{<img src="agent/guide/RC_Key_updated.png" alt="RC Key Updated" width="90%" style="center">}}

**Note**: Datadog Administrator permissions are required to enable Remote Configuration and create a key. This is a one-time setup per environment. If you do not have the necessary access rights, contact your Datadog administrator.

3. Update your agent configuration file:

{{< tabs >}}
{{% tab "Configuration yaml" %}}
Add the following to your datadog-agent `datadog.yaml`:
```yaml
api_key: xxx
remote_configuration:
  enabled: true
  ```

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following environment variable to your Agent manifest:
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The above example is shown using the literal `api_key`; please follow the [Secrets documentation](https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux) to secure your `api_key`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}