---
title: Code Coverage in Datadog
description: Learn how to report and use code coverage in Datadog.
aliases:
- /continuous_integration/guides/code_coverage/
- /continuous_integration/integrate_tests/code_coverage/
- /continuous_integration/tests/code_coverage/
further_reading:
- link: "https://www.datadoghq.com/blog/gitlab-source-code-integration"
  tag: "Blog"
  text: "Troubleshoot faster with the GitLab Source Code integration in Datadog"
- link: "/tests"
  tag: "Documentation"
  text: "Learn about Test Optimization"
- link: "/monitors/types/ci"
  tag: "Documentation"
  text: "Learn about CI Monitors"
---

{{< callout url="#" btn_hidden="true" header="Try the Preview!" >}}
This Test Optimization feature is being deprecated and replaced by a new dedicated <a href="https://docs.datadoghq.com/code_coverage/">Code Coverage</a> product in Preview. 
{{< /callout >}}

## Overview

Code coverage is a measure of the total code coverage percentage that a module or session exercises.

Ensure that [Test Optimization][1] is already set up for your language.

## Report code coverage

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibility

* `dd-trace>=4.45.0` and `dd-trace>=5.21.0`.
* `jest>=24.8.0`, only when run with `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.
* `vitest>=2.0.0`.

<div class="alert alert-danger">
  <strong>Note</strong>: The DataDog Tracer does not generate code coverage. If your tests are run with code coverage enabled, <code>dd-trace</code> reports it under the <code>test.code_coverage.lines_pct</code> tag for your test sessions automatically.
</div>

#### Mocha/Cucumber-js

Only [`Istanbul`][1] code coverage is supported for `mocha` and `cucumber-js`.

To report total code coverage from your `mocha` and `cucumber-js` test sessions, install [`nyc`][2] and wrap your test commands:

1. Install `nyc`:
```
npm install --save-dev nyc
```

2. Wrap your test commands with `nyc`:
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest
Jest includes Istanbul by default, so you don't need to install `nyc`. Simply pass `--coverage`:

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

The only supported [`coverageProvider`][3] is `babel`, which is the default.

#### Vitest
Vitest requires extra dependencies for running with code coverage. See [vitest docs][4] for more information. After the dependencies are installed, pass `--coverage` to your test command:

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

After modifying your test commands, run your tests with the new `coverage` command:
```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibility
* `dd-trace>=2.31.0`.

When code coverage is available, the Datadog Tracer (v2.31.0 or later) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

If you are using [Coverlet][1] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer's built-in code coverage calculation with the `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` environment variable.

**Note**: `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` is only used when the command instrumented by `dd-trace ci run` is `dotnet test`, `dotnet vstest`, or `vstest.console`. For example, the results in the variable are ignored when running `dd-trace ci run -- coverlet TestAssembly.dll --target dotnet --targetargs "test TestAssembly.dll"`.

### Advanced options

The Datadog Tracer's built-in code coverage has support for both `Coverlet` and `VS Code Coverage` options through the `.runsettings` file.

#### File structure
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog Code Coverage settings -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Coverlet options

| Option                   | Summary                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | Exclude methods, classes or assemblies decorated with attributes from code coverage.                                                                                                                |
| ExcludeByFile            | Exclude specific source files from code coverage.                                                                                                                |
| Exclude                  | Exclude from code coverage analysis using filter expressions.                                                                                                  |

##### Attributes

You can exclude a method, an entire class, or assembly from code coverage by creating and applying the `ExcludeFromCodeCoverage` attribute present in the `System.Diagnostics.CodeAnalysis` namespace.

Exclude additional attributes with the `ExcludeByAttribute` property and the short name of the attribute (the type name without the namespace).

##### Source files

Exclude specific source files from code coverage with the `ExcludeByFile` property.

* Use a single or multiple paths, separated by comma.
* Use the file path or directory path with a wildcard (`*`), for example: `dir1/*.cs`.

##### Filters

Filters provide fine-grained control over what gets excluded using **filter expressions** with the following syntax:

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**Wildcards** are supported:

* `*` => matches zero or more characters
* `?` => the prefixed character is optional

**Examples**:

