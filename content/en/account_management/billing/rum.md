---
title: Real User Monitoring billing FAQ
kind: faq
---

## How is a session defined?

A session is a user journey on your web or mobile application. A session usually includes multiple page views with their associated telemetry.

## When does a session expire?

A session expires after 15 minutes of inactivity, and its duration is limited to 4 hours. After 4 hours, a new session is automatically created. 

## What data does Datadog Real User Monitoring (RUM) collect?

Datadog collects all the pages visited by your end users along with the telemetry that matters: resources loading (XHRs, images, CSS files, JS scripts, etc), frontend errors, crash reports and long tasks. All of this is included in the user session. Datadog charges per ten thousand (10,000) sessions ingested in the Datadog Real User Monitoring (RUM) service.

## Do you handle single page applications?

Yes, without any configuration on your side. Datadog RUM automatically tracks page changes.

## Can I view endpoint requests end-to-end?

Yes. With the out-of-the-box APM integration, you can tie any XHR/Fetch request to its corresponding backend trace.

## Can I view logs from the browser collector in RUM?

Yes. Browser logs are automatically tied to the corresponding RUM session, enabling you to monitor when they happen during the end user journey.

## Do you use cookies?

Yes. Datadog uses cookies to stitch together the various steps of your users into a session. This process does not use cross-domain cookies, and it does not track the actions of your users outside your applications.
