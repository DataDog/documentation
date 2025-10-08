---
title: Optimizing Performance
description: "Use the RUM Optimization page to identify and troubleshoot browser performance issues with Core Web Vitals analysis and user experience visualization."
aliases:
  - /real_user_monitoring/browser/monitoring_performance_vitals/
  - /real_user_monitoring/browser/optimizing_performance/
further_reading:
  - link: "https://learn.datadoghq.com/courses/rum-optimize-frontend-performance"
    tag: "Learning Center"
    text: "Interactive Lab: Optimize Frontend Performance with Datadog RUM Browser Monitoring"
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/"
    tag: "Blog"
    text: "Monitor Core Web Vitals with Datadog RUM and Synthetic Monitoring"
  - link: "https://www.datadoghq.com/blog/rum-optimization/"
    tag: "Blog"
    text: "From data to action: Optimize Core Web Vitals and more with Datadog RUM"
---

## Overview

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization helps you find the root cause of browser performance issues based on real user traffic." video="true" >}}

The Optimization page helps to identify the root cause of browser performance issues using real user traffic data. Troubleshoot the causes of slow pages using browser KPIs such as [Core Web Vitals][1] (CWV) and Datadog's custom [Loading Time][2] KPI, which evaluates full-page load time from the user's perspective.

For deeper analysis, the Optimization page provides granular breakdowns of Core Web Vitals by user demographics such as browser, region, and app version. You can use this information to track performance trends over time, understand which user groups are most affected, and prioritize optimizations with precision.

## Prerequisites

To optimize your application, ensure you are using:

- [RUM Browser SDK][3] version 5.4.0 or newer
- [Session Replay][4] for at least some sessions

## Selecting a vital

Navigate to the [Optimization page][5], found under the [**Digital Experience > Performance Monitoring**][6] tab.

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="You can check the Optimization page for the top most visited pages or specific pages." style="width:100%;" >}}

From this view, there are two ways to select a page or vital:

- Choose from a treemap of the most visited pages
- Enter a view name in the input box and select the page

Available vitals include:

- **[Loading Time (LT)][2]**: Datadog's custom KPI that measures the time for a page to load from a user's perspective.
- **[Largest Contentful Paint (LCP)][8]**: Measures how quickly the largest visual element on your page loads, which is a critical factor in both user experience and SEO rankings. A slow LCP can frustrate users, increase bounce rates, and hurt search visibility.
- **[First Contentful Paint (FCP)][9]**: Measures the time from when the user first navigated to the page to when any part of the page's content is rendered on the screen. A fast FCP helps reassure the user that something is happening.
- **[Cumulative Layout Shift (CLS)][10]**: Measures the largest burst of unexpected layout shifts that occur during a page's life cycle. A layout shift happens when a visible element moves from one rendered frame to the next without any user interaction, disrupting the visual stability of the page. An important KPI for measuring visual stability because it helps quantify how often users experience unexpected layout shifts. A low CLS helps ensure that the page is delightful.
- **[Interaction to Next Paint (INP)][11]**: Measures how long it takes for a page to visually respond after a user interacts with the page.

## Filter and evaluate

After selecting a page and vital, analyze performance insights:

- Adjust the time frame in the top-right corner
- Use dropdowns to filter by attributes
- Select a group in "Show Filter Breakdown"
- Evaluate vitals at different percentiles

For instance, a pc75 evaluation represents the 75th percentile value, commonly used for CWV.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filter and evaluate your vitals for the selected view." style="width:100%;" >}}

## Visualize the user's experience

The next part of the page helps you visualize exactly what your users are experiencing.

Based on the selected time period and traffic, the Optimization page highlights the most typical example of what users see on the page when the selected vital is captured. If you use [Session Replay][4], this is where you see a visual of the page.

For some vitals, you can also select other versions of the page to investigate by clicking "See a different element".

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Select different elements to preview and visualize the user's experience." style="width:100%;" >}}

## Troubleshoot resources and errors

In the troubleshooting section, you can see resources and errors that users encountered on the page that may have affected the vital performance. For example, for Largest Contentful Paint (LCP), you can see resources that were loaded before the LCP was triggered. Since LCP is an indicator of how long the largest element takes to load on the page, you could investigate the following:

- Anything that happens before then could be causing slowness or rendering issues
- Resources that are particularly slow or large could be contributing to performance issues
- Recurring errors that could be causing problems

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="The Troubleshooting section shows resources and errors that users encountered on the page that might have affected the vital performance." style="width:100%;" >}}

## View event samples

To see everything in context with the rest of the page activity, scroll down to the waterfall and timeline of events. The waterfall shows the event timeline up until the moment the vital was captured.

You can select another sample event using the dropdown in the top left, and expand any event in the waterfall by clicking it to see the side panel, as shown below.

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="View event samples to see everything in context with the rest of the page activity." style="width:100%;" >}}

## Browser profiling within event samples
For deeper root cause analysis, use browser profiling alongside RUM to identify what JavaScript or rendering activity is causing slow or unresponsive experiences. Profiling reveals performance issues that aren't always visible through Core Web Vitals alone. To get started, [ensure that browser profiling is enabled in your RUM SDK configuration][12].
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Browser profiling example when analyzing an event sample." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /real_user_monitoring/application_monitoring/browser/setup/
[4]: /real_user_monitoring/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks