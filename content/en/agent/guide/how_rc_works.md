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
Remote Configuration is a Datadog capability that allows you to remotely configure the behavior of Datadog resources (e.g., Agents and tracers) deployed in your infrastructure, for select product features. Using Remote Configuration makes it easier to apply Agent and tracer configurations in your environment on demand, decreasing management costs and reduces friction between teams, accelerating resolution times. For Datadog security products, Application Security Management and Cloud Workload Security, Remote Configuration enabled Agents and tracers provide real-time security updates, enhancing security posture for your applications and cloud infrastructure.  

## How it works
Once you enable Remote Configuration on the Datadog Agent, it will poll the configured [Datadog site](https://docs.datadoghq.com/getting_started/site/) periodically, to determine if there are any configuration changes to apply to your Remote Configuration enabled Agents or tracers.

The process is asynchronous, for example, after submitting changes in the respective Datadog product UI for a Remote Config enabled product feature, this configuration change will be applied and stored in Datadog. When your Agents are enabled with Remote Config, they will poll Datadog for any configuration changes they can receive and apply automatically.

**Note**: The configuration changes are stored in Datadog and applied to your Agents and tracers, and not applied to the Agent configuration file on your host.

{{<img src="agent/guide/RC_Diagram.png" alt="RC Diagram" width="90%" style="center">}}<br>

## Product and feature capabilities
The following products and features are supported with Remote Config: 

#### ASM (Application Security Management):  
ASM features available in Public Beta:

- **1-click ASM activation**: This feature allows you to enable ASM in 1-click from Datadog UI.

- **Protect**: This feature allows you to block attackers IPs that are flagged in ASM Security Signals temporarily or permanently with a single click in the Datadog UI. See [How App Sec works](https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection) for more information<br>
[placeholder link to ASM specific RC docs]

- **Datadog Event Rules**: This feature provides the ability to receive and apply Datadog-defined or default event rules in real-time.

- **Custom Event Rules**: This feature provides the ability to configure custom event rules for your application.

#### CWS (Cloud Workload Security):
Available in Private Beta only

- **Automatic rules updates**: This feature allows you to automatically receive and update the default agent rules maintained by Datadog as new enhancements are released.

#### Application Performance Management (APM) Dynamic Instrumentation: 
Available in Private Beta only

- **Ability to send critical metrics, traces, and logs from your live applications with no code changes**. See [How to configure Remote config for Dynamic Instrumentation](https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration) for more information

## Security Considerations
 
One of the core security goals of Remote Configuration is guaranteeing the end-to-end integrity of configurations.
To reach this goal, Datadog implements multiple internal controls and generally follow a zero-trust policy:

* All the requests between our services and from external services are authenticated and checked against authorization policies
* All the requests between our services are encrypted
* Configurations are signed as soon as they enter our systems and those signatures are checked in the Agent
* All of our Databases use authentication and in transit encryption

## Enabling Remote Configuration

#### Pre-requisites:
*Agent installation is required*<br>
Datadog Agent version `7.41.1` or higher<br>
Tracer versions/languages -

Matrix

#### Setup:
Remote Configuration capability needs to be enabled on either your existing API key, or you may choose to create a new API key that has Remote Configuration capability enabled.

1. In your [Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) page, either click on your existing API key, or click to Create a new API key.

2. After saving your new key, or clicking to edit your existing key, you will be presented with a screen to enable Remote Configuration:

{{<img src="agent/guide/RC_Key_updated.png" alt="RC Key Updated" width="90%" style="center">}}

**Note**: Datadog Administrator permissions are required to enable Remote Configuration and create a key. This is a one-time setup per environment. If you do not have the necessary access rights, contact your Datadog administrator.

3. Update your agent configuration file:

{{< tabs >}}
{{% tab "Host based Agent" %}}
Add the following to your datadog-agent `datadog.yaml`:
```yaml
api_key: xxx
remote_configuration:
  enabled: true
  ```

{{% /tab %}}
{{% tab "Containerized Agent" %}}
Add the following environment variable to your Agent manifest:
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The above example is shown using the literal `api_key`; please follow the [Secrets documentation](https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux) to secure your `api_key`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}