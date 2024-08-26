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

## How it works

The Session Replay recorder is part of the RUM Mobile SDK. While the recorder for the [RUM Browser SDK][1] relies on DOM and HTML to take snapshots, the RUM Mobile SDK does not have DOM and HTML, so the recorder instead turns the native view's hierarchies into a sequence of flat "wireframes" and takes incremental snapshots of the relevant wireframes.

### Wireframe concept

A _wireframe_ describes individual rectangular areas in the mobile app screen. It is an abstract type, which means it doesn't always correspond 1:1 to a native view, or live inside the views hierarchy.

For further context, the following could be considered a wireframe:

- A label displaying text is considered a "text" wireframe. It uses a rectangle (x, y, width, height) to define its position.
- The application's background view is considered a "geometry" wireframe stretched across the entire app window. In most cases, it can be described as a basic rectangle of a single color.
- Any other container view in the app with an opaque background is a "geometry" wireframe.
- An image or icon displayed in the app is an "image" wireframe with a defined position and sometimes style (such as opacity or alpha).
- A map view hierarchy consisting of dozens of views (for rendering shapes and annotations) can be merged into a single "image" wireframe.

### Recording algorithm

Wireframes are constructed during the process of traverseing the app's view-tree in a bottom-up (or generally "back-to-front") order and determining visible elements. In the below example, the iOS app screen is built with 78 native _views_, but it can be broken into 19 wireframes:

{{< img src="real_user_monitoring/session_replay/mobile/how-it-works/how-it-works-1.png" alt="An example of how the iOS app screen contains 78 native views, but is made up of 19 wireframes." style="width:60%;">}}

These wireframes can be sent to the player while **preserving their rendering order** (back-to-front) and **using absolute positioning** (in screen coordinates). There is no "tree structure", nor child-parent relationship between wireframes, therefore making the structure "flat".

### Rendering algorithm

To display a single replay frame, the player needs to iterate through all wireframes and render one another into the viewport using geometry information (x, y, width, height) from each wireframe. It must respect wireframes rendering order, so that succeeding ones overdraw existing portions of the viewport.

The above screen can be reconstructed in 19 passes of the renderer:

| Iteration | 1 | 2 | 3 |
|-----------|---|---|---|
| Viewport | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/how-it-works-1.png" alt="An example of how the iOS app screen contains 78 native views, but is made up of 19 wireframes." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/how-it-works-1.png" alt="An example of how the iOS app screen contains 78 native views, but is made up of 19 wireframes." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/how-it-works-1.png" alt="An example of how the iOS app screen contains 78 native views, but is made up of 19 wireframes." style="width:100%;">}} |
| Description | Draw "geometry" wireframe into viewport (rectangle + background color). The first wireframe could dictate the viewport size, enabling player size adjustment for given device + rotation (landscape / portrait). | Draw "image" wireframe (rectangle + image with given UUID fetched from our backend) | Draw "text" wireframe (rectangle + "Twin Lake" text + font color, family and size). |

| Iteration | 4 | 5-9 | 10-12 |
|-----------|---|---|---|
| | | |
| Description | | | Draw "image" and two "geometry" wireframes into viewport. Because wireframes are sorted in back-to-front order, it will overdraw existing portion of the frame. This is very much desirable. For semi-transparent elements, it can also do the job of proper blending "closer" elements with the "farer" ones. |

| Iteration | 13-19 | Final result |
|-----------|-------|--------------|
| | | |

### Full and incremental snapshots

The sequence of all visible wireframes can be considered a full snapshot record if it is referring to the web format. Sending it per frame in the replay is not optimal, which is why the recorder takes incremental snapshots.

To send incremental changes, the mobile SDK tags each wireframe with a unique identifier.

Incremental records are based on sending updates to only impacted wireframes.



Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the browser support table.


To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Setup

Learn how to [Setup and Configure Mobile Session Replay][2].
## Privacy options

See [Privacy Options][3].

## How Mobile Session Replay impacts app performance

See [How Mobile Session Replay Impacts App Performance][4].

## Troubleshooting

Learn how to [Troubleshoot Mobile Session Replay][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser/#how-it-works
[2]: /real_user_monitoring/session_replay/mobile/setup_and_configuration
[3]: /real_user_monitoring/session_replay/mobile/privacy_options
[4]: /real_user_monitoring/session_replay/mobile/app_performance
[5]: /real_user_monitoring/session_replay/mobile/troubleshooting
