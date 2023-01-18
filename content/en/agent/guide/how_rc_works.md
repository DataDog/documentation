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

# Overview
Remote Configuration is a Datadog capability that allows you, as a user of Datadog, the ability to remotely configure the behavior of Agents and tracers running in your infrastructure, for select product features. Using Remote Configuration makes it easier to apply Agent and tracer configurations in your environment on demand, reducing friction between teams, and accelerate resolution times. Remote Config enabled Agents and tracers provides real-time security updates, increases security posture, and reduces management and service costs that are often spent manually updating Agent configurations.  


# How it works
Remote Configuration is a capability in which once configured, the Datadog Agent will poll the configured Datadog site every 5 seconds, to determine if there have been any configuration changes that should be updated to your Remote Config enabled Agents or tracers.

The process is asynchronous, for example, after submitting changes in the respective Datadog product UI for a Remote Config enabled product feature, this configuration change will be applied and stored in Datadog. When your Agents are enabled with Remote Config, they will poll Datadog for any configuration changes they can receive and apply automatically.

Note: The configuration changes are stored in Datadog and applied to your Agents and tracers, and are never sent to your physical configuration file on your host.

{{< img src="static/images/RC_Diagram.png" alt="RC Diagram" >}}

# Product and feature capabilities
The following products and features are supported with Remote Config: 

ASM (Application Security Management): Public Beta 
1-click ASM activation: Ability to enable/disable ASM in 1 click from the UI 
Protection: Datadog automatically sends IPs, Requests, or Users identified to be blocked by libraries. See [How App Sec works][https://docs.datadoghq.com/security/application_security/how-appsec-works/#built-in-protection] for more information
[placeholder link to ASM specific RC docs]

ASM: Private Beta features
Datadog Event Rules: Real time security updates
Custom Event Rules: Ability to configure custom event rules running in your application libraries 
CWS (Cloud Workload Security): Private Beta
Automatic rules updates: Ability to enable automatic policy updates for CWS, with this feature enabled, the default agent rules maintained by Datadog will automatically update as new enhancements are released 
Dynamic Instrumentation: Private Beta 
Ability to send critical metrics, traces, and logs from your live applications with no code changes. See [How to configure Remote config for Dynamic Instrumentation] [https://docs.datadoghq.com/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration] for more information


{{< img src="static/images/RC_Key.png" alt="RC Key" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}