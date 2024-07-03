---
aliases:
- /ja/security/security_monitoring/getting_started/
further_reading:
- link: /security/application_security/terms
  tag: Documentation
  text: Application Security terms and concepts
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: How Application Security Management works
- link: /security/application_security/enabling/
  tag: Documentation
  text: Enabling ASM
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to elevate your security and threat detection
- link: /getting_started/application_security/software_composition_analysis
  tag: Guide
  text: Getting Started with Software Composition Analysis
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Security research, reports, tips, and videos from Datadog
kind: documentation
title: Getting Started with Application Security Management
---

## Overview

Datadog Application Security Management (ASM) helps secure your web applications and APIs in production. ASM provides visibility into application-level vulnerabilities in your services, and protects in real-time from attacks and attackers that aim to exploit these vulnerabilities.

This guide walks you through best practices for getting your team up and running with ASM.

## Identify services that have security risk


**Identify services vulnerable or exposed to attacks** that would benefit from ASM. On the [**Service Catalog > Security page**,][1] view and select the services you wish to enable.

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="ASM Services page view, showing Vulnerabilities and sorted by Suspicious requests column." style="width:100%;" >}}

These security insights are detected from data reported by APM. The insights help prioritize your security efforts. ASM identifies, prioritizes, and helps remediate all security risks on your services.

**Note**: If no vulnerabilities or suspicious requests are reported, ensure your services are using a recent Datadog tracing library version. From the [Security Service Catalog][2], open any service's side panel and look at its **Tracing Configuration**.


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="Tracer Configuration tab in APM Service Catalog page view. Highlighting which version of the Datadog Agent, and Datadog tracing library are being used by your services." style="width:100%;" >}}


## Enable ASM

### Enable ASM with in-app instructions

On the [ASM landing page,][18] follow the instructions to get started. This includes:
- Guided selection of services that would benefit from ASM.
- Configuring your Datadog tracing libraries with an environment variable.
- Restarting your services. </br>

1. Click **Get Started with ASM**.
2. Select **Get Started** to detect vulnerabilities in open-source libraries (Software Composition Analysis), find and fix code-level vulnerabilities (Code Security), and find and enable threat detection on your services (Threat Management).
3. Follow the instructions to get started with ASM.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Software Composition Analysis setup page." style="width:100%;" >}}


### Enable ASM with Remote Configuration
#### Prerequisites:
- Datadog Agent versions 7.42.0 or higher installed on your hosts or containers.
- Datadog Tracer versions are [compatible with Remote Configuration][16].

#### Setup Remote Configuration (if not enabled already)
  Follow the steps to enable [Remote Configuration][17] in your Datadog UI. This includes:
  1. Activate Remote Config capability for your organization.
  2. Add Remote Configuration capability to an existing API key, or create a new one.
  3. Update your Datadog Agent configuration to use the API key with Remote Configuration capability.

  See [Setting up Remote Configuration][21] for more information.

### Test ASM
Once enabled, ASM immediately identifies application vulnerabilities and detects attacks and attackers targeting your services.

1. **Validate vulnerabilities**: Navigate to the [Vulnerabilities tab][14], triage and remediate your vulnerabilities.
2. **Validate attacks**: Send attack patterns to trigger a test detection rule. From your terminal, run the following script:

  {{< code-block lang="sh" >}}
  for ((i=1;i<=250;i++)); do
  # Target existing service's routes
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-log';
  # Target non existing service's routes
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-log';
  done{{< /code-block >}}

3. Go to [Security Signals Explorer][6] to see the signal that is generated after a few seconds.

## Reports and notifications

1. Set up [notification rules][23] to receive alerts using Slack, Jira, email, and more.
3. Subscribe to the weekly [threat digest][22] reports to begin investigation and remediation of the most important security threats discovered in the last seven days. 


Interested in best practices to go further? View the [in-product Quickstart Guide.][19]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /ja/security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /ja/security/application_security/how-appsec-works/
[5]: /ja/security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /ja/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /ja/security/notifications/rules/
[13]: /ja/security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: https://docs.datadoghq.com/ja/agent/guide/how_remote_config_works/?tab=configurationyamlfile#overview
[16]: https://docs.datadoghq.com/fr/security/application_security/enabling/compatibility/
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
[20]: /ja/getting_started/application_security/#setup-asm
[21]: /ja/agent/remote_config?tab=configurationyamlfile#setup
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules