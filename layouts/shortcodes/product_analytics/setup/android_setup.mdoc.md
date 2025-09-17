<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
-->
## Setup

All Session Replay SDK versions can be found in the [Maven Central Repository][3].

{% partial file="sdks/setup/android_setup.mdoc.md" /%}

### Declare the Datadog Session Replay as a dependency

    ```kotlin {% filename="build.gradle.kts" %}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // in case you need Material support
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
    // in case you need Jetpack Compose support
    implementation("com.datadoghq:dd-sdk-android-session-replay-compose:[datadog_version]")
    ```

### Enable Session Replay in your app

    ```kotlin {% filename="Application.kt" %}
    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      // in case you need Material extension support
      .addExtensionSupport(MaterialExtensionSupport())
      // in case you need Jetpack Compose support
      .addExtensionSupport(ComposeExtensionSupport())
      .build()

    SessionReplay.enable(sessionReplayConfig)
    ```


## Web view instrumentation

You can record the entire user journey across both [web and native views][1] on iOS or Android and watch it in a single Session Replay.

The Session Replay is recorded through the Browser SDK, then the Mobile SDK handles the batching and uploading of the webview recording.

To instrument your consolidated web and native Session Replay views for Android:

1. Ensure you are using version [`2.8.0`][4] or higher of the Android SDK.
2. Enable [webview tracking][5] for your mobile application.
3. Enable [Session Replay][6] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).


## Additional configuration
### Set the sample rate for recorded sessions to appear

The sample rate is an optional parameter in the Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all RUM sessions include a replay. If the sample rate is not specified in the configuration, the default value of 100 is applied.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.


### Start or stop the recording manually

By default, Session Replay starts recording automatically. However, if you prefer to manually start recording at a specific point in your application, you can use the optional `startRecordingImmediately` parameter as shown below, and later call `SessionReplay.startRecording()`. You can also use `SessionReplay.stopRecording()` to stop the recording anytime.

```kotlin {% filename="Application.kt" %}
val sessionReplayConfig = SessionReplayConfiguration.Builder(<SAMPLE_RATE>)
  .startRecordingImmediately(false)
  .build()
// Do something
SessionReplay.startRecording()
SessionReplay.stopRecording()
```

### Validate whether Session Replay data is being sent

To validate whether Session Replay data is being sent from the app, you can enable debug option in Datadog SDK.

```kotlin {% filename="Application.kt" %}
Datadog.setVerbosity(Log.DEBUG)
```

### Privacy options

See [Privacy Options][2].

[1]: /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking
[2]: /real_user_monitoring/session_replay/mobile/privacy_options
[3]: https://central.sonatype.com/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-session-replay/versions
[4]: https://github.com/DataDog/dd-sdk-android/releases/tag/2.8.0
[5]: /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking/?tab=android#instrument-your-web-views
[6]: /real_user_monitoring/session_replay/browser/#setup