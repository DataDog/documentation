---
description: React Native アプリケーションを監視するためのガイドです。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM モニターについて
title: ハイブリッド React Native アプリケーションのモニタリング
---

## 概要

React Native は、Android と iOS の両方でネイティブに動作するハイブリッドモバイルアプリケーションを開発できる JavaScript フレームワークです。

ハイブリッドアプリケーションが React Native で構築されている場合、Datadog を使用して、同じアプリケーションをネイティブ (Android または iOS) と React Native の両方の側面からモニタリングできます。

これら両方のソースからの RUM イベントは、Datadog RUM 上では同じアプリケーション・同じソースからのイベントとして報告されます。

## 制限

- **エラー、リソース、インタラクションのトラッキング**に関して、SDK は次の方法で動作できます。
  - 自動インスツルメンテーション (*auto-instrumentation*): 一部の React クラスやメソッドを修正し、自動化を行います。JavaScript のエラー、リソース、インタラクションの自動インスツルメンテーションは、JavaScript コードからのみ開始できます。
  - 手動インスツルメンテーション (*manual instrumentation*): たとえば、アプリがクラッシュはしないもののエラーだとみなしたい事象を報告したい場合などに使用します。
- コア SDK の同じインスタンスを、ネイティブ側と React Native 側の両方で共有でき、両側で別々に初期化する必要はありません。これにより、ネイティブ側でネイティブ SDK を初期化するか、React Native 側で `DdSdkReactNative.initialize` を呼び出すことで初期化を行うかにかかわらず、どちらでも SDK が初期化され、同じ RUM セッションにイベントが表示されます。React Native はデフォルトのコアインスタンスを使用します。つまり、両側で手動インスツルメンテーションを使用できますが、自動インスツルメンテーションは SDK を初期化した側でのみ有効になります。
- Datadog RUM イベントやログは、初期化後にのみ報告できます。まだ SDK を初期化していない場合、イベントやログは送信されません。
- RUM セッションのソース属性は変更できず、すべての RUM イベントは同じソース下に表示されます。

## ネイティブコンテンツを含む React Native アプリのモニタリング

ネイティブコンテンツを含む React Native アプリをモニタリングする前に、React Native SDK を初期化する必要があります。

### React Native SDK の初期化

React Native とネイティブの両方で SDK を初期化するには、[React Native Monitoring のドキュメント][1]を参照してください。

このセットアップにより、ログ、トレース、RUM をネイティブ SDK と React Native SDK の両方で呼び出すことができます。

React Native 側で初めて SDK を初期化する前に、ネイティブ側で Datadog SDK を使用したことがない場合は、このソリューションを推奨します。

{{< tabs >}}
{{% tab "Android" %}}
Android では、`android/app/build.gradle` ファイルの依存関係に Datadog Android SDK を追加します。

```java
// バージョンは @datadog/mobile-react-native によって設定されます
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

{{% /tab %}}
{{% tab "iOS" %}}

iOS では、Objective C ファイルで使用するために ios/Podfile の依存関係に Datadog iOS SDK を追加します。

```ruby
# バージョンが node_modules/@datadog/mobile-react-native/DatadogSDKReactNative.podspec のものと一致していることを確認してください
pod 'DatadogSDKObjc', '~> 2.5.0'
```

{{% /tab %}}
{{< /tabs >}}

### ネイティブ RUM ビューのトラッキング

`react-navigation` などのナビゲーションライブラリを使用して React Native アプリを開発している場合、`nativeViewTracking` 構成オプションを使用すると、重複するビューが多数作成されることがあります。

その場合は、ネイティブ RUM ビューを手動でトラッキングしてください。[iOS][2] および [Android][3] のドキュメントを参照してください。

### ネイティブ RUM リソースのトラッキング

バックエンドとのトレースを有効にしている場合、ネイティブ RUM リソースのファーストパーティホストは、React Native RUM リソースと同じです。

{{< tabs >}}
{{% tab "Android" %}}

OkHttp を使用している場合は、Datadog のインターセプターを使って[ネットワークリクエストを自動的にトラッキング][1]できます。あるいは[リソースを手動でトラッキング][2]することもできます。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/advanced_configuration/?tab=objectivec#automatically-track-network-requests
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/?tab=kotlin#automatically-track-network-requests

{{% /tab %}}
{{% tab "iOS" %}}

`URLSession` をモニタリングしてネットワークリクエストをトラッキングできます。[ネットワークリクエストを自動的にトラッキングする方法][3]を参照してください。

[3]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/?tab=kotlin#custom-resources
{{% /tab %}}
{{< /tabs >}}

### 制限

ネイティブコードで Datadog SDK に依存する部分がある場合は、そのコードを React Native 側で SDK を初期化した**後**に実行するようにしてください。React Native 側で SDK を初期化すると、ネイティブ側でも SDK が初期化されます。

## ネイティブアプリを React Native スクリーンと一緒にモニタリングする

ネイティブコンテンツを含む React Native アプリをモニタリングする前に、React Native SDK を初期化する必要があります。

### React Native SDK の初期化

以下のコマンドオプションを使用して React Native Datadog SDK をインストールします。

```shell
yarn add @datadog/mobile-react-native
```

または

```shell
npm install @datadog/mobile-react-native
```

{{< tabs >}}
{{% tab "Android" %}}

`android/app/build.gradle` ファイルの依存関係に Datadog Android SDK を追加します。

```gradle
// バージョンは @datadog/mobile-react-native によって設定されます
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

