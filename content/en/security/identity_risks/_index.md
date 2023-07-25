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
CSM Identity Risks is not available in this site.
</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Identity Risks is in beta.</div>

Cloud Security Management Identity Risks (CSM Identity Risks) provides in-depth visibility into your organization's AWS IAM risks. Enabling you to detect and resolve identity risks on an ongoing basis, CSM Identity Risks helps secure your cloud infrastructure from IAM-based attacks.

<div class="alert alert-info">At this time, CSM Identity Risks is available for AWS only.</div>

## Setup

To use CSM Identity Risks, you must [enable resource collection for AWS][2] and [enable CloudTrail logs forwarding][4]. If you've already done this, no additional setup is required.

## Review and remediate identity risk detections

Review your organization's active identity risk detections on the [Identity Risks Explorer page][3]. Use the **Group by** options to filter by **Identity Risks**, **Resources**, or **None** (individual detections). View additional details on the side panel by selecting a resource or detection.

{{< img src="security/identity_risks/identity_risks_explorer.png" alt="CSM Identity Risks explorers page" width="100%">}}

When viewing an individual resource, use the **Relationships** tab to view a graphical representation of the connections with other resources. The view includes both benign and at-risk connections and shows how a particular resource is at risk and for what reasons. 

You can also review the configuration of the resource on the **Resource** tab, and a chronological history of the identity risks detected for the resource on the **Timeline** tab.

{{< img src="security/identity_risks/relationships_tab_side_panel.png" alt="The Relationships tab shows a a graphical representation of the connections with other resources" width="80%">}}

On the side panel for an individual detection, click **Fix in AWS** to open the AWS console to remediate the identity risk. You can also use the **Insights** tab to view the permissions provisioned on the resource and whether they were used in the last 15 days.

{{< img src="security/identity_risks/insights_tab_side_panel.png" alt="The Insights tab shows a list of permissions provisioned on the resource" width="80%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csm
[2]: /integrations/amazon_web_services/?tab=roledelegation#resource-collection
[3]: https://app.datadoghq.com/security/identities
[4]: /integrations/amazon_cloudtrail#send-logs-to-datadog