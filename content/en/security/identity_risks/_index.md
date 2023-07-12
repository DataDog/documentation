---
title: Cloud Security Management Identity Risks
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Learn more about Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Management Identity Risks is not available in this site.
</div>
{{< /site-region >}}

<div class="alert alert-info">Cloud Security Management Identity Risks is in beta.</div>

Datadog Cloud Security Management (CSM) Identity Risks provides in-depth visibility into your organization's AWS IAM risks. Powered by [out-of-the-box detection rules][1], CSM Identity Risks helps you to detect and resolve identity risks on an ongoing basis.

**Note**: At this time, CSM Identity Risks is available for AWS IAM only.

## Setup

If you've already enabled Cloud Security Posture Management (CSPM) for AWS, no additional setup is required. To enable CSPM for AWS, see [Setting up CSPM][2].

*CloudTrail logs forwarding enabled?

## Track your identity health score

The [identity health score][4] represents the percentage of your IAM resources that are configured securely.

*Identity health score on CSM overview page.*

## Review active identity risk detections

View a list of available identity risk rules, as well as your organization's active identity risk detections on the [Identity Risks explorer page][3]. Use the **Group by** options to filter by **Rule**, **Resources**, or **None** (detections).

View additional details by selecting a rule, resource, or detection.

{{< img src="security/identity_risks/identity-risks-explorer.png" alt="CSM Identity Risks explorers page" width="100%">}}

When viewing an individual resource, use the **Relationships** tab to view a graphical representation of the connections with other resources. The view includes both benign and at-risk connections and shows how a particular resource is at risk and for what reasons. 

You can also review the configuration of the resource on the **Resource** tab, and a chronological history of the identity risks that have been detected for the resource on the **Timeline** tab.

**SCREENSHOT OF RESOURCE SIDE PANEL**

On the side panel for an individual detection, click **Fix in AWS** to open the AWS console to remediate the detected identity risk. You can also review the configuration of the impacted resource on the **Resource** tab, and a chronological history of the detection on the **Timeline** tab.

**PLACEHOLDER FOR INSIGHTS TAB**.

**SCREENSHOT OF DETECTION SIDE PANEL**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules
[2]: /security/cspm/setup
[3]: https://app.datadoghq.com//security/identities
[4]: /glossary/#identity-health-score