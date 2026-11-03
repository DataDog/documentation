---
description: ユーザー向けジャーニー内の重要な技術的オペレーションを監視することで、ユーザーが主要なワークフローを完了できない状況と理由を正確に特定します。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM について学ぶ
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: ガイド
  text: オペレーションモニタリングの設定に関するベストプラクティス
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: ガイド
  text: RUM オペレーションの SLO を作成するためのベストプラクティス
title: オペレーションモニタリング
---
## 概要 {#overview}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="[RUM] > [Performance Monitoring] (パフォーマンスモニタリング) の下にある [Operations] (オペレーション) タブ" style="width:100%;" >}}

Datadog Real User Monitoring (RUM) における[ジャーニー][9]は、チェックアウト、ログイン、検索など、アプリケーションの主要なユーザー向け領域を表します。各ジャーニーには、エクスペリエンスを機能させるための重要な技術的ステップであるオペレーションが含まれます。

- ビジネスチームは**ジャーニー**を使用して、ユーザーコンバージョンを追跡および改善します。
- エンジニアリングチームは**オペレーション**を使用して、主要なユーザーモーメントに影響を与える技術的な失敗を監視し、最小限に抑えます。

オペレーションは、RUM SDK API を使用して作成することも、Datadog で直接作成することも、Datadog API を使用してプログラムで作成することもできます。

たとえば、e コマースプラットフォームのチェックアウト体験は 1 つのジャーニーです。その中には、支払い情報の入力、支払い方法の保存、購入の完了といったオペレーションが含まれる場合があります。オペレーションを作成すると、Datadog RUM により、実行ボリューム、完了率、失敗率など、各オペレーションのパフォーマンスが測定されます。オペレーションの健全性を測定することで、ユーザーがジャーニーでコンバージョンに至らない状況と理由を正確に特定できます。


次の表は、その他のジャーニーの例と、それに関連するオペレーションを、業界別に示しています。

| 業界       | ジャーニー  | オペレーション                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| ソーシャルネットワーク | プロフィール  | ユーザーがプロフィールを読み込める <br> ユーザーが写真をアップロードできる <br> ユーザーがステータスを更新できる                                  |
| e コマース      | チェックアウト | ユーザーが支払い情報を入力できる <br> ユーザーが支払い方法を保存できる <br> ユーザーが支払いを行える                                      |
| ストリーミング      | 検索   | ユーザーが検索結果を見つけられる <br> ユーザーがタイトルの説明を読み込める <br> ユーザーが予告編の再生を開始できる |
| CRM            | 見積もり    | ユーザーが新しい見積もりを開始できる <br> ユーザーが見積もりに品目を追加できる <br> ユーザーが受信者に見積もりを送信できる                 |

## 前提条件 {#prerequisites}

