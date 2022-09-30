---
title: Custom Rules
kind: documentation
further_reading:
- link: "security_platform/cspm/custom_rules/writing_rego_rules"
  tag: "Guide"
  text: "Start writing your own Rego rules"
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security_platform/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not available in this site.
</div>
{{< /site-region >}}

<div class="alert alert-info">Creating and using custom CSPM rules is a beta feature, available only for Google Cloud Platform (GCP).</div>

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
4. Specify the GCP resource types you are writing the rule for.
5. Write the rule logic using [Rego][3], a policy-as-code language, either from scratch or by using the Datadog template. Read [Writing Custom Rules with Rego][4] for more information.
6. Validate the logic of your rule by selecting resources and clicking **Test Rule**. See which resources passed and failed, along with corresponding resource tags.
7. Exclude benign activity by specifying queries to include or remove certain resources from findings.
8. Specify a severity (`Critical`, `High`, `Medium`, `Low`, or `Info`) for the rule.
9. Select a facet (for example, for each resource type or for each account ID), and [specify a notification target][5] to signal.
10. In **Say what's happening**, write a description for the notification, using template variables and notification options to make it useful. Read [Notifications][6] for details.
11. Specify tags to apply to the result findings. Read [Tagging findings and reserved tags](#tagging-findings-and-reserved-tags) for more information.
12. Click **Save Rule**.

## Tagging findings and reserved tags

When you create, clone, or modify CSPM detection rules, you can specify tags to apply to findings so that you can group, filter, and search findings by those tags. When you clone a rule, some tags are carried forward into the new rule, and others are not (see table below). 

You can assign almost any key-value as a tag. The following table shows tags that are useful in common security scenarios, and tags that are reserved for CSPM findings.

| Key     | Valid values    | Description | 
| ------  | --------------- | ----------- |
| `scored` | `true`, `false` | **Reserved.** Indicates whether to include the rule when calculating organization's overall posture score. Automatically added to cloned rules. |
| `security` | `compliance` | **Reserved.** Categorizes findings on the [Security Signals page][7]. Can't be removed. |
| `requirement` | String | **Reserved.** Not allowed for custom rules. Indicates a requirement related to a compliance framework. Don't add this to rules not part of a compliance framework. Not automatically added to cloned rules. |
| `cloud_provider` | `aws`, `gcp`, `azure` | **Reserved.** Cannot be removed. Is set automatically based on resource type.  |
| `control` | String | **Reserved.** Not allowed for custom rules. Indicates a control related to a compliance framework. Don't add this to rules not part of a compliance framework. Not automatically added to cloned rules. |
| `source` | String from a defined set of cloud providers as listed in the [Source facet in CSPM Findings][2] | **Reserved.** Cannot be removed. Automatically added to cloned rules. Facilitates grouping rules by cloud provider. |
| `framework` | String | **Reserved.** Not allowed for custom rules. Indicates the compliance framework the rule belongs to. Not automatically added to cloned rules. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29&all=false&product=cspm&sort=rule_name
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /security_platform/cloud_security_management/guide/writing_rego_rules/
[5]: /security_platform/cspm/frameworks_and_benchmarks/#set-notification-targets-for-detection-rules
[6]: /security_platform/notifications/
[7]: https://app.datadoghq.com/security/
