---
title: When I query can I use wildcards in metric names and events?
kind: faq
---

We offer a [tagging system][1] that is a great feature in Datadog and is intended for easily graphing and scaling many instances of a metric.

For example, instead of having specific metric names you can have slightly more general ones, and have different instances of that metric reporting with specific tags. Here's a toy example, using web_page_visitors as the metric name.

I can then have tags associated with different instances of the metric, like:

* `page:home`
* `page:info`
* `page:contact`
* `page:signup`

...and so on. Then, when I want to graph the number of web page visitors, I can do this in a variety of ways fairly easily:

* `"q": "avg:web_page_visitors{*}"` -> graph the average across all instances/pages.
* `"q": "sum:web_page_visitors{*}"` -> graph the sum across all instances.
* `"q": "web_page_visitors{*} by {page}"` -> graph the number of visitors, with a separate line for each page

**Note**: wildcards are supported in [Event Monitors][2].

[1]: /tagging
[2]: /monitors/monitor_types/event
