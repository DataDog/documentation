---
title: Compliance Frameworks
kind: documentation
aliases:
  - /security_platform/cspm/frameworks_and_benchmarks
further_reading:
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
- [CIS Docker Benchmark v1.2.0][4]
- [CIS Kubernetes Benchmark v1.5.1**][5]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [ISO/IEC 27001 v2][8]
- [HIPAA][9]
- [GDPR][10]

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][11] and forward [Cloudtrail logs to Datadog][12].

**Some [CIS Kubernetes Benchmark][5] detection rules only apply to self-hosted Kubernetes clusters.

Datadog also provides Datadog Security Labs, a set of recommendations developed by Datadog internal security experts. Based on common cloud security risks we have observed at Datadog, this ruleset aims to help users new to cloud security easily remediate high-impact misconfigurations across their cloud environments.

**Note**: CSPM provides visibility into whether your resources are configured in accordance with certain detection rules. These rules address various regulatory frameworks, benchmarks, and standards ("Security Posture Frameworks"). CSPM does not provide an assessment of your actual compliance with any Security Posture Framework, and the detection rules may not address all configuration settings that are relevant to a given framework. Datadog recommends that you use CSPM in consultation with your legal counsel or compliance experts.

## Explore your compliance posture

View a high-level overview of your compliance posture for each framework on the CSPM [Overview][20] page.

- Drill down deeper into the details... **Framework Overview** takes to an overview page for the... compliance report?
- **Explore Resources** takes to you to the **Findings** page with filters applied to only show the resources that ...???? for the selected framework. **Explore Resources** to view resources that have **Fail** findings for one or more rules that are mapped to the framework.
- **Configure Rules** to view a filtered view of the **Detection Rules** page showing only the rules that map to controls for the selected framework.

Set notification targets for detection rules
Customize how your environment is scanned by each rule

- **Framework Overview**: 
- **Explore Resources**: View resources with Fail findings for rules that are mapped to the selected framework.
- **Configure Rules**: 

{{< img src="security/cspm/frameworks_and_benchmarks/compliance-reports-overview.png" alt="View a high-level overview of your compliance posture on the overview page" style="width:100%;">}}

## Compliance reports

**TASKS**

Access/view compliance reports on CSPM homepage
- Framework "report" overview
    - Explore past posture with time picker
    - Export to PDF
    - Top 3 high severity rule failures
    - Rules breakdown
    - Rules listed. Click on one rule to see a full breakdown of resources.
- Explore resources (?)
- Configure rules for a given framework

{{< img src="security/cspm/frameworks_and_benchmarks/report-2.png" alt="Set a findings time window using the dropdown" style="width:100%;">}}

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
[13]: https://app.datadoghq.com/security/configuration/rules/
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /security/cspm/detection_rules