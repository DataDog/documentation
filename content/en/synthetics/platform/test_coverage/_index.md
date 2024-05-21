---
title: Test Coverage
kind: documentation
description: Evaluate your testing suite's coverage of browser actions and API endpoints.
aliases:
  - /synthetics/dashboards/testing_coverage
  - /synthetics/test_coverage
further_reading:
- link: 'https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/'
  tag: 'Blog'
  text: 'Track your test coverage with Datadog RUM and Synthetic Monitoring'
- link: 'https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/'
  tag: 'Blog'
  text: 'Improve your API test coverage with Datadog Synthetic Monitoring'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Synthetic browser tests'
- link: '/real_user_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Learn about RUM actions'
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
- link: '/api_catalog'
  tag: 'Documentation'
  text: 'Learn about the API Catalog'
---

## Overview

Explore your testing suite's Synthetic test coverage of RUM browser actions or API endpoints on the [**Test Coverage** page][1], which you can find under **Digital Experience** > **Synthetic Monitoring & Testing**.

{{< tabs >}}
{{% tab "Browser Actions" %}}
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
[3]: /real_user_monitoring/browser/data_collected/
[4]: /synthetics/browser_tests/
[5]: /real_user_monitoring/guide/send-rum-custom-actions/
[6]: /synthetics/metrics/
[7]: /real_user_monitoring/session_replay/browser/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /continuous_testing/

{{% /tab %}}
{{% tab "API Endpoints" %}}

The [**Test Coverage** page][1] provides actionable insight into the overall testing coverage of your [API endpoints][2]. It uses [data collected from the API Catalog][2] and [spans from APM][3].

{{< img src="synthetics/test_coverage/api_endpoints.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

The Test Coverage page presents the following information:

- The overall coverage of your API endpoints
- The percentage of tested API endpoints
- The number untested API endpoints with the highest request count, sorted by error rate
- The percentage of tested API endpoints with API tests that have not been tested in CI
- The number of untested API endpoints that have [APM monitors][4] 

## Investigate test coverage for API endpoints

Maintain a comprehensive, accurate testing suite by resolving issues that are causing your Synthetic tests to fail and your API endpoints to experience poor performance. 

To identify areas in your testing suite where you should create API tests:

1. Click the **Untested** checkbox in the **API overall coverage** section.
2. Investigate the endpoint side panel to see all the passing or failing tests that have been created for the endpoint. The **Dependency Map** displays upstream issues that may be contributing to your endpoint's poor performance, and downstream dependencies that are affected.
3. Identify gaps in your API test coverage by examining the information presented in the following sections: 

   **API Overall Coverage** 
   : Displays all of the untested endpoints within your tag scope. 

   **Performance**
   : Displays the most engaged, untested endpoints with significant error rates.

   **Tested in the CI**
   : Displays the endpoints that are currently being tested in your CI pipelines. 

   **APM Monitors**
   : Displays the endpoints that are untested but have active monitors on them. 

For more information about the data displayed, see [APM Metrics][5].

## Add tests

To create a test, click **+ New Test** on the top right of the [Test Coverage page][1]. You can run tests [directly in your CI/CD pipelines][6] to ensure no regressions occur before releasing code in production.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/api
[2]: /api_catalog/monitor_apis/
[3]: /tracing/
[4]: /monitors/types/apm
[5]: /tracing/metrics/
[6]: /continuous_testing/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser