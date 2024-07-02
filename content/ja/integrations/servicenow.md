---
"categories":
- "alerting"
- "incidents"
- "issue tracking"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Datadog アラートからチケットを自動的に生成および更新"
"doc_link": "https://docs.datadoghq.com/integrations/servicenow/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/"
  "tag": "ブログ"
  "text": "Datadog アラートからの ServiceNow チケットの作成"
"git_integration_title": "servicenow"
"has_logo": true
"integration_id": ""
"integration_title": "ServiceNow"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "servicenow"
"public_title": "Datadog-ServiceNow Integration"
"short_description": "Have your Datadog alerts automatically generate and update tickets."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

ServiceNow is an IT service management platform for recording, tracking, and managing a company’s enterprise-level IT processes in a single location.

The Datadog ServiceNow integration is a two-way integration that allows you to:

- Push Datadog-generated events to ServiceNow tickets, as well as manage the resolution workflow from within Datadog through IT service management (ITSM) and IT operations management (ITOM)
- Use Datadog as a discovery mechanism for ServiceNow Configuration Management Database (CMDB) Configuration Items (CIs) with the service graph connector
- Enrich business-specific information stored as CIs in ServiceNow CMDB with your hosts and services information from Datadog, enabling you to better understand your infrastructure usage, accelerate troubleshooting, and maximize resource utilization

Datadog integrates with the following ServiceNow tools:

- ITOM
- ITSM
- CMDB

**Note**: The Datadog ServiceNow integration supports [ServiceNow releases][1] that are not listed as end of life.

### Configure the ServiceNow tile in Datadog

1. Navigate in Datadog to the [ServiceNow integration tile][2] on the Integrations page.
2. Click on **Add New Instance**.
3. Add the instance name, which is the subdomain of your ServiceNow domain: `<INSTANCE_NAME>.service-now.com`.
4. Add the username and password for your ServiceNow instance.

**Note**: You can create a limited user in ServiceNow just for Datadog.

{{< img src="integrations/servicenow/servicenow-configuration-new-instance-12-23.png" alt="servicenow integration new instance" >}}

## CMDB setup

### Service Graph Connector for Datadog

[Service Graph Connector for Observability - Datadog][3] can automatically populate server and database configuration items (CIs) in the CMDB for new resources discovered by Datadog. The Service Graph connector is available through the ServiceNow [store][4].

For configuration, follow the Service Graph Connector's guided setup instructions.

Supported CI Types:
* Server
* Amazon RDS

The notes below only apply if you have already configured the integration for ServiceNow ITOM/ITSM: 

* Service Graph Connector does not use the `Target table` and `Custom table` values from the configuration tile. You can save the integration with the Target table default values.
* The same ITOM/ITSM user can be used for Service Graph Connector by granting this user the role of cmdb_import_api_admin as described in the Service Graph Connector’s guided setup instructions.

### Host tagging

Enrich your Datadog hosts with ServiceNow CMDB metadata through host tagging.

To enable ingestion of host tags:
1. Configure a Query Builder query in your ServiceNow instance that returns all of the hosts you wish to tag in Datadog.
1. Schedule the query to execute at your desired refresh interval.
1. Once the query has been saved in ServiceNow, go to Datadog’s ServiceNow integration tile. Select the **Host Tagging** tab
1. Under **Query Configuration**, click the **Add New Row** button.
1. Select the **ServiceNow Instance** and the **Query** from the dropdown menus.
1. Select a value for the **Hostname Column** that maps your query's root CI hostname field to Datadog's hostname field.
1. Select any optional field name remapping with **Column Name Maps**.
1. Click Save.

Expect host tags to populate in Datadog shortly after your queries' scheduled executions.

{{< img src="integrations/servicenow/host-tags.jpg" alt="Screenshot of Host info tab showing ServiceNow host tags" >}}

Monitor the ingestion process in the Datadog [Events Explorer][5] by scoping your search query on `source:servicenow`.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="Screenshot showing one running ingestion" >}}

#### トラブルシューティング

For host tagging to work correctly, ensure that the following are true in your system:

- The user who created and executes the Query Builder query matches a username in your Datadog configuration. The user in ServiceNow must have the role `cmdb_query_builder_read`.
- The number of results returned by your query must be less than or equal to the `glide.cmdb.query.max_results_limit` setting in ServiceNow. By default, the maximum number of results is 10000. To change the setting, go to **Configuration** -> **CMDB Properties** -> **Query Builder Properties**.
- All CIs configured in your Query Builder query must have a **1** label. This ensures you have not created any duplicate CIs, which the parser does not support.

