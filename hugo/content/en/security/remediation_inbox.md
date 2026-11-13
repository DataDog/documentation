---
title: Remediation Inbox
further_reading:
- link: "/security/security_inbox"
  tag: "Documentation"
  text: "Security Inbox"
- link: "/incident_response/work_management/"
  tag: "Documentation"
  text: "Work Management"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/security/code_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Software Composition Analysis"
- link: "/security/cloud_security_management/vulnerabilities/"
  tag: "Documentation"
  text: "Cloud Security Vulnerabilities"
products:
- name: Cloud Security
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Code Security
  url: /security/code_security/
  icon: security-code-security
---

{{< product-availability >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">The Remediation Inbox is not available on the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

<div class="alert alert-info">The Remediation Inbox is in Preview.</div>

The Remediation Inbox is the **Remediations** tab of [Security Inbox][1]. Instead of listing individual findings, it groups findings by the single fix that resolves them, such as one package upgrade in a repository or one container image update. Each group is a **remediation**.

Use the Remediation Inbox to find the fixes that close the most critical findings. From a remediation, you can review its impact, assign an owner, track the work in a **remediation case** in [Work Management][2], and generate a pull request with AI.

To open the Remediation Inbox, go to [Security Inbox > Remediations][11] in Datadog.

{{< img src="security/remediation_inbox/remediations_tab.png" alt="The Remediations tab of Security Inbox, listing package updates with the findings each one closes, its scope, and its tracking status" width="100%">}}

## Prerequisites

Findings from at least one supported product:

- [Software Composition Analysis][3] (SCA) library vulnerabilities
- [Cloud Security Vulnerabilities][4] host and container image vulnerabilities

You also need the [permissions][13] for the actions you take:

| Action | Required permissions |
|---|---|
| View remediations | `security_monitoring_findings_read` or `appsec_vm_read`, and `cases_read` |
| Create cases, assign owners, link pull requests, and generate fixes with Bits Code | `security_monitoring_findings_read` or `appsec_vm_read`, and `cases_write` |

To enable optional capabilities, such as AI-generated fixes and third-party ticketing, see the [Enable remediation capabilities](#enable-remediation-capabilities) section.

## How findings are grouped into remediations

A remediation groups the open findings that a single change resolves:

| Product | Remediation | Example |
|---|---|---|
| Software Composition Analysis | Update one package in one repository | Update `lodash` in `my-org/web-app` |
| Cloud Security Vulnerabilities | Update one container image, bump a base image, or update one OS package | Update `my-registry/api:1.4` |

Each remediation lists the vulnerabilities (CVEs and advisories) it closes, the findings and files affected, and the code owners of those files.

## How remediations are prioritized

Remediations are ranked by the findings they close:

1. Number of critical findings
1. Number of high findings, when the number of critical findings is equal
1. Total number of findings, when both counts are equal

For example, a remediation that closes 5 critical findings ranks above one that closes 2 critical and 50 high findings.

## Explore remediations

### Remediation status

Remediations are split into status tabs. The inbox opens on **To Triage**.

| Status | Meaning |
|---|---|
| To Triage | No action has been taken. No case is attached. |
| Open | A case is attached, and work has not started. |
| In Progress | A case is attached, and work is in progress. |
| Closed | The remediation has no open findings and no fix in progress. |

The status of a remediation follows the status of its remediation case. See the [Remediation lifecycle](#remediation-lifecycle) section.

### Remediation table

Each row is one remediation. From left to right, each row answers four questions:

- **What is the fix?** The change to make, such as the package or image to update and the target version.
- **What does it resolve?** The findings and vulnerabilities the fix closes, by severity, and whether any have a known exploit.
- **What does it take, and who owns it?** Where the fix applies (repository and files) and the code owners or teams responsible for it.
- **Where does it stand?** The assignee, the remediation case or synced ticket, and any linked pull requests.

### Filter remediations

Use the filter bar to focus on the remediations your team can act on. Filters apply to the findings behind each remediation, so a remediation appears only if at least one of its findings matches. You can filter by:

- **Ownership**, such as team, code owner, repository, or service, to see the fixes your team owns.
- **Risk**, such as severity or exploit availability, to focus on the most urgent fixes.
- **Vulnerability**, such as CVE or package, to track a specific issue across your environment.
- **Triage**, such as the assignee of the remediation case, to see the remediations you are in charge of.

Click **Edit Filters** to add or remove filters from the bar.

## View remediation details

Click a remediation to open its side panel:

- **Know before you remediate**: An AI-generated summary of why the fix matters and what it changes. If AI features are not available for your organization, a summary of the impact is shown instead.
- **Ticketing, Assignee, and PRs**: The remediation case, its owner, and the linked pull requests grouped by status (Draft, Open, Merged, Closed), with their authors.
- **Vulnerabilities**: The vulnerabilities the fix closes, with severity, finding count, and owner. Expand a vulnerability to see the affected files.
- **View findings**: Open the findings of the remediation in the SCA or Cloud Security Vulnerabilities explorer.

{{< img src="security/remediation_inbox/side_panel.png" alt="The side panel of a package update remediation, showing its summary, ticketing and assignee details, and the vulnerabilities the fix closes" width="100%">}}

## Remediate

Taking action on a remediation creates its remediation case in [Work Management][2]. A remediation has at most one remediation case, which stores its owner, ticket, and fixes.

### Assign an owner

In the **Tracking** column or the side panel, select an assignee. If the remediation does not have a case yet, Datadog creates one.

### Create a case or ticket

1. In the **Tracking** column or the side panel, click **Add Ticket**.
1. Select **Work Management**, **Jira**, **ServiceNow**, or **Linear**.
1. For Jira, ServiceNow, or Linear, select a template, or create one in the dialog. The template defines where the ticket is created, such as the Jira space and ticket type, the ServiceNow table and assignment group, or the Linear team.
1. Optionally, change the linked Work Management [project][5] and the assignee.
1. Click **Create**.

Datadog creates the remediation case in the project you selected, or in the default **Security Remediation** project. For Jira, ServiceNow, and Linear, Datadog also creates the ticket and links it to the case.

To add a ticket to a remediation that already has a case:

1. Open the menu next to the case and select **Route to app**.
1. Choose Jira, ServiceNow, or Linear.
1. Select a template, then click **Confirm**.

The ticket appears in the **Tracking** column and in the side panel of the remediation.

### Remediate with AI

From the side panel, click **Remediate with AI** and choose one of the following:

- **Fix with Bits**: [Bits Code][6] opens a code session on the repository and prepares a pull request. Datadog links the session and its pull request to the remediation through a child case. Requires [Bits Code setup][8].
- **Copy fix prompt**: Copy a prompt with the context of the fix to use with your own coding agent.
- **Fix with Cursor**: Open the fix prompt in Cursor.

To let your coding agent update the remediation case as it works, set up the [Datadog MCP Server][15] with the `cases` toolset. The toolset is not enabled by default, so add `cases` to the `toolsets` parameter.

To check the fix from your coding agent, set up the [Code Security MCP Server][7]. It rescans your local code and confirms the findings are resolved before you commit.

{{< img src="security/remediation_inbox/remediate_with_ai.png" alt="The Remediate with AI dialog, with the Fix with Bits, Copy fix prompt, and Fix with Cursor options" width="80%">}}

### Link a pull request

If you fixed the issue outside Datadog, click **Link PR** in the side panel and enter the GitHub pull request URL. Datadog links the pull request to the remediation through a child case, and its status appears in the inbox. Only GitHub pull requests are supported.

## Track remediation progress

Datadog records each fix, whether a Bits Code session or a linked pull request, as a child case of the remediation case. Child cases can have their own owners, which lets several people work on parts of the same remediation.

While a linked pull request is open or in draft, the side panel shows **PR opened — awaiting merge**. Findings stay open until the pull request merges and the next scan confirms the fix.

Findings that belong to a remediation case show the linked case in the SCA and Cloud Security Vulnerabilities explorers and in the finding side panel. This lets anyone investigating a finding see that a fix is already underway.

### Remediation lifecycle

Datadog updates the status of remediation cases automatically:

- A remediation case moves to **In Progress** when a fix starts, such as a Bits Code session or a linked pull request.
- A remediation case closes when the remediation has no open findings and no fix is in progress. Findings leave a remediation when they are fixed, muted, or expired.
- A closed remediation case, including one closed manually, reopens if the remediation has open findings again within 30 days.

Status updates can take up to an hour to appear.

## Enable remediation capabilities

| Capability | What it enables | How to enable |
|---|---|---|
| Remediation cases | Assign owners, create cases, and link pull requests. | Grant users the `cases_read` and `cases_write` permissions. See [Work Management][2]. |
| Third-party tickets | Create Jira, ServiceNow, or Linear tickets from remediations. | Set up the [Jira][17], [ServiceNow][18], or [Linear][19] integration. See [Third-party tickets][14]. |
| AI summary | The **Know before you remediate** summary. | Available by default. Not available for organizations that opted out of AI features or have HIPAA compliance enabled. |
| Fix with Bits | AI-generated pull requests from a remediation. | [Set up Bits Code][8], connect your GitHub repositories, and turn on the **AI Products** toggle in [AI Credits admin controls][16]. |
| Pull request status | Status and authors of linked pull requests. | Install the [GitHub integration][9] and give Datadog access to the repository. |
| Code owners | Owners and teams on each remediation. | Add a `CODEOWNERS` file to your repositories and set up [Source Code Integration][10]. |
| Fix verification from your coding agent | Check fixes before you commit. | Set up the [Code Security MCP Server][7]. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/security_inbox/
[2]: /incident_response/work_management/
[3]: /security/code_security/software_composition_analysis/
[4]: /security/cloud_security_management/vulnerabilities/
[5]: /incident_response/work_management/projects/
[6]: /bits_ai/bits_code/
[7]: /security/code_security/dev_tool_int/mcp_server/
[8]: /bits_ai/bits_code/setup/
[9]: /integrations/github/
[10]: /source_code/
[11]: https://app.datadoghq.com/security/issues?si-tab=remediation
[13]: /account_management/rbac/permissions/
[14]: /incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /mcp_server/setup/
[16]: /account_management/billing/ai_credits/#admin-controls
[17]: /integrations/jira/
[18]: /integrations/servicenow/
[19]: /integrations/linear/
