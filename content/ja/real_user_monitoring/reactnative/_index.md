---
description: React Native プロジェクトから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative のソースコード
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: React Native のモニタリング
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

追加したポッドをインストールします。

```sh
(cd ios && pod install)
```

バージョン `1.0.0-rc5` 以降では、Android アプリケーションのセットアップで `compileSdkVersion = 31` が必要です。これは Build Tools バージョン 31、Android Gradle Plugin バージョン 7、および Gradle バージョン 7 以上が必要であることを意味します。バージョンを変更するには、アプリケーションのトップレベル `build.gradle` ファイルの `buildscript.ext` ブロックの値を変更します。Datadogは、React Native バージョン 0.67 以上の使用を推奨しています。

### UI でアプリケーションの詳細を指定

1. [Datadog アプリ][1]で、**UX Monitoring** > **RUM Applications** > **New Application** へ移動します。
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
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);
config.site = 'US1';
// オプション: ネイティブクラッシュレポートを有効または無効にします
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル (この例では、セッションの 80% が Datadog に送信されます。 デフォルトは 100%)
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのトレースインテグレーションのサンプル (この例では、インスツルメントされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされます。デフォルトは 20%)
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします
// オプション: 報告されるサービス名を設定します (デフォルトでは、Android または iOS アプリのパッケージ名または bundleIdentifier をそれぞれ使用します)
config.serviceName = 'com.example.reactnative';
// オプション: SDK に指定されたレベル以上の内部ログを出力させる。デフォルトは undefined (ログを出力しない)
config.verbosity = SdkVerbosity.WARN;

//App コンポーネントのコンテンツを DatadogProvider コンポーネントでラップし、 構成を渡します。

export default function App() {
    return (
       <DatadogProvider configuration={config}>
          <Navigation />
       </DatadogProvider>
    );
}

// Datadog React Native SDK for RUM を初期化したら、RUM ダッシュボードでデータを見ることができるように、ビュー追跡を設定する必要があります。
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);
config.site = 'US3';
// オプション: ネイティブクラッシュレポートを有効または無効にします
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル (ここでは、セッションの 80% が Datadog に送信されます。 デフォルトは 100%)
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのトレースインテグレーションのサンプル (ここでは、インスツルメントされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされます。デフォルトは 20%)
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします

await DdSdkReactNative.initialize(config);

// Datadog React Native SDK for RUM を初期化したら、RUM ダッシュボードでデータを見ることができるように、ビュー追跡を設定する必要があります。
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);
config.site = 'US5';
// オプション: ネイティブクラッシュレポートを有効または無効にします
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル (ここでは、セッションの 80% が Datadog に送信されます。 デフォルトは 100%)
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのトレースインテグレーションのサンプル (ここでは、インスツルメントされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされます。デフォルトは 20%)
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします

await DdSdkReactNative.initialize(config);

// Datadog React Native SDK for RUM を初期化したら、RUM ダッシュボードでデータを見ることができるように、ビュー追跡を設定する必要があります。
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);
config.site = 'EU1';
// オプション: ネイティブクラッシュレポートを有効または無効にします
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル (ここでは、セッションの 80% が Datadog に送信されます。 デフォルトは 100%)
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのトレースインテグレーションのサンプル (ここでは、インスツルメントされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされます。デフォルトは 20%)
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします

await DdSdkReactNative.initialize(config);

// Datadog React Native SDK for RUM を初期化したら、RUM ダッシュボードでデータを見ることができるように、ビュー追跡を設定する必要があります。
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // ユーザーインタラクション (ボタンのタップなど) を追跡します。
    true, // XHR リソースを追跡します
    true // エラーを追跡します
);
config.site = 'US1_FED';
// オプション: ネイティブクラッシュレポートを有効または無効にします
config.nativeCrashReportEnabled = true;
// オプション: RUM セッションのサンプル (ここでは、セッションの 80% が Datadog に送信されます。 デフォルトは 100%)
config.sessionSamplingRate = 80;
// オプション: アプリとバックエンド間のネットワークコールのトレースインテグレーションのサンプル (ここでは、インスツルメントされたバックエンドへのコールの 80％ が RUM ビューから APM ビューにリンクされます。デフォルトは 20%)
// バックエンドでトレースを有効にするには、バックエンドのホストを指定する必要があります
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // 'example.com' と 'api.example.com' のようなサブドメインにマッチします

