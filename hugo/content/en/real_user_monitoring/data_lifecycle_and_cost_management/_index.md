---
title: Data Lifecycle and Cost Management
description: "Learn how to control which RUM sessions are retained, cap retention volumes, and recover sessions that weren't originally retained."
further_reading:
- link: "/real_user_monitoring/enrich_rum_data/"
  tag: "Documentation"
  text: "Enrich RUM data"
- link: "/real_user_monitoring/investigate_problems/"
  tag: "Documentation"
  text: "Investigate Problems"
---

## Overview

RUM without Limits lets you control which sessions are retained out of your full traffic, using retention filters and quotas, while still computing metrics over 100% of ingested sessions. Managed Archive extends this further by storing all ingested sessions so you can recover any session for investigation later.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/data_lifecycle_and_cost_management/configure_retention_filters/" >}}
    <h3>Configure retention filters</h3>
    Choose which sessions Datadog retains.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/data_lifecycle_and_cost_management/control_volumes_with_quotas/" >}}
    <h3>Control volumes with quotas</h3>
    Cap the number of sessions retained per day.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/data_lifecycle_and_cost_management/recover_sessions_from_managed_archives/" >}}
    <h3>Recover sessions from Managed Archives</h3>
    Store all ingested sessions and recover specific sessions when needed.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
