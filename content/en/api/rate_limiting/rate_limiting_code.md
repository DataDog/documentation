---
title: Rate limiting
type: apicode
order: 4
external_redirect: /api/#rate-limiting
---
**Rate Limit Headers**:

* `X-RateLimit-Limit` number of requests allowed in a time period
* `X-RateLimit-Period` length of time in seconds for resets (calendar aligned)
* `X-RateLimit-Remaining` number of allowed requests left in current time period
* `X-RateLimit-Reset` time in seconds until next reset
