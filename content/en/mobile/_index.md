---
title: Datadog Mobile App
description: "Monitor your infrastructure on-the-go with the Datadog mobile app for iOS and Android, featuring dashboards, alerts, incidents, and on-call management."
aliases:
- /service_management/mobile/
algolia:
  tags: ["Datadog mobile app", "mobile device"]
further_reading:
- link: "/mobile/shortcut_configurations/"
  tag: "Documentation"
  text: "Shortcut Configurations"
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
- link: "https://www.datadoghq.com/blog/mobile-app-reduce-mttr/"
  tag: "Blog"
  text: "Reduce your mean time to repair with the Datadog mobile app"
---

The Datadog Mobile app enables you to view alerts from Datadog on your mobile device. When receiving an alert through On-Call, Slack, or email, you can investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play store][2] for your Android device.

### Logging in

You can log in using standard authentication, Google authentication, or [SAML][3] - for both the US and the EU region.

#### Enabling SAML

SAML login requires you to set up and authenticate your SAML provider with Datadog using your default iOS/Android browser. For SAML IdP-initiated login, refer to the end of this section. To authenticate SAML:

1. In the mobile app, select your data center region (for example, US1) in the upper right corner.
2. Press the log-in button.
3. Click the "Using Single Sign-On (SAML)?" link.
4. Enter your company email and send the email.
5. While on your mobile device, open the email and click on the indicated link through your default browser.
6. Enter your org's SAML credentials to be rerouted to an authenticated session of the Datadog mobile app.

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

##### Subdomain login

1. Tap subdomain and enter your custom [subdomain][29].
2. Proceed with login steps as prompted.

### Switch organizations

To switch organizations, navigate to the **Settings** page on the mobile app and click on **Organization**. 

**Note**: You may need to reauthenticate when you switch organizations.

### Log out
To log out, navigate to the **Settings** page on the mobile app and click on **Log Out**. Confirm **Yes** that you are sure. 

## On-Call
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS on-call page showing shifts, schedules, and escalation options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android on-call page showing shifts, schedules, and escalation options">}}

{{% /tab %}}
{{< /tabs >}}

The On-Call page provides a comprehensive view of On-Call shifts, schedules, pages, and escalation policies. You can filter the information by user, team, urgency, status, or date to quickly find relevant details. Tapping **Escalate** prompts you to confirm the escalation to the next policy level. Tapping **Declare Incident** prompts you to enter a title and provide relevant incident attributes.

You can initiate a page to an individual or team, and also override existing shifts by tapping on the shift you would like to override. You can view Bits AI SRE monitor investigations for initial findings and conclusions. For more information, see [Datadog On-Call][20].

To configure On-Call notifications on your mobile device, see the guide to [Set up your Mobile Device for Datadog On-Call][21].

## Incidents

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/incident_may_2025.png" alt="Incidents page in the Datadog On-call mobile app" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Incident.png" alt="Incidents page in the Datadog On-call mobile app" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

On the Incidents page, you can view, search, and filter all incidents that you have access to in your Datadog account to ensure response and resolution from anywhere. You can also declare and edit incidents, and seamlessly communicate to your teams through integrations with Slack, Zoom, and many more. For more information about Incidents, see [Datadog Incident Management][12].

### Create an incident

1. Navigate to the incident list by tapping on the Incidents Tab in the bottom bar.
2. Tap the **+** button in the top right corner.
3. Give your incident a title, severity, and commander.

## Notification Center
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_notification_center.png" alt="ios Notification center in the Datadog mobile app" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_notification_center.png" alt="Android Notification center in the Datadog mobile app" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

The Notification Center lists all push notifications received so that notification context is never lost. You can filter by notification type.

## Dashboards

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS dashboard page showing list of dashboards with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android dashboard page showing list of dashboards with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org, and filter them using the same template variables you have set up in the Datadog web app. Quickly filter your dashboards using template variable saved views. For more information about template variable saved views, see [Dashboard Saved Views][9]. Click on an individual dashboard to view it. Click timeframe on bottom right to customize the dashboard range. 

**Note**: 
- To set up or edit a dashboard, you need to [log in to the Datadog browser app][10]. For more information, see [Dashboards][11].
- Dashboard links configured in UTC open in UTC on the mobile app. For more information, see [Dashboard Configurations][24].
- Not all widget types are available, which means they do not display data on the mobile app. This includes Topology Map, List Widget (all data sources), Legacy treemap widget, and SLO Summary widget.

## Monitors

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS monitors page showing list of monitors with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android monitors page showing list of monitors with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][6].

For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access to previous queries. Furthermore, you can filter your monitor list using saved views, which surface when you activate the search bar. You can also view and run synthetic tests when viewing your synthetic monitors.

