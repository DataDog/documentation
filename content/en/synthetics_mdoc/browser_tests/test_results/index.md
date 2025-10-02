---
title: Browser Testing Results
description: >-
  View Synthetic browser test results and compare successful or failed sample
  runs to test runs.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Browser Testing > Browser Testing
  Results
sourceUrl: https://docs.datadoghq.com/synthetics/browser_tests/test_results/index.html
---

# Browser Testing Results

## Overview{% #overview %}

Test runs appear in a test details page after a Synthetic test executes. Sample results correlate to the latest passed and failed test executions over a time interval and in a specific number of locations and devices.

## Test properties{% #test-properties %}

In the **Properties** section, you can see the test ID, test creation and edit date, a list of tags, test priority, and a link to an out-of-the-box Synthetic [browser test dashboard](https://docs.datadoghq.com/synthetics/dashboards/browser_test/).

{% dl %}

{% dt %}
**Overview**
{% /dt %}

{% dd %}
This section describes the test URL, number of locations, number of devices, test interval, and the number of test steps, including custom steps.
{% /dd %}

{% dt %}
**Monitor**
{% /dt %}

{% dd %}
This section contains the name of the [Synthetic test's monitor](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/) and the configured notification message.
{% /dd %}

{% dt %}
**CI/CD Execution**
{% /dt %}

{% dd %}
This section contains a dropdown menu to change the [execution rule](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files) for this test running as part of a [Continuous Testing CI pipeline](https://docs.datadoghq.com/continuous_testing/cicd_integrations).
{% /dd %}

{% /dl %}

## Test history{% #test-history %}

In the **History** section, you can see three graphs:

- The **Global Uptime** graph displays the total uptime of all test locations in a given time interval. The global uptime takes into consideration the [alert conditions](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions) configured for a test.
- The **Time-to-interactive by location and device** graph displays the amount of time until a page can be interacted with in seconds. For more information about uptime monitoring, see the [Website Uptime Monitoring with SLOs](https://docs.datadoghq.com/synthetics/guide/uptime-percentage-widget/) guide.
- The **Test duration by location and device** graph displays the amount of time in minutes each location and device takes to complete in a given time interval.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/history.73b2f0f47599dc3de7ef53c1cf9a3734.png?auto=format"
   alt="The History and Sample Runs section in the Test Details page" /%}

## Sample results{% #sample-results %}

Browser test runs include components such as screenshots, page performance data, errors, resources, and backend traces to help troubleshoot your test failure.

In the **Sample Runs** section, you can examine the latest failed test runs and compare them to recent successful test runs.

### Overview attributes{% #overview-attributes %}

{% dl %}

{% dt %}
Status
{% /dt %}

{% dd %}
The status of your test run (`PASSED` or `FAILED`).
{% /dd %}

{% dt %}
Starting URL
{% /dt %}

{% dd %}
The URL of your browser test scenario.
{% /dd %}

{% dt %}
Steps
{% /dt %}

{% dd %}
The number of test steps completed in your sample run.
{% /dd %}

{% dt %}
Duration
{% /dt %}

{% dd %}
The amount of time it took your test to run.
{% /dd %}

{% dt %}
Location
{% /dt %}

{% dd %}
The managed or private location your test was executed from.
{% /dd %}

{% dt %}
Device
{% /dt %}

{% dd %}
The type of device your test was executed from.
{% /dd %}

{% dt %}
Browser
{% /dt %}

{% dd %}
The type of browser your test was executed from.
{% /dd %}

{% dt %}
Time ran
{% /dt %}

{% dd %}
The amount of time that has passed since your test ran.
{% /dd %}

{% dt %}
Run type
{% /dt %}

{% dd %}
The type of test run (CI, fast retry, manually triggered, or scheduled).
{% /dd %}

{% /dl %}

### RUM sessions{% #rum-sessions %}

To view related sessions and available replays in the [RUM Explorer](https://docs.datadoghq.com/real_user_monitoring/explorer), click **View Session in RUM**. To access a user session for a particular action or step in [Session Replay](https://docs.datadoghq.com/real_user_monitoring/session_replay), click **Replay Session**. For more information, see [Explore RUM & Session Replay in Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/).

### Screenshots and actions{% #screenshots-and-actions %}

Every executed test step contains a screenshot of the step action, a link to the session in Session Replay, the step description, starting URL for a given step, step ID, step duration, and page performance information.

### Page performance{% #page-performance %}

Synthetic Monitoring includes two [Core Web Vital metrics](https://docs.datadoghq.com/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals) ([Largest Contentful Paint](https://web.dev/lcp/) and [Cumulative Layout Shift](https://web.dev/cls/)) as lab metrics and displays them as pills to the right of each step URL.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/test_results/page_performance_lab_metrics.782f0e264a5d4f2c2bb54fb9002e9cc2.png?auto=format"
   alt="Synthetic lab metrics" /%}

[First Input Delay](https://web.dev/fid/) is available as a real metric if you are using [Real User Monitoring](https://docs.datadoghq.com/real_user_monitoring/) to collect real user data. For more information, see [Monitoring Page Performance](https://docs.datadoghq.com/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals).

### Errors and warnings{% #errors-and-warnings %}

Click the **Errors** pill to access the **Errors & Warnings** tab and examine a list of errors separated by error type (`js` or `network`) and status (the network status code).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/test_results/errors_pill.040d1bd71e6c592cfe5ac95dd1902c96.png?auto=format"
   alt="Errors pill" /%}

The error type is logged when the browser test interacts with the page. It corresponds to the errors collected between the time the page is opened and the time the page can be interacted with. The maximum number of errors that can be displayed is 8, for example: 2 `network` + 6 `js` errors.

### Resources{% #resources %}

Click the **Resources** pill to access the **Resources** tab and examine the combination of requests and assets, including the total step duration time under **Fully Loaded** and the CDN provider serving the resources.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/test_results/resources_pill.f1aebaa8ac311b1173e587c04835748d.png?auto=format"
   alt="Resources pill" /%}

You can filter resources by type and search by name in the search bar. The maximum number of resources that can be displayed is 100. Resources are ordered by the time when they start and display the first 100 in Datadog.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/resources_panel.ee144869a7ce12b8f940d959ea59a7d0.png?auto=format"
   alt="Resources Panel" /%}

{% dl %}

{% dt %}
Relative Time
{% /dt %}

{% dd %}
The point in time when the resource began to load during the test step.
{% /dd %}

{% dt %}
CDN
{% /dt %}

{% dd %}
The CDN provider that served the resource. Hover over a CDN provider's icon to see the raw cache status.Datadog detects Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva, and Sucuri.
{% /dd %}

{% dt %}
Resource
{% /dt %}

{% dd %}
The URL of the resource.
{% /dd %}

{% dt %}
Type
{% /dt %}

{% dd %}
The type of resource (HTML, Download, CSS, Fetch, Image, JavaScript, XHR, or Other).
{% /dd %}

{% dt %}
Method
{% /dt %}

{% dd %}
The method of the request.
{% /dd %}

{% dt %}
Protocol
{% /dt %}

{% dd %}
The protocol of the request.
{% /dd %}

{% dt %}
Status
{% /dt %}

{% dd %}
The HTTP response status code.
{% /dd %}

{% dt %}
Duration
{% /dt %}

{% dd %}
The time needed to perform the request.
{% /dd %}

{% dt %}
Size
{% /dt %}

{% dd %}
The size of the request response.
{% /dd %}

{% /dl %}

### Backend traces{% #backend-traces %}

Click the **Traces** pill to access the **Traces** tab and explore APM traces associated with the browser test. While the UI is similar to the [Trace View](https://docs.datadoghq.com/tracing/trace_explorer/trace_view/) in the Trace Explorer, one browser test step can make multiple requests to different URLs or endpoints. This results in several associated traces, depending on your tracing setup and on the URLs you allowed in for browser tests in the [Synthetic Monitoring Settings page](https://docs.datadoghq.com/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests).

For more information about cross-product correlation, see the [Ease Troubleshooting With Cross-Product Correlation](https://docs.datadoghq.com/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests) guide.

### Step duration{% #step-duration %}

The step duration represents the amount of time the step takes to execute with the [Datadog locator system](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator). Not only does the step duration include the action (such as user interactions), but also it incorporates the wait and retry mechanism, which allows browser tests to ensure an element is able to be interacted with. For more information, see [Advanced Options for Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator).

## Failed results{% #failed-results %}

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential errors at the step level, and looking into [resources](https://docs.datadoghq.com/tracing/services/resource_page/) and backend traces generated by their steps.

### Compare screenshots{% #compare-screenshots %}

To help during the investigation, click **Compare Screenshots** to receive side-by-side screenshots of the failed result and the last successful execution. The comparison helps you to spot any differences that could have caused the test to fail.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/browser_tests/test_results/compare_screenshots.647c42aa8006598146c803f6eaa4ce8c.png?auto=format"
   alt="Compare screenshots between your failed and successful runs" /%}
**Note**: Comparison is performed between two test runs with the same version, start URL, device, browser, and run type (scheduled, manual trigger, CI/CD). If there is no successful prior run with the same parameters, no comparison is offered.


### Common browser test errors{% #common-browser-test-errors %}

{% dl %}

{% dt %}
`Element located but it's invisible`
{% /dt %}

{% dd %}
The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.
{% /dd %}

{% dt %}
`Cannot locate element`
{% /dt %}

{% dd %}
The element cannot be found in the HTML.
{% /dd %}

{% dt %}
`Select did not have option`
{% /dt %}

{% dd %}
The specified option is missing from the dropdown menu.
{% /dd %}

{% dt %}
`Forbidden URL`
{% /dt %}

{% dd %}
The test likely encountered a protocol that is not supported. [Contact Support](https://docs.datadoghq.com/help/) for more details.
{% /dd %}

{% dt %}
`General test failure`
{% /dt %}

{% dd %}
A general error message. [Contact Support](https://docs.datadoghq.com/help/) for more details.
{% /dd %}

{% /dl %}

## Test events{% #test-events %}

Alerts from your Synthetic test monitors appear in the **Events** tab under **Test Runs**. To search for alerts from Synthetic tests in the Events Explorer, navigate to [**Events** > **Explorer**](https://app.datadoghq.com/event/explorer) and enter `Event Type:synthetics_alert` in the search query. For more information, see [Using Synthetic Test Monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/).

## Further Reading{% #further-reading %}

- [Monitor Core Web Vitals with Synthetic Monitoring](https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals)
- [Explore RUM & Session Replay in Synthetics](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/)
- [Learn about the Browser Test Performance Dashboard](https://docs.datadoghq.com/synthetics/dashboards/browser_test/)
