---
aliases:
- /ja/real_user_monitoring/error_tracking/android
code_lang: android
code_lang_weight: 10
description: Set up Error Tracking for your Android applications.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: Get started with Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualize Error Tracking data in the Explorer
kind: documentation
title: Android Crash Reporting and Error Tracking
type: multi-code-lang
---

## Overview

Error Tracking processes errors collected from the RUM Android SDK. 

Enable Android Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Android crash dashboards and attributes
- Deobfuscated Android crash reports
- Trend analysis with Android error tracking

Your crash reports appear in [**Error Tracking**][1].

## セットアップ

If you have not set up the Android SDK yet, follow the [in-app setup instructions][2] or see the [Android RUM setup documentation][3].

1. Add the latest version of the [RUM Android SDK][4] to your Gradle dependencies.
2. Configure your application's `env` and `variant` when [initializing the SDK][5].
3. Run the Gradle task to upload your Proguard/R8 mapping file to Datadog in order to access deobfuscated stack traces. 

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

### Add ANR reporting

An "Application Not Responding" ([ANR][6]) is an Android-specific type of error that gets triggered when the application is unresponsive for too long.

ANRs are only reported through the RUM SDK (not through Logs).

#### Report fatal ANRs
Fatal ANRs result in crashes. The application reports them when it's unresponsive, leading to the Android OS displaying a popup dialog to the user, who chooses to force quit the app through the popup.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="A fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, fatal ANRs are grouped based on their similarity, which can result into several **individual issues** being created
- By default, Datadog catches fatal ANRs through the [ApplicationExitInfo API][7] (available since *[Android 30+][8]*), which can be read on the next app launch.
- In *[Android 29][9] and below*, reporting on fatal ANRs is not possible.

#### Report non-fatal ANRs
Non-fatal ANRs may or may not have led to the application being terminated (crashing).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="A non-fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, non-fatal ANRs are grouped under a **single** issue due to their level of noise
- By default, the reporting of non-fatal ANRs on *Android 30+* is **disabled** because it would create too much noise over fatal ANRs. On *Android 29* and below, however, the reporting of non-fatal ANRs is **enabled** by default, as fatal ANRs cannot be reported on those versions.

For any Android version, you can override the default setting for reporting non-fatal ANRs by setting `trackNonFatalAnrs` to `true` or `false` when initializing the RUM SDK.

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

Depending on the [Android Gradle plugin][1] version, the matching of stack traces and mapping files relies on different fields:

- Version 1.13.0 uses the `build_id` field
- Older versions use a combination of the `service`, `version`, and `variant` fields

### マッピングファイルのアップロード

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

{{< tabs >}}
{{% tab "US" %}}

1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][1]を Gradle プロジェクトに追加します。

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Datadog 専用の API キーを作成][2]し、環境変数として `DD_API_KEY` または `DATADOG_API_KEY` という名前でエクスポートします。また、プロジェクトのルートに `datadog-ci.json` ファイルがあれば、その中の `apiKey` プロパティから取得することも可能です。
3. オプションとして、`build.gradle` スクリプトでプラグインを構成して、EU リージョンにファイルをアップロードするように構成します。

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。

   ```bash
   ./gradlew uploadMappingRelease
   ```

**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、RUM Android SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "EU" %}}
1. 以下のコードスニペットを使用して、[Android Gradle プラグイン][1]を Gradle プロジェクトに追加します。

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Datadog 専用の API キーを作成][2]し、環境変数として `DD_API_KEY` または `DATADOG_API_KEY` という名前でエクスポートします。また、プロジェクトのルートに `datadog-ci.json` ファイルがあれば、その中の `apiKey` プロパティから取得することも可能です。
3. アプリの `build.gradle` スクリプトファイルで以下のスニペットを追加し、EU リージョンで使用するようプラグインを構成します。

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 難読化された APK が構築されたらアップロードタスクを実行します。

   ```bash
   ./gradlew uploadMappingRelease
   ```

**注**: プロジェクトで追加のフレーバーを使用している場合、プラグインは、難読化が有効になっている各バリアントのアップロードタスクを提供します。この場合、RUM Android SDK を適切なバリアント名で初期化します (必要な API はバージョン `1.8.0` 以降で使用可能です)。


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### プラグインコンフィギュレーションオプション

プラグイン拡張機能を介して構成できるプラグインプロパティがいくつかあります。複数のバリアントを使用している場合は、バリアントの特定のフレーバーにプロパティ値を設定できます。

例えば、`fooBarRelease` バリアントの場合、以下のような構成になります。

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

このバリアントのタスク構成は、以下の順序で提供される 3 つのフレーバー構成のすべてからマージされます。

1. `bar`
2. `foo`
3. `fooBar`

これにより、`versionName` プロパティの最終的な値は `fooBar` と解決されます。

| プロパティ名              | 説明                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | アプリケーションのバージョン名 (デフォルトでは `build.gradle` スクリプトの `android` ブロックで宣言されたバージョン)。                                                                                                               |
| `serviceName`              | アプリケーションのサービス名 (デフォルトでは `build.gradle` スクリプトの `android` ブロックで宣言されたアプリケーションのパッケージ名)。                                                                                                                          |
| `site`                     | データをアップロードする Datadog サイト (US1、US3、US5、EU1、US1_FED、または AP1)。                                                                                                                                       |
| `remoteRepositoryUrl`      | ソースコードがデプロイされたリモートリポジトリの URL。これを指定しない場合、この値はタスクの実行時に Git コンフィギュレーションから解決されます。                     |
| `checkProjectDependencies` | このプロパティは、Datadog Android SDK が依存関係に含まれているかどうかをプラグインがチェックするかどうかを制御します。チェックしない場合、"none" は無視され、"warn" は警告をログに記録し、"fail" はエラーでビルドに失敗します (デフォルト)。 |

### CI/CD パイプラインとのインテグレーション

デフォルトでは、マッピングのアップロードタスクは、ビルドグラフの他のタスクから独立しています。マッピングのアップロードが必要な場合は、このタスクを手動で実行します。

CI/CD パイプラインでこのタスクを実行し、ビルドグラフの一部としてこのタスクが必要な場合、マッピングファイルが生成された後にアップロードタスクを実行するように設定できます。

例:

```groovy
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```

## 制限

{{< site-region region="us,us3,us5,eu,gov" >}}
Mapping files are limited to **500** MB. If your project has a mapping file larger than this, use one of the following options to reduce the file size:
{{< /site-region >}}
{{< site-region region="ap1" >}}
Mapping files are limited to **50** MB. If your project has a mapping file larger than this, use one of the following options to reduce the file size:
{{< /site-region >}}

- `mappingFileTrimIndents` オプションを `true` に設定します。これにより、ファイルサイズが平均で 5% 小さくなります。
- `mappingFilePackagesAliases` のマップを設定します。これは、パッケージ名をより短いエイリアスで置き換えるものです。**注**: Datadog のスタックトレースは元のパッケージ名の代わりに同じエイリアスを使うので、サードパーティの依存関係にはこのオプションを使うのがよいでしょう。

```groovy
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

## Test your implementation

To verify your Android Crash Reporting and Error Tracking configuration, you need to trigger a crash in your RUM application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Android emulator or a real device.
2. Execute some code containing an error or crash. For example:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. After the crash happens, restart your application and wait for the Android SDK to upload the crash report in [**Error Tracking**][1].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/android#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[8]: https://developer.android.com/tools/releases/platforms#11
[9]: https://developer.android.com/tools/releases/platforms#10