**Note**: To set up or edit monitors, notifications, or saved views, you must use the [Datadog web app][7]. All monitors set up in the web app are visible in the mobile app. For more information, see [Creating monitors][8].

## Notebooks

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS notebooks page showing list of notebooks with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android notebooks page showing list of notebooks with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Notebooks page, you can view and search all of the notebooks that you have access to in your Datadog org, and filter them by tags. Notebook tags allow you to filter by favorites, team, and type. See [notebook tags][19] for more information.

**Note**: To set up or edit a notebook, you need to [log in to the Datadog browser app][10]. For more information, see [Notebooks][18].

## Traces

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS traces page showing list of traces with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android traces page showing list of traces with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Traces page, you can view and search all of the traces that you have access to in your Datadog org. You can narrow the list through saved views or build specific search queries based on your tagging strategy. For more information about search, see [Trace Explorer Query Syntax][16].

For example, to filter on traces with the tag `#env:prod` or the tag `#test`, use the query `"env:prod" OR test`. Click into individual services to expand associated spans, and select spans to view info, errors, and related logs. You can also open traces from services and logs.

**Only available on iOS**: Watchdog Insights point to latency outliers and error outliers. For more information, see [Watchdog Insights][26].


## Logs

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS logs page showing list of logs with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android logs page showing list of logs with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Logs page, you can view and search all of the logs or flex logs that you have access to in your Datadog org. You can narrow the list through saved views or query filters. For more information about search, see [Log Search Syntax][23].

You can also group by log patterns and select different log attributes for clustering or grouping results. For more information about log patterns, see [Grouping Logs Into Patterns][22].

**Note**: To toggle on flex logs, navigate to the logs list and tap on the top right to select enable flex logs.

**Only available on iOS**: Watchdog Insights point to log anomalies and outliers. For more information, see [Watchdog Insights for Logs][25].


## Services

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS services page showing list of services with search and filter options">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android services page showing list of services with search and filter options">}}

{{% /tab %}}
{{< /tabs >}}

On the Services page, you can view, search and filter all services that you have access to in your Datadog account from the Datadog Mobile App to ensure the health of your service from anywhere. You can also view recent deployments, resources, SLOs, and monitors associated with that service. For more information about investigative tools for your services, see [manage Software Catalog][17].

## Bits AI

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Bits AI chatbot interface in ios where a user asks about a service">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Bits AI chatbot interface in Android where a user asks about a service">}}

{{% /tab %}}
{{< /tabs >}}

On the Bits AI home page, you can ask questions about your organization's system health. Bits AI supports natural language querying for logs and APM traces. For more information, see [Chat with Bits AI][27].

### Bits AI SRE
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Bits AI SRE investigation results displayed on an On-Call page">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Bits AI SRE investigation results displayed on an On-Call page">}}

{{% /tab %}}
{{< /tabs >}}

When enabled, Bits AI SRE initiates investigations directly on On-Call pages. These investigations present initial findings and conclusions to help responders identify potential root causes and next steps. For more information, see [Bits AI SRE][28].

## Frequently Asked Question
### How do I remain logged into the mobile app?
Upon successful authentication to the mobile app, you will remain logged in for 90 days.  

**Note**: If you have notifications enabled, proactive notifications will be sent 10 days prior to token expiration.

### Will I still receive notifications if I am automatically signed out?
If you are automatically logged out during the 90 day token period, you will still be able to receive notifications and will be prompted to log in again.

**Note**: If you manually log out from the app, you will stop receiving notifications.

### Why am I not receiving notifications?
Check that you have notifications enabled for the Datadog app in your device app settings. If you would like to ensure that notifications bypass Do Not Disturb, check that Critical Alerts is toggled on.

### What happens if a user is disabled?
The mobile app token will be invalid and force the user to log out.

## Troubleshooting

For help with troubleshooting, [contact Datadog support][13]. You can also send a message in the [Datadog public Slack][14] [#mobile-app][15] channel.

## Further Reading

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
[13]: /help/
[14]: https://chat.datadoghq.com/
[15]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: /tracing/trace_explorer/query_syntax/
[17]: https://docs.datadoghq.com/software_catalog/manage/
[18]: https://docs.datadoghq.com/notebooks/
[19]: https://docs.datadoghq.com/notebooks/#notebook-tags
[20]: https://docs.datadoghq.com/incident_response/on-call/
[21]: /incident_response/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[22]: https://docs.datadoghq.com/logs/explorer/analytics/patterns/
[23]: https://docs.datadoghq.com/logs/explorer/search_syntax/
[24]: /dashboards/configure/#configuration-actions
[25]: /logs/explorer/watchdog_insights/
[26]: /watchdog/insights/?tab=logmanagement
[27]: /bits_ai/chat_with_bits_ai/
[28]: /bits_ai/bits_ai_sre/
[29]: /account_management/multi_organization/#custom-sub-domains