* `[*]*` => Excludes all types in all assemblies (nothing is instrumented)
* `[coverlet.*]Coverlet.Core.Coverage` => Excludes the `Coverage` class in the `Coverlet.Core` namespace belonging to any assembly that matches `coverlet.*` (for example, `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => Excludes all types belonging to the `Coverlet.Core.Instrumentation` namespace in any assembly
* `[coverlet.*.tests?]*` => Excludes all types in any assembly starting with `coverlet.` and ending with `.test` or `.tests` (the `?` makes the `s`  optional)
* `[coverlet.*]*,[*]Coverlet.Core*\` => Excludes assemblies matching `coverlet.*` and excludes all types belonging to the `Coverlet.Core` namespace in any assembly

#### VS code coverage options


See [Customize code coverage analysis][2] in the Microsoft documentation for additional information.

| Option                   | Summary                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Exclude methods, classes, or assemblies decorated with attributes from code coverage.                                                                                                                |
| Sources\Exclude          | Exclude specific source files from code coverage.                                                                                                                |

#### Runsettings example
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet configuration -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS Code Coverage configuration -->
                    <CodeCoverage>
                        <Attributes>
                            <Exclude>
                                <Attribute>^System\.ObsoleteAttribute$</Attribute>
                            </Exclude>
                        </Attributes>
                        <Sources>
                            <Exclude>
                                <Source>^MyFile\.cs$</Source>
                            </Exclude>
                        </Sources>
                    </CodeCoverage>
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

[1]: https://github.com/coverlet-coverage/coverlet
[2]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### Compatibility
* `dd-trace-java >= 1.24.2`.

When code coverage is available, the Datadog Tracer reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

[Jacoco][1] is supported as a code coverage library.

If your project already has Jacoco configured, the Datadog Tracer instruments it and reports the coverage data to Datadog automatically.

Otherwise, you can configure the tracer to add Jacoco to your test runs at runtime.
Use `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` environment variable to specify which [version of Jacoco][2] you want to have injected (for example: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### Compatibility

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* Only [`coverage.py`][1] and [`pytest-cov`][2] code coverage are supported.


When tests are instrumented with [`coverage.py`][1] or [`pytest-cov`][2], the Datadog Tracer reports code coverage under the `test.code_coverage.lines_pct` tag for your test sessions automatically.

To report total code coverage from your test sessions with [`coverage.py`][1], follow these steps:

1. Install `coverage`:
```
python3 -m pip install coverage
```

2. Run your test with the new `coverage` command:
```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

Alternatively, to report total code coverage from your test sessions with [`pytest-cov`][2], follow these steps:

1. Install `pytest`:
```
python3 -m pip install pytest
```

2. Install `pytest-cov`:
```
python3 -m pip install pytest-cov
```

3. Run your test by appending the `--cov` flag to your `pytest` command:
```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### Compatibility

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`.

<div class="alert alert-danger">
  <strong>Note</strong>: The DataDog library does not generate total code coverage. If your tests are run with code coverage enabled, <code>datadog-ci-rb</code> reports it under the <code>test.code_coverage.lines_pct</code> tag for your test sessions automatically.
</div>

If your project has [simplecov][1] configured, the datadog-ci-rb library instruments it and reports the coverage data to Datadog automatically under the `test.code_coverage.lines_pct` tag for your test sessions.

This feature is enabled by default. Use `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` environment variable to disable this feature (for example: `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`).

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### Compatibility

* `go test -cover`

<div class="alert alert-danger">
  <strong>Note</strong>: The DataDog library does not generate total code coverage. If your tests are run with code coverage enabled, <code>dd-trace-go</code> reports it under the <code>test.code_coverage.lines_pct</code> tag for your test sessions automatically.
</div>

If your tests are executed with the `-cover` flag, the Datadog library instruments it and automatically reports the coverage data to Datadog under the `test.code_coverage.lines_pct` tag for your test sessions.

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibility
* `dd-sdk-swift-testing>=2.5.3`.
* `Xcode>=14.3`.

When code coverage is enabled, the Datadog Tracer reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

To enable code coverage for Xcode projects you can follow this guide from Apple: [Enable code coverage in your test plan][1].

For SPM tests, add the `--enable-code-coverage` parameter to your `swift test` invocation.

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "JUnit Report Uploads" %}}

### Compatibility
* `datadog-ci>=2.17.2`.

You can upload a code coverage percentage value when using JUnit Report uploads:

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

In this example, `85` is the percentage of lines covered by your tests and needs to be generated with a different tool.

The code coverage report needs to be generated in a different process, otherwise the JUnit report uploads will not generate code coverage reports. The reported metric name must be `test.code_coverage.lines_pct`.

{{% /tab %}}
{{< /tabs >}}

## Graph code coverage

Reported code coverage is reported as `@test.code_coverage.lines_pct`, which represents the total percentage in the facet, and can be plotted as any other measure facet in the CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## Test Session coverage tab

Reported code coverage also appears on the **Coverage** tab in a test session's details page:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## Export your graph

You can export your graph to a [dashboard][2] or a [notebook][3], and create a [monitor][4] based on it by clicking the **Export** button:

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## Add a monitor

Get alerted whenever code coverage for your service drops below a certain threshold by creating a [CI Test Monitor][5]:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## See your branch's code coverage evolution

You can also see the code coverage's evolution on the [Branch Overview page][6] and check whether it's improving or worsening:

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## Show code coverage change of a pull request

The pull request's [test summary comment][7] shows the code coverage change of a GitHub pull request compared to the default branch.

## Test Impact Analysis and total code coverage

[Test Impact Analysis][8] does **not** automatically provide total code coverage measurements, even though it requires _per test_ code coverage to function.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tests/
[2]: /dashboards
[3]: /notebooks
[4]: /monitors
[5]: /monitors/types/ci/#maintain-code-coverage-percentage
[6]: /continuous_integration/tests/developer_workflows#branch-overview
[7]: /tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /tests/test_impact_analysis
