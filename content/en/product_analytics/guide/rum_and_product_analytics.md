---
title: Understanding RUM and Product Analytics

description: Guide for existing RUM users looking to understand the relationship between RUM and Product Analytics.
further_reading:
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
---

## What is Product Analytics?

Product Analytics is a dedicated offering built for product managers, product owners, engineering leaders, and others who want to leverage real user behavior to drive product and business insights, without requiring knowledge of other Datadog observability products.

{{< img src="product_analytics/guide/understanding-PANA-RUM-summary.png" alt="Product Analytics in Datadog. Left nav displays Product Analytics as a title and contains the nav items Home, Charts, Dashboards, Session Replay, Users & Segments." style="width:100%;" >}}

## Product Analytics and RUM

Previously, **Sankeys/Pathways** and **Retention Analysis** were available in beta/preview within Datadog Real User Monitoring (RUM). These features are moving to Datadog Product Analytics.

The transition happened on **June 1st 2025**.


## FAQs

### What is the difference between RUM and Product Analytics?

- Both Product Analytics and Real User Monitoring rely on the Browser and/or Mobile SDKs.
- Product Analytics offers 15-month retention on behavioral events (Sessions, Views, and Actions). Real User Monitoring is dedicated to performance monitoring.
- Product Analytics uses the complete, unsampled dataset captured by the SDK. When paired with RUM without Limits, Product Analytics offers full visibility into user behavior, while RUM applies client-side sampling to support faster issue investigation and reduce noise.
- Users have the option to purchase both products together, or each individually.

### How are RUM customers affected?

As part of the introduction of Product Analytics, the following changes are being made for both existing and new RUM customers:

- **Product Analytics Summary**, **Retention Analytics**, and **Pathways** (formerly **Sankeys**) are now part of Product Analytics and are no longer available in beta/preview within RUM.

- **Heatmaps** remain available but have been relocated to the **Session Replay** tab for easier access and contextual relevance.

- The **Funnel** and **Conversion** tabs continue to be available in the **RUM Explorer** as they existed before the split. To view conversion details, select the Funnel visualization and click on any step to open the **Conversion** panel.

These updates ensure a clearer separation of use cases between RUM and Product Analytics, enabling more focused workflows and deeper insights.

###  How do I set up Product Analytics?

Product Analytics uses the same SDKs and configuration as RUM. To enable Product Analytics go to your [Application management][3] page and toggle the desired products

If RUM is already configured, no additional instrumentation is required for Product Analytics.

### Why can I no longer access Sankeys (now Pathways) and Retention Analysis?
- These features were part of a preview and available to RUM customers as a beta, but were not part of the core RUM offering. These features are exclusively available to customers on a Product Analytics contract.

### Is Session Replay available with Product Analytics?

[Session Replay][1] is a standalone offering that can be purchased alongside Product Analytics.

### What is available to RUM customers versus what is available to Product Analytics customers?
See the full feature comparison table below.

| Feature | RUM | Product Analytics |
|---------|-----|-------------------|
| Data retention | 15 to 30 days | 15 months |
| Session, View, and Action events | {{< X >}} (with 30-day retention) |  {{< X >}} |
| Error, Resource, Long Task, and Vitals events | {{< X >}} (with 30-day retention for Errors, <br> 15-day for the rest) | |
| User attributes | {{< X >}} | {{< X >}} |
| Frustration signals | {{< X >}} | {{< X >}} |
| Core Web Vitals and Mobile Vitals | {{< X >}} | {{< X >}} |
| Performance Summary | {{< X >}} | |
| Analytics Summary | {{< X >}} (offered as a preview in Product Analytics) | {{< X >}} |
| Vitals troubleshooting | {{< X >}} (browser only) | |
| Custom Vitals | {{< X >}} (browser only) | |
| Feature Flags performance / Deployment Tracking page | {{< X >}} | |
| Error Tracking / Crash Reporting | {{< X >}} | |
| RUM <> APM correlation | {{< X >}} | |
| Retention Analysis | | {{< X >}} |
| Funnels | {{< X >}} | {{< X >}} |
| Pathways | | {{< X >}} |
| Segmentation | | {{< X >}} |
| Heatmaps | {{< X >}} (when bought with Session Replay)| {{< X >}} (when bought with Session Replay) |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#products
[3]: https://app.datadoghq.com/rum/list?
