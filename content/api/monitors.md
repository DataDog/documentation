## Monitors
Monitors allow you to watch a metric or check that you care about, notifying your team when some defined threshold is exceeded. Please refer to the Guide to Monitors for more information on creating monitors.

## Create A Monitor
ARGUMENTS

type [required]
The type of the monitor, chosen from:
metric alert
service check
event alert
composite
query [required]
The query defines when the monitor will trigger. Query syntax depends on what type of monitor you are creating:
METRIC ALERT QUERY

time_aggr(time_window):space_aggr:metric{tags} [by {key}] operator #
time_aggr avg, sum, max, min, change, or pct_change
time_window last_#m (5, 10, 15, or 30), last_#h (1, 2, or 4), or last_1d
space_aggr avg, sum, min, or max
tags one or more tags (comma-separated), or *
key a 'key' in key:value tag syntax; defines a separate alert for each tag in the group (multi-alert)
operator <, <=, >, >=, ==, or !=
# an integer or decimal number used to set the threshold
If you are using the change or pct_change time aggregator, you can instead use change_aggr(time_aggr(time_window), timeshift):space_aggr:metric{tags} [by {key}] operator # with:
change_aggr change, pct_change
time_aggr avg, sum, max, min
time_window last_#m (1, 5, 10, 15, or 30), last_#h (1, 2, or 4), or last_#d (1 or 2)
timeshift #m_ago (5, 10, 15, or 30), #h_ago (1, 2, or 4), or 1d_ago
You can also use this to create an outlier monitor using the following query: avg(last_30m):outliers(avg:system.cpu.user{role:es-events-data} by {host}, 'dbscan', 7) > 0
SERVICE CHECK QUERY

"check".over(tags).last(count).count_by_status()
check name of the check, e.g. datadog.agent.up
tags one or more quoted tags (comma-separated), or "*". e.g.: .over("env:prod", "role:db")
count must be at >= your max threshold (defined in the options). e.g. if you want to notify on 1 critical, 3 ok and 2 warn statuses count should be 3.
EVENT ALERT QUERY

events('sources:nagios status:error,warning priority:normal tags: "string query"').rollup("count").last("1h")"
event, the event query string:
string_query free text query to match against event title and text.
sources event sources (comma-separated).
status event statuses (comma-separated). Valid options: error, warn, and info.
priority event priorities (comma-separated). Valid options: low, normal, all.
host event reporting host (comma-separated).
tags event tags (comma-separated).
excluded_tags exluded event tags (comma-separated).
rollup the stats rollup method. count is the only supported method now.
last the timeframe to roll up the counts. Examples: 60s, 4h. Supported timeframes: s, m, h and d.
COMPOSITE QUERY

12345 && 67890, where 12345 and 67890 are the IDs of non-composite monitors
name [optional, default=dynamic, based on query]
The name of the alert.
message [optional, default=dynamic, based on query]
A message to include with notifications for this monitor. Email notifications can be sent to specific users by using the same '@username' notation as events.
tags [optional, default=empty list]
A list of tags to associate with your monitor. When getting all monitor details via the API, you can use the monitor_tags argument to filter results by these tags. It will only be available via the API and will not be visible or editable in the Datadog UI.
options [optional]
A dictionary of options for the monitor. There are options that are common to all types as well as options that are specific to certain monitor types.
COMMON OPTIONS

silenced dictionary of scopes to timestamps or None. Each scope will be muted until the given POSIX timestamp or forever if the value is None.
Default: None

Examples:

To mute the alert completely:
{'*': None}

To mute role:db for a short time:
{'role:db': 1412798116}

notify_no_data a boolean indicating whether this monitor will notify when data stops reporting.
Default: false

new_host_delay Time (in seconds) to allow a host to boot and applications to fully start before starting the evaluation of monitor results. Should be a non negative integer.
Default: 300

no_data_timeframe the number of minutes before a monitor will notify when data stops reporting. Must be at least 2x the monitor timeframe for metric alerts or 2 minutes for service checks.
Default: 2x timeframe for metric alerts, 2 minutes for service checks

