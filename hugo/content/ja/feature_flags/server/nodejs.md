---
description: Node.js アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /tracing/trace_collection/dd_libraries/nodejs/
  tag: ドキュメント
  text: Node.js トレース
- link: /tracing/
  tag: ドキュメント
  text: Application Performance Monitoring (APM) について学ぶ
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
- link: /feature_flags/concepts/configuration_sources/
  tag: コンセプト
  text: サーバー SDK 構成ソース
title: Node.js Feature Flags
---
## 概要{#overview}

このページでは、Datadog Feature Flags SDK を使用して Node.js アプリケーションをインスツルメントする方法について説明します。Node.js SDK は、機能フラグ管理のオープン標準である [OpenFeature][2] と統合されます。`dd-trace` 6.12.0 以降では、デフォルトで Datadog が管理する CDN から直接フラグ構成を読み込みます。

Agentless Node.js はフラグをローカルで評価し、実験エクスポージャーイベントを送信します。互換性のあるローカルの Event Platform Proxy (EVP) リレーが優先されます。互換性のあるリレーが利用できない場合は、エクスポージャーイベントを直接送信します。EVP フラグ評価イベントは送信されません。

## はじめに {#getting-started}

デフォルトのエージェントレスセットアップには、以下が必要です。

- **Datadog Node.js SDK** `dd-trace` バージョン **6.12.0 以降**
- Datadog [API キー][3]
- Datadog サイト
- **@openfeature/server-sdk** バージョン ~1.20.0

## インストールと初期化 {#installing-and-initializing}

Feature Flagging は、Application Performance Monitoring (APM) によって提供されます。APM を機能フラグサポート付きでアプリケーションに統合するには、`dd-trace` をインストールし、Datadog OpenFeature プロバイダーを初期化します。詳しい APM インストール手順については、[Node.js アプリケーションのトレーシング][1]を参照してください。

```shell
npm install dd-trace@^6.12.0 @openfeature/server-sdk
```

### Agentless 配信を構成する{#configure-agentless-delivery}

アプリケーションプロセスで API キー、Datadog サイト、および環境を構成してください。

```shell
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
```

Feature Flags の有効化やソース設定は必要ありません。`tracer.openfeature` にアクセスし、以下に示すように OpenFeature に登録して、ポーリングを開始します。`dd-trace` のインストールまたは初期化だけでは、Feature Flags CDN トラフィックは作成されません。

コード内でプロバイダーを初期化します。

```javascript
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init();

// Accessing tracer.openfeature activates the default agentless source.
// setProviderAndWait resolves after the selected source loads, so flags
// evaluate against real configuration data instead of default values.
try {
  await OpenFeature.setProviderAndWait(tracer.openfeature);
} catch (err) {
  // If initialization fails, evaluations return default values until the
  // provider receives its first configuration. Log the error so it's visible.
  console.error('Datadog feature flag provider failed to initialize', err);
}
```

これらの例では ESM モジュールを使用しており、`await` はトップレベルで利用可能です。CommonJS では、トップレベルの `await` を非同期関数でラップします。

ほとんどのアプリケーションでは、他の非同期スタートアップタスク (データベース接続の確立や構成の読み込みなど) も実行されます。それらのプロミスをプロバイダープロミスとともに開始し、グループとして待機させます。これにより、合計スタートアップ時間がすべてのタスクの合計ではなく、最も遅いタスクに近い時間になります。

```javascript
// Start feature flag setup alongside your other startup tasks, then await them together.
const [_, db] = await Promise.all([
  // Catch here so a failed provider init does not reject the whole batch.
  // Evaluations return default values until the provider receives its config.
  OpenFeature.setProviderAndWait(tracer.openfeature).catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  }),
  connectToDatabase(), // your application's other async startup work
]);
// db is connected and the server can start; flags evaluate against real configuration, or fall back to defaults if initialization failed.
```

上記のようにプロバイダーの準備ができるまでスタートアップをブロックする方法は、ほとんどのアプリケーションで機能します。初期化が完了する前にアプリケーションがリクエストの処理を開始する必要がある場合は、以下のいずれかの戦略を選択してください。

