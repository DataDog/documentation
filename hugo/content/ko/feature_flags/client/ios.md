---
aliases:
- /ko/feature_flags/setup/ios/
description: iOS 및 tvOS 애플리케이션에 맞춰 Datadog Feature Flags를 설정합니다.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /real_user_monitoring/ios/
  tag: 설명서
  text: iOS 및 tvOS 모니터링
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: 가이드
  text: Proxy Feature Flag SDK 트래픽
title: iOS 및 tvOS Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 iOS 또는 tvOS 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

이 가이드에서는 SDK를 설치 및 활성화하고 `FlagsClient`를 생성 및 사용하며 고급 옵션을 구성하는 방법을 설명합니다.

## 설치 {#installation}

프로젝트의 종속성으로 `DatadogFlags`를 선언합니다. 권장되는 설치 방법은 SPM(Swift Package Manager)입니다.

{{< tabs >}}
{{% tab "SPM(Swift Package Manager)" %}}
Apple의 Swift Package Manager를 사용하여 Datadog Feature Flags SDK를 설치하려면 다음을 종속 항목으로 `Package.swift` 파일에 추가합니다.

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

프로젝트에서 다음 라이브러리를 연결합니다.

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
[CocoaPods][1]를 사용하여 Datadog Feature Flags SDK를 설치하려면 `Podfile`에 다음 포드를 선언합니다.

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
[Carthage][1]를 사용하여 Datadog Feature Flags SDK를 설치하려면 `dd-sdk-ios`에 `Cartfile`을 추가합니다.

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**참고**: Datadog은 사전 구축된 Carthage 바이너리를 제공하지 않습니다. 즉, Carthage가 소스에서 SDK를 빌드합니다. SDK를 빌드하고 통합하려면 다음을 실행합니다.

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

빌드 후 다음 XCFramework를 Xcode 프로젝트에 추가합니다({{< ui >}}Frameworks, Libraries, and Embedded Content{{< /ui >}} 섹션).

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## SDK 초기화 {#initialize-the-sdk}

앱 수명 주기에서 가능한 한 빨리, 일반적으로 `application(_:didFinishLaunchingWithOptions:)`(또는 SwiftUI 앱의 경우 `@UIApplicationDelegateAdaptor`)에서 Datadog을 초기화합니다. 이렇게 하면 모든 Feature Flag 평가 및 텔레메트리가 올바르게 캡처됩니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

## 플래그 활성화{#enable-flags}

Datadog을 초기화한 후, `Flags`를 활성화하여 현재 Datadog iOS SDK 인스턴스에 연결하고 클라이언트 생성 및 플래그 평가를 준비합니다.

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

구성 객체를 전달할 수도 있는데, [고급 구성](#advanced-configuration)을 참조하세요.

## 클라이언트 생성 및 검색{#create-and-retrieve-a-client}

일반적으로 클라이언트는 앱 시작 중에 한 번 생성합니다.

{{< code-block lang="swift" >}}
FlagsClient.create() // Creates the default client
{{< /code-block >}}

동일한 클라이언트는 앱 내 어디에서나 검색할 수 있습니다.

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Retrieves the "default" client
{{< /code-block >}}

`name` 파라미터를 제공하여 여러 클라이언트를 생성하고 검색할 수도 있습니다.

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">같은 이름이 지정된 클라이언트가 이미 존재하는 경우 기존 인스턴스가 재사용됩니다.</div>

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

`FlagsEvaluationContext`를 사용하여 플래그 평가가 적용되는 사람 및 대상을 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함됩니다. 플래그를 평가하기 전에 이 메서드를 호출하여 적절한 타겟팅을 보장할 수 있습니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="swift" >}}
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "email": .string("user@example.com"),
            "tier":  .string("premium")
        ]
    )
)
{{< /code-block >}}

이 메서드는 서버에서 플래그 할당을 비동기적으로 가져옵니다. 선택적 완료 콜백을 제공하거나 async/await 변형을 사용하여 컨텍스트 평가 결과를 처리할 수 있습니다.

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Context set successfully
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## 플래그 평가 {#evaluate-flags}

