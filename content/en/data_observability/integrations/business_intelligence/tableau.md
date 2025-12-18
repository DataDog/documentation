---
title: Tableau
description: Connect Tableau to Datadog Data Observability to view end-to-end lineage from warehouse tables to dashboards.
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Learn about Data Quality monitoring'
---

## Overview

Datadog's Tableau integration helps data teams make changes to their data platform without breaking dashboards, and identify unused workbooks and data sources to remove. When Datadog connects, it:

- Pulls metadata from your Tableau site like fields, worksheets, dashboards, workbooks, and data sources
- Automatically generates lineage between warehouse tables/columns with downstream Tableau fields, worksheets, dashboards, and workbooks.

## Connect Tableau

### Tableau requirements

In order for Datadog to extract your metadata from Tableau, you must meet all of the [Tableau Metadata GraphQL][1] requirements:

- Tableau Cloud/Server v2019.3+
- Tableau REST API must not be disabled
- The Metadata API must be [enabled][2]

### Create a personal access token

For details on how to create a Personal Access Token (PAT), see the [Tableau Documentation][3]. Scope the PAT to the target site if needed.

### Add the Tableau integration

To connect Tableau to Datadog:

1. Navigate to the [Tableau integration tile][4] and enter the following information:

   - Account name (for use within Datadog only)
   - Site name (optional, leave blank to use the default site)
   - Server version (example: 2025.2.0). Find this in your Tableau Server or Cloud admin settings.
   - Server endpoint (example: https://prod-useast-b.online.tableau.com)
   - Token name
   - Token value

2. After you've entered these credentials, click **Save**.

## What's next

When your Tableau account is successfully connected, Datadog syncs and automatically derives lineage from warehouse tables/columns to Tableau fields, worksheets, dashboards, workbooks, and data sources.

Initial syncs may take up to several hours depending on the size of your Tableau deployment.

After syncing, you can explore your Tableau assets and their upstream dependencies in the [Data Observability Explorer][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.tableau.com/current/api/metadata_api/en-us/index.html#metadata-api-and-graphql
[2]: https://help.tableau.com/current/api/metadata_api/en-us/docs/meta_api_start.html#enable-the-tableau-metadata-api-for-tableau-server
[3]: https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#create-and-revoke-personal-access-tokens
[4]: https://app.datadoghq.com/integrations/tableau
[5]: https://app.datadoghq.com/datasets/catalog