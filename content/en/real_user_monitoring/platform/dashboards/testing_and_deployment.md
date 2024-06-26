---
title: Testing and Deployment Dashboards
kind: documentation
description: Learn about the out-of-the-box RUM testing and deployment dashboards.
aliases:
- '/real_user_monitoring/dashboards/testing_coverage'
- '/real_user_monitoring/platform/dashboards/testing_coverage'
further_reading:
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM & Session Replay'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: 'https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/'
  tag: 'Blog'
  text: 'Track your test coverage with RUM and Synthetic Monitoring'
---

## Testing coverage


The [Synthetics & RUM application testing coverage dashboard][1] uses data collected from [RUM][2] and results from Synthetic [browser tests][3] to provide insights about the overall testing coverage for your application. 

You can use this dashboard to answer the following questions:

- What is and what is not being tested in your application?
- How do you identify the most popular sections of your application to continuously monitor?
- How do you find the most popular user actions in your application to add browser test coverage? 

It shows:

- **Percentage of tested actions**: Scan your application's overall testing coverage.
- **Untested actions**: Explore the most popular untested user actions with the count of real user interactions and the number of actions covered in browser tests.

{{< img src="synthetics/dashboards/testing_coverage-2.png" alt="Out-of-the-box Synthetics testing coverage dashboard" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests-1.png" alt="Untested RUM actions and top Synthetic browser tests covering RUM actions sections of the Synthetics testing coverage dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][2].

## Web deployment tracking

The RUM Web App Deployment Tracking dashboard helps you identify when a recent deployment is causing performance issues or new errors within your application. To use this feature, make sure that you [add RUM versions to your application][4]. This dashboard shows:

- **Core web vitals**:
  For all views, three browser performance metrics are highlighted: Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. Other performance metrics, such as Load Time, are also available.
- **Errors**: 
  See a count of errors, percentage of views with errors, and explore ongoing issues.
- **Browser performance metrics**:
  Compare performance metrics like loading time, sessions, errors, and load times across different services and versions.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-web.png" alt="Out-of-the-box web deployment dashboard" style="width:100%" >}}

## Mobile deployment tracking

The RUM Mobile App Deployment Tracking dashboard helps you to identify when a recent deployment or release is causing performance issues or new errors within your mobile application. If you need to directly compare versions, use the RUM summary page deployment tracking section.

To use deployment tracking, make sure to specify an app version when you initialize the **Datadog SDK**.

This dashboard shows:

- **Crashes**: 
  Review crash count by version, crash rate by version, and explore ongoing crashes.
- **Errors**:
  Review error count by version, error rate by version, and explore ongoing errors.
- **Mobile vitals by version**:
  For all versions, four mobile performance metrics are highlighted: slow renders, frozen frames, application start time, and memory usage.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-mobile.png" alt="Out-of-the-box mobile deployment dashboard" style="width:100%" >}}

For more information about the data displayed, see our documentation for each platform: [iOS RUM][5], [Android RUM][6], [React Native RUM][7], and [Flutter RUM][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /real_user_monitoring/browser/setup/#initialization-parameters
[5]: /real_user_monitoring/ios/data_collected/
[6]: /real_user_monitoring/android/data_collected/
[7]: /real_user_monitoring/reactnative/data_collected/
[8]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter