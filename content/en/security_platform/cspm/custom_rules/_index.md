---
title: Custom Rules
kind: documentation
further_reading:
- link: "security_platform/custom_rules/writing_rego_rules"
  tag: "Documentation"
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

To extend the rules being applied to your environment to evaluate your security posture, you can clone out-of-the-box CSPM detection rules and edit the copies, and you can create your  own rules from scratch. 

## Cloning rules

To clone a rule:
1. In Datadog, navigate to [**Security > Posture Management** and click **Detection Rules**][1].
2. Select a rule you want to copy to open its details page.
3. Scroll to the bottom of the details page and click **Clone Rule**.

Alternatively, on [the **Findings** page][2], select any finding to open its details, and select **Clone Rule** from the **Rule** menu.

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
10. In **Say what's happening**, write a description for the notification, using template variables and notification options to make it useful.
11. Specify tags to apply to the result findings. Read []

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29&all=false&product=cspm&sort=rule_name
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /security_platform/cspm/custom_rules/writing_rego_rules/
[5]: /security_platform/cspm/frameworks_and_benchmarks/#set-notification-targets-for-detection-rules
