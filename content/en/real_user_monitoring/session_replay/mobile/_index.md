---
title: Mobile Session Replay
description: Setting up Session Replay for mobile devices.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---
## Overview

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available for native apps on both Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

{{< img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="An example of a Mobile Session Replay recording" video="true" style="width:60%;">}}

## How the Session Replay recorder works

The Session Replay recorder is part of the RUM Mobile SDK. While [Browser Session Replay][1] relies on snapshots of the browser's DOM and CSS, mobile apps don't have HTML, DOM, or CSS, so the recorder instead turns the native view hierarchy into a sequence of flat "wireframes", and takes incremental snapshots of the relevant wireframes.

### Wireframe concept

A _wireframe_ describes individual rectangular areas in the mobile app screen. It is an abstract type, which means it doesn't always correspond 1:1 to a native view, or live inside the views hierarchy.

For further context, the following could be considered a wireframe:

- A label displaying text is considered a "text" wireframe. It uses a rectangle (x, y, width, height) to define its position.
- The application's background view is considered a "geometry" wireframe stretched across the entire app window. In most cases, it can be described as a basic rectangle of a single color.
- Any other container view in the app with an opaque background is a "geometry" wireframe.
- An image or icon displayed in the app is an "image" wireframe with a defined position and sometimes style (such as opacity or alpha).
- A map view hierarchy consisting of dozens of views (for rendering shapes and annotations) can be merged into a single "image" wireframe.

### Recording algorithm

Wireframes are constructed during the process of traverseing the app's view-tree in a bottom-up (or generally "back-to-front") order and determining visible elements. In the below example, the Shopist app screen is built with 78 native _views_, but it can be broken into 25 wireframes:

{{< img src="real_user_monitoring/session_replay/mobile/how-it-works/recording-algorithm-2.png" alt="An example of how the Shopist app screen contains 78 native views, but is made up of 25 wireframes." style="width:70%;">}}

These wireframes are recorded while **preserving their rendering order** (back-to-front) and **using absolute positioning** (in screen coordinates). There is no "tree structure", nor child-parent relationship between wireframes, therefore making the structure "flat".

### Rendering algorithm

To display the Replay of a single frame on Datadog, the Session Replay player iterates through all wireframes and renders one another into the viewport using geometry information (x, y, width, height) from each one. **It respects wireframes rendering order**, so that succeeding ones overdraw existing portions of the viewport.

For instance, the screenshot displayed above is reconstructed in 25 passes:

| Iteration | 1 | 2 | 3 |
|-----------|---|---|---|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-1.png" alt="An example of a 'geometry' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-2.png" alt="An example of an 'image' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-3.png" alt="An example of a 'text' wireframe." style="width:100%;">}} |

The first wireframe dictates the viewport size, enabling the Session Replay player to properly represent the device's screen size and orientation (landscape / portrait).

| Iteration | 4 | 5-11 | 12-13 |
|-----------|---|---|---|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-4.png" alt="An example of a 'geometry', 'image, and 'text' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-5.png" alt="An example of a 'geometry' and 'image' wireframe." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-6.png" alt="An example of a 'geometry' and 'image' wireframe." style="width:100%;">}} |

Because wireframes are sorted in back-to-front order, it overdraws the existing portion of the frame, which is a desirable behavior, as it helps support several UI patterns (for instance semi-transparent elements).

| Iteration | 14-25 | Final result |
|-----------|-------|--------------|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-7.png" alt="An example of a 'geometry' and 'image' wireframe." style="width:50%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-final.png" alt="An example of a 'geometry' and 'image' wireframe." style="width:50%;">}} |

### Full and incremental snapshots

To tie Mobile Session Replay back to its [Browser counterpart][1], the sequence of all visible wireframes is considered a full snapshot. But to avoid re-recording the entire screen when only incremental changes occur in the UI, the mobile SDK tags each wireframe with a unique identifier and sends incremental snapshots to Datadog. Since native views are objects, they can be identified by reference.

Below are examples of how incremental records are based on sending updates to only impacted wireframes.

| Example | Description |
|---------|-------------|
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-1.mp4" alt="An example of how an incremental record." video="true" >}} | If a wireframe position changes, but its content and appearance isn't altered, the incremental snapshot only needs to include new positions for impacted wireframes and their `uuids`. This might correspond to a "slow scrolling" scenario or any other scenario where only a portion of the screen is moved. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-2.mp4" alt="An example of how an incremental record." video="true" >}} | If a wireframe disappears from the screen, an incremental snapshot may only include information on removed `uuids`. Alternatively, it could always include information on remaining `uuids`. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-3.mp4" alt="An example of how an incremental record." video="true" >}} | If only the content of a wireframe changes, an incremental update only includes new content and the `uuid` of altered wireframes. |

## Setup

Learn how to [Setup and Configure Mobile Session Replay][2].
## Privacy options

See [Privacy Options][3].

## How Mobile Session Replay impacts app performance

See [How Mobile Session Replay Impacts App Performance][4].

## Troubleshooting

Learn how to [Troubleshoot Mobile Session Replay][5].

<div class="alert alert-info">For Session Replay, Datadog supports RUM for native iOS and Android mobile apps, but it is not supported for smart TVs or wearables.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser/#how-it-works
[2]: /real_user_monitoring/session_replay/mobile/setup_and_configuration
[3]: /real_user_monitoring/session_replay/mobile/privacy_options
[4]: /real_user_monitoring/session_replay/mobile/app_performance
[5]: /real_user_monitoring/session_replay/mobile/troubleshooting
