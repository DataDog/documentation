---
title: Search Monitors
description: "Filter the monitor list by using the faceted search"
---

To search your monitors, construct a query using the facet panel on the left and/or the search bar at the top. When you select attributes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write a new one), the attribute checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query. **Note**: There is no *search* button to click.

## Search bar

Use simple text to search across all monitor titles and notification messages. For example, a search of `*postgresql*` returns all monitors with `postgresql` anywhere in the title or
notification message.

To limit the search, specify the field name:

| Item    | Description                                            | Example        |
|---------|--------------------------------------------------------|----------------|
| Title   | Search the text in the monitor's title.                | `title:text`   |
| Message | Search the text in the monitor's notification message. | `message:text` |

Additionally, you can search for a monitor using the ID, for example: `1234567`. The monitor's ID is available on the [monitor status page][1].

<div class="alert alert-info">For information on how to filter monitor groups, see the <a href="/monitors/manage/status/">Monitor Status page</a>.</div>

### Query

Enhance your search query with boolean operators (`AND`, `OR`, `NOT`) and parentheses. The search syntax is similar to [Elasticsearch][2] with the following exceptions:

* Regular expressions are not supported.
* Both single-character wildcard (`?`) and the general wildcard (`*`) are supported.
* Proximity searches are not supported, but the [fuzzy][3] operator is supported.
* Ranges are not supported.
* Boosting is not supported.

The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search a monitor field that includes a reserved character, wrap the field string in quotes. For example, `status:Alert AND "chef-client"` is a valid query string.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields. For example, `metric:system.cpu.idle` is valid.
* Wildcard search is not supported inside quoted strings. For example, `"chef-client*"` does not return a monitor titled `"chef-client failing"` because the `*` is treated literally.

## Attributes

Advanced search lets you filter monitors by any combination of monitor attributes:

| Attribute    | Description                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Status       | The monitor status: `Triggered` (`Alert`, `Warn`, `No Data`) or `OK`                            |
| Muted        | The muted state of the monitor: `true` or `false`                                               |
| Type         | The Datadog [monitor type][4]                                                                   |
| Creator      | The creator of the monitor                                                                      |
| Service      | Service tags used by you in the form `service:<VALUE>`.                                         |
| Tag          | The [tags](#monitor-tags) assigned to the monitor                                               |
| Env          | Environment tags used by you in the form `env:<VALUE>`.                                         |
| Scope        | Search tags listed in the `from` field of your monitor query.                                   |
| Metric/Check | The metric or service check being monitored                                                     |
| Notification | The person or service receiving a notification                                                  |
| Muted left   | The time remaining before downtime stops muting the notification for this monitor. Searching for `muted_left:30m` returns all monitors that are still muted for at most 30 minutes. Supported units are seconds (`s`), minutes (`m`), hours (`h`), and weeks (`w`).    |
| Muted elapsed | The time elapsed since a downtime started muting the notification for this monitor. Searching for `muted_elapsed:30d` returns all monitors that have been muted for at least 30 days. Supported units are seconds (`s`), minutes (`m`), hours (`h`), and weeks (`w`). |

Check any number of boxes to find your monitors. The following rules apply:

* The `AND` operator is applied when checking attributes from different fields, for example: `status:Alert type:Metric` (the lack of an operator between the two search terms implies `AND`).
* Most of the time, the `OR` operator is applied when checking attributes within the same field, for example: `status:(Alert OR Warn)`. Some exceptions apply, for example checking multiple scopes or service tags uses the `AND` operator.
* Some attributes do not allow selecting multiple values. For example, when you select a metric or service check, the other options disappear from the list until you remove the selection.
* The `Triggered` checkbox under the *Status* attribute resolves to `status:(Alert OR Warn OR "No Data")`. Triggered is not a valid monitor status.
* The name for the *Metric/Check* attribute is always `metric` in the query. For example, selecting the check `http.can_connect` resolves to `metric:http.can_connect`.

**Note**: For attributes with a large number of values across your monitors, use the attribute search bar to find the correct value.

## Saved view

Leverage saved views to quickly navigate to pre-set views in order to find monitors relevant to a given context like the monitors for your team or muted for more than 60 days:

{{< img src="monitors/manage_monitor/overview.jpg" alt="Saved Views selection" style="width:90%;" >}}

Saved views are visible by everyone in your organization.
Technically, a saved view keeps track of:

- The search query

### Default view

{{< img src="monitors/manage_monitor/default.jpg" alt="Default view" style="width:50%;" >}}

Your existing Manage Monitor view is your default saved view. This configuration is only accessible and viewable to you and updating this configuration does not have any impact on your organization.

You can **temporarily** override your default saved view by completing any action in the UI or when opening links to the Manage Monitor page that embed a different configuration.

From the default view entry in the Views panel:

* **Reload** your default view by clicking on the entry.
* **Update** your default view with the current parameters.
* **Reset** your default view to Datadog's defaults for a fresh restart.

[1]: /monitors/manage/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /monitors/
