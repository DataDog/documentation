---
title: Test Coverage
kind: documentation
description: The Test Coverage page recommends views and actions that need new Synthetic browser tests for fuller test coverage, and compares Synthetic steps to real user behavior.
aliases:
  - /synthetics/dashboards/testing_coverage
further_reading:
- link: 'https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/'
  tag: 'Blog'
  text: 'Track your test coverage with Datadog RUM and Synthetic Monitoring'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: '/real_user_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Learn about RUM actions'
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

The [**Test Coverage** page][1] uses browser data collected from [RUM][2] and [Synthetic browser test results][3] to provide insights about the overall testing coverage of your RUM applications. 

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

You can build a more comprehensive, accurate testing suite by considering the following information presented on the page:

- The top visited web pages
- The percentage of tested RUM actions
- The number of tested and total actions
- The number of browser tests covering actions
- The number of real user interactions 

## Investigate test coverage for an application or view

To get started with understanding the completeness of your test coverage:

1. Select a RUM application from the **Application** dropdown menu or a view from the **View Name** dropdown menu. 
2. Click **Custom** to filter the data on [custom actions][4], which are unique and offer more accurate coverage results compared to generated actions. If you want to include generated actions in the test coverage analysis, select **All Actions**.
3. Identify gaps in your test coverage by examining the information presented in the following sections: 

   **Test Coverage Overview** 
   : Displays the percentage of actions being tested, the percentage of actions being tested weighted by the number of real user interactions, and a list of top views with their counts of user sessions and browser tests, and the percentage of actions being tested. 

   **Untested Actions**
   : Displays the number of untested user actions, the number of total actions collected, and a list of top actions that real users most interact with but are _not_ being tested.

   **Tested Actions**
   : Displays the number of browser tests covering user actions, the number of real user interactions, and a list of top actions that real users most interact with and _are_ being tested. 

The [Test Coverage page][1] populates actions that are extensively used, and hides actions that are less commonly used in your application. For more information about the data displayed, see [Synthetic Monitoring Metrics][5].

## View replays and add tests

Use the information on the [Test Coverage page][1] to answer the following questions:

- What actions are not being tested in your application?
- What views are the most popular to your users? 
- What actions need more browser tests?
- What percentage of browser tests are covering user actions? 

### View session replays

Click on the **Play** icon next to an action in the **Untested Actions** table to examine a [recording of real user interaction][7] in [Session Replay][8]. 

### Examine actions

Click on an action to access the number of tests, views, sessions, and a subset of these tests, views, and sessions that include the selected action. 

{{< img src="synthetics/test_coverage/tested_action.png" alt="An action sidepanel with tabs displaying related Synthetic tests, RUM views, and session replays" style="width:100%" >}}

Add the most popular sections of your application to a new or existing browser test so that you are alerted when key user journeys in your application are negatively impacted by a code change.

 To create a test, click **+ New Test** on the top right of the [Test Coverage page][1]. You can run tests [directly in your CI/CD pipelines][6] to ensure no regressions occur before releasing code in production.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /real_user_monitoring/guide/send-rum-custom-actions/
[5]: /synthetics/metrics/
[6]: /continuous_testing/
[7]: /real_user_monitoring/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/