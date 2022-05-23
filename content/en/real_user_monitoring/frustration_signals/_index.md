---
title: Frustration Signals
kind: documentation
further_reading:
- link: '/real_user_monitoring/dashboards/frustration_signals_dashboard/'
  tag: 'Documentation'
  text: 'Frustration Signals Dashboard'
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

Frustration signals identify the highest points of user friction in your application by surfacing moments where users exhibit moments of frustration. The [RUM Explorer][1] displays a count of frustration signals as a column in the **List** visualization. Hover over the list of browser sessions and click on a session to observe a user's frustrated click behavior. 

RUM collects three types of frustration signals:

Rage Clicks
: A user clicks on an element more than three times in a one-second rolling window.

Dead Clicks
: A user clicks on a static element thinking it is interactive.

Error Clicks
: A user clicks on an element right before a JavaScript error occurs.

## Requirements

First, you need the Browser RUM SDK version >= 4.9.0.

To start collecting frustration signals, add the following to your SDK configuration:

```
DD_RUM.init({
  trackInteractions: true,
  trackFrustrations: true
})
```

Frustration signals require actions. Enabling `trackFrustrations` automatically enables `trackInteractions`.

## Usage

Frustration signals appear as high-level data points representing sources of user frustration on the [**RUM Applications** page][2]. Click **Frustrated Sessions** to access sessions with a frustration signal in the [RUM Explorer][1]. 

Click **Application Overview** to explore a dashboard with additional data about your application such as performance metrics, error metrics, user analytics, and errors. The **Frustration Signals** widget displays a graph correlating frustration signals with contextual user analytics data.

### Explore the frustration signals dashboard

The **Frustration Signals** dashboard provides an overview of frustration levels across your application, showing you topics like the most frustrated users and pages with the highest amount of frustration signals.

You can clone this dashboard and customize it to fit your needs. For more information, see [Frustration Signals Dashboard][3].

### Search for frustration signals

Search through all the data collected by RUM in the [RUM Explorer][4] to surface trends on frustration signals, analyze patterns with greater context, or export them into [dashboards][5] and [monitors][6].

Enter a facet in the search query to start your search. The three facets include:

Frustration Type
: Find actions with frustration signals. For example, if you want to see any actions that had a rage click, add `action.frustration_type:rage_click` to the search query.

Frustration Count
: Find sessions and views where any frustration signal occurred. For example, if you want to find any user sessions that had at least one frustration signal occur, add `session.frustration.count>0` or `view.frustration.count>0` to the search query.

#### Sessions

Click on a session to see if user frustration was detected. You can see the type of signal ranging from `rage`, `dead`, or `error`, and the event timeline that shows what occurred during the session.

#### Views

Click on a view to identify if a user was frustrated with the `frustrated user` tag.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="Frustration Signals Actions in the Events dropdown menu in the performance waterfall graph" style="width:100%;" >}}

In the performance waterfall, filter the view down into a specific action and filter again by frustration signal type in the **Events** dropdown menu.

#### Actions

The Actions tab displays the `frustrated user` tag if the selected action contains a frustration signal.

If multiple frustration signals occur in an action, they are displayed in a `What Happened` box.

## Watch frustration signals in Session Replay

In [Session Replay][7], you can observe a replication of real user activity. Replays provide video evidence of the actions users take when they exhibit signs of frustration. For more information, see the [Session Replay documentation][8].

A session replay's user journey details the events that occur in chronological order. Hover over an event to move to that point in time in the replay.

## Create alerts for frustration signals

You can set alerts on frustration signals to notify you or your team if any frustration signals occur on an important page in your application.

// Add screenshot here

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/dashboards/frustration_signals_dashboard/
[4]: https://app.datadoghq.com/rum/explorer
[5]: /dashboards/
[6]: /monitors/create/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /real_user_monitoring/session_replay/
