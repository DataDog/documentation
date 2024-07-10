---
title: Datadog Mobile App
aliases:
- /service_management/mobile/
algolia:
  tags: ["Datadog mobile app", "mobile device"]
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn about Monitors and Alerting"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Learn about Dashboards"
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
- link: "https://www.datadoghq.com/blog/mobile-app-getting-started/"
  tag: "Blog"
  text: "Getting started with the Datadog mobile app"
---

The Datadog Mobile app enables you to view alerts from Datadog on your mobile device. When receiving an alert via Slack, e-mail, Pagerduty or other pager apps, you'll be able to investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play store][2] for your Android device.

### Logging in

You can log in using standard authentication, Google authentication, or [SAML][3] - for both the US and the EU region.

#### Enabling SAML

SAML login requires you to set up and authenticate your SAML provider with Datadog. For SAML IdP-initiated login, refer to the end of this section. To authenticate SAML:

1. Press the "Using Single Sign-On (SAML)?" button.
2. Enter your company email and send the email.
3. While on your mobile device, open the email and click on the indicated link.
4. Enter your org's SAML credentials, which upon success will reroute to an authenticated session of the Datadog mobile app.

Optionally, you may also authenticate through a QR Code or manual entry, outlined below.

##### QR code

1. In a browser, navigate to your [Datadog account Personal Settings Organizations][4] page and click **Log in to Mobile App** for the organization you are currently logged into. This pops up a QR code.
2. Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App. You will be automatically logged in.

**Note**: If you click the **Log in to Mobile App** button of an organization you are not currently logged into, the org UUID is automatically inserted into the login screen. You still have to provide authentication using your standard method.

##### Manual entry

1. To manually enter the SAML ID, open the Datadog Mobile app and press the "Using Single Sign-On (SAML)?" button.
2. Press the "Use another method to login" button, and enter the SAML ID manually.

By clicking **Authorize** when logging in, you link the mobile device you're using to your account. For security purposes, you will have to go through this flow once per month.

##### SAML IdP initiated login

If you keep getting errors while trying to login with SAML, your identity provider may enforce IdP-initiated login. For more information regarding enabling IdP initiated SAML, please see our IdP initiated SAML page [IdP Initiated SAML page][5]

## Monitors

