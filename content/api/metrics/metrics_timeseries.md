---
title: Post Time Series Points
type: apicontent
order: 5.2
---

## Post Time Series Points
The metrics end-point allows you to post time-series data that can be graphed on Datadog's dashboards.

ARGUMENTS

<ul class="arguments">
{{< argument name="series" description="A JSON array of metrics where each item in the array contains the following arguments:" lang="console" >}}
{{< argument name="series" description="To submit multiple metrics, you may pass a JSON array where each item in the array contains the following arguments. To submit a single metric, you may pass the following arguments as separate arguments." lang="python" default="None" >}}
{{< argument name="metric" description="The name of the time series" lang="console" >}}
<li>
<strong>points [required]</strong>
<div>A JSON array of points. Each point is of the form:
  <div>
    <code>[[POSIX_timestamp, numeric_value], ...]</code>
  </div>
  Note that the timestamp should be in seconds, must be current, and the numeric value is a 32bit float gauge-type value.
  Current is defined as not more than 10 minutes in the future or more than 1 hour in the past.
</div>
</li>
{{< argument name="host" description="The name of the host that produced the metric." default="None" >}}
{{< argument name="tags" description="A list of tags associated with the metric." default="None" >}}
</ul>