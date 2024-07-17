---
aliases:
- /ja/real_user_monitoring/android/web_view_tracking
- /ja/real_user_monitoring/ios/web_view_tracking
- /ja/real_user_monitoring/flutter/web_view_tracking
- /ja/real_user_monitoring/reactnative/web_view_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: dd-sdk-android のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
kind: ドキュメント
title: Web View Tracking
---

## 概要

リアルユーザーモニタリングにより、ハイブリッドモバイルアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

**Note:** When Web View Tracking is enabled, Browser Session Replay is disabled, no matter how the Browser SDK is configured.

## Setup

### 前提条件

モバイルアプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

### `DatadogWebViewTracking` を依存関係として宣言する (iOS のみ)

クラッシュレポートを有効にするには、[RUM][2] と (または) [ログ][3] 有効にしてください。その後、依存関係マネージャーに従ってパッケージを追加し、初期化スニペットを更新します。

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

{{< tabs >}}
{{% tab "Android" %}}

1. Web ページからの RUM イベントを転送したい場合は、RUM Android SDK の[最新バージョン][1]をダウンロードし、[専用ガイド][2]に従って RUM 機能をセットアップしてください。
2. Web ページからのログイベントを転送したい場合は、Logs Android SDK の[最新バージョン][3]をダウンロードし、[専用ガイド][4]に従ってログ機能をセットアップしてください。
3. モジュールレベルの `build.gradle` ファイルで `dd-sdk-android-webview` ライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. 以下のコードスニペットで Web ビューの追跡を有効にします。

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /ja/real_user_monitoring/android/?tab=kotlin#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /ja/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

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

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

{{% /tab %}}
{{% tab "Flutter" %}}

RUM Flutter SDK は、[`webview_flutter`][1] パッケージを使用する際に Web ビュー追跡を制御するための API を提供します。Web ビュー追跡を追加するには、`WebViewController` の `trackDatadogEvents` 拡張機能をコールし、許可するホストのリストを指定します。

最新バージョンの [`datadog_webview_tracking`][2] プラグインを使用して `pubspec.yaml` に以下を追加します。
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

例:

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

Note that `JavaScriptMode.unrestricted` is required for tracking to work on Android.
`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.


[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/datadog_webview_tracking

{{% /tab %}}
{{% tab "React Native" %}}

1. [公式インストールドキュメント][1]に従って、`react-native-webview` をアプリケーションに追加します。

2. `react-native-webview` ではなく、`@datadog/mobile-react-native-webview` から `WebView` をインポートします。

   ```javascript
   import { WebView } from '@datadog/mobile-react-native-webview';
   // or
   import WebView from '@datadog/mobile-react-native-webview';
   ```

3. `@datadog/mobile-react-native-webview` の `WebView`コンポーネントは `react-native-webview` コンポーネントをラップしているので、`react-native-webview` の既存のすべての機能を使用することができます。

4. `WebView` コンポーネントの `allowedHosts` プロップを使用して、Datadog が追跡するホストのリストを Web ビュー内に提供します。

   ```javascript
   <WebView
       source={{ uri: 'https://www.example.com' }}
       allowedHosts={['example.com']}
   />
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

[1]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md

{{% /tab %}}
{{< /tabs >}}

### Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性とともに [RUM エクスプローラー][1]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は Android などのモバイルアプリケーションのプラットフォームを表します。

Android や Android TV のアプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

[1]: https://app.datadoghq.com/rum/explorer

## Billing implications

See [RUM & Session Replay Billing][4] for details on how webviews in mobile applications impact session recordings and billing.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#npm
[2]: /ja/real_user_monitoring/ios/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ios
[4]: /ja/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing