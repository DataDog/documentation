---
aliases: null
description: モバイルセッションリプレイの設定と構成
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: ドキュメント
  text: モバイルセッションリプレイ
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: ドキュメント
  text: モバイルセッションリプレイがアプリのパフォーマンスに与える影響
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: ドキュメント
  text: モバイルセッションリプレイのプライバシーオプション
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: ドキュメント
  text: モバイルセッションリプレイのトラブルシューティング
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイ
- link: /real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking
  tag: ドキュメント
  text: Web ビュー追跡
title: モバイルセッションリプレイの設定と構成
---

## セットアップ

{{< tabs >}}
{{% tab "Android" %}}

セッションリプレイ SDK は、[Maven スナップショットリポジトリ][1]にすべてのバージョンが用意されています。

Android 用にモバイルセッションリプレイを設定する方法

1. [Datadog Android RUM SDK の設定と初期化][2]が完了し、ビューインスツルメンテーションが有効になっていることを確認します。

2. Datadog セッションリプレイを依存関係として宣言します。
  {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    //  Material UI のサポートが必要な場合
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
   {{< /code-block >}}

3. アプリでセッションリプレイを有効にします。

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // Material UI の拡張サポートが必要な場合
    .addExtensionSupport(MaterialExtensionSupport()) 
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://oss.sonatype.org/content/repositories/snapshots/com/datadoghq/dd-sdk-android/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=kotlin
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=kotlin#declare-the-sdk-as-a-dependency

{{% /tab %}}
{{% tab "iOS" %}}

iOS 用にモバイルセッションリプレイを設定する方法

1. [Datadog iOS RUM SDK の設定と初期化][1]が完了し、ビューインスツルメンテーションが有効になっていることを確認します。

2. パッケージマネージャーに応じて、Datadog セッションリプレイライブラリをプロジェクトに接続します。

   | パッケージマネージャー            | インストール手順                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2]             | `pod 'DatadogSessionReplay'` を `Podfile` に追加します。                                         |
   | [Swift Package Manager][3] | `DatadogSessionReplay` ライブラリを依存関係としてアプリターゲットに追加します。                      |
   | [Carthage][4]              | `DatadogSessionReplay.xcframework` を依存関係としてアプリターゲットに追加します。                  |

3. アプリでセッションリプレイを有効にします。

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

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=android#instrument-your-web-views
[4]: /ja/real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{% tab "iOS" %}}

To instrument your consolidated web and native Session Replay views for iOS:

1. Ensure you are using version [`2.13.0`][1] or higher of the iOS SDK.
2. Enable [webview tracking][2] for your mobile application.
3. Enable [Session Replay][3] for your web application.
4. Enable Session Replay for your mobile application (see setup instructions above).

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/2.13.0
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking/?tab=ios#instrument-your-web-views
[3]: /ja/real_user_monitoring/session_replay/browser/#setup

{{% /tab %}}
{{< /tabs >}}

## 追加構成
### 記録したセッションが表示されるサンプルレートの設定

Sample rate is a required parameter in Session Replay configuration. It must be a number between 0.0 and 100.0, where 0 means no replays are recorded and 100 means all RUM sessions contain replay.

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
{{< /tabs >}}

### セッションリプレイデータが送信されているかどうかの検証

セッションリプレイデータがアプリから送信されているかどうかを検証するには、Datadog SDK でデバッグオプションを有効にします。

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

設定がすべて正しく行われていれば、アプリが起動してから約 30 秒後に、以下のログが Xcode デバッグコンソールに表示されるはずです。

{{< code-block lang="bash" filename="Xcode console" disable_copy="true" >}}

[DATADOG SDK] 🐶 → 10:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 10:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### プライバシーのオプション

[プライバシーオプション][2]をご覧ください。



## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking
[2]: /ja/real_user_monitoring/session_replay/mobile/privacy_options