`FlagsClient`를 생성하고 평가 컨텍스트를 설정한 후 앱 전체에서 플래그 값을 읽기 시작할 수 있습니다. 플래그 평가는 _로컬에서 즉시_ 수행됩니다. SDK는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다. 이를 통해 메인 스레드에서 안전하게 평가를 수행할 수 있습니다.

각 플래그는 _키_(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 _유형화된 getter_로 평가할 수 있습니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `getBooleanValue(key:defaultValue:)`를 사용합니다. 예:

{{< code-block lang="swift" >}}
let isNewCheckoutEnabled = flagsClient.getBooleanValue(
    key: "checkout.new",
    defaultValue: false
)

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `getStringValue(key:defaultValue:)`를 사용합니다. 예:

{{< code-block lang="swift" >}}
let theme = flagsClient.getStringValue(
    key: "ui.theme",
    defaultValue: "light"
)

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### 정수 및 부동 소수점 플래그{#integer-and-double-flags}

숫자 플래그에는 `getIntegerValue(key:defaultValue:)` 또는 `getDoubleValue(key:defaultValue:)`를 사용합니다. 이는 기능이 제한, 백분율 또는 승수와 같은 숫자 파라미터에 의존할 때 적합합니다.

{{< code-block lang="swift" >}}
let maxItems = flagsClient.getIntegerValue(
    key: "cart.items.max",
    defaultValue: 20
)

let priceMultiplier = flagsClient.getDoubleValue(
    key: "pricing.multiplier",
    defaultValue: 1.0
)
{{< /code-block >}}

### Object 플래그 {#object-flags}

구조화된 데이터나 JSON과 유사한 데이터에는 `getObjectValue(key:defaultValue:)`를 사용합니다. 이 메서드는 `AnyValue`를 반환하며, 이 값은 기본 형식, 배열 또는 딕셔너리를 나타낼 수 있습니다. 객체 플래그는 여러 속성을 함께 제공해야 하는 원격 구성 시나리오에 유용합니다. 예:

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 `get<Type>Details` API를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

예:

{{< code-block lang="swift" >}}
let details = flagsClient.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Evaluated value (for example: "A", "B", or "control")
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.error)    // The error that occurred during evaluation, if any
{{< /code-block >}}

플래그 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 될 수 있습니다.

## 상태 변경 관찰 {#observe-state-changes}

<div class="alert alert-info"> <code>FlagsClient.state</code> 가 지정된 상태 관찰은 <code>dd-sdk-ios</code> 3.11.0 이상에서 사용할 수 있습니다.</div>

`flagsClient.state`를 사용하여 `FlagsClient`가 플래그를 평가할 준비가 되었는지 확인하고 상태가 변경될 때 대응할 수 있습니다. 상태 변경은 `setEvaluationContext`를 호출하고 SDK가 해당 컨텍스트에 대한 할당을 가져올 때 발생합니다.

{{< code-block lang="swift" >}}
final class FeatureFlagStateObserver: FlagsStateListener {
    func flagsStateDidChange(_ newState: FlagsClientState) {
        switch newState {
        case .notReady:
            // The client has not loaded assignments yet.
            break
        case .reconciling:
            // The client is fetching assignments for a context change.
            break
        case .ready:
            // Assignments are loaded and available for evaluation.
            break
        case .stale:
            // Cached assignments are available, but the latest fetch failed.
            break
        case .error:
            // No assignments are available for evaluation.
            break
        }
    }
}

let observer = FeatureFlagStateObserver()
flagsClient.state.addListener(observer)

let currentState = flagsClient.state.currentState
{{< /code-block >}}

업데이트를 계속 수신하려면 리스너에 대한 강력한 참조를 유지하세요. 리스너는 등록 시 현재 상태를 수신한 다음 이후 상태 변경 사항을 수신합니다.

## OpenFeature와 함께 사용 {#use-with-openfeature}

