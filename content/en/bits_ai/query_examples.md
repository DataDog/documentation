---
title: Example Natural Language Queries
disable_toc: false
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "bits_ai/getting_started"
  tag: "Documentation"
  text: "Get Started Using Bits AI"
- link: bits_ai/managing_incidents/"
  tag: "Documentation"
  text: "Managing Incidents"
---

## Overview

{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform" >}}
Natural language querying is in Preview. Fill out this form to join the wait list.
{{< /beta-callout >}} 

Bits AI enables natural language querying for service health and ownership of your services, and allows for retrieval of related Datadog resources. You can inquire about on-call personnel, dashboards, service status, and dependencies using natural language questions. In this guide, see example queries for:
- [Logs](#logs)
- [APM traces](#apm-traces)
- [Infrastructure data (DDSQL Editor)](#infrastructure-data-ddsql-editor)
- [Cloud cost](#cloud-cost)
- [RUM](#rum)

## Logs

`Find errors in AWS CloudTrail where a user is assuming a different user's role`:
{{< img src="bits_ai/query_examples/cloudtrail-user-role-errors.png" alt="Query result for user role changes" style="width:90%;">}}

`Create a pie chart of error logs by service`:
{{< img src="bits_ai/query_examples/logs-pie-chart.png" alt="Query result for a pie chart of error logs by service" style="width:90%;">}}

`Show me patterns of errors for users checking out`:
{{< img src="bits_ai/query_examples/checkout-error-patterns.png" alt="Query result for user checkout errors" style="width:90%;">}}

## APM traces

`Show me traces for web-store that are slower than 1s`:
{{< img src="bits_ai/query_examples/slow-web-store-traces.png" alt="Query result for slow traces" style="width:90%;">}}

## Infrastructure data (DDSQL Editor)

<div class="alert alert-info">Bits AI includes access to [DDSQL Editor][1], which is in Preview.</div>

Most Common Instance Types:
{{< img src="ddsql_editor/query-ui-overview.png" alt="Query result for most common instance types" style="width:90%;">}}

To learn more about querying infrastructure resource data in DDSQL Editor, see this [page][2]. 

## Cloud cost

`Show me how much each team spends on the web-store service`:
{{< img src="bits_ai/query_examples/web-store-spend-by-team.png" alt="Query result for service spend per team" style="width:90%;">}}

`AWS products with >5% increase in costs`:
{{< img src="bits_ai/query_examples/aws-product-cost-increase.png" alt="Query result for AWS products with an increase in costs" style="width:90%;">}}

## RUM

`Crashes in the iOS app over the past 1 week`:
{{< img src="bits_ai/query_examples/rum_ios_crashes_query.png" alt="Query result for iOS app crashes" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: https://docs.datadoghq.com/ddsql_editor/
