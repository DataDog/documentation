---
title: Browser Testing Results
description: View Synthetic browser test results and compare successful or failed sample runs to test runs. 
aliases:
 - "/synthetics/apm/browser_tests"
further_reading:
- link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals"
  tag: "Blog"
  text: "Monitor Core Web Vitals with Synthetic Monitoring"
- link: "/synthetics/guide/explore-rum-through-synthetics/"
  tag: "Documentation"
  text: "Explore RUM & Session Replay in Synthetics"
- link: "/synthetics/dashboards/browser_test/"
  tag: "Documentation"
  text: "Learn about the Browser Test Performance Dashboard"
---

## Overview

The test details page opens after a Synthetic browser test executes and is organized into four tabs: [Activity](#test-activity), [Test Runs](#test-runs), [Performance](#test-performance), and [Properties](#test-properties). Use these tabs to monitor uptime, inspect individual runs, review aggregate performance metrics, and manage test configuration. When a run fails, see [Failed results](#failed-results) for troubleshooting tools such as AI failure summaries and screenshot comparison.

## Test activity

On the **Activity** tab, you can see:

- The **Global Uptime** graph, which displays the total uptime of all test locations in a given time interval. The global uptime visualization displays red only if the [alert conditions][20] configured for a test are triggered in the given time interval. Since location uptime is computed based on the final test result after retries complete, [fast retry][24] intervals directly impact what appears in your total uptime graph. For more information about uptime monitoring, see the [Website Uptime Monitoring with SLOs][14] guide.
- A **Timeline** of alert triggers, recoveries, and summary periods.
- A detail panel for the selected alert showing what happened, the failing result, and suggested next steps for investigation.

{{< img src="synthetics/browser_tests/synthetics_test_details_sre.png" alt="The Activity tab on a browser Test Details page showing Global Uptime, an alert timeline, and a failure detail panel" style="width=80%" >}}

## Test runs

On the **Test Runs** tab, you can see all individual runs of your test. Filter by status (passed or failed), run type, location, or device, and click any row to inspect that run in detail.

{{< img src="synthetics/browser_tests/synthetics_test_runs.png" alt="The Test Runs tab on a browser Test Details page showing a filterable table of test runs with status, date, run type, steps, duration, location, device, browser, and test version columns" style="width:100%" >}}

Browser test runs include components such as [screenshots](#screenshots-and-actions), [page performance data](#test-performance), [errors](#errors-and-warnings), [resources](#resources), and [backend traces](#backend-traces) to help troubleshoot your [test failure](#failed-results).

{{% collapse-content title="Test run columns" level="h4" %}}

The following describes each column in the **Test Runs** table:

Status
: The status of the test run (`PASSED` or `FAILED`).

Date
: The relative time and timestamp when the run executed.

Run Type
: The type of test run (scheduled, CI, fast retry, or manually triggered).

Steps
: The number of test steps completed out of the total configured for the run.

Duration
: The amount of time the test run took to complete.

Location
: The managed or private location the test was executed from.

Device
: The type of device the test was executed from.

Browser
: The type of browser the test was executed from.

Test Version
: The version of the test configuration used for the run.

{{% /collapse-content %}}

### RUM sessions

To view related sessions and available replays in the [RUM Explorer][22], click **View Session in RUM**. To access a user session for a particular action or step in [Session Replay][23], click **Replay Session**. For more information, see [Explore RUM & Session Replay in Synthetic Monitoring][16].

### Screenshots and actions

Every executed test step contains a screenshot of the step action, a link to the session in Session Replay, the step description, starting URL for a given step, step ID, step duration, and page performance information.

### Errors and warnings

Click the **Errors** pill to access the **Errors & Warnings** tab and examine a list of errors separated by error type (`js` or `network`) and status (the network status code).

{{< img src="synthetics/browser_tests/test_results/synthetics_errors.png" alt="Browser test run details with the Errors pill highlighted on each step, indicating where to click to open the Errors & Warnings tab" style="width:100%" >}}

The **Errors & Warnings** tab displays a list of errors separated by error type (`js` or `network`) and status (the network status code).

The error type is logged when the browser test interacts with the page. It corresponds to the errors collected between the time the page is opened and the time the page can be interacted with. The maximum number of errors that can be displayed is 8, for example: 2 `network` + 6 `js` errors.

### Resources

Click the **Resources** pill to access the **Resources** tab and examine the combination of requests and assets, including the total step duration time under **Fully Loaded** and the CDN provider serving the resources. 

{{< img src="synthetics/browser_tests/test_results/synthetics_resources.png" alt="Browser test run details with the Resources pill highlighted on each step, indicating where to click to open the Resources tab" style="width:100%" >}}

You can filter resources by type and search by name in the search bar. The maximum number of resources that can be displayed is 100. Resources are ordered by the time when they start and display the first 100 in Datadog.

{{% collapse-content title="Resources tab columns" level="h4" %}}

The following describes the column headers on the **Resources** tab:

Relative Time 
: The point in time when the resource began to load during the test step.

CDN
: The CDN provider that served the resource. Hover over a CDN provider's icon to see the raw cache status.  
Datadog detects Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva, and Sucuri.

Resource
: The URL of the resource.

Type
: The type of resource (HTML, Download, CSS, Fetch, Image, JavaScript, XHR, or Other).

Method
: The method of the request.

Protocol
: The protocol of the request.

Status
: The HTTP response status code.

Duration
: The time needed to perform the request.

Size
: The size of the request response.

{{% /collapse-content %}}

### Backend traces

Click the **Traces** pill to access the **Traces** tab and explore APM traces associated with the browser test. While the UI is similar to the [Trace View][7] in the Trace Explorer, one browser test step can make multiple requests to different URLs or endpoints. This results in several associated traces, depending on your tracing setup and on the URLs you allowed in for browser tests in the [Synthetic Monitoring Settings page][8]. 

For more information about cross-product correlation, see the [Ease Troubleshooting With Cross-Product Correlation][21] guide.

### Step duration

Step duration represents the time a step takes to be considered fully loaded using the [Datadog locator system][9]. For more information, see [How Step Duration is Determined in Browser Tests][25].

If your test reaches the maximum execution time, the timeout message indicates that the total duration includes both test steps and system overhead. As a result, the reported test duration may differ from the sum of individual step durations.

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="Test duration execution error message stating 'Maximum test execution time reached. This includes test steps and system overhead, so reported test durations may vary'." style="width:90%;" >}}

