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

Datadog AI agents, including the Bits fleet (Bits SRE, Bits Dev, Bits Assistant, Bits Security Analyst) and Agent Builder workflows, can take actions inside your organization on their own or on behalf of a user. Audit Trail attributes these actions to the agent that performed them and, when applicable, to the user who authorized them. This guide walks you through finding agent-driven events, filtering them by agent type, and tracing an agent's actions back to the user who delegated them.

## View all Datadog AI agent activity

1. Navigate to [Audit Trail][1].
1. In the search bar, enter the query: `@evt.actor.mode:*`.

   This query returns every event where a Datadog AI agent is the actor, whether the agent acted `interactive` (a user was present and approved the action) or `autonomous` (the agent acted on a system trigger, with no user present).
1. Optionally, use the {{< ui >}}Agent Type{{< /ui >}} and {{< ui >}}Agent Name{{< /ui >}} facets to narrow results down to a specific agent, such as Bits SRE or Bits Dev.
1. Click an event to open the detail drawer and see the full actor breakdown: the delegator (the user, if any), the agent, and the mode.

**Note**: Coverage rolls out per product and depends on each Datadog AI agent team onboarding to the actor and delegation model. Until an agent team completes onboarding, `@evt.actor.mode:*` under-reports that agent's activity.

## View actions taken through the Datadog MCP server

Actions taken through a Datadog-managed OAuth client, such as the Datadog MCP server, carry the `is_mcp_call` field.

1. Navigate to [Audit Trail][1].
1. In the search bar, enter the query: `is_mcp_call:true`.
1. Click an event to see a link back to the MCP server configuration and to other events from the same MCP session.

## View a user's full activity, including agent-delegated actions

When a Datadog AI agent acts on a user's behalf, the agent becomes `@evt.actor` for that event, and the user moves to `@delegator.actor`. Searching only `@usr.name:<USER_EMAIL>` returns the actions the user performed directly, and does not include actions a Datadog AI agent performed on their behalf.

To retrieve a user's complete activity, including delegated agent actions:

1. Navigate to [Audit Trail][1].
1. In the search bar, enter the query: `(@usr.name:<USER_EMAIL> OR @delegator.name:<USER_EMAIL>)`. Replace `<USER_EMAIL>` with the user's email address.

   | Description of audit event                                                                          | Query in audit explorer                                     |
   | ------------------------------------------------------------------------------------------------------| ------------------------------------------------------------ |
   | Actions a user performed directly                                                                     | `@usr.name:<USER_EMAIL>`                                      |
   | All actions attributed to a user, including actions a Datadog AI agent performed on their behalf      | `(@usr.name:<USER_EMAIL> OR @delegator.name:<USER_EMAIL>)`    |
1. See [Create a dashboard or a graph][2] if you want to put this information into a dashboard or graph.

## Distinguish agent events from human events

Agent-driven events display a visual badge in the event list, so you can distinguish them from human-driven events without opening each one. Use this alongside the {{< ui >}}Agent Type{{< /ui >}} and {{< ui >}}Agent Name{{< /ui >}} facets to build a saved view of agent activity for your security or compliance team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/#create-a-dashboard-or-a-graph
