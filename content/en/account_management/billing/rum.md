---
title: RUM & Session Replay Billing
kind: documentation
further_reading:
- link: "/real_user_monitoring/"
  tag: "Documentation"
  text: "Learn about RUM & Session Replay"
---

## Overview

This page contains common questions and answers about billing topics for RUM & Session Replay.

## How is a session defined?

A session is a user journey on your web or mobile application. A session usually includes multiple page views with their associated telemetry.

## When does a session expire?

A session expires after 15 minutes of inactivity, and its duration is limited to 4 hours. After 4 hours, a new session is automatically created. 

## What data does Datadog RUM & Session Replay collect?

Datadog collects all the pages visited by your end users along with the telemetry that matters, such as resources loading (XHRs, images, CSS files, and JS scripts), frontend errors, crash reports, and long tasks. All of this is included in the user session. For Session Replay, Datadog creates an iframe based on snapshots of the DOM. Datadog charges per one thousand (1,000) sessions ingested in the Datadog Real User Monitoring (RUM) service.

## Does Datadog handle single page applications?

Yes, without any configuration on your side. Datadog RUM automatically tracks page changes.

## How do you view endpoint requests end-to-end?

With the out-of-the-box APM integration, you can tie any XHR or Fetch request to its corresponding backend trace.

## How do you view logs from the browser collector in RUM?

Browser logs are automatically tied to the corresponding RUM session, enabling you to monitor when they happen during the end user journey.

## Does Datadog use cookies?

Yes. Datadog uses cookies to stitch together the various steps of your users into a session. This process does not use cross-domain cookies, and it does not track the actions of your users outside your applications.

## My Usage page shows RUM sessions billed under the Replay Plan, but I have not configured capturing session recordings for my application.

The Session Replay Plan includes session recordings (replays), resources, and long tasks. 

- If you are collecting any of the three in your sessions, you are billed for the sessions under the Replay Plan.
- If you want to disable sessions recordings from being captured, see the [Session Replay documentation][1].
- If you want to disable resources and long tasks from being captured, see the [Browser Monitoring documentation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/#how-do-you-disable-session-replay
[2]: /real_user_monitoring/browser/#browser-and-session-replay-sampling-configuration
