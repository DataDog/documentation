---
title: Bits Autonomous Operations
description: "Assign ongoing operational work to Bits so it can detect, investigate, and remediate issues in a single operational loop."
further_reading:
- link: "/bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/bits_ai/bits_detection/"
  tag: "Documentation"
  text: "Bits Detection"
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Bits Investigation"
- link: "/bits_ai/bits_remediation/"
  tag: "Documentation"
  text: "Bits Remediation"
---

<!-- DRAFT: Working outline for DOCS-16325. -->

## Overview

Bits Autonomous Operations (Autonomous Ops) allows you to assign ongoing operational work to Bits.

It combines [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3] in a single operational loop.

With Autonomous Operations, Bits watches the system resources, monitor alerts, or Slack channels that you specify, and automatically detects and triages any issues.

Bits then investigates critical alerts, and proposes a fix for the issue within the guardrails you set. After you approve the fix, Bits verifies that the issue is resolved.

## Requirements

<!-- TODO: Document requirements, such as supported environments, instrumentation, and availability. -->

## Prerequisites

<!-- TODO: Document prerequisites, such as permissions, integrations, and settings to configure before you create Autonomous Operations. -->

## Create scopes for Autonomous Operations

<!-- TODO: Document how to create Autonomous Operations, including how to choose the system resources, monitor alerts, or Slack channels that Bits watches. -->

You configure Bits Autonomous Operations by creating different scopes. Bits will detect, triage, and investigate health and performance issues for each scope that you create. In each scope, you define what Bits watches, choose what Bits is allowed to do, and provide guidance to Bits on how to operate.

To create a scope from the Datadog UI:

1. Go to Bits AI > Autonomous Ops and click Enable a DevOps scope
1. For Choose where Bits should work, select an option to have Bits watch system resources, monitor alerts, or a Slack channel. Depending on the option you choose, complete the fields provided.
1. For Choose what Bits should do for you, leave both options select to allow Bits to automatically detect, triage, investigate, and remediate issues within the scope defined. Alternatively, disable Investigate to disallow Bits from investigating and proposing remediations for issues. Note: Define [guardrails](https://app.datadoghq.com/bits/settings/guardrails) to limit what Bits can do and has access to as part of remediations.
1. (Slack only) For Give Bits guidance on how to operate, provide a natural language description of what alerts are most impactful and important to you. Click Add a Runbook step to add additional guidance.
1. Name the scope.
1. Click Create Scope.

## Manage scopes



## Review and approve activity

<!-- TODO: Document how to review what Bits detected and investigated, and how to approve proposed fixes. -->

To review and approve Bits Autonomous Operations activity:

1. Go to Bits AI > Autonomous Ops > Activity.
1. On the Needs review tab, select the card for the activity that you want to review.
1. In the workflow view, review the hypothesis, conclusion, and next steps from Bits. Use the thumbs-up or thumbs-down buttons to provide feedback to Bits.
1. For each proposed next step, either approve the fix or follow the steps provided to resolve the issue.
1. Click Verify resolution.

## Improve Autonomous Operations

Bits self-improves investigations through Bits Memories. For more information, see **MEMORIES SECTION**

You can also improve Bits Autonomous Operations by:
- Updating `Bits.md`. Use the snippets provided in the UI for suggestions.
- Create or update skills in the Skill Library for Bits to use during any phase of the operations loop
- Providing thumbs-up or thumbs-down feedback in the Conclusion of an investigation

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_remediation/
