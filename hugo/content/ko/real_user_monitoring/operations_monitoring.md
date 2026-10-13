---
description: 사용자 대상 여정 내의 중요한 기술 운영을 모니터링하여 사용자가 주요 워크플로를 완료하지 못하는 정확한 시점과 이유를 정확히
  파악하세요.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM에 대해 알아보기
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: 가이드
  text: 운영 모니터링 설정을 위한 모범 사례
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: 가이드
  text: RUM 운영을 위한 SLO 생성 모범 사례
title: 운영 모니터링
---
## 개요 {#overview}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="RUM > Performance Monitoring 하위의 Operations 탭" style="width:100%;" >}}

Datadog Real User Monitoring(RUM)에서 [여정][9]은 결제, 로그인, 검색과 같이 애플리케이션의 주요 사용자가 경험하는 영역을 나타냅니다. 각 여정에는 사용자 경험을 원활하게 만드는 중요한 기술적 단계인 작업이 포함됩니다.

- 비즈니스 팀은 **여정**을 사용하여 사용자 전환을 추적하고 개선합니다.
- 엔지니어링 팀은 **작업**을 사용하여 주요 사용자 순간에 영향을 미치는 기술적 실패를 모니터링하고 최소화합니다.

RUM SDK API를 사용하거나, Datadog에서 직접, 또는 Datadog API를 사용하여 프로그래밍 방식으로 작업을 생성할 수 있습니다.

예를 들어, 전자상거래 플랫폼의 결제 과정도 하나의 여정입니다. 그 안에 결제 정보 입력, 결제 수단 저장, 구매 완료 작업 등이 포함될 수 있습니다. 작업을 생성하면 Datadog RUM은 실행 볼륨, 완료율, 실패율을 포함하여 각 작업의 성능을 측정합니다. 작업의 상태를 측정하면 사용자가 여정에서 전환되지 않는 정확한 시점과 이유를 파악할 수 있습니다.


다음 표는 업종별 추가 여정 예시와 관련 여정 작업을 보여줍니다.

| 업종       | 여정  | 여정 작업                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| 소셜 네트워크 | 프로필  | 사용자가 프로필을 로드할 수 있음 <br> 사용자가 사진을 업로드할 수 있음 <br> 사용자가 상태를 업데이트할 수 있음                                  |
| 전자상거래      | 결제 | 사용자가 결제 정보를 입력할 수 있음 <br> 사용자가 결제 수단을 저장할 수 있음 <br> 사용자가 결제할 수 있음                                      |
| 스트리밍      | 검색   | 사용자가 검색 결과를 찾을 수 있음 <br> 사용자가 타이틀 설명을 로드할 수 있음 <br> 사용자가 예고편 시청을 시작할 수 있음 |
| CRM            | 견적    | 사용자는 새 견적을 시작할 수 있음 <br> 사용자는 견적에 품목을 추가할 수 있음 <br> 사용자는 수신자에게 견적을 보낼 수 있음                 |

## 전제 조건 {#prerequisites}

- [RUM without Limits][11]가 조직에서 활성화되어 있어야 합니다.
- SDK API를 사용하여 작업을 생성하려면 클라이언트 측 API가 포함된 지원되는 Datadog RUM SDK 버전을 다운로드하여 작업을 정의하세요.
  - [Browser(6.20.0)][1]
  - [Android(3.1.0)][2]
  - [iOS(3.1.0)][3]
  - [Flutter(3.0.0)][7]
      - **참고**: Flutter Web에서 작업은 Browser SDK를 통해 라우팅되므로 `feature_operation_vital` 실험적 기능을 활성화해야 합니다.
  - [Kotlin Multiplatform(1.4.0)][4]
  - [React Native(3.0.0)][5]
  - [Roku(1.4.0)][6]

## SDK API로 작업 생성 {#create-operations-with-the-sdk-apis}

SDK API를 사용하여 작업을 정의하세요.

### 작업 시작 {#start-an-operation}

모든 작업은 `startOperation`을 호출하여 시작해야 합니다(일부 SDK는 이 API의 이전 이름인 `startFeatureOperation`을 사용할 수 있습니다).

{{< tabs >}}
{{% tab "브라우저" %}}

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
Flutter Web에서 작업을 사용하려면 Browser SDK에서 `feature_operation_vital` 실험적 기능을 활성화하세요.
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

<div class="alert alert-warning">해당 작업의 이름에는 문자, 숫자 또는 다음 문자( <code>- _ . @ $</code>)만 포함될 수 있으며, 공백은 포함될 수 없습니다.</div>

### 성공적으로 작업 중지 {#stop-an-operation-with-success}

시작된 모든 작업은 중지되어야 합니다. `succeedOperation`을 사용하여 성공적인 결과로 작업을 중지하세요(일부 SDK는 이 API의 이전 이름인 `succeedFeatureOperation`을 사용할 수 있습니다).

