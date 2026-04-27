---
title: Setting Up Ownership Preferences
further_reading:
- link: "/security/cloud_security_management/guide/frontier_group/"
  tag: "Documentation"
  text: "Cloud Security Frontier Group"
- link: "/integrations/guide/reference-tables/"
  tag: "Documentation"
  text: "Reference Tables"
---

## Overview

The Ownership Agent selects a subset of cloud resources with security findings and infers an owner for each one. By default, it uses cloud resource tags, service catalog data, and other data sources to infer ownership.

**Ownership preferences** let you customize this process by providing your own rules. You store them in a Datadog [reference table][1], and the Ownership Agent reads them automatically to enhance its results.

## Create an ownership preference file

1. Create a CSV file following the format described below. Optionally, use the [Ownership Agent AI skill][5] with your AI coding assistant to generate the CSV interactively.
2. [Upload](#upload-your-ownership-preferences) it as a reference table named `k9_ownership_preferences`. Preferences take effect within 24 hours.

### Preference types

Each row in your reference table is one preference. The `preference_type` column determines what the row does.

| Type          | What it does                                                   |
|---------------|----------------------------------------------------------------|
| `tag_mapping` | When a resource has a matching tag, assign the specified owner |
| `exclusion`   | Prevent a specific handle from ever being assigned as owner    |
| `prompt_text` | Provide custom guidance to the AI inference engine             |

### Tag mappings

A tag mapping says: _"When a resource has tag `X:Y`, it belongs to this owner."_

The Ownership Agent checks cloud resource tags against your mappings. When it finds a match, it adds the specified owner as a candidate. Multiple mappings can match the same resource, producing multiple candidates that the Ownership Agent ranks alongside other data sources.

Tag mappings complement existing ownership data sources. They do not override a direct ownership tag (like `dd-team`) already present on the resource.

#### Columns

| Column                 | Description                                                                |
|------------------------|----------------------------------------------------------------------------|
| `preference_type`      | Must be `tag_mapping`                                                      |
| `tag_key`              | Tag key to match (for example, `cost-center`, `project`)                   |
| `tag_value` (optional) | Tag value to match. Leave empty to match any value for that key (wildcard) |
| `owner`                | Owner to assign (for example, `team-platform`, `alice@example.com`)        |
| `owner_type`           | Type of owner: `team`, `user`, or `service`                                |
| `confidence`           | How strongly this mapping indicates ownership: `high`, `medium`, or `low`  |

#### Owner type

The `owner_type` field tells the Ownership Agent what kind of entity the owner is. This helps the AI engine make better decisions when ranking candidates.

| Value | When to use |
| --- | --- |
| `team` | The owner is a team handle (for example, `team-platform`, `sre-team`) |
| `user` | The owner is an individual (for example, `alice@example.com`) |
| `service` | The owner is a service or automation account (for example, `payment-svc`) |

#### Matching behavior

- Tag key and value matching is **case-insensitive**. `Cost-Center` matches `cost-center`.
- An empty `tag_value` matches **any value** for that tag key (wildcard).
- If multiple mappings match, all produce candidates. The Ownership Agent ranks them by confidence.

#### Confidence levels

| Level | When to use |
| --- | --- |
| `high` | The tag reliably identifies the owner. Example: a `cost-center` tag that maps 1:1 to a team |
| `medium` | The tag is a good indicator but may not always be correct. Example: a `project` tag shared across teams |
| `low` | The tag provides a hint but needs corroboration. Example: an `env` tag that loosely correlates with a team |

#### Example: Map cost centers to teams

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

#### Example: Map projects to owners

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
2,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
3,tag_mapping,project,payments,team-fintech,team,high,,,,,
```

#### Example: Wildcard match any resource with a `managed-by` tag

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,managed-by,,team-infra,team,low,,,,,
```

This matches any value of the `managed-by` tag and assigns it to `team-infra` with low confidence. Because the confidence is low, stronger data sources take priority.

### Exclusions

An exclusion tells the Ownership Agent, "Never assign this handle as a resource owner."

Bot accounts, CI runners, and shared service accounts often appear in cloud resource metadata (for example, as the creator or last modifier). Exclusions remove these from ownership results so they only surface real owners.

#### Columns

| Column                               | Description                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `preference_type`                    | Must be `exclusion`                                                                                                          |
| `handle`                             | Owner handle to exclude (for example, `deploy-bot`, `ci-runner`)                                                             |
| `exclusion_type` (optional)          | Limit exclusion to a specific owner type: `team`, `user`, or `service`. Leave empty to exclude for all exclusion types       |
| `exclusion_resource_type` (optional) | Limit exclusion to a specific resource type (for example, `aws_ec2_instance`). Leave empty to exclude for all resource types |

#### Matching behavior

- The `handle` is matched **case-insensitively**.
- Optional filters use **AND** logic. All non-empty fields must match for the exclusion to apply.
- Leave `exclusion_type` and `exclusion_resource_type` empty to exclude the handle from all results (most common).

#### Example: Exclude common bot accounts from all results

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,deploy-bot,,,,
2,exclusion,,,,,,ci-runner,,,,
3,exclusion,,,,,,github-actions,,,,
4,exclusion,,,,,,terraform-automation,,,,
```

#### Example: Exclude a service account only for specific resource types

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
2,exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

These exclusions only apply to EC2 instances. The same handles are still eligible as owners for other resource types.

#### Example: Exclude a team handle for a specific resource type

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

This excludes `legacy-ops` only when it appears as a team candidate for EC2 instances. It is still considered for S3 buckets or other resource types.

### Custom prompt text

Custom prompt text provides free-form guidance to the AI inference engine. Use it to share organizational context that helps the AI make better ownership decisions, such as naming conventions, team structures, or which data sources to prioritize.

You can provide up to **three** prompt text entries, one for each priority level (`high`, `medium`, `low`). Entries with the same priority are concatenated. Use priority to control which guidance the AI engine considers first.

#### Columns

| Column                | Description                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `preference_type`     | Must be `prompt_text`                                                                             |
| `prompt_text`         | Your guidance text (up to 4,096 bytes per entry)                                                  |
| `priority` (optional) | Controls ordering: `high` entries are considered first, then `medium`, then `low`. Default: `low` |

#### Tips for writing effective guidance

- Be specific and actionable. "The `cost-center` tag is our most reliable ownership signal" is better than "Use tags".
- Explain your organization's conventions: team naming patterns, how to interpret specific tags, etc.
- Call out accounts that should not be owners (also add these as exclusion rows for enforcement).
- Use one entry per priority level to organize your guidance by importance.

#### Example: organization-specific context split by priority

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
2,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
3,prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

### Reference table format

#### Column schema

Your reference table must be named `k9_ownership_preferences` and contain these 12 columns:

| Column                    | Type   | Description                                                                         |
|---------------------------|--------|-------------------------------------------------------------------------------------|
| `id`                      | String | **Required for all rows.** Unique identifier for the row. Used as the primary key   |
| `preference_type`         | String | **Required for all rows.** Row type: `tag_mapping`, `exclusion`, or `prompt_text`   |
| `tag_key`                 | String | Tag key to match (tag mappings only)                                                |
| `tag_value`               | String | Tag value to match; leave empty as a wildcard (tag mappings only)                   |
| `owner`                   | String | Owner handle to assign (tag mappings only)                                          |
| `owner_type`              | String | Owner type: `team`, `user`, or `service` (tag mappings only)                        |
| `confidence`              | String | Confidence level: `high`, `medium`, or `low` (tag mappings only)                    |
| `handle`                  | String | Owner handle to exclude (exclusions only)                                           |
| `exclusion_type`          | String | Owner type filter for exclusion; leave empty to exclude all types (exclusions only) |
| `exclusion_resource_type` | String | Resource type filter for exclusion; leave empty to exclude all (exclusions only)    |
| `prompt_text`             | String | Guidance text (prompt text only)                                                    |
| `priority`                | String | Ordering priority: `high`, `medium`, or `low` (prompt text only)                    |

Each row uses a subset of columns depending on `preference_type`. Leave unused columns empty.

#### Column usage by preference type

| Column | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
| `id` | required | required | required |
| `preference_type` | `"tag_mapping"` | `"exclusion"` | `"prompt_text"` |
| `tag_key` | required | — | — |
| `tag_value` | optional (empty means wildcard) | — | — |
| `owner` | required | — | — |
| `owner_type` | required | — | — |
| `confidence` | required | — | — |
| `handle` | — | required | — |
| `exclusion_type` | — | optional | — |
| `exclusion_resource_type` | — | optional | — |
| `prompt_text` | — | — | required |
| `priority` | — | — | optional |

### Complete example

A ready-to-use CSV with all three preference types:

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
4,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
5,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
6,tag_mapping,env,production,sre-team,team,low,,,,,
7,tag_mapping,managed-by,,team-infra,team,low,,,,,
8,exclusion,,,,,,deploy-bot,,,,
9,exclusion,,,,,,ci-runner,service,,,
10,exclusion,,,,,,github-actions,service,,,
11,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
12,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
13,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
14,prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## Validation rules

All preference data is validated when the Ownership Agent reads your reference table. **Validation is all-or-nothing**: if any row fails validation, the Ownership Agent rejects the **entire** preference set for that sync cycle. When this happens, the preferences are left empty until a valid set is uploaded.

This strict approach helps ensure you are working with a consistent, fully valid set of preferences.

### Allowed characters

Different fields accept different character sets:

| Field type | Allowed characters | Applies to |
| --- | --- | --- |
| Structured fields | Letters, digits, `-` `_` `.` `:` `/` `@` | `tag_key`, `owner`, `handle`, `exclusion_type`, `exclusion_resource_type`, `owner_type`, `confidence`, `priority` |
| Tag values | Same as structured fields, plus spaces | `tag_value` |
| Prompt text | Letters, digits, `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` spaces, tabs, newlines | `prompt_text` |

#### Notable restrictions

- **Angle brackets** (`<`, `>`) are **not allowed** in any field, including prompt text.
- **Curly braces** (`{`, `}`) are **not allowed** in any field.
- **Pipe characters** (`|`) are **not allowed** in any field.

These restrictions prevent formatting artifacts and help ensure clean processing by the AI engine.

### Size limits

| Limit                               | Value                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------|
| Maximum tag mappings                | 50 rows                                                                            |
| Maximum exclusions                  | 20 rows                                                                            |
| Maximum prompt text entries         | Three rows (one per priority level)                                                |
| Maximum bytes per field             | 1,024 bytes (applies to tag keys, tag values, owners, handles, and similar fields) |
| Maximum bytes per prompt text entry | 4,096 bytes                                                                        |

### Duplicate detection

The Ownership Agent rejects the entire preference set if it contains conflicting or duplicate entries:

- **Tag mappings**: Two rows with the same `tag_key` and `tag_value` but different `owner` values are a conflict. Two rows with the same `tag_key`, `tag_value`, and `owner` but different `confidence` levels are also a conflict. Exact duplicates (all fields identical) are allowed.
- **Exclusions**: Two rows with the same `handle`, `exclusion_type`, and `exclusion_resource_type` are a duplicate. Comparisons are case-insensitive.

If the Ownership Agent detects any conflict or duplicate, it rejects the entire preference set.

### Content guidelines for prompt text

The AI engine processes prompt text as organizational context. To help ensure your guidance is effective:

- **Use plain, declarative sentences**: Describe facts about your organization, not instructions to the AI.
- **Avoid special formatting**: Markdown headings, HTML tags, and XML-like tags are stripped during processing.
- **Focus on ownership data sources**: Describe which tags, naming conventions, or team structures indicate ownership.

#### Examples

- "The cost-center tag is our most reliable ownership signal for all cloud resources."
- "Team identifiers always use the team- prefix (for example, team-platform, team-data-eng)."
- "Resources in the us-east-1/prod account are managed by team-sre."

## Upload your ownership preferences

Datadog stores your preferences as a [reference table][1]. The table must be named `k9_ownership_preferences` and contain all 12 column headers, even if some rows leave them empty.

There are several ways to create and update the table:

### Option 1: Manual CSV upload (Datadog UI)

This approach is best for getting started or making occasional updates.

1. Prepare your CSV file (see [Complete example](#complete-example)).
2. In Datadog, go to **Integrations** > [**Reference Tables**][6].
3. Click **New Reference Table**.
4. Upload your CSV file.
5. Set the table name to `k9_ownership_preferences`.
6. Choose `id` as the primary key.
7. Click **Save**.

To update your reference table, upload a new CSV to the same table to fully replace its contents.

Manual uploads support files up to 4 MB.

### Option 2: Cloud storage sync (S3, Azure Blob, GCS)

This approach is best for automated, recurring updates. Store your CSV in a cloud storage bucket so Datadog can periodically import it.

1. Upload your CSV to an **Amazon S3 bucket**, **Azure Blob Storage container**, or **Google Cloud Storage bucket**.
2. In Datadog, go to **Integrations** > [**Reference Tables**][6].
3. Click **New Reference Table** and select **Cloud Storage** as the source.
4. Provide the storage path and credentials (IAM role for S3, connection string for Azure, service account for GCS).
5. Set the table name to `k9_ownership_preferences`.
6. Choose `id` as the primary key.
7. Click **Save**.

Datadog periodically re-imports the file, so it automatically picks up updates to the CSV in your bucket.

Cloud storage uploads support files up to 200 MB.

See the [Reference Tables documentation][1] for detailed setup instructions per cloud provider.

### Option 3: Terraform

This approach is best for managing preferences as infrastructure-as-code alongside your other Datadog resources.

The [Datadog Terraform provider][2] supports reference tables. Use it to create and update the table declaratively.

For more information, see [datadog_reference_table (Resource)][7] in the Datadog Terraform provider documentation.

### API

You can also manage reference tables programmatically through the [Reference Tables API][3]. See the API documentation for available endpoints.

Replace `api.datadoghq.com` with your [Datadog site URL][4] if applicable (for example, `api.datadoghq.eu`, `api.us3.datadoghq.com`).

## When preferences take effect

1. You upload or update your reference table.
2. The Ownership Agent reads the table periodically (approximately once per day per organization).
3. The Ownership Agent validates the preferences in your table. If validation passes, the new preferences replace the previous set.
4. On the next ownership inference run for each resource:
   - **Tag mappings** add ownership candidates based on your tag rules.
   - **Exclusions** remove unwanted handles from results.
   - **Custom prompt text** guides the AI inference engine.
5. Updated results appear in the Cloud Security posture management UI.

Changes to your reference table take effect within **24 hours**.

<div class="alert alert-info">If you delete all rows from the table (leaving it empty), the Ownership Agent actively clears your previous preferences. Deleting the table entirely has the same effect—the cached preferences expire and are left empty.</div>

## Troubleshooting

Validation is all-or-nothing. If any row has an issue, the Ownership Agent rejects the entire preference and leaves all preferences empty until you upload a valid set.

| Problem                                  | Likely cause                      | Fix                                                                                                                                                                                                                     |
|------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preferences not in effect after 24 hours | Table name is wrong               | Must be exactly `k9_ownership_preferences`                                                                                                                                                                              |
| Preferences not in effect after 24 hours | Missing column headers            | All 12 columns must exist as CSV headers, even if rows leave them empty                                                                                                                                                 |
| Preferences not in effect after 24 hours | Feature not enabled for your org  | Contact [Datadog support][8] to enable ownership preferences                                                                                                                                                            |
| All preferences rejected                 | Invalid characters in any field   | See [Allowed characters](#allowed-characters). Angle brackets, curly braces, and pipe characters are not permitted                                                                                                      |
| All preferences rejected                 | Missing required field in any row | Check that `tag_key`, `owner`, `owner_type`, and `confidence` are populated for tag mappings; `handle` for exclusions; `prompt_text` for prompt text entries                                                            |
| All preferences rejected                 | Duplicate or conflicting rows     | Two tag mappings with the same `tag_key`+`tag_value` but different `owner` or `confidence` values cause rejection. Exact duplicates of exclusions also cause rejection. See [Duplicate detection](#duplicate-detection) |
| All preferences rejected                 | Invalid `confidence` value        | Must be exactly `high`, `medium`, or `low`                                                                                                                                                                              |
| All preferences rejected                 | Invalid `owner_type` value        | Must be `team`, `user`, or `service` (case-insensitive)                                                                                                                                                                 |
| All preferences rejected                 | Size limit exceeded               | Check row counts (50 tag mappings, 20 exclusions, three prompt text entries) and field lengths (1,024 bytes per field, 4,096 per prompt entry)                                                                          |
| All preferences rejected                 | Prompt text formatting            | Markdown headings and HTML/XML tags are stripped during processing. Use plain text only                                                                                                                                 |
| Tag mapping not matching a resource      | Spelling mismatch                 | Matching is case-insensitive, but verify the exact tag key and value on your resource                                                                                                                                   |
| Exclusion not applied                    | Scoping filters too narrow        | All non-empty fields must match (AND logic). Leave `exclusion_type` and `exclusion_resource_type` empty for broad exclusions                                                                                            |
| Preferences cleared unexpectedly         | Table was emptied or deleted      | Both an empty table and a deleted table cause cached preferences to expire. Upload a valid CSV to restore preferences                                                                                                   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /api/latest/reference-tables/
[4]: /getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
[6]: https://app.datadoghq.com/reference-tables
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table
[8]: /help