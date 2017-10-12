---
title: Get A Monitor's Details
type: apicontent
order: 8.2
---
## Get A Monitor's Details
ARGUMENTS

group_states [optional, default=None]
If this argument is set, the returned data will include additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'
