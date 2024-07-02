---
title: Export Test Runs 
further_reading:
- link: "/tests/search/"
  tag: "Documentation"
  text: "Search for your tests"
- link: "/tests/explorer/saved_views/"
  tag: "Documentation"
  text: "Learn about Saved Views"
- link: "/monitors/types/ci/"
  tag: "Documentation"
  text: "Learn about CI Test Monitors"
---

## Overview

You can use your Test Visibility search query and visualization graphs in dashboards, monitors, and notebooks, or programmatically search for events using the [Search Tests Events endpoint][1]. 

## Export the search query or visualization

You can copy, export, or download your aggregated search query and visualization graphs in the [Test Visibility Explorer][2].

{{< img src="continuous_integration/explorer/test_export.png" alt="Export your test runs view in the Test Visibility Explorer" style="width:100%;">}}

Click the **Export** button on the right hand corner and select an option from the dropdown menu:

- Share your [saved view][6] of the [Test Visibility Explorer][3].
- Export your search results to a [CI Test monitor][4] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][5] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual CI Visibility test events and specific aggregations.

Options available for some visualization types are not supported in others. For example, you cannot download a distribution graph into a CSV file.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-tests/#search-tests-events
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /tests/explorer/
[4]: /monitors/types/ci/
[5]: /notebooks/
[6]: /tests/explorer/saved_views/