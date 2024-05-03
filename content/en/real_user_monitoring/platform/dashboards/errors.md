---
title: RUM Error Dashboards
kind: documentation
aliases:
- '/real_user_monitoring/platform/dashboards/errors_dashboard'
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Web app errors


The RUM web app errors dashboard provides insights about your applications' errors. It helps you focus on the views or versions that are generating the most errors. It shows:

- **Code errors**:
  Get an overview of which parts of your application are generating the most errors. If you need to dig deeper, see [Error Tracking][1] to investigate critical frontend errors and learn when new errors appear.
- **Network errors**:
  Monitor which resources are generating the most errors.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-web.png" alt="Out-of-the-box RUM Web App Errors Dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][2].

## Mobile app crashes and errors


The RUM mobile app crashes and errors dashboard provides insights about your mobile applications' errors. It helps you focus on the views or versions that are generating the most errors. It shows:

- **Code errors**:
  Get an overview of which parts of your application are generating the most errors. If you need to dig deeper, see [Error Tracking][1] to investigate critical frontend errors and learn when new errors appear.
- **Network errors**:
  Monitor which resources are generating the most errors.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-mobile.png" alt="Out-of-the-box RUM Mobile App Errors Dashboard" style="width:100%" >}}

For more information about the data displayed, see our documentation for each platform: [iOS RUM][3], [Android RUM][4], [React Native RUM][5], and [Flutter RUM][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /real_user_monitoring/data_collected/
[3]: /real_user_monitoring/ios/data_collected/
[4]: /real_user_monitoring/android/data_collected/
[5]: /real_user_monitoring/reactnative/data_collected/
[6]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter