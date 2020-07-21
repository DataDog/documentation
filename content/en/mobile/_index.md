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

Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play store][2] for your Android device.

### Logging in

You can log in using standard authentication, Google authentication, or [SAML][3]. 

#### Enabling SAML

SAML login requires you to set up and authenticate your SAML provider with Datadog. Before trying to login with SAML, 

1. Start by logging in to your [Datadog account profile page][4] in a browser and click the **Link mobile device** button of the organization you want to log into. This pops up a QR code.
    {{< img src="mobile/link-device.png" alt="monitor page">}}
2. Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App and automatically insert the org UDID into the login screen.
3. Optionally, you can manually enter the SAML ID by opening the Datadog Mobile app, clicking **login with SAML**, and entering the SAML ID manually.
4. Now log in using your normal SAML login flow. 

**Note**: By clicking **Authorize** when logging in, you link this mobile device to your account so that you don't have to go through this flow again.

## Monitors

{{< img src="mobile/monitor-example.png" alt="monitor page" style="width:50%;">}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][5]. For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access previous queries.

**Note:** To set up or edit monitors and notifications, you need to do it in the [Datadog web app][6]. All monitors set up in the web app are visible in the mobile app. For more information, see [Creating monitors][7].

## Dashboards

{{< img src="mobile/dashboard-example.png" alt="dashboard page" style="width:50%;">}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org. Click into an individual dashboard to view it.

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][8]. For more information, see [Dashboards][9].

## Account

Switch organizations and log out from the Account page.

## Troubleshooting

For help with troubleshooting, [contact Datadog support][10]. You can also send a message in the [Datadog public Slack][11] [#mobile-app][12] channel. 

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /monitors/manage_monitor/#search
[6]: https://app.datadoghq.com/monitors
[7]: /monitors/monitor_types/
[8]: https://app.datadoghq.com/dashboard/lists
[9]: /dashboards/
[10]: /help/
[11]: https://chat.datadoghq.com/
[12]: https://datadoghq.slack.com/archives/C0114D5EHNG
