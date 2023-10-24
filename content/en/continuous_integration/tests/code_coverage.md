---
title: Code Coverage in Datadog
kind: documentation
description: Learn how to report and use code coverage in Datadog.
aliases:
- /continuous_integration/guides/code_coverage/
- /continuous_integration/integrate_tests/code_coverage/
further_reading:
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "/monitors/types/ci"
  tag: "Documentation"
  text: "Learn about CI Monitors"
---

## Overview

Code coverage is a measure of the total code coverage percentage that a module or session exercises.

Ensure that [Test Visibility][1] is already set up for your language.

## Report code coverage

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibility

* `dd-trace>=3.20.0`.
* `jest>=24.8.0`, only when run with `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.

When tests are instrumented with [Istanbul][1], the Datadog Tracer reports code coverage under the `test.code_coverage.lines_pct` tag for your test sessions automatically.

To instrument tests with Istanbul, you can use [`nyc`][2]:

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

Then, use:

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```

Jest includes Istanbul by default, so you can do:

```json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  }
}
```

Then, use:

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run test:coverage
```



[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibility
* `dd-trace>=2.31.0`.

When code coverage is available, the Datadog Tracer (v2.31.0 or later) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

If you are using [Coverlet][101] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer’s built-in code coverage calculation with the `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` env variable.

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


See [Customize code coverage analysis][102] in the Microsoft documentation for additional information.

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

[101]: https://github.com/coverlet-coverage/coverlet
[102]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}

{{% tab "JUnit Report Uploads" %}}

### Compatibility
* `datadog-ci>=2.17.2`.

You can upload a code coverage percentage value when using JUnit Report uploads:

```shell
datadog-ci junit upload --service <service_name> --report-metrics=test.code_coverage.lines_pct:85 <path>
```

In this example, `85` is the percentage of lines covered by your tests and needs to be generated with a different tool.

The code coverage report needs to be generated in a different process, otherwise the JUnit report uploads will not generate code coverage reports. The reported metric name must be `test.code_coverage.lines_pct`.

{{% /tab %}}

{{< /tabs >}}

## Graph code coverage

Reported code coverage appears on the **Coverage** tab in a test session's details page:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## Export your graph

You can export your graph to a [dashboard][2] or a [notebook][3], and create a [monitor][4] based on it by clicking the **Export** button:

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## Add a monitor

Get alerted whenever code coverage for your service drops below a certain threshold by creating a [CI Test Monitor][5]:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Test sessions code coverage tab" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/
[2]: /dashboards
[3]: /notebooks
[4]: /monitors
[5]: /monitors/types/ci/#maintain-code-coverage-percentage