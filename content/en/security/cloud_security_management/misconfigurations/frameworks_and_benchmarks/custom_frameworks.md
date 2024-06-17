---
title: Create Custom Compliance Frameworks
aliases:
  - /security/misconfigurations/frameworks_and_benchmarks/custom_frameworks
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

With custom frameworks, you can define and measure compliance against your own cloud security baseline. Custom frameworks are listed on the Cloud Security Management (CSM) [Compliance][6] page, have their own real-time report and [security posture score][7], and are queryable within explorers and dashboards.

1. On the [CSM Compliance page][6], click **Create Framework**.
1. Enter the following details:
    - **Framework name**: The name of your framework. Can include characters, numbers, and spaces. Must be at least five characters long.
    - **Handle**: The tag name for the custom framework. Can include lowercase letters, numbers, dashes, underscores, and periods. This value will be used for querying the framework in the explorer or dashboards.
    - **Version**: The version of the framework. Can include lowercase letters, numbers, dashes, underscores, and periods.
    - **Image URL**: A publicly accessible URL for an image that will be used to identify the framework.
1. Click **Next Step: Create Your Framework**.

Next, add requirements to the framework:

<div class="alert alert-warning">You must add at least one requirement, control, and rule before you can save the custom framework.</div>

1. Click **Add Requirement**.
1. Enter the following details:
    - **Requirement**: A requirement acts as a control family, enabling you to add controls and associate rules with each control. Can include lowercase letters, numbers, dashes, underscores, and periods.
    - **Control**: A control represents the criteria that the requirement must meet and includes the rules associated with these criteria. Multiple rules can be included in a control. Can include lowercase letters, numbers, dashes, underscores, and periods.
1. Click **Add Rules**.
1. Select the cloud or infrastructure rules you want to assign to the control, then click **Add to Control**.
1. To add additional items:
    - For additional rules, click **Add Rules**.
    - For another control, click **Add Control**.
    - For another requirement, click **Add Requirement**.
1. Click **Save**. Changes can take up to four hours to be reflected in the app.

<div class="alert alert-info">To remove a rule from a control, hover over the rule and click <strong>Remove Rule</strong>.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance
[2]: /dashboards/template_variables/
[3]: /security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[4]: /api/latest/security-monitoring/#update-an-existing-rule
[5]: https://app.datadoghq.com/security/configuration/compliance/rules
[6]: https://app.datadoghq.com/security/compliance/home
[7]: /glossary/#security-posture-score