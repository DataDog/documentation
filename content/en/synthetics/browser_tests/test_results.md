---
title: Browser Testing Results
kind: documentation
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

Test runs appear in a test details page after a Synthetic test executes. [Sample results](#sample-results) correlate to the latest passed and failed test executions over a time interval and in a specific number of locations and devices.

## Test properties

In the **Properties** section, you can see the test ID, test creation and edit date, a list of tags, test priority, and a link to an out-of-the-box Synthetic [browser test dashboard][11].

**Overview** 
: This section describes the test URL, number of locations, number of devices, test interval, and the number of test steps, including custom steps.

**Monitor**
: This section contains the name of the [Synthetic test's monitor][13] and the configured notification message.

**CI/CD Execution**
: This section contains a dropdown menu to change the [execution rule][12] for this test running as part of a [Continuous Testing CI pipeline][19].

## Test history

In the **History** section, you can see three graphs:

- The **Global Uptime** graph displays the total uptime of all test locations in a given time interval. The global uptime takes into consideration the [alert conditions][20] configured for a test.
- The **Time-to-interactive by location and device** graph displays the amount of time until a page can be interacted with in seconds. For more information about uptime monitoring, see the [Website Uptime Monitoring with SLOs][14] guide.
- The **Test duration by location and device** graph displays the amount of time in minutes each location and device takes to complete in a given time interval. 

{{< img src="synthetics/browser_tests/history.png" alt="The History and Sample Runs section in the Test Details page" style="width=80%" >}}

## Sample results

Browser test runs include components such as [screenshots](#screenshots-and-actions), [page performance data](#page-performance), [errors](#errors-and-warnings), [resources](#resources), and [backend traces](#backend-traces) to help troubleshoot your [test failure](#failed-results).

In the **Sample Runs** section, you can examine the latest failed test runs and compare them to recent successful test runs.

### Overview attributes

Status
: The status of your test run (`PASSED` or `FAILED`).

Starting URL
: The URL of your browser test scenario.

Steps
: The number of test steps completed in your sample run.

Duration
: The amount of time it took your test to run.

Location
: The managed or private location your test was executed from.

Device
: The type of device your test was executed from.

Browser
: The type of browser your test was executed from.

Time ran
: The amount of time that has passed since your test ran.

Run type
: The type of test run (CI, fast retry, manually triggered, or scheduled).

### RUM sessions

To view related sessions and available replays in the [RUM Explorer][22], click **View Session in RUM**. To access a user session for a particular action or step in [Session Replay][23], click **Replay Session**. For more information, see [Explore RUM & Session Replay in Synthetics][16].

### Screenshots and actions

Every executed test step contains a screenshot of the step action, a link to the session in Session Replay, the step description, starting URL for a given step, step ID, step duration, and page performance information.

### Page performance

Synthetic Monitoring includes two [Core Web Vital metrics][6] ([Largest Contentful Paint][2] and [Cumulative Layout Shift][3]) as lab metrics and displays them as pills to the right of each step URL. 

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Synthetic lab metrics" style="width:100%" >}}

[First Input Delay][4] is available as a real metric if you are using [Real User Monitoring][5] to collect real user data. For more information, see [Monitoring Page Performance][6].

### Errors and warnings

Click the **Errors** pill to access the **Errors & Warnings** tab and examine a list of errors separated by error type (`js` or `network`) and status (the network status code).

{{< img src="synthetics/browser_tests/test_results/errors_pill.png" alt="Errors pill" style="width:100%" >}}

The error type is logged when the browser test interacts with the page. It corresponds to the errors collected between the time the page is opened and the time the page can be interacted with. The maximum number of errors that can be displayed is 8, for example: 2 `network` + 6 `js` errors.

### Resources

Click the **Resources** pill to access the **Resources** tab and examine the combination of requests and assets, including the total step duration time under **Fully Loaded** and the CDN provider serving the resources. 

{{< img src="synthetics/browser_tests/test_results/resources_pill.png" alt="Resources pill" style="width:100%" >}}

You can filter resources by type and search by name in the search bar. The maximum number of resources that can be displayed is 100. Resources are ordered by the time when they start and display the first 100 in Datadog.

{{< img src="synthetics/browser_tests/resources_panel.png" alt="Resources Panel" style="width:100%" >}}

Relative Time 
: The resource duration over the total interaction time.

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

### Backend traces

Click the **Traces** pill to access the **Traces** tab and explore APM traces associated with the browser test. While the UI is similar to the [Trace View][7] in the Trace Explorer, one browser test step can make multiple requests to different URLs or endpoints. This results in several associated traces, depending on your tracing setup and on the URLs you allowed in for browser tests in the [Synthetic Monitoring Settings page][8]. 

For more information about cross-product correlation, see the [Ease Troubleshooting With Cross-Product Correlation][21] guide.

### Step duration

The step duration represents the amount of time the step takes to execute with the [Datadog locator system][9]. Not only does the step duration include the action (such as user interactions), but also it incorporates the wait and retry mechanism, which allows browser tests to ensure an element is able to be interacted with. For more information, see [Advanced Options for Browser Test Steps][9].

## Failed results

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential [errors](#errors-and-warnings) at the step level, and looking into [resources][17] and [backend traces](#backend-traces) generated by their steps.

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

Alerts from your Synthetic test monitors appear in the **Events** tab under **Test Runs**. To search for alerts from Synthetic tests in the Events Explorer, navigate to [**Events** > **Explorer**][18] and enter `Event Type:synthetics_alert` in the search query. For more information, see [Using Synthetic Test Monitors][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /real_user_monitoring/
[6]: /real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /tracing/trace_explorer/trace_view/
[8]: /synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /help/
[11]: /synthetics/dashboards/browser_test/
[12]: /continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /synthetics/guide/synthetic-test-monitors/
[14]: /synthetics/guide/uptime-percentage-widget/
[15]: /real_user_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /synthetics/guide/explore-rum-through-synthetics/
[17]: /tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /continuous_testing/cicd_integrations
[20]: /synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /real_user_monitoring/explorer
[23]: /real_user_monitoring/session_replay