#### Limitations
- Ingestion is limited to 100k hosts per execution.
- Updates to hosts are throttled to a few thousand per hour. Take this limit into consideration when choosing your schedule interval.
- Tagging does not work for Linux machines with lower case host names, because host aliases in Datadog are case sensitive.

### Service ingestion

Enrich your Datadog Service Catalog with ServiceNow CMDB metadata through service ingestion.

With service ingestion, you can populate your Datadog [Service Catalog][6] with services from your ServiceNow CMDB.

#### セットアップ

To enable ingestion of service data:
1. Configure a [Query Builder][7] query in your ServiceNow instance that returns all of the services with which you wish to enrich the Service Catalog.
1. Schedule the query to execute at your desired refresh interval.
1. Once the query is saved in ServiceNow, go to Datadog’s ServiceNow integration tile. Select the **Service Ingestion** tab. 
1. Under **Query Configuration**, click the **Add New Row** button.
1. Select the **ServiceNow Instance** and the **Query** from the dropdown menus.
1. Select a value from the **Service Name Column** dropdown menu. The value matches the column name on your query's root service CI, and populates the service name in the service catalog.
1. Configure schema mappings to pull additional metadata about your service into the service catalog. See [Service definitions][8] for details. For Datadog to accept the ingestion, each field in the mapping needs to be of the correct type to map to the service catalog service definition schema.
1. Click **Save**.

Expect to see service data populated in Datadog a few minutes after your queries' scheduled executions. To view ingestion errors, go to the [Events Explorer][5] and search for events with `source:servicenow`.

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

#### トラブルシューティング

For service ingestion to work correctly, ensure that the following are true in your system:

- The user who created and executes the Query Builder query matches a username in your Datadog configuration. The user in ServiceNow must have the role `cmdb_query_builder_read`.
- The number of results returned by your query must be less than or equal to the `glide.cmdb.query.max_results_limit` setting in ServiceNow. By default, the maximum number of results is 10000. To change the setting, go to **Configuration** -> **CMDB Properties** -> **Query Builder Properties**.
- All CIs configured in your Query Builder query must have a **1** label. This ensures you have not created any duplicate CIs, which the parser does not support.

