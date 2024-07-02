---
title: RUM React Native Monitoring Setup
kind: documentation
description: Collect RUM data from your React Native projects.
aliases:
    - /real_user_monitoring/react-native/
    - /real_user_monitoring/reactnative/
code_lang: reactnative
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: "https://github.com/DataDog/dd-sdk-reactnative"
  tag: ソースコード
  text: Source code for dd-sdk-reactnative
- link: "https://www.datadoghq.com/blog/react-native-monitoring/"
  tag: Blog
  text: Monitor React Native applications
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentation
  text: Monitor hybrid React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

The minimum supported version for the RUM React Native SDK is React Native v0.63.4+. Compatibility with older versions is not guaranteed out-of-the-box.

The RUM React Native SDK supports [Expo][12]. For more information, see the [Expo documentation][13].

## Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native
```

### iOS

Install the added pod:

```sh
(cd ios && pod install)
```

### Android

If you use a React Native version strictly over 0.67, make sure to use Java version 17. If you use React Native version equal or below ot 0.67, make sure to use Java version 11.

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among kotlin dependencies:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

The Datadog React Native SDK requires you to have `compileSdkVersion = 31` or higher in the Android application setup, which implies that you should use Build Tools version 31 or higher, Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify the versions, change the values in the `buildscript.ext` block of your application's top-level `build.gradle` file. Datadog recommends using a React Native version that's actively supported.

### Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings.

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Create a RUM application for React Native in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][3] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][4].

### Initialize the library with application context

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

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK][18] as a percentage between 0 and 100. You can specify the rate with the `config.sampleRate` parameter.

### Override the reported version

By default, the Datadog React Native SDK reports the `version` as the commercial version of your app (for example, "1.2.44").

If you use an Over The Air (OTA) updates provider like Microsoft's CodePush, you can override this version to indicate which version of your JavaScript code is running.

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

If the commercial version of your app is "1.2.44", it is reported as "1.2.44-codepush.3" in Datadog. A dash (`-`) is automatically added between the version and the suffix.

You can also completely override the version by specifying the `version` field. However, make sure you set it correctly, as it has to match the one specified during the upload of your source maps and other mapping files.

For more information about limitations on the version field, see the [Tags documentation][15].

### User interactions tracking

If user interactions tracking is enabled as in the code example above, the Datadog React Native SDK traverses up the hierarchy of components starting from the component that received a tap, looking for `dd-action-name` property. Once found, it is used as a name for the action reported.

Alternatively, you can use the `accessibilityLabel` element property to give the tap action a name; otherwise, the element type is reported. You can check the sample app for usage examples.

### Track view navigation

Because React Native offers a wide range of libraries to create screen navigation, only manual view tracking is supported by default. To see RUM sessions populate in Datadog, you need to implement view tracking.

You can manually start and stop a view using the following `startView()` and `stopView` methods.

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

Use one of Datadog's integrations to automatically track views for the following libraries:

-   If you use the [`react-native-navigation`][5] library, then add the `@datadog/mobile-react-native-navigation` package and follow the [setup instructions][6].
-   If you use the [`react-navigation`][7] library, then add the `@datadog/mobile-react-navigation` package and follow the [setup instructions][8].

If you experience any issues setting up View tracking with `@datadog/mobile-react-navigation` you can see this Datadog [example application][16] as a reference.

## バックグラウンドイベントの追跡

<div class="alert alert-info"><p>バックグラウンドイベントを追跡すると、セッションが追加され、課金に影響を与える可能性があります。ご質問は、<a href="https://docs.datadoghq.com/help/">Datadog サポートまでお問い合わせ</a>ください。</p>
</div>

アプリケーションがバックグラウンドにあるとき (例えば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

Datadog の構成で、初期化時に以下のスニペットを追加します。

```javascript
configuration.trackBackgroundEvents = true;
```

## データストレージ

### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][10], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.

### iOS

データは Datadog にアップロードされる前に、[アプリケーションサンドボックス][11]のキャッシュディレクトリ (`Library/Caches`) に平文で保存され、デバイスにインストールされた他のアプリからは読み取ることができません。

## 開発モード

開発モードでは、アプリケーションは、コード変換エラー、ローカル開発サーバーへの要求など、React Native ツールに関連する追加のイベントを送信できます。

これらのイベントがダッシュボードに表示されないようにするには、`__DEV__` フラグを使用して、開発モードでのエラーとリソースの追跡を無効にします。

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

## トラブルシューティング

### `use_frameworks!` での使用

もし `Podfile` で `use_frameworks!` を有効にしている場合、SDK を追加した後に `pod install` を実行すると、このようなエラーが発生する可能性があります。

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

このエラーを防ぐには、`Podfile` を編集して、React Native SDK ポッドを静的ライブラリとしてインストールします。

```ruby
static_libraries = ['DatadogSDKReactNative']

# static_framework? 関数をオーバーライドして true を返すようにすることで、静的依存関係を持つポッドを静的ライブラリに変えます
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

**注**: この解決策は、この [StackOverflow][14] の投稿に由来しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: /real_user_monitoring/reactnative/integrated_libraries/
[7]: https://github.com/react-navigation/react-navigation
[8]: /real_user_monitoring/reactnative/integrated_libraries/
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: /real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[15]: /getting_started/tagging/#define-tags
[16]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[17]: https://reactnative.dev/docs/the-new-architecture/landing-page
[18]: /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/#initialize-the-library-with-application-context