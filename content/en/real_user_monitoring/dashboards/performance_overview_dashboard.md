---
title: RUM Performance Overview Dashboard
kind: documentation
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Overview

The performance overview dashboard offers a bird’s-eye view of RUM applications. It shows:

- **Performance metrics**:
    For all views, four browser metrics are highlighted: Loading Time, First Contentful Paint, DOM Content Loaded, and Load Event. For each one of these metrics, widgets show the median, the 75th percentile, and the 90th percentile.
- **Trends**:
    Visualize the evolution of page views, frontend errors related to backend calls failing, JS errors, and long tasks.
- **Page views breakdown**:
    Analyze the nature of your traffic and the associated loading time for each segment.

{{< img src="real_user_monitoring/dashboards/performance_overview.png" alt="Out-of-the-box RUM Performance Overview Dashboard" style="width:100%" >}}

For more information about the data displayed, see [RUM Browser Data Collected][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
