---
title: Retain Data with Retention Filters
description: Learn how retention filters work in RUM without Limits.
further_reading:
  - link: '/real_user_monitoring/guide/retention_filter_best_practices/'
    tag: Guide
    text: Retention Filter Best Practices
  - link: '/real_user_monitoring/rum_without_limits/'
    tag: Documentation
    text: RUM without Limits
  - link: '/real_user_monitoring/rum_without_limits/metrics'
    tag: Documentation
    text: Analyze Performance with Metrics
  - link: '/real_user_monitoring/rum_without_limits/retention_quotas'
    tag: Documentation
    text: Control Costs with Retention Quotas
  - link: "https://www.datadoghq.com/blog/rum-apm-retention-filters"
    tag: "Blog"
    text: "Unify and correlate frontend and backend data with retention filters"
  - link: 'https://learn.datadoghq.com/courses/rum-retention-filters'
    tag: 'Learning Center'
    text: 'Interactive Lab: RUM Retention Filters'
---

{{< learning-center-callout header="Try RUM Retention Filters in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Learn how to use RUM retention filters to control which session data is stored and optimize your observability budget.
{{< /learning-center-callout >}}

## Overview

Retention filters are a set of queries, similar to those used in the RUM Session Explorer, that are executed against the RUM events (sessions, views, actions, resources, and so on) as they are ingested. These filters determine whether a session is stored for the standard 30-day RUM retention period or discarded.

The **retention rate** specifies the percentage of matching sessions you want to retain, which allows for greater cost control. Even though filters are matched against individual events, all the events from the underlying session are kept when a sampling decision is made, ensuring end-to-end visibility into user sessions.

Your configuration is made of three types of filters: [permanent retention filters](#permanent-retention-filters), [exclusion filters](#exclusion-filters), and [custom retention filters](#custom-retention-filters). See [Types of filters](#types-of-filters) for the path an event takes through them.

## How it works

A session is stored as soon as a retention filter matches one of its constituting events based on the predefined query, and samples it in based on the configured retention rate.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagram showing the logical flow of retention filters and how they impact the number of sessions ultimately retained." style="width:80%" >}}

The logical flow of retention filters is the following:

- Each event is evaluated against your filters in sequence.
- When an event matches a filter, the retention rate decides retention for the whole session. Either way, the event is not evaluated against the following filters, which is why the **order of retention filters matters**.
- After a session is retained, it is available in the Session Explorer and other RUM pages, and its later events are kept automatically instead of going through the filters.

**Notes**:

- If an event does not match any filters, or if it matches a filter but the retention rate does not sample it in, later events from the same session are still evaluated, so the session may eventually be retained.
- Be cautious with filters on attributes that update over time. A filter on sessions with fewer than two errors matches almost everything, because error counts start at zero and update in real time. Either use "greater than or equal to" (≥) conditions, such as `@session.error.count >= 2`, or wait for the object to be complete by adding `@session.is_active: false` or `@view.is_active: false`.
- Events are not necessarily evaluated in the order they happened: event `B` can be evaluated before event `A`. All events are eventually evaluated against the list of retention filters to prevent gaps.

## Types of filters

{{< img src="real_user_monitoring/rum_without_limits/retention-filters-types.png" alt="The three filter groups on the Retention Filters page: Permanent Filters, Exclusion Filters, and Custom Retention Filters." style="width:100%" >}}

Every RUM event follows the same path through your configuration:

1. The event is evaluated against the **permanent retention filters**. These are predefined and cannot be edited. If the event matches one, its session is retained.
1. The event is evaluated against the **exclusion filters**. If the event matches one, it is not evaluated any further.
1. If the event matches no exclusion filter, it is evaluated against your **custom retention filters**, in order. If the event matches one and the retention rate samples it in, its session is retained.

The three types differ in what a match does:

| Filter type                | When an event matches                                                |
| -------------------------- | -------------------------------------------------------------------- |
| Permanent retention filter | The session is retained.                                              |
| Exclusion filter           | The event skips the evaluation against custom retention filters.      |
| Custom retention filter    | The session is retained, according to the configured retention rate.  |

## Permanent retention filters

Permanent retention filters are predefined retention filters that cannot be modified, disabled, or deleted. They are positioned at the top of your retention filters list.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="The Permanent Filters group expanded, showing the RUM-APM Flat Sampling, Synthetics Sessions, and Sessions with forced replays filters." style="width:100%" >}}

There are three permanent retention filters:

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}}: Retains 1% of sessions with ingested distributed traces (and index their traces on APM). These sessions (and their traces) are **not subject to RUM billing (or APM billing)**.
- {{< ui >}}Synthetics Sessions{{< /ui >}}: Retains all sessions generated by [Synthetic Monitoring][1]. These sessions are billed under Synthetic Monitoring and are **not subject to RUM billing**.
- {{< ui >}}Sessions with forced replays{{< /ui >}}: Retains all sessions for which a replay was force-collected through the [force collection][2] mechanism.

