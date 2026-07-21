---
title: Track Agentic Usage in Your Organization
description: Use Audit Trail to see which actions Datadog AI agents take in your organization, distinguish agent activity from human activity, and trace agent actions back to the user who authorized them.
disable_toc: false
further_reading:
- link: "account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
- link: "account_management/audit_trail/events/"
  tag: "Documentation"
  text: "Learn about Audit Trail events"
---

## Overview

Datadog AI agents, including the Bits fleet (Bits SRE, Bits Chat, Bits Security Analyst) and Bits Agent Builder, can take actions inside your organization on their own or on behalf of a user. Audit Trail attributes these actions to the agent that performed them and, when applicable, to the user who authorized them. Onboarding to this attribution model varies by agent and by action type. This guide walks you through finding agent-driven events, filtering them by agent type, tracing an agent's actions back to the user who delegated them, and checking agent coverage.

## Agent coverage

Datadog AI agents onboard to the actor and delegation model individually, so coverage varies by agent and by action type. Use this table to check what you can query.

| Agent | Status | Notes |
| ----- | ------ | ----- |
| Bits SRE | Tracked | Most actions include `@evt.actor.mode` and `@delegator.*`. Some tool-call and investigation actions do not include these fields yet. |
| Bits Chat | Partially tracked | Actions taken from the full [Bits Chat page][3] run in `interactive` mode, with the requesting user in `@delegator.*`. Actions taken from the inline chat panel (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>) don't include these fields yet. |
| Bits Security Analyst | Tracked | Actions run in `autonomous` mode. There is no delegating user, because these actions don't involve a human in the loop. |
| Bits Agent Builder | Not yet tracked | Actions don't include `@evt.actor.mode` or `@delegator.*` yet. |
| Actions taken through the Datadog MCP server | Tracked | See the [View actions taken through the Datadog MCP server](#view-actions-taken-through-the-datadog-mcp-server) section. |
| Third-party or customer-built agents | Not tracked | Audit Trail doesn't distinguish these from regular usage of API keys, application keys, personal access tokens (PATs), or service account tokens (SATs). |

**Note**: Even for a tracked agent, some action types haven't been onboarded yet. `@evt.actor.mode:*` doesn't return every action for every tracked agent. Datadog is expanding coverage to the remaining agents and action types.

## View all Datadog AI agent activity

1. Navigate to [Audit Trail][1].
2. In the search bar, enter the query: `@evt.actor.mode:*`.

   This query returns events where an onboarded Datadog AI agent is the actor, whether the agent acted in `interactive` mode (a user was present and approved the action) or `autonomous` mode (the agent acted on a system trigger, with no user involved). See the [Agent coverage](#agent-coverage) section for which agents and action types this includes.
3. Click an event to open details and see the full actor breakdown: the delegator (the user, if any), the agent, and the mode.

**Note**: This query only returns activity from agents and action types already onboarded to the actor and delegation model. See the [Agent coverage](#agent-coverage) section for details.

## View actions taken through the Datadog MCP server

Actions taken through the Datadog MCP server carry the `is_mcp_call` field.

1. Navigate to [Audit Trail][1].
2. In the search bar, enter the query: `is_mcp_call:true`.
3. Click an event to see a link back to the MCP server configuration and to other events from the same MCP session.

## View a user's full activity, including agent-delegated actions

When a Datadog AI agent acts on a user's behalf, the agent's information fills `@usr.*` for that event, while the original user's information fills `@delegator.*` instead. Searching only `@usr.id:<USER_ID>` returns the actions the user performed directly, and does not include actions a Datadog AI agent performed on their behalf.

To retrieve a user's complete activity, including delegated agent actions:

1. Navigate to [Audit Trail][1].
2. In the search bar, enter the query: `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`. Replace `<USER_ID>` with the user's ID.

   **Note**: `@delegator.name` and `@usr.name` hold the user's full name, not their email address. To filter by a specific user, use `@delegator.id` and `@usr.id` instead.

   | Description of audit event                                                                          | Query in audit explorer                                     |
   | ------------------------------------------------------------------------------------------------------| ------------------------------------------------------------ |
   | Actions a user performed directly                                                                     | `@usr.id:<USER_ID>`                                           |
   | All actions attributed to a user, including actions a Datadog AI agent performed on their behalf      | `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`               |
3. See [Create a dashboard or a graph][2] if you want to put this information into a dashboard or graph.

**Note**: This only surfaces delegated actions from agents and action types already onboarded to the delegation model. See the [Agent coverage](#agent-coverage) section for details.

## Distinguish agent events from human events

Agent-driven events are marked with the agent's name and avatar (for example, Bits Chat) paired with the delegating user, labeled Co-authored by user + agent. This lets you distinguish agent activity from human activity without opening each event.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/#create-a-dashboard-or-a-graph
[3]: https://app.datadoghq.com/ask
