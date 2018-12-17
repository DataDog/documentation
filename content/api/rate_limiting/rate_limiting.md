---
title: Rate limiting
type: apicontent
order: 4
external_redirect: /api/#rate-limiting
---
## Rate limiting
Some of the API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, review these headers to determine when you are able to try again.

Rate limits can be increased from defaults by [contacting the Datadog Support team][1].

Regarding API rate limit policy:

* We **do not rate limit** on datapoint/metric submission (see [metrics section][2] for more info on how metric submission rate is handled) - limits encounter would be the quantity of [custom metrics][3] based on your agreement
* Rate limit for event submission is 1000 per aggregate per day per organization. An aggregate is a group of similar events.
* Rate limit for the [query_batch API][4] call is 300 per hour per organization, it can be extended on demand
* Rate limit for the [graph_snapshot API][5] call is 60 per hour per organization, it can be extended on demand

[1]: /help
[2]: /api/#metrics
[3]: /developers/metrics/custom_metrics
[4]: /api/#query-time-series-points
[5]: /api/#graphs
