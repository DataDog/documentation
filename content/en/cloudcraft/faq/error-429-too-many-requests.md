---
title: Why do I get a 429 Too Many Requests error when using the API?
kind: faq
---

The [Cloudcraft API][1] will return an <code>HTTP 429 Too Many Requests</code> response when you trigger the rate limit in place for the endpoint you called.

**Current limits:**

- 20 requests per minute for <code>https://api.cloudcraft.co/</code>.
- 5 requests per minute for <code>https://api.cloudcraft.co/blueprint/BLUEPRINT_ID/FORMAT</code>.

Our platform relies on these limits to maintain service quality for all users, and increasing them is not possible at the moment.

## Avoiding the limit

You can take a few precautions to avoid triggering the rate limit currently in place.

1. Ensure the resources accessed are unique. If the same account or blueprint is repeatedly accessed, only access it once within the rate limiting period and cache the result locally.
2. Implement rate limit detection with [exponential backoff][2]. The request is never processed when hitting the limit, so try to detect the <code>HTTP 429 Too Many Requests</code> response from the API and wait 60 seconds before continuing.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/api-retries.html
