---
description: Datadog Feature Flags를 .NET 애플리케이션에 맞게 설정합니다.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/dotnet-core/
  tag: 설명서
  text: .NET 트레이싱
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
title: .NET Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 .NET 애플리케이션을 계측하는 방법을 설명합니다. .NET SDK는 기능 플래그 관리를 위한 개방형 표준인 [OpenFeature][1]와 통합되며, Datadog .NET 트레이서(`dd-trace-dotnet`)의 Remote Configuration을 통해 플래그 업데이트를 수신합니다.

이 가이드에서는 SDK를 설치 및 활성화하고, OpenFeature 클라이언트를 생성하며, 애플리케이션에서 기능 플래그를 평가하는 방법을 설명합니다.

## 전제 조건 {#prerequisites}

.NET Feature Flags SDK를 설정하기 전에 다음 사항을 확인합니다.

- **Datadog Agent** 버전 7.55 이상, [Remote Configuration][2] 활성화됨
- **Datadog [API 키][5]**가 Agent에 구성되어 있음
- **Datadog .NET SDK**(`dd-trace-dotnet`):
  - .NET 6+의 경우 버전 3.36.0 이상
  - .NET Framework 4.6.2+의 경우 버전 3.38.0 이상

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

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> 접두사는 이전 버전과의 호환성을 위해 유지됩니다. 공급자 자체는 안정적입니다.</div>

필수 트레이서 버전 및 Agent OTLP 설정을 포함하여 `feature_flag.evaluations`를 구성하는 방법은 [서버 측 플래그 평가 메트릭 설정][6]을 참조하세요. 사용 가능한 그래프에 대한 자세한 정보는 [Feature Flag 그래프][7]를 참조하세요.

## 설치 {#installation}

NuGet을 사용하여 Datadog [.NET SDK][3] 및 [OpenFeature SDK][4]를 설치합니다.

{{< code-block lang="bash" >}}
dotnet add package Datadog.FeatureFlags.OpenFeature
dotnet add package OpenFeature
{{< /code-block >}}

또는 `.csproj` 파일에 추가합니다.

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="Datadog.FeatureFlags.OpenFeature" />
  <PackageReference Include="OpenFeature" />
</ItemGroup>
{{< /code-block >}}

플래그 평가 메트릭을 활성화하는 경우, OpenTelemetry SDK 및 OTLP 익스포터도 설치해야 합니다.

{{< code-block lang="bash" >}}
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
{{< /code-block >}}

또는 `.csproj` 파일에 추가합니다.

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="OpenTelemetry" />
  <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" />
</ItemGroup>
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

Datadog OpenFeature 공급자를 OpenFeature API에 등록합니다. 공급자는 Datadog .NET 트레이서의 Remote Configuration 시스템에 연결하여 플래그 구성을 수신합니다.

### 초기화 차단 {#blocking-initialization}

`SetProviderAsync`를 `await`과 함께 사용해 첫 번째 플래그 구성이 수신될 때까지 평가를 차단합니다. 이렇게 하면 애플리케이션이 요청 처리를 시작하기 전에 Feature Flags가 준비됩니다.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
{{< /code-block >}}

### 비차단 초기화 {#non-blocking-initialization}

`SetProvider`를 사용하면 대기 없이 공급자를 등록할 수 있습니다. 구성이 수신될 때까지 플래그 평가가 기본값을 반환합니다.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
// Flag evaluations return defaults until configuration is received
{{< /code-block >}}

## 클라이언트 생성 {#create-a-client}

플래그를 평가하려면 OpenFeature 클라이언트를 생성합니다. 애플리케이션의 각기 다른 부분에 대해 서로 다른 이름을 가진 여러 클라이언트를 생성할 수 있습니다.

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔티티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")  // Targeting key (typically user ID)
    .Set("email", "user@example.com")
    .Set("country", "US")
    .Set("tier", "premium")
    .Set("age", 25)
    .Build();
{{< /code-block >}}

**참고:** 서버 측 애플리케이션에서는 현재 사용자를 기준으로 요청당 한 번씩 평가 컨텍스트를 생성한 다음 해당 요청 내의 모든 플래그 평가에 동일한 컨텍스트를 전달하세요. 사용자 속성이 변경되는 경우에만 컨텍스트를 다시 생성하세요.

타겟팅 키는 일관된 트래픽 분산(백분율 롤아웃)에 사용됩니다. 추가 속성을 사용하면 위 예시의 '미국 사용자에 대해 활성화(enable for users in the US)' 또는 '프리미엄 등급 사용자에 대해 활성화(enable for premium tier users)'와 같은 타겟팅 규칙을 설정할 수 있습니다.

