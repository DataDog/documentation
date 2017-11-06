---
title: API rate limit
kind: faq
customnav: main_references
---

Here is some information regarding our API rate limit policy:

* we **do not rate limit** on datapoint/metric submission - the limits you'd encounter would be based on [your agreement](/getting_started/custom_metrics)
* rate limit for event submission is 1000 per aggregate per day per organization. An aggregate is a group of similar events.
* rate limit for the [query_batch API](/api/#metrics-query) call is 300 per hour per organization, it can be extended on demand
* rate limit for the [query_snapshot API](/api/#graphs) call is 60 per hour per organization, it can be extended on demand

It's possible to know how close you are to your limit by checking [the headers](/api/#ratelimiting).