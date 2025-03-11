---
title: How Mobile Session Replay Impacts App Performance
description: Performance benchmarking for Mobile Session Replay.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/privacy_options'
      tag: Documentation
      text: Mobile Session Replay Privacy Options
    - link: '/real_user_monitoring/session_replay/mobile/setup_and_configuration'
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/troubleshooting'
      tag: Documentation
      text: Troubleshoot Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Overview
Session Replay leverages the existing mechanisms of batching and smart upload from the Datadog SDK core. These mechanisms enable efficient and optimized data transfer from your application to Datadog servers. By batching multiple events together and intelligently uploading them at appropriate intervals, Session Replay minimizes the overall impact on network and bandwidth usage while ensuring an efficient utilization of network resources.

Mobile Session Replay SDK supports a seamless user experience without impacting your application's performance.

## Main thread
The system responsible for capturing the current screen of your application runs in the UI Thread, which can potentially cause UI updates to be delayed. However, Datadog uses highly optimized processes to minimize the workload the SDK performs in the UI Thread.

Screens are captured between 64 ms to 100 ms (depending on the platform) and single screen capture takes 3 ms. All processing of the collected data happens on the background thread, without affecting your application's performance.

## Network
To minimize the total upload volume, Datadog employs a highly optimized wire format. As a result, you can expect to see an average bandwidth usage of around 12 KB/s for data sent to the Datadog servers on iOS, and 1.22 KB/s on Android. When image recording is enabled, applications with image-heavy content may experience a slightly higher initial volume. In cases when the device is disconnected from the network, the data is buffered to the device's disk storage until a high-bandwidth connection is reestablished.

## Application size
Datadog's SDK follows strict standards and aims to minimize the inclusion of third-party dependencies. This approach ensures that the SDK leverages as much native framework code as possible. On Android, the binary size produced by Datadog's own code in the AAR package is 480 kB. See more information on the application size impact [here][1]. On iOS, the size of exported `*.ipa` file will be higher by approximately 200 kB.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md?plain=1#L119