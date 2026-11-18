---
title: Feature Flag History
description: "Track and manage the history of your feature flags"
aliases:
  - /feature_flags/history
further_reading:
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Learn about Feature Flags"
- link: "/change_tracking/change_types/feature_flags/"
  tag: "Documentation"
  text: "Track Feature Flag Changes"
---

## Overview

Flag History allows you to track changes and maintain an audit trail of your Datadog feature flags over time. Knowing who changed what can be useful for governance and troubleshooting unexpected behavior in your application. You can view the history of individual flags or access a global view of all flag changes across your organization.

## Individual flag history

When you view an individual feature flag, the {{< ui >}}Version history{{< /ui >}} sidebar section displays all changes made to that specific flag. 

- Select an environment tab to view changes in a particular environment.
- Select {{< ui >}}View diff{{< /ui >}} to display a diff view of a specific change.

{{< img src="/feature_flags/flag_history-2.png" alt="History panel for a single feature flag" style="width:100%;" >}}

## Global flag history

Navigate to {{< ui >}}Feature Flags{{< /ui >}} > [{{< ui >}}Global Flag History{{< /ui >}}][1] to show all flag changes across your organization in a single view.

- Use the {{< ui >}}Environment{{< /ui >}} filter to view changes in a particular environment or all environments.
- Use the {{< ui >}}Feature Flag{{< /ui >}} filter to view changes for a specific flag.
- Use the date range filter to narrow results to a specific time period.
- Select {{< ui >}}See Changes{{< /ui >}} to display a diff view of a specific change.

{{< img src="/feature_flags/flag_history_global-2.png" alt="Global flag history view" style="width:100%;" >}}

## View flag changes alongside service performance

When a flag's targeting, rollout, or status changes in an environment, Datadog sends an event to [Change Tracking][2]. These events appear on the affected services' Change Tracking timelines. Use them to check whether a flag change lines up with a spike in errors or latency. See [Track Feature Flag Changes][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/global-history
[2]: /change_tracking/
[3]: /change_tracking/change_types/feature_flags/
