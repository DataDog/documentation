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

## 追加構成
### 記録したセッションが表示されるサンプルレートの設定

サンプルレートは、セッションリプレイの構成で必須のパラメーターです。 0.0～100.0 の間の数字でなければならず、0 はリプレイが記録されないこと、100 はすべての RUM セッションにリプレイが含まれることを意味します。

このサンプルレートは、RUM サンプルレートに加えて適用されます。たとえば、RUM が 80% のサンプルレートを使用し、セッションリプレイが 20% のサンプルレートを使用した場合、すべてのユーザーセッションのうち 80% が RUM に含まれ、それらのセッションのうち 20% のみがリプレイを持つことを意味します。

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

[プライバシーオプション][1]を参照してください。

[1]: /ja/real_user_monitoring/session_replay/mobile/privacy_options

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}