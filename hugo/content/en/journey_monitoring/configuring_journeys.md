---
title: Configure Journeys
description: Define journeys and add Product Analytics, RUM, and Synthetic coverage.
aliases:
- /journey_monitoring/guide/
- /journey_monitoring/guide/configuring_journeys/
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/details_report/"
  tag: "Documentation"
  text: "Learn about the journey details report"
---


## Overview

Use this page to configure journeys that represent important user flows and reveal their health.

Configuring an [event-based journey][28] has three steps:

1. Create a journey and define its user flow.
2. Add [Real User Monitoring (RUM) operations][21] that represent critical technical steps.
3. Add [Synthetic tests][24] that cover the journey.

After completing these steps, validate the journey's [key performance indicators (KPIs)][26], operations, [service level objectives (SLOs)][25], tests, and [variants][3].

In a [Synthetics-only configuration][29], [test suites][14] appear automatically as journeys.

## When to use Journey Monitoring

Journey Monitoring combines user behavior and technical health for an end-to-end flow. It can serve as the primary place to monitor and troubleshoot a flow that would otherwise require separate configurations across several products.

Common alternatives include:

- **RUM**:
  - [Funnels in the RUM Session Explorer][30] or funnel widgets based on RUM events
  - Widgets that track user activity, such as button clicks or pageviews
  - Custom metrics or actions that measure flow volume, time to completion, or completed journeys
  - [Custom vitals][31] that represent key technical steps, which RUM operations can represent within a journey
- **Synthetic Monitoring & Testing**: Multiple tests that cover the same flow but are not organized into a journey's test suite
- **[Product Analytics][22]**: Funnels, journey paths, or other visualizations that track behavior across an end-to-end flow

Journey Monitoring uses Product Analytics to understand user behavior and experience, RUM to evaluate performance and availability, and Synthetic tests to detect regressions and measure [journey uptime][17].

## Before you begin

Review the [Journey Monitoring prerequisites][1]. Journey Monitoring requires an active trial or paid subscription to at least one supported product.

Different configuration steps require different products:

- Defining a journey with action or view events requires RUM and Product Analytics Preview, trial, or paid access.
- Adding RUM operation data requires an active trial or paid subscription to [RUM without Limits™][4].
- Adding Synthetic coverage requires an active trial or paid subscription to [Synthetic Browser Tests][12] or [Synthetic Mobile Tests][13].

### Permissions and roles

Journey Monitoring uses assets from several products, so access to journeys and linked assets depends on each product's permissions. See [Journey Monitoring roles and permissions][15] for access requirements.

To create or edit journeys:

- Your role must have Journey Monitoring write access.
- Creating a journey's Synthetic test suite also requires Synthetic Monitoring write access. Without it, Datadog creates the journey without a test suite. Add one later with the required access.

## Step 1: Create a journey

### RUM and Product Analytics

Use RUM action or view events to define an event-based journey.

#### Choose a user flow

Create journeys for critical user flows that support a business outcome. A journey should span multiple steps and represent a significant action.

Follow these guidelines to keep each journey focused:

**Do:**

- Create a separate journey for each distinct user flow.
- Use shared start and end events to reveal [upstream and downstream journeys][16].
- Use one high-level journey and attribute filters to compare cohorts, such as users in the United States and the United Kingdom.

**Do not:**

- Create a journey for a single, short interaction. Use a RUM operation instead.
- Combine several distinct user flows in one journey.
- Create duplicate journeys that differ only by an attribute value, such as country.

#### Choose a creation method

Create a journey manually when you know which user flow to monitor. Start with a [suggested journey][2] to use a flow that Datadog identifies from user activity.

To create a journey:

1. Go to **Digital Experience > Journey Monitoring**.
2. Click **New Journey**, or select a suggested journey from the map or catalog.
3. Select a frontend application.
4. Enter a journey name.
5. Select one or more start events.
6. Select one or more end events.
7. Optionally, add a description, attribute filters, team ownership, tags, or variants.
8. Click **Save Journey**.

Suggested journeys include a preconfigured name, description, start event, and end event. Review these fields before saving. After you save the journey, Datadog opens its [details report][5].

#### Define start and end conditions

Select action events, view events, or both. The [funnel][27] updates based on the selected events and shows volume, conversion rate, and average time to convert for each step.

##### Multiple start and end events

Multiple start events can represent several entry points into the same user flow. Multiple end events can represent several valid conclusions.

Each additional event broadens the journey definition. A large number of start or end events can make the journey's scope unclear and its KPIs less precise.

##### Attribute filters

Journey-level attributes include or exclude broad cohorts, such as internal users. Attributes on individual start and end conditions further narrow the flow.

Including important attribute filters in the journey's name or description helps users understand the scope of its KPIs.

##### Referrer paths

Referrer paths limit a start or end event to instances that follow a specific page view. They help distinguish an event that appears in several journey contexts from the instance that belongs to a particular journey.

##### Select meaningful start and end events

A start event should clearly begin the journey and represent an intentional user action.

<div class="alert alert-danger">Choose an end event that confirms that the journey is complete. Clicking <strong>Pay</strong> or <strong>Submit</strong> does not confirm success. If a later event confirms success, use that event so failed attempts are not counted as completed journeys.</div>

For example:

- **Sign-in journey**
  - Start: The user opens the sign-in page.
  - End: The application redirects the user to the home screen.
  - Avoid ending in: The user clicks **Sign in**.
- **Checkout journey**
  - Start: The user opens the checkout page.
  - End: The application displays a payment confirmation modal.
  - Avoid ending in: The user clicks **Pay**.
- **Form submission journey**
  - Start: The user opens the form.
  - End: The application displays a submission confirmation message.
  - Avoid ending in: The user clicks **Submit**.

#### Add variants

A variant represents a common sequence of intermediate events between the journey's start and end. Add variants to compare KPIs and telemetry data across different paths.

#### Add tags and ownership

Tags and team ownership help teams find relevant journeys and filter the [journey catalog][20]. A consistent naming and tagging convention keeps journeys organized as the catalog grows.

### Synthetics only

With only Synthetic Monitoring & Testing, test suites appear automatically as journeys. Create another test suite to add a journey.

## Step 2: Add RUM operations

RUM operations measure the availability and latency of critical actions in the journey. Use them to investigate whether technical performance contributes to user drop-off.

SLOs on linked operations contribute to [journey status][6].

### Review matching operations

Datadog uses time correlation to identify existing RUM operations that may be part of the journey. These operations appear as **Matching** in the details report.

Link an operation only if users encounter it while completing the journey.

{{< img src="journey_monitoring/journey-monitoring-matching-operations.png" alt="The Journey Monitoring details report showing time-based matching RUM operations with executions, success rate, latency, and SLO creation options." style="width:100%;" >}}

### Create operations

If no matching operation represents a critical action, choose an instrumentation method:

- **RUM SDK APIs**: [Instrument the operation in your frontend application code][10] and explicitly report when it starts, succeeds, or fails. This method provides precise control over the operation's lifecycle, but requires code changes.
- **Datadog UI**: [Create the operation in Datadog][8] by selecting start, success, and failure conditions from ingested RUM events. You can create it from the operations catalog or the Operations table in the journey details report. This method requires no code changes, but captures failures less precisely because it depends on events Datadog already collects.

The [`create_rum_operation` tool in the Datadog MCP Server][32] and the [RUM Operations API][9] also create UI-configured operations from RUM event conditions. Datadog automatically links operations created from a journey details report. For operations created elsewhere, link the operation to the journey after creating it.

### Manage operations

Select **Manage Operations** to add or remove operations from the journey.

Linking an operation:

- Identifies the operation as part of the journey's critical path
- Adds the operation's SLOs to the journey status
- Creates an availability SLO with a 99% objective if the operation does not already have at least one SLO

### Manage operation SLOs

Each linked operation requires at least one SLO for Datadog to evaluate its contribution to the journey. An operation can have availability SLOs, latency SLOs, or both. For guidance, see [Best practices for creating SLOs on RUM operations][11].

