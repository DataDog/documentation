---
title: Quality Gates Explorer
kind: documentation
description: Learn about the Quality Gates Explorer for quality gates and rule executions.
further_reading:
  - link: "/quality_gates/"
    tag: "Documentation"
    text: "Learn about Quality Gates"
  - link: "/quality_gates/explorer/saved_views/"
    tag: "Documentation"
    text: "Learn about Saved Views"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

The Quality Gates Explorer allows you to [search and filter](#search-and-filter), [visualize](#visualize), and [export](#export) quality gates or rule executions at multiple levels using any tag.

{{< tabs >}}
{{% tab "Gates" %}}

Navigate to [**CI** > **Quality Gate Executions**][101] to see your Quality Gates. 
  
{{< img src="/quality_gates/explorer/gates.png" text="Quality Gate rules page" style="width:100%" >}}

The **Quality Gates** panel on the left lists default facets you can use to search for your gates.

| Facet           | Description                                                   |
|-----------------|---------------------------------------------------------------|
| Status       | The quality gate status: `Passed` or `Failed`.                   |
| Gate ID      | The ID of the quality gate.                                      |

## Quality Gate details

You can see aggregated data about quality gates over the selected time frame. Use the search field and facets to filter the list to show the gates you want to investigate.

### Quality Gate data

Quality Gate data is available in dashboards and notebooks, enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{% tab "Rule Executions" %}}

Navigate to [**CI** > **Quality Gate Executions**][101] to see your Quality Gate rule executions.

{{< img src="/quality_gates/explorer/rules.png" text="Quality Gates Rule Executions page" style="width:100%" >}}

The **Quality Gates** panel on the left lists default facets you can use to search for your rule executions.

| Facet           | Description                                                   |
|-----------------|---------------------------------------------------------------|
| Status       | The quality gate status: `Passed` or `Failed`.                   |
| Rule Name    | The user-given name to identify a particular rule.                                    |
| Blocking Status | Determines whether or not the rule status will cause the CI workflow to fail: `true` or `false`.   |
| Creator      | The user who created the quality gate rule.                                 |
| Data Source  | The source of data being evaluated for the rule (tests, static analysis).                             |
| Gate ID      | The ID of the quality gate.                                      |

## Rule executions details

You can see aggregated data about rule executions over the selected time frame. Use the search field and facets to filter the list to show the executions you want to investigate. 

### Rule execution data

Quality Gate rules data is available in [dashboards][102] and [notebooks][103], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{< /tabs >}}

## Search and filter

You can narrow down, broaden, or shift your focus on a subset of quality gates or rule executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch.

- To learn how to search for quality gate rules, see [Search and Manage][1].
- To learn how to create queries, see [Search Syntax][2].

## Analyze

Group quality gates or rule executions into higher-level fields, patterns, and transactions to derive or consolidate information. You do not need to create a facet in order to search for an attribute. Use [facets][3] to:

- **Identify trends and patterns in Quality Gate executions**: Understand which repositories or pipelines are being blocked most often.
- **Identify trends and patterns in Quality Gate Rule executions**: Understand which types of rules are failing most often across the organization.

## Visualize

Select a visualization type to visualize the outcomes of filters and aggregations and better understand your quality gates or rule executions. For example, you can view gate results in a list to organize gates data into columns, or in a timeseries graph to measure gate execution data over time.

## Export

Export your view in the [Quality Gates Explorer][4] to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /quality_gates/search
[2]: /quality_gates/explorer/search_syntax
[3]: /quality_gates/explorer/facets
[4]: /quality_gates/explorer/saved_views
