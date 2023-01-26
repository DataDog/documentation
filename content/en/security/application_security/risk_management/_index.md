---
title: Application Risk Management
kind: documentation
further_reading:
- link: "/"
  tag: "Documentation"
  text: "tktk"
---

<div class="alert alert-info">Application Security Risk Management is in beta.</a></div>


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