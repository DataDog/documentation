---
title: APM Recommendations
description: Learn how to optimize your application's performance and reliability with APM Recommendations.
algolia:
  tags:
    - apm recommendations
    - apm recommendation
    - application performance monitoring
    - performance recommendations
    - reliability recommendations
    - tracing
site_support_id: apm_recommendations
further_reading:
  - link: "/tracing/"
    tag: "Documentation"
    text: "Learn about Application Performance Monitoring (APM)"
  - link: "/tracing/guide/apm_dashboard/"
    tag: "Documentation"
    text: "APM Dashboard Guide"
  - link: "/cloud_cost_management/recommendations/"
    tag: "Documentation"
    text: "Cloud Cost Recommendations"
  - link: "/database_monitoring/recommendations/"
    tag: "Documentation"
    text: "DBM Recommendations"
  - link: "https://www.datadoghq.com/blog/proactive-app-recommendations/"
    tag: "Blog"
    text: "Improve performance and reliability with Proactive App Recommendations"

multifiltersearch:
  # "id" must match the corresponding key in the "data" object
  headers:
    - name: Recommendation Category
      id: category
      filter_by: true
    - name: Recommendation Type
      id: recommendation_type
      filter_by: true
    - name: Scope of Recommendation
      id: scope
      filter_by: true
    - name: Recommendation Description
      id: recommendation_description
    - name: Recommendation Prerequisite
      id: recommendation_prerequisite
      filter_by: true
  data:
    - category: Performance
      recommendation_type: N+1 Queries on Database
      scope: Backend services
      recommendation_description: A backend application calls the same database sequentially instead of batching queries.
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Repeated Sequential API calls
      scope: Backend services
      recommendation_description: A backend application repeatedly retries failing API calls without sufficient backoff, increasing system load and masking underlying reliability issues.
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Persistent Retries
      scope: Backend services
      recommendation_description: A backend application issues an excessive number of retry attempts when calling a downstream API, extending request duration and risking cascading failures under strain.
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Missing index
      scope: Databases
      recommendation_description: The query's execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query.
      recommendation_prerequisite: APM + DBM
    - category: Reliability
      recommendation_type: Aggressive Retries
      scope: Backend services
      recommendation_description: A backend application triggers rapid-fire retry attempts without adequate backoff, sustaining high pressure on struggling dependencies and risking prolonged outages by preventing system recovery during transient failures.
      recommendation_prerequisite: APM
    - category: Reliability
      recommendation_type: High Exception Volumes
      scope: Backend services
      recommendation_description: A backend application is throwing a high number of exceptions as control-flow, adding CPU and memory overhead.
      recommendation_prerequisite: APM + Continuous Profiler

---

APM Recommendations help you improve your applications' performance and reliability by surfacing optimization opportunities from your collected telemetry. These recommendations are designed to:

- Identify and resolve performance bottlenecks
- Improve service reliability and uptime
- Improve end-user experience

{{< img src="/tracing/recommendations/apm_recommendations-2.png" alt="APM Recommendations page showing a list of recommendations with filters for status and type" style="width:100%;" >}}

## Prerequisites

Certain recommendations rely on specific Datadog products. Use the **Recommendation Prerequisite** dropdown to filter recommendations by the Datadog products in your setup.

## How it works

APM Recommendations are based on data collected from different parts of your stack:

- Distributed traces from Application Performance Monitoring (APM)
- Database telemetry from Database Monitoring (DBM)
- Sessions and user journeys from Real User Monitoring (RUM)

Datadog correlates these sources to identify opportunities to improve performance, reliability, and user experience.

Datadog ranks recommendations by computing a priority score that weighs the potential impact of an issue against telemetry signals, such as relative request volume and performance trends. The most critical insights for improving service reliability and performance appear first.

## Using APM recommendations

To review recommendations that need your attention:

1. Go to [**APM** > **Recommendations**][1].
2. Filter your recommendations by status or type.
3. Select a recommendation from the list to see a detailed description of the issue.
4. Review the problem, impact, and Datadog's recommendation for resolving it.

After you've reviewed the recommendation, you can use the **FOR REVIEW** dropdown to change the recommendation status to *Reviewed*, *Ignored*, or *Resolved*. Alternatively, you can assign the recommendation to an owner and track related work in Case Management or Jira.

## Supported recommendations

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**Note**: If you use both APM and Database Monitoring (DBM), you may see fewer Missing Index recommendations here than on the [DBM Recommendations page][2]. APM Recommendations only surface Missing Index issues that Datadog can associate with an instrumented application service. Missing Index recommendations that cannot be linked to a specific service appear only in DBM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /database_monitoring/recommendations/
