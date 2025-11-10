---
title: Error Tracking Replay Snippets
is_beta: true
private: false
description: Learn about how to collect replay snippets to ensure you are seeing the issues that matter to you.
further_reading:
- link: '/error_tracking/suspect_commits'
  tag: 'Documentation'
  text: 'Learn about how Error Tracking can identify suspect commits'
- link: '/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking'
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Error Tracking Replay snippets is in Preview.
{{< /beta-callout >}}

## Overview

As a frontend engineer, an essential and often time-consuming part of the debugging process is reproducing bugs. But it can be difficult to do so without a clear understanding of the actions a user took before your application throws an error.

Error Tracking Replay Snippets allows you to view a pixel-perfect recreation of a user's journey 15 seconds before and after an error occurred so you can reproduce bugs, save time, and eliminate any guesswork.

## Setup

1. If you have not set up Datadog Frontend Error Tracking, follow the [in-app setup instructions][1] or see the setup documentation for [browser][2] and [mobile][3].
2. During SDK initialization, configure your application's replay sample rate. 

   {{< tabs >}}
   {{% tab "Browser" %}}

   Set the `sessionReplaySampleRate` between 1 and 100. 

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      applicationId: '<APP_ID>',
      clientToken: '<CLIENT_TOKEN>',
      service: '<SERVICE>',
      env: '<ENV_NAME>',
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
   });
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}
   Follow [these steps][4] to setup and configure your mobile application's error replay for this platform.

   [4]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   Follow [these steps][5] to setup and configure your mobile application's error replay for this platform.

   [5]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   Follow [these steps][6] to setup and configure your mobile application's error replay for this platform.

   [6]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=kotlinmultiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   Follow [these steps][7] to setup and configure your mobile application's error replay for this platform.

   [7]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=reactnative
   {{% /tab %}}
   {{</tabs>}}

## Replay errors
After reviewing key information about the error, such as the error message and stack trace, you can immediately pivot directly from the issue summary to a live reproduction of the most recent session that experienced the error. Scroll down below the stack trace and click on the preview of the replay to see a users actions before the error occurred. 

{{< img src="error_tracking/error-replay.png" alt="Error Tracking Replay Snippet" style="width:90%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /error_tracking/frontend/browser#setup
[3]: /error_tracking/frontend/mobile
