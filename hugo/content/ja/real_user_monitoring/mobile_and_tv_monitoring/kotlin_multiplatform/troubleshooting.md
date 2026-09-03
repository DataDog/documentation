---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin-multiplatform
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin_multiplatform
description: Kotlin Multiplatform Monitoring のトラブル シューティング方法を学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: ソースコード
  text: dd-sdk-kotlin-multiplatform のソース コード
- link: /real_user_monitoring
  tag: ドキュメント
  text: リアルユーザーモニタリングについて
title: Kotlin Multiplatform SDK のトラブル シューティング
---

## 概要

Datadog Kotlin Multiplatform SDK で予期しない動作が発生した場合は、このガイドを使用して問題を解決してください。引き続き問題がある場合は、[Datadog サポート][1] までお問い合わせください。

## Datadog RUM が初期化されているかどうか確認
ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

```kotlin
if (Datadog.isInitialized()) {
    // ご使用のコード
}
```

## デバッグ
アプリケーションを作成する際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat または Xcode のデバッガー コンソールに記録されます。

```kotlin
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
```

## トラッキングの同意を設定 (GDPR の遵守)

GDPR に準拠するため、SDK は初期化時にトラッキング同意の値を必要とします。
トラッキング同意には、次のいずれかの値を指定できます:

- `TrackingConsent.PENDING`: (デフォルト) SDK はデータの収集とバッチ処理を開始しますが、
 収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
- `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
 RUM イベントを送信することもできません。

SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出します。SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを

- `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
- `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

## 一般的な問題

### iOS のバイナリ リンク

#### `PLCrashReporter` シンボルの欠落

リンク ステップで、リンカーの検索パスで `PLCrashReporter` シンボルが見つからない旨の次のようなエラーが発生した場合:

```
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_PLCrashReport", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReportBinaryImageInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportStackFrameInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportThreadInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReporter", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReporterConfig", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
```

その場合は、フレームワーク名 `CrashReporter` を明示的にリンカーに渡す必要があります:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-framework CrashReporter"
               )
           )
       }
   }
}

```

#### `swiftCompatibility` シンボルの欠落

リンク ステップで、リンカーの検索パスで `swiftCompatibility` シンボルが見つからない旨の次のようなエラーが発生した場合:

```
Undefined symbols for architecture arm64:
  "__swift_FORCE_LOAD_$_swiftCompatibility56", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibility56_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
  "__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
```

その場合は、次の方法でこのエラーを抑制できます:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibility56",
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibilityConcurrency"
               )
           )
       }
   }
}

```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help