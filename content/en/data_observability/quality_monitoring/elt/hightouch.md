---
title: Hightouch
description: Connect Hightouch to Datadog Data Observability to trace lineage from your data warehouse to downstream destinations.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Hightouch integration helps data teams understand how data flows from their data warehouse to downstream business tools and trace quality issues back to upstream sources. When Datadog connects, it:

- Pulls metadata from your Hightouch workspace, including syncs, models, and destinations
- Generates lineage between source warehouse tables and destination objects across all active syncs

Lineage granularity depends on the sync's model type:

- **Table-selector models** produce column-level lineage from the sync's field mappings.
- **dbt models** and **raw SQL models** produce table-level lineage.

Lineage is derived from all [supported data warehouse sources][4].

## Connect Hightouch

### Generate an API key

Follow the [Hightouch API documentation][1] to generate an API key with read access to your workspace.

### Add the Hightouch integration

To connect Hightouch to Datadog:

1. Navigate to the [Hightouch integration tile][2].
2. Enter an **Account Name** to identify this Hightouch account in Datadog. This can be any name you choose.
3. Enter your **API Key**.
4. Click {{< ui >}}Save{{< /ui >}}.

## What's next

After your Hightouch workspace is successfully connected, Datadog refreshes Hightouch metadata every 60 minutes and derives lineage from source warehouse tables to your destination objects across all active syncs.

After the initial setup, it can take up to 60 minutes for data to appear.

After the metadata refresh completes, you can explore your Hightouch destinations and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hightouch.com/docs/developer-tools/api-guide#create-an-api-key
[2]: https://app.datadoghq.com/integrations/hightouch
[3]: https://app.datadoghq.com/data-obs/catalog
[4]: /data_observability/quality_monitoring/data_warehouses
