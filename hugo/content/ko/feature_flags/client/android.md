---
aliases:
- /ko/feature_flags/setup/android/
description: OpenFeature 표준 API를 사용하여 Android 및 Android TV 애플리케이션용 Datadog Feature
  Flags를 설정합니다.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: https://openfeature.dev/docs/reference/technologies/client/kotlin/
  tag: 외부
  text: OpenFeature Kotlin SDK
- link: /real_user_monitoring/android/
  tag: 설명서
  text: Android 및 Android TV 모니터링
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: 가이드
  text: Feature Flag SDK 트래픽 프록시
title: Android 및 Android TV Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Android 또는 Android TV 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

Android용 Datadog Feature Flags SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][1]를 기반으로 구축되었습니다. 이 가이드에서는 SDK를 설치하고, Datadog 공급자를 구성하며, 애플리케이션에서 Feature Flags를 평가하는 방법을 설명합니다.

<div class="alert alert-info">대부분의 애플리케이션에는 OpenFeature API를 사용하는 것이 권장됩니다. 동일한 애플리케이션에서 여러 개의 독립적인 평가 컨텍스트가 필요한 경우 <a href="#direct-flagsclient-integration-advanced">Direct FlagsClient 통합</a>을 참조하세요.</div>

## 시작 {#getting-started}

Android 앱에서 Feature Flags를 작동시키기 위한 최소한의 예시는 다음과 같습니다.

```kotlin
// 1. Add dependencies (see Installation section)

// 2. Initialize the Datadog Android SDK (in Application.onCreate)
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()
Datadog.initialize(this, configuration, TrackingConsent.GRANTED)

// 3. Enable Feature Flags
Flags.enable()

// 4. Create and set up the OpenFeature provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()
OpenFeatureAPI.setProviderAndWait(provider)

// 5. Set evaluation context (who is the user)
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf("tier" to Value.String("premium"))
    )
)

// 6. Evaluate flags anywhere in your app
val client = OpenFeatureAPI.getClient()
val isEnabled = client.getBooleanValue("my-feature", false)
```

이 가이드의 나머지 부분에서는 각 단계를 자세히 설명합니다.

## 설치 {#installation}

애플리케이션 모듈의 `build.gradle` 파일에 Gradle 종속성으로 Datadog Feature Flags SDK 및 OpenFeature Provider를 추가합니다:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

앱 수명 주기에서 가능한 한 빨리, 일반적으로 `Application` 클래스의 `onCreate()` 메서드에서 Datadog을 초기화합니다. 이렇게 하면 모든 Feature Flag 평가 및 텔레메트리가 올바르게 캡처되도록 할 수 있습니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

```kotlin
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
```

## 플래그 활성화{#enable-flags}

Datadog을 초기화한 후 `Flags`를 활성화하여 현재 Datadog Android SDK 인스턴스에 연결하고 공급자 생성 및 Feature Flag 평가를 준비합니다.

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

구성 객체를 전달할 수도 있습니다. [고급 구성](#advanced-configuration)을 참조하세요.

## 공급자 생성 및 구성 {#create-and-configure-the-provider}

`FlagsClient`를 생성한 다음 `asOpenFeatureProvider()` 확장 프로그램을 사용하여 OpenFeature 공급자로 변환합니다. 이 작업은 앱 시작 중에 한 번 수행하면 됩니다.

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

// Create and configure the provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()

// Set it as the OpenFeature provider
OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

<div class="alert alert-info">OpenFeature 공급자는 Datadog을 내부적으로 <code>FlagsClient</code> 래핑합니다. 이는 구현 세부 사항입니다. 일단 설정되면 표준 OpenFeature API를 통해서만 상호 작용하게 됩니다.</div>

<div class="alert alert-warning">OpenFeature Kotlin SDK는 단일 전역 공급자와 평가 컨텍스트를 사용합니다. 동일한 앱 내에서 여러 개의 독립적인 평가 컨텍스트가 필요한 경우(예: 다중 사용자 앱에 있는 서로 다른 사용자의 경우) <a href="#direct-flagsclient-integration-advanced">Direct FlagsClient 통합</a>을 참조하세요.</div>

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

`ImmutableContext`를 사용하여 플래그 평가가 적용되는 사람 및 대상을 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함됩니다. 이러한 정보는 적절한 타겟팅을 보장하기 위해 플래그 평가 전에 설정합니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.Value

OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to Value.String("user@example.com"),
            "tier" to Value.String("premium")
        )
    )
)
{{< /code-block >}}

