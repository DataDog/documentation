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

The flags list page shows a summary row for each flag, including evaluation sparklines and counts that let you quickly assess activity across your flag inventory without opening each flag individually.

{{< img src="feature_flags/flag_graphs/flags_list.png" alt="Feature flags list page showing evaluation counts and sparklines per flag" style="width:100%;" >}}

Each row shows:

- **Evaluation count**: total number of evaluations in the selected time window
- **Sparkline**: a mini graph of evaluation volume over time, so you can spot sudden drops or spikes at a glance
- **Variant breakdown**: the distribution of evaluations across variants

## Flag details page

The flag details page includes several graphs to help you monitor how a single flag is performing.

{{< img src="feature_flags/flag_graphs/flag_details_overview.png" alt="Flag details page showing all evaluation graphs" style="width:100%;" >}}

### Targeting rule distribution

Shows the percentage of traffic that fell through to each variant based on your targeting rules.

{{< img src="feature_flags/flag_graphs/targeting_rule_distribution.png" alt="Targeting rule distribution graph" style="width:100%;" >}}

Use this graph to confirm that targeting rules are working as expected and to see how traffic is distributed across variants in a given environment.

### Server evaluations

Raw total count of server-side flag evaluations, split by variant.

{{< img src="feature_flags/flag_graphs/server_evaluations.png" alt="Server evaluations graph split by variant" style="width:100%;" >}}

Use this graph to track overall server-side evaluation volume and compare variant distribution over time. Requires flag evaluation metrics to be enabled — see [Set Up Server-Side Flag Evaluation Metrics][1].

### Client evaluations

Two views are available for client-side evaluations:

- **Deduplicated by targeting key**: counts unique users or entities that received each variant. Use this to measure the reach of each variant.
- **Raw total count**: counts every evaluation, including repeated evaluations of the same targeting key. Use this to measure evaluation frequency.

### Errors and latency

Error rate and latency graphs are available for client evaluations. Server evaluation support is coming soon.

## Export to a dashboard

Select any graph and choose **Export to Dashboard** to add it to a Datadog dashboard. From there, you can combine it with other metrics, apply custom time ranges, and set up monitors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/guide/server_flag_evaluation_metrics/
