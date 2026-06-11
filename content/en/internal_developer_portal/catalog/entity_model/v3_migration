---
title: Migrate Your Service Definitions to v3
disable_toc: false
further_reading:
- link: "/internal_developer_portal/catalog/entity_model"
  tag: "Documentation"
  text: "Learn about the v3 entity model"
- link: "/internal_developer_portal/catalog/entity_model/native_entities"
  tag: "Documentation"
  text: "Learn about native entity types"
- link: "/internal_developer_portal/catalog/entity_model/custom_entities"
  tag: "Documentation"
  text: "Create custom entity types"
---

## Overview

The `pup idp migrate-schema` command converts existing Service YAML files in the Datadog IDP Catalog from v1, v2, v2.1, or v2.2 to the [v3 entity format][1]. It handles field remapping, link type normalization, companion entity generation, and validates the output against the official v3 JSON schemas before writing anything to disk.

<div class="alert alert-info">
<code>pup idp migrate-schema</code> does not require Datadog authentication. You do not need to run <code>pup auth login</code> first.
</div>

## Prerequisites

Install `pup`:

```shell
brew tap datadog-labs/pack
brew install pup
```

Upgrade `pup` to the latest version:

```shell
brew upgrade pup
```

## What gets migrated

The following fields are remapped from v1/v2/v2.x to their v3 destinations:

| Source field (v1/v2/v2.x) | v3 destination |
|---|---|
| `dd-service` / `info.dd-service` | `metadata.name` |
| `display-name` / `display_name` | `metadata.displayName` |
| `description` | `metadata.description` |
| `team` / `org.team` | `metadata.owner` |
| `contacts` | `metadata.contacts` |
| `links` | `metadata.links` |
| `repos` | `metadata.links` (type: `repo`) |
| `docs` | `metadata.links` (type: `doc`) |
| `tags` | `metadata.tags` |
| `lifecycle` | `spec.lifecycle` |
| `tier` / `service-tier` | `spec.tier` |
| `type` | `spec.type` |
| `languages` | `spec.languages` |
| `depends-on` | `spec.dependsOn` |
| `application` | `spec.componentOf` + companion `kind: system` entity |
| `integrations.pagerduty` | `integrations.pagerduty.serviceURL` |
| `integrations.opsgenie` | `integrations.opsgenie.serviceURL` |
| `extensions` | `extensions` (preserved as-is) |
| Unknown top-level fields | Moved into `extensions` |

Link types are also normalized: `wiki` → `doc`, `code` → `repo`, `url`/`oncall` → `other`.

## Migrate a single file

Run the command with the path to a single YAML file:

```shell
pup idp migrate-schema service.datadog.yaml
```

The command detects the schema version, migrates the file, validates the output against the official v3 schemas, then prompts you for where to write the result:

```
Where would you like to write the output?
  [1] Write to ./entity.datadog.yaml (same directory, delete original)
  [2] Specify a custom path
  [3] Print to stdout only
>
```

- **Option 1** writes the migrated content to `entity.datadog.yaml` in the same directory and deletes the original file.
- **Option 2** prompts for a path and writes there.
- **Option 3** prints the migrated YAML to stdout — useful for reviewing or piping.

If the migrated output fails validation, you are prompted to abort or write anyway:

```
✗ INVALID  [service] payment-service
    [spec/tier] "Tier1" is not valid under any of the given schemas
[1] Abort  [2] Write anyway >
```

## Migrate all files in a directory

Pass a directory path to recursively discover and migrate all `*.datadog.yaml` files:

```shell
pup idp migrate-schema ./catalog/
```

If multiple files are found, the command lists them and asks whether to migrate one or all:

```
Found 4 catalog files:
  [1] catalog/checkout-api.datadog.yaml
  [2] catalog/payment-service.datadog.yaml
  [3] catalog/inventory-service.datadog.yaml
  [4] catalog/auth-service.datadog.yaml
Enter number to migrate one, or "all" to migrate all:
```

When migrating all files, a single confirmation is required upfront and all files are migrated in parallel. A summary is printed at the end:

```
Migrated 4 files • 6 services • 2 systems • 0 invalid • 1.2s
```

## Auto-discover from the current directory

If no path is given, `pup` searches the current working directory recursively:

```shell
cd ~/my-repo
pup idp migrate-schema
```

## Preview migrated YAML without writing

To preview the migration output without touching any files, use option `3` at the prompt or pipe via stdout:

```shell
pup idp migrate-schema service.datadog.yaml
# choose option 3 at the prompt
```

## Companion system entities

If your v1/v2 definitions include an `application:` field, a companion `kind: system` entity is automatically generated and appended to the output file. Duplicate system names across a multi-document file are deduplicated into a single entity.

**Input (v2):**

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2
dd-service: payment-service
team: payments-team
application: checkout-platform
{{< /code-block >}}

**Output (v3):**

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
---
apiVersion: v3
kind: service
metadata:
  name: payment-service
  owner: payments-team
spec:
  componentOf:
    - system:checkout-platform
---
apiVersion: v3
kind: system
metadata:
  name: checkout-platform
  owner: payments-team
spec:
  components:
    - service:payment-service
{{< /code-block >}}

## Validation

After migrating, the tool fetches the official v3 JSON schemas from the public `DataDog/schema` GitHub repository and validates each entity. Results are printed inline:

```
✓ VALID    [service] payment-service
✓ VALID    [system] checkout-platform
✗ INVALID  [service] inventory-service
    [spec/lifecycle] "depreciated" is not one of ["experimental","active","deprecated","end-of-life"]
```

Validation failures are warnings — they do not block you from writing the output, but should be resolved before merging the definition to the repo.
