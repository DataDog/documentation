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
      recommendation_type: N+1 queries on Database
      scope: Backend services
      recommendation_description: A backend application calls the same database sequentially instead of batching queries.
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Sequential API calls
      scope: Backend services
      recommendation_description: A backend application calls the same API sequentially instead of batching queries.
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Aggressive retries
      scope: Backend services
      recommendation_description: A backend application retries faulty calls to an API without backoff.
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
    - category: Error rate
      recommendation_type: New issue
      scope: Backend services
      recommendation_description: A backend application started to generate a new Error signature.
      recommendation_prerequisite: Error Tracking
    - category: Performance
      recommendation_type: High volume of thrown exceptions
      scope: Backend services
      recommendation_description: A backend application is throwing a high number of exceptions as control-flow
      recommendation_prerequisite: APM + Continuous Profiler

---

{{< callout url="https://www.datadoghq.com/product-preview/apm-proactive-recommendations/" >}}
APM Recommendations are in Preview. Features and recommendations may change before general availability. To request access, fill out this form.
{{< /callout >}}

APM Recommendations help you optimize your applications' performance, reliability, and error rates by providing optimization opportunities based on the telemetry collected on your applications. These recommendations are designed to:

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

## Using APM Recommendations

To review recommendations that need your attention:

1. Go to [**APM** > **Recommendations**][1].
2. Review the recommendations in **For Review**.
3. Select a recommendation from the list to see the problem, impact, and how to resolve it.
4. Review the problem, impact, and Datadog's recommendation for resolving it.

After you've addressed the recommendation, you can use the **FOR REVIEW** dropdown to change the recommendation status to *Reviewed*, *Ignored*, or *Resolved*. Alternatively, you can click **Create Case** to assign the recommendation to an owner and track related work.

## Supported recommendations

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}} 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
