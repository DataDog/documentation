---
title: Rate limiting
type: apicontent
order: 4
external_redirect: /api/#rate-limiting
---

## Rate limiting

Some of the API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, review these headers to determine when you are able to try again.

Rate limits can be increased from defaults by [contacting the Datadog support team][1].

Regarding API rate limit policy:

* Datadog **does not rate limit** on data point/metric submission (see [metrics section][2] for more info on how metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][3] based on your agreement.
* The rate limit for metric **retrieval** is `100` per hour per organization.
* The rate limit for event submission is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
* The rate limit for the [query_batch API][4] and [Log Query API][5] call is `300` per hour per organization. This can be extended on demand.
* The rate limit for the [graph_snapshot API][6] call is `60` per hour per organization. This can be extended on demand.
* The rate limit for [Log Configuration API][7] is `6000` per minute per organization. This can be extended on demand.

[1]: /help
[2]: /api/#metrics
[3]: /developers/metrics/custom_metrics
[4]: /api/#query-timeseries-points
[5]: /api/?lang=bash#get-a-list-of-logs
[6]: /api/#graphs
[7]: /api/?lang=bash#logs
