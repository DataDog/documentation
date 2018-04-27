---
title: Est-ce-que je peux utiliser des wildcards lorsque je requête des noms de métriques et des événements?
kind: faq
---

We offer a [tagging system][1] that is a great feature in Datadog and is intended for easily graphing and scaling many instances of a metric.

For example, instead of having specific metric names you can have slightly more general ones, and have different instances of that metric reporting with specific tags. Here’s a toy example, using web_page_visitors as the metric name.

Je peux alors avoir des tags associées à différentes instances de la métrique, comme:

* `page:home`
* `page:info`
* `page:contact`
* `page:signup`

…and so on. Then, when I want to graph the number of web page visitors, I can do this in a variety of ways fairly easily:

* `“q”: “avg:web_page_visitors{*}”` —> graph the average across all instances/pages.
* `“q”: “sum:web_page_visitors{*}”` —> graphe la somme de toutes les instances.
* `“q”: “web_page_visitors{*} by {page}”` —> graph the number of visitors, with a separate line for each page

**Note**: wildcards are supported in [Event Monitors][2].

[1]: /getting_started/tagging
[2]: /monitors/monitor_types/event
