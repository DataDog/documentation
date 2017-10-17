---
title: Edit A Monitor
type: apicontent
order: 8.3
---

## Edit A Monitor
##### ARGUMENTS
<ul class="arguments">
    {{< argument name="query" description="The metric query to alert on." default="None" >}}
    {{< argument name="name" description="The name of the monitor." default="dynamic, based on query" >}}
    {{< argument name="message" description="A message to include with notifications for this monitor. Email notifications can be sent to specific users by using the same '@username' notation as events." default="dynamic, based on query" >}}
    {{< argument name="options" description="Refer to the create monitor documentation for details on the available options." default="None" >}}
    {{< argument name="tags" description="A list of tags to associate with your monitor. This can help you categorize and filter monitors." default="empty list" >}}
</ul>
