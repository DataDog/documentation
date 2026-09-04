---
description: Go 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/go/
  tag: 설명서
  text: Go 트레이스
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
title: Go Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Go 애플리케이션을 계측하는 방법을 설명합니다. Go SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][1]와 통합되며, Datadog Go 트레이서(`dd-trace-go`)의 Remote Configuration을 통해 Feature Flags 업데이트를 수신합니다.

이 가이드에서는 SDK를 설치 및 활성화하고, OpenFeature 클라이언트를 생성하며, 애플리케이션에서 Feature Flags를 평가하는 방법을 설명합니다.

## 전제 조건 {#prerequisites}

Go Feature Flags SDK를 설정하기 전에 다음 사항을 확인하세요.

- **Datadog Agent** 버전 7.55 이상, [Remote Configuration][2] 활성화됨
- **Datadog [API 키][3]**가 Agent에 구성됨
- **Datadog Go SDK** `dd-trace-go` 버전 2.4.0 이상

다음 환경 변수를 설정하세요.

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> 접두사는 이전 버전과의 호환성을 위해 유지됩니다. 공급자 자체는 안정화되어 있습니다.</div>

필수 트레이서 버전 및 Agent OTLP 설정을 포함하여 `feature_flag.evaluations`를 구성하려면 [서버 측 플래그 평가 메트릭 설정][4]을 참조하세요. 사용 가능한 그래프 작성에 대한 자세한 내용은 [Feature Flag 그래프][5]를 참조하세요.

## 설치 {#installation}

Datadog OpenFeature 공급자 패키지를 설치하세요.

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

OpenFeature Go SDK도 필요합니다.

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

Datadog Go 트레이서를 시작하고 Datadog OpenFeature 공급자를 등록하세요. 트레이서는 Remote Configuration을 활성화하므로 먼저 시작해야 합니다. Remote Configuration은 Feature Flags 구성을 애플리케이션에 전달합니다.

### 차단 초기화 {#blocking-initialization}

`SetProviderAndWait`을 사용하여 초기 Feature Flags 구성이 수신될 때까지 평가를 차단하세요. 이렇게 하면 애플리케이션이 요청 처리를 시작하기 전에 Feature Flags가 준비됩니다.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider and wait for initialization (default 30s timeout)
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
}
{{< /code-block >}}

사용자 지정 시간 제한을 지정하려면 `SetProviderAndWaitWithContext`를 사용하세요.

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### 비차단 초기화 {#non-blocking-initialization}

`SetProvider`를 사용하여 대기하지 않고 공급자를 등록하세요. 구성이 수신될 때까지 Feature Flags 평가는 기본값을 반환합니다.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider without waiting
    openfeature.SetProvider(provider)

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
    // Flag evaluations return defaults until configuration is received
}
{{< /code-block >}}

## 클라이언트 생성 {#create-a-client}

플래그를 평가하려면 OpenFeature 클라이언트를 생성하세요. 애플리케이션의 각기 다른 부분에 대해 서로 다른 이름을 가진 여러 클라이언트를 생성할 수 있습니다.

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔티티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123", // Targeting key (typically user ID)
    map[string]interface{}{
        "email":   "user@example.com",
        "country": "US",
        "tier":    "premium",
        "age":     25,
    },
)
{{< /code-block >}}

타겟팅 키는 일관된 트래픽 분산(비율별 롤아웃)에 사용됩니다. 추가 속성을 사용하면 위 예시의 '미국 사용자에게 활성화(enable for users in the US)' 또는 '프리미엄 등급 사용자에게 활성화(enable for premium tier users)'와 같은 타겟팅 규칙을 설정할 수 있습니다.

## 플래그 평가 {#evaluate-flags}

공급자를 설정하고 클라이언트를 생성한 후에는 애플리케이션 전체에서 Feature Flags를 평가할 수 있습니다. 플래그 평가는 로컬에서 빠르게 수행됩니다. SDK는 로컬에 캐시된 구성 데이터를 사용하므로 평가 중에 네트워크 요청이 발생하지 않습니다.

