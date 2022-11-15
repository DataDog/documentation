---
beta: true
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon