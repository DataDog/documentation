---
title: Usage Metering
type: apicontent
order: 18.2
---

### Get Hourly Usage For Custom Metrics.

Get Hourly Usage For Custom Metrics.

##### Arguments
<ul class="arguments">
    {{< argument name="start_hr" description="datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour" lang="console" >}}
    {{< argument name="end_hr" description="datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour" lang="console" default="1d+start_hr" >}}
</ul>