{{< tabs >}}
{{% tab "브라우저" %}}

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
Flutter Web에서 작업을 사용하려면 Browser SDK에서 `feature_operation_vital` 실험적 기능을 활성화하세요.

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

<div class="alert alert-warning"> <code>operationKey</code> 은(는) 시작 및 종료 작업 이벤트에서 동일해야 합니다.</div>

### 실패 상태로 작업 중지 {#stop-an-operation-with-failure}

시작된 모든 작업은 중지되어야 합니다. `failOperation`을 사용하여 실패로 처리하고 작업을 중지하세요(일부 SDK는 이 API의 레거시 이름인 `failFeatureOperation`을 사용할 수 있습니다).

{{< tabs >}}
{{% tab "브라우저" %}}

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
Flutter Web에서 작업을 사용하려면 Browser SDK에서 `feature_operation_vital` 실험적 기능을 활성화하세요.

{{% /tab %}}

{{< /tabs >}}

### 병렬화 {#parallelization}
사용자가 여러 여정 작업을 병렬로 시작하는 경우가 있을 수 있습니다. 이를 개별적으로 추적하려면 `operationKey`를 호출할 때 정의한 `startOperation`을 사용하세요. 나중에 다른 API에서(예: `succeedOperation` 호출 시) 동일한 `operationKey`를 재사용해야 합니다.

<div class="alert alert-warning">시작되었지만 명시적으로 중지되지 않은 작업은 RUM 세션이 만료되면 자동으로 종료됩니다. 이러한 작업은 <code>@operation.failure_reason:timeout</code>과(와) 함께 실패로 표시됩니다. <br><br> 애초에 시작되지 않은 작업 중지 API가 호출된 경우, SDK에서 발생한 중지 이벤트는 수집 시 삭제됩니다.</div>

## Datadog에서 작업 생성 {#create-operations-from-datadog}

작업 카탈로그 또는 여정 세부 정보 보고서에서 작업을 생성할 수 있습니다.

