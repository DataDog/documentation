---
title: Edit A Monitor
type: apicontent
order: 8.3
---

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