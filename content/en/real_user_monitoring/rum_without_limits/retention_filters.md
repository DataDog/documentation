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
---
## Overview

Retention filters are a set of queries, similar to those used in the RUM Session Explorer, that are executed against the RUM events (sessions, views, actions, resources, and so on) as they are ingested. These filters determine whether a session is stored for the standard 30-day RUM retention period or discarded.

The **retention rate** specifies the percentage of matching sessions you want to retain, which allows for greater cost control. Even though filters are matched against individual events, all the events from the underlying session are kept when a sampling decision is made, ensuring end-to-end visibility into user sessions.

## How it works

A session is stored as soon as a retention filter matches one of its constituting events based on the predefined query, and samples it in based on the configured retention rate.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagram showing the logical flow of retention filters and how they impact the number of sessions ultimately retained." style="width:80%" >}}

The logical flow of retention filters is the following:

- All RUM events are evaluated against each filter in sequence, starting with the first one received.
- When an event `A` matches a filter, a decision is made based on the retention rate to either sample the entire session in, or wait for future events to be evaluated. In both cases, event `A` is not evaluated further against subsequent retention filters. This is why the **order of retention filters matters**.
- Retained sessions are saved and accessible in the Session Explorer and other RUM pages. New events coming from this session do not go through the list of retention filters, but are automatically kept to ensure complete visibility.

**Notes**:

- If an event does not match any filters, or if it matches a filter but the decision is made not to retain the session based on the configured retention rate, future events from the same session will continue to be evaluated. As a result, the session may eventually be retained.
- Be cautious when defining filters on event attributes that update over time. For example, a filter retaining sessions with fewer than two errors might mistakenly retain sessions, as error counts update in real-time and all sessions start at zero. Either use "greater than or equal to" (≥) conditions for fields that update, such as `@session.error.count >= 2`, or ensure the Session and View objects that are mutable are complete before evaluating them against the retention filters, by adding `@session.is_active: false` or `@view.is_active: false`.
- Our SDKs batch and compress events before sending them to Datadog, and failed uploads go back at the end of the queue on the device. Therefore, it could happen that event `B` is evaluated before event `A`, but all events are eventually evaluated against the list of retention filters to prevent gaps.

## How retention filters work with replays

You can manage session sampling with replays using retention filters. Whenever a session with replays is billed, both the session events and the video recording are kept and billed. This means that if you collect 100% of sessions and 100% of replays from SDKs, whenever a retention filter keeps a session, Datadog keeps and charges for both the session and the replay.

Replays collected through the [force collection][1] mechanism are kept by the default retention filter, positioned first in the list (see below).

{{< img src="real_user_monitoring/rum_without_limits/retention-session-filter.png" alt="When force collection is enabled, it is positioned first in the list of retention filters." style="width:90%" >}}

**Note**: Though our mobile SDKs also provide APIs to conditionally start and stop the recording (instead of relying on a flat sample rate), only the replays that are force-recorded by our browser SDK will be kept by default.


## Creating a retention filter

To create a retention filter:

1. Navigate to [**Digital Experience** > **Manage Applications**][2].
1. Create a RUM application or click an existing application.
1. Under Product Settings, go to the **Retention Filters** page.
1. Click the **+ Add Retention Filter** button.
1. Give the retention filter a descriptive name.
1. Select an event type from the dropdown and enter a query. Any query that can be written in the [RUM Explorer][3] works with retention filters.
1. Optionally, set a retention rate against sessions that match the retention query. You can click **Generate Estimate** to help guide you in setting this rate.

The new filter gets added to the bottom of the Retention Filters list. It takes seconds for Datadog to propagate a new filter and start making sampling decisions.

## Modifying filters

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Hover over a retention filter to modify it." style="width:100%" >}}

### Edit a filter

To modify an existing filter:

1. Hover over the filter and click the **Edit** icon.
1. Click **Save Changes**.

### Duplicate a filter

To duplicate a filter:

1. Hover over the filter and click the **Duplicate** icon.
1. Make any modifications you want to the filter, then click **Save Changes**.

### Delete a filter

To delete a retention filter:

1. Hover over the filter and click the **Delete** icon.
1. Click **Confirm**.

### Disable a filter

Disabled filters simply ignore events and do not make any sampling decisions. Events flowing in the list will skip disabled filters.

Use the toggle to the right of the filter to disable or enable it.

### Reorder filters

Drag and drop filters to reorder filters to their new position.

## Best practices

See [Retention Filter Best Practices][4].

## API

Retention filters can be managed through [APIs][5] or Datadog's dedicated [Terraform modules][6].

## Next steps

Analyze performance with [metrics][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser/#force-session-replay
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/explorer/
[4]: /real_user_monitoring/guide/retention_filter_best_practices
[5]: /api/latest/rum-retention-filters/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[7]: /real_user_monitoring/rum_without_limits/metrics