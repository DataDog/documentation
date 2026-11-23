---
aliases:
- /ko/continuous_integration/setup_tests/dotnet
- /ko/continuous_integration/tests/dotnet
- /ko/continuous_integration/tests/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 설명서
  text: 컨테이너 내 테스트를 위한 환경 변수 전달
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /tests/test_impact_analysis/dotnet
  tag: 설명서
  text: Test Impact Analysis로 테스트 작업 속도 높이기
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: .NET 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

지원되는 런타임 및 플랫폼 목록은 [.NET Framework 호환성][18] 및 [.NET/.NET Core 호환성][19]을 참조하세요.

지원되는 테스트 프레임워크:

| 테스트 프레임워크 | 버전 |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## 보고 메서드 구성 {#configuring-reporting-method}

테스트 결과를 Datadog에 보고하려면 Datadog .NET 라이브러리를 설정해야 합니다.

{{< tabs >}}

{{% tab "자동 계측을 지원하는 CI 공급자" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "기타 클라우드 CI 공급자" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "온프레미스 CI 공급자" %}}
{{% ci-agent %}}
{{% /tab %}}

{{< /tabs >}}

## .NET 트레이서 CLI 설치 {#installing-the-net-tracer-cli}

다음 방법 중 하나를 사용해 `dd-trace` 명령을 설치하거나 업데이트하세요.

- 다음 명령을 실행하여 .NET SDK 사용:
   ```
   dotnet tool update -g dd-trace
   ```
- 적절한 버전 다운로드:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64(Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- 또는 [GitHub 릴리스 페이지][5]에서 다운로드합니다.

## 테스트 계측 {#instrumenting-tests}

<div class="alert alert-warning">BenchmarkDotNet의 경우 <a href="#instrumenting-benchmarkdotnet-tests">이 지침</a>을 따르세요.</div>

테스트 모음을 계측하려면 테스트 명령 앞에 `dd-trace ci run`을 붙이세요. `--dd-service`를 사용하여 테스트 중인 서비스나 라이브러리를 설정하고 `--dd-env`를 사용하여 테스트가 실행되는 환경을 설정할 수 있습니다. 예:

{{< tabs >}}

{{% tab "dotnet test" %}}

<a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>를 사용하는 경우:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

<a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>를 사용하는 경우:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

모든 테스트는 자동으로 계측됩니다.

### Microsoft.CodeCoverage nuget 패키지와의 호환성 {#compatibility-with-microsoftcodecoverage-nuget-package}

`Microsoft.CodeCoverage` 버전 `17.2.0`부터 Microsoft는 Windows에서만 기본적으로 활성화되는 [`.NET CLR Profiling API`를 사용한 동적 계측][16]을 도입했습니다. Datadog의 자동 계측은 `.NET CLR Profiling API`에 의존합니다. 이 API는 하나의 구독자만 허용합니다(예: `dd-trace`). CodeCoverage 동적 계측을 사용하면 자동 테스트 계측이 중단됩니다.

해결 방법은 동적 계측에서 [정적 계측][17]으로 전환하는 것입니다. 다음 구성 옵션을 사용하여 `.runsettings` 파일을 수정하세요.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="Code Coverage">
              <Configuration>
                <CodeCoverage>
                  <!-- Switching to static instrumentation (dynamic instrumentation collides with dd-trace instrumentation) -->
                  <EnableStaticManagedInstrumentation>True</EnableStaticManagedInstrumentation>
                  <EnableDynamicManagedInstrumentation>False</EnableDynamicManagedInstrumentation>
                  <UseVerifiableInstrumentation>False</UseVerifiableInstrumentation>
                  <EnableStaticNativeInstrumentation>True</EnableStaticNativeInstrumentation>
                  <EnableDynamicNativeInstrumentation>False</EnableDynamicNativeInstrumentation>
                  ...
                </CodeCoverage>
              </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

## 구성 설정 {#configuration-settings}

명령줄 인수나 환경 변수를 사용해 CLI 기본 설정을 변경할 수 있습니다. 설정 전체 목록을 보려면 다음을 실행하세요.

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

다음 목록은 핵심 설정 기본값을 보여줍니다.

`--dd-service`(선택 사항)
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**환경 변수**: `DD_SERVICE`<br/>
**기본값**: 리포지토리 이름<br/>
**예**: `my-dotnet-app`

`--dd-env`(선택 사항)
: 테스트가 실행되는 환경의 이름입니다.<br/>
**환경 변수**: `DD_ENV`<br/>
**기본값**: `none`<br/>
**예시**: `local`, `ci`

`--agent-url`(Datadog Agent를 사용할 때만)
: `http://hostname:port` 형식의 트레이스 수집용 Datadog Agent URL입니다.<br/>
**환경 변수**: `DD_TRACE_AGENT_URL`<br/>
**기본값**: `http://localhost:8126`

`test_session.name`(환경 변수로만 사용 가능)
: `unit-tests`, `integration-tests` 또는 `smoke-tests`와 같은 테스트 그룹을 식별합니다.<br/>
**환경 변수**: `DD_TEST_SESSION_NAME`<br/>
**기본값**: CI 작업 이름 및 테스트 명령, 또는 CI 작업 이름을 사용할 수 없는 경우 테스트 명령입니다.<br/>
**예**: `unit-tests`, `integration-tests`, `smoke-tests`

`service` 및 `env` 예약 태그에 대한 자세한 내용은 [Unified Service Tagging][6]을 참조하세요. 모든 기타 [Datadog 트레이서 설정][7] 옵션도 사용할 수 있습니다.

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests}

