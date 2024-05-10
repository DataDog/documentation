---
title: RUM Usage Dashboard
kind: documentation
aliases:
  - '/real_user_monitoring/dashboards/frustration_signals_dashboard'
  - '/real_user_monitoring/dashboards/user_sessions_dashboard'
  - '/real_user_monitoring/platform/dashboards/frustration_signals_dashboard'
  - '/real_user_monitoring/platform/dashboards/user_sessions_dashboard'
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Web usage


The RUM Web App Usage dashboard provides insights about how your customers are using your application. It shows:

- **Application usage**:
  See graphs of the average session duration, pageviews per sessions, actions per session, and errors per session. The tables below list usage metrics based on the first and last visited pages.
- **User journeys**:
  See what pages your users are spending the most time on, and see where they start and end their journey across your application.
- **Engagement matrix**:
  See what portion of your users are performing which actions.
- **User demographics**:
  Observe the number of sessions by country and the top countries, devices, and operating systems for your application. You can also view a graph of the top browser usage shares.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="Out-of-the-box RUM web app usage dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][1].

## Mobile usage


The RUM Mobile App Usage dashboard provides insights about how your customers are using your application.

- **Application usage**:
  Get a better picture of your users by understanding what application version, Datadog SDK, and browser they are running. Compare this week's and last week's sessions. See overall bounce rate.
- **User journeys**:
  See what pages your users are spending the most time on, and see where they start and end their journey across your application.
- **Engagement matrix**:
  See what portion of your users are performing which actions.
- **User demographics**:
  Observe the number of sessions by country and the top countries, devices, and operating systems for your application. You can also view a graph of the top browser usage shares.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-mobile-app.png" alt="Out-of-the-box RUM mobile app usage dashboard" style="width:100%" >}}

For more information about the data displayed, see our documentation for each platform: [iOS RUM][2], [Android RUM][3], [React Native RUM][4], and [Flutter RUM][5].

## User demographics


The RUM User Demographics dashboard gives you insight into geographic adoption of your application.

- **Global Data**: 
  Get a global view of your users and see which countries, regions, and cities use your application the most.
- **Compare Continents and Compare Countries**:
  See how your users experience your application differently based on their continent and country.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-user-demographics.png" alt="Out-of-the-box RUM user demographics dashboard" style="width:100%" >}}

For more information about the data displayed, see [Real User Monitoring Data Security][6].

## Frustration signals


The RUM Frustration Signals dashboard gives you insight into where your users are getting frustrated, annoyed, or blocked on their workflow. Frustration signals are split into three different types:

- **Rage Click**:
  When a user clicks the same button more than 3 times in a 1 second sliding window.
- **Error Click**:
  When a user clicks an element and encounters a JavaScript error.
- **Dead Click**:
  When a user clicks on a static element that produces no action on the page.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-frustration-signals.png" alt="Out-of-the-box RUM frustration signals dashboard" style="width:100%" >}}

For more information about the data displayed, see [Real User Monitoring Data Security][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
[2]: /real_user_monitoring/ios/data_collected/
[3]: /real_user_monitoring/android/data_collected/
[4]: /real_user_monitoring/reactnative/data_collected/
[5]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /data_security/real_user_monitoring/