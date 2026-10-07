---
title: Optimize Performance with Bits AI
description: "Start Bits Investigations from RUM recommendation cards to improve Core Web Vitals and the health of your critical user journeys."
aliases:
  - /real_user_monitoring/ai_investigations/multi_view_ai_investigation/
  - /real_user_monitoring/ai_investigations/operation_ai_investigation/
further_reading:
  - link: "/real_user_monitoring/bits_ai/"
    tag: "Documentation"
    text: "Bits in RUM"
  - link: "/real_user_monitoring/application_monitoring/browser/optimizing_performance/"
    tag: "Documentation"
    text: "Optimizing performance"
  - link: "/real_user_monitoring/operations_monitoring/"
    tag: "Documentation"
    text: "Operations Monitoring"
---

## Overview

RUM analyzes your sessions and surfaces recommendation cards that point to the highest-impact improvements across your pages and your critical user journeys. From any card, you can start a [Bits Investigation][1] that analyzes the issue, including the responsible code when the Source Code Integration is set up.

You can start investigations from two places:

- [The Optimization page](#optimization-page), to improve Core Web Vitals for a specific page
- [Operations Monitoring](#operations-monitoring), to improve the success rate and latency of an operation

## Optimization page

The [**Optimization** page][2] shows how each page of your application performs on a given vital. For each page and vital, RUM displays recommendation cards ranked by impact. Each card describes a likely cause of poor performance, such as a render-blocking script, a long task on the main thread, or a slow resource delaying Largest Contentful Paint.

You can start a Bits Investigation from recommendation cards for the following vitals:

| Platform | Vitals |
|---|---|
| Browser | Largest Contentful Paint (LCP), Interaction to Next Paint (INP) |
| Mobile | Time to Initial Display (TTID) |

### Start an investigation

1. Go to the [**Optimization** page][2] and select an application.
2. Select a page and a supported vital.
3. On a recommendation card, click **Investigate**.

The Bits Investigation opens in a new tab, scoped to the page, vital, and time window of the card.

{{< img src="real_user_monitoring/bits_ai/optimization-recommendation-cards.png" alt="The Optimization page for the Largest Contentful Paint of a page, showing recommendation cards ranked by impact, each with an Investigate button." style="width:100%;" >}}

### What Bits investigates

Bits compares slow page loads with fast ones and reconstructs what happened in the time leading up to the vital: which resources loaded, which scripts ran, and which long tasks blocked the main thread. When the page's requests are [correlated with APM traces][3], Bits follows slow requests into your backend services. When the [Source Code Integration][4] is set up, Bits links the issue to the files and functions responsible.

{{< img src="real_user_monitoring/bits_ai/optimization-bits-investigation.png" alt="A Bits Investigation started from an Optimization recommendation card, concluding that late discovery of the hero image degraded the homepage Largest Contentful Paint, with its impact, a timeline, and suggested next steps." style="width:100%;" >}}

## Operations Monitoring

[Operations Monitoring][5] tracks the success rate and latency of the user journeys in your application, such as signing up, searching, or checking out. When you open an operation, RUM displays recommendation cards ranked by severity. Each card covers one type of problem.

### Start an investigation

1. Go to [Operations Monitoring][5] and select an operation.
2. On a recommendation card, click **Investigate**. You can also click **Investigate with Bits** in the operations table.

The Bits Investigation opens in a new tab, scoped to the operation, the type of problem, and the time window of the card.

{{< img src="real_user_monitoring/bits_ai/operations-recommendation-cards.png" alt="The page of an operation in Operations Monitoring, showing recommendation cards for errors and timeouts ranked by severity, each with an Investigate button." style="width:100%;" >}}

### What Bits investigates

Bits adapts its analysis to the type of problem on the card:

| Problem type | What Bits examines |
|---|---|
| Errors | The failure breakdown and trend of the operation, the top failing endpoints, attributes over-represented on failed runs, and the correlated backend traces. |
| Abandonment | How long users waited before giving up, which resources were still loading when they left, where they navigated next, and whether abandonment concentrates in one browser, device, country, or application version. |
| Crashes | Stack traces from the affected sessions, and whether the crash is concentrated in a specific application version, device, or operating system. |
| Slowness | A comparison of slow and fast runs to determine whether time is spent in the backend, the frontend, or resource loading, followed down to the backend trace or long task responsible. |
| Timeouts | Whether an instrumentation gap causes the timeouts, such as an operation definition that no longer matches a renamed route or regrouped path. Bits checks for this before investigating performance. |

{{< img src="real_user_monitoring/bits_ai/operations-bits-investigation.png" alt="A Bits Investigation started from an Operations Monitoring recommendation card, concluding that an exhausted third-party payment API rate limit broke checkout, with its impact, a timeline, and suggested next steps." style="width:100%;" >}}

## After the investigation

Investigations started from RUM are standard Bits Investigations. You can:

- Find them later in the [Bits Investigations list][6] and share them with your team.
- [Give feedback][7] that Bits takes into account in future investigations.
- Send the investigation to [Bits Code][8] to generate a suggested code change or open a pull request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/
[2]: https://app.datadoghq.com/rum/optimization
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /source_code/
[5]: /real_user_monitoring/operations_monitoring/
[6]: https://app.datadoghq.com/bits-ai/investigations
[7]: /bits_ai/bits_investigation/improve_accuracy/
[8]: /bits_ai/bits_code/
