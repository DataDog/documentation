---
title: API Reference V1
type: api
---

{{< h2 >}}API Reference V1{{< /h2 >}}

Use the Datadog HTTP API to programmatically access the Datadog platform. The Datadog API uses resource-oriented URLs, uses status codes to indicate the success or failure of requests and returns JSON from all requests.

**To get started on the Datadog HTTP API, use the following flow to determine which endpoints you need and checkout our [Datadog Postman collection][1].**


**Note**: cURL code examples assume usage of BASH and GNU coreutils. On macOS you can install coreutils via the [Homebrew package manager][2]: `brew install coreutils`

{{< img src="api/api-flow.png" alt="Flow through Datadog" responsive="true" style="width:100%;">}}
{{< h2 >}}Install the Datadog Agent{{< /h2 >}}

Before you can use the API to send or view data, you need to [install the Datadog Agent][3]. The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. 

{{< h2 >}}Send data to Datadog{{< /h2 >}}

Once you have the Datadog Agent set up, use the API to begin to send integrations data to Datadog. With some additional setup of the Agent, you can also use the API to send Synthetics, Logs and Traces to Datadog.

**Integrations endpoints**

Available intgrations endpoints:

- [AWS Integration][4]
- [AWS Logs Integration][5]
- [Azure Integration][6]
- [GCP Integration][7]
- [Slack Integration][8]
- [PagerDuty Integration][9]
- [Webhooks Integration][10]

**Platform endpoints**

Use these endpoints to post and fetch data to and from other parts of the Datadog platform: 

- The [metrics][11] endpoints allow you to post [metrics][12] data so it can be graphed on Datadog’s dashboards and query metrics from any time period
- The [events][13] endpoints allow you to post and fetch events to and from the [Datadog event stream][14].
- Use the [Synthetics][15] endpoints to create, start, stop and see [Synthetics tests][16] results.
- Use the [Tracing Agent API][17] to send traces to your Datadog Agent, which then forwards them to Datadog.

{{< h2 >}}Visualize your data{{< /h2 >}}

Once you are sending data to Datadog, you can use the API to programatically build data visualizations:

- Build [Dashboards][18] and view [Dashboard Lists][19]
- Manage [host tags][20]
- Create [Embeddable Graphs][21]
- Take a [graph snapshot][22]
- [Service Dependencies][23] - see a list of your APM services and their dependencies
- Create [Monitors][24]
- [Service Checks][25] - post check statuses for use with monitors
- Create and manage [Logs][26], [Logs Indexes][27], and [Logs Pipelines][28]
- Get [Host][20] information for your organization
- Create and manage [Service Level Objectives][29]
- Generate [Security Monitoring][30] signals

{{< h2 >}}Manage your account{{< /h2 >}}

You can also use the Datadog API to programatically manage your account:

- Manage [Users][31]
- Manage [Roles][32]
- Manage your [Organization][33]
- Veirfy API and app keys with the [Authentication][34] endpoint
- Grant specific logs access with the [Logs Restriction Queries][35]
- Manage existing keys with [Key Management][36]
- Get get hourly, daily, and monthly usage across multiple facets of Datadog with the [Usage Metering][37] endpoints
- See the list of IP prefixes belonging to Datadog with[IP Ranges][38]

{{< h2 >}}Rate limiting{{< /h2 >}}

Some of the API endpoints are rate limited. Once you exceed a certain number of requests in a certain time period an error is returned.

Headers are returned for rate limited API endpoints so you can know how close you are to your limit. If you exceed your limit, review these headers to determine when you are able to try again.

Rate limits can be increased from defaults by [contacting the Datadog support team][39].

Regarding API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][11] for more info on how metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][40] based on your agreement.
- The rate limit for metric **retrieval** is `100` per hour per organization.
- The rate limit for event submission is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
- The rate limit for the [Query a Timeseries API][41] call is `600` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Query API][42] call is `300` per hour per organization. This can be extended on demand.
- The rate limit for the [Graph a Snapshot API][22] call is `60` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Configuration API][27] is `6000` per minute per organization. This can be extended on demand.

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |

[1]: /getting_started/api
[2]: https://brew.sh
[3]: /getting_started/agent/
[4]: /api/v1/aws-integration/
[5]: /api/v1/aws-logs-integration/
[6]: /api/v1/azure-integration/
[7]: /api/v1/gcp-integration/
[8]: /api/v1/slack-integration/
[9]: /api/v1/pagerduty-integration/
[10]: /api/v1/webhooks-integration/
[11]: /api/v1/metrics/
[12]: /metrics/introduction/
[13]: /api/v1/events/
[14]: /events/
[15]: /api/v1/synthetics/
[16]: /synthetics/
[17]: /api/v1/tracing/
[18]: /api/v1/dashboards/
[19]: /api/v1/dashboard-lists/
[20]: /api/v1/hosts/
[21]: /api/v1/embeddable-graphs/
[22]: /api/v1/snapshots/
[23]: /api/v1/service-dependencies/
[24]: /api/v1/monitors/
[25]: /api/v1/service-checks/
[26]: /api/v1/logs/
[27]: /api/v1/logs-indexes/
[28]: /api/v1/logs-pipelines/
[29]: /api/v1/service-level-objectives/
[30]: /api/v2/security-monitoring/
[31]: /api/v1/users/
[32]: /api/v1/roles/
[33]: /api/v1/organizations/
[34]: /api/v1/authentication/
[35]: /api/v2/logs-restriction-queries/
[36]: /api/v1/key-management/
[37]: /api/v1/usage-metering/
[38]: /api/v1/ip-ranges/
[39]: /help/
[40]: /developers/metrics/custom_metrics/
[41]: /api/v1/metrics/#query-timeseries-points
[42]: /api/v1/logs/#get-a-list-of-logs
