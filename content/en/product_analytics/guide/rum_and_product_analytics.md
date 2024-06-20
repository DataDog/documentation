---
title: Understanding RUM and Product Analytics
kind: guide
description: Guide for existing RUM users looking to understand the relationship between RUM and Product Analytics.
further_reading:
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
---

## What is Product Analytics?

Product Analytics is a dedicated offering built for product managers, product owners, engineering leaders, and others who want to leverage real user behavior to drive product and business insights, without requiring knowledge of other Datadog observability products.

{{< img src="product_analytics/guide/rum_and_product_analytics/product-analytics-transition-1.png" alt="Product Analytics is for anyone who wants to leverage real user behavior to drive product and business insights." style="width:100%;" >}}

## Product Analytics and RUM

Previously, Product Analytics data was available as a preview in the RUM offering. All Product Analytics features that used to live in RUM are now exclusively in the Product Analytics UI, including the following:

- Funnels
- Sankey
- User Retention Analysis
- Heatmaps

Session Replay remains a part of both RUM and Product Analytics.

## FAQs

### Will current RUM customers be able to pick up where they left off in the Product Analytics UI?

- Existing RUM customers on an annual commit (as of September 1, 2024) can continue to use the generally available features from Product Analytics they used previously (Funnels and Heatmaps) from within the RUM UI.
- We can show data from the last 30 days (the standard RUM retention) but if you are on the 90-day retention plan, we do not backfill the additional 60 days.

### Why can I no longer access Sankeys and Retention Analysis?
- These features were part of a preview and available to RUM customers as a beta, but were not part of the core RUM offering. These features are now exclusively available to customers on a Product Analytics contract.

### How do you set up Product Analytics data?
- Product Analytics is in limited available and must be set up with Datadog. If you are interested in getting set up with Product Analytics, please reach out to your account team.

### What is the difference between RUM and Product Analytics?
- Both Product Analytics and Real User Monitoring rely on the Browser and/or Mobile SDKs.
- Product Analytics offers 15-month retention on behavioral events (Sessions, Views, and Actions), as well as Resources, Long Tasks, Errors, and Vitals. Real User Monitoring is dedicated to performance monitoring.
- Users have the option to purchase both products together, or each individually.

### Will the funnel widget be removed?
- RUM users can continue to use it as part of their contractual grandfathering, but the use of it is limited to the sample rate and data retention they have in their RUM configuration.
- After September 1, 2024, the funnel widget is exclusively available to Product Analytics customers.

### What is available to RUM customers versus what is available to Product Analytics customers?
See the full feature comparison table below.

| Feature | RUM | Product Analytics |
|---------|-----|-------------------|
| Data retention | 30 days | 15 months |
| Session, View, and Action events | {{< X >}} | |
| Error, Resource, and Long Task events | {{< X >}} | |
| User attributes | {{< X >}} | {{< X >}} |
| Frustration signals | {{< X >}} | {{< X >}} |
| Core Web Vitals and Mobile Vitals | {{< X >}} | {{< X >}} |
| Performance Summary | {{< X >}} | |
| Analytics Summary | {{< X >}} | {{< X >}} |
| Session Replay | {{< X >}} (see pricing) | {{< X >}} (see [pricing][tk]) |
| Vitals troubleshooting | {{< X >}} (browser only) | |
| Custom Vitals | {{< X >}} (browser only) | |
| Feature Flags performance / Deployment Tracking page | {{< X >}} | |
| Error Tracking / Crash Reporting | {{< X >}} | |
| RUM <> APM correlation | {{< X >}} | |
| RUM Synthetic tests | {{< X >}} (through Session Replay) | |
| Retention Analysis | | {{< X >}} |
| [Conversion page][tk] | | {{< X >}} |
| User Journeys (Funnels, Sankeys) | | {{< X >}} |
| Segmentation | | {{< X >}} |
| Heatmaps | | {{< X >}} |
| Analytics Explorer/Search, Dashboards, Notebooks | {{< X >}} | {{< X >}} |
| Monitors | {{< X >}} | (coming soon) |
| RBAC | {{< X >}} | {{< X >}} |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