위의 예에서는 Datadog의 `FlagsClient` API를 직접 사용합니다. [OpenFeature](https://openfeature.dev/) 표준 API를 선호하는 경우 Datadog은 `FlagsClient`을 래핑하여 `OpenFeatureAPI.shared`를 통해 노출하는 iOS용 OpenFeature 공급자를 제공합니다. 두 API 모두 동일한 플래그 데이터를 제공하므로 둘 중 앱에 적합한 API를 선택하면 됩니다.

<div class="alert alert-info">iOS OpenFeature 브리지(<a href="https://github.com/DataDog/dd-openfeature-provider-swift"><code>dd-openfeature-provider-swift</code></a>)는 1.0 이전 패키지로 사용할 수 있습니다. 1.0 버전에 도달하기 전까지 버전 업데이트에는 주요 변경 사항이 포함될 수 있습니다. OpenFeature를 통해 통합하려면 이 섹션을 사용하세요. 가장 안정적인 iOS API 인터페이스를 원한다면 <code>FlagsClient</code> 를 직접 사용하세요.</div>

### OpenFeature 공급자 설치 {#install-the-openfeature-provider}

`Package.swift`에 `dd-openfeature-provider-swift`를 추가합니다.

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/DataDog/dd-openfeature-provider-swift.git", .upToNextMajor(from: "0.2.0"))
{{< /code-block >}}

`DatadogOpenFeatureProvider` 제품을 앱 타겟에 연결합니다. 브리지는 OpenFeature Swift SDK 0.3.0을 사용합니다.

### OpenFeature 초기화 {#initialize-openfeature}

[SDK 초기화](#initialize-the-sdk)에 표시된 대로 Datadog을 초기화하고 플래그를 활성화합니다. 그런 다음 `DatadogProvider`를 생성하여 `OpenFeatureAPI.shared`에 등록합니다.

{{< code-block lang="swift" >}}
import DatadogCore
import DatadogFlags
import DatadogOpenFeatureProvider
import OpenFeature

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)

Flags.enable()

let context = MutableContext(targetingKey: "user-123")
let provider = DatadogProvider()
await OpenFeatureAPI.shared.setProviderAndWait(provider: provider, initialContext: context)
{{< /code-block >}}

`setProviderAndWait`는 `async`이며 예외를 발생시키지 않습니다. 반환 후에는 공급자가 준비되며 플래그 평가에는 캐시된 값이 사용됩니다.

### 평가 컨텍스트 설정 {#set-the-evaluation-context-1}

평가 컨텍스트는 플래그 평가가 적용되는 사람 및 대상을 식별합니다. 위와 같이 공급자 등록 시 전달하거나 나중에 업데이트합니다.

{{< code-block lang="swift" >}}
let updatedContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "email": Value.string("user@example.com"),
        "tier":  Value.string("premium")
    ])
)

await OpenFeatureAPI.shared.setEvaluationContextAndWait(evaluationContext: updatedContext)
{{< /code-block >}}

`targetingKey`는 백분율 기반 롤아웃의 무작위화 대상입니다. 동일한 키는 특정 플래그에 대해 항상 동일한 변형을 받습니다.

### 플래그 평가 {#evaluate-flags-1}

전역 OpenFeature 클라이언트를 검색하고 유형화된 getter를 호출합니다.

{{< code-block lang="swift" >}}
let client = OpenFeatureAPI.shared.getClient()

let isNewCheckoutEnabled = client.getBooleanValue(key: "checkout.new", defaultValue: false)

let theme = client.getStringValue(key: "ui.theme", defaultValue: "light")

let maxItems = client.getIntegerValue(key: "cart.items.max", defaultValue: 20)

let priceMultiplier = client.getDoubleValue(key: "pricing.multiplier", defaultValue: 1.0)

let config = client.getObjectValue(
    key: "ui.config",
    defaultValue: Value.structure([
        "color": Value.string("#00A3FF"),
        "fontSize": Value.integer(14)
    ])
)
{{< /code-block >}}

평가는 동기식이며 메인 스레드에서 안전하게 수행할 수 있으며 SDK의 로컬 캐시에서 읽으며 네트워크 요청을 수행하지 않습니다. `getIntegerValue`는 `Int64`를 반환하며, 필요한 경우 호출 사이트에서 `Int`로 캐스팅합니다.

