---
title: Monitoring Vitals Performance
kind: documentation
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

{{< beta-callout url="https://www.google.com" >}}
Try the beta! Vitals are in public beta.
{{< /beta-callout >}} 

## Overview

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-results.png" alt="Select a view to start improving your performance vitals." style="width:100%;" >}}

RUM Vitals helps you find the true root cause of browser performance issues based on real user traffic. You can troubleshoot browser metrics, including the [Core Web Vitals][1] (CWV), [Loading Time][2] (Datadog's custom metric that evaluates how long it takes for a page to fully load from the user's perspective), and more. Determine what caused a slow page, with all the relevant information in one place.

## Prerequisites

To get the most out of this feature, Datadog recommends that you use:

- RUM Browser SDK version 5.4.0 or newer
- Session Replay for at least some sessions

## Select a vital

Navigate to the [Vitals page][3], or click the "Vitals" tab under the [**Digital Experience > Performance Monitoring**][4] page.

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-page-selectors.png" alt="You can check vitals for the top most visited pages or specific pages." style="width:100%;" >}}

From this view, you have two ways of selecting the page and vital that you can review and optimize:

- Select from a list of the most visited pages
- Enter a view name on the left and select the page

## Filter and evaluate

After you've selected a page and vital, you can see insights that explain their performance.

From here, you can:

- Change the time frame in the upper right.
- Filter by different session attributes using the dropdown buttons.
- Filter by selecting a group from the breakdown on the right ("Show Filter Breakdown").
- Select the percentile at which to evaluate your vital. For example, a pc75 evaluation means that the displayed value is at the 75th percentile of views in the selected filters. Pc75 is the typical percentile used to evaluate CWV for a given page.

{{< img src="real_user_monitoring/browser/vitals_performance/vital-filter-and-evaluate.png" alt="Filter and evaluate your vitals for the selected view." style="width:100%;" >}}

## Visualize the user's experience

The next part of the page helps you visualize exactly what your users are experiencing.

Based on the selected time period and traffic, RUM Vitals highlights the most typical example of what users see on the page when the selected vital is captured. If you use [Session Replay][5], this is where you see a visual of the page.

For some vitals, you can also select other versions of the page to investigate by clicking "See a different element".

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-visualize.png" alt="Select different elements to preview and visualize the user's experience." style="width:100%;" >}}

## Troubleshoot resources and errors

In the troubleshooting section, you can see resources and errors that occurred on the page that may have affected the vital's performance. For example, for Largest Contentful Paint (LCP), you can see resources that were loaded before the LCP was triggered. Since LCP is an indicator of how long the largest element takes to load on the page, you could investigate the following:

- Anything that happens before then could be causing slowness or rendering issues
- Resources that are particularly slow or large could be contributing to performance issues
- Recurring errors could be causing problems as well

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-troubleshoot.png" alt="The Troubleshooting section shows  resources and errors that occurred on the page that might have affected the vital's performance." style="width:100%;" >}}

## View event samples

To see everything in context with the rest of the page activity, scroll down to the waterfall and timeline of events. The waterfall shows the event timeline up until the moment the vital was captured.

You can select another sample event using the dropdown in the top left, and you can expand any event in the waterfall by clicking it to see the side panel, as shown below.

{{< img src="real_user_monitoring/browser/vitals_performance/vitals-view-event-samples.png" alt="View event samples to see everything in context with the rest of the page activity." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: https://app.datadoghq.com/rum/vitals
[4]: https://app.datadoghq.com/rum/performance-monitoring
[5]: /real_user_monitoring/session_replay/