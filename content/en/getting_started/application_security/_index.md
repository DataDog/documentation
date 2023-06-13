---
title: Getting Started with Application Security Management
kind: documentation
further_reading:
- link: "/security/application_security/terms"
  tag: "Documentation"
  text: "Application Security terms and concepts"
- link: "/security/application_security/how-appsec-works"
  tag: "Documentation"
  text: "How Application Security Management works"
- link: "/security/application_security/enabling/"
  tag: "Documentation"
  text: "Enabling ASM"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to elevate your security and threat detection"
- link: "/getting_started/application_security/vulnerability_management"
  tag: "Guide"
  text: "Getting Started with Application Vulnerability Management"
- link: "https://securitylabs.datadoghq.com/"
  tag: "Security Labs"
  text: "Security research, reports, tips, and videos from Datadog"
---

## Overview

Datadog Application Security Management (ASM) is meant to help you easily secure your web applications and APIs in production. It provides visibility into application-level vulnerabilities in your services and protects in real-time from attacks and attackers that aim to exploit these vulnerabilities.

This guide walks you through best practices for getting your team up and running with ASM.

## Identify services under security risk

Identify which of your services are exposed to security risks and would most benefit from ASM by checking your ASM landing page.

1. **Identify services vulnerable or exposed to attacks.** Head to the [ASM Setup page][1] and select services recommended by Datadog.

   {{< img src="getting_started/appsec/ASM_activation_service_selection.png" alt="ASM Setup page view, sorted by Suspicious requests columns. The product-recommendation service, for example, shows tens of vulnerabilities and thousands of suspicious requests detected." style="width:100%;" >}}

   These security insights are detected from data reported by APM. They help you prioritize your security investments. ASM will then identify, prioritize and help remediate all security risks on your services.

2. **No service recommended by Datadog?.** In case no vulnerabilities or suspicious requests are reported yet:

   - Ensure your services are using a recent Datadog tracing library version. From [APM Service Catalog][2]: click on service to open sidepanel > Tracing Configuration.
  // Add image for Tracing configuration here 
   - Identify services that are exposed to traffic coming from the internet and go ahead with the ASM setup.
  
    Once you’ve identified a couple of services under security risks, it is time to enable ASM.

## Setup ASM

ASM relies on the same library as Datadog Application Performance Monitoring (APM). 
To benefit from all the ASM capabilities - detections auto-updates, protection - we recommend enabling [Remote Configuration][15] first.

### Enable ASM with in-app instructions

Go to the [ASM Setup page][1] and follow the instructions to get started with the product. This includes:
- Guided selection of services that would benefit from ASM
- Configuring your Datadog tracing libraries with an environment variable
- Restarting your services

### Enable ASM in a few clicks with Remote Configuration
#### Prerequisites
- Datadog Agent versions 7.42.0 or higher are installed on your hosts or containers
- Datadog Tracer versions are [compatible with Remote Configuration][16]

#### Setup Remote Configuration (if not enabled already)
  Follow the steps to enable [Remote Configuration][17] in your Datadog interface. You will only need to:
  1. Activate the capability for your Datadog organization
  2. Add Remote Configuration rights to an existing API key, or create a new one
  3. Update your Datadog Agent configuration to use the API key with Remote Configuration rights

#### Enable ASM in a few clicks
  1. [Go to ASM][18] and click “Get Started with ASM”
  2. Select services exposed to risk that are recommended by Datadog
  3. Follow the instructions to get started with ASM.

## Test ASM
Once enabled, ASM will immediately identify application vulnerabilities and start detecting attacks and attackers targeting your services:

1. Validate vulnerabilities are reported by checking the [Vulnerabilities tab][14], helping you triage and remediate them.
2. Validate attacks are being monitored in traffic by sending attack patterns triggering a test detection rule. From your terminal, run the following script:

  {{< code-block lang="sh" >}}
  for ((i=1;i<=200;i++)); do
  # Target existing service's routes
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-log';
  # Target non existing service's routes
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-log';
  done{{< /code-block >}}

3. A first [Security Signal][6] should be generated within a few seconds.

ASM is now up and running with basic configuration. Interested in best practices to go further? Check our [in-product Quickstart Guide.][19]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/asm/services-setup/services-selection?services=recommended
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /security/application_security/how-appsec-works/
[5]: /security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /security/notifications/rules/
[13]: /security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: https://docs.datadoghq.com/agent/guide/how_remote_config_works/?tab=configurationyamlfile#overview
[16]: https://docs.datadoghq.com/fr/security/application_security/enabling/compatibility/
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
