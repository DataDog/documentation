---
title: Session Replay
description: Learn about how to capture and visually replay your users' web browsing or mobile app experience with Session Replay.
aliases:
- /real_user_monitoring/guide/session-replay-getting-started/
further_reading:
- link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
  tag: 'Blog'
  text: 'Use Datadog Session Replay to view real-time user journeys'
- link: 'https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/'
  tag: 'Blog'
  text: 'Use funnel analysis to understand and optimize key user flows'
- link: 'https://www.datadoghq.com/blog/zendesk-session-replay-integration/'
  tag: 'Blog'
  text: 'Visually replay user-facing issues with Zendesk and Datadog Session Replay'
- link: '/integrations/content_security_policy_logs'
  tag: 'Documentation'
  text: 'Detect and aggregate CSP violations with Datadog'
---


## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing or mobile app experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your application's usage patterns and design pitfalls.

## Browser Session Replay

Browser Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

Learn more about the [Session Replay for Browsers][3].

## Mobile Session Replay

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

Learn more about the [Session Replay for Mobile][4].

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" >}}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][5] or side panel. Included playbacks also generate an [Audit Trail][6] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][7] playlist.

## Playlists

You can create a playlist of Session Replays to organize them by any patterns you notice. Learn more about [Session Replay Playlists][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: /real_user_monitoring/session_replay/browser/
[4]: /real_user_monitoring/session_replay/mobile/
[5]: https://docs.datadoghq.com/notebooks/
[6]: https://docs.datadoghq.com/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /real_user_monitoring/session_replay/playlists