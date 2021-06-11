---
title: Manage Monitors
kind: documentation
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

Use the [Manage Monitors][1] page to search, delete, mute, or resolve your monitors and edit monitor tags in bulk. You can also clone or edit individual monitors from the search results.

{{< img src="monitors/manage_monitor/monitor_page.jpg" alt="manage monitor page"  >}}

## Search

To search your monitors, construct a query using the attribute checkboxes on the left and/or the search bar at the top. When you select attributes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write a new one), the attribute checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query. **Note**: There is no *search* button to click.

### Search bar

Use simple text to search across all monitor titles and notification messages. For example, a search of `postgresql` returns all monitors with `postgresql` anywhere in the title or notification message.

To limit the search, specify the field name:

| Item    | Description                                            | Example        |
|---------|--------------------------------------------------------|----------------|
| Title   | Search the text in the monitor's title.                | `title:text`   |
| Message | Search the text in the monitor's notification message. | `message:text` |

Additionally, you can search for a monitor using the ID, for example: `1234567`. The monitor's ID is available on the [monitor status page][2].

#### Query

Enhance your search query with boolean operators (`AND`, `OR`, `NOT`) and parentheses. The search syntax is very similar to [Elasticsearch][3] with the following exceptions:

* Regular expressions are not supported.
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is supported.
* Proximity searches are not supported, but the [fuzzy][4] operator is supported.
* Ranges are not supported.
* Boosting is not supported.

The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search a monitor field that includes a reserved character, wrap the field string in quotes. For example, `status:Alert AND "chef-client"` is a valid query string.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields. For example, `metric:system.cpu.idle` is valid.
* Wildcard search is not supported inside quoted strings. For example, `"chef-client*"` does not return a monitor titled `"chef-client failing"` because the `*` is treated literally.

### Attributes

Advanced search lets you filter monitors by any combination of monitor attributes:

| Attribute    | Description                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Status       | The monitor status: `Triggered` (`Alert`, `Warn`, `No Data`) or `OK`                            |
| Muted        | The muted state of the monitor: `true` or `false`                                               |
| Type         | The Datadog [monitor type][5]                                                                   |
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

## Manage

After searching, select one or more monitors to update using the checkboxes next to each result. Select all results with the top checkbox next to the *STATUS* column heading. Modify the monitors in bulk using the buttons at the right above the search results:

| Option    | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| Mute      | Mute the selected monitors for `1h`, `4h`, `12h`, `1d`, `1w`, or `Forever` |
| Unmute    | If the selected monitors are muted, unmute them.                           |
| Resolve   | [Resolve][6] the alert for the selected monitors.                          |
| Delete    | Permanently delete the selected monitors.                                  |
| Edit Tags | Edit the monitor tags for the selected monitors.                           |

To edit an individual monitor, hover over it and use the buttons to the far right: Edit, Clone, Mute, Delete. To see more details on a monitor, click its name to visit the status page.

**Note**: With the [Datadog Mobile App][7], you can view, mute, and unmute monitors on your mobile device.

### Triggered monitors

You can mute or [resolve][6] triggered monitors in bulk using the [Triggered Monitors][8] page. This page only shows monitors with a triggered status (Alert, Warn, or No Data).

#### Grouped results

The triggered monitors page shows a row for each group (reporting source) of each monitor. For example, a monitor grouped by host with 14 hosts in a triggered status shows 14 rows on the triggered monitors page. This lets you mute or [resolve][6] a monitor for specific reporting sources.

When writing a search query, the same attributes from the manage monitors page are available, even if they are not displayed as check boxes on the triggered monitors page.

Attribute differences for the triggered monitors page:

* `group_status` is the attribute name instead of `status`.
* The `triggered` attribute lets you filter monitors by how long they have been triggered.
* The `group` attribute helps you narrow down search results for monitors grouped by more than one tag. For example, a monitor is grouped by `host` and `env`. After searching, you see four rows with the groups `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Use the `group` attribute to only show prod hosts (`group:"env:prod"`) or web02 hosts (`group:"host:web02"`).

### Monitor tags

Monitor tags are independent of tags sent by the Agent or integrations. Add up to 32 tags directly to your monitors for filtering on the [manage monitors][1], [triggered monitors][8], or [manage downtime][9] pages. Learn more about monitor tags in the [tagging documentation][10].

**Note**: Those tags are added to the alert event generated by the monitor, up to 25 tags in total on the alert event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/monitor_status/#properties
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[5]: /monitors/monitor_types/
[6]: /monitors/monitor_status/#resolve
[7]: /mobile/#monitors
[8]: https://app.datadoghq.com/monitors/triggered
[9]: https://app.datadoghq.com/monitors#downtime
[10]: /getting_started/tagging/assigning_tags/?tab=monitors#ui
