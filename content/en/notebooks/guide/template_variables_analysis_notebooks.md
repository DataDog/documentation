---
title: Template Variable Support in Analysis Notebooks
description: "Learn about template variable support and limitations in Notebook analysis cells including data sources, transformations, and SQL queries."
further_reading:
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Template Variables"
- link: "/notebooks/advanced_analysis/"
  tag: "Documentation"
  text: "Notebooks Analysis features"
---

## Overview

[Template variables][1] let you dynamically filter and update results across multiple cells in a notebook. Many notebook cell types fully support template variables. This guide focuses specifically on [**analysis cells**][2], where template variable support can vary.

Most analysis cells support template variables, but some have limited or no support. The sections below summarize where template variables work, how they behave, and where to expect limitations.

## Quick reference

| Cell type | template variable support | Notes |
| ----- | ----- | ----- |
| [Data source](#data-source) | {{< X >}} | Cell name not supported. |
| [Transformation](#transformation) | {{< X >}} | Cell name not supported. |
| [Visualization](#visualization) | {{< X >}} | All visualization types supported (scatterplot requires extra fields). |
| [SQL Analysis](#sql-analysis) | Not supported | Not supported. |
| [Published dataset (reused elsewhere)](#published-datasets) | Limited support | Template variables are resolved at publish time, you must republish to update downstream. |

## Support widgets

For all supported widgets, results update dynamically when template variables change, are renamed, or deleted.

### Data source
* Supported in query inputs.
* All data sources are supported.
* Template variables cannot be used in the name of the data source.

### Transformation
* Supported only in **Filter** operations.
* Multiple filter operations can reference different template variables.
* Template variables cannot be used in the name of a transformation.
* Filter operations are used to calculate the usages of template variables in the template variable edit modal. Each filter operation counts towards the total number of potential usages.

### Visualization
* Supported in cell titles, filters, and analysis queries.
* All visualization types are supported.
* Filters remain consistent when switching visualization types, except [scatter plots][3] (which require additional setup).

**Note:** Visualizations with published datasets behave the same as standard visualizations, and their results update when template variables change in the source notebook.

## Limited support widgets

### SQL analysis
* **Not supported**.
* Template variables cannot be used in SQL queries.
* Not included in template variable usage counts and unaffected by **Add all / Remove all** operations.

### Published datasets

When you [export a query to a dashboard][4], Datadog creates a published dataset. A published dataset can be referenced as a data source in other dashboards or notebooks.

If the source query uses template variables, their values are interpolated at the moment of publishing. This means:
* Template variables are resolved to their current values when the dataset is published.
* If those values later change in the source notebook, you must republish the dataset to apply the update.
* Published datasets can be used in contexts where template variables are not available (for example, monitors or dashboards without matching template variable names).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/template_variables/
[2]: /notebooks/advanced_analysis/
[3]: /dashboards/widgets/scatter_plot/
[4]: /notebooks/advanced_analysis/#export-your-query-to-a-dashboard