### 플래그 평가 세부 정보 {#flag-evaluation-details-1}

값 외에도 이유, 변형 또는 평가 오류가 필요한 경우 `get<Type>Details` 메서드를 사용하세요.

{{< code-block lang="swift" >}}
let details = client.getStringDetails(key: "paywall.layout", defaultValue: "control")

print(details.value)    // Evaluated value
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Reason (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode) // Error code, if evaluation failed
{{< /code-block >}}

### 공급자 이벤트 관찰 {#observe-provider-events}

<div class="alert alert-info">Datadog OpenFeature 공급자에 대한 공급자 이벤트 관찰은 <code>dd-openfeature-provider-swift</code> 0.2.0 이상에서 사용할 수 있습니다. 버전 0.2.0은 <code>dd-sdk-ios</code> 3.13.0 이상을 사용합니다.</div>

`OpenFeatureAPI.shared.observe()`를 사용하여 OpenFeature 공급자 이벤트에 대응합니다. Datadog OpenFeature 공급자는 기본 `FlagsClient` 상태에 따라 `.ready`, `.stale` 및 `.error`를 전송합니다. OpenFeature SDK는 평가 컨텍스트가 변경될 때 `.reconciling` 및 `.contextChanged`와 같은 수명 주기 이벤트를 전송할 수도 있습니다.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature

final class FeatureFlagEventObserver {
    private var cancellable: AnyCancellable?

    func startObserving() {
        cancellable = OpenFeatureAPI.shared.observe().sink { event in
            guard let event else {
                return
            }

            switch event {
            case .ready:
                // The provider is ready to evaluate flags.
                break
            case .stale:
                // Cached assignments are available, but they may be out of date.
                break
            case .error(_, _):
                // The provider cannot evaluate flags.
                break
            case .reconciling:
                // The provider is reconciling after a context change.
                break
            case .contextChanged:
                // The context change completed.
                break
            case .configurationChanged:
                // The provider configuration changed.
                break
            }
        }
    }
}
{{< /code-block >}}

## 고급 구성 {#advanced-configuration}

`Flags.enable()` API는 아래 나열된 옵션을 포함한 선택적 구성을 허용합니다.

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
: `true`(기본값)인 경우 SDK는 플래그가 평가될 때 _노출 이벤트_를 자동으로 기록합니다. 이러한 이벤트에는 어떤 플래그에 액세스했는지, 어떤 변형이 제공되었는지, 어떤 컨텍스트에서 제공되었는지에 대한 메타데이터가 포함됩니다. 이러한 이벤트는 Datadog으로 전송되므로 나중에 기능 채택을 분석할 수 있습니다. 텔레메트리 없이 로컬 평가만 필요한 경우에는 이 옵션을 비활성화할 수 있습니다.

`rumIntegrationEnabled`
: `true`(기본값)인 경우 플래그 평가가 RUM에서 추적되므로 사용자 세션과 연관시킬 수 있습니다. 이를 통해 _“변형 B에서 사용자가 더 많은 오류를 경험하나요?”_와 같은 분석이 가능합니다. 앱에서 RUM을 사용하지 않는다면 이 플래그는 아무런 영향을 미치지 않으며 기본값으로 두어도 안전합니다.

`gracefulModeEnabled`
: `Flags.enable()`을 호출하기 전에 클라이언트를 생성하거나, 동일한 이름으로 중복 클라이언트를 생성하거나, 아직 생성되지 않은 클라이언트를 검색하는 경우 등 SDK가 `FlagsClient` API의 잘못된 사용을 처리하는 방법을 제어합니다.

  그레이스풀 모드의 정확한 동작은 빌드 구성에 따라 달라집니다.

  * **릴리스 빌드**: SDK가 항상 그레이스풀 모드 적용: `Datadog.verbosityLevel`이 구성된 경우에만 오용이 내부적으로 기록됩니다.
  `gracefulModeEnabled = true`(기본값)인 * **디버그 빌드** : SDK가 항상 콘솔에 경고를 기록합니다.
  `gracefulModeEnabled = false`인 * **디버그 빌드** : SDK가 잘못된 API 사용에 대해 `fatalError`를 발생시켜 구성 실수를 조기에 탐지할 수 있도록 하는 fail-fast 접근 방식을 적용합니다.

  개발 또는 QA 단계에 따라 `gracefulModeEnabled`를 조정할 수 있습니다.

