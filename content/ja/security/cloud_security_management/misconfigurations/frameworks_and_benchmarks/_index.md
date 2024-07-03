---
aliases:
- /ja/security_platform/cspm/frameworks_and_benchmarks
- /ja/security/cspm/frameworks_and_benchmarks
- /ja/security/misconfigurations/frameworks_and_benchmarks
further_reading:
- link: security/cspm/setup
  tag: Documentation
  text: Getting started with CSM Misconfigurations
- link: security/default_rules
  tag: Documentation
  text: Explore default CSM Misconfigurations cloud configuration compliance rules
- link: security/cspm/findings
  tag: Documentation
  text: Search and explore misconfigurations
kind: documentation
title: Manage Your Security Compliance Posture
---

CSM Misconfigurations comes with more than 1,000 out-of-the-box compliance rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [compliance rule][1] maps to one or more controls within a compliance standard or industry benchmarks. See [Supported Frameworks][2] for more information.

## View your compliance posture

View a high-level overview of your compliance posture for each framework on the CSM Misconfigurations [Compliance][20] page.

- **Framework Overview**: A [detailed report](#explore-compliance-framework-reports) that gives you insight into how you score against a framework's requirements and rules.
- **Explore Resources**: A filtered view of the **Misconfigurations** page that shows resources with misconfigurations for the selected framework.
- **Configure Rules**: Customize how your environment is scanned and set notification targets by modifying the compliance rules for each framework.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="The compliance reports section of the CSM Misconfigurations Compliance page provides a high-level overview of your compliance posture" style="width:100%;">}}

## Explore compliance framework reports

Compliance framework reports show which rules are failing in your environment, along with details about the misconfigured resources.

The summary at the top of the report shows the number of rules with pass/fail misconfigurations, the top three high-severity rule failures, and a detailed breakdown of the rules based on severity. You can also explore your past posture with the time selector, download a PDF copy of the report, and filter the page by account, team, service, and environment tags.

Below the summary is a complete listing of all rules associated with the framework, organized by requirements and controls, along with the number of resources checked by the rule, and the percentage of failures.

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report_2.png" alt="The CIS AWS compliance framework report provides details on critical rule failures" style="width:100%;">}}

Select a rule to view details about the misconfigured resources, the rule description, its framework or industry benchmark mapping, and suggested remediation steps.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding2.png" alt="The compliance rule side panel includes information about the rule and resources with failed misconfigurations" style="width:75%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/default_rules/
[2]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/
[11]: /ja/security/cloud_siem/
[12]: /ja/integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /ja/integrations/slack/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/pagerduty
[17]: /ja/integrations/servicenow/
[18]: /ja/integrations/microsoft_teams/
[19]: /ja/integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /ja/security/cloud_security_management/misconfigurations/detection_rules
[26]: /ja/security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[27]: https://app.datadoghq.com/security/compliance
[28]: /ja/dashboards/template_variables/
[29]: /ja/api/latest/security-monitoring/#update-an-existing-rule