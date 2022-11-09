---
title: Monitors
---
[Monitors](https://docs.datadoghq.com/monitors) allow you to watch a metric or check that you care about and
notifies your team when a defined threshold has exceeded.

For more information, see [Creating Monitors](https://docs.datadoghq.com/monitors/create/types/).

## Get all monitor details

Get details about the specified monitor from your organization.

## Create a monitor

Create a monitor using the specified options.

#### Monitor Types

The type of monitor chosen from:

- anomaly: `query alert`
- APM: `query alert` or `trace-analytics alert`
- composite: `composite`
- custom: `service check`
- event: `event alert`
- forecast: `query alert`
- host: `service check`
- integration: `query alert` or `service check`
- live process: `process alert`
- logs: `log alert`
- metric: `query alert`
- network: `service check`
- outlier: `query alert`
- process: `service check`
- rum: `rum alert`
- SLO: `slo alert`
- watchdog: `event alert`
- event-v2: `event-v2 alert`
- audit: `audit alert`
- error-tracking: `error-tracking alert`

#### Query Types

**Metric Alert Query**

Example: `time_aggr(time_window):space_aggr:metric{tags} [by {key}] operator #`

- `time_aggr`: avg, sum, max, min, change, or pct_change
- `time_window`: `last_#m` (with `#` between 1 and 10080 depending on the monitor type) or `last_#h`(with `#` between 1 and 168 depending on the monitor type) or `last_1d`, or `last_1w`
- `space_aggr`: avg, sum, min, or max
- `tags`: one or more tags (comma-separated), or *
- `key`: a 'key' in key:value tag syntax; defines a separate alert for each tag in the group (multi-alert)
- `operator`: <, <=, >, >=, ==, or !=
- `#`: an integer or decimal number used to set the threshold

If you are using the `_change_` or `_pct_change_` time aggregator, instead use `change_aggr(time_aggr(time_window),
timeshift):space_aggr:metric{tags} [by {key}] operator #` with:

- `change_aggr` change, pct_change
- `time_aggr` avg, sum, max, min [Learn more](https://docs.datadoghq.com/monitors/create/types/#define-the-conditions)
- `time_window` last\_#m (between 1 and 2880 depending on the monitor type), last\_#h (between 1 and 48 depending on the monitor type), or last_#d (1 or 2)
- `timeshift` #m_ago (5, 10, 15, or 30), #h_ago (1, 2, or 4), or 1d_ago

Use this to create an outlier monitor using the following query:
`avg(last_30m):outliers(avg:system.cpu.user{role:es-events-data} by {host}, 'dbscan', 7) > 0`

**Service Check Query**

Example: `"check".over(tags).last(count).by(group).count_by_status()`

- `check` name of the check, for example `datadog.agent.up`
- `tags` one or more quoted tags (comma-separated), or "*". for example: `.over("env:prod", "role:db")`; `over` cannot be blank.
- `count` must be at greater than or equal to your max threshold (defined in the `options`). It is limited to 100.
For example, if you've specified to notify on 1 critical, 3 ok, and 2 warn statuses, `count` should be at least 3.
- `group` must be specified for check monitors. Per-check grouping is already explicitly known for some service checks.
For example, Postgres integration monitors are tagged by `db`, `host`, and `port`, and Network monitors by `host`, `instance`, and `url`. See [Service Checks](https://docs.datadoghq.com/api/latest/service-checks/) documentation for more information.

**Event Alert Query**

Example: `events('sources:nagios status:error,warning priority:normal tags: "string query"').rollup("count").last("1h")"`

- `event`, the event query string:
- `string_query` free text query to match against event title and text.
- `sources` event sources (comma-separated).
- `status` event statuses (comma-separated). Valid options: error, warn, and info.
- `priority` event priorities (comma-separated). Valid options: low, normal, all.
- `host` event reporting host (comma-separated).
- `tags` event tags (comma-separated).
- `excluded_tags` excluded event tags (comma-separated).
- `rollup` the stats roll-up method. `count` is the only supported method now.
- `last` the timeframe to roll up the counts. Examples: 45m, 4h. Supported timeframes: m, h and d. This value should not exceed 48 hours.

**NOTE** The Event Alert Query is being deprecated and replaced by the Event V2 Alert Query. For more information, see the [Event Migration guide](https://docs.datadoghq.com/events/guides/migrating_to_new_events_features/).

**Event V2 Alert Query**

Example: `events(query).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `rollup_method` The stats roll-up method - supports `count`, `avg` and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

**Process Alert Query**

Example: `processes(search).over(tags).rollup('count').last(timeframe) operator #`

- `search` free text search string for querying processes.
Matching processes match results on the [Live Processes](https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows) page.
- `tags` one or more tags (comma-separated)
- `timeframe` the timeframe to roll up the counts. Examples: 10m, 4h. Supported timeframes: s, m, h and d
- `operator` <, <=, >, >=, ==, or !=
- `#` an integer or decimal number used to set the threshold

**Logs Alert Query**

Example: `logs(query).index(index_name).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `index_name` For multi-index organizations, the log index in which the request is performed.
- `rollup_method` The stats roll-up method - supports `count`, `avg` and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

**Composite Query**

Example: `12345 && 67890`, where `12345` and `67890` are the IDs of non-composite monitors

* `name` [*required*, *default* = **dynamic, based on query**]: The name of the alert.
* `message` [*required*, *default* = **dynamic, based on query**]: A message to include with notifications for this monitor.
Email notifications can be sent to specific users by using the same '@username' notation as events.
* `tags` [*optional*, *default* = **empty list**]: A list of tags to associate with your monitor.
When getting all monitor details via the API, use the `monitor_tags` argument to filter results by these tags.
It is only available via the API and isn't visible or editable in the Datadog UI.

**SLO Alert Query**

Example: `error_budget("slo_id").over("time_window") operator #`

- `slo_id`: The alphanumeric SLO ID of the SLO you are configuring the alert for.
- `time_window`: The time window of the SLO target you wish to alert on. Valid options: `7d`, `30d`, `90d`.
- `operator`: `>=` or `>`

**Audit Alert Query**

Example: `audits(query).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `rollup_method` The stats roll-up method - supports `count`, `avg` and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

**NOTE** Only available on US1-FED and in closed beta on US1, EU, US3, and US5.

**CI Pipelines Alert Query**

Example: `ci-pipelines(query).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `rollup_method` The stats roll-up method - supports `count`, `avg`, and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

**NOTE** CI Pipeline monitors are in alpha on US1, EU, US3 and US5.

**CI Tests Alert Query**

Example: `ci-tests(query).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `rollup_method` The stats roll-up method - supports `count`, `avg`, and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

**NOTE** CI Test monitors are available only in closed beta on US1, EU, US3 and US5.

**Error Tracking Alert Query**

Example(RUM): `error-tracking-rum(query).rollup(rollup_method[, measure]).last(time_window) operator #`
Example(APM Traces): `error-tracking-traces(query).rollup(rollup_method[, measure]).last(time_window) operator #`

- `query` The search query - following the [Log search syntax](https://docs.datadoghq.com/logs/search_syntax/).
- `rollup_method` The stats roll-up method - supports `count`, `avg`, and `cardinality`.
- `measure` For `avg` and cardinality `rollup_method` - specify the measure or the facet name you want to use.
- `time_window` #m (between 1 and 2880), #h (between 1 and 48).
- `operator` `<`, `<=`, `>`, `>=`, `==`, or `!=`.
- `#` an integer or decimal number used to set the threshold.

## Check if a monitor can be deleted

Check if the given monitors can be deleted.

## Monitors group search

Search and filter your monitor groups details.

## Monitors search

Search and filter your monitors details.

## Validate a monitor

Validate the monitor provided in the request.

## Delete a monitor

Delete the specified monitor

## Get a monitor's details

Get details about the specified monitor from your organization.

## Edit a monitor

Edit the specified monitor.

## Mute a monitor

Mute the specified monitor.

## Unmute a monitor

Unmute the specified monitor.

## Validate an existing monitor

Validate the monitor provided in the request.

## Mute all monitors

Muting prevents all monitors from notifying through email and posts to the
[event stream](https://docs.datadoghq.com/events).
State changes are only visible by checking the alert page.

## Unmute all monitors

Disables muting all monitors. Throws an error if mute all
was not enabled previously.

