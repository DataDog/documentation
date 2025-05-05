---
title: Remote Configuration
aliases:
- /agent/guide/how_rc_works
- /agent/guide/how_remote_config_works
- /agent/remote_config
further_reading:
- link: "/security/application_security/how-appsec-works/#built-in-protection"
  tag: "Documentation"
  text: "How Application Security Monitoring Works"
- link: "/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration"
  tag: "Documentation"
  text: "Dynamic Instrumentation"
- link: "/security/threats/setup"
  tag: "Documentation"
  text: "Setting Up Workload Protection"
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: "Blog"
  text: "Using Datadog Audit Trail"
- link: "https://www.datadoghq.com/blog/remote-configuration-for-datadog/"
  tag: "Blog"
  text: "Apply real-time updates to Datadog components with Remote Configuration"
algolia:
  tags: ['remote config', 'remote configuration']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Remote Configuration is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Remote Configuration is a Datadog capability that allows you to remotely configure and change the behavior of select product features in Datadog components such as Agents, tracing libraries, and Observability Pipelines Workers deployed in your infrastructure. Use Remote Configuration to apply configurations to Datadog components in your environment on demand, decreasing management costs, reducing friction between teams, and accelerating issue resolution times.

For Datadog security products, App and API Protection and Workload Protection, Remote Configuration-enabled Agents and compatible tracing libraries provide real-time security updates and responses, enhancing security posture for your applications and cloud infrastructure.

## How it works

When Remote Configuration is enabled, Datadog components such as the Datadog Agent securely poll the configured [Datadog site][1] for configuration changes that are ready to apply. Pending changes are then automatically applied to Datadog components. For example, after you submit configuration changes in the Datadog UI for a Remote Configuration-enabled product feature, the changes are stored in Datadog.

The following diagram illustrates how Remote Configuration works:

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. You configure select product features in the Datadog UI.
2. The product feature configurations are securely stored within Datadog.
3. Remote-configuration enabled Datadog components in your environments securely poll, receive, and automatically apply configuration updates from Datadog. Tracing libraries that are deployed in your environments communicate with Agents to request and receive configuration updates from Datadog instead of directly polling Datadog.

## Supported environments

Remote Configuration works in environments where supported Datadog components are deployed. Supported Datadog components include:
- Agents
- Tracers (indirectly)
- Observability Pipeline Workers
- Private action runners and serverless container cloud services such as AWS Fargate.

Remote Configuration does not support serverless container managed apps, such as AWS App Runner, Azure Container Apps, Google Cloud Run; or functions deployed with container packaging, such as AWS Lambda, Azure Functions, and Google Cloud Functions.

## Supported products and features

The following products and features are supported with Remote Configuration.

Fleet Automation
: - [Send flares][27] directly from the Datadog site. Seamlessly troubleshoot the Datadog Agent without directly accessing the host.
: - [Upgrade your Agents][29] (Preview).

App and API Protection (AAP)
: - 1-click AAP activation: Enable AAP in 1-click from the Datadog UI.
: - In-App attack patterns updates: Receive the newest Web Application Firewall (WAF) attack patterns automatically as Datadog releases them, following newly disclosed vulnerabilities or attack vectors.
: - Protect: Block attackers' IPs, authenticated users, and suspicious requests that are flagged in AAP Security Signals and Traces temporarily or permanently through the Datadog UI.

Application Performance Monitoring (APM)
: - Configuration at runtime (Beta): Change a service's trace sampling rate, Log Injection enablement, and HTTP header tags from within the Software Catalog UI, without having to restart the service. Read [Configuration at Runtime][22] for more information.
: - Remotely set Agent sampling rate (Public Beta): Remotely configure the Datadog Agent to change its trace sampling rates and set rules to scale your organization's trace ingestion according to your needs, without needing to restart your Datadog Agent.

Dynamic Instrumentation
: - Send critical metrics, traces, and logs from your live applications with no code changes.

Workload Protection
: - Automatic default Agent rule updates: Automatically receive and update the default Agent rules maintained by Datadog as new Agent detections and enhancements are released. See [Setting Up Workload Protection][3] for more information.
: - Automatic deployment of custom Agent rules: Automatically deploy your custom Agent rules to designated hosts (all hosts or a defined subset of hosts).

Observability Pipelines
: - Remotely deploy and update [Observability Pipelines Workers][4] (OPW): Build and edit pipelines in the Datadog UI, rolling out your configuration changes to OPW instances running in your environment.

Sensitive Data Scanner (SDS) through the Datadog Agent
: - Redact sensitive information in your logs within your premises (Preview): Remotely configure and deploy OOTB Sensitive Data Scanning rules to the Datadog Agent in your environment. See [Sensitive Data Scanner][28] for more information.