timeout_h the number of hours of the monitor not reporting data before it will automatically resolve from a triggered state.
Default: None

require_full_window a boolean indicating whether this monitor needs a full window of data before it's evaluated. We highly recommend you set this to False for sparse metrics, otherwise some evaluations will be skipped.
Default: True for "on average", "at all times" and "in total" aggregation. False otherwise.

renotify_interval the number of minutes after the last notification before a monitor will re-notify on the current status. It will only re-notify if it's not resolved.
Default: None

escalation_message a message to include with a re-notification. Supports the '@username' notification we allow elsewhere. Not applicable if renotify_interval is None.
Default: None

notify_audit a boolean indicating whether tagged users will be notified on changes to this monitor.
Default: False

locked a boolean indicating whether changes to to this monitor should be restricted to the creator or admins.
Default: False

include_tags a boolean indicating whether notifications from this monitor will automatically insert its triggering tags into the title.
Default: True

Examples:

True:
[Triggered on {host:h1}] Monitor Title

False:
[Triggered] Monitor Title

METRIC ALERT OPTIONS

These options only apply to metric alerts.
thresholds a dictionary of thresholds by threshold type. Currently we have two threshold types for metric alerts: critical and warning. Critical is defined in the query, but can also be specified in this option. Warning threshold can only be specified using the thresholds option.
Example: {'critical': 90, 'warning': 80}

evaluation_delay Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor will evaluate data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor will always have data during evaluation.
SERVICE CHECK OPTIONS

These options only apply to service checks and will be ignored for other monitor types.
thresholds a dictionary of thresholds by status. Because service checks can have multiple thresholds, we don't define them directly in the query.
Default: {'ok': 1, 'critical': 1, 'warning': 1}

## Get A Monitor's Details
ARGUMENTS

group_states [optional, default=None]
If this argument is set, the returned data will include additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'

## Edit A Monitor
ARGUMENTS

query [required]
The metric query to alert on.
name [optional, default=dynamic, based on query]
The name of the monitor.
message [optional, default=dynamic, based on query]
A message to include with notifications for this monitor. Email notifications can be sent to specific users by using the same '@username' notation as events.
options [optional, default=None]
Refer to the create monitor documentation for details on the available options.
tags [optional, default=empty list]
A list of tags to associate with your monitor. This can help you categorize and filter monitors.

## Delete A Monitor
ARGUMENTS

This end point takes no JSON arguments.'

## Get All Monitor Details
ARGUMENTS

group_states [optional, default=None]
If this argument is set, the returned data will include additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'
name [optional, default=None]
A string to filter monitors by name
tags [optional, default=None]
A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope, e.g. host:host0. For more information, see the tags parameter for the appropriate query argument in the Create a monitor section above.
monitor_tags [optional, default=None]
A comma separated list indicating what service and/or custom tags, if any, should be used to filter the list of monitors. Tags created in the Datadog UI will automatically have the "service" key prepended (e.g. service:my-app)
with_downtimes [optional, default=true]
If this argument is set to true, then the returned data will include all current downtimes for each monitor.

## Resolve Monitor
ARGUMENTS

RESOLVE

Array of group(s) to resolve for a given monitor_id e.g.

{"monitor_id": "group_to_resolve"}
It supports multiple groups per monitor as well eg:

resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]

## Mute All Monitors
Muting will prevent all monitors from notifying through email and posts to the event stream. State changes will only be visible by checking the alert page.

ARGUMENTS

This end point takes no JSON arguments.'

## Unmute All Monitors
Disables muting all monitors. Throws an error if mute all was not enabled previously.

ARGUMENTS

This end point takes no JSON arguments.'

## Mute A Monitor
ARGUMENTS

scope [optional, default=None]
The scope to apply the mute to, e.g. role:db
end [optional, default=None]
A POSIX timestamp for when the mute should end

## Unmute A Monitor
ARGUMENTS

scope [optional, default=None]
The scope to apply the mute to. For example, if your alert is grouped by {host}, you might mute 'host:app1'
all_scopes [optional, default=False]
Clear muting across all scopes