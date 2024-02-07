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
<div class="alert alert-warning">Cloud Security Management Misconfigurations is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

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
[2]: /security/misconfigurations/supported_frameworks
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
[26]: /security/misconfigurations/custom_rules/#tagging-findings
[27]: https://app.datadoghq.com/security/compliance
[28]: /dashboards/template_variables/
[29]: /api/latest/security-monitoring/#update-an-existing-rule