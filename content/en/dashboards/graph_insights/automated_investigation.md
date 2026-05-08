---
title: Dashboard Automated Investigation
description: # TODO: fill in once UI labels and GA status are confirmed
further_reading:
- link: "/dashboards/graph_insights/watchdog_explains/"
  tag: "Documentation"
  text: "Watchdog Explains"
- link: "/dashboards/graph_insights/correlations/"
  tag: "Documentation"
  text: "Metric Correlations"
---

<!--
DRAFT STUB — Do not publish.

Research sources:
- Confluence Architecture Guide: https://datadoghq.atlassian.net/wiki/spaces/Graphing/pages/6155829323/Architecture+Guide
- Confluence MCP Tools Proposal: https://datadoghq.atlassian.net/wiki/spaces/Graphing/pages/6230802941/Proposal+Dashboard+Investigation+MCP+Tools
- Confluence Insights Summary Eval System: https://datadoghq.atlassian.net/wiki/spaces/Graphing/pages/6379570119/Dashboard+Investigation+Insights+Summary+Eval+System
- Jira DNV-384 (Done, Top priority): https://datadoghq.atlassian.net/browse/DNV-384
- Related Jira (MCP tools, still in flight): https://datadoghq.atlassian.net/browse/DNV-391
- Closest existing doc: content/en/dashboards/graph_insights/watchdog_explains.md
-->

<!-- ============================================================
KEY UNKNOWNS — get answers from PM or engineer before writing
===============================================================

1. EXACT UI LABELS
   The internal name is "Dashboard Automated Investigation" / "Dashboard Investigation",
   but what does the product surface to users? Need the exact text for:
   - The side panel title
   - The toggle at the top of the dashboard (is it still called "Anomalies"?)
   - The button on individual widgets ("Investigate"? "Investigate Anomaly"?)
   - The paused-state message in the side panel
   
2. SCREENSHOTS / RECORDING
   This page needs at least two screenshots:
   - The side panel open with grouped anomaly results (showing groups, shared tags, AI summary)
   - The dashboard view with widget highlighting and progress indicator
   Ask the team for Figma files, a Loom recording, or access to a demo dashboard.

3. AVAILABILITY / PLAN GATING
   Is this available on all plans, or only certain tiers?
   Is it in GA, beta, or limited availability? DNV-384 is "Done" but that
   doesn't confirm GA — check if there's a feature flag still controlling rollout.

4. DEFAULT BEHAVIOR
   Is the feature on by default for all orgs, or opt-in?
   The architecture guide lists a primary feature flag
   (graphing_dashboard_grouped_insights) — confirm whether this is enabled
   broadly or only for specific customers.

5. DASH 2026 ANGLE
   Is this being announced at DASH (June 9-10, 2026)?
   If so: is the current state a preview/beta, and does DASH mark GA?
   This affects how we frame availability and any preview callout boxes.

6. WIDGET LIMIT FOR USERS
   The default widget limit appears to be 10 (extended to 100 via internal flag).
   Confirm what the user-facing limit is and whether it's mentioned in the UI.

================================================================ -->

## Overview

<!-- TODO: Write once UI labels and GA status are confirmed. -->
<!-- Suggested draft:
Dashboard Automated Investigation automatically scans all timeseries widgets
on a dashboard for anomalies, groups widgets whose anomalies overlap in time,
and identifies the tags that are shared across each group — giving you a
starting point for root cause analysis without having to inspect each widget
individually. Results appear in a side panel while the scan runs.

<div class="alert alert-info">Dashboard Automated Investigation is available
for <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">
Timeseries widgets</a> with the Metrics data source
(avg, sum, min, and max aggregation).</div>
-->


## How Dashboard Automated Investigation scans your dashboard

<!-- TODO: Confirm exact behavior and default widget limit with the team.
Cover:
- Scanning starts automatically when a dashboard loads (no user action needed)
- Progress indicator at the top of the dashboard
- Two-phase detection: client-side peak detection first (no API call),
  then backend anomaly confirmation for widgets that look anomalous
- Seasonality-aware: looks back up to 3 weeks (same algorithm as Watchdog Explains)
- Default limit of [X] timeseries widgets analyzed per dashboard load
- When limit is hit: side panel message "Scanning is paused. Scroll to see
  anomalies on other widgets."
- Widgets skipped: non-timeseries, TV mode, mobile embeds, user opt-out
-->


## Understanding the side panel

<!-- TODO: Confirm UI labels and get screenshot.
Cover:
- Side panel opens when anomalies are found
- "Issue groups": clusters of widgets whose anomaly time ranges overlap
- Shared influential tags within each group (e.g., env:prod, region:us-east-1)
  — these indicate *where/what* is affected, not necessarily *why*
- AI-generated title + bullet-point summary per issue group
- Per-widget pink highlighting on the dashboard canvas
-->


## Investigating an anomaly group

<!-- TODO: Confirm the exact UX flow with the team.
Cover:
- How to click into an issue group in the side panel
- What you see (affected widgets, anomaly time range, influential tags)
- How clicking a widget or "Investigate" hands off to Watchdog Explains
  for single-widget deep-dive (tag isolation, full-screen investigation view)
-->


## Disabling anomaly scanning

<!-- TODO: Confirm whether this works the same as Watchdog Explains.
Based on architecture guide, it's the same toggle ("Anomalies" at top
of dashboard), per-user/per-session — other viewers are unaffected.
Check if the UI label changed for this feature.
-->


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
