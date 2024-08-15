---
title: Mobile Session Replay
description: Setting up Session Replay for mobile devices.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

<div class="alert alert-warning">
Mobile Session Replay is in public beta for native mobile apps. There is no billing for this feature.
</div>

## Overview

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

{{< img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="An example of a Mobile Session Replay recording" video="true" style="width:60%;">}}

## Session Replay recorder

The Session Replay recorder is part of the RUM Mobile SDK. The recorder turns the native view's hierarchies into a sequence of flat "wireframes".

A wireframe describes individual rectangular areas in the mobile app screen. It is an abstract type, which means it doesn't always correspond 1:1 to a native view, or live inside the views hierarchy.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the browser support table.


To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Setup

Learn how to [Setup and Configure Mobile Session Replay][1].
## Privacy options

See [Privacy Options][2].

## How Mobile Session Replay impacts app performance

See [How Mobile Session Replay Impacts App Performance][3].

## Troubleshooting

Learn how to [Troubleshoot Mobile Session Replay][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/mobile/setup_and_configuration
[2]: /real_user_monitoring/session_replay/mobile/privacy_options
[3]: /real_user_monitoring/session_replay/mobile/app_performance
[4]: /real_user_monitoring/session_replay/mobile/troubleshooting
