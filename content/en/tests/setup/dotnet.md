---
title: .NET Tests
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /continuous_integration/setup_tests/dotnet
  - /continuous_integration/tests/dotnet
  - /continuous_integration/tests/setup/dotnet
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/test_impact_analysis/dotnet"
      tag: "Documentation"
      text: "Speed up your test jobs with Test Impact Analysis"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

## Compatibility

For a list of supported runtimes and platforms, see [.NET Framework Compatibility][18] and [.NET/.NET Core Compatiblity][19].

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

{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Other Cloud CI Provider" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "On-Premises CI Provider" %}}
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

<div class="alert alert-warning">For BenchmarkDotNet follow <a href="#instrumenting-benchmarkdotnet-tests">these instructions</a>.</div>

To instrument your test suite, prefix your test command with `dd-trace ci run`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< tabs >}}

{{% tab "dotnet test" %}}

By using <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

By using <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
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

`test_session.name` (only available as an environment variable)
: Identifies a group of tests, such as `integration-tests`, `unit-tests` or `smoke-tests`.<br/>
**Environment variable**: `DD_TEST_SESSION_NAME`<br/>
**Default**: (CI job name + test command)<br/>
**Example**: `unit-tests`, `integration-tests`, `smoke-tests`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][6]. All other [Datadog Tracer configuration][7] options can also be used.

### Adding custom tags to tests

To add custom tags to tests, configure [custom instrumentation](#custom-instrumentation) first.

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

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][8] section of the .NET custom instrumentation documentation.

### Adding custom measures to tests

To add custom measures to tests, configure [custom instrumentation](#custom-instrumentation) first.

Just like tags, you can add custom measures to your tests by using the current active span:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

To create filters or visualizations for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][8] section of the .NET custom instrumentation documentation.

Read more about custom Measures in the [Add Custom Measures Guide][9].

### Reporting code coverage

When code coverage is available, the Datadog Tracer (v2.31.0 or later) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

If you are using [Coverlet][10] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer's built-in code coverage calculation with the `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` environment variable.

**Note**: When using Test Impact Analysis, the tracer's built-in code coverage is enabled by default.

You can see the evolution of the test coverage in the **Coverage** tab of a test session.

For more information about exclusion options, see [Code Coverage][11].

### Instrumenting BenchmarkDotNet tests

To instrument your benchmark tests, you need to:

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

{{% ci-git-metadata %}}

## Custom instrumentation

<div class="alert alert-danger">
  <strong>Note:</strong> Your custom instrumentation setup depends on the <code>dd-trace</code> version. To use the custom instrumentation, you must keep the package versions for <code>dd-trace</code> and <code>Datadog.Trace</code> NuGet packages in sync.
</div>

To use the custom instrumentation in your .NET application:

1. Execute `dd-trace --version` to get the version of the tool.
2. Add the `Datadog.Trace` [NuGet package][14] with the same version to your application.
3. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more information about how to add spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][15].

## Manual testing API

<div class="alert alert-danger">
  <strong>Note:</strong> To use the manual testing API, you must add the <code>Datadog.Trace</code> NuGet package in the target .NET project.
</div>

If you use XUnit, NUnit, or MSTest with your .NET projects, Test Optimization automatically instruments them and sends the test results to Datadog. If you use an unsupported testing framework or if you have a different testing mechanism, you can instead use the API to report test results to Datadog.

The API is based around three concepts: test module, test suites, and tests.

### Test module

A test module represents the .NET assembly that includes the tests.

To start a test module, call `TestModule.Create()` and pass the name of the module or .NET assembly name where the tests are located.

When all your tests have finished, call `module.Close()` or `module.CloseAsync()`, which forces the library to send all remaining test results to the backend.

### Test suites

A test suite comprises a set of tests. They can have a common initialization and teardown methods and share some variables. In .NET, they are usually implemented as a Test class or fixture containing multiple test methods. A test suite can optionally have additional information like attributes or error information.

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

Always call `module.Close()` or `module.CloseAsync()` at the end so that all the test data is flushed to Datadog.

## Best practices

### Test session name `DD_TEST_SESSION_NAME`

Use `DD_TEST_SESSION_NAME` to define the name of the test session and the related group of tests. Examples of values for this tag would be:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

- CI job name
- Command used to run the tests (such as `yarn test`)

The test session name needs to be unique within a repository to help you distinguish different groups of tests.

#### When to use `DD_TEST_SESSION_NAME`

There's a set of parameters that Datadog checks to establish correspondence between test sessions. The test command used to execute the tests is one of them. If the test command contains a string that changes for every execution, such as a temporary folder, Datadog considers the sessions to be unrelated to each other. For example:

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommends using `DD_TEST_SESSION_NAME` if your test commands vary between executions.

## Further reading

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
[18]: /tracing/trace_collection/compatibility/dotnet-framework/
[19]: /tracing/trace_collection/compatibility/dotnet-core/
