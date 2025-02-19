---
aliases:
- /ja/real_user_monitoring/android/web_view_tracking
- /ja/real_user_monitoring/ios/web_view_tracking
- /ja/real_user_monitoring/flutter/web_view_tracking
- /ja/real_user_monitoring/reactnative/web_view_tracking
- /ja/real_user_monitoring/kotlin-multiplatform/web_view_tracking
- /ja/real_user_monitoring/kotlin_multiplatform/web_view_tracking
- /ja/real_user_monitoring/mobile_and_tv_monitoring/unity/web_view_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: ソースコード
  text: dd-sdk-kotlin-multiplatform のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration#web-view-instrumentation
  tag: ドキュメント
  text: Web View Instrumentation
title: Web View Tracking
---

## 概要

リアルユーザーモニタリングにより、ハイブリッドモバイルアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

- モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
- モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
- モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

また、iOS または Android の Web ビューとネイティブビューの両方におけるユーザーの行動をすべて記録し、それを単一の Session Replay で確認することもできます。 統合されたブラウザとモバイル Web ビューのインスツルメンテーション方法については[こちら][1]をご覧ください。

## セットアップ

### 前提条件

モバイルアプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][2]をご参照ください。

### `DatadogWebViewTracking` を依存関係として宣言します (iOS または Kotlin Multiplatform のみ)

#### iOS

Web View tracking を有効にするには、[RUM][3] と (または) [Logs][4] も有効にしてください。その後、依存関係マネージャーに従ってパッケージを追加し、初期化スニペットを更新します。

{{< tabs >}}
{{% tab "Android" %}}

モバイルアプリケーションでレンダリングしたい Web ページの RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

[1]: /ja/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "iOS" %}}

モバイルアプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

クラッシュレポートを有効にするには

1. [RUM][2] および (または) [Logs][3] を有効にしていることを確認してください。
2. 依存関係マネージャーに従ってパッケージを追加します。
3. 下記のとおり `DatadogWebViewTracking` を依存関係として宣言し、初期化スニペットを更新してください。

{{% collapse-content title="CocoaPods" level="h4" %}}
[CocoaPods][1] を使用して `dd-sdk-ios` をインストールできます。
```
pod 'DatadogWebViewTracking'
```

[1]: https://cocoapods.org/
{{% /collapse-content %}}

{{% collapse-content title="Swift Package Manager (SPM)" level="h4" %}} 

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogWebViewTracking
```
{{% /collapse-content %}}

{{% collapse-content title="Carthage" level="h4" %}}

[Carthage][1] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
DatadogWebViewTracking.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /collapse-content %}}

[1]: /ja/real_user_monitoring/browser/setup/#npm
[2]: /ja/real_user_monitoring/ios/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ios

{{% /tab %}}
{{% tab "Flutter" %}}

モバイルアプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

[1]: /ja/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "React Native" %}}

モバイルアプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

[1]: /ja/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

[こちら][1]のガイドに従って `DatadogWebViewTracking` ライブラリをアプリケーションに追加してください。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/kotlin_multiplatform/#add-native-dependencies-for-ios

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

`allowedHosts` は、指定されたホストおよびそのサブドメインに一致します。正規表現は許可されていません。

**注**:
WebView コンポーネントでインスツルメンテーションを機能させるには、WebView で JavaScript を有効にすることが非常に重要です。有効にするには、以下のコードスニペットを使用します。

```kotlin
    webView.settings.javaScriptEnabled = true
```

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

`allowedHosts` は、指定されたホストおよびそのサブドメインに一致します。正規表現は許可されていません。

{{% /tab %}}
{{% tab "Flutter" %}}

RUM Flutter SDK は、[`webview_flutter`][1] または [`flutter_inappwebview`][2] パッケージを使用する際に、Web ビューのトラッキングを制御するための API を提供します。

#### Web view Flutter パッケージ

`webview_flutter` を使用して Web ビュー トラッキングを追加するには、最新版の [`datadog_webview_tracking`][3] プラグインを `pubspec.yaml` に以下のように追加してください。
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

その後、許可するホストのリストを指定して、`WebViewController` に対して `trackDatadogEvents` エクステンションメソッドを呼び出します。

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

なお、Android で追跡機能を有効にするには、`JavaScriptMode.unrestricted` が必要です。
`allowedHosts` は、指定されたホストおよびそのサブドメインに一致します。正規表現は許可されていません。

#### Flutter InAppWebView パッケージ

`flutter_inappwebview` を使用して Web ビュー トラッキングを追加するには、最新版の [`datadog_inappwebview_tracking`][4] プラグインを `pubspec.yaml` に以下のように追加してください。
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

`InAppWebView` をインスツルメンテーションするには、`initialUserScripts` に `DatadogInAppWebViewUserScript` を追加し、`onWebViewCreated` コールバック内で `trackDatadogEvents` エクステンションメソッドを呼び出します。

```dart
InAppWebView(
  // 他の設定...
  initialUserScripts: UnmodifiableListView([
    DatadogInAppWebViewUserScript(
      datadog: DatadogSdk.instance,
      allowedHosts: {'shopist.io'},
    ),
  ]),
  onWebViewCreated: (controller) async {
    controller.trackDatadogEvents(DatadogSdk.instance);
  },
)
```

`InAppBrowser` をインスツルメンテーションするには、`onBrowserCreated` をオーバーライドして `webViewController` に対して `trackDatadogEvents` エクステンションメソッドを呼び出し、カスタム `InAppBrowser` を作成する際に `initialUserScripts` に `DatadogInAppWebViewUserScript` を追加します。

```dart
class MyInAppBrowser extends InAppBrowser {
  MyInAppBrowser({super.windowId, super.initialUserScripts});

