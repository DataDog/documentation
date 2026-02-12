---
title: Test Coverage
description: Evaluate your testing suite's coverage of browser actions.
aliases:
  - /synthetics/dashboards/testing_coverage
  - /synthetics/test_coverage
further_reading:
- link: 'https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/'
  tag: 'Blog'
  text: 'Track your test coverage with Datadog RUM and Synthetic Monitoring'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Learn about RUM actions'
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

Explore your testing suite's Synthetic test coverage of RUM browser actions on the [**Test Coverage** page][1], which you can find under **Digital Experience** > **Synthetic Monitoring & Testing**.

The [**Test Coverage** page][1] provides actionable insight into the overall testing coverage of your [RUM applications][2]. It uses [data collected from the Browser RUM SDK][3] and [results from Synthetic browser tests][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

The Test Coverage page presents the following information:

- The top visited web pages
- The percentage of tested [RUM actions][5]
- The number of tested and total actions
- The number of browser tests covering actions
- The number of real user interactions 

## Investigate test coverage for an application or view

Build a more comprehensive, accurate testing suite by identifying untested actions and linking them with real user interactions on the Test Coverage page. 

To identify areas in your application or views where you should create browser tests:

1. Select a RUM application from the **Application** dropdown menu or a view from the **View Name** dropdown menu. 
2. Click **Custom** to filter the data on [custom actions][5], which are unique and offer more accurate coverage results compared to generated actions. If you want to include generated actions in the test coverage analysis, select **All Actions**.
3. Identify gaps in your test coverage by examining the information presented in the following sections: 

   **Test Coverage Overview** 
   : Displays the percentage of actions being tested, the percentage of actions being tested weighted by the number of real user interactions, and a list of top views with their counts of user sessions and browser tests, and the percentage of actions being tested. 

   **Untested Actions**
   : Displays the number of untested user actions, the number of total actions collected, and a list of top actions that real users most interact with but are _not_ being tested.

   **Tested Actions**
   : Displays the number of browser tests covering user actions, the number of real user interactions, and a list of top actions that real users most interact with and _are_ being tested. 

The [Test Coverage page][1] populates actions that are extensively used, and hides actions that are less commonly used in your application. For more information about the data displayed, see [Synthetic Monitoring Metrics][6].

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

 To create a test, click **+ New Test** on the top right of the [Test Coverage page][1]. You can run tests [directly in your CI/CD pipelines][9] to ensure no regressions occur before releasing code in production.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /synthetics/guide/explore-rum-through-synthetics/
[3]: /real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /synthetics/browser_tests/
[5]: /real_user_monitoring/guide/send-rum-custom-actions/
[6]: /synthetics/metrics/
[7]: /session_replay/browser/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /continuous_testing/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
