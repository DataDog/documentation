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

Before you can follow this guide, make sure that [Test Visibility][1] is already set up for your language.

{{< tabs >}}
{{% tab "Javascript/Typescript" %}}

### Compatibility

* `dd-trace>=3.20.0`.
* `jest>=24.8.0`, only when run with `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.

When tests are instrumented with [Istanbul][1], the Datadog Tracer reports code coverage under the `test.code_coverage.lines_pct` tag for your test sessions automatically.

To instrument tests with Istanbul, the easiest way is to use [`nyc`][2]:

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

Then use:

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```

Jest includes istanbul by default, so you can simply do:

```json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  }
}
```

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run test:coverage
```



[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibility
* `dd-trace>=2.31.0`.

When code coverage is available, the Datadog Tracer (v2.31.0+) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

If you are using [Coverlet][1] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer’s built-in code coverage calculation with the env var `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.


[1]: https://github.com/coverlet-coverage/coverlet
{{% /tab %}}
{{< /tabs >}}

### Graph code coverage

The reported code coverage can be seen in the **Coverage** tab in the test session detail:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


### Export your graph

It is possible to export your graph to a [dashboard][2] or a [notebook][3] and even create a [monitor][4] based on it. Click **Export** on the right side:

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:100%" >}}


### Add a monitor

Get alerted whenever code coverage for your service drops below a certain threshold:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Test sessions code coverage tab" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/
[2]: /dashboards
[3]: /notebooks
[4]: /monitors
