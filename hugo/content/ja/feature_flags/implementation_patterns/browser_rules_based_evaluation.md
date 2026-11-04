---
description: アプリケーション管理の構成とオプションのトラッキングフックを使用する高度なブラウザのセットアップには、DatadogCoreProvider
  を使用します。
further_reading:
- link: /feature_flags/client/javascript/
  tag: ドキュメント
  text: JavaScript Feature Flags
- link: /feature_flags/concepts/evaluation_context/
  tag: ドキュメント
  text: 評価コンテキスト
- link: /feature_flags/concepts/distribution_channels/
  tag: ドキュメント
  text: 配信チャンネル
title: ブラウザのルールベース評価
---
## 概要 {#overview}

**ほとんどのブラウザアプリケーションでは、`DatadogProvider` を使用します。**これは構成の取得、コンテキストの更新、および組み込みテレメトリを管理します。そのセットアップについては、[JavaScript Feature Flags][1] に従ってください。

`DatadogCoreProvider`は、アプリケーションから提供された構成を評価する、高度な OpenFeature 互換プロバイダーです。これは、構成の取得やポーリング、トラッキングフックのインストール、およびテレメトリの送信を行いません。ルールベースの構成では、OpenFeature コンテキストの変更時に、新しい割り当てを取得することなくローカルでターゲティングルールを評価します。

## このアプローチの適用場面{#when-to-use-this-approach}

アプリケーションが以下の 1 つ以上の機能を必要とする場合は、`DatadogCoreProvider` を選択します。

- コンテキストの変更ごとに構成リクエストを実行することなく、変更されたコンテキストに対してターゲティングルールを評価する。
- サーバー側でレンダリングされたブートストラップペイロードなど、アプリケーションが制御する配信パスを通じて構成を提供する。
- 構成の更新を制御し、アプリケーションが必要とするトラッキングインテグレーションのみを構成する。

構成の可用性、鮮度、およびトラッキングのライフサイクルは、アプリケーション側で所有・管理します。

## 前提条件 {#prerequisites}

- [JavaScript のインストール手順][2]に従って、`@datadog/openfeature-browser` 2.0.0 以降、`@openfeature/web-sdk`、および `@openfeature/core` をインストールします。サンプルコードでは、npm パッケージのインポートを使用しています。
- Datadog からルールを取得するには、[クライアントトークン][3]、環境名、および Datadog サイトを指定します。
- 組織でクライアントルール配信を有効にするには、**Feature Flag Environment Config Write** 権限が必要です。設定がすでに有効になっている場合、SDK を使用するためにこの権限は必要ありません。[権限と Access Control][9] を参照してください。
- ブラウザに適したフラグのみを **Client** [配信チャンネル][4]に配信します。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a> ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>{{< /site-region >}}

<div class="alert alert-warning">ブラウザに配信された構成は、含まれるターゲティングルールや値を含めて検査可能です。機密性の高い構成や認可の決定はサーバー側で保持します。クライアント側の Feature Flags はアクセス制御のメカニズムではありません。</div>

## はじめに {#getting-started}

セッション中に評価コンテキストが繰り返し変更されるブラウザアプリケーションでは、`fetchRulesConfiguration()` と `DatadogCoreProvider` を組み合わせて使用します。ルールを一度読み込めば、その後の評価やコンテキストの変更にはそのプロバイダーと構成を再利用します。

Feature Flags の課金は、ローカルでの評価回数ではなく[月間フラグ構成リクエスト (MFCR)][7]に基づいてカウントされます。初回のルール取得およびその後の更新は MFCR としてカウントされますが、ローカルでのコンテキスト変更はカウントされません。

### クライアントルール配信を有効化する{#enable-client-rules-delivery}

ルールを取得する前に、組織のクライアントルール配信を有効にします。この設定はデフォルトで無効になっています。

1. [**Feature Flags**] > [**Settings**] > [[**Flag Delivery**][8]] を開きます。
2. **Allow local rule evaluation in client SDKs** を有効にします。
3. [**Save**] をクリックします。

この設定は、フラグごとの [**Client** 配信チャンネル][4]とは別個のものです。標準の事前計算済み `DatadogProvider` セットアップでは、これは必要ありません。

