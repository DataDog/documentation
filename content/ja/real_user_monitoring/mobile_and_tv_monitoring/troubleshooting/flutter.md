---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: flutter
code_lang_weight: 30
description: Learn how to troubleshoot issues with Flutter Monitoring.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/flutter/
  tag: Documentation
  text: Learn about Flutter Monitoring
kind: documentation
title: Troubleshooting Flutter SDK issues
type: multi-code-lang
---

## 概要

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Duplicate interface (iOS)

If you see this error while building iOS after upgrading to `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Try performing `flutter clean` && `flutter pub get` and rebuilding. This usually resolves the issue.

## Duplicate classes (Android)

If you see this error while building Android after the upgrading to `datadog_flutter_plugin` v2.0:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Make sure that you've updated your version of Kotlin to at least 1.8 in your `build.gradle` file.

## Cocoapods 問題

Datadog SDK を追加した後、Cocoapods から投げられるエラーのために iOS アプリケーションのビルドに問題がある場合、エラーを確認してください。最も一般的なエラーは、Cocoapods から最新のネイティブライブラリを取得する問題で、これは `ios` ディレクトリで以下を実行することで解決できます。

```bash
pod install --repo-update
```

もう一つのよくあるエラーは、Apple Silicon Mac での FFI ライブラリの読み込みの問題です。以下のようなエラーが表示された場合:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

Follow the instructions in the [Flutter documentation][2] for working with Flutter on Apple Silicon.

## sdkVerbosity の設定

アプリは実行できるのに、Datadog サイトで期待するデータが表示されない場合は、`DatadogSdk.initialize` を呼び出す前に、コードに以下を追加してみてください。

```dart
DatadogSdk.instance.sdkVerbosity = CoreLoggerLevel.debug;
```

これにより、SDK が何をしているか、どのようなエラーに遭遇しているかについての追加情報が出力され、お客様と Datadog サポートが問題を絞り込むのに役立つ場合があります。

## Not seeing Errors

RUM でエラーが表示されない場合、ビューが開始されていない可能性があります。`DatadogSdk.instance.rum?.startView` でビューを開始したことを確認するか、`DatadogRouteObserver` を使用している場合は、現在の Route に名前があることを確認します。

## 自動リソース追跡と分散型トレーシングの問題

The [Datadog tracking HTTP client][3] package works with most common Flutter networking packages that rely on `dart:io`, including [`http`][4] and [`Dio`][5].

RUM セッションにリソースが表示されている場合、追跡用 HTTP クライアントは動作していますが、分散型トレーシングを使用するためには他の手順が必要な場合があります。

デフォルトでは、Datadog RUM Flutter SDK は、リソースリクエストの 20% のみで、分散型トレーシングをサンプリングします。セットアップに問題があるかどうかを判断しながら、次の行で初期化を修正することで、この値をトレースの 100% に設定する必要があります。
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
    tracingSamplingRate: 100.0
   ),
);
```

それでもまだ問題がある場合は、`firstPartyHosts` プロパティが正しく設定されているかどうかを確認してください。これらはスキーマやパスを含まないホストのみで、正規表現やワイルドカードはサポートしません。例:

    ✅ 良い例 - 'example.com'、'api.example.com'、'us1.api.sample.com'
    ❌ 悪い例 - 'https://example.com'、'*.example.com'、'us1.sample.com/api/*'、'api.sample.com/api'

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[3]: https://pub.dev/packages/datadog_tracking_http_client
[4]: https://pub.dev/packages/http
[5]: https://pub.dev/packages/dio