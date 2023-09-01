---
beta: true
description: ハイブリッド iOS アプリケーションの Web ビューを監視します。
further_reading:
- link: /real_user_monitoring/ios/
  tag: ドキュメント
  text: iOS モニタリング
- link: /real_user_monitoring/browser/
  tag: ドキュメント
  text: ブラウザモニタリング
kind: documentation
title: iOS Web ビュー追跡
---

## 概要

Real User Monitoring により、iOS と tvOS のハイブリッドアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

## セットアップ

### 前提条件

モバイル iOS および tvOS アプリケーションでレンダリングしたい Web ページを、まず RUM Browser SDK で設定します。詳しくは、[RUM ブラウザモニタリング][1]をご覧ください。

### `DatadogWebViewTracking` を依存関係として宣言します。

クラッシュレポートを有効にするには、[RUM][3] と (または) [Logs][5] も有効にしてください。その後、依存関係マネージャーに従ってパッケージを追加し、初期化スニペットを更新します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][4] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogWebViewTracking'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogWebViewTracking
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][5] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
DatadogWebViewTracking.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Web ビューをインスツルメントする

RUM iOS SDK は、Web ビュー追跡を制御するための API を提供します。Web ビュー追跡を有効にするには、`WKWebView` インスタンスを提供します。

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com"])
```

Web ビュー追跡を無効にする場合
```swift
WebViewTracking.disable(webView: webView)
```

## Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性を持つイベントとビューとして、[RUM エクスプローラー][4]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は iOS などのモバイルアプリケーションのプラットフォームを表します。

iOS や tvOS のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#npm
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.10.0-beta1
[3]: /ja/real_user_monitoring/ios/
[4]: https://app.datadoghq.com/rum/explorer
[5]: https://docs.datadoghq.com/ja/logs/log_collection/ios