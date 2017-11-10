---
title: Post An Event
type: apicontent
order: 6.1
---

## Post An Event
This end point allows you to post events to the stream. You can tag them, set priority and event aggregate them with other events.

##### ARGUMENTS
<ul class="arguments">

    {{< argument name="title" description="The event title. Limited to 100 characters." lang="console" >}}
    {{< argument name="text" description="The body of the event. Limited to 4000 characters. The text supports <a href=\"/graphing/events_stream/#markdown-events\">markdown</a>." lang="console" default="''" >}}

    {{< argument name="title" description="The event title. Limited to 100 characters." lang="python" >}}
    {{< argument name="text" description="The body of the event. Limited to 4000 characters. The text supports <a href=\"/graphing/events_stream/#markdown-events\">markdown</a>." lang="python" default="''" >}}

    {{< argument name="msg_title" description="The event title. Limited to 100 characters." lang="ruby" default="None" >}}
    {{< argument name="msg_text" description="The text for the message. Limited to 4000 characters. The text supports <a href=\"/graphing/events_stream/#markdown-events\">markdown</a>." lang="ruby" default="''" >}}
    {{< argument name="date_happened" description="POSIX timestamp of the event." default="now" >}}
    {{< argument name="priority" description="The priority of the event ('normal' or 'low')." default="'normal'" >}}
    {{< argument name="host" description="Host name to associate with the event. Any tags associated with the host will also be applied to this event." default="None" >}}
    {{< argument name="tags" description="A list of tags to apply to the event." default="None" >}}
    {{< argument name="alert_type" description="\"error\", \"warning\", \"info\" or \"success\"." default="'info'" >}}
    {{< argument name="aggregation_key" description="An arbitrary string to use for aggregation, max length of 100 characters. If you specify a key, all events using that key will be grouped together in the Event Stream." default="None" >}}
    {{< argument name="source_type_name" description="The type of event being posted. <div>Options: nagios, hudson, jenkins, my apps, feed, chef, puppet, git, bitbucket, fabric, capistrano</div>" default="None" >}}
</ul>
