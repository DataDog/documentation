---
description: 統合された監視可能性、リアルタイムメトリクス、および OpenFeature 互換の段階的なロールアウトを使用して、機能の提供を管理します。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアント側の SDK
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバー側の SDK
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: ブログ
  text: Datadog Feature Flags で機能をより迅速かつ安全にリリース
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: ブログ
  text: 統合データを通じて実験におけるスピードと品質のバランスを取る方法
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: ブログ
  text: Datadog Feature Flags がクラウドプロバイダーの障害に対応する方法
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: ブログ
  text: ガードレールメトリクスを活用してリリースの過剰なモニタリングを避ける
site_support_id: getting_started_feature_flags
title: Feature Flags の概要
---
## 概要 {#overview}

Datadog Feature Flags は、組み込みの監視可能性とプラットフォーム全体でのシームレスなインテグレーションを備えており、機能の提供を管理するための強力で統合された方法を提供します。

- **リアルタイムメトリクス:** 各バリアントを受け取っている対象、フラグがアプリケーションの健全性とパフォーマンスに与える影響をリアルタイムで把握します。

- **あらゆるデータの種類をサポート:** ブール値、文字列、数値、または完全な JSON オブジェクトなど、ユースケースに応じて必要なデータの種類を使用します。

- **実験のために構築:** A/B テストの特定のオーディエンスをターゲットにし、カナリアリリースで機能を段階的にロールアウトし、回帰が検出された場合には自動的にロールバックします。

- **OpenFeature 互換:** OpenFeature 標準に基づいて構築されており、既存の OpenFeature の実装との互換性を確保し、機能フラグ管理に対してベンダーに依存しないアプローチを提供します。

## 機能フラグ SDK {#feature-flags-sdks}

このガイドでは、JavaScript ブラウザ SDK を例として使用します。次の SDK のいずれかを使用して、Datadog Feature Flags を任意のアプリケーションに統合できます。

### クライアント側の SDK {#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### サーバー側の SDK {#server-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## 環境を構成する {#configure-your-environments}

組織に、開発、ステージング、および本番環境に合わせて事前に構成された環境がすでに存在している可能性があります。環境クエリ、本番環境マーキング、および環境管理の詳細については、[環境][4]を参照してください。

## 初めての Feature Flag を作成する {#create-your-first-feature-flag}

### ステップ1: SDK をインポートして初期化する {#step-1-import-and-initialize-the-sdk}

まず、`@datadog/openfeature-browser`、`@openfeature/web-sdk`、および `@openfeature/core` をプロジェクトの依存関係としてインストールします。

```
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
```

次に、SDK を初期化するためにプロジェクトに以下を追加します。

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
    enableExposureLogging: true, // Can impact RUM costs if enabled
    site: 'datadoghq.com',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
```

<div class="alert alert-warning"> <code>enableExposureLogging</code> を <code>true</code> に設定すると、<a href="https://docs.datadoghq.com/real_user_monitoring/">RUM</a> のコストに影響を与える可能性があります。露出イベントが RUM 経由で Datadog に送信されるためです。機能の露出やガードレールメトリクスの状態を追跡する必要がない場合は、無効にすることができます。</div>

OpenFeature SDK の構成オプションに関する詳細については、その[ドキュメント][1]に記載されています。クライアントトークンとアプリケーション ID の作成に関する詳細については、[API およびアプリケーションキー][3]を参照してください。

### ステップ2: Feature Flag を作成する {#step-2-create-a-feature-flag}

Datadog の [{{< ui >}}Create Feature Flag{{< /ui >}}][2] に移動し、以下を構成します。

- **名前とキー**: フラグの表示名とコードで参照されるキー
- **バリアントタイプ**および**バリアント値**: [バリアントとフラグタイプ][5]を参照してください
- **ディストリビューションチャネル**: [ディストリビューションチャネル][6]を参照してください

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}、{{< ui >}}variant keys{{< /ui >}}、および {{< ui >}}variant values{{< /ui >}} は、クライアント SDK に送信された際に公開されていると判断されます。
</div>

{{< img src="getting_started/feature_flags/create-feature-flags.png" alt="Feature Flag を作成する" style="width:100%;" >}}

### ステップ3: フラグを評価し、機能コードを書き込む {#step-3-evaluate-the-flag-and-write-feature-code}

アプリケーションコード内で、SDK を使用してフラグを評価し、新機能へのアクセス制御を行います。

```js
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
    org_id: 2,
    user_id: 'user-123',
    email: 'user@example.com',
    targetingKey: 'user-123'
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
    // Feature code here
}
```

このステップを完了したら、これらの変更を反映させるためにアプリケーションを再デプロイします。追加の使用例は SDK の[ドキュメント][1]に記載されています。

### ステップ 4: ターゲティングルールを定義し、Feature Flag を有効にする {#step-4-define-targeting-rules-and-enable-the-feature-flag}

[ターゲティングルール][7]を構成して、各バリアントを受け取る対象を定義します。ルールを保存した後、選択した環境で Feature Flag を有効にします。

<div class="alert alert-info">
一般的なベストプラクティスとして、本番環境の前にステージング環境で変更をロールアウトします。
</div>

パーセンテージのロールアウトについては、[トラフィックスプリッティングとランダム化][8]を参照してください。

### ステップ 5: ロールアウトをモニターする {#step-5-monitor-your-rollout}

Feature Flag の詳細ページから機能ロールアウトをモニターし、リアルタイムの露出追跡や、{{< ui >}}error rate{{< /ui >}} および {{< ui >}}page load time{{< /ui >}} などのメトリクスを提供します。フラグを使用して機能を段階的にリリースする際には、Datadog UI の {{< ui >}}Real-Time Metric Overview{{< /ui >}} パネルを表示して、機能がアプリケーションパフォーマンスに与える影響を確認します。

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="リアルタイムのフラグメトリクスパネル" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[4]: /ja/feature_flags/concepts/environments/
[5]: /ja/feature_flags/concepts/variants_and_flag_types/
[6]: /ja/feature_flags/concepts/distribution_channels/
[7]: /ja/feature_flags/concepts/targeting_rules/
[8]: /ja/feature_flags/concepts/traffic_splitting/