## 플래그 평가 {#evaluate-flags}

공급자를 설정하고 클라이언트를 생성한 후에는 애플리케이션 전체에서 Feature Flags를 평가할 수 있습니다. 플래그 평가는 로컬이며 빠릅니다. SDK는 로컬에 캐시된 구성 데이터를 사용하므로 평가 중에 네트워크 요청이 발생하지 않습니다.

각 Feature Flag는 키(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 유형화된 메서드로 평가할 수 있습니다. 각 Feature Flag가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 부울 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `GetBooleanValueAsync`을 사용합니다.

{{< code-block lang="csharp" >}}
var enabled = await client.GetBooleanValueAsync("new-checkout-flow", false, evalCtx);

if (enabled)
{
    ShowNewCheckout();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중 하나를 선택하는 플래그에는 `GetStringValueAsync`을 사용합니다.

{{< code-block lang="csharp" >}}
var theme = await client.GetStringValueAsync("ui-theme", "light", evalCtx);

switch (theme)
{
    case "dark":
        SetDarkTheme();
        break;
    case "light":
        SetLightTheme();
        break;
    default:
        SetLightTheme();
        break;
}
{{< /code-block >}}

### 숫자 플래그 {#numeric-flags}

숫자 플래그에는 `GetIntegerValueAsync` 또는 `GetDoubleValueAsync`을 사용합니다. 이것은 기능이 한도, 백분율 또는 승수와 같은 파라미터에 좌우될 때 적합합니다.

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 데이터에는 `GetObjectValueAsync`을 사용합니다. 이를 사용하면 복잡한 구성에 액세스할 수 있는 값이 반환됩니다.

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var defaultConfig = new Value(new Structure(new Dictionary<string, Value>
{
    ["maxRetries"] = new Value(3),
    ["timeout"] = new Value(30)
}));

var config = await client.GetObjectValueAsync("feature-config", defaultConfig, evalCtx);

// Access configuration values
var maxRetries = config.AsStructure?["maxRetries"].AsInteger ?? 3;
var timeout = config.AsStructure?["timeout"].AsInteger ?? 30;
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 `*DetailsAsync` 메서드를 사용합니다. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="csharp" >}}
var details = await client.GetBooleanDetailsAsync("new-feature", false, evalCtx);

