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

The Remediation Inbox is the **Remediations** tab of [Security Inbox][1]. Instead of listing individual findings, it groups findings by the single fix that resolves them, such as one package upgrade in a repository or one container image update. Each group is a _remediation_.

The Remediation Inbox answers one question: **what are the most impactful fixes to make today?** From a remediation, you can review its impact, assign an owner, track the work in a [Work Management][2] work item, and generate a pull request with AI.

<!-- TODO: screenshot of the Remediations tab -->

## Prerequisites

- Findings from at least one supported product:
  - [Software Composition Analysis][3] (SCA) library vulnerabilities
  - [Cloud Security Vulnerabilities][4] host and container image vulnerabilities
- Permission to read security findings or vulnerabilities, to view remediations.
- The `cases_write` permission, to create work items, assign owners, and link pull requests.

To enable optional capabilities, such as AI-generated fixes and third-party ticketing, see [Enable remediation capabilities](#enable-remediation-capabilities).

## How findings are grouped into remediations

A remediation groups the open findings that a single change resolves:

| Product | Remediation | Example |
|---|---|---|
| Software Composition Analysis | Update one package in one repository. | Update `lodash` in `my-org/web-app` |
| Cloud Security Vulnerabilities | Update one container image, bump a base image, or update one OS package. | Upgrade `my-registry/api:1.4` |

Each remediation lists the vulnerabilities (CVEs and advisories) it closes, the findings and files affected, and the code owners of those files.

## How remediations are prioritized

Remediations are ranked by the findings they close:

1. Number of critical findings.
1. Number of high findings, when the number of critical findings is equal.
1. Total number of findings, when both counts are equal.

For example, a remediation that closes five critical findings ranks above one that closes two critical and 50 high findings.

## Explore remediations

### Remediation status

Remediations are split into status tabs. The inbox opens on **To Triage**.

| Status | Meaning |
|---|---|
| To Triage | No action has been taken. No work item is attached. |
| Open | A work item is attached, and work has not started. |
| In Progress | A work item is attached, and work is in progress. |
| Closed | The work item attached to the remediation is closed. |

The status of a remediation follows the status of its [remediation work item](#track-remediation-progress).

### Remediation table

Each row is one remediation. Reading left to right, a row answers four questions:

- **What is the fix?** The change to make, such as the package or image to update and the target version.
- **What does it resolve?** The findings and vulnerabilities the fix closes, by severity, and whether any have a known exploit.
- **What does it take, and who owns it?** Where the fix applies (repository and files) and the code owners or teams responsible for it.
- **Where does it stand?** The assignee, the remediation work item or synced ticket, and any linked pull requests.

Click a row to open its details in a side panel.

### Filter remediations

Use the filter bar to focus on the remediations your team can act on. Filters apply to the findings behind each remediation, so a remediation appears only if at least one of its findings matches. You can filter by:

- **Ownership**, such as team, code owner, repository, or service, to see the fixes your team owns.
- **Risk**, such as severity or exploit availability, to focus on the most urgent fixes.
- **Vulnerability**, such as CVE or package, to track a specific issue across your environment.
- **Triage**, such as the assignee of the remediation work item, to see the remediations you are in charge of.

Click **Edit Filters** to add or remove filters from the bar.

## View remediation details

Click a remediation to open its side panel:

- **Know before you remediate**: An AI-generated summary of why the fix matters and what it changes. If generative AI features are disabled for your organization, a summary of the impact is shown instead.
- **Ticketing, Assignee, and PRs**: The remediation work item, its owner, and the linked pull requests grouped by status (Draft, Open, Merged, Closed), with their authors.
- **Vulnerabilities**: The vulnerabilities the fix closes, with severity, finding count, and owner. Expand a vulnerability to see the affected files.
- **View findings**: Open the findings of the remediation in the SCA or Cloud Security Vulnerabilities explorer.

## Remediate

Taking action on a remediation creates a _remediation work item_ in [Work Management][2]. A remediation has at most one remediation work item, which stores its owner, ticket, and fixes.

### Assign an owner

In the **Ticketing** column or the side panel, select an assignee. If the remediation does not have a work item yet, Datadog creates one.

### Create a work item

Click **Create Security Case**, optionally select a Work Management [project][5], and click **Create**. If you do not select a project, the work item is created in the default **Security Remediation** project.

To route remediation work items to Jira, ServiceNow, or Linear, configure the third-party integration on the Work Management project. See [Route remediation work items to your ticketing tool](#route-remediation-work-items-to-your-ticketing-tool).

### Remediate with AI

<!-- TODO: confirm which third-party coding agents are supported -->

<div class="alert alert-info">AI remediation is available for Software Composition Analysis and Cloud Security Vulnerabilities remediations.</div>

From the side panel, click **Remediate with AI** and choose one of the following:

- **Fix with Bits Code**: [Bits Code][6] opens a code session on the repository and prepares a pull request. When the session starts, Datadog attaches it to the remediation work item.
- **Copy fix prompt** (SCA only): Copy a prompt with the context of the fix to use with your own coding agent.
- **Fix with Cursor** (SCA only): Open the fix prompt in Cursor.

To check the fix from your coding agent, connect the [Datadog MCP Server][7].

### Link a pull request

If you fixed the issue outside of Datadog, click **Link PR** in the side panel and enter the GitHub pull request URL. The pull request is attached to the remediation work item, and its status appears in the inbox.

## Track remediation progress

Each fix, whether a Bits Code session or a linked pull request, is recorded as a child work item of the remediation work item. Child work items can have their own owner, which lets several people work on parts of the same remediation.

While a linked pull request is open or in draft, the side panel shows **PR opened — awaiting merge**. Findings stay open until the pull request merges and the next scan confirms the fix.

Findings that belong to a remediation work item show the linked work item in the SCA and Cloud Security Vulnerabilities explorers and in the finding side panel. This lets anyone investigating a finding see that a fix is already underway.

## Enable remediation capabilities

| Capability | What it unlocks | How to enable |
|---|---|---|
| Remediation work items | Assign owners, create work items, and link pull requests. | Grant users the `cases_write` permission. See [Work Management][2]. |
| Third-party tickets | Sync remediation work items to Jira, ServiceNow, or Linear. | See [Route remediation work items to your ticketing tool](#route-remediation-work-items-to-your-ticketing-tool). |
| AI summary | The **Know before you remediate** summary. | Enable generative AI features for your organization. |
| Fix with Bits Code | AI-generated pull requests from a remediation. | [Set up Bits Code][8] and connect your GitHub repositories. |
| Pull request status | Status and authors of linked pull requests. | Install the [GitHub integration][9] and give Datadog access to the repository. |
| Code owners | Owners and teams on each remediation. | Add a `CODEOWNERS` file to your repositories and set up [Source Code Integration][10]. |
| Fix verification from your IDE | Check fixes from your coding agent. | Set up the [Datadog MCP Server][7]. |

### Route remediation work items to your ticketing tool

<!-- TODO: steps to select a Work Management project with a Jira, ServiceNow, or Linear integration -->

See [Third party tickets][11] in the Work Management documentation and [Ticketing Integrations][12].

## Limitations

- Remediations are available for Software Composition Analysis and Cloud Security Vulnerabilities findings.
- Bits Code opens one code session per remediation.
- Pull request linking supports GitHub only.
- Saved views are not available on the **Remediations** tab.

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
[11]: /incident_response/work_management/notifications_integrations/#third-party-tickets
[12]: /security/ticketing_integrations/
