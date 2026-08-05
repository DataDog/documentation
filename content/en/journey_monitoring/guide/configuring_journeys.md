---
title: Configure Journeys in Datadog Journey Monitoring
description: Configure Journey Monitoring journeys with meaningful start and end events, technical coverage, SLOs, Synthetic tests, and variants.
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

This guide helps teams configure journeys that represent important user flows and provide useful health signals. Use it to select start and end events, add technical coverage, define variants, and maintain journeys.

## Before you begin

Before using this guide, review the [Journey Monitoring overview and prerequisites][1]. Journey Monitoring requires RUM without Limits, Product Analytics, and Synthetic Browser Tests or Synthetic Mobile Tests.

### Permissions and roles

Journey Monitoring draws on several products, so access to a journey and to its linked assets depends on the permissions for each product. Before you create or view journeys, check the following:

**Before you create journeys:**

- You need write access to Journey Monitoring to create and edit journeys.
- Creating a journey's Synthetic test suite also requires Synthetic Monitoring write access. Without it, Datadog creates the journey without a test suite, and you can add one later.

For more details about viewing and editing journeys and their linked assets, see [Roles and Permissions][11].

## Choose the right user flows for journeys

Create journeys for critical, user-facing flows that users must complete to support a business outcome. A journey should span multiple steps and represent a significant action.

Select a flow with a clear scope:

- Do not create a journey for a single, short interaction. Monitor that interaction as a [RUM operation][4].
- Do not create one journey that contains several distinct user flows. Split the flow into multiple journeys that connect to one another. Shorter, focused journeys are easier to manage and reduce irrelevant variation in journey data.
- Do not create duplicate journeys that differ only by an attribute value, such as country. Create one high-level journey and use attribute filters to compare cohorts, such as users in the United States and the United Kingdom.

## Create journeys from suggestions or manually

Create a journey from scratch or start with a suggested journey. For instructions, see [Journey Monitoring setup][2].

Choose a creation method based on whether you have a specific user flow in mind:

- Start with a [suggested journey][7] if you are unsure which journeys to create. Suggested journeys provide high-level key performance indicators (KPIs), including starts, conversions, and conversion rate.
- Review new suggested journeys as you release features and update the application experience. Datadog generates suggestions based on user activity in the application.
- Create a journey manually when you have a specific user flow that you want to monitor.

## Define journey start and end conditions

A journey is defined by its start and end events. Select action events, view events, or both.

### Use multiple start and end events

Use multiple start events when several entry points lead into the same user flow. Use multiple end events when the flow has several valid conclusions.

Each additional start or end event broadens the journey definition. Too many events can make the journey's scope unclear and its key performance indicators (KPIs) less precise.

### Filter journeys with attributes

Use journey-level attributes to include or exclude broad cohorts, such as internal users. Combine these attributes with attributes on individual start and end conditions to define a more specific flow.

Describe important attribute filters in the journey's name or description so that users understand the scope of its KPIs.

### Narrow events with referrer paths

Use referrer paths to limit a start or end event to instances that follow a specific page view. Referrer paths help distinguish an event that appears in several journey contexts from the instance that belongs to this journey.

<div class="alert alert-info">Intermediate steps are not part of the base journey definition. Configure intermediate steps as <a href="/journey_monitoring/details_report/variants/">journey variants</a>.</div>

### Select start and end events

Choose a start event that clearly begins the journey and represents an intentional user action.

<div class="alert alert-warning">Choose an end event that occurs after the final step of the journey finishes. Do not use the action that initiates the final step when a later event confirms that the journey completed.</div>

For example:

- **Sign-in journey**
  - Start: The user opens the sign-in page.
  - Avoid: The user clicks **Sign in**.
  - Use: The application redirects the user to the home screen.
- **Checkout journey**
  - Start: The user opens the checkout page.
  - Avoid: The user clicks **Pay**.
  - Use: The application displays a payment confirmation modal.
