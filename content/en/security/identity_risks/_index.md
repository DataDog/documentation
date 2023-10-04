---
title: Cloud Security Management Identity Risks
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Learn more about Cloud Security Management"
- link: "https://www.datadoghq.com/blog/mitigate-identity-risks-and-infrastructure-vulnerabilities-with-datadog/"
  tag: "Blog"
  text: "Mitigate identity risks and infrastructure vulnerabilities with Datadog Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Identity Risks is in beta.</div>

Cloud Security Management Identity Risks (CSM Identity Risks) provides in-depth visibility into your organization's IAM risks. It enables you to detect and resolve identity risks on an ongoing basis to secure your cloud infrastructure from IAM-based attacks.

<div class="alert alert-info">At this time, CSM Identity Risks is available for AWS only.</div>

## Setup

To use CSM Identity Risks, you must [enable resource collection for AWS][2] and [enable CloudTrail logs forwarding][4]. If you've already done this, no additional setup is required.

**Note**: If you've enabled [Cloud Security Management Misconfigurations][5] for your AWS accounts, you already have [cloud resource collection][2] enabled. Similarly, if you use [Cloud SIEM][6], you already have [CloudTrail logs forwarding][4] enabled.

## Review and remediate identity risks

Review your organization's active identity risks on the [Identity Risks page][3]. Use the **Group by** options to filter by **Identity Risks**, **Resources**, or **None** (individual identity risks). View additional details on the side panel.

{{< img src="security/identity_risks/identity_risks_page.png" alt="CSM Identity Risks page" width="100%">}}

On the side panel, you can review the configuration of the resource on the **Resource** tab.

{{< img src="security/identity_risks/resource_tab_side_panel.png" alt="The Relationships tab shows a a graphical representation of the connections with other resources" width="80%">}}

Click **Fix in AWS** to open the AWS console to remediate the identity risk. You can also use the **Insights** tab to get additional insights about the identity risk (for example, the permissions provisioned on the resource and whether they were used in the last 15 days).

{{< img src="security/identity_risks/insights_tab_side_panel.png" alt="The Insights tab shows a list of permissions provisioned on the resource" width="80%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csm
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/identities
[4]: /integrations/amazon_cloudtrail#send-logs-to-datadog
[5]: /security/cspm/
[6]: /security/cloud_siem/