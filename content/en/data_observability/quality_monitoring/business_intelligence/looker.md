---
title: Looker
description: Connect Looker to Datadog Data Observability to view end-to-end lineage from warehouse tables to dashboards and Looks.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Looker integration helps data teams make changes to their data platform without breaking dashboards and Looks, and identify unused content to remove. When Datadog connects, it:

- Pulls metadata from your Looker instance, including projects, models, explores, views, dashboards, Looks, and folders
- Automatically generates lineage between warehouse tables and columns and downstream Looker explores, dashboards, and Looks

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

## What's next

When your Looker instance is successfully connected, Datadog syncs every 60 minutes and automatically derives lineage from warehouse tables and columns to Looker explores, dashboards, and Looks.

Initial syncs may take up to several hours depending on the size of your Looker deployment.

After syncing, you can explore your Looker assets and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/looker/docs/api-auth
[2]: https://app.datadoghq.com/integrations/looker
[3]: https://app.datadoghq.com/datasets/catalog
