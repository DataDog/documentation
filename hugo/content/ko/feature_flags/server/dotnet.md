---
description: Datadog Feature Flags를 .NET 애플리케이션에 맞게 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 문서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/dotnet-core/
  tag: 문서
  text: .NET 트레이싱
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정하기
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정하기
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
title: .NET Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 .NET 애플리케이션을 계측하는 방법을 설명합니다. .NET SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][1]와 통합되며, Datadog .NET 트레이서(`dd-trace-dotnet`)를 사용하여 관리형 CDN 또는 Agent Remote Configuration에서 플래그 업데이트를 수신합니다.

트레이서 버전 3.54.0부터는 새로운 설정에서 기본적으로 Datadog 관리형 CDN으로부터 플래그 구성을 로드합니다. 이 가이드에서는 SDK를 설치하고, OpenFeature 클라이언트를 생성하며, 애플리케이션에서 Feature Flags를 평가하는 방법을 설명합니다.

<div class="alert alert-warning">버전 3.54.0에서 Agentless 모드는 플래그 구성만 변경합니다. 실험 노출 이벤트에는 여전히 호환되는 로컬 Agent 또는 텔레메트리 릴레이가 필요하며, 직접적인 Event Platform Proxy(EVP) 폴백은 지원되지 않습니다. 평가 메트릭에는 별도로 구성된 OpenTelemetry 내보내기 경로가 필요합니다. 텔레메트리 경로가 없으면 구성 전달 및 로컬 플래그 평가만 작동합니다.</div>

## 전제 조건 {#prerequisites}

Agentless 구성 전달을 위해서는 Datadog .NET 트레이서 버전 **3.54.0 이상** 및 `Datadog.FeatureFlags.OpenFeature` 버전 **2.3.1 이상**을 설치해야 합니다. 트레이서는 [자동 계측][8]을 통해 로드되어야 합니다. OpenFeature 공급자만 설치하는 것으로는 충분하지 않습니다. 플래그 구성을 가져오기 위해 별도의 Datadog Agent가 필요하지 않습니다.

시작하기 전에 애플리케이션 프로세스에서 다음 환경 변수를 설정하세요.

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Datadog [API 키][5]와 `datadoghq.com`과 같이 조직을 호스팅하는 사이트를 사용합니다. 새 설정의 경우 Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. 애플리케이션에서 Datadog OpenFeature 공급자를 초기화하여 폴링을 시작합니다. 트레이서만 설치하거나 초기화해서는 CDN 폴링이 시작되지 않습니다. 평가는 로컬에 캐시된 구성을 사용하며 네트워크 요청을 수행하지 않습니다.

플래그 평가 메트릭은 별도로 구성된 OpenTelemetry 파이프라인을 사용합니다. CDN 전송을 활성화해도 메트릭 내보내기는 구성되지 않습니다. [서버 측 플래그 평가 메트릭 설정][6] 및 [Feature Flag 그래프][7]를 참조하세요.

### Agent Remote Configuration 사용 {#use-agent-remote-configuration}

Agent 기반 전달의 경우, [Remote Configuration][2]이 활성화되어 있고 Agent에 API 키가 구성된 Datadog Agent 7.55 이상을 사용하세요. 최소 트레이서 버전은 .NET 6+의 경우 3.36.0, .NET Framework 4.6.2+의 경우 3.38.0입니다.

트레이서 버전 3.54.0 이상에서는 소스를 명시적으로 선택하세요.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

이전 트레이서 버전은 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`를 사용합니다. 3.54.0 버전에서 이 지원이 중단된 설정은 새로운 활성화 설정이나 명시적 소스가 제공되지 않을 때 Remote Configuration을 보존합니다. 마이그레이션하려면 레거시 설정을 제거하고 위의 애플리케이션 자격 증명을 구성합니다. 이미 소스를 명시적으로 선택한 경우 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`를 설정하세요. `DD_FEATURE_FLAGS_ENABLED=false`는 선택한 소스에 관계없이 Feature Flags를 비활성화합니다.

