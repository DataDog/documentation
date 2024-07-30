---
title: Frustration Signals
aliases:
- /real_user_monitoring/frustration_signals
further_reading:
- link: 'https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/'
  tag: 'Blog'
  text: 'Detect user pain points with Datadog Frustration Signals'
- link: '/real_user_monitoring/platform/dashboards/usage#frustration-signals'
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

Frustration signals help you identify your application's highest points of user friction by surfacing moments when users exhibit frustration.

RUM collects three types of frustration signals:

Rage Clicks
: A user clicks on an element more than three times in a one-second sliding window.

Dead Clicks
: A user clicks on a static element that produces no action on the page.

Error Clicks
: A user clicks on an element right before a JavaScript error occurs.

## Requirements

First, you need the Browser RUM SDK version >= 4.14.0.

To start collecting frustration signals, add the following to your SDK configuration:

<details open>
  <summary>Latest version</summary>
  
```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

</details>
<details>
  <summary>Before <code>v5.0.0</code></summary>
  
```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

Frustration signals require actions. Enabling `trackFrustrations` automatically enables `trackUserInteractions`.
</details>

## Usage

Frustration signals appear as high-level data points representing sources of user frustration on the [**RUM Applications** page][1]. To display a list of frustration counts in the [RUM Explorer][2], click the **Options** button and add a column for `@session.frustration.count`.

### Application list

Hover over the list of browser sessions and click on a session to observe a user's frustrated click behavior. Or, click **Frustrated Sessions** to access sessions with a frustration signal.

### Explore the frustration signals dashboard

The **Frustration Signals** dashboard provides an overview of frustration levels across your application, showing you topics like the most frustrated users and pages with the highest number of frustration signals.

You can clone this dashboard and customize it to fit your needs. For more information, see [Frustration Signals Dashboard][3].

### Search for frustration signals

Search through all the data collected by RUM in the [RUM Explorer][4] to surface trends on frustration signals, analyze patterns with greater context, or export them into [dashboards][5] and [monitors][6].

Enter a facet in the search query to start your search. Available search fields include:

Frustration Type
: Find actions with frustration signals. For example, if you want to see any actions that had a rage click, add `action.frustration.type:rage_click` to the search query.

Frustration Count
: Find sessions and views where any frustration signal occurred. For example, if you want to find any user sessions or views with at least one frustration signal, add `session.frustration.count:>1` or `view.frustration.count:>1` to the search query.

#### Sessions

Click on a session with a value in the **Frustration Count** column to examine the user frustration detected. You can see the type of signal (`rage click`, `dead click`, or `error click`) and the event timeline, which shows what occurred during the session.

#### Views

Click on a view to identify if a user was frustrated on a specific page with the `frustration detected` tag.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="Frustration Signals Actions in the Events dropdown menu in the performance waterfall graph" style="width:90%;" >}}

The performance waterfall displays actions containing frustration signals.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="Frustration signals detected as an action" style="width:90%;" >}}

#### Actions

The **Actions** tab displays the `frustration detected` tag if the selected action contains a frustration signal.

If multiple frustration signals occur in an action, they are displayed under **What Happened** in the action panel.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="Multiple frustration signal types detected in the action under What Happened" style="width:90%;" >}}

#### Errors

Click on an error in the **Errors** tab to open a side panel with error details. You can see if a frustration signal occurred.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="Errors Tab in the Actions side panel" style="width:90%;" >}}

## Watch frustration signals in Session Replay

In [Session Replay][7], you can observe a video-like replication of real user activity. Replays provide video evidence of the actions users take when they exhibit signs of frustration.

A session replay's user journey details the events that occur in chronological order. Hover over an event to move to that point in time in the replay: for example, when a dead click occurred.

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="Frustration signals appear in a browser recording" style="width:90%;" >}}

 For more information, see the [Session Replay documentation][8].

## Create alerts for frustration signals

You can create monitors and set alerts on frustration signals to notify you or your team if any frustration signals occur on an important page in your application.

For example, to set an alert that notifies you if any frustration signals occur on a specific page:

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="Create a RUM Monitor that alerts on the count of frustration signals" style="width:90%;" >}}

For more information, see the [Real User Monitoring Monitor documentation][9].

## Troubleshooting

### Why is a rage click not created when a user presses a key (like Delete) on the keyboard?

Frustration signals are generated from mouse clicks, not keyboard strokes.

### Why does the side panel show that a session has a different number of frustration signals than in the event timeline?

If a session is live, it is fetching information and may cause the banners to reflect a different number than those in the timeline.

### Can I pick and choose what signals to track?

By enabling frustration signals, Datadog collects all three signal types by default. Contact your [Customer Success Manager][10] for more information.

<div class="alert alert-warning">
To provide feedback or submit a feature request, contact <a href="/help/">Datadog Support</a>.
</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/explorer/
[3]: /real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /dashboards/
[6]: /monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /real_user_monitoring/session_replay/browser/
[9]: /monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com
