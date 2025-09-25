---
title: Set up ServiceNow ITOM and ITSM
further_reading:
- link: "/integrations/servicenow/"
  tag: "Documentation"
  text: "ServiceNow integration"
---
ServiceNow's ITOM/ITSM integration allows you to send alerts, cases, and incidents generated in Datadog to ServiceNow as records in the Incident or Event tables. The integration relies on interim tables and transform maps.

To use the integration, follow the instructions to install the integration, and then configure the integration for each product:
1. [Install the ITOM/ITSM integration](#install)
1. Configure the integration
   1. [Configure Datadog templated monitor notifications](#monitor-notifications)
   1. [Configure Datadog Case Management](#case-management)
   1. [Configure Datadog Incident Management](#incident-management)
1. [Customize data with transform maps](#transform-maps)

## Install the ITOM/ITSM integration {#install}
There are two ways to install the integration:
- Datadog recommends installing the latest version of the [ITOM/ITSM Integration for Datadog][1] integration from the ServiceNow store.
- Alternatively, you can download the latest Update Set ([Datadog-Snow_Update_Set_v2.7.2.xml][2]) and upload it to your ServiceNow instance manually.

Before proceeding, make sure you have [added your ServiceNow instance][3] into your ServiceNow tile in Datadog.

## Configure the integration

### Configure templated monitor notifications {#monitor-notifications}

<div class="alert alert-info">These features require ITOM/ITSM integration version 2.6.0 or newer.</a></div>

#### Configure instance priority mapping

By default, Datadog doesn't include ServiceNow impact and urgency levels when sending events to ServiceNow. For each ServiceNow configuration, you can configure mappings between those ServiceNow levels and Datadog's Monitor Priority levels for inclusion in Datadog-generated events.

1. In Datadog, go to the [ServiceNow integration settings][4] page.
1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Monitors** tab.
1. Under **Instance Priority Mapping for Templates**, open the settings for your ServiceNow instance.
1. Turn on the **Use Instance Priority Mapping** toggle.
1. In the **ServiceNow Urgency** and **ServiceNow Impact**, select the levels you want to correspond with Datadog's Monitor Priority levels. For example:
   - Impact: 4
   - Urgency: 5
1. Click **Update**.

#### Create a custom ServiceNow @-handle for monitor notifications

To create a ServiceNow record from a monitor, you need to configure an @-handle to use within the monitor notification rules or notification recipients.

1. In Datadog, go to the [ServiceNow integration settings][4] page.
1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Monitors** tab.
1. Beside **Templates**, click **+ New** to create a new template.
1. Define an @-handle **Name**, **Instance**, and **Target Table** for the monitor notification to be delivered to. 
1. Optionally, you can also set **Assignment Group**, **Business Service**, and/or **User** in the template.<br /> **Note**: If you set both an assignment group and user, the user must belong to the selected assignment group for the ServiceNow record creation to successfully complete.
1. Optionally, you can add additional variables from Datadog by expanding the **Customize notification payload** section and clicking **Add field**.
1. Click **Save**.

To use the new template, add `@servicenow-<TEMPLATE_NAME>` in a monitor description. When the monitor alerts, ServiceNow also creates a corresponding record, and automatically sets it to **Resolved** when the underlying alert recovers.

{{% collapse-content title="Configure legacy monitor notifications" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
To configure legacy monitor notifications using `@servicenow-<INSTANCE_NAME>`:

1. In Datadog, go to the [ServiceNow integration settings][4] page.
1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Monitors** tab.
1. Under **Manage Legacy Monitor Notifications**, select the instance you want to configure notifications for, then select the table that legacy monitor notifications write to.
1. To validate the integration is set up correctly, add `@servicenow-<INSTANCE_NAME>` in a monitor or event notification, and define both the `Impact` and `Urgency` values so ServiceNow can use them to calculate the incident priority. The raw data populates rows in the interim table and is forwarded to the ServiceNow table specified by the integration.
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="Example legacy monitor with defined Impact and Urgency values" style="width:100%;" >}}
1. Use [transform maps](#transform-maps) in ServiceNow to customize the transformation of the data sent to the interim tables.
1. Customize the notification payload with available Datadog variables or custom strings.

**Note**: `Impact` and `Urgency` in monitor descriptions work only for legacy monitor configurations. For templated monitors, configure instance priority mapping. The `priority` field in ServiceNow incidents is read-only, and can only be updated using [priority lookup rules][8].
{{% /collapse-content %}}

{{% collapse-content title="Templated monitor table fields and transform maps" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **Type**: String<br>
The action being taken on the monitor: `create`, `update`, `acknowledge`, or `resolve`

`additional_information`
: **Type**: String<br>
**ITOM Transform**: `additional_info`<br>
Formatted string containing all event details

`aggreg_key`
: **Type**: String<br>
Aggregation key representing a hash of the alerting monitor's ID

`alert_cycle_key`
: **Type**: String<br>
Key representing a hash of a single monitor's alert cycle (tracks Alert → Warn → Resolve)

`alert_id`
: **Type**: String<br>
ID of the alerting monitor

`alert_metric`
: **Type**: String<br>
**ITOM Transform**: `metric_name`<br>
Metric that triggered the alert

`alert_query`
: **Type**: String<br>
Query that triggered the alert

`alert_scope`
: **Type**: String<br>
Scope that triggered the alert

`alert_status`
: **Type**: String<br>
Current state of the alert

`alert_title`
: **Type**: String<br>
Name of the alert

`alert_transition`
: **Type**: String<br>
**ITSM Transform**: (script) -> state<br>
Alert transition state: `Triggered`, `Warn`, or `Recovered`

`assignment_group_sys_id`
: **Type**: Reference<br>
**ITSM Transform**: `assignment_group`<br>
**Reference Table**: Group<br>
ServiceNow sys_id for the templated handle's assignment group

`business_service_sys_id`
: **Type**: Reference<br>
**ITSM Transform**: `business_service`<br>
**Reference Table**: Service<br>
ServiceNow sys_id for the templated handle's business service

`custom_fields`
: **Type**: String<br>
User-configured key-value fields formatted as JSON-convertible string

`datadog_tags`
: **Type**: String<br>
Datadog tags from the alerting monitor

`description`
: **Type**: String<br>
**ITSM Transform**: `description`<br>
**ITOM Transform**: `description`<br>
Summary description of the monitor alert

`event_details`
: **Type**: String<br>
**ITSM Transform**: `work_notes`<br>
Event details with formatted, clickable links to Datadog

`event_id`
: **Type**: String<br>
Datadog ID of the event

`event_link`
: **Type**: String<br>
Link to the event created from the monitor alert

`event_msg`
: **Type**: String<br>
Message from the event

`event_title`
: **Type**: String<br>
**ITSM Transform**: `short_description`<br>
Title of the event

`event_type`
: **Type**: String<br>
**ITOM Transform**: `type`<br>
Type of event

`hostname`
: **Type**: String<br>
**ITSM Transform**: `cmdb_ci`<br>
**ITOM Transform**: `node`<br>
Host of the affected monitor

`impact`
: **Type**: Integer<br>
**ITSM Transform**: `impact`<br>
Impact value based on user-defined mapping of monitor priority

`logs_sample`
: **Type**: String<br>
Sample of relevant logs

`monitor_priority`
: **Type**: Integer<br>
**ITOM Transform**: `severity`<br>
Priority of the alerting monitor as an integer

`org_name`
: **Type**: String<br>
Name of the alerting monitor's organization

`sys_created_by`
: **Type**: String<br>
**ITSM Transform**: `caller_id`<br>
Creator of the record (usually the configured ServiceNow API account)

`ticket_state`
: **Type**: String<br>
**ITSM Transform**: `state`, (script) -> close_code, (script) -> close_notes<br>
**ITOM Transform**: (script) -> resolution_notes<br>
State of the ServiceNow record: `new` or `resolved`

`u_correlation_id`
: **Type**: String<br>
**ITSM Transform**: `correlation_id`<br>
**ITOM Transform**: `message_key`<br>
Combined alert_cycle_key and aggreg_key used to coalesce records to the same target incident

`urgency`
: **Type**: Integer<br>
**ITSM Transform**: `urgency`<br>
Urgency set from the user defined mapping on the integration tile based on monitor defined priority

`user_sys_id`
: **Type**: Reference<br>
**ITSM Transform**: `assigned_to`<br>
**Reference Table**: User <br>
sys_id from the templated handle passed in for user.

{{% /collapse-content %}}

### Configure Datadog Case Management {#case-management}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Case Management integration is not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

You can choose to send cases from Datadog to either the Datadog Cases ITOM or ITSM table in ServiceNow. ServiceNow stores the records and transforms them using the installed update set to records in the Event or Incident table. Datadog doesn't support custom payloads for these tables, or updates to the Events table.

<div class="alert alert-info">The user configuring the settings in ServiceNow must have both the <code>x_datad_datadog.user</code> and <code>admin</code> roles.</a></div>

1. In Datadog, go to the [ServiceNow integration settings][4] page.
1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Case Management** tab.
1. Under **Sync ServiceNow with Case Management**, open the settings for your ServiceNow instance.
1. Beside **Case Table**, choose to send cases to either **Datadog Cases ITOM** or **Datadog Cases ITSM**.
1. Navigate to the [Case Management > Settings][5] page, and expand your project. Then, [set up the ServiceNow integration][6] for that project.

### Configure Datadog Incident Management {#incident-management}

After installing the integration, in Datadog, go to the [Integration Settings][9] page. Click the **ServiceNow** tile to configure ServiceNow incident creation.

#### Sync data bidirectionally between ServiceNow and Case/Incident Management

In ServiceNow, you can sync state, impact, and urgency bidirectionally with both Case Management and Incident Management.

1. In Datadog, follow the instructions to [create a service account application key][7].<br />**Note**: Datadog recommends creating this key instead of using a personal one, which risks breaking the ServiceNow sync if the user's account is deactivated or if their permissions change.
1. In ServiceNow, click the globe icon in the top-right corner, then make sure the **Application Scope** is set to **ITOM/ITSM Integration for Datadog**.
1. In the top-left navigation menu, click **All**.
1. Type **ITOM/ITSM Integration for Datadog** in the filter.
1. Click the **Configuration** link from the filtered results, then enter the required settings:
   1. Select your **Datadog Data Center**.
   1. Paste in your **Datadog API Key**.
   1. Paste in your **Service Account Application Key** you created.
   1. Check the **Enabled** box.
1. Click **Save**.
1. (Optional) If you have ITOM/ITSM integration version 2.7.0 or newer, you can use information from correlated alerts to populate values in ServiceNow.<br />The transform maps for Datadog Cases ITOM and ITSM tables contain an example transform script that runs onBefore. By default, the script is commented out, but you can enable it by uncommenting it and modifying it to fit your use case.

{{% collapse-content title="Incident Management field mappings" level="h4" expanded=false id="incident-management-field-mappings" %}}
This section describes the fields that are synced between Incident Management and ServiceNow:

| **Incident Management** | **ServiceNow Cases Table** | **ServiceNow Incident** | **Sync Status**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| Title                   | Title - String             | Short Description       | One way sync from Datadog -> ServiceNow |
| What Happened           | Description - String       | Description             | One way sync from Datadog -> ServiceNow |
| State                   | State - String             | State                   | Bi-directionally synced                 |
| DD Incident URL         | Incident URL - String      | Work Notes              | One way sync from Datadog -> ServiceNow |
| Severity                | Incident Urgency (int)     | Urgency                 | Bi-directionally synced                 |
| Severity                | Incident Impact (int)      | Impact                  | Bi-directionally synced                 |

| **Datadog Monitor State**                      | **ServiceNow Incident State** |
| ---------------------------------------------- | ----------------------------- |
| Alert                                          | In Progress                   |
| Warn                                           | In Progress                   |
| OK                                             | Resolved                      |
| Completed _(optional, configured in settings)_ | Resolved                      |

| **Datadog Incident Severity*** | **ServiceNow Urgency** | **ServiceNow Impact** | **ServiceNow Priority** |
|--------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                          | 1                      | 1                     | 1 - Critical            |
| SEV-2                          | 1                      | 2                     | 2 - High                |
| SEV-2                          | 2                      | 1                     | 2 - High                |
| SEV-3                          | 1                      | 3                     | 3 - Moderate            |
| SEV-3                          | 2                      | 2                     | 3 - Moderate            |
| SEV-3                          | 3                      | 1                     | 3 - Moderate            |
| SEV-4                          | 2                      | 3                     | 4 - Low                 |
| SEV-4                          | 3                      | 2                     | 4 - Low                 |
| SEV-5 (Minor)                  | 3                      | 3                     | 5 - Planning            |
| Unknown                        | 3                      | 3                     | 5 - Planning            |

\***Note**: If `Start at SEV-0` is enabled in Incident Management settings, the values in `ServiceNow Urgency`, `ServiceNow Impact`, and `ServiceNow Priority` will all stay the same, but the `Datadog Incident Severity` shifts down by 1. For example, in the first row of this table, the Datadog Incident Severity would be 0, but the rest of the values in the rest of the row would stay the same.
{{% /collapse-content %}}

## Customize data with transform maps {#transform-maps}

The ServiceNow integration writes from Datadog to interim tables, which transform to records in ServiceNow. For any customizations (for example, custom field mappings, etc.), you can extend the transform maps to specify what fields you want to map to from Datadog to ServiceNow.

## Additional configuration options

{{% collapse-content title="Datadog import host auto-flush rule" level="h4" expanded=false id="import-host-auto-flush" %}}
To prevent the import set table `x_datad_datadog_import_host` from accumulating too many rows, an auto-flush rule has been added to the Table Cleaner tool to keep only the last 24 hours of data. This configuration setting can be changed as needed by navigating to `sys_auto_flush_list.do` in the filter navigator and going into the rule for the `x_datad_datadog_import_host` table. The `Age in seconds` field can be updated accordingly.
{{% /collapse-content %}}

{{% collapse-content title="Create custom field mappings in ServiceNow" level="h4" expanded=false id="custom-field-mappings" %}}
To create a custom field mapping in ServiceNow:

1. Click one of the tables (for example, **Datadog Monitors ITSM Tables**), and scroll to the bottom of the record to see the link for the associated transform map.
1. Click on the name of the transform map to view the record:
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Your image description" style="width:100%;" >}}
   At the top are two important fields on the Transform record: <code>Source table</code> and <code>Target table</code>:
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="Your image description" style="width:100%;" >}}
1. Click **New**:
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="Your image description" style="width:100%;" >}}
1. Select the source and target fields for one to one mappings:
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="Your image description" style="width:100%;" >}}
   Or check the <strong>Use source script</strong> box and define transformations:
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Your image description" style="width:100%;" >}}

**Note:** For mapping any custom fields in the integration tile, you can use the following mapping script for either the Datadog Monitors ITOM and Datadog Monitors ITSM Transform maps. In this example, the field `my_field` was defined as a custom field in the integration tile:

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**Notes**:
- The source is the import set table you selected (in this example, Datadog Monitors ITSM Tables) and the target is your actual incident table (or event table) where events are stored.
- The field mappings are at the bottom of the record. Some basic mappings are included. This is where you select the fields to include, define the format, and select the target fields in your ServiceNow instance.
{{% /collapse-content %}}

## Troubleshooting

{{% collapse-content title="Error message in your Datadog integration" level="h4" expanded=false id="troubleshooting-error-messages" %}}
If you get an error message in your Datadog integration tile, or an `Error while trying to post to your ServiceNow instance` notification:
- Verify only the subdomain was used when entering your instance name.
- Verify the user you created has the required permissions.
- Verify the username and password are correct.
{{% /collapse-content %}}

{{% collapse-content title="No ticket created" level="h4" expanded=false id="troubleshooting-no-ticket" %}}
If the integration is configured and an alert triggered, but no ticket is created:
- Confirm that the interim table is populated. If so, the issue is with mappings and transformations. You can debug your mappings and scripts further by navigating to **Transform Errors** in ServiceNow.
- Confirm that you're working with the interim table you specified in the tile.

The ServiceNow user needs `rest_service` and `x_datad_datadog.user` roles so that it can access the import tables. If you're using the legacy way of sending notifications directly to either the Incident table or Event table, you need the permissions `itil` and `evt_mgmt_integration`.
{{% /collapse-content %}}

{{% collapse-content title="No updates from ServiceNow to Datadog" level="h4" expanded=false id="troubleshooting-no-updates" %}}
If you're seeing updates from Datadog Case Management to ServiceNow, but not seeing updates from ServiceNow to Datadog, this is expected behavior for ServiceNow ITOM. Bidirectional syncing with Case Management is only supported for ServiceNow ITSM.
{{% /collapse-content %}}

{{% collapse-content title="Monitors duplicating incidents" level="h4" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
If a monitor is reopening the same incident instead of creating a new one for each warning, ensure it is not set as a simple alert. Convert the monitor to a [multi-alert][11] by grouping it using a tag in the metric. This way, each alert will trigger a separate incident.
{{% /collapse-content %}}

Need additional help? Contact [Datadog support][10].

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /resources/xml/Datadog-Snow_Update_Set_v2.7.2.xml
[3]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/cases/settings
[6]: /service_management/case_management/notifications_integrations/#servicenow
[7]: /account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[8]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /help/
[11]: /monitors/configuration/?tab=thresholdalert#multi-alert