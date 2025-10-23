---
title: Manage Your Security Compliance Posture
aliases:
  - /security_platform/cspm/frameworks_and_benchmarks
  - /security/cspm/frameworks_and_benchmarks
  - /security/misconfigurations/frameworks_and_benchmarks
further_reading:
- link: "security/cspm/setup"
  tag: "Documentation"
  text: "Getting started with Cloud Security Misconfigurations"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Cloud Security Misconfigurations cloud configuration compliance rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore misconfigurations"
---

Cloud Security Misconfigurations comes with more than 1,300 out-of-the-box compliance rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [compliance rule][1] maps to one or more controls within a [compliance standard or industry benchmark][2]. You can also [create custom frameworks][30] to define and measure compliance against your own cloud security baseline.

## View your compliance posture

View a high-level overview of your compliance posture for each framework on the Cloud Security Misconfigurations [Compliance][20] page. Click a framework to see a [detailed report](#explore-compliance-framework-reports) that gives you insight into how your configuration scores against the framework's requirements and rules.

- **Star**: Pin a framework to the top of your table.
- **Score**: The [posture score][3] for the rules in the given framework.
- **Change**: The difference in posture score over the chosen time range (defaults to 1 month). Hover to see details.
- **Failing Rules**: All the rules failing in the framework. Hover for more details.
- **Resources Passing**: Of all the resources evaluated by rules in the framework, the percentage of which pass all the rules in the framework.
- **Framework Overview**: A [detailed report](#explore-compliance-framework-reports) that gives you insight into how you score against a framework's requirements and rules.
- **Explore Resources**: A filtered view of the **Misconfigurations** page that shows resources with misconfigurations for the selected framework.
- **Configure Rules**: Customize how your environment is scanned and set notification targets by modifying the compliance rules for each framework.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_5.png" alt="The compliance reports section of the Cloud Security Misconfigurations Compliance page provides a high-level overview of your compliance posture" style="width:100%;">}}

## Explore compliance framework reports

Compliance framework reports show which rules are failing in your environment, along with details about the misconfigured resources.

The summary at the top of the report shows the [posture score][3], the top five most severe rule failures, and a detailed breakdown of the rules based on severity. You can also explore your past posture with the time selector, download a PDF or CSV copy of the report, and filter the page by account, team, service, and environment tags.

Below the summary is a complete listing of all rules associated with the framework, organized by default by requirements and controls, along with the number of resources checked by the rule, the percentage of failures, and the change in resources passing the rule over the chosen time period.

Search for a rule name to filter the list, or group by requirement, control, severity, resource type, or resource category to organize the list. You can also click a table column header to sort by that column within the group.

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report_5.png" alt="The CIS AWS compliance framework report provides details on critical rule failures" style="width:100%;">}}

Select a rule to view details about the misconfigured resources, the rule description, its framework or industry benchmark mapping, and suggested remediation steps. Then, you can click a specific resource to get more details.

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding3.png" alt="The compliance rule side panel includes information about the rule and resources with failed misconfigurations" style="width:75%;">}}

## Show or hide compliance frameworks

You can hide frameworks from the list on the [Compliance][20] page, so you can focus on the ones that are most relevant to your organization.

To hide a framework, either on the Compliance page or on a page for a specific framework, click the **Options** button {{< img src="icons/kebab.png" alt="Options button" inline="true" style="height:1em">}}, then click **Hide framework**.

Then, on the Compliance page, you can use the **Show hidden frameworks** toggle to show hidden frameworks at the bottom of the list, or hide them completely. When the toggle is on, you can click **Show** next to any hidden framework to add it back to the list.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/supported_frameworks/
[3]: /glossary/#security-posture-score
[11]: /security/cloud_siem/
[12]: /integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /integrations/slack/
[15]: /integrations/jira/
[16]: /integrations/pagerduty
[17]: /integrations/servicenow/
[18]: /integrations/microsoft_teams/
[19]: /integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance
[21]: /security/cloud_security_management/misconfigurations/detection_rules
[26]: /security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[28]: /dashboards/template_variables/
[29]: /api/latest/security-monitoring/#update-an-existing-rule
[30]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/custom_frameworks
