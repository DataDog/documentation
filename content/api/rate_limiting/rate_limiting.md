---
title: Rate Limiting
type: apicontent
order: 4
---
## Rate Limiting
Some of our API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, you can review these headers to determine when you will be able to try again.

Rate limits can be increased from defaults by [contacting the Datadog Support team](/help).

Here is some information regarding our API rate limit policy:

* we **do not rate limit** on datapoint/metric submission - the limits you'd encounter would be based on [your agreement](/getting_started/custom_metrics)
* rate limit for event submission is 1000 per aggregate per day per organization. An aggregate is a group of similar events.
* rate limit for the [query_batch API](/api/#metrics-query) call is 300 per hour per organization, it can be extended on demand
* rate limit for the [query_snapshot API](/api/#graphs) call is 60 per hour per organization, it can be extended on demand