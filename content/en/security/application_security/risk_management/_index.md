---
title: Application Risk Management
kind: documentation
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Works in Datadog"
- link: "/security/application_security/enabling/"
  tag: "Documentation"
  text: "Enabling Application Security on your services"
---

<div class="alert alert-info">Application Security Risk Management is in beta.</a></div>

## Overview

ASM Risk Management offers built-in detection capabilities that warn you about the vulnerabilities detected in your services' open source dependencies. Details of that information are shown in the [Vulnerability Explorer][3], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

Check [ASM Compatibility][6] to see if your service is supported.

## Get Started

**Join the beta!** If you already use Application security, enroll from the [Application Security home page][4]. If you're new to Application Security, visit the [Application Security landing page][5] for an overview and to get started.

Alternatively, when you view a service details page in APM, the Security tab also provides an **Enable ASM** link where you can join the Risk Management beta.

## Explore vulnerabilities and remediation

The Vulnerability Explorer shows a complete list of vulnerabilities detected by ASM Risk Management, ordering the vulnerabilities based on their severity, and offering filtering capabilities so you can investigate and prioritize problems. It also shows the number of affected libraries, the language of the affected library, and the last time that vulnerability was detected.

{{< img src="security/application_security/appsec-vuln-explorer.png" alt="ASM Risk Management Vulnerability Explorer page." style="width:100%;" >}}

Select a specific vulnerability to see its details, including which services are affected. From here you can explore what containers and infrastructure are potentially affected by the vulnerability, so you know more about the extent of a risk. This provides valuable information for prioritizing remediation tasks.

The explorer also offers remediation recommendations for detected vulnerabilities and shows a collection of links and references to websites or information sources that help you understand the context behind each vulnerability.

{{< img src="security/application_security/appsec-vuln-details.png" alt="ASM Risk Management vulnerability details page showing affected services, links to infrastructure, suggested remediation, and links to more information." style="width:100%;" >}}

## Detect known open source vulnerabilities

Risk management detects the open source libraries used by your application at runtime, and reports security vulnerabilities associated with them. In order to do it, Risk Management combines various public open source software known vulnerability data sources along with data obtained by Datadog security research team. 

## Detect custom code vulnerabilities 

<div class="alert alert-info">Custom code vulnerabilities (<em>unknown vulnerabilities</em>) detection is in private beta. Request access to the feature by <a href="/help/">contacting Support</a>.</div>

Risk Management can find issues in your services' custom code, the proprietary code that implements the business logic of your application from scratch, in addition to open source and third party libraries. 

The custom code vulnerabilities it can find include:

- Insecure Cipher
- Insecure Hashing
- Weak Randomness
- SQL injection
- Path traversal
- LDAP injection
- Command Injection

## Risk information in APM views

Risk Management uses the information APM is already collecting, and flags libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the security views embedded in the [APM Service Catalog][2].

{{< img src="security/application_security/vulns-in-service-catalog.png" alt="Vulnerability information shown in the APM Service Catalog" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[6]: /security/application_security/enabling/compatibility