<div class="alert alert-info">The RUM-APM Flat Sampling permanent retention filter only applies with the following SDKs: <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## Exclusion filters

{{< callout url="https://www.datadoghq.com/product-preview/rum-exclusion-filters/" btn_hidden="false" header="Join the Preview!">}}
Exclusion filters are in Preview.
{{< /callout >}}

{{< img src="real_user_monitoring/rum_without_limits/exclusion-filters.png" alt="The Exclusion Filters group expanded, showing the predefined Error Tracking filter and two custom exclusion filters with their event types and queries." style="width:100%" >}}

Exclusion filters make targeted events skip the evaluation against custom retention filters. They are applied after the permanent retention filters.

Use them when the same events are irrelevant to all of your custom retention filters, for example self-declared bot traffic, a retired application version, or a known noisy error.

<div class="alert alert-warning">Exclusion filters apply to the <strong>event</strong>, not to the session. Excluding an event does not drop its session: if another event from the same session matches a custom retention filter, the whole session is retained, including the excluded event.</div>

An exclusion filter is made of an event type and a query, like retention filters, with two differences:

- An exclusion filter can target **All events** instead of a single event type, which lets you exclude on attributes or tags shared by every event, such as `@device.type` or `@geo.country`.
- An exclusion filter has no retention rate. It either matches an event or it does not, so the **order of exclusion filters does not matter**.

### Excluding errors ignored in Error Tracking

A predefined exclusion filter at the top of the list targets the errors you [ignored or excluded in Error Tracking][10], so that you do not have to maintain the same exclusions in two places.

You can enable or disable this filter, but you cannot edit it or delete it.

## Custom retention filters

{{< img src="real_user_monitoring/rum_without_limits/custom-retention-filters.png" alt="The Custom Retention Filters group expanded, showing two ordered filters with their event types, retention rates, and retained session counts." style="width:100%" >}}

Custom retention filters are the filters you create and control. Each one pairs an event type with a query and a retention rate, and each one can retain sessions.

### Excluding events with a filter query

Custom retention filters specify which sessions to keep, rather than which to exclude. You cannot set a retention percentage to 0% (the minimum is 0.1%). Additionally, setting low retention percentages is not an effective exclusion strategy because sessions may still be retained by other filters in your configuration.

To keep a single filter from matching a subset of events, add exclusions **inside that filter's query**. For example:

- Adding `-version:(1* OR 2*)` to a retention filter helps ensure that filter never keeps events from older versions 1 and 2 of your application.
- Adding `-@device.type:Bot` to a retention filter excludes search engine crawlers and other self-declared bots from that filter.
- Adding `-@geo.country:"South Korea"` to a retention filter excludes sessions from South Korea from that filter.

In-query exclusions only apply to the filter that contains them. Because any other filter can still retain the same session, excluding events across your whole configuration this way means repeating the exclusion in **every** filter, and repeating it again each time you add a filter.

To exclude events across all of your custom retention filters at once, use [exclusion filters](#exclusion-filters) instead.

**Note**: Events matching an exclusion filter never reach your custom retention filters, and therefore never trigger the retention of their session.

## Setup

To configure your filters, click {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}} in the top right corner of any RUM page for direct access.

You can also:

1. Navigate to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3].
1. Create a RUM application or click an existing application.
1. Under Product Settings, go to the {{< ui >}}Retention Filters{{< /ui >}} page.

### Creating a filter

To create a retention filter or an exclusion filter:

1. In the section for the type of filter you want to create, click the {{< ui >}}+ Add Filter{{< /ui >}} button.
1. Give the filter a descriptive name.
1. Select an event type from the dropdown and enter a query. Any query that can be written in the [RUM Explorer][4] works. Exclusion filters can also target {{< ui >}}All events{{< /ui >}}.
1. For a custom retention filter, optionally set a retention rate against sessions that match the query. You can click {{< ui >}}Generate Estimate{{< /ui >}} to help guide you in setting this rate. Exclusion filters have no retention rate.