await DdSdkReactNative.initialize(config);

// Datadog React Native SDK for RUM を初期化したら、RUM ダッシュボードでデータを見ることができるように、ビュー追跡を設定する必要があります。
```

{{< /site-region >}}

### 報告されたバージョンのオーバーライド

デフォルトでは、Datadog React Native SDK は `version` をアプリの商用バージョンとして報告します (例えば、"1.2.44")。

Microsoft の CodePush のような OTA (Over The Air) アップデートプロバイダーを使用している場合、このバージョンをオーバーライドして、JavaScript コードの実行バージョンを表示することができます。

Datadog では、`DdSdkReactNativeConfiguration` オブジェクトに `versionSuffix` を使用することを推奨しています。

```js
const config = new DdSdkReactNativeConfiguration(
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
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// 一意のビュー識別子、カスタムビュー名、オブジェクトを使用してビューを開始し、ビューに追加の属性をアタッチします
DdRum.startView(
    '<view-key>', // <view-key> は一意でなければなりません。例えば ViewName-unique-id とすることができます
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// 同じ一意のビュー識別子と、ビューに追加の属性をアタッチするオブジェクトを使用して、以前に開始したビューを停止します
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

次のライブラリには、Datadog のインテグレーションの 1 つを使用して、ビューを自動的に追跡します。

-   [`react-native-navigation`][5] ライブラリを使用する場合は、`@datadog/mobile-react-native-navigation` パッケージを追加し、[セットアップ手順][6]に従います。
-   [`react-navigation`][7] ライブラリを使用する場合は、`@datadog/mobile-react-navigation` パッケージを追加し、[セットアップ手順][8]に従います。

`@datadog/mobile-react-navigation` で View 追跡を設定する際に問題がある場合は、弊社の[サンプルアプリケーション][16]を参考にすることができます。

## カスタム属性の追跡

すべての RUM イベントにユーザー情報をアタッチして、RUM セッションのより詳しい情報を入手することができます。

### ユーザー情報

ユーザー特有の情報については、必要に応じてアプリで以下のコードを使用します（SDK の初期化後）。`id`、`name`、`email` 属性は Datadog に組み込まれていますが、アプリに適したその他の属性を追加できます。

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

ユーザー情報を消去したい場合 (例えば、ユーザーがサインアウトしたとき)、以下のように空のオブジェクトを渡すことで消去できます。

```js
DdSdkReactNative.setUser({});
```

### グローバル属性

また、グローバル属性を維持して A/B テストのコンフィギュレーション、広告キャンペーン元、カートのステータスなど指定したセッションに関する情報を追跡することも可能です。

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

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

データが Datadog にアップロードされる前に、アプリケーションのキャッシュディレクトリに平文で保存されます。このキャッシュフォルダは、[Android のアプリケーションサンドボックス][10]によって保護されており、ほとんどのデバイスで、このデータは他のアプリケーションによって読み取られることはありません。しかし、モバイルデバイスがルート化されていたり、誰かが Linux カーネルをいじったりすると、保存されているデータが読めるようになる可能性があります。

### iOS

データは Datadog にアップロードされる前に、[アプリケーションサンドボックス][11]のキャッシュディレクトリ (`Library/Caches`) に平文で保存され、デバイスにインストールされた他のアプリからは読み取ることができません。

## 開発モード

開発モードでは、アプリケーションは、コード変換エラー、ローカル開発サーバーへの要求など、React Native ツールに関連する追加のイベントを送信できます。

これらのイベントがダッシュボードに表示されないようにするには、`__DEV__` フラグを使用して、開発モードでのエラーとリソースの追跡を無効にします。

```js
const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources は DEV モードでは false になり、それ以外の場合は true になります */,
    !__DEV__  /* trackErrors は DEV モードでは false になり、それ以外の場合は true になります */,
    trackingConsent
)
```

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