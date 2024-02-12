---
title: Python Tests
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /continuous_integration/setup_tests/python
  - /continuous_integration/tests/python
  - continuous_integration/tests/setup/python
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">
  If your CI provider is Jenkins, you can use <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">UI-based configuration</a> to enable Test Visibility for your jobs and pipelines.
</div>

## Compatibility

Supported languages:

| Language | Version |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

Supported test frameworks:

| Test Framework | Version |
|---|---|
| `pytest` | >= 3.0.0 <= 7.0.0 (8.0.0 support under way)|
| `pytest-benchmark` | >= 3.1.0 |
| `pytest-xdist` | Supported with limitations |
| `unittest` | >= 3.7 |


## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog Python library:

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Installing the Python tracer

Install the Python tracer by running:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][4].

## Instrumenting your tests

{{< tabs >}}
{{% tab "pytest" %}}

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`, specifying the name of the service or library under test in the `DD_SERVICE` environment variable, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

If you also want to enable the rest of the APM integrations to get more information in your flamegraph, add the `--ddtrace-patch-all` option:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### Adding custom tags to tests

To add custom tags to your tests, declare `ddspan` as an argument in your test:

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][1] section of the Python custom instrumentation documentation.

### Adding custom metrics to tests

Just like tags, to add custom metrics to your tests, use the current active span:

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
Read more about custom metrics in the [Add Custom Metrics Guide][2].

### Known limitations

Plugins for `pytest` that alter test execution may cause unexpected behavior.

#### Parallelization

Plugins that introduce paralleization to `pytest` (such as [`pytest-xdist`][3] or [`pytest-forked`][4]) will create one session events for each parallelized instance, and may create multiple module or suite events if tests from the same package or module execute in different processes.

The overall count of test events (and their correctness) will remain unaffected, but individual session, module, or suite events may have inconsistent results with other events in the same `pytest` run.

#### Test ordering

Plugins that chage the ordering of test execution (such as [`pytest-randomly`][5]) may create multiple module or suite events, or may create module or suite events with unexpected durations, or results.

The overall count of test events (and their correctness) will remain unaffected.

[1]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /continuous_integration/guides/add_custom_metrics/?tab=python
[3]: https://pypi.org/project/pytest-xdist/
[4]: https://pypi.org/project/pytest-forked/
[5]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "pytest-benchmark" %}}

To instrument your benchmark tests with `pytest-benchmark`, run your benchmark tests with the `--ddtrace` option when running `pytest`, and Datadog detects metrics from `pytest-benchmark` automatically:

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

{{% /tab %}}

{{% tab "unittest" %}}

To enable instrumentation of `unittest` tests, run your tests by appending `ddtrace-run` to the beginning of your `unittest` command.

Make sure to specify the name of the service or library under test in the `DD_SERVICE` environment variable.
Additionally, you may declare the environment where tests are being run in the `DD_ENV` environment variable:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci ddtrace-run python -m unittest
{{< /code-block >}}

Alternatively, if you wish to enable `unittest` instrumentation manually, use `patch()` to enable the integration:

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

#### Known limitations

In some cases, if your `unittest` test execution is run in a parallel manner, this may break the instrumentation and affect test visibility.

Datadog recommends you use up to one process at a time to prevent affecting test visibility.

{{% /tab %}}

{{< /tabs >}}

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code or using environment variables:

`DD_SERVICE`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `pytest`<br/>
**Example**: `my-python-app`

`DD_ENV`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][8].

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

## Collecting Git metadata

{{% ci-git-metadata %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /tracing/trace_collection/dd_libraries/python/
[5]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/python/?tab=containers#configuration
[7]: /continuous_integration/guides/add_custom_metrics/?tab=python
[8]: /getting_started/tagging/unified_service_tagging