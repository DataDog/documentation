---
title: Airbyte
description: Connect Airbyte to Datadog Data Observability to view end-to-end lineage from source systems to your data warehouse.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Airbyte integration helps data teams understand how data flows from external sources into their data warehouses and trace quality issues back to upstream sources. After you enable the integration, Datadog:

- Pulls metadata from your Airbyte workspace, including workspaces, connections, and streams
- Automatically generates column-level lineage between source system tables and destination warehouse tables across all active connections

Lineage is derived for all [supported data warehouse destinations][4].

## Connect Airbyte and Datadog

### Airbyte Cloud: Generate credentials

Datadog uses Airbyte's API to pull connection metadata. To authenticate, generate a **Client ID** and **Client Secret** from your Airbyte Cloud account:

1. In your Airbyte workspace, navigate to **Settings** > **Applications**.
2. Click **+ New application** and provide a name.
3. Copy the generated **Client ID** and **Client Secret**.

For more information, see the [Airbyte API documentation][1].

### Self-hosted Airbyte

You need the **base API URL** for your Airbyte instance (for example, `http://localhost:8000/api/public/v1`).
If your instance has Basic authentication enabled, you also need a username and password.

### Add the Airbyte integration

To connect Airbyte to Datadog:

1. Navigate to the [Airbyte integration tile][2] and select your **Deployment type**:
   - **Cloud**: Enter your **Client ID** and **Client Secret**.
   - **Self-hosted**: Enter your **Base API URL** and, if Basic auth is enabled, your **Username** and **Password**.
2. Click {{< ui >}}Save{{< /ui >}}.

## What's next

After your Airbyte workspace is successfully connected, Datadog syncs every 60 minutes and automatically derives column-level lineage from source system tables to your destination warehouse tables across all active connections.

After the initial setup, it can take up to 60 minutes for data to appear.

After syncing, you can explore your Airbyte-sourced tables and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://reference.airbyte.com/reference/authentication
[2]: https://app.datadoghq.com/integrations/airbyte-for-data-observability
[3]: https://app.datadoghq.com/data-obs/catalog
[4]: /data_observability/quality_monitoring/data_warehouses
