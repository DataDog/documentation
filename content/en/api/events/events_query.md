---
title: Query the event stream
type: apicontent
order: 12.4
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
    A comma separated string of tags. To use a negative tag filter, prefix your tag with `-`.
    See the [Event Stream documentation][2] to learn more.
* **`unaggregated`** [*optional*, *default*=*false*]:
    Set unaggregated to `true` to return all events within the specified [`start`,`end`] timeframe. Otherwise if an event is aggregated to a parent event with a timestamp outside of the timeframe, it won't be available in the output.

[1]: /events
[2]: /events/#event-query-language
