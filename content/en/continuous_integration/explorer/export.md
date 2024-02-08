---
title: Export Test Runs or Pipeline Executions 
kind: documentation
further_reading:
- link: "/continuous_integration/explorer/search/"
  tag: "Documentation"
  text: "Search for your pipelines"
- link: "/dashboards"
  tag: "Documentation"
  text: "Learn about Dashboards"
- link: "/notebooks"
  tag: "Documentation"
  text: "Learn about Notebooks"
- link: "/monitors"
  tag: "Documentation"
  text: "Learn about Monitors"
---

## Overview

You can use your CI Visibility search query and visualization graphs in dashboards, monitors, and notebooks, or programmatically search for events using the [Search CI Visibility Tests][1] or [Search CI Visibility Pipelines endpoint][2]. 

## Export the search query or visualization

{{< tabs >}}
{{% tab "Test Runs" %}}

You can copy, export, or download your aggregated search query and visualization graphs in the [CI Visibility Explorer][101].

{{< img src="continuous_integration/explorer/test_export.png" alt="Export your test runs view in the CI Visibility Explorer" style="width:100%;">}}

[101]: https://app.datadoghq.com/ci/test-runs

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

You can copy, export, or download your aggregated search query and visualization graphs in the [CI Visibility Explorer][101].

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="Export your pipelines view in the CI Visibility Explorer" style="width:100%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions

{{% /tab %}}
{{< /tabs >}}

Click the **Export** button on the right hand corner and select an option from the dropdown menu:

- Share your [view][7] of the [CI Visibility Explorer][3].
- Export your search results to a [monitor][5] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][6] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual CI Visibility test or pipeline events and specific aggregations.

Options available for some visualization types are not supported in others. For example, you cannot download a distribution graph into a CSV file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility/#search-tests-events
[2]: /api/latest/ci-visibility/#search-pipelines-events
[3]: /continuous_integration/explorer/
[4]: /api/latest/
[5]: /monitors/types/ci/
[6]: /notebooks/
[7]: /continuous_integration/explorer/saved_views/