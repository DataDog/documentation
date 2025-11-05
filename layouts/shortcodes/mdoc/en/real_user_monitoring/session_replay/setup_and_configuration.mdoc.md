<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
-->
## Setup

<!-- Browser -->
{% if equals($platform, "browser") %}
To set up Session Replay for Browser:

### Step 1 - Set up the Browser SDK

Make sure you've set up the [RUM Browser SDK][100].

### Step 2 - Enable Session Replay

To enable Session Replay you have to specify the session replay sample rate. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all sessions include a replay.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.
See [Browser RUM & Session Replay sessions][101] for more information.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...
   sessionReplaySampleRate: 100,
   ...
});

```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      sessionReplaySampleRate: 100,
      ...
    });
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      ...
      sessionReplaySampleRate: 100,
      ...
    });
</script>
```

**Note**: Below version v5.0.0, Session Replay does not start automatically and you need to call [`startSessionReplayRecording()`][102] API

{% /tab %}
{% /tabs %}

## Additional configuration

### Start or stop the recording manually

By default, Session Replay starts recording automatically.
However, if you prefer to manually start recording at a specific point in your application, you can use the option `startSessionReplayRecordingManually` parameter as shown below, and later call [`startSessionReplayRecording()`][102].
You can also use [`stopSessionReplayRecording()`][103] to stop the recording at any time.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...
   startSessionReplayRecordingManually: true,
   ...
});

datadogRum.startSessionReplayRecording()
// Do something
datadogRum.stopSessionReplayRecording()
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...
        startSessionReplayRecordingManually: true,
        ...
    });

    window.DD_RUM.startSessionReplayRecording()
    // Do something
    window.DD_RUM.stopSessionReplayRecording()
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
        ...
        startSessionReplayRecordingManually: true,
        ...
    });

    window.DD_RUM && window.DD_RUM.startSessionReplayRecording();
    // Do something
    window.DD_RUM && window.DD_RUM.stopSessionReplayRecording();
</script>
```

{% /tab %}
{% /tabs %}

**Note**: In some scenarios, you may want to begin recording, even if it was initially sampled out of replay. To force Session Replay recording for the rest of the current session, call [`startSessionReplayRecording({ force: true })`][102]

### Privacy options

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data.
See [Privacy Options][104].

### Connect Session Replay to your third-party tools

You can access the Session Replay URL to use in integrations, live from the browser where the session is taking place.
See [Connect Session Replay to your third-party tools][105].

{% /if %}
<!-- end Browser -->

<!-- Android -->
{% if equals($platform, "android") %}
All Session Replay SDK versions can be found in the [Maven Central Repository][4].

To set up Mobile Session Replay for Android:

### Step 1 - Set up the Android RUM SDK

Make sure you've [set up and initialized the Datadog Android RUM SDK][5] with views instrumentation enabled.

### Step 2 - Declare the Datadog Session Replay as a dependency

```kotlin {% filename="build.gradle.kts" %}
implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
// in case you need Material support
implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
// in case you need Jetpack Compose support
implementation("com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]")
```

### Step 3 - Enable Session Replay {% #enable-android %}

```kotlin {% filename="Application.kt" %}
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

### Step 1 - Set up the iOS RUM SDK

Make sure you've [set up and initialized the Datadog iOS RUM SDK][6] with views instrumentation enabled.

### Step 2 - Declare the Datadog Session Replay as a dependency

{% tabs %}
{% tab label="Swift Package Manager" %}
Add `DatadogSessionReplay` library as a dependency to your app target.  
{% /tab %}
{% tab label="CocoaPods" %}
Add `pod 'DatadogSessionReplay` to your `Podfile`.
{% /tab %}
{% tab label="Carthage" %}
Add `DatadogSessionReplay.xcframework` as a dependency to your app target.
{% /tab %}
{% /tabs %}

### Step 3 - Enable Session Replay {% #enable-ios %}

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
All Session Replay SDK versions can be found in the [Maven Central Repository][10].

To set up Mobile Session Replay for Kotlin Multiplatform:

