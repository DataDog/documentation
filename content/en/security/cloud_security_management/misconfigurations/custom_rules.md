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
  text: "Explore default CSM Misconfigurations cloud configuration compliance rules"
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
To view the list of the available resource types for your custom rules, see [Cloud Resources Schema][8]. 

## Cloning rules

To clone a rule:

1. Find the rule you want to copy by doing one of the following:
   - Navigate to the [**Misconfigurations Rules**][1] page. Select a rule you want to copy to open its details page.
   - Navigate to the [**Misconfigurations Explorer**][2]. Select a misconfiguration to open its details, then select **Edit Rule**.
2. Make any changes you want for your new rule.
3. Scroll to the bottom of the details page and click **Clone Rule**.

## Creating rules

To create a rule from scratch:

1. Navigate to the [**Misconfigurations Rules**][1] page.
2. Click **New Rule** in the upper-right.
3. Select **Cloud Configuration** as the rule type.
4. Specify the cloud resource types you are writing the rule for.
5. Write the rule logic using [Rego][3], a policy-as-code language, either from scratch or by using the Datadog template. Read [Writing Custom Rules with Rego][4] for more information. Note that you can mark a resource as "pass", "fail", or "skip". If you do not mark a resource, it will be interpreted as "skip".

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="Custom Rules Steps" width="100%">}}

6. Exclude benign activity by specifying queries to include or remove certain resources from misconfigurations.
7. Validate the logic of your rule by selecting resources and clicking **Test Rule**. See which resources passed and failed, along with corresponding resource tags.
8. Specify a severity (`Critical`, `High`, `Medium`, `Low`, or `Info`) for the rule.
9. Select a facet (for example, for each resource type or for each account ID), and [specify a notification target][5] to signal.
10. In **Say what's happening**, write a description for the notification, using notification options to make it useful. Read [Notifications][6] for details.
11. Specify tags to apply to the result misconfigurations. Read [Tagging misconfigurations](#tagging-misconfigurations) for more information.
12. Click **Save Rule**.

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="Custom Rules Steps" width="100%">}}

## Tagging misconfigurations

When you create, clone, or modify CSM Misconfigurations compliance rules, you can specify tags to apply to misconfigurations so that you can group, filter, and search misconfigurations by those tags. When you clone a rule, some tags are carried forward into the new rule, and others are not (see table below).

You can assign almost any key-value as a tag. The following table shows tags that are useful in common security scenarios.

| Key              | Valid values                                                                                                             | Description                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`, `false`                                                                                                          | Indicates whether to include the rule when calculating organization's overall posture score. Automatically added to cloned rules.                    |
| `security`       | `compliance`                                                                                                             | Categorizes misconfigurations on the [Security Signals page][7]. Can't be removed.                                                                   |
| `requirement`    | String                                                                                                                   | Not allowed for custom rules. Indicates a requirement related to a compliance framework. Don't add this to rules not part of a compliance framework. |
| `cloud_provider` | `aws`, `gcp`, `azure`                                                                                                    | Cannot be removed. Is set automatically based on resource type.                                                                                      |
| `control`        | String                                                                                                                   | Not allowed for custom rules. Indicates a control related to a compliance framework. Don't add this to rules not part of a compliance framework.     |
| `source`         | String from a defined set given by cloud providers as listed in the [Source facet in the Misconfigurations Explorer][2]. | Cannot be removed. Automatically added to cloned rules. Facilitates grouping rules by cloud provider.                                                |
| `framework`      | String                                                                                                                   | Not allowed for custom rules. Indicates the compliance framework the rule belongs to. Not automatically added to cloned rules.                       |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /security/cloud_security_management/guide/writing_rego_rules/
[5]: /security/cloud_security_management/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[6]: /security/notifications/
[7]: https://app.datadoghq.com/security/
[8]: /infrastructure/resource_catalog/schema/
