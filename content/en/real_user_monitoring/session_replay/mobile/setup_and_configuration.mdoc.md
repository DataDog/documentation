---
title: Mobile Session Replay Setup and Configuration
description: Setting up and configuring Mobile Session Replay.
content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
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

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="build.gradle.kts" %}
CODE HERE
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" %}
CODE HERE
```
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
```kotlin {% filename="build.gradle.kts" %}
CODE HERE
```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" %}
CODE HERE
```
{% /if %}
<!-- end React Native -->

## Setup

<!-- Android -->
{% if equals($platform, "android") %}
All Session Replay SDK versions can be found in the [Maven Central Repository][android-setup-1].

To set up Mobile Session Replay for Android:

1. Make sure you've [set up and initialized the Datadog Android RUM SDK][android-setup-2] with views instrumentation enabled.

2. Declare the Datadog Session Replay as a dependency:
    ```kotlin {% filename="build.gradle.kts" %}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // in case you need Material support
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
    // in case you need Jetpack Compose support
    implementation("com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]")
    ```

3. Enable Session Replay in your app:
    ```kotlin {% filename="build.gradle.kts" %}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      // in case you need Material extension support
      .addExtensionSupport(MaterialExtensionSupport())
      // in case you need Jetpack Compose support
      .addExtensionSupport(ComposeExtensionSupport())
      .build()

    SessionReplay.enable(sessionReplayConfig)
    ```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To set up Mobile Session Replay for iOS:

1. Make sure you've [set up and initialized the Datadog iOS RUM SDK][ios-setup-1] with views instrumentation enabled.

2. Link the Datadog Session Replay library to your project based on your package manager:

   | Package manager            | Installation step                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][ios-setup-2]             | Add `pod 'DatadogSessionReplay'` to your `Podfile`.                                         |
   | [Swift Package Manager][ios-setup-3] | Add `DatadogSessionReplay` library as a dependency to your app target.                      |
   | [Carthage][ios-setup-4]              | Add `DatadogSessionReplay.xcframework` as a dependency to your app target.                  |

3. Enable Session Replay in your app:

   ```swift {% filename="AppDelegate.swift" %}
   import DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate,
           // Enable the experimental SwiftUI recording
           featureFlags: [.swiftui: true]
       )
   )
   ```
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
All Session Replay SDK versions can be found in the [Maven Central Repository][kotlin-setup-1].

To set up Mobile Session Replay for Kotlin Multiplatform:

1. Make sure you've [setup and initialized the Datadog Kotlin Multiplatform RUM SDK][kotlin-setup-2] with views instrumentation enabled.

2. Add the `DatadogSessionReplay` iOS library as a link-only dependency. For instructions, see the [guide][kotlin-setup-3].

2. Declare Datadog Session Replay as a dependency:
   ```kotlin {% filename="build.gradle.kts" %}
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
   ```

3. Enable Session Replay in your app:

   ```kotlin {% filename="build.gradle.kts" %}
   // in common source set
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .build()
   SessionReplay.enable(sessionReplayConfig)
   ```

4. In case you need Material support on Android, call the `SessionReplayConfiguration.Builder.addExtensionSupport(MaterialExtensionSupport())` method, available in the Android source set.
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}

{% alert level="warning" %}
To enable Session Replay, you must use at least version `2.0.4` of the Datadog [React Native SDK][rn-setup-A], and ensure that the Session Replay SDK version matches the React Native SDK version you are using.
{% /alert %}

All Session Replay SDK versions can be found in the [npmjs repository][rn-setup-1].

To set up Mobile Session Replay for React Native:

1. Make sure you've [set up and initialized the Datadog React Native SDK][rn-setup-2] with views instrumentation enabled.

2. Add the `@datadog/mobile-react-native-session-replay` dependency, and make sure it matches the `@datadog/mobile-react-native` version, either through [yarn][rn-setup-3] or [npm][rn-setup-4].

   ```shell
   yarn add @datadog/mobile-react-native-session-replay
   ```

   ```shell
   npm install @datadog/mobile-react-native-session-replay
   ```

2. After the Datadog React Native SDK and Session Replay SDK dependencies are imported, you can enable the feature when configuring the SDK:

   - If you use the `DatadogProvider` component:

     ```typescript {% filename="App.tsx" %}

     import { DatadogProvider, DatadogProviderConfiguration } from "@datadog/mobile-react-native";
    import {
      ImagePrivacyLevel,
      SessionReplay,
      TextAndInputPrivacyLevel,
      TouchPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

     const configuration = new DatadogProviderConfiguration(/* ... */)

     // Add this function as onInitialization prop to DatadogProvider
     const onSDKInitialized = async () => {
         await SessionReplay.enable({
            replaySampleRate: 100,
            textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS, 
            imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE, 
            touchPrivacyLevel: TouchPrivacyLevel.SHOW, 
         });
     };

     const App = () => {
       const navigationRef = React.useRef(null);
       return (
         <DatadogProvider configuration={configuration} onInitialization={onSDKInitialized}>
           {/* App */}
         </DatadogProvider>
       );
     };

     export default App;
    ```

   - If you use the `DdSdkReactNative.initialize` method:

     ```typescript {% filename="App.tsx" %}

     import { DdSdkReactNative, DdSdkReactNativeConfiguration } from "@datadog/mobile-react-native";
     import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

     const configuration = new DdSdkReactNativeConfiguration(/* ... */)

    DdSdkReactNative.initialize(configuration)
      .then(() => SessionReplay.enable())
      .catch((error) => { /* handle error */ });
    ```

