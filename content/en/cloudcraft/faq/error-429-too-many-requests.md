---
title: Why do I get a 429 Too Many Requests error when using the API?
---

The [Cloudcraft API][1] returns an `HTTP 429 Too Many Requests` response when you trigger the rate limit in place for the endpoint you called.

**Current limits:**

- 20 requests per minute for `https://api.cloudcraft.co/`.
- 5 requests per minute for `https://api.cloudcraft.co/blueprint/BLUEPRINT_ID/FORMAT`.

The Cloudcraft platform relies on these limits to maintain service quality for all users, and increasing them is not possible at the moment.

## Avoiding the limit

You can take the following precautions to avoid triggering the rate limit:

1. Ensure the resources accessed are unique. If the same account or blueprint is accessed repeatedly, only access it once within the rate limiting period and cache the result locally.
2. Implement rate limit detection with [exponential backoff][2]. The request is never processed when hitting the limit, so try to detect the `HTTP 429 Too Many Requests` response from the API and wait 60 seconds before continuing.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/api-retries.html
