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

The flags list page shows a summary row for each flag, including total evaluation count and mini graph that let you assess activity across your flag inventory without opening each flag individually.

{{< img src="feature_flags/flag_graphs/flag_list.png" alt="Feature flags list page showing evaluation counts and sparklines per flag" style="width:100%;" >}}

Each row shows:

- **Evaluation count**: total number of client and server evaluations in the past hour
- **Mini graph**: individual client and server evaluations in the past hour, grouped by variant
- **Variants**: the variant colors are the key for the mini graph

## Flag details page

The flag details page includes observability insights to help you quickly identify how a single flag is performing.

### Targeting rule evaluation counts

Shows the total client and server evaluations that fell through to each targeting rule in the given `Real-time metric overview` time range.

{{< img src="feature_flags/flag_graphs/targeting_rule_distribution.png" alt="Targeting rule evaluation count" style="width:100%;" >}}

Use this count to confirm that targeting rules are working as expected and to see how traffic is distributed across targeting rules in a given environment, including % of total traffic in the time range.

### Client + Server evaluations

{{< img src="feature_flags/flag_graphs/evaluations.png" alt="Client + Server evaluations graph split by variant" style="width:100%;" >}}

Client SDK evaluations have two views, each grouped by variant:

- **Unique**: count of unique users or entities that evaluated each variant (deduplicated by targeting key)
- **Total**: count of all evaluations by variant, including repeated evaluations of the same targeting key


Server SDK evaluations show count of all evaluations by variant. Requires flag evaluation metrics to be enabled. See [Set Up Server-Side Flag Evaluation Metrics][1].

### Errors and latency

{{< img src="feature_flags/flag_graphs/errors_latency.png" alt="Error and latency graphs" style="width:100%;" >}}

Error rate and latency graphs are available for client evaluations. Server evaluation support is coming soon.

## Export to a dashboard

{{< img src="feature_flags/flag_graphs/dashboard_export.png" alt="Export graph to a dashboard" style="width:100%;" >}}

Choose **Export to Dashboard** to add it to a Datadog dashboard. From there, you can slice and dice the data for further insights.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/guide/server_flag_evaluation_metrics/
