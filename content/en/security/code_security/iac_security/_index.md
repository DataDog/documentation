---
title: Infrastructure as Code Security
aliases:
  - /security/cloud_security_management/iac_scanning/
further_reading:
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) Security is in Preview. To request access, complete the form.
{{< /callout >}}

{{< img src="/code_security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="IaC misconfiguration side panel showing details for the high severity IMDSv1 Enabled issue, including a security summary, code snippet, detection timestamps, and remediation steps." width="100%">}}

Infrastructure as Code (IaC) Security automatically analyzes your Terraform files for security misconfigurations. Findings appear in the Code Security Vulnerabilities tab, where you can group, filter, and triage them by severity, status, and other attributes. For each finding, Datadog provides detailed remediation guidance and a code snippet showing the affected resource and file location.

<div class="alert alert-info">IaC Security supports GitHub for version control and Terraform for infrastructure as code.</div>

## Key capabilities

With IaC Security, you can:

- Scan Terraform files for security misconfigurations
- Surface IaC misconfigurations in the Code Security Vulnerabilities tab
- Group and filter findings by severity, triage status, and other facets
- View detailed remediation guidance and code snippets for each finding
- Track finding status and history for triage and resolution
- Configure scanning exclusions

## Getting started

1. [Set up IaC Security][1] in your environment
2. Configure [scanning exclusions][2] if needed
3. Review and triage findings in the [Code Security Vulnerabilities tab][3]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/setup
[2]: /security/code_security/iac_security/exclusions
[3]: https://app.datadoghq.com/security/code-security/iac