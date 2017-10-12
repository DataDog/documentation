---
title: Post An Event
type: apicontent
order: 6.1
---

## Post An Event
This end point allows you to post events to the stream. You can tag them, set priority and event aggregate them with other events.

ARGUMENTS

date_happened [optional, default=now]
POSIX timestamp of the event.
priority [optional, default='normal']
The priority of the event ('normal' or 'low').
host [optional, default=None]
Host name to associate with the event. Any tags associated with the host will also be applied to this event.
tags [optional, default=None]
A list of tags to apply to the event.
alert_type [optional, default='info']
"error", "warning", "info" or "success".
[required]
aggregation_key [optional, default=None]
An arbitrary string to use for aggregation, max length of 100 characters. If you specify a key, all events using that key will be grouped together in the Event Stream.
source_type_name [optional, default=None]
The type of event being posted.
Options: nagios, hudson, jenkins, my apps, feed, chef, puppet, git, bitbucket, fabric, capistrano