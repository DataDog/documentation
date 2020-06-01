---
title: API Reference
type: api
---

{{< h2 >}}API Reference{{< /h2 >}}

Use the Datadog HTTP API to programmatically access the Datadog platform.

**To get started on Datadog HTTP API, use our [Datadog Postman collection][1]**

The Datadog API uses resource-oriented URLs, uses status codes to indicate the success or failure of requests and returns JSON from all requests.

**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS you can install coreutils via the [Homebrew package manager][2]: `brew install coreutils`

To get started with Datadog, use the following flow to determine which endpoints you need:

{{< img src="api/api-flow.png" alt="Flow through Datadog" responsive="true" style="width:100%;">}}

{{< h2 >}}Install the Datadog Agent{{< /h2 >}}

Before you can use the API to send or view data, you need to [install the Datadog Agent][3]. The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. 

{{< h2 >}}Send data to Datadog{{< /h2 >}}

Once you have the Datadog Agent set up, use the API to begin to send integrations data to Datadog. With some additional setup of the Agent, you can also use the API to send Synthetics, Logs and Traces to Datadog.

{{< h3 >}}Integrations endpoints{{< /h3 >}}

Available intgrations endpoints:

- AWS Integration
- AWS Logs Integration
- Azure Integration
- GCP Integration
- Slack Integration
- PagerDuty Integration
- Webhooks Integration

{{< h3 >}}Platform endpoints{{< /h3 >}}

Use these endpoints to post and fetch data to and from other parts of the Datadog platform: 

- Metrics - The metrics endpoints allows you to post [metrics][4] data so it can be graphed on Datadog’s dashboards and query metrics from any time period
- Events - The events endpoints allows you to post and fetch events to and from the [Datadog event stream][5].
- Synthetics - Use the Synthetics endpoints to create, start, stop and see [Synthetics tests][6] results.
- Tracing - Use the Tracing Agent API to send traces to your Datadog Agent, which then forwards them to Datadog.

{{< h2 >}}Visualize your data{{< /h2 >}}

Once you are sending data to Datadog, you can use the API to programatically build data visualizations:

- Build Dashboards and view Dashboard Lists
- Manage host tags
- Create Embeddable Graphs
- Take a graph Snapshot
- Service Dependencies - see a list of your APM services and their dependencies
- Create Monitors
- Service Checks - post check statuses for use with monitors
- Create and manage Logs, Logs Indexes, and Logs Pipelines
- Get Host information for your organization
- Create and manage Service Level Objectives
- Generate Security Monitoring signals

{{< h2 >}}Manage your account{{< /h2 >}}

You can also use the Datadog API to programatically manage your account:

- Users
- Roles
- Organizations
- Authentication
- Logs Restriction Queries
- Key Management
- Usage Metering
- IP Ranges

{{< h2 >}}Rate limiting{{< /h2 >}}

Some of the API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period we return an error.

For rate limited API endpoints we return headers so you can know how close you are to your limit. If you exceed your limit, review these headers to determine when you are able to try again.

Rate limits can be increased from defaults by [contacting the Datadog support team][7].

Regarding API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][8] for more info on how metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][9] based on your agreement.
- The rate limit for metric **retrieval** is `100` per hour per organization.
- The rate limit for event submission is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
- The rate limit for the [query_batch API][10] call is `600` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Query API][11] call is `300` per hour per organization. This can be extended on demand.
- The rate limit for the [graph_snapshot API][12] call is `60` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Configuration API][13] is `6000` per minute per organization. This can be extended on demand.

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |

[1]: /getting_started/api
[2]: https://brew.sh
[3]: /getting_started/agent/
[4]: /metrics/introduction/
[5]: /events/
[6]: /synthetics/
[7]: /help/
[8]: /api/v1/metrics/
[9]: /developers/metrics/custom_metrics/
[10]: /api/v1/metrics/#query-timeseries-points
[11]: /api/v1/logs/#get-a-list-of-logs
[12]: /api/v1/snapshots/
[13]: /api/v1/logs-indexes/
