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

The Ownership Agent processes the following cloud resource types:


| Resource type                     | Cloud provider                    |
| --------------------------------- | --------------------------------- |
| `aws_cloudformation_stack`        | AWS                               |
| `aws_cloudfront_distribution`     | AWS                               |
| `aws_cognito_user_pool`           | AWS                               |
| `aws_dynamodb`                    | AWS                               |
| `aws_ec2_instance`                | AWS                               |
| `aws_ec2_settings`                | AWS                               |
| `aws_ecr_repository`              | AWS                               |
| `aws_ecs_cluster`                 | AWS                               |
| `aws_ecs_service`                 | AWS                               |
| `aws_elbv2_load_balancer`         | AWS                               |
| `aws_iam_account`                 | AWS                               |
| `aws_iam_policy`                  | AWS                               |
| `aws_iam_role`                    | AWS                               |
| `aws_iam_role_inline_policy`      | AWS                               |
| `aws_iam_user`                    | AWS                               |
| `aws_lambda_function`             | AWS                               |
| `aws_rds_cluster`                 | AWS                               |
| `aws_rds_instance`                | AWS                               |
| `aws_s3_bucket`                   | AWS                               |
| `aws_secretsmanager_secret`       | AWS                               |
| `aws_security_group`              | AWS                               |
| `aws_subnet`                      | AWS                               |
| `aws_vpc`                         | AWS                               |
| `azure_virtual_machine_instance`  | Azure                             |
| `gcp_compute_instance`            | GCP                               |
| `host`                            | AWS, Azure, GCP                   |
| `host_image`                      | AWS, Azure, GCP                   |
| `image` (container)               | Docker, ECR, and other registries |


## Review and correct ownership

### View a suggestion

When you open a finding in the [Misconfigurations Explorer](https://app.datadoghq.com/security/compliance) or Vulnerabilities Explorer,  the side panel displays the suggested owner under **Ownership**. Each suggestion includes:

- The suggested owner handle and type (team, user, or service)
- A confidence score (high, medium, or low)
- A one- to two-sentence explanation of why the agent chose that owner
- The evidence signals that contributed to the result

### Edit suggestion

By clicking the "edit owner" pencil icon next to a suggested owner, you can update the finding with the correct owner.

### Feedback

You can provide richer feedback by clicking the "thumbs down" after hovering over the confidence score, including specifying incorrectness of incompletness of the explanation.


| Action          | What it does                                                                           |
| --------------- | -------------------------------------------------------------------------------------- |
| **Thumbs up**   | Marks the suggestion as accurate. The positive signal is recorded for future tuning.   |
| **Thumbs down** | Marks the suggestion as inaccurate. The negative signal is recorded for future tuning. |
| **Add details** | The correction is recorded for future tuning.                                          |


### Impact on evaluation

Corrections and feedback are vital for tuning the agent to correctly infer ownership in future, and affect how the Ownership Agent behaves for that resource going forward.

## Automatic team assignment

By default, high-confidence ownership inferences are applied to the `team` tag on Cloud Security findings. This makes inferred owners available in platform features, through the MCP server, and in automatic notification routing.

To adjust the confidence threshold, or to turn off automatic team assignment entirely, use the [ownership settings page](https://app.datadoghq.com/security/configuration/csm/ownership-agent).

## Query ownership in the explorer

You can filter findings by inferred owner in the [Misconfigurations Explorer](https://app.datadoghq.com/security/compliance) or Vulnerabilities Explorer using the following facets:


| Facet                     | Description                                     | Example                                               |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `Ownership > Owner`       | The suggested or persisted owner handle         | `@_dd.ownership.inference.owner_handle:team-platform` |
| `Ownership > Owner type`  | The type of owner: `team`, `service`, or `user` | `@_dd.ownership.inference.owner_type:team`            |
| `Ownership > Confidence`  | The numeric confidence score (0 to 1)           | `@_dd.ownership.inference.confidence:>0.8`            |
| `Ownership > Explanation` | The explanation for the inference               | `@_dd.ownership.inference.explanation:*tag`*          |


**Example queries**

To find all findings owned by a specific team:

```
@_dd.ownership.inference.owner_handle:team-platform
```

To find high-confidence suggestions that have not yet been reviewed:

```
@_dd.ownership.inference.confidence:>0.85
```

To find findings attributed to specific users:

```
@_dd.ownership.inference.owner_type:user
```

Ownership facets can be combined with any other explorer filter, such as resource type, cloud account, or rule severity.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
