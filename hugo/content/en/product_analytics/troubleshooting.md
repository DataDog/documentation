---
title: Troubleshooting
description: Learn how to troubleshoot common issues in Product Analytics.
further_reading:
  - link: '/product_analytics/'
    tag: Documentation
    text: Product Analytics
  - link: '/product_analytics/journeys/pathways'
    tag: Documentation
    text: Pathways
  - link: '/product_analytics/journeys/funnels'
    tag: Documentation
    text: Funnels
---

## Overview

If you experience issues setting up or configuring Datadog Product Analytics, use this page to start troubleshooting. If you continue to have trouble, [contact Datadog Support][1].

### The Pathways diagram and the funnel show different view counts for the same view

The algorithms for the Pathways diagram and the funnel rely on two different computations. You may notice a difference in the count of views for the first step of both visualizations. Imagine the use case of building a funnel and a Pathways diagram that both start with the same view: `/home`.

- The funnel counts all views that went to `/home`.
- The Pathways diagram only counts views to `/home` where another view follows. If a user goes to `/home` and stays on that page or leaves the app, the Pathways diagram does not include their sessions.

In addition, funnels do not include active sessions, while Pathways diagrams do include active sessions.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
