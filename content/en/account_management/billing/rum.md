---
title: Real User Monitoring Billing
kind: documentation
---

## How is a session defined?

A session is a user journey on your web or mobile application. A session usually includes multiple page views with their associated telemetry.

## When does a session expire?

A session expires after 15 minutes of inactivity, and its duration is limited to 4 hours. After 4 hours, a new session is automatically created. 

## What data does Datadog Real User Monitoring (RUM) collect?

Datadog collects all the pages visited by your end users along with the telemetry that matters: resources loading (XHRs, images, CSS files, JS scripts, etc), frontend errors, crash reports, and long tasks. All of this is included in the user session. For Session Replay, Datadog creates an iframe based on snapshots of the DOM. Datadog charges per one thousand (1,000) sessions ingested in the Datadog Real User Monitoring (RUM) service.

## Does Datadog handle single page applications?

Yes, without any configuration on your side. Datadog RUM automatically tracks page changes.

## How do you view endpoint requests end-to-end?

With the out-of-the-box APM integration, you can tie any XHR/Fetch request to its corresponding backend trace.

## How do you view logs from the browser collector in RUM?

Browser logs are automatically tied to the corresponding RUM session, enabling you to monitor when they happen during the end user journey.

## Does Datadog use cookies?

Yes. Datadog uses cookies to stitch together the various steps of your users into a session. This process does not use cross-domain cookies, and it does not track the actions of your users outside your applications.

## Session replays show up in my Usage page, but I have not configured Session Replay in my environment

Session Replay includes replays, long tasks, and resources. If you are collecting any of the three, you are billed for Session Replay.
