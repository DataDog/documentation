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
3. Identify gaps in your test coverage by examining the information presented in the following sections of the Test Coverage page:

**Test Coverage Overview** 
: Displays the percentage of actions being tested, the percentage of actions being tested weighted by the number of real user interactions, and a list of top views with their counts of user sessions and browser tests, and the percentage of actions being tested. 

**Untested Actions**
: Displays the number of untested user actions, the number of total actions collected, and a list of top actions that real users most interact with but are _not_ being tested.

**Tested Actions**
: Displays the number of browser tests covering user actions, the number of real user interactions, and a list of top actions that real users most interact with and _are_ being tested. 

For more information about the data displayed, see [Synthetic Monitoring Metrics][5].

## Gain insights and add tests

Use the information on the Test Coverage page to answer the following questions:

- What actions are not being tested in your application?
- What views are the most popular to your users? 
- What actions need more browser tests?
- What percentage of browser tests are covering user actions? 

If you determine that you need better test coverage, add a browser test directly from the Test Coverage page:

1. Select a top view or untested action in the list.
2. Click **Create New Browser Test**. 

Add the most popular sections of your application to a new or existing browser test so that you are alerted when key user journeys in your application are negatively impacted by a code change. 

You can also run tests [directly in your CI/CD pipelines][6] to ensure no regressions occur before releasing code in production.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /real_user_monitoring/guide/send-rum-custom-actions/
[5]: /synthetics/metrics/
[6]: /continuous_testing/
