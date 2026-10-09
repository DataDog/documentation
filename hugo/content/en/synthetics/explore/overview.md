---
title: Synthetic Monitoring Overview Page
description: Use the Synthetic Monitoring & Testing Overview page to see which tests are failing, where failures cluster, and which endpoints and views have no test coverage.
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Synthetic Monitoring"
- link: "/synthetics/explore/results_explorer/"
  tag: "Documentation"
  text: "Synthetic Monitoring & Testing Results Explorer"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "API Testing"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Browser Testing"
- link: "/synthetics/mobile_app_testing/"
  tag: "Documentation"
  text: "Mobile Application Testing"
---

## Overview

The Synthetic Monitoring & Testing {{< ui >}}Overview{{< /ui >}} page shows the health and coverage of your Synthetic tests in one place. It answers two questions:

- **What is failing?** See which tests are in alert, where failures cluster, and act on each failing test.
- **What is not tested yet?** Find the endpoints and views with the most traffic that no Synthetic test covers, and create tests for them.

Use this page as the starting point for triaging failures and for deciding where to add test coverage.

## Prerequisites

- To see untested endpoints, you need [APM][1] enabled for your services.
- To see untested views, you need [RUM][2] enabled for your web or mobile applications.

The tests in alert section does not require APM or RUM.

## Review tests in alert

The top of the page shows how many tests are in alert out of your total number of tests. Click {{< ui >}}View all alerting tests{{< /ui >}} to open the full list.

### Filter tests

Use these filters to scope the map and the list of failing tests:

- {{< ui >}}Teams{{< /ui >}}: Show tests owned by one or more teams.
- {{< ui >}}Environment{{< /ui >}}: Show tests for one or more environments.
- {{< ui >}}Tags{{< /ui >}}: Show tests with specific tags.
- {{< ui >}}Creator{{< /ui >}}: Show tests created by specific users.

### Find where failures cluster

The map shows where failures concentrate. Tests first split into {{< ui >}}OK{{< /ui >}} and {{< ui >}}In alert{{< /ui >}}. Each tile represents a group and shows how many tests it contains. Larger tiles contain more tests.

Use the {{< ui >}}Group by{{< /ui >}} menu to choose how the map groups tests:

- {{< ui >}}Location{{< /ui >}}
- {{< ui >}}Test type{{< /ui >}}
- {{< ui >}}Priority{{< /ui >}}
- {{< ui >}}Failure reason{{< /ui >}}
- {{< ui >}}Environment{{< /ui >}}
- {{< ui >}}Team{{< /ui >}}

When you group by location, a test appears under every location it runs from. Each tile shows whether the test is failing in that location. As a result, the tile counts can add up to more than your total number of tests.

### Act on a failing test

The list next to the map shows every test in alert. Each entry shows the test name, the URL or request it checks, and the locations where it fails.

Click a tile in the map to filter the list to the tests in that tile.

For each failing test, you can:

- Click {{< ui >}}Investigate With Bits{{< /ui >}} to start an AI-assisted investigation of the failure.
- Click {{< ui >}}View Traces{{< /ui >}} to see the backend traces for an API test.
- Click {{< ui >}}View Failing Step{{< /ui >}} to open the step where a browser test failed.

Click the kebab menu to:

- {{< ui >}}Run test now{{< /ui >}}: Trigger a test run outside its schedule.
- {{< ui >}}Pause scheduling{{< /ui >}}: Stop scheduled runs for the test.
- {{< ui >}}Open in Results Explorer{{< /ui >}}: See the test's results in the [Results Explorer][3].

## Close your coverage gaps

The {{< ui >}}Close your coverage gaps{{< /ui >}} section shows the endpoints and views that no Synthetic test covers. Datadog ranks them by traffic, which is the number of requests or views over the past week. Start with the items at the top of the list to cover your highest-traffic surfaces first.

Use the toggle in the upper-right corner of the section to switch between {{< ui >}}Endpoints{{< /ui >}} and {{< ui >}}Views{{< /ui >}}. Use the search bar to find a specific service, application, endpoint, or view.

### Read the coverage grid

Each card represents a service or an application. Each square in a card represents one endpoint or view:

| Color  | Meaning                 |
|--------|-------------------------|
| Blue   | Tested                  |
| Orange | Untested, high traffic  |
| Gray   | Untested, lower traffic |

<!-- TODO (validate): Confirm the high-traffic threshold. Working assumption: endpoints and views at or above p90 traffic are orange. -->

### Untested endpoints

The {{< ui >}}Endpoints{{< /ui >}} view lists untested API endpoints from APM. It shows the top 20 services by traffic. Each entry shows the HTTP method, the path, and the service.

Turn on {{< ui >}}Group by service{{< /ui >}} to show one card per service, with the number of untested endpoints in each.

To create a test for an endpoint:

1. Hover over an endpoint in the list.
2. Click {{< ui >}}Create an API Test{{< /ui >}}.
3. Datadog opens a new [API test][4] with the endpoint URL prefilled. Complete the test configuration and click {{< ui >}}Save{{< /ui >}}.

### Untested views

The {{< ui >}}Views{{< /ui >}} view lists untested views from RUM for your web and mobile applications. Each entry shows the view name and the application.

Turn on {{< ui >}}Group by application{{< /ui >}} to show one card per application, with the number of untested views in each.

To create a test for a view:

1. Hover over a view in the list.
2. Click {{< ui >}}Create a Browser Test{{< /ui >}} for a web application view, or {{< ui >}}Create a Mobile Test{{< /ui >}} for a mobile application view.
3. Datadog opens a new test with no fields prefilled:
   - For a web application view, Datadog opens a new [browser test][5]. Enter the starting URL, record your steps, and click {{< ui >}}Save{{< /ui >}}.
   - For a mobile application view, Datadog opens a new [mobile app test][6]. Select your application, record your steps, and click {{< ui >}}Save{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /real_user_monitoring/
[3]: /synthetics/explore/results_explorer/
[4]: /synthetics/api_tests/
[5]: /synthetics/browser_tests/
[6]: /synthetics/mobile_app_testing/
