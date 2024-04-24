---
title: Excluding Logs from Error Tracking
kind: documentation
disable_toc: false
---

## Overview

{{< img src="logs/error_tracking/exclusion-filters-2.png" alt="Exclusion filters list" style="width:100%" >}}

Exclusion filters prevent Error Tracking from processing logs matching a given query, lowering issue volume and reducing noise. 

For example, you can use an exclusion filter to ignore logs from the staging environment (see [Filter setup](#filter-setup)).

### Scope

An Error Tracking exclusion filter only impacts which issues are processed by Error Tracking. To filter logs from Log Management, see [Create a log pattern exclusion filter][3]. To exclude logs from being sent to Datadog, see [Filter logs][2].

### Ordering

The filters in the **Exclusion Filters** table are applied in order. For example, creating a filter on the query `env:staging host:example-host` has no effect if an `env:staging` filter already exists.

Filters can be reordered in the table by clicking on the right side of each row and dragging up or down.

## Filter setup

The example described below creates an exclusion filter for logs matching `env:staging`, but the steps are similar for any query.

{{< img src="logs/error_tracking/configured-exclusion-filter-2.png" alt="Exclusion filter configuration for ignoring staging logs" style="width:100%" >}}

1. In Datadog, go to the [Error Tracking Rules page][1].
1. Expand any rule to show the **Exclusion Filters** list beneath the rule.
1. Click **Add Exclusion Filter**.
1. In the **Name** field, enter "Staging logs".
1. In the **Define exclusion filter query** field, type "env", then choose the `env` tag from the autocomplete suggestions to view available tag values. Choose `env:staging`.
1. Wait a moment for the live-tailing exclusion preview to populate, then scan the preview to verify the filter is working as intended.
1. Click **Save Exclusion Filter**.
1. Hover over the row in the **Exclusion Filters** table to edit, reorder, or delete the filter, or to view the `env:staging` query result in Logs Explorer.

{{< img src="logs/error_tracking/hovered-exclusion-filter-row-2.png" alt="Exclusion filter row with hover menu" style="width:90%" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /agent/logs/advanced_log_collection/?tab=configurationfile#filter-logs
[3]: /logs/guide/getting-started-lwl/#3-create-a-log-pattern-exclusion-filter