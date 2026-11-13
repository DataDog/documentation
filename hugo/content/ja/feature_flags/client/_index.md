---
aliases:
- /ja/feature_flags/setup/
description: クライアントサイドアプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/
  tag: ドキュメント
  text: Feature Flags について学びます。
- link: /getting_started/feature_flags/
  tag: ドキュメント
  text: Feature Flags の概要
- link: feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
title: クライアントサイドの Feature Flags
---
## 概要 {#overview}

お使いのアプリケーション用に Datadog Feature Flags をセットアップします。以下のプラットフォーム固有のガイドに従って、アプリケーションに Feature Flags を統合し、Feature Flags データの収集を開始してください。

Datadog Feature Flags は、Feature Flags API のオープンソースでベンダーニュートラルな仕様である [OpenFeature 標準](https://openfeature.dev/docs/reference/intro/)上に構築されています。プロバイダー、評価コンテキスト、フックなどの OpenFeature の概念について初めて学ぶ場合は、[OpenFeature の概念に関するドキュメント](https://openfeature.dev/docs/category/concepts)を参照してください。

{{< card-grid card_width="200px">}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart および Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

## プラットフォーム別のテレメトリオプション {#telemetry-options-by-platform}

Web、モバイル、および Unity プロバイダーは、プラットフォーム固有のオプション名を使用して同様のテレメトリ制御を提供します。各公開オプションのデフォルトは `true` であるため、記載されている動作はデフォルトで有効になっています。オプトアウトするには、オプションを `false` に設定してください。

以下の Web オプションは、推奨されるブラウザプロバイダーである `DatadogProvider` に適用されます。高度な `DatadogCoreProvider` は、テレメトリを自動的に有効にしません。それを使用するアプリケーションは、トラッキングフックを明示的に登録し、そのライフサイクルを管理します。[ブラウザのルールベース評価][1]を参照してください。

<div class="alert alert-info">iOS OpenFeature ブリッジ (<a href="https://github.com/DataDog/dd-openfeature-provider-swift">dd-openfeature-provider-swift</a>) は、1.0 未満のパッケージとして使用できます。1.0 に達するまでは、バージョン更新に破壊的変更が含まれる可能性があります。最も安定した iOS API サーフェスを使用するには、 <code>FlagsClient</code> API を直接使用してください。</div>

### エクスポージャーイベントを送信する{#send-exposure-events}

デフォルト: `true`。無効にするには `false` に設定します。

- **Web** (`@datadog/openfeature-browser`): `enableExposureLogging`
- **Android** (`dd-sdk-android-flags`): `trackExposures`
- **Dart および Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackExposures`
- **iOS** (`DatadogFlags`): `trackExposures`
- **React Native**: `trackExposures`
- **Unity**: `trackExposures`

### 集計された評価テレメトリを送信する{#send-aggregated-evaluation-telemetry}

デフォルト: `true`。無効にするには `false` に設定します。

- **Web** (`@datadog/openfeature-browser`): `enableFlagEvaluationTracking`
- **Android** (`dd-sdk-android-flags`): `trackEvaluations`
- **Dart および Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackEvaluations`
- **iOS** (`DatadogFlags`): `trackEvaluations`
- **React Native**: 非公開
- **Unity**: `trackEvaluations`

### RUM に評価を添付する{#attach-evaluations-to-rum}

デフォルト: `true`。無効にするには `false` に設定します。

- **Web** (`@datadog/openfeature-browser`): `enableRumFeatureFlagTracking`
- **Android** (`dd-sdk-android-flags`): `rumIntegrationEnabled`
- **Flutter** (`datadog_flags_flutter`): `rumIntegrationEnabled`
- **iOS** (`DatadogFlags`): `rumIntegrationEnabled`
- **React Native**: `rumIntegrationEnabled`
- **Unity**: 非公開

## インメモリプロバイダーを使用したテスト {#testing-with-in-memory-providers}

Datadog は、以下のテストアプローチをサポートしています。

- **統合テスト**: `DatadogProvider` を専用のテスト環境に指定し、Datadog UI からフラグ値を制御します。これにより、CDN 経由で配信されるフラグの割り当てを含め、実際のプロバイダーをエンドツーエンドで検証できます。
- **ユニットテスト**: `DatadogProvider`を OpenFeature の標準 `InMemoryProvider` (または、その言語でインメモリプロバイダーが利用できない場合は同等のテストスタブ) に置き換えて、テストコード内で直接フラグ値を設定します。これにより、テストは外部環境に依存せず、オフラインで実行できるようになります。

このセクションでは、インメモリアプローチについて説明します。OpenFeature API は実行時にプロバイダーを切り替えられるように設計されているため、アプリケーションコードを変更する必要はありません。テストのセットアップ時に登録するプロバイダーを変更するだけです。

一般的なテストは、次のパターンに従います。

1. テストのセットアップで、フラグキーとバリアントのマップを作成します。
2. そのマップを使用して、OpenFeature API 経由で `InMemoryProvider` を登録します。
3. テスト対象のユニットで OpenFeature クライアントを呼び出します。`InMemoryProvider`は、テストのセットアップで構成されたフラグの割り当てを返します。
4. テストの終了処理でプロバイダーをリセットして、テスト間で状態が漏洩しないようにします。

お使いのプラットフォームの SDK ページ (このページの上部から選択) で、具体的なテスト例を確認できます。

## コンテキスト属性の要件 {#context-attribute-requirements}

<div class="alert alert-warning">
評価コンテキストの属性は、フラットなプリミティブ値 (文字列、数値、ブール値) である必要があります。ネストされたオブジェクトや配列は<strong>サポートされていないため</strong>、エクスポージャーイベントが通知されずに破棄される可能性があります。
</div>

評価コンテキストではフラットな属性を使用してください。

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  userId: 'user-123',
  tier: 'premium',
  age: 25
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

ネストされたオブジェクトや配列は避けてください。

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: 'user-123',
  user: { id: 'user-123' },        // nested object - NOT SUPPORTED
  features: ['beta', 'analytics']  // array - NOT SUPPORTED
};
{{< /code-block >}}

## 参考資料 {#further-reading}

パーセンテージベースのロールアウトおよび決定論的バケット分割については、[トラフィックスプリッティングとランダム化](/feature_flags/concepts/traffic_splitting/)を参照してください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/implementation_patterns/browser_rules_based_evaluation/