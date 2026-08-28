<!--
This partial contains SDK performance impact content for the Browser SDK.
-->

The Browser SDK does not publish raw resource-overhead benchmarks like Android and iOS. Instead, use the following tools to monitor and improve your application's performance.

### Optimizing performance

{% img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM Performance Optimization helps you find the root cause of browser performance issues based on real user traffic." video="true" /%}

The Optimization page helps to identify the root cause of browser performance issues using real user traffic data. Troubleshoot the causes of slow pages using browser KPIs such as [Core Web Vitals][1] (CWV) and Datadog's custom [Loading Time][2] KPI, which evaluates full-page load time from the user's perspective.

For deeper analysis, the Optimization page provides granular breakdowns of Core Web Vitals by user demographics such as browser, region, and app version. You can use this information to track performance trends over time, understand which user groups are most affected, and prioritize optimizations with precision.

#### Prerequisites

To optimize your application, ensure you are using:

- [RUM Browser SDK][3] version 5.4.0 or newer
- [Session Replay][4] for at least some sessions

#### Selecting a vital

Navigate to the [Optimization page][5], found under the [{% ui %}Digital Experience{% /ui %} > {% ui %}Performance Monitoring{% /ui %}][6] tab.

{% img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="You can check the Optimization page for the top most visited pages or specific pages." style="width:100%;" /%}

From this view, there are two ways to select a page or vital:

- Choose from a treemap of the most visited pages
- Enter a view name in the input box and select the page

Available vitals include:

- **[Loading Time (LT)][2]**: Datadog's custom KPI that measures the time for a page to load from a user's perspective.
- **[Largest Contentful Paint (LCP)][7]**: Measures how quickly the largest visual element on your page loads, which is a critical factor in both user experience and SEO rankings. A slow LCP can frustrate users, increase bounce rates, and hurt search visibility. The Optimization page breaks LCP down into subparts (Time to First Byte (TTFB), resource load delay, resource load time, render delay) so you can pinpoint which phase contributes most to the overall metric.
- **[First Contentful Paint (FCP)][8]**: Measures the time from when the user first navigated to the page to when any part of the page's content is rendered on the screen. A fast FCP helps reassure the user that something is happening.
- **[Cumulative Layout Shift (CLS)][9]**: Measures the largest burst of unexpected layout shifts that occur during a page's life cycle. A layout shift happens when a visible element moves from one rendered frame to the next without any user interaction, disrupting the visual stability of the page. An important KPI for measuring visual stability because it helps quantify how often users experience unexpected layout shifts. A low CLS helps ensure that the page is delightful.
- **[Interaction to Next Paint (INP)][10]**: Measures how long it takes for a page to visually respond after a user interacts with the page. The Optimization page breaks INP down into subparts (input delay, processing duration, presentation delay) so you can identify whether the bottleneck is main-thread contention, handler execution, or rendering.

#### Filter and evaluate

After selecting a page and vital, analyze performance insights:

- Adjust the time frame in the top-right corner
- Use dropdowns to filter by attributes
- Select a group in {% ui %}Show Filter Breakdown{% /ui %}
- Evaluate vitals at different percentiles

For instance, a pc75 evaluation represents the 75th percentile value, commonly used for CWV.

{% img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="Filter and evaluate your vitals for the selected view." style="width:100%;" /%}

#### Visualize the user's experience

The next part of the page helps you visualize exactly what your users are experiencing.

Based on the selected time period and traffic, the Optimization page highlights the most typical example of what users see on the page when the selected vital is captured. If you use [Session Replay][4], this is where you see a visual of the page.

For some vitals, you can also select other versions of the page to investigate by clicking {% ui %}See a different element{% /ui %}.

{% img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="Select different elements to preview and visualize the user's experience." style="width:100%;" /%}

For Largest Contentful Paint and Interaction to Next Paint, the Optimization page also displays a breakdown of the metric into its individual phases. Use the breakdown to identify which phase contributes most to the overall metric and direct optimization work to the relevant phase. For details on each subpart, see [Diagnose Core Web Vitals with subparts][11].

#### Troubleshoot resources and errors

In the troubleshooting section, you can see resources and errors that users encountered on the page that may have affected the vital performance. For example, for Largest Contentful Paint (LCP), you can see resources that were loaded before the LCP was triggered. Since LCP is an indicator of how long the largest element takes to load on the page, you could investigate the following:

- Anything that happens before then could be causing slowness or rendering issues
- Resources that are particularly slow or large could be contributing to performance issues
- Recurring errors that could be causing problems

{% img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="The Troubleshooting section shows resources and errors that users encountered on the page that might have affected the vital performance." style="width:100%;" /%}

#### View event samples

To see everything in context with the rest of the page activity, scroll down to the waterfall and timeline of events. The waterfall shows the event timeline up until the moment the vital was captured.

You can select another sample event using the dropdown in the top left, and expand any event in the waterfall by clicking it to see the side panel, as shown below.

{% img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="View event samples to see everything in context with the rest of the page activity." style="width:100%;" /%}

#### Browser profiling within event samples

For deeper root cause analysis, use browser profiling alongside RUM to identify what JavaScript or rendering activity is causing slow or unresponsive experiences. Profiling reveals performance issues that aren't always visible through Core Web Vitals alone. To get started, [ensure that browser profiling is enabled in your RUM SDK configuration][12].

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Browser profiling example when analyzing an event sample." style="width:100%;" /%}

### RUM recommendations

{% callout url="https://www.datadoghq.com/product-preview/rum-recommendations/" header="Join the Preview!" %}
RUM Recommendations is in Preview.
{% /callout %}

RUM Recommendations highlight opportunities to improve your application's frontend availability, performance, and reliability. Each view in your application has its own set of recommendations, available from the [{% ui %}Optimization{% /ui %} page][13].

{% img src="real_user_monitoring/browser/optimizing_performance/rum-recommendations-overview.mp4" alt="Reviewing a RUM recommendation by Bits AI to review a session replay and alleviate user frustration." video="true" /%}

Recommendations enable you to:
- **Detect** an issue, such as a slow HTTP request or slow initial page loading time
- **Assess priority** based on the issue's description and number of impacted events and users
- **Fix** the issue with suggested code changes

#### How it works

Datadog analyzes RUM and APM data to generate recommendations for enhancing the availability, performance, and stability of your application's frontend. A severity indicator is calculated for each recommendation, highlighting the most impactful areas to focus on. A recommendation's severity is determined by the number of impacted events and users.

After the recommendation has been addressed, you can mark it as resolved. Recommendations are automatically resolved if they are no longer detected upon a new application version deployment.

#### Recommendation types

The table below outlines the available RUM recommendation types. Only applications that have the Browser SDK installed and use [RUM Without Limits][14] are supported.

| Recommendation Type | Description |
|---------------------|-------------|
| Frustration signal on page element | Users are clicking on a static element that produces no action on the page. |
| Improve initial page load time by reducing bundle size | A large JavaScript bundle is impacting the initial load and paint of the page. |

[1]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#core-web-vitals
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /real_user_monitoring/application_monitoring/browser/setup/
[4]: /session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[7]: https://web.dev/articles/lcp/
[8]: https://web.dev/articles/fcp
[9]: https://web.dev/articles/cls/
[10]: https://web.dev/articles/inp/
[11]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[12]: /real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/profiling
[13]: https://app.datadoghq.com/rum/optimization
[14]: /real_user_monitoring/rum_without_limits/
