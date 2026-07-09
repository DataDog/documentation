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
1. Under API scopes, select {{< ui >}}Read Access{{< /ui >}} for Projects, Cells, and Data connections.

### Add the Hex integration

Navigate to the Hex integration tile and enter the following information:

| Parameter | Description |
|-----------|-------------|
| API Token | The workspace token generated above. |
| Custom Domain | Optional. Set this if your workspace uses a single-tenant, EU multi-tenant, or HIPAA multi-tenant Hex domain (for example, `eu.hex.tech`). Leave blank for the standard `app.hex.tech`. |
| Workspace ID | Optional. Used to generate direct links from Datadog to your Hex projects and cells. Find it in any Hex URL: `https://app.hex.tech/<workspace_id>/hex/...`. |

## What's next

After your Hex workspace is connected, Datadog syncs it every 60 minutes and automatically derives lineage from warehouse tables and columns to the Hex projects and cells that depend on them.

Initial syncs may take up to several hours depending on the size of your Hex workspace.

After syncing, you can explore your Hex projects and their upstream dependencies in the [Data Observability Catalog][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/catalog