<div class="alert alert-info">OpenFeature 속성은 다음과 같은 <code>Value</code> 기본값만 사용해야 합니다. <code>Value.String()</code>, <code>Value.Integer()</code>, <code>Value.Double()</code>, 또는 <code>Value.Boolean()</code>. 타겟팅 키는 세션 간에 일관된 플래그 평가를 보장할 수 있도록 동일한 사용자에 대해 일관되어야 합니다. 익명 사용자의 경우, 예를 들어 <code>SharedPreferences</code>에 저장된 영구 UUID를 사용합니다.</div>

## 플래그 평가 {#evaluate-flags}

공급자와 평가 컨텍스트를 설정한 후에는 앱 전체에서 플래그 값을 읽을 수 있습니다. 플래그 평가는 _로컬에서 즉시_ 수행됩니다. SDK는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다. 이를 통해 메인 스레드에서 안전하게 평가를 수행할 수 있습니다.

각 플래그는 _키_(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 유형화된 메서드로 평가할 수 있습니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

먼저 OpenFeature 클라이언트를 가져져옵니다.

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

val client = OpenFeatureAPI.getClient()
{{< /code-block >}}

### 불리언 플래그 {#boolean-flags}

불리언 플래그는 켜짐/꺼짐 또는 참/거짓 조건을 나타냅니다.

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = client.getBooleanValue(
    key = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String 플래그 {#string-flags}

String 플래그는 다음 여러 변형 또는 구성 문자열 중에서 선택합니다.

{{< code-block lang="kotlin" >}}
val theme = client.getStringValue(
    key = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### Integer 및 Double 플래그 {#integer-and-double-flags}

숫자 플래는 기능이 제한, 백분율 또는 승수와 같은 숫자 파라미터를 사용할 때 적합합니다.

{{< code-block lang="kotlin" >}}
val maxItems = client.getIntegerValue(
    key = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = client.getDoubleValue(
    key = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

### 구조화된 플래그 {#structured-flags}

구조화된 플래그는 여러 속성을 JSON과 같은 데이터로 함께 제공해야 하는 원격 구성 시나리오에 유용합니다.

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.Value

val config = client.getObjectValue(
    key = "ui.config",
    defaultValue = Value.Structure(mapOf(
        "color" to Value.String("#00A3FF"),
        "fontSize" to Value.Integer(14)
    ))
)

// Access nested values
val color = config.asStructure()?.get("color")?.asString()
val fontSize = config.asStructure()?.get("fontSize")?.asInteger()
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 이외의 추가 정보가 필요한 경우 평가된 값, 변형 이름, 이유 및 오류 코드를 포함한 자세한 평가 메타데이터를 얻을 수 있습니다.

{{< code-block lang="kotlin" >}}
val details = client.getStringDetails(
    key = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Reason for this value (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // Error code, if any
{{< /code-block >}}

다른 유형에 대해서도 유사한 세부 정보 메서드가 존재합니다. `getBooleanDetails()`, `getIntegerDetails()`, `getDoubleDetails()` 및 `getObjectDetails()`.

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 공급자 이벤트 관찰{#observe-provider-events}

<div class="alert alert-info">공급자 이벤트 관찰은 <code>dd-sdk-android-flags-openfeature</code> 3.6.0 이상에서 사용할 수 있습니다. 또한 <code>dd-sdk-android-flags</code>에 동일한 버전을 사용합니다.</div>

`OpenFeatureAPI.observe()`를 사용하여 공급자 상태 변경에 대응하세요. Datadog OpenFeature 공급자는 기본 `FlagsClient` 상태에 따라 `ProviderReady`, `ProviderStale` 및 `ProviderError`를 전송합니다.

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

val stateJob = lifecycleScope.launch {
    OpenFeatureAPI.observe<OpenFeatureProviderEvents>()
        .catch {
            // Handle Flow collection errors.
        }
        .collect { event ->
            when (event) {
                is OpenFeatureProviderEvents.ProviderReady -> {
                    // The provider is ready to evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderStale -> {
                    // Cached assignments are available, but they may be out of date.
                }
                is OpenFeatureProviderEvents.ProviderError -> {
                    // The provider cannot evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderConfigurationChanged -> {
                    // The provider configuration changed.
                }
                else -> {
                    // Handle other OpenFeature provider events as needed.
                }
            }
        }
}
{{< /code-block >}}

관찰 구성 요소가 중지되면 수집 작업을 취소합니다. 예를 들어, Android `Activity` 또는 `Fragment`에서 `lifecycleScope`을 수집하거나 `ViewModel`에서 `viewModelScope`을 수집합니다.

## 고급 구성 {#advanced-configuration}

### 전역 구성 {#global-configuration}

`Flags.enable()` API는 아래 나열된 옵션을 포함하는 선택적 구성을 허용합니다. 이러한 설정은 모든 공급자에 전역적으로 적용됩니다:

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`trackExposures()`
: `true`(기본값)인 경우 SDK는 플래그가 평가될 때 자동으로 _노출 이벤트_를 기록합니다. 이러한 이벤트에는 어떤 플래그에 액세스했는지, 어떤 변형이 제공되었는지, 그리고 어떤 컨텍스트에서 제공되었는지에 대한 메타데이터가 포함되어 있습니다. 이벤트는 Datadog으로 전송되므로 나중에 기능 채택을 분석할 수 있습니다. 텔레메트리 없이 로컬 평가만 필요한 경우 : `trackExposures(false)`를 사용하여 비활성화할 수 있습니다.

`rumIntegrationEnabled()`
: `true`(기본값)인 경우 플래그 평가가 RUM에서 추적되므로 사용자 세션과 상관관계를 분석할 수 있습니다. 이를 통해 _“변형 B에서 사용자가 더 많은 오류를 경험하나요?”_와 같은 분석이 가능합니다. 앱에서 RUM을 사용하지 않는다면 이 플래그는 아무런 영향을 미치지 않으며 기본값으로 두어도 안전합니다. RUM 통합을 비활성화하려면 `rumIntegrationEnabled(false)`를 사용합니다.

`gracefulModeEnabled()`
`Flags.enable()`을 호출하기 전에 클라이언트를 생성하거나, 동일한 이름으로 중복 클라이언트를 생성하거나, 아직 생성되지 않은 클라이언트를 검색하는 경우 등 SDK가 API의 잘못된 사용을 처리하는 방법을 제어합니다.

  그레이스풀 모드의 정확한 동작은 빌드 구성에 따라 달라집니다.

  * **릴리스 빌드**:SDK가 항상 그레이스풀 모드 적용: `Datadog.setVerbosity()`가 구성된 경우에만 오용이 내부적으로 기록됩니다.
  `gracefulModeEnabled = true`(기본값)인 * **디버그 빌드**: SDK가 항상 콘솔에 경고를 기록합니다.
  `gracefulModeEnabled = false`인 * **디버그 빌드**: SDK가 잘못된 API 사용에 대해 `IllegalStateException`을 발생시켜 구성 실수를 조기에 탐지할 수 있도록 하는 fail-fast 접근 방식을 적용합니다.

  개발 또는 QA 단계에 따라 `gracefulModeEnabled()`를 조정할 수 있습니다.

### 공급자별 구성 {#per-provider-configuration}

개별 공급자를 생성하기 전에 사용자 지정 엔드포인트로 구성할 수 있습니다.

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .useCustomEvaluationEndpoint("https://your-proxy.example.com/evaluations")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

## Direct FlagsClient 통합(고급) {#direct-flagsclient-integration-advanced}

대부분의 애플리케이션에서는 위에서 설명한 OpenFeature API를 사용하는 것이 권장됩니다. 하지만 OpenFeature 추상화가 지원하지 않는 특정 요구 사항이 있는 경우 Datadog `FlagsClient`를 직접 사용할 수 있습니다.

**FlagsClient는 다음과 같은 경우에만 직접 사용하세요.**

- 동일한 앱 내에서 **여러 개의 독립적인 평가 컨텍스트**가 필요한 경우(예: 다중 사용자 앱에 있는 서로 다른 사용자의 경우)
- **네이티브 Kotlin 유형**으로 직접 작업하려는 경우(`Value.Structure` 대신 `JSONObject`)
- 인스턴스별로 클라이언트 수명 주기 및 구성에 대한 **세밀한 제어**가 필요한 경우

### 설치(FlagsClient) {#installation-flagsclient}

직접 API만 필요한 경우 OpenFeature 종속성을 생략할 수 있습니다.

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### 클라이언트(FlagsClient) 생성 및 검색 {#create-and-retrieve-a-client-flagsclient}

일반적으로 클라이언트는 앱 시작 중에 한 번 생성합니다.

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

동일한 클라이언트는 앱 내 어디에서나 검색할 수 있습니다.

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

`name` 파라미터를 제공하여 여러 클라이언트를 생성하고 검색할 수도 있습니다.

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">같은 이름이 지정된 클라이언트가 이미 존재하는 경우 기존 인스턴스가 재사용됩니다.</div>

### 평가 컨텍스트 설정(FlagsClient) {#set-the-evaluation-context-flagsclient}

{{< code-block lang="kotlin" >}}
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to "user@example.com",
            "tier" to "premium"
        )
    )
)
{{< /code-block >}}

이 메서드는 백그라운드에서 서버로부터 플래그 할당을 비동기적으로 가져옵니다. 이 작업은 비차단 방식이며 스레드로부터 안전합니다. 플래그 업데이트는 백그라운드 작업이 완료된 후 후속 평가에 사용할 수 있습니다.

### 직접 클라이언트 상태 변경 관찰 {#observe-direct-client-state-changes}

<div class="alert alert-info">다음 <code>flagsClient.state</code> 를 사용하는 직접 클라이언트 상태 관찰은 <code>dd-sdk-android-flags</code> 3.4.0 이상에서 사용 가능합니다.</div>

`flagsClient.state`를 사용하여 현재 직접 클라이언트 상태를 검사하거나 상태 변경에 대한 리스너를 등록합니다.

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsStateListener
import com.datadog.android.flags.model.FlagsClientState

val listener = object : FlagsStateListener {
    override fun onStateChanged(newState: FlagsClientState) {
        when (newState) {
            FlagsClientState.NotReady -> {
                // The client has not loaded assignments yet.
            }
            FlagsClientState.Reconciling -> {
                // The client is fetching assignments for a context change.
            }
            FlagsClientState.Ready -> {
                // Assignments are loaded and available for evaluation.
            }
            FlagsClientState.Stale -> {
                // Cached assignments are available, but the latest fetch failed.
            }
            is FlagsClientState.Error -> {
                // No assignments are available for evaluation.
            }
        }
    }
}

flagsClient.state.addListener(listener)

val currentState = flagsClient.state.getCurrentState()
{{< /code-block >}}

리스너는 등록 시 현재 상태를 수신한 다음 이후 상태 변경 사항을 수신합니다. 콜백을 빠르게 유지하고 오래 걸리는 작업은 다른 스레드로 전달합니다. 관찰 중인 구성 요소가 중지될 때 `flagsClient.state.removeListener(listener)`를 호출합니다.

### 플래그(FlagsClient) 평가 {#evaluate-flags-flagsclient}

{{% collapse-content title="불리언 플래그" level="h4" %}}
{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="String 플래그" level="h4" %}}
{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Integer 및 Double 플래그" level="h4" %}}
{{< code-block lang="kotlin" >}}
val maxItems = flagsClient.resolveIntValue(
    flagKey = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = flagsClient.resolveDoubleValue(
    flagKey = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="구조화된 플래그" level="h4" %}}
{{< code-block lang="kotlin" >}}
import org.json.JSONObject

val config = flagsClient.resolveStructureValue(
    flagKey = "ui.config",
    defaultValue = JSONObject().apply {
        put("color", "#00A3FF")
        put("fontSize", 14)
    }
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="플래그 평가 세부 정보" level="h4" %}}
{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}
{{% /collapse-content %}}

### API 비교 {#api-comparison}

이 표는 OpenFeature와 `FlagsClient` API 간의 주요 차이점을 강조해서 보여주고 요구 사항에 맞는 통합을 선택하는 데 도움을 줍니다.

| 기능 | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **API 표준** | OpenFeature(벤더 중립적) | Datadog 전용 |
| **평가 컨텍스트** | 전역/정적 | 클라이언트 인스턴스당 |
| **구조화된 플래그** | `Value.Structure` | `JSONObject` |
| **유형 안전성** | OpenFeature `Value` 유형 | Kotlin 네이티브 유형 |
| **벤더 종속** | 낮음(벤더 중립적) | 높음(Datadog 전용) |
| **상태 관리** | 흐름 기반 관찰 | 수동 리스너 등록 |

## 테스트 {#testing}

실제 Datadog 공급자를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, 인메모리 `FeatureProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. 업스트림 OpenFeature Kotlin SDK는 [`InMemoryProvider`][3]를 제공하지 않으므로, 테스트에서는 소규모로 사용자 지정 `FeatureProvider`를 사용합니다. 아래 예시는 `OpenFeatureAPI`의 공급자를 대체합니다. 프로덕션 코드에서 Datadog `FlagsClient` 래퍼를 직접 사용하는 경우, 테스트는 `FlagsClient`가 아니라 래퍼가 사용하는 동일한 `OpenFeatureAPI` 클라이언트를 통해 어설션해야 합니다.

테스트 구성에 `kotlinx-coroutines-test`를 추가합니다(SDK의 `initialize`는 `suspend` 함수임).

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1'
}
{{< /code-block >}}

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.*
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import kotlin.test.assertTrue

class FakeProvider(private val flags: Map<String, Any>) : FeatureProvider {
    override val hooks = emptyList<Hook<*>>()
    override val metadata = object : ProviderMetadata { override val name = "fake" }
    private val events = MutableSharedFlow<OpenFeatureProviderEvents>(replay = 1)

    override suspend fun initialize(initialContext: EvaluationContext?) {
        // No-op. The SDK emits ProviderReady after initialize returns.
    }
    override fun shutdown() {}
    override suspend fun onContextSet(old: EvaluationContext?, new: EvaluationContext) {}

    override fun getBooleanEvaluation(key: String, defaultValue: Boolean, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Boolean) ?: defaultValue)
    override fun getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? String) ?: defaultValue)
    override fun getIntegerEvaluation(key: String, defaultValue: Int, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Int) ?: defaultValue)
    override fun getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Double) ?: defaultValue)
    override fun getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Value) ?: defaultValue)

    override fun observe(): Flow<OpenFeatureProviderEvents> = events
}

class CheckoutFlagsTest {
    private lateinit var client: Client

    @Before
    fun setUp() = runTest {
        OpenFeatureAPI.setProviderAndWait(
            FakeProvider(mapOf("new-checkout-flow" to true))
        )
        client = OpenFeatureAPI.getClient()
    }

    @Test
    fun newCheckoutEnabled() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI`는 프로세스 전체 싱글톤이므로, 테스트가 JVM을 공유하는 경우 테스트 클래스 간에 이를 재설정합니다. `setProviderAndWait`를 `runTest { ... }`에서 래핑합니다. `suspend`이므로 일반 `@Before` 메서드에서 호출할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: https://github.com/open-feature/kotlin-sdk/pull/226