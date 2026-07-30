<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
-->

## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing or mobile app experience of your users. Session Replay is available in both [RUM][1] and [Product Analytics][2], helping you identify and reproduce errors, understand user journeys, and gain insights into your application's usage patterns and design pitfalls.

<!-- Browser -->
{% if equals($platform, "browser") %}
## Browser Session Replay

Browser Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][3] and uses the open source [rrweb][4] project.

### How the Session Replay recorder works

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK. For more information, see the [browser support table][5].

To reduce Session Replay's network impact and keep the recorder's overhead on your application's performance to a minimum, Datadog compresses the data before sending it.

Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.
{% /if %}
<!-- end Browser -->

<!-- Android, iOS, Kotlin Multiplatform, React Native, or Flutter -->
{% if includes($platform, ["android", "ios", "kotlin_multiplatform", "react_native", "flutter"]) %}
## Mobile Session Replay

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

{% img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="An example of a Mobile Session Replay recording" video="true" style="width:60%;" /%}

### How the Session Replay recorder works

The Session Replay recorder is built into the RUM Mobile SDK. Unlike web browsers, mobile apps don't use HTML or CSS. Instead, the recorder takes a "snapshot" of your app's screen by breaking it into rectangles called "wireframes." It then keeps track of changes by only updating the wireframes that have changed, making the process efficient and fast.

#### Wireframe concept

A _wireframe_ is like a digital sticky note marking a specific area of your app's screen, such as a button, image, or background. Each wireframe is a rectangle that helps the recorder keep track of what's on the screen.

**Examples of wireframes:**
- A text label becomes a "text" wireframe, defined by its position and size.
- The app's background is a "shape" wireframe—a rectangle that covers the whole screen.
- Any container with a solid background is also a "shape" wireframe.
- Images or icons are "image" wireframes, which can include style details like transparency.
- Even complex elements, like a map with many parts, can be combined into a single "image" wireframe.

#### Recording algorithm

The recorder scans your app's screen from the background to the front, looking for all the visible parts. It creates a wireframe for each one. For example, a screen with 78 different elements can be simplified into 25 wireframes:

{% img src="real_user_monitoring/session_replay/mobile/how-it-works/recording-algorithm-3.png" alt="An example of how the Shopist app screen contains 78 native views, but is made up of 25 wireframes." style="width:70%;" /%}

Wireframes are recorded in the order they appear on the screen (from back to front) and are placed using exact screen positions. There's no complicated tree structure, only a flat list of rectangles.

#### Rendering algorithm

When you watch a replay, Datadog's player rebuilds the screen by drawing each wireframe in order. It uses the position and size of each rectangle to put everything in the right place. The first wireframe sets the screen size and orientation (portrait or landscape).

Each new wireframe is drawn on top of the previous ones, like stacking transparent sheets. This lets the player show things like overlapping or semi-transparent elements correctly.

For instance, the screenshot displayed above is reconstructed in 25 passes:

| Iteration | 1 | 2 | 3 |
|-----------|---|---|---|
| Viewport | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-1-1.png" alt="An example of a 'shape' wireframe." style="width:100%;" /%} | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-2-1.png" alt="An example of an 'image' wireframe." style="width:100%;" /%} | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-3-1.png" alt="An example of a 'text' wireframe." style="width:100%;" /%} |

The first wireframe dictates the viewport size, enabling the Session Replay player to properly represent the device's screen size and orientation (landscape / portrait).

| Iteration | 4 | 5-11 | 12-13 |
|-----------|---|---|---|
| Viewport | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-4-1.png" alt="An example of a 'shape', 'image', and 'text' wireframe." style="width:100%;" /%} | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-5-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:100%;" /%} | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-6-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:100%;" /%} |

Because wireframes are sorted in back-to-front order, the player redraws the existing portions of the frame, which is desirable because it supports several UI patterns (such as semi-transparent elements).

| Iteration | 14-25 | Final result |
|-----------|-------|--------------|
| Viewport | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-7-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:60%;" /%} | {% img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-final-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:60%;" /%} |

#### Full and incremental snapshots

A "full snapshot" is like taking a picture of the entire screen, with all its wireframes. But to save time and data, the recorder usually sends "incremental snapshots", which are updates that include only the wireframes that have changed.

Each wireframe has a unique ID (like a name tag), so the recorder knows exactly which ones to update. For example:
- If a wireframe moves, only its new position and ID are sent.
- If a wireframe disappears, the update says which ID was removed.
- If only the content changes (like new text), the update includes the new content and the wireframe's ID.

Below are examples showing how incremental snapshots only send updates for impacted wireframes.

