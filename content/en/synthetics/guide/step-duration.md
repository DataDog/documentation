---
title: How Step Duration is Determined in Browser Tests
description: Learn how Synthetic Monitoring determines when a browser test step is fully loaded and what factors influence step duration timing.
further_reading:
- link: "/synthetics/browser_tests"
  tag: "Documentation"
  text: "Learn more about Synthetic Monitoring Browser Testing"
- link: "/synthetics/guide/rum-to-synthetics/"
  tag: "Documentation"
  text: "Generate Synthetic Browser Tests From Session Replay"

---

## Overview

Step duration in Synthetic Monitoring is the time a Browser Test step takes to be considered fully loaded. In most cases, a step represents a user action (such as click and type). The Synthetics worker emulates the action, then waits for the page to finish loading and network requests to complete.

Step duration includes:
- The action itself
- Page loading time  
- Network request completion time

Step duration does **not** include overhead such as finding the step element, taking screenshots, or creating snapshots on errors.
This exclusion ensures that reported durations reflect only the actual execution time, giving you a clearer sense of how much you can fit into a single test.

## Page load completion

A page is considered fully loaded when:
- The [frame](#understanding-frames) has finished loading, _and_
- There are no requests still in flight.

In Synthetic Monitoring Browser Tests, step duration and fully loaded time represent the same concept:

{{< img src="synthetics/guide/step-duration/step_duration_2.png" alt="Side panel of a Synthetic Monitoring step highlighting fully loaded and step duration times" style="width:100%" >}}

## Understanding frames

A frame is a browser section that renders a web page. Each page contains one main frame (the primary [browsing][1] context) and may include child [frames][2] for content like advertisements, embedded widgets, or cross-origin elements.

- **Main frame**: The primary image in a picture frame (your webpage).
- **Child frames**: Smaller images within the main picture (iframes).

### Condition 1: Page loading completion

The Synthetics Worker monitors two browser signals to determine if a frame has fully loaded:

**`document.readyState`**: [The state of the DOM][4] is "complete"
- Indicates the HTML is parsed, the browser DOM is constructed, and sub-resources (CSS, images) are loaded.
- Delays may occur when synchronous or deferred scripts prevent DOM completion.

**`loadEventEnd`**: Confirms the browser has finished firing the `load` event
- Occurs after all static resources (HTML, CSS, JavaScript, images) finish loading.
- Additional requests (AJAX calls, lazy loading, ads, analytics) may continue after this event.

These two signals work together to verify the page is fully rendered before the Synthetics Worker proceeds.

### Condition 2: Pending network requests

The Synthetics Worker also monitors pending network requests to determine step completion:

- Steps cannot complete while network requests are still active.
- A 10-second timeout prevents indefinite waiting.
- Certain requests are automatically ignored (favicon pings, Google Analytics, Sentry, etc.) to avoid unnecessary delays.

**Performance optimization**: If a step takes approximately 10 seconds to complete, this typically indicates pending requests are causing delays. Check the network tab of that step or subsequent steps to identify slow requests. For requests irrelevant to your test, add them to the **blocked requests** section in your test configuration to improve performance.

## Troubleshooting

### Timeout

If your test reaches the maximum execution time, the timeout message indicates that the total includes both test steps and system overhead. This is why the reported test duration may differ from the sum of individual step durations.

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="Test duration execution error message stating 'Maximum test execution time reached. This includes test steps and system overhead, so reported test durations may vary'." style="width:90%;" >}}

### LCP impact on fully loaded time

Largest Contentful Paint (LCP) indirectly impacts step completion. While the Synthetics Worker doesn't explicitly wait for LCP, steps requiring interaction with LCP-related elements (such as buttons, large images, or text blocks) cannot proceed until those elements are fully rendered and ready.

### Deeper insights into step duration

By default, each step has a [60-second timeout][5]. You can adjust this timeout in the step configuration window to accommodate longer-running operations or to fail faster for performance testing.

Additionally, test results may not always reveal why steps take longer than expected. For comprehensive analysis:

**[Enable RUM data collection with Synthetic Monitoring][3]** to gain visibility into:
- Network resource loading times
- DOM construction timings  
- Core Web Vitals metrics that influence step duration

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
[3]: /synthetics/guide/explore-rum-through-synthetics/
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState#complete
[5]: /synthetics/browser_tests/advanced_options#timeout