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
      recommendation_description: A backend application calls sequentially the same Database instead of batching queries
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Sequential API calls
      scope: Backend services
      recommendation_description: A backend application calls sequentially the same API instead of batching queries
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Agressive retries
      scope: Backend services
      recommendation_description: A backend application retries faulty calls to an API without backoff
      recommendation_prerequisite: APM
    - category: Performance
      recommendation_type: Missing index
      scope: Databases
      recommendation_description: The query’s execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query
      recommendation_prerequisite: APM + DBM
    - category: User experience
      recommendation_type: User frustration action
      scope: Browser applications
      recommendation_description: Common rage or dead actions are detected on elements on a page signaling misleading UI or broken elements
      recommendation_prerequisite: RUM
    - category: User experience
      recommendation_type: Unoptimized bundle size
      scope: Browser applications and web views on mobile applications	
      recommendation_description: Large JS resources causing delays in the initial page render signaling misleading UI or broken elements
      recommendation_prerequisite: RUM
    - category: Error rate
      recommendation_type: New issue
      scope: Backend services
      recommendation_description: A backend application started to generate a new Error signature
      recommendation_prerequisite: Error Tracking

---

{{< beta-callout url="#" btn_hidden="true" >}}
APM Recommendations are in Preview. Features and recommendations may change before general availability.
{{< /beta-callout >}}

APM Recommendations help you optimize your applications' performance, reliability, and error rates by providing optimization opportunities based on the telemetry collected on your applications. These recommendations are designed to:

- Identify and resolve performance bottlenecks
- Improve service reliability and uptime
- Reduce error rates and improve end-user experience

## How it works

APM Recommendations are based on data collected from different parts of your stack:

- Sessions and user journeys from Real User Monitoring (RUM)
- Distributed traces from Application Performance Monitoring (APM)
- Error data from Error Tracking
- Database telemetry from Database Monitoring (DBM)

By looking at these sources together, Datadog finds ways to help you improve performance, reliability, and user experience.

## Supported Recommendations

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}} 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}