---
title: Bits Guardrails
description: "Control which remediation actions Bits can take on its own, which require approval, and which Bits can't take."
further_reading:
- link: "/bits_ai/bits_remediation/"
  tag: "Documentation"
  text: "Bits Remediation"
---

<!-- DRAFT: Conceptual content for review. Procedural steps to be added from the UI. -->

{{< callout >}} Bits Guardrails are in Preview.{{< /callout >}}

## Overview

Bits Guardrails let you control the remediation actions that Bits takes in your environment. A guardrail is a rule that defines which actions and resources it covers. It also defines whether Bits can take those actions on its own, must ask a person for approval first, or can't take them at all.

Use guardrails to give Bits more autonomy where you trust it. For example, you can allow Bits to restart workloads in a staging environment, while keeping people in control of higher-risk actions, such as rolling back a production deployment.

## How guardrails work

Each guardrail has the following parts:

### Actions
The remediation actions that the guardrail applies to, such as restarting, scaling, or rolling back a workload.

### Scope
The resources that the guardrail applies to, defined by tags such as `env`, `service`, or other resource tags.

### Enforcement level
What Bits can do when an action matches the guardrail:

| Enforcement level | What happens |
|---|---|
| **Allow** | Bits takes the action without asking for approval. |
| **Ask** | Bits waits until an approver gives consent before it takes the action. |
| **Deny** | Bits can recommend the action but can't take it. No one can approve it. |

### Approvers
For guardrails that require approval, the users, teams, or roles that can approve the action.

## How Bits evaluates guardrails

Before Bits takes a remediation action, it checks the action against your organization's guardrails.

### Matching

A guardrail matches an action when both of the following are true:

- The guardrail includes the action.
- The guardrail's scope matches the tags on the resource that the action targets.

Bits reads the tags from the resource in Datadog at the time of the check. As a result, guardrails depend on accurate, consistent tags on your resources.

### The strictest enforcement level applies

If more than one guardrail matches an action, the strictest enforcement level applies, in the following order: **Deny**, then **Ask**, then **Allow**.

For example, if one guardrail allows restarts for `service:search` and another guardrail requires approval for restarts in `env:prod`, a restart of `service:search` in `env:prod` requires approval.

If two or more **Ask** guardrails match the same action, an approver from any of the matching guardrails can approve it.

### Actions that no guardrail covers

If no guardrail matches an action, Bits doesn't take the action. To let Bits take an action, create a guardrail that covers it.

<!-- TODO: Confirm the default behavior and how it appears in the UI. Internal design docs differ on whether an unmatched action is shown as denied or as needing approval with no available approver. -->

### Remediation plans with more than one action

When Bits proposes a remediation plan with several actions, it evaluates each action and then applies the strictest result to the whole plan. If any action in the plan requires approval, a single approver must be able to approve every action that requires approval. If no single approver is listed for all of those actions, no one can approve the plan.

To make a multi-action plan approvable, create a guardrail that covers all of the actions in the plan and lists an approver who can approve the whole plan. See [Examples](#examples).

### Who can approve

Bits applies the same guardrails whether a person or an AI agent starts the action. Only people can approve actions. Bits and other AI agents can't approve their own actions.

## Get started with guardrails

<!-- TODO: Add procedural steps from the UI. Include required permissions (Guardrails Read and Guardrails Write) and a link to Organization Settings > Roles. -->

## Examples

The following examples show common ways to use guardrails. Team names are examples.

### Prevent an action everywhere in production

To make sure that Bits never deletes production resources, even with approval, create a **Deny** guardrail:

| Enforcement level | Actions | Scope | Approvers |
|---|---|---|---|
| Deny | Delete | `env:prod` | None |

Because **Deny** is the strictest enforcement level, no other guardrail can override it.

### Let Bits act on its own for a trusted action

After your team is comfortable with how Bits handles restarts for a service, let Bits restart it without approval:

| Enforcement level | Actions | Scope | Approvers |
|---|---|---|---|
| Allow | Restart | `service:search` | None |

This guardrail applies only as long as no stricter guardrail also matches the same restarts.

### Require different approvers for different actions

To have the on-call engineer approve scaling and the owning team approve rollbacks:

| Enforcement level | Actions | Scope | Approvers |
|---|---|---|---|
| Ask | Scale up | `service:chatbot` | `@chatbot-oncall` |
| Ask | Roll back | `service:chatbot` | `@chatbot-team` |

If Bits proposes a plan that both scales up and rolls back `service:chatbot`, no single approver covers both actions, so no one can approve the plan. To fix this, add a guardrail that covers both actions with an approver who can approve the whole plan:

| Enforcement level | Actions | Scope | Approvers |
|---|---|---|---|
| Ask | Scale up, Roll back | `service:chatbot` | `@chatbot-leads` |

### Add a standing approver for production incidents

To let your incident commanders approve remediation actions on any production resource without replacing service owners' guardrails:

| Enforcement level | Actions | Scope | Approvers |
|---|---|---|---|
| Ask | Scale up, Roll back | `env:prod` | `@incident-commanders` |

Service owners can still approve actions that their own guardrails cover, and incident commanders can approve the whole plan.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
