---
title: Compliance
description: Evaluate your API security posture against industry-standard compliance frameworks using App and API Protection.
further_reading:
- link: "security/cloud_security_management/misconfigurations/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Cloud Security compliance frameworks and benchmarks"
- link: "https://owasp.org/API-Security/editions/2023/en/0x00-header/"
  tag: "External"
  text: "OWASP API Security Top 10 2023"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

## Overview

API Posture Compliance lets you continuously evaluate your API security posture against industry-standard frameworks. It maps Datadog's built-in API security detection rules to compliance framework controls and provides a real-time posture score showing which controls are passing or failing across your services.

Unlike [Cloud Security compliance][1], which evaluates cloud infrastructure misconfigurations and identity risks, API Posture Compliance focuses exclusively on **API security findings**: threats and vulnerabilities detected in the traffic reaching your application APIs.

{{< img src="security/application_security/api_posture/aap_compliance_framework_detail.png" alt="The OWASP API Security Top 10 framework detail page, showing a posture score, failing findings, and a severity breakdown of failing rules by requirement." style="width:100%;">}}

## Supported frameworks

### OWASP API Security Top 10 (2023)

The OWASP API Security Top 10 identifies the most critical security risks for APIs. Datadog maps its API security detection rules to the ten categories:

| Category | Name | Description |
|----------|------|-------------|
| API1:2023 | Broken Object Level Authorization | APIs fail to verify whether a user is authorized to access specific objects, allowing attackers to read or manipulate data belonging to other users. |
| API2:2023 | Broken Authentication | Flawed or missing authentication mechanisms allow attackers to steal tokens, impersonate users, or bypass login controls entirely. |
| API3:2023 | Broken Object Property Level Authorization | APIs expose sensitive object properties that users should not be allowed to read or write, enabling mass assignment or data leakage attacks. |
| API4:2023 | Unrestricted Resource Consumption | APIs impose no limits on request size or rate, enabling denial-of-service attacks or abuse of downstream resources and third-party costs. |
| API5:2023 | Broken Function Level Authorization | Improper access controls allow unauthorized users to invoke admin or privileged API functions not intended for their role. |
| API6:2023 | Unrestricted Access to Sensitive Business Flows | Exposed business flows such as checkout or login can be automated and abused at scale without proper rate limits or anomaly detection. |
| API7:2023 | Server Side Request Forgery | APIs make server-side HTTP requests to attacker-supplied URLs, potentially exposing internal services, cloud metadata, or other sensitive endpoints. |
| API8:2023 | Security Misconfiguration | Insecure defaults, verbose error messages, open cloud storage, or missing security hardening leave APIs exposed to opportunistic attacks. |
| API9:2023 | Improper Inventory Management | Outdated, undocumented, or shadow API versions remain accessible without oversight, widening the attack surface beyond what is actively maintained. |
| API10:2023 | Unsafe Consumption of APIs | Trusting third-party API responses without proper validation exposes the application to injection attacks, unexpected data, or downstream compromise. |

## How it works

- **Detection rules**: Each Datadog API security detection rule is tagged with the OWASP controls it covers. When a rule fires and generates a finding, the associated control is marked as **failing** for the affected service.
- **Posture score**: The posture score reflects the ratio of controls that are fully passing versus those with at least one failing finding. The score is calculated using the same methodology as [Cloud Security posture scores][3].
- **Compliance Frameworks page**: The [Compliance Frameworks page][4] lists all available frameworks for your API security context. For each framework you can examine control-level details, filter by severity, and open a finding side panel to investigate individual API security events.

## View your compliance posture

Navigate to [**Security > App & API Protection > Compliance**][4] to open the Compliance Frameworks page. You can:
- Select a framework (for example, OWASP API Security Top 10) to see per-control pass/fail status.
- Click a failing control to view the list of API security findings that caused it to fail.
- Open a finding's side panel to see the affected endpoint, severity, and recommended remediation steps.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
[2]: https://owasp.org/API-Security/editions/2023/en/0x00-header/
[3]: /glossary/#security-posture-score
[4]: https://app.datadoghq.com/security/compliance/home?context=aap
