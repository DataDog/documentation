---
title: Mobile App - Datadog Oncall
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

<div class="alert alert-info">The Datadog mobile app is currently in open beta, which means that you may encounter some performance and stability issues - expect some bugs, and we may need to make breaking changes. To join the beta, follow the installation instructions. The beta is not currently available to customers using SAML authentication. If you have feedback on the beta, please let us know by filling out the <a href="https://docs.google.com/forms/d/e/1FAIpQLScRmJ-JOE0tU7fkDdAL_AxKE6xT3TG45qq8lo2r-F-GBvg1jg/viewform">mobile app feedback form</a>.</div>

{{< wistia 7vun3cwysk >}}

The Datadog Oncall app enables on-call engineers to view alerts from Datadog on their mobile device. When alerted by Pagerduty, Slack or other pager apps to a Datadog alert, you'll be able to investigate issues by opening monitor graphs and dashboards on your mobile device.

## Installing

{{< img src="mobile/icon.jpg" alt="mobile icon"  >}}

The Datadog Oncall App is currently in beta, so it's not available in general app stores. To download the app, use the specific invite links in these instructions.

### iOS

1. Install the [Testflight app][1] from the App Store.
2. Open this invite link from your iPhone: [https://apple.co/2xEC5ke][2]. Allow the link to open in the Testflight app. This takes you to a page where you can download the Datadog app.
3. Once the app downloads, open the app, select whether you are logging into the US or EU site, and log in with your Datadog credentials.

### Android

1. To install the android app, open this invite link from your android: [https://play.google.com/apps/testing/com.datadog.app][3]. This takes you to a page where you can download the Datadog app.
2. Once the app downloads, open the app, select whether you are logging into the US or EU site, and log in with your Datadog credentials.

## Monitors

{{< img src="mobile/monitors.png" alt="monitor page"  >}}

On the Monitors page, you can view and search all of the monitors that you have access to in your Datadog org. Click into individual alerts to see details, which can be filtered by type and by alert time. You can also mute the alert.

**Note:** To set up or edit a monitor and alerts, you need to [login to the Datadog browser app][4] and set them up there. All alerts set up in the app are enabled for the mobile app. For more information, see [Creating monitors][5].

## Dashboards

{{< img src="mobile/dashboard.png" alt="dashboard page"  >}}

On the Dashboards page, you can view and search all of the dashboards that you have access to in your Datadog org. Click into an individual dashboard to view it.

**Note:** To set up or edit a dashboard, you need to [login to the Datadog browser app][6]. For more information, see [Dashboards][7].

## Account

Switch organizations and log out from the Account page.

## Troubleshooting and Known Issues

- SAML login is not currently supported. 
- Switching orgs does not always work correctly, especially if the new org requires Google OAuth.
- We're working on improving the layout rendering of Dashboards.

## Feedback

If you have feedback on the beta, please let us know using the built-in mobile **Share Beta Feedback..** functionality or by filling out the [mobile app feedback form][8].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/us/app/testflight/id899247664
[2]: https://apple.co/2xEC5ke
[3]: https://play.google.com/apps/testing/com.datadog.app
[4]: https://app.datadoghq.com/monitors
[5]: /monitors/monitor_types/
[6]: https://app.datadoghq.com/dashboard/lists
[7]: /dashboards/
[8]: https://docs.google.com/forms/d/e/1FAIpQLScRmJ-JOE0tU7fkDdAL_AxKE6xT3TG45qq8lo2r-F-GBvg1jg/viewform
