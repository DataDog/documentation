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

{{< img src="product_analytics/guide/understanding-PANA-RUM-summary.png" alt="Product Analytics is for anyone who wants to leverage real user behavior to drive product and business insights." style="width:100%;" >}}

## Product Analytics and RUM

Since its inception, many users have leveraged Real User Monitoring (RUM) to track adoption, retention, and other business-specific metrics. To further support these use cases, features such as **Pathways** and **Retention Analysis** were initially introduced in preview within RUM.

Datadog’s **Product Analytics** is a dedicated solution designed to provide a comprehensive toolkit for customer journey optimization, product usage analysis, and data-driven growth. It includes a minimum of 15 months of retention for clickstream events—such as sessions, views, and actions—enabling long-term insights and trend analysis.

As part of this transition, the **Retention** and **Pathways** features will completely move from RUM to Product Analytics. This ensures these capabilities can continue to evolve and deliver deeper, more actionable value across your applications.

This transition will happen on **June 1st 2025**.


## FAQs

### As part of the introduction of Product Analytics, the following changes are being made for both existing and new RUM customers:

As part of the introduction of Product Analytics, the following changes are being made for both existing and new RUM customers:

- **Product Analytics Summary**, **Retention Analytics**, and **Pathways** are now part of **Product Analytics** and are no longer available within RUM.

- **Heatmaps** remain available but have been relocated to the **Session Replay** tab for easier access and contextual relevance.

- The **Funnel** and **Conversion** tabs continue to be available in the **RUM Explorer**. To view conversion details, select the **Funnel** visualization and click on any step to open the **Conversion** panel.

These updates ensure a clearer separation of use cases between RUM and Product Analytics, enabling more focused workflows and deeper insights.


### Why can I no longer access Sankeys and Retention Analysis?
- These features were part of a preview and available to RUM customers as a beta, but were not part of the core RUM offering. These features are exclusively available to customers on a Product Analytics contract.

### Setting up Product Analytics is simple and uses the same SDKs and configuration as Real User Monitoring (RUM)

- **Shared Setup**: Product Analytics and RUM collect data using the same SDKs and require identical implementation steps.

- **Enablement**: To enable RUM, Product Analytics, or both, go to your **Application Detail** page and toggle the desired products.

No additional instrumentation is required if RUM is already configured.

### What is the difference between RUM and Product Analytics?
- Both Product Analytics and Real User Monitoring rely on the Browser and/or Mobile SDKs.
- Product Analytics offers 15-month retention on behavioral events (Sessions, Views, and Actions). Real User Monitoring is dedicated to performance monitoring.
- Users have the option to purchase both products together, or each individually.

### Is Session Replay available with Product Analytics?

[Session Replay][1] is a standalone offering that can be purchased alongside Product Analytics.

### What is available to RUM customers versus what is available to Product Analytics customers?
See the full feature comparison table below.

| Feature | RUM | Product Analytics |
|---------|-----|-------------------|
| Data retention | 15 to 30 days | 15 months |
| Session, View, and Action events | {{< X >}} (with 30-day retention) |  {{< X >}} |
| Error, Resource, Long Task, and Vitals events | {{< X >}} (with 30-day retention for Errors, 15-day for the rest) | |
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
| [Conversion page][2] | | {{< X >}} |
| User Journeys (Funnels, Sankeys) | | {{< X >}} |
| Segmentation | | {{< X >}} |
| Heatmaps | | {{< X >}} |
| Analytics Explorer/Search, Dashboards, Notebooks | {{< X >}} | {{< X >}} |
| Monitors | {{< X >}} | (coming soon) |
| RBAC | {{< X >}} | {{< X >}} |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#products
[2]: /product_analytics/journeys/#conversion