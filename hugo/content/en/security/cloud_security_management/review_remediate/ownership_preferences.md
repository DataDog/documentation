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
description: "Customize the Ownership Agent with tag mappings, exclusions, and custom instructions on the Ownership Agent settings page."
---

## Overview

The Ownership Agent infers an owner for cloud resources with security findings, using cloud resource tags, Software Catalog data, and other data sources. **Ownership preferences** let you customize this process with three kinds of rules:

- **Tag mappings** use a tag on your resources to suggest an owner.
- **Exclusions** prevent an owner from ever being suggested.
- **Custom instructions** give the Ownership Agent organization-specific context in plain text.

{{< img src="security/csm/ownership_preferences.png" alt="The Ownership preferences section of the Ownership Agent settings page, with the Tag mappings, Exclusions, and Custom instructions panels." width="100%">}}

## Manage ownership preferences

To add, edit, or delete preferences, you need the **Security Monitoring Findings Write** permission.

1. In Datadog, go to **Security** > **Settings** > **Cloud Security** > [**Ownership Agent**][1].
2. In the **Ownership preferences** section, click **Add Tag Mapping**, **Add Exclusion**, or **Add Instruction**.
3. Fill in the form and click **Add**.

Every rule needs a **Name** that is unique within its panel. You cannot rename a rule after you create it. To rename a rule, delete it and add it again.

The Ownership Agent picks up saved rules automatically. Each resource keeps its current ownership suggestion until its next inference run.

## Tag mappings

A tag mapping assigns an owner to resources that have a specific tag. When a resource's tag matches a mapping, the Ownership Agent adds the owner as a candidate and ranks it alongside other data sources. Tag mappings don't override a direct ownership tag (such as `dd-team`) already on the resource.

You can add up to 50 tag mappings.

| Field                     | Description                                                                                                                          |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Confidence**            | How strongly this mapping indicates ownership: **High**, **Medium**, or **Low**                                                      |
| **Tag key**               | Tag key to match (for example, `cost-center`)                                                                                        |
| **Tag value** (optional)  | Tag value to match. Leave empty to match any value for that key                                                                      |
| **Owner type** (optional) | **User**, **Team**, or **Service**. Selecting a type filters the suggestions in the **Owner** field                                  |
| **Owner** (optional)      | Owner to assign. Pick a suggested team, user, or service, or type a handle. Leave empty to use the resource's tag value as the owner |

Tag keys and values match case-insensitively. If several mappings match a resource, each one adds a candidate.

| Confidence | When to use                                                                                               |
|------------|-----------------------------------------------------------------------------------------------------------|
| **High**   | The tag reliably identifies the owner. Example: a `cost-center` tag that maps 1:1 to a team               |
| **Medium** | The tag is a good indicator but may not always be correct. Example: a `project` tag shared across teams   |
| **Low**    | The tag provides a hint but needs corroboration. Example: an `env` tag that loosely correlates with a team |

For example, the following mappings assign resources by cost center, and use the value of any `squad` tag as the owning team:

| Name     | Tag key       | Tag value | Owner type | Owner           | Confidence |
|----------|---------------|-----------|------------|-----------------|------------|
| `cc-100` | `cost-center` | `CC-100`  | Team       | `team-platform` | High       |
| `squad`  | `squad`       |           | Team       |                 | Medium     |

With these rules, a resource tagged `squad:payments` gets `payments` as a team candidate.

## Exclusions

An exclusion prevents the Ownership Agent from suggesting a specific owner. Use exclusions for bot accounts, CI runners, and shared service accounts that appear in cloud resource metadata but don't own the resource.

You can add up to 20 exclusions.

| Field                        | Description                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Owner type** (optional)    | Exclude only the owner for this type: **User**, **Team**, or **Service**. Leave empty to exclude it for any type |
| **Owner**                    | Owner to exclude (for example, `deploy-bot`). Matched case-insensitively                                      |
| **Resource type** (optional) | Exclude only the owner for this resource type (for example, `aws_ec2_instance`). Leave empty for any type     |

When you set both optional fields, the exclusion applies only when both match. The settings page shows empty optional fields as **Any**. For example:

| Name                 | Owner type | Owner        | Resource type      |
|----------------------|------------|--------------|--------------------|
| `exclude-deploy-bot` | Any        | `deploy-bot` | Any                |
| `exclude-legacy-ops` | Team       | `legacy-ops` | `aws_ec2_instance` |

The first rule removes `deploy-bot` from all results. The second removes the `legacy-ops` team only for EC2 instances.

## Custom instructions

Custom instructions give the Ownership Agent context that you can't express as a tag mapping or exclusion. For example, describe naming conventions or which data sources to trust most.

You can add up to three instructions of up to 4,000 characters each. Set an optional **Priority** (**High**, **Medium**, or **Low**) to control the order in which the agent reads them. Instructions without a priority come last, and every instruction is used.

When you write instructions:

- Be specific. "The `cost-center` tag is the most reliable ownership signal" is better than "Use tags."
- Use plain sentences that describe your organization. Markdown headings and HTML or XML tags are stripped.
- Don't include phrases that try to change the agent's behavior, such as "ignore previous instructions" or "act as". Datadog rejects them.
- Also add accounts that should never be owners as [exclusions](#exclusions).

For example:

| Name                     | Priority | Instruction                                                                                                                                       |
|--------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `cost-center-convention` | High     | Ownership is assigned by cost center. Team identifiers always start with `team-` (for example, `team-platform`). |

## Ownership preference validation rules

The settings page checks each rule before saving it and shows any problem next to the field.

- Fields accept only the characters listed in the following table. Accented letters, emoji, and typographic (curly) quotes are not allowed.
- Fields are limited to 1,024 characters, and instructions to 4,000 characters.
- Two tag mappings with the same tag key and value must have the same owner and confidence. Exact duplicates are not allowed.
- An exclusion can't duplicate another exclusion with the same owner, owner type, and resource type.

| Field                                                                   | Allowed characters                                                                                             |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Name**                                                                | Letters, digits, and `-` `_` `.` `:` `@`                                                                       |
| **Tag key**, **Owner**, **Owner type**, **Resource type**, **Priority** | Letters, digits, and `-` `_` `.` `:` `/` `@`                                                                   |
| **Tag value**                                                           | Letters, digits, spaces, and `-` `_` `.` `:` `/` `@`                                                           |
| **Instruction**                                                         | Letters, digits, spaces, line breaks, and `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` |

## Troubleshoot ownership preferences

| Problem                                    | Fix                                                                                                                        |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| A rule shows a warning icon and saving fails | Hover over the icon to see the problem, then edit the rule. If the problem is with the name, delete the rule and add it again |
| A tag mapping doesn't match a resource     | Check the exact tag key and value on the resource                                                                          |
| An exclusion isn't applied                 | Leave **Owner type** and **Resource type** empty unless you need to narrow the exclusion                                   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/ownership-agent
