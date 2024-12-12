---
beta: true
code_lang: ios
code_lang_weight: 20
description: RUM iOS SDK のサポート対象オペレーティングシステムとプラットフォームの一覧です。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: ドキュメント
  text: RUM iOS の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM データの確認方法
- link: /real_user_monitoring/error_tracking/ios/
  tag: ドキュメント
  text: iOS のエラーの追跡方法について
- link: /real_user_monitoring/ios/swiftui/
  tag: ドキュメント
  text: SwiftUI アプリケーションのインスツルメンテーションについて
title: RUM iOS および tvOS モニタリングサポート対象バージョン
type: multi-code-lang
---


## サポートされるバージョン

RUM iOS SDK は以下の iOS バージョンをサポートしています。

| プラットフォーム | サポート | バージョン | 注 |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| macOS (iPad 用に設計された) | {{< X >}} | 11+ | |
| macOS (Catalyst) | 一部サポート | 12+ | Catalyst はビルドモードのみサポートされています。つまり、macOS はビルドターゲットとなりますが、SDK の機能はこのターゲットでは動作しない可能性があります。 |
| macOS | | 12+ | Datadog SDK では macOS は公式にはサポートされていません。一部の機能が完全に動作しない場合があります。**注**: `DatadogRUM`、`DatadogSessionReplay`、`DatadogObjc` は `UIKit` に大きく依存しているため、macOS ではビルドできません。 |
| visionOS | | 1.0+ | Datadog SDK では visionOS は公式にサポートされていません。一部の機能が完全に動作しない場合があります。**注**: `DatadogCrashReporting` は [PLCrashReporter][1] 側のサポート不足により、visionOS ではサポートされていません。 |
| watchOS | | 7.0+ | Datadog SDK では watchOS は公式にサポートされていません。一部の機能が完全に動作しない場合があります。**注**: watchOS でビルドできるのは `DatadogLogs` と `DatadogTrace` のみです。 |
| Linux | | 非該当 | |

## サポート対象のプラットフォーム

### Xcode
SDK は最新バージョンの [Xcode][2] を使用してビルドされていますが、App Store 提出用に[サポートされている Xcode の最低バージョン][3]との後方互換性があります。

### 依存関係マネージャー
現在、以下の依存関係マネージャーを使用した SDK のインテグレーションをサポートしています。

- [Swift Package Manager][4]
- [Cocoapods][5]
- [Carthage][6]

### 言語

| 言語 | バージョン |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### UI フレームワークのインスツルメンテーション

| フレームワーク | 自動 | 手動 |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | | {{< X >}} |

### ネットワーク互換性

| フレームワーク | 自動 | 手動 |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][7] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][8] | {{< X >}} | {{< X >}} |
| SwiftNIO | | | 

### 依存関係

Datadog RUM SDK は以下のサードパーティライブラリに依存しています。

- [PLCrashReporter][9] 1.11.2

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=fxu2qp7b
[4]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[5]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=cocoapods#declare-the-sdk-as-a-dependency
[6]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=carthage#declare-the-sdk-as-a-dependency
[7]: /ja/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/#alamofire
[8]: /ja/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/#apollo-graphql
[9]: https://github.com/microsoft/plcrashreporter