### ルールの取得と {#fetch-rules-and-initialize} の初期化

`@datadog/openfeature-browser/rules-based` から `DatadogCoreProvider` および `fetchRulesConfiguration` をインポートします。プロバイダーに提供する前に、ルールを取得して結果を検証します。

```javascript
import {
  DatadogCoreProvider,
  fetchRulesConfiguration,
} from '@datadog/openfeature-browser/rules-based';
import { OpenFeature } from '@openfeature/web-sdk';

const configurationOptions = {
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
};

async function loadRulesConfiguration() {
  const configuration = await fetchRulesConfiguration(configurationOptions);
  if (!configuration.rules) {
    throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
  }
  return configuration;
}

const configuration = await loadRulesConfiguration();
const provider = new DatadogCoreProvider();
provider.setConfiguration(configuration);

const domain = 'browser-flags';
await OpenFeature.setProviderAndWait(domain, provider, {
  targetingKey: 'user-123',
  plan: 'free',
});

const client = OpenFeature.getClient(domain);
const enabled = client.getBooleanValue('checkout_new', false);
```

フェッチヘルパーが構成リクエストを行います。プロバイダーの登録とフラグの評価では、構成は取得されません。このヘルパーは、アプリケーション制御のトランスポート向けに `fetch` 実装と abort `signal` も受け入れます。

アプリケーションの起動フローで初期化エラーをキャッチし、再試行するか、デフォルトの動作を継続するかを決定します。`setProviderAndWait()` が拒否された場合、プロバイダーの準備ができていると想定しないでください。

### 評価コンテキストを変更する {#change-the-evaluation-context}

コンテキストを更新する際は、同じドメインを使用します。

{{< code-block lang="javascript" >}}
await OpenFeature.setContext(domain, {
  targetingKey: 'user-456',
  plan: 'premium',
});

const enabledForUpdatedContext = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

ルールの構成はメモリ内に保持され、新しいコンテキストに対して評価されます。コンテキストの変更ごとに `loadRulesConfiguration()` を再度呼び出さないでください。構成リクエストは実行されません。オプションのトラッキングフックにより、評価のテレメトリを送信することもできます。

[フラットなコンテキスト属性][5]を使用し、ターゲティングに必要な属性を明示的に指定します。`DatadogCoreProvider` は、RUM からユーザー属性を自動的にコピーしません。

## 構成を更新する {#refresh-configuration}

プロバイダーはフラグの変更をポーリングしません。アプリケーションが構成を更新するタイミングを選択し、その後の評価の前に構成を置き換えます。

{{< code-block lang="javascript" >}}
try {
  const nextConfiguration = await loadRulesConfiguration();
  provider.setConfiguration(nextConfiguration);
} catch (error) {
  console.warn('Could not refresh flag configuration; keeping the previous configuration.', error);
}
{{< /code-block >}}

取得またはパースが失敗した場合、プロバイダーは以前の構成を使用し続けます。この例ではエラーをログに記録します。アプリケーションの鮮度要件に応じて再試行処理を追加します。Datadog で行われた変更は、アプリケーションが更新された構成を提供するまで、このプロバイダーには反映されません。

## オプション: ポータブル構成の指定{#optional-supply-portable-configuration}

ブラウザでルールを取得する代わりに、アプリケーションでシリアル化されたルール構成を配信できます。すでに取得したルール構成に対して `configurationToString(configuration)` を呼び出すことで、この文字列を作成します。`@datadog/openfeature-browser/rules-based` からこのヘルパーをインポートします。

生成された文字列を、サーバー側でレンダリングされたブートストラップペイロードなど、アプリケーションを通じてブラウザに配信します。以下の `<SERIALIZED_RULES_CONFIGURATION>` をその文字列に置き換え、初期化例の `loadRulesConfiguration()` 呼び出しの代わりにこのコードを使用します。

{{< code-block lang="javascript" >}}
import { configurationFromString } from '@datadog/openfeature-browser/rules-based';

const configuration = configurationFromString('<SERIALIZED_RULES_CONFIGURATION>');
if (!configuration.rules) {
  throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
}
{{< /code-block >}}

シリアル化された文字列は、ルールエンドポイントからの生のバイナリ応答ではありません。HTML に構成を埋め込む際は、フレームワークの安全なシリアル化メカニズムを使用します。文字列のパースと指定を行っても、構成リクエストは発生しません。

