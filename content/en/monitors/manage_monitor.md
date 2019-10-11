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

The [Manage Monitors][1] page lets you run an advanced search of all monitors so you can delete, mute, [resolve][2], or edit service tags for selected monitors in bulk. You can also clone or fully edit any individual monitor in the search results.

{{< img src="monitors/manage_monitor/manage_monitor_page.png" alt="manage monitor page" responsive="true" >}}

## Find the Monitors

Advanced search lets you query monitors by any combination of monitor attributes:

* `title` and `message` - text search
* `status` - Alert, Warn, No Data, Ok
* `scope` - *, role:master-db
* `type` - metric, integration, apm, etc
* `muted`
* `creator`
* `id`
* `service` - tags
* `team` - tags
* `env` - tags
* `notification` - The monitor's notification target: you@example.com, slack-ops-oncall
* `metric` - The metric _or_ service check monitored: system.cpu.user, http.can_connect

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query; there's no 'Search' button to click.

### Check the boxes

When you don't need to search monitor titles and bodies for specific text, your search is a quick click or two away. Check as many boxes as you need to find your desired monitors, keeping the following in mind:

* Checking attributes from different fields do AND the values, e.g. `status:Alert type:Metric` (the lack of an operator between the two search terms implies AND)
* Checking attributes within the same field do often OR the values, e.g. `status:(Alert OR Warn)`, but there are some exceptions. For example, checking multiple scopes or service tags ANDs them.
* Some fields do not allow you to select multiple values, e.g. when you tick a metric or service check, the other metrics/checks disappear from the list until you untick your selection.
* The Triggered checkbox under the Status field means `status:(Alert OR Warn OR "No Data")`, not `status:Triggered`. Triggered is not a valid monitor status.
* The Muted checkbox appears under the Status field, but Muted is actually its own field; checking it adds `muted:true` to your query, not `status:muted`.
* The Metric/Check field is always called `metric` in the query, e.g. selecting the check `http.can_connect` adds `metric:http.can_connect` to your query.

For fields that have an arbitrary (i.e. large) number of values across all monitors-Service tag, Scope, Metric/Check, Notification-use the field-specific search bars to find the value you're looking for.

When you need to run a more complex search than the checkboxes allow, use the search bar to edit your query or write a new one.

### Write a query

The most common reason to write a query is to search for specific text across all monitor titles and message bodies. A simple search of `postgresql` returns all monitors with `postgresql` anywhere in the title or message body. To search on title or message body, but not both, qualify the search term with the field name, e.g. `title:postgresql`.

Otherwise, you can use boolean operators (AND, OR, and NOT) and parentheses to write complex queries using any monitor fields. The search syntax is very similar to that of [Elasticsearch][3], so it's easiest to describe how it is *not* like Elasticsearch syntax:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is
* Proximity searches are not supported, but the [fuzzy][4] operator is
* Ranges are not supported
* Boosting is not supported

Finally, The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search monitor fields that include any of them, wrap the field string in quotes: `status:Alert AND "chef-client"` is a valid query string; `status:Alert AND chef-client` is not.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields: `metric:system.cpu.idle` is valid.
* You may NOT use wildcard search inside quoted strings: `"chef-client*"`, while valid syntactically, won't return a monitor titled `"chef-client failing"` because the `*` is treated literally.

## Exporting and importing Monitors

### Exporting

Export your monitor’s configuration in JSON format in order to use it to manage and deploy monitors programmatically. You can export a monitor’s JSON configuration in one of two ways using the Datadog UI:

1. Navigate to an existing monitor’s [Monitor Status page][5] and select **Export** from its [Settings menu][6] in the top right corner of the page.
2. Click the **Export Monitor** button at the bottom of the screen when [creating a new monitor][7].

### Importing

Import a monitor JSON configuration from one Datadog account to another from within the Datadog UI by following these instructions:

1. Navigate to your desired monitor’s [Monitor Status page][5].
2. Select the **Export** option from the [Settings][6] menu in the top right corner of the page..
3. Click the **Copy** button to copy the monitor’s JSON to your clipboard.
4. Switch to your desired destination Datadog account.
5. Navigate to the [New Monitor page][8] and select **Import**.
5. Paste (and optionally edit if necessary) the copied JSON into the text box.
6. Click the **Save** button to complete the monitor creation.

## Manage chosen Monitors

When you have found the monitors you were looking for, select one or more that you wish to update using the checkboxes next to each result. You can select all results by ticking the topmost checkbox next to the STATUS column heading. Modify the monitors in bulk using the buttons at the top right of the search results: Mute, Resolve, Delete, and Edit Service Tags.

{{< img src="monitors/manage_monitor/manage-monitors-mute.png" alt="manage-monitors-mute" responsive="true" style="width:80%;" >}}

To edit an individual monitor, hover over it and use the buttons to the far right in its row: Edit, Clone, Mute, Delete. To see more detail on a monitor, click its Name to visit its status page.

{{< img src="monitors/manage_monitor/manage-monitors-hover-clone.png" alt="manage-monitors-hover-clone" responsive="true" style="width:80%;" >}}

### Manage Triggered Monitors with group-level granularity

You can mute or [resolve][2] triggered monitors in bulk using the [Triggered Monitors page][9]. It's similar to the Manage Monitors page-you can find monitors by their attributes using the same easy tickboxes or query syntax-but there are a few differences. Aside from only showing monitors with a triggered status (Alert, Warn, or No Data), the main difference is that the Triggered Monitors page shows a row for _each group_ (i.e. each reporting source) of each monitor.

Say you have a monitor called "high latency" that is grouped by host. If there are 20 hosts reporting and 14 have a triggered status, the Triggered Monitor page shows 14 rows if you search for the monitor by title in the query search bar (e.g. `high latency` or `title:
"high latency"`). This lets you easily mute or [resolve][2] a monitor for some reporting sources, but not all (though of course you can mute or resolve all, too).

In writing your search queries, you can use all the same fields available on the Manage Monitors page, even though most of them aren't controllable via tickboxes on the Triggered Monitors page. A few notes on field differences on the Triggered Monitors page:

* It uses the `group_status` field instead of `status`.
* It adds the `triggered` field, which lets you filter monitors by how long they've been triggered.
* It also adds the `group` field, which helps you narrow down search results for monitors grouped by more than one tag. Say you have a monitor grouped by `host` and `env`. You search for this monitor by title and get four rows, where the groups are `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Use the `group` field to only show, for example, prod hosts (`group:"env:prod"`) or web02 hosts (`group:"host:web02"`).

### Monitor Tags

{{< img src="monitors/manage_monitor/monitor-tags.png" alt="Monitor tags" responsive="true" style="width:30%;" >}}

You can choose to add tags directly to your monitors that you can use for filtering on the [triggered][9] or [manage monitor][1] pages, or for [scheduling downtimes][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/monitor_status/#resolve
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[5]: /monitors/monitor_status
[6]: /monitors/monitor_status/#settings
[7]: /monitors/monitor_types
[8]: https://app.datadoghq.com/monitors#/create
[9]: https://app.datadoghq.com/monitors/triggered
[10]: /monitors/downtimes
