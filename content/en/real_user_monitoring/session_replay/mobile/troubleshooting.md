---
title: Troubleshooting Mobile Session Replay
description: How to troubleshoot Mobile Session Replay.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/setup_and_configuration'
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/app_performance'
      tag: Documentation
      text: How Mobile Session Replay Impacts App Performance
    - link: '/real_user_monitoring/session_replay/mobile/privacy_options'
      tag: Documentation
      text: Mobile Session Replay Privacy Options
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---
## Session replays
### Some parts of the application are blank or not visible in the player

Mobile Session Replay only supports native frameworks. Within these frameworks, there may be certain components or screens missing, such as:

- Screens built with SwiftUI (iOS) or Jetpack Compose (Android)
- Web Views
- Certain system elements, such as actionBar in Android, progress bars, and spinners
- Rich system contents, such as video players, music player, and map widgets
- Views that use direct canvas drawing
- Advanced text styling

### The session replay rendering looks does not exactly mirror my application
Mobile Session Replay's approach combines performance with usability. To achieve this, it's not a pixel-perfect recreation of your app, but instead it takes a hybrid approach to the visual: it displays a scaffold of the screen that can later be enriched with styling and contextual images.

### For sessions that are very short, I see a replay attached, but I'm unable to view the replay
When sessions are 1 nanosecond long, Datadog is unable to process the record, so there is no replay attached.

## Data security
### I need to account for mobile app consent when collecting mobile session replays
Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. Upon starting the SDK, a tracking consent value needs to be set to one of the following:

- If the value is **not granted**, then no data is ever written on disk. 
- If the value is **pending**, the data is written in a temporary folder which cannot be uploaded to Datadog. 
- If the value is **granted**, data is written in an "upload" folder, which is processed in the background, and eventually uploaded to Datadog.

At any time during the lifetime of the host app, it's possible to change the tracking consent. When the consent changes from pending to granted, the data in the temporary folder is moved to the "upload" folder.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
