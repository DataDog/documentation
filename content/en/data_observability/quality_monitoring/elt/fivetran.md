---
title: Fivetran
description: Connect Fivetran to Datadog Data Observability to view end-to-end lineage from source systems to your data warehouse.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Fivetran integration helps data teams understand how data flows from external sources into their data warehouses and trace quality issues back to upstream sources. When Datadog connects, it:

- Pulls metadata from your Fivetran account, including connectors, groups, and schema mappings
- Automatically generates column-level lineage between source system tables and destination warehouse tables across all active connectors

Lineage is derived for all [supported data warehouse destinations][4].

## Connect Fivetran

### Generate an API key

Datadog recommends using a **System Key**. Unlike Scoped Keys, which inherit permissions from a user account, System Keys have permissions set at the key level and continue working if the associated user leaves or changes roles.

To create a System Key:

1. Navigate to **Settings > API Config** in your Fivetran account.
2. Create a System Key with the following permissions:
   - `ACCOUNT`: `READ`
   - `DESTINATION`: `READ`
   - `CONNECTOR`: `READ`
3. Copy the **API key** and **API secret** somewhere safe.

For details, see the [Fivetran API authentication documentation][1].

### Add the Fivetran integration

To connect Fivetran to Datadog:

1. Navigate to the [Fivetran integration tile][2] and enter the following information:

   - API key
   - API secret

2. After you've entered these credentials, click **Save**.

## What's next

When your Fivetran account is successfully connected, Datadog syncs every 60 minutes and automatically derives column-level lineage from source system tables to your destination warehouse tables across all active connectors.

Initial syncs may take up to several hours depending on the number of connectors and schemas in your Fivetran account.

After syncing, you can explore your Fivetran-sourced tables and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://fivetran.com/docs/rest-api/getting-started
[2]: https://app.datadoghq.com/integrations/fivetran
[3]: https://app.datadoghq.com/datasets/catalog
[4]: https://docs.datadoghq.com/data_observability/quality_monitoring/data_warehouses
