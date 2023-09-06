---
title: Code coverage in Datadog
kind: guide
description: Learn how to report and use code coverage in Datadog
further_reading:
  - link: "/continuous_integration/tests"
    tag: "Documentation"
    text: "Exploring tests"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}


## Report code coverage

Ensure that [Test Visibility][1] is already set up for your language.

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

### Advanced options (supported through .runsettings)

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
| ExcludeByAttribute       | Ignore methods, classes or assemblies decorated with attributes from code coverage.                                                                                                                |
| ExcludeByFile            | Ignore specific source files from code coverage.                                                                                                                |
| Exclude                  | Exclude from code coverage analysing using filter expressions.                                                                                                  |

##### Attributes
You can ignore a method, an entire class or assembly from code coverage by creating and applying the `ExcludeFromCodeCoverage` attribute present in the `System.Diagnostics.CodeAnalysis` namespace.

You can also ignore additional attributes by using the `ExcludeByAttribute` property (short name, that is the type name without the namespace)

##### Source files
You can also ignore specific source files from code coverage using the `ExcludeByFile` property

* Use single or multiple paths (separate by comma)
* Use file path or directory path with globbing (e.g `dir1/*.cs`)

##### Filters
Gives the ability to have fine grained control over what gets excluded using "filter expressions".

Syntax: `[Assembly-Filter]Type-Filter`

Wildcards

* `*` => matches zero or more characters
* `?` => the prefixed character is optional

Examples

* `[*]*` => Excludes all types in all assemblies (nothing is instrumented)
* `[coverlet.*]Coverlet.Core.Coverage` => Excludes the Coverage class in the `Coverlet.Core` namespace belonging to any assembly that matches `coverlet.*` (e.g `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => Excludes all types belonging to `Coverlet.Core.Instrumentation` namespace in any assembly
* `[coverlet.*.tests?]*` => Excludes all types in any assembly starting with `coverlet.` and ending with `.test` or `.tests` (the `?` makes the `s`  optional)
* `[coverlet.*]*,[*]Coverlet.Core*\` => Excludes assemblies matching `coverlet.*` and excludes all types belonging to the `Coverlet.Core` namespace in any assembly

#### [VS code coverage options](https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022)

| Option                   | Summary                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Ignore methods, classes or assemblies decorated with attributes from code coverage.                                                                                                                |
| Sources\Exclude          | Ignore specific source files from code coverage.                                                                                                                |

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

### Graph code coverage

Reported code coverage appears on the **Coverage** tab in a test session's details page:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


### Export your graph

You can export your graph to a [dashboard][2] or a [notebook][3] and create a [monitor][4] based on it.

Click **Export** on the right side:

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


### Add a monitor

Get alerted whenever code coverage for your service drops below a certain threshold using a CI Test Monitor:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Test sessions code coverage tab" style="width:100%" >}}

For more information, see [CI Monitors][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/
[2]: /dashboards
[3]: /notebooks
[4]: /monitors
[5]: /monitors/types/ci
