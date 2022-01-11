---
title: Allow Third-Party Service Worker for Session Replay
kind: faq
further_reading:
    - link: '/real_user_monitoring/session_replay/'
      tag: 'Get Started'
      text: 'Session Replay'
---

## Third-Party Cookie Blocking And Session Replay

Session Replay uses a *Service Worker* in a different domain (*session-replay-datadoghq.com*) to provide the best experience possible whilst protecting your privacy and guaranteeing the safety of your data.

If you have blocked third-party cookies in your browser settings, or if your browser blocks them by default, this can prevent the service worker from registering correctly.

### Allow an exception

Datadog's recommended solution is to make an exception to your third-party cookie blocking, to allow Session Replay's service worker to work and enjoy the most performant replaying experience:

{{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1" alt="Allow Session Replay Third-Party Service Worker" >}}

{{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2" alt="Allow Session Replay Third-Party Service Worker" >}}