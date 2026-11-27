---
description: React Native アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /real_user_monitoring/application_monitoring/react_native/
  tag: ドキュメント
  text: React Native のモニタリング
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: ガイド
  text: Feature Flag SDK トラフィックのプロキシ
title: React Native Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して React Native アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

React Native 用 Datadog Feature Flags SDK は、Feature Flags 管理のオープン標準である [OpenFeature][1] 上に構築されています。このガイドでは、SDK のインストール方法、Datadog プロバイダーの設定方法、および React Native コンポーネントで Feature Flags を評価する方法について説明します。

## 要件 {#requirements}

- **React Native** バージョン 0.65 以降
- **iOS** バージョン 13 以降
- **Android** API レベル 23 以降
- **Datadog React Native SDK** (`@datadog/mobile-react-native`) を最初に初期化する必要があります

## インストール {#installation}

お好みのパッケージマネージャーを使用して、Datadog React Native SDK、OpenFeature プロバイダー、および OpenFeature React SDK をインストールします。

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### iOS セットアップ {#ios-setup}

追加したポッドをインストールします。

{{< code-block lang="bash" >}}
(cd ios && pod install)
{{< /code-block >}}

### Android セットアップ {#android-setup}

React Native バージョン 0.68 以降を使用している場合は、Java 17 を使用してください。React Native バージョン 0.67 以前を使用している場合は、Java 11 を使用してください。

`android/build.gradle` ファイルで、Kotlin 依存関係間の競合を避けるために `kotlinVersion` を指定します。

{{< code-block lang="groovy" filename="build.gradle" >}}
buildscript {
    ext {
        kotlinVersion = "1.8.21"
    }
}
{{< /code-block >}}

## SDK の初期化 {#initialize-the-sdk}

React Native 用 Datadog OpenFeature プロバイダーを使用するには、まずコア Datadog React Native SDK を初期化し、その後 Feature Flags を有効にする必要があります。クライアントトークンの作成については、[クライアントトークン][2]を参照してください。

### オプション 1: DatadogProvider コンポーネントを使用する {#option-1-using-datadogprovider-component}

`DatadogProvider` コンポーネントを使用して SDK を初期化する場合は、`onInitialized` コールバックで Feature Flags を有効にします。

```tsx
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);
config.site = '{{< region-param key="dd_site" code="true" >}}';

export default function App() {
    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();
                OpenFeature.setProvider(provider);
            }}
        >
            <OpenFeatureProvider>
                <Navigation />
            </OpenFeatureProvider>
        </DatadogProvider>
    );
}
```

### オプション 2: 命令的な初期化を使用する {#option-2-using-imperative-initialization}

SDK を命令的に初期化する場合は、初期化の完了後に Feature Flags を有効にします。

```tsx
import { DdSdkReactNative, DdFlags, CoreConfiguration } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature } from '@openfeature/react-sdk';

(async () => {
    const config = new CoreConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        '<APPLICATION_ID>'
    );
    config.site = '{{< region-param key="dd_site" code="true" >}}';

    await DdSdkReactNative.initialize(config);

    // Enable Feature Flags after core SDK initialization
    await DdFlags.enable();

    // Set the Datadog provider with OpenFeature
    const provider = new DatadogOpenFeatureProvider();
    OpenFeature.setProvider(provider);
})();
```

<div class="alert alert-info">Feature Flags SDK を使用すると、フラグ評価データの Datadog への送信が自動的に有効になります。 <code>rumIntegrationEnabled</code> および <code>trackExposures</code> パラメーターを <code>DdFlags.enable()</code> 呼び出しに渡して、この動作を構成します。</div>

## 評価コンテキストを設定する {#set-the-evaluation-context}

評価コンテキストを使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれます。これらの属性をターゲティングルールで参照して、各バリアントを表示する対象を制御します。

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setContext(evaluationContext);
{{< /code-block >}}

<div class="alert alert-info"> <code>targetingKey</code> は、パーセンテージベースのターゲティングにおけるランダム化の対象として使用されます。フラグが対象のパーセンテージ (例: 50%) をターゲットにする場合、 <code>targetingKey</code> がどの「バケット」に分類されるかを決定します。同じ <code>targetingKey</code> のユーザーは、特定のフラグに対して常に同じバリアントを受け取ります。</div>

