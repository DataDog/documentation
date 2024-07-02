---
title: .NET Tests
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /continuous_integration/setup_tests/dotnet
  - /continuous_integration/tests/dotnet
  - /continuous_integration/tests/setup/dotnet
further_reading:
    - link: /continuous_integration/tests/containers/
      tag: Documentation
      text: Forwarding Environment Variables for Tests in Containers
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/intelligent_test_runner/dotnet
      tag: Documentation
      text: Speed up your test jobs with Intelligent Test Runner
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">
  If your CI provider is Jenkins, you can use <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">UI-based configuration</a> to enable Test Visibility for your jobs and pipelines.
</div>

## Compatibility

Supported frameworks:

| Framework | Version |
|---|---|
| .NET Framework | >= 4.6.1 |
| .NET Core | >= 2.1 |
| .NET Core | >= 3.1 |
| .NET | >= 5 |
| .NET | >= 6 |
| .NET | >= 7 |
| .NET | >= 8 |

Supported test frameworks:

| Test Framework | Version |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog .NET library:

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog .NET library versions >= 2.5.1</div>

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Installing the .NET tracer CLI

Install or update the `dd-trace` command using one of the following ways:

- Using the .NET SDK by running the command:
   ```
   dotnet tool update -g dd-trace
   ```
- By downloading the appropriate version:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- Or by downloading [from the GitHub release page][5].

## Instrumenting tests

<div class="alert alert-warning"><strong>Note</strong>: For BenchmarkDotNet follow <a href="#instrumenting-benchmarkdotnet-tests">these instructions</a>.</div>

To instrument your test suite, prefix your test command with `dd-trace ci run`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< tabs >}}

{{% tab "dotnet test" %}}

By using <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

By using <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

All tests are automatically instrumented.

### Compatibility with Microsoft.CodeCoverage nuget package

Since `Microsoft.CodeCoverage` version `17.2.0` Microsoft introduced [dynamic instrumentation using the `.NET CLR Profiling API`][16] enabled by default only on Windows. Datadog's automatic instrumentation relies on the `.NET CLR Profiling API`. This API allows only one subscriber (for example, `dd-trace`). The use of CodeCoverage dynamic instrumentation breaks the automatic test instrumentation.

The solution is to switch from dynamic instrumentation to [static instrumentation][17]. Modify your `.runsettings` file with the following configuration knobs:

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

## 構成設定

コマンドライン引数または環境変数を使用して、CLI のデフォルト構成を変更できます。構成設定の完全なリストについては、以下を実行してください。

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

次のリストは、主要な構成設定のデフォルト値を示しています。

`--dd-service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-dotnet-app`

`--dd-env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`--agent-url`
: トレース収集のための Datadog Agent URL で、`http://hostname:port` の形式で指定します。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][6]. All other [Datadog Tracer configuration][7] options can also be used.

### テストにカスタムタグを追加する

