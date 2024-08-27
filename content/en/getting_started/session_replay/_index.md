---
title: Getting Started with Session Replay
further_reading:
    - link: '/real_user_monitoring/session_replay/browser'
      tag: 'Documentation'
      text: 'Session Replay'
    - link: '/real_user_monitoring/session_replay/mobile/'
      tag: 'Documentation'
      text: 'Mobile Session Replay'
    - link: 'https://www.datadoghq.com/knowledge-center/session-replay/'
      tag: 'Learning Center'
      text: 'Session Replay Overview'
    - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
      tag: 'Blog'
      text: 'Use Datadog Session Replay to view real-time user journeys'
    - link: '/real_user_monitoring/browser/troubleshooting/'
      tag: 'Documentation'
      text: 'Troubleshooting'
---

{{< img src="/getting_started/session_replay/preview.mp4" alt="Preview of Session Replay" style="width:100%" video=true >}}

## Overview

Session Replay is a visual tool that recreates user sessions from your applications, giving you a detailed, video-like view of how customers actually interact with your product. Session replay enriches traditional, quantitative data—such as click counts, bounce rates, and page view metrics—with the qualitative context you need to analyze your users' actions.

This page walks you through getting started with Session Replay in Datadog. If you haven't already, [create a Datadog account][1].

## Configure Session Replays

Session Replay is available for browser applications and mobile apps. The examples in this guide demonstrate using Session Replay with a browser app. 

To start collecting data for Session Replay:

1. Set up [Datadog RUM Browser Monitoring][7] by creating a RUM application (ensure you toggle **Session Replay Enabled** to access replay recordings).
2. Generate a **Client Token**. 
3. Initialize the RUM Browser SDK by inserting the configuration code generated when you create the RUM application into your application source.

Until Datadog starts receiving data, your application appears as `pending` on the **RUM Applications** page.

For more detailed instructions on collecting Session Replay data, follow the [RUM setup documentation][2] for your application. For Session Replay setup on mobile apps, see [Mobile Session Replay][3].

## Find particular Session Replays

Once you're collecting Session Replay data, navigate to the [RUM Explorer][4] and select **Session Replay available** to see all sessions with a replay attached to it. You can visualize this data as a **List**, **Timeseries**, or other format.

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="Session Replay available button, as well as visualization options" style="width:100%" >}}

Suppose you've been told that a customer experienced issues with your application on a mobile device. You can filter Sessions using **facets**. In this case, filtering by [facet][5] is helpful in searching for specific information, such as a particular user or device type.

{{< img src="/getting_started/session_replay/facets-views.png" alt="Filtering by facet" style="width:100%" >}}

Maybe you've created a [Saved View][6] that shows you all sessions that contain a specific error that your application generates. Bringing up this view is helpful when you know where the issue lies and want to see session replays of users encountering it.

{{< img src="/getting_started/session_replay/pinned-views.png" alt="Views dropdown" style="width:100%" >}}

## Examine a user journey

The session replay looks like a video on the left, with standard video navigation tools. Start the replay from the beginning by clicking play, and watch everything that a particular user did. 

The **User Journey** is an event timeline on the right side of the page. You can navigate to any moment in the user journey by clicking on an event in the list. You can also track all the actions and errors occurring for each view by clicking **Session Breakdown**.

{{< img src="/getting_started/session_replay/user-journey.png" alt="Panel with User Journey" style="width:100%" >}}

Select **Events** to filter the user journey list by the following event types:

- **View**
- **Action**
- **Error**
- **Frustration Signal**

While hovering over a particular time or view in the user journey, select **Details** to examine Core Web Vitals and other pertinent information, without leaving the replay.

{{< img src="/getting_started/session_replay/details-panel.png" alt="Panel with additional details">}}

From the Details page, you can expand the waterfall view for more detailed information.

{{< img src="/getting_started/session_replay/performance-waterfall.png" alt="Expanded performance waterfall">}}

## Troubleshoot using Developer Tools

Open Session Replay's [browser developer tools][8] to explore your application's performance, console logs, errors, and application or user attributes associated with the current replay. 

{{< img src="/getting_started/session_replay/dev-tools.png" alt="Dev tools console" style="width:100%" >}}

## Pivot to correlated data

Session Replay integrates with your application's metrics, traces, and logs to give you helpful context for debugging issues. Using APM and Error Tracking alongside Session Replay enables you to investigate the root cause of user-facing issues, regardless of where they originate in your stack.

### Investigating request performance with APM traces

The [APM traces][9] associated with a session replay give you end-to-end visibility across frontend and backend issues, and see how code and infrastructure are impacting your user experience. Having full-stack traces can be helpful if you're unsure whether an error is occurring on the frontend or backend of your application. 

Select a replay with traces to view the browser request, as well as all the backend dependencies and services called upon to fulfill the request in a specific page.

{{< img src="/getting_started/session_replay/traces-view.png" alt="Traces panel" style="width:100%" >}}

Select **View Trace in APM** to see more detailed information, including errors and logs associated with the trace. 

{{< img src="/getting_started/session_replay/APM.png" alt="APM page with more detailed information" style="width:100%" >}}

### Investigating errors with Error Tracking

[Error Tracking][10] is helpful in debugging issues and getting to the root cause. You can receive alerts for an error occurring, see the exact line of code that caused it, and pivot to view a user session that encountered the error.

In the **Errors** tab, select an error to see the time the error occurred and the message. Click **Issue in error tracking** to see more detail and attributes associated with the session.

{{< img src="/getting_started/session_replay/error-tracking.png" alt="Error tracking panel" style="width:100%" >}}

## What's next?

### Create Synthetic browser tests from Session Replays

You can [create a synthetic browser test][11] from the exact sequence of steps your users went through in a Session Replay. Datadog runs synthetic tests on an automated schedule you define, to simulate user behavior, reporting failing tests to you without your users having to encounter the problem again.

To capture a session replay in a synthetic browser test, click **Generate Synthetic Browser Test** above the event timeline.

{{< img src="/getting_started/session_replay/browser-test.png" alt="Browser test creation popup window" style="width:100%" >}}

For more information about managing, running, and interpreting test results, read [Synthetic Browser Tests][12].

### Share with your team

You can share the replay with your team by selecting the **Share** dropdown at the top of the page. You can start the replay at a specific time, to direct your team's attention to a particular time and view of the Replay.

{{< img src="/getting_started/session_replay/share.png" alt="Share your replay pop-up" style="width:100%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/?_gl=1*2g30ya*_gcl_au*OTEwMTA2MjI5LjE2OTIxMDc1MzA.*_ga_KN80RDFSQK*MTY5NDAwODQ4OS40OC4xLjE2OTQwMDg2MzcuMC4wLjA.
[2]: /real_user_monitoring/#get-started
[3]: /real_user_monitoring/session_replay/mobile/
[4]: https://app.datadoghq.com/rum/sessions
[5]: /real_user_monitoring/explorer/search/#facets
[6]: /real_user_monitoring/explorer/saved_views/
[7]: /real_user_monitoring/browser/setup
[8]: /real_user_monitoring/session_replay/browser/developer_tools
[9]: /real_user_monitoring/connect_rum_and_traces
[10]: /real_user_monitoring/error_tracking/
[11]: /synthetics/guide/rum-to-synthetics/
[12]: /synthetics/browser_tests/