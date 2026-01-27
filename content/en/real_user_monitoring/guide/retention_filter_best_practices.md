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
  - link: "https://www.datadoghq.com/blog/rum-apm-retention-filters"
    tag: "Blog"
    text: "Unify and correlate frontend and backend data with retention filters"
---

## Overview

RUM without Limits allows you to capture all session data while only retaining the sessions that are valuable to your organization. This tool enhances your data management by separating session data ingestion from indexing.

## Key features

- **Dynamic retention filters**: Adjust what data to keep without changing any code
- **Comprehensive metrics**: Metrics reflect 100% of sessions, ensuring full visibility
- **Targeted session retention**: Prioritize crucial session data for cost optimization

This guide provides strategies for managing your RUM session volumes effectively within your observability budget.

## Understanding retention filter sequencing

RUM retention filters let you choose which user sessions to keep. Here's how they work:

Each session contains multiple events (like views that represent navigation, user actions, errors, resources that represent network requests) and each of them is full of attributes (like duration, context, etc.). The system evaluates each event individually against your retention filters:

1. **Session kept**: If at least one event in a session matches a retention filter AND is sampled in for retention, then the entire session is preserved.
2. **Session discarded**: If no events match any retention filters by the time the session ends, the entire session is removed.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-3.png" alt="Flowchart showing how retention filters work: 1. Events from a session are checked against filters, 2. If any event matches and is selected, the entire session is kept, 3. If no events match any filters, the session is discarded" style="width:80%" >}}

### How different event types work

Some events (like errors and actions) cannot be changed after they happen. Datadog calls these **immutable events**. Others (like sessions and views) can change as the user continues using your app. Datadog calls these **mutable events**.

- **Immutable events** (Action, Error, Resource, Long Task, and Vital [events][1]) are only checked **once** against your filters and cannot be changed once created:

  1. The event stops at the first filter that matches its tags and attributes.
  2. A random number is generated and compared to the filter's sample rate to decide if the event should be kept or discarded.
  3. If the event is kept, the entire session (including all previous events) is preserved, and future events from the same session automatically skip the retention filters.
  4. If the event is discarded, it's not evaluated by other filters, but other events from the same session continue to be processed independently.

