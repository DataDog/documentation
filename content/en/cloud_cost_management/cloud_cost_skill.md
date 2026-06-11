---
title: Cloud Cost Skill in Bits Chat
description: Use the Cloud Cost skill in Bits Chat to investigate, explain, and share cloud cost findings.
algolia:
  tags: ["cloud cost", "cloud cost management", "ccm", "finops", "cloud cost skill", "bits ai assistant", "bits assistant", "mcp"]
  rank: 75
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/mcp_server/"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/cloud_cost_management/reporting/explorer/"
  tag: "Documentation"
  text: "Cost Explorer"
- link: "/cloud_cost_management/planning/budgets/"
  tag: "Documentation"
  text: "Budgets"
---

## Overview

The Cloud Cost skill is the Cloud Cost Management analysis workflow in [Bits Chat][1]. It is designed for FinOps tasks, such as root cause analysis, budget tracking, and answering general cost questions. For example, you can ask Bits Chat to:

- Investigate [cost monitor alerts][2], [cost anomalies][3], and [cost changes][4]
- Identify teams, services, accounts, regions, or resources driving spend
- Answer ad hoc questions about cloud, SaaS, custom, or Datadog costs
- Compare actual spend and forecasts against [budgets][5]
- Correlate cost changes with observability metrics, such as CPU, memory, request volume, or storage size
- Create [Notebooks][15] that capture an investigation for handoff or future reference

## Prerequisites

To use the Cloud Cost skill in Bits Chat, you must:

- [Set up Cloud Cost Management][6] for the cost sources you want to analyze
- Have these permissions:
  - [Bits Chat Access][7] permission
  - [Cloud Cost Management permissions][8] for the data you ask about
  - (Optional) [Notebook permissions][9], if you want to create or edit investigation [Notebooks][15]

## Start an investigation with the Cloud Cost skill

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="Cost anomalies graphs showing the Investigate with Bits AI button in each graph." style="width:80%;" >}}

When you want to start an investigation, such as for a [cost anomaly][3], click {{< ui >}}Investigate{{< /ui >}} or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (the twinkling stars icon) to open the Cloud Cost skill.

Alternatively, you can click {{< ui >}}Ask Bits{{< /ui >}} on the top right of the navigation bar on any Datadog page to open Bits Chat and ask a cost question.

Example prompts:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

### Cost change investigations

When you investigate a cost change with the Cloud Cost skill, Bits Chat provides a concise summary, then asks what you want to explore next. The initial analysis typically includes:

- A daily cost chart for the baseline and investigation periods
- The baseline period, investigation period, total dollar amount and percentage change, and projected annual impact when applicable
- Rate-versus-usage context to help distinguish price changes from consumption changes
- Owner or team attribution based on your cost tags

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Bits Chat's investigation summary showing an initial analysis." style="width:60%;" >}}

After the initial summary, Bits Chat can:

- Find the top services, accounts, regions, resources, or tags driving the change
- Correlate the cost change with metrics such as CPU requests, memory requests, request count, bucket size, or database usage
- Find related budgets and compare actual or forecasted spend against budget targets
- Create a Datadog Notebook for the team that owns the service to confirm and act on findings
- Capture the investigation for your records in a Notebook

### Budgets and forecasting

After setting up [Budgets][5], use the Cloud Cost skill in Bits Chat to explain budget status and spending. Bits Chat can help summarize:

- Actual spend versus budgeted amount
- Forecasted spend versus budgeted amount
- Which cost scope a budget covers, based on the budget's filters
- Which budget entries, teams, services, or providers are contributing to an overage

After the initial summary, Bits Chat can:

- Find the top services, accounts, regions, resources, or tags driving spending
- Identify the teams that own the resources contributing to the cost change
- Update your budget
- Capture the investigation for your records in a Notebook

## Use the Datadog MCP Server for cost analysis

The [Datadog MCP Server][10] lets external AI agents query Datadog data. This is useful when you want to ask cost questions from an IDE, terminal-based assistant, or custom AI workflow.

To use an external AI agent, [set up the Datadog MCP Server][11]. If your MCP client filters toolsets, include the `core` toolset to use the metric tools that can query Cloud Cost Management data.

Cloud Cost Management data is available through the core metric tools:

| MCP tool                          | Usage                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | Query cost metrics, compare periods, and group costs by provider, service, team, account, resource, or tag. |
| [`get_datadog_metric_context`][13] | Discover metadata, available tag keys, and tag values for a cost metric before querying it.               |

Ask your agent to set `use_cloud_cost` to `true` for Cloud Cost Management metrics, such as `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*`, or `datadog.cost.*`. For observability metrics that explain a cost change, such as Kubernetes CPU or S3 bucket size, use the standard metric query behavior.

Example prompts for MCP-connected agents:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

For connection instructions, supported clients, and toolset configuration, see [Set Up the Datadog MCP Server][11]. For the full MCP tool reference, see [Datadog MCP Server Tools][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: https://app.datadoghq.com/cost/monitor/monitors
[3]: https://app.datadoghq.com/cost/monitor/anomalies
[4]: https://app.datadoghq.com/cost/summarize/overview
[5]: https://app.datadoghq.com/cost/plan/budgets
[6]: /cloud_cost_management/setup/
[7]: /account_management/rbac/permissions/#bits-assistant
[8]: /cloud_cost_management/setup/permissions/
[9]: /account_management/rbac/permissions/#notebooks
[10]: /mcp_server/
[11]: /mcp_server/setup/
[12]: /mcp_server/tools/#get_datadog_metric
[13]: /mcp_server/tools/#get_datadog_metric_context
[14]: /mcp_server/tools/
[15]: /notebooks/
