---
title: Indexes
description: Learn how to configure multiple indexes with custom filters and retention policies for your CloudPrem cluster
further_reading:
- link: "/cloudprem/configure/pipelines/"
  tag: "Documentation"
  text: "Configure Processing Pipelines"
- link: "/cloudprem/operate/search_logs/"
  tag: "Documentation"
  text: "Search Logs"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

By default, a CloudPrem cluster stores all logs in a single index with a single retention policy. With multiple indexes, you can segment logs by defining filter queries and assigning a different retention period to each index. For example, you can retain audit logs for 1 year while keeping debug logs for only 3 days.

To view and manage your CloudPrem indexes, navigate to the [CloudPrem page][1] in Datadog. Select a cluster and click **View Indexes** to access the index configuration.

{{< img src="cloudprem/indexes/indexes_configuration.png" alt="CloudPrem indexes configuration page showing three indexes with filters and retention periods" style="width:80%;">}}

## Indexes filters

When a log is ingested, CloudPrem evaluates each index's filter from top to bottom and routes the log to the **first matching index**. This means index order matters:

- Place indexes with more specific filters above indexes with broader filters. For example, `source:security env:production` should appear above `source:security`.
- A catch-all index with a `*` filter at the bottom ensures that no logs are dropped.
- A log matches at most one index.

You can reorder indexes at any time by dragging rows or using the **Move to** action.

## Retention per index

Each index has its own retention period, which determines how long logs are stored before automatic deletion.

<div class="alert alert-info">If you are upgrading from a previous CloudPrem version, the index retention configured through the Datadog UI takes precedence over the global retention set in the Helm chart values.</div>

## Searching across indexes

To query logs stored in CloudPrem, select one or more CloudPrem indexes in the [Log Explorer][2]. You can select a specific index to narrow your search, or select all indexes in a cluster to search across them. From the index configuration page, use **View in Log Explorer** to open a filtered view for a given index.

For more information, see [Search CloudPrem Logs][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cloudprem
[2]: /logs/explorer/
[3]: /cloudprem/operate/search_logs
