---
title: List Service Level Objectives
kind: documentation
further_reading:
- link: "service_level_objectives/slo_types"
  tag: "Documentation"
  text: "Learn how to create a SLO"
---

The [List Service Level Objectives][1] page lets you run an advanced search of all SLOs so you can view, delete or edit service tags for selected SLOs in bulk. You can also clone or fully edit any individual SLO in the search results.

{{< img src="service_level_objectives/edit_slo/edit_slo_page.png" alt="edit slo page" responsive="true" >}}

## Find the Service Level Objectives

Advanced search lets you query SLOs by any combination of SLO attributes:

* `name` and `description` - text search
* `time window` - *, 7d, 30d, 90d
* `type` - metric, monitor
* `creator`
* `id`
* `service` - tags
* `team` - tags
* `env` - tags

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query; there's no 'Search' button to click.

## Manage chosen Service Level Objectives

When you have found the SLOs you were looking for, select one or more that you wish to update using the checkboxes next to each result. You can select all results by ticking the topmost checkbox next to the STATUS column heading. Modify the SLOs in bulk using the buttons at the top right of the search results: Delete is currently the only supported operation.

To edit an individual SLO, hover over it and use the buttons to the far right in its row: Edit, Clone, Delete. To see more detail on a SLO, click its table row to visit its status page.

{{< img src="service_level_objectives/edit_slo/edit-slo-hover-clone.png" alt="edit-slo-hover-clone" responsive="true" style="width:80%;" >}}

### Service Level Objective Tags

{{< img src="service_level_objectives/edit_slo/slo-tags.png" alt="Monitor tags" responsive="true" style="width:30%;" >}}

You can choose to add tags directly to your SLos that you can use for filtering on the [list SLOs][1] pages.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
