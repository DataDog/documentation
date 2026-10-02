---
title: Lighthouse Audits
description: "Run Google Lighthouse audits in browser Synthetic tests and view the Performance, Accessibility, Best Practices, SEO, and Agentic Browsing scores on your RUM views."
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

## Overview

A [browser Synthetic test][1] can run a [Google Lighthouse][2] audit against the page it tests and attach the results to the matching RUM view. While Core Web Vitals and other RUM data reflect what real users experience in the field, Lighthouse scores give you a consistent lab measurement from a controlled Datadog location, so you can track frontend quality on a schedule and catch regressions before they reach users.

Each audit reports five category scores from 0 to 100:

- **Performance**
- **Accessibility**
- **Best Practices**
- **SEO**
- **Agentic Browsing**

Because the audit runs inside a browser test, it reuses the test's session. This allows Lighthouse to score authenticated pages behind a login, measuring the same pages your users see.

## Prerequisites

- A RUM application with [Browser RUM collection enabled][3].
- A [browser Synthetic test][1] that runs on **desktop Chrome**. Lighthouse audits are not available for mobile devices or other browsers.
- [RUM data collection enabled on the test][4], with the RUM application selected.

## Set up a Lighthouse audit

There are two ways to create a browser test that collects Lighthouse data.

### From a RUM application

1. On the [Optimization page][5] of your RUM application, start creating a browser Synthetic test for the page you want to audit.
2. Lighthouse data collection is selected automatically, and the test is linked to the RUM application.
3. Finish configuring and save the test.

### From Synthetic Monitoring

1. Create a [browser test][1] in Synthetic Monitoring.
2. In the recorder, enable [RUM data collection][4] and select your RUM application.
3. Enable **Run Lighthouse Audit**.
4. Record the steps that reach the page you want to audit, then save the test.

## View Lighthouse results

After the test runs, open the RUM view for that run to see:

- **Category scores**: the Performance, Accessibility, Best Practices, SEO, and Agentic Browsing gauges (0 to 100).
- **Failed audits**: the individual Lighthouse audits the page did not pass.
- **Lab metrics**: the lab performance metrics Lighthouse measured during the audit.

Lighthouse data is collected on **scheduled** executions and on **on-demand** runs of a **saved** test. Previewing an unsaved test from the recorder, and runs triggered from CI, do not collect Lighthouse data.

## Metrics and attributes

Each audited RUM view carries the `@synthetics.lighthouse_audited:true` attribute, along with a per-category score attribute under `@synthetics.lighthouse.<category>` (for example, `@synthetics.lighthouse.performance`).

The same scores are available as metrics named `rum.synthetics.lighthouse.<category>`, so you can graph them on dashboards and alert on regressions with monitors.

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
