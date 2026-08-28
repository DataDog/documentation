---
description: ブラウザ JavaScript アプリケーション用に Datadog Feature Flags を構成します。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイド Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/
  tag: OpenFeature
  text: OpenFeature Web SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: ドキュメント
  text: Browser Monitoring
- link: /feature_flags/browser_developer_extension/
  tag: ドキュメント
  text: Browser Developer Extension
title: JavaScript Feature Flags
---
## 概要{#overview}

このページでは、Datadog Feature Flags SDK を使用してブラウザ JavaScript アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags を使用すると、アプリの機能の有効化をリモートで制御し、安全に実験を行い、新しいエクスペリエンスを自信を持って提供するための統一された方法を利用できます。

JavaScript 用 Datadog Feature Flags SDK は、Feature Flags 管理のオープン標準である [OpenFeature][1] に基づいて構築されています。このガイドでは、SDK のインストール、Datadog プロバイダーの構成、およびアプリケーションでのフラグの評価方法について説明します。

## インストール {#installation}

お好みのパッケージマネージャーを使用して、Datadog OpenFeature プロバイダーと OpenFeature Web SDK をインストールします。

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## プロバイダーの初期化 {#initialize-the-provider}

Datadog 認証情報を使用して `DatadogProvider` インスタンスを作成します。ライブ Browser Feature Flags の構成には、`applicationId`、`clientToken`、`site`、および`env` が必要です。クライアントトークンを作成するには、[クライアントトークン][2]を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) 。</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

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

## 評価コンテキストの設定{#set-the-evaluation-context}

評価コンテキストを使用して、フラグの評価を誰または何に適用するかを定義します。評価コンテキストには、返すフラグバリアントを決定するために使用されるユーザーまたはセッション情報が含まれます。これらの属性をターゲティングルールで参照して、各バリアントを誰に表示するかを制御します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性として、文字列、数値、ブール値といったフラットなプリミティブ値を使用する必要があります。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info"> <code>targetingKey</code> は、パーセンテージベースのターゲティングにおけるランダム化の対象として使用されます。フラグが対象の一定割合 (たとえば、50%) をターゲットにする場合、 <code>targetingKey</code> によってユーザーがどの「バケット」に入るかが決まります。同じ <code>targetingKey</code> を持つユーザーは、特定のフラグに対して常に同じバリアントを受け取ります。</div>

ほとんどのアプリケーションは、別のサービスからのデータ取得や構成の読み込みなど、複数の非同期タスクを起動時に実行します。この例では、Feature Flags の初期化のみを示しています。ベストプラクティスとして、すべての起動時の Promise をまとめて開始し、結果が必要になる直前に (たとえば `Promise.all` を使用して) グループとして待機してください。各 Promise を順番に待機することは避けてください。これにより、合計起動時間をすべてのタスクの合計ではなく、最も時間のかかるタスクに近い時間に抑えることができます。

## フラグの評価{#evaluate-flags}

プロバイダーの初期化後、アプリケーション内のどこからでもフラグを評価できます。Feature Flags の評価は_ローカルで即座に_行われます。SDK はローカルにキャッシュされたデータを使用するため、Feature Flags を評価する際にネットワークリクエストは発生しません。

### クライアントの取得 {#get-a-client}

フラグを評価するために OpenFeature クライアントを取得します。

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### ブール型フラグ {#boolean-flags}

オン/オフや true/false の状態を表すフラグには、`getBooleanValue(key, defaultValue)` を使用します。

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリエーションや設定用文字列のいずれかを選択するフラグには、`getStringValue(key, defaultValue)` を使用します。

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui_theme', 'light');

switch (theme) {
  case 'dark':
    setDarkTheme();
    break;
  case 'light':
  default:
    setLightTheme();
}
{{< /code-block >}}

### 数値フラグ {#number-flags}

上限、パーセンテージ、乗数などの数値フラグには `getNumberValue(key, defaultValue)` を使用します。

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化された構成データには `getObjectValue(key, defaultValue)` を使用します。

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、詳細メソッドを使用してください。これらは、評価された値と評価内容を説明するメタデータの両方を返します。

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Evaluated value (true or false)
console.log(details.variant);     // Variant name, if applicable
console.log(details.reason);      // Why this value was chosen
console.log(details.errorCode);   // Error code, if evaluation failed
{{< /code-block >}}

