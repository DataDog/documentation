---
title: Python Tests
code_lang: python
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /continuous_integration/setup_tests/python
  - /continuous_integration/tests/python
  - /continuous_integration/tests/setup/python
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

## Compatibility

Supported languages:

| Language | Version |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

Supported test frameworks:

| Test Framework | Version |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog Python library:

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

## Installing the Python tracer

Install the Python tracer by running:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][1].

## Instrumenting your tests

{{< tabs >}}
{{% tab "pytest" %}}

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`.

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

If you also want to enable the rest of the APM integrations to get more information in your flamegraph, add the `--ddtrace-patch-all` option:

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

For additional configuration see [Configuration Settings][3].

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

### Adding custom measures to tests

Just like tags, to add custom measures to your tests, use the current active span:

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
Read more about custom measures in the [Add Custom Measures Guide][2].

[1]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
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

For additional configurations, see [Configuration Settings][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

To enable instrumentation of `unittest` tests, run your tests by appending `ddtrace-run` to the beginning of your `unittest` command.

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
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

For additional configurations, see [Configuration Settings][1].

[1]: #configuration-settings
{{% /tab %}}

{{% tab "Manual instrumentation (beta)" %}}

### Manual testing API

<div class="alert alert-warning">The Test Optimization manual testing API is in <strong>beta</strong> and subject to change.</div>

As of version `2.13.0`, the [Datadog Python tracer][1] provides the Test Optimization API (`ddtrace.ext.test_visibility`) to submit test optimization results as needed.

#### API execution

The API uses classes to provide namespaced methods to submit test optimization events.

Test execution has two phases:
- Discovery: inform the API what items to expect
- Execution: submit results (using start and finish calls)

The distinct discovery and execution phases allow for a gap between the test runner process collecting the tests and the tests starting.

API users must provide consistent identifiers (described below) that are used as references for Test Optimization items within the API's state storage.

##### Enable `test_visibility`

You must call the `ddtrace.ext.test_visibility.api.enable_test_visibility()` function before using the Test Optimization API.

Call the `ddtrace.ext.test_visibility.api.disable_test_visibility()` function before process shutdown to ensure proper flushing of data.

#### Domain model

The API is based around four concepts: test session, test module, test suite, and test.

Modules, suites, and tests form a hierarchy in the Python Test Optimization API, represented by the item identifier's parent relationship.

##### Test session

A test session represents a project's test execution, typically corresponding to the execution of a test command. Only one session can be discovered, started, and finished in the execution of Test Optimization program.

Call `ddtrace.ext.test_visibility.api.TestSession.discover()` to discover the session, passing the test command, a given framework name, and version.

Call `ddtrace.ext.test_visibility.api.TestSession.start()` to start the session.

When tests have completed, call `ddtrace.ext.test_visibility.api.TestSession.finish()` .


##### Test module

A test module represents a smaller unit of work within a project's tests run (a directory, for example).

Call `ddtrace.ext.test_visibility.api.TestModuleId()`, providing the module name as a parameter, to create a `TestModuleId`.

Call `ddtrace.ext.test_visibility.api.TestModule.discover()`, passing the `TestModuleId` object as an argument, to discover the module.

Call `ddtrace.ext.test_visibility.api.TestModule.start()`, passing the `TestModuleId` object as an argument, to start the module.

After all the children items within the module have completed, call `ddtrace.ext.test_visibility.api.TestModule.finish()`, passing the `TestModuleId` object as an argument.


##### Test suite

A test suite represents a subset of tests within a project's modules (`.py` file, for example).

Call `ddtrace.ext.test_visibility.api.TestSuiteId()`, providing the parent module's `TestModuleId` and the suite's name as arguments, to create a `TestSuiteId`.

Call `ddtrace.ext.test_visibility.api.TestSuite.discover()`, passing the `TestSuiteId` object as an argument, to discover the suite.

Call `ddtrace.ext.test_visibility.api.TestSuite.start()`, passing the `TestSuiteId` object as an argument, to start the suite.

After all the child items within the suite have completed, call `ddtrace.ext.test_visibility.api.TestSuite.finish()`, passing the `TestSuiteId` object as an argument.

##### Test

A test represents a single test case that is executed as part of a test suite.

Call `ddtrace.ext.test_visibility.api.TestId()`, providing the parent suite's `TestSuiteId` and the test's name as arguments, to create a `TestId`. The `TestId()` method accepts a JSON-parseable string as the optional `parameters` argument. The `parameters` argument can be used to distinguish parametrized tests that have the same name, but different parameter values.

Call `ddtrace.ext.test_visibility.api.Test.discover()`, passing the `TestId` object as an argument, to discover the test. The `Test.discover()` classmethod accepts a string as the optional `resource` parameter, which defaults to the `TestId`'s `name`.

Call `ddtrace.ext.test_visibility.api.Test.start()`, passing the `TestId` object as an argument, to start the test.

Call `ddtrace.ext.test_visibility.api.Test.mark_pass()`, passing the `TestId` object as an argument, to mark that the test has passed successfully.
Call `ddtrace.ext.test_visibility.api.Test.mark_fail()`, passing the `TestId` object as an argument, to mark that the test has failed. `mark_fail()` accepts an optional `TestExcInfo` object as the `exc_info` parameter.
Call `ddtrace.ext.test_visibility.api.Test.mark_skip()`, passing the `TestId` object as an argument, to mark that the test was skipped. `mark_skip()` accepts an optional string as the `skip_reason` parameter.

###### Exception information

The `ddtrace.ext.test_visibility.api.Test.mark_fail()` classmethod holds information about exceptions encountered during a test's failure.

The `ddtrace.ext.test_visibility.api.TestExcInfo()` method takes three positional parameters:
- `exc_type`: the type of the exception encountered
- `exc_value`: the `BaseException` object for the exception
- `exc_traceback`: the `Traceback` object for the exception

###### Codeowner information

The `ddtrace.ext.test_visibility.api.Test.discover()` classmethod accepts an optional list of strings as the `codeowners` parameter.

###### Test source file information

The `ddtrace.ext.test_visibility.api.Test.discover()` classmethod accepts an optional `TestSourceFileInfo` object as the `source_file_info` parameter. A `TestSourceFileInfo` object represents the path and optionally, the start and end lines for a given test.

The `ddtrace.ext.test_visibility.api.TestSourceFileInfo()` method accepts three positional parameters:
- `path`: a `pathlib.Path` object (made relative to the repo root by the `Test Optimization` API)
- `start_line`: an optional integer representing the start line of the test in the file
- `end_line`: an optional integer representing the end line of the test in the file

###### Setting parameters after test discovery

The `ddtrace.ext.test_visibility.api.Test.set_parameters()` classmethod accepts a `TestId` object as an argument, and a JSON-parseable string, to set the `parameters` for the test.

**Note:** this overwrites the parameters associated with the test, but does not modify the `TestId` object's `parameters` field.

Setting parameters after a test has been discovered requires that the `TestId` object be unique even without the `parameters` field being set.

#### Code example

```python
from ddtrace.ext.test_visibility import api
import pathlib
import sys

