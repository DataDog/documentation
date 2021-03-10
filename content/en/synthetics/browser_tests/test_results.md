---
title: Browser Test Results
kind: documentation
description: Synthetic browser test results
aliases:
 - "/synthetics/apm/browser_tests"
further_reading:
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Browser Tests"
---


Test results and performance data are accessed from the **Step Results** section on your browser test's status page.

## Page Performance

Each step where a full URL is loaded will contain page performance information.

### Core Web Vitals

[Google's Core Web Vitals][1] are a set of three metrics designed to monitor a site's user experience. These metrics focus on giving you a view of load performance, interactivity, and visual stability. Each metric comes with guidance on the range of values that translate to a good user experience.

Synthetic monitoring includes two available lab metrics: [Largest Contentful Paint][2] and [Cumulative Layout Shift][3].

[First Input Delay][4] is available when using Real User Monitoring where real user or field data is available.

Learn more about [Real User Monitoring and Core Web Vitals][5].

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Core Web Vitals summary visualization"  >}}

## Test failure

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. You can view specific browser test errors by clicking on the error in the step results.

Common failure reasons include:

| Error                                | Description                                                                                                          |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `Element located but it's invisible` | The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.       |
| `Cannot locate element`              | The element cannot be found in the HTML.                                                                             |
| `Select did not have option`         | The specified option is missing from the dropdown menu.                                                              |
| `Forbidden URL`                      | The test likely encountered a protocol that is not supported. Reach out to [Datadog support][6] for further details. |
| `General test failure`               | A general error message. [Contact support][6] for further details.                                                   |

## Errors

The Errors panel shows the name of the error, description, type (`js`/`network`), and status (network status code).

The type of error is logged during interaction with the page. It corresponds to the errors collected between the time the page is opened and the time interaction with that page is realized.

The maximum number of errors that can be displayed is 8, for example 2 `network` + 6 `js`.

## Resources

A resource corresponds to the combination of requests and assets. The Resources panel shows:

| Item         | Description                                                     |
|--------------|-----------------------------------------------------------------|
| Resource     | The URL of the resource                                         |
| Type         | The type of resource (HTML, CSS, Image, Javascript, XHR, Other) |
| Duration     | The time needed to perform the request                          |
| % Total Time | The resource duration over the total interaction time           |
| Size         | The size of the request response                                |

The maximum number of resources that can be displayed is 50. Resources are ordered by the time when they start and then are displayed in Datadog by the first 50.

### Filter and Search

Resources can be filtered by resource type. Also, a search can be performed over the displayed URLs.

## Traces

The traces panel shows your traces associated with the browser synthetic test. The UI is similar to the APM [Trace View][7] except for the following difference.

One browser step can make multiple requests to different URLs/endpoints, which results in several associated traces (depending on your tracing setup and on the URLs you allowed in your [Settings][8]). Use the dropdown to choose the trace to view.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[6]: /help/
[7]: /tracing/visualization/trace/
[8]: /synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
