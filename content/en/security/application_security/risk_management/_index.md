---
title: Application Risk Management
kind: documentation
further_reading:
- link: "/"
  tag: "Documentation"
  text: "tktk"
---

<div class="alert alert-info">Application Security Risk Management is in beta.</a></div>

ASM Risk Management offers built-in detection capabilities that warn you about the vulnerabilities detected in your open source dependencies. Details of that information are shown in the [Vulnerability Explorer][20], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

The Vulnerability Explorer shows a complete list of vulnerabilities detected by ASM Risk Management, ordering the vulnerabilities based on their severity, and offering filtering capabilities so you can investigate and prioritize problems. It also shows the number of affected libraries, the language of the affected library, and the last time that vulnerability was detected.

{{< img src="security/application_security/appsec-vuln-explorer.png" alt="ASM Risk Management Vulnerability Explorer page." style="width:100%;" >}}

Select a specific vulnerability to see its details, including which services are compromised. From here you can explore what containers and infrastructure are potentially affected by the vulnerability, so you know more about the extent of a risk. This provides valuable information for prioritizing remediation tasks.

The explorer also offers remediation recommendations for detected vulnerabilities and shows a collection of links and references to websites or information sources that help you understand the context behind each vulnerability.

{{< img src="security/application_security/appsec-vuln-details.png" alt="ASM Risk Management vulnerability details page showing affected services, links to infrastructure, suggested remediation, and links to more information." style="width:100%;" >}}

## Detect known OSS vulnerabilities

Risk management detects the open source libraries used by your application at runtime, and reports security vulnerabilities associated with them. In order to do it, Risk management combines various public open source software known vulnerability data sources along with data obtained by Datadog security research team. 

## Detect custom code vulnerabilities 

Custom code vulnerabilities (_unknown vulnerabilities_) detection in private beta. Request access to the feature by [contacting Support][1]. The supported detected features include:

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