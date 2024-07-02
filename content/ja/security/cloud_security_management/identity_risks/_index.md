---
title: Cloud Security Management Identity Risks
aliases:
  - /security/identity_risks/
further_reading:
- link: /security/cloud_security_management/
  tag: Documentation
  text: Learn more about Cloud Security Management
- link: /security/cloud_security_management/setup
  tag: Documentation
  text: Setting Up Cloud Security Management
- link: "https://www.datadoghq.com/blog/datadog-ciem/"
  tag: Blog
  text: Find and remediate identity risks with Datadog CIEM
- link: /integrations/jira/
  tag: Documentation
  text: Learn more about the Jira integration
- link: /service_management/workflows/
  tag: Documentation
  text: Learn more about Workflow Automation
---

Cloud Security Management Identity Risks (CSM Identity Risks) is a Cloud Infrastructure Entitlement Management (CIEM) product that helps you mitigate entitlement risks across your clouds. It continually scans your cloud infrastructure and finds issues such as lingering administrative privileges, privilege escalations, permission gaps, large blast radii, and cross-account access. It also enables you to proactively resolve identity risks on an ongoing basis to secure your cloud infrastructure from IAM-based attacks. For quick remediation, it suggests [downsized policies][4], [Datadog Workflows][3] based remediations, and deep links to cloud consoles.

<div class="alert alert-info">CSM Identity Risks is available for AWS, Azure, and GCP.</div>

## Review identity risks

Review your organization's active identity risks on the [Identity Risks Explorer][1]. Use the **Group by** options to filter by **Identity Risks**, **Resources**, or **None** (individual identity risks). View additional details on the side panel.

CSM Identity Risk の検出対象には、ユーザー、ロール、グループ、ポリシー、EC2 インスタンス、Lambda 関数があります。

{{< img src="security/identity_risks/identity_risks_explorer_3.png" alt="CSM Identity Risks Explorers page" width="100%">}}

## Remediate identity risks

For detailed insights and remediation help, click the **Remediation** tab. In the following example, the **Remediation** tab shows the usage of provisioned permissions.

{{< img src="security/identity_risks/side_panel_remediation_tab.png" alt="The Remediation tab on the identity risks side panel shows the usage of provisioned permissions" width="80%">}}

Click **View Suggested Policy** to view a suggested downsized policy based on the actual usage.

{{< img src="security/identity_risks/downsized_policy.png" alt="Review suggestions for downsizing a policy on the Suggested downsized policy dialog" width="100%">}}

To remediate the identity risk, click **Fix in AWS** to update the resource in AWS IAM console. To create a Jira issue and assign it to a team, click **Add Jira issue**. See [Create Jira Issues for Cloud Security Management Issues][2] for more information.

{{< img src="security/identity_risks/side_panel_action_buttons_2.png" alt="Remediate identity risks using the action buttons on the side panel" width="100%">}}

You can also use Terraform remediation to generate a pull request in GitHub with code changes that fix the underlying identity risk, or leverage [Workflow Automation][3] to create automated workflows for identity risks (with or without human involvement).

## AWS IAM Access Analyzer integration

Datadog CIEM is integrated with [AWS IAM Access Analyzer][5] to further improve the permissions gap detections. If you are using AWS IAM Access Analyzer, Datadog CIEM automatically leverages its unused access findings to enrich permissions gap detections and downsized policy recommendations.

<div class="alert alert-info">If you are enabling AWS IAM Access Analyzer for the first time, there is an additional AWS cost associated with this enablement and it could take up to two hours before AWS IAM Access Analyzer's insights are made available.</div>

{{< img src="security/identity_risks/aws_iam_access_analyzer.png" alt="Banner about AWS IAM Access Analyzer enriching permissions gap detections and policy recommendations" width="100%">}}

## Video walkthrough

The following video provides an overview of how to enable and use CSM Identity Risks:

{{< img src="security/csm/how-to-use-csm-identity-risks.mp4" alt="Video that provides an overview of how to install and use CSM Identity Risks" video=true >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /security/cloud_security_management/guide/jira
[3]: /security/cloud_security_management/workflows
[4]: /security/cloud_security_management/identity_risks/#:~:text=Click%20View%20Suggested%20Policy%20to%20view%20a%20suggested%20downsized%20policy%20based%20on%20the%20actual%20usage.
[5]: https://aws.amazon.com/iam/access-analyzer/
