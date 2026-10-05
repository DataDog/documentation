---
title: RUM Terms and Concepts
description: Learn essential RUM terminology including sessions, views, actions, resources, errors, and other key concepts for monitoring frontend applications.
further_reading:
- link: "/real_user_monitoring/setup/"
  tag: "Documentation"
  text: "Set up RUM for your application"
- link: "/real_user_monitoring/investigate_problems/explore_retained_data/"
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
| [RUM application](#rum-application)     | The application or environment a set of RUM data is grouped under, identified by an Application ID and Client Token.                |
| [Session](#session)                     | The activity of a single user on your application, made up of the views, actions, resources, errors, and other events they generate.     |
| [View](#view)                           | A web page, mobile screen, or hybrid view a user visits during a session.                                                            |
| [Action](#action)                       | A discrete user interaction, such as a click, tap, or custom action defined in your code.                                            |
| [Resource](#resource)                   | A network request made by your application, such as an XHR, fetch, or asset load.                                                    |
| [Error](#error)                         | A frontend error, unhandled exception, or crash captured during a session.                                                           |
| [Long task](#long-task)                 | A task that blocks the main thread for longer than a threshold, affecting the responsiveness of your application.                     |
| [Vitals](#vitals)                       | Performance scores, such as Core Web Vitals or Mobile Vitals, reported as attributes on view events. Also the name of a legacy custom timer event. |
| [Operation](#operation)                 | A critical technical step in your application, such as a login or a checkout payment, tracked from start to success or failure.     |
| [Frustration signals](#frustration-signals) | A user behavior, such as a rage click or error click, that indicates a poor experience.                                           |
| [Session Replay](#session-replay)       | A visual, replayable recording of a user's session in your web or mobile application.                                                |
| [Sampling](#sampling)                   | Client-side sample rates that control the volume of data the SDK sends to Datadog.                                                   |
| [Retention filters and quotas](#retention-filters-and-quotas) | Server-side controls that determine which ingested sessions Datadog retains and how many are retained per day.  |
| [Technical limitations](#technical-limitations) | Limits that apply to RUM sessions, events, and uploaded files.                                                              |
| [Context](#context)                     | Custom or global attributes attached to RUM events to add business or user-specific information.                                     |

## RUM application

A RUM application represents a single web or mobile application, or one environment of it, in Datadog. Each RUM application has its own **Application ID** and **Client Token**, which you use to [configure the SDK][2] to send data to Datadog. All sessions, views, actions, resources, and errors are grouped under the RUM application that collected them.

## Session

A session groups the activity of a single user on your web or mobile application. A session includes all related navigation events (views), user actions, network requests (resources), crashes and errors, and other events and signals that collectively produce a faithful representation of the user experience.

A session can last up to 4 hours, and expires after 15 minutes of inactivity. If the user interacts with the application after either limit, a new session starts automatically. For other limits that apply to sessions, see [Technical limitations](#technical-limitations).

## View

A view represents a web page, mobile screen, or hybrid web view that a user visits. Views track metrics like load time, [Core Web Vitals or Mobile Vitals](#vitals), and the actions, resources, and errors that occur while the view is active.

To learn more, see [Track Navigation][4].

## Action

An action is a discrete user interaction with your application, such as a click, tap, or a custom action instrumented in your code. Datadog automatically tracks common actions and lets you add [custom actions][5] to track behavior specific to your application.

## Resource

A resource is a network request made by your application, such as an XHR, fetch call, or the loading of an image, script, or stylesheet. Resources include timing information that helps you identify slow network calls, and can be [connected to backend traces][6] for full-stack visibility.

## Error

An error is a frontend JavaScript error, unhandled promise rejection, mobile crash, or other exception captured during a session. Datadog groups related errors together with [Error Tracking][7] to help you identify and resolve issues faster.

## Long task

A long task is a task that blocks the main thread for longer than a threshold (50 ms on Browser, configurable on mobile), preventing the application from responding to user input. Long tasks are a common cause of poor [UI latency vitals](#vitals).

## Vitals

Vitals are standardized performance scores that measure the quality of the user experience. For web applications, this includes [Core Web Vitals][8] such as Largest Contentful Paint and Cumulative Layout Shift. For mobile applications, this includes [Mobile Vitals][9] such as hitch rate and hang rate. RUM reports these scores as attributes on view events, not as separate events.

RUM also has a legacy **vital** event type, which records custom timers that you start and stop in your code. To measure the duration and outcome of a technical step in your application, use [operations](#operation) instead.

## Operation

An operation represents a critical technical step in your application that users expect to complete reliably, such as logging in, adding a payment method, or submitting a search. You instrument the start and the success or failure of each operation in your code. Operations are bound to a RUM session but can span multiple views, and Datadog computes availability and latency metrics for them.

To learn more, see [Track Critical Operations][3].

## Frustration signals

Frustration signals are user behaviors that indicate a poor experience, such as rage clicks (repeated clicks on the same area), error clicks, and dead clicks. Frustration signals help you identify parts of your application where users are struggling.

## Session Replay

Session Replay allows you to capture and visually replay the user experience in your web or mobile application. Combined with RUM performance data, Session Replay is useful for error identification, reproduction, and resolution.

To learn more, see [Session Replay][10].

## Sampling

RUM provides two complementary ways to control data volume:

- **Head-based, client-side sample rates** are configured in the SDK and decide, when a session starts, how much data is sent to Datadog. Separate sample rates apply to different dimensions, such as sessions, Session Replay recordings, backend traces, and profiles. To learn more, see [Manage Sessions][14].
- **Tail-based, server-side controls** apply after Datadog ingests the data, and let you selectively retain the sessions that matter most. See [Retention filters and quotas](#retention-filters-and-quotas).

Datadog recommends sending 100% of sessions and using retention filters to control which sessions are retained. Metrics computed from ingested sessions remain accurate regardless of how many sessions are retained.

## Retention filters and quotas

Retention filters and quotas are part of [RUM without Limits][11], and determine which sessions Datadog retains for further investigation. Retention filters use deterministic rules, based on event attributes and tags, to keep the sessions that matter most to your business, while retention quotas cap the number of sessions retained per application per day.

To learn more, see [Retain and Recover Valuable Sessions][11].

## Context

Context is custom or global information attached to RUM events, such as a user's ID, subscription plan, or [feature flags][13]. Adding context lets you segment and filter your RUM data by business-relevant attributes.

To learn more, see [Enrich RUM Data][12].

## Technical limitations

| Property                                   | Limitation               |
| ------------------------------------------ | ------------------------ |
| Maximum duration of a session              | 4 hours                  |
| Timeout of a session                       | 15 minutes of inactivity |
| Maximum number of events per session       | 10 million               |
| Maximum number of attributes per event     | 1,000                    |
| Maximum attribute depth per event          | 20                       |
| Maximum event size                         | 1 MB                     |
| Maximum intake payload size                | 5 MB                     |
| Maximum source maps and mapping files size | 500 MB per file          |
| Maximum dSYM files size                    | 2 GB per file            |
| Maximum delay at ingestion                 | 24 hours                 |

If an event exceeds any of these limits, the Datadog intake rejects it.

## Next step

Continue to [Set Up RUM](/real_user_monitoring/setup/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/
[2]: /real_user_monitoring/setup/
[3]: /real_user_monitoring/track_critical_operations/
[4]: /real_user_monitoring/setup/enable_rum/track_navigation/
[5]: /real_user_monitoring/setup/enable_rum/track_user_interactions/
[6]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/
[7]: /real_user_monitoring/investigate_problems/triage_errors_and_crashes/
[8]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser#event-timings-and-core-web-vitals
[9]: /real_user_monitoring/setup/enable_rum/track_ui_latency/
[10]: /session_replay/
[11]: /real_user_monitoring/retain_and_recover_valuable_sessions/
[12]: /real_user_monitoring/enrich_rum_data/
[13]: /real_user_monitoring/enrich_rum_data/track_feature_flags/
[14]: /real_user_monitoring/setup/enable_rum/manage_sessions/
