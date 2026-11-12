---
title: Feature Flag Graphs
description: Understand the graphs on the feature flags list and details pages and how to use them to monitor your rollout.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
---

## Overview

Datadog Feature Flags provides graphs at two levels: the flags list page gives a snapshot of all your flags at a glance, and the flag details page shows in-depth graphs for a single flag.

## Flags list page

Each summary row shows a total evaluation count and a mini graph, so you can assess activity across your flag inventory without opening each flag.

{{< img src="feature_flags/flag_graphs/flag_list-2.png" alt="Feature flags list page showing evaluation counts and sparklines per flag" style="width:100%;" >}}

Each row shows:

- **Evaluation count**: Total number of client and server evaluations in the past hour
- **Mini graph**: Individual client and server evaluations in the past hour, grouped by variant
- **Variants**: The variant colors are the key for the mini graph

## Flag details page

The flag details page includes observability insights to help you identify how a single flag is performing.

### Targeting rule evaluation counts

This shows the total of combined client and server evaluations that fell through to each targeting rule during the time range selected in the top of the page (default is 1 hour).

{{< img src="feature_flags/flag_graphs/targeting_rule_distribution-2.png" alt="Targeting rule evaluation count" style="width:100%;" >}}

Use this count to confirm that targeting rules are working as expected and to see how traffic is distributed across targeting rules in a given environment, including the percentage of total traffic in the time range.

### Evaluations

The **Evaluations** graph shows client and server flag evaluations together, grouped by variant and SDK.

Select a view for both client and server evaluations:

- **Unique**: Count of distinct targeting keys within each variant, SDK, and time bucket
- **Total**: Count of all evaluations, including repeated evaluations of the same targeting key

Use **Color by** to color the series by **Variant** or **SDK**. Evaluations without an SDK name appear as **Unknown SDK**.

If you use OpenTelemetry (OTLP) evaluation metrics, you can graph them on a dashboard. See [Set Up Server-Side Flag Evaluation Metrics][1].

### Errors and latency

{{< img src="feature_flags/flag_graphs/errors_latency.png" alt="Error and latency graphs" style="width:100%;" >}}

Error rate and latency graphs use sampled Real User Monitoring (RUM) data and are available for client evaluations only. Changes to sampling or retention rates can cause shifts in these graphs that are unrelated to the flag.

## Export to a dashboard

{{< img src="feature_flags/flag_graphs/dashboard_export.png" alt="Save a latency graph to a dashboard from its sharing menu" style="width:100%;" >}}

On an **Errors** or **Latency** graph, open the sharing menu and choose **Save to dashboard**. From the dashboard, you can filter and group the data for further insights.

The **Evaluations** graph does not support dashboard export. To graph OTLP evaluation metrics on a dashboard, follow [Set Up Server-Side Flag Evaluation Metrics][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/guide/server_flag_evaluation_metrics/
