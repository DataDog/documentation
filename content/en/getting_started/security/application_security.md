---
title: Getting Started with App and API Protection
description: Set up Datadog App and API Protection to secure web applications and APIs. Enable threat detection, code security, and vulnerability scanning for production.
aliases:
- /security/security_monitoring/getting_started/
- /getting_started/application_security
further_reading:
- link: "/security/application_security/terms"
  tag: "Documentation"
  text: "App and API Protection terms and concepts"
- link: "/security/application_security/how-it-works"
  tag: "Documentation"
  text: "How App and API Protection works"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to elevate your security and threat detection"
- link: "https://securitylabs.datadoghq.com/"
  tag: "Security Labs"
  text: "Security research, reports, tips, and videos from Datadog"
---

## Overview

Datadog App and API Protection (AAP) helps secure your web applications and APIs in production.
- With threat detection, Datadog provides real-time protection against attacks and attackers targeting code-level vulnerabilities.
- With [Code Security][28], Datadog detects code and library vulnerabilities in your repositories and your running services, providing end-to-end visibility from development to production.

This guide walks you through best practices for getting your team up and running with AAP.

## Identify services that have security risk


**Identify services vulnerable or exposed to attacks** that would benefit from AAP. On the [**Software Catalog > Security page**,][1] view and select the services you wish to enable.

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="AAP Services page view, showing Vulnerabilities and sorted by Suspicious requests column." style="width:100%;" >}}

These security insights are detected from data reported by APM. The insights help prioritize your security efforts. AAP identifies, prioritizes, and helps remediate all security risks on your services.

**Note**: If no vulnerabilities or suspicious requests are reported, ensure your services are using a recent Datadog tracing library version. From the [Security Software Catalog][2], open any service's side panel and look at its **Tracing Configuration**.


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="Tracer Configuration tab in APM Software Catalog page view. Highlighting which version of the Datadog Agent, and Datadog tracing library are being used by your services." style="width:100%;" >}}


## Enable AAP

### Enable AAP with in-app instructions
- To enable App and API Protection in-app, navigate to [**App and API Protection > Setup**][29].
- To enable Code Security in-app, navigate to [**Code Security > Setup**][29].


<!-- On the [AAP landing page,][18] follow the instructions to get started. This includes:
- Guided selection of services that would benefit from AAP.
- Configuring your Datadog tracing libraries with an environment variable.
- Restarting your services. </br>

1. Click **Get Started with AAP**.
2. Select **Get Started** to detect vulnerabilities in open-source libraries (Software Composition Analysis), find and fix code-level vulnerabilities (Runtime Code Analysis), and find and enable threat detection on your services (App and API Protection).
3. Follow the instructions to get started with AAP.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Software Composition Analysis setup page." style="width:100%;" >}} -->


### Enable AAP with Remote Configuration
#### Prerequisites:
- Datadog Agent versions 7.42.0 or higher installed on your hosts or containers.
- Datadog Tracer versions are [compatible with Remote Configuration][17].

#### Setup Remote Configuration (if not enabled already)
  Follow the steps to enable [Remote Configuration][17] in your Datadog UI. This includes:
  1. Activate Remote Config capability for your organization.
  2. Add Remote Configuration capability to an existing API key, or create a new one.
  3. Update your Datadog Agent configuration to use the API key with Remote Configuration capability.

  See [Setting up Remote Configuration][15] for more information.

### Test AAP
Once enabled, AAP immediately identifies application vulnerabilities and detects attacks and attackers targeting your services.

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

## Disable AAP

For information on disabling AAP or its related capabilities, see the following:

- [Disabling threat management and protection][24]
- [Disabling Code Security (SAST, SCA, or IAST)][27]

## Reports and notifications

{{% sec-hipaa-limits %}}

1. Set up [notification rules][23] to receive alerts using Slack, Jira, email, and more.
2. Subscribe to the weekly [threat digest][22] reports to begin investigation and remediation of the most important security threats discovered in the last seven days.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /security/application_security/how-it-works/
[5]: /security/application_security/how-it-works/add-user-info/
[6]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /security/notifications/rules/
[13]: /security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[20]: /getting_started/application_security/#setup-asm
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules
[24]: /security/application_security/troubleshooting/#disabling-threat-management-and-protection
[25]: /security/application_security/troubleshooting/#disabling-software-composition-analysis
[26]: /security/application_security/troubleshooting/#disabling-code-security
[27]: /security/code_security/troubleshooting/
[28]: /security/code_security
[29]: https://app.datadoghq.com/security/configuration/asm/setup
[30]: https://app.datadoghq.com/security/configuration/code-security/setup

