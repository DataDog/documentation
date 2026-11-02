---
title: Set Up Ownership Preferences
aliases:
  - /security/cloud_security_management/guide/frontier_group/ownership_preferences
further_reading:
- link: "/security/cloud_security_management/review_remediate/ownership_agent"
  tag: "Documentation"
  text: "Ownership Agent"
- link: "/security/cloud_security_management/guide/frontier_group/"
  tag: "Documentation"
  text: "Cloud Security Frontier Group"
---

## Overview

The Ownership Agent selects a subset of cloud resources with security findings and infers an owner for each one. By default, it uses cloud resource tags, Service Catalog data, and other data sources to infer ownership.

**Ownership preferences** let you customize this process with your own rules. You manage them on the [Ownership Agent settings page][1], and the Ownership Agent applies them the next time it infers owners for your resources.

There are three kinds of rules:

| Rule                    | What it does                                                         |
|-------------------------|----------------------------------------------------------------------|
| **Tag mappings**        | Use a tag on your resources to suggest an owner                      |
| **Exclusions**          | Prevent an owner from ever being suggested                           |
| **Custom instructions** | Give the Ownership Agent organization-specific context in plain text |

## Prerequisites

To add, edit, or delete ownership preferences, you need the **Security Monitoring Findings Write** permission. Without it, you can view the rules but the **Add**, **Edit**, and **Delete** actions are disabled.

## Manage ownership preferences

1. In Datadog, go to **Security** > **Settings** > **Cloud Security** > [**Ownership Agent**][1].
2. Scroll to the **Ownership preferences** section. It contains a **Tag mappings** panel, an **Exclusions** panel, and a **Custom instructions** panel.
3. To add a rule, click **Add tag mapping**, **Add exclusion**, or **Add instruction** on the matching panel, fill in the form, and click **Add**.
4. To change a rule, click the pencil icon on its row, update the form, and click **Update**.
5. To remove a rule, click the delete icon on its row and confirm. Deleting a rule cannot be undone.

Each add, edit, or delete is saved as soon as you submit it. There is no separate **Save** step for the section.

Every rule has a **Name** that identifies it. Names must be unique within each panel, and you cannot rename a rule after you create it. To rename a rule, delete it and add it again with the new name.

## Tag mappings

A tag mapping says: _"When a resource has tag `X:Y`, it belongs to this owner."_

The Ownership Agent checks cloud resource tags against your mappings. When it finds a match, it adds the specified owner as a candidate. Multiple mappings can match the same resource, producing multiple candidates that the Ownership Agent ranks alongside other data sources.

Tag mappings complement existing ownership data sources. They do not override a direct ownership tag (like `dd-team`) already present on the resource.

### Fields

| Field                     | Description                                                                                                                         |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                  | A unique name for the rule (for example, `cost-center-cc-100`)                                                                      |
| **Confidence**            | How strongly this mapping indicates ownership: **High**, **Medium**, or **Low**                                                     |
| **Tag key**               | Tag key to match (for example, `cost-center`, `project`)                                                                            |
| **Tag value** (optional)  | Tag value to match. Leave empty to match any value for that key                                                                     |
| **Owner type** (optional) | Kind of owner: **User**, **Team**, or **Service**. Selecting a type filters the owner suggestions in the **Owner** field             |
| **Owner** (optional)      | Owner to assign. Pick a suggested team, user, or service, or type a handle. Leave empty to use the resource's tag value as the owner |

### Matching behavior

- Tag key and value matching is **case-insensitive**. `Cost-Center` matches `cost-center`.
- An empty **Tag value** matches **any value** for that tag key.
- An empty **Owner** uses the matched tag value as the owner. For example, a mapping on the `squad` tag with no owner assigns a resource tagged `squad:payments` to `payments`.
- If multiple mappings match, all produce candidates. The Ownership Agent ranks them by confidence.

### Confidence levels

| Level      | When to use                                                                                               |
|------------|-----------------------------------------------------------------------------------------------------------|
| **High**   | The tag reliably identifies the owner. Example: a `cost-center` tag that maps 1:1 to a team               |
| **Medium** | The tag is a good indicator but may not always be correct. Example: a `project` tag shared across teams   |
| **Low**    | The tag provides a hint but needs corroboration. Example: an `env` tag that loosely correlates with a team |

### Examples

**Map cost centers to teams**

| Name     | Tag key       | Tag value | Owner type | Owner           | Confidence |
|----------|---------------|-----------|------------|-----------------|------------|
| `cc-100` | `cost-center` | `CC-100`  | Team       | `team-platform` | High       |
| `cc-200` | `cost-center` | `CC-200`  | Team       | `team-data-eng` | High       |
| `cc-300` | `cost-center` | `CC-300`  | Team       | `team-security` | High       |

