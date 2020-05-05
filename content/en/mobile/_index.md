---
title: Datadog On-call Mobile App
kind: documentation
beta: true
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Alerting"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
---

<div class="alert alert-warning"> This service is in public beta. To join the beta, follow the installation instructions. The beta is not currently available to customers using SAML authentication. If you have any feedback, <a href="/help">contact Datadog support</a>.</div>

The Datadog On-call app enables on-call engineers to view alerts from Datadog on their mobile device. When receiving an alert via Slack, e-mail, Pagerduty or other pager apps, you'll be able to investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

The Datadog On-call App is currently in beta, so it's not available generally in app stores. To download the app, use the specific invite links in these instructions.

### iOS

1. Install the [Testflight app][1] from the App Store.
2. Open this invite link on your iPhone: [https://apple.co/2xEC5ke][2]. Allow the link to open in the Testflight app. This takes you to a page where you can download the Datadog app.
3. Once the app downloads, open the app, select whether you are logging into the US or EU site, and log in with your Datadog credentials.

### Android

1. To install the Android app, open this invite link on your Android device: [https://play.google.com/apps/testing/com.datadog.app][3]. This takes you to a page where you can download the Datadog app.
2. Once the app downloads, open the app, select whether you are logging into the US or EU site, and log in with your Datadog credentials.

### Logging in

You can login using standard and Google authentication. [SAML login][4] is not currently supported. If you have SAML enabled but not strictly, you can access the mobile app by creating a new standard email account. An org admin needs to approve the newly created account.


## Monitors

{{< img src="mobile/monitors.jpg" alt="monitor page" style="width:50%;">}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. You can specify by field name and build-specific search queries based on your tagging strategy. For more information about search, see the [Manage Monitors Search section][5]. For example, to filter on metric monitors related to the SRE team that is being alerted, use the query `"status:Alert type:Metric team:sre"`. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert. Your ten most recent searches are saved so that you have faster access previous queries.

**Note:** To set up or edit monitors and notifications, you need to do it in the [Datadog web app][6]. All monitor set up in the web app are visible in the mobile app. For more information, see [Creating monitors][7].

## Dashboards

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org. Click into an individual dashboard to view it.

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][8]. For more information, see [Dashboards][9].

## Account

Switch organizations and log out from the Account page.

## Troubleshooting and Known Issues

- [SAML login][4] is not currently supported. You can login using standard and Google authentication. If you have SAML enabled but not strictly, you can access the mobile app by creating a new standard email account. An org admin needs to approve the newly created account.
- Switching orgs does not always work correctly, especially if the new org requires Google OAuth.

## Feedback

If you have feedback on the beta, [contact Datadog support][10]. You can also send a message in the [Datadog public Slack][11] [#mobile-app][12] channel. 

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/us/app/testflight/id899247664
[2]: https://apple.co/2xEC5ke
[3]: https://play.google.com/apps/testing/com.datadog.app
[4]: /account_management/saml/#pagetitle
[5]: /monitors/manage_monitor/#search
[6]: https://app.datadoghq.com/monitors
[7]: /monitors/monitor_types/
[8]: https://app.datadoghq.com/dashboard/lists
[9]: /dashboards/
[10]: /help/
[11]: https://chat.datadoghq.com/
[12]: https://datadoghq.slack.com/archives/C0114D5EHNG