## Test performance

On the **Performance** tab, you can see aggregate performance metrics across all runs of your test:

- **Browser success rate** cards for each browser type (Chrome, Firefox, Edge), displaying the percentage of passing runs in the selected time interval.
- **Average Test duration by browser type** and **Average Test duration by location & device** graphs, which display the time each browser, location, and device takes to complete the test in a given time interval.
- **p75 Largest Contentful Paint** and **p75 Cumulative Layout Shift** graphs, which display the 75th percentile of these [Core Web Vital metrics][6] aggregated across runs.

{{< img src="synthetics/browser_tests/synthetics_performance_tab.png" alt="The Performance tab on a browser Test Details page showing browser success rate, test duration graphs, and p75 LCP and CLS Core Web Vital metrics" style="width=80%" >}}

Within an individual test run, [Largest Contentful Paint][2] and [Cumulative Layout Shift][3] are displayed as pills to the right of each step URL. [First Input Delay][4] is available as a real metric if you are using [Real User Monitoring][5] to collect real user data. For more information, see [Monitoring Page Performance][6].

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Synthetic lab metrics" style="width:100%" >}}

## Test properties

The **Properties** tab contains the configuration details, ownership information, and integrations associated with your test. Use the left navigation to switch between sections.

{{< img src="synthetics/browser_tests/synthetics_properties_tab.png" alt="The Properties tab on a browser Test Details page showing Ownership, Execution, and Monitor sections, with left navigation for Continuous Testing, Parent Tests, and other configuration" style="width=80%" >}}

