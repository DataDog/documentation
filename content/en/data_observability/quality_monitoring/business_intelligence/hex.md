---
title: Hex
description: Connect Hex to Datadog Data Observability to view end-to-end lineage from warehouse tables to Hex projects.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Hex integration helps data teams understand which Hex projects and notebooks depend on their warehouse tables, so you can assess the impact of a schema or pipeline change before it breaks a report. When Datadog connects, it:

- Pulls project and SQL cell metadata from your Hex workspace.
- Parses the SQL in each cell to generate table- and column-level lineage from your warehouse to downstream Hex projects.

**Note**: Only SQL cells are synced. Code, Markdown, chart, and input cells are not included in lineage.

## Connect Hex

### Generate an API token

1. In your Hex workspace settings, go to the {{< ui >}}API keys{{< /ui >}} page.
1. Click {{< ui >}}New Token{{< /ui >}}.
1. Provide a description and an expiration. Datadog recommends a token with no expiration.
1. Under API scopes, select **Read Access** for {{< ui >}}Projects{{< /ui >}}, {{< ui >}}Cells{{< /ui >}}, and {{< ui >}}Data connections{{< /ui >}}.

### Add the Hex integration

Navigate to the Hex integration tile and enter the following information:

| Parameter | Description |
|-----------|-------------|
| API Token | The workspace token generated above. |
| Custom Domain | Optional. Set this if your workspace uses a single-tenant, EU multi-tenant, or HIPAA multi-tenant Hex domain (for example, `eu.hex.tech`). Leave blank for the standard `app.hex.tech`. |
| Workspace ID | Optional. Used to generate direct links from Datadog to your Hex projects and cells. Find it in any Hex URL: `https://app.hex.tech/<workspace_id>/hex/...`. |

Datadog syncs your Hex workspace every 60 minutes.

## Supported warehouses

Lineage resolution is fully supported for Hex data connections to **Snowflake** and **BigQuery**. Databricks and Postgres data connections are recognized, but lineage resolution for them is incomplete as of this writing — contact [support][1] if you rely on Hex-to-Databricks or Hex-to-Postgres lineage.

[1]: /help/