- **작업 카탈로그**: {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}로 이동한 다음 {{< ui >}}New Operation{{< /ui >}}을 클릭합니다.
- **Journey Monitoring**: {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Journey Monitoring{{< /ui >}}로 이동하여 여정을 선택하고 해당 {{< ui >}}Details Report{{< /ui >}}로 이동한 다음 {{< ui >}}New Operation{{< /ui >}}을 클릭합니다.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Datadog UI에서 작업을 생성하기 위한 페이지" style="width:100%;" >}}

<div class="alert alert-warning">각 RUM 애플리케이션은 UI 또는 API를 통해 Datadog에서 생성된 작업을 최대 1000개까지 지원합니다. Datadog에서 직접 생성된 작업에는 조직 전체 제한이 없습니다.</div>

### 1단계: 작업 세부 정보를 입력하고 작업 범주를 선택합니다. {#step-1-enter-operation-details-and-select-the-operation-category}

작업의 RUM 애플리케이션을 선택하고 표시 이름을 입력합니다. 필요에 따라 작업에 설명을 추가할 수 있습니다.

작업의 **범주**를 선택하여 시작, 성공 및 실패 조건과 호환되는 RUM 이벤트 유형을 결정하세요. 

| 작업 범주       | 요약  | 지원되는 이벤트 유형                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| 구성 요소 로딩 | 사용자가 시작한 액션이 완료되는 데 걸리는 시간 측정  | 시작: 액션 <br> 성공: 리소스 또는 사용자 지정 액션 <br> 실패: 리소스, 오류 또는 사용자 지정 액션 |
| 양식 제출 | 양식 제출 또는 변경이 성공하는 데 걸리는 시간 측정 | 시작: 액션 <br> 성공: 리소스, 뷰 또는 사용자 지정 액션 <br> 실패: 리소스, 오류 또는 사용자 지정 액션 |
| 페이지 또는 화면 로드 | 페이지 또는 화면이 데이터를 로드하고 표시하는 데 걸리는 시간 측정 | 시작: 뷰 <br> 성공: 리소스, 뷰 또는 사용자 지정 액션 <br> 실패: 리소스, 오류 또는 사용자 지정 액션 |
| 페이지 또는 화면 탐색 | 한 페이지나 화면에서 다른 페이지나 화면으로 탐색이 성공하는 데 걸리는 시간 측정 | 시작: 액션 또는 뷰 <br> 성공: 리소스, 뷰 또는 사용자 지정 액션 <br> 실패: 리소스, 오류 또는 사용자 지정 액션 |
| 사용자 지정 | 이벤트 유형 조합으로 사용자 지정 작업 정의 | 시작: 액션 또는 뷰 <br> 성공: 리소스, 뷰 또는 사용자 지정 액션 <br> 실패: 리소스, 오류 또는 사용자 지정 액션 |

### 2단계: 시작 이벤트 정의{#step-2-define-the-start-event}

각 작업에는 시작 RUM 이벤트가 있어야 합니다. 작업은 선택한 작업 범주에 따라 액션 또는 조회 이벤트로 시작할 수 있습니다.

### 3단계: 성공 조건 정의{#step-3-define-the-success-conditions}

각 작업에는 성공 상태로 종료되기 위한 조건이 있어야 합니다. 작업은 선택한 작업 범주에 따라 리소스, 뷰 또는 사용자 지정 액션 이벤트와 함께 성공적으로 종료될 수 있습니다.

### 4단계: 실패 조건 정의 {#step-4-define-the-failure-conditions}

각 작업에는 실패 상태로 종료되기 위한 조건이 있어야 합니다.
- **오류** 실패는 리소스, 오류 또는 사용자 지정 액션과 함께 종료될 수 있습니다.
- **중단** 작업이 완료되기 전에 사용자가 시작 보기에서 다른 곳으로 이동하는 경우 실패로 처리될 수 있습니다.

<div class="alert alert-danger">UI 또는 API를 통해 Datadog에서 작업을 생성한 후 메트릭이 작업 카탈로그에 나타나기까지 최대 15분이 소요될 수 있습니다.</div>

## Datadog API로 작업 생성{#create-operations-with-the-datadog-api}

작업은 [Datadog API][10]를 통해서도 생성할 수 있습니다.

## 작업 편집 {#edit-operations}

작업 카탈로그에서 연필 아이콘을 클릭하여 작업을 편집하세요. 생성 방식과 관계없이 모든 작업의 설명을 편집할 수 있습니다. UI 또는 API를 통해 생성된 작업은 설명을 비롯한 모든 부분을 편집할 수 있습니다.

## Datadog에서 가용성 모니터링 {#monitor-your-availability-on-datadog}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="RUM > Performance Monitoring 하위의 Operations 탭" style="width:100%;" >}}

RUM SDK API를 사용하거나, Datadog에서 직접 또는 Datadog API를 사용하여 작업을 생성한 후 {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}로 이동하여 모니터링하세요.

Datadog은 이름이 같은 모든 작업을 카탈로그로 그룹화합니다.

각 작업에는 샘플링되지 않은 수집된 전체 트래픽에 대해 계산되는 두 가지 기본 제공 메트릭이 있습니다.

- `rum.measure.operation`은 Datadog에 보고된 작업의 볼륨을 계산합니다.
- `rum.measure.operation.duration`은 Datadog에 보고된 모든 작업의 시작과 끝 사이의 경과 시간을 측정합니다.

두 메트릭 모두 15개월 동안 보존되며 여러 디멘션을 포함합니다.

- `operation.name`: 클라이언트 측에서 정의됩니다.
- `operation.status`: 성공 또는 실패입니다.
- `operation.failure_reason`: 오류, 중단 또는 기타일 수 있습니다.

이러한 메트릭은 RUM Measure 가격에 포함되어 있으며 하나 이상의 작업을 정의하는 모든 RUM without Limits 고객이 사용할 수 있습니다.

## AI로 근본 원인 조사 {#investigate-root-causes-with-ai}

Operations 페이지에서 직접 단일 작업에 대한 에이전트 기반 조사를 실행할 수 있습니다. 에이전트는 작업의 성공률과 대기 시간을 분석하여 각 실패 모드(오류, 시간 초과, 포기) 및 대기 시간 회귀에 대한 집중 조사를 제공합니다. 자세한 정보는 [Operation AI 조사][8]를 참조하세요.

## 보존 필터 구성 {#configure-retention-filters}

Operations는 RUM의 새로운 이벤트 유형입니다. Operations는 RUM Session에 바인딩되지만 여러 RUM 조회에 스팬됩니다. Operations는 [보존 필터][12]에서 타겟팅할 수 있습니다. 이를 통해 사용자 경험의 초석이 되는 여정에 맞춰 보존 전략을 조정할 수 있습니다. 예를 들어, 특정 작업이 실패했거나 원하는 것보다 오래 걸리는 RUM 세션을 프로그래밍 방식으로 유지할 수 있습니다.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="RUM > Performance Monitoring 하위의 Operations 탭" style="width:80%;" >}}

메트릭과 마찬가지로 이러한 이벤트에는 보존 필터에서 사용할 수 있는 특정 속성이 포함되어 있습니다.

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/3.0.0
[6]: https://github.com/DataDog/dd-sdk-roku/releases/tag/1.4.0
[7]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv3.0.0
[8]: /ko/real_user_monitoring/ai_investigations/operation_ai_investigation/
[9]: /ko/journey_monitoring/
[10]: /ko/api/latest/rum-operations/
[11]: /ko/real_user_monitoring/rum_without_limits/
[12]: /ko/real_user_monitoring/rum_without_limits/retention_filters/