---
title: AI and Cloud Cost Management
description: Use Bits AI and the Datadog MCP Server to investigate, analyze, and query cloud cost data.
further_reading:
- link: "/cloud_cost_management/cost_changes/monitors"
  tag: "Documentation"
  text: "Create a Cloud Cost monitor"
- link: "/cloud_cost_management/cost_changes/anomalies"
  tag: "Documentation"
  text: "Detect cost anomalies"
- link: "/bits_ai/bits_assistant"
  tag: "Documentation"
  text: "Learn about Bits Assistant"
- link: "/bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
---

{{< callout header="Join the Preview!">}}
AI features for Cloud Cost Management are in Preview.
{{< /callout >}}

## Overview

Cloud Cost Management integrates with [Bits AI][1] and the [Datadog MCP Server][2] to help you investigate cost changes, identify cost drivers, and query cost data using natural language.

## Cost investigation

Cost investigation uses Bits AI to automatically analyze cost changes and deliver root cause analysis. When cloud costs spike unexpectedly, the agent investigates the change by comparing time periods, identifying cost drivers, attributing ownership, and correlating with infrastructure metrics—all through a conversational interface.

Instead of manually exploring cost data across multiple pages, ask Bits AI a question like *"Why did my EC2 costs increase last week?"* and receive a structured analysis that includes:

- The total cost change in dollars and percentage
- Which services, accounts, or resources are driving the change
- Whether the change is caused by rate (pricing) changes or usage (volume) changes
- Which team or owner is responsible
- Whether the change is likely temporary or permanent
- Correlated infrastructure metrics such as CPU and memory utilization

### Prerequisites

- [Cloud Cost Management][3] is configured for at least one cloud provider (AWS, Azure, Google Cloud, or Oracle) or SaaS integration.
- The **Bits Assistant Access** permission is enabled for your Datadog role. See [Organization Settings][4] to manage permissions.

### Start a cost investigation

Start an investigation from any surface where [Bits Assistant][1] is available, including the web app, Slack, and mobile. You can also launch investigations directly from:

- The [**Cost Monitors**][5] page: click **Investigate** on a triggered monitor.
- The [**Cost Anomalies**][6] page: click **Investigate** on a detected anomaly.

Example prompts:
- `Why did my AWS costs increase between January and February?`
- `What's driving the spike in S3 storage costs this month?`
- `Which teams are responsible for the highest EC2 costs?`
- `What caused the budget overrun for our data-platform team?`

### How cost investigation works

When you ask a cost-related question, Bits AI performs a structured analysis:

1. **Establish time periods**: Determines appropriate baseline and investigation periods for comparison, accounting for cloud billing data delays (typically 24–48 hours).
2. **Quantify the cost change**: Calculates the total cost change between periods, including absolute dollar change, percentage change, daily averages, and projected annual impact.
3. **Identify cost drivers**: Breaks down the cost change by dimensions such as service, account, region, and instance type. For AWS costs, it further decomposes changes into **rate** (unit price) versus **usage** (volume) components.
4. **Attribute ownership**: Uses your organization's [tag pipelines][7] and preferred tags to identify which team, cost center, or owner is responsible.
5. **Correlate with infrastructure metrics**: Connects cost data with observability metrics—such as CPU utilization, memory usage, and request counts—to determine whether a cost increase is justified by changes in workload.
6. **Assess permanence**: Evaluates whether the cost change is likely **temporary** (migration, load test, incident) or **permanent** (new feature launch, sustained traffic growth, architecture change).
7. **Deliver findings**: Presents a structured summary with all findings. You can ask follow-up questions to dig deeper into any aspect of the analysis.

### Save and share investigations

After an investigation, ask Bits AI to save the results to a [Datadog Notebook][8]. The notebook includes a summary of findings, cost impact breakdown with embedded metric graphs, and infrastructure utilization data. Share the notebook with engineering teams to hand off cost optimization actions.

Example prompt: `Save this investigation to a notebook so I can share it with the platform team`

### Supported data sources

Cost investigation supports all Cloud Cost Management data sources, including AWS, Azure, Google Cloud, Oracle, SaaS cost integrations, and Datadog costs.

<div class="alert alert-info">Rate versus usage decomposition is available for AWS costs only.</div>

## Datadog MCP Server

The [Datadog MCP Server][2] provides cloud cost querying capabilities to external AI agents such as Cursor, Claude Code, and other MCP-compatible clients. Two core tools support Cloud Cost Management data:

### `get_datadog_metric`

Queries cloud cost metrics by setting `use_cloud_cost` to `true`. This flag is required for all cost metric queries—without it, queries return no data.

Example prompts:
- `How much did my cloud costs change from January to February?`
- `Show me daily AWS costs for the last 30 days grouped by service`
- `What are my S3 storage costs in the us-east-1 region?`

### `get_datadog_metric_context`

Retrieves available tags and tag values for a cloud cost metric by setting `use_cloud_cost` to `true`. Use this to discover which dimensions (such as service, account, region, or team) are available for filtering and grouping cost queries.

Example prompts:
- `What tags are available on the AWS cost metric?`
- `Show me all possible values for the team tag on cloud costs`

For setup instructions and the full list of available tools, see [Set Up the Datadog MCP Server][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/mcp_server/
[3]: /cloud_cost_management/
[4]: /account_management/rbac/permissions/
[5]: https://app.datadoghq.com/cost/analyze/monitors
[6]: https://app.datadoghq.com/cost/analyze/anomalies
[7]: /cloud_cost_management/allocation/tag_pipelines/
[8]: /notebooks/
[9]: /bits_ai/mcp_server/setup/
