---
title: RUM Performance Overview Dashboards
aliases:
- '/real_user_monitoring/dashboards/performance_overview_dashboard/'
- '/real_user_monitoring/dashboards/resources_dashboard'
- '/real_user_monitoring/dashboards/mobile_dashboard'
- '/real_user_monitoring/platform/dashboards/performance_overview_dashboard/'
- '/real_user_monitoring/platform/dashboards/resources_dashboard'
- '/real_user_monitoring/platform/dashboards/mobile_dashboard'

further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Web app performance


The web app performance dashboard offers a bird's-eye view of RUM web applications. It shows:

- **Core web vitals**: 
  For all views, three browser performance metrics are highlighted: Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. Other performance metrics, such as Load Time, are also available.
- **XHR and Fetch requests and resources**:
  For all views, identify bottlenecks when your application loads.
- **Long tasks** : Events that block the browser's main thread for more than 50ms.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -web-app.png" alt="Out-of-the-box RUM Web App Performance Overview Dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][1].

## Mobile app performance


The mobile app performance dashboard gives an overview of RUM mobile applications. It shows:

- **Mobile vitals**:
  For all screens, four mobile performance metrics are highlighted: slow renders, CPU ticks per seconds, frozen frames, and memory usage. Other performance metrics, such as crash-free sessions, are also available.
- **Resources analysis**:
  For all screens, identify bottlenecks when your application requests content.
- **Crashes and errors**:
  Identify where crashes and errors can surface in your application.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -mobile-app.png" alt="Out-of-the-box RUM Web App Performance Overview Dashboard" style="width:100%" >}}

For more information about the data displayed, see our documentation for each platform: [iOS RUM][2], [Android RUM][3], [React Native RUM][4], and [Flutter RUM][5].

## Resources


The RUM resources dashboard helps you identify which resources have the heaviest impact on your application. It shows:

- **Most requested resources**:
  Visualize which resources are being loaded the most, and measure their size and load time.
- **XHR and Fetch requests**:
  Requests repartition, method, and error status codes.
- **Resource load timings**:
  Monitor the trends in resource timings (DNS Lookup, Initial Connection, Time To First Byte, Download) collected by the browser SDK.
- **3rd party resources**:
  Understand which of your 3rd party resources are having the most impact on your application.

{{< img src="real_user_monitoring/dashboards/dashboard-performance-resources.png" alt="Out-of-the-box RUM Web App Performance Overview Dashboard" style="width:100%" >}}

For more information about the data displayed, see [Real User Monitoring Data Security][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
[2]: /real_user_monitoring/ios/data_collected/
[3]: /real_user_monitoring/android/data_collected/
[4]: /real_user_monitoring/reactnative/data_collected/
[5]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /data_security/real_user_monitoring/