---
title: Getting Started with Session Replay
kind: documentation
further_reading:
    - link: '/real_user_monitoring/session_replay/'
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

Session Replay is available for browser applications and mobile apps. The examples in this guide show it for a browser app. 

To start collecting data for Session Replay:

1. Set up [Datadog RUM Browser Monitoring][7] by creating a RUM application (ensure you toggle **Session Replay Enabled** to access replay recordings).
2. Generate a **Client Token**. 
3. Initialize the RUM Browser SDK by inserting the configuration code generated when you create the RUM application into your application source.

Until Datadog starts receiving data, your application appears as `pending` on the **RUM Applications** page.

For more detailed instructions on collecting Session Replay data, follow the [RUM setup documentation][2] for your application. For Session Replay setup on mobile apps, see [Mobile Session Replay][3].

## Find particular Session Replays

Once you're collecting Session Replay data, navigate to the [RUM Explorer][4] and select **Session Replay available** to see all sessions with a replay attached to it. You can visualize this data as a **List**, **Timeseries**, **Top List**, **Table**, **Distribution**, **Geomap**, **Funnel**, **Tree Map**, or **Pie Chart**. 

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="Session Replay available button, as well as visualization options" style="width:100%" >}}

You can filter Sessions using **facets**. Filtering by [facet][5] is helpful if you are searching for specific information, such as a particular user or device type. 

{{< img src="/getting_started/session_replay/facets-views.png" alt="Filtering by facet" style="width:100%" >}}

You are also able to filter by [view][6], as well as customize and pin views. This can be helpful in the case that you know where the issue lies.

{{< img src="/getting_started/session_replay/pinned-views.png" alt="Views dropdown" style="width:100%" >}}

## Examine a user journey

The **User Journey** is an event timeline on the right side of the page. The session replay looks like a video on the left, with standard video navigation tools. Start the replay from the beginning by clicking play, and watch everything that a particular user did. You can navigate to any moment in the user journey by clicking on an event in the list.

{{< img src="/getting_started/session_replay/user-journey.png" alt="Panel with User Journey" style="width:100%" >}}

You are able to filter the User Journey by **View**, **Action**, **Error**, and **Frustration Signal** by selecting **Events**. 

{{< img src="/getting_started/session_replay/views-actions-errors.png" alt="Panel that allows for filtering by view, action, error, and frustration signal" style="width:100%" >}}

While hovering over a particular time or view in the user journey, select **Details** to examine Core Web Vitals and other pertinent information, without leaving the replay.

{{< img src="/getting_started/session_replay/details-panel.png" alt="Panel with additional details">}}

From the Details page, you can expand the waterfall view for more detailed information.

{{< img src="/getting_started/session_replay/performance-waterfall.png" alt="Expanded performance waterfall">}}

## Troubleshoot using Developer Tools

Open Session Replay's [browser developer tools][8] to explore your application's performance, console logs, errors, and application or user attributes associated with the current replay. 

{{< img src="/getting_started/session_replay/dev-tools.png" alt="Dev tools console" style="width:100%" >}}

You can view any **Resources** associated with a view by selecting the Resources tab.

{{< img src="/getting_started/session_replay/resources.png" alt="Resources associated with the view" style="width:100%" >}}

**Traces** associated with a view can be found in the [Traces tab](#tracing-with-the-apm-integration).

{{< img src="/getting_started/session_replay/traces.png" alt="Traces associated with the view" style="width:100%" >}}

Session metadata is populated in the **Attributes** tab.

{{< img src="/getting_started/session_replay/attributes.png" alt="Attributes tab of the Dev tools console" style="width:100%" >}}

## Pivot to correlated data

Session Replay integrates with your application's metrics, traces, and logs to give you helpful context for debugging issues. Utilizing the APM and Error Tracking integrations alongside Session Replay enables you to investigate the root cause of user-facing issues, regardless of where they originate in your stack.

### Tracing with the APM integration

Combining Session Replay with [APM traces][9] enables you to receive end-to-end visibility across frontend and backend issues, and see how code and infrastructure are impacting your user experience.

Within the Traces tab, select **View Trace in APM** to see more detailed information, including errors and logs associated with the trace. 

{{< img src="/getting_started/session_replay/APM.png" alt="APM page with more detailed information" style="width:100%" >}}

### Investigating errors with the Error Tracking integration

The [Error Tracking integration][10] is helpful in debugging issues and getting to the root cause. You can receive alerts for an error, see the exact line of code that caused it, and pivot to view a user session that encountered the error on the Datadog site.

In the **Errors** tab, select an error to see the time the error occurred and the message. Click **Issue in error tracking** to see more detail and attributes associated with the session.

{{< img src="/getting_started/session_replay/error-tracking.png" alt="Error tracking panel" style="width:100%" >}}

## What's next?

### Create Synthetic browser tests from Session Replays

You can [create a synthetic browser test][11] from the exact sequence of steps your users went through in a Session Replay. Datadog runs synthetic tests on an automated schedule you define, to simulate user behavior, reporting failing tests to you without your users having to encounter the problem again.

To capture a session replay in a synthetic browser test, click **Generate Synthetic Browser Test** above the event timeline.

{{< img src="/getting_started/session_replay/browser-test.png" alt="Browser test creation popup window" style="width:100%" >}}

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
[7]: /real_user_monitoring/browser/#setup
[8]: /real_user_monitoring/session_replay/developer_tools
[9]: /real_user_monitoring/connect_rum_and_traces
[10]: /real_user_monitoring/error_tracking/
[11]: /synthetics/guide/rum-to-synthetics/