## ITOM and ITSM setup
{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
Case Management integration is not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
Incident Management インテグレーションは、{{&lt; region-param key=dd_datacenter code="true" &gt;}} サイトではサポートされていません。{{% /site-region %}}

To use the Datadog integration for Monitors, Case Management, and Incident Management, follow these steps:

1. [Install the latest Datadog Update Set](#install-the-datadog-update-set)
2. [Create a ServiceNow Account with correct permissions for Datadog](#create-a-servicenow-account-with-correct-permissions-for-datadog)
3. [Configure Datadog applications for use with ITOM and ITSM](#configure-datadog-applications-for-use-with-itom-and-itsm-modules)

### Install the Datadog update set

Download the latest Update Set here: [`Datadog-Snow_Update_Set_v2.5.1.xml`][9]

**Note**: Integration with Case Management is only supported with v2.4.0 and later. Integration with Incident Management and bidirectional syncing with Case Management is only supported with v2.5.0 and later.

In ServiceNow:

1. Manually import the Update Set XML file that you downloaded.
2. Once you import the XML file, the Update Set should show a state of `Loaded`. Click on the name of the Update Set to preview the changes.
3. Once you preview the Update Set to ensure there are no errors, select **Commit Update Set** to merge the application into your system.

After setup is complete, search **Datadog** in the ServiceNow navigation menu to access the five tables and Configuration Page for bidirectional syncing setup.
- `Configuration`
- `Datadog Incidents ITSM`
- `Datadog Cases ITOM`, formerly known as `Datadog Case Event`
- `Datadog Cases ITSM`, formerly known as `Datadog Case Incident`
- `Datadog Monitors ITOM`, formerly known as `Datadog Event`
- `Datadog Monitors ITSM`, formerly known as `Datadog Incident`


### Create a ServiceNow Account with correct permissions for Datadog

To use the integration, create a ServiceNow user (for example, with username “datadog”) and assign it all of the following roles:

- `x_datad_datadog.user` and
- `import_set_loader` and
- `import_transformer`

#### Send Monitor Notifications direct to ITOM and ITSM modules
If you'd like to send notifications directly to the ITOM module **Event** table or the ITSM module **Incident** table, the ServiceNow user needs both of the following roles:

- `ITIL` and
- `evt_mgmt_integration`

#### Sync bidirectionally with Datadog Case Management
If you’d like to sync incident state for resolution, the ServiceNow user needs one of the following roles:

- `ITIL` or
- `list_updater` or
- `sn_incident_write`

If you’d like to sync incident state for closure, the ServiceNow user needs the following role:
- `ITIL_admin`

**Note**: Manual updates made to a ticket in ServiceNow by this ServiceNow user will not be synced to Datadog.  

### Configure Datadog applications for use with ITOM and ITSM modules
**Note**: You must set up the ServiceNow tile in the Datadog integrations page before completing the following steps:

For Monitor Notifications using `@servicenow-<INSTANCE_NAME>` in Datadog, select the interim table to send notifications to in the ServiceNow tile. 

1. From the Monitor Notifications dropdown in the ServiceNow integration tile, select the table that monitor notifications will write to.
2. To validate the integration is set up correctly, add `@servicenow-<INSTANCE_NAME>` in a monitor or event notification. The raw data populates rows in the interim table and is forwarded to the ServiceNow table specified in the mappings and transformations you created.
3. [Use transform maps](#customize-data-with-transform-maps) in ServiceNow to customize the formatting for data sent to the tables.
4. Customize the notification payload with available Datadog variables or custom strings.

If you use Datadog's Case Management, you can select an interim table to sync cases in the ServiceNow tile (disabled by default).

1. From the Case Management dropdown, select the table for cases.
2. To validate the integration is set up correctly, navigate to Case Management in Datadog and select Create ServiceNow Incident. Choose the instance and optional assignment group, and then click Create.
3. [Use transform maps](#customize-data-with-transform-maps) in ServiceNow to customize the formatting for data sent to the tables.

**Note**: The `Datadog Cases ITOM` table is not set up for updates. The `Datadog Cases ITSM` table is recommended for this version.

{{< img src="integrations/servicenow/servicenow-itxm-tile-setup-2024.png" alt="An instance in the ServiceNow integration tile with monitor notifications, custom notification payloads, and case management" >}}

#### Sync state and comments bidirectionally with Case Management

To allow edits in ServiceNow to update their associated cases in Datadog, a ServiceNow user with the `x_datad_datadog.user` role and `admin` role must configure the installation settings for the **ITOM/ITSM Integration for Datadog** app in ServiceNow:

1. Navigate to the configuration settings page for the **ITOM/ITSM Integration for Datadog** app by clicking **All** in the upper-left hand corner, typing `ITOM/ITSM Integration for Datadog` into the filter, and clicking the **Configuration** link that appears in the filtered list.
1. Choose your Datadog Data Center site.
1. Paste a Datadog API Key, which can be found in your **Organization Settings**, in the **API Key** field.
1. Paste a Datadog Service Account Application Key, which can be found in your **Organization Settings**, in the **Application Key** field.
1. Check the Enabled checkbox and save your configuration changes.

After configuring the installation settings in ServiceNow, return to Datadog Case Management to [configure the integration][10].

**Note**: It is important to use a Service Account Application Key for this setup rather than a user's Application Key. A user's Application Key is tied to the user's account permissions. If the user's permissions are reduced or if the user is deactivated, bidirectional syncing between ServiceNow and Datadog will stop. A Service Account Application Key is not tied to an individual user, so bidirectional sync will not be impacted by user account changes.

{{< img src="integrations/servicenow/datadog_sync_configuration.png" alt="Configuration Settings in ServiceNow to sync ServiceNow changes in Datadog" >}}

#### Customize data for Monitor Notifications with transform maps

The **Datadog Monitors ITSM** and **Datadog Cases ITSM** tables use a transform map to transform Datadog records into ServiceNow incidents. 
Similarly, the **Datadog Monitors ITOM** and **Datadog Cases ITOM** transform Datadog records into ServiceNow events.

The **Datadog Monitors ITOM** and **Datadog Monitors ITSM** tables use transform maps to transform Datadog records into ServiceNow events and incidents respectively. You can customize the ServiceNow events and incidents information in these tables by customizing the notification payload in the Datadog Configuration Tile and extending the transform maps in ServiceNow.

**Note**: The **Datadog Cases ITOM** and **Datadog Cases ITSM** tables similarly use transform maps; however, transform map customization is not recommended for use with Case Management given the payload for Datadog cases is not customizable.

## Troubleshooting

If you're not seeing events in your ServiceNow tables and instead have

- An error message in your Datadog integration tile or an `Error while trying to post to your ServiceNow instance` notification:

  - Verify only the subdomain was used when entering your instance name.
  - Verify the user you created has the required permissions.
  - Verify the username and password are correct.

- The integration is configured, an alert triggered, and no ticket is created:

  - Confirm that the interim table is populated. If so, the issue is with mappings and transformations. You can debug your mappings and scripts further by navigating to **Transform Errors** in ServiceNow.
  - Confirm that you're working with the interim table you specified in the tile.

  The ServiceNow user needs `rest_service` and `x_datad_datadog.user` roles so that it can access the import tables. If you're using the legacy way of sending notifications directly to either the Incident table or Event table, you need the permissions `itil` and `evt_mgmt_integration`.

Need additional help? Contact [Datadog support][11].

## Knowledge base

### Datadog import host auto-flush rule

To prevent the import set table `x_datad_datadog_import_host` from accumulating too many rows, an auto-flush rule has been added to the Table Cleaner tool to keep only the last 24 hours of data. This configuration setting can be changed as needed by navigating to `sys_auto_flush_list.do` in the filter navigator and going into the rule for the `x_datad_datadog_import_host` table. The `Age in seconds` field can be updated accordingly.

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="Integration Configuration Settings" >}}

### Auto-generate support tickets from Datadog alerts

After ServiceNow is connected to your Datadog account, alerts received can automatically create support tickets and send them to the ServiceNow ticketing queue. From there, your support team is notified of issues using the communication workflows that you have already established inside ServiceNow. Mention `@servicenow` in the alert message or add `@servicenow` to the notification list for that monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### Use variables in ticket payload and field mappings

Variables can be used in the body of your alerts or in field mappings to ensure details from the event are included in ServiceNow. For example, you can include the title and severity in the appropriate ServiceNow field or you can include a link back to the specific incident in Datadog right from the ServiceNow ticket.

{{< img src="integrations/servicenow/servicenow-variables-form.png" alt="ServiceNow Variables input form" >}}

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow Variables" >}}

### Incident Priority field mapping

The `priority` field in ServiceNow incidents is _read only_ and can only be updated using [priority lookup rules][12].

Define `Impact` and `Urgency` in monitors to calculate the ServiceNow incident priority.

{{< img src="integrations/servicenow/servicenow-priority-field-mapping.png" alt="ServiceNow Priority Field Mapping" >}}

### Automate support resolution workflow

Once the monitor state returns to normal, the associated support ticket is automatically marked as “resolved”.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow Resolved" >}}

### Defining custom mappings

Click one of the tables, for example **Datadog Monitors ITSM Tables**, and scroll to the bottom of the record to see the link for the associated transform map.

### Understanding the mapping

Click on the name of the transform map to view the record:

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="servicenow integration" >}}

At the top are two important fields on the Transform record - `Source table` and `Target table`:

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="servicenow integration" >}}

