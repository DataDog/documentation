---
title: How Step Duration is Determined in Browser Tests
description: >-
  Learn how Synthetic Monitoring determines when a browser test step is fully
  loaded and what factors influence step duration timing.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > How
  Step Duration is Determined in Browser Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/step-duration/index.html
---

# How Step Duration is Determined in Browser Tests

## Overview{% #overview %}

Step duration in Synthetic Monitoring is the time a Browser Test step takes to be considered fully loaded. In most cases, a step represents a user action (such as click and type). The Synthetics worker emulates the action, then waits for the page to finish loading and network requests to complete.

Step duration includes:

- The action itself
- Page loading time
- Network request completion time

Step duration does **not** include overhead such as finding the step element, taking screenshots, or creating snapshots on errors.

A page is considered fully loaded when:

- The frame has finished loading, *and*
- There are no requests still in flight.

In Synthetic Monitoring Browser Tests, step duration and fully loaded time represent the same concept:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/step-duration/step_duration_2.34fd708b3bb35e663b413d1c9944a8f2.png?auto=format"
   alt="Side panel of a Synthetic Monitoring step highlighting fully loaded and step duration times" /%}

## Understanding frames{% #understanding-frames %}

A frame is a browser section that renders a web page. Each page contains one main frame (the primary [browsing](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context) context) and may include child [frames](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) for content like advertisements, embedded widgets, or cross-origin elements.

- **Main frame**: The primary image in a picture frame (your webpage).
- **Child frames**: Smaller images within the main picture (iframes).

### Condition 1: Page loading completion{% #condition-1-page-loading-completion %}

The Synthetics Worker monitors two browser signals to determine if a frame has fully loaded:

**`document.readyState`**: [The state of the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState#complete) is "complete"

- Indicates the HTML is parsed, the browser DOM is constructed, and sub-resources (CSS, images) are loaded.
- Delays may occur when synchronous or deferred scripts prevent DOM completion.

**`loadEventEnd`**: Confirms the browser has finished firing the `load` event

- Occurs after all static resources (HTML, CSS, JavaScript, images) finish loading.
- Additional requests (AJAX calls, lazy loading, ads, analytics) may continue after this event.

These two signals work together to verify the page is fully rendered before the Synthetics Worker proceeds.

### Condition 2: Pending network requests{% #condition-2-pending-network-requests %}

The Synthetics Worker also monitors pending network requests to determine step completion:

- Steps cannot complete while network requests are still active.
- A 10-second timeout prevents indefinite waiting.
- Certain requests are automatically ignored (favicon pings, Google Analytics, Sentry, etc.) to avoid unnecessary delays.

**Performance optimization**: If a step takes approximately 10 seconds to complete, this typically indicates pending requests are causing delays. Check the network tab of that step or subsequent steps to identify slow requests. For requests irrelevant to your test, add them to the **blocked requests** section in your test configuration to improve performance.

## Troubleshooting{% #troubleshooting %}

### LCP impact on fully loaded time{% #lcp-impact-on-fully-loaded-time %}

Largest Contentful Paint (LCP) indirectly impacts step completion. While the Synthetics Worker doesn't explicitly wait for LCP, steps requiring interaction with LCP-related elements (such as buttons, large images, or text blocks) cannot proceed until those elements are fully rendered and ready.

### Deeper insights into step duration{% #deeper-insights-into-step-duration %}

By default, each step has a [60-second timeout](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options#timeout). You can adjust this timeout in the step configuration window to accommodate longer-running operations or to fail faster for performance testing.

Additionally, test results may not always reveal why steps take longer than expected. For comprehensive analysis:

**[Enable RUM data collection with Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/)** to gain visibility into:

- Network resource loading times
- DOM construction timings
- Core Web Vitals metrics that influence step duration

## Further Reading{% #further-reading %}

- [Learn more about Synthetic Monitoring Browser Testing](https://docs.datadoghq.com/synthetics/browser_tests)
- [Generate Synthetic Browser Tests From Session Replay](https://docs.datadoghq.com/synthetics/guide/rum-to-synthetics/)
