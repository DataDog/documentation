---
description: ユーザー向けジャーニーにおける重要な技術オペレーションを監視し、ユーザーが重要なワークフローを完了できなかった正確なタイミングと理由を特定します。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM について学ぶ
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: ガイド
  text: Operations Monitoring を設定するためのベストプラクティス
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: ガイド
  text: RUM オペレーションの SLO を作成するためのベストプラクティス
title: Operations Monitoring
---
## 概要{#overview}

{{< callout header="プレビュー" btn_hidden="true" >}}
Operations Monitoring はプレビュー中です。
{{< /callout >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="[RUM] > [Performance Monitoring] の下にある [Operations] (オペレーション) タブ" style="width:100%;" >}}

Datadog Real User Monitoring (RUM) では、[ジャーニー][9]は、チェックアウト、ログイン、検索など、アプリケーションにおけるユーザー向けの主要な領域を表します。各ジャーニーには、エクスペリエンスを機能させるための重要な技術的ステップである、オペレーションが含まれます。

- ビジネスチームは**ジャーニー**を使用して、ユーザーのコンバージョンを追跡および改善します。
- エンジニアリングチームは**オペレーション**を使用して、重要なユーザーモーメントに影響を与える技術的な障害を監視し、最小限に抑えます。

オペレーションは、RUM SDK API を使用するか、Datadog 内で直接作成するか、または Datadog API を使用してプログラムから作成できます。

たとえば、E コマースプラットフォームのチェックアウトエクスペリエンスは 1 つのジャーニーです。その中には、支払い情報の入力、支払い方法の保存、購入の完了といったオペレーションが含まれる場合があります。オペレーションを作成すると、Datadog RUM は実行回数、完了率、失敗率など、各オペレーションのパフォーマンスを測定します。オペレーションの健全性を測定することで、ユーザーがジャーニーでコンバージョンに至らない正確なタイミングと理由を特定できます。


次のテーブルは、業界別の追加のジャーニーの例と、それに関連するジャーニーオペレーションを示しています。

| 業界       | ジャーニー  | ジャーニーオペレーション                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| ソーシャルネットワーク | プロフィール  | ユーザーがプロフィールを読み込む <br> ユーザーが写真をアップロードする <br> ユーザーがステータスを更新する                                  |
| E コマース      | チェックアウト | ユーザーが支払い情報を入力する <br> ユーザーが支払い方法を保存する <br> ユーザーが支払いを実行する                                      |
| ストリーミング      | 検索   | ユーザーが検索結果を見つける <br> ユーザーがタイトルの説明を読み込む <br> ユーザーが予告編の視聴を開始する |
| CRM            | 見積もり    | ユーザーが新しい見積もりを開始する <br> ユーザーが見積もりに明細項目を追加する <br> ユーザーが受信者に見積もりを送信する                 |

## 前提条件{#prerequisites}

- [RUM without Limits][11] が組織で有効になっている必要があります。
- SDK API を使用してオペレーションを作成するには、オペレーションを定義するためのクライアントサイド API に対応した Datadog RUM SDK バージョンをダウンロードしてください。
  - [Browser (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Flutter (3.0.0)][7]
      - **注**: Flutter Web では、オペレーションは Browser SDK を経由してルーティングされるため、`feature_operation_vital` の実験的機能を有効にする必要があります。
  - [Kotlin Multiplatform (1.4.0)][4]
  - [React Native (3.0.0)][5]
  - [Roku (1.4.0)][6]

## SDK API を使用してオペレーションを作成する {#create-operations-with-the-sdk-apis}

SDK API を使用してオペレーションを定義します。

### オペレーションを開始する {#start-an-operation}

すべてのオペレーションは、`startOperation` を呼び出すことで開始する必要があります (一部の SDK では、この API の従来の名称である `startFeatureOperation` が使用されている場合があります)。

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // you need to have this flag turned on for the API to work
})