**Notes**:

- The source is the import set table you selected (Datadog Monitors ITSM Tables) and the target is your actual incident table (or event table) where events are stored.
- The field mappings are at the bottom of the record. Some basic mappings are included. This is where you select the fields to include, define the format, and select the target fields in your ServiceNow instance.

### Add a new field mapping

Click **New**:

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="servicenow integration" >}}

Select the source and target fields for one to one mappings:

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="servicenow integration" >}}

Or, check the **Use source script** box and define transformations:

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="servicenow integration" >}}

**Note:** For mapping any custom fields in the Integration Tile, you can use the following mapping script for either the Datadog Monitors ITOM and Datadog Monitors ITSM Transform maps. In this example, the field `my_field` was defined as a custom field in the integration tile:
```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.custom_my_field;
})(source);
``` 

### Define multiple mappings

Use **Mapping Assist** (under Related Links) to map several source and target fields:

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="servicenow integration" >}}

### Validation

To validate the integration is set up correctly, add `@servicenow` in a monitor or event notification. The raw data populates rows in the interim table and is forwarded to the ServiceNow table specified in the mappings and transformations you created.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: https://app.datadoghq.com/integrations/servicenow
[3]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[4]: https://store.servicenow.com/
[5]: https://app.datadoghq.com/event/explorer
[6]: https://docs.datadoghq.com/tracing/service_catalog/
[7]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[8]: https://docs.datadoghq.com/tracing/service_catalog/adding_metadata/
[9]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.5.1.xml
[10]: https://docs.datadoghq.com/service_management/case_management/settings#servicenow
[11]: https://docs.datadoghq.com/help/
[12]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html

