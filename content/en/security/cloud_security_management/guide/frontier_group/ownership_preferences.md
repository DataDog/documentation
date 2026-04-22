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

The Ownership Agent selects a subset of cloud resources with security findings and infers an owner for each one. By default, it uses cloud resource tags, service catalog data, and other data sources to infer ownership.

**Ownership preferences** let you customize this process by providing your own rules. You store them in a Datadog [reference table][1], and the Ownership Agent reads them automatically to enhance its results.

With preferences you can:

- **Map tags to owners**: Tell the agent that resources with specific tag values belong to a particular team or person.
- **Exclude accounts**: Prevent bot accounts, service accounts, or shared infrastructure from appearing as owners.
- **Provide custom guidance**: Give the AI engine organization-specific context to make better decisions.

## Quick start

1. Create a CSV file following the format described below. Optionally, use the [Ownership Agent AI skill][5] with your AI coding assistant to generate the CSV interactively.
2. Upload it as a reference table named `k9_ownership_preferences`. See [How to upload](#how-to-upload).
3. Preferences take effect within 24 hours.

## Preference types

Each row in your reference table is one preference. The `preference_type` column determines what the row does.

| Type | What it does |
| --- | --- |
| `tag_mapping` | When a resource has a matching tag, assign the specified owner |
| `exclusion` | Prevent a specific handle from ever being assigned as owner |
| `prompt_text` | Provide custom guidance to the AI inference engine |

### Tag mappings

A tag mapping says: _"When a resource has tag `X:Y`, it belongs to this owner."_

The agent checks cloud resource tags against your mappings. When a match is found, the specified owner is added as a candidate. Multiple mappings can match the same resource, producing multiple candidates that are ranked alongside other data sources.

Tag mappings complement existing ownership data sources. They do not override a direct ownership tag (like `dd-team`) already present on the resource.

**Columns used:**

| Column | Required | Description |
| --- | --- | --- |
| `preference_type` | Yes | Must be `tag_mapping` |
| `tag_key` | Yes | Tag key to match (for example, `cost-center`, `project`) |
| `tag_value` | No | Tag value to match. Leave empty to match any value for that key (wildcard) |
| `owner` | Yes | Owner to assign (for example, `team-platform`, `alice@example.com`) |
| `owner_type` | Yes | Type of owner: `team`, `user`, or `service` |
| `confidence` | Yes | How strongly this mapping indicates ownership: `high`, `medium`, or `low` |

**Owner type:**

The `owner_type` field tells the agent what kind of entity the owner is. This helps the AI engine make better decisions when ranking candidates.

| Value | When to use |
| --- | --- |
| `team` | The owner is a team handle (for example, `team-platform`, `sre-team`) |
| `user` | The owner is an individual (for example, `alice@example.com`) |
| `service` | The owner is a service or automation account (for example, `payment-svc`) |

**Matching behavior:**

- Tag key and value matching is **case-insensitive**. `Cost-Center` matches `cost-center`.
- An empty `tag_value` matches **any value** for that tag key (wildcard).
- If multiple mappings match, all produce candidates. The agent ranks them by confidence.

**Confidence levels:**

| Level | When to use |
| --- | --- |
| `high` | The tag reliably identifies the owner. Example: a `cost-center` tag that maps 1:1 to a team |
| `medium` | The tag is a good indicator but may not always be correct. Example: a `project` tag shared across teams |
| `low` | The tag provides a hint but needs corroboration. Example: an `env` tag that loosely correlates with a team |

**Example: mapping cost centers to teams**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

**Example: mapping projects to owners**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
tag_mapping,project,atlas,team-atlas,team,medium,,,,,
tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
tag_mapping,project,payments,team-fintech,team,high,,,,,
```

**Example: wildcard matching any resource with a `managed-by` tag**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
tag_mapping,managed-by,,team-infra,team,low,,,,,
```

This matches any value of the `managed-by` tag and assigns it to `team-infra` with low confidence. Because the confidence is low, stronger data sources take priority.

### Exclusions

An exclusion says: _"Never assign this handle as a resource owner."_

Bot accounts, CI runners, and shared service accounts often appear in cloud resource metadata (for example, as the creator or last modifier). Exclusions remove these from ownership results so only real owners are surfaced.

**Columns used:**

| Column | Required | Description |
| --- | --- | --- |
| `preference_type` | Yes | Must be `exclusion` |
| `handle` | Yes | Owner handle to exclude (for example, `deploy-bot`, `ci-runner`) |
| `exclusion_type` | No | Limit exclusion to a specific owner type: `team`, `user`, or `service`. Empty means exclude regardless of type |
| `exclusion_resource_type` | No | Limit exclusion to a specific resource type (for example, `aws_ec2_instance`). Empty means exclude for all resource types |

**Matching behavior:**

- The `handle` is matched **case-insensitively**.
- Optional filters use **AND logic**. All non-empty fields must match for the exclusion to apply.
- Leave `exclusion_type` and `exclusion_resource_type` empty to exclude the handle from all results (most common).

**Example: exclude common bot accounts from all results**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
exclusion,,,,,,deploy-bot,,,,
exclusion,,,,,,ci-runner,,,,
exclusion,,,,,,github-actions,,,,
exclusion,,,,,,terraform-automation,,,,
```

**Example: exclude a service account only for specific resource types**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

These exclusions only apply to EC2 instances. The same handles are still eligible as owners for other resource types.

**Example: exclude a team handle for a specific resource type**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

This excludes `legacy-ops` only when it appears as a team candidate for EC2 instances. It is still considered for S3 buckets or other resource types.

### Custom prompt text

Custom prompt text provides free-form guidance to the AI inference engine. Use it to share organizational context that helps the AI make better ownership decisions, such as naming conventions, team structures, or which data sources to prioritize.

You can provide up to **three** prompt text entries, one for each priority level (`high`, `medium`, `low`). Entries with the same priority are concatenated. Use priority to control which guidance the AI engine considers first.

**Columns used:**

| Column | Required | Description |
| --- | --- | --- |
| `preference_type` | Yes | Must be `prompt_text` |
| `prompt_text` | Yes | Your guidance text (up to 4,096 bytes per entry) |
| `priority` | No | Controls ordering: `high` entries are considered first, then `medium`, then `low`. Default: `low` |

**Tips for writing effective guidance:**

- Be specific and actionable. "The `cost-center` tag is our most reliable ownership signal" is better than "Use tags".
- Explain your organization's conventions: team naming patterns, how to interpret specific tags.
- Call out accounts that should not be owners (also add these as exclusion rows for enforcement).
- Use one entry per priority level to organize your guidance by importance.

**Example: organization-specific context split by priority**

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

## Validation rules

All preference data is validated when the Ownership Agent reads your reference table. **Validation is all-or-nothing**: if any row fails validation, the **entire** preference set is rejected for that sync cycle. When this happens, the preferences are left empty until a valid set is uploaded.

This strict approach helps ensure you are working with a consistent, fully valid set of preferences.

### Allowed characters

Different fields accept different character sets:

| Field type | Allowed characters | Applies to |
| --- | --- | --- |
| Structured fields | Letters, digits, `-` `_` `.` `:` `/` `@` | `tag_key`, `owner`, `handle`, `exclusion_type`, `exclusion_resource_type`, `owner_type`, `confidence`, `priority` |
| Tag values | Same as structured fields, plus spaces | `tag_value` |
| Prompt text | Letters, digits, `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` spaces, tabs, newlines | `prompt_text` |

**Notable restrictions:**

- **Angle brackets** (`<`, `>`) are **not allowed** in any field, including prompt text.
- **Curly braces** (`{`, `}`) are **not allowed** in any field.
- **Pipe characters** (`|`) are **not allowed** in any field.

These restrictions prevent formatting artifacts and help ensure clean processing by the AI engine.

### Size limits

| Limit | Value |
| --- | --- |
| Maximum tag mappings | 50 rows |
| Maximum exclusions | 20 rows |
| Maximum prompt text entries | Three rows (one per priority level) |
| Maximum bytes per field | 1,024 bytes (applies to tag keys, tag values, owners, handles, and similar fields) |
| Maximum bytes per prompt text entry | 4,096 bytes |

### Duplicate detection

The Ownership Agent rejects the entire preference set if it contains conflicting or duplicate entries:

- **Tag mappings**: Two rows with the same `tag_key` and `tag_value` but different `owner` values are a conflict. Two rows with the same `tag_key`, `tag_value`, and `owner` but different `confidence` levels are also a conflict. Exact duplicates (all fields identical) are allowed.
- **Exclusions**: Two rows with the same `handle`, `exclusion_type`, and `exclusion_resource_type` are a duplicate. Comparisons are case-insensitive.

If any conflict or duplicate is detected, the entire preference set is rejected.

### Content guidelines for prompt text

Prompt text is processed by the AI engine as organizational context. To help ensure your guidance is effective:

- **Use plain, declarative sentences**: Describe facts about your organization, not instructions to the AI.
- **Avoid special formatting**: Markdown headings, HTML tags, and XML-like tags are stripped during processing.
- **Focus on ownership data sources**: Describe which tags, naming conventions, or team structures indicate ownership.

**Good examples:**

- "The cost-center tag is our most reliable ownership signal for all cloud resources."
- "Team identifiers always use the team- prefix (for example, team-platform, team-data-eng)."
- "Resources in the us-east-1/prod account are managed by team-sre."

**Avoid:**

- Instructional phrasing directed at the AI engine
- HTML or XML markup
- Markdown formatting (headings, bold, links)

## Reference table format

### Column schema

Your reference table must be named `k9_ownership_preferences` and contain these 11 columns:

| Column | Type | Description |
| --- | --- | --- |
| `preference_type` | STRING | **Required for all rows.** Row type: `tag_mapping`, `exclusion`, or `prompt_text` |
| `tag_key` | STRING | Tag key to match (tag mappings only) |
| `tag_value` | STRING | Tag value to match; empty means wildcard (tag mappings only) |
| `owner` | STRING | Owner handle to assign (tag mappings only) |
| `owner_type` | STRING | Owner type: `team`, `user`, or `service` (tag mappings only) |
| `confidence` | STRING | Confidence level: `high`, `medium`, or `low` (tag mappings only) |
| `handle` | STRING | Owner handle to exclude (exclusions only) |
| `exclusion_type` | STRING | Owner type filter for exclusion; empty means all types (exclusions only) |
| `exclusion_resource_type` | STRING | Resource type filter for exclusion; empty means all (exclusions only) |
| `prompt_text` | STRING | Guidance text (prompt text only) |
| `priority` | STRING | Ordering priority: `high`, `medium`, or `low` (prompt text only) |

Each row uses a subset of columns depending on `preference_type`. Leave unused columns empty.

### Column usage by preference type

| Column | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
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

## How to upload

Your preferences are stored as a Datadog [reference table][1]. The table must be named `k9_ownership_preferences` and contain all 11 column headers, even if some rows leave them empty.

There are several ways to create and update the table:

### Option 1: Manual CSV upload (Datadog UI)

Best for getting started or making occasional updates.

1. Prepare your CSV file (see [Complete example](#complete-example) below).
2. In Datadog, go to **Integrations > Reference Tables**.
3. Click **New Reference Table**.
4. Upload your CSV file.
5. Set the table name to `k9_ownership_preferences`.
6. Choose a primary key. `preference_type`, `tag_key`, `tag_value`, and `handle` is the recommended combination.
7. Click **Save**.

To update, upload a new CSV to the same table. The contents are fully replaced.

Manual uploads support files up to 4 MB.

### Option 2: Cloud storage sync (S3, Azure Blob, GCS)

Best for automated, recurring updates. Store your CSV in a cloud storage bucket and Datadog periodically imports it.

1. Upload your CSV to an **Amazon S3 bucket**, **Azure Blob Storage container**, or **Google Cloud Storage bucket**.
2. In Datadog, go to **Integrations > Reference Tables**.
3. Click **New Reference Table** and select **Cloud Storage** as the source.
4. Provide the storage path and credentials (IAM role for S3, connection string for Azure, service account for GCS).
5. Set the table name to `k9_ownership_preferences`.
6. Datadog periodically re-imports the file, so updates to the CSV in your bucket are picked up automatically.

Cloud storage uploads support files up to 200 MB.

See the [Reference Tables documentation][1] for detailed setup instructions per cloud provider.

### Option 3: Terraform

Best for managing preferences as infrastructure-as-code alongside your other Datadog resources.

The [Datadog Terraform provider][2] supports reference tables. Use it to create and update the table declaratively.

See the provider documentation for the `datadog_reference_table` resource.

### API

You can also manage reference tables programmatically through the [Reference Tables API][3]. See the API documentation for available endpoints.

Replace `api.datadoghq.com` with your [Datadog site URL][4] if applicable (for example, `api.datadoghq.eu`, `api.us3.datadoghq.com`).

## When preferences take effect

1. You upload or update your reference table.
2. The Ownership Agent reads the table periodically (approximately once per day per organization).
3. Preferences are validated. If validation passes, the new preferences replace the previous set.
4. On the next ownership inference run for each resource:
   - **Tag mappings** add ownership candidates based on your tag rules.
   - **Exclusions** remove unwanted handles from results.
   - **Custom prompt text** guides the AI inference engine.
5. Updated results appear in the Cloud Security posture management UI.

Changes to your reference table take effect within **24 hours**.

**Note**: If you delete all rows from the table (leaving it empty), the agent actively clears your previous preferences. Deleting the table entirely has the same effect—the cached preferences expire and are left empty.

## Troubleshooting

Validation is all-or-nothing. If any row has an issue, the entire preference set is rejected and preferences are left empty until a valid set is uploaded.

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Preferences not taking effect after 24 hours | Table name is wrong | Must be exactly `k9_ownership_preferences` |
| Preferences not taking effect after 24 hours | Missing column headers | All 11 columns must exist as CSV headers, even if rows leave them empty |
| Preferences not taking effect after 24 hours | Feature not enabled for your org | Contact support to enable ownership preferences |
| All preferences rejected | Invalid characters in any field | See [Allowed characters](#allowed-characters). Angle brackets, curly braces, and pipe characters are not permitted |
| All preferences rejected | Missing required field in any row | Check that `tag_key`, `owner`, `owner_type`, and `confidence` are populated for tag mappings; `handle` for exclusions; `prompt_text` for prompt text entries |
| All preferences rejected | Duplicate or conflicting rows | Two tag mappings with the same `tag_key`+`tag_value` but different `owner` or `confidence` values cause rejection. Exact duplicates of exclusions also cause rejection. See [Duplicate detection](#duplicate-detection) |
| All preferences rejected | Invalid `confidence` value | Must be exactly `high`, `medium`, or `low` |
| All preferences rejected | Invalid `owner_type` value | Must be `team`, `user`, or `service` (case-insensitive) |
| All preferences rejected | Size limit exceeded | Check row counts (50 tag mappings, 20 exclusions, three prompt text entries) and field lengths (1,024 bytes per field, 4,096 per prompt entry) |
| All preferences rejected | Prompt text formatting | Markdown headings and HTML/XML tags are stripped during processing. Use plain text only |
| Tag mapping not matching a resource | Spelling mismatch | Matching is case-insensitive, but verify the exact tag key and value on your resource |
| Exclusion not applying | Scoping filters too narrow | All non-empty fields must match (AND logic). Leave `exclusion_type` and `exclusion_resource_type` empty for broad exclusions |
| Preferences cleared unexpectedly | Table was emptied or deleted | Both an empty table and a deleted table cause cached preferences to expire. Upload a valid CSV to restore preferences |

## Complete example

A ready-to-use CSV with all three preference types:

```text
preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
tag_mapping,project,atlas,team-atlas,team,medium,,,,,
tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
tag_mapping,env,production,sre-team,team,low,,,,,
tag_mapping,managed-by,,team-infra,team,low,,,,,
exclusion,,,,,,deploy-bot,,,,
exclusion,,,,,,ci-runner,service,,,
exclusion,,,,,,github-actions,service,,,
exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /api/latest/reference-tables/
[4]: /getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
