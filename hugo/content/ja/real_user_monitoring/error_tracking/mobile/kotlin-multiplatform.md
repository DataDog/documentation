---
aliases:
- /ja/real_user_monitoring/error_tracking/kotlin-multiplatform
- /ja/real_user_monitoring/error_tracking/kotlin_multiplatform
- /ja/error_tracking/frontend/mobile/kotlin_multiplatform/
code_lang: kotlin-multiplatform
code_lang_weight: 50
description: Kotlin Multiplatform アプリケーションに Error Tracking を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーでエラー追跡データを視覚化する
title: Kotlin Multiplatform の Crash Reporting と Error Tracking
type: multi-code-lang
---

## 概要

Error Tracking は Kotlin Multiplatform SDK から収集したエラーを処理します。

Kotlin Multiplatform の Crash Reporting と Error Tracking を有効にすると、包括的なクラッシュ レポートとエラー トレンドを取得できます。この機能により、以下にアクセスできます。

- 集計済みの Kotlin Multiplatform クラッシュ ダッシュボードおよび属性
- 難読化解除済みの Kotlin Multiplatform (iOS および Android) クラッシュ レポート
- Kotlin Multiplatform Error Tracking によるトレンド分析

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

Kotlin Multiplatform SDK をまだセットアップしていない場合は、[アプリ内セットアップ手順][2]に従うか、[Kotlin Multiplatform セットアップ ドキュメント][3]を参照してください。

任意のエラーについて、ファイルパス、行番号、関連するスタックトレースの各フレームのコードスニペットにアクセスすることができます。

### Android

捕捉されない例外と ANR でクラッシュにつながるものは、すべて Kotlin Multiplatform SDK によって報告されます ([制限](#limitations)を参照)。これらのクラッシュに加えて、NDK クラッシュを報告するように SDK を設定したり、致命的でない ANR の報告を制御したりできます。

#### NDK クラッシュレポートの追加

Android アプリケーションは、パフォーマンスやコードの再利用性のために、ネイティブ コード (C/C++) を実行している可能性があります。NDK のクラッシュ レポートを有効にするには、Datadog NDK ライブラリを使用してください。 

1. Android のソース セットに Gradle の依存関係を追加するには、`build.gradle.kts` ファイルでライブラリを依存関係として宣言します:

```kotlin
kotlin {
  sourceSets {
    androidMain.dependencies {
      implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
    }
  }
}
```

2. SDK の初期化後に NDK のクラッシュの収集を有効にします。

``` kotlin
// in Android source set
NdkCrashReports.enable()
```

#### ANR レポートの追加

"Application Not Responding" ([ANR][4]) は Android 特有のエラーで、アプリケーションが長時間応答しない場合に発生します。

Android のどのバージョンでも、SDK の初期化時に `trackNonFatalAnrs` (Android ソース セットからのみ利用可能) を `true` または `false` に設定することで、致命的でない ANR の報告のデフォルト設定を上書きできます。

ANR は RUM を通じてのみ報告されます (ログを通じては報告されません)。詳細については、[Android の Crash Reporting と Error Tracking - ANR レポートの追加][5]を参照してください。

### iOS

**注**: iOS でクラッシュ追跡を有効にするには、Kotlin 2.0.20 以上が必要です。そうでない場合、`PLCrashReporter` との互換性により、クラッシュ追跡を有効にするとアプリケーションがハングする可能性があります。その他の依存関係については、[セットアップ][10]の説明を参照してください。

捕捉されない例外でクラッシュにつながるものは、すべて Kotlin Multiplatform SDK によって報告されます

#### Add app hang reporting

App hangs are an iOS-specific type of error that happens when the application is unresponsive for too long.

既定ではアプリ ハングのレポーティングは **無効** ですが、初期化メソッド `setAppHangThreshold` (iOS ソース セットからのみ利用可能) を使用すると有効化でき、指定した時間を超えるアプリ ハングを監視するための独自のしきい値を設定できます。

アプリ ハングは RUM を通じてのみ報告されます (ログを通じては報告されません)。詳細については、[iOS の Crash Reporting と Error Tracking - ANR レポートの追加][6]を参照してください。

## 難読化が解除されたスタックトレースの取得

マッピングファイルは、スタックトレースの難読化を解除するために使用され、エラーのデバッグに役立ちます。Datadog は、生成される一意のビルド ID を使って、正しいスタックトレースと対応するマッピングファイルを自動的にマッチングさせます。これにより、マッピングファイルがいつアップロードされたかに関係なく (本番前ビルド中か本番ビルド中のいずれか)、Datadog で報告されたクラッシュやエラーをレビューする際、効率的な QA 処理のために正しい情報が利用できるようになります。

マッピング ファイル (Android) または dSYM (iOS) を Datadog にアップロードする方法については、以下のガイドを参照してください: [Android][7]、[iOS][8]

## 制限

### ファイル サイズ

Mapping files are limited in size to **500 MB** each, while dSYM files can go up to **2 GB** each.

### 収集

SDK がクラッシュ レポートを処理する際の動作は、次のとおりです:

- クラッシュは SDK が初期化された後にのみ検出されます。このため、Datadog はアプリケーションで SDK をできるだけ早く初期化することを推奨しています。
- RUM クラッシュは RUM ビューにアタッチする必要があります。ビューが表示される前や、エンドユーザーがアプリから離れることでアプリがバックグラウンドに送られた後にクラッシュが発生した場合、クラッシュはミュートされ、報告・収集されません。これを軽減するには、`RumConfiguration` ビルダーで `trackBackgroundEvents()` [メソッド][9] を使用します。
- サンプリングされたセッションで発生したクラッシュのみが保持されます。

## 実装のテスト

Kotlin Multiplatform の Crash Reporting と Error Tracking の構成を検証するには、アプリケーションでクラッシュを発生させ、そのエラーが Datadog に表示されることを確認します。

実装をテストするには

1. Kotlin Multiplatform エミュレーターまたは実機でアプリケーションを実行します。
2. エラーやクラッシュを含むコードを実行します。以下はその一例です。

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. クラッシュが発生したらアプリケーションを再起動し、Kotlin Multiplatform SDK が [**Error Tracking**][1] にクラッシュ レポートをアップロードするまで待ちます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: /ja/real_user_monitoring/error_tracking/mobile/android/#add-anr-reporting
[6]: /ja/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[7]: /ja/real_user_monitoring/error_tracking/mobile/android/#get-deobfuscated-stack-traces
[8]: /ja/real_user_monitoring/error_tracking/mobile/ios/#get-deobfuscated-stack-traces
[9]: /ja/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#track-background-events
[10]: /ja/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#add-native-dependencies-for-ios