- **Mutable events** (Session, View) are re-checked every time they update:
  - View and Session events are different from immutable events because they can change over time. These events receive updates whenever new events happen within them.
  - Unlike [immutable events](#immutable-events) that are evaluated only once, View and Session events are re-evaluated against the retention filters every time they receive an update. This continues until they match a filter for the first time.

## Best practices

### Ordering retention filters

The order of your [retention filters][2] is important. Datadog recommends putting the most specific filters with the highest sample rates at the top of the list, and your most general filters with the lowest sample rates at the bottom.

For example, imagine you have a crash event (an Error event with the `@error.is_crash:true` attribute). This event could match more than one filter, but it is only evaluated against the first matching filter in your list.

- In the example below, the "Crashes" retention filter is placed above the more general "All errors" filter. This means that all crash sessions are kept, because they match the "Crashes" filter first.

  | ✅ Recommended |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-good-3.png" alt="Good filter order example: 1. Sessions with replays (100% retention), 2. Crash sessions (100% retention), 3. All error sessions (50% retention). This ensures crashes are always captured." style="width:100%" >}} |

- In the following example, the more general "All errors" filter comes before the "Crashes" filter. Because of this, crash sessions are only kept if they are selected by the "All errors" filter (for example, if it has a 50% sample rate). If they are not selected, they are not evaluated by the "Crashes" filter, and those sessions are lost.

  | ❌ Not recommended |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-bad-3.png" alt="Poor filter order example: 1. Sessions with replays (100% retention), 2. All error sessions (50% retention), 3. Crash sessions (100% retention). This risks losing crash sessions if they don't match the general error filter first." style="width:100%" >}} |

### Fallback filters for capturing remaining sessions

A fallback filter at the bottom of your list captures a small percentage of sessions that weren't matched by other filters. You should always include `@session.is_active:false` in your fallback filter query.

- **With `@session.is_active:false`**: The fallback filter only evaluates completed sessions, letting your other filters capture sessions first

  | ✅ Recommended |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-good-3.png" alt="Good fallback filter example: 1. Sessions with replays (100% retention), 2. Sessions lasting more than 5 seconds (100% retention), 3. Sessions that are not active (10% retention). This ensures other filters get first chance to capture sessions." style="width:100%" >}} |
  
- **Without `@session.is_active:false`**: The fallback filter captures all sessions immediately, potentially overriding your more specific filters

  | ❌ Not recommended |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-bad-3.png" alt="Poor fallback filter example: 1. Sessions with replays (100% retention), 2. Sessions lasting more than 5 seconds (100% retention), 3. All sessions (10% retention). This risks overriding more specific filters by capturing all sessions immediately." style="width:100%" >}} |

### Excluding sessions

See [Excluding sessions using retention filters][3].

## Suggested retention filters and use cases
Below we describe the set of default filters, suggested filters, and their typical use cases.

| Filter Type | Query Example | When to Use | Retention Rate |
|-------------|---------------|-------------|----------------|
| Sessions with replays | `@session.has_replay:true` | Keep sessions with a replay to ensure the system does not discard any sessions with session replays available. | 100% |
| Sessions with errors | `@type:error` | A default filter that can be applied to retain all sessions that contain at least 1 error. | 100% |
| Sessions with crashes | `@type:error @error.is_crash:true` | A filter that can be applied to retain all sessions that ended with a crash. | 100% |
| Sessions | `@type:session` | A default filter, placed last in the list, to apply to all sessions, which allows you to retain or discard a percentage of them. | Variable |
| App versions | `@type:session version:v1.1.0-beta` | Filtering by app version (beta, alpha, or specific version) ensures all sessions from a particular build are saved for detailed analysis and troubleshooting. | 100% |
| Environments | `@type:session environment:stage` | When collecting sessions from various build types or environments, ensure you capture at least 100% of sessions from staging environments, while collecting a smaller percentage from dev/test environments. | 100% |
| Feature flags | `@type:session feature_flags.checkout_type:treatment_v1` | If you are already using feature flags, you can choose to keep 100% of sessions with specific feature flag treatments. | 100% |
| Custom attributes | `@type:session @context.cartValue:>=500` | Create filters using almost any query, including session custom attributes, to specify retention criteria. For example, in the Datadog demo app Shopist, the cart value is a custom session attribute. This allows retention of sessions with high cart values, facilitating efficient troubleshooting of revenue-impacting issues. | Variable |
| Session with user attributes | `@type:session user.tier:paid` | Use user information from a session to create a filter. For example, you can retain sessions for all your paid tier users. | 100% |
| Sessions with a specific user | `@type:session user.id:XXXXX` | This filter can target sessions from specific users, such as a production test account or an executive who regularly tests the application. | 100% |
| Sessions with a specific action | `@type:action @action.name:XXXXX` | You can retain all sessions with a specific action that the SDK automatically tracks out-of-the-box or a custom action that you instrumented in your code. | 100% |
| Sessions with a specific duration | `@session.view_count > 3 OR @session.duration  > 15000000000` | If you notice many short sessions, like a user viewing a page for 10 seconds without further action or errors, they are typically not useful. You can use a duration retention filter to reduce these sessions. **Note**: Enter the duration value as a number in nanoseconds - do not include any units (for example, use `15000000000` for 15 seconds). | Variable |
| Sessions with a network error 4XX and 5XX | `@type:resource @resource.status_code:>=400` | Frontend applications often encounter issues with downstream services returning 4XX or 5XX status codes. Using this filter, you can capture all sessions with resource calls that result in error codes. | 100% |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[2]: /real_user_monitoring/rum_without_limits/retention_filters/#logic
[3]: /real_user_monitoring/rum_without_limits/retention_filters#excluding-sessions-using-retention-filters