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

Create your own compliance framework by adding a custom tag to the compliance rules you wish to track. This enables you to filter the misconfigurations on the [Misconfigurations issue explorer][1] by the custom tag. You can also clone the **Cloud Security Management - Misconfigurations Overview** dashboard and [configure a template variable][2] for the custom tag to dynamically filter the widgets on the dashboard.

1. On the [**Misconfiguration Rules**][5] page, select the rule you wish to add the custom tag to.
2. Under **Say what's happening**, navigate to the **Tag resulting misconfigurations with** section and add the `key:value` for the custom tag.
3. Click **Update Rule**.

**Notes**:

- `framework`, `requirement`, and `control` are reserved keys and cannot be used in custom tags. See [Custom Rules][3] for more information.
- You can also add custom tags to rules using the [Update an existing rule API endpoint][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance
[2]: /dashboards/template_variables/
[3]: /security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[4]: /api/latest/security-monitoring/#update-an-existing-rule
[5]: https://app.datadoghq.com/security/configuration/compliance/rules