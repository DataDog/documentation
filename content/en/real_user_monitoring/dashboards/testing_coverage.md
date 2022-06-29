---
title: RUM Application Testing Coverage Dashboard
kind: documentation
description: Learn about the out-of-the-box RUM application testing coverage dashboard.
further_reading:
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM & Session Replay'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
---

## Overview

The [application testing coverage dashboard][1] uses data collected from [RUM & Session Replay][2] and results from Synthetic [browser tests][3] to provide insights about the overall testing coverage for your application. 

You can use this dashboard to answer the following questions:

- What is and what is not being tested in your application?
- How do you identify the most popular sections of your application to continuously monitor?
- How do you find the most popular user actions in your application to add browser test coverage? 

For more information, see [Explore RUM & Session Replay in Synthetics][4].

It shows:

- **Untested actions**: Explore the most popular untested user actions with the count of real user interactions and the number of actions covered in browser tests.
- **Top Synthetic browser tests**: Analyze the the list of browser tests with the count of tested RUM actions.

{{< img src="synthetics/dashboards/testing_coverage.png" alt="Out-of-the-box Synthetics testing coverage dashboard" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests.png" alt="Untested RUM actions and top Synthetic browser tests covering RUM actions sections of the Synthetics testing coverage dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][2].

## Manage browser tests

In order to improve your testing coverage and better manage your browser tests, this dashboard can help you answer the following questions:

- What actions are not being tested in your application?
- What views are the most popular to your users? 
- What actions need more browser tests?
- What percentage of browser tests are covering user actions? 

By creating more browser tests to monitor your RUM views and actions, you are alerted when key user journeys in your application are negatively impacted by a code change. You can run tests [directly in your CI/CD pipelines][5] to ensure no regressions occur before releasing code in production. 

To add a browser test for a top view or untested action, click on a view with a low percentage of tested actions under **Top Views** or an action under **Untested Actions** and select **Create a Synthetics browser test** from the dropdown menu. Clicking **View RUM events** navigates you to the [RUM Explorer][6] with an autofilled search query for actions with a specific view name.

The **Top Views** table lists the most popular web pages that users are interacting with, along with the number of real user interactions and the percentage of actions that are tested in browser tests. 

## Explore custom actions

Use the dropdown menus to customize the data types and view [custom actions][7] specific to your queried data. 

Because you are the one instrumenting your code to define these custom actions, your definitions result in more accurate results compared to a generic, generated **Click on Save** action.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /real_user_monitoring/browser/data_collected/
[3]: /synthetics/browser_tests/
[4]: /synthetics/guide/explore-rum-through-synthetics/
[5]: /synthetics/cicd_integrations/
[6]: /real_user_monitoring/explorer
[7]: /real_user_monitoring/guide/send-rum-custom-actions/
