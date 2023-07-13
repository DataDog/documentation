---
title: Cloud Security Management Identities
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Learn more about Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
CSM Identities is not available in this site.
</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Identities is in beta.</div>

Cloud Security Management Identities (CSM Identities) provides in-depth visibility into your organization's AWS IAM risks. Enabling you to detect and resolve identity risks on an ongoing basis, CSM Identities helps 
secure your cloud infrastructure from IAM-based attacks.

**Note**: At this time, CSM Identities is available for AWS only.

## Setup

To use CSM Identities, you must [configure Cloud Security Posture Management (CSPM) for AWS][2] and [enable CloudTrail logs forwarding][5]. If you've already done this, no additional setup is required.

## Track your identity health score

The [identity health score][4] on the [CSM Overview][1] represents the percentage of your IAM resources that are configured securely. The score automatically updates as you resolve your organization's identity risk detections.

**SCREENSHOT**

## Review and remediate identity risk detections

Review your organization's active identity risk detections on the [Identity Risks Explorer page][3]. Use the **Group by** options to filter by **Identity risks**, **Resources**, or **None** (individual detections). View additional details on the side panel by selecting a resource or detection.

{{< img src="security/identities/identity-risks-explorer.png" alt="CSM Identities explorers page" width="100%">}}

When viewing an individual resource, use the **Relationships** tab to view a graphical representation of the connections with other resources. The view includes both benign and at-risk connections and shows how a particular resource is at risk and for what reasons. 

You can also review the configuration of the resource on the **Resource** tab, and a chronological history of the identity risks detected for the resource on the **Timeline** tab.

**SCREENSHOT OF RELATIONSHIPS SIDE PANEL**

On the side panel for an individual detection, click **Fix in AWS** to open the AWS console to remediate the identity risk. You can also review the configuration of the impacted resource on the **Resource** tab, and a chronological history of the detection on the **Timeline** tab.

**PLACEHOLDER FOR INSIGHTS TAB INFO**.

**SCREENSHOT OF DETECTION SIDE PANEL**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csm
[2]: /security/cspm/setup
[3]: https://app.datadoghq.com//security/identities
[4]: /glossary/#identity-health-score
[5]: /integrations/amazon_cloudtrail#send-logs-to-datadog