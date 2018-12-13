## Overview

ServiceNow is an IT service management platform for recording, tracking, and managing a company’s enterprise-level IT processes in a single location. This integration allows you to create tickets from triggered alarms in Datadog [with the `@notification` feature][1]. Note that _Assignment Groups_ are automatically pulled in as separate `@notification` groups when the integration is enabled.

Additionally, add Datadog-generated graphs and comments to ServiceNow tickets, as well as manage the resolution workflow from within Datadog.

## Installation & update set

It's recommended to install the Datadog update set on your servicenow instance. This will allow you to customize the
data you receive on ServiceNow and make custom transformations to the tables you use.

Our [update set][2] creates a set of interim tables that Datadog notifications will be sent to. It also adds [transform maps][3] that allow you to control how the data from those notifications is mapped to other tables.

Installation steps:

- Install the Datadog update set in ServiceNow
- Define additional mappings and transformations from the Datadog tables to your target table
- Enter your Servicenow details in the integration tile in Datadog
- See notifications to `@servicenow` populate the Datadog interim table and your target table

### Update Set Installation

The first step is to import the XML update set provided. In ServiceNow:

- Search for _Update set_
- Find _Retrieved Update Sets_ in the menu
- Manually import the `Datadog-SNow_Update_Set_vX.X.X.xml` file

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="servicenow integration" responsive="true">}}

Once you uploaded the XML file, it will show a state of _Loaded_. Click on the name of the update set to preview and commit the code to the system.

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="servicenow integration" responsive="true">}}

Preview the update set to ensure there are no errors.

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="servicenow integration" responsive="true">}}

Selecting _Commit Update Set_ will merge the application into your system.

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="servicenow integration" responsive="true">}}

You should now be able to search for _Datadog_ in the navigation menu and see tables appear.

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="servicenow integration" responsive="true">}}

### Defining custom mappings

Click on _Datadog Incident Tables_ (for example) and navigate to the bottom of the record to see the link to the associated transform map.

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="servicenow integration" responsive="true">}}

#### Understanding the Mapping

Click on the name of the transform map to view the record.

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="servicenow integration" responsive="true">}}

At the top are two important fields on the Transform record, _Source table_ and _Target table_.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="servicenow integration" responsive="true">}}

Notice, the source is the import set table we selected, Datadog Incident Tables, and the target is your actual Incident table (or Event table) where events are stored.

Also notice the field mappings at the bottom of the record. Some basic mappings are included. This is where you select the fields you’d like to include, define the format and select the target fields in your ServiceNow instance.

#### Add a new field mapping

Click _New_

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="servicenow integration" responsive="true">}}

Select the Source and Target fields for one to one mappings

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="servicenow integration" responsive="true">}}

Or, check the _Use source script_ box and define transformations, for example:

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="servicenow integration" responsive="true">}}

#### Define multiple mappings quickly

Use _Mapping Assist_ (under Related Links) to map several Source and Target fields.

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="servicenow integration" responsive="true">}}

### Installation in Datadog

- In the Datadog application, go to the Integrations page and find the
  [ServiceNow tile][4]
- Add the instance name, which is the subdomain only. For _foo.service-now.com_ you should only enter _foo_.
- Add the username and password for your ServiceNow instance
  (you should create a limited user in ServiceNow just for Datadog)
- Select the intermediary table you want to send notifications to from the dropdown

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="servicenow integration" responsive="true">}}

### Permissions

The ServiceNow user needs _rest\_service_ and _x\_datad\_datadog.user_ roles so that it can access the import tables.

### Confirmation

That's it! To test the integration, add `@servicenow` in a monitor or event notification. The raw data will populate rows in the interim table and will get forwarded to the ServiceNow table specified in the mappings and transformations you created.

## Troubleshooting

If you're not seeing events in your ServiceNow tables:

- Seeing an error message in your Datadog integration tile or an _Error while trying to post to your ServiceNow instance_
  notification?
      - Check that you only used the subdomain when you entered your instance name
      - Check that the user you created has the required permissions
      - Double check that the username and password are correct.
- Integration is configured, but an alert triggered and no ticket is created?
      - Confirm that the interim table is populated. If so, the issue is with mappings and transformations. You can debug your mappings and scripts further by navigating to _Transform Errors_ in ServiceNow.
      - Confirm that you're working with the interim table you specified in the tile.

Need additional help? Contact [Datadog Support][5].

## Further Reading

### Knowledge Base

#### Auto-generate support tickets from Datadog alerts

Now, you can set these alerts to automatically create support tickets and send them to the ServiceNow ticketing queue. From there, your support team will be notified of issues using the communication workflows that you have already established inside ServiceNow. All you have to do is mention `@servicenow` in the alert message or add `@servicenow` to the notification list for that monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" responsive="true">}}

#### Use variables in ticket payload and field mappings

Variables can be used in the body of your alerts or in field mappings to ensure rich details from the event are included in ServiceNow. For example, you can include the title and severity in the appropriate ServiceNow field or you can include a link back to the specific incident in Datadog right from the ServiceNow ticket.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow Variables" responsive="true">}}

#### Automate support resolution workflow

Once the monitor state returns to normal, the associated support ticket is automatically marked as “resolved”.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow Resolved" responsive="true">}}

#### Send Datadog graphs to ServiceNow

In addition to automating ticket creation and resolution, you can also use Datadog to create ServiceNow tickets on an ad hoc basis whenever you see something in Datadog that needs your team’s attention. Just click the camera icon to share a snapshot of any Timeboard graph, add some context in the comment box to help your colleagues interpret the graph, and @mention ServiceNow to send the graph and your comments to ServiceNow.

{{< img src="integrations/servicenow/servicenow-04-mention-servicenow.png" alt="annotation" responsive="true">}}

[1]: https://docs.datadoghq.com/monitors/notifications/?tab=is_alertis_warning#notification
[2]: https://docs.servicenow.com/bundle/london-application-development/page/build/system-update-sets/concept/system-update-sets.html
[3]: https://docs.servicenow.com/bundle/london-platform-administration/page/script/server-scripting/concept/c_CreatingNewTransformMaps.html
[4]: https://app.datadoghq.com/account/settings#integrations/servicenow
[5]: https://docs.datadoghq.com/help
