---
title: Error Dashboards
description: "Monitor and analyze RUM errors with comprehensive dashboards showing error trends, affected users, and stack trace information."
aliases:
- '/real_user_monitoring/platform/dashboards/errors_dashboard'
- '/real_user_monitoring/platform/dashboards/errors'
further_reading:
- link: '/real_user_monitoring/investigate_problems/explore_retained_data/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Web app errors


The RUM web app errors dashboard provides insights about your applications' errors. It helps you focus on the views or versions that are generating the most errors. It shows:

- {{< ui >}}Code errors{{< /ui >}}:
  Get an overview of which parts of your application are generating the most errors. To investigate further, see [Error Tracking][1] to investigate critical frontend errors and learn when new errors appear.
- {{< ui >}}Network errors{{< /ui >}}:
  Monitor which resources are generating the most errors.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-web.png" alt="Out-of-the-box RUM Web App Errors Dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][2].

## Mobile app crashes and errors


The RUM mobile app crashes and errors dashboard provides insights about your mobile applications' errors. It helps you focus on the views or versions that are generating the most errors. It shows:

- {{< ui >}}Code errors{{< /ui >}}:
  Get an overview of which parts of your application are generating the most errors. To investigate further, see [Error Tracking][1] to investigate critical frontend errors and learn when new errors appear.
- {{< ui >}}Network errors{{< /ui >}}:
  Monitor which resources are generating the most errors.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-mobile.png" alt="Out-of-the-box RUM Mobile App Errors Dashboard" style="width:100%" >}}

For more information about the data displayed, see the documentation for each platform: [iOS RUM][3], [Android RUM][4], [React Native RUM][5], and [Flutter RUM][6].

## Next step

Continue to [Configure Permissions](/real_user_monitoring/administer_and_extend_rum/configure_permissions/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /real_user_monitoring/setup/data_collected/?platform=browser
[3]: /real_user_monitoring/setup/data_collected/?platform=ios
[4]: /real_user_monitoring/setup/data_collected/?platform=android
[5]: /real_user_monitoring/setup/data_collected/?platform=react_native
[6]: /real_user_monitoring/setup/data_collected/?platform=flutter