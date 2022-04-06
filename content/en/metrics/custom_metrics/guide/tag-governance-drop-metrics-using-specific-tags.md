---
title: Tag Governance - Drop Metrics Using Specific Tags
kind: guide
further_reading:
- link: "https://vector.dev/docs/setup/going-to-prod/"
  tag: "Documentation"
  text: "Deploying Vector to production"
- link: "https://vector.dev/docs/reference/configuration/sources/datadog_agent/ "
  tag: "Documentation"
  text: "Datadog agent as a source for Vector"
---

## Overview

Custom metrics provide visibility into all facets of your business -- from application performance, infrastructure health and business KPIs. In order to govern your custom metric volumes, Datadog offers several tools for cost visibility and control, such as [estimated real-time custom metric usage][1], [usage attribution][2], and [Metrics without Limits][3]™.

These tools use metrics tags to provide visibility into metrics that have been ingested into Datadog. This helps you monitor the number of custom metrics associated with any tag. For example, you can use tags to see how many custom metrics a particular application team is generating. However, custom metrics can be submitted without proper tagging; making it harder to understand your overall volume of custom metrics. It’s also harder, without proper tagging, to attribute the metrics back to the specific team, service, or application that is generating them.

## Prerequisites

To filter out custom metrics based on tags, use [Vector][4] to drop them before they get ingested into Datadog. Vector, an open source tool optimized for observability pipelines, or its enterprise solution, Datadog Observability Pipelines, lets you control which custom metrics are sent to Datadog.

This guide assumes that you already have a Vector pipeline set-up. If you’re not familiar with Vector, see [Setting up Vector][5] and [Vector Remap Language][6] for more information.

## Configure the filter transform

Vector has a wide array of functions that can [transform][7] your data before it is sent to Datadog. The simplest way to filter out a metric by a specific tag is to use the [filter transform][8]. For example, the following component filters out any metrics that doesn't have a `team_tag`, ensuring those metrics are dropped in your Vector pipeline.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |
      exists(.tags.<team_tag>)
```

{{% /tab %}}
{{% tab "TOML" %}}

```
[transforms.my_transform_id]
    type = "filter"
    inputs = [ "my-source-or-transform-id" ]
    condition = '''
    exists(.tags.<team_tag>)
    '''
```

{{% /tab %}}
{{< /tabs >}}

Similarly, in cases where you want to filter out metrics by namespace instead of tags, use the following configuration.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |2
       .namespace == "foo" 
```

{{% /tab %}}
{{% tab "TOML" %}}

```
[transforms.my_transform_id]
    type = "filter"
    inputs = [ "my-source-or-transform-id" ]
    condition = ''' 
        .namespace == "foo" 
    '''
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/billing/usage_metrics/#types-of-usage
[2]: https://docs.datadoghq.com/account_management/billing/usage_attribution/
[3]: https://docs.datadoghq.com/metrics/metrics-without-limits/
[4]: https://vector.dev/
[5]: https://vector.dev/docs/setup/
[6]: https://vector.dev/docs/reference/vrl/
[7]: https://vector.dev/docs/reference/configuration/transforms/
[8]: https://vector.dev/docs/reference/configuration/transforms/filter/
