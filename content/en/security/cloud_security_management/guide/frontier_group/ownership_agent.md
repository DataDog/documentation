---
title: Ownership Agent
further_reading:
- link: "/security/cloud_security_management/guide/frontier_group/ownership_preferences"
  tag: "Documentation"
  text: "Set Up Ownership Preferences"
- link: "/security/cloud_security_management/guide/frontier_group"
  tag: "Documentation"
  text: "Cloud Security Frontier Group"
- link: "/security/cloud_security_management/misconfigurations"
  tag: "Documentation"
  text: "Cloud Security Misconfigurations"
---

## Overview

The Ownership Agent analyzes cloud resources that have security findings and infers who is responsible for each one. For every resource, it produces a suggested owner—a team or individual—along with a confidence score, a short explanation, and a list of the evidence signals it used.

Ownership suggestions appear in the Cloud Security side panel when you view a misconfiguration or finding. You can confirm, reject, or correct each suggestion, and your feedback improves future inference results.

## Data sources

The Ownership Agent reads multiple data sources and combines them into a ranked evidence set. It evaluates data sources in priority order: stronger, more explicit signals override weaker or inferred ones.

| Priority | Signal | Description |
| --- | --- | --- |
| 1 | **Owner tags** | Cloud resource tags with keys such as `owner`, `dd-team`, or `team`. An explicit ownership tag is the strongest signal. |
| 2 | **Ownership preferences** | Custom tag mappings and rules you define in a [reference table][1]. These act as organization-level overrides and are evaluated alongside direct tags. |
| 3 | **Service Catalog** | Team ownership data from the Datadog Service Catalog, matched against the resource's service, application, or component tags. |
| 4 | **Cloud audit logs** | The identity of the user or principal that created the resource, extracted from cloud provider audit logs (for example, AWS CloudTrail). Automation accounts and CI principals are filtered out. |
| 5 | **IaC last committer** | The most recent human author to commit infrastructure-as-code that provisioned or modified the resource, when available from source metadata. |
| 6 | **Container and host catalog** | Registry and host metadata for container images and host VMs, including image labels and host annotations. |
| 7 | **Naming patterns** | Heuristics that infer ownership from resource names, service identifiers, or tag values that match known team naming conventions. |

When deterministic signals are strong enough, the Ownership Agent resolves ownership without using AI. For ambiguous cases—where signals conflict or are missing—the agent uses an AI model to synthesize a suggestion from the available evidence. The AI model is governed by a per-organization token budget and falls back to heuristic output if the budget is exhausted.

## Supported resource types

The Ownership Agent processes the following cloud resource types:

| Resource type | Cloud provider |
| --- | --- |
| `aws_ec2_instance` | AWS |
| `aws_s3_bucket` | AWS |
| `host` | AWS, Azure, GCP |
| `host_image` | AWS, Azure, GCP |
| `image` (container) | Docker, ECR, and other registries |

The agent runs on a 2-hour cadence for resource evidence and a 24-hour cadence for team data. Coverage is limited to resources with at least one active security finding.

## Review and correct ownership

### View a suggestion

When you open a finding in the [Misconfigurations Explorer][2], the side panel displays the suggested owner under **Ownership**. Each suggestion includes:

- The suggested owner handle and type (team, user, or service)
- A confidence score from 0 to 1
- A one- to two-sentence explanation of why the agent chose that owner
- The evidence signals that contributed to the result

### Confirm, reject, or correct

You can respond to any suggestion directly in the side panel:

| Action | What it does |
| --- | --- |
| **Confirm** | Marks the suggestion as accurate. The suggestion remains in _suggested_ status and the positive signal is recorded for future tuning. |
| **Reject** | Marks the suggestion as inaccurate. The suggestion remains in _suggested_ status and the negative signal is recorded for future tuning. |
| **Correct** | Replaces the suggested owner with the owner you specify. The status transitions to _overridden_ and the correction is stored in the audit history. |

### Persist ownership

A suggestion is non-authoritative by default. To lock in an owner for downstream workflows and assignment:

- Click **Persist** to explicitly save the current suggestion. The status transitions to _persisted_.
- Your organization can opt in to automatic persistence when confidence is at or above 0.85. Contact [Datadog Support][3] to enable this option.

Persisted ownership is used for routing, assignment, and reporting. Overridden ownership (from a manual correction) is treated the same as persisted.

### Impact on evaluation

Corrections and persistence affect how the Ownership Agent behaves for that resource going forward:

- **Overridden** resources retain your correction across re-evaluation cycles. If evidence changes significantly, the agent flags the discrepancy but does not automatically overwrite your correction.
- **Persisted** resources are re-evaluated when the underlying evidence changes (for example, if a resource's tags change). You are notified if the new inference differs from the persisted value.
- **Confirmed and rejected** signals accumulate as training feedback. They are used to tune heuristic weights and improve the accuracy of future suggestions, but do not change the current suggestion's status.

## Query ownership in the explorer

You can filter findings by inferred owner in the [Misconfigurations Explorer][2] using the following facets:

| Facet | Description | Example |
| --- | --- | --- |
| `Ownership > Owner` | The suggested or persisted owner handle | `@ownership.owner_handle:team-platform` |
| `Ownership > Owner type` | The type of owner: `team`, `user`, or `service` | `@ownership.owner_type:team` |
| `Ownership > Status` | The lifecycle status of the suggestion | `@ownership.status:persisted` |
| `Ownership > Confidence` | The numeric confidence score (0 to 1) | `@ownership.confidence:>0.8` |

**Example queries**

To find all findings owned by a specific team:

```
@ownership.owner_handle:team-platform
```

To find high-confidence suggestions that have not yet been reviewed:

```
@ownership.status:suggested @ownership.confidence:>0.85
```

To find findings with a manually corrected owner:

```
@ownership.status:overridden
```

Ownership facets can be combined with any other explorer filter, such as resource type, cloud account, or rule severity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/guide/frontier_group/ownership_preferences/
[2]: https://app.datadoghq.com/security/compliance
[3]: /help/
