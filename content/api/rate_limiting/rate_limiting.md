---
title: Rate Limiting
type: apicontent
order: 4
---
## Rate Limiting
Some of our API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, you can review these headers to determine when you will be able to try again.

Rate limits can be increased from defaults by [contacting the Datadog Support team](https://docs.datadoghq.com/help).