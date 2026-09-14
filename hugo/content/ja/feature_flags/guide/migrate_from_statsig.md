---
description: Statsig から Datadog Feature Flags へ Feature Flags を移行する方法を学びます。
further_reading:
- link: /feature_flags/
  tag: ドキュメント
  text: Feature Flags の概要
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
title: Statsig から Feature Flags を移行する
---
## 概要 {#overview}

このガイドでは、Feature Flags のロジックを Statsig から [Datadog Feature Flags][1] へ移行するプロセスについて説明します。概念的なマッピング、SDK のインストール、初期化、およびフラグの評価について説明します。

## 概要チェックリスト {#summary-checklist}

* `@statsig/js-client` を `@datadog/openfeature-browser` に置き換えます。
* `statsig.initialize` を `OpenFeature.setProviderAndWait` に入れ替えます。
* `checkGate` を `client.getBooleanValue` に変換します。
* `getDynamicConfig` を `client.getObjectValue` または `client.getStringValue` に変換します。
* `getLayer` を `client.getObjectValue` に変換し、返された JSON オブジェクトのフィールドをデリファレンスします。
* コンテキスト内で `targetingKey` を使用してユーザーを識別し、パーセンテージベースのランダム化を促進します。
* Statsig フラグを Datadog で再作成します。
* サーバーサイドアプリの場合は、`@openfeature/server-sdk` を使用し、単一のグローバルコンテキストではなく、リクエストごとの評価コンテキストを渡します。

## Datadog でフラグを再作成する {#recreate-flags-in-datadog}

アプリケーションで SDK 呼び出しを切り替える前に、Statsig のゲート、動的構成、およびレイヤーを Datadog のフラグとして再作成してください。Datadog UI で、[**Software Delivery**] > [**Feature Flags**] に移動し、Statsig のキー、バリアントタイプ、ターゲティングルールと一致するフラグを作成します。

## 概念的なマッピング {#conceptual-mapping}

Statsig と Datadog の主要な概念は似ていますが、用語が若干異なります。

| Statsig の概念 | Datadog の概念 | 備考 |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (ブール値) | 基本的なオン/オフの切り替えです。|
| **Dynamic Config** | **Feature Flag** (JSON/文字列バリアント) | Datadog のフラグは文字列、JSON、数値を返すことができ、Statsig の Dynamic Config のユースケースをカバーします。|
| **Layer** | **Feature Flag** (JSON バリアント) | JSON 値のフラグを使用し、返されたオブジェクトからフィールドを読み取ります。これは、Statsig の Layer から値をデリファレンスするのと同様です。|
| **Experiment** | **Feature Flag** (ターゲティングあり) | Datadog の Feature Flag は、パーセンテージベースのロールアウトと特定のターゲティングルールを設定して、Experiment を実行できます。フラグを [Datadog Experiments][5] に接続して、ユーザーの成果に与える影響を測定します。|
| **User/StatsigUser** | **Evaluation Context** | フラグを評価するために SDK に渡されるコンテキスト (属性) です。|

## インストール {#installation}

Datadog の Feature Flag SDK は、[OpenFeature][6] で使用するために設計されています。これにより、Datadog を基盤プロバイダーとして使用しつつ、ベンダーニュートラルな API を利用できます。

Statsig を削除します。

{{< code-block lang="bash" >}}
npm uninstall @statsig/js-client
# or
yarn remove @statsig/js-client
{{< /code-block >}}

