---
title: Compliance Reports
kind: documentation
aliases:
  - /security_platform/cspm/frameworks_and_benchmarks
further_reading:
- link: "security/cspm/getting_started"
  tag: "Documentation"
  text: "Getting started with CSPM"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) comes with more than 400 out-of-the-box detection rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [detection rule][1] maps to one or more controls within the following compliance standards and industry benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][2]
- [CIS Azure Foundations Benchmark v1.3.0][3]
- [CIS GCP Foundations Benchmark v1.3.0][22]
- [CIS Docker Benchmark v1.2.0][4]
- [CIS Kubernetes Benchmark v1.5.1**][5]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [ISO/IEC 27001 v2][8]
- [HIPAA][9]
- [GDPR][10]

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][11] and forward [Cloudtrail logs to Datadog][12].

**Some [CIS Kubernetes Benchmark][5] detection rules only apply to self-hosted Kubernetes clusters.

Datadog also provides Essential Cloud Security Controls, a set of recommendations developed by Datadog internal security experts. Based on common cloud security risks we have observed at Datadog, this ruleset aims to help users new to cloud security easily remediate high-impact misconfigurations across their cloud environments.

**Note**: CSPM provides visibility into whether your resources are configured in accordance with certain detection rules. These rules address various regulatory frameworks, benchmarks, and standards ("Security Posture Frameworks"). CSPM does not provide an assessment of your actual compliance with any Security Posture Framework, and the detection rules may not address all configuration settings that are relevant to a given framework. Datadog recommends that you use CSPM in consultation with your legal counsel or compliance experts.

## View your compliance posture

View a high-level overview of your compliance posture for each framework on the CSPM [Overview][20] page.

- **Framework Overview**: A [detailed report](#explore-compliance-framework-reports) that gives you insight into how you score against a framework's requirements and rules.
- **Explore Resources**: A filtered view of the **Findings** page that shows resources with findings for the selected framework.
- **Configure Rules**: Customize how your environment is scanned and set notification targets by modifying the detection rules for each framework.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance-reports-overview.png" alt="The compliance reports section of the CSPM overview page provides a high-level overview of your compliance posture" style="width:100%;">}}

## Explore compliance framework reports

Compliance framework reports show which rules are failing in your environment, along with details about the misconfigured resources.

The summary at the top of the report shows the number of rules with Pass/Fail findings, the top three high-severity rule failures, and a detailed breakdown of the rules based on severity. You can also explore your past posture with the time selector, and download a PDF copy of the report.

Below the summary is a complete listing of all rules associated with the framework, organized by requirements and controls, along with the number of resources checked by the rule, and the percentage of failures.

{{< img src="security/cspm/frameworks_and_benchmarks/report-2.png" alt="The CIS AWS compliance framework report provides details on critical rule failures" style="width:100%;">}}

Select a rule to view details about the misconfigured resources, the rule description, its framework or industry benchmark mapping, and suggested remediation steps.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding.png" alt="The detection rule side panel includes information about the rule and resources with failed findings" style="width:75%;">}}

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
[21]: /security/cspm/detection_rules
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