| Example | Description |
|---------|-------------|
| {% img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-change-position.mp4" alt="A snapshot a wireframe position changing but the content and appearance is not altered." video="true" /%} | If a wireframe position changes, but its content and appearance aren't altered, the incremental snapshot only needs to include new positions for impacted wireframes and their `UUIDs`. This might correspond to a "slow scrolling" scenario or any other scenario where only a portion of the screen is moved. |
| {% img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-wireframe-disappears.mp4" alt="An example of a wireframe disappearing from the screen." video="true" /%} | If a wireframe disappears from the screen, an incremental snapshot may only include information on removed `UUIDs`. Alternatively, the snapshot could always include information about the remaining `UUIDs`. |
| {% img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-content-only.mp4" alt="An example of only the content of a wireframe changing." video="true" /%} | If only the content of a wireframe changes, an incremental update includes only the new content and the `UUID` of the altered wireframe. |

In summary, the Session Replay recorder breaks your app's screen into rectangles called wireframes. It only tracks and sends updates for the parts that change, making replays efficient and accurate.

{% alert level="info" %}
For Session Replay, Datadog supports RUM for native iOS and Android mobile apps, but not for smart TVs or wearables.
{% /alert %}
{% /if %}
<!-- end Android, iOS, Kotlin Multiplatform, React Native, or Flutter -->

## AI-powered summaries and smart chapters

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
This feature is not supported for your selected [Datadog site]({% region-param key="dd_site_name" /%}).
{% /alert %}
{% /site-region %}

Summaries and smart chapters give you context about what happened in a session before you watch it.

**Summaries** describe the user's intent, key actions, friction signals, and outcome. Specific moments in the summary are hyperlinked so you can jump directly to that point in the replay. In the session list, hover over a replay to preview the summary, or open the replay directly. If a session has been summarized before, the summary appears instantly when you open the replay.

{% img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="AI-powered summary in the Session Replay player, showing user intent, key actions, friction signals, and hyperlinked moments" style="width:100%;" /%}

**Smart chapters** automatically segment the replay timeline into labeled stages of the user journey. For example, in an ecommerce session, chapters might include "Browse lighting", "Shop bedding and chairs", and "Review cart and checkout". Chapters appear when you hover over the timeline and in the dropdown on the player controls, letting you jump directly between them.

{% img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Smart chapter dropdown in the Session Replay player showing labeled stages of the user journey" style="width:100%;" /%}

AI summaries and smart chapters are generated for sessions with at least four user actions and a duration of at least 45 seconds.

## Comments

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
This feature is not supported for your selected [Datadog site]({% region-param key="dd_site_name" /%}). If you require this capability, contact [Datadog Support][6].
{% /alert %}
{% /site-region %}

Session Replay comments allow your team to collaborate on bugs, usability issues, and other observations directly within a replay.

With comments, you can:

- Add a comment at a specific timestamp on the replay timeline. Comment markers appear on the timeline and the {% ui %}Comments{% /ui %} tab.
- @mention a teammate or team in a comment. Tagged users receive an email notification with a link that opens the replay at the commented timestamp.
- Copy a link to any comment and share it externally. The link opens the replay at the annotated moment with that comment thread open.
- Reply in-thread to collaborate within a replay, and edit or delete your own comments as needed.

{% img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Session Replay player with timestamped comments on the timeline and a Comments tab open with threaded replies." style="width:100%;" /%}

To find replays that need your attention, use the {% ui %}All mentions to me{% /ui %} and {% ui %}Commented replays{% /ui %} default playlists. See [Session Replay Playlists][7] for details.

## Extend data retention

By default, Session Replay data is retained for 30 days.

To extend Session Replay data retention to 15 months, you can enable {% ui %}Extended Retention{% /ui %} on individual session replays. These sessions must be non-active (the user has completed their experience).

To access any Session Replay at a later time, Datadog recommends saving the URL or adding it to a [Playlist][7].

Extended Retention only applies to Session Replay and does not include associated events. The 15 months start when Extended Retention is enabled, not when the session is collected.

You can disable Extended Retention at any time. If the session replay is still within its default 30 days of retention, the replay expires at the end of the initial 30 day window. If you disable Extended Retention on a session replay that is older than 30 days, the replay immediately expires.

{% img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Enable extended retention" style="width:100%;" /%}

See the diagram below to understand what data is retained with extended retention.

{% img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagram of what data is retained with extended retention" style="width:100%;" /%}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{% img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" /%}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][8] or side panel. Included playbacks also generate an [Audit Trail][9] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [{% ui %}My Watch History{% /ui %}][10] playlist.

## Playlists

You can create a playlist of Session Replays to organize them by any patterns you notice. Learn more about [Session Replay Playlists][7].

## Dev Tools

Dev Tools is a built-in debugging panel in Session Replay that exposes key information during playback. Use it to identify issues, trace requests, and understand performance bottlenecks, all without reproducing the issue yourself. Dev Tools are available for [RUM][1] sessions.

Learn more about [Dev Tools][11].

[1]: /real_user_monitoring/
[2]: /product_analytics/
[3]: https://github.com/DataDog/browser-sdk
[4]: https://www.rrweb.io/
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[6]: /help/
[7]: /session_replay/playlists
[8]: /notebooks/
[9]: /account_management/audit_trail/
[10]: /rum/replay/playlists/my-watch-history
[11]: /session_replay/dev_tools
