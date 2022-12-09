---
title: Custom Metrics Governance with Observability Pipelines
kind: guide
aliases:
  - /metrics/custom_metrics/guide/custom-metrics-governance-drop-metrics-missing-specific-tags/
  - /integrations/observability_pipelines/guide/custom-metrics-governance-drop-metrics-missing-specific-tags/
  - /observability_pipelines/guide/custom-metrics-governance-drop-metrics-missing-specific-tags
further_reading:
- link: "/observability_pipelines/setup/"
  tag: "Documentation"
  text: "Set up Observability Pipelines"
---

## Overview

Custom metrics provide visibility into all facets of your business, from application performance, infrastructure health, to business KPIs. To govern your custom metric volumes, Datadog offers several tools for cost visibility and control after your metrics are ingested, such as [estimated real-time custom metric usage][1], [usage attribution][2], and [Metrics without Limits™][3].

This guide walks you through how to use Observability Pipelines to govern and control your custom metrics before they are ingested. More specifically, how to do the following: 
- [Drop custom metrics missing specific tags or the metric's namespace](#drop-metrics-missing-specific-tags-or-the-metrics-namespace)
- [Remove custom metric tags](#remove-custom-metric-tags)
- [Set up rules to prevent cardinality spikes](#prevent-cardinality-spikes)

## Prerequisites

This guide assumes that you have already set up Observability Pipelines, a tool for collecting, processing, and routing telemetry data. If you're not familiar with Observability Pipelines, see the [Setup][4] documentation and [Vector Remap Language][5] for more information.

## Drop metrics missing specific tags or the metric's namespace

### Problem

It is useful to break down your overall metrics usage with the [Usage Attribution][6] feature, by adding tags like `team` or `application`. The Usage Attribution feature lets you see how many custom metrics a particular team or application is generating. However, custom metrics might be submitted without those crucial tags. This makes it difficult to attribute the metrics back to the specific team, service, or application generating them. 

### Solution

To prevent that issue, use Observability Pipelines to drop metrics missing tags that are meaningful to you. This can be done prior to metric ingestion and therefore before metrics contribute to your account's custom metrics usage. 

Observability Pipelines has a wide array of functions that can transform your metrics data before it is sent to Datadog. For example, use the `filter` transform to drop metrics that are missing specific tag keys. The following component filters out any metrics that do not have a `team_tag`, ensuring those metrics are dropped in your Observability Pipelines configuration.

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |
      exists(.tags.<team_tag>)
```

Similarly, in cases where you want to filter out metrics by namespace instead of tags, use the following configuration.

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |2
       .namespace == "foo" 
```
## Remove custom metric tags

### Problem

Metrics tags can provide better visibility into specific hosts, pods, applications, and services. However, some metrics may have tags that are rarely queried or useful for your visualizations or investigative workflows. While you can use Metrics without Limits™ to exclude potential superfluous tags automatically (after a metric has been ingested), you cannot drop tags on metrics (prior to metric ingestion) to prevent these tags from contributing towards your organization's ingested metrics usage. 

**Note**: Removing tags on metrics prior to ingestion impacts the mathematical accuracy of your metrics' queries. Using Metrics without Limits™ allows you to define important tags at any time, without impacting the mathematical accuracy of your metrics' queries.

To address this issue, you can use Observability Pipelines to do one of the following **before the metric is ingested**:

- [Drop one tag](#solution-1-drop-one-tag)
- [Define an allowlist array of tags to keep](#solution-2-define-an-allowlist-array-of-tags-to-keep)
- [Define a blocklist array of tags to drop](#solution-3-define-a-blocklist-array-of-tags-to-drop)
- [Define an allowlist of valid tags in a Reference Table](#solution-4-define-an-allowlist-of-valid-tags-in-a-reference-table)

### Solution 1: Drop one tag

To drop a specific tag on custom metrics before they get ingested into Datadog, you can use Observability Pipelines' [`remap` transform][7], which comes with a domain-specific language to manipulate metrics. 

For the basic use case of dropping a single metric tag, you can use the `del()` function in VRL. For example, the following component drops the `tag_to_drop` tag.

```yaml
transforms:
  drop_one_tag:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |2-
           # remove .tag_to_drop tag
           del(.tags.tag_to_drop) 
```

### Solution 2: Define an allowlist array of tags to keep

In the scenario where you have many tags you want to drop and know which tags you want to keep, use the `filter()` function to define an allowlist of the tags to keep. This automatically drops any tags that aren't included in the allowlist. See the following configuration example:

```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |2+

           # list of tags to keep
           tags_allowlist = ["tag 1", "tag 2", "tag 3", "tag 4"]

           # filter and drop any tags that don't match the tags in tags_to_keep
           .tags = [filter(.tags) -> |_index, value| { includes(tags_allowlist, value)}
```

### Solution 3: Define a blocklist array of tags to drop

In the case where you know which tags you want to drop, use the `filter()` function to define a blocklist of those tags. This is done by adding `!` to `includes(tags_blocklist, value)` from Solution 2.

```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |2+

           # list of tags to keep
           tags_blocklist = ["tag 1", "tag 2", "tag 3", "tag 4"]

           # filter and drop any tags that don't match the tags in tags_to_keep
           .tags = [filter(.tags) -> |_index, value| { !includes(tags_blocklist, value)}
```

### Solution 4: Define an allowlist of valid tags in a Reference Table

In cases when you have a specific list of valid tags, you can use Observability Pipelines' `get_enrichment_tables` and `find_enrichment_tables` functions. This allows you to reference an enrichment table in `csv` format in Observability Pipelines. `csv` is the only supported file format. 

For this example, a `csv` file named `valid_tags.csv` contains the following valid tags:

```
tag_name
"tag 1"
"tag 2"
"tag 3"
"tag 4"
```

To reference it as a table, the following configuration must be set for the file `valid_tags.csv`.

```
enrichment_tables:
  valid_tag_table:
    type: file
    file:
      path: /etc/vector/valid_tags.csv
      encoding:
        type: csv
    schema:
      tag_name: string
```

Once the `enrichment_tables` field is set, you can drop tags not included in the `valid_tags.csv` file using the following configuration:


```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |2+
           # filter and drop any tags that don't match the tags in tags_to_keep
           .tags = [filter(.tags) -> |_index, value| {!is_empty(find_enrichment_table_records(valid_tag_table, value))}
```

## Prevent tag cardinality spikes

### Problem

Your overall volume of custom metrics is dependent on the number of tag value combinations submitted to Datadog. See [Custom Metrics Billing][8] to learn how custom metrics are counted. It is possible for a particular tag key's cardinality to unintentionally spike. For example, the `path` tag usually has 100 unique tag values, but then suddenly spikes to 10,000 unique values. This sudden increase in tag cardinality can cause an increase in your overall custom metrics volumes. It can also potentially cause you to exceed your account allotment for custom metrics. 

### Solution

To avoid this situation, you can set up rules in Observability Pipelines to prevent cardinality spikes. 

Use Observability Pipelines' [`tag_cardinality_limits` transform][9] to set cardinality limits on tag keys. It can drop the metric name entirely or any tag keys that exceeds the tag cardinality limit. You can set the following attributes in the transform:

- `value_limit`: How many distinct values to accept for any given tag key.
- `limit_exceeded_action`: Controls what should happen when a metric comes in with a tag that would exceed the configured limit on cardinality. You have the option to set it to: 
    - `drop_event`: Drop any metrics that contain tags that would exceed the configured limit.
    - `drop_tag`: Remove tags that exceed the configured limit from the incoming metric.
- `mode`: Controls which approach is used internally to keep track of previously seen tags and determine when a tag on an incoming metric exceeds the limit. 
    - `exact`: This mode has a higher memory requirement than `probabilistic`, but does not falsely output metrics with new tags after the limit has been hit.
    - `probabilistic`: This mode has a lower memory requirement than `exact`, but may occasionally allow metrics to pass through the transform even when they contain new tags that exceed the configured limit. The rate at which this happens can be controlled by changing the value of `cache_size_per_tag`.
- `cache_size_per_tag`: An optional tag that enables you to define the size of the cache in bytes to use for detecting duplicate tags. The bigger the cache, the less likely it is to have a false positive or a case where a new value for a tag is allowed even after the configured limits are reached.

See the configuration example below:

```yaml
transforms:
  limit_tags_to_500:
    type: tag_cardinality_limit
    inputs:
      - dd_agent.metrics
    limit_exceeded_action: drop_tag
    mode: exact
    value_limit: 500
```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/#types-of-usage
[2]: /account_management/billing/usage_attribution/
[3]: /metrics/metrics-without-limits/
[4]: /observability_pipelines/setup/
[5]: https://vector.dev/docs/reference/vrl/
[6]: /account_management/billing/usage_attribution/
[7]: https://vector.dev/docs/reference/vrl/
[8]: /account_management/billing/custom_metrics/?tab=countrategauge
[9]: https://vector.dev/docs/reference/configuration/transforms/tag_cardinality_limit/