ネイティブ側で SDK を初期化します。手順については公式 [Android][1] ドキュメントを参照してください。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/android/setup/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

ネイティブ側で SDK を初期化します。手順については公式 [iOS][1] ドキュメントを参照してください。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/setup/?tab=cocoapods

{{% /tab %}}
{{< /tabs >}}

### React Native RUM ビューのインスツルメンテーション

{{< tabs >}}
{{% tab "Android" %}}

ナビゲーションライブラリによって作成されるネイティブビューを除外するには、`ComponentPredicate` を使用します。

```kotlin
// ビュートラッキングの戦略に合わせて Fragment の型を調整してください
class RNComponentPredicate : ComponentPredicate<Fragment> {
override fun accept(component: Fragment): Boolean {
// React Native のスクリーンビューを除外
if (component.javaClass.name.startsWith("com.swmansion.rnscreens")) {
return false
}
if (component.javaClass.name.startsWith("com.facebook.react")) {
return false
}
return true
}

override fun getViewName(component: Fragment): String? {
return null
}
}

// RUM 設定で使用します
rumConfiguration.useViewTrackingStrategy(FragmentViewTrackingStrategy(true, RNComponentPredicate()))
```
その後、`@datadog/mobile-react-navigation` を使用してビューをトラッキングします。

ProGuard の難読化を有効にしている場合は、リリースビルドでターゲットパッケージが難読化されないようにルールを追加してください。

{{% /tab %}}
{{% tab "iOS" %}}

ナビゲーションライブラリによって作成されるネイティブビューを除外するため、`UIKitRUMViewsPredicate` を使用します。

```swift
class RNHybridPredicate: UIKitRUMViewsPredicate {
var defaultPredicate = DefaultUIKitRUMViewsPredicate()

func rumView(for viewController: UIViewController) -> RUMView? {
let canonicalClassName = NSStringFromClass(type(of: viewController))
// RN Views を除外
if (canonicalClassName.starts(with: "RN")) {
return nil
}

return defaultPredicate.rumView(for: viewController)
}
}

// RUM 設定で使用します
let rumConfiguration = RUM.Configuration(
applicationID: applicationId,
uiKitViewsPredicate: RNHybridPredicate(),
)
```

{{% /tab %}}
{{< /tabs >}}

### React Native エラー、インタラクション、リソースのインスツルメンテーション

`DatadogProvider` コンポーネントで React Native アプリをラップすると、React Native RUM のエラー、インタラクション、およびリソースが自動的に登録されます。

```jsx
const configuration = {
trackResources: true,
trackErrors: true,
trackInteractions: true
};

const RNApp = props => {
useEffect(() => {
/**
* ここではダミー値を使用します。
* 目的は RUM イベントのバッファを空にすることです。
*/
DatadogProvider.initialize({
clientToken: 'fake_value',
env: 'fake_value',
applicationId: 'fake_value'
});
}, []);
const navigationRef = useRef(null);

return (
<DatadogProvider configuration={configuration}>
{/* アプリのコンテンツをここに配置 */}
</DatadogProvider>
);
};

AppRegistry.registerComponent('RNApp', () => RNApp);
```

**Android** で重複する React Native インタラクションを除去するには、EventMapper を使用してネイティブ側で React Native インタラクションをフィルタリングします。

```kotlin
class RNActionEventMapper : EventMapper<ActionEvent> {
override fun map(event: ActionEvent): ActionEvent? {
var targetClassName = (event.context?.additionalProperties?.get("action.target.classname") as? String)
if(targetClassName?.startsWith("com.facebook.react") == true) {
return null
}
return event
}
}

// RUM 設定で使用します
rumConfiguration.setActionEventMapper(RNActionEventMapper())
```

ProGuard の難読化を有効にしている場合は、リリースビルドでターゲットパッケージが難読化されないようにルールを追加してください。

### 制限

React Native 構成で `resourceEventMapper` や `actionEventMapper` を指定している場合、マッパーで `null` を返すとリソースやアクションはドロップされません。

この機能を維持するには、以下のスニペットをプラットフォームごとのネイティブ設定に追加してください。

{{< tabs >}}
{{% tab "Android" %}}

```kotlin
val config = RumConfiguration.Builder(applicationId = appId)
.setResourceEventMapper(object : EventMapper<ResourceEvent> {
override fun map(event: ResourceEvent): ResourceEvent? {
if (event.context?.additionalProperties?.containsKey("_dd.resource.drop_resource") == true) {
return null
}
// ここでカスタムのイベントマッパーロジックを追加可能
return event
}
})
.setActionEventMapper(object : EventMapper<ActionEvent> {
override fun map(event: ActionEvent): ActionEvent? {
if (event.context?.additionalProperties?.containsKey("_dd.action.drop_action") == true) {
return null
}
// ここでカスタムのイベントマッパーロジックを追加可能
return event
}
})
```

{{% /tab %}}
{{% tab "iOS" %}}

```swift
RUM.Configuration(
applicationID: applicationId,
resourceEventMapper: { resourceEvent in
if resourceEvent.context?.contextInfo["_dd.resource.drop_resource"] != nil {
return nil
}
// ここでカスタムのイベントマッパーロジックを追加可能
return resourceEvent
},
actionEventMapper: { actionEvent in
if actionEvent.context?.contextInfo["_dd.resource.drop_action"] != nil {
return nil
}
// ここでカスタムのイベントマッパーロジックを追加可能
return resourceEvent
}
)
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/?tab=swift#custom-views
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#custom-views