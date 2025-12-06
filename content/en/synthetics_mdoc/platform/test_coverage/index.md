---
title: Test Coverage
description: Evaluate your testing suite's coverage of browser actions.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Platform > Test Coverage
sourceUrl: https://docs.datadoghq.com/synthetics/platform/test_coverage/index.html
---

# Test Coverage

## Overview{% #overview %}

Explore your testing suite's Synthetic test coverage of RUM browser actions on the [**Test Coverage** page](https://app.datadoghq.com/synthetics/test-coverage/browser), which you can find under **Digital Experience** > **Synthetic Monitoring & Testing**.

The [**Test Coverage** page](https://app.datadoghq.com/synthetics/test-coverage/browser) provides actionable insight into the overall testing coverage of your [RUM applications](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/). It uses [data collected from the Browser RUM SDK](https://docs.datadoghq.com/real_user_monitoring/browser/data_collected/) and [results from Synthetic browser tests](https://docs.datadoghq.com/synthetics/browser_tests/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/test_coverage/browser_actions.6bc120e75e68218e3806f391fec89132.png?auto=format"
   alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" /%}

The Test Coverage page presents the following information:

- The top visited web pages
- The percentage of tested [RUM actions](https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-actions/)
- The number of tested and total actions
- The number of browser tests covering actions
- The number of real user interactions

## Investigate test coverage for an application or view{% #investigate-test-coverage-for-an-application-or-view %}

Build a more comprehensive, accurate testing suite by identifying untested actions and linking them with real user interactions on the Test Coverage page.

To identify areas in your application or views where you should create browser tests:

1. Select a RUM application from the **Application** dropdown menu or a view from the **View Name** dropdown menu.
1. Click **Custom** to filter the data on [custom actions](https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-actions/), which are unique and offer more accurate coverage results compared to generated actions. If you want to include generated actions in the test coverage analysis, select **All Actions**.
1. Identify gaps in your test coverage by examining the information presented in the following sections:
   {% dl %}
   
   {% dt %}
**Test Coverage Overview**
   {% /dt %}

   {% dd %}
Displays the percentage of actions being tested, the percentage of actions being tested weighted by the number of real user interactions, and a list of top views with their counts of user sessions and browser tests, and the percentage of actions being tested.
   {% /dd %}

   {% dt %}
**Untested Actions**
   {% /dt %}

   {% dd %}
   Displays the number of untested user actions, the number of total actions collected, and a list of top actions that real users most interact with but are *not* being tested.
      {% /dd %}

   {% dt %}
**Tested Actions**
   {% /dt %}

   {% dd %}
   Displays the number of browser tests covering user actions, the number of real user interactions, and a list of top actions that real users most interact with and *are* being tested.
      {% /dd %}

      {% /dl %}

The [Test Coverage page](https://app.datadoghq.com/synthetics/test-coverage/browser) populates actions that are extensively used, and hides actions that are less commonly used in your application. For more information about the data displayed, see [Synthetic Monitoring Metrics](https://docs.datadoghq.com/synthetics/metrics/).

## View replays and add tests{% #view-replays-and-add-tests %}

Use the information on the [Test Coverage page](https://app.datadoghq.com/synthetics/test-coverage/browser) to answer the following questions:

- What actions are not being tested in your application?
- What views are the most popular to your users?
- What actions need more browser tests?
- What percentage of browser tests are covering user actions?

### View session replays{% #view-session-replays %}

Click on the **Play** icon next to an action in the **Untested Actions** table to examine a [recording of real user interaction](https://docs.datadoghq.com/real_user_monitoring/session_replay/browser/) in [Session Replay](https://app.datadoghq.com/rum/explorer/).

### Examine actions{% #examine-actions %}

Click on an action to access the number of tests, views, sessions, and a subset of these tests, views, and sessions that include the selected action.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/test_coverage/tested_action.cb03294b90d94cd73772382076498c74.png?auto=format"
   alt="An action sidepanel with tabs displaying related Synthetic tests, RUM views, and session replays" /%}

Add the most popular sections of your application to a new or existing browser test so that you are alerted when key user journeys in your application are negatively impacted by a code change.

To create a test, click **+ New Test** on the top right of the [Test Coverage page](https://app.datadoghq.com/synthetics/test-coverage/browser). You can run tests [directly in your CI/CD pipelines](https://docs.datadoghq.com/continuous_testing/) to ensure no regressions occur before releasing code in production.

## Further Reading{% #further-reading %}

- [Track your test coverage with Datadog RUM and Synthetic Monitoring](https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/)
- [Learn about Synthetic browser tests](https://docs.datadoghq.com/synthetics/browser_tests)
- [Learn about RUM actions](https://docs.datadoghq.com/real_user_monitoring/browser/tracking_user_actions)
- [Learn about Session Replay](https://docs.datadoghq.com/real_user_monitoring/session_replay)
