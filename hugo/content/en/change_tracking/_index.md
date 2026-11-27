---
title: Change Tracking
description: "Streamline troubleshooting with Change Tracking by monitoring deployments, feature flags, configuration changes, and other modifications to your services."
further_reading:
- link: "https://www.datadoghq.com/blog/change-tracking/"
  tag: "Blog"
  text: "Unify visibility into changes to your services and dependencies"
- link: "https://www.datadoghq.com/blog/ai/investigate-production-alerts/"
  tag: "Blog"
  text: "Teaching a 9B model to investigate production alerts"
---

## Overview

Change Tracking streamlines troubleshooting and incident response by surfacing relevant changes to your service and its dependencies, enabling faster detection and remediation when issues arise.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking supports monitoring of a range of modifications to your service and its dependencies including:
- Deployments
- Feature Flags
- Traffic Spikes
- Configuration Changes
- Database Modifications
- Schema Changes
- Scale Adjustments
- Kubernetes Adjustments
- Kubernetes Pod Crashes
- Watchdog Alerts

For details on specific types of supported changes and setup requirements, see [Tracked Change Types][16].

## Investigate changes in Datadog

Changes show up on monitor status pages, service pages, dashboards, and widgets. To view and analyze changes on each of these pages, see [Investigate Relevant Changes][17].

## Change types you can track

Change Tracking covers deployments, feature flags, database changes, streaming and application behavior, infrastructure changes, and any custom change you send yourself.

For the full list of change types, the Datadog feature each one comes from, and what you need to enable it, see [Tracked Change Types][16].
  

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/
[2]: /tracing/services/service_page/
[3]: /dashboards/
[4]: /tracing/services/deployment_tracking/
[5]: /integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /api/latest/events/
[7]: /watchdog/
[8]: /database_monitoring/
[9]: /data_streams/
[10]: /database_monitoring/connect_dbm_and_apm/
[11]: /actions/connections/#work-with-connections
[12]: /database_monitoring/schema_explorer
[13]: /infrastructure/resource_catalog/resource_changes/
[15]: /tracing
[16]: /change_tracking/change_types/
[17]: /change_tracking/investigate/