`customFlagsEndpoint`
: 플래그 할당을 검색하기 위한 사용자 지정 서버 URL을 구성합니다.

`customExposureEndpoint`
: 플래그 노출 데이터를 전송하기 위한 사용자 지정 서버 URL을 구성합니다.

`customEvaluationEndpoint`
: 플래그 평가 텔레메트리를 전송하기 위한 사용자 지정 서버 URL을 구성합니다.

`customFlagsHeaders`
: `customFlagsEndpoint`에 대한 요청에 첨부할 추가 HTTP 헤더를 설정합니다. 자체 플래그 서비스를 사용할 때 인증이나 라우팅에 유용할 수 있습니다.

## 테스트 {#testing}

위의 예에서는 Datadog의 `FlagsClient` API를 직접 사용합니다. [OpenFeature](https://openfeature.dev/) 브리지를 사용하거나 OpenFeature API를 중심으로 테스트를 작성하는 경우 인메모리 공급자로 대체하여 코드에서 플래그 값을 제어하세요.

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나 인메모리 `FeatureProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. OpenFeature Swift SDK는 `InMemoryProvider`를 제공하지 않으므로 테스트에서는 대신 작은 사용자 지정 `FeatureProvider`를 사용합니다.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature
import XCTest
@testable import MyApp

// Minimal in-memory provider for tests. Copy into your test target.
final class InMemoryTestProvider: FeatureProvider {
    var hooks: [any Hook] = []
    var metadata: ProviderMetadata = Metadata(name: "in-memory-test")
    private let subject = CurrentValueSubject<ProviderEvent?, Never>(.ready)
    private let bools: [String: Bool]
    private let strings: [String: String]

    init(bools: [String: Bool] = [:], strings: [String: String] = [:]) {
        self.bools = bools
        self.strings = strings
    }

    func observe() -> AnyPublisher<ProviderEvent?, Never> { subject.eraseToAnyPublisher() }

    func initialize(initialContext: EvaluationContext?) async throws {}

    func onContextSet(oldContext: EvaluationContext?, newContext: EvaluationContext) async throws {}

    func getBooleanEvaluation(key: String, defaultValue: Bool, context: EvaluationContext?) throws -> ProviderEvaluation<Bool> {
        ProviderEvaluation(value: bools[key] ?? defaultValue, variant: bools[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) throws -> ProviderEvaluation<String> {
        ProviderEvaluation(value: strings[key] ?? defaultValue, variant: strings[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getIntegerEvaluation(key: String, defaultValue: Int64, context: EvaluationContext?) throws -> ProviderEvaluation<Int64> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) throws -> ProviderEvaluation<Double> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) throws -> ProviderEvaluation<Value> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    private struct Metadata: ProviderMetadata { var name: String? }
}

final class CheckoutFlagTests: XCTestCase {
    override func tearDown() {
        OpenFeatureAPI.shared.clearProvider()
    }

    func testNewCheckoutEnabled() async throws {
        let provider = InMemoryTestProvider(bools: ["new-checkout-flow": true])
        await OpenFeatureAPI.shared.setProviderAndWait(provider: provider)

        let client = OpenFeatureAPI.shared.getClient()
        XCTAssertTrue(client.getBooleanValue(key: "new-checkout-flow", defaultValue: false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI.shared`는 전역 싱글톤이므로 한 테스트의 플래그가 다른 테스트로 유출되지 않도록 `tearDown`에서 `clearProvider()`를 호출합니다. `setProviderAndWait(provider:)`는 `async`이며 예외를 발생시키지 않으므로 `try`가 필요하지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/account_management/api-app-keys/#client-tokens