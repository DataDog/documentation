---
title: Synthetics Application Testing Coverage Dashboard
kind: documentation
description: Learn about the out-of-the-box Synthetics application testing coverage dashboard.
further_reading:
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM & Session Replay'
---

## Overview

The [application testing coverage dashboard][1] uses data collected from [RUM & Session Replay][2] and results from Synthetic [browser tests][3] to provide insights about the overall testing coverage for your application. For more information, see [Explore RUM & Session Replay in Synthetics][4].

You can use this dashboard to build a more complete, accurate testing suite with information such as the percentage of tested RUM actions, number of tested and total actions, number of tests covering actions, and number of real user interactions. It shows:

- **Untested actions**: Explore the most popular untested user actions with the count of real user interactions and the number of actions covered in browser tests.
- **Top Synthetic browser tests**: Analyze the the list of browser tests with the count of tested RUM actions.

{{< img src="synthetics/dashboards/testing_coverage.png" alt="Out-of-the-box Synthetics testing coverage dashboard" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests.png" alt="Untested RUM actions and top Synthetic browser tests covering RUM actions sections of the Synthetics testing coverage dashboard" style="width:100%" >}}

For more information about the data displayed, see [Synthetic Monitoring Metrics][5].

## Manage browser tests

In order to improve your testing coverage and better manage your browser tests, you need to understand what actions are not being tested in your application, what views are most popular to your users, what actions need more browser tests, and what percentage of browser tests cover user actions. 

To add a browser test for a top view or untested action, click on a view with a low percentage of tested actions under **Top Views** or an action under **Untested Actions** and select **Create a Synthetics browser test** from the dropdown menu. Clicking **View RUM events** navigates you to the [RUM Explorer][6] with an autofilled search query for actions with a specific view name.

The **Top Views** table lists the most popular web pages that users are interacting with, along with the number of real user interactions and the percentage of actions that are tested in browser tests. 

## Explore custom actions

Use the dropdown menus to customize the data types and view [custom actions][7] specific to your queried data. 

Because you are instrumenting your code to define these custom actions, your definitions may result in more accurate results compared to the generic **Click on Save** action generated.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /synthetics/guide/explore-rum-through-synthetics/
[5]: /synthetics/metrics/
[6]: /real_user_monitoring/explorer
[7]: /real_user_monitoring/guide/send-rum-custom-actions/
