---
title: Mobile Session Replay
description: Setting up Session Replay for mobile devices.
aliases:
  - /real_user_monitoring/session_replay/mobile/
  - /product_analytics/session_replay/mobile/
further_reading:
  - link: '/session_replay'
    tag: Documentation
    text: Session Replay
---
## Overview

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

{{< img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="An example of a Mobile Session Replay recording" video="true" style="width:60%;">}}

## How the Session Replay recorder works

The Session Replay recorder is built into the RUM Mobile SDK. Unlike web browsers, mobile apps don't use HTML or CSS. Instead, the recorder takes a "snapshot" of your app's screen by breaking it into simple rectangles called "wireframes." It then keeps track of changes by only updating the wireframes that have changed, making the process efficient and fast.

### Wireframe concept

A _wireframe_ is like a digital sticky note that marks a specific area of your app's screen, such as a button, image, or background. Each wireframe is a rectangle that helps the recorder keep track of what's on the screen.

**Examples of wireframes:**
- A text label becomes a "text" wireframe, defined by its position and size.
- The app's background is a "shape" wireframe—a rectangle that covers the whole screen.
- Any container with a solid background is also a "shape" wireframe.
- Images or icons are "image" wireframes, which can include style details like transparency.
- Even complex elements, like a map with many parts, can be combined into a single "image" wireframe.

### Recording algorithm

The recorder scans your app's screen from the background to the front, looking for all the visible parts. It creates a wireframe for each one. For example, a screen with 78 different elements can be simplified into just 25 wireframes:

{{< img src="real_user_monitoring/session_replay/mobile/how-it-works/recording-algorithm-3.png" alt="An example of how the Shopist app screen contains 78 native views, but is made up of 25 wireframes." style="width:70%;">}}

Wireframes are recorded in the order they appear on the screen (from back to front) and are placed using exact screen positions. There's no complicated tree structure, just a simple, flat list of rectangles.

### Rendering algorithm

When you watch a replay, Datadog's player rebuilds the screen by drawing each wireframe in order. It uses the position and size of each rectangle to put everything in the right place. The first wireframe sets the screen size and orientation (portrait or landscape).

Each new wireframe is drawn on top of the previous ones, like stacking transparent sheets. This lets the player show things like overlapping or semi-transparent elements correctly.

For instance, the screenshot displayed above is reconstructed in 25 passes:

| Iteration | 1 | 2 | 3 |
|-----------|---|---|---|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-1-1.png" alt="An example of a 'shape' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-2-1.png" alt="An example of an 'image' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-3-1.png" alt="An example of a 'text' wireframe." style="width:100%;">}} |

The first wireframe dictates the viewport size, enabling the Session Replay player to properly represent the device's screen size and orientation (landscape / portrait).

| Iteration | 4 | 5-11 | 12-13 |
|-----------|---|---|---|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-4-1.png" alt="An example of a 'shape', 'image', and 'text' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-5-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-6-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:100%;">}} |

Because wireframes are sorted in back-to-front order, the player redraws the existing portions of the frame, which is desirable because it supports several UI patterns (such as semi-transparent elements).

| Iteration | 14-25 | Final result |
|-----------|-------|--------------|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-7-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:60%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-final-1.png" alt="An example of a 'shape' and 'image' wireframe." style="width:60%;">}} |

### Full and incremental snapshots

A "full snapshot" is like taking a picture of the entire screen, with all its wireframes. But to save time and data, the recorder usually sends "incremental snapshots", which are updates that include only the wireframes that have changed.

Each wireframe has a unique ID (like a name tag), so the recorder knows exactly which ones to update. For example:
- If a wireframe moves, only its new position and ID are sent.
- If a wireframe disappears, the update says which ID was removed.
- If only the content changes (like new text), the update includes the new content and the wireframe's ID.

Below are examples showing how incremental snapshots only send updates for impacted wireframes.

| Example | Description |
|---------|-------------|
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-change-position.mp4" alt="A snapshot a wireframe position changing but the content and appearance is not altered." video="true" >}} | If a wireframe position changes, but its content and appearance aren't altered, the incremental snapshot only needs to include new positions for impacted wireframes and their `UUIDs`. This might correspond to a "slow scrolling" scenario or any other scenario where only a portion of the screen is moved. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-wireframe-disappears.mp4" alt="An example of a wireframe disappearing from the screen." video="true" >}} | If a wireframe disappears from the screen, an incremental snapshot may only include information on removed `UUIDs`. Alternatively, the snapshot could always include information about the remaining `UUIDs`. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-content-only.mp4" alt="An example of only the content of a wireframe changing." video="true" >}} | If only the content of a wireframe changes, an incremental update includes only the new content and the `UUID` of the altered wireframe. |

In summary, the Session Replay recorder breaks your app's screen into simple rectangles called wireframes. It only tracks and sends updates for the parts that change, making replays efficient and accurate.

## Setup

Learn how to [set up and configure Mobile Session Replay][2].
## Privacy options

See [Privacy Options][3].

## How Mobile Session Replay impacts app performance

See [how Mobile Session Replay impacts app performance][4].

## Dev tools

See [Dev Tools][5].

## Troubleshooting

Learn how to [troubleshoot Mobile Session Replay][6].

<div class="alert alert-info">For Session Replay, Datadog supports RUM for native iOS and Android mobile apps, but not for smart TVs or wearables.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /session_replay/browser/#how-it-works
[2]: /session_replay/mobile/setup_and_configuration
[3]: /session_replay/mobile/privacy_options
[4]: /session_replay/mobile/app_performance
[5]: /session_replay/#dev-tools
[6]: /session_replay/mobile/troubleshooting