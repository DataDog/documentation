---
title: Troubleshooting Mobile Session Replay
kind: documentation
description: Describes how to troubleshoot Mobile Session Replay
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Some parts of my application are not visible in the player, or I see a blank screen

Mobile Session Replay supports native frameworks only today. Within these frameworks, there may certain components/screens missing such as:

- Screens built with SwiftUI (iOS) or Jetpack Compose (Android)
- Web Views
- Certain system elements (continually being updated) such as actionBar in Android, progress bars, and spinners
- Rich system contents such as video players, music player, map widgets
- Views that are using direct canvas drawing
- Advanced text styling

## The session replay rendering looks similar to, but does not exactly mirror my app
Mobile Session Replay's approach combines performance with usability. To achieve that, it's not a pixel perfect recreation of your app, but instead it takes a hybrid approach to the visual: we build a scaffold of the screen that can later be enriched with styling and contextual images. 

## I am concerned about using Mobile Session replay in tandem with other SDKs
There is no harm to this. Mobile Session Replay only reads application view hierarchy without ever modifying the property.

## I want to ensure we account for mobile app consent when collecting mobile session replays.
Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. Upon starting the SDK, a tracking consent value needs to be set (granted, not granted or pending).

- If the value is not granted, then no data is ever written on disk. 
- If the value is pending, the data is written in a temporary folder which cannot be uploaded to Datadog. 
- If the value is granted, data is written in an "upload" folder, which is processed in the background, and eventually uploaded to Datadog.

At any time during the lifetime of the host app, it's possible to change the tracking consent. When the consent changes from pending to granted, the data in the temporary folder is moved to the "upload" folder. 

## For my sessions that are very short, I see I have a replay attached but I am unable to view the replay.
When sessions are 1 nanosecond long, we are unable to process the record and thus there would be no replay attached. 
