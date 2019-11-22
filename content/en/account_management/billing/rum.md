---
title: Real User Monitoring billing FAQ
kind: faq
---

#### How is a session defined?

A session is a user journey on your web application. It expires after 15 minutes of inactivity.

#### What data does Datadog’s RUM collect?

Datadog collects all the pages visited by your end users along with the telemetry that matters: resources loading (XHRs, images, CSS files, JS scripts, etc), frontend errors and long tasks. All of this is included in the user session. Datadog charges per ten thousand sessions ingested in the Datadog Real User Monitoring (RUM) service.

#### Do you handle Single Page Application?

Yes, without any configuration on your side. Datadog RUM automatically track page changes so you are confident about which pages your users visit.

#### Can I view endpoint requests end-to-end?

Yes, with the out-of-the-box APM integration, you are able to tie back any XHR/Fetch request to their corresponding back-end trace.

#### Can I view logs from the browser collector in RUM?

Yes, browser logs are automatically tied to the corresponding RUM session, making it easy to monitor when they happen during the end user journey.

#### Do you use cookies?

Yes, Datadog does it to stitch together the various steps of your users into a session. It doesn't use cross-domain cookies and doesn't track the actions of your users outside your applications.
