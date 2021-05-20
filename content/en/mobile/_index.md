---
title: Datadog Mobile App
kind: documentation
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Alerting"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
---

The Datadog Mobile app enables you to view alerts from Datadog on your mobile device. When receiving an alert via Slack, e-mail, Pagerduty or other pager apps, you'll be able to investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play store][2] for your Android device.

### Logging in

You can log in using standard authentication, Google authentication, or [SAML][3] - for both the US and the EU region.

#### Enabling SAML

SAML login requires you to set up and authenticate your SAML provider with Datadog. For SAML IdP-initiated login, refer to the end of this section. To authenticate SAML:

1. Press the “Using Single Sign-On (SAML)?” button.
2. Enter your company email and send the email.
3. While on your mobile device, open the email and click on the indicated link.
4. Enter your org’s SAML credentials, which upon success will reroute to an authenticated session of the Datadog mobile app.

Optionally, you may also authenticate through a QR Code or manual entry, outlined below.

##### QR code

1. Start by logging in to your [Datadog account profile page][4] in a browser and click the **Link mobile device** button of the organization you want to log into. This pops up a QR code.
    {{< img src="mobile/link-device.png" alt="Account Profiles - Link mobile device">}}
2. Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App. The org UDID is automatically inserted into the login screen.

##### Manual entry

1. To manually enter the SAML ID, open the Datadog Mobile app and press the “Using Single Sign-On (SAML)?” button.
2. Press the “Use another method to login” button, and enter the SAML ID manually.

By clicking **Authorize** when logging in, you link the mobile device you're using to your account. For security purposes, you will have to go through this flow once per month.

##### SAML IdP-Initiated Login

If you keep getting errors while trying to login with SAML, your identity provider may enforce IdP-initiated login. For more information regarding enabling IdP initiated SAML, please see our IdP initiated SAML page [IdP Initiated SAML page][16]


## Monitors

