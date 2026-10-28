---
description: React アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: ドキュメント
  text: ブラウザのモニタリング
title: React Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して、React アプリケーションに対して計測機能を組み込む方法を説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

React 用 Datadog Feature Flags SDK は、Feature Flags 管理のオープン標準である [OpenFeature][1] 上に構築されています。このガイドでは、SDK のインストール方法、Datadog プロバイダーの設定方法、および React コンポーネントでフラグを評価する方法について説明します。

## インストール {#installation}

お好みのパッケージマネージャーを使用して、Datadog OpenFeature プロバイダーと OpenFeature React SDK をインストールします。

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## プロバイダーを初期化する {#initialize-the-provider}

`DatadogProvider` インスタンスを作成し、OpenFeature に登録します。これは、React コンポーネントをレンダリングする前の、アプリケーションの可能な限り早い段階で行ってください。ライブ Browser Feature Flags の構成には、`applicationId`、`clientToken`、`site`、および `env` が必要です。クライアントトークンの作成については、[クライアントトークン][2] を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a> ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  // Required
  // applicationId is a unique identifier to distinguish multiple frontend applications.
  // This should match the app ID you provide to your RUM SDK.
  applicationId: '<APPLICATION_ID>',
  // Required
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## 評価コンテキストを設定する {#set-the-evaluation-context}

評価コンテキストを使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれます。これらの属性をターゲティングルールで参照して、各バリアントを表示する対象を制御します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

評価コンテキストとともにプロバイダーを設定します。

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info"> <code>targetingKey</code> は、パーセンテージベースのターゲティングにおけるランダム化の対象として使用されます。フラグが対象のパーセンテージ (例: 50%) をターゲットにする場合、 <code>targetingKey</code> がどの「バケット」に分類されるかを決定します。同じ <code>targetingKey</code> のユーザーは、特定のフラグに対して常に同じバリアントを受け取ります。</div>

## アプリケーションを {#wrap-your-application} でラップします

アプリケーションを `OpenFeatureProvider` コンポーネントでラップします。これにより、React コンテキストを通じてすべての子コンポーネントで Feature Flags が利用可能になります。

{{< code-block lang="jsx" >}}
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

OpenFeature React SDK は、コンポーネント内で Feature Flags を評価するためのフックを提供します。各フックは、構成した評価コンテキストに基づいて Feature Flags の値を返します。

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

React アプリケーションで Datadog Feature Flags をセットアップして使用する方法を示す完全な例を紹介します。

```jsx
import { Suspense } from 'react';
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeatureProvider, OpenFeature, useBooleanFlagValue } from '@openfeature/react-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

OpenFeature.setProvider(provider, evaluationContext);

// Wrap your app with the OpenFeatureProvider and Suspense for loading state
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <OpenFeatureProvider suspendUntilReady>
        <Page />
      </OpenFeatureProvider>
    </Suspense>
  );
}

// Use feature flags in your components
function Page() {
  const showNewFeature = useBooleanFlagValue('new_feature', false);

  return (
    <div>
      {showNewFeature ? <NewFeature /> : <ExistingFeature />}
    </div>
  );
}
```

## 評価コンテキストを更新する {#update-the-evaluation-context}

初期化後に評価コンテキストを更新するには (ユーザーがログインするときなど)、`OpenFeature.setContext()` を使用します。

{{< code-block lang="javascript" >}}
// When a user logs in
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## ブラウザプロバイダーオプションを構成する {#configure-browser-provider-options}

React プロバイダーは Datadog ブラウザプロバイダーを使用します。これには以下のオプション設定もサポートされています。

| オプション | デフォルト | 使用 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | エクスポージャーイベントをエクスポージャーインテークに送信します。|
| `enableFlagEvaluationTracking` | `true` | 集計された評価テレメトリを送信します。|
| `enableRumFeatureFlagTracking` | `true` | Browser RUM が利用可能な場合、RUM イベントにフラグ評価を追加します。このオプションを有効にすると、RUM 課金対象のイベント数が増加する可能性があります。|
| `flagEvaluationTrackingInterval` | `10000` ms | 評価テレメトリのフラッシュ間隔。|
| `initialFlagsConfiguration` | unset | フェッチに失敗した場合のフォールバックとして、コンテキストに一致する事前計算済みデータを提供します。[Initial precomputed fallback data][3] を参照してください。|
| `flaggingProxy` | 未設定 | プロキシ経由でフラグを取得し、`site` の代わりに使用します。|
| `customHeaders` | 未設定 | フラグ取得リクエストにヘッダーを追加します。|
| `overwriteRequestHeaders` | `false` | デフォルトのリクエストヘッダーを `customHeaders` に置き換えます。|

`DatadogProvider` は、React アプリケーションで推奨されるブラウザプロバイダーです。アプリケーション所有の構成配信や、コンテキスト変更全体でのローカルルール評価については、[Browser Rules-Based Evaluation][4] を参照してください。この高度なセットアップでは、明示的な構成の更新と追跡ライフサイクル管理が必要です。

## テスト {#testing}

実際の `DatadogProvider` を使用して専用の Datadog テスト環境でテストするか、OpenFeature の `TypedInMemoryProvider` に置き換えて、テストコード内で直接 Feature Flags の値を制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`TypedInMemoryProvider` は `@openfeature/web-sdk` からエクスポートされます。これを開発依存関係としてインストールし、テスト対象のコンポーネントをレンダリングする前に登録してください。

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

await OpenFeature.setProviderAndWait(new TypedInMemoryProvider({
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
}));
{{< /code-block >}}

Web SDK のフラグ形状には、`variants`、`defaultVariant`、および `disabled` が必要です。テストでフラグによってゲートされたコンポーネントが即座にレンダリングされる際のサスペンスレースを回避するには、`setProviderAndWait`(`setProvider`ではなく) を使用してください。Reactツリーをマウントするコンポーネントテスト用に、`@openfeature/react-sdk`は子要素をインメモリプロバイダーでラップする`OpenFeatureTestProvider`コンポーネントもエクスポートします。詳細については、[OpenFeature React SDKのドキュメント](https://openfeature.dev/docs/reference/technologies/client/web/react)を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /ja/feature_flags/implementation_patterns/browser_rules_based_evaluation/