### 初期化前にデフォルト値を受け入れる {#accepting-default-values-before-initialization}

スタートアップ時の応答性が最初のいくつかのリクエストで実際の値を処理することよりも重要な場合は、初期化を待たずに `setProvider` を呼び出すことができます。`setProvider` は同期的なため、選択された構成ソースがバックグラウンドで読み込まれるまで、クライアントはデフォルト値を返します。

```javascript
OpenFeature.setProvider(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

### プロバイダーの初期化の待機 {#waiting-for-provider-initialization}

サーバーが実際の構成データに基づいて評価行う一方で、即時にリッスンを開始するようにしたい場合は、待機をリクエストの時点まで延期できます。初期化プロミスを保存します。その後フラグを評価する前に、各リクエストハンドラーで待機します。初期化が完了する前に到着したリクエストは、初期化が完了するまで待機します。

```javascript
// Attach the catch once, at creation. This logs a failed initialization a
// single time and keeps the shared promise from rejecting on every request;
// evaluations return default values until the provider receives its first
// configuration.
const initializationPromise = OpenFeature.setProviderAndWait(tracer.openfeature)
  .catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  });
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Wait for initialization if necessary. The promise is already handled
  // above, so awaiting it here never throws, even if initialization failed.
  await initializationPromise;

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

## 評価コンテキストを設定する {#set-the-evaluation-context}

`EvaluationContext` を使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれていることがあります。適切なターゲティングを確実に行うため、フラグを評価する前に `OpenFeature.setContext` メソッドを呼び出してください。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

## フラグを評価する {#evaluate-flags}

