---
title: Events
type: apicontent
order: 6
---

## Events
The events service allows you to programatically post events to the stream and fetch events from the stream.

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

## Get An Event
This end point allows you to query for event details.

ARGUMENTS

This end point takes no JSON arguments.'

## Delete An Event
This end point allows you to delete an event.

ARGUMENTS

This end point takes no JSON arguments.'

## Query The Event Stream
The event stream can be queried and filtered by time, priority, sources and tags.

ARGUMENTS

start [required]
POSIX timestamp
end [required]
POSIX timestamp
priority [optional, default=None]
'low' or 'normal'
sources [optional, default=None]
A comma separated string of sources
tags [optional, default=None]
A comma separated string of tags