A new custom retention filter gets added to the bottom of the custom retention filters list. It takes seconds for Datadog to propagate a new filter and start applying it.

Creating a filter requires the same permissions for both types of filters.

### Modifying filters

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Hover over a retention filter to modify it." style="width:100%" >}}

#### Edit a filter

To modify an existing filter:

1. Hover over the filter and click the {{< ui >}}Edit{{< /ui >}} icon.
1. Click {{< ui >}}Save Changes{{< /ui >}}.

#### Duplicate a filter

To duplicate a filter:

1. Hover over the filter and click the {{< ui >}}Duplicate{{< /ui >}} icon.
1. Make any modifications you want to the filter, then click {{< ui >}}Save Changes{{< /ui >}}.

#### Delete a filter

To delete a filter:

1. Hover over the filter and click the {{< ui >}}Delete{{< /ui >}} icon.
1. Click {{< ui >}}Confirm{{< /ui >}}.

#### Disable a filter

Disabled filters ignore events. A disabled custom retention filter makes no sampling decision, and a disabled exclusion filter excludes no event.

Use the toggle to the right of the filter to disable or enable it.

#### Reorder filters

Drag and drop filters to reorder filters to their new position.

Reordering only applies to custom retention filters, as the order of exclusion filters does not matter.

### Capping retention with quotas

To cap the total number of sessions retained per day across your retention filters, see [Retention Quotas][9].

## How retention filters work with replays

You can manage session sampling with replays using retention filters. Whenever a session with replays is billed, both the session events and the video recording are kept and billed. This means that if you collect 100% of sessions and 100% of replays from SDKs, whenever a retention filter keeps a session, Datadog keeps and charges for both the session and the replay.

**Note**: Though Datadog's mobile SDKs also provide [APIs to conditionally start and stop the recording][2] (instead of relying on a flat sample rate), only the replays that are force-recorded by the Browser SDK are retained by default.

## Cross-product retention filters

Cross-product retention filters allow you to optimize the correlation between different products to retain richer telemetry. When configuring a RUM retention filter, you can enable a cross-product retention filter for APM traces.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="RUM retention filters with cross-product retention filters enabled for APM traces." style="width:100%" >}}

The {{< ui >}}APM traces filter{{< /ui >}} indexes APM traces for the specified percentage of sessions retained by the parent RUM retention filter that have available traces.

**Note**: The availability of APM traces depends on your **trace sampling SDK configuration** (learn how to <a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">Correlate RUM with APM Traces</a>)

  <div class="alert alert-info">The APM traces filter is only compatible with the following versions of the SDKs: <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">Configuring cross-product retention filters may increase APM-indexed volumes.</div>

To **find sessions with indexed APM traces** in the RUM Explorer, query `@session.has_indexed_apm_traces:true`.

### Example

Consider a configuration where you set up a unique RUM retention filter configured as follows:

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="A RUM retention filter targeting errors at 60% retention, with a cross-product filter set to 25% for APM Traces." style="width:60%" >}}

If you have configured the SDK to sample 40% of traces, then the outcome is the following:

- 40% of ingested RUM sessions have their traces ingested on APM.
- 60% of ingested RUM sessions with at least one error are retained.
- 25% x 40% = 10% of these retained sessions have their APM traces indexed.

### Cross-product retention filters on permanent filters

Cross-product retention filters are also available on the <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Permanent Retention Filters</a>. The APM traces filter is **only editable on Synthetic Monitoring Sessions and Sessions with forced replays filters**.

<div class="alert alert-danger">APM traces indexed through a cross-product retention filter on the Synthetics or Forced Replay permanent filters are subject to APM billing.</div>

## Best practices

See [Retention Filter Best Practices][5].

## API

Filters and cross-product retention filters can be managed through [APIs][6] or Datadog's dedicated [Terraform modules][7].

## Next steps

Analyze performance with [metrics][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: /session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /real_user_monitoring/explorer/
[5]: /real_user_monitoring/guide/retention_filter_best_practices
[6]: /api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /real_user_monitoring/rum_without_limits/metrics
[9]: /real_user_monitoring/rum_without_limits/retention_quotas
[10]: /error_tracking/issue_states/#excluding-an-issue