{{< img src="mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="monitor page">}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][6].

For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access previous queries. Furthermore, you can filter your monitor list using saved views, which surface when you activate the search bar. Lastly, view and run synthetic tests when viewing your synthetic monitors.

**Note:** To set up or edit monitors, notifications, or saved views, you need to do it in the [Datadog web app][7]. All monitors set up in the web app are visible in the mobile app. For more information, see [Creating monitors][8].

## Dashboards

{{< img src="mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="dashboard page">}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org, and filter them using the same template variables you have set up in the Datadog web app. Quickly filter your dashboards using template variable saved views. For more information about template variable saved views, see [Dashboard Saved Views][9]. Click on an individual dashboard to view it. 

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][10]. For more information, see [Dashboards][11].

## Incidents 


On the Incidents page, you can view, search and filter all incidents that you have access to in your Datadog account from the Datadog Mobile App to ensure quick response and resolution from anywhere. You can also  declare and edit incidents and seamlessly communicate to your teams through integrations with Slack, Zoom, and many more. For more information about Incidents, see the [Datadog Incident Management documentation][17]. 

### Create an Incident

1. Navigate to the incident list by clicking on the Incidents Tab in the bottom bar.
2. Click the “+” button in the top right corner.
3. Give your incident a title, severity, and commander.


## Widgets

### Monitor Saved Views

You can view your Monitor [Saved Views][18] from your home screen with Datadog widgets. Tap on any Saved View cell to open the “Monitor Search” screen in the app, with your Saved View already filled in.

**Note**: If you do not have any Monitor Saved Views, the widget will default to show you all Monitors. 

#### Create a widget
**iOS**:
Long press on the home screen.
Tap the “+” button on the top left corner of the screen.
Search for “Datadog” widgets.
Select your prefered size (medium allows up to 3 and large up to 6)
Place it where you want on your screen.

**Android**:
Open the Android Widget Picker. Either long press your home screen, or long press the Datadog app icon.
Tap on “Widgets”. If you have app shortcuts, it might appear as just an icon on the top right corner of the bubble. 
Drag the Monitor Saved Views widget on your home screen.

#### Edit a widget
**iOS**:
Long press on the widget to configure.
Tap on “Edit Widget”.
Tap on the individual Saved View cell to select and deselect.
You can reorder them by drag and dropping each cell.
Tap out of the widget to validate your selection and exit the configuration screen.

**Android**:
Tap on the widget title to configure.
Tap on “Saved views”.
Tap on the individual Saved View cell to select and deselect.
You can reorder them by drag and dropping each cell.
Tap “Save” to validate your selection and exit the configuration screen.
Also, you can scroll the widget to see more Saved Views. Long press and resize the widget to fit your preference.

#### Switch organizations
**iOS**:
All organizations you’ve logged-in are displayed in the configuration screen

**Android**:
From the configuration screen, tap on “Organization”
Select a new organisation. You might need to sign in.
Tap “Saved Views”. Select Saved Views to display or leave it as is.
Tap “Save”. The widget is now configured with Saved Views from a different organisation.

#### Delete a widget
**iOS**:
You can delete a widget pressing the “-” button at the top left of the widget when editing your home screen, or by long pressing on the widget and then selecting “Remove Widget”

**Android**:
You can delete a widget by long pressing, drag and dropping the Widget on the “Remove” button.



## Quick actions

{{< img src="mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Quick Actions">}}

Long-press on the app icon to surface a quick-action sheet of your top five [Frequently Viewed By Me][12] dashboards for iOS (measured by view count and recency) and your five most opened dashboards on mobile for Android. Press on a result to open the dashboard in-app.

## Search from home screen

{{< img src="mobile/iphone_search_doc.png" alt="Home Screen Search" style="width:40%;">}}

**iOS only**: Within iPhone Search, filter and search for the name of any desired dashboard. Press on a result to open the dashboard view directly on the mobile app, or press the “Search in App” button to open the search query in the in-app Dashboard List page.

## Shortcuts and Siri suggestions

**Android**: Create shortcut icons for your dashboards by touching and holding the Datadog app icon, then lift your finger. If the app has shorcuts, it displays a list. Touch and hold the desired shortcut, then drag and drop it to another location on your screen to create a unique shortcut icon.

**iOS**: Create Siri Shortcuts for Datadog dashboards and monitors through the Shortcuts App. For a shortcut to be available for creation, you must execute the desired action at least once in the app. For example, to create an “Open AWS Overview Dashboard” shortcut, open the AWS Overview Dashboard in your mobile app at least once.

With the shortcut, you can access your dashboards and monitors through three key actions:

- Pin the shortcut as an icon in your home screen. To do so, access the Shortcuts app, and open the edit menu for your dashboard shortcut.
- Siri Voice: say your shortcut name, such as “Open AWS Overview”, and Siri opens your dashboard in-app.
- Siri suggestions: Siri learns your routine, and suggests dashboard shortcuts when you most need them, through a home or lock-screen banner, iPhone search, or iOS 14 Siri Suggestions widgets.

{{< img src="mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Shortcuts">}}

For more information on Siri Shortcuts and Suggestions, refer to the [Apple Siri Documentation][13].

## Handoff

**iOS Only**: Use Apple Handoff to continue your task across Apple devices. While in use, the icon of the Datadog mobile app appears on your Mac at the left end of the Dock. Click on the icon to open your current dashboard or monitor on your Mac.

For Handoff to work, each device must:

- Be signed in to iCloud with the same Apple ID
- Have Bluetooth enabled
- Have Wi-Fi enabled
- Have Handoff enabled

For more information on Handoff, refer to the [Apple Handoff Documentation][14].

## Account

Switch organizations or log out from the Account page.

## Troubleshooting

For help with troubleshooting, [contact Datadog support][5]. You can also send a message in the [Datadog public Slack][15] [#mobile-app][16] channel.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /help/
[6]: /monitors/manage_monitor/#search
[7]: https://app.datadoghq.com/monitors
[8]: /monitors/monitor_types/
[9]: /dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /dashboards/
[12]: https://app.datadoghq.com/dashboard/lists/preset/5
[13]: https://support.apple.com/en-us/HT209055
[14]: https://support.apple.com/en-us/HT209455
[15]: https://chat.datadoghq.com/
[16]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: https://docs.datadoghq.com/account_management/saml/mobile-idp-login/
[17]: https://docs.datadoghq.com/monitors/incident_management
[18]: https://docs.datadoghq.com/logs/explorer/saved_views/
