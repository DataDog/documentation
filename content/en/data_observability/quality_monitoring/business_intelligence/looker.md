---
title: Looker
description: Connect Looker to Datadog Data Observability to view field-level lineage from warehouse tables to Looker explore fields, dashboards, and Looks.
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

Datadog's Looker integration helps data teams make changes to their data platform without breaking dashboards and Looks, and identify unused content to remove. The integration collects metadata and field-level lineage for objects in your Looker account. When Datadog connects, it:

- Pulls metadata from your Looker instance, including projects, models, explores, views, dashboards, Looks, and folders
- Generates field-level lineage between warehouse tables and columns and downstream Looker views and derived tables, and between Looker views and other Looker objects such as dashboards and explores
- Parses LookML files directly from your linked Git repositories to extract richer lineage and metadata, including derived tables, view extensions, and refinements

## Setup

### Create a Looker API key

1. Go to your Looker dashboard (for example, at `https://<your_company>.cloud.looker.com`).
2. Navigate to **Admin** > **Users**.
3. Select the user you want to create an API key for.
4. Next to **API Keys**, click **Edit Keys**.
5. Click **New API Key**.
6. Copy the client ID and secret.

### Add the API credentials to Datadog

1. Navigate to the [Looker integration tile][2].
2. Click **Configure** > **+ Add New Account**.
3. Fill out the form with the following:
   - **Account name**: A label to identify this Looker instance
   - **Instance URL**: The URL of your Looker instance (for example, `https://company.cloud.looker.com`)
   - **Client ID**: The client ID from the previous step
   - **API Secret**: The client secret from the previous step
4. Click **Save**.

### Connect LookML repositories

Datadog parses LookML files to collect lineage and metadata for Looker views and derived tables.

Connect each LookML Git repository to Datadog using the [Source Code Integration][4]. The next time the Looker integration runs on its hourly schedule, it automatically detects the repositories and parses the LookML files.

If your Git repositories already appear on the Datadog [repositories page][5], no additional steps are required.

## What's next

It can take up to 60 minutes for data to appear after the initial setup.

After syncing, you can explore your Looker assets and their upstream dependencies in the [Data Observability Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/looker/docs/api-auth
[2]: https://app.datadoghq.com/integrations/looker
[3]: https://app.datadoghq.com/data-obs/catalog
[4]: https://app.datadoghq.com/integrations/github
[5]: https://app.datadoghq.com/source-code/repositories
