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


The Synthetic Monitoring & Testing Overview page gives you a single view of the health and coverage of your Synthetic tests, helping you answer two questions:

- **What is failing?** Identify which tests are in alert, see where failures are concentrated, and take action on each failing test.
- **What is not tested yet?** Find the highest-traffic endpoints and views that no Synthetic test covers, and create tests for them.

Use this page as the starting point for triaging failures and for deciding where to add test coverage.

## Prerequisites

- To see untested endpoints, enable [APM][1] for your services.
- To see untested views, enable [RUM][2] for your web or mobile applications.

The [Test Health](#test-health) section of the Overview page doesn't require APM or RUM.

## Test health

The {{< ui >}}Test Health{{< /ui >}} section shows how many tests are in alert out of your total number of tests. Click {{< ui >}}View all alerting tests{{< /ui >}} to open the full list.

### Filter tests

Use these filters to scope the map and the list of failing tests:

- {{< ui >}}Teams{{< /ui >}}: Show tests owned by one or more teams.
- {{< ui >}}Environment{{< /ui >}}: Show tests for one or more environments.
- {{< ui >}}Tags{{< /ui >}}: Show tests with specific tags.
- {{< ui >}}Creator{{< /ui >}}: Show tests created by specific users.

### Find concentrated failures

The map shows where failures concentrate. It first splits tests into {{< ui >}}OK{{< /ui >}} and {{< ui >}}In alert{{< /ui >}}. Each tile represents a group and shows how many tests it contains. Larger tiles contain more tests.

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

- Click {{< ui >}}Investigate with Bits{{< /ui >}} to start an AI-assisted investigation of the failure.
- Click {{< ui >}}View Traces{{< /ui >}} to see the backend traces for an API test.
- Click {{< ui >}}View Failing Step{{< /ui >}} to open the step where a browser test failed.

Click the kebab menu (**⋮**) on a test to:

- {{< ui >}}Run test now{{< /ui >}}: Trigger a test run outside its schedule.
- {{< ui >}}Pause scheduling{{< /ui >}}: Stop scheduled runs for the test.
- {{< ui >}}Open in Results Explorer{{< /ui >}}: See the test's results in the [Results Explorer][3].

## Coverage gaps

The {{< ui >}}Close your coverage gaps{{< /ui >}} section shows the endpoints and views that no Synthetic test covers. Datadog ranks them by traffic, which is the number of requests or views over the past week. Start with the items at the top of the list to cover your highest-traffic surfaces first.

Use the toggle in the upper-right corner of the section to switch between {{< ui >}}Endpoints{{< /ui >}} and {{< ui >}}Views{{< /ui >}}. Use the search bar to find a specific service, application, endpoint, or view.

### Read the coverage grid

Each card represents a service or an application. Each square in a card represents one endpoint or view:

| Color  | Meaning                 |
|--------|-------------------------|
| Blue   | Tested                  |
| Orange | Untested, high traffic  |
| Gray   | Untested, lower traffic |

High traffic is defined as follows:

- **Endpoints**: Across the top 20 services, Datadog sorts endpoints by number of requests over the past week. The endpoints that together make up 90% of requests are high traffic.
- **Views**: Across the top 20 applications, Datadog sorts views by number of views over the past week. The views that together make up 90% of views are high traffic.

### Untested endpoints

The {{< ui >}}Endpoints{{< /ui >}} view lists untested API endpoints from APM. It shows the top 20 services by traffic. Each entry shows the HTTP method, the path, and the service.

By default, {{< ui >}}Group by service{{< /ui >}} is on, so the view shows one card per service, with the number of untested endpoints in each. Click a service card to filter the list to that service's endpoints, ranked by number of requests over the past week.

To create a test for an endpoint:

1. Click a service card to filter the list to that service.
2. Hover over the endpoint at the top of the list, which has the most requests over the past week.
3. Click {{< ui >}}Create an API Test{{< /ui >}}.
4. In the new [API test][4], which opens with the endpoint URL prefilled, complete the test configuration and click {{< ui >}}Save{{< /ui >}}.

### Untested views

The {{< ui >}}Views{{< /ui >}} view lists untested views from RUM for your web and mobile applications. It shows the top 20 applications by number of views over the past week. Each entry shows the view name and the application.

By default, {{< ui >}}Group by application{{< /ui >}} is on, so the view shows one card per application, with the number of untested views in each.

To create a test for a view:

1. Hover over a view in the list.
2. Click {{< ui >}}Create a Browser Test{{< /ui >}} for a web application view, or {{< ui >}}Create a Mobile Test{{< /ui >}} for a mobile application view.
3. Configure the new test, which opens with no fields prefilled:
   - For a web application view, in the new [browser test][5], enter the starting URL, record your steps, and click {{< ui >}}Save{{< /ui >}}.
   - For a mobile application view, in the new [mobile app test][6], select your application, record your steps, and click {{< ui >}}Save{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /real_user_monitoring/
[3]: /synthetics/explore/results_explorer/
[4]: /synthetics/api_tests/
[5]: /synthetics/browser_tests/
[6]: /synthetics/mobile_app_testing/
