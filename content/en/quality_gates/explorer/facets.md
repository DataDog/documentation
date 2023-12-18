---
title: Quality Gates or Rule Execution Facets
kind: documentation
description: Learn about facets in the Quality Gates Explorer.
further_reading:
- link: 'quality_gates/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Quality Gates Explorer'
- link: 'quality_gates/search/'
  tag: 'Documentation'
  text: 'Learn how to search your rules and executions'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates are in public beta.
{{< /callout >}}

## Overview

Facets are user-defined tags and attributes from your rules or executions. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your rules or executions in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching quality gates][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming quality gates applies.

The [Quality Gates Explorer][4] includes out-of-the-box facets such as `Test Status`, `Test Service`, `CI Status`, and `CI Provider`. You can use facets in the Quality Gates Explorer to [search for and filter quality gates][5].

{{< tabs >}}
{{% tab "Gates" %}}

Navigate to [**CI** > **Test Runs**][101] to access the list of facets left of the test runs list.

{{< img src="/continuous_integration/facets-tests.png" text="Facets list on the Test Runs page of the Quality Gates Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs

{{% /tab %}}
{{% tab "Rules" %}}

Navigate to [**CI** > **Pipeline Executions**][101] to access the list of facets left of the pipeline executions list.

{{< img src="/continuous_integration/facets-pipelines.png" text="Facets list on the Pipeline Executions page of the Quality Gates Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions

{{% /tab %}}
{{< /tabs >}}

### Qualitative facets

Use qualitative facets when you need to:

- **Get relative insights** for values.
- **Count unique values**.
- Frequently **filter** your quality gates against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**Note:** Although facets are not required for filtering on tags, defining facets for tags that you often use during investigations can help reduce your time to resolution.

### Quantitative measures

Use quantitative measures when you need to:

- **Aggregate** values from multiple quality gates.
- **Range filter** your quality gates.
- **Sort** your quality gates against that value.

#### Types

Measures have either a long integer or double value for equivalent capabilities.

#### Units

Measures support units (**time** in seconds or **size** in bytes) for handling of orders of magnitude at query time and display time. The unit is a property of the measure itself, not of the field.

For example, consider a `duration` measure in nanoseconds. Suppose test runs from `service:A` have `duration:10000000`, meaning `10 milliseconds`. Supposed test runs from `service:B` have `duration:5000000`, meaning `5 milliseconds`. Use `duration:>2ms` to consistently query test run tags from both services at once. For more information about search queries, see [Search Syntax][6].

## Facet panel

The search bar provides the most comprehensive set of interactions to filter and group your data. However, for many cases, the facet panel is a straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

The search bar and URL automatically reflect your selections from the facet panel.

- **Facets (qualitative)** come with a top list of unique values, and a count of quality gates matching each of them.
- **Measures (quantitative)** come with a slider indicating minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.

### Grouping facets

Facets are grouped into meaningful themes in the facet list. Assigning or reassigning a group for a facet affects only the facet list, and has no impact on search or analytics.

### Filtering facets

Use the search facets box on the facet panel to scope the whole facet list and navigate to the facet you need to interact with. Search facets uses the facet display name and field name to scope results.

## Creating facets

Creating a facet on a test run or pipeline execution attribute or tag is not a mandatory step to search for quality gates. Facets are useful if you wish to add a meaningful description to a specific test run or pipeline execution attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the facet list

You can create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="quality_gates/explorer/facets.png" alt="Add a facet from the facet side panel" style="width:30%;">}}

Define the underlying field (key) name for this facet:

- Use tag key name for infrastructure tags.
- Use the attribute path for quality gate attributes, with `@` prefix.

Autocomplete based on the content in quality gates of the current views helps you to define the proper field name, but you can use virtually any value here.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/ci
[2]: /dashboards/
[3]: /notebooks/
[4]: /quality_gates/explorer
[5]: /quality_gates/search
[6]: /quality_gates/explorer/search_syntax/
