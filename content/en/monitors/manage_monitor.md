---
title: Manage Monitors
kind: documentation
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

Use the [Manage Monitors][1] page to search your monitors and delete, mute, resolve, or edit service tags in bulk. You can also clone or edit any individual monitor from the search results.

{{< img src="monitors/manage_monitor/page.png" alt="manage monitor page" responsive="true" >}}

## Search monitors

To search your monitors, construct a query using the attribute checkboxes on the left and/or the search bar at the top. When you select attributes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write a new one), the attribute checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query. **Note**: There is no *search* button to click.

### Search bar

Use simple text to search across all monitor titles and notification messages. For example, a search of `postgresql` returns all monitors with `postgresql` anywhere in the title or notification message.

To limit the search, specify the field name the field name:

| Item    | Description                                            | Example        |
|---------|--------------------------------------------------------|----------------|
| Title   | Search the text in the monitor's title.                | `title:text`   |
| Message | Search the text in the monitor's notification message. | `message:text` |

Additionally, you can search for a monitor using the ID, for example: `1234567`.

#### Query

Enhance your search query with boolean operators (`AND`, `OR`, and `NOT`) and parentheses. The search syntax is very similar to [Elasticsearch][2] with the following exceptions:

* Regular expressions are not supported.
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is supported.
* Proximity searches are not supported, but the [fuzzy][3] operator is supported.
* Ranges are not supported.
* Boosting is not supported.

The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search a monitor field that includes a reserved character, wrap the field string in quotes. For example, `status:Alert AND "chef-client"` is a valid query string.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields. For example, `metric:system.cpu.idle` is valid.
* Wildcard search is not supported inside quoted strings. For example, `"chef-client*"` is valid syntactically, but does not return a monitor titled `"chef-client failing"` because the `*` is treated literally.

### Attributes

Advanced search lets you query monitors by any combination of monitor attributes:

| Attribute    | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| Status       | Filter by monitor status: `Triggered` (`Alert`, `Warn`, `No Data`) or `OK`. |
| Muted        | true or false                                                               |
| Type         | The Datadog [monitor type][4]                                               |
| Creator      | The creator of the monitor                                                  |
| Service      | Service tags used by you in the form `service:<VALUE>`.                     |
| Tag          | The [tags](#monitor-tags) assigned to the monitor                           |
| Env          | Env tags used by you in the form `env:<VALUE>`.                             |
| Scope        | Search tags listed in the `from` field of your monitor query.               |
| Metric/Check | The metric or service check monitored                                       |
| Notification | The person or service receiving the notification                            |

Check any number of boxes to find your monitors. The following rules apply:

* The `AND` operator is applied when checking attributes from different fields, for example: `status:Alert type:Metric` (the lack of an operator between the two search terms implies `AND`).
* Most of the time, the `OR` operator is applied when checking attributes within the same field, for example: `status:(Alert OR Warn)`. Some exceptions apply. For example, checking multiple scopes or service tags uses the `AND` operator.
* Some attributes do not allow selecting multiple values. For example, when you select a metric or service check, the other options disappear from the list until you remove the selection.
* The `Triggered` checkbox under the *Status* attribute resolves to `status:(Alert OR Warn OR "No Data")`. Triggered is not a valid monitor status.
* The name for the *Metric/Check* attribute is always `metric` in the query. For example, selecting the check `http.can_connect` resolves to `metric:http.can_connect`.

For attributes with a large number of values across your monitors, use the attribute search bar to find the correct value.

## Manage chosen Monitors

When you have found the monitors you were looking for, select one or more that you wish to update using the checkboxes next to each result. You can select all results with the top checkbox next to the *STATUS* column heading. Modify the monitors in bulk using the buttons at the top right of the search results: Mute, Resolve, Delete, and Edit Tags.

To edit an individual monitor, hover over it and use the buttons to the far right in its row: Edit, Clone, Mute, Delete. To see more detail on a monitor, click its Name to visit its status page.

### Manage Triggered Monitors with group-level granularity

You can mute or [resolve][5] triggered monitors in bulk using the [Triggered Monitors page][6]. It's similar to the Manage Monitors page-you can find monitors by their attributes using the same easy tickboxes or query syntax-but there are a few differences. Aside from only showing monitors with a triggered status (Alert, Warn, or No Data), the main difference is that the Triggered Monitors page shows a row for _each group_ (i.e. each reporting source) of each monitor.

Say you have a monitor called "high latency" that is grouped by host. If there are 20 hosts reporting and 14 have a triggered status, the Triggered Monitor page shows 14 rows if you search for the monitor by title in the query search bar (e.g. `high latency` or `title:
"high latency"`). This lets you easily mute or [resolve][5] a monitor for some reporting sources, but not all (though of course you can mute or resolve all, too).

In writing your search queries, you can use all the same fields available on the Manage Monitors page, even though most of them aren't controllable via tickboxes on the Triggered Monitors page. A few notes on field differences on the Triggered Monitors page:

* It uses the `group_status` field instead of `status`.
* It adds the `triggered` field, which lets you filter monitors by how long they've been triggered.
* It also adds the `group` field, which helps you narrow down search results for monitors grouped by more than one tag. Say you have a monitor grouped by `host` and `env`. You search for this monitor by title and get four rows, where the groups are `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Use the `group` field to only show, for example, prod hosts (`group:"env:prod"`) or web02 hosts (`group:"host:web02"`).

### Monitor Tags

You can choose to add tags directly to your monitors that you can use for filtering on the [triggered][6] or [manage monitor][1] pages, or for [scheduling downtimes][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /monitors/monitor_types
[5]: /monitors/monitor_status/#resolve
[6]: https://app.datadoghq.com/monitors/triggered
[7]: /monitors/downtimes
