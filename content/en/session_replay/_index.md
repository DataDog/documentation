---
title: Session Replay
description: Learn about how to capture and visually replay your users' web browsing or mobile app experience with Session Replay.
aliases:
- /real_user_monitoring/guide/session-replay-getting-started/
- /real_user_monitoring/session_replay/
- /product_analytics/session_replay/
- /real_user_monitoring/session_replay/developer_tools
- /real_user_monitoring/session_replay/browser/developer_tools
- /product_analytics/session_replay/browser/developer_tools
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
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
- link: '/integrations/content_security_policy_logs'
  tag: 'Documentation'
  text: 'Detect and aggregate CSP violations with Datadog'
---

## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing or mobile app experience of your users. Session Replay is available in both [RUM][1] and [Product Analytics][2], helping you identify and reproduce errors, understand user journeys, and gain insights into your application's usage patterns and design pitfalls.

## Browser Session Replay

Browser Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][3] and leverages the open source [rrweb][4] project.

Learn more about the [Session Replay for Browsers][5].

## Mobile Session Replay

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

Learn more about the [Session Replay for Mobile][6].

## Extend data retention

By default, Session Replay data is retained for 30 days.

To extend Session Replay data retention to 15 months, you can enable _Extended Retention_ on individual session replays. These sessions must be non-active (the user has completed their experience).

To access any Session Replay at a later time, Datadog recommends saving the URL or adding it to a [Playlist][7].

Extended Retention only applies to Session Replay and does not include associated events. The 15 months start when Extended Retention is enabled, not when the session is collected.

You can disable Extended Retention at any time. If the session replay is still within its default 30 days of retention, the replay expires at the end of the initial 30 day window. If you disable Extended Retention on a session replay that is older than 30 days, the replay immediately expires.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Enable extended retention" style="width:100%;" >}}

Refer to the below diagram to understand what data is retained with extended retention.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagram of what data is retained with extended retention" style="width:100%;" >}}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" >}}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][8] or side panel. Included playbacks also generate an [Audit Trail][9] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][10] playlist.

## Playlists

You can create a playlist of Session Replays to organize them by any patterns you notice. Learn more about [Session Replay Playlists][7].

## Dev Tools

Dev Tools is a built-in debugging panel in Session Replay that exposes key information during playback. Use it to identify issues, trace requests, and understand performance bottlenecks—all without reproducing the issue yourself. Dev Tools are available for [RUM][1] sessions.

Learn more about Dev Tools for [browser][11] and [mobile][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /product_analytics/
[3]: https://github.com/DataDog/browser-sdk
[4]: https://www.rrweb.io/
[5]: /session_replay/browser/
[6]: /session_replay/mobile/
[7]: /session_replay/playlists
[8]: /notebooks/
[9]: /account_management/audit_trail/
[10]: /rum/replay/playlists/my-watch-history
[11]: /session_replay/browser/dev_tools/
[12]: /session_replay/mobile/dev_tools/