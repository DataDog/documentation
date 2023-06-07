---
title: Session Replay
kind: documentation
description: Learn about how to capture and visually replay your users' web browsing experience with Session Replay.
aliases:
- /real_user_monitoring/guide/session-replay-getting-started/
further_reading:
- link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
  tag: 'Blog'
  text: 'Use Datadog Session Replay to view real-time user journeys'
- link: 'https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/'
  tag: 'Blog'
  text: 'Use funnel analysis to understand and optimize key user flows'
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
---

## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

## Session Replay recorder

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the [browser support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Web Setup

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up [Datadog RUM Browser Monitoring][4] by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK. For setup in mobile environments, see [Mobile Session Replay](#mobile-session-replay).

<div class="alert alert-info">You must be on the latest version of the SDK (v3.6.0 or later)</div>

## Usage

The Session Replay does not start recording automatically when calling `init()`. To start the recording, call `startSessionReplayRecording()`. This can be useful to conditionally start the recording, for example, to only record authenticated user sessions:

```javascript
window.DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  ...
});

if (user.isAuthenticated) {
    window.DD_RUM.startSessionReplayRecording();
}
```

To stop the Session Replay recording, call `stopSessionReplayRecording()`.

### Disable Session Replay

To stop session recordings, remove `startSessionReplayRecording()` and set `sessionReplaySampleRate` to `0`. This stops collecting data for [Browser RUM & Session Replay plan][5], which includes replays.

## Mobile Session Replay

<div class="alert alert-warning">
Session Replay is currently in a public beta for native mobile apps. As such, there is no billing at the time.
</div>

### Overview

Mobile Session Replay expands visibility into your mobile applications by visually replaying each user interaction. It is available for native apps on both Android and iOS.

### Setup

{{< tabs >}}
{{% tab "Android" %}}

All Session Replay SDK versions can be found in the [Maven Snapshots Repository][1].

1. Make sure you've [setup and initialized the Datadog Android RUM SDK][2]
2. In order to use the SNAPSHOTS in your Gradle dependencies, you will need to add this repository as a source in your repository configuration in your `build.gradle` file:

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}
   repositories {
        maven {
         url ="https://oss.sonatype.org/content/repositories/snapshots"
        }
        }

        dependencies {
           implementation 'com.datadoghq:dd-sdk-android:1.19.0-sr-beta1-SNAPSHOT'
           implementation 'com.datadoghq:dd-sdk-android-session-replay:1.19.0-sr-beta1-SNAPSHOT'
           implementation 'com.datadoghq:dd-sdk-android-session-replay-material:1.19.0-sr-beta1-SNAPSHOT' // in case you need material support

        }
   {{< /code-block >}}

3. Once the DD SDK and Session Replay SDK dependencies are imported, you can enable the feature when configuring the SDK:
   ```kotlin
      val config = Configuration.Builder(
         logsEnabled = true,
         tracesEnabled = true,
         crashReportsEnabled = true,
         rumEnabled = true
      )
      ...
      .build()

      ...

      Datadog.initialize(context, credentials, config, trackingConsent) 
      val sessionReplayConfig = SessionReplayConfiguration.Builder()
         // in case you need material extension support
         .addExtensionSupport(MaterialExtensionSupport()) 
         .build()
      val sessionReplayFeature = SessionReplayFeature(sessionReplayConfig)
      Datadog.registerFeature(sessionReplayFeature)
   ```

By default, the Session Replay recorder masks all recorded content with `*` to ensure no sensitive information is visible in the recorded session. If you want to change this, we have an option to unmask data in all recorded content:

```kotlin
val sessionReplayConfig = SessionReplayConfiguration.Builder()
 ...
.setSessionReplayPrivacy(SessionReplayPrivacy.[PRIVACY])
.build()
```

#### v1.19.0

We now support 3 privacy options:

1. `MASK_ALL` - The default privacy level, which masks all the content in the session replay recording.
2. `MASK_USER_INPUT` - This masks any content that is considered user input, such as input fields, date pickers, time pickers, and dropdowns.
3. `ALLOW_ALL` - This does not mask anything except for sensitive fields, such as passwords, emails, phone numbers, and addresses.

[1]: https://oss.sonatype.org/content/repositories/snapshots/
[2]: /real_user_monitoring/android/?tab=kotlin

{{% /tab %}}

{{% tab "iOS" %}}

iOS content here.

{{% /tab %}}
{{< /tabs >}}

### Sampling


### Privacy configuration


### Troubleshooting


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/browser/#setup
[5]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
