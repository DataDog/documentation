---
title: Ownership Agent
aliases:
  - /security/cloud_security_management/guide/frontier_group/ownership_agent
further_reading:
- link: "/security/cloud_security_management/review_remediate/ownership_preferences"
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

The Ownership Agent analyzes cloud resources that have security findings and infers who is responsible for each one. For every resource, it produces a suggested owner—a team, service, or individual—along with a confidence score, a short explanation, and a list of the evidence signals it used.

Ownership suggestions appear in the Cloud Security side panel when you view a misconfiguration or finding. You can edit each suggestion with the correct team/service/individual, which additionally improves future inference results.

## Data sources

The Ownership Agent reads multiple data sources and combines them into a ranked evidence set. It evaluates data sources in priority order: stronger, more explicit signals override weaker or inferred ones.

| Priority | Signal                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | **Owner tags**                 | Cloud resource tags with keys such as `owner`, `dd-team`, or `team`. An explicit ownership tag is the strongest signal.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2        | **Ownership preferences**      | Custom tag mappings and rules you define in a [reference table](/reference_tables). These act as organization-level overrides and are evaluated alongside direct tags. Learn more at [set up ownership preferences](/security/cloud_security_management/review_remediate/ownership_preferences/). |
| 3        | **Service Catalog**            | Team ownership data from the Datadog Service Catalog, matched against the resource's service, application, or component tags.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 4        | **Cloud audit logs**           | The identity of the user or principal that created the resource, extracted from cloud provider audit logs (for example, AWS CloudTrail). Automation accounts and CI principals are filtered out.                                                                                                                                                                                                                                                                                                                                                                                   |
| 5        | **Container and host catalog** | Registry and host metadata for container images and host VMs, including image labels and host annotations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 6        | **Naming patterns**            | Heuristics that infer ownership from resource names, service identifiers, or tag values that match known team naming conventions.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Supported resource types

The Ownership Agent processes the following resource types:

- **AWS**: `aws_cloudformation_stack`, `aws_cloudfront_distribution`, `aws_cognito_user_pool`, `aws_dynamodb`, `aws_ec2_instance`, `aws_ec2_settings`, `aws_ecr_repository`, `aws_ecs_cluster`, `aws_ecs_service`, `aws_elbv2_load_balancer`, `aws_iam_account`, `aws_iam_policy`, `aws_iam_role`, `aws_iam_role_inline_policy`, `aws_iam_user`, `aws_lambda_function`, `aws_rds_cluster`, `aws_rds_instance`, `aws_s3_bucket`, `aws_secretsmanager_secret`, `aws_security_group`, `aws_subnet`, `aws_vpc`
- **Azure**: `azure_virtual_machine_instance`
- **GCP**: `gcp_compute_instance`
- **AWS, Azure, GCP**: `host`, `host_image`
- **Container registries** (Docker, ECR, and others): `image`

## Review and correct ownership

### View a suggestion

When you open a finding in the [Misconfigurations Explorer](https://app.datadoghq.com/security/compliance) or Vulnerabilities Explorer, the side panel displays the suggested owner under **Ownership**. Each suggestion includes:

- The suggested owner handle and type (team, user, or service)
- A confidence score (high, medium, or low)
- A one- to two-sentence explanation of why the agent chose that owner
- The evidence signals that contributed to the result

### Edit suggestion

By clicking the "edit owner" pencil icon next to a suggested owner, you can update the finding with the correct owner.

### Feedback

You can provide richer feedback by clicking the "thumbs down" after hovering over the confidence score, including specifying incorrectness or incompleteness of the explanation.

| Action          | What it does                                                                           |
| --------------- | -------------------------------------------------------------------------------------- |
| **Thumbs up**   | Marks the suggestion as accurate. The positive signal is recorded for future tuning.   |
| **Thumbs down** | Marks the suggestion as inaccurate. The negative signal is recorded for future tuning. |
| **Add details** | The correction is recorded for future tuning.                                          |

### Impact on evaluation

Corrections and feedback are vital for tuning the agent. They also affect how the Ownership Agent behaves for that resource going forward.

## Automatic team assignment

By default, high-confidence ownership inferences are applied to the `team` tag on Cloud Security findings. Inferred owners then become available in other Datadog features, including the [Datadog MCP server](/mcp_server/) and automatic notification routing.

To adjust the confidence threshold or turn off automatic team assignment, use the [ownership settings page](https://app.datadoghq.com/security/configuration/csm/ownership-agent).

## Query ownership in the explorer

You can filter findings by inferred owner in the [Misconfigurations Explorer](https://app.datadoghq.com/security/compliance) or Vulnerabilities Explorer using the following facets:

| Facet                     | Description                                     | Example                                               |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `Ownership > Owner`       | The suggested or persisted owner handle         | `@_dd.ownership.inference.owner_handle:team-platform` |
| `Ownership > Owner type`  | The type of owner: `team`, `service`, or `user` | `@_dd.ownership.inference.owner_type:team`            |
| `Ownership > Confidence`  | The numeric confidence score (0 to 1):<br>&bull; high: &ge;0.85<br>&bull; medium: &ge;0.60 and &lt;0.85<br>&bull; low: &lt;0.60 | `@_dd.ownership.inference.confidence:>=0.85`          |
| `Ownership > Explanation` | The explanation for the inference               | `@_dd.ownership.inference.explanation:*tag*`          |

**Example queries**

To find all findings owned by a specific team:

```
@_dd.ownership.inference.owner_handle:team-platform
```

To find high-confidence suggestions:

```
@_dd.ownership.inference.confidence:>=0.85
```

To find findings attributed to specific users:

```
@_dd.ownership.inference.owner_type:user
```

Ownership facets can be combined with any other explorer filter, such as resource type, cloud account, or rule severity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
