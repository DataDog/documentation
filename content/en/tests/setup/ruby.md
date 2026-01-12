---
title: Ruby Tests
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
    - /continuous_integration/setup_tests/ruby
    - /continuous_integration/tests/ruby
    - /continuous_integration/tests/setup/ruby
further_reading:
    - link: '/continuous_integration/tests/containers/'
      tag: 'Documentation'
      text: 'Forwarding Environment Variables for Tests in Containers'
    - link: '/continuous_integration/tests'
      tag: 'Documentation'
      text: 'Explore Test Results and Performance'
    - link: '/tests/troubleshooting/'
      tag: 'Documentation'
      text: 'Troubleshooting Test Optimization'
---

## Compatibility

Supported languages:

| Language | Version |
| -------- | ------- |
| Ruby     | >= 2.7  |
| JRuby    | >= 9.4  |

Supported test frameworks:

| Test Framework | Version  |
| -------------- | -------- |
| RSpec          | >= 3.0.0 |
| Minitest       | >= 5.0.0 |
| Cucumber       | >= 3.0   |

Supported test runners:

| Test runner    | Version   |
| -------------- | --------- |
| Knapsack Pro   | >= 7.2.0  |
| parallel_tests | >= 4.0.0  |
| ci-queue       | >= 0.53.0 |

## Configuring reporting method

To report test results to Datadog, you need to configure the `datadog-ci` gem:

{{< tabs >}}
{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Manual instrumentation

<div class="alert alert-info">
This section is <strong>only required</strong> if your CI provider does not support auto-instrumentation. If you selected <strong>CI Provider with Auto-Instrumentation Support</strong> in the <a href="#configuring-reporting-method">Configuring reporting method</a> section above, skip this section and proceed to <a href="#configuration-settings">Configuration settings</a>.
</div>

If your CI provider does not support auto-instrumentation (for example, if you selected **Cloud CI provider (Agentless)** or **On-Premises CI Provider (Datadog Agent)**), follow these steps to install the library and instrument your tests manually.

1. Add the [Ruby test optimization gem][10] to your Gemfile:

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. Set the following required environment variables:

`DD_CIVISIBILITY_ENABLED=true` (Required)
: Enables the Test Optimization product.

`DD_ENV` (Required)
: Environment where the tests are being run (`ci` when running them on a CI provider).

3. [Configure the reporting method](#configuring-reporting-method)

4. Set `RUBYOPT` environment variable:

`RUBYOPT="-rbundler/setup -rdatadog/ci/auto_instrument"`

5. Run your tests as you normally do.

5a. (Optional) If you would prefer not to set `RUBYOPT` environment variable, prepend `bundle exec ddcirb exec` to your test command:

```bash
bundle exec ddcirb exec rspec
```

## Configuration settings

The following is a list of the most important configuration settings that can be used with the test optimization library:

`DD_CIVISIBILITY_ENABLED=true` (Required)
: Enables the Test Optimization product.
**Default**: `false`

`DD_ENV` (Required)
: Environment where the tests are being run (`ci` when running them on a CI provider).
**Default**: `none`
**Example**: `ci`

`DD_SERVICE` (Optional)
: Name of the service or library under test.
**Default**: `$PROGRAM_NAME`<br/>
**Example**: `my-ruby-app`

`DD_TEST_SESSION_NAME` (Optional)
: Use this to identify a group of tests (see ["Test session name"](#test-session-name-dd_test_session_name))
**Example**: `integration-tests`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][4].

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][5] options can also be used.

## Adding custom tags to tests

You can add custom tags to your tests by using the current active test:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][2] section of the Ruby custom instrumentation documentation.

## Adding custom measures to tests

Like tags, you can add custom measures to your tests by using the current active test:

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

For more information on custom measures, see the [Add Custom Measures Guide][3].

## Using additional instrumentation

It can be useful to have rich tracing information about your tests that includes time spent performing database operations or other external calls, as seen in the following flame graph:

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Test trace with Redis instrumented" >}}

You can enable automatic APM instrumentation by adding the following line in your `test_helper/spec_helper`:

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Note**: In CI mode, these traces are submitted to Test Optimization, and they do **not** show up in Datadog APM.

For the full list of available instrumentation methods, see the [tracing documentation][6]

## Collecting Git metadata

{{% ci-git-metadata %}}

## Using library's public API for unsupported test frameworks

If you use RSpec, Minitest, or Cucumber, **do not use the manual testing API**, as Test Optimization automatically instruments them and sends the test results to Datadog. The manual testing API is **incompatible** with already supported testing frameworks.

Use the manual testing API only if you use an unsupported testing framework or have a different testing mechanism.
Full public API documentation is available on [YARD site][8].

### Domain model

The API is based around four concepts: test session, test module, test suite, and test.

#### Test session

A test session represents a test command run.

To start a test session, call `Datadog::CI.start_test_session` and pass the Datadog service and tags (such as the test framework
you are using).

When all your tests have finished, call `Datadog::CI::TestSession#finish`, which closes the session and sends the session
trace to the backend.

#### Test module

A test module represents a smaller unit of work within a session.
For supported test frameworks, test module is always same as test session.
For your use case, this could be a package in your componentized application.

To start a test module, call `Datadog::CI.start_test_module` and pass the name of the module.

When the module run has finished, call `Datadog::CI::TestModule#finish`.

#### Test suite

A test suite comprises a set of tests that test similar functionality.
A single suite usually corresponds to a single file where tests are defined.

Create test suites by calling `Datadog::CI#start_test_suite` and passing the name of the test suite.

Call `Datadog::CI::TestSuite#finish` when all the related tests in the suite have finished their execution.

#### Test

A test represents a single test case that is executed as part of a test suite.
Usually it corresponds to a method that contains testing logic.

Create tests in a suite by calling `Datadog::CI#start_test` or `Datadog::CI.trace_test` and passing the name of the test and name of the test suite. Test suite name must be the same as name of the test suite started in previous step.

Call `Datadog::CI::Test#finish` when a test has finished execution.

### Code example

The following code represents example usage of the API:

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## Best practices

### Test session name `DD_TEST_SESSION_NAME`

Use `DD_TEST_SESSION_NAME` to define the name of the test session and the related group of tests. Examples of values for this tag would be:

-   `unit-tests`
-   `integration-tests`
-   `smoke-tests`
-   `flaky-tests`
-   `ui-tests`
-   `backend-tests`

If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

-   CI job name
-   Command used to run the tests (such as `yarn test`)

The test session name needs to be unique within a repository to help you distinguish different groups of tests.

#### When to use `DD_TEST_SESSION_NAME`

There's a set of parameters that Datadog checks to establish correspondence between test sessions. The test command used to execute the tests is one of them. If the test command contains a string that changes for every execution, such as a list of files to execute, Datadog considers the sessions to be unrelated to each other. For example:

-   `bundle exec rspec my_spec.rb my_other_spec.rb`

Datadog recommends using `DD_TEST_SESSION_NAME` if your test commands vary between executions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /tests/guides/add_custom_measures/?tab=ruby
[4]: /getting_started/tagging/unified_service_tagging
[5]: /tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
[10]: https://github.com/DataDog/datadog-ci-rb
