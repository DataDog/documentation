---
title: Pipeline Execution Facets
kind: documentation
description: Learn about facets for filtering and grouping your pipeline executions.
further_reading:
- link: 'continuous_delivery/explorer/'
  tag: 'Documentation'
  text: 'Learn about the CD Visibility Explorer'
- link: 'continuous_delivery/search/'
  tag: 'Documentation'
  text: 'Learn how to search your CD pipelines'
---

## Overview

Facets are user-defined tags and attributes from your pipelines. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your pipelines in your [CD Pipelines monitors][1], and in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching test runs or pipeline executions][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming test runs or pipeline executions applies. 

The [CD Visibility Explorer][4] includes out-of-the-box facets such as `Test Status`, `Test Service`, `CD Status`, and `CD Provider`. You can use facets in the CD Visibility Explorer to:

- [Search for and filter test runs or pipeline executions][5].
- Perform test or pipeline analytics.
- Start troubleshooting once your test runs or pipelines complete.

Navigate to [**CD** > **Executions**][101] to access the list of facets left of the pipeline executions list.

{{< img src="/continuous_integration/facets-pipelines.png" text="Facets list on the Pipeline Executions page of the CD Visibility Explorer" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/ci 
[2]: /dashboards/ 
[3]: /notebooks/ 
[4]: /continuous_delivery/explorer
[5]: /continuous_delivery/search
[6]: /continuous_delivery/explorer/search_syntax