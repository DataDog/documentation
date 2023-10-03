---
title: Example Natural Language Queries
kind: guide
disable_toc: false
private: true
is_beta: true
---

{{< whatsnext desc="For instructions on running natural language queries in Datadog, see:">}}
    {{< nextlink href="bits_ai/getting_started/#in-the-chat-panel" >}}Querying in the chat panel{{< /nextlink >}}
    {{< nextlink href="bits_ai/getting_started/#in-a-search-bar" >}}Querying in a search bar{{< /nextlink >}}
{{< /whatsnext >}}

## Logs
You can query your logs in natural language from the Logs Explorer search bar.

- "Find errors in AWS CloudTrail where a user is assuming a different user's role"
{{< img src="bits_ai/cloudtrail-user-role-errors.png" alt="Screenshot of query result" style="width:90%;">}}
- "Create a pie chart of error logs by service"
{{< img src="bits_ai/logs-pie-chart.png" alt="Screenshot of query result" style="width:90%;">}}
- "Show me patterns of errors for users checking out"
{{< img src="bits_ai/checkout-error-patterns.png" alt="Screenshot of query result" style="width:90%;">}}

## APM traces

To query APM traces, use the chat panel.

Examples:
- "Show me traces for web-store that are slower than 1s"
{{< img src="bits_ai/slow-web-store-traces.png" alt="Screenshot of query result" style="width:90%;">}}

## Infrastructure data (Inventories SQL)

Infrastructure resource data can be queried in natural language from the search bar of [Inventories SQL][3], a centralized interface for infrastructure resource data. You can also use the chat panel to query infrastructure data from anywhere in Datadog.

Examples:
- "How many hosts am I running by availability zone?"
{{< img src="bits_ai/hosts-by-az.png" alt="Screenshot of query result" style="width:90%;">}}
- "Show me the security groups open to the Internet"
{{< img src="bits_ai/open-security-groups.png" alt="Screenshot of query result" style="width:90%;">}}

## Cloud cost

Natural language querying of cloud cost is available through the in-product search bar or the chat panel.

Examples:
- "Show me how much each team spends on the web-store service"
{{< img src="bits_ai/web-store-spend-by-team.png" alt="Screenshot of query result" style="width:90%;">}}
- "AWS products with >5% increase in costs"
{{< img src="bits_ai/aws-product-cost-increase.png" alt="Screenshot of query result" style="width:90%;">}}

[3]: https://app.datadoghq.com/inventories/sql