## 完全な例 {#complete-example}

JavaScript アプリケーションで Datadog Feature Flags を構成および使用する方法を示す完全な例を次に示します。

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

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

await OpenFeature.setProviderAndWait(provider, evaluationContext);

// Get the client and evaluate flags
const client = OpenFeature.getClient();
const showNewFeature = client.getBooleanValue('new_feature', false);

if (showNewFeature) {
  console.log('New feature is enabled!');
}
```

## 評価コンテキストの更新 {#update-the-evaluation-context}

初期化後に評価コンテキストを更新するには (ユーザーがログインしたときなど)、`OpenFeature.setContext()` を使用します。

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## ブラウザプロバイダーオプションの構成 {#configure-browser-provider-options}

Web プロバイダーは、以下のオプション設定もサポートしています。

| オプション | デフォルト | 用途 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | エクスポージャーイベントをエクスポージャーインテークに送信します。|
| `enableFlagEvaluationTracking` | `true` | 評価テレメトリを集計して送信します。|
| `enableRumFeatureFlagTracking` | `true` | Browser RUM が利用可能な場合、RUM イベントにフラグ評価を追加します。このオプションを有効にすると、RUM 課金対象のイベント数が増加する可能性があります。|
| `flagEvaluationTrackingInterval` | `10000` ms | 評価テレメトリのフラッシュ間隔。|
| `initialFlagsConfiguration` | `{}` | 事前計算されたフラグでブートストラップします。|
| `flaggingProxy` | 未設定 | `site` の代わりにプロキシ経由でフラグを取得します。|
| `customHeaders` | 未設定 | フラグ取得リクエストにヘッダーを追加します。|
| `overwriteRequestHeaders` | `false` | デフォルトのリクエストヘッダーを `customHeaders` に置き換えます。|

## ブラウザでフラグをオーバーライドする {#override-flags-in-your-browser}

組織のフラグを参照し、開発中にローカルでオーバーライドするには、`DatadogDevtools` ラッパーをプロバイダースタックに組み込み、[Datadog Browser SDK 開発者拡張機能][3]の **Feature Flags** タブを使用します。

## テスト {#testing}

実際の `DatadogProvider` を使用して専用の Datadog テスト環境でテストするか、OpenFeature の `InMemoryProvider` に置き換えて、テストコード内でフラグの値を直接制御できます。このセクションでは、テストを独立した状態でオフラインに保つインメモリ方式について説明します。`InMemoryProvider` は `@openfeature/web-sdk` から直接エクスポートされるため、追加の依存関係は不要です。

サーバーサイド SDK とは異なり、Web SDK は初期化後に同期的にフラグを評価します。それでも、プロバイダーの準備が整っていることを確認するために、`beforeEach` 内で一度 `await` `setProviderAndWait` してください。

{{< code-block lang="javascript" >}}
import { beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
  ui_theme: {
    variants: { dark: 'dark', light: 'light' },
    defaultVariant: 'light',
    disabled: false,
  },
};

beforeEach(async () => {
  await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
  await OpenFeature.close();
});

test('new checkout button is enabled by default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('new_checkout_button', false)).toBe(true);
});

test('missing flag returns default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('does-not-exist', false)).toBe(false);
});
{{< /code-block >}}

Web SDK のフラグ形式には、`variants`、`defaultVariant`、および `disabled` が必要です。これらのいずれかを省略すると TypeScript のコンパイルに失敗します。実行時に不明なフラグキーを評価すると、指定したデフォルト値が返されます。型チェックされたフラグ構成には、非推奨の `InMemoryProvider` ではなく `TypedInMemoryProvider` を使用してください。同じテストパターンが Jest + jsdom でも機能します。`vitest` のインポートを `@jest/globals` に置き換え、プロジェクトに `jest-environment-jsdom` を追加してください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/feature_flags/browser_developer_extension/