if __name__ == "__main__":
    # Enable the Test Optimization service
    api.enable_test_visibility()

    # Discover items
    api.TestSession.discover("manual_test_api_example", "my_manual_framework", "1.0.0")
    test_module_1_id = api.TestModuleId("module_1")
    api.TestModule.discover(test_module_1_id)

    test_suite_1_id = api.TestSuiteId(test_module_1_id, "suite_1")
    api.TestSuite.discover(test_suite_1_id)

    test_1_id = api.TestId(test_suite_1_id, "test_1")
    api.Test.discover(test_1_id)

    # A parameterized test with codeowners and a source file
    test_2_codeowners = ["team_1", "team_2"]
    test_2_source_info = api.TestSourceFileInfo(pathlib.Path("/path/to_my/tests.py"), 16, 35)

    parametrized_test_2_a_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_a"}'
    )
    api.Test.discover(
        parametrized_test_2_a_id,
        codeowners=test_2_codeowners,
        source_file_info=test_2_source_info,
        resource="overriden resource name A",
    )

    parametrized_test_2_b_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_b"}'
    )
    api.Test.discover(
      parametrized_test_2_b_id,
      codeowners=test_2_codeowners,
      source_file_info=test_2_source_info,
      resource="overriden resource name B"
    )

    test_3_id = api.TestId(test_suite_1_id, "test_3")
    api.Test.discover(test_3_id)

    test_4_id = api.TestId(test_suite_1_id, "test_4")
    api.Test.discover(test_4_id)


    # Start and execute items
    api.TestSession.start()

    api.TestModule.start(test_module_1_id)
    api.TestSuite.start(test_suite_1_id)

    # test_1 passes successfully
    api.Test.start(test_1_id)
    api.Test.mark_pass(test_1_id)

    # test_2's first parametrized test succeeds, but the second fails without attaching exception info
    api.Test.start(parametrized_test_2_a_id)
    api.Test.mark_pass(parametrized_test_2_a_id)

    api.Test.start(parametrized_test_2_b_id)
    api.Test.mark_fail(parametrized_test_2_b_id)

    # test_3 is skipped
    api.Test.start(test_3_id)
    api.Test.mark_skip(test_3_id, skip_reason="example skipped test")

    # test_4 fails, and attaches exception info
    api.Test.start(test_4_id)
    try:
      raise(ValueError("this test failed"))
    except:
      api.Test.mark_fail(test_4_id, exc_info=api.TestExcInfo(*sys.exc_info()))

    # Finish suites and modules
    api.TestSuite.finish(test_suite_1_id)
    api.TestModule.finish(test_module_1_id)
    api.TestSession.finish()
```

For additional configurations, see [Configuration Settings][2].

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code or using environment variables:

`DD_TEST_SESSION_NAME`
: Identifies a group of tests, such as `integration-tests`, `unit-tests` or `smoke-tests`.<br/>
**Environment variable**: `DD_TEST_SESSION_NAME`<br/>
**Default**: (CI job name + test command)<br/>
**Example**: `unit-tests`, `integration-tests`, `smoke-tests`

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

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][2].

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][3] options can also be used.

## Collecting Git metadata

{{% ci-git-metadata %}}

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
- Command used to run the tests (such as `pytest --ddtrace`)

The test session name needs to be unique within a repository to help you distinguish different groups of tests.

#### When to use `DD_TEST_SESSION_NAME`

There's a set of parameters that Datadog checks to establish correspondence between test sessions. The test command used to execute the tests is one of them. If the test command contains a string that changes for every execution, such as a temporary folder, Datadog considers the sessions to be unrelated to each other. For example:

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommends using `DD_TEST_SESSION_NAME` if your test commands vary between executions.

## Known limitations

{{< tabs >}}

{{% tab "pytest" %}}

Plugins for `pytest` that alter test execution may cause unexpected behavior.

### Parallelization

Plugins that introduce parallelization to `pytest` (such as [`pytest-xdist`][1] or [`pytest-forked`][2]) create one session event for each parallelized instance.

There are several issues when these plugins are used together with `ddtrace`, although they have been resolved for `pytest-xdist` in recent versions of `dd-trace-py` (3.12.6 and later). For example, a session, module, or suite may pass even when individual tests fail. Likewise, all the tests may pass and the suite/session/module fail. This happens because these plugins create worker subprocesses, and spans created in the parent process may not reflect the results from the child processes. For this reason, **the usage of `ddtrace` together with `pytest-forked` is not supported at the moment, while `pytest-xdist` only has support for `ddtrace>=3.12.6`.**

Each worker reports test results to Datadog independently, so tests from the same module running in different processes generate separate module or suite events.

The overall count of test events (and their correctness) remains unaffected. Individual session, module, or suite events can have inconsistent results with other events in the same `pytest` run (with `pytest-forked`).

### Test ordering

Plugins that change the ordering of test execution (such as [`pytest-randomly`][3]) can create multiple module or suite events. The duration and results of module or suite events may also be inconsistent with the results reported by `pytest`.

The overall count of test events (and their correctness) remain unaffected.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

In some cases, if your `unittest` test execution is run in a parallel manner, this may break the instrumentation and affect test optimization.

Datadog recommends you use up to one process at a time to prevent affecting test optimization.

{{% /tab %}}

{{< /tabs >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/python/
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/trace_collection/library_config/python/?tab=containers#configuration
