---
title: Query The Event Stream
type: apicontent
order: 6.4
---

## Query The Event Stream
The event stream can be queried and filtered by time, priority, sources and tags.
Note: if the event you’re querying contains markdown formatting of any kind, you may see characters such as %,\,n in your output

##### ARGUMENTS
* `start` [*required*]:  
    POSIX timestamp.
* `end` [*required*]:  
    POSIX timestamp.
* `priority` [*optional*, *default*=**None**]:  
    Priority of your events: **low** or **normal**.
* `sources` [*optional*, *default*=**None**]:  
    A comma separated string of sources.
* `tags` [*optional*, *default*=**None**]:  
    A comma separated string of tags.