## アプリケーションを {#wrap-your-application} でラップします

アプリケーションを `OpenFeatureProvider` コンポーネントでラップします。これにより、React コンテキストを通じてすべての子コンポーネントで Feature Flags が利用可能になります。

{{< code-block lang="tsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
    return (
        <OpenFeatureProvider>
            <YourApp />
        </OpenFeatureProvider>
    );
}
{{< /code-block >}}

## フラグを評価する {#evaluate-flags}

OpenFeature React SDK は、コンポーネント内で Feature Flags を評価するためのフックを提供します。各フックは、構成した評価コンテキストに基づいて Feature Flags の値を返します。フラグの評価は_ローカルで即座に_行われます。SDK はローカルにキャッシュされたデータを使用するため、フラグを評価する際にネットワークリクエストは発生しません。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表す Feature Flags には、`useBooleanFlagValue(key, defaultValue)` を使用します。

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択する Feature Flags には、`useStringFlagValue(key, defaultValue)` を使用します。

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### 数値フラグ {#number-flags}

制限、パーセンテージ、乗数などの数値 Feature Flags には、`useNumberFlagValue(key, defaultValue)` を使用します。

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化された構成データには、`useObjectFlagValue(key, defaultValue)` を使用します。

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Suspense のサポート {#suspense-support}

組み込みの [suspense](https://react.dev/reference/react/Suspense) サポートにより、プロバイダーの初期化が完了するまで、またはコンテキストが変更されるまで、Feature Flags を使用するコンポーネントが表示されないようにできます。この機能を使用するには、フックオプションに `{ suspend: true }` を渡します。

例:

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

Feature Flags の値だけでなく、詳細も必要な場合は、詳細フックを使用します。これらは、評価された値とその評価を説明するメタデータの両方を返します。

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

例:

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## 完全な例 {#complete-example}

React Native アプリケーションで Datadog Feature Flags をセットアップして使用する方法を示す完全な例を紹介します。

```tsx
import { Suspense } from 'react';
import { View } from 'react-native';
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);

// Wrap your app with the DatadogProvider and OpenFeatureProvider.
export default function AppWithProviders() {
    // Based on your auth state.
    const user = getCurrentUser();

    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();

                const evaluationContext = {
                    targetingKey: user.id,
                    region: user.country,
                };

                OpenFeature.setProvider(provider, evaluationContext);
            }}
        >
          <Suspense fallback={<Loading />}>
            <OpenFeatureProvider suspendUntilReady>
                <App />
            </OpenFeatureProvider>
          </Suspense>
        </DatadogProvider>
    );
}

// Use feature flags in your components
function App() {
    const showNewFeature = useBooleanFlagValue('new_feature', false);

    return (
        <View>
            {showNewFeature ? <NewFeature /> : <ExistingFeature />}
        </View>
    );
}
```

## 評価コンテキストを更新する {#update-the-evaluation-context}

初期化後に評価コンテキストを更新するには (ユーザーがログインするときなど)、`OpenFeature.setContext()` を使用します。

{{< code-block lang="tsx" >}}
import { OpenFeature } from '@openfeature/react-sdk';

// When a user logs in
function onUserLogin(user) {
    OpenFeature.setContext({
        targetingKey: user.id,
        email: user.email,
        plan: user.plan,
    });
}
{{< /code-block >}}

## Feature Flags オプションの構成 {#configure-feature-flags-options}

Feature Flags の動作をカスタマイズするには、`DdFlags.enable()` に構成オプションを渡します。

{{< code-block lang="tsx" >}}
await DdFlags.enable({
    // Send flag evaluation data to RUM for session analysis (default: true)
    rumIntegrationEnabled: true,
    // Track flag exposures for analytics (default: true)
    trackExposures: true,
});
{{< /code-block >}}

`rumIntegrationEnabled`
: `true` (デフォルト) の場合、フラグ評価は RUM で追跡され、ユーザーセッションと関連付けることができます。これにより、_「バリアント B のユーザーはより多くのエラーを経験しているか」_といった分析が可能になります。

`trackExposures`
: `true` (デフォルト) の場合、SDK は Feature Flags が評価されると自動的に_エクスポージャーイベント_を記録します。これらのイベントには、どのフラグにアクセスされたか、どのバリアントが提供されたか、どのようなコンテキストで提供されたかに関するメタデータが含まれています。これらは Datadog に送信されるため、Feature Flags の採用状況を分析できます。

## コンテキスト属性の要件 {#context-attribute-requirements}

<div class="alert alert-warning">
評価コンテキストの属性は、フラットなプリミティブ値 (文字列、数値、ブール値) である必要があります。ネストされたオブジェクトや配列は <strong>サポートされておらず</strong>、評価コンテキストから削除されます。
</div>

評価コンテキストではフラットな属性を使用してください。

{{< code-block lang="javascript" >}}
OpenFeature.setContext({
    targetingKey: 'user-123',
    userId: 'user-123',
    tier: 'premium',
    age: 25
});
{{< /code-block >}}

ネストされたオブジェクトや配列は避けてください。

{{< code-block lang="javascript" >}}
// These attributes will be dropped from the evaluation context with a console warning.
OpenFeature.setContext({
    targetingKey: 'user-123',
    user: { id: 'user-123' },        // nested object - NOT SUPPORTED
    features: ['beta', 'analytics']  // array - NOT SUPPORTED
});
{{< /code-block >}}

## テスト {#testing}

実際の `DatadogOpenFeatureProvider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `TypedInMemoryProvider` に置き換えてテストコード内で Feature Flags の値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`TypedInMemoryProvider` は `@openfeature/web-sdk` からエクスポートされます。これは React Native Feature Flags 用にすでにインストールされています。

{{< code-block lang="tsx" >}}
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
    new_checkout_button: {
        variants: { on: true, off: false },
        defaultVariant: 'on',
        disabled: false,
    },
};

beforeEach(async () => {
    await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
    await OpenFeature.close();
});

function CheckoutButton() {
    const enabled = useBooleanFlagValue('new_checkout_button', false);
    return <Text>{enabled ? 'New checkout' : 'Legacy checkout'}</Text>;
}

test('new checkout button is enabled', () => {
    render(
        <OpenFeatureProvider>
            <CheckoutButton />
        </OpenFeatureProvider>
    );

    expect(screen.getByText('New checkout')).toBeTruthy();
});
{{< /code-block >}}

Web SDK のフラグ形状には、`variants`、`defaultVariant`、および `disabled` が必要です。コンポーネントをレンダリングする前に `setProviderAndWait` を使用して、フックがデフォルトのプロバイダーに対して評価されないようにしてください。

## トラブルシューティング {#troubleshooting}

### Feature Flags が返されない {#no-flags-returned}

Feature Flags の評価でデフォルト値が返される場合、

1. `DdFlags.enable()` を呼び出す前に、Datadog React Native SDK が初期化されていることを確認してください。
2. OpenFeature プロバイダーを設定する前に `DdFlags.enable()` が完了していることを確認してください。
3. Feature Flags を評価する前に、評価コンテキストが設定されていることを確認してください。
4. Datadog Feature Flags ダッシュボードで、Feature Flags が存在し、有効になっていることを確認してください。

### iOS Pod のインストールエラー {#ios-pod-install-errors}

`use_frameworks!` を `Podfile` で有効にしている場合、`pod install` 中にエラーが発生することがあります。`Podfile` を編集して、SDK Pod を静的ライブラリとしてインストールします。

{{< code-block lang="ruby" filename="Podfile" >}}
static_libraries = ['DatadogSDKReactNative']

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
{{< /code-block >}}

### Feature Flags が初期化されていないというエラー {#feature-flags-not-initialized-error}

Feature Flags が初期化されていないというエラーが表示される場合は、初期化の順序を確認してください。

1. 最初にコア Datadog React Native SDK (`DdSdkReactNative.initialize()` または `DatadogProvider`) を初期化します。
2. SDK の初期化後に `DdFlags.enable()` を呼び出します。
3. Feature Flags を有効にした後、`DatadogOpenFeatureProvider` を作成して設定します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/account_management/api-app-keys/#client-tokens