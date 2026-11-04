---
title: Microsoft Fabric Warehouse
description: "Connect Microsoft Fabric Warehouse to Datadog Data Observability to monitor data quality, track usage, and detect issues."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
  - link: '/integrations/azure/'
    tag: 'Documentation'
    text: 'Azure integration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for Microsoft Fabric Warehouse is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The Microsoft Fabric Warehouse integration connects Datadog to your Fabric warehouses to sync metadata, query history, and table-level metrics. Use it to monitor data quality, detect anomalies, and trace lineage across your warehouses.

Datadog authenticates to Fabric with the app registration (service principal) configured in your Datadog Azure integration. Datadog uses the Fabric REST API to discover workspaces and warehouses. It then connects to each warehouse's SQL endpoint to read metadata, run data quality queries, and read query history from [Query Insights][1].

## Prerequisites

Before you begin, make sure you have:

- The [Datadog Azure integration][2] configured with an app registration. Log forwarding and metric collection are not required for Data Observability.
- A Fabric administrator who can view and change tenant settings.
- The Admin or Member role on each Fabric workspace you want to monitor.
- Warehouses that run on an active capacity and accept connections from the public internet.

## Grant Datadog access in Fabric

### Step 1: Check the tenant setting

1. In Fabric, open the [tenant settings][3].
2. Under {{< ui >}}Developer settings{{< /ui >}}, expand {{< ui >}}Service principals can call Fabric public APIs{{< /ui >}}.
3. Make sure the setting is enabled. It is enabled by default for new Fabric tenants.
4. If the setting applies to {{< ui >}}Specific security groups{{< /ui >}}, add the Datadog Azure integration's app registration to one of those groups.

### Step 2: Add the app registration to your workspaces

For each workspace you want to monitor:

1. In Fabric, open the workspace and click {{< ui >}}Manage access{{< /ui >}}.
2. Click {{< ui >}}Add people or groups{{< /ui >}}.
3. Enter the name of the app registration that the Datadog Azure integration uses.
4. Select {{< ui >}}Contributor{{< /ui >}} or {{< ui >}}Viewer{{< /ui >}}, then click {{< ui >}}Add{{< /ui >}}.

Choose a role based on the features you need:

{{< tabs >}}
{{% tab "Contributor (recommended)" %}}

The Contributor role supports all Data Observability features for Fabric Warehouse, including query history and lineage. Microsoft requires the Contributor role or higher to read [Query Insights][101].

**Note**: The Contributor role grants `CONTROL` on every warehouse in the workspace, which includes write access. Datadog runs only read queries.

[101]: https://learn.microsoft.com/fabric/data-warehouse/query-insights

{{% /tab %}}
{{% tab "Viewer" %}}

The Viewer role grants read-only access to every warehouse in the workspace. It supports metadata sync and data quality monitors, but not query history or lineage. Leave {{< ui >}}Collect query history{{< /ui >}} turned off when you [configure the integration][1].

SQL-level restrictions such as `DENY` statements, row-level security, column-level security, and dynamic data masking apply to the app registration. Tables and columns the role can't read don't appear in Datadog, and monitors on them fail.

[1]: #configure-the-integration-in-datadog
{{% /tab %}}
{{< /tabs >}}

The workspace role applies to every warehouse in the workspace, including warehouses created later. You don't need to share individual warehouses or run `GRANT` statements.

You can also assign the role to a Microsoft Entra security group that contains the app registration. Role assignments through a group can take up to an hour to take effect.

## Configure the integration in Datadog

1. In Datadog, go to {{< ui >}}Datadog Data Observability{{< /ui >}} > [{{< ui >}}Settings{{< /ui >}}][4].
2. In the {{< ui >}}Microsoft Fabric Warehouse{{< /ui >}} section, click {{< ui >}}Configure{{< /ui >}}.

   {{< img src="data_observability/fabric/data_obs_fabric_on_integrations_page.png" alt="The Microsoft Fabric Warehouse row on the Data Observability Settings page, with a Configure button." style="width:100%;" >}}

   If the section shows {{< ui >}}Install Azure integration{{< /ui >}}, configure the [Datadog Azure integration][2] with an app registration first.

3. Select the app registration that you added to your workspaces, and click {{< ui >}}Configure{{< /ui >}}.

   {{< img src="data_observability/fabric/data_obs_fabric_select_app_registration.png" alt="The list of Azure app registrations for Microsoft Fabric Warehouse, with a Configure button for each." style="width:100%;" >}}

4. Turn on {{< ui >}}Monitor Fabric Warehouses{{< /ui >}}.
5. Optionally, add {{< ui >}}Warehouse filters{{< /ui >}}. Leave the field empty to monitor every warehouse the app registration can access, or enter one filter per warehouse:
   - `<WAREHOUSE_NAME>`: Matches a warehouse with this name in any workspace.
   - `<WORKSPACE_ID>/<WAREHOUSE_NAME>`: Matches a warehouse in one workspace. The workspace ID appears in the workspace URL after `/groups/`.
6. Optionally, turn on {{< ui >}}Collect query history{{< /ui >}} to collect query history from Query Insights for lineage and query analysis. This option requires the Contributor role or higher.

   {{< img src="data_observability/fabric/data_obs_fabric_configure.png" alt="The Monitor Fabric Warehouses and Collect query history toggles, with an optional warehouse filters field." style="width:100%;" >}}

7. Click {{< ui >}}Save{{< /ui >}}.

## Next steps

After you configure the integration, Datadog syncs your warehouse metadata every hour. Allow up to an hour for the first sync. Queries can take up to 15 minutes to appear in Query Insights before Datadog collects them.

After the initial sync completes, create a [Data Observability monitor][5] to start alerting on row count, column-level metrics, and custom SQL metrics. Fabric doesn't expose a table-level last-modified time, so to monitor freshness, create a freshness monitor on a timestamp column.

## Troubleshooting

Changes to workspace roles can take up to an hour to apply in Fabric. If you recently added, changed, or removed a role, wait before troubleshooting.

If warehouses or tables are missing, verify the following:

- The app registration has a role on the workspace that contains the warehouse.
- The warehouse matches one of the configured warehouse filters.
- The warehouse's capacity is running.
- For the Viewer role, no SQL-level restriction hides the table from the app registration.

If Datadog reports invalid credentials, verify the client ID, tenant ID, and client secret in the Datadog Azure integration.

If Datadog reports a failed SQL login, verify that the app registration has a role on the workspace. Fabric rejects SQL logins from identities without a workspace role.

If query history fails with a permissions error, assign the app registration the Contributor role or higher on the workspace.

## Limitations

- Only Fabric Warehouse items are supported. Lakehouse SQL analytics endpoints, SQL databases in Fabric, and other Fabric item types are not supported.
- Workspaces that restrict inbound public access, such as workspaces that use private links, are not supported.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/fabric/data-warehouse/query-insights
[2]: /integrations/azure/
[3]: https://learn.microsoft.com/fabric/admin/about-tenant-settings#how-to-get-to-the-tenant-settings
[4]: https://app.datadoghq.com/data-obs/settings/integrations
[5]: /monitors/types/data_observability/
