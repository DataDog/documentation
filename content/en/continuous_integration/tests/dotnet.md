---
title: .NET Tests
kind: documentation
aliases:
  - /continuous_integration/setup_tests/dotnet
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/intelligent_test_runner/dotnet"
      tag: "Documentation"
      text: "Speed up your test jobs with Intelligent Test Runner"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported .NET versions:
* .NET Framework 4.6.1 and above
* .NET Core 2.1, 3.1, .NET 5, and .NET 6

Supported test frameworks:
* xUnit 2.2 and above
* NUnit 3.0 and above
* MsTestV2 14 and above
* [BenchmarkDotNet 0.13.2][11] and above

### Test suite level visibility compatibility
[Test suite level visibility][1] is supported from `dd-trace-dotnet>=2.16.0`.

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog .NET library:

{{< tabs >}}

{{% tab "On-Premises CI provider (Datadog Agent)" %}}

If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If the CI provider is using a container-based executor, set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `http://localhost:8126`) to an endpoint that is accessible from within build containers, as using `localhost` inside the build references the container itself and not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.


[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog .NET library versions >= 2.5.1</div>

If you are using a cloud CI provider without access to the underlying worker nodes, such as GitHub Actions or CircleCI, configure the library to use the Agentless mode. For this, set the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure which [Datadog site][2] to which you want to send data.

`DD_SITE` (Required)
: The [Datadog site][2] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
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

- Or by downloading [from the github release page][5].

## Instrumenting tests

<div class="alert alert-warning"><strong>Note</strong>: For BenchmarkDotNet follow <a href="#instrumenting-benchmarkdotnet-tests">these instructions</a>.</div>

To instrument your test suite, prefix your test command with `dd-trace ci run`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< tabs >}}

{{% tab "dotnet test" %}}

By using <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

By using <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

All tests are automatically instrumented.

## Configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

The following list shows the default values for key configuration settings:

`--dd-service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: The repository name<br/>
**Example**: `my-dotnet-app`

`--dd-env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

`--agent-url`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

### Adding custom tags to tests

You can add custom tags to your tests by using the current active span:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][7] section of the .NET custom instrumentation documentation.

### Instrumenting BenchmarkDotNet tests

To instrument your benchmark tests you need to:

1. Add the [`Datadog.Trace.BenchmarkDotNet` NuGet package][12] to your project (for example, using `dotnet add package Datadog.Trace.BenchmarkDotNet`).
2. Configure your project to use the `Datadog.Trace.BenchmarkDotNet` exporter using the `DatadogDiagnoser` attribute or the `WithDatadog()` extension method. For example:

{{< tabs >}}

{{% tab "Using the [DatadogDiagnoser] Attribute" %}}
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

{{% tab "Using the Configuration" %}}
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

3. [Configure the reporting method][13].
4. Run the benchmark project as you normally do, all benchmark tests will be automatically instrumented.

### Collecting Git metadata

Datadog uses Git information for visualizing your test results and grouping them by repository, branch, and commit. Git metadata is automatically collected by the test instrumentation from CI provider environment variables and the local `.git` folder in the project path, if available.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

## Custom instrumentation

<div class="alert alert-warning">
  <strong>Note:</strong> Your custom instrumentation setup depends on the <code>dd-trace</code> version. To use the custom instrumentation, you must keep the package versions for <code>dd-trace</code> and <code>Datadog.Trace</code> NuGet packages in sync.
</div>

To use the custom instrumentation in your .NET application:

1. Execute `dd-trace --version` to get the version of the tool.
2. Add the `Datadog.Trace` [NuGet package][8] with the same version to your application.
3. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more information about how to add spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][9].

## Manual testing API

<div class="alert alert-warning">
  <strong>Note:</strong> To use the manual testing API, you must add the <code>Datadog.Trace</code> NuGet package in the target .NET project.
</div>

If you use XUnit, NUnit or MSTest with your .NET projects, CI Visibility will automatically instruments them and sends the results to the Datadog backend. If you use an unsupported testing framework or if you have a different testing mechanism, you can instead use the CI Visibility manual testing API, which also reports test results to the backend.

The API is based around three concepts: *test module*, *test suites*, and *tests*.

### Test module

A test module represents the .NET assembly that includes the tests.

To start a test module, call `TestModule.Create()` and pass the name of the module or .NET assembly name where the tests are located.

When all your tests have finished, call `module.Close()` or `module.CloseAsync()`, which forces the library to send all remaining test results to the backend.

### Test Suites

A test suite comprises a set of tests that share common functionality. They can share a common initialization and teardown, and can also share some variables. In the .NET world can be a Test class or fixture containing multiple test methods. A test suite can optionally have additional information like attributes or error information.

Create test suites in the test module by calling `module.GetOrCreateSuite()` and passing the name of the test suite.

Call `suite.Close()` when all the related tests in the suite have finished their execution.

### Tests

Each test runs inside a suite and must end in one of these three statuses: `TestStatus.Pass`, `TestStatus.Fail`, or `TestStatus.Skip`.

A test can optionally have additional information like:

- Parameters
- Attributes
- Error information
- Test traits
- Benchmark data

Create tests in a suite by calling `suite.CreateTest()` and passing the name of the test. When a test ends, call `test.Close()` with one of the predefined statuses.

### API interface

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

### Code example

The following code represents a simple usage of the API:

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

Always call `module.Close()` or `module.CloseAsync()` at the end so that all the test info is flushed to Datadog.

## Information collected

When CI Visibility is enabled, the following data is collected from your project:

* Test names and durations.
* Predefined environment variables set by CI providers.
* Git commit history including the hash, message, author information, and files changed (without file contents).
* Information from the CODEOWNERS file.

In addition to that, if [Intelligent Test Runner][10] is enabled, the following data is collected from your project:

* Code coverage information, including file names and line numbers covered by each test.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/#test-suite-level-visibility
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[7]: /tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[8]: https://www.nuget.org/packages/Datadog.Trace
[9]: /tracing/trace_collection/custom_instrumentation/dotnet/
[10]: /continuous_integration/intelligent_test_runner/
[11]: /continuous_integration/tests/dotnet/#instrumenting-benchmarkdotnet-tests
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /continuous_integration/tests/dotnet/#configuring-reporting-method
