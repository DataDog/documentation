---
title: Optimizing Performance
aliases:
  - real_user_monitoring/browser/monitoring_performance_vitals/
further_reading:
  - link: "https://learn.datadoghq.com/courses/core-web-vitals-lab"
    tag: "Learning Center"
    text: "Interactive Lab: Core Web Vitals"
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/"
    tag: "Blog"
    text: "Monitor Core Web Vitals with Datadog RUM and Synthetic Monitoring"
---

## Overview

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization helps you find the root cause of browser performance issues based on real user traffic." video="true" >}}

The Optimization page helps identify the root cause of browser performance issues using real user traffic data. Here, you can troubleshoot browser metrics such as [Core Web Vitals][1] (CWV), [Loading Time][2] to determine the causes of slow pages, with all relevant information in one place.

## Prerequisites

To optimize your application effectively, ensure you are using:

- [RUM Browser SDK][3] version 5.4.0 or newer
- [Session Replay][4] for at least some sessions

## Selecting a vital

Navigate to the [Optimization page][5], found under the [**Digital Experience > Performance Monitoring**][6] tab.

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="You can check the Optimization page for the top most visited pages or specific pages." style="width:100%;" >}}

From this view, there are two ways to select a page or vital:

- Choose from a treemap of the most visited pages
- Enter a view name in the input box and select the page

Available vitals include:

| Vital | Description | 
|-------|-------------|
| [Loading Time][2] | Time for a page to load from a user's perspective. |
| [Largest Contentful Paint][8] | Time to render the largest visible DOM object. |
| [First Contentful Paint][9] | | Time for the first text/image to appear, indicating content loading start. |
| [Cumulative Layout Shift][10] | Measures unexpected page movement; 0 means no shifts. |
| [Interaction to Next Paint][11] | Longest delay between user interaction and next paint (RUM SDK v5.1.0 required). |

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

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-visualize.png" alt="Select different elements to preview and visualize the user's experience." style="width:100%;" >}}

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /real_user_monitoring/browser/setup/
[4]: /real_user_monitoring/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[7]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/