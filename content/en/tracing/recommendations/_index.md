---
title: APM Recommendations
description: Learn how to optimize your application's performance and reliability with APM Recommendations.
algolia:
  tags:
    - apm recommendations
    - apm recommendation
    - rum recommendation
    - rum recommendations
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
    - category: User experience
      recommendation_type: User frustration action
      scope: Browser applications
      recommendation_description: Common rage or dead actions are detected on elements on a page signaling misleading UI or broken elements.
      recommendation_prerequisite: RUM
    - category: User experience
      recommendation_type: Unoptimized bundle size
      scope: Browser applications and web views on mobile applications
      recommendation_description: Large JS resources causing delays in the initial page render signaling misleading UI or broken elements.
      recommendation_prerequisite: RUM
    - category: Reliability
      recommendation_type: High Exception Volumes
      scope: Backend services
      recommendation_description: A backend application is throwing a high number of exceptions as control-flow, adding CPU and memory overhead.
      recommendation_prerequisite: APM + Continuous Profiler

---

{{< callout url="https://www.datadoghq.com/product-preview/apm-proactive-recommendations/" >}}
APM Recommendations are in Preview. Features and recommendations may change before general availability. To request access, fill out this form.
{{< /callout >}}

APM Recommendations help you improve your applications' performance and reliability by providing optimization opportunities based on the telemetry collected on your applications. These recommendations are designed to:

- Identify and resolve performance bottlenecks
- Improve service reliability and uptime
- Reduce error rates and improve end-user experience

{{< img src="/tracing/recommendations/apm_recommendations.png" alt="Your image description" style="width:100%;" >}}

## Prerequisites

Certain recommendations rely on specific Datadog products. Use the **Recommendation Prerequisite** dropdown to filter for the recommendations you can expect to see based on your specific setup.

## How it works

APM Recommendations are based on data collected from different parts of your stack:

- Sessions and user journeys from Real User Monitoring (RUM)
- Distributed traces from Application Performance Monitoring (APM)
- Error data from Error Tracking
- Database telemetry from Database Monitoring (DBM)

By looking at these sources together, Datadog finds ways to help you improve performance, reliability, and user experience.

Datadog prioritizes recommendations by computing a severity score that weighs the potential impact of an issue against telemetry signals, such as relative request volume and performance trends. This ensures that the most critical insights for improving service health appear first.

## Using APM Recommendations

To review recommendations that need your attention:

1. Go to [**APM** > **Recommendations**][1].
2. Filter your recommendations by status or type.
3. Select a recommendation from the list to see a detailed description of the issue.
4. Review the problem, impact, and Datadog's recommendation for resolving it.

After you've reviewed the recommendation, you can use the **FOR REVIEW** dropdown to change the recommendation status to *Reviewed*, *Ignored*, or *Resolved*. Alternatively, you can click **Create Ticket** to assign the recommendation to an owner and track related work in Jira or Case Management.

## Supported recommendations

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}} 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