테스트에 사용자 지정 태그를 추가하려면 먼저 [사용자 지정 계측](#custom-instrumentation)을 설정하세요.

현재 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 .NET 사용자 지정 계측 설명서의 [태그 추가][8] 섹션을 참조하세요.

### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests}

테스트에 사용자 지정 측정값을 추가하려면 먼저 [사용자 지정 계측](#custom-instrumentation)을 설정하세요.

태그와 같이 현재 활성 스팬을 사용하여 테스트에 사용자 지정 측정값을 추가할 수 있습니다.

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

이러한 태그에 대한 필터 또는 시각화를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 .NET 사용자 지정 계측 설명서의 [태그 추가][8] 섹션을 참조하세요.

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][9]를 참조하세요.

### 코드 적용 범위 보고 {#reporting-code-coverage}

코드 적용 범위를 사용할 수 있는 경우, Datadog Tracer(v2.31.0 이상)가 테스트 세션의 `test.code_coverage.lines_pct` 태그에 이를 보고합니다.

[Coverlet][10]을 사용하여 코드 적용 범위를 계산하는 경우, `dd-trace`를 실행할 때 `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 환경 변수에 보고서 파일 경로를 지정하세요. 보고서 파일은 OpenCover 또는 Cobertura 형식이어야 합니다. 또는 `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 환경 변수를 사용하여 Datadog Tracer의 내장 코드 적용 범위 계산을 활성화할 수 있습니다.

**참고**: Test Impact Analysis를 사용하는 경우 SDK의 내장 코드 적용 범위가 기본적으로 활성화됩니다.

테스트 세션의 {{< ui >}}Coverage{{< /ui >}} 탭에서 테스트 적용 범위 변화를 확인할 수 있습니다.

제외 옵션에 대한 자세한 내용은 [Code Coverage][11]를 참조하세요.

### BenchmarkDotNet 테스트 계측 {#instrumenting-benchmarkdotnet-tests}

벤치마크 테스트를 계측하려면 다음을 수행해야 합니다.

1. [`Datadog.Trace.BenchmarkDotNet` NuGet 패키지][12]를 프로젝트에 추가합니다(예: `dotnet add package Datadog.Trace.BenchmarkDotNet` 사용).
2. `DatadogDiagnoser` 속성 또는 `WithDatadog()` 확장 메서드를 사용하여 `Datadog.Trace.BenchmarkDotNet` 익스포터를 사용하도록 프로젝트를 구성합니다. 예:

{{< tabs >}}

{{% tab "[DatadogDiagnoser] 속성 사용" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Attributes;
using Datadog.Trace.BenchmarkDotNet;

[DatadogDiagnoser]
[MemoryDiagnoser]
public class OperationBenchmark
{
    [Benchmark]
    public void Operation()
    {
        // ...
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "구성 사용" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;
using Datadog.Trace.BenchmarkDotNet;

var config = DefaultConfig.Instance
              .WithDatadog();

BenchmarkRunner.Run<OperationBenchmark>(config);
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. [보고 메서드 구성][13].
4. 일상적인 방법으로 벤치마크 프로젝트를 실행하세요. 모든 벤치마크 테스트가 자동으로 계측됩니다.

{{% ci-git-metadata %}}

## 사용자 지정 계측 {#custom-instrumentation}

<div class="alert alert-danger">
  <strong>참고:</strong> 사용자 지정 계측 설정은 다음 <code>dd-trace</code> 버전에 따라 달라집니다. 사용자 지정 계측을 사용하려면 다음 패키지 버전을 <code>dd-trace</code> 및 <code>Datadog.Trace</code> NuGet 패키지와 동기화해야 합니다.
</div>

.NET 애플리케이션에서 사용자 지정 계측을 사용하는 방법:

1. 도구의 버전을 확인하려면 `dd-trace --version`을 실행하세요.
2. 동일한 버전의 `Datadog.Trace` [NuGet 패키지][14]를 애플리케이션에 추가하세요.
3. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 전역 트레이서에 액세스하고 새 스팬을 생성합니다.

사용자 지정 계측에 스팬과 태그를 추가하는 방법에 대한 자세한 정보는 [.NET 사용자 지정 계측 설명서][15]를 참조하세요.

## 수동 테스트 API {#manual-testing-api}

<div class="alert alert-danger">
  <strong>참고:</strong> 수동 테스트 API를 사용하려면 <code>Datadog.Trace</code> 대상 .NET 프로젝트에 NuGet 패키지를 추가해야 합니다.
</div>

XUnit, NUnit 또는 MSTest를 .NET 프로젝트와 함께 사용하는 경우, Test Optimization이 자동으로 이를 계측하고 테스트 결과를 Datadog으로 전송합니다. 지원되지 않는 테스트 프레임워크를 사용하거나 다른 테스트 메커니즘이 있는 경우, 대신 API를 사용하여 테스트 결과를 Datadog에 보고할 수 있습니다.

API는 세 가지 개념, 즉 테스트 모듈, 테스트 스위트와 테스트를 기반으로 합니다.

### 테스트 모듈 {#test-module}

테스트 모듈은 테스트를 포함하는 .NET 어셈블리를 나타냅니다.

테스트 모듈을 시작하려면 `TestModule.Create()`을(를) 호출하고 테스트가 위치한 모듈 이름이나 .NET 어셈블리 이름을 전달하세요.

모든 테스트가 완료되면 `module.Close()` 또는 `module.CloseAsync()`를 호출하세요. 그러면 라이브러리가 남은 모든 테스트 결과를 백엔드로 전송합니다.

### 테스트 모음 {#test-suites}

테스트 모음은 일련의 테스트로 구성됩니다. 테스트 모음은 공통 초기화 및 정리 메서드를 가질 수 있으며 일부 변수를 공유할 수 있습니다. .NET에서 테스트 모음은 일반적으로 여러 테스트 메서드를 포함하는 테스트 클래스나 픽스처로 구현됩니다. 테스트 모음은 필요시 속성이나 오류 정보와 같은 추가 정보를 가질 수 있습니다.

`module.GetOrCreateSuite()`를 호출하고 테스트 모음 이름을 전달하여 테스트 모듈에서 테스트 모음을 생성하세요.

테스트 모음 내의 관련 테스트가 모두 실행을 마치면 `suite.Close()`를 호출하세요.

### 테스트 {#tests}

각 테스트는 테스트 모음 내에서 실행되며 `TestStatus.Pass`, `TestStatus.Fail`, `TestStatus.Skip` 중 하나의 상태로 종료되어야 합니다.

테스트는 다음과 같은 부수적인 정보를 포함할 수 있습니다.

- 파라미터
- 속성
- 오류 정보
- 테스트 특성
- 벤치마크 데이터

`suite.CreateTest()`를 호출하고 테스트 이름을 전달하여 테스트 모음에서 테스트를 생성하세요. 테스트가 종료되면 미리 정의된 상태 중 하나를 전달하여 `test.Close()`를 호출하세요.

### 코드 예시 {#code-example}

다음은 API를 사용한 단순한 코드 예시입니다.

{{< code-block lang="csharp" >}}
using System.Reflection;
using Datadog.Trace.Ci;

var module = TestModule.Create(Assembly.GetExecutingAssembly().GetName().Name ?? "(dyn_module)");
module.SetTag("ModuleTag", "Value");

var suite = module.GetOrCreateSuite("MySuite");
suite.SetTag("SuiteTag", 42);

var test = suite.CreateTest("Test01");
test.SetTag("TestTag", "Value");
test.SetParameters(new TestParameters
{
    Arguments = new Dictionary<string, object>
    {
        ["a"] = 42,
        ["b"] = 0,
    }
});
test.SetTraits(new Dictionary<string, List<string>>
{
    ["Category"] = new () { "UnitTest" }
});

try
{
    var a = 42;
    var b = 0;
    var c = a / b;
}
catch (Exception ex)
{
    test.SetErrorInfo(ex);
}

test.Close(TestStatus.Fail);
suite.Close();
await module.CloseAsync();
{{< /code-block >}}

모든 테스트 데이터가 Datadog에 전송되도록 항상 마지막에 `module.Close()` 또는 `module.CloseAsync()`를 호출하세요.

## 모범 사례 {#best-practices}

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우, 기본값은 CI 작업 이름과 테스트 명령입니다. CI 작업 이름을 사용할 수 없는 경우 테스트 명령이 사용됩니다.

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

#### `DD_TEST_SESSION_NAME` 사용 시점 {#when-to-use-dd-test-session-name}

Datadog은 테스트 세션 간의 대응 관계를 설정하기 위해 일련의 파라미터를 검사합니다. 테스트를 실행하는 데 사용된 테스트 명령이 그중 하나입니다. 테스트 명령에 임시 폴더와 같이 실행할 때마다 변경되는 문자열이 포함되어 있으면 Datadog은 해당 세션들이 서로 관련이 없다고 간주합니다. 예:

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

테스트 명령이 실행마다 달라지는 경우 Datadog은 `DD_TEST_SESSION_NAME` 사용을 권장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/continuous_integration/tests/setup/dotnet/?tab=onpremisesciproviderdatadogagent#instrumenting-benchmarkdotnet-tests
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /ko/getting_started/tagging/unified_service_tagging
[7]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /ko/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /ko/tests/guides/add_custom_measures/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /ko/continuous_integration/tests/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /ko/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/
[16]: https://github.com/microsoft/codecoverage/blob/main/docs/instrumentation.md
[17]: https://github.com/microsoft/codecoverage/blob/main/samples/Calculator/scenarios/scenario07/README.md
[18]: /ko/tracing/trace_collection/compatibility/dotnet-framework/
[19]: /ko/tracing/trace_collection/compatibility/dotnet-core/