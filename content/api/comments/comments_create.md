---
title: Create A Comment
type: apicontent
order: 15.1
---

## Create A Comment
Comments are essentially special forms of events that appear in the stream. They can start a new discussion thread or optionally, reply in another thread.

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="message" description="The comment text." >}}
    {{< argument name="handle" description="The handle of the user making the comment." default="application key owner" >}}
    {{< argument name="related_event_id" description="The id of another comment or event to reply to" default="None" >}}
</ul>
