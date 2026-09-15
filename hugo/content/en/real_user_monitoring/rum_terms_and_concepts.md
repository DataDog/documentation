---
title: RUM Terms and Concepts
description: Learn essential RUM terminology including sessions, views, actions, resources, errors, and other key concepts for monitoring frontend applications.
further_reading:
- link: "/real_user_monitoring/setup/"
  tag: "Documentation"
  text: "Set up RUM for your application"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your RUM data"
- link: "/real_user_monitoring/retain_and_recover_valuable_sessions/"
  tag: "Documentation"
  text: "Control which sessions Datadog retains"
- link: "/real_user_monitoring/enrich_rum_data/"
  tag: "Documentation"
  text: "Enrich RUM data with additional context"
- link: "/glossary/"
  tag: "Documentation"
  text: "Datadog Glossary"
---

## Overview

RUM provides visibility into the real-time activity and experience of the users of your web and mobile applications. This page describes essential terms and concepts used throughout the RUM product.

For additional definitions and descriptions of general Datadog terms, see the [main Glossary][1].

| Concept                                | Description                                                                                                                        |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| [RUM Application](#rum-application)     | The application or environment a set of RUM data is grouped under, identified by an Application ID and Client Token.                |
| [Session](#session)                     | A user journey on your application, made up of the views, actions, resources, errors, and other events generated during that visit. |
| [View](#view)                           | A web page, mobile screen, or hybrid view a user visits during a session.                                                            |
| [Action](#action)                       | A discrete user interaction, such as a click, tap, or custom action defined in your code.                                            |
| [Resource](#resource)                   | A network request made by your application, such as an XHR, fetch, or asset load.                                                    |
| [Error](#error)                         | A frontend error, unhandled exception, or crash captured during a session.                                                           |
| [Long Task](#long-task)                 | A task that blocks the main thread long enough to affect the responsiveness of your application.                                     |
| [Vitals](#vitals)                       | Performance scores, such as Core Web Vitals or Mobile Vitals, that measure the quality of the user experience.                       |
| [Frustration Signal](#frustration-signals) | A user behavior, such as a rage click or error click, that indicates a poor experience.                                           |
| [Session Replay](#session-replay)       | A visual, replayable recording of a user's browsing session.                                                                         |
| [Sampling](#sampling)                   | The rate at which sessions or replays are collected and sent to Datadog.                                                             |
| [Retention Filters and Quotas](#retention-filters-and-quotas) | Controls that determine which sessions Datadog retains and how many are retained per day.                        |
| [Context](#context)                     | Custom or global attributes attached to RUM events to add business or user-specific information.                                     |

## RUM Application

A RUM application represents a single web or mobile application, or one environment of it, in Datadog. Each RUM application has its own **Application ID** and **Client Token**, which you use to [configure the SDK][2] to send data to Datadog. All sessions, views, actions, resources, and errors are grouped under the RUM application that collected them.

## Session

A session is a user journey on your web or mobile application. A session includes all related navigation events (views), user actions, network requests (resources), crashes and errors, and other events and signals that collectively produce a faithful representation of the user experience.

A session can last up to 4 hours, and expires after 15 minutes of inactivity. If the user interacts with the application after either limit, a new session starts automatically.

For more information, see [Session Definition][3].

## View

A view represents a web page, mobile screen, or hybrid web view that a user visits. Views track metrics like load time, [Core Web Vitals or Mobile Vitals](#vitals), and the actions, resources, and errors that occur while the view is active.

To learn more, see [Track Views][4].

## Action

An action is a discrete user interaction with your application, such as a click, tap, or a custom action instrumented in your code. Datadog automatically tracks common actions and lets you add [custom actions][5] to track behavior specific to your application.

## Resource

A resource is a network request made by your application, such as an XHR, fetch call, or the loading of an image, script, or stylesheet. Resources include timing information that helps you identify slow network calls, and can be [connected to backend traces][6] for full-stack visibility.

## Error

An error is a frontend JavaScript error, unhandled promise rejection, mobile crash, or other exception captured during a session. Datadog groups related errors together with [Error Tracking][7] to help you identify and resolve issues faster.

## Long Task

A long task is a task that blocks the browser's main thread for an extended period of time, preventing the application from responding to user input. Long tasks are a common cause of poor [UI latency vitals](#vitals).

## Vitals

Vitals are standardized performance scores that measure the quality of the user experience. For web applications, this includes [Core Web Vitals][8] such as Largest Contentful Paint and Cumulative Layout Shift. For mobile applications, this includes [Mobile Vitals][9] such as hitch rate and hang rate.

## Frustration signals

Frustration signals are user behaviors that indicate a poor experience, such as rage clicks (repeated clicks on the same area), error clicks, and dead clicks. Frustration signals help you identify parts of your application where users are struggling.

## Session Replay

Session Replay allows you to capture and visually replay the browsing experience of your users. Combined with RUM performance data, Session Replay is useful for error identification, reproduction, and resolution.

To learn more, see [Session Replay][10].

## Sampling

Sampling controls what percentage of sessions and session replays are collected and sent to Datadog. Sampling is configured in the SDK and helps you manage data volume while still computing accurate metrics over your overall traffic.

## Retention filters and quotas

Retention filters and quotas are part of [RUM without Limits][11], and determine which sessions Datadog retains for further investigation. Retention filters use tag-based rules to keep the sessions that matter most to your business, while retention quotas cap the number of sessions retained per application per day.

To learn more, see [Retain and Recover Valuable Sessions][12].

## Context

Context is custom or global information attached to RUM events, such as a user's ID, subscription plan, or feature flags. Adding context lets you segment and filter your RUM data by business-relevant attributes.

To learn more, see [Enrich RUM Data][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/
[2]: /real_user_monitoring/setup/
[3]: /real_user_monitoring/#session-definition
[4]: /real_user_monitoring/setup/enable_rum/track_navigation/
[5]: /real_user_monitoring/setup/enable_rum/track_user_interactions/
[6]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/
[7]: /real_user_monitoring/error_tracking/
[8]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser#core-web-vitals
[9]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=ios#mobile-vitals
[10]: /session_replay/
[11]: /real_user_monitoring/rum_without_limits/
[12]: /real_user_monitoring/retain_and_recover_valuable_sessions/
[13]: /real_user_monitoring/enrich_rum_data/