### Step 1 - Set up the Kotlin Multiplatform RUM SDK

Make sure you've [set up and initialized the Datadog Kotlin Multiplatform RUM SDK][11] with views instrumentation enabled.

### Step 2 - Add the `DatadogSessionReplay` iOS library as a link-only dependency 

For instructions, see the [guide][12].

### Step 3 - Declare Datadog Session Replay as a dependency

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

### Step 4 - Enable Session Replay

```kotlin {% filename="Application.kt" %}
// in common source set
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
  .build()
SessionReplay.enable(sessionReplayConfig)
```

### Step 5 - Set up Material support on Android (Optional) 

If your app uses Material on Android, add:

```kotlin
SessionReplayConfiguration.Builder.addExtensionSupport(MaterialExtensionSupport())
```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}

{% alert level="warning" %}
To enable Session Replay, you must use at least version `2.0.4` of the Datadog [React Native SDK][18], and ensure that the Session Replay SDK version matches the React Native SDK version you are using.
{% /alert %}

All Session Replay SDK versions can be found in the [npmjs repository][13].

To set up Mobile Session Replay for React Native:

### Step 1 - Set up the React Native SDK

Make sure you've [set up and initialized the Datadog React Native SDK][14] with views instrumentation enabled.

### Step 2 - Declare the React Native Session Replay as a dependency

Add the `@datadog/mobile-react-native-session-replay` dependency, and make sure it matches the `@datadog/mobile-react-native` version, either through [npm][16] or [yarn][15].

{% tabs %}

{% tab label="npm" %}
```shell
npm install @datadog/mobile-react-native-session-replay
```
{% /tab %}

{% tab label="yarn" %}
```shell
yarn add @datadog/mobile-react-native-session-replay
```
{% /tab %}

{% /tabs %}

### Step 3 - Enable Session Replay {% #enable-react-native %}

After the Datadog React Native SDK and Session Replay SDK dependencies are imported, you can enable the feature when configuring the SDK.

{% tabs %}

{% tab label="DatadogProvider" %}
If you use the `DatadogProvider` component:

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
    replaySampleRate: 100, // Session Replay will be available for all sessions already captured by the SDK
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
{% /tab %}

{% tab label="DdSdkReactNative.initialize" %}
If you use the `DdSdkReactNative.initialize` method:

```typescript {% filename="App.tsx" %}
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from "@datadog/mobile-react-native";
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

const configuration = new DdSdkReactNativeConfiguration(/* ... */)

DdSdkReactNative.initialize(configuration)
  .then(() => SessionReplay.enable({
    replaySampleRate: 100, // Session Replay will be available for all sessions already captured by the SDK
    textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS,
    imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE,
    touchPrivacyLevel: TouchPrivacyLevel.SHOW,
  }))
  .catch((error) => { /* handle error */ });
```
{% /tab %}

{% /tabs %}

During this step, you can also configure multiple [privacy levels][17] that apply to Session Replays.

### Step 4 - (iOS only) Update your iOS pods.

```shell
cd ios && pod install
```

### Step 5 - Rebuild your app 

Rebuild your iOS and Android apps

{% /if %}

<!-- end React Native -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}

{% alert level="info" %}
Datadog Session Replay for Flutter is currently in Preview.
{% /alert %}

All Session Replay SDK versions can be found in [Pub][29].

To set up Datadog Session Replay for Flutter:

### Step 1 - Set up the Flutter plugin

Make sure you have [set up and initialized the Datadog Flutter Plugin][28].

### Step 2 - Add the package to your `pubspec.yaml`

```yaml {% filename="pubspec.yaml" %}
packages:
  # other packages
  datadog_session_replay: ^x.x.x
```

### Step 3 - Enable Session Replay in your `DatadogConfiguration`

