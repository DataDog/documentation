---
aliases: null
description: Setting up and configuring Mobile Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentation
  text: Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentation
  text: How Mobile Session Replay Impacts App Performance
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentation
  text: Mobile Session Replay Privacy Options
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentation
  text: Troubleshoot Mobile Session Replay
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
kind: documentation
title: Mobile Session Replay Setup and Configuration
---

## Setup

{{< tabs >}}
{{% tab "Android" %}}

All Session Replay SDK versions can be found in the [Maven Snapshots Repository][1].

To set up Mobile Session Replay for Android:

1. Make sure you've [setup and initialized the Datadog Android RUM SDK][2] with views instrumentation enabled.

2. Declare the Datadog Session Replay as a dependency:
  {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // in case you need material support
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
   {{< /code-block >}}

3. Enable Session Replay in your app:

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // in case you need material extension support
    .addExtensionSupport(MaterialExtensionSupport()) 
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://oss.sonatype.org/content/repositories/snapshots/com/datadoghq/dd-sdk-android/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=kotlin
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=kotlin#declare-the-sdk-as-a-dependency

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
           replaySampleRate: sampleRate
       )
   )
   {{< /code-block >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

## Additional configuration
### Set the sample rate for recorded sessions to appear

Sample rate is a required parameter in Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 means no replays will be recorded and 100 means all RUM sessions will contain replay.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% will be included in RUM, and within those sessions, only 20% will have replays.

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
{{< /tabs >}}

### Privacy options

See [Privacy Options][1].

[1]: /ja/real_user_monitoring/session_replay/mobile/privacy_options

## Further reading

{{< partial name="whats-next/whats-next.html" >}}