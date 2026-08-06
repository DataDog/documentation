---
title: Bits Chat
description: "Use Bits Chat in Datadog to explore and act on your observability data using natural language."
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/incident_response/incident_management/investigate/incident_ai"
  tag: "Documentation"
  text: "Coordinate incidents with Incident AI"
- link: "/cloud_cost_management/cloud_cost_skill/"
  tag: "Documentation"
  text: "Cloud Cost Skill in Bits Chat"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
aliases:
- /bits_ai/getting_started/
- /bits_ai/chat_with_bits_ai
- /bits_ai/bits_assistant/
- /tracing/guide/latency_investigator/
---

## Overview
Bits Chat helps you search and act across Datadog using natural language. Bits Chat is available across the web application, mobile app, and Slack.

Ask Bits Chat questions across these categories:

### Investigate issues and remediate
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explore and analyze telemetry
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Learn Datadog concepts and how-to
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Set up and optimize observability
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Full-page Bits Chat interface with suggested tasks" style="width:100%;">}}

### Permissions

#### Access to Bits Chat

To use Bits Chat, your role must have the **Bits Chat Access** permission. This permission is enabled by default for all three standard Datadog roles: Datadog Admin, Datadog Standard, and Datadog Read Only.

To manage this permission for custom roles, go to **Organization Settings** > **Roles**, select a role, and toggle **Bits Chat Access** under **General Permissions**.

#### Data access through Bits Chat

Bits Chat uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if your role restricts access to a specific set of logs indexes, Bits Chat can only query logs from those indexes. Similarly, if you do not have permission to edit a dashboard, Bits Chat cannot edit that dashboard on your behalf.

### Skills
Bits Chat has a range of specialized skills for tasks across Datadog. The most commonly used skills are described below.

#### Dashboards
Build [dashboards][5] and widgets from natural language descriptions.

Example prompts:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Notebooks
Create investigation [notebooks][6] and enhance existing ones with summaries and analysis.

Example prompts:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM

##### Trace analysis
Investigate an individual [trace][3] to diagnose what failed, where, and why.

Example prompts:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### Latency investigations
Investigate latency on a service to identify bottleneck resources and what changed in its slow traces.

Example prompts:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management
Investigate [cloud cost][4] changes and identify the teams or resources responsible. See [Cloud Cost Skill in Bits Chat][9].

Example prompts:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL
Generate and run [DDSQL][7] queries against Datadog [telemetry data][8] using natural language.

Example prompts:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Reports

The Bits Chat Reports page provides visibility into how your organization uses Bits Chat. Go to [**Bits AI** > **Chat** > **Reports**][10] to view:

- **Top users**: See which team members use Bits Chat the most, ranked by conversation count.
- **Usage trends**: Track conversation volume over time to understand adoption and identify usage patterns.
- **Conversation intent distribution**: See how conversations break down by intent category, such as investigating issues, exploring telemetry, learning Datadog concepts, and configuring observability.

Use these insights to understand adoption patterns, identify power users for best-practice sharing, and assess which use cases deliver the most value for your organization.

### Web application
There are multiple ways to open Bits Chat in the Datadog web application:
- Go to [Bits Chat][11].
- In the top-right of the navigation bar, click {{< ui >}}Ask Bits{{< /ui >}}.
- In a Datadog product integrated with Bits Chat, click {{< ui >}}Ask Bits{{< /ui >}} or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (the twinkling stars icon).
- Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- In the left-side navigation panel, click {{< ui >}}Bits AI{{< /ui >}}.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Bits Chat panel open alongside the Dashboards list" style="width:40%;">}}

### Mobile application

Ask Bits questions about your system or active incident. Bits has context on Datadog public documentation, telemetry, and ownership.

1. [Download the mobile app and log in][2].
2. On the home screen, tap {{< ui >}}Bits Chat{{< /ui >}}.
3. Start chatting with Bits Chat by voice or text.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

### Slack
1. [Connect your Datadog account to your Slack workspace][1].
1. In Slack, use the `/dd connect` command to display a list of accounts to connect to.
1. In the dropdown, choose the name of your Datadog account.
1. Authorize additional permissions needed by Bits AI.

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/?tab=applicationforslack
[2]: /mobile/#installing
[3]: /tracing/trace_explorer/
[4]: /cloud_cost_management/
[5]: /dashboards/
[6]: /notebooks/
[7]: /ddsql_editor/
[8]: /ddsql_reference/data_directory/
[9]: /cloud_cost_management/cloud_cost_skill/
[10]: https://app.datadoghq.com/ask/usage
[11]: https://app.datadoghq.com/ask
