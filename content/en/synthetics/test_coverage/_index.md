---
title: Application Test Coverage
kind: documentation
description: The Test Coverage page provides recommended views and untested actions for you to create browser tests or compare the number of tests to real user behavior.
aliases:
  - /synthetics/dashboards/testing_coverage
further_reading:
- link: 'https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/'
  tag: 'Blog'
  text: 'Track your test coverage with Datadog RUM and Synthetic Monitoring'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM & Session Replay'
---

## Overview

The [**Application Test Coverage** page][1] uses browser data collected from [RUM][2] and [Synthetic browser test results][3] to provide insights about the overall testing coverage of your RUM application. 

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

You can use the following topics to build a more comprehensive, accurate testing suite:

- A list of top visited web pages
- The percentage of tested RUM actions
- The number of tested and total actions
- The number of browser tests covering actions
- The number of real user interactions 

## Select a RUM application or view

Select a RUM application from the **Application** dropdown menu or a view from the **View Name** dropdown menu. Click **All Actions** or **Custom** to filter the data on [custom actions][4]. Datadog recommends using custom actions. By default, custom actions are unique and offer more accurate coverage results compared to generated actions.

**Test Coverage Overview** 
: Displays the percentage of actions being tested, the percentage of actions being tested weighted by the number of real user interactions, along with a list of top views, the count of user sessions, the count of browser tests, and the percentage of actions being tested. 

**Untested Actions**
: Displays the number of untested user actions, the number of total actions collected, along with a list of top actions that real users most interact with, but are not being tested.

**Tested Actions**
: Displays the number of browser tests covering user actions, the number of real user interactions, along with a list of top actions that real users most interact with, and are being tested. 

For more information about the data displayed, see [Synthetic Monitoring Metrics][5].

## Manage Synthetic browser tests

In order to improve your testing coverage and better manage your browser tests, use the [**Test Coverage** page][1] to help answer the following questions:

- What actions are not being tested in your application?
- What views are the most popular to your users? 
- What actions need more browser tests?
- What percentage of browser tests are covering user actions? 

To add a browser test for a top view or untested action, click **+ Create New Browser Test**. By adding the most popular sections of your application to an existing browser test or creating a browser test, you are alerted when key user journeys in your application are negatively impacted by a code change. 

You can also run tests [directly in your CI/CD pipelines][6] to ensure no regressions occur before releasing code in production.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /real_user_monitoring/guide/send-rum-custom-actions/
[5]: /synthetics/metrics/
[6]: /continuous_testing/
