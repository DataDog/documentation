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

Change Tracking collects the changes happening across your systems, such as code deployments, feature flag flips, infrastructure and configuration edits, or schema changes. It puts them next to your telemetry, so that the first question of an investigation ("what changed?") is already answered when you arrive on the page.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

With Change Tracking, you can:

- See the changes to a service and its dependencies alongside the graphs you are already looking at.
- Narrow a regression down to a specific deployment, flag, or configuration edit, and open the commit or CI run behind it.
- Ask Bits AI what changed, in plain language, instead of assembling the timeline yourself.

Change Tracking is included at no additional cost with APM, Infrastructure Monitoring, and RUM.

## Change types you can track

Change Tracking covers deployments, feature flags, infrastructure changes, database changes, streaming and application behavior, and any custom change you send yourself.

For the full list of change types, the Datadog feature each one comes from, and what you need to enable it, see [Tracked Change Types][1].

## Investigate changes in Datadog

Changes show up on the pages where you already investigate:

- [Dashboards][2]: A change timeline above the dashboard and change overlays on timeseries widgets.
- [Monitor status pages][3]: A change timeline aligned with the alert's event graphs.
- [Service pages][4]: A change timeline in the {{< ui >}}Service Summary{{< /ui >}}, for the service alone or for the service and its dependencies.
- [RUM Explorer][5]: Change markers at the top of RUM Explorer graphs, for correlating frontend regressions with frontend deployments and feature flag changes.

Click any change to open the side panel, where you can read what changed, compare deployments, and jump to the commit or CI run behind it.

For the full investigation path, including Semantic Search, Change Tracking widgets, and Bits AI, see [Investigate Relevant Changes][6].

## Get started

If you are already sending APM data and tagging your services with `service` and `version`, your deployments are already being tracked. Open a service page to see them.

To set up Change Tracking from scratch, see [Getting Started with Change Tracking][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /change_tracking/change_types/
[2]: /dashboards/
[3]: /monitors/status/
[4]: /tracing/services/service_page/
[5]: /real_user_monitoring/explorer/
[6]: /change_tracking/investigate/
[7]: /change_tracking/getting_started/
