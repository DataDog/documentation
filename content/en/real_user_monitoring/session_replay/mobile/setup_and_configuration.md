---
title: Mobile Session Replay Setup and Configuration
description: Setting up and configuring Mobile Session Replay.
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/app_performance'
      tag: Documentation
      text: How Mobile Session Replay Impacts App Performance
    - link: '/real_user_monitoring/session_replay/mobile/privacy_options'
      tag: Documentation
      text: Mobile Session Replay Privacy Options
    - link: '/real_user_monitoring/session_replay/mobile/troubleshooting'
      tag: Documentation
      text: Troubleshoot Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
    - link: '/real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking'
      tag: Documentation
      text: Web View Tracking
---

## Setup

{{< tabs >}}
{{% tab "Android" %}}

All Session Replay SDK versions can be found in the [Maven Central Repository][1].

To set up Mobile Session Replay for Android:

1. Make sure you've [setup and initialized the Datadog Android RUM SDK][2] with views instrumentation enabled.

2. Declare the Datadog Session Replay as a dependency:
  {{< code-block lang="kotlin" filename="build.gradle.kts" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // in case you need Material support
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
    // in case you need Jetpack Compose support
    implementation("com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]")
   {{< /code-block >}}

3. Enable Session Replay in your app:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // in case you need Material extension support
    .addExtensionSupport(MaterialExtensionSupport())
    // in case you need Jetpack Compose support
    .addExtensionSupport(ComposeExtensionSupport)
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-android-session-replay/versions
[2]: /real_user_monitoring/android/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

To set up Mobile Session Replay for iOS:

1. Make sure you've [set up and initialized the Datadog iOS RUM SDK][1] with views instrumentation enabled.

2. Link the Datadog Session Replay library to your project based on your package manager:

   | Package manager            | Installation step                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2]             | Add `pod 'DatadogSessionReplay'` to your `Podfile`.                                         |
   | [Swift Package Manager][3] | Add `DatadogSessionReplay` library as a dependency to your app target.                      |
   | [Carthage][4]              | Add `DatadogSessionReplay.xcframework` as a dependency to your app target.                  |

3. Enable Session Replay in your app:

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   import DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate,
           // Enable the experimental SwiftUI recording
           featureFlags: [.swiftui: true]
       )
   )
   {{< /code-block >}}

[1]: /real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

All Session Replay SDK versions can be found in the [Maven Central Repository][1].

To set up Mobile Session Replay for Kotlin Multiplatform:

1. Make sure you've [setup and initialized the Datadog Kotlin Multiplatform RUM SDK][2] with views instrumentation enabled.

2. Add the `DatadogSessionReplay` iOS library as a link-only dependency. For instructions, see the [guide][3].

2. Declare Datadog Session Replay as a dependency:
  {{< code-block lang="kotlin" filename="build.gradle.kts" disable_copy="false" collapsible="true" >}}
    kotlin {
      sourceSets {
        commonMain.dependencies {
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-rum:[datadog_version]")
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-session-replay:[datadog_version]")
        }

        // in case you need Material support on Android
        androidMain.dependencies {
          implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
        }
      }
    }
   {{< /code-block >}}

3. Enable Session Replay in your app:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   // in common source set
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

4. In case you need Material support on Android, call the `SessionReplayConfiguration.Builder.addExtensionSupport(MaterialExtensionSupport())` method, available in the Android source set.

[1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions
[2]: /real_user_monitoring/kotlin_multiplatform/
[3]: /real_user_monitoring/kotlin_multiplatform/#add-native-dependencies-for-ios

{{% /tab %}}

{{% tab "React Native" %}}

All Session Replay SDK versions can be found in the [npmjs repository][1].

To set up Mobile Session Replay for React Native:

1. Make sure you've [setup and initialized the Datadog React Native SDK][2] with views instrumentation enabled.

2. Add the `@datadog/mobile-react-native-session-replay` dependency, and make sure it matches the `@datadog/mobile-react-native` version.

2. Enable Session Replay in your app, after initializing the Datadog SDK:
   {{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
   import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

   SessionReplay.enable();
   {{< /code-block >}}

[1]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions\
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/
{{% /tab %}}

{{< /tabs >}}

## Web view instrumentation

You can record the entire user journey across both [web and native views][1] on iOS or Android and watch it in a single Session Replay.

The Session Replay is recorded through the Browser SDK, then the Mobile SDK handles the batching and uploading of the webview recording.

{{< tabs >}}
{{% tab "Android" %}}

To instrument your consolidated web and native Session Replay views for Android:

1. Ensure you are using version [`2.8.0`][2] or higher of the Android SDK.
2. Enable [webview tracking][3] for your mobile application.
3. Enable [Session Replay][4] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).

[1]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0
[3]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views
[4]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "iOS" %}}

To instrument your consolidated web and native Session Replay views for iOS:

1. Ensure you are using version [`2.13.0`][1] or higher of the iOS SDK.
2. Enable [webview tracking][2] for your mobile application.
3. Enable [Session Replay][3] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[2]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking/?tab=ios#instrument-your-web-views
[3]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

To instrument your consolidated web and native Session Replay views for Kotlin Multiplatform:

1. Enable [webview tracking][1] for your mobile application.
2. Enable [Session Replay][2] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).

[1]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/web_view_tracking/?tab=kotlinmultiplatform#instrument-your-web-views
[2]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "React Native" %}}

To instrument your consolidated web and native Session Replay views for React Native:

1. Enable [webview tracking][1] for your React Native application.
2. Enable [Session Replay][2] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).


**Note**: This feature is not compatible with React Native's [New Architecture][3] for Android.

[1]: /real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=reactnative#instrument-your-web-views
[2]: /real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{< /tabs >}}

## Additional configuration
### Set the sample rate for recorded sessions to appear

The sample rate is an optional parameter in the Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all RUM sessions include a replay. If the sample rate is not specified in the configuration, the default value of 100 is applied.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
  ...
  .build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
var sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate
)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
  ...
  .build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: [sampleRate]
});
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Start or stop the recording manually

By default, Session Replay starts recording automatically. However, if you prefer to manually start recording at a specific point in your application, you can use the optional `startRecordingImmediately` parameter as shown below, and later call `SessionReplay.startRecording()`. You can also use `SessionReplay.stopRecording()` to stop the recording anytime.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
        .startRecordingImmediately(false)
        .build()
    // Do something
    SessionReplay.startRecording()
    SessionReplay.stopRecording()
{{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate,
        startRecordingImmediately: false
    )
    // Do something
    SessionReplay.startRecording()
    SessionReplay.stopRecording()
{{< /code-block >}}

{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: sampleRate,
  startRecordingImmediately: false
});
// Do something
SessionReplay.startRecording();
SessionReplay.stopRecording();
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Validate whether Session Replay data is being sent

To validate whether Session Replay data is being sent from the app, you can enable debug option in Datadog SDK:

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(Log.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
Datadog.verbosityLevel = .debug
{{< /code-block >}}

If everything is fine, following logs should appear in the Xcode debug console in about 30 seconds after launching the app:

{{< code-block lang="bash" filename="Xcode console" disable_copy="true" >}}

[DATADOG SDK] 🐶 → 10:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 10:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]

{{< /code-block >}}

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "React Native" %}}

Set the verbosity to `DEBUG` when you initialize the SDK:

{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}

import { SdkVerbosity } from "@datadog/mobile-react-native";

...

config.verbosity = SdkVerbosity.DEBUG;

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Privacy options

See [Privacy Options][2].



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking
[2]: /real_user_monitoring/session_replay/mobile/privacy_options
[3]: https://reactnative.dev/architecture/landing-page
