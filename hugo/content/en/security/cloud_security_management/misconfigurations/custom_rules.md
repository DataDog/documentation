---
title: Create Custom Rules
aliases:
  - /security/cspm/custom_rules
  - /security/misconfigurations/custom_rules
further_reading:
- link: "security/cloud_security_management/guide/writing_rego_rules"
  tag: "Guide"
  text: "Start writing your own Rego rules"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Cloud Security Misconfigurations cloud configuration compliance rules"
- link: "security/misconfigurations/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
is_beta: true
cascade:
    algolia:
        rank: 30
        subcategory: Cloud Security Posture Management
---

## Overview

To extend the rules being applied to your environment to evaluate your security posture, you can clone compliance rules and edit the copies, and you can create your own rules from scratch.
To view the list of the available resource types for your custom rules, see [Cloud Resources Schema][6].

## Cloning rules

To clone a rule:

1. Find the rule you want to copy by doing one of the following:
   - Navigate to the [Misconfigurations Rules][1] page. Select a rule you want to copy to open its details page.
   - Navigate to the [Misconfigurations explorer][2]. Select a misconfiguration to open its details, then select {{< ui >}}Edit Rule{{< /ui >}}.
2. Make any changes you want for your new rule.
3. Scroll to the bottom of the details page and click {{< ui >}}Clone Rule{{< /ui >}}.

## Creating rules

To create a rule from scratch:

1. Navigate to the [Misconfigurations Rules][1] page.
2. Click {{< ui >}}New Rule{{< /ui >}} in the upper-right.
3. Select {{< ui >}}Cloud Configuration{{< /ui >}} as the rule type.
4. Specify the cloud resource types you are writing the rule for.
5. Write the rule logic using [Rego][3], a policy-as-code language, either from scratch or by using the Datadog template. Read [Writing Custom Rules with Rego][4] for more information. Note that you can mark a resource as "pass", "fail", or "skip". If you do not mark a resource, it will be interpreted as "skip".

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="Custom Rules Steps" width="100%">}}

6. Exclude benign activity by specifying queries to include or remove certain resources from misconfigurations.
7. Validate the logic of your rule by selecting resources and clicking {{< ui >}}Test Rule{{< /ui >}}. See which resources passed and failed, along with corresponding resource tags.
8. Specify a severity (`Critical`, `High`, `Medium`, `Low`, or `Info`) for the rule.
9. In {{< ui >}}Say what's happening{{< /ui >}}, write a description and instructions for investigating and remediating the Finding.
10. Specify tags to apply to the result misconfigurations. Read [Tagging misconfigurations](#tagging-misconfigurations) for more information.
11. Click {{< ui >}}Save Rule{{< /ui >}}.

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="Custom Rules Steps" width="100%">}}

## Formatting the finding description

The text you enter in {{< ui >}}Say what's happening{{< /ui >}} is displayed in the finding side panel. When you write it as Markdown using the following section headers, each section is shown in a dedicated area of the finding:

| Header        | Where it appears in the finding                |
|---------------|------------------------------------------------|
| `Description` | **What Happened**                              |
| `Rationale`   | **What Happened** (shown with the description) |
| `Remediation` | **Remediation** section                        |
| `References`  | Shown separately                               |

For example:

```markdown
## Description
Explain what the misconfiguration is.

## Remediation
Describe how to remediate it.
```

Keep the following in mind:

- All sections are optional and can appear in any order. A typical message uses only `## Description` and `## Remediation`.
- Use level-2 (`##`) headers for each section. Deeper headers (for example, `###`) are treated as sub-points within a section, not as new sections.
- Header matching is case-insensitive, but the section names must match exactly (for example, `Remediation`, not `Fix`).
- Give each section content. A header immediately followed by another header may not render as expected.
- If none of these headers are present, the entire message is shown as the description.

This formatting also applies to rules created with the [`datadog_cloud_configuration_rule`][7] Terraform resource, where the same content is set through the resource's `message` attribute.

## Tagging misconfigurations

When you create, clone, or modify Cloud Security Misconfigurations compliance rules, you can specify tags to apply to misconfigurations so that you can group, filter, and search misconfigurations by those tags. When you clone a rule, some tags are carried forward into the new rule, and others are not (see table below).

You can assign almost any key-value as a tag. The following table shows tags that are useful in common security scenarios.

| Key              | Valid values                                                                                                             | Description                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`, `false`                                                                                                          | Indicates whether to include the rule when calculating organization's overall posture score. Automatically added to cloned rules.                    |
| `security`       | `compliance`                                                                                                             | Categorizes misconfigurations on the [Security Signals page][5]. Can't be removed.                                                                   |
| `requirement`    | String                                                                                                                   | Not allowed for custom rules. Indicates a requirement related to a compliance framework. Don't add this to rules not part of a compliance framework. |
| `cloud_provider` | `aws`, `gcp`, `azure`                                                                                                    | Cannot be removed. Is set automatically based on resource type.                                                                                      |
| `control`        | String                                                                                                                   | Not allowed for custom rules. Indicates a control related to a compliance framework. Don't add this to rules not part of a compliance framework.     |
| `source`         | String from a defined set given by cloud providers as listed in the [Source facet in the Misconfigurations explorer][2]. | Cannot be removed. Automatically added to cloned rules. Facilitates grouping rules by cloud provider.                                                |
| `framework`      | String                                                                                                                   | Not allowed for custom rules. Indicates the compliance framework the rule belongs to. Not automatically added to cloned rules.                       |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /security/cloud_security_management/guide/writing_rego_rules/
[5]: https://app.datadoghq.com/security/
[6]: /infrastructure/resource_catalog/schema/
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cloud_configuration_rule
