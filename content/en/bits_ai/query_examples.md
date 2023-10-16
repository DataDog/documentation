---
title: Example Natural Language Queries
kind: guide
disable_toc: false
private: true
is_beta: true
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSd2kcOeLhEX0GSwUIMQyFjRCRirU-vpsJTOx7SykDkxy-MW9w/viewform" >}}
Bits AI is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

{{< whatsnext desc="For instructions on running natural language queries in Datadog, see:">}}
    {{< nextlink href="bits_ai/getting_started/#in-the-chat-panel" >}}Querying in the chat panel{{< /nextlink >}}
    {{< nextlink href="bits_ai/getting_started/#in-a-search-bar" >}}Querying in a search bar{{< /nextlink >}}
{{< /whatsnext >}}

## Logs
You can query your logs in natural language from the Logs Explorer search bar.

`Find errors in AWS CloudTrail where a user is assuming a different user's role`:
{{< img src="bits_ai/cloudtrail-user-role-errors.png" alt="Query result for user role changes" style="width:100%;">}}

`Create a pie chart of error logs by service`:
{{< img src="bits_ai/logs-pie-chart.png" alt="Query result for a pie chart of error logs by service" style="width:100%;">}}

`Show me patterns of errors for users checking out`:
{{< img src="bits_ai/checkout-error-patterns.png" alt="Query result for user checkout errors" style="width:100%;">}}

## APM traces

To query APM traces, use the chat panel.

`Show me traces for web-store that are slower than 1s`:
{{< img src="bits_ai/slow-web-store-traces.png" alt="Query result for slow traces" style="width:100%;">}}

## Infrastructure data (Inventories SQL)

<div class="alert alert-info">Bits AI includes access to Inventories SQL, which is in private beta.</div>

Infrastructure resource data can be queried in natural language from the search bar of [Inventories SQL][3], a centralized interface for infrastructure resource data. You can also use the chat panel to query infrastructure data from anywhere in Datadog.

`How many hosts am I running by availability zone?`:
{{< img src="bits_ai/hosts-by-az.png" alt="Query result for host count by availability zone" style="width:100%;">}}

`Show me the security groups open to the Internet`:
{{< img src="bits_ai/open-security-groups.png" alt="Query result for exposed security groups" style="width:100%;">}}

## Cloud cost

Natural language querying of cloud cost is available through the in-product search bar or the chat panel.

`Show me how much each team spends on the web-store service`:
{{< img src="bits_ai/web-store-spend-by-team.png" alt="Query result for service spend per team" style="width:100%;">}}

`AWS products with >5% increase in costs`:
{{< img src="bits_ai/aws-product-cost-increase.png" alt="Query result for AWS products with an increase in costs" style="width:100%;">}}

{{< whatsnext desc="Additional Bits AI documentation:">}}
    {{< nextlink href="bits_ai/" >}}Feature Overview{{< /nextlink >}}
    {{< nextlink href="bits_ai/getting_started" >}}Getting Started{{< /nextlink >}}
    {{< nextlink href="bits_ai/managing_incidents/" >}}Managing Incidents{{< /nextlink >}}
{{< /whatsnext >}}

[3]: https://app.datadoghq.com/inventories/sql