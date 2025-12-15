---
title: Power BI
description: Connect Power BI to Datadog Data Observability to view end-to-end lineage from warehouse tables to dashboards.
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Learn about Data Quality monitoring'
---

## Overview

Datadog's Power BI integration helps data teams make changes to their data platform without breaking dashboards, and identify unused reports and dashboards to remove. When Datadog connects, it:

- Pulls metadata from your Power BI account like datasets, reports, and dashboards.
- Automatically generates lineage between warehouse tables with downstream datasets, reports, and dashboards.

## Connect Power BI

### Create an app registration and security group

#### App registration

1. Sign into Microsoft Azure.
2. Search for **App registrations**.
3. Click **New registration**.
4. Fill in required fields and register an application for Datadog.
5. Copy the Application (client) ID somewhere safe.
6. Find **Certificates & secrets** in sidebar.
7. Click **New client secret**.
8. Add a secret for Datadog.
9. Copy the secret value somewhere safe.

#### Security group

1. Search for **Azure Active Directory**.
2. Find **Groups** in the sidebar.
3. Click **New group**.
4. Create a group for the app registration.
5. Click into the newly created group. You may need to refresh the page for it to show up.
6. Find **Members** in the sidebar.
7. Click **Add members**.
8. Find the app registration created earlier and add it as a member.

### Grant access in Power BI

#### Enable API and admin API access for security group in Power BI Admin

1. Go to the Power BI Admin portal.
2. In Tenant settings, find **Developer settings**.
3. Enable **Allow service principals to use Power BI APIs** for your security group.
4. In Tenant settings, find **Admin API settings**.
5. Enable **Allow service principals to use read-only admin APIs** for your security group.
6. Enable **Enhance admin APIs responses with detailed metadata** for your security group.
7. Enable **Enhance admin APIs responses with DAX and mashup expressions** for your security group.

#### Grant access to workspaces

1. From the sidebar, click **Workspaces** to open the Workspaces pane.
2. For each workspace you want Datadog to have access to, open the **Access** panel by clicking the three vertical dots and selecting **Workspace access**.

### Add the Power BI integration

1. Navigate to the [Power BI integration tile][1] and enter your tenant ID, and the client ID and secret from earlier.

2. After you've entered these credentials, click **Save**.

## What's next

When your Power BI account is successfully connected, Datadog syncs and automatically derives lineage from warehouse tables/columns to Power BI datasets, reports, and dashboards.

Initial syncs may take up to several hours depending on the size of your Power BI deployment.

After syncing, you can explore your Power BI assets and their upstream dependencies in the [Data Observability Explorer][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/power-bi
[2]: https://app.datadoghq.com/datasets/catalog
