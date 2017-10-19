---
title: Create A Monitor
type: apicontent
order: 8.1
---

## Create A Monitor

##### ARGUMENTS
<ul class="arguments">
    <li>
        <strong>type [required]</strong>
        <div>The type of the monitor, chosen from:
            <ul>
                <li><code>metric alert</code></li>
                <li><code>service check</code></li>
                <li><code>event alert</code></li>
                <li><code>composite</code></li>
            </ul>
        </div>
    </li>
    <li>
        <strong>query [required]</strong>
        <div>The query defines when the monitor will trigger. Query syntax depends on what type of monitor you are creating:</div>
        <h5>Metric Alert Query</h5>
        <code>time_aggr(time_window):space_aggr:metric{tags} [by {key}] operator #</code>
        <ul class="arguments">
            <li><code>time_aggr</code> avg, sum, max, min, change, or pct_change</li>
            <li><code>time_window</code> last_#m (5, 10, 15, or 30), last_#h (1, 2, or 4), or last_1d</li>
            <li><code>space_aggr</code> avg, sum, min, or max</li>
            <li><code>tags</code> one or more tags (comma-separated), or *</li>
            <li><code>key</code> a 'key' in key:value tag syntax; defines a separate alert for each tag in the group (multi-alert)</li>
            <li><code>operator</code> &lt;, &lt;=, &gt;, &gt;=, ==, or !=</li>
            <li><code>#</code> an integer or decimal number used to set the threshold</li>
        </ul>
        <div>If you are using the <em>change</em> or <em>pct_change</em> time aggregator, you can instead use <code>change_aggr(time_aggr(time_window), timeshift):space_aggr:metric{tags} [by {key}] operator #</code> with:
            <ul class="arguments">
                <li><code>change_aggr</code> change, pct_change</li>
                <li><code>time_aggr</code> avg, sum, max, min</li>
                <li><code>time_window</code> last_#m (1, 5, 10, 15, or 30), last_#h (1, 2, or 4), or last_#d (1 or 2)</li>
                <li><code>timeshift</code> #m_ago (5, 10, 15, or 30), #h_ago (1, 2, or 4), or 1d_ago</li>
            </ul>
        </div>
        <div>You can also use this to create an outlier monitor using the following query: <code>avg(last_30m):outliers(avg:system.cpu.user{role:es-events-data} by {host}, 'dbscan', 7) > 0</code></div>
        <h5>Service Check Query</h5>
        <code>"check".over(tags).last(count).count_by_status()</code>
        <ul class="arguments">
            <li><code>check</code> name of the check, e.g. datadog.agent.up</li>
            <li><code>tags</code> one or more quoted tags (comma-separated), or "*". e.g.: <code>.over("env:prod", "role:db")</code></li>
            <li><code>count</code> must be at >= your max threshold (defined in the <code>options</code>). e.g. if you want to notify on 1 critical, 3 ok and 2 warn statuses count should be 3.</li>
        </ul>
        <h5>Event Alert Query</h5>
        <code>events('sources:nagios status:error,warning priority:normal tags: "string query"').rollup("count").last("1h")"</code>
        <ul class="arguments">
            <li><code>event</code>, the event query string:
                <ul class="arguments">
                    <li><code>string_query</code> free text query to match against event title and text.</li>
                    <li><code>sources</code> event sources (comma-separated).</li>
                    <li><code>status</code> event statuses (comma-separated). Valid options: error, warn, and info.</li>
                    <li><code>priority</code> event priorities (comma-separated). Valid options: low, normal, all.</li>
                    <li><code>host</code> event reporting host (comma-separated).</li>
                    <li><code>tags</code> event tags (comma-separated).</li>
                    <li><code>excluded_tags</code> exluded event tags (comma-separated).</li>
                </ul>
            </li>
            <li><code>rollup</code> the stats rollup method. <code>count</code> is the only supported method now.</li>
            <li><code>last</code> the timeframe to roll up the counts. Examples: 60s, 4h. Supported timeframes: s, m, h and d.</li>
        </ul>
        <h5>Composite Query</h5>
        <div><code>12345 && 67890</code>, where <code>12345</code> and <code>67890</code> are the IDs of non-composite monitors</div>
    </li>
    {{ partial "argument.html" (dict "context" $dot "name" "name" "description" "The name of the alert." "default" "dynamic, based on query") }}
    {{ partial "argument.html" (dict "context" $dot "name" "message" "description" "A message to include with notifications for this monitor. Email notifications can be sent to specific users by using the same '@username' notation as events." "default" "dynamic, based on query") }}
    {{ partial "argument.html" (dict "context" $dot "name" "tags" "description" "A list of tags to associate with your monitor. When getting all monitor details via the API, you can use the <code>monitor_tags</code> argument to filter results by these tags. It will only be available via the API and will not be visible or editable in the Datadog UI." "default" "empty list") }}
    <li>
        <strong>options [optional]</strong>
        <div>A dictionary of options for the monitor. There are options that are common to all types as well as options that are specific to certain monitor types.</div>
        <h5>Common Options</h5>
        <ul class="arguments">
            <li><code>silenced</code> dictionary of scopes to timestamps or <code>None</code>. Each scope will be muted until the given POSIX timestamp or forever if the value is <code>None</code>.
                <p>Default: <code>None</code></p>
                <p>Examples:
                    <ul>
                      <li>To mute the alert completely: <p><code>{'*': None}</code></p></li>
                      <li>To mute <code>role:db</code> for a short time: <p><code>{'role:db': 1412798116}</code></p></li>
                    </ul>
                </p>
            </li>

            <li><code>notify_no_data</code> a boolean indicating whether this monitor will notify when data stops reporting. <p>Default: <code>false</code></p></li>

            <li><code>new_host_delay</code> Time (in seconds) to allow a host to boot and applications to fully start before starting the evaluation of monitor results. Should be a non negative integer. <p>Default: <code>300</code></p></li>

            <li><code>no_data_timeframe</code> the number of minutes before a monitor will notify when data stops reporting. Must be at least 2x the monitor timeframe for metric alerts or 2 minutes for service checks. <p>Default: <code>2x timeframe for metric alerts, 2 minutes for service checks</code></p></li>

            <li><code>timeout_h</code> the number of hours of the monitor not reporting data before it will automatically resolve from a triggered state. <p>Default: <code>None</code></p></li>

            <li><code>require_full_window</code> a boolean indicating whether this monitor needs a full window of data before it's evaluated. We highly recommend you set this to <code>False</code> for sparse metrics, otherwise some evaluations will be skipped. <p>Default: <code>True</code> for "on average", "at all times" and "in total" aggregation. <code>False</code> otherwise.</p></li>

            <li><code>renotify_interval</code> the number of minutes after the last notification before a monitor will re-notify on the current status. It will only re-notify if it's not resolved. <p>Default: <code>None</code></p></li>

            <li><code>escalation_message</code> a message to include with a re-notification. Supports the '@username' notification we allow elsewhere. Not applicable if <code>renotify_interval</code> is <code>None</code>. <p>Default: <code>None</code></p></li>

            <li><code>notify_audit</code> a boolean indicating whether tagged users will be notified on changes to this monitor. <p>Default: <code>False</code></p></li>

            <li><code>locked</code> a boolean indicating whether changes to to this monitor should be restricted to the creator or admins. <p>Default: <code>False</code></p></li>

            <li><code>include_tags</code> a boolean indicating whether notifications from this monitor will automatically insert its triggering tags into the title.
                  <p>Default: <code>True</code></p>
                  <p>Examples:

                    <ul>
                      <li>True:
                          <p><code>[Triggered on {host:h1}] Monitor Title</code></p></li>
                      <li>False:
                          <p><code>[Triggered] Monitor Title</code></p></li>
                    </ul>
                  </p>
            </li>
</ul>

<h5>Metric Alert Options</h5>
<em>These options only apply to metric alerts.</em>

<ul class="arguments">
  <li>
    <code>thresholds</code> a dictionary of thresholds by threshold type. Currently we have two threshold types for metric alerts: critical and warning. Critical is defined in the query, but can also be specified in this option. Warning threshold can only be specified using the thresholds option.
    <p>Example: <code>{'critical': 90, 'warning': 80}</code></p>
  </li>
  <li>
    <code>evaluation_delay</code> Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor will evaluate data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor will always have data during evaluation.
  </li>
</ul>

<h5>Service Check Options</h5>

<em>These options only apply to service checks and will be ignored
for other monitor types.</em>

<ul class="arguments">
  <li>
    <code>thresholds</code> a dictionary of thresholds by status. Because service checks can have multiple thresholds, we don't define them directly in the query.
    <p>Default: <code>{'ok': 1, 'critical': 1, 'warning': 1}</code></p>
  </li>
</ul>

</li>
</ul>