```dart
import 'package:datadog_session_replay/datadog_session_replay.dart';

// ....
final configuration = DatadogConfiguration(
    // Normal Datadog configuration
    clientToken: 'client-token',
    // RUM is required to use Datadog Session Replay
    rumConfiguration: RumConfiguration(
        applicationId: '<application-id'>
    ),
)..enableSessionReplay(
    DatadogSessionReplayConfiguration(
        // Setup default text, image, and touch privacy
        textAndInputPrivacyLevel: TextAndInputPrivacyLevel.maskSensitiveInputs,
        touchPrivacyLevel: TouchPrivacyLevel.show,
        // Setup session replay sample rate.
        replaySampleRate: 100.0,
    ),
);
```

### Step 4 - Add a SessionReplayCapture to the root of your Widget tree

Add a SessionReplayCapture widget to the root of your Widget tree, above your MaterialApp or similar application widget.

```dart
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // Note a key is required for SessionReplayCapture
  final captureKey = GlobalKey();

  // Other App Configuration

  @override
  Widget build(BuildContext context) {
    return SessionReplayCapture(
      key: captureKey,
      rum: DatadogSdk.instance.rum!,
      sessionReplay: DatadogSessionReplay.instance!,
      child: MaterialApp.router(color: color, routerConfig: router),
    );
  }
}
```

{% /if %}
<!-- end Flutter -->

## Web view instrumentation

You can record the entire user journey across both [web and native views][1] on iOS or Android and watch it in a single Session Replay.

The Session Replay is recorded through the Browser SDK, then the Mobile SDK handles the batching and uploading of the webview recording.

<!-- Android -->
{% if equals($platform, "android") %}
To instrument your consolidated web and native Session Replay views for Android:

1. Ensure you are using version [`2.8.0`][19] or higher of the Android SDK.
2. Enable [webview tracking][20] for your mobile application.
3. Enable [Session Replay][21] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
To instrument your consolidated web and native Session Replay views for iOS:

1. Ensure you are using version [`2.13.0`][22] or higher of the iOS SDK.
2. Enable [webview tracking][23] for your mobile application.
3. Enable [Session Replay][21] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
To instrument your consolidated web and native Session Replay views for Kotlin Multiplatform:

1. Enable [webview tracking][24] for your mobile application.
2. Enable [Session Replay][21] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
To instrument your consolidated web and native Session Replay views for React Native:

1. Enable [webview tracking][25] for your React Native application.
2. Enable [Session Replay][26] for your web application.
3. Enable Session Replay for your mobile application (see setup instructions above).

**Note**: This feature is not compatible with React Native's [New Architecture][27] for Android.
{% /if %}
<!-- end React Native -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}

Datadog Session Replay for Flutter does not currently support Web view capture.

{% /if %}
<!-- end Flutter -->

## Additional configuration
### Set the sample rate for recorded sessions to appear

The sample rate is an optional parameter in the Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all sessions include a replay. If the sample rate is not specified in the configuration, the default value of 100 is applied.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="Application.kt" %}
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
```kotlin {% filename="Application.kt" %}
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

<!-- Flutter -->
{% if equals($platform, "android") %}
```dart
final configuration = DatadogConfiguration(
  // ...
)..enableSessionReplay(
  DatadogSessionReplayConfiguration(
    replaySampleRate: <SAMPLE_RATE>
  )
);
```
{% /if %}
<!-- end Flutter -->


### Start or stop the recording manually

By default, Session Replay starts recording automatically. However, if you prefer to manually start recording at a specific point in your application, you can use the optional `startRecordingImmediately` parameter as shown below, and later call `SessionReplay.startRecording()`. You can also use `SessionReplay.stopRecording()` to stop the recording anytime.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="Application.kt" %}
val sessionReplayConfig = SessionReplayConfiguration.Builder(<SAMPLE_RATE>)
  .startRecordingImmediately(false)
  .build()
// Do something
SessionReplay.startRecording()
SessionReplay.stopRecording()
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" %}
let sessionReplayConfig = SessionReplay.Configuration(
  replaySampleRate: <SAMPLE_RATE>,
  startRecordingImmediately: false
)

// Do something
SessionReplay.startRecording()
SessionReplay.stopRecording()
```
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
```kotlin {% filename="Application.kt" %}
val sessionReplayConfig = SessionReplayConfiguration.Builder(<SAMPLE_RATE>)
  .startRecordingImmediately(false)
  .build()

// Do something
SessionReplay.startRecording()
SessionReplay.stopRecording()
```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
```typescript {% filename="App.tsx" %}
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";

SessionReplay.enable({
  replaySampleRate: sampleRate,
  startRecordingImmediately: false
});
// Do something
SessionReplay.startRecording();
SessionReplay.stopRecording();
```
{% /if %}
<!-- end React Native -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}

