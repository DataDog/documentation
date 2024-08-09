---
title: Allow Third-Party Service Workers For Session Replay

aliases:
  - /real_user_monitoring/faq/session_replay_service_worker/
further_reading:
- link: '/real_user_monitoring/session_replay/browser/'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

Session Replay uses a Service Worker in another domain `session-replay-datadoghq.com` to provide the best experience possible while protecting your privacy and guaranteeing the safety of your data.

If you have blocked third-party cookies in your browser settings, or if your browser blocks them by default, this prevents the service worker from registering correctly.

### Allow an exception

Datadog recommends that you make an exception to your third-party cookie blocking to allow Session Replay's service worker to function properly.

If you use Google Chrome, follow the instructions below. This exception workflow also applies to Firefox and other desktop browsers, including Brave and Edge.

1. In your web browser, click the **Lock** icon to the left of the page URL.
2. Click **Cookies**. A pop-up modal appears.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Allow Session Replay Third-Party Service Worker" >}}

3. Navigate to the **Blocked** tab and select `session-replay-datadoghq.com` from the list of pages.
4. Click **Allow** and **Done**.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Allow Session Replay Third-Party Service Worker" >}}

Once you have updated your cookie settings, reload the page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}