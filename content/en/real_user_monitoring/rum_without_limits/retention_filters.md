---
title: Retain Data with Retention Filters
description: Learn how retention filters work in RUM without Limits.
private: true
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

Retention filters are a set of queries, similar to those used in the RUM Session Explorer, that are executed against the RUM data (Sessions, Views, Actions, Resources, and so on) as it is ingested. These filters determine whether a session is stored for the standard 30-day RUM retention period or discarded.

The **retention rate** specifies the percentage of matching sessions you want to retain, which allows for greater cost control. Even though filters are matched against individual events, all the events from the underlying session are kept when a sampling decision is made.

## How it works

A session is stored when a retention filter matches the session event or any event within it. The retention rate allows retaining only sessions meeting filter criteria, discarding the rest.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work.png" alt="Diagram showing the logical flow of retention filters and how they impact the number of sessions ultimately retained." style="width:90%" >}}

The logical flow of retention filters is the following:

- All RUM events are evaluated against each filter in sequence, starting with the first.
- If an event matches a filter, a decision is made to retain or discard the session containing the event, and subsequent filters are not executed.
- Retained sessions are saved and accessible in the Session Explorer and other RUM views. New events coming from this session are automatically kept to ensure complete visibility.
- If a session is discarded, future events from the same session will still flow in the list and the session may eventually be retained.

**Note**: Be cautious when defining filters on event attributes that update over time. For example, a filter retaining sessions with fewer than two errors might mistakenly retain sessions, as error counts update in real-time. Use "greater than or equal to" (≥) conditions for fields that update, such as `@session.error.count >= 2`.

## Default replay retention filter

Sessions ingested with replays are always kept. However, you maintain control of all other sessions that do not include replays from the UI. For example, if you send 100% of sessions and 5% of them have replays, Datadog automatically retains the 5% of sessions with the replays, while you can control the remaining 95% of sessions.

## Creating a retention filter

To create a retention filter:

1. Navigate to [Digital Experience > Manage Applications][1].
1. Create a new RUM application or click an existing application.
1. Under Product Settings, go to the **Retention Filters** page.
1. Click the **+ Add Retention Filter** button.
1. Give the retention filter a descriptive name.
1. Select an event type from the dropdown and enter a query. Any query that can be written in the [RUM Explorer][2] works with retention filters.
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

## Next steps

Analyze performance with [metrics][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/explorer/
[3]: /real_user_monitoring/rum_without_limits/metrics
[4]: /real_user_monitoring/guide/retention_filter_best_practices