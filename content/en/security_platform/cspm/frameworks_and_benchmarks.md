---
title: Frameworks and Industry Benchmarks
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security_platform/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

{{< img src="security_platform/cspm/frameworks_and_benchmarks/report.png" alt="Set a findings time window using the dropdown" style="width:80%;">}}

## Overview

Each [OOTB rule][1] maps to one or more controls within a compliance standard or industry benchmark. Datadog OOTB rules currently map to controls and requirements for the following frameworks and benchmarks:

- [CIS AWS Foundations Benchmark v1.3.0*][2]
- [CIS Azure Foundations Benchmark v1.3.0][3]
- [CIS Docker Benchmark v1.2.0][4]
- [CIS Kubernetes Benchmark v1.5.1**][5]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [HIPAA][8]
- [GDPR][9]

*To pass the Monitoring Section of the [CIS AWS Foundations benchmark][2], you **must** enable [Cloud SIEM][10] and forward [Cloudtrail logs to Datadog][11].

**Some [CIS Kubernetes Benchmark][5] detection rules only apply to self-hosted Kubernetes clusters.

**Note**: Datadog CSPM provides you with visibility into whether your resources are configured in accordance with certain detection rules. Datadog's OOTB detection rules address various regulatory frameworks, benchmarks, and standards (“Security Posture Frameworks”). Datadog CSPM does not provide an assessment of your actual compliance with any Security Posture Framework, and the OOTB rules may not address all configuration settings that are relevant to the Security Posture Frameworks. To be clear, just because your resources pass the OOTB Rules does not mean that you are meeting all the requirements under any particular Security Posture Framework. Datadog is not providing legal or compliance advice or guidance, and it is recommended that you use Datadog CSPM in consultation with your legal counsel or compliance experts.

## Customize how your environment is scanned by each rule

On the [Rules][12] page, hover over a rule and click on the pencil icon to edit the rule. Under **Define search queries**, click the **Advanced** drop down menu to set filtering logic for how the rule scans your environment.

For example, you can remove all resources tagged with `env:staging` using the **Never trigger a signal when** function. Or, limit the scope for a certain rule to resources tagged with `compliance:pci` using the **Only trigger a signal when** function.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/never-trigger-a-signal.png" alt="In the Datadog app, select Advanced to populate Never trigger a signal when, and add a query." >}}

## Set notification targets for detection rules

From the [Rules][12] page, you can add notification targets. The complete list of notification options are:

- [Slack][13]
- [Jira][14]
- [PagerDuty][15]
- [ServiceNow][16]
- [Microsoft Teams][17]
- [Webhooks][18]
- Email

Set the severity of security posture signals. The dropdown allows you to select an appropriate severity level (INFO, LOW, MEDIUM, HIGH, CRITICAL).
In the “Notify” section, configure zero or more [notification targets][9] for each rule case.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/notification.png" alt="Select a severity and notification target" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.hhs.gov/hipaa/index.html
[9]: https://gdpr.eu/
[10]: /security_platform/cloud_siem/
[11]: /integrations/amazon_cloudtrail/
[12]: https://app.datadoghq.com/security/configuration/rules/
[13]: /integrations/slack/
[14]: /integrations/jira/
[15]: /integrations/pagerduty
[16]: /integrations/servicenow/
[17]: /integrations/microsoft_teams/
[18]: /integrations/webhooks/
