---
title: Bits Assistant
description: "Use Bits Assistant in Datadog to explore and act on your observability data using natural language."
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/incident_response/incident_management/investigate/incident_ai"
  tag: "Documentation"
  text: "Coordinate incidents with Incident AI"
- link: "/cloud_cost_management/cloud_cost_skill/"
  tag: "Documentation"
  text: "Cloud Cost Skill in Bits Assistant"
aliases:
- /bits_ai/getting_started/
- /bits_ai/chat_with_bits_ai
---

{{< callout url="#" btn_hidden="true" header="Bits Assistant is in Preview" >}}
Fill out the [Preview form](https://www.datadoghq.com/product-preview/bits-assistant/) to get access to Bits Assistant.
{{< /callout >}}


## Overview
Bits Assistant is an AI-powered companion in Datadog that helps you search and act across Datadog using natural language. Bits Assistant is available across the web application, mobile app, and Slack.
Ask Bits Assistant questions like:
- `Summarize high severity incidents that have occurred in the last day`
- `Which services have the most errors right now?`
- `Show me what changed in alerts for the checkout service in the last 24 hours.`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `How do I configure log collection for the Datadog Agent?`
- `Do we already have monitors for high latency on the payments service?`
- `Summarize the key findings from Kubernetes overview dashboard.`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Full-page Bits Assistant interface showing conversation history and prompt suggestions" style="width:100%;">}}

### Permissions
To use Bits Assistant, your role must have the **Bits Assistant Access** permission.

Bits Assistant uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if you do not have permission to edit a dashboard, Bits Assistant cannot edit that dashboard on your behalf.

### Skills
Bits Assistant has skills that help with specialized tasks.

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
Investigate [cloud cost][4] changes and identify the teams or resources responsible. See [Cloud Cost Skill in Bits Assistant][9].

Example prompts:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL
Generate and run [DDSQL][7] queries against Datadog [telemetry data][8] using natural language. 

Example prompts:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Web application
There are multiple ways to open Bits Assistant in the Datadog web application:
- In the top-right of the navigation bar, click {{< ui >}}Ask Bits{{< /ui >}}
- In a Datadog product integrated with Bits Assistant, click {{< ui >}}Ask Bits{{< /ui >}} or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (the twinkling stars icon)
- Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>
- In the left-side navigation panel, click {{< ui >}}Bits AI{{< /ui >}}

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Bits Assistant side panel showing example prompts" style="width:40%;">}}

### Mobile application
<div class="alert alert-info">
Bits Assistant is available on iOS v5.8.4+.
</div>

1. [Download the mobile app and log in][2].
2. On the home screen, tap {{< ui >}}Bits Assistant{{< /ui >}}.
3. Start chatting with Bits Assistant in chat or voice mode.
{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

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
[2]: /mobile/?tab=ios#installing
[3]: /tracing/trace_explorer/
[4]: /cloud_cost_management/
[5]: /dashboards/
[6]: /notebooks/
[7]: /ddsql_editor/
[8]: /ddsql_reference/data_directory/
[9]: /cloud_cost_management/cloud_cost_skill/