Datadog および OpenFeature をインストールします。

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**注**: React アプリケーションの場合は、`@openfeature/react-sdk` もインストールしてください。[React Feature Flags][7] を参照してください。サーバーサイド実装の場合は、[サーバーサイドおよび動的コンテキスト](#server-side-and-dynamic-context)セクション、または [Server-Side Feature Flags][2] (他の言語の場合) を参照してください。

## 初期化 {#initialization}

`statsig.initialize()` 呼び出しを OpenFeature プロバイダーのセットアップに置き換える必要があります。登録時に評価コンテキストを `setProviderAndWait` に渡して、フラグが初めから正しいユーザーに対して評価されるようにします。

### Statsig (旧) {#statsig-old}

{{< code-block lang="javascript" >}}
import { StatsigClient } from '@statsig/js-client';

const client = new StatsigClient('client-sdk-key', { userID: 'user-123' });
await client.initializeAsync();
{{< /code-block >}}

### Datadog (新) {#datadog-new}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
{{< /code-block >}}

{{< code-block lang="javascript" >}}
// Configure the Datadog provider
const provider = new DatadogProvider({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com', // or datadoghq.eu, etc.
  env: 'production', // Environment from which to fetch flag configurations
});

// Set the evaluation context and register the provider together
const evaluationContext = {
  targetingKey: 'user-123', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info"> <code>targetingKey</code> は、パーセンテージベースのターゲティングにおけるランダム化対象として使用されます。フラグが一定の割合を対象とする場合 (例: 50%)、 <code>targetingKey</code> により、どのバケットにユーザーが振り分けられるかが決まります。同じ <code>targetingKey</code> を持つユーザーは、特定のフラグについて常に同じバリアントを受け取ります。</div>

クライアントトークンおよびアプリケーション ID の作成に関する詳細は、[API キーとアプリケーションキー][4]を参照してください。

## フラグの評価 (ゲートのチェック) {#evaluate-flags-check-gates}

`checkGate` の呼び出しを OpenFeature の `getBooleanValue` に置き換えます。

### Statsig (旧) {#statsig-old-1}

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

### Datadog (新) {#datadog-new-1}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// The second argument is the fallback value (default) if the flag fails to fetch
const isEnabled = client.getBooleanValue('new_homepage_design', false);

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

## 構成の取得 (動的構成) {#get-configuration-dynamic-configs}

`getDynamicConfig` または `getExperiment` を使用して非ブール値 (文字列、JSON、数値) を取得していた場合は、OpenFeature の適切な型付きメソッドを使用します。

### Statsig (旧) {#statsig-old-2}

{{< code-block lang="javascript" >}}
const config = client.getDynamicConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog (新) {#datadog-new-2}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue<{ title: string }>('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## レイヤーを JSON オブジェクトフラグにマッピング {#map-layers-to-json-object-flags}

Statsig のレイヤーは、関連するパラメーターを 1 つの評価にまとめます。Datadog では、JSON 値のフラグを使用し、返されたオブジェクトから必要なフィールドを読み取ります。

### Statsig (旧) {#statsig-old-3}

{{< code-block lang="javascript" >}}
const layer = client.getLayer('user_promo_experiments');
const promoTitle = layer.get('title', 'Welcome to Statsig!');
const discount = layer.get('discount', 0.1);
{{< /code-block >}}

### Datadog (新) {#datadog-new-3}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

const promoConfig = client.getObjectValue<{ title: string; discount: number }>('user_promo_experiments', {
  title: 'Welcome!',
  discount: 0.1,
});
const promoTitle = promoConfig.title;
const discount = promoConfig.discount;
{{< /code-block >}}

## ログイン後にユーザーコンテキストを更新 {#update-user-context-after-login}

Statsig は `updateUser` を使用してユーザーコンテキストを更新します。OpenFeature と Datadog では、ユーザーのログイン後など、初期化後にコンテキストを更新するには `OpenFeature.setContext()` を使用します。

### Statsig (旧) {#statsig-old-4}

{{< code-block lang="javascript" >}}
await client.updateUserAsync({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' },
});
{{< /code-block >}}

### Datadog (新) {#datadog-new-4}

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
});
{{< /code-block >}}

## 追跡とエクスポージャー{#tracking-and-exposure}

Statsig では、ゲートを確認すると自動的にエクスポージャーがログに記録されます。

Datadog では、フラグテレメトリは次の 2 つのカテゴリに分類されます。

**エクスポージャーログ**は、対象が特定のフラグバリアントを受け取ったことを記録します。各エクスポージャーイベントには、フラグキー、提供されたバリアント、および評価コンテキストが含まれます。エクスポージャーデータを使用して、実験結果と機能の採用状況を分析します。

**評価ログ**は、各バリアントが返された頻度を記録します。クライアント SDK は、デフォルトで集計された評価カウントを送信します。サーバー SDK は、評価ログを有効にしないと `feature_flag.evaluations` メトリクスを出力しません。

1. **クライアント SDK**: エクスポージャーログはデフォルトで有効になっています。SDK はエクスポージャーイベントをエクスポージャーインテークに送信します。これらは [**Feature Flags**] リストで確認できます。エクスポージャー追跡が不要な場合は、`DatadogProvider` 設定で `enableExposureLogging: false` を設定してください。

<div class="alert alert-warning"> <code>enableRumFeatureFlagTracking</code> を <code>true</code> に設定すると、RUM イベントにフラグ評価が追加されるため、<a href="/real_user_monitoring/">RUM</a> コストに影響を与える可能性があります。クライアント SDK では <code>enableExposureLogging</code> と <code>enableRumFeatureFlagTracking</code> の両方がデフォルトでオンになっています。</div>

2. **サーバー SDK**: エクスポージャーログはデフォルトでオンになっています。評価ログはデフォルトでオフになっています。サーバー SDK から評価メトリクスを送信するには、OpenTelemetry メトリクスを有効にし (例: `DD_METRICS_OTEL_ENABLED=true`)、[Server-Side Feature Flags][2] の言語固有のガイダンスに従ってください。

## サーバーサイドおよび動的コンテキスト {#server-side-and-dynamic-context}

前のセクションでは、ブラウザおよびクライアントサイドの移行について説明しましたが、このケースでは、評価コンテキストがユーザーのセッション期間中静的であるのが一般的です。サーバーサイドアプリケーションでは、異なる SDK を使用し、クライアントトークンの代わりに Datadog API キーで認証します。また、通常は受信リクエストごとに新しい評価コンテキストを構築します。

サーバー SDK を初期化する前に、必要な環境変数を設定してください。

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
DD_ENV=<ENVIRONMENT_NAME>
{{< /code-block >}}

Agent およびアプリケーションの設定オプションの全リストについては、[Server-Side Feature Flags][2] を参照してください。

サーバーサイド SDK をインストールします。この例では、[Node.js Feature Flags SDK][3] を使用します。

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Datadog トレーサーを通じてプロバイダーを登録します。

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init();

await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

### Statsig (旧) {#statsig-old-5}

{{< code-block lang="javascript" >}}
// The Statsig server SDK takes the user in each call
const isEnabled = statsig.checkGate(user, 'new_homepage_design');
{{< /code-block >}}

### Datadog (新) {#datadog-new-5}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown',
  };

  const isEnabled = await client.getBooleanValue('new_homepage_design', false, evaluationContext);
  res.send(isEnabled ? 'New design' : 'Old design');
});
{{< /code-block >}}

ブラウザ SDK は、設定された評価コンテキストをすべてのフラグ評価に対して使用します。ユーザーがログインしたときや属性が変更されたときに、`OpenFeature.setContext()` を使用してそのコンテキストを更新できます。サーバー SDK では、1 つのプロセスが多くの異なるユーザーを処理するため、フラグ評価呼び出しごとに新しい評価コンテキストを渡します。

その他のサーバー言語については、[Server-Side Feature Flags][2] を参照してください。

[1]: /ja/feature_flags/
[2]: /ja/feature_flags/server/
[3]: /ja/feature_flags/server/nodejs/
[4]: /ja/account_management/api-app-keys/
[5]: /ja/experiments/
[6]: https://openfeature.dev/
[7]: /ja/feature_flags/client/react/