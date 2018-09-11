---
title: Query the event stream
type: apicontent
order: 11.4
external_redirect: /api/#query-the-event-stream
---

## Query the event stream
The [event stream][1] can be queried and filtered by time, priority, sources and tags.
Note: if the event you're querying contains markdown formatting of any kind, you may see characters such as %,\,n in your output

**ARGUMENTS**:

* **`start`** [*required*]:  
    POSIX timestamp.
* **`end`** [*required*]:  
    POSIX timestamp.
* **`priority`** [*optional*, *default*=**None**]:  
    Priority of your events: **low** or **normal**.
* **`sources`** [*optional*, *default*=**None**]:  
    A comma separated string of sources.
* **`tags`** [*optional*, *default*=**None**]:  
    A comma separated string of tags.

[1]: /graphing/event_stream/
