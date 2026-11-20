---
title: Using the API
type: api
---

{{< h2 >}}Using the API{{< /h2 >}}

Use the Datadog HTTP API to access the Datadog platform programmatically. You can use the API to send data to Datadog, build data visualizations, and manage your account.

{{< h2 >}}Send data to Datadog{{< /h2 >}}

Use the API to begin to send integrations data to Datadog. With some additional setup of the Agent, you can also use the API to send Synthetic test data, Logs, and Traces to Datadog.

**Integrations endpoints**

Available integrations endpoints:

- [AWS Integration][1]
- [AWS Logs Integration][2]
- [Azure Integration][3]
- [Google Cloud Integration][4]
- [Slack Integration][5]
- [PagerDuty Integration][6]
- [Webhooks Integration][7]

**Platform endpoints**

Use these endpoints to post and fetch data to and from other parts of the Datadog platform: 

- The [metrics][8] endpoints allow you to post [metrics][9] data so it can be graphed on Datadog's dashboards and query metrics from any time period.
- The [events][10] endpoints allow you to post and fetch events to and from the [Datadog event explorer][11].
- Use the [Synthetic Monitoring][12] endpoints to create, start, stop, and see [Synthetic tests][13] results.
- Use the [Tracing Agent API][14] to send traces to your Datadog Agent, which then forwards them to Datadog.

{{< h2 >}}Visualize your data{{< /h2 >}}

Once you are sending data to Datadog, you can use the API to build data visualizations programmatically:

- Build [Dashboards][15] and view [Dashboard Lists][16]
- Manage [host tags][17]
- Create [Embeddable Graphs][18]
- Take a [graph snapshot][19]
- [Service Dependencies][20] - see a list of your APM services and their dependencies
- Create [Monitors][21]
- [Service Checks][22] - post check statuses for use with monitors
- Create and manage [Logs][23], [Logs Indexes][24], and [Logs Pipelines][25]
- Get [Host][17] information for your organization
- Create and manage [Service Level Objectives][26]
- Generate [Security Monitoring][27] signals

{{< h2 >}}Manage your account{{< /h2 >}}

You can also use the Datadog API to manage your account programmatically:

- Manage [Users][28]
- Manage [Roles][29]
- Manage your [Organization][30]
- Verify API and app keys with the [Authentication][31] endpoint
- Grant specific logs access with the [Logs Restriction Queries][32]
- Manage existing keys with [Key Management][33]
- Get hourly, daily, and monthly usage across multiple facets of Datadog with the [Usage Metering][34] endpoints
- See the list of IP prefixes belonging to Datadog with [IP Ranges][35]


[1]: /api/v1/aws-integration/
[2]: /api/v1/aws-logs-integration/
[3]: /api/v1/azure-integration/
[4]: /api/v1/gcp-integration/
[5]: /api/v1/slack-integration/
[6]: /api/v1/pagerduty-integration/
[7]: /api/v1/webhooks-integration/
[8]: /api/v1/metrics/
[9]: /metrics/introduction/
[10]: /api/v1/events/
[11]: /events/
[12]: /api/v1/synthetics/
[13]: /synthetics/
[14]: /tracing/guide/send_traces_to_agent_by_api/
[15]: /api/v1/dashboards/
[16]: /api/v1/dashboard-lists/
[17]: /api/v1/hosts/
[18]: /api/v1/embeddable-graphs/
[19]: /api/v1/snapshots/
[20]: /api/v1/service-dependencies/
[21]: /api/v1/monitors/
[22]: /api/v1/service-checks/
[23]: /api/v1/logs/
[24]: /api/v1/logs-indexes/
[25]: /api/v1/logs-pipelines/
[26]: /api/v1/service-level-objectives/
[27]: /api/v2/security-monitoring/
[28]: /api/v1/users/
[29]: /api/v1/roles/
[30]: /api/v1/organizations/
[31]: /api/v1/authentication/
[32]: /api/v2/logs-restriction-queries/
[33]: /api/v1/key-management/
[34]: /api/v1/usage-metering/
[35]: /api/v1/ip-ranges/
