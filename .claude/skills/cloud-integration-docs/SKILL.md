---
name: cloud-integration-docs
description: Generate a Datadog integration documentation page for a new cloud provider onboarded via ECI. Reads the cloud's capability spec from a local dd-source clone and writes a publish-ready markdown file to content/en/integrations/. Trigger phrases: "generate cloud integration doc", "write docs for nebius", "create integration page for <cloud>", "onboard <cloud> docs".
allowed-tools: Read, Write, Bash, Glob, WebFetch
---

# Cloud Integration Docs Generator

Generate a Datadog integration docs page for a new ECI cloud provider from its capability spec.

## Input

The user provides:
- **Cloud provider name** (required) — for example, "Nebius Cloud", "Scaleway", "OVH"
- **dd-source path** (optional) — path to local dd-source clone. Defaults to `~/go/src/github.com/DataDog/dd-source`

If the cloud name is not provided, ask: "Which cloud provider should I generate docs for?"

## Step 0: Load editorial standards

Read the shared editorial reference before writing anything:

```
${CLAUDE_PLUGIN_ROOT}/skills/shared/editorial-reference.md
```

This is your source of truth for voice, tone, grammar, formatting, and style rules. Apply it throughout generation — not as a post-pass, but while writing.

Key rules to internalize:
- Active voice. Imperative mood for steps ("Click **Create**", not "You should click...").
- Plain, direct language. No marketing copy.
- Concise. Omit needless words.
- Self-contained sections — each section must make sense read in isolation (important for AI retrieval).
- High-information headings. "Configure the integration" beats "Configuration".
- Explicit negation for unsupported features. "Metrics collection is not supported" not "works best with logs".

## Step 1: Resolve and read the capability spec

Derive the slug from the cloud name (kebab-case, for example `nebius-cloud`, `scaleway`, `ovhcloud`).

Look for the spec in this order:
1. `<dd-source-path>/domains/cloud_platform/eci/cloud-exploration/<slug>/spec.md`
2. Common remappings: `alicloud` → `alibaba-cloud`, `ovh-cloud` → `ovhcloud`
3. If still not found, glob `domains/cloud_platform/eci/cloud-exploration/*/spec.md` and match by provider name

**If no spec is found**, stop and tell the user:
> "No capability spec found for [Provider] in dd-source. The spec must be merged to main before generating docs — run the `explore-new-cloud` skill in dd-source first, then merge the spec, and come back."

**If the spec is a skeleton** (headings only, no substantive content under them), stop and tell the user:
> "The spec for [Provider] exists but appears incomplete. Merge a substantive spec to dd-source main first."

Do not proceed until a merged, substantive spec exists.

## Step 2: Extract relevant sections

Read and extract the following from the spec. Note which data types are marked as implemented vs. not yet started — scope the generated doc to only what's implemented.

From **`## Overview`**:
- One-paragraph provider description (market position, key services)
- Official docs URL

From **`## Authorization Schemes`**:
- Which auth schemes are marked "Recommended For ECI" and what credentials they require
- The credential field names (for the configuration table)

From **`## Console Access`**:
- Console URL
- Where to find tenant/account ID in the console

From **`## Logs Collection`** (if logs are implemented):
- Log service name and type (Loki, proprietary, etc.)
- Log streams/buckets available and their descriptions
- Auth required for log queries

From **`## Metrics Collection`** (if metrics are implemented):
- Metric namespaces and what they cover
- Auth required

From **`## Resource Discovery`** (if resources are implemented):
- Resource types available

## Step 3: Check for existing integration pages as templates

Read 2–3 existing pages in `content/en/integrations/` that are structurally similar to what you're generating:
- Logs-only, tile-based: `alcide.md`, `amazon_guardduty.md`
- Logs + metrics, tile-based: look for cloud integrations

Use these for frontmatter conventions, heading structure, and link formatting — not for content.

## Step 4: Generate the integration doc

Write the file to `content/en/integrations/<slug>.md`.

### Frontmatter

```yaml
---
categories:
    - cloud
    - log collection      # include only if logs are supported
    # - metrics           # include only if metrics are supported
description: <one-line description of what data Datadog collects>
doc_link: /integrations/<slug>/
has_logo: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/<slug>.md']
integration_title: <Provider Name>
is_public: true
custom_kind: integration
name: <slug with underscores>
public_title: Datadog-<Provider Name> Integration
short_description: <same as description>
version: '1.0'
integration_id: "<slug>"
---
```

### Page structure

**`## Overview`**
Two to three sentences: what the provider is, what data Datadog collects from it, and a link to Datadog Log Management or Metrics. Do not sell the product. State facts.

**`## Setup`**

For each credential or configuration step required by the auth schemes extracted in Step 2, write a subsection with numbered steps. Each step must be imperative and actionable. Include the exact console path, CLI command, or field name. Do not paraphrase — use the exact field names from the spec.

Typical subsections (adjust based on what the spec requires):
- `### Create a service account` — steps to create the SA, assign the read-only role, and download credentials
- `### Issue an API key` — CLI command to create the key, copy-paste ready
- `### Configure the integration` — link to the tile, table of field names and where to find each value

**`## Collected data`**

Include only subsections for data types that are implemented.

- `### Logs` — table: log source (stream name) | description
- `### Metrics` — `{{< get-metrics-from-git "<slug>" >}}` shortcode (only if metrics are supported)
- `### Events` — only if events are collected

**`## Troubleshooting`**
One line: "Need help? Contact [Datadog support][N]." Nothing else unless the spec documents known issues.

**Reference links**
Numbered list at the bottom. Keep links minimal — official provider docs, console URL, Datadog docs pages. No marketing pages.

### Writing rules (apply during generation, not after)

- Steps are numbered lists. Each step is one action.
- UI paths use **bold**: **Administration** > **IAM** > **Service accounts**.
- Code, field names, CLI flags, and stream names use backticks.
- Tables for configuration fields: Field | Where to find it.
- No introductory filler ("In this section, you will...").
- No trailing summaries ("You have now configured...").
- Link text is descriptive ("Nebius CLI" not "here" or "this page").
- Omit any feature the spec marks as not yet implemented. Add a note only if the spec explicitly says "coming soon".

## Step 5: Run Vale

```bash
vale content/en/integrations/<slug>.md
```

Fix any errors or warnings before reporting done. If Vale is not installed, skip and note it in the output.

## Step 6: Report and next steps

Tell the user:
- What file was written
- Which data types are included (and which were omitted because not yet implemented)
- Any open questions from the spec's `## Open Questions` section that should be resolved before publishing
- "Open a PR and run `/pr-review` on it for a full editorial review against Datadog documentation standards before merging."
