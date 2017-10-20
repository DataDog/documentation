---
title: Query The Event Stream
type: apicontent
order: 6.4
---

## Query The Event Stream
The event stream can be queried and filtered by time, priority, sources and tags.
Note: if the event you’re querying contains markdown formatting of any kind, you may see characters such as %,\,n in your output

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="start" description="POSIX timestamp" >}}
    {{< argument name="end" description="POSIX timestamp" >}}
    {{< argument name="priority" description="'low' or 'normal'" default="None" >}}
    {{< argument name="sources" description="A comma separated string of sources" default="None" >}}
    {{< argument name="tags" description="A comma separated string of tags" default="None" >}}
</ul>