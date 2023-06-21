---
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/troubleshooting.md
description: Flutter Monitoring に関する問題のトラブルシューティング方法について説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/flutter/
  tag: ドキュメント
  text: Flutter Monitoring について
kind: documentation
title: トラブルシューティング
---
## Cocoapods 問題

Datadog SDK を追加した後、Cocoapods から投げられるエラーのために iOS アプリケーションのビルドに問題がある場合、エラーを確認してください。最も一般的なエラーは、Cocoapods から最新のネイティブライブラリを取得する問題で、これは `ios` ディレクトリで以下を実行することで解決できます。

```bash
pod install --repo-update
```

もう一つのよくあるエラーは、Apple Silicon Mac での FFI ライブラリの読み込みの問題です。 以下のようなエラーが表示された場合:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

[Flutter のドキュメント][1]にある、Apple Silicon で Flutter を使うための手順に従います。

## sdkVerbosity の設定

アプリは実行できるのに、Datadog サイトで期待するデータが表示されない場合は、`DatadogSdk.initialize` を呼び出す前に、コードに以下を追加してみてください。

```dart
DatadogSdk.instance.sdkVerbosity = Verbosity.verbose;
```

これにより、SDK が何をしているか、どのようなエラーに遭遇しているかについての追加情報が出力され、お客様と Datadog サポートが問題を絞り込むのに役立つ場合があります。

## Not seeing Errors

RUM でエラーが表示されない場合、ビューが開始されていない可能性があります。`DatadogSdk.instance.rum?.startView` でビューを開始したことを確認するか、`DatadogRouteObserver` を使用している場合は、現在の Route に名前があることを確認します。

## 自動リソース追跡と分散型トレーシングの問題

[Datadog 追跡用 HTTP クライアント][2]パッケージは、[`http`][3] や [`Dio`][4] など、`dart:io` に依存する一般的な Flutter ネットワークパッケージと連携して動作します。

RUM セッションにリソースが表示されている場合、追跡用 HTTP クライアントは動作していますが、分散型トレーシングを使用するためには他の手順が必要な場合があります。

デフォルトでは、Datadog RUM Flutter SDK は、リソースリクエストの 20% のみで、分散型トレーシングをサンプリングします。セットアップに問題があるかどうかを判断しながら、次の行で初期化を修正することで、この値をトレースの 100% に設定する必要があります。
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: RumConfiguration(
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

[1]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[2]: https://pub.dev/packages/datadog_tracking_http_client
[3]: https://pub.dev/packages/http
[4]: https://pub.dev/packages/dio