Console.WriteLine($"Value: {details.Value}");
Console.WriteLine($"Variant: {details.Variant}");
Console.WriteLine($"Reason: {details.Reason}");
Console.WriteLine($"Error Type: {details.ErrorType}");
Console.WriteLine($"Error Message: {details.ErrorMessage}");
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 공급자 초기화 대기 {#waiting-for-provider-initialization}

기본적으로 공급자는 비동기적으로 초기화되며, 첫 번째 Remote Configuration 페이로드를 수신할 때까지 플래그 평가는 기본값을 반환합니다. 요청을 처리하기 전에 애플리케이션에서 플래그를 사용할 수 있는 상태가 되어야 하는 경우 이벤트 핸들러를 사용하여 공급자가 초기화될 때까지 기다릴 수 있습니다.

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Constant;

var taskCompletionSource = new TaskCompletionSource<bool>();

// Register event handler
Api.Instance.AddHandler(ProviderEventTypes.ProviderReady, (eventDetails) =>
{
    Console.WriteLine("Provider is ready");
    taskCompletionSource.SetResult(true);
});

Api.Instance.AddHandler(ProviderEventTypes.ProviderError, (eventDetails) =>
{
    Console.WriteLine($"Provider error: {eventDetails.Message}");
    taskCompletionSource.SetResult(false);
});

// Set provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Wait for provider to be ready (with timeout)
var timeout = Task.Delay(TimeSpan.FromSeconds(30));
var completedTask = await Task.WhenAny(taskCompletionSource.Task, timeout);

if (completedTask == timeout)
{
    Console.WriteLine("Provider initialization timed out");
}

// Create client and evaluate flags
var client = Api.Instance.GetClient();
{{< /code-block >}}

## 정리 {#cleanup}

애플리케이션이 종료될 때 리소스를 정리하려면 OpenFeature API를 종료하세요.

{{< code-block lang="csharp" >}}
await Api.Instance.ShutdownAsync();
{{< /code-block >}}

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 표시했습니다. `InMemoryProvider`는 `OpenFeature` NuGet 패키지(네임스페이스 `OpenFeature.Providers.Memory`)에 포함되어 있으므로 프로덕션 환경에 이미 설치된 항목 외에 추가 종속성이 필요하지 않습니다.

`Api.Instance` 는 싱글톤입니다. xUnit의 `IAsyncLifetime`을 사용해 테스트당 공급자를 설정하고 `DisposeAsync`에서 해체하면 순서 지정에 좌우되는 테스트를 방지할 수 있습니다. 설정을 공유하여 스위트를 더 빨리 실행하려면 `InMemoryProvider.UpdateFlagsAsync(...)`을 사용하여 공급자를 다시 등록하지 않고 테스트 간에 플래그 상태를 변경할 수 있습니다.

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Model;
using OpenFeature.Providers.Memory;
using Xunit;

public class CheckoutFlagTests : IAsyncLifetime
{
    private FeatureClient _client = null!;

    public async Task InitializeAsync()
    {
        var flags = new Dictionary<string, Flag>
        {
            ["new-checkout-flow"] = new Flag<bool>(
                variants: new Dictionary<string, bool> { ["on"] = true, ["off"] = false },
                defaultVariant: "on"),
            ["ui-theme"] = new Flag<string>(
                variants: new Dictionary<string, string> { ["dark"] = "dark", ["light"] = "light" },
                defaultVariant: "light",
                contextEvaluator: ctx =>
                    ctx.GetValue("tier")?.AsString == "premium" ? "dark" : "light"),
        };

        await Api.Instance.SetProviderAsync(new InMemoryProvider(flags));
        _client = Api.Instance.GetClient("test");
    }

    public Task DisposeAsync() => Api.Instance.ShutdownAsync();

    [Fact]
    public async Task NewCheckoutEnabledByDefault()
    {
        Assert.True(await _client.GetBooleanValueAsync("new-checkout-flow", false));
    }

    [Fact]
    public async Task PremiumUserGetsDarkTheme()
    {
        var ctx = EvaluationContext.Builder()
            .SetTargetingKey("u1")
            .Set("tier", "premium")
            .Build();
        Assert.Equal("dark", await _client.GetStringValueAsync("ui-theme", "light", ctx));
    }
}
{{< /code-block >}}

NUnit(`[SetUp]`/`[TearDown]`) 및 MSTest(`[TestInitialize]`/`[TestCleanup]`)에도 동일한 패턴이 적용됩니다. ASP.NET Core 통합 테스트의 경우 애플리케이션이 시작되기 전에 `WebApplicationFactory.ConfigureTestServices` 내부에 `InMemoryProvider`를 등록하세요.

테스트가 SDK 내부에 커플링되지 않도록 하려면 Datadog 공급자를 Moq 또는 유사한 라이브러리로 모의 처리하는 대신 `InMemoryProvider`를 교체하여 사용하는 것이 좋습니다.

## 문제 해결 {#troubleshooting}

### 공급자가 활성화되지 않음 {#provider-not-enabled}

공급자가 활성화되지 않았다는 경고가 표시되면 환경 또는 애플리케이션 구성에서 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`가 설정되어 있는지 확인하세요.

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

컨테이너화된 애플리케이션의 경우 Docker 또는 Kubernetes 구성에 이 설정을 추가하세요.

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
environment:
  - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
  - DD_SERVICE=my-service
  - DD_ENV=production
{{< /code-block >}}

### Remote Configuration이 작동하지 않음 {#remote-configuration-not-working}

Remote Configuration이 정상적으로 작동하는지 확인하려면 다음 사항을 확인하세요.
- Datadog Agent가 [필수 버전](#prerequisites)임
- Agent에서 Remote Configuration이 활성화되어 있음
- `DD_SERVICE` 및 `DD_ENV` 환경 변수가 설정되어 있음
- SDK가 Agent와 통신할 수 있음

### 비동기 평가 오류 {#async-evaluation-errors}

.NET OpenFeature SDK는 모든 플래그 평가에 비동기 메서드를 사용합니다. `await`를 사용하거나 반환된 `Task`를 적절하게 처리하고 있는지 확인하세요.

{{< code-block lang="csharp" >}}
// Correct: Using await
var enabled = await client.GetBooleanValueAsync("flag-key", false, context);

// Incorrect: Not awaiting (will not work as expected)
var enabled = client.GetBooleanValueAsync("flag-key", false, context);
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /ko/agent/remote_config/
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.FeatureFlags.OpenFeature
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[7]: /ko/feature_flags/concepts/flag_graphs/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}