각 Feature Flag는 키(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 유형화된 메서드로 평가할 수 있습니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 부울 플래그 {#boolean-flags}

켜짐/꺼짐 또는 참/거짓 조건을 나타내는 플래그에는 `BooleanValue`를 사용하세요.

{{< code-block lang="go" >}}
ctx := context.Background()

enabled, err := client.BooleanValue(ctx, "new-checkout-flow", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

if enabled {
    showNewCheckout()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `StringValue`를 사용하세요.

{{< code-block lang="go" >}}
theme, err := client.StringValue(ctx, "ui-theme", "light", evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

switch theme {
case "dark":
    setDarkTheme()
case "light":
    setLightTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### 숫자 플래그 {#numeric-flags}

숫자 플래그의 경우 `IntValue` 또는 `FloatValue`를 사용하세요. 이는 기능이 제한, 백분율 또는 승수와 같은 숫자 매개변수에 의존할 때 적합합니다.

{{< code-block lang="go" >}}
maxItems, err := client.IntValue(ctx, "cart-max-items", 20, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

discountRate, err := client.FloatValue(ctx, "discount-rate", 0.0, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 데이터의 경우 `ObjectValue`을 사용하세요. 이는 맵이나 기타 복잡한 유형으로 유형을 검증할 수 있는 값을 반환합니다.

{{< code-block lang="go" >}}
config, err := client.ObjectValue(ctx, "feature-config", map[string]interface{}{
    "maxRetries": 3,
    "timeout":    30,
}, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

// Type assert to access the configuration
if configMap, ok := config.(map[string]interface{}); ok {
    maxRetries := configMap["maxRetries"]
    timeout := configMap["timeout"]
    // Use configuration values
}
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

Feature Flag 값 이외의 정보가 필요할 때는 `*ValueDetails` 메서드를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="go" >}}
details, err := client.BooleanValueDetails(ctx, "new-feature", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

fmt.Printf("Value: %v\n", details.Value)
fmt.Printf("Variant: %s\n", details.Variant)
fmt.Printf("Reason: %s\n", details.Reason)
fmt.Printf("Error: %v\n", details.Error())
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 인메모리 공급자로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. 인메모리 공급자는 `go-sdk` 모듈의 `github.com/open-feature/go-sdk/openfeature/memprovider` 아래에 제공되므로 추가 종속성이 필요하지 않습니다.

기본 전역 공급자 대신 **명명된 클라이언트** 아래에 인메모리 공급자를 등록하세요. 기본 공급자는 프로세스 전역에서 공유되므로 `t.Parallel()`을 손상시키고 테스트 간에 플래그 상태가 유출됩니다. 명명된 클라이언트는 각 테스트에 공급자의 범위를 지정합니다.

{{< code-block lang="go" >}}
package checkout

import (
    "context"
    "testing"

    "github.com/open-feature/go-sdk/openfeature"
    "github.com/open-feature/go-sdk/openfeature/memprovider"
)

func TestNewCheckoutFlow(t *testing.T) {
    cases := []struct {
        name string
        tier string
        want bool
    }{
        {"premium user sees new flow", "premium", true},
        {"free user sees legacy", "free", false},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            evalByTier := func(flag memprovider.InMemoryFlag, flatCtx openfeature.FlattenedContext) (any, openfeature.ProviderResolutionDetail) {
                if flatCtx["tier"] == "premium" {
                    return flag.Variants["on"], openfeature.ProviderResolutionDetail{Reason: openfeature.TargetingMatchReason, Variant: "on"}
                }
                return flag.Variants[flag.DefaultVariant], openfeature.ProviderResolutionDetail{Reason: openfeature.DefaultReason, Variant: flag.DefaultVariant}
            }

            provider := memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{
                "new-checkout-flow": {
                    State:            memprovider.Enabled,
                    DefaultVariant:   "off",
                    Variants:         map[string]any{"on": true, "off": false},
                    ContextEvaluator: &evalByTier,
                },
            })

            name := "test-" + t.Name()
            if err := openfeature.SetNamedProviderAndWait(name, provider); err != nil {
                t.Fatal(err)
            }
            t.Cleanup(func() {
                _ = openfeature.SetNamedProviderAndWait(name, openfeature.NoopProvider{})
            })

            client := openfeature.NewClient(name)
            got, err := client.BooleanValue(context.Background(), "new-checkout-flow", false, openfeature.NewEvaluationContext("user-1", map[string]any{"tier": tc.tier}))
            if err != nil {
                t.Fatal(err)
            }
            if got != tc.want {
                t.Errorf("got %v, want %v", got, tc.want)
            }
        })
    }
}
{{< /code-block >}}

`ContextEvaluator`는 `*func(...)`(함수를 가리키는 포인터)로 정의됩니다. 평가자를 지역 변수로 정의하고 위와 같이 `&`를 사용하여 해당 주소를 전달하세요. 항상 `DefaultVariant`를 반환하려면 `ContextEvaluator`를 완전히 생략하세요.

[1]: https://openfeature.dev/
[2]: /ko/agent/remote_config/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ko/feature_flags/concepts/flag_graphs/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}