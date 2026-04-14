---
title: Cloud Security Identity Risks
aliases:
  - /security/identity_risks/
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Learn more about Cloud Security"
- link: "/security/cloud_security_management/setup"
  tag: "Documentation"
  text: "Setting Up Cloud Security"
- link: "https://www.datadoghq.com/blog/datadog-ciem/"
  tag: "Blog"
  text: "Find and remediate identity risks with Datadog CIEM"
- link: "/integrations/jira/"
  tag: "Documentation"
  text: "Learn more about the Jira integration"
- link: "/service_management/workflows/"
  tag: "Documentation"
  text: "Learn more about Workflow Automation"
- link: "https://www.datadoghq.com/blog/datadog-ciem-aws-iam-access-analyzer/"
  tag: "Blog"
  text: "Identify and remediate permission gaps in AWS with Datadog CIEM and AWS IAM Access Analyzer"
- link: "https://www.datadoghq.com/blog/detect-cross-account-risks-aws/"
  tag: "Blog"
  text: "Detect cross-account access risks in AWS with Datadog"
---

Cloud Security Identity Risks is a Cloud Infrastructure Entitlement Management (CIEM) product that helps you mitigate entitlement risks across your clouds. It continually scans your cloud infrastructure and finds issues such as lingering administrative privileges, privilege escalations, permission gaps, large blast radii, and cross-account access. It also enables you to proactively resolve identity risks on an ongoing basis to secure your cloud infrastructure from IAM-based attacks. For quick remediation, it suggests [downsized policies](#remediate-identity-risks), [Datadog Workflows][3] based remediations, and deep links to cloud consoles.

<div class="alert alert-info">Cloud Security Identity Risks is available for AWS, Azure, and GCP.</div>

## Review identity risks

Cloud Security Identity Risk detections include users, roles, groups, policies, EC2 instances, and Lambda functions. Review your organization's active identity risks on the [Identity Risks Findings page][1].
- Use the query search bar or the facet panel to filter for specific types of identity risks. 
- Beside **Group by**, group identity risks by **Identity Risks**, **Resources** or **Teams** (or **None** to view identity risks individually), so you can prioritize your remediation efforts accordingly.
- Hover over **Views**, then select an existing view to apply, or click **Save as new view** to use your explorer settings again in the future.
- Select an identity risk to view up to five affected resources, or click **View All** to view all of them. Select a resource to view additional details in a side panel.

{{< img src="security/identity_risks/identity_risks_explorer_6.png" alt="Cloud Security Identity Risks Findings page" width="100%">}}

## Remediate identity risks

For detailed insights and remediation help, click the **Remediation** tab. In the following example, the **Remediation** tab shows the usage of provisioned permissions.

{{< img src="security/identity_risks/side_panel_remediation_tab_1.png" alt="The Remediation tab on the identity risks side panel shows the usage of provisioned permissions" width="100%">}}

- To remediate the identity risk, you can:
  - Click **Fix in \<cloud provider\>** to update the resource directly in your cloud provider console.
  - Use [Workflow Automation][3] to create automated workflows for identity risks (with or without human involvement).
  - For supported Terraform resources:
    - Locate the file and line the identity risk is in and identify the code owners.
    - Generate a pull request in GitHub with code changes that fix the underlying misconfiguration.
- To create a Jira issue and assign it to a team, click **Add Jira issue**. See [Create Jira Issues for Cloud Security Issues][2] for more information.
- To view a suggested downsized policy based on the actual usage, click **View Suggested Policy**. Then, you can click **Edit Policy in \<cloud provider\>** to apply the suggested changes:

  {{< img src="security/identity_risks/downsized_policy_3.png" alt="Review suggestions for downsizing a policy on the Suggested downsized policy dialog" width="100%">}}

## Gain visibility into at-risk resource access

In Misconfigurations, Identity Risks, and the Security Inbox, you can click the **Access Insights** tab to see:
- Which entities the resource can access across your accounts
- Which principals can directly or indirectly access the resource

This example shows all the identities this AWS IAM user can access:

{{< img src="security/csm/access_insights_3.png" alt="The Access Insights panel, showing a list of AWS IAM users with large permissions gaps" width="100%">}}

In the **What can this resource access?** section, you can:
- See the account associated with each entity, and details about the access type
- Search for entities, or filter them by entity type or account
- View a list of excluded policies
- Use the **All**, **Direct Access**, and **Indirect Access** tabs to filter which entities display in the table
- Click the **Actions** dropdown beside an entity to see it in Resource Catalog, or update its configuration in AWS IAM console

In the **Who can access this resource?** section, you can:
- See the risks associated with each principal in the **Risks** column, as well as the type of **Path** the principal can take (direct or indirect) to access the resource
- Filter principals by name, type, public accessibility, or administrative access
- Use the **All**, **Direct Access**, and **Indirect Access** tabs to filter which principals display in the table
- Click the **Actions** dropdown beside a principal to see it in Resource Catalog, or update its configuration in AWS IAM console


## AWS IAM Access Analyzer integration

Datadog CIEM integrates with [AWS IAM Access Analyzer][4], using Access Analyzer's unused-access findings to recommend downsized policies and enrich permissions-gap detections.

You can also use this integration to extend the time frame beyond Datadog's usual permissions-gap detections, which cover 90 days. You can configure Access Analyzer to analyze more (for example, 180 or 360 days), and view those longer-window findings in Identity Risks.

<div class="alert alert-info">
If you are enabling AWS IAM Access Analyzer for the first time:
  <ul>
    <li>There is an additional AWS cost associated with using it.</li>
    <li>It can take up to two hours before AWS IAM Access Analyzer's insights become available in Datadog.</li>
  </ul>
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /security/cloud_security_management/guide/jira
[3]: /security/cloud_security_management/workflows
[4]: /integrations/iam-access-analyzer/