### 事前計算された構成{#precomputed-configurations}

事前計算された構成には特定のコンテキストに対する割り当てが含まれており、異なるコンテキストに対して再評価できるルールは含まれていません。`DatadogCoreProvider` に提供する場合は、`getPrecomputedContext(configuration)` によって返されたコンテキストを `setProviderAndWait()` に渡します。コンテキストが一致しない場合、invalid-context エラーが発生し、プロバイダーは代替の割り当てを取得しません。

## オプションのトラッキングフックを追加する{#add-optional-tracking-hooks}

プロバイダーはデフォルトでトラッキングを行わずに評価を実行します。アプリケーションが必要とするインテグレーションのみを追加します。

| Factory | Behavior |
| --- | --- |
| `createDatadogExposureLoggingHook(trackingOptions)` | 対象となるエクスポージャーイベントの重複排除とバッチ処理を行います。|
| `createDatadogEvaluationLoggingHook(trackingOptions)` | フラグ評価のテレメトリを集約して送信します。|
| `createDatadogRumTrackingHook()` | 既存のグローバル `DD_RUM` インスタンスにフラグ評価を追加します。RUM の初期化や評価コンテキストの格納は行いません。|

`composeDatadogTrackingHooks()` を使用して、選択したインテグレーションをまとめて初期化およびシャットダウンします。トラッキングが必要な評価の前に、初期化例のクライアント上でそのフックを登録します。

```javascript
import {
  composeDatadogTrackingHooks,
  createDatadogExposureLoggingHook,
  createDatadogEvaluationLoggingHook,
  createDatadogRumTrackingHook,
} from '@datadog/openfeature-browser/rules-based';

const trackingOptions = {
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
  service: '<SERVICE_NAME>',
};

const tracking = composeDatadogTrackingHooks(
  createDatadogExposureLoggingHook(trackingOptions),
  createDatadogEvaluationLoggingHook(trackingOptions),
  createDatadogRumTrackingHook(),
);

await tracking.initialize();
client.addHooks(...tracking.hooks);

const trackedValue = client.getBooleanValue('checkout_new', false);
```

これらのフックは、このクライアントインスタンスを通じて行われた評価に対してのみ実行されます。トラッキング対象の評価には、引き続き同じクライアントを使用します。インテグレーションのインポートとファクトリ呼び出しを省略すると、そのインテグレーションは除外されます。RUM トラッキングには、`DD_RUM` として利用可能な [Browser RUM][6] が必要であり、RUM 課金対象のイベント数が増加する可能性があります。

エクスポージャーおよび評価フックは、`initialize()` が完了するまでイベントを収集しません。エクスポージャーイベントはバッチ処理され、重複排除されるため、繰り返し評価を行っても別のエクスポージャーリクエストが作成されない場合があります。

トラッキングが不要になったら、フックの登録を解除し、そのリソースをシャットダウンします。

{{< code-block lang="javascript" >}}
client.clearHooks();
await tracking.shutdown();
{{< /code-block >}}

`clearHooks()` はこのクライアントから**すべてのクライアントレベルのフック**を削除します。この例では、クライアントがこのトラッキングセットアップ専用であることを前提としています。グローバルまたはプロバイダーのフックは削除されません。`shutdown()` は最終的なフラッシュを要求し、トラッキングタイマーとサブスクリプションを停止します。処理から戻っても、すべてのネットワークリクエストが完了したことは保証されません。フックのクリアやコアプロバイダーの削除だけでは、手動で作成されたトラッキングリソースはシャットダウンされません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/client/javascript/
[2]: /ja/feature_flags/client/javascript/#installation
[3]: /ja/account_management/api-app-keys/#client-tokens
[4]: /ja/feature_flags/concepts/distribution_channels/
[5]: /ja/feature_flags/concepts/evaluation_context/#context-attributes
[6]: /ja/real_user_monitoring/application_monitoring/browser/
[7]: /ja/feature_flags/concepts/monthly_flag_configuration_requests/
[8]: https://app.datadoghq.com/feature-flags/settings/flag-delivery
[9]: /ja/feature_flags/concepts/permissions/