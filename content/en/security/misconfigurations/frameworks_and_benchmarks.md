---
title: Compliance Reports
kind: documentation
aliases:
  - /security_platform/cspm/frameworks_and_benchmarks
  - /security/cspm/frameworks_and_benchmarks
further_reading:
- link: "security/cspm/setup"
  tag: "Documentation"
  text: "Getting started with CSM Misconfigurations"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default CSM Misconfigurations cloud configuration compliance rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore misconfigurations"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
CSM Misconfigurations is not available in the selected site.
</div>
{{< /site-region >}}

Cloud Security Management Misconfigurations (CSM Misconfigurations) comes with more than 400 out-of-the-box compliance rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [compliance rule][1] maps to one or more controls within the following compliance standards and industry benchmarks:

- [CIS AWS Foundations Benchmark v1.5.0*][2]
- [CIS Azure Foundations Benchmark v1.3.0][3]
- [CIS GCP Foundations Benchmark v1.3.0][22]
- [CIS Docker Benchmark v1.2.0][4]
- [CIS Kubernetes Benchmark v1.5.1**][5]
- [CIS Ubuntu 20.04 v1.0.0][23]
- [CIS Ubuntu 22.04 v1.0.0][23]
- [CIS Red Hat Linux 7 v3.1.1][24]
- [CIS Red Hat Linux 8 v2.0.0][24]
- [CIS Red Hat Linux 9 v1.0.0][24]
- [CIS Amazon Linux 2 v1.0.0][25]
- [CIS Amazon Linux 2023 v1.0.0][25]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [ISO/IEC 27001 v2][8]
- [HIPAA][9]
- [GDPR][10]
- [NIST 800-53][30]
- [NIST 800-171][31]
- [NIST Cybersecurity Framework v1.1][32]

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][11] and forward [CloudTrail logs to Datadog][12].

**Some [CIS Kubernetes Benchmark][5] compliance rules only apply to self-hosted Kubernetes clusters.

Datadog also provides Essential Cloud Security Controls, a set of recommendations developed by Datadog internal security experts. Based on common cloud security risks we have observed at Datadog, this ruleset aims to help users new to cloud security easily remediate high-impact misconfigurations across their cloud environments.

**Notes**:
- CSM Misconfigurations provides visibility into whether your resources are configured in accordance with certain compliance rules. These rules address various regulatory frameworks, benchmarks, and standards (Security Posture Frameworks). CSM Misconfigurations does not provide an assessment of your actual compliance with any Security Posture Framework, and the compliance rules may not address all configuration settings that are relevant to a given framework. Datadog recommends that you use CSM Misconfigurations in consultation with your legal counsel or compliance experts.
- The compliance rules for the CIS benchmarks follow the CIS automated recommendations. If you're obtaining CIS certification, Datadog recommends also reviewing the manual recommendations as part of your overall security assessment.

## View your compliance posture

View a high-level overview of your compliance posture for each framework on the CSM Misconfigurations [Compliance][20] page.

- **Framework Overview**: A [detailed report](#explore-compliance-framework-reports) that gives you insight into how you score against a framework's requirements and rules.
- **Explore Resources**: A filtered view of the **Misconfigurations** page that shows resources with misconfigurations for the selected framework.
- **Configure Rules**: Customize how your environment is scanned and set notification targets by modifying the compliance rules for each framework.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports.png" alt="The compliance reports section of the CSM Misconfigurations Compliance page provides a high-level overview of your compliance posture" style="width:100%;">}}

## Explore compliance framework reports

Compliance framework reports show which rules are failing in your environment, along with details about the misconfigured resources.

The summary at the top of the report shows the number of rules with pass/fail misconfigurations, the top three high-severity rule failures, and a detailed breakdown of the rules based on severity. You can also explore your past posture with the time selector, download a PDF copy of the report, and filter the page by account, team, service, and environment tags.

Below the summary is a complete listing of all rules associated with the framework, organized by requirements and controls, along with the number of resources checked by the rule, and the percentage of failures.

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report.png" alt="The CIS AWS compliance framework report provides details on critical rule failures" style="width:100%;">}}

Select a rule to view details about the misconfigured resources, the rule description, its framework or industry benchmark mapping, and suggested remediation steps.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding2.png" alt="The compliance rule side panel includes information about the rule and resources with failed misconfigurations" style="width:75%;">}}

## Create custom compliance frameworks

Create your own compliance framework by adding a custom tag to the compliance rules you wish to track. This enables you to filter the misconfigurations on the [Misconfigurations issue explorer][27] by the custom tag. You can also clone the **Cloud Security Management - Misconfigurations Overview** dashboard and [configure a template variable][28] for the custom tag to dynamically filter the widgets on the dashboard.

1. On the **Compliance Rules** page, select the rule you wish to add the custom tag to.
2. Under **Say what's happening**, navigate to the **Tag resulting misconfigurations with** section and add the `key:value` for the custom tag.
3. Click **Update Rule**.

**Notes**:

- `framework`, `requirement`, and `control` are reserved keys and cannot be used in custom tags. See [Custom Rules][26] for more information.
- You can also add custom tags to rules using the [Update an existing rule API endpoint][29].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /security/cloud_siem/
[12]: /integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /security/misconfigurations/detection_rules
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[26]: /security/misconfigurations/custom_rules/#tagging-findings
[27]: https://app.datadoghq.com/security/compliance
[28]: /dashboards/template_variables/
[29]: /api/latest/security-monitoring/#update-an-existing-rule
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final
[32]: https://www.nist.gov/cyberframework/framework