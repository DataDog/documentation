---
description: Learn about facets in the Quality Gates Explorer.
further_reading:
- link: quality_gates/explorer/
  tag: Documentation
  text: Learn about the Quality Gates Explorer
- link: quality_gates/search/
  tag: Documentation
  text: Learn how to search your rules and executions
kind: documentation
title: Quality Gates or Rule Execution Facets
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

Facets are user-defined tags and attributes from your rules or executions. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your rules or executions in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching quality gates][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming quality gates applies.

The [Quality Gates Explorer][4] includes out-of-the-box facets such as `Status` and `Gate ID`. You can use facets in the Quality Gates Explorer to [search for and filter quality gates][5].

{{< tabs >}}
{{% tab "Gates" %}}

Navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] and select **Gates** to access the list of [Quality Gates facets][102].

{{< img src="quality_gates/explorer/facets_gates.png" text="Facets list for gates on the Quality Gates Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ja/quality_gates/explorer/?tab=gates

{{% /tab %}}
{{% tab "Rules" %}}

Navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] and select **Rules** to access the list of [Quality Gates facets][102].

{{< img src="quality_gates/explorer/facets_rules.png" text="Facets list for rules on the Quality Gates Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ja/quality_gates/explorer/?tab=rules

{{% /tab %}}
{{< /tabs >}}

### Qualitative facets

Use qualitative facets to:

- **Get relative insights** for values.
- **Count unique values**.
- Frequently **filter** your quality gates against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**Note:** Although facets are not required for filtering on tags, defining facets for tags that you often use during investigations can help reduce your time to resolution.

### Quantitative measures

Use quantitative measures to:

- **Aggregate** values from multiple quality gates.
- **Range filter** your quality gates.
- **Sort** your quality gates against a value.

#### Types

Measures support long integers and double values.


## Facet panel

The search bar provides a comprehensive set of interactions to filter and group your data. However, for many cases, the facet panel is a straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

The search bar and URL automatically reflect your selections from the facet panel.

- **Facets (qualitative)** show a list of unique values, and a count of quality gates that match each facet.
- **Measures (quantitative)** have a slider ranging between minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.

### Grouping facets

Facets are grouped into meaningful themes in the facet list. Assigning or reassigning a group for a facet affects only the facet list, and has no impact on search or analytics.

### Filtering facets

Use the search facets field on the facet panel to filter the facet list and navigate to a particular facet. The search uses the facet display name and field name to scope results.

## Creating facets

Creating a facet on a rule execution attribute is not a mandatory step to search for quality gates. Facets are useful if you wish to add a meaningful description to a specific rule execution attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the facet list

You can create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="quality_gates/explorer/facets.png" alt="Add a facet from the facet side panel" style="width:30%;">}}

Define the underlying field (key) name for this facet:

- Use the attribute path for quality gate attributes, with `@` prefix.

Autocomplete based on the content in quality gates of the current views helps you to define the proper field name, but you can use virtually any value here.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/ci
[2]: /ja/dashboards/
[3]: /ja/notebooks/
[4]: /ja/quality_gates/explorer
[5]: /ja/quality_gates/search
[6]: /ja/quality_gates/explorer/search_syntax/