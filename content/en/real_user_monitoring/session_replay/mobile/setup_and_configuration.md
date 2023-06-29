---
title: Setup and Configuration
kind: documentation
description: Describes how to setup and configure Mobile Session Replay
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Setup

{{< tabs >}}
{{% tab "Android" %}}

All Session Replay SDK versions can be found in the [Maven Snapshots Repository][1].

1. Make sure you've [setup and initialized the Datadog Android RUM SDK][2].
2. In order to use the SNAPSHOTS in your Gradle dependencies, add this repository as a source in your repository configuration in your `build.gradle` file:

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

By default, the Session Replay recorder masks all recorded content with `*` to ensure no sensitive information is visible in the recorded session. If you want to change this, there is an option to unmask data in all recorded content:

```kotlin
val sessionReplayConfig = SessionReplayConfiguration.Builder()
 ...
.setSessionReplayPrivacy(SessionReplayPrivacy.[PRIVACY])
.build()
```

[1]: https://oss.sonatype.org/content/repositories/snapshots/
[2]: /real_user_monitoring/android/?tab=kotlin

{{% /tab %}}

{{% tab "iOS" %}}

<div class="alert alert-warning">
Session Replay is in private beta for iOS. As such, installation steps differ from those for integrating the Datadog RUM SDK.
</div>

**Note**: When installing Session Replay for iOS, instead of using git tags, the library needs to be fetched directly from the [`session-replay-beta`][1] branch.

Before starting installation, make sure you've [setup and initialized the Datadog iOS RUM SDK][2].

### Installation with CocoaPods

1. Link both RUM and Session Replay SDKs using git branches in `Podfile` and run `pod install` (or `pod update` if you're upgrading from an existing installation):

   ```ruby

     pod 'DatadogSDK', :git => 'https://github.com/DataDog/dd-sdk-ios.git', :branch => 'session-replay-beta'
     pod 'DatadogSDKSessionReplay', :git => 'https://github.com/DataDog/dd-sdk-ios.git', :branch => 'session-replay-beta'

   ```

2. To verify installation, check `Podfile.lock`. Both pods should list the same version. For example:

   ```ruby
     PODS:
       - DatadogSDK (1.19.0-sr-beta3)
       - DatadogSDKSessionReplay (1.19.0-sr-beta3):
         - DatadogSDK (= 1.19.0-sr-beta3)
   ```

### Installation with Swift Package Manager

Link RUM and Session Replay SDKs by specifying the [`dd-sdk-ios`][3] repository URL and the `session-replay-beta` branch. Ensure that the most recent commit is fetched.

### Enabling Session Replay in the app

To enable Session Replay in the code, import `DatadogSessionReplay` dependency and call `SessionReplay.initialize(with:),` followed by `.start()`. Both must happen after initializing the RUM SDK.

The following snippet illustrates a basic example in `AppDelegate.swift`:

```swift
import Datadog
import DatadogSessionReplay

var sessionReplay: SessionReplayController!

// enable RUM SDK:
Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum-application-id>",
            clientToken: "<client-token>",
            environment: "<environment>"
        )
        .trackUIKitRUMViews()
        .trackUIKitRUMActions()
        .build()
)

Global.rum = RUMMonitor.initialize()

// enable Session Replay:
let configuration = SessionReplayConfiguration(privacy: .maskAll)
sessionReplay = SessionReplay.initialize(with: configuration)
sessionReplay.start()
```

## Troubleshooting

To validate whether Session Replay data is being sent from the app, enable the `Datadog.verbosityLevel = .debug` option. If everything works correctly, you should see following logs in the Xcode console soon (about 30 seconds) after launching the application:

```swift
[DATADOG SDK] 🐶 → 18:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 18:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]
```

[1]: https://github.com/DataDog/dd-sdk-ios/tree/session-replay-beta
[2]: /real_user_monitoring/ios/?tab=swift
[3]: https://github.com/DataDog/dd-sdk-ios

{{% /tab %}}
{{< /tabs >}}
