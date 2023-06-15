---
title: Mobile Vitals
kind: documentation
description: Learn about mobile vitals collected by Flutter Monitoring.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

Real User Monitoring offers Mobile Vitals, a set of metrics that can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good.

You can view Mobile Vitals for your application by navigating to  **UX Monitoring > Performance Summary** and selecting your application.

{{< img src="real_user_monitoring/flutter/flutter-mobile-vitals-1.png" alt="Mobile Vitals in the Performance Summary tab" style="width:90%;">}}

To access the RUM mobile app performance dashboard, scroll down to the Monitor Performance Metrics section from the application summary page and click **Performance Overview**.

{{< img src="real_user_monitoring/flutter/flutter-performance-overview.png" alt="Mobile performance overview dashboard" style="width:90%;">}}

Understand your application's overall health and performance with the line graphs displaying metrics across various application versions. To filter on application version or see specific sessions and views, click on a graph. 

{{< img src="real_user_monitoring/ios/rum_explorer_mobile_vitals.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;">}}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

Most Flutter mobile vitals are powered by native Datadog iOS and Android SDKs for RUM.

- For iOS metrics, see [RUM iOS Mobile Vitals][1].
- For Android metrics, see [RUM Android Mobile Vitals][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/mobile_vitals/
[2]: /real_user_monitoring/android/mobile_vitals/
