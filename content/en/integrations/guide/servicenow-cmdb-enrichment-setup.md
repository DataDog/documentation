---
title: Set up ServiceNow CMDB Enrichment
further_reading:
- link: "/integrations/servicenow/"
  tag: "Documentation"
  text: "ServiceNow integration"
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog
  tag: Blog
  text: Manage your infrastructure with ServiceNow CMDB and Datadog
---

## Overview

The **ServiceNow Integration** uses ServiceNow's Configuration Management Database (CMDB) to enrich and contextualize your data within Datadog. This integration provides the following key capabilities:

- [**Host Tagging**](#host-tagging): Enriches Datadog hosts with metadata from the ServiceNow CMDB, which allows for improved data organization and filtering.
- [**Service Tagging**](#service-tagging): Populates the Datadog Service Catalog with services and their associated metadata from the ServiceNow CMDB.
- [**Network Device Tagging**](#network-device-tagging): Adds tags to network devices monitored by Datadog, using metadata from the ServiceNow CMDB.
- [**Reference Tables**](#reference-tables): Automatically enriches logs and events in Datadog with additional fields from ServiceNow CIs by mapping value fields to a primary key.

## Setup

Before configuring the integration, ensure you have the [ServiceNow tile configured][10] with your ServiceNow instance in Datadog.

## Host tagging

Enrich your Datadog hosts with ServiceNow CMDB metadata through host tagging.
To enable ingestion of host tags:

1. In ServiceNow, configure a [Query Builder][1] query that returns all of the hosts you wish to tag in Datadog. Schedule the query to execute at your desired refresh interval and save it.
1. Navigate to Datadog's ServiceNow integration tile. In the **Configure** section, in the **CMDB Enrichment** tab, select **Host Tagging**.
1. Under **Query Configuration**, click **Add New Query**.
1. Select the **ServiceNow Instance** and the **Query** from the dropdown menus.
1. Select a value for the **Hostname Column** that maps your query's root CI hostname field to Datadog's hostname field. The dropdown options come from the starting node of your querybuilder query.
1. Select any optional field name remapping with **Column Name Maps**. By default, tags are applied to the host in the format `tagName:columnValue`, where `tagName` is a combination of the table name and the column name.
1. Click **Save**.

Expect host tags to populate in Datadog shortly after your queries' scheduled executions. You can monitor the ingestion process in the Datadog [Events Explorer][2] by searching for `source:servicenow`.

### Additional Non-CMDB field tagging

Some ServiceNow tables are non-CMDB and cannot be selected in the Query Builder. To enrich Datadog hosts with tags from these tables, click **Additional Fields** on the configuration tile and configure a host tagging query as described above, providing a full dot-walked path. Paths should start from the first attribute name on the root table configured for the query. For example, entering `vendor.manufacturer.name` for a query with root CI `cmdb_ci_server` populates hosts with the tag `cmdb_ci_server_manufacturer_name`.

**Note**: Only dot-walkable paths that are supported by the ServiceNow Table API are available for use in Additional Fields. Many-to-many relationships may not work out of the box and may require additional configuration.

## Service tagging

Enrich your Datadog Service Catalog with ServiceNow CMDB metadata through service tagging.
With service tagging, you can populate your Datadog [Service Catalog][3] with services from your ServiceNow CMDB.

To enable ingestion of service data:

1. In ServiceNow, configure a [Query Builder][1] query that returns all of the services with which you wish to enrich the Service Catalog. Schedule the query to execute at your desired refresh interval and save it.
1. Navigate to Datadog's ServiceNow integration tile. In the **Configure** section, in the **CMDB Enrichment** tab, select **Service Tagging**.
1. Under **Query Configuration**, click **Add New Query**.
1. Select the **ServiceNow Instance** and the **Query** from the dropdown menus.
1. Select a value from the **Service Name Column** dropdown menu. The value matches the column name on your query's root service CI, and populates the service name in the service catalog.
1. Configure schema mappings to pull additional metadata about your service into the service catalog. See [Service definitions][4] for details. For Datadog to accept the ingestion, each field in the mapping needs to be of the correct type to map to the service catalog service definition schema.
1. Click **Save**.

Expect to see service data populated in Datadog a few minutes after your queries' scheduled executions. To view ingestion errors, go to the [Events Explorer][2] and search for events with `source:servicenow`.

## Network device tagging

Add tags to your network devices in Datadog populated with data from your ServiceNow CMDB.

With device tagging, you can dynamically enrich network devices monitored by Datadog [Network Device Monitoring][5] with device metadata from your ServiceNow CMDB.

To enable ingestion of device tags:

1. Configure a [Query Builder][1] query in your ServiceNow instance. Make sure it is returning the device IP address. Schedule the query to execute at your desired refresh interval.
1. If you are using a custom IP namespace in Datadog, you need to add it to ServiceNow. Create a column on the Network device CI called `u_dd_device_namespace`, populated by the corresponding namespace for each device. If this column is not present, ServiceNow uses the default namespace.
1. After the query is saved in ServiceNow, go to Datadog's ServiceNow integration tile. In the **Configure**  section, in the **CMDB Enrichment** tab, select **Device Tagging**.
1. Under **Query Configuration**, click **Add New Query**.
1. Select the **ServiceNow Instance** and the **Query** from the dropdown menus.
1. Select the **IP Address** column that maps your query's IP Address field to Datadog's IP Address field.
1. Select any optional field name remappings.
1. Click **Save**.

You can expect to see network device tags populated in Datadog within a few minutes after your queries' scheduled executions. Any ingestion errors are reported through events viewable in your events explorer.

You can monitor the ingestion process in the Datadog [Events Explorer][2] by scoping your search query on `source:servicenow`.

## Reference Tables

Use [Reference Tables][7] to automatically enrich logs and events with additional fields from your ServiceNow CIs. With Reference Tables, you can map sets of value fields to a primary key, such as a hostname, and automatically append these fields to all logs or events that contain the specified key.
To enable ingestion of Reference Tables:

1. Configure a [Query Builder][8] query in your ServiceNow instance. Schedule the query to run at your desired refresh interval and save it.
1. Select **Add New Query** and choose your query from the dropdown menu.
1. In the primary key dropdown, select the column name you want to use as your primary key.<br />Optionally, create a [Processing Pipeline][9] with this primary key to enrich and correlate logs and events.
1. Enter a name for your reference table. The Reference Table name must be unique.
1. Click **Save**. The [Reference Table][7] populates with the data from the query shortly after saving.

### Additional non-CMDB fields in Reference Tables

Some ServiceNow tables are non-CMDB and cannot be selected in the Query Builder. To include data from these tables, you can use **Additional Fields** by specifying a **full dot-walked path**. These fields are added as extra columns to the reference table, along with the ones defined by the Query Builder.

**Note**: Only paths supported by the ServiceNow Table API are available for use in Additional Fields. The generated columns are based on the root table name and the last two columns of the field spec. For example, `vendor.manufacturer.name` generates a column named `cmdb_ci_server_manufacturer_name`, and `location.city` generates a column named `cmdb_ci_server_location_city` assuming a root table of `cmdb_ci_server`.

## Troubleshooting

For tagging to work correctly, ensure that the following are true in your system:

- The user who created and executes the Query Builder query matches a username in your Datadog configuration. The user in ServiceNow must have the role `cmdb_query_builder_read`.
- The number of results returned by your query must be less than or equal to the `glide.cmdb.query.max_results_limit` setting in ServiceNow. By default, the maximum number of results is 10000. To change the setting, go to **Configuration** > **CMDB Properties** > **Query Builder Properties**.
- All CIs configured in your Query Builder query must have a `1` label. This ensures you have not created any duplicate CIs, which the parser does not support.

## Limitations

- Ingestion is limited to 100k hosts per execution.
- Updates to hosts and devices are throttled to a few thousand per hour. Take this limit into consideration when choosing your schedule interval.
- Host aliases in Datadog are case sensitive. Your ingested CMDB hostnames must exactly match the corresponding hostnames in Datadog.
- Network device tagging is limited to [SNMP devices][6].
- Deletions and schema updates of existing tables are not supported.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[2]: https://app.datadoghq.com/event/explorer
[3]: https://docs.datadoghq.com/tracing/service_catalog/
[4]: https://docs.datadoghq.com/tracing/service_catalog/adding_metadata/
[5]: https://docs.datadoghq.com/network_monitoring/devices/
[6]: https://docs.datadoghq.com/network_monitoring/devices/snmp_metrics/
[7]: https://app.datadoghq.com/reference-tables
[8]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[9]: https://app.datadoghq.com/event/pipelines
[10]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog