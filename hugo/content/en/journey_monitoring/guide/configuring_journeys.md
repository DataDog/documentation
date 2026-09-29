---
title: Configuring Journeys in Datadog
description: Configure journeys with meaningful start and end events, technical coverage, SLOs, Synthetic tests, and variants.
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/details_report/"
  tag: "Documentation"
  text: "Learn about the journey details report"
- link: "/journey_monitoring/uptime/"
  tag: "Documentation"
  text: "Learn about journey uptime"
---


## Overview

This guide explains how to configure journeys that represent important user flows and reveal their health.

Journey configuration has three steps:

1. Create a journey and define its user flow.
2. Add RUM operations that represent critical technical steps.
3. Add Synthetic tests that cover the journey.

After completing these steps, validate the journey's key performance indicators (KPIs), operations, service level objectives (SLOs), tests, and variants.

## When to use Journey Monitoring

Journey Monitoring combines user behavior and technical health for an end-to-end flow. It can serve as the primary place to monitor and troubleshoot a flow that would otherwise require separate configurations across several products.

Common alternatives include:

- **Real User Monitoring (RUM)**:
  - Funnels in the RUM Session Explorer or funnel widgets based on RUM events
  - Widgets that track user activity, such as button clicks or page views
  - Custom metrics or actions that measure flow volume, time to completion, or completed journeys
  - Custom vitals that represent key technical steps, which RUM operations can represent within a journey
- **Synthetic Monitoring**: Multiple tests that cover the same flow but are not organized into a journey's test suite
- **Product Analytics**: Funnels, journey paths, or other visualizations that track behavior across an end-to-end flow

Journey Monitoring uses Product Analytics to understand user behavior and experience, RUM to evaluate performance and availability, and Synthetic tests to detect regressions and measure journey uptime.

## Before you begin

Before following this guide, review the [Journey Monitoring overview and prerequisites][1]. To use Journey Monitoring, your organization must have a paid or trial subscription to at least one of the following products: RUM without Limits, Product Analytics, Synthetic Browser Tests, or Synthetic Mobile Tests.

### Permissions and roles

Journey Monitoring uses assets from several products, so access to journeys and linked assets depends on each product's permissions.

To create or edit journeys:

- Your role must have Journey Monitoring write access.
- Creating a journey's Synthetic test suite also requires Synthetic Monitoring write access. Without it, Datadog creates the journey without a test suite, and you can add one later.

For more details about viewing and editing journeys and their linked assets, see [Roles and Permissions][10].

## Step 1: Create a journey

### Choose a user flow

Create journeys for critical, user-facing flows that users must complete to support a business outcome. A journey should span multiple steps and represent a significant action.

Follow these guidelines to keep each journey focused:

**Do:**

- Create a separate journey for each distinct user flow, and connect related journeys to one another.
- Use one high-level journey and attribute filters to compare cohorts, such as users in the United States and the United Kingdom.

**Do not:**

- Create a journey for a single, short interaction. Use a [RUM operation][4] instead.
- Combine several distinct user flows in one journey.
- Create duplicate journeys that differ only by an attribute value, such as country.

### Choose a creation method

Create a journey manually or start with a suggested journey. For instructions, see [Journey Monitoring setup][2].

Choose a creation method based on whether you have a specific user flow in mind:

- Start with a [suggested journey][6] if you are unsure which journeys to create. Suggested journeys provide high-level KPIs, including starts, conversions, and conversion rate.
- Review new suggested journeys as you release features and update the application experience. Datadog generates suggestions based on user activity in the application.
- Create a journey manually when you have a specific user flow that you want to monitor.

### Define start and end conditions

A journey is defined by its start and end events. Select action events, view events, or both.

#### Multiple start and end events

Multiple start events can represent several entry points into the same user flow. Multiple end events can represent several valid conclusions.

Each additional event broadens the journey definition. A large number of start or end events can make the journey's scope unclear and its KPIs less precise.

#### Attribute filters

Journey-level attributes include or exclude broad cohorts, such as internal users. Attributes on individual start and end conditions further narrow the flow.

Including important attribute filters in the journey's name or description helps users understand the scope of its KPIs.

#### Referrer paths

Referrer paths limit a start or end event to instances that follow a specific page view. They help distinguish an event that appears in several journey contexts from the instance that belongs to a particular journey.

#### Journey variants

The base journey definition includes only start and end events. A variant adds a specific sequence of intermediate action or view events between those points. Variants distinguish common paths through the same journey without changing the journey's overall scope.

Selecting a variant filters the journey's metrics and telemetry to that sequence of events. This lets you compare volume, conversion rate, and time to completion across different paths. Attribute filters can further narrow a variant to a specific cohort.

Each variant requires a unique name and at least one intermediate event. For information about creating, analyzing, and deleting variants, see [Journey variants][3].

#### Start and end event selection

A start event should clearly begin the journey and represent an intentional user action.

<div class="alert alert-danger">Choose an end event that confirms that the journey is complete. Clicking "Pay" or "Submit" doesn't mean the action worked. If a later event confirms success, use that event instead, so failed attempts aren't counted as completed journeys.</div>

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

### Add names, tags, and ownership

Tags and team ownership help teams find relevant journeys and filter the journey catalog. A consistent naming and tagging convention keeps journeys organized as the catalog grows.

## Step 2: Add RUM operations

RUM operations provide technical coverage for key moments in the journey. Their availability and latency help explain whether technical performance contributes to user drop-off.

### Link suggested operations

The journey details report uses time correlation to suggest existing RUM operations that may be part of the journey. Link an operation only if users encounter it while completing the journey.

{{< img src="journey_monitoring/journey-monitoring-correlated-operations.png" alt="The Journey Monitoring details report showing time-based correlated RUM operations with executions, success rate, latency, and SLO creation options." style="width:100%;" >}}

Linking an operation:

- Links the operation to the journey and identifies it as part of the journey's critical path.
- Automatically creates an availability SLO for the operation if it does not already have an SLO.

### Create operations

Create an operation with one of the following methods:

- [In Datadog][11]
- [With the RUM Operations API][12]
- [With the RUM SDK APIs][13]

### Create SLOs for operations

Each linked operation requires at least one SLO for Datadog to evaluate its contribution to the journey. An operation can have availability SLOs, latency SLOs, or both. For guidance, see [Best practices for creating SLOs on RUM operations][14].

When you create an operation from the journey details report, Datadog links it to the journey and creates an availability SLO. If you create an operation with the RUM SDK APIs or RUM Operations API, use the [RUM Operations API][12] to link it to the journey.


<div class="alert alert-tip">
Start with the operation that has the greatest effect on journey conversion. Add more operations as needed.
<ul>
<li>For a user sign-in journey, monitor the final sign-in action to verify that valid credentials result in successful authentication.</li>
<li>For an ecommerce checkout journey, monitor the payment action because a failed payment prevents the user from completing the journey.</li>
</ul>
</div>

## Step 3: Add Synthetic test coverage

Synthetic tests provide technical coverage for critical journey paths. Test failures can indicate regressions that affect users, and covering tests determine journey uptime.

Datadog automatically creates a Synthetic test suite and an editable uptime SLO with a default objective of 99.9% for each journey. It also adds Synthetic tests that cover the journey. For information about test coverage, managing tests, and the uptime SLO, see [Journey uptime][5].

### Review journey coverage

Datadog uses RUM data to identify Synthetic tests that cover a journey. These tests appear on the journey details page and the Synthetic test suite page.

- Review the tests that Datadog identifies as covering the journey.
- If Datadog identifies covering tests that are not in the suite, an indicator highlights the additional tests.

### Add tests to a journey

Add covering tests when the suite is empty or when Datadog identifies additional tests:

- To add existing tests, select **Manage journey coverage**, then select the tests to add.
- To create coverage, create a [browser test][7] or [mobile application test][8], then add it to the journey's suite. For more information, see [Test Suites][9].

{{< img src="journey_monitoring/journey-monitoring-covering-tests.png" alt="The Manage Tests in Suite panel showing Synthetic browser tests that cover a journey." style="width:100%;" >}}

**Preview**: When no Synthetic test covers a journey, [Bits Testing][15] can generate a covering browser test. [Sign up for the Bits Testing preview][16].

### Maintain coverage

- Changes to a journey's start or end conditions can affect which tests cover it. Review coverage after changing these conditions.
- A journey reports uptime only when its suite contains at least one covering test. If the journey loses coverage, it stops reporting uptime.

Managing coverage modifies Synthetic tests, so it requires Synthetic Monitoring write access and a restriction policy on the suite. See [Roles and Permissions][10].

## Validate the Journey Monitoring configuration

A well-configured journey has the following characteristics:

- Its top-level KPIs—starts, conversion volume, conversion rate, and time to convert—align with expected user behavior.
- Its linked RUM operations and Synthetic tests represent the technical performance of critical steps in the journey.
- Each linked operation has at least one SLO and a high success rate, indicating that critical steps are available to users.
- Its Synthetic tests produce consistent results without intermittent failures.
- If users can complete the journey through different expected paths, variants represent those paths.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/
[2]: /journey_monitoring/#setup
[3]: /journey_monitoring/details_report/variants/
[4]: /real_user_monitoring/operations_monitoring/
[5]: /journey_monitoring/uptime/
[6]: /journey_monitoring/map/suggested_journeys/
[7]: /synthetics/browser_tests/
[8]: /synthetics/mobile_app_testing/
[9]: /synthetics/test_suites/
[10]: /journey_monitoring/roles_and_permissions/
[11]: /real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[12]: /api/latest/rum-operations/
[13]: /real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[14]: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[15]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[16]: https://www.datadoghq.com/product-preview/bits-testing/