- **Form submission journey**
  - Start: The user opens the form.
  - Avoid: The user clicks **Submit**.
  - Use: The application displays a submission confirmation message.

## Add journey names, tags, and ownership

Add tags and team ownership to every journey. Tags and ownership help teams find relevant journeys and filter the journey catalog. Establish a consistent convention before creating multiple journeys.

> [PLACEHOLDER: Provide a recommended naming convention and tag taxonomy, and explain how to assign ownership to the teams responsible for each journey.]

## Add technical coverage to a journey

After defining a journey, add coverage to explain changes in traffic and conversion metrics. Coverage helps distinguish technical factors, such as errors, failed operations, or latency, from users choosing not to continue.

Add technical coverage with:

- **RUM operations**: Measure critical technical steps within the journey.
- **Synthetic test suites**: Track journey uptime and availability.

## Configure RUM operations

### Link suggested operations

The journey details report suggests existing RUM operations that may be relevant to the journey. Link an operation when users encounter it while completing the journey.

Linking an operation provides these capabilities:

- Maps the operation to the journey's technical path.
- Allows you to associate a service level objective (SLO) with the operation.

### Create operations

If Datadog does not suggest a relevant operation, create an operation in Datadog, with the Datadog API, or with the RUM SDK APIs.

> [PLACEHOLDER: Add links to the instructions for creating operations in Datadog, with the Datadog API, and with RUM SDK APIs.]

<div class="alert alert-info">
<p><strong>Recommendation</strong>: Start with the operation that has the greatest effect on journey conversion. Add more operations as needed.</p>
<ul>
<li>For a sign-in journey, monitor the final sign-in action to verify that valid credentials result in successful authentication.</li>
<li>For an ecommerce checkout journey, monitor the payment action because a failed payment prevents the user from completing the journey.</li>
</ul>
</div>

For information about executions, success rate, latency, breached SLOs, monitors, and backend dependencies, see [RUM operations][4].

### Set SLOs on key RUM operations

<!-- Confirm this behavior before publishing. -->

To include a linked operation in the journey status, associate an SLO with the operation. Add SLOs to the critical operations identified during configuration.

> [PLACEHOLDER: Explain how to create an SLO for a linked operation and how to select objectives and thresholds for a critical operation.]

<!-- Product note: Confirm whether Datadog plans to create these SLOs automatically. -->

## Manage Journey testing coverage

Datadog automatically creates a test suite and an editable uptime SLO with a default objective of 99.9% for each journey. Datadog also adds tests that cover the journey. For information about coverage, adding or removing tests, and the uptime SLO, see [Journey uptime][5].

### Evaluate journey coverage

Datadog infers which Synthetic tests cover a journey from RUM data and highlights them on the journey details page and on the Synthetic test suite page. To evaluate coverage:

- Review the tests that Datadog marks as covering the journey.
- If covering tests exist in your organization but are not in the suite, Datadog displays an indicator for the additional covering tests. Use it to find coverage you have not added yet.

### Add tests to a journey

Add a covering test when the suite is empty or when Datadog detects covering tests that are not in the suite:

- To add existing tests, select **Manage journey coverage** and choose the tests to add.
- To add new coverage, create a Synthetic test manually. See [Browser Testing][8] or [Mobile Application Testing][9], then organize the test into the journey's suite. For more information about suites, see [Test Suites][10].

<div class="alert alert-info"><strong>Preview</strong>: When no test covers a journey, <a href="https://www.datadoghq.com/blog/bits-testing-test-coverage/">Bits Testing</a> can generate a covering browser test to fill the gap. You can sign up to join the <a href="https://www.datadoghq.com/product-preview/bits-testing/">Bits Testing preview</a>.</div>

### Maintain coverage

- After you change a journey's start or end conditions, re-check its coverage, because the set of covering tests can change.
- A journey reports uptime only while at least one covering test remains in its suite. If a journey loses its coverage, it stops reporting uptime.

For more details on journey coverage, see [Journey uptime][5].