<div class="alert alert-tip">
Start with the operation that has the greatest effect on journey conversion. Add more operations as needed.
<ul>
<li>For a user sign-in journey, monitor the final sign-in action to verify that valid credentials result in successful authentication.</li>
<li>For an ecommerce checkout journey, monitor the payment action because a failed payment prevents the user from completing the journey.</li>
</ul>
</div>

## Step 3: Add Synthetic test coverage

Synthetic tests provide technical coverage for critical journey paths. Test failures can indicate regressions that affect users, and covering tests determine journey uptime.

When you create an event-based journey with Synthetic Monitoring write access, Datadog creates a test suite and adds existing tests that cover the journey. The suite includes an editable uptime SLO with a default objective of 99.9%. Without Synthetic Monitoring write access, Datadog creates the journey without a test suite.

For Synthetics-only journeys, the existing test suite defines the journey. The Synthetic Monitoring & Testing section in the journey details report describes suite performance and uptime.

### Review matching tests

For event-based journeys, Datadog uses RUM data to identify Synthetic tests that cover the journey. These matching tests appear in the journey details report and on the test suite page.

- Review each matching test.
- Add tests that cover a critical journey path.

{{< img src="journey_monitoring/journey-monitoring-matching-tests.png" alt="The Journey Monitoring details report showing matching Synthetics tests with alert status and uptime." style="width:100%;" >}}

### Create tests

To create coverage, create a browser test or mobile application test, then add it to the journey's suite.

**Preview**: When no Synthetic test covers a journey, [Bits Testing][18] can generate a covering browser test. [Sign up for the Bits Testing preview][19].

### Manage tests

Select **Manage Tests** to add or remove tests from the journey's test suite. Add covering tests when the suite is empty or when Datadog identifies new matching tests.

### Maintain coverage

- Changes to a journey's start or end conditions can affect which tests cover it. Review coverage after changing these conditions.
- A journey has Synthetic coverage and reports uptime when its suite contains at least one covering test.
- Remove tests that no longer cover the journey, and add new matching tests as the application changes.

Managing coverage modifies Synthetic tests, so it requires Synthetic Monitoring write access and a restriction policy on the suite.

## Validate a journey

After you configure a journey, verify that:

- Its start and end events represent the intended user flow.
- Its KPIs align with expected traffic and user behavior.
- Its variants represent distinct expected paths.
- Each linked RUM operation represents a critical action and has at least one SLO.
- Its test suite contains tests that cover critical paths.
- Its tags and team ownership help users find the journey in the catalog.

## Maintain a journey

After you change a journey's start or end events, review its variants, matching operations, Synthetic coverage, and KPIs. Use the journey catalog to find and edit journeys. The [Journey status page][6] explains how to investigate **Degraded** and **Missing coverage** states.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/#prerequisites
[2]: /journey_monitoring/suggested_journeys/
[3]: /journey_monitoring/details_report/variants/
[4]: /real_user_monitoring/rum_without_limits/
[5]: /journey_monitoring/details_report/
[6]: /journey_monitoring/status/
[8]: /real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[9]: /api/latest/rum-operations/
[10]: /real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[11]: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[12]: /synthetics/browser_tests/
[13]: /synthetics/mobile_app_testing/
[14]: /synthetics/test_suites/
[15]: /journey_monitoring/roles_and_permissions/
[16]: /journey_monitoring/overview/#upstream-and-downstream-journeys
[17]: /journey_monitoring/details_report/#synthetic-monitoring--testing
[18]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[19]: https://www.datadoghq.com/product-preview/bits-testing/
[20]: /journey_monitoring/overview/#journey-catalog
[21]: /real_user_monitoring/operations_monitoring/
[22]: /product_analytics/
[24]: /journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[25]: /service_level_objectives/
[26]: /journey_monitoring/details_report/#traffic-and-conversion-trends
[27]: /product_analytics/charts/funnel_analysis/
[28]: /journey_monitoring/#rum-and-product-analytics
[29]: /journey_monitoring/#synthetics-only
[30]: /real_user_monitoring/explorer/visualize/#funnels
[31]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#measure-component-level-performance-with-custom-vitals
[32]: /mcp_server/tools/#create_rum_operation