폴링, 요청 시간 초과, 사용자 지정 엔드포인트 및 마이그레이션 설정은 [Configuration Sources][9]를 참조하세요. 기본 Agentless 폴링 간격은 30초, 요청 시간 초과는 5초이며, 공급자 초기화는 첫 번째 구성을 위해 최대 30초까지 대기합니다.

## 설치 {#installation}

NuGet을 사용하여 Datadog [.NET SDK][3] 및 [OpenFeature SDK][4]를 설치하세요.

{{< code-block lang="bash" >}}
dotnet add package Datadog.FeatureFlags.OpenFeature
dotnet add package OpenFeature
{{< /code-block >}}

또는 `.csproj` 파일에 추가하세요.

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

또는 `.csproj` 파일에 추가하세요.

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="OpenTelemetry" />
  <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" />
</ItemGroup>
{{< /code-block >}}

## SDK 초기화 {#initialize-the-sdk}

Datadog OpenFeature 공급자를 OpenFeature API에 등록하세요. 공급자는 Datadog .NET 트레이서에서 선택된 소스를 활성화합니다.

### 초기화 차단 {#blocking-initialization}

`SetProviderAsync`를 `await`과 함께 사용해 첫 번째 플래그 구성이 수신될 때까지 평가를 차단하세요. 이렇게 하면 애플리케이션이 요청 처리를 시작하기 전에 Feature Flags가 준비됩니다.

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

플래그를 평가하려면 OpenFeature 클라이언트를 생성하세요. 애플리케이션의 각기 다른 부분에 대해 서로 다른 이름을 가진 여러 클라이언트를 생성할 수 있습니다.

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

플래그 타겟팅을 위해 사용자 또는 엔터티를 식별하는 평가 컨텍스트를 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 속성이 포함됩니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

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

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `GetBooleanValueAsync`를 사용합니다.

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

숫자 플래그에는 `GetIntegerValueAsync` 또는 `GetDoubleValueAsync`를 사용합니다. 이것은 기능이 한도, 백분율 또는 승수와 같은 파라미터에 좌우될 때 적합합니다.

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 데이터에는 `GetObjectValueAsync`를 사용합니다. 이를 사용하면 복잡한 구성에 액세스할 수 있는 값이 반환됩니다.

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

기본적으로 공급자는 비동기적으로 초기화되며, 첫 번째 플래그 구성을 수신할 때까지 플래그 평가는 기본값을 반환합니다. 요청을 처리하기 전에 애플리케이션에서 플래그를 사용할 수 있는 상태가 되어야 하는 경우 이벤트 핸들러를 사용하여 공급자가 초기화될 때까지 기다릴 수 있습니다.

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

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 설명합니다. `InMemoryProvider`는 `OpenFeature` NuGet 패키지(네임스페이스 `OpenFeature.Providers.Memory`)에 포함되어 있으므로 프로덕션 환경에 이미 설치된 항목 외에 추가 종속성이 필요하지 않습니다.

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

### Agentless 설정이 작동하지 않음 {#agentless-configuration-not-working}

- 트레이서 버전 3.54.0 이상이 로드되었고 OpenFeature 공급자가 초기화되었는지 확인하세요.
- 애플리케이션 프로세스에서 `DD_API_KEY`, `DD_SITE`, `DD_ENV`를 확인하세요.
- `DD_FEATURE_FLAGS_ENABLED`가 `false`가 아님을 확인하세요. 새 설정의 경우 `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE`를 설정하지 않은 상태로 두거나 명시적으로 `agentless`로 설정하세요. 마이그레이션 시 레거시 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 설정을 제거하세요.
- `ufc-server.ff-cdn.<DD_SITE>`로의 아웃바운드 HTTPS를 허용하세요.
- `DD_TRACE_DEBUG=true`를 활성화하고 트레이서 로그에서 인증, 시간 초과 또는 잘못된 형식의 구성 오류가 있는지 검사하세요.

첫 번째 유효한 구성 전에는 평가 시 호출자 기본값이 반환됩니다. 초기화가 성공한 후에는 일시적인 전달 실패가 발생하면 마지막으로 유효했던 구성이 유지됩니다.

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
[8]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[9]: /ko/feature_flags/concepts/configuration_sources/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}