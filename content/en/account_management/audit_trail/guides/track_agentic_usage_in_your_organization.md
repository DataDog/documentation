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

Datadog AI agents, including the Bits fleet (Bits SRE, Bits Dev, Bits Assistant, Bits Security Analyst) and Bits Agent Builder, can take actions inside your organization on their own or on behalf of a user. Audit Trail attributes these actions to the agent that performed them and, when applicable, to the user who authorized them. This guide walks you through finding agent-driven events, filtering them by agent type, and tracing an agent's actions back to the user who delegated them.

## View all Datadog AI agent activity

1. Navigate to [Audit Trail][1].
2. In the search bar, enter the query: `@evt.actor.mode:*`.

   This query returns every event where a Datadog AI agent is the actor, whether the agent acted `interactive` (a user was present and approved the action) or `autonomous` (the agent acted on a system trigger, with no user involved).
3. Click an event to open details and see the full actor breakdown: the delegator (the user, if any), the agent, and the mode.

**Note**: Rollout to all Bits agents is in progress, and coverage is not yet complete. Actions from agents that have not yet onboarded do not appear in `@evt.actor.mode:*` results.

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

## Distinguish agent events from human events

Agent-driven events are marked with the agent's name and avatar (for example, Bits Assistant) paired with the delegating user, labeled Co-authored by user + agent. This lets you distinguish agent activity from human activity without opening each event.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/#create-a-dashboard-or-a-graph
