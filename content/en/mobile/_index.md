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

The Datadog Mobile app enables on-call engineers to view alerts from Datadog on their mobile device. When receiving an alert via Slack, e-mail, Pagerduty or other pager apps, you'll be able to investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

The Datadog Mobile App is currently in beta, so it's not available generally in app stores. To download the app, use the specific invite links in these instructions.

### iOS

To install on an iOS device, [download the app from the Apple App Store][1].

### Android

To install on an Android device, [download the app from the Google Play store][2].

### Logging in

You can login using standard authentication, Google authentication, and [SAML][3].

## Monitors

{{< img src="mobile/monitor-example.png" alt="monitor page" style="width:50%;">}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][4]. For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access previous queries.

**Note:** To set up or edit monitors and notifications, you need to do it in the [Datadog web app][5]. All monitors set up in the web app are visible in the mobile app. For more information, see [Creating monitors][6].

## Dashboards

{{< img src="mobile/dashboard-example.png" alt="dashboard page" style="width:50%;">}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org. Click into an individual dashboard to view it.

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][7]. For more information, see [Dashboards][8].

## Account

Switch organizations and log out from the Account page.

## Troubleshooting

For help with troubleshooting, [contact Datadog support][9]. You can also send a message in the [Datadog public Slack][10] [#mobile-app][11] channel. 

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /account_management/saml/#pagetitle
[4]: /monitors/manage_monitor/#search
[5]: https://app.datadoghq.com/monitors
[6]: /monitors/monitor_types/
[7]: https://app.datadoghq.com/dashboard/lists
[8]: /dashboards/
[9]: /help/
[10]: https://chat.datadoghq.com/
[11]: https://datadoghq.slack.com/archives/C0114D5EHNG