テストにカスタムタグを追加するには、まず[カスタムインスツルメンテーション](#custom-instrumentation)を構成します。

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```csharp
// テスト内
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// テストは正常に続きます
// ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、.NET カスタムインスツルメンテーションドキュメントの[タグの追加][8]セクションを参照してください。

### Adding custom measures to tests

To add custom measures to tests, configure [custom instrumentation](#custom-instrumentation) first.

Just like tags, you can add custom measures to your tests by using the current active span:

```csharp
// テスト内
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// テストは正常に続きます
// ...
```

これらのタグに対して、フィルターや視覚化を作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、.NET カスタムインスツルメンテーションドキュメントの[タグの追加][8]セクションを参照してください。

Read more about custom Measures in the [Add Custom Measures Guide][9].

### コードカバレッジを報告する

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0 以降) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

If you are using [Coverlet][10] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer's built-in code coverage calculation with the `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` environment variable.

**注**: Intelligent Test Runner を使用する場合、トレーサーに内蔵されたコードカバレッジはデフォルトで有効になっています。

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

For more information about exclusion options, see [Code Coverage][11].

### BenchmarkDotNet テストのインスツルメンテーション

To instrument your benchmark tests, you need to:

1. [`Datadog.Trace.BenchmarkDotNet` NuGet パッケージ][12]をプロジェクトに追加します (例えば、`dotnet add package Datadog.Trace.BenchmarkDotNet` を使用します)。
2. `DatadogDiagnoser` 属性または `WithDatadog()` 拡張機能を使って、 `Datadog.Trace.BenchmarkDotNet` エクスポーターを使用するようにプロジェクトを構成してください。例:

{{< tabs >}}

{{% tab "[DatadogDiagnoser] 属性の使用" %}}
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

{{% tab "構成の使用" %}}
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

3. [報告方法を構成します][13]。
4. 通常通りベンチマークプロジェクトを実行すると、すべてのベンチマークテストが自動的にインスツルメンテーションされます。

{{% ci-git-metadata %}}

## カスタムインスツルメンテーション

<div class="alert alert-warning">
  <strong>注:</strong> カスタムインスツルメンテーションの設定は、<code>dd-trace</code> のバージョンに依存します。カスタムインスツルメンテーションを使用するには、<code>dd-trace</code> と <code>Datadog.Trace</code> の NuGet パッケージのバージョンを同期させておく必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. ツールのバージョンを取得するには、`dd-trace --version` を実行します。
2. 同じバージョンの `Datadog.Trace` [NuGet パッケージ][14]をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションのスパンやタグの追加方法については、[.NET カスタムインスツルメンテーションのドキュメント][15]を参照してください。

## 手動テスト API

<div class="alert alert-warning">
  <strong>注:</strong> 手動テスト API を使用するには、対象の .NET プロジェクトに <code>Datadog.Trace</code> NuGet パッケージを追加する必要があります。
</div>

.NET プロジェクトで XUnit、NUnit、MSTest を使用している場合、CI Visibility は自動的にインスツルメンテーションを行い、Datadog にテスト結果を送信します。サポートされていないテストフレームワークを使用している場合、または別のテストメカニズムを持っている場合、代わりに API を使用して Datadog にテスト結果を報告することができます。

この API は、テストモジュール、テストスイート、テストの 3 つの概念に基づいています。

### テストモジュール

テストモジュールは、テストを含む .NET アセンブリを表します。

To start a test module, call `TestModule.Create()` and pass the name of the module or .NET assembly name where the tests are located.

When all your tests have finished, call `module.Close()` or `module.CloseAsync()`, which forces the library to send all remaining test results to the backend.

### テストスイート

A test suite comprises a set of tests. They can have a common initialization and teardown methods and share some variables. In .NET, they are usually implemented as a Test class or fixture containing multiple test methods. A test suite can optionally have additional information like attributes or error information.

Create test suites in the test module by calling `module.GetOrCreateSuite()` and passing the name of the test suite.

スイートの中の関連するテストがすべて実行を終えたら `suite.Close()` を呼び出します。

### テスト

Each test runs inside a suite and must end in one of these three statuses: `TestStatus.Pass`, `TestStatus.Fail`, or `TestStatus.Skip`.

テストは、オプションで以下のような付加情報を持つことができます。

- パラメーター
- 属性
- エラー情報
- テスト特性
- ベンチマークデータ

`suite.CreateTest()` を呼び出し、テストの名前を渡すことで、スイート内のテストを作成します。テストが終了したら、あらかじめ定義されたステータスのいずれかを指定して `test.Close()` を呼び出します。

### API インターフェイス

{{< code-block lang="csharp" >}}
namespace Datadog.Trace.Ci
{
    /// <summary>
    /// CI Visibility テストモジュール
    /// </summary>
    public sealed class TestModule
    {
        /// <summary>
        /// テストフレームワークを取得します
        /// </summary>
        public string? Framework { get; }
        /// <summary>
        /// モジュール名を取得します
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// テストモジュールの開始日を取得します
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <remarks>可能な限り CloseAsync() バージョンを使用します。</remarks>
        public void Close() { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <remarks>可能な限り CloseAsync() バージョンを使用します。</remarks>
        /// <param name="duration">テストモジュールの期間</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <returns>タスクインスタンス </returns>
        public System.Threading.Tasks.Task CloseAsync() { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <param name="duration">テストモジュールの期間</param>
        /// <returns>タスクインスタンス </returns>
        public System.Threading.Tasks.Task CloseAsync(System.TimeSpan? duration) { }
        /// <summary>
        /// このセッションのために新しいテストスイートを作成します
        /// </summary>
        /// <param name="name">テストスイートの名前</param>
        /// <returns>テストスイートインスタンス</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name) { }
        /// <summary>
        /// このセッションのために新しいテストスイートを作成します
        /// </summary>
        /// <param name="name">テストスイートの名前</param>
        /// <param name="startDate">テストスイートの開始日</param>
        /// <returns>テストスイートインスタンス</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name, System.DateTimeOffset? startDate) { }
        /// <summary>
        /// 例外からエラー情報を設定します
        /// </summary>
        /// <param name="exception">例外インスタンス</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// エラー情報を設定します
        /// </summary>
        /// <param name="type">エラータイプ</param>
        /// <param name="message">エラーメッセージ</param>
        /// <param name="callStack">エラーのコールスタック</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// 数字タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// 文字列タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <param name="framework">テスティングフレームワーク名</param>
        /// <param name="frameworkVersion">テスティングフレームワークのバージョン</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <param name="framework">テスティングフレームワーク名</param>
        /// <param name="frameworkVersion">テスティングフレームワークのバージョン</param>
        /// <param name="startDate">テストセッション開始日</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
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

### コード例

次のコードは、API の簡単な使い方を表しています。

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

Always call `module.Close()` or `module.CloseAsync()` at the end so that all the test data is flushed to Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/setup/dotnet/?tab=onpremisesciproviderdatadogagent#instrumenting-benchmarkdotnet-tests
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /getting_started/tagging/unified_service_tagging
[7]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /tests/guides/add_custom_measures/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /continuous_integration/tests/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /tracing/trace_collection/custom_instrumentation/dotnet/
[16]: https://github.com/microsoft/codecoverage/blob/main/docs/instrumentation.md
[17]: https://github.com/microsoft/codecoverage/blob/main/samples/Calculator/scenarios/scenario07/README.md
