---
title: Cloud Security Management Identity Risks
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Learn more about Cloud Security Management"
- link: "/security/cloud_security_management/setup"
  tag: "Documentation"
  text: "Setting Up Cloud Security Management"
- link: "https://www.datadoghq.com/blog/datadog-ciem/"
  tag: "Blog"
  text: "Find and remediate identity risks with Datadog CIEM"
- link: "/integrations/jira/"
  tag: "Documentation"
  text: "Learn more about the Jira integration"
- link: "/service_management/workflows/"
  tag: "Documentation"
  text: "Learn more about Workflow Automation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security Management Identity Risks (CSM Identity Risks) provides in-depth visibility into your organization's IAM risks. It enables you to proactively detect and resolve identity risks on an ongoing basis to secure your cloud infrastructure from IAM-based attacks.

<div class="alert alert-info">At this time, CSM Identity Risks is available for AWS only.</div>

## Review identity risks

Review your organization's active identity risks on the [Identity Risks Explorer][1]. Use the **Group by** options to filter by **Identity Risks**, **Resources**, or **None** (individual identity risks). View additional details on the side panel.

CSM Identity Risk detections include users, roles, groups, policies, EC2 instances, and Lambda functions.

{{< img src="security/identity_risks/identity_risks_explorer_3.png" alt="CSM Identity Risks Explorers page" width="100%">}}

## Remediate identity risks

For detailed insights and remediation help, click the **Insights** tab. In the following example, the **Insights** tab shows the usage of provisioned permissions.

{{< img src="security/identity_risks/side_panel_insights_tab.png" alt="The Insights tab on the identity risks side panel shows the usage of provisioned permissions" width="80%">}}

Click **View Suggested Policy** to view a suggested downsized policy based on the actual usage.

{{< img src="security/identity_risks/downsized_policy.png" alt="Review suggestions for downsizing a policy on the Suggested downsized policy dialog" width="100%">}}

To remediate the identity risk, click **Fix in AWS** to update the resource in AWS IAM console. To create a Jira issue and assign it to a team, click **Create Jira issue**. See [Create Jira Issues for Cloud Security Management Issues][2] for more information.

{{< img src="security/identity_risks/side_panel_action_buttons.png" alt="Remediate identity risks using the action buttons on the side panel" width="100%">}}

You can also leverage [Workflow Automation][3] to create automated workflows for identity risks (with or without human involvement). See [Automate Security Workflows with Workflow Automation][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /security/cloud_security_management/guide/jira
[3]: /security/cloud_security_management/workflows
