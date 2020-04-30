---
title: API Reference V2
type: api
---

## API Reference V2

Use the Datadog HTTP API to programmatically access the Datadog platform.

**To get started on Datadog HTTP API, use our [Datadog Postman collection][1]**

The Datadog API uses resource-oriented URLs, uses status codes to indicate the success or failure of requests and returns JSON from all requests. Let's dive in and see how it works.

**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS you can install coreutils via the [Homebrew package manager][2]: `brew install coreutils`


## Authentication

All requests to Datadog's API must be authenticated. Requests that write data require _reporting access_ and require an `API key`. Requests that read data require _full access_ and also require an `application key`.

**Note**: All Datadog API Clients are configured by default to consume Datadog US site APIs. If you are on the Datadog EU site, Set the environment variable `DATADOG_HOST` to `https://api.datadoghq.eu` or overide this value directly when creating your Client.

[Manage your account's API and application keys][3].

## Rate limiting

Some of the API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, review these headers to determine when you are able to try again.

Rate limits can be increased from defaults by [contacting the Datadog support team][4].

Regarding API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][5] for more info on how metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][6] based on your agreement.
- The rate limit for metric **retrieval** is `100` per hour per organization.
- The rate limit for event submission is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
- The rate limit for the [query_batch API][7] call is `600` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Query API][8] call is `300` per hour per organization. This can be extended on demand.
- The rate limit for the [graph_snapshot API][9] call is `60` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Configuration API][10] is `6000` per minute per organization. This can be extended on demand.

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |

[1]: /getting_started/api
[2]: https://brew.sh
[3]: https://app.datadoghq.com/account/settings#api
[4]: /help/
[5]: /api/v1/metrics/
[6]: /developers/metrics/custom_metrics/
[7]: /api/v1/metrics/#query-timeseries-points
[8]: /api/v1/logs/#get-a-list-of-logs
[9]: /api/v1/snapshots/
[10]: /api/v1/logs-indexes/
