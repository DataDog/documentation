---
title: Set up ServiceNow ITOM and ITSM
further_reading:
- link: "/integrations/servicenow/"
  tag: "Documentation"
  text: "ServiceNow integration"
---
ServiceNow's ITOM/ITSM integration allows you to send alerts, cases, and incidents generated in Datadog to ServiceNow as records in the Incident or Event tables. The integration relies on interim tables and transform maps.

To use the integration, follow the instructions to install the app, and then configure the integration for each product:
1. [Install the ITOM/ITSM app](#install)
1. Configure the app
   1. [Configure Datadog templated monitor notifications](#monitor-notifications)
   1. [Configure Datadog Case Management](#case-management)
   1. [Configure Datadog Incident Management](#incident-management)
1. [Customize data with transform maps](#transform-maps)

## Install the ITOM/ITSM app {#install}
There are two ways to install the app:
- Install the latest version of the [ITOM/ITSM Integration for Datadog][1] app from the ServiceNow store.
- Download the latest Update Set ([Datadog-Snow_Update_Set_v2.7.2.xml][2]) and upload it to your ServiceNow instance manually.

Before proceeding, make sure you have [added your ServiceNow instance][3] into your ServiceNow tile in Datadog.

## Configure the app

### Configure templated monitor notifications {#monitor-notifications}

<div class="alert alert-info">These features require ITOM/ITSM integration app version 2.6.0 or newer.</a></div>

#### Configure instance priority mapping

By default, Datadog doesn't include ServiceNow impact and urgency levels when sending events to ServiceNow. For each ServiceNow configuration, you can configure mappings between those ServiceNow levels and Datadog's Monitor Priority levels for inclusion in Datadog-generated events.

1. In Datadog, go to the [ServiceNow integration settings][4] page.
1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Monitors** tab.
1. Under **Instance Priority Mapping for Templates**, open the settings for your ServiceNow instance.
1. Turn on the **Use Instance Priority Mapping** toggle.
1. In the **ServiceNow Urgency** and **ServiceNow Impact**, select the levels you want to correspond with Datadog's Monitor Priority levels.
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

### Configure Datadog Case Management {#case-management}

You can choose to send cases from Datadog to either the Datadog Cases ITOM or ITSM table in ServiceNow. ServiceNow stores the records and transforms them using the installed update set to records in the Event or Incident table. Datadog doesn't support custom payloads for these tables, or updates to the Events table.

<div class="alert alert-info">The user configuring the settings in ServiceNow must have both the <code>x_datad_datadog.user</code> and <code>admin</code> roles.</a></div>

1. **Configure settings in Datadog**:
   1. In Datadog, go to the [ServiceNow integration settings][4] page.
   1. Go to the **Configure** tab, then the **ITOM/ITSM** tab, then the **Case Management** tab.
   1. Under **Sync ServiceNow with Case Management**, open the settings for your ServiceNow instance.
   1. Beside **Case Table**, choose to send cases to either **Datadog Cases ITOM** or **Datadog Cases ITSM**.
   1. Navigate to the [Case Management > Settings][5] page, and expand your project. Then, [set up the ServiceNow integration][6] for that project.
   1. Follow the instructions to [create a service account application key][7].<br />**Note**: Datadog recommends creating this key instead of using a personal one, which risks breaking the ServiceNow sync if the user's account is deactivated or if their permissions change.
1. **Configure settings in ServiceNow**:
   1. In ServiceNow, click the globe icon in the top-right corner, then make sure the **Application Scope** is set to **ITOM/ITSM Integration for Datadog**.
   1. In the top-left navigation menu, click **All**.
   1. Type **ITOM/ITSM Integration for Datadog** in the filter.
   1. Click the **Configuration** link from the filtered results, then enter the required settings:
      1. Select your **Datadog Data Center**.
      1. Paste in your **Datadog API Key**.
      1. Paste in your **Service Account Application Key** you created.
      1. Check the **Enabled** box.
   1. Click **Save**.
   1. (Optional) If you have ITOM/ITSM integration app version 2.7.0 or newer, you can use information from correlated alerts to populate values in ServiceNow.<br />The transform maps for Datadog Cases ITOM and ITSM tables contain an example transform script that runs onBefore. By default, the script is commented out, but you can enable it by uncommenting it and modifying it to fit your use case.

### Configure Datadog Incident Management {#incident-management}

## Customize data with transform maps {#transform-maps}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.7.2.xml
[3]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/cases/settings
[6]: /service_management/case_management/notifications_integrations/#servicenow
[7]: /account_management/org_settings/service_accounts/#create-or-revoke-application-keys