---
title: Optimizing Performance
description: "Use the RUM Optimization page to identify and troubleshoot browser performance issues with Core Web Vitals analysis and user experience visualization."
aliases:
  - /real_user_monitoring/browser/monitoring_performance_vitals/
  - /real_user_monitoring/browser/optimizing_performance/
further_reading:
  - link: "/synthetics/browser_tests/"
    tag: "Documentation"
    text: "Configure browser tests in Synthetic Monitoring"
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

Navigate to the [Optimization page][5], found under the [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6] tab.

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="You can check the Optimization page for the top most visited pages or specific pages." style="width:100%;" >}}

From this view, there are two ways to select a page or vital:

- Choose from a treemap of the most visited pages
- Enter a view name in the input box and select the page

Available vitals include:

- **[Loading Time (LT)][2]**: Datadog's custom KPI that measures the time for a page to load from a user's perspective.
- **[Largest Contentful Paint (LCP)][8]**: Measures how quickly the largest visual element on your page loads, which is a critical factor in both user experience and SEO rankings. A slow LCP can frustrate users, increase bounce rates, and hurt search visibility. The Optimization page breaks LCP down into subparts (Time to First Byte (TTFB), resource load delay, resource load time, render delay) so you can pinpoint which phase contributes most to the overall metric.
- **[First Contentful Paint (FCP)][9]**: Measures the time from when the user first navigated to the page to when any part of the page's content is rendered on the screen. A fast FCP helps reassure the user that something is happening.
- **[Cumulative Layout Shift (CLS)][10]**: Measures the largest burst of unexpected layout shifts that occur during a page's life cycle. A layout shift happens when a visible element moves from one rendered frame to the next without any user interaction, disrupting the visual stability of the page. An important KPI for measuring visual stability because it helps quantify how often users experience unexpected layout shifts. A low CLS helps ensure that the page is delightful.
- **[Interaction to Next Paint (INP)][11]**: Measures how long it takes for a page to visually respond after a user interacts with the page. The Optimization page breaks INP down into subparts (input delay, processing duration, presentation delay) so you can identify whether the bottleneck is main-thread contention, handler execution, or rendering.

## Filter and evaluate

After selecting a page and vital, analyze performance insights:

- Adjust the time frame in the top-right corner
- Use dropdowns to filter by attributes
- Select a group in {{< ui >}}Show Filter Breakdown{{< /ui >}}
- Evaluate vitals at different percentiles

For instance, a pc75 evaluation represents the 75th percentile value, commonly used for CWV.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filter and evaluate your vitals for the selected view." style="width:100%;" >}}

## Visualize the user's experience

The next part of the page helps you visualize exactly what your users are experiencing.

Based on the selected time period and traffic, the Optimization page highlights the most typical example of what users see on the page when the selected vital is captured. If you use [Session Replay][4], this is where you see a visual of the page.

For some vitals, you can also select other versions of the page to investigate by clicking {{< ui >}}See a different element{{< /ui >}}.

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Select different elements to preview and visualize the user's experience." style="width:100%;" >}}

For Largest Contentful Paint and Interaction to Next Paint, the Optimization page also displays a breakdown of the metric into its individual phases. Use the breakdown to identify which phase contributes most to the overall metric and direct optimization work to the relevant phase. For details on each subpart, see [Diagnose Core Web Vitals with subparts][14].

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

## Lighthouse audits

Lighthouse is an automated tool that grades your pages on performance, accessibility, best practices, and SEO, so you can find and fix what slows down or frustrates users.

A [browser Synthetic test][7] can run a [Lighthouse][15] audit and send the resulting scores to the matching RUM view. Lighthouse provides lab measurements that complement the real-user field data on this page, so you can track frontend quality on a schedule. The audit runs once per test run, on the final URL the test reaches.

Each audit reports five category scores from 0 to 100:

- **Performance**: measures how quickly the page loads, displays content, and becomes interactive.
- **Accessibility**: measures how well people with disabilities can navigate and use the page, based on automated checks.
- **Best Practices**: measures whether the page follows modern standards for security, browser compatibility, and code quality.
- **SEO**: measures whether search engines can discover, understand, and index the page.
- **Agentic**: measures how well AI agents can understand, navigate, and interact with the page.

### Prerequisites

- A [browser Synthetic test][7] that runs on **desktop Chrome** from a managed (Datadog) location.
- [RUM data collection enabled on the test][16], with a RUM application selected. The test injects the RUM Browser SDK into the page it loads, so the tested site does not need to be instrumented for RUM separately.
- The test must be saved and run on a schedule or on demand. Audits do not run while you create or record a test, or on runs triggered from CI/CD.

### Set up a Lighthouse audit

You can enable Lighthouse audits from a RUM application or from Synthetic Monitoring:

- **From a RUM application**: on the Optimization page, select a view that has no Lighthouse data yet, then select {{< ui >}}Create a Synthetics test{{< /ui >}} in the {{< ui >}}Lighthouse{{< /ui >}} panel's empty state. RUM data collection and the Lighthouse audit are enabled automatically, and the test is linked to the RUM application. Finish configuring the test and save it.
- **From Synthetic Monitoring**: create or edit a [browser test][7], enable [RUM data collection][16] and select your RUM application, then turn on {{< ui >}}Run Lighthouse audit{{< /ui >}} (available only when RUM data collection is enabled). Record the steps that reach the page you want to audit, then save the test.

### View results

After the test runs, Lighthouse results appear in two places under [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6]. The Lighthouse panel and table are scoped by application, view, and time frame only; other page filters, such as browser, country, or team, do not apply to them.

On the **Optimization page**, when a single view is selected, the {{< ui >}}Lighthouse{{< /ui >}} panel shows that view's most recent audit in the selected time frame: the five category score gauges, the lab metrics Lighthouse measured, which audits failed, and how the scores trend over time. From the panel, you can open the report in the Lighthouse viewer, download it as JSON, or open the originating Synthetic test result.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-panel.png" alt="The Lighthouse panel on the RUM Optimization page showing the five category score gauges, lab metrics, passed and failed audit counts, and the score trend over time." style="width:100%;" >}}

On the **Performance Monitoring summary page**, the {{< ui >}}Lighthouse{{< /ui >}} section shows the **Lighthouse scores by view** table, which compares scores across views. Use the percentile selector (p75 by default) to set the percentile aggregated over the audits in the selected time frame, and select a row to open the Optimization page for that view.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-scores-by-view.png" alt="The Lighthouse scores by view table comparing category scores across RUM views, with a percentile selector." style="width:100%;" >}}

### Metrics and attributes

Each audited view sets the `@synthetics.lighthouse_audited` attribute to `true`. To find audited views in the [RUM Explorer][17], switch the event type to {{< ui >}}Views{{< /ui >}} and search for `@synthetics.lighthouse_audited:true`. Audited views come from Synthetic tests rather than real-user sessions, so remove any `@session.type:user` filter from the query.

The category scores are available as metrics, so you can graph them on dashboards and alert on regressions with monitors:

- `rum.measure.lighthouse.performance`
- `rum.measure.lighthouse.accessibility`
- `rum.measure.lighthouse.best_practices`
- `rum.measure.lighthouse.seo`
- `rum.measure.lighthouse.agentic`

These metrics are tagged with `application.id` and `view.name`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /real_user_monitoring/application_monitoring/browser/setup/
[4]: /session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[14]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[7]: /synthetics/browser_tests/
[15]: https://developer.chrome.com/docs/lighthouse/overview/
[16]: /synthetics/guide/explore-rum-through-synthetics/
[17]: /real_user_monitoring/explorer/