  @override
  void onBrowserCreated() {
    webViewController?.trackDatadogEvents(DatadogSdk.instance);
    super.onBrowserCreated();
  }
}

// ブラウザの生成
_browser = MyInAppBrowser(
  initialUserScripts: UnmodifiableListView(
    [
      DatadogInAppWebViewUserScript(
        datadog: DatadogSdk.instance,
        allowedHosts: {'shopist.io'},
      ),
    ],
  ),
);
```

`DatadogInAppWebViewUserScript` の `allowedHosts` パラメーターは、指定したホストおよびそのサブドメインに一致します。正規表現の使用は許可されていません。

[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/flutter_inappwebview
[3]: https://pub.dev/packages/datadog_webview_tracking
[4]: https://pub.dev/packages/datadog_inappwebview_tracking

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

`allowedHosts` は、指定されたホストおよびそのサブドメインに一致します。正規表現は許可されていません。

[1]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Web ページから送信される RUM イベントを転送したい場合は、RUM Kotlin Multiplatform SDK の[最新バージョン][1]をダウンロードし、[専用ガイド][2]に従って RUM をセットアップしてください。
2. Web ページから送信されるログ イベントを転送したい場合は、Logs Kotlin Multiplatform SDK の[最新バージョン][3]をダウンロードし、[専用ガイド][4]に従ってログをセットアップしてください。
3. モジュールレベルの `build.gradle.kts` ファイルで `dd-sdk-kotlin-multiplatform-webview` ライブラリを依存関係として宣言し、共通のソースセットに Gradle 依存関係を追加します。

    ```kotlin
    kotlin {
      // ...
      sourceSets {
        commonMain.dependencies {
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-webview:x.x.x")
        }
      }
    }
    ```

4. 以下のコードスニペットで Web ビューの追跡を有効にします。

   ```kotlin
     // call it in Android or iOS source set, not in the common one
     WebViewTracking.enable(webView, allowedHosts)
   ```

5. Web ビューのインスタンスが解放可能になったら、Web ビューのトラッキングを無効化します (iOS のみ)。

   ```kotlin
     // call it in iOS source set, not in the common one
     WebViewTracking.disable(webView, allowedHosts)
   ```

`allowedHosts` は指定したホストおよびそのサブドメインに一致します。正規表現は許可されていません。

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-rum
[2]: /ja/real_user_monitoring/kotlin_multiplatform/#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-logs
[4]: /ja/logs/log_collection/kotlin_multiplatform/#setup

{{% /tab %}}
{{< /tabs >}}

### Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性とともに [RUM エクスプローラー][5]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は Android などのモバイルアプリケーションのプラットフォームを表します。

Web ビューにアクセスするには

1. **Digital Experiences > Real User Monitoring > (Sessions) Explorer** に移動します。
2. 以下をフィルタリングするクエリを作成します。
   - `application.id` または `application.name` を使用している Android および Android TV アプリケーション
   - `service` を使用している Web コンポーネント
   - `source` を使用しているプラットフォーム

   **注**: モバイルアプリで見慣れないバージョン番号が報告される場合、それは Browser SDK のバージョンである可能性があります。その場合は、たとえば `source: react-native` のように指定して Browser プラットフォームのセッションをフィルタリングできます。
3. セッションをクリックすると、そのセッションに含まれるイベント一覧がサイドパネルに表示されます。

   {{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="RUM エクスプローラーのセッションで取得した Web ビューイベント" style="width:100%;">}}

   Web アイコンが付いているサービスは Web ビューを示します。

セッションイベントにカーソルを合わせて **Open View waterfall** をクリックすると、ビューの **Performance** タブにあるリソースウォーターフォールのビジュアル表示へ移動できます。

## 請求への影響

モバイルアプリケーションの Web ビューがセッションの記録と請求にどのように影響するかの詳細については、[RUM & Session Replay の請求][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration/#web-view-instrumentation
[2]: /ja/real_user_monitoring/browser/setup/#npm
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[4]: /ja/logs/log_collection/ios
[5]: https://app.datadoghq.com/rum/explorer
[6]: /ja/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing