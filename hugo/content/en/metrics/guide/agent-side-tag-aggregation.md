---
title: Agent-Side Tag Aggregation
description: "Reduce custom metric volume by filtering out tags and re-aggregating custom metrics at the Datadog Agent before ingestion."
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/metrics/guide/agent-filtering-for-custom-metrics/"
  tag: "Documentation"
  text: "Agent-Side Filtering for Custom Metrics"
- link: "/metrics/guide/tag-indexing-rules/"
  tag: "Documentation"
  text: "Tag Indexing Rules"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
---
{{< callout url="#" header="false" btn_hidden="true" >}}
Agent-side tag aggregation is in Preview.
{{< /callout >}}

## Overview

Agent-side tag aggregation lets you reduce custom metric volume. It filters out unwanted tags and re-aggregates selected custom metrics in the Datadog Agent before those metrics are sent to Datadog.

## Prerequisites

Creating and updating Agent-side tag aggregation rules requires the [`metric_tags_write`][3] RBAC permission. All users can view existing tag aggregation rules.

Before you create Agent-side tag aggregation rules, complete the steps described in the following sections:

1. [Enable Remote Configuration](#enable-remote-configuration) on the API keys used by your Agents.
2. [Enable the Agent Data Plane](#enable-the-agent-data-plane).

Agent-side tag aggregation is supported on Agent version 7.80.0 and later. Datadog recommends version 7.81.0 or later, which includes broad backward compatibility of the Agent Data Plane with pre-existing Agent configuration options.

### Enable Remote Configuration

Remote Configuration must be enabled for your organization and for the API keys used by your Agents. For more information about the Remote Configuration security model, see the [Remote Configuration security whitepaper][4].

Comprehensive instructions are available in the [Remote Configuration documentation][5]. The steps are summarized below:

1. With the [`org_management`][6] permission, enable Remote Configuration for your organization.
2. With the [`api_keys_write`][7] permission, enable the Remote Configuration capability on the API keys used by your Agents.
3. Restart your Agents after enabling Remote Configuration on the API keys. The API key capability change takes effect only after the Agents restart.

### Enable the Agent Data Plane

Upgrade your Agents to version 7.80.0 or later (7.81.0 or later recommended) and enable the Agent Data Plane. Agent-side tag aggregation requires the Agent Data Plane, a high-performance data pipeline that lowers the combined resource usage of Agent processes and containers.

When the Agent Data Plane is enabled:

- In Kubernetes environments, a new `agent-data-plane` container runs.
- In Linux environments, a new `agent-data-plane` systemd service and process runs.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

With Operator version 1.27.0 or later, add the following to your `DatadogAgent` CRD:

{{< code-block lang="yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    dataPlane:
      enabled: true # enable the Agent Data Plane feature
  override:
    nodeAgent:
      image:
        tag: "7.81.0" # use 7.81.0 or later
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

With Helm chart version 3.202.5 or later, add the following to your `values.yaml`:

{{< code-block lang="yaml" >}}
datadog:
  dataPlane:
    enabled: true
  dogstatsd:
    enabled: true # enable the Agent Data Plane feature
agents:
  image:
    tag: "7.81.0" # use 7.81.0 or later
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux VM" %}}

With Agent version 7.80.0 or later (7.81.0 or later recommended), add the following to your `datadog.yaml`:

{{< code-block lang="yaml" >}}
data_plane:
  enabled: true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## How it works

Tag aggregation is performed locally by the Agent, but rules are centrally managed in the Datadog UI. This gives teams a single place to configure, view, and update tag aggregation behavior, while eligible Agents apply those rules before ingestion.

For each custom metric configured for Agent-side tag aggregation, the tags that are retained or removed are determined by that metric's tag configuration. This configuration is resolved from [Tag Indexing rules][1] and any per-metric [Metrics without Limits™][2] tag overrides.

## How rules are applied

Agent-side tag aggregation rules are applied only by Agents that meet all of the following requirements:

- Agent version 7.80.0 or later
- Remote Configuration enabled
- Agent Data Plane enabled

Agents earlier than 7.80.0, Agents without Remote Configuration enabled, and Agents without the Agent Data Plane enabled do not apply Agent-side tag aggregation rules.

Rule updates are usually deployed to eligible Agents in approximately 1 minute and may take up to 2 minutes.

When the tag configuration for a custom metric changes through Tag Indexing rules or per-metric tag overrides, any Agent-side tag aggregation rules that include the custom metric are updated automatically. These updates may take up to 30 minutes.

## How tags are handled

Agent-side tag aggregation can filter out tags before metrics are sent to Datadog. However, it cannot remove the `host` tag or host-level tags.

When tags are removed, the Agent re-aggregates the matching metric points before ingestion. This can reduce ingested custom metric volume by lowering the number of unique tag combinations submitted to Datadog.

### DogStatsD count and rate behavior

When a DogStatsD count or rate metric is configured for Agent-side tag aggregation, queries that use aggregations other than `sum by` may return different results.

This is because the Agent re-aggregates metric points after removing tags, using a `sum` for count and rate metrics. Queries that depend on aggregations other than `sum by` (such as `avg by`) may no longer behave the same way with Agent-side tag aggregation. For more details on this behavior, see the [example](#example-query-impact-on-count-and-rate-metrics) below.

## Create Agent-side tag aggregation rules

After Remote Configuration and the Agent Data Plane are enabled, you can configure Agent-side tag aggregation from the Datadog UI.

To create a rule:

1. Navigate to the [Metric Summary][8] page or the [Custom Metrics Volume][9] page.
2. Select one or more custom metrics for Agent-side tag aggregation.

Your tag aggregation rules are visible from the [Metric Settings][10] page, where you can also create and edit them directly.

## Preview limitations

The initial Preview release has the following limitations:

- Up to 500 metric names can be configured for Agent-side tag aggregation.
- Only DogStatsD distribution metrics and DogStatsD count and rate metrics are supported.
- Windows and macOS are not supported.
- Managing Agent-side tag aggregation rules through the API is not supported.

When Agent-side tag aggregation rules are configured, Agent Data Plane resource usage may increase by up to 10% CPU and up to 25% resident set size (RSS). These limits are intended to minimize the resource usage impact on the Agent during the Preview.

## Example: Query impact on count and rate metrics

### Example setup

Two count and rate metrics are emitted with the same values and tags (an increment of `1` emitted every 10 seconds, once with `org:1` and once with `org:2`):

- Both are configured with the same Tag Indexing or Metrics without Limits™ rule, which excludes the `org` tag key.
- One is configured for tag aggregation; the other is not.

### Query results

The following table compares how the Agent handles the two count and rate metrics when tag aggregation is disabled and enabled:

|                                          | Tag aggregation disabled                                   | Tag aggregation enabled     |
|------------------------------------------|------------------------------------------------------------|-----------------------------|
| `org` tag                                | Kept by the Agent                                          | Dropped by the Agent        |
| Points sent to Datadog (per 10 seconds)  | 2 (value `1` with `org:1` and value `1` with `org:2`)      | 1 (value `2`, no `org` tag) |
| `sum by {*}` result                      | `2`                                                        | `2`                         |
| `avg by {*}` result                      | `1`                                                        | `2`                         |

With tag aggregation disabled, the Agent keeps the `org` tag and sends two points. Tag Indexing and Metrics without Limits™ preserve the `avg by` result, even when the `org` tag is dropped from indexing.

With tag aggregation enabled, the Agent drops the `org` tag and re-aggregates the two points into one using a `sum`. This reduces ingested cardinality and volume, but changes the `avg by` result.

The `sum` aggregation performed by the Agent preserves results for queries that use `sum by`, which are the most common and useful queries on count and rate metrics. It does not preserve results for queries that use `avg by` or other aggregations, such as `min by` and `max by`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/guide/tag-indexing-rules/
[2]: /metrics/metrics-without-limits/
[3]: /account_management/rbac/permissions/#metrics
[4]: https://trust.datadoghq.com/?itemUid=dd962673-065c-4c86-83e6-21dcdbe26435&source=search
[5]: /remote_configuration/#enable-remote-configuration
[6]: /account_management/rbac/permissions/#access-management
[7]: /account_management/rbac/permissions/#api-and-application-keys
[8]: https://app.datadoghq.com/metric/summary
[9]: https://app.datadoghq.com/metric/volume
[10]: https://app.datadoghq.com/metric/settings
