---
title: Getting Started with Session Replay
kind: documentation
further_reading:
    - link: 'https://docs.datadoghq.com/real_user_monitoring/session_replay/'
      tag: 'Documentation'
      text: 'Session Replay'
    - link: 'https://docs.datadoghq.com/real_user_monitoring/session_replay/mobile/'
      tag: 'Documentation'
      text: 'Mobile Session Replay'
    - link: 'https://www.datadoghq.com/knowledge-center/session-replay/'
      tag: 'Learning Center'
      text: 'Session Replay Overview'
    - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
      tag: 'Blog'
      text: 'Use Datadog Session Replay to view real-time user journeys'
    - link: 'https://docs.datadoghq.com/real_user_monitoring/browser/troubleshooting/'
      tag: 'Documentation'
      text: 'Troubleshooting'
---

## Overview

**Session Replay** is a visual tool that recreates user sessions from your applications, giving you an in-depth look at how users are interacting with your product. Session Replay can be helpful in understanding an application's pain points, as well as other nuances that may be harder to detect when looking at a session timeline, but easier to notice in a visual representation. 

Session Replay is seamlessly integrated with your application's metrics, traces, and logs, giving you helpful context for debugging issues. Utilizing the APM and Error Tracking integrations alongside Session Replay enables you to investigate the root cause of user-facing issues, regardless of where they originate in your stack.

This page demonstrates how to get started with Session Replay in Datadog. If you haven't already, [create a Datadog account][1].

## Configuring Session Replays

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up Datadog RUM Browser Monitoring by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK. 

For further instructions on collecting Session Replay data, follow the [RUM Getting Started guide][2] for your application. 

For setup in mobile environments, see [Mobile Session Replay][3].

## Finding particular Session Replays

Once you're collecting Session Replay data, select **Session Replay available** in the [RUM Explorer][4] to see all sessions with a replay attached to it. From here, you can visualize the data as a **List**, **Timeseries**, or other format. 

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="Session Replay available button, as well as visualization options">}}

### Facets

You can filter Sessions using facets. Filtering by [facet][5] is particularly helpful if you are searching for a particular user, or product manager wanting to understand trends in the application. 

### Views

You are also able to filter by [view][6]. This can be helpful in the case that you know where the issue lies.

{{< img src="/getting_started/session_replay/facets-views.png" alt="Filtering by facet and view">}}

## User Journey

The **User Journey** functions as an event timeline, and is tracked on the right side of the page. Starting from the beginning of a replay, you can watch everything that a particular user did. You can navigate to any moment in the User Journey by selecting the time/view (insert screenshot).

You are able to filter the User Journey by **View**, **Action**, and **Error**. When hovering over a particular time or view in the User Journey, selecting **Details** opens a side panel where you can examine specific Core Web Vitals of the page, as well as other pertinent information, without leaving the replay (insert screenshot). 

From this page, you can also expand the **Performance Waterfall** for more detailed information (insert screenshot).

## Developer Tools

Selecting **Dev Tools** enables you to view various aspects of your application's performance, console logs and errors associated with the view, and any application or user attributes regarding the replay.

{{< img src="/getting_started/session_replay/dev-tools.png" alt="Dev tools console">}}

You can also view session metadata in the Attributes tab.

{{< img src="/getting_started/session_replay/attributes.png" alt="Attributes tab of the Dev tools console">}}

### APM integration

Combining Session Replay with APM traces and metrics enables you to receive end-to-end visibility across frontend and backend issues, allowing you to see how code and infrastructure are impacting your user experience. Understanding how backend performance affects user experience can be key to troubleshooting and optimizing your application.

### Error Tracking integration

The Error Tracking feature is helpful in debugging issues and getting to the root cause. You can receive alerts for an error, see the exact line of code that caused it, and pivot to view a user session that encountered the error—all without leaving the application.

Within the Errors tab, selecting a specific error expands the view to display the time the error occurred, as well as the error message. Clicking **Issue in error tracking** opens a panel with more detail surrounding the error, as well as any attributes associated with the session.

{{< img src="/getting_started/session_replay/error-tracking.png" alt="Error tracking panel">}}

## Resources and traces

You can view any **Resources** and **Traces** associated with a view through using the tabs.

You can see the browser request, as well as all of the backend dependencies and every service that was called upon to fulfill the request in the page.

## What's Next?

You are able to share the replay with your team by selecting the **Share** button at the top of the page. You can start the replay at a specific time as well, to direct your team's attention to a particular time and view of the Replay.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/?_gl=1*2g30ya*_gcl_au*OTEwMTA2MjI5LjE2OTIxMDc1MzA.*_ga_KN80RDFSQK*MTY5NDAwODQ4OS40OC4xLjE2OTQwMDg2MzcuMC4wLjA.
[2]: https://docs.datadoghq.com/real_user_monitoring/#get-started
[3]: https://docs.datadoghq.com/real_user_monitoring/session_replay/mobile/
[4]: https://app.datadoghq.com/rum/sessions
[5]: https://docs.datadoghq.com/real_user_monitoring/explorer/search/#facets
[6]: https://docs.datadoghq.com/real_user_monitoring/explorer/saved_views/