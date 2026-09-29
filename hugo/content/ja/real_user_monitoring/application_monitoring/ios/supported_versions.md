---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
- /ja/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
description: Datadog iOS SDK でサポートされているオペレーティングシステムおよびプラットフォーム（iOS、iPadOS、tvOS、watchOS、visionOS
  を含む）。
further_reading:
- link: /real_user_monitoring/application_monitoring/ios/advanced_configuration/
  tag: ドキュメント
  text: RUM iOS の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM データの調査方法
- link: /real_user_monitoring/error_tracking/ios/
  tag: ドキュメント
  text: iOS のエラーの追跡方法について
- link: /real_user_monitoring/ios/swiftui/
  tag: ドキュメント
  text: SwiftUI アプリケーションのインスツルメンテーションについて
title: Apple プラットフォームモニタリングのサポート対象バージョン
---
## 概要 {#overview}

Datadog iOS SDK は、すべての Apple プラットフォーム（iOS、iPadOS、tvOS、watchOS、visionOS）で Real User Monitoring のインスツルメンテーションを行うための単一の SDK です。このページを使用して、各プラットフォームで利用可能な最小 OS バージョン、依存関係マネージャー、および Datadog モジュールを確認してください。

## サポートされるバージョン {#supported-versions}

RUM iOS SDK は、以下のプラットフォームとバージョンをサポートしています。

| プラットフォーム | サポート対象 | バージョン | 注 |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| visionOS | {{< X >}} | 1.0+ | |
| watchOS | {{< X >}} | 7.0+ | |
| macOS (iPad 用に設計された) | {{< X >}} | 11+ | |
| macOS (Catalyst) | | 12+ | macOS (Catalyst) は公式にはサポートされていません |
| macOS | | 12+ | macOS は Datadog SDK で公式にはサポートされていません。一部の機能が完全に動作しない場合があります。**注**: `DatadogRUM`、`DatadogSessionReplay`、および `DatadogObjc` は `UIKit` に大きく依存しており、macOS 上ではビルドできません。|
| Linux | | n/a | |

### プラットフォーム別のモジュールサポート {#module-support-by-platform}

  | モジュール | iOS | tvOS | watchOS | visionOS | 注 |
  |--------|-----|------|---------|----------|-------|
  | DatadogCore | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogLogs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogTrace | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogCrashReporting | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogRUM | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | watchOS: 自動表示する/アクション追跡、フレームレート監視、メモリ警告検出は利用できません。|
  | DatadogFlags | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogProfiling | {{< X >}} | {{< X >}} | | {{< X >}} | watchOS では利用できません。プロファイリングモジュールには、watchOS がサポートしていないシステムレベルの API が必要です。|
  | DatadogSessionReplay | {{< X >}} | | | | tvOS、watchOS、visionOS では利用できません。SessionReplay には、これらのプラットフォームでは利用できないレンダリング機能が必要です。|
  | DatadogWebViewTracking | {{< X >}} | | | {{< X >}} | tvOS および watchOS では利用できません。WebViewTracking には、これらのプラットフォームでは利用できないブラウザレンダリング機能が必要です。|

## サポート対象のプラットフォーム {#supported-platforms}

### Xcode {#xcode}
SDK は最新バージョンの [Xcode][1] を使用してビルドされていますが、App Store 提出用に[サポートされている Xcode の最低バージョン][2]との後方互換性があります。

### 依存関係マネージャー {#dependency-managers}
iOS SDK は、以下の依存関係マネージャーをサポートしています。

- [Swift Package Manager][3]
- [Cocoapods][4]
- [Carthage][5]

### 言語 {#languages}

| 言語 | バージョン |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### UI フレームワークのインスツルメンテーション {#ui-framework-instrumentation}

| フレームワーク | 自動 | 手動 |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | {{< X >}} | {{< X >}} |

### ネットワーク互換性 {#network-compatibility}

| フレームワーク | 自動 | 手動 |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][6] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][7] | {{< X >}} | {{< X >}} |
| [SDWebImage][8] | {{< X >}} | {{< X >}} |
| [OpenAPI Generator][9] | {{< X >}} | {{< X >}} |
| SwiftNIO | | |

### 依存関係 {#dependencies}

Datadog RUM SDK は以下のサードパーティライブラリに依存しています。

- [KSCrash][10] 2.5.0

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/xcode/
[2]: https://developer.apple.com/news/?id=fxu2qp7b
[3]: /ja/real_user_monitoring/application_monitoring/ios/setup/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[4]: /ja/real_user_monitoring/application_monitoring/ios/setup/?tab=cocoapods#declare-the-sdk-as-a-dependency
[5]: /ja/real_user_monitoring/application_monitoring/ios/setup/?tab=carthage#declare-the-sdk-as-a-dependency
[6]: /ja/real_user_monitoring/application_monitoring/ios/integrated_libraries/#alamofire
[7]: /ja/real_user_monitoring/application_monitoring/ios/integrated_libraries/#apollo-graphql
[8]: /ja/real_user_monitoring/application_monitoring/ios/integrated_libraries#sdwebimage
[9]: /ja/real_user_monitoring/application_monitoring/ios/integrated_libraries#openapi-generator
[10]: https://github.com/kstenerud/KSCrash