{{% collapse-content title="Properties tab sections" level="h4" %}}

The following describes each section available on the **Properties** tab:

**Ownership**
: Displays the test owner, editor, creation date, last modified date, environments, teams, and tags. Tests also link to an out-of-the-box Synthetic [browser test dashboard][11].

**Execution**
: Shows the test frequency, alert conditions, and retry behavior.

**Monitor**
: Contains the [Synthetic test monitor][13] name, priority, configured recipients, and notification message.

**Continuous Testing**
: Sets the [execution rule][12] used when this test runs as part of a [Continuous Testing CI pipeline][19].

**Parent Tests**
: Lists tests that reference this test, such as multistep tests that include it as a subtest.

**Parent Suites**
: Lists the [test suites][26] this test belongs to.

**Downtimes**
: Lists [scheduled downtimes][27] that pause execution of this test, for example during planned maintenance windows.

**Configuration as Code**
: Exports the test configuration in formats such as Terraform for managing tests as code.

{{% /collapse-content %}}

## Failed results

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential [errors](#errors-and-warnings) at the step level, and looking into [resources][17] and [backend traces](#backend-traces) generated by their steps.

### AI failure summaries

When a browser test run fails, Datadog generates an AI failure summary to help you identify the cause and next steps for investigation. Each summary includes:

- A short explanation of what failed, grounded in run data such as network errors, assertions, and screenshots.
- A classification of the failure as either a **true failure** (a real problem with your application) or a **test misconfiguration** (an issue with the test setup).
- Suggested next steps for troubleshooting.

AI failure summaries appear on the test run details page for any failing browser test run. Treat them as a starting point for investigation, not as authoritative root cause analysis, because LLM-generated content can contain inaccuracies.

{{< img src="synthetics/browser_tests/test_results/synthetics_ai_summaries.png" alt="AI failure summary panel on a failing browser test run" style="width:100%" >}}

### Compare screenshots

To help during the investigation, click **Compare Screenshots** to receive side-by-side screenshots of the failed result and the last successful execution. The comparison helps you to spot any differences that could have caused the test to fail.

{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="Compare screenshots between your failed and successful runs" style="width:90%;" >}}

**Note**: Comparison is performed between two test runs with the same version, start URL, device, browser, and run type (scheduled, manual trigger, CI/CD). If there is no successful prior run with the same parameters, no comparison is offered.
### Common browser test errors

`Element located but it's invisible` 
: The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.

`Cannot locate element`
: The element cannot be found in the HTML.

`Select did not have option`
: The specified option is missing from the dropdown menu.

`Forbidden URL`
: The test likely encountered a protocol that is not supported. [Contact Support][10] for more details.

`General test failure`
: A general error message. [Contact Support][10] for more details.

## Test events

Alerts from your Synthetic test monitors appear on the timeline in the [**Activity** tab](#test-activity), where you can review alert triggers, recoveries, and summary periods alongside the global uptime graph. To search for alerts from Synthetic tests in the Events Explorer, navigate to [**Events** > **Explorer**][18] and enter `Event Type:synthetics_alert` in the search query. For more information, see [Using Synthetic Test Monitors][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /real_user_monitoring/
[6]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /tracing/trace_explorer/trace_view/
[8]: /synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /help/
[11]: /synthetics/dashboards/browser_test/
[12]: /continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /synthetics/guide/synthetic-test-monitors/
[14]: /synthetics/guide/uptime-percentage-widget/
[15]: /real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /synthetics/guide/explore-rum-through-synthetics/
[17]: /tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /continuous_testing/cicd_integrations
[20]: /synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /real_user_monitoring/explorer
[23]: /real_user_monitoring/session_replay
[24]: /synthetics/browser_tests/?tab=requestoptions#fast-retry
[25]: /synthetics/guide/step-duration/
[26]: /synthetics/test_suites/
[27]: /synthetics/platform/downtime/