Datadog Session Replay for Flutter does not currently support manual recording.

{% /if %}
<!-- end Flutter -->

### Validate whether Session Replay data is being sent

To validate whether Session Replay data is being sent from the app, you can enable debug option in Datadog SDK.

<!-- Android -->
{% if equals($platform, "android") %}
```kotlin {% filename="Application.kt" %}
Datadog.setVerbosity(Log.DEBUG)
```
{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}
```swift {% filename="AppDelegate.swift" %}
Datadog.verbosityLevel = .debug
```

If everything is fine, following logs should appear in the Xcode debug console in about 30 seconds after launching the app:

```bash {% filename="Xcode console" %}
[DATADOG SDK] 🐶 → 10:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 10:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]
```
{% /if %}
<!-- end iOS -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
```kotlin {% filename="Application.kt" %}
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
Set the verbosity to `DEBUG` when you initialize the SDK:

```typescript {% filename="App.tsx" %}
import { SdkVerbosity } from "@datadog/mobile-react-native";

...

config.verbosity = SdkVerbosity.DEBUG;
```
{% /if %}
<!-- end React Native -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}
Set the SDKs verbosity to `CoreLoggerLevel.debug` before you initialize the SDK:

```dart
DatadogSdk.instance.sdkVerbosity = CoreLoggerLevel.debug;
```
{% /if %}
<!-- end Flutter -->

### Privacy options

See [Privacy Options][2].

[1]: /real_user_monitoring/application_monitoring/ios/web_view_tracking
[2]: /real_user_monitoring/session_replay/mobile/privacy_options
[3]: https://reactnative.dev/architecture/landing-page
[4]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions
[5]: /real_user_monitoring/android/?tab=kotlin
[6]: /real_user_monitoring/ios/?tab=swift
[7]: https://cocoapods.org/
[8]: https://www.swift.org/package-manager/
[9]: https://github.com/Carthage/Carthage
[10]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-android-session-replay/versions
[11]: /real_user_monitoring/kotlin_multiplatform/
[12]: /real_user_monitoring/kotlin_multiplatform/#add-native-dependencies-for-ios
[13]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions
[14]: /real_user_monitoring/application_monitoring/react_native/setup
[15]: https://yarnpkg.com/package?q=datadog%20react%20native%20ses&name=%40datadog%2Fmobile-react-native-session-replay
[16]: https://www.npmjs.com/package/@datadog/mobile-react-native-session-replay?activeTab=versions
[17]: /real_user_monitoring/session_replay/mobile/privacy_options/?tab=reactnative
[18]: https://github.com/DataDog/dd-sdk-reactnative
[19]: https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0
[20]: /real_user_monitoring/application_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views
[21]: /real_user_monitoring/session_replay/browser/#setup
[22]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[23]: /real_user_monitoring/application_monitoring/ios/web_view_tracking/?tab=ios#instrument-your-web-views
[24]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/web_view_tracking/?tab=kotlinmultiplatform#instrument-your-web-views
[25]: /real_user_monitoring/application_monitoring/web_view_tracking/?tab=reactnative#instrument-your-web-views
[26]: /real_user_monitoring/session_replay/browser/#setup
[27]: https://reactnative.dev/architecture/landing-page
[28]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/setup?tab=rum
[29]: https://pub.dev/packages/datadog_session_replay
[100]: /real_user_monitoring/browser/setup/
[101]: /real_user_monitoring/guide/sampling-browser-plans/
[102]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#startsessionreplayrecording
[103]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#stopsessionreplayrecording
[104]: /real_user_monitoring/session_replay/browser/privacy_options
[105]: /real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools
