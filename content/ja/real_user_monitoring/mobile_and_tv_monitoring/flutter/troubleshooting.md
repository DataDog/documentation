---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/flutter
description: Flutter Monitoring に関する問題のトラブルシューティング方法について説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/flutter/
  tag: ドキュメント
  text: Flutter Monitoring について
title: Flutter SDK の問題のトラブルシューティング
---

## 概要

Datadog RUM で予期せぬ動作が発生した場合、このガイドを使用して問題を迅速に解決してください。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。

## Duplicate interface (iOS)

If you see this error while building iOS after upgrading to `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

まず `flutter clean` && `flutter pub get` を実行し、再ビルドしてください。多くの場合、これで解決します。

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

Apple Silicon 上で Flutter を利用する手順は、 [Flutter ドキュメント][2] の案内に従ってください。

## Undefined symbol (iOS)

Flutter の `build ios-framework` コマンドを使用すると、次のようなエラーが表示されることがあります:

```
Undefined symbol: _OBJC_CLASS_$_PLCrashReport
Undefined symbol: _OBJC_CLASS_$_PLCrashReportBinaryImageInfo
Undefined symbol: _OBJC_CLASS_$_PLCrashReportStackFrameInfo
...
```

これは `build ios-framework` コマンドが、 Datadog Flutter SDK が依存する PLCrashReporter を適切に含められないために発生します。解決するには、 PLCrashReporter の依存関係を手動で追加することを Datadog は推奨します。フレームワーク本体と追加手順は、 その [GitHub ページ][8] で確認できます。

## sdkVerbosity の設定

アプリは実行できるのに、Datadog サイトで期待するデータが表示されない場合は、`DatadogSdk.initialize` を呼び出す前に、コードに以下を追加してみてください。

```dart
DatadogSdk.instance.sdkVerbosity = CoreLoggerLevel.debug;
```

これにより、SDK が何をしているか、どのようなエラーに遭遇しているかについての追加情報が出力され、お客様と Datadog サポートが問題を絞り込むのに役立つ場合があります。

## Not seeing Errors

RUM でエラーが表示されない場合、ビューが開始されていない可能性があります。`DatadogSdk.instance.rum?.startView` でビューを開始したことを確認するか、`DatadogRouteObserver` を使用している場合は、現在の Route に名前があることを確認します。

## 自動リソース追跡と分散型トレーシングの問題

[Datadog の追跡機能付き HTTP クライアント][3] パッケージは、 `dart:io` を利用する一般的な Flutter のネットワーク パッケージの多くで動作します。たとえば、 [`http`][4] や [`Dio`][5] です。

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

## “Deobfuscation failed” の警告

スタック トレースの難読化解除に失敗すると警告が表示されます。スタック トレースが最初から難読化されていない場合は、 この警告は無視してかまいません。難読化されている場合は、 [RUM Debug Symbols page][6] でアップロード済みのシンボル ファイル、 dSYM、マッピング ファイルをすべて確認できます。詳しくは [RUM Debug Symbols を使って難読化されたスタック トレースを調査する][7] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[3]: https://pub.dev/packages/datadog_tracking_http_client
[4]: https://pub.dev/packages/http
[5]: https://pub.dev/packages/dio
[6]: https://app.datadoghq.com/source-code/setup/rum
[7]: /ja/real_user_monitoring/guide/debug-symbols
[8]: https://github.com/microsoft/plcrashreporter