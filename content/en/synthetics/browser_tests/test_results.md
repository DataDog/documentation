---
title: Browser Test Results
kind: documentation
description: Synthetics browser test results
aliases:
 - "/synthetics/apm/browser_tests"
further_reading:
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Browser Tests"
---


## Overview

Test results are accessed from the **Step Results** section on your browser test's status page.

### Errors

The Errors panel shows the name of the error, description, type (`js`/`network`), and status (network status code).

The type of error is logged during interaction with the page. It corresponds to the errors collected between the time the page is opened and the time interaction with that page is realized.

The maximum number of errors that can be displayed is 8, for example 2 `network` + 6 `js`.

### Resources

A resource corresponds to the combination of requests and assets. The Resources panel shows:

| Item         | Description                                                     |
|--------------|-----------------------------------------------------------------|
| Resource     | The URL of the resource                                         |
| Type         | The type of resource (HTML, CSS, Image, Javascript, XHR, Other) |
| Duration     | The time needed to perform the request                          |
| % Total Time | The resource duration over the total interaction time           |
| Size         | The size of the request response                                |

The maximum number of resources that can be displayed is 50. Typically, the resources with the longest duration (slowest to load) are displayed first.

#### Filter and Search

Resources can be filtered by resource type. Also, a search can be performed over the displayed URLs.

### Traces

The traces panel shows your traces associated with the browser synthetics test. The UI is similar to the APM [Trace View][1] except for the following difference.

One browser step can make multiple requests to different URLs/endpoints, which results in several associated traces (dependent on tracing and whitelisting setup). Use the dropdown to choose the trace to view.

## Test failure and errors

A test is considered `FAILED` if it does not satisfy its assertions or if the request failed for another reason. You can view specific browser test errors by clicking on the error in the step results.

Common failure reasons include:

| Error                                | Description                                                                                                          |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `Element located but it's invisible` | The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.       |
| `Cannot locate element`              | The element cannot be found in the HTML.                                                                             |
| `Select did not have option`         | The specified option is missing from the dropdown menu.                                                              |
| `Forbidden URL`                      | The test likely encountered a protocol that is not supported. Reach out to [Datadog support][2] for further details. |
| `General test failure`               | A general error message. [Contact support][2] for further details.                                                   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace
[2]: /help
