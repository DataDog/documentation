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

### Client and server evaluations

{{< img src="feature_flags/flag_graphs/evaluations.png" alt="Client and server evaluations graph split by variant" style="width:100%;" >}}

Client SDK evaluations have two views, each grouped by variant:

- **Unique**: Count of unique users or entities that evaluated each variant (deduplicated by targeting key)
- **Total**: Count of all evaluations by variant, including repeated evaluations of the same targeting key

Server SDK evaluations show a count of all evaluations by variant. This requires flag evaluation metrics to be enabled. See [Set Up Server-Side Flag Evaluation Metrics][1].

### Errors and latency

{{< img src="feature_flags/flag_graphs/errors_latency.png" alt="Error and latency graphs" style="width:100%;" >}}

Error rate and latency graphs are available for client evaluations. They are not available for server evaluations.

## Export to a dashboard

{{< img src="feature_flags/flag_graphs/dashboard_export.png" alt="Export graph to a dashboard" style="width:100%;" >}}

Choose **Save to dashboard** to add a graph to a Datadog dashboard. From there, you can filter and group the data for further insights.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/guide/server_flag_evaluation_metrics/