- [RUM without Limits][11] を組織で有効にする必要があります。
- SDK API を使用してオペレーションを作成するには、オペレーションを定義するためのクライアントサイド API を備えたサポート対象の Datadog RUM SDK バージョンをダウンロードします。
  - [Browser (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Flutter (3.0.0)][7]
      - **注**: Flutter Web では、オペレーションは Browser SDK を経由してルーティングされるため、`feature_operation_vital` 試験機能を有効にする必要があります。
  - [Kotlin Multiplatform (1.4.0)][4]
  - [React Native (3.0.0)][5]
  - [Roku (1.4.0)][6]

## SDK API を使用してオペレーションを作成する {#create-operations-with-the-sdk-apis}

SDK API を使用してオペレーションを定義します。

### オペレーションを開始する {#start-an-operation}

すべてのオペレーションは、`startOperation` を呼び出すことで開始する必要があります (一部の SDK では、この API のレガシー名である `startFeatureOperation` が使用される場合があります)。

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
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` 試験機能を有効にします。
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

<div class="alert alert-warning">オペレーション名には、英字、数字、または <code>- _ . @ $</code>の各文字のみを使用できます。スペースを含めることはできません。</div>

### 成功したオペレーションを停止する {#stop-an-operation-with-success}

開始されたオペレーションはすべて停止する必要があります。`succeedOperation` を使用すると、オペレーションを成功として停止できます (一部の SDK では、この API のレガシー名である `succeedFeatureOperation` が使用される場合があります)。

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
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` 試験機能を有効にします。

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

### 失敗したオペレーションを停止する {#stop-an-operation-with-failure}

開始されたオペレーションはすべて停止する必要があります。`failOperation` を使用すると、オペレーションを失敗として停止できます (一部の SDK では、この API のレガシー名である `failFeatureOperation` が使用される場合があります)。

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
Flutter Web でオペレーションを使用するには、Browser SDK で `feature_operation_vital` 試験機能を有効にします。

{{% /tab %}}

{{< /tabs >}}

### 並列化 {#parallelization}
ユーザーが複数のジャーニーオペレーションを並列で開始するケースがあるかもしれません。それらを個別に追跡するには、`startOperation` を呼び出す際に定義した `operationKey` を使用します。同じ `operationKey` を後に他の API で再利用する必要があります (`succeedOperation` を呼び出す場合など)。

<div class="alert alert-warning">開始されたが明示的に停止されていないオペレーションは、RUM セッションの期限が切れると自動的に終了します。これらは、 <code>@operation.failure_reason:timeout</code>を使用して失敗としてマークされます。<br><br> 開始されていないオペレーションの停止 API が呼び出された場合、SDK によって発行された停止イベントはインジェスト時に破棄されます。</div>

## Datadog からオペレーションを作成する{#create-operations-from-datadog}

オペレーションは、オペレーションカタログまたはジャーニーの詳細レポートから作成できます。

- **オペレーションカタログ**: [{{< ui >}}RUM{{< /ui >}}] > [{{< ui >}}Operations{{< /ui >}}] (オペレーション) に移動し、[{{< ui >}}New Operation{{< /ui >}}] (新しいオペレーション) をクリックします。
- **Journey Monitoring**: [{{< ui >}}Digital Experience{{< /ui >}}] > [{{< ui >}}Journey Monitoring{{< /ui >}}] に移動してジャーニーを選択し、[{{< ui >}}Details Report{{< /ui >}}] (詳細レポート) に移動して [{{< ui >}}New Operation{{< /ui >}}] をクリックします。

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Datadog UI からオペレーションを作成するためのページ" style="width:100%;" >}}

<div class="alert alert-warning">各 RUM アプリケーションでは、Datadog から UI または API を通じて作成されたオペレーションが 1000 個までサポートされます。Datadog で直接作成されたオペレーションに組織全体の上限はありません。</div>

### ステップ1: オペレーションの詳細を入力し、オペレーションカテゴリを選択する{#step-1-enter-operation-details-and-select-the-operation-category}

オペレーションの RUM アプリケーションを選択し、表示名を入力します。必要に応じて、オペレーションに説明を追加できます。

オペレーションの**カテゴリ**を選択して、開始、成功、失敗の条件と互換性のある RUM イベントタイプを決定します。

| オペレーションカテゴリ       | 概要  | サポートされるイベントタイプ                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| コンポーネントの読み込み | ユーザーが開始したアクションの完了にかかる時間を測定する  | 開始: アクション <br> 成功: リソースまたはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| フォームの送信 | フォームの送信または変更が成功するまでにかかる時間を測定する | 開始: アクション <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| ページまたは画面の読み込み | ページまたは画面の読み込みとデータの表示にかかる時間を測定する | 開始: ビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| ページまたは画面のナビゲーション | ページ間または画面間のナビゲーションが成功するまでにかかる時間を測定する | 開始: アクションまたはビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |
| カスタム | 任意のイベントタイプを組み合わせてカスタムオペレーションを定義する | 開始: アクションまたはビュー <br> 成功: リソース、ビュー、またはカスタムアクション <br> 失敗: リソース、エラー、またはカスタムアクション |

### ステップ 2: 開始イベントを定義する{#step-2-define-the-start-event}

各オペレーションには、開始 RUM イベントが必要です。オペレーションは、選択したオペレーションカテゴリに応じて、アクションイベントまたはビューイベントのいずれかで開始できます。

### ステップ 3: 成功条件を定義する{#step-3-define-the-success-conditions}

各オペレーションには、成功で終了するための条件が必要です。オペレーションは、選択したオペレーションカテゴリに応じて、リソースイベント、ビューイベント、またはカスタムアクションイベントで成功として終了できます。

### ステップ 4: 失敗条件を定義する{#step-4-define-the-failure-conditions}

各オペレーションには、失敗で終了するための条件が必要です。
- **エラー**による失敗は、リソース、エラー、またはカスタムアクションとして終了できます。
- **放棄**による失敗は、オペレーションが完了する前にユーザーが開始ビューから移動した場合に有効にできます。

<div class="alert alert-danger">Datadog の UI または API を通じてオペレーションを作成した後、オペレーションカタログにメトリクスが表示されるまでに最大 15 分かかります。</div>

## Datadog API を使用してオペレーションを作成する{#create-operations-with-the-datadog-api}

オペレーションは、[Datadog API][10] を通じて作成することもできます。

## オペレーションを編集する {#edit-operations}

オペレーションカタログで、鉛筆アイコンをクリックしてオペレーションを編集します。作成方法に関係なく、どのオペレーションの説明も編集できます。UI または API を通じて作成されたオペレーションは、完全に (説明だけでなく) 編集可能です。

## Datadog で可用性を監視する {#monitor-your-availability-on-datadog}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="[RUM] > [Performance Monitoring] (パフォーマンスモニタリング) の下にある [Operations] (オペレーション) タブ" style="width:100%;" >}}

オペレーションを RUM SDK API を使用して作成するか、Datadog で直接作成するか、Datadog API を使用して作成したら、[{{< ui >}}RUM{{< /ui >}}] > [{{< ui >}}Performance Monitoring{{< /ui >}}] > [{{< ui >}}Operations{{< /ui >}}] に移動してそれらを監視します。

Datadog は、同じ名前を持つすべてのオペレーションをカタログにグループ化します。

各オペレーションには、取り込まれたすべての非サンプリングトラフィックに対して計算される 2 つの標準メトリクスがあります。

- `rum.measure.operation`: Datadog に報告されたオペレーションの数をカウントします。
- `rum.measure.operation.duration`: Datadog に報告されたすべてのオペレーションの開始から終了までの経過時間を測定します。

どちらのメトリクスも 15 か月間保持され、以下のディメンションが含まれます。

- `operation.name`: クライアント側で定義されます。
- `operation.status`: 成功または失敗のいずれかです。
- `operation.failure_reason`: エラー、放棄、またはその他の理由になります。

これらのメトリクスは RUM Measure の料金に含まれており、1 つ以上のオペレーションを定義しているすべての RUM without Limits のお客様にご利用いただけます。

## AI で根本原因を調査する {#investigate-root-causes-with-ai}

単一のオペレーションに対してエージェント主導の調査を [Operations] ページから直接実行できます。エージェントは、オペレーションの成功率とレイテンシーを分析し、各失敗モード (エラー、タイムアウト、放棄) およびレイテンシーの回帰に焦点を絞った調査を提示します。詳細については、[オペレーション AI 調査][8]をご覧ください。

## 保持フィルターを構成する {#configure-retention-filters}

オペレーションは、RUM における新しいタイプのイベントです。オペレーションは RUM セッションにバインドされますが、複数の RUM ビューにまたがることができます。オペレーションは、[保持フィルター][12]でターゲットに設定できます。これにより、ユーザーエクスペリエンスの要となるジャーニーに合わせて保持戦略を調整できます。たとえば、特定のオペレーションが失敗した RUM セッションや、想定以上に時間がかかっている RUM セッションを、プログラムで保持することができます。

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="[RUM] > [Performance Monitoring] (パフォーマンスモニタリング) の下にある [Operations] (オペレーション) タブ" style="width:80%;" >}}

これらのイベントには、メトリクスと同様に、保持フィルターで使用できる特定の属性が付随しています。

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## 参考資料 {#further-reading}

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