startFeatureOperation: (
name: string,
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().startOperation(
	name: String,
	operationKey: String?,
	options: OperationOptions,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().startOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?,
	options: OperationOptions?
)
```
{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.startFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.startFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` の実験的機能を有効にしてください。
{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.startOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">オペレーション名には、文字、数字、または <code>- _ . @ $</code>の文字のみを使用できます。空白を含めることはできません。</div>

### オペレーションを成功として終了する {#stop-an-operation-with-success}

開始したすべてのオペレーションは、必ず終了させる必要があります。成功した結果でオペレーションを終了するには、`succeedOperation` を使用します (一部の SDK では、この API の従来の名称である `succeedFeatureOperation` が使用されている場合があります)。

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
succeedFeatureOperation: (
name: string,
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?
)
```

{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.succeedFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)
```

{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.succeedFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` の実験的機能を有効にしてください。

{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.succeedOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"> <code>operationKey</code> は、オペレーションの開始イベントと終了イベントで同じである必要があります。</div>

### オペレーションを失敗として終了する {#stop-an-operation-with-failure}

開始したすべてのオペレーションは、必ず終了させる必要があります。失敗という結果でオペレーションを終了するには、`failOperation` を使用します (一部の SDK では、この API の従来の名称である `failFeatureOperation` が使用されている場合があります)。

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // this flag needs to be enabled for the API to work
})

failFeatureOperation: (
name: string, 
failureReason: FailureReason, //'error' | 'abandoned' | 'other'
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().failOperation(
	name: String,
	operationKey: String?,
	failureReason: FailureReason,	// ERROR, ABANDONED, OTHER
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().failOperation(
	name: String,
	operationKey: String?,
    reason: RUMFeatureOperationFailureReason,  // .error, .abandoned, .other
	attributes: [AttributeKey: AttributeValue]
)
```
{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.failOperation(
    name as string,
    failureReason as string,           ' "error", "abandoned", or "other"
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.failFeatureOperation(
	name: string,
	operationKey?: string,
	reason: FeatureOperationFailure, // 'ERROR' | 'ABANDONED' | 'OTHER'
	attributes: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.failFeatureOperation(
    String name,
    RumFeatureOperationFailureReason failureReason, // .error, .abandoned, .other
    {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` の実験的機能を有効にしてください。

{{% /tab %}}

{{< /tabs >}}

### 並列実行 {#parallelization}
ユーザーが複数のジャーニーオペレーションを並行して開始するケースがあるかもしれません。それらを個別に追跡するには、`operationKey` を呼び出す際に定義した `startOperation` を使用します。後で他の API を呼び出す際 (`succeedOperation`を呼び出す際など) には、同じ `operationKey` を再利用する必要があります。

<div class="alert alert-warning">開始されたものの明示的に停止されていないオペレーションは、RUM セッションの有効期限が切れると自動的に終了します。それらは失敗としてマークされ、 <code>@operation.failure_reason:timeout</code>が設定されます。<br><br> 開始されていないオペレーションに対して停止 API を呼び出した場合、SDK によって生成された停止イベントは取り込み時に破棄されます。</div>

## Datadog からオペレーションを作成する {#create-operations-from-datadog}

オペレーションカタログまたはジャーニーの詳細レポートのいずれかから、オペレーションを作成できます。

- **オペレーションカタログ**: [{{< ui >}}RUM{{< /ui >}}] > [{{< ui >}}Operations{{< /ui >}}] に移動し、[{{< ui >}}New Operation{{< /ui >}}] をクリックします。
- **Journey Monitoring**: [{{< ui >}}Digital Experience{{< /ui >}}] > [{{< ui >}}Journey Monitoring{{< /ui >}}] に移動し、ジャーニーを選択して、その [{{< ui >}}Details Report{{< /ui >}}] に移動し、[{{< ui >}}New Operation{{< /ui >}}] をクリックします。

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Datadog UI からオペレーションを作成するためのページ" style="width:100%;" >}}

<div class="alert alert-warning">各 RUM アプリケーションは、UI または API を通じて Datadog から作成された最大 1000 個のオペレーションをサポートします。Datadog で直接作成されたオペレーションには、組織全体での制限はありません。</div>

### ステップ 1: オペレーションの詳細を入力し、オペレーションカテゴリを選択する {#step-1-enter-operation-details-and-select-the-operation-category}

オペレーションの RUM アプリケーションを選択し、表示名を入力します。必要に応じて、オペレーションに説明を追加できます。

オペレーションの**カテゴリ**を選択して、開始、成功、および失敗の条件として使用できる RUM イベントタイプを決定します。

| オペレーションカテゴリ       | 概要  | サポートされているイベントタイプ                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| コンポーネントの読み込み | ユーザーが開始したアクションの完了までにかかる時間を測定する  | 開始: アクション <br> 成功: リソースまたはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| フォーム送信 | フォームの送信または変更が成功するまでにかかる時間を測定する | 開始: アクション <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| ページまたは画面の読み込み | ページまたは画面の読み込みとビューのデータ表示にかかる時間を測定する | 開始: ビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| ページまたは画面のナビゲーション | あるページまたは画面から別のページまたは画面へのナビゲーションが成功するまでにかかる時間を測定する | 開始: アクションまたはビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| カスタム | イベントタイプの組み合わせを使用してカスタムオペレーションを定義する | 開始: アクションまたはビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |

### ステップ 2: 開始イベントを定義する {#step-2-define-the-start-event}

各オペレーションには、開始 RUM イベントが必要です。オペレーションは、選択したオペレーションカテゴリに応じて、アクションイベントまたはビューイベントのいずれかで開始できます。

### ステップ 3: 成功条件を定義する {#step-3-define-the-success-conditions}

各オペレーションには、成功で終了するための条件が必要です。オペレーションは、選択したオペレーションカテゴリに応じて、リソースイベント、ビューイベント、またはカスタムアクションイベントによって成功として終了できます。

### ステップ 4: 失敗条件を定義する {#step-4-define-the-failure-conditions}

各オペレーションには、失敗で終了するための条件が必要です。
- **エラー**による失敗は、リソース、エラー、またはカスタムアクションとして終了できます。
- **離脱**による失敗は、オペレーションが完了する前にユーザーが開始時のビューから離脱した場合に有効にできます。

<div class="alert alert-danger">Datadog の UI または API を使用してオペレーションを作成した後、メトリクスがオペレーションカタログに表示されるまで最大 15 分かかる場合があります。</div>

## Datadog API を使用してオペレーションを作成する {#create-operations-with-the-datadog-api}

オペレーションは [Datadog API][10] を通じて作成することもできます。

## オペレーションを編集する {#edit-operations}

オペレーションカタログで、鉛筆アイコンをクリックしてオペレーションを編集します。オペレーションの作成方法に関係なく、どのオペレーションの説明も編集できます。UI または API を通じて作成したオペレーションは、(説明だけでなく) オペレーションの設定全体を編集できます。

## Datadog で可用性を監視する {#monitor-your-availability-on-datadog}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="[RUM] > [Performance Monitoring] の下にある [Operations] (オペレーション) タブ" style="width:100%;" >}}

RUM SDK API を使用するか、Datadog 上での直接作成するか、または Datadog API を使用してオペレーションを作成した後、{{< ui >}}RUM{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}} > {{< ui >}}Operations{{< /ui >}} に移動してそれらを監視できます。

Datadog は、同じ名前を持つすべてのオペレーションを 1 つのカタログにグループ化します。

各オペレーションには、取り込まれた (サンプリングされていない) すべてのトラフィックを対象として算出される、標準のメトリクスが 2 つあります。

- `rum.measure.operation`: Datadog に報告されたオペレーションの数をカウントします。
- `rum.measure.operation.duration`: Datadog に報告されたすべてのオペレーションの開始から終了までの経過時間を測定します。

どちらのメトリクスも 15 か月間保持され、次のディメンションが含まれます。

- `operation.name`: クライアント側で定義されます。
- `operation.status`: 成功または失敗のいずれかです。
- `operation.failure_reason`: エラー、離脱、またはその他が設定されます。

これらのメトリクスは RUM Measure の料金に含まれており、1 つ以上のオペレーションを定義しているすべての RUM without Limits のお客様が利用できます。

## AI による根本原因の調査 {#investigate-root-causes-with-ai}

[Operations] (オペレーション) ページから直接、単一のオペレーションに対してエージェントによる調査を実行できます。エージェントはオペレーションの成功率とレイテンシーの両方を分析し、各失敗モード (エラー、タイムアウト、放棄) およびレイテンシーの悪化について対象を絞った調査結果を提示します。詳細については、[オペレーション AI による調査][8]を参照してください。

## 保持フィルターの設定 {#configure-retention-filters}

オペレーションは、RUM における新しいタイプのイベントです。オペレーションは RUM セッションに紐付いていますが、複数の RUM ビューにまたがることができます。オペレーションは[保持フィルター][12]でターゲットに設定できます。これにより、ユーザーエクスペリエンスの要となるジャーニーに合わせて保持戦略を調整できます。たとえば、特定のオペレーションが失敗した、または意図したよりも時間がかかっている RUM セッションを、プログラムで保持できます。

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="[RUM] > [Performance Monitoring] の下にある [Operations] (オペレーション) タブ" style="width:80%;" >}}

メトリクスと同様に、これらのイベントには保持フィルターで使用できる特定の属性が付あります。

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/3.0.0
[6]: https://github.com/DataDog/dd-sdk-roku/releases/tag/1.4.0
[7]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv3.0.0
[8]: /ja/real_user_monitoring/ai_investigations/operation_ai_investigation/
[9]: /ja/journey_monitoring/
[10]: /ja/api/latest/rum-operations/
[11]: /ja/real_user_monitoring/rum_without_limits/
[12]: /ja/real_user_monitoring/rum_without_limits/retention_filters/