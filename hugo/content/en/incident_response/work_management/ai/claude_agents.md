---
title: Claude Agents
description: Connect Claude Managed Agents to Datadog, assign them work items, and manage them from Organization Settings.
further_reading:
- link: "/incident_response/work_management/ai/custom_agents/"
  tag: "Documentation"
  text: "Assign work items to Bits Agent Builder agents"
- link: "/incident_response/work_management/automation_rules/"
  tag: "Documentation"
  text: "Work item automation rules"
- link: "/mcp_server/"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Audit Trail"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI features for Work Management are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/claude-agents-in-work-management/" btn_hidden="false" header="Join the Preview for the Work Management integration with Claude">}} Assign work items to Claude managed agents. Fill out the form to request access.{{< /callout >}}

## Overview

Assign Work Management items to [Claude Managed Agents][1] that you build and host in your Anthropic workspace. When you assign a work item, Datadog starts a Claude session with the work item's details. The agent then works in Datadog through the [Datadog MCP Server][2]. It reads the work item and investigates. With the right permissions, it also comments on and updates the work item.

Setup takes three steps:

1. [Connect your Anthropic account](#step-1-connect-your-anthropic-account).
2. [Add a Claude agent to Datadog](#step-2-add-a-claude-agent-to-datadog).
3. [Assign work items to the agent](#step-3-assign-work-items-to-the-agent).

## How it works

- **Each agent has its own Datadog identity.** When you add a Claude agent, Datadog creates a Datadog user for it. The agent acts as this user, with the permissions you pick. It does not act as the person who assigned the work item. Its actions appear under its own name in [Audit Trail][3].
- **Datadog sets up the agent's access to Datadog.** When you add the agent, Datadog adds the Datadog MCP Server to the agent in Anthropic, under the name `datadog`, with the `core` and `cases` toolsets. If the agent already has an MCP server on your Datadog site's MCP host, Datadog keeps it as is. Datadog also creates a vault named `Datadog - <agent name>` in your Anthropic workspace. When a session starts, Datadog puts a short-lived Datadog credential in this vault, scoped to the agent's permissions. You never handle a Datadog API key for the agent.
- **Keep Datadog's setup in place.** Don't remove or edit the `datadog` MCP server or the `Datadog - <agent name>` vault in Anthropic. Without them, the agent can't reach Datadog.
- **Sessions run in your Anthropic workspace.** Sessions use your Anthropic environment, vaults, and API key. Anthropic bills them to your account. They don't consume Datadog AI credits.
- **The agent runs without approval prompts.** The agent can call Datadog MCP tools without asking someone to confirm each call. Its Datadog permissions limit what it can do, so grant only what it needs.

## Prerequisites

### In Anthropic

- A [Claude Console][4] organization with access to Claude Managed Agents. Claude Managed Agents runs on the Claude Platform, not in claude.ai.
- At least one Claude agent in a workspace of that organization.
- At least one environment in that workspace. Sessions can't start without one.
- An Anthropic API key for that workspace.

### In Datadog

Access to the Preview, and the following permissions:

| Task | Permissions needed |
|---|---|
| Connect an Anthropic account | {{< ui >}}Integrations Manage{{< /ui >}} |
| Add, edit, disable, or delete an agent | {{< ui >}}AI Agents Write{{< /ui >}} and {{< ui >}}Org Management{{< /ui >}} |
| View agents | {{< ui >}}AI Agents Read{{< /ui >}}, {{< ui >}}AI Agents Write{{< /ui >}}, or {{< ui >}}AI Agents Run{{< /ui >}} |
| Assign a work item to an agent, or create an automation rule that does | {{< ui >}}AI Agents Run{{< /ui >}} |
| Read or message an agent's session | Access to the work item |

By default, the Datadog Admin role includes {{< ui >}}AI Agents Write{{< /ui >}}, and the Datadog Standard role includes {{< ui >}}AI Agents Run{{< /ui >}}.

## Step 1: Connect your Anthropic account

1. In Datadog, open the [Anthropic integration][5].
1. Add an account. Give it a name and paste your Anthropic API key.
1. Save the account.

Datadog lists the Claude agents of every Anthropic account you add here. Add one account for each Anthropic workspace that holds agents.

**Note**: Anthropic API keys can expire. When a key expires, the agents that use it stop starting sessions. See [Change an agent's API key](#change-an-agents-api-key-environment-or-vaults).

## Step 2: Add a Claude agent to Datadog

1. Go to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Agents{{< /ui >}}][6].
1. Click {{< ui >}}Add Agent{{< /ui >}} and select {{< ui >}}Claude{{< /ui >}}.
1. Under {{< ui >}}Select a Claude agent{{< /ui >}}, pick the agent. The list shows the agents of all your connected Anthropic accounts that aren't added yet.
1. Under {{< ui >}}Session settings{{< /ui >}}, pick:
    - {{< ui >}}Environment{{< /ui >}} (required): the sandbox the agent's sessions run in, with its installed packages and network access.
    - {{< ui >}}Vaults{{< /ui >}} (optional): vaults with the credentials the agent needs for other tools, such as GitHub. You don't need a vault for Datadog: Datadog creates its own.
1. Under {{< ui >}}Give it permissions{{< /ui >}}, pick the agent's Datadog permissions. See [Choose the agent's permissions](#choose-the-agents-permissions).
1. Click {{< ui >}}Add Agent{{< /ui >}}.

The agent appears in the {{< ui >}}Claude{{< /ui >}} tab of the Agents page with the {{< ui >}}Active{{< /ui >}} status.

### Choose the agent's permissions

A new agent starts with these permissions:

| Permission | Why |
|---|---|
| {{< ui >}}MCP Read{{< /ui >}} | Lets the agent use the Datadog MCP Server. Claude agents always keep this permission. |
| {{< ui >}}MCP Write{{< /ui >}} | Lets the agent use MCP tools that change data. |
| {{< ui >}}Work Items Read{{< /ui >}} | Lets the agent read work items. |

<div class="alert alert-warning">To let the agent comment on, update, or resolve work items, also grant <strong>Work Items Write</strong>. Without it, the agent can read the work item, but it can't change it. Its last message still shows in the work item banner.</div>

Add the permissions for any other data the agent works with, such as Logs Read or APM Read. Grant only what the agent needs.

You can only grant permissions that you have. Some sensitive permissions can't be given to an agent. Both kinds appear grayed out in the list.

## Step 3: Assign work items to the agent

Each assignment starts a new Claude session. The agent receives the work item's key, title, and description, and the links to any GitHub repositories on the work item.

### Assign a work item manually

In a work item, select the agent in the {{< ui >}}Agent Assignee{{< /ui >}} field.

If you don't have the {{< ui >}}AI Agents Run{{< /ui >}} permission, Claude agents appear grayed out in the list.

### Assign work items automatically

Use [work item automation rules][7] to assign matching work items to a Claude agent:

1. Go to [{{< ui >}}Work Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][8].
1. Select the project.
1. Select {{< ui >}}Automation Rules{{< /ui >}} and click {{< ui >}}New Rule{{< /ui >}}.
1. Define the trigger.
1. Select {{< ui >}}Assign Agent{{< /ui >}} and pick the Claude agent.
1. Name and enable the rule.

The rule starts sessions on behalf of its author. The author needs the {{< ui >}}AI Agents Run{{< /ui >}} permission, and their account must stay active. Otherwise, the rule can't start sessions, and the work item says why.

### Send a message to a running agent

To give the agent more context or a new instruction, mention it in a work item comment. Type `@`, pick the agent, and post the comment. Datadog sends the comment to the agent's session. After a session ends, it can't take new messages. Assign the agent again to start a new session.

## Follow the agent's work

The work item banner shows the status of the agent's latest session:

| Status | What it means |
|---|---|
| {{< ui >}}Queued{{< /ui >}} | The session is created and waiting to start. |
| {{< ui >}}Running{{< /ui >}} | The agent is working. The banner shows for how long. |
| {{< ui >}}Needs action{{< /ui >}} | The session is waiting for someone to act in the Claude Console, such as confirming a tool call. |
| {{< ui >}}Done{{< /ui >}} | The agent finished. The banner shows its last message. |
| {{< ui >}}Failed{{< /ui >}} | The session stopped on an error. The banner shows the error. |
| {{< ui >}}Cancelled{{< /ui >}} | Someone stopped the session. |

Open the session from the work item timeline to read the conversation and send the agent a message. You can also open the session in the Claude Console.

Only users who can see the work item can read its session or message it.

## Manage agents

Manage your Claude agents from [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Agents{{< /ui >}}][6]. These actions need the {{< ui >}}AI Agents Write{{< /ui >}} and {{< ui >}}Org Management{{< /ui >}} permissions.

### Edit an agent's permissions

1. Find the agent and click {{< ui >}}Edit{{< /ui >}}.
1. Change the permissions.
1. Click {{< ui >}}Save{{< /ui >}}.

The agent's Datadog credential is renewed with the new permissions. To edit an agent, you need every permission it has.

### Change an agent's API key, environment, or vaults

1. Find the agent and click {{< ui >}}Edit{{< /ui >}}.
1. Pick another {{< ui >}}Anthropic API key{{< /ui >}}, environment, or vaults. Only the keys that reach the agent's workspace are listed. If Anthropic rejects the current key, for example because it expired, a warning asks you to pick another one.
1. Click {{< ui >}}Save{{< /ui >}}.

### Disable or enable an agent

Use the toggle in the agent's row. A disabled agent can't start sessions, and its Datadog user is disabled too, so it can't act in Datadog. Enable it again at any time.

An agent shows the {{< ui >}}Missing{{< /ui >}} status when it no longer exists in Anthropic. It can't start sessions.

### Delete an agent

1. Find the agent and select {{< ui >}}Delete agent{{< /ui >}}.
1. Confirm.

Datadog removes the agent, deletes its Datadog user and its permissions, and deletes the vault that Datadog created. The agent stays in Anthropic. You can add it again later, with new permissions.

### Review an agent's activity

Click an agent to open its side panel:

- {{< ui >}}Activity{{< /ui >}}: what the agent did in Datadog in the last 30 days, from Audit Trail. This needs the {{< ui >}}Audit Trail Read{{< /ui >}} permission, and Audit Trail must be enabled for your organization. Click {{< ui >}}View in Audit Trail{{< /ui >}} to see all events.
- {{< ui >}}Work Items{{< /ui >}}: the work items assigned to the agent that you can access.

Changes to agents and session starts are recorded in Audit Trail under the {{< ui >}}AI Agents{{< /ui >}} category.

## Troubleshooting

When a session can't start, the work item timeline explains why. Common messages:

| Message | What to do |
|---|---|
| This Claude agent has no Anthropic environment to run in yet. | An admin picks an environment for the agent in [Organization Settings > Agents][6]. Then assign the agent again. |
| This Claude agent has no Datadog MCP server, so it can't reach Datadog. | Add an MCP server to the agent in Anthropic with the URL <code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,cases</code>. Or delete the agent in Datadog and add it again: Datadog sets up the server and the vault again. Then assign the agent again. |
| The vault this agent reaches Datadog with isn't one Datadog set up. | An admin checks the agent in [Organization Settings > Agents][6]. If Datadog's vault was deleted in Anthropic, delete the agent in Datadog and add it again. |
| Anthropic refused to start the session. | Pick another agent, or ask an admin to check the agent in [Organization Settings > Agents][6] and in the Claude Console. |
| Anthropic rejected the API key of the Anthropic account this agent was added from. | Replace the key in the [Anthropic integration][5], or pick another key for the agent. Then assign the agent again. |
| The Anthropic account this agent was added from is no longer in your Anthropic integration. | Add the account back in the [Anthropic integration][5]. Then assign the agent again. |
| The Anthropic environment or vault this agent runs with was archived or deleted. | An admin picks another environment or vault for the agent. Then assign the agent again. |
| Datadog couldn't give this agent a token with its permissions. | An admin reviews the agent's permissions. Then assign the agent again. |
| You don't have the permission to run this agent. | Ask an admin for the {{< ui >}}AI Agents Run{{< /ui >}} permission. |
| The rule's author doesn't have the permission to run this agent. | Give the rule's author the {{< ui >}}AI Agents Run{{< /ui >}} permission, or have someone who has it create the rule again. |
| The rule's author can't act in Datadog anymore. | Have someone else create the rule again. |
| This Claude agent is disabled, or no longer exists in your Anthropic workspace. | Enable the agent, or pick another agent. |
| Claude couldn't start working on this work item. | Try assigning the agent again later. |

Other issues:

- **The agent doesn't appear on the Add page**: Check that the agent isn't archived in Anthropic and isn't already added. Datadog may warn that it couldn't read the agents of a key. In that case, check that the key is valid and can access Claude Managed Agents.
- **The agent reads the work item but doesn't comment**: Grant the agent the {{< ui >}}Work Items Write{{< /ui >}} permission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://platform.claude.com/docs/en/managed-agents/overview
[2]: /mcp_server/
[3]: /account_management/audit_trail/
[4]: https://platform.claude.com
[5]: https://app.datadoghq.com/integrations/anthropic
[6]: https://app.datadoghq.com/organization-settings/agents
[7]: /incident_response/work_management/automation_rules/
[8]: https://app.datadoghq.com/work/settings
