---
title: Hex
description: Connect Hex to Datadog Data Observability to view field-level lineage from warehouse tables to Hex projects and SQL cells.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Hex integration helps data teams view end-to-end lineage between warehouse tables and Hex projects. The integration collects metadata and field-level lineage for objects in your Hex workspace. When Datadog connects, it:

- Pulls metadata from your Hex workspace, including projects and SQL cells
- Generates field-level lineage between warehouse tables and columns and downstream Hex projects and SQL cells
- Derives lineage for all [supported data warehouse destinations][1]

## Setup

### Create a Hex workspace token

1. In your Hex workspace settings, go to the {{< ui >}}API keys{{< /ui >}} page.
2. Click {{< ui >}}New Token{{< /ui >}} to generate a workspace token.
3. Provide a description and an expiration time frame. Datadog recommends setting up a token with no expiration.
4. For the API scopes, select {{< ui >}}Read Access{{< /ui >}} under {{< ui >}}Projects{{< /ui >}}, {{< ui >}}Cells{{< /ui >}}, and {{< ui >}}Data connections{{< /ui >}}.

### Add the API credentials to Datadog

1. Navigate to the [Hex integration tile][2].
2. Click {{< ui >}}Configure{{< /ui >}} > {{< ui >}}+ Add New Account{{< /ui >}}.
3. Fill out the form with the following:
   - {{< ui >}}API Token{{< /ui >}}: The token from the previous step
   - {{< ui >}}Workspace URL{{< /ui >}}: Required only if you are a single-tenant, EU multi-tenant, or HIPAA multi-tenant customer. Leave empty otherwise.
4. Click {{< ui >}}Save{{< /ui >}}.

## What's next

It can take up to 60 minutes for data to appear after the initial setup.

After syncing, you can explore your Hex projects and their upstream warehouse dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/data_warehouses
[2]: https://app.datadoghq.com/integrations/hex
[3]: https://app.datadoghq.com/data-obs/catalog
