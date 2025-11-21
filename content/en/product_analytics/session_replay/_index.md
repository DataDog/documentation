---
title: Replaying User Activity
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

## Start monitoring with Session Replay

{{< whatsnext desc="Choose your platform to get started with Session Replay:" >}}
  {{< nextlink href="/product_analytics/session_replay/browser">}}<u>Browser Session Replay</u>: Capture and visually replay web browsing experiences using the RUM Browser SDK with the open source rrweb project.{{< /nextlink >}}
  {{< nextlink href="/product_analytics/session_replay/mobile">}}<u>Mobile Session Replay</u>: Visually replay user interactions in native Android and iOS apps, including taps, swipes, and scrolls.{{< /nextlink >}}
{{< /whatsnext >}}

## Additional features

{{< whatsnext desc="Explore additional Session Replay capabilities:" >}}
  {{< nextlink href="/product_analytics/session_replay/playlists">}}<u>Playlists</u>: Organize and save session replays into playlists for easy access and sharing.{{< /nextlink >}}
  {{< nextlink href="/product_analytics/session_replay/heatmaps">}}<u>Heatmaps</u>: Visualize user interaction patterns with clickmaps and scrollmaps to identify engagement hotspots.{{< /nextlink >}}
{{< /whatsnext >}}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" >}}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][5] or side panel. Included playbacks also generate an [Audit Trail][6] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][7] playlist.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://docs.datadoghq.com/notebooks/
[6]: https://docs.datadoghq.com/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /product_analytics/session_replay/playlists