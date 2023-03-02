---
title: Custom Rules
kind: documentation
further_reading:
- link: "security/cloud_security_management/guide/writing_rego_rules"
  tag: "Guide"
  text: "Start writing your own Rego rules"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
is_beta: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not available in this site.
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true">}}
Creating and using custom CSPM rules is a beta feature, available for select Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) cloud resources. See the <a href="https://docs.datadoghq.com/security/cspm/custom_rules/schema/">cloud resources schema documentation</a> for more information. New cloud resources will be added throughout the beta period.
{{< /callout >}}

## Overview

To extend the rules being applied to your environment to evaluate your security posture, you can clone detection rules and edit the copies, and you can create your own rules from scratch.

## Cloning rules

To clone a rule:

1. Find the rule you want to copy one of the following ways:
   - Navigate to [**Security > Posture Management** and click **Detection Rules**][1]. Select a rule you want to copy to open its details page.
   - Navigate to [**Security > Posture Management** and click **Findings**][2]. Select a finding to open its details, and select **Edit Rule** from the **Rule** menu.
2. Make any changes you want for your new rule.
3. Scroll to the bottom of the details page and click **Clone Rule**.

## Creating rules

To create a rule from scratch:

1. In Datadog, navigate to [**Security > Posture Management** and click **Detection Rules**][1].
2. Click **New Rule** in the upper-right.
3. Select **Cloud Configuration** as the rule type.
4. Specify the cloud resource types you are writing the rule for.
5. Write the rule logic using [Rego][3], a policy-as-code language, either from scratch or by using the Datadog template. Read [Writing Custom Rules with Rego][4] for more information. Note that you can mark a resource as "pass", "fail", or "skip". If you do not mark a resource, it will be interpreted as "skip".

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="Custom Rules Steps" width="100%">}}

6. Exclude benign activity by specifying queries to include or remove certain resources from findings.
7. Validate the logic of your rule by selecting resources and clicking **Test Rule**. See which resources passed and failed, along with corresponding resource tags.
8. Specify a severity (`Critical`, `High`, `Medium`, `Low`, or `Info`) for the rule.
9. Select a facet (for example, for each resource type or for each account ID), and [specify a notification target][5] to signal.
10. In **Say what's happening**, write a description for the notification, using notification options to make it useful. Read [Notifications][6] for details.
11. Specify tags to apply to the result findings. Read [Tagging findings](#tagging-findings) for more information.
12. Click **Save Rule**.

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="Custom Rules Steps" width="100%">}}

## Tagging findings

When you create, clone, or modify CSPM detection rules, you can specify tags to apply to findings so that you can group, filter, and search findings by those tags. When you clone a rule, some tags are carried forward into the new rule, and others are not (see table below).

You can assign almost any key-value as a tag. The following table shows tags that are useful in common security scenarios.

| Key     | Valid values    | Description |
| ------  | --------------- | ----------- |
| `scored` | `true`, `false` | Indicates whether to include the rule when calculating organization's overall posture score. Automatically added to cloned rules. |
| `security` | `compliance` | Categorizes findings on the [Security Signals page][7]. Can't be removed. |
| `requirement` | String | Not allowed for custom rules. Indicates a requirement related to a compliance framework. Don't add this to rules not part of a compliance framework. |
| `cloud_provider` | `aws`, `gcp`, `azure` | Cannot be removed. Is set automatically based on resource type.  |
| `control` | String | Not allowed for custom rules. Indicates a control related to a compliance framework. Don't add this to rules not part of a compliance framework. |
| `source` | String from a defined set given by cloud providers as listed in the [Source facet in CSPM Findings][2] | Cannot be removed. Automatically added to cloned rules. Facilitates grouping rules by cloud provider. |
| `framework` | String | Not allowed for custom rules. Indicates the compliance framework the rule belongs to. Not automatically added to cloned rules. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?product=cspm&query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29&all=false&product=cspm&sort=rule_name
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /security/cloud_security_management/guide/writing_rego_rules/
[5]: /security/cspm/frameworks_and_benchmarks/#set-notification-targets-for-detection-rules
[6]: /security/notifications/
[7]: https://app.datadoghq.com/security/
