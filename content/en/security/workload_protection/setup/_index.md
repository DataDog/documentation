---
title: Setting up Workload Protection
disable_toc: false
---

To get started with Workload Protection, use the Workload Protection [Get Started][1] steps in your Datadog account.

<div class="alert alert-info">Activating Workload Protection requires the Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permission</a>.</div>


## Remote configuration

You can enable [Remote Configuration][3] for Workload Protection. 

Remote Configuration can be used to:
- Automatically stay up to date on the latest security detections
- Block attackers and attacks

Remote Configuration can be set up using the Workload Protection [Get Started][1] steps in your Datadog account.

<div class="alert alert-info">To enable Remote Configuration, ask your admin for the <strong>API Keys Write</strong> permission.</div>

## Agent setup options for Workload Protection

Workload Protection supports both **Agentless + Agent-based deployment** and **Agent-based-only deployments**, but not **Agentless-only**.

## Supported deployment types

For a summary of supported Workload Protection deployment types, see [Supported Deployment Types][4].

## Supported Linux distributions

Workload Protection supports multiple [Linux distributions][5].

## Deploy the Agent

You can enable Workload Protection on the Datadog Agent using [multiple tools and systems][6].

## Workload Protection Agent variables

The Datadog Agent has several [environment variables][7] that can be enabled for Workload Protection. This article describes the purpose of each environment variable.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /account_management/rbac/permissions/
[3]: /agent/remote_config/?tab=configurationyamlfile
[4]: /security/workload_protection/setup/supported_deployment_types
[5]: /security/workload_protection/supported_linux_distributions
[6]: /security/workload_protection/setup/agent
[7]: /security/workload_protection/setup/agent_variables