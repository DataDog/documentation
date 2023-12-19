---
title: Test Run or Pipeline Execution Facets
kind: documentation
description: 'Trace Facets and Facet Panel'
further_reading:
- link: 'continuous_integration/explorer/'
  tag: 'Documentation'
  text: 'Learn about the CI Visibility Explorer'
- link: 'continuous_integration/search/'
  tag: 'Documentation'
  text: 'Learn how to search your tests and pipelines'
---

## Overview

Facets are user-defined tags and attributes from your tests or pipelines. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your tests or pipelines in your [CI Tests or Pipelines monitors][1], and in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching test runs or pipeline executions][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming test runs or pipeline executions applies.

The [CI Visibility Explorer][4] includes out-of-the-box facets such as `Test Status`, `Test Service`, `CI Status`, and `CI Provider`. You can use facets in the CI Visibility Explorer to:

- [Search for and filter test runs or pipeline executions][5].
- Perform test or pipeline analytics.
- Start troubleshooting once your test runs or pipelines complete.

{{< tabs >}}
{{% tab "Test Runs" %}}

Navigate to [**CI** > **Test Runs**][101] to access the list of facets left of the test runs list.

{{< img src="/continuous_integration/facets-tests.png" text="Facets list on the Test Runs page of the CI Visibility Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

Navigate to [**CI** > **Pipeline Executions**][101] to access the list of facets left of the pipeline executions list.

{{< img src="/continuous_integration/facets-pipelines.png" text="Facets list on the Pipeline Executions page of the CI Visibility Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions

{{% /tab %}}
{{< /tabs >}}

### Qualitative facets

Use qualitative facets when you need to:

- **Get relative insights** for values.
- **Count unique values**.
- Frequently **filter** your test runs or pipeline executions against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**Note:** Although facets are not required for filtering on tags, defining facets for tags that you often use during investigations can help reduce your time to resolution.

### Quantitative measures

Use quantitative measures when you need to:

- **Aggregate** values from multiple test runs or pipeline executions.
- **Range filter** your test runs or pipeline executions.
- **Sort** your test runs or pipeline executions against that value.

#### Types

Measures have either a long integer or double value for equivalent capabilities.

#### Units

Measures support units (**time** in seconds or **size** in bytes) for handling of orders of magnitude at query time and display time. The unit is a property of the measure itself, not of the field.

For example, consider a `duration` measure in nanoseconds. Suppose test runs from `service:A` have `duration:10000000`, meaning `10 milliseconds`. Supposed test runs from `service:B` have `duration:5000000`, meaning `5 milliseconds`. Use `duration:>2ms` to consistently query test run tags from both services at once. For more information about search queries, see [Search Syntax][6].

## Facet panel

The search bar provides the most comprehensive set of interactions to filter and group your data. However, for many cases, the facet panel is a straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

The search bar and URL automatically reflect your selections from the facet panel.

- **Facets (qualitative)** come with a top list of unique values, and a count of test runs or pipeline executions matching each of them.
- **Measures (quantitative)** come with a slider indicating minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.


### Grouping facets

Facets are grouped into meaningful themes in the facet list. Assigning or reassigning a group for a facet affects only the facet list, and has no impact on search or analytics.

### Filtering facets

Use the search facets box on the facet panel to scope the whole facet list and navigate to the facet you need to interact with. Search facets uses the facet display name and field name to scope results.

## Creating facets

Creating a facet on a test run or pipeline execution attribute or tag is not a mandatory step to search for test runs or pipeline executions. Facets are useful if you wish to add a meaningful description to a specific test run or pipeline execution attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the Runs or Executions side panels

The easiest way to create a facet is to add it from the Runs or Executions side panel so that most of the facet details are pre-filled.

{{< img src="continuous_integration/create_facet.png" alt="Create a facet from the CI Pipeline Execution side panel" style="width:100%;">}}

1. Navigate to a test run or pipeline execution of interest in the [CI Visibility Explorer][4] that contains the field to create a facet on.
2. Open the Runs or Executions side panel by selecting the test run or pipeline execution from the list.
3. Click on the desired field (either in the **Other tags** section for a test run or the **Info** tab for a pipeline execution's span) and create a facet from there:

   - If the field has a numerical value, you can create either a facet or a measure.
   - If the field has a string value, only facet creation is available.

### Creating facets from the facet list

If finding a test run or pipeline execution that has the desired field is not an option, create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="continuous_integration/add_facet.png" alt="Add a facet from the facet side panel" style="width:30%;">}}

Define the underlying field (key) name for this facet:

- Use tag key name for infrastructure tags.
- Use the attribute path for test run or pipeline execution attributes, with `@` prefix.

Autocomplete based on the content in test runs or pipeline executions of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching test runs or pipeline executions received by Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/ci
[2]: /dashboards/
[3]: /notebooks/
[4]: /continuous_integration/explorer
[5]: /continuous_integration/search
[6]: /continuous_integration/explorer/search_syntax/
