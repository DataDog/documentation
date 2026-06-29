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
  - link: "https://www.datadoghq.com/blog/apm-recommendations"
    tag: "Blog"
    text: "Improve performance and reliability with APM Recommendations"
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
      recommendation_description: A backend application makes multiple calls to the same downstream API sequentially instead of executing them in parallel, unnecessarily increasing request latency and slowing overall service performance.
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
    - category: Performance
      recommendation_type: Unbalanced Read Load
      scope: Databases
      recommendation_description: A service is making read-only queries to a primary database instance when replicas are available. Routing these queries to replicas can reduce primary load and improve performance.
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
    - category: Reliability
      recommendation_type: Dependency Timeouts
      scope: Backend services
      recommendation_description: A backend application times out while calling a downstream dependency because the dependency responds too slowly, causing request failures that impact end users and increase the risk of cascading failures upstream.
      recommendation_prerequisite: APM + RUM
    - category: Performance
      recommendation_type: Missing Cache
      scope: Backend services
      recommendation_description: A service performs expensive, repeated work on the request path that could be served from a short-lived cache, reducing tail latency and downstream load.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Performance
      recommendation_type: Tail Latency
      scope: Backend services
      recommendation_description: A service exhibits extreme tail latency driven by slow downstream spans on the critical path, often from unbounded dependency latency or sequential calls that could run concurrently.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Performance
      recommendation_type: Excessive Serialization
      scope: Backend services
      recommendation_description: A service spends a significant share of request time on CPU-bound serialization or parsing work, adding avoidable latency and CPU overhead.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Performance
      recommendation_type: Unbounded Payload
      scope: Backend services
      recommendation_description: A service accepts request parameters without size or range bounds, allowing oversized inputs to drive expensive downstream work, tail latency, and timeouts.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Performance
      recommendation_type: Resource Contention
      scope: Backend services
      recommendation_description: Request handling is serialized behind a synchronization primitive or long-running critical section, causing tail latency under concurrency.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Reliability
      recommendation_type: Connection Pool Exhaustion
      scope: Backend services
      recommendation_description: A service repeatedly exhausts its connection pool to a downstream dependency, queueing requests and causing latency spikes or failures under load.
      recommendation_prerequisite: APM + AI Recs (Preview)
    - category: Reliability
      recommendation_type: Error Misclassification
      scope: Backend services
      recommendation_description: A service surfaces expected outcomes as errors in APM, inflating endpoint error rates and obscuring real reliability regressions.
      recommendation_prerequisite: APM + AI Recs (Preview)
---

APM Recommendations help you improve your applications' performance and reliability by surfacing optimization opportunities from your collected telemetry. These recommendations are designed to:

- Identify and resolve performance bottlenecks
- Improve service reliability and uptime
- Improve end-user experience

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="APM Recommendations page with summary cards for reliability and performance issues and a list of recommendations to review" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="Join the AI Recommendations Preview!" >}}
AI-driven recommendation types are now available, expanding the set of [optimization opportunities](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations) Datadog can detect.
{{< /callout >}}

## Prerequisites

Certain recommendations rely on specific Datadog products. Use the **Recommendation Prerequisite** dropdown to filter recommendations by the Datadog products in your setup.

If you plan to use [Bits Code][3] to implement recommendations, you must [complete its setup][4].

## How it works

Recommendations are based on data collected from different parts of your stack:

- Distributed traces from Application Performance Monitoring (APM)
- Database telemetry from Database Monitoring (DBM)
- Sessions and user journeys from Real User Monitoring (RUM)

Datadog correlates these sources to identify opportunities to improve performance, reliability, and user experience.

Datadog ranks recommendations by computing a priority score that weighs the potential impact of an issue against telemetry signals, such as relative request volume and performance trends. The most critical insights for improving service reliability and performance appear first.

## Using recommendations

To review recommendations that need your attention:

1. Go to [**APM** > **Recommendations**][1].
2. Filter your recommendations by status or type.
3. Select a recommendation from the list to see a detailed description of the issue.
4. Review the problem, impact, and Datadog's recommendation for resolving it.
5. (Optional) To use [Bits Code][3] to generate a code fix, under **Next Steps**, click **Fix with Bits**.
6. (Optional) To track the fix in Jira or Case Management, under **Triage**, click **Add Jira Ticket** or **Add Case**.

After you've reviewed the recommendation, you can use the **FOR REVIEW** dropdown to change the recommendation status to **REVIEWED**, **IGNORED**, or **RESOLVED**.

## Supported recommendations

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**Note**: If you use both APM and Database Monitoring (DBM), you may see fewer Missing Index recommendations here than on the [DBM Recommendations page][2]. APM Recommendations only surface Missing Index issues that Datadog can associate with an instrumented application service. Missing Index recommendations that cannot be linked to a specific service appear only in DBM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /database_monitoring/recommendations/
[3]: /bits_ai/bits_code/
[4]: /bits_ai/bits_code/setup/