{{< img src="service_management/mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="monitor page">}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][6].

For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access previous queries. Furthermore, you can filter your monitor list using saved views, which surface when you activate the search bar. Lastly, view and run synthetic tests when viewing your synthetic monitors.

**Note:** To set up or edit monitors, notifications, or saved views, you need to do it in the [Datadog web app][7]. All monitors set up in the web app are visible in the mobile app. For more information, see [Creating monitors][8].

## Dashboards

{{< img src="service_management/mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="dashboard page">}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org, and filter them using the same template variables you have set up in the Datadog web app. Quickly filter your dashboards using template variable saved views. For more information about template variable saved views, see [Dashboard Saved Views][9]. Click on an individual dashboard to view it.

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][10]. For more information, see [Dashboards][11].

## Incidents

{{< img src="service_management/mobile/incidents.png" alt="incidents page" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

On the Incidents page, you can view, search and filter all incidents that you have access to in your Datadog account from the Datadog Mobile App to ensure quick response and resolution from anywhere. You can also declare and edit incidents and seamlessly communicate to your teams through integrations with Slack, Zoom, and many more. For more information about Incidents, see the [Datadog Incident Management documentation][12].

### Create an incident

1. Navigate to the incident list by clicking on the Incidents Tab in the bottom bar.
2. Click the "+" button in the top right corner.
3. Give your incident a title, severity, and commander.

### Receive push notifications for incidents

1. Navigate to **Account**.
2. Click **Notifications**.
3. Select the toggle for **Enable Notifications**. (**Note**: For Android, notifications will be enabled automatically when you install the latest version of the Datadog mobile app.)
4. Next, in the Datadog web app, navigate to [Incident Notification Rules][13].
5. Create or edit a notification rule and under **Notify**, type your name. Two options should appear, allowing you to choose between email notifications and your mobile device.
6. Select your mobile device and click **Save**.

For more information on configuring Incident Notification Rules, see the [Incidents settings docs][14].

## Widgets

### Open Incidents widget

{{< img src="service_management/mobile/incident_widget.png" alt="Datadog incident mobile widget displayed on Android and iOS devices" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

View your [open incidents][12] from your mobile home screen with Datadog widgets.

To dive deeper into issues, tap any open incident displayed in the widget to have it open with more details in the Datadog mobile app. 

Also, you can customize your Open Incidents widgets by filtering on:

- Organization
- Severity levels
- Customers impacted
- Ordering

#### Create an Open Incidents widget

{{< tabs >}}
{{% tab "iOS" %}}

1. Tap the **+** button on the top left corner of the screen.
2. Search for "Datadog" widgets.
3. Select your preferred size (small, medium, or large).
4. Drag the widget to your desired, on-screen location.


{{% /tab %}}
{{% tab "Android" %}}

1. Long press on your home screen.
2. Tap the **Widgets** button on your home screen editor. If you have app shortcuts, it might appear as only an icon on the top right corner of the bubble.
3. Drag the widget to your desired, on-screen home screen.
4. Resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Edit an Open Incidents widget

{{< tabs >}}
{{% tab "iOS" %}}

1. Long press the widget to configure.
2. Tap **Edit Widget**.
2. Tap **Choose** next to the **Organzation** label to fetch open incidents from the selected organization.
3. Tap **SEV-1 and SEV-2** next to the Severities label to specify severity filters.
4. Tap **Both** next to the **Customer Impacted** label to filter on open incidents that have impacted customers.
5. Type in the **Type additional filters** text box to specify any further filtering.
6. Tap **Ordering** to specify the order of how incidents are listed.
7. Tap outside of the widget to save your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. Tap **Organization** to fetch open incidents from the selected organization.
3. Tap **Severities** to specify severity filters.
4. Tap **Customer impacted** to filter on open incidents that have impacted customers.
5. Tap **Query** to specify any further filtering.
6. Tap **Sorted by** to specify the order of how incidents are listed.
7. Tap **Save** or **Apply** to save your selection and exit the configuration screen.
8. Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display Open Incidents from multiple organizations

You can display open incidents from multiple organizations on your mobile home screen. 

{{< tabs >}}
{{% tab "iOS" %}}
- Tap **Choose** next to the Organization label to fetch open incidents from the selected organization.



{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. From the configuration screen, tap **Organization**.
3. Select a new organization (you may need to sign in).
4. Size the widget to fit your preference.
5. Tap **Save** or **Apply**. 


{{% /tab %}}
{{< /tabs >}}

#### Delete an Open Incidents widget

{{< tabs >}}
{{% tab "iOS" %}}

Delete a widget by tapping the **-** button at the top left of the widget when editing your home screen, or by long pressing the widget and selecting **Remove Widget**.


{{% /tab %}}
{{% tab "Android" %}}

Delete a widget by long pressing, dragging, and dropping the widget to the **Remove** button.


{{% /tab %}}
{{< /tabs >}}

### SLOs widget

{{< img src="service_management/mobile/slo_widget.png" alt="Application Uptime SLO widgets displayed on Android and iOS devices" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

View your [SLOs][15] from your mobile home screen with Datadog widgets. You can add any SLOs from your organization as a widget, along with a timeframe.

Timeframe options are:
- 7 days
- 30 days
- 90 days
- Previous week
- Previous month
- Week to date
- Month to date

You can also specify a dashboard that opens by default when you tap on an SLOs widget, allowing you to quickly investigate further into your metrics.

**Note**: If you do not specify a dashboard that opens by default, tapping an SLOs widget opens the Datadog app.

#### Create an SLOs widget

{{< tabs >}}
{{% tab "iOS" %}}

- Long press on your home screen.
- Tap the "+" button on the top left corner of the screen.
- Search for "Datadog" widgets.
- Select your preferred size (small shows one SLO and medium shows one SLO along with a visualized timeframe of its health).
- Drag the widget to your desired, on-screen location.


{{% /tab %}}
{{% tab "Android" %}}

- Long press on your home screen.
- Tap the "Widgets" button on your home screen editor. If you have app shortcuts, it might appear as just an icon on the top right corner of the bubble.
- Drag the widget to your desired, on-screen home screen.
- Resize the widget to fit your preference. It always shows one SLO. If you size the widget to take up the width of your mobile home screen, it displays the selected SLO along with a visualized timeframe of its health.


{{% /tab %}}
{{< /tabs >}}

#### Edit an SLOs widget

{{< tabs >}}
{{% tab "iOS" %}}

- Long press on the widget to configure.
- Tap "Edit Widget."
- Tap "Choose" next to the SLO label to choose an SLO to track.
- Depending on the SLO chosen, a "Timeframe" label may appear. Tap "Choose" next to the "Timeframe" label to choose the SLO timeframe. 
- Tap "Choose" next to the "Dashboard to open" label to choose a dashboard that opens when the SLOs widget is tapped. 
- Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

- Tap the widget title to configure.
- Tap "Selected SLO" to choose an SLO to track.
- Tap "Selected Time Window" to choose the SLO timeframe.
- Tap "Dashboard to open" to choose a dashboard that opens when the SLOs widget is tapped.
- Tap "Save" or "Apply" to validate your selection and exit the configuration screen.
- Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display SLOs from multiple organizations

You can display SLOs from multiple organizations on your mobile home screen. 

{{< tabs >}}
{{% tab "iOS" %}}

All organizations you've logged into are displayed in the configuration screen. If you do not see your organization, sign into it again.


{{% /tab %}}
{{% tab "Android" %}}

- Tap the widget title to configure.
- From the configuration screen, tap "Organization".
- Select a new organization (You might need to sign in).
- Size the widget to fit your preference.
- Tap "Save" or "Apply". 


{{% /tab %}}
{{< /tabs >}}

#### Delete an SLOs widget

{{< tabs >}}
{{% tab "iOS" %}}

Delete a widget by tapping the "-" button at the top left of the widget when editing your home screen, or by long pressing on the widget and selecting "Remove Widget".


{{% /tab %}}
{{% tab "Android" %}}

Delete a widget by long pressing, dragging, and dropping the widget to the "Remove" button.


{{% /tab %}}
{{< /tabs >}}

### Monitors widget

{{< img src="service_management/mobile/monitor_widget.png" alt="Configured monitor widgets displayed on Android and iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

View your [monitors][16] from your home screen with Datadog widgets. Tap any cell to open the **Monitor Search** screen in the app, with your monitors already filled in.

**Note**: If you do not have any monitor saved views, the widget shows you all monitors by default.

#### Create a Monitors widget

{{< tabs >}}
{{% tab "iOS" %}}

- Long press on the home screen.
- Tap the "+" button on the top left corner of the screen.
- Search for "Datadog" widgets.
- Select your preferred size (small shows two monitor saved views, medium allows up to three monitor saved views, and large up to six monitor saved views).
- Drag the widget to your desired, on-screen location.


{{% /tab %}}
{{% tab "Android" %}}

- Long press on your home screen.
- Tap "Widgets" on your home screen editor. If you have app shortcuts, it might appear as just an icon on the top right corner of the bubble.
- Drag the widget to your desired, on-screen home screen.
- Resize the widget to fit your preference. To show more saved views, increase the length of the widget on your mobile home screen.


{{% /tab %}}
{{< /tabs >}}

#### Edit a Monitors widget

{{< tabs >}}
{{% tab "iOS" %}}

- Long press on the widget to configure.
- Tap on "Edit Widget".
- Tap on the individual saved view cell to select and deselect.
- Reorder the views by dragging and dropping each cell.
- Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

- Tap on the widget title to configure.
- Tap on "Saved Views".
- Tap on the individual saved view cell to select and deselect.
- Reorder the views by dragging and dropping each cell.
- Tap "Save" or "Apply" to validate your selection and exit the configuration screen.
- Scroll inside the widget to see more saved views. Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display Monitors from multiple organizations

You can display Monitors from multiple organizations within the same widget. 

{{< tabs >}}
{{% tab "iOS" %}}

All organizations you've logged-in are displayed in the configuration screen. If you do not see your organization, you may need to sign in again.


{{% /tab %}}
{{% tab "Android" %}}

- Tap the widget title to configure.
- From the configuration screen, tap "Organization".
- Select a new organization (you might need to sign in).
- Edit the widget to fit your preference.
- Tap "Save" or "Apply". 


{{% /tab %}}
{{< /tabs >}}

#### Delete a Monitors widget

{{< tabs >}}
{{% tab "iOS" %}}

Delete a widget pressing the "-" button at the top left of the widget when editing your home screen, or by long pressing on the widget and then selecting "Remove Widget".


{{% /tab %}}
{{% tab "Android" %}}

Delete a widget by long pressing, dragging, and dropping the widget on the "Remove" button.


{{% /tab %}}
{{< /tabs >}}

## Quick actions

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Quick Actions">}}

Long-press the app icon to display a quick-action sheet of your top five [Frequently Viewed By Me][17] dashboards for iOS (measured by view count and recency), or your five most opened dashboards on mobile for Android. Tap a result to open the dashboard in-app.

## Search from home screen

{{< img src="service_management/mobile/iphone_search_doc.png" alt="Home Screen Search" style="width:40%;">}}

**iOS only**: Within iPhone Search, filter and search for the name of any desired dashboard. Press on a result to open the dashboard view directly on the mobile app, or press the "Search in App" button to open the search query in the in-app Dashboard List page.

## Shortcuts and Siri suggestions

**Android**: Create shortcut icons for your dashboards by touching and holding the Datadog app icon, then lift your finger. If the app has shortcuts, it displays a list. Touch and hold the desired shortcut, then drag and drop it to another location on your screen to create a unique shortcut icon.

**iOS**: Create Siri Shortcuts for Datadog dashboards and monitors through the Shortcuts App. For a shortcut to be available for creation, you must execute the desired action at least once in the app. For example, to create an "Open AWS Overview Dashboard" shortcut, open the AWS Overview Dashboard in your mobile app at least once.

With the shortcut, you can access your dashboards and monitors through three key actions:

- Pin the shortcut as an icon in your home screen. To do so, access the Shortcuts app, and open the edit menu for your dashboard shortcut.
- Siri Voice: say your shortcut name, such as "Open AWS Overview", and Siri opens your dashboard in-app.
- Siri suggestions: Siri learns your routine, and suggests dashboard shortcuts when you most need them, through a home or lock-screen banner, iPhone search, or iOS 14 Siri Suggestions widgets.

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Shortcuts">}}

For more information about Siri shortcuts and suggestions, read the [Apple Siri documentation][18].

## Handoff

**iOS Only**: Use Apple Handoff to continue your task across Apple devices. While in use, the icon of the Datadog mobile app appears on your Mac at the left end of the Dock. Click on the icon to open your current dashboard or monitor on your Mac.

For Handoff to work, each device must:

- Be signed in to iCloud with the same Apple ID
- Have Bluetooth enabled
- Have Wi-Fi enabled
- Have Handoff enabled

For more information about Handoff, read the [Apple Handoff documentation][19].

## Account

Switch organizations or log out from the Account page.

## Troubleshooting

For help with troubleshooting, [contact Datadog support][20]. You can also send a message in the [Datadog public Slack][21] [#mobile-app][22] channel.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /account_management/saml/mobile-idp-login/
[6]: /monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /monitors/types
[9]: /dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /dashboards/
[12]: /monitors/incident_management
[13]: https://app.datadoghq.com/incidents/settings#Rules
[14]: /service_management/incident_management/incident_settings/#rules
[15]: /dashboards/widgets/slo/#setup
[16]: /logs/explorer/saved_views/
[17]: https://app.datadoghq.com/dashboard/lists/preset/5
[18]: https://support.apple.com/en-us/HT209055
[19]: https://support.apple.com/en-us/HT209455
[20]: /help/
[21]: https://chat.datadoghq.com/
[22]: https://datadoghq.slack.com/archives/C0114D5EHNG
