---
aliases:
- /ja/real_user_monitoring/react-native/
- /ja/real_user_monitoring/reactnative/
code_lang: reactnative
code_lang_weight: 40
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: ドキュメント
  text: RUM React Native の高度な構成
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Source Code
  text: dd-sdk-reactnative のソースコード
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: ドキュメント
  text: Monitor hybrid React Native applications
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの確認方法
kind: ドキュメント
title: RUM React Native モニタリングのセットアップ
type: multi-code-lang
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

RUM React Native SDK をサポートする最低バージョンは、React Native v0.63.4 以降です。それ以前のバージョンに対する互換性は、標準では保証されていません。

RUM React Native SDK は、[Expo][12] に対応しています。詳しくは、[Expo ドキュメント][13]をご覧ください。

## セットアップ

NPM でインストールするには、以下を実行します。

```sh
npm install @datadog/mobile-react-native
```

Yarn でインストールするには、以下を実行します。

```sh
yarn add @datadog/mobile-react-native
```

### iOS

追加したポッドをインストールします。

```sh
(cd ios && pod install)
```

### Android

厳密に 0.67 を超える React Native バージョンを使用する場合は、必ず Java バージョン 17 を使用してください。React Native のバージョンが 0.67 以下の場合は、必ず Java バージョン 11 を使用してください。

`android/build.gradle` ファイルで、kotlin の依存関係間の衝突を避けるために `kotlinVersion` を指定します。

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Datadog React Native SDK を使用するためには、Android アプリケーションのセットアップで `compileSdkVersion = 31` 以上を設定する必要があります。これは、Build Tools のバージョン 31 以上、Android Gradle Plugin のバージョン 7 以上、そして Gradle のバージョン 7 以上を使用すべきであることを意味しています。バージョンを変更するには、アプリケーションのトップレベル `build.gradle` ファイルの `buildscript.ext` ブロック内の値を変更します。Datadog は、積極的にサポートされている React Native バージョンを使用することを推奨します。

### UI でアプリケーションの詳細を指定

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. アプリケーションタイプとして `react-native` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Datadog で React Native の RUM アプリケーションを作成する" style="width:90%;">}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。`@datadog/mobile-react-native` ライブラリの構成に [Datadog API キー][3]のみを使用した場合、クライアント側で React Native アプリケーションのコード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストでライブラリを初期化

{{< site-region region="us" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US1';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (in this example, 80% of session are sent to Datadog. Default is 100%).
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (in this example, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'
// Optional: set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
config.serviceName = 'com.example.reactnative';
// Optional: let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
config.verbosity = SdkVerbosity.WARN;

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US3';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US5';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}
// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'EU1';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}
// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US1_FED';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}
// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

### RUM セッションのサンプリング

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK][18] as a percentage between 0 and 100. You can specify the rate with the `config.sampleRate` parameter.

### 報告されたバージョンのオーバーライド

デフォルトでは、Datadog React Native SDK は `version` をアプリの商用バージョンとして報告します (例えば、"1.2.44")。

Microsoft の CodePush のような OTA (Over The Air) アップデートプロバイダーを使用している場合、このバージョンをオーバーライドして、JavaScript コードの実行バージョンを表示することができます。

Datadog recommends using a `versionSuffix` to the `DatadogProviderConfiguration` object:

```js
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

config.versionSuffix = 'codepush.3';
```

アプリの商用バージョンが "1.2.44" の場合、Datadog では "1.2.44-codepush.3" と報告されます。バージョンとサフィックスの間にダッシュ (`-`) が自動的に追加されます。

また、`version` フィールドを指定することで、バージョンを完全にオーバーライドすることもできます。ただし、ソースマップやその他のマッピングファイルのアップロード時に指定したものと一致させる必要があるため、正しく設定してください。

バージョンフィールドの制限については、[タグドキュメント][15]を参照してください。

### ユーザーインタラクションの追跡

上記のコード例のようにユーザーインタラクションの追跡が有効になっている場合、Datadog React Native SDK は、タップを受け取ったコンポーネントから始まるコンポーネントの階層をトラバースし、`dd-action-name` プロパティを探します。見つかったら、報告されたアクションの名前として使用されます。

または、`accessibilityLabel` 要素プロパティを使用して、タップアクションに名前を付けることもできます。それ以外の場合は、要素タイプが報告されます。サンプルアプリで使用例を確認できます。

### ビューのナビゲーションを追跡

React Native は、画面ナビゲーションを作成するためのさまざまなライブラリを提供しているため、デフォルトでは手動のビュートラッキングのみがサポートされています。Datadog で RUM セッションの入力を表示するには、ビュートラッキングを実装する必要があります。

次の `startView()` および `stopView` メソッドを使用して、ビューを手動で開始および停止できます。

```js
import {
    DdRum
} from '@datadog/mobile-react-native';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

次のライブラリには、Datadog のインテグレーションの 1 つを使用して、ビューを自動的に追跡します。

-   [`react-native-navigation`][5] ライブラリを使用する場合は、`@datadog/mobile-react-native-navigation` パッケージを追加し、[セットアップ手順][6]に従います。
-   [`react-navigation`][7] ライブラリを使用する場合は、`@datadog/mobile-react-navigation` パッケージを追加し、[セットアップ手順][8]に従います。

If you experience any issues setting up View tracking with `@datadog/mobile-react-navigation` you can see this Datadog [example application][16] as a reference.

## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
configuration.trackBackgroundEvents = true;
```

## Data Storage

### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][10], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.

### iOS

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][11], which can't be read by any other app installed on the device.

## Development mode

While in development mode, your application can submit extra events related to the React Native tooling, such as code transformation errors and requests to a local development server.

To prevent these events from showing in the dashboard, you can disable errors and resources tracking in dev mode using the `__DEV__` flag:

```js
const config = new DatadogProviderConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources will be false in DEV mode, true otherwise */,
    !__DEV__  /* trackErrors will be false in DEV mode, true otherwise */,
    trackingConsent
)
```

## New architecture support

The [React Native new architecture][17] is supported by the RUM React Native SDK in version `>=1.8.0`.

The minimum supported React Native version for the new architecture is `0.71`.

## Troubleshooting

### Usage with `use_frameworks!`

If you have `use_frameworks!` enabled in your `Podfile`, running `pod install` after adding the SDK is likely to trigger an error like this one:

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

To prevent that error, edit your `Podfile` to install the React Native SDK pod as a static library:

```ruby
static_libraries = ['DatadogSDKReactNative']

# Turn pods with static dependencies into static libraries by overriding the static_framework? function to return true
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

**Note**: This solution comes from this [StackOverflow][14] post.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: /ja/real_user_monitoring/reactnative/integrated_libraries/
[7]: https://github.com/react-navigation/react-navigation
[8]: /ja/real_user_monitoring/reactnative/integrated_libraries/
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: /ja/real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[15]: /ja/getting_started/tagging/#define-tags
[16]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[17]: https://reactnative.dev/docs/the-new-architecture/landing-page
[18]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/#initialize-the-library-with-application-context