---
title: Get All Monitor Details
type: apicontent
order: 8.5
---
## Get All Monitor Details
##### ARGUMENTS
<ul class="arguments">
    {{< argument name="group_states" description="If this argument is set, the returned data will include additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'" default="None" >}}
    {{< argument name="name" description="A string to filter monitors by name" default="None" >}}
    {{< argument name="tags" description="A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope, e.g. <code>host:host0</code>. For more information, see the <code>tags</code> parameter for the appropriate <code>query</code> argument in the <a href='#monitor-create'>Create a monitor</a> section above." default="None" >}}
    {{< argument name="monitor_tags" description="A comma separated list indicating what service and/or custom tags, if any, should be used to filter the list of monitors. Tags created in the Datadog UI will automatically have the \"service\" key prepended (e.g. <code>service:my-app</code>)" default="None" >}}
    {{< argument name="with_downtimes" description="If this argument is set to <code>true</code>, then the returned data will include all current downtimes for each monitor." default="true" >}}
</ul>