Managing coverage acts on Synthetic tests, so it requires Synthetic Monitoring write access and a restriction policy on the suite. See [Roles and Permissions][11].

## Understand and monitor Journey Monitoring status

<!-- Verify status composition with the product team before publishing. -->

A journey's status reflects the health of its technical coverage. Confirm whether the journey status combines:

- The RUM SLO state from SLOs associated with linked operations.
- The Synthetic test suite SLO state from the test suite uptime SLO.

> [PLACEHOLDER: Confirm how the SLO states combine, define each possible status, identify where the status appears, and reconcile this model with the documented uptime SLO model.]

> [PLACEHOLDER: Confirm whether one signal source is sufficient to generate journey status when an application does not have both RUM operation SLOs and a Synthetic test suite SLO.]

## Create variants

A variant defines a specific sequence of intermediate steps between the journey's start and end. Use variants to examine metrics and telemetry data for common user flows.

For information about creating, analyzing, and deleting variants, see [Journey variants][3].

> [PLACEHOLDER: Explain how to identify variants worth tracking, select intermediate steps that define a meaningful path, and use variant filters to compare paths.]

## Explore journeys in the Journey Monitoring catalog and map

<!-- Verify downstream impacted journey behavior before publishing. -->

Use the Journey Monitoring catalog and map to investigate journey health:

- Filter the catalog by state to identify degraded journeys and investigate potentially impacted downstream journeys.
- Use the map to understand how users traverse journeys and identify the highest-traffic flows.

> [PLACEHOLDER: Describe a triage workflow that starts with a degraded journey, traces downstream impact, and prioritizes remediation.]

For information about the map and its controls, see the [Journey Monitoring map][6].

## Validate the Journey Monitoring configuration

> [PLACEHOLDER: Explain how long data takes to appear, describe healthy funnel, operation, and test data, and provide a validation procedure.]

- [ ] The journey has start and end events and displays traffic.
- [ ] At least one operation SLO or test suite SLO is configured.
- [ ] The test suite has at least one covering test.

## Maintain Journey Monitoring journeys

> [PLACEHOLDER: Explain how to update start and end conditions, add operations, SLOs, and tests as the application changes, revisit variants, and review ownership and tags.]

## Troubleshoot Journey Monitoring

> [PLACEHOLDER: Replace each placeholder with the likely cause and resolution.]

| Symptom | Likely cause | Resolution |
|---------|--------------|------------|
| The journey does not have a status | [PLACEHOLDER] | [PLACEHOLDER] |
| The journey does not display traffic or conversion data | [PLACEHOLDER] | [PLACEHOLDER] |
| Datadog does not suggest operations, or an operation cannot be linked | [PLACEHOLDER] | [PLACEHOLDER] |
| The test suite does not have covering tests and displays an uptime warning | [PLACEHOLDER] | [PLACEHOLDER] |
| The conversion rate appears incorrect | [PLACEHOLDER] | [PLACEHOLDER] |
| [PLACEHOLDER: Add a symptom] | [PLACEHOLDER] | [PLACEHOLDER] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<!--
AUTHORING NOTES:
- Add screenshots only when they clarify a configuration decision that the
  existing documentation does not illustrate.
- Replace all placeholders and incomplete checklist items.
- Write for customers in the second person.
- Resolve the status composition and downstream impacted journey open items.
- Complete a final documentation style and Vale review before publishing.
-->

[1]: /journey_monitoring/
[2]: /journey_monitoring/#setup
[3]: /journey_monitoring/details_report/variants/
[4]: /real_user_monitoring/operations_monitoring/
[5]: /journey_monitoring/uptime/
[6]: /journey_monitoring/map/
[7]: /journey_monitoring/map/suggested_journeys/
[8]: /synthetics/browser_tests/
[9]: /synthetics/mobile_app_testing/
[10]: /synthetics/test_suites/
[11]: /journey_monitoring/roles_and_permissions/
