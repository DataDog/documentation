---
title: Explore Retained Data
description: "Explore and analyze RUM data to investigate performance issues, navigate user sessions, and troubleshoot application errors."
further_reading:
- link: "/real_user_monitoring/investigate_problems/explore_retained_data/search/"
  tag: "Documentation"
  text: "Learn more about search in the RUM Explorer"
- link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals"
  tag: "Blog"
  text: "Monitor Core Web Vitals with RUM"
- link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
  tag: "Blog"
  text: "Start monitoring single-page applications"
- link: "https://www.datadoghq.com/blog/rum-apm-retention-filters"
  tag: "Blog"
  text: "Unify and correlate frontend and backend data with retention filters"
---

## Overview

The [Real User Monitoring (RUM) Explorer][1] allows you to examine data collected from your applications and granular information about your RUM events.

You can:

- Navigate through user sessions, including between sessions from the same user with [session continuity][2]
- Investigate performance issues affecting views, resources, or actions
- Troubleshoot application errors and long tasks

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM Explorer" style="width:95%;" >}}

## View by application

Use the application selector in the top navigation to select and view all RUM data for a specific application.

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="Click the application selector to view all RUM data for a specific application" style="width:95%;" >}}

## Search and filter

Search and filter your RUM events by typing in the search bar and selecting a visualization type in the [RUM Explorer][1]. You can narrow down, broaden, and shift your focus on subsets of events you are interested in.
Use autocomplete suggestions to view facets and recent queries.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/search/" >}}
    <h3>Search RUM Events</h3>
    Search and filter RUM events by type, attributes, and full-text queries.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/search_syntax/" >}}
    <h3>Search Syntax</h3>
    Create queries and use facets to search RUM data.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/group/" >}}
    <h3>Group RUM Events</h3>
    Aggregate events into higher-level entities to identify patterns.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/visualize/" >}}
    <h3>Visualize</h3>
    Apply visualizations to your filters and aggregations.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/events/" >}}
    <h3>Events Side Panel</h3>
    Investigate the details of an individual RUM event.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/saved_views/" >}}
    <h3>Saved Views</h3>
    Save and reuse queries, visualizations, and facets.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/export/" >}}
    <h3>Export RUM Events and Graphs</h3>
    Export RUM events and graphs for reporting and sharing.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/investigate_problems/explore_retained_data/watchdog_insights/" >}}
    <h3>Watchdog Insights for RUM</h3>
    Surface automatically detected anomalies in your RUM data.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /real_user_monitoring/investigate_problems/explore_retained_data/events/#navigate-between-user-sessions
