---
title: Post an event
type: apicontent
order: 10.1
external_redirect: /api/#post-an-event
---

## Post an event
This end point allows you to post events to the stream. Tag them, set priority and event aggregate them with other events.

##### ARGUMENTS
* `title` [*required*]:  
    The event title. *Limited to 100 characters.*  
    Use `msg_title` with [the Datadog Ruby library](https://github.com/DataDog/dogapi-rb).
* `text` [*required*]:  
    The body of the event. *Limited to 4000 characters.*  
    The text supports [markdown](/graphing/event_stream/#markdown-events\).
    Use `msg_text` with [the Datadog Ruby library](https://github.com/DataDog/dogapi-rb)
* `date_happened` [*optional*, *default* = **now**]:  
    POSIX timestamp of the event.
* `priority` [*optional*, *default* = **normal**]:  
    The priority of the event: **normal** or **low**.
* `host` [*optional*, *default*=**None**]:  
    Host name to associate with the event. Any tags associated with the host are also applied to this event.
* `tags` [*optional*, *default*=**None**]:  
    A list of tags to apply to the event.
* `alert_type` [*optional*, *default* = **info**]:  
    If its an alert event, set its type between: **error**, **warning**, **info**, and **success**.
* `aggregation_key` [*optional*, *default*=**None**]:  
    An arbitrary string to use for aggregation. *Limited to 100 characters.*  
    If you specify a key, all events using that key are grouped together in the Event Stream.
* `source_type_name` [*optional*, *default*=**None**]:  
    The type of event being posted.  
    Options: **nagios**, **hudson**, **jenkins**, **my_apps**, **chef**, **puppet**, **git**, **bitbucket**...  
    [Complete list of source attribute values](/integrations/faq/list-of-api-source-attribute-value)