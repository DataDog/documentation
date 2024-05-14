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

## How long are Session Replay recordings?

Session Replay recordings can vary based on the session length. For example, if you're observing short, 5-8 second Session Replays, that means the user ended their session after 5-8 seconds.

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

## My Usage page shows RUM sessions billed under the Browser RUM & Session Replay Plan, but I have not configured capturing session recordings for my application.

The **Browser RUM & Session Replay** Plan unlocks session recordings (replays).

- If you are collecting replays, you are billed for the sessions under the Replay Plan.

- If you want to disable session recordings from being captured, see the [Session Replay documentation][1].

## How do webviews in mobile applications impact session recordings and billing?

When a mobile application contains webviews and you've instrumented both your web and mobile applications with Datadog SDKs, a bridge is created. All events recorded by the Browser SDK on the web app that are loaded through the webview are forwarded to the Mobile SDK. These events are linked to the session that started on the mobile application.

In other words, only the one RUM mobile session is visible in Datadog and therefore is the only one that is billable.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="If you've instrumented both your web and mobile applications with Datadog SDKs, you are only be billed for the mobile session." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser#disable-session-replay
