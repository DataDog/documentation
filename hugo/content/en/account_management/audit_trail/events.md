---
title: Audit Trail Events
description: Comprehensive reference of over 100 audit event types across Datadog platform products with detailed categorization and examples.
aliases:
    - /account_management/audit_trail_events/
disable_edit: true
disable_toc: true
further_reading:
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn more about Audit Trail"

---

## Overview

[Datadog Audit Trail][1] records more than 100 types of audit events from across the Datadog platform. These audit events are categorized into different product categories as event names.

## Agent actor and delegation fields

In addition to product-specific events, Audit Trail events can carry actor and delegation metadata that identifies actions taken by a Datadog AI agent, such as Bits SRE, Bits Dev, Bits Assistant, Bits Security Analyst, and Bits Agent Builder.

| Field               | Description                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@evt.actor.mode`    | The mode a Datadog AI agent acted in: `interactive` (a user was present and approved the action) or `autonomous` (the agent acted on a system trigger, with no user present).  |
| `@delegator.actor`   | The user on whose behalf a Datadog AI agent acted. When an agent acts on a user's behalf, `@evt.actor` reflects the agent, and the user moves to `@delegator.actor`.           |
| `is_mcp_call`        | Set to `true` for actions taken through the Datadog MCP server.                                                                        |

Use the following queries to find agent-driven events:

| Description of audit event                        | Query in audit explorer |
| ---------------------------------------------------- | -------------------------- |
| All actions taken by a Datadog AI agent              | `@evt.actor.mode:*`        |
| All actions taken through the Datadog MCP server     | `is_mcp_call:true`         |

**Note**: Rollout to all Bits agents is in progress, and coverage is not yet complete. Actions from agents that have not yet onboarded do not appear in `@evt.actor.mode:*` results. Datadog-managed AI agent features are not available in GovCloud environments.

For a complete walkthrough on filtering by agent type, agent name, and delegated user activity, see [Track Agentic Usage in Your Organization][2].

{{< account_management/audit_events additional_info="See the [Audit Trail documentation](/account_management/audit_trail/) for more information on setting up and configuring Audit Trail." >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/guides/track_agentic_usage_in_your_organization/