[インストールと初期化](#installing-and-initializing)セクションの説明に従って `OpenFeature` クライアントを作成した後で、アプリ全体でフラグ値の読み取りを開始できます。フラグの評価にはローカルにキャッシュされたデータが使用されるため、フラグを評価する際にネットワークリクエストは発生しません。

各フラグは_キー_ (一意の文字列) によって識別され、想定されるタイプの値を返す_タイプ指定されたゲッター_ で評価できます。フラグが存在しない場合や評価できない場合、SDK は提供されたデフォルト値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表す Feature Flags には、`getBooleanValue()` を使用します。必要に応じて、特定のターゲティングルールのコンテキストを設定してください。

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
```

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択する Feature Flags には、`getStringValue()` を使用します。たとえば、以下のとおりです。

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const searchAlgorithm = await client.getStringValue(
  'search-algorithm', // flag key
  'basic', // default value
  evaluationContext,
);

switch (searchAlgorithm) {
  case 'basic':
      return basicSearch(query);
  case 'fuzzy':
      return fuzzySearch(query);
  case 'semantic':
      return semanticSearch(query);
  default:
      return basicSearch(query);
}
```

### 数値フラグ {#number-flags}

数値フラグには `getNumberValue()` を使用します。これは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const maxItems = await client.getNumberValue(
    'max-cart-items', // flag key
    20, // default value
    evaluationContext,
);

const priceMultiplier = await client.getNumberValue(
    'pricing-multiplier', // flag key
    1.3, // default value
    evaluationContext,
);
```

### オブジェクトフラグ {#object-flags}

構造化 JSON データには `getObjectValue()` を使用します。このメソッドは `object` を返します。これはプリミティブ、配列、または辞書を表すことができます。オブジェクトフラグは、複数のプロパティをまとめて指定する必要がある場合に便利です。

```javascript
const defaultConfig = {
  color: '#00A3FF',
  fontSize: 14,
};

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const config = await client.getObjectValue('ui-config', defaultConfig, evaluationContext);
```

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値に加えて詳細情報が必要な場合は、`get<Type>Details` 関数を使用します。これらのメソッドは、評価された値とその評価を説明するメタデータの両方を返します。

* `getBooleanDetails() -> Promise<EvaluationDetails<boolean>>`
* `getStringDetails() -> Promise<EvaluationDetails<string>>`
* `getNumberDetails() -> Promise<EvaluationDetails<number>>`
* `getObjectDetails() -> Promise<EvaluationDetails<JsonValue>>`

たとえば、以下のとおりです。

```javascript
const details = await client.getStringDetails('paywall-layout', 'control', evaluationContext);

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## 高度な構成 {#advanced-configuration}

ソースの選択と運用設定の標準的なリファレンスとして、[サーバー SDK 構成ソース][6]を使用してください。

- [Agentless 配信を構成する][9]: ポーリング、リクエストタイムアウト、エンドポイント設定を含む
- [カスタム Agentless エンドポイントを使用する][7]: 高度なテスト、ローカル開発、またはオペレーター管理のプロキシの場合
- [Agent Remote Configuration を使用する][10:]Agent 管理配信を維持する
- [既存の Remote Configuration セットアップを移行する][8]: および非推奨の `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 設定を削除する

Agentless モードでは、互換性のあるローカルテレメトリリレーが利用可能な場合には、Node.js はこのテレメトリリレーを使用します。互換性のあるリレーが利用できない場合は、実験エクスポージャーイベントを直接送信します。Agent なしのいサーバーレス環境では、ローカルテレメトリリレーとして [`serverless-init`][11] を使用できます。

`feature_flag.evaluations` メトリクスは、[サーバーサイドフラグ評価メトリクス][4]ガイドの個別の OTLP セットアップを使用します。このためには、サポートされている Agent またはサーバーレステレメトリレシーバーが必要です。利用可能なグラフ作成の詳細については、[Feature Flag グラフ][5]を参照してください。

## テスト {#testing}

実際の `tracer.openfeature` プロバイダーを使用して専用の Datadog テスト環境に対してテストを行うか、これを OpenFeature の `TypedInMemoryProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`TypedInMemoryProvider` は `@openfeature/server-sdk` に同梱されているため、追加の依存関係は不要です。

インメモリプロバイダーを使用する場合は、`tracer.init()` を呼び出したり、`tracer.openfeature` をプロバイダーとして設定したりしないでください。これは置き換えられる動作です。

OpenFeature API は、Node.js プロセスごとのシングルトンです。あるテストファイルのステートが次のテストファイルに漏洩しないようにするため、`afterAll` で `OpenFeature.close()` または `OpenFeature.clearProviders()` を使用してリセットします。

```javascript
// flags.test.js
import { beforeAll, beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';

const flags = {
  'new-checkout-flow': {
    variants: { on: true, off: false },
    defaultVariant: 'off',
    disabled: false,
    contextEvaluator: (ctx) => (ctx.companyID === 'beta-co' ? 'on' : 'off'),
  },
};

let provider;

beforeAll(async () => {
  provider = new TypedInMemoryProvider(flags);
  await OpenFeature.setProviderAndWait(provider);
});

beforeEach(() => {
  // Reset flag state between tests to prevent cross-test pollution.
  provider.putConfiguration(flags);
});

afterAll(async () => {
  await OpenFeature.close();
});

test('beta company sees new checkout', async () => {
  const client = OpenFeature.getClient();
  const value = await client.getBooleanValue('new-checkout-flow', false, {
    targetingKey: 'user-1',
    companyID: 'beta-co',
  });
  expect(value).toBe(true);
});

test('non-beta company falls back to default', async () => {
  const client = OpenFeature.getClient();
  const details = await client.getBooleanDetails('new-checkout-flow', false, {
    targetingKey: 'user-2',
    companyID: 'acme',
  });
  expect(details.value).toBe(false);
  expect(details.variant).toBe('off');
});
```

上記のコードスニペットでは、ファーストクラスの ESM サポートのために Vitest を使用しています。同じパターンは Jest でも機能しますが、Jest ユーザーのプロジェクトが ESM の場合、その Jest ユーザーには `--experimental-vm-modules` が必要になることがあります。非汎用的な `InMemoryProvider` エクスポートは非推奨です。`TypedInMemoryProvider` が推奨されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: https://openfeature.dev/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ja/feature_flags/concepts/flag_graphs/
[6]: /ja/feature_flags/concepts/configuration_sources/
[7]: /ja/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /ja/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[10]: /ja/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[11]: /ja/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry