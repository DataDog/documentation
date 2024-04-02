---
title: Example Natural Language Queries
kind: guide
disable_toc: false
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Feature Overview"
- link: "bits_ai/getting_started"
  tag: "Documentation"
  text: "Get Started Using Bits AI"
- link: bits_ai/managing_incidents/"
  tag: "Documentation"
  text: "Managing Incidents"
---

## Logs

`Find errors in AWS CloudTrail where a user is assuming a different user's role`:
{{< img src="bits_ai/query_examples/cloudtrail-user-role-errors.png" alt="Query result for user role changes" style="width:100%;">}}

`Create a pie chart of error logs by service`:
{{< img src="bits_ai/query_examples/logs-pie-chart.png" alt="Query result for a pie chart of error logs by service" style="width:100%;">}}

`Show me patterns of errors for users checking out`:
{{< img src="bits_ai/query_examples/checkout-error-patterns.png" alt="Query result for user checkout errors" style="width:100%;">}}

## APM traces

`Show me traces for web-store that are slower than 1s`:
{{< img src="bits_ai/query_examples/slow-web-store-traces.png" alt="Query result for slow traces" style="width:100%;">}}

## Infrastructure data (Inventories SQL)

<div class="alert alert-info">Bits AI includes access to Inventories SQL, which is in private beta.</div>

Infrastructure resource data can be queried in [Inventories SQL][1].

`How many hosts am I running by availability zone?`:
{{< img src="bits_ai/query_examples/hosts-by-az.png" alt="Query result for host count by availability zone" style="width:100%;">}}

`Show me the security groups open to the Internet`:
{{< img src="bits_ai/query_examples/open-security-groups.png" alt="Query result for exposed security groups" style="width:100%;">}}

## Cloud cost

`Show me how much each team spends on the web-store service`:
{{< img src="bits_ai/query_examples/web-store-spend-by-team.png" alt="Query result for service spend per team" style="width:100%;">}}

`AWS products with >5% increase in costs`:
{{< img src="bits_ai/query_examples/aws-product-cost-increase.png" alt="Query result for AWS products with an increase in costs" style="width:100%;">}}

## RUM

`Crashes in the iOS app over the past 1 week`:
{{< img src="bits_ai/query_examples/rum_ios_crashes_query.png" alt="Query result for iOS app crashes" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/inventories/sql