---
title: Metabase
description: Connect Metabase to Datadog Data Observability to view end-to-end lineage from warehouse tables to dashboards.
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Learn about Data Quality monitoring'
---

## Overview

Datadog's Metabase integration helps data teams make changes to their data platform without breaking Metabase dashboards, and identify unused cards or dashboards. When Datadog connects, it:

- Pulls metadata from your Metabase environment, including cards and dashboards.
- Automatically generates lineage between warehouse tables and columns and downstream Metabase cards, and between those cards and downstream dashboards.

## Connect Metabase

### Prerequisites

This integration requires a Metabase Pro or Enterprise plan.

### Generate an API key

[Follow these instructions][1] to generate an API key in Metabase.

### Get DNS alias (required for cloud instances only)

1. Log into your Metabase cloud instance as an administrator.
1. Click on the gear icon in the upper right corner.
1. Select **Admin settings**.
1. Go to the **Settings** tab.
1. Click on the **Cloud** tab from the left menu.
1. Click on **Go to the Metabase Store**.
1. Log into your Metabase Store using Metabase credentials.
1. Go to the **Instances** tab.
1. Click on the DNS alias section to get the DNS alias value.

### Get self-hosted instance domain (required for self-hosted instances only)

**Note**: Your self-hosted Metabase instance must be accessible from the internet through HTTPS only.

1. Log in to your Metabase instance as an administrator.
1. Click on the gear icon in the upper right corner.
1. Select **Admin settings**.
1. Go to the **Settings** tab.
1. Click on the **General** tab from the left menu.
1. Under **SITE URL**, copy the domain portion of the URL. For example, if the URL is `https://example.com`, copy `example.com`.

### Add the Metabase integration

1. Navigate to the [Metabase integration tile][2] and enter the following information:

   | Parameter | Description |
   |-----------|-------------|
   | Account name | Datadog-only account name associated with these credentials. |
   | Instance type | The hosting type of your Metabase instance. Valid values are `cloud` or `self-hosted`. Default is `cloud`. |
   | DNS alias | The DNS alias of your Metabase cloud instance (required for cloud instances only). Must be at least three characters long and contain only lowercase letters, dashes, and numbers. |
   | Self-hosted instance domain | The domain of your self-hosted Metabase instance (required for self-hosted instances only). Must be publicly accessible through HTTPS only (for example, `example.com`). |
   | Metabase API key | The API key used to authenticate the API requests. |

2. After you've entered these credentials, click **Save**.

## What's next

When your Metabase account is successfully connected, Datadog syncs and automatically derives lineage from warehouse tables/columns to Metabase cards and dashboards.

Initial syncs may take up to several hours depending on the size of your Metabase deployment.

After syncing, you can explore your Metabase assets and their upstream dependencies in the [Data Observability Explorer][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.metabase.com/docs/latest/people-and-groups/api-keys
[2]: https://app.datadoghq.com/integrations/metabase
[3]: https://app.datadoghq.com/datasets/catalog
