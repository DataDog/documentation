---
aliases:
- /ko/continuous_integration/setup_tests/dotnet
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 설명서
  text: 테스트용 환경 변수를 컨테이너로 전달하기
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 설능 탐색
- link: /continuous_integration/intelligent_test_runner/dotnet
  tag: 설명서
  text: Intelligent Test Runner로 빠르게 테스트 작업 하기
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
kind: 설명서
title: .NET 테스트
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility는 현재 일부 사이트({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

지원되는 .NET 버전:
* .NET Framework 4.6.1 이상
* .NET Core 2.1, 3.1, .NET 5,및 .NET 6

지원되는 테스트 프레임워크:
* xUnit 2.2 이상
* NUnit 3.0 이상
* MsTestV2 14 이상
* [BenchmarkDotNet 0.13.2][1] 이상

### 테스트 스위트(suite) 수준 가시성 호환성
[테스트 스위트 수준 가시성][2]은 `dd-trace-dotnet>=2.16.0` 이상부터 지원됩니다.

## 보고 메서드 설정

Datadog에 테스트 결과를 보고하려면, Datadog .NET 라이브러리를 설정해야 합니다.

{{< tabs >}}
{{% tab "온프레미스 CI 공급자(Datadog 에이전트)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{% tab "Cloud CI 공급자(에이전트리스)" %}}

<div class="alert alert-info">에이전트리스 모드는 Datadog .NET 라이브러리 버전 2.5.1 이상에서 사용 가능합니다.</div>

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## .NET 트레이서 CLI 설치

다음 방법 중 하나를 사용해 `dd-trace` 명령을 설치하거나 업데이트하세요.

- 명령을 실행하여 .NET SDK 사용
   ```
   dotnet tool update -g dd-trace
   ```
- 적합한 버전 다운로드:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][3]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][4]
    * Linux-musl-x64(Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][5]

- 또는 [GitHub 릴리스 페이지][6]에서 다운로드하세요.

## 테스트 계측

<div class="alert alert-warning"><strong>Note</strong>:  BenchmarkDotNet의 경우 <a href="#instrumenting-benchmarkdotnet-tests">이 지침</a>을 따르세요.</div>

테스트 스위트를 계측하려면 테스트 명령을 접두어를 `dd-trace ci run`으로 하고 테스트 아래에서 서비스나 라이브러리 이름을  `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` 파라미터에 제공하세요.

{{< tabs >}}

{{% tab "dotnet test" %}}

<a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet 테스트</a> 사용

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

<a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a> 사용

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

모든 테스트는 자동으로 계측됩니다.

## 설정 세팅

명령줄 인수나 환경 변수를 사용해 CLI 기본 설정을 변경할 수 있습니다. 설정 전체 목록을 보려면 다음을 실행하세요.

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

다음 목록은 핵심 설정 기본값을 보여줍니다.

`--dd-service`
: 테스트 아래의 서비스 또는 라이브러리 이름입니다.<br/>
**환경 변수**: `DD_SERVICE`<br/>
**기본값**: 리포지토리 이름입니다.<br/>
**예**: `my-dotnet-app`

`--dd-env`
: 실행되는 테스트의 환경 이름입니다.<br/>
**환경 변수**: `DD_ENV`<br/>
**기본값**: `none`<br/>
**예**: `local`, `ci`

`--agent-url`
: `http://hostname:port` 형태의 트레이스 수집을 위한 Datadog 에이전트 URL입니다. <br/>
**환경 변수**: `DD_TRACE_AGENT_URL`<br/>
**기본값**: `http://localhost:8126`

모든 기타 [Datadog 트레이서 설정][7] 옵션도 사용할 수 있습니다.

### 테스트에 커스텀 태그 추가

테스트에 커스텀 태그를 추가하려면 먼저 [커스텀 계측](#custom-instrumentation)을 설정하세요.

현재 활성 스팬(span)을 사용해 테스트에 커스텀 태그를 추가할 수 있습니다.

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

이러한 태그를 위해 필터나 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 정보는 .NET 커스텀 계측 설명서의 [태그 추가][8] 섹션을 참조하세요.

### 테스트에 커스텀 메트릭 추가

테스트에 커스텀 메트릭을 추가하려면 먼저 [커스텀 계측](#custom-instrumentation)을 설정하세요.

태그와 같이 현재 활성화된 스팬을 사용해 테스트에 커스텀 메트릭을 추가할 수 있습니다. 

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

이러한 태그를 위해 필터나 시각화를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 정보는 .NET 커스텀 계측 설명서의 [태그 추가][8]를 참조하세요.

[커스텀 메트릭 추가 가이드][9]에서 커스텀 메트릭에 대해 자세히 알아보세요.

### 코드 검사 보고

코드 검사를 사용할 수 있는 경우 Datadog 트레이서(2.31.0 버전 이상)가 테스트 세션 동안 `test.code_coverage.lines_pct` 태그 아래에 이를 보고합니다.

코드 검사를 계산하는 데 [Coverlet][10]를 사용하는 경우, `dd-trace` 실행 시 `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 환경 변수에서 보고서 파일로의 경로를 지정합니다. 보고서 파일은 OpenCover 또는 Cobertura 형식이어야 합니다. 대신, `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 환경 변수를 사용해 Datadog 트레이서의 내장 코드 검사 계산을 활성화할 수 있습니다.

**참고**: 지능형 테스트 실행기를 사용하는 경우 트레이서의 내장 코드 검사가 기본적으로 활성화됩니다.

테스트 세션의 **검사** 탭에서 테스트 검사 내역을 확인할 수 있습니다.

[코드 검사 가이드][11]에서 Datadog 코드 검사에 대해 자세히 알아보세요.

### BenchmarkDotNet 테스트 계측

벤치마크 테스트를 계측하려면 다음을 수행해야 합니다.

1. 프로젝트에 [`Datadog.Trace.BenchmarkDotNet` NuGet 패키지][12]를 추가합니다(예: `dotnet add package Datadog.Trace.BenchmarkDotNet` 사용).
2. 프로젝트가 `DatadogDiagnoser` 속성 또는 `WithDatadog()` 확장 메서드를 통해 `Datadog.Trace.BenchmarkDotNet` 내보내기를 사용하도록 설정합니다.

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

{{% tab "설정 사용" %}}
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

3. [보고 메서드를 설정하세요][13].
4. 일상적인 방법으로 벤치마크 프로젝트 실행하세요. 모든 벤치마크 테스트가 자동으로 계측됩니다.

{{% ci-git-metadata %}}

## 커스텀 계측

<div class="alert alert-warning">
  <strong>참고:</strong> 커스텀 계측 설정은 <code>dd-trace</code> 버전에 따라 다릅니다. 커스텀 계측을 사용하려면 <code>dd-trace</code>및  <code>Datadog.Trace</code> NuGet 패키지의 버전을 동기화 상태로 유지해야 합니다.
</div>

.NET 애플리케이션에서 커스텀 계측을 사용하는 방법:

1. `dd-trace --version`을 실행해 도구의 버전을 찾습니다.
2. 동일한 버전의 `Datadog.Trace`[NuGet 패키지][14]를 애플리케이션에 추가합니다.
3. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 글로벌 트레이서에 액세스하여 새로운 스팬을 생성합니다.

커스텀 계측에 스팬과 태그를 추가하는 방법에 대한 자세한 정보는 [.NET 커스텀 계측 설명서][15]를 참조하세요.

## 수동 테스팅 API

<div class="alert alert-warning">
  <strong>참고:</strong> 수동 테스팅 API을 사용하려면 대상 .NET 프로젝트에 <code>Datadog.Trace</code> NuGet 패키지를 추가하세요.
</div>

.NET 프로젝트와 함께 XUnit, NUnit 또는 MSTest를 사용하는 경우 CI Visibility가 자동으로 계측하고 테스트 결과를 Datadog에 전송합니다. 지원되지 않는 테스팅 프레임워크를 사용하거나 다른 테스팅 메커니즘을 보유한 경우 대신 API를 사용해 테스트 결과를 Datadog에 보고할 수 있습니다.

API는 세 가지 개념, 즉 테스트 모듈, 테스트 스위트와 테스트를 기반으로 합니다.

### 테스트 모듈

테스트 모듈은 테스트에 포함되는 .NET 어셈블리를 나타냅니다.

테스트 모듈을 시작하려면 `TestModule.Create()`를 호출한 다음 테스트가 위치한 .NET 어셈블리 이름이나 모듈 이름을 전달합니다.

모든 테스트가 완료되면 `module.Close()` 또는 `module.CloseAsync()`를 호출합니다. 이 작업은 라이브러리가 남은 모든 테스트 결과를 백엔드로 전송하도록 합니다.

### 테스트 스위트

테스트 스위트는 일련의 테스트로 구성되어 있습니다. 일반적인 초기 설정과 해제(teardown) 메서드를 보유하고 있고 일부 변수를 공유합니다. .NET에서 테스트는 보통 여러 테스트 메서드를 포함하는 테스트 클래스나 픽스처로 도입됩니다. 테스트 스위트는 선택적으로 속성이나 오류 정보 등 추가 정보를 포함할 수 있습니다.

`module.GetOrCreateSuite()`를 호출하고 테스트 스위트 이름을 전달하여 테스트 모듈에서 테스트 스위트를 생성하세요.

스위트의 모든 관련 테스트가 실행을 완료한 경우 `suite.Close()`를 호출합니다.

### 테스트

스위트 내의 각 테스트는 다음 세 가지 상태로 종료되어야 합니다. `TestStatus.Pass`, `TestStatus.Fail` 또는 `TestStatus.Skip`입니다.

테스트는 다음과 같은 부수적인 정보를 포함할 수 있습니다.

- 파라미터
- 속성
- 오류 정보
- 테스트 특성
- 벤치마크 데이터

`suite.CreateTest()`를 호출하고 테스트 이름을 전달하여 스위트에서 테스트를 생성하세요. 테스트가 종료되면 사전 정의된 다음 상태 중 하나를 사용해 `test.Close()`를 호출하세요.

### API 인터페이스

{{< code-block lang="csharp" >}}
namespace Datadog.Trace.Ci
{
    /// <summary>
    /// CI Visibility test module
    /// </summary>
    public sealed class TestModule
    {
        /// <summary>
        /// Gets the test framework
        /// </summary>
        public string? Framework { get; }
        /// <summary>
        /// Gets the module name
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Gets the test module start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <remarks>Use CloseAsync() version whenever possible.</remarks>
        public void Close() { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <remarks>Use CloseAsync() version whenever possible.</remarks>
        /// <param name="duration">Duration of the test module</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <returns>Task instance </returns>
        public System.Threading.Tasks.Task CloseAsync() { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <param name="duration">Duration of the test module</param>
        /// <returns>Task instance </returns>
        public System.Threading.Tasks.Task CloseAsync(System.TimeSpan? duration) { }
        /// <summary>
        /// Create a new test suite for this session
        /// </summary>
        /// <param name="name">Name of the test suite</param>
        /// <returns>Test suite instance</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name) { }
        /// <summary>
        /// Create a new test suite for this session
        /// </summary>
        /// <param name="name">Name of the test suite</param>
        /// <param name="startDate">Test suite start date</param>
        /// <returns>Test suite instance</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name, System.DateTimeOffset? startDate) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <param name="framework">Testing framework name</param>
        /// <param name="frameworkVersion">Testing framework version</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <param name="framework">Testing framework name</param>
        /// <param name="frameworkVersion">Testing framework version</param>
        /// <param name="startDate">Test session start date</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion, System.DateTimeOffset startDate) { }
    }

    /// <summary>
    /// CI Visibility test suite
    /// </summary>
    public sealed class TestSuite
    {
        /// <summary>
        /// Gets the test module for this suite
        /// </summary>
        public Datadog.Trace.Ci.TestModule Module { get; }
        /// <summary>
        /// Gets the test suite name
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Gets the test suite start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Close test suite
        /// </summary>
        public void Close() { }
        /// <summary>
        /// Close test suite
        /// </summary>
        /// <param name="duration">Duration of the test suite</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Create a new test for this suite
        /// </summary>
        /// <param name="name">Name of the test</param>
        /// <returns>Test instance</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name) { }
        /// <summary>
        /// Create a new test for this suite
        /// </summary>
        /// <param name="name">Name of the test</param>
        /// <param name="startDate">Test start date</param>
        /// <returns>Test instance</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name, System.DateTimeOffset startDate) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
    }

    /// <summary>
    /// CI Visibility test
    /// </summary>
    public sealed class Test
    {
        /// <summary>
        /// Gets the test name
        /// </summary>
        public string? Name { get; }
        /// <summary>
        /// Gets the test start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Gets the test suite for this test
        /// </summary>
        public Datadog.Trace.Ci.TestSuite Suite { get; }
        /// <summary>
        /// Add benchmark data
        /// </summary>
        /// <param name="measureType">Measure type</param>
        /// <param name="info">Measure info</param>
        /// <param name="statistics">Statistics values</param>
        public void AddBenchmarkData(Datadog.Trace.Ci.BenchmarkMeasureType measureType, string info, in Datadog.Trace.Ci.BenchmarkDiscreteStats statistics) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        public void Close(Datadog.Trace.Ci.TestStatus status) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        /// <param name="duration">Duration of the test suite</param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        /// <param name="duration">Duration of the test suite</param>
        /// <param name="skipReason">In case </param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration, string? skipReason) { }
        /// <summary>
        /// Set benchmark metadata
        /// </summary>
        /// <param name="hostInfo">Host info</param>
        /// <param name="jobInfo">Job info</param>
        public void SetBenchmarkMetadata(in Datadog.Trace.Ci.BenchmarkHostInfo hostInfo, in Datadog.Trace.Ci.BenchmarkJobInfo jobInfo) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Set Test parameters
        /// </summary>
        /// <param name="parameters">TestParameters instance</param>
        public void SetParameters(Datadog.Trace.Ci.TestParameters parameters) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Set Test method info
        /// </summary>
        /// <param name="methodInfo">Test MethodInfo instance</param>
        public void SetTestMethodInfo(System.Reflection.MethodInfo methodInfo) { }
        /// <summary>
        /// Set Test traits
        /// </summary>
        /// <param name="traits">Traits dictionary</param>
        public void SetTraits(System.Collections.Generic.Dictionary<string, System.Collections.Generic.List<string>> traits) { }
    }

    /// <summary>
    /// Test status
    /// </summary>
    public enum TestStatus
    {
        /// <summary>
        /// Pass test status
        /// </summary>
        Pass = 0,
        /// <summary>
        /// Fail test status
        /// </summary>
        Fail = 1,
        /// <summary>
        /// Skip test status
        /// </summary>
        Skip = 2,
    }

    /// <summary>
    /// Test parameters
    /// </summary>
    public class TestParameters
    {
        /// <summary>
        /// Gets or sets the test arguments
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Arguments { get; set; }
        /// <summary>
        /// Gets or sets the test parameters metadata
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Metadata { get; set; }
    }

    /// <summary>
    /// Benchmark measurement discrete stats
    /// </summary>
    public readonly struct BenchmarkDiscreteStats
    {
        /// <summary>
        /// Kurtosis value
        /// </summary>
        public readonly double Kurtosis;
        /// <summary>
        /// Max value
        /// </summary>
        public readonly double Max;
        /// <summary>
        /// Mean value
        /// </summary>
        public readonly double Mean;
        /// <summary>
        /// Median value
        /// </summary>
        public readonly double Median;
        /// <summary>
        /// Min value
        /// </summary>
        public readonly double Min;
        /// <summary>
        /// Number of samples
        /// </summary>
        public readonly int N;
        /// <summary>
        /// 90 percentile value
        /// </summary>
        public readonly double P90;
        /// <summary>
        /// 95 percentile value
        /// </summary>
        public readonly double P95;
        /// <summary>
        /// 99 percentile value
        /// </summary>
        public readonly double P99;
        /// <summary>
        /// Skewness value
        /// </summary>
        public readonly double Skewness;
        /// <summary>
        /// Standard deviation value
        /// </summary>
        public readonly double StandardDeviation;
        /// <summary>
        /// Standard error value
        /// </summary>
        public readonly double StandardError;
        /// <summary>
        /// Initializes a new instance of the <see cref="BenchmarkDiscreteStats"/> struct.
        /// </summary>
        /// <param name="n">Number of samples</param>
        /// <param name="max">Max value</param>
        /// <param name="min">Min value</param>
        /// <param name="mean">Mean value</param>
        /// <param name="median">Median value</param>
        /// <param name="standardDeviation">Standard deviation value</param>
        /// <param name="standardError">Standard error value</param>
        /// <param name="kurtosis">Kurtosis value</param>
        /// <param name="skewness">Skewness value</param>
        /// <param name="p99">99 percentile value</param>
        /// <param name="p95">95 percentile value</param>
        /// <param name="p90">90 percentile value</param>
        public BenchmarkDiscreteStats(int n, double max, double min, double mean, double median, double standardDeviation, double standardError, double kurtosis, double skewness, double p99, double p95, double p90) { }
        /// <summary>
        /// Get benchmark discrete stats from an array of doubles
        /// </summary>
        /// <param name="values">Array of doubles</param>
        /// <returns>Benchmark discrete stats instance</returns>
        public static Datadog.Trace.Ci.BenchmarkDiscreteStats GetFrom(double[] values) { }
    }

    /// <summary>
    /// Benchmark host info
    /// </summary>
    public struct BenchmarkHostInfo
    {
        /// <summary>
        /// Chronometer Frequency
        /// </summary>
        public double? ChronometerFrequencyHertz;
        /// <summary>
        /// Chronometer resolution
        /// </summary>
        public double? ChronometerResolution;
        /// <summary>
        ///  Logical core count
        /// </summary>
        public int? LogicalCoreCount;
        /// <summary>
        /// OS Version
        /// </summary>
        public string? OsVersion;
        /// <summary>
        /// Physical core count
        /// </summary>
        public int? PhysicalCoreCount;
        /// <summary>
        /// Physical processor count
        /// </summary>
        public int? ProcessorCount;
        /// <summary>
        /// Processor max frequency hertz
        /// </summary>
        public double? ProcessorMaxFrequencyHertz;
        /// <summary>
        /// Processor Name
        /// </summary>
        public string? ProcessorName;
        /// <summary>
        /// Runtime version
        /// </summary>
        public string? RuntimeVersion;
    }

    /// <summary>
    /// Benchmark job info
    /// </summary>
    public struct BenchmarkJobInfo
    {
        /// <summary>
        /// Job description
        /// </summary>
        public string? Description;
        /// <summary>
        /// Job platform
        /// </summary>
        public string? Platform;
        /// <summary>
        /// Job runtime moniker
        /// </summary>
        public string? RuntimeMoniker;
        /// <summary>
        /// Job runtime name
        /// </summary>
        public string? RuntimeName;
    }

    /// <summary>
    /// Benchmark measure type
    /// </summary>
    public enum BenchmarkMeasureType
    {
        /// <summary>
        /// Duration in nanoseconds
        /// </summary>
        Duration = 0,
        /// <summary>
        /// Run time in nanoseconds
        /// </summary>
        RunTime = 1,
        /// <summary>
        /// Mean heap allocations in bytes
        /// </summary>
        MeanHeapAllocations = 2,
        /// <summary>
        /// Total heap allocations in bytes
        /// </summary>
        TotalHeapAllocations = 3,
        /// <summary>
        /// Application launch in nanoseconds
        /// </summary>
        ApplicationLaunch = 4,
        /// <summary>
        /// Garbage collector gen0 count
        /// </summary>
        GarbageCollectorGen0 = 5,
        /// <summary>
        /// Garbage collector gen1 count
        /// </summary>
        GarbageCollectorGen1 = 6,
        /// <summary>
        /// Garbage collector gen2 count
        /// </summary>
        GarbageCollectorGen2 = 7,
        /// <summary>
        /// Memory total operations count
        /// </summary>
        MemoryTotalOperations = 8,
    }
}
{{< /code-block >}}

### 코드 예시

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

마지막에 항상 `module.Close()` 또는 `module.CloseAsync()`를 호출하여 모든 테스트 데이터를 Datadog로 전송합니다.

{{% ci-information-collected %}}

이와 더불어 [지능형 테스트 실행기][16]가 활성화되면 다음 데이터가 프로젝트에서 수집됩니다.

* 파일 이름 및 각 테스트가 커버하는 줄 수를 포함한 코드 검사 정보

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/continuous_integration/tests/dotnet/#instrumenting-benchmarkdotnet-tests
[2]: /ko/continuous_integration/tests/#test-suite-level-visibility
[3]: https://dtdg.co/dd-trace-dotnet-win-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-x64
[5]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[6]: https://github.com/DataDog/dd-trace-dotnet/releases
[7]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /ko/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /ko/continuous_integration/guides/add_custom_metrics/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /ko/continuous_integration/guides/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /ko/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/
[16]: /ko/continuous_integration/intelligent_test_runner/