Private action runner
: - Run Datadog workflows and apps that interact with services hosted on your private network without exposing your services to the public internet. For more information, see [Private Actions][30].

## Security considerations

Datadog implements the following safeguards to protect the confidentiality, integrity, and availability of configurations received and applied by your Datadog components:

- Remote Configuration enabled Datadog components deployed in your infrastructure request configurations from Datadog.
  <div class="alert alert-info">Some components like private action runners are always remote configuration enabled. Others, like Agents, can be enabled or disabled using in-disk configuration options.</div>
- Datadog never sends configuration changes unless requested by Datadog components. If it does send configuration changes, Datadog only sends changes relevant to the requesting component.
- The configuration requests are initiated from your infrastructure to Datadog over HTTPS (port 443). This is the same port that the Agent uses by default to send observability data.
- The communication between your datadog components and Datadog is encrypted using HTTPS and is authenticated and authorized using your Datadog API key except in the case of private action runners where a JWT token is used instead.
- Only users with the [`api_keys_write`][5] permissions are authorized to enable or disable Remote Configuration capability on API keys and use the supported product features.
- Your configuration changes submitted through the Datadog UI are signed and validated by the requesting Datadog component, verifying the integrity of the configuration.

## Enabling Remote Configuration

### Enable Remote Configuration in your organization

<div class="alert alert-info">
<p>Beginning April 8, 2024, Remote Configuration is enabled by default for:
<ul>
   <li>New child organizations that are created by existing Datadog customers who already have enabled Remote Configuration at the parent organization level and are in the same Datadog site as their parent organization.</li>
   <li>Organizations created by new Datadog customers.</li>
</ul></p></div>

To enable Remote Configuration:
1. Ensure your RBAC permissions include [`org_management`][7], so you can enable Remote Configuration for your organization.
1. From your Organization Settings page, enable [Remote Configuration][8]. This enables Datadog components across your organization to receive configurations from Datadog.
1. Follow the [product-specific configuration](#product-specific-configuration) below to finish setting up Remote Configuration.

### Product-specific configuration

After you've enabled Remote Configuration in your organization, consult the documentation below for instructions specific to the product you're configuring.

| Product | Setup instructions |
| ------- | --------------------- |
| Fleet Automation | [Setup Fleet Automation][31] |
| APM | [Configuration at runtime](/tracing/guide/remote_config/) |
| Dynamic Instrumentation | [Getting started with Dynamic Instrumentation](/dynamic_instrumentation/#getting-started) |
| Workload Protection | [Workload Protection](/security/threats/) |
| Observability Pipelines | [Advanced Configurations](/observability_pipelines/advanced_configurations/#bootstrap-options) |
| Sensitive Data Scanner | [Cloud storage](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount) |
| Private Action Runner | [Private Actions Overview](/actions/private_actions/) |

## Best practices

### Datadog Audit Trail

Use [Datadog Audit Trail][13] to monitor organization access and Remote Configuration enabled events. Audit Trail allows your administrators and security teams to track the creation, deletion, and modification of Datadog API and application keys. After Audit Trail is configured, you can view events related to Remote Configuration enabled features and who has requested these changes. Audit Trail allows you to reconstruct sequences of events, and establish robust Datadog monitoring for Remote Configuration.

### Monitors

Configure [monitors][14] to receive notifications when an event of interest is encountered.

## Opting out of Remote Configuration

To opt out, disable Remote Configuration [at the organization level][6]. For additional product-specific steps on disabling Remote Configuration, see [the documentation for the relevant product](#product-specific-configuration).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[3]: /security/threats/setup
[4]: /observability_pipelines/#observability-pipelines-worker
[5]: /account_management/rbac/permissions#api-and-application-keys
[6]: /security/application_security/threats/setup/compatibility/
[7]: /account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /security/default_rules/#cat-workload-security
[10]: /tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /security/application_security/how-appsec-works/#built-in-protection
[13]: /account_management/audit_trail
[14]: /monitors/
[15]: /help/
[16]: /remote_configuration
[17]: /agent/configuration/network
[18]: /agent/configuration/proxy/
[19]: /tracing/software_catalog/
[20]: /dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /tracing/trace_collection/runtime_config/
[23]: /remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /agent/fleet_automation/#send-a-remote-flare
[28]: /security/sensitive_data_scanner/?tab=usingtheagent
[29]: /agent/fleet_automation/remote_management#remotely-upgrade-your-agents
[30]: /actions/private_actions/use_private_actions/
[31]: /agent/fleet_automation/setup/
