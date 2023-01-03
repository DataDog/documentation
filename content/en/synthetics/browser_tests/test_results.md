---
title: Browser Test Results
kind: documentation
description: Synthetic browser test results
aliases:
 - "/synthetics/apm/browser_tests"
further_reading:
- link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals"
  tag: "Blog"
  text: "Monitor Core Web Vitals with Synthetic Monitoring"
- link: "/synthetics/guide/explore-rum-through-synthetics/"
  tag: "Documentation"
  text: "Explore RUM & Session Replay in Synthetics"
---

## Overview

Test results appear after a Synthetic test executes. Browser test results correspond to the test execution at a point in time in a specific location, browser, and device type.

Look at the latest failed test runs and compare them to a recent successful one in the **Sample Results** section. Scroll down to the **Test Results** section and click on a test result to examine a specific result thoroughly.

[Browser test results](#test-results) include components such as [screenshots](#screenshots), [page performance data](#page-performance), [errors](#errors), [resources](#resources), and [backend traces](#backend-traces) to help troubleshoot your [test failure](#failed-test-result).

## Test results

The following test result characteristics appear at the top of every browser test result:

Status
: The status of your test result (Alert or OK).

Starting URL
: The URL of your browser test scenario.

Completed steps
: The number of test steps completed in your result.

Duration
: The time it took your test to run.

Location
: The managed or private location your test was executed from.

Device
: The type of device your test was executed from.

Browser
: The type of browser your test was executed from.

Time ran
: The time your test ran.

Run type
: The type of your test run (CI, fast retry, manually triggered, or scheduled).

### Screenshots

Browser tests contain screenshots for every executed test step. Screenshots help you visualize the journey your browser test went through.

### Page performance

Every step in which a full URL loads contains page performance information.

#### User experience

[Google's Core Web Vitals][1] are a set of three metrics designed to monitor a site's user experience. These metrics focus on giving you a view of load performance, interactivity, and visual stability. Each metric comes with guidance on the range of values that translate to a good user experience.

Synthetic Monitoring includes two available lab metrics: [Largest Contentful Paint][2] and [Cumulative Layout Shift][3].

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Core Web Vitals summary visualization" style="width=80%" >}}

[First Input Delay][4] is available if you are using [Real User Monitoring][5] to collect real user and field data. For more information, see [Monitoring Page Performance][6].

### Errors

The **Errors** panel shows the error, its type (`js`/`network`), and status (network status code).

The type of error is logged during interaction with the page. It corresponds to the errors collected between the time the page is opened and the time interaction with that page is realized.

The maximum number of errors that can be displayed is 8, for example 2 `network` + 6 `js`.

### Resources

A resource corresponds to the combination of requests and assets. 

{{< img src="synthetics/browser_tests/resources_panel.png" alt="Resources Panel"  >}}

Above the resources tab you can find the following:
- The total step duration time
- The CDN providers serving the resources with a summary of the cache status for each of them

The **Resources** tab shows:

Resource
: The URL of the resource.

CDN
: The CDN provider that served the resource. Hovering it showcases the raw cache status.  
Datadog detects Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva, and Sucuri.

Type
: The type of resource (HTML, CSS, Image, Javascript, XHR, or Other).

Status
: The HTTP response status code.

Duration
: The time needed to perform the request.

% Total Time 
: The resource duration over the total interaction time.

Size
: The size of the request response.

The maximum number of resources that can be displayed is 100. Resources are ordered by the time when they start and then are displayed in Datadog by the first 100.

#### Filter and search

Resources can be filtered by resource type. Also, a search can be performed over the displayed URLs.

### Backend Traces

The traces panel shows your traces associated with the browser synthetic test. The UI is similar to the APM [Trace View][7] except for the following difference.

One browser step can make multiple requests to different URLs/endpoints, which results in several associated traces (depending on your tracing setup and on the URLs you allowed in your [Settings][8]). Use the dropdown to choose the trace to view.

### Step duration

The step duration represents the amount of time the step takes to execute with our [locator algorithm][9]. Not only does the step duration include the action (such as user interactions), but also it incorporates the wait and retry mechanism, which allows browser tests to ensure an element is able to be interacted with. 

## Failed test result

A test result is considered `FAILED` if it does not satisfy its assertions or if a step failed for another reason. You can troubleshoot failed runs by looking at their screenshots, checking for potential [errors](#errors) at the step level, and looking into [backend traces](#backend-traces) generated by their steps.

Common browser test errors include:

`Element located but it's invisible` 
: The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.

`Cannot locate element`
: The element cannot be found in the HTML.

`Select did not have option`
: The specified option is missing from the dropdown menu.

`Forbidden URL`
: The test likely encountered a protocol that is not supported. Reach out to [Support][10] for more details.

`General test failure`
: A general error message. [Contact Support][10] for more details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /real_user_monitoring/
[6]: /real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[7]: /tracing/trace_explorer/trace_view/
[8]: /synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /help/