3. Enable Session Replay in your app, after initializing the Datadog SDK:
   ```typescript {% filename="App.tsx" %}

   import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

   SessionReplay.enable();

   ```

4. Define the configuration for Session Replay:

   ```typescript {% filename="App.tsx" %}

      SessionReplay.enable({
        replaySampleRate: 100, // Session Replay will be available for all sessions already captured by the SDK
      });

   ```

   During this step, you can also configure multiple [privacy levels][rn-setup-5] that apply to Session Replays.

5. (iOS only) Update your iOS pods.
   ```shell
      cd ios && pod install
   ```
6. Rebuild your iOS and Android apps.
{% /if %}
<!-- end React Native -->

## Web view instrumentation

You can record the entire user journey across both [web and native views][1] on iOS or Android and watch it in a single Session Replay.

The Session Replay is recorded through the Browser SDK, then the Mobile SDK handles the batching and uploading of the webview recording.

<!-- Android -->
{% if equals($platform, "android") %}
To instrument your consolidated web and native Session Replay views for Android:

1. Ensure you are using version [`2.8.0`][android-wvi-2] or higher of the Android SDK.
2. Enable [webview tracking][android-wvi-3] for your mobile application.
3. Enable [Session Replay][android-wvi-4] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To instrument your consolidated web and native Session Replay views for iOS:

1. Ensure you are using version [`2.13.0`][200-1] or higher of the iOS SDK.
2. Enable [webview tracking][200-2] for your mobile application.
3. Enable [Session Replay][200-3] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
To instrument your consolidated web and native Session Replay views for Kotlin Multiplatform:

1. Enable [webview tracking][201-1] for your mobile application.
2. Enable [Session Replay][201-2] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
To instrument your consolidated web and native Session Replay views for React Native:

1. Enable [webview tracking][202-1] for your React Native application.
2. Enable [Session Replay][202-2] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).

**Note**: This feature is not compatible with React Native's [New Architecture][202-3] for Android.
{% /if %}
<!-- end React Native -->

## Additional configuration
### Set the sample rate for recorded sessions to appear

The sample rate is an optional parameter in the Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all RUM sessions include a replay. If the sample rate is not specified in the configuration, the default value of 100 is applied.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="build.gradle.kts" %}
val sessionReplayConfig = SessionReplayConfiguration.Builder(<SAMPLE_RATE>)
  ...
  .build()
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" %}
var sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: <SAMPLE_RATE>
)
```
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
```kotlin {% filename="build.gradle.kts" %}
val sessionReplayConfig = SessionReplayConfiguration.Builder(<SAMPLE_RATE>)
  ...
  .build()
```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" %}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: <SAMPLE_RATE>
});
```
{% /if %}
<!-- end React Native -->

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

{{% tab "Kotlin Multiplatform" %}}


{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
        .startRecordingImmediately(false)
        .build()
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

[android-setup-1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-android-session-replay/versions
[android-setup-2]: /real_user_monitoring/android/?tab=kotlin

[ios-setup-1]: /real_user_monitoring/ios/?tab=swift
[ios-setup-2]: https://cocoapods.org/
[ios-setup-3]: https://www.swift.org/package-manager/
[ios-setup-4]: https://github.com/Carthage/Carthage

[kotlin-setup-1]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions
[kotlin-setup-2]: /real_user_monitoring/kotlin_multiplatform/
[kotlin-setup-3]: /real_user_monitoring/kotlin_multiplatform/#add-native-dependencies-for-ios

[rn-setup-1]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions\
[rn-setup-2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/
[rn-setup-3]: https://yarnpkg.com/package?q=datadog%20react%20native%20ses&name=%40datadog%2Fmobile-react-native-session-replay
[rn-setup-4]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions
[rn-setup-5]: /real_user_monitoring/session_replay/mobile/privacy_options/?tab=reactnative
[rn-setup-A]: https://github.com/DataDog/dd-sdk-reactnative

[android-wvi-2]: https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0
[android-wvi-3]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views
[android-wvi-4]: /real_user_monitoring/session_replay/browser/#setup

[200-1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[200-2]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking/?tab=ios#instrument-your-web-views
[200-3]: /real_user_monitoring/session_replay/browser/#setup

[201-1]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/web_view_tracking/?tab=kotlinmultiplatform#instrument-your-web-views
[201-2]: /real_user_monitoring/session_replay/browser/#setup

[202-1]: /real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=reactnative#instrument-your-web-views
[202-2]: /real_user_monitoring/session_replay/browser/#setup
[202-3]: https://reactnative.dev/architecture/landing-page