---
title: Looker
description: Connect Looker to Datadog Data Observability to view column-level lineage from warehouse tables to Looker explore fields, dashboards, and Looks.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Looker integration helps data teams make changes to their data platform without breaking dashboards and Looks, and identify unused content to remove. When Datadog connects, it:

- Pulls metadata from your Looker instance, including projects, models, explores, views, dashboards, Looks, and folders
- Automatically generates column-level lineage between warehouse columns and downstream explore and view fields, dashboards, and Looks
- Parses LookML files directly from your linked Git repositories to extract richer lineage and metadata, including derived tables, view extensions, and refinements

## Connect Looker

### Create an API key

To create a Looker API key, follow the [Looker API authentication documentation][1]. Store the client ID and client secret, as you need them in the next step.

### Add the Looker integration

To connect Looker to Datadog:

1. Navigate to the [Looker integration tile][2] and enter the following information:

   - Instance URL (for example: `https://company.cloud.looker.com`)
   - Client ID
   - API secret

2. After you've entered these credentials, click **Save**.

### Connect LookML repositories

Datadog parses LookML files directly from your Git repositories to collect lineage and metadata for Looker views and derived tables. This enables deeper lineage extraction, including SQL-based derived tables, `extends` relationships, and view refinements.

To enable LookML parsing:

1. Connect your LookML Git repositories using the [Source Code Integration][4].
2. After your repositories appear on the [repositories page][5], the Looker integration automatically detects and parses LookML files on its hourly schedule.

No additional configuration is required. The integration scans all `.lkml` files in connected repositories and resolves view inheritance and refinements.

## What's next

After your Looker instance is successfully connected, Datadog syncs every 60 minutes and automatically derives column-level lineage from warehouse columns to Looker explore and view fields, dashboards, and Looks.

Initial syncs may take up to several hours depending on the size of your Looker deployment.

After syncing, you can explore your Looker assets and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/looker/docs/api-auth
[2]: https://app.datadoghq.com/integrations/looker
[3]: https://app.datadoghq.com/data-obs/catalog
[4]: https://app.datadoghq.com/integrations/github
[5]: https://app.datadoghq.com/source-code/repositories
