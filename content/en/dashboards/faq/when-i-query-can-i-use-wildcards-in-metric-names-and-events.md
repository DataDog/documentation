---
title: When I query can I use wildcards in metric names and events?
kind: faq
disable_toc: true
aliases:
    - /graphing/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events
---

Wildcards are supported in [Event monitors][1] and [Events overlay][2].

For metrics, Datadog offers a [tagging system][3] which is intended for graphing and scaling many instances of a metric. Instead of having specific metric names, create more general ones to take advantage of `key:value` pairs. This creates different instances of a metric reporting with specific tags.

Here's an example using `web_page_visitors` as the metric name. Many tags can be associated with different instances of the metric:

* `page:home`
* `page:info`
* `page:contact`
* `page:signup`

Then, to [graph][4] the number of web page visitors, there are a variety of possible queries:

* `"q": "avg:web_page_visitors{*}"` -> graph the average across all instances/pages.
* `"q": "sum:web_page_visitors{*}"` -> graph the sum across all instances.
* `"q": "web_page_visitors{*} by {page}"` -> graph the number of visitors, with a separate line for each page.

[1]: /monitors/monitor_types/event
[2]: /dashboards/timeboards/#events
[3]: /tagging
[4]: /dashboards/querying/#graphing-editor
