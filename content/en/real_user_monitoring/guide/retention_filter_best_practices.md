---
title: Retention Filter Best Practices
description: Learn the best practices for sequencing your retention filters to store the RUM data you need.
further_reading:
  - link: '/real_user_monitoring/rum_without_limits/retention_filters'
    tag: Documentation
    text: Retention Filters
  - link: '/real_user_monitoring/rum_without_limits/'
    tag: Documentation
    text: RUM without Limits
  - link: '/real_user_monitoring/rum_without_limits/metrics'
    tag: Documentation
    text: Analyze Performance with Metrics
---

## Overview

RUM without Limits allows you to capture all session data while only retaining the sessions that are valuable to your organization. This tool enhances your data management by separating session data ingestion from indexing.

## Key features

- **Dynamic retention filters**: Adjust what data to keep without changing any code
- **Comprehensive metrics**: Metrics reflect 100% of sessions, ensuring full visibility
- **Targeted session retention**: Prioritize crucial session data for cost optimization

This guide provides strategies for managing your RUM session volumes effectively within your observability budget.

## Retention filter sequencing

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagram showing the logical flow of retention filters and how they impact the number of sessions ultimately retained." style="width:80%" >}}

Sequencing your retention filters properly ensures you store the RUM data you need. Based on the [retention filter logic][1], follow these best practices:

### Retention rate order
- Place the most specific filters (usually these have a 100% retention rate) at the top to ensure no valuable sessions are discarded.
- Place less specific and catch-all filters (usually these have a smaller retention rate) lower in the list.

### Setting up filters
- If unsure about your settings, start by arranging filters from highest to lowest retention rates.
- Use more filters with a 100% rate, and limit filters with lower percentages.
- Add a default "catch-all" retention filter at the end to capture any sessions not matched by previous filters. We recommend including `@session.is_active: false` in the query to ensure this retention filter only matches sessions that are complete and were not previously retained by another retention filter.

## Suggested retention filters and use cases
Below we describe the set of default filters, suggested filters, and their typical use cases.


| Filter | Query Example | Description |
|--------|---------------|-------------|
| Sessions with replays | `@session.has_replay:true` | Keep sessions with a replay to ensure the system does not discard any sessions with session replays available. |
| Sessions with errors | `@type:error` | A default filter that can be applied to retain all sessions that contain at least 1 error. |
| Sessions with mobile crashes | `@type:error @error.is_crash:true` | A filter that can be applied to retain all sessions that ended with a crash. |
| Sessions | `@type:session` | A default filter, placed last in the list, to apply to all sessions, which allows you to retain or discard a percentage of them. |
| App versions | `@type:session version:v1.1.0-beta` | Filtering by app version (beta, alpha, or specific version) ensures all sessions from a particular build are saved for detailed analysis and troubleshooting. |
| Environments | `@type:session environment:stage` | When collecting sessions from various build types or environments, ensure you capture at least 100% of sessions from staging environments, while collecting a smaller percentage from dev/test environments. |
| Feature flags | `@type:session feature_flags.checkout_type:treatment_v1` | If you are already using feature flags, you can choose to keep 100% of sessions with specific feature flag treatments. | 
| Custom attributes | `@type:session @context.cartValue:>=500` | Create filters using almost any query, including session custom attributes, to specify retention criteria. For example, in the Datadog demo app Shopist, the cart value is a custom session attribute. This allows retention of sessions with high cart values, facilitating quick troubleshooting of revenue-impacting issues. |
| Session with user attributes | `@type:session user.tier:paid` | Use user information from a session to create a filter. For example, you can retain sessions for all your paid tier users. |
| Sessions with a specific user | `@type:session user.id:XXXXX` | This filter can target sessions from specific users, such as a production test account or an executive who regularly tests the application. |
| Sessions with a specific action | `@type:action @action.name:XXXXX` | You can retain all sessions with a specific action that the SDK automatically tracks out-of-the-box or a custom action that you instrumented in your code.
| Sessions with a specific duration | `@session.view_count >= 3 OR @session.time_spent  > 15s` | If you notice many short sessions, like a user viewing a page for 10 seconds without further action or errors, they are typically not useful. You can use a duration retention filter to reduce these sessions. |
| Sessions with a network error 4XX and 5XX | `@type:resource @resource.status_code:>=400` | Frontend applications often encounter issues with downstream services returning 4XX or 5XX status codes. Using this filter, you can capture all sessions with resource calls that result in error codes. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/retention_filters/#logic