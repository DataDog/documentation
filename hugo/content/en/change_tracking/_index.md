---
title: Change Tracking
description: "Simplify troubleshooting with Change Tracking by monitoring deployments, feature flags, configuration changes, and other modifications to your services."
further_reading:
- link: "https://www.datadoghq.com/blog/change-tracking/"
  tag: "Blog"
  text: "Unify visibility into changes to your services and dependencies"
- link: "https://www.datadoghq.com/blog/change-overlays/"
  tag: "Blog"
  text: "Quickly spot and revert faulty deployments with Change Overlays"
---

## Overview

Change Tracking collects the changes happening across your systems, such as code deployments, feature flag flips, and infrastructure and configuration edits. It shows these changes alongside your telemetry, so you can see what changed as soon as you start investigating.

With Change Tracking, you can:

- See the changes to a service and its dependencies alongside the graphs you are already looking at.
- Narrow a regression down to a specific deployment, flag, or configuration edit, and, for deployments, open the commit or CI run behind it.
- Ask what changed in plain language, in Bits Chat or from your own AI tools with the Datadog MCP Server.

## Change types you can track

Change Tracking covers deployments, feature flags, infrastructure changes, database changes, streaming and application behavior, and any custom change you send yourself.

For the full list of change types, the Datadog feature each one comes from, and what you need to enable it, see [Tracked Change Types][1].

## Investigate changes in Datadog

Change Tracking is available on several pages in Datadog:

- [Dashboards][2]: A change timeline above the dashboard and change overlays on timeseries widgets.
- [Monitor status pages][3]: A change timeline aligned with the alert's event graphs.
- [Service pages][4]: A change timeline in the {{< ui >}}Service Summary{{< /ui >}}, for the service alone or for the service and its dependencies.
- [RUM Explorer][5]: Change markers at the top of RUM Explorer graphs, for correlating frontend regressions with frontend deployments and frontend feature flag changes.

When Datadog flags a change as likely faulty, a banner above the change timeline calls it out. Hover over a flagged change to see why it was flagged.

For the full investigation path, including Change Explorer, Semantic Search, widgets, and Bits Chat, see [Investigate Relevant Changes][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /change_tracking/change_types/
[2]: /dashboards/
[3]: /monitors/status/
[4]: /tracing/services/service_page/
[5]: /real_user_monitoring/explorer/
[6]: /change_tracking/investigate/
