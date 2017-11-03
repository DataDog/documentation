---
title: What's the difference between Graphite's query language and Datadog's?
kind: faq
customnav: main_references
---

In terms of metric naming, we differ a little with Graphite in that a metric
query is defined by a metric name and a scope, where a scope is one or more tags.
To translate:

```
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
```

into Datadog, we'd probably say:

```
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
```

Where `<application>.requests.mean_90` is the metric name, and
`http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>`
are tags, so a concrete example might look like:

```
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
```

To do aggregation, we can specify an aggregator as part of the metric query:

```
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
```

This will graph a single series that's the average of that metric across the
intersection of those tags. We support avg, sum, min, max aggregators. If you
wanted to see all the possible series for a given tag facet, you can say:

```
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
```

Which would graph stacked area series for each http_method value like GET, POST, etc.