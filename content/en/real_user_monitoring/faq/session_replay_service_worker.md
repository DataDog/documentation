---
title: Allow Third-Party Service Worker for Session Replay
kind: faq
further_reading:
    - link: '/real_user_monitoring/session_replay/'
      tag: 'Get Started'
      text: 'Session Replay'
---

## Overview

Session Replay uses a Service Worker in another domain `session-replay-datadoghq.com` to provide the best experience possible while protecting your privacy and guaranteeing the safety of your data.

If you have blocked third-party cookies in your browser settings, or if your browser blocks them by default, this prevents the service worker from registering correctly.

### Allow an exception

Datadog recommends that you make an exception to your third-party cookie blocking to allow Session Replay's service worker to function properly.

{{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Allow Session Replay Third-Party Service Worker" >}}

{{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Allow Session Replay Third-Party Service Worker" >}}
