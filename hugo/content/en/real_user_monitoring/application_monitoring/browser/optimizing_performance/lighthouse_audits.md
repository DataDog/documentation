---
title: Lighthouse Audits
description: "Run Google Lighthouse audits in browser Synthetic tests and view the Performance, Accessibility, Best Practices, SEO, and Agentic scores on your RUM views."
further_reading:
  - link: "/synthetics/browser_tests/"
    tag: "Documentation"
    text: "Configure browser tests in Synthetic Monitoring"
  - link: "/real_user_monitoring/application_monitoring/browser/optimizing_performance/"
    tag: "Documentation"
    text: "Optimize performance with the RUM Optimization page"
  - link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/"
    tag: "Blog"
    text: "Monitor Core Web Vitals with Datadog RUM and Synthetic Monitoring"
---

<div class="alert alert-info">Lighthouse audits in RUM are in Preview.</div>

## Overview

A [browser Synthetic test][1] can run a [Google Lighthouse][2] audit against the page it tests and attach the results to the matching RUM view. While Core Web Vitals and other RUM data reflect what real users experience in the field, Lighthouse scores give you a consistent lab measurement from a controlled Datadog location, so you can track frontend quality on a schedule and catch regressions before they reach users.

Each audit reports five category scores from 0 to 100:

- **Performance**
- **Accessibility**
- **Best Practices**
- **SEO**
- **Agentic**: reflects how well AI agents can understand, navigate, and interact with the page.

Because the audit runs inside a browser test, it reuses the test's session. This allows Lighthouse to score authenticated pages behind a login, measuring the same pages your users see.

## Prerequisites

- A RUM application with [Browser RUM collection enabled][3].
- A [browser Synthetic test][1] that runs on **desktop Chrome**. Lighthouse audits are not available for mobile devices or other browsers.
- [RUM data collection enabled on the test][4], with the RUM application selected.

## Set up a Lighthouse audit

There are two ways to create a browser test that collects Lighthouse data.

### From a RUM application

1. On the [Optimization page][5] of your RUM application, open the **Lighthouse** panel and select **Create a Synthetics test**.
2. RUM data collection and the Lighthouse audit are enabled automatically, and the test is linked to the RUM application.
3. Finish configuring and save the test.

### From Synthetic Monitoring

1. Create a [browser test][1] in Synthetic Monitoring.
2. In the recorder, enable [RUM data collection][4] and select your RUM application.
3. Enable **Run Lighthouse audit**. (This option is available only when RUM data collection is enabled.)
4. Record the steps that reach the page you want to audit, then save the test.

## View Lighthouse results

After the test runs, Lighthouse results appear in two places in RUM, both under [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][5]:

- On the **Optimization page**, the **Lighthouse** panel shows the latest audit for the selected view: the five category score gauges, the lab metrics Lighthouse measured, the failed audits, and a trend of scores over time. From the panel, you can open the full Lighthouse report, download the raw report as JSON, or open the Synthetic test result.
- In the browser performance side panel of a RUM view, the **Lighthouse** tab shows a *Lighthouse scores by view* table, with a percentile selector to compare scores across views.

Lighthouse data is collected on **scheduled** executions and on **on-demand** runs of a **saved** test. Previewing an unsaved test from the recorder, and runs triggered from CI, do not collect Lighthouse data.

## Metrics and attributes

Each audited RUM view carries the `@synthetics.lighthouse_audited:true` attribute, so you can filter RUM views down to those covered by a Lighthouse audit.

The category scores are available as metrics, so you can graph them on dashboards and alert on regressions with monitors:

- `rum.synthetics.lighthouse.performance`
- `rum.synthetics.lighthouse.accessibility`
- `rum.synthetics.lighthouse.best_practices`
- `rum.synthetics.lighthouse.seo`
- `rum.synthetics.lighthouse.agentic`

These metrics are tagged with `application.id` and `view.name`.

## Limitations

- Lighthouse audits run only on **desktop Chrome**.
- Audits run on tests executed from **managed (Datadog) locations**. They are not available on Private Locations.
- Audits run on **scheduled** and **on-demand** executions of a **saved** test. Unsaved recorder previews, CI-triggered runs, and fast tests are not audited.
- Each audit has a time budget. A page that is still loading when the budget elapses is scored with the data Lighthouse gathered up to that point.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: https://developer.chrome.com/docs/lighthouse/overview/
[3]: /real_user_monitoring/application_monitoring/browser/setup/
[4]: /synthetics/guide/explore-rum-through-synthetics/
[5]: https://app.datadoghq.com/rum/optimization