**Map projects to owners**

| Name               | Tag key   | Tag value  | Owner type | Owner               | Confidence |
|--------------------|-----------|------------|------------|---------------------|------------|
| `project-atlas`    | `project` | `atlas`    | Team       | `team-atlas`        | Medium     |
| `project-hermes`   | `project` | `hermes`   | User       | `alice@example.com` | Medium     |
| `project-payments` | `project` | `payments` | Team       | `team-fintech`      | High       |

**Use the tag value as the owner**

| Name    | Tag key | Tag value | Owner type | Owner | Confidence |
|---------|---------|-----------|------------|-------|------------|
| `squad` | `squad` |           | Team       |       | Medium     |

This mapping matches any value of the `squad` tag and suggests that value as the owning team.

**Match any resource with a `managed-by` tag**

| Name         | Tag key      | Tag value | Owner type | Owner        | Confidence |
|--------------|--------------|-----------|------------|--------------|------------|
| `managed-by` | `managed-by` |           | Team       | `team-infra` | Low        |

This mapping matches any value of the `managed-by` tag and assigns the resource to `team-infra` with low confidence. Because the confidence is low, stronger data sources take priority.

## Exclusions

An exclusion tells the Ownership Agent, "Never suggest this owner."

Bot accounts, CI runners, and shared service accounts often appear in cloud resource metadata (for example, as the creator or last modifier). Exclusions remove these from ownership results so that only real owners surface.

### Fields

| Field                        | Description                                                                                                         |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Name**                     | A unique name for the rule (for example, `exclude-deploy-bot`)                                                      |
| **Owner type** (optional)    | Only exclude the owner for this owner type: **User**, **Team**, or **Service**. Leave empty to exclude it for any type |
| **Owner**                    | Owner to exclude from ownership suggestions (for example, `deploy-bot`, `ci-runner`)                                |
| **Resource type** (optional) | Only exclude the owner for this resource type (for example, `aws_ec2_instance`). Leave empty to exclude it for any resource type |

### Matching behavior

- The **Owner** is matched **case-insensitively**.
- Optional fields use **AND** logic. All non-empty fields must match for the exclusion to apply.
- Leave **Owner type** and **Resource type** empty to exclude the owner from all results (most common).

### Examples

**Exclude common bot accounts from all results**

| Name                          | Owner type | Owner                  | Resource type |
|-------------------------------|------------|------------------------|---------------|
| `exclude-deploy-bot`          | Any        | `deploy-bot`           | Any           |
| `exclude-ci-runner`           | Any        | `ci-runner`            | Any           |
| `exclude-github-actions`      | Any        | `github-actions`       | Any           |
| `exclude-terraform-automation`| Any        | `terraform-automation` | Any           |

**Exclude a service account only for specific resource types**

| Name                  | Owner type | Owner                 | Resource type      |
|-----------------------|------------|-----------------------|--------------------|
| `exclude-node-ctrl`   | Service    | `k8s-node-controller` | `aws_ec2_instance` |
| `exclude-autoscaler`  | Service    | `autoscaler-svc`      | `aws_ec2_instance` |

These exclusions only apply to EC2 instances. The same owners are still eligible for other resource types.

**Exclude a team for a specific resource type**

| Name                 | Owner type | Owner        | Resource type      |
|----------------------|------------|--------------|--------------------|
| `exclude-legacy-ops` | Team       | `legacy-ops` | `aws_ec2_instance` |

This excludes `legacy-ops` only when it appears as a team candidate for EC2 instances. It is still considered for S3 buckets or other resource types.

## Custom instructions

Custom instructions provide free-form guidance to the Ownership Agent. Use them for organizational context that you can't express as a tag mapping or exclusion. For example, describe naming conventions, team structures, or which data sources to prioritize.

You can add up to **three** custom instructions.

### Fields

| Field                   | Description                                                                                                                          |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                | A unique name for the instruction (for example, `cost-center-convention`)                                                            |
| **Priority** (optional) | Order in which the Ownership Agent reads instructions, from **High** to **Low**. Instructions without a priority come last. The agent uses every instruction |
| **Instruction**         | Your guidance text, up to 4,000 characters                                                                                           |

### Tips for writing effective instructions

- Be specific and actionable. "The `cost-center` tag is the most reliable ownership signal" is better than "Use tags."
- Explain your organization's conventions, such as team naming patterns or how to interpret specific tags.
- Use plain, declarative sentences that describe facts about your organization.
- Avoid formatting. Markdown headings and HTML or XML tags are stripped during processing.
- Call out accounts that should not be owners, and also add them as [exclusions](#exclusions) for enforcement.

### Example: organization-specific context split by priority

| Name                     | Priority | Instruction                                                                                                                                                                                                                  |
|--------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cost-center-convention` | High     | Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (for example, team-platform). |
| `automation-accounts`    | Medium   | Shared infrastructure accounts (deploy-bot, ci-runner, github-actions, terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead. |
| `container-images`       | Low      | For container images, the repository owner in the company GitHub organization is a reliable secondary signal when cost-center tags are missing.                                                                                    |

## Validation rules

The settings page checks each rule before saving it and shows any problem next to the field. Datadog also validates the full set of preferences on every save. If a save is rejected, the page shows the reason and the rule it applies to.

### Allowed characters

| Field                                                         | Allowed characters                                                                       |
|---------------------------------------------------------------|------------------------------------------------------------------------------------------|
| **Name**                                                      | Letters, digits, and `-` `_` `.` `:` `@`                                                 |
| **Tag key**, **Owner**, **Owner type**, **Resource type**     | Letters, digits, and `-` `_` `.` `:` `/` `@`                                             |
| **Tag value**                                                 | Letters, digits, spaces, and `-` `_` `.` `:` `/` `@`                                     |
| **Instruction**                                               | Letters, digits, spaces, line breaks, and `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` |

Non-ASCII characters, such as accented letters, emoji, and typographic (curly) quotes, are not allowed in any field. A leading `@` on an owner is removed when you save the rule.

### Size limits

| Limit                          | Value            |
|--------------------------------|------------------|
| Maximum tag mappings           | 50               |
| Maximum exclusions             | 20               |
| Maximum custom instructions    | 3                |
| Maximum length per field       | 1,024 characters |
| Maximum length per instruction | 4,000 characters |

When a panel reaches its limit, its **Add** button is disabled.

### Conflicting rules

The settings page rejects a rule that conflicts with an existing one. Comparisons are case-insensitive.

- **Tag mappings**: Two mappings with the same tag key and tag value but a different owner conflict. Two mappings with the same tag key, tag value, and owner but a different confidence also conflict. A mapping identical to an existing one is rejected as a duplicate.
- **Exclusions**: Two exclusions with the same owner, owner type, and resource type are duplicates.

### Phrases that are not allowed

Custom instructions, and other fields the Ownership Agent reads as text, cannot contain phrases that try to change the agent's behavior, such as "ignore previous instructions", "you are now", "act as", or "reveal your system prompt". Rephrase the text as a description of your organization.

## When preferences take effect

1. You add, edit, or delete a rule on the settings page.
2. Datadog validates and saves the full set of preferences, and the Ownership Agent picks up the new rules automatically.
3. On the next ownership inference run for each resource:
   - **Tag mappings** add ownership candidates based on your tag rules.
   - **Exclusions** remove unwanted owners from results.
   - **Custom instructions** guide the Ownership Agent.
4. Updated results appear in the Cloud Security side panel for each finding.

Saved rules don't change existing ownership suggestions right away. Each resource keeps its current suggestion until its next inference run.

## Troubleshooting

| Problem                                                          | Likely cause                                   | Fix                                                                                                                                                       |
|------------------------------------------------------------------|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Add**, **Edit**, and **Delete** are disabled                   | Missing permission                             | Ask an administrator for the **Security Monitoring Findings Write** permission                                                                            |
| "These preferences were changed by someone else"                 | Another user saved a change first              | Click **Reload** to get the latest rules, then submit your change again. If the message appears in a form, the values you entered are kept               |
| A rule shows a warning icon, and saves fail                      | A stored rule doesn't meet the validation rules | Hover over the icon to see the problem, then edit or delete the rule. If the problem is with the name, delete the rule and add it again                  |
| Save rejected for a conflict                                     | The rule conflicts with an existing rule       | See [Conflicting rules](#conflicting-rules). Edit the existing rule instead of adding a new one                                                           |
| Save rejected for the instruction text                           | The text contains a phrase that is not allowed | See [Phrases that are not allowed](#phrases-that-are-not-allowed)                                                                                         |
| Tag mapping not matching a resource                              | Spelling mismatch                              | Matching is case-insensitive, but verify the exact tag key and value on your resource                                                                     |
| Exclusion not applied                                            | Optional fields too narrow                     | All non-empty fields must match (AND logic). Leave **Owner type** and **Resource type** empty for broad exclusions                                        |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/ownership-agent
