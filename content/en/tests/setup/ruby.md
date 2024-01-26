---
title: Ruby Tests
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/setup_tests/ruby
  - /continuous_integration/tests/ruby
  - continuous_integration/tests/setup/ruby
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

## Compatibility

Supported languages:

| Language | Version |
|---|---|
| Ruby | >= 2.7 |
| JRuby | >= 9.4 |

Supported test frameworks:

| Test Framework | Version |
|---|---|
| RSpec | >= 3.0.0 |
| Minitest | >= 5.0.0 |
| Cucumber | >= 3.0 |

## Configuring reporting method

To report test results to Datadog, you need to configure the `ddtrace` gem:

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in `ddtrace` gem versions >= 1.15.0</div>

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Installing the Ruby tracer

To install the Ruby tracer:

1. Add the `ddtrace` gem to your `Gemfile`:

{{< code-block lang="ruby" filename="Gemfile" >}}
source '<https://rubygems.org>'
gem 'ddtrace', "~> 1.0"
{{< /code-block >}}

2. Install the gem by running `bundle install`

See the [Ruby tracer installation docs][4] for more details.

## Instrumenting your tests

{{< tabs >}}
{{% tab "RSpec" %}}

The RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

```ruby
require 'rspec'
require 'datadog/ci'

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # Configures the tracer to ensure results delivery
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = 'my-ruby-app'

    # Enables the RSpec instrumentation
    c.ci.instrument :rspec
  end
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

The Minitest integration traces all executions of tests when using the `minitest` framework.

To activate your integration, add this to the `test_helper.rb` file:

```ruby
require 'minitest'
require 'datadog/ci'

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # Configures the tracer to ensure results delivery
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = 'my-ruby-app'

    c.ci.instrument :minitest
  end
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake test
```

{{% /tab %}}

{{% tab "Cucumber" %}}

The Cucumber integration traces executions of scenarios and steps when using the `cucumber` framework.

To activate your integration, add the following code to your application:

<!-- TODO: Explicitly setting `c.tracing.enabled` overrides any existing value, including the environment
variable `DD_TRACE_ENABLED`. This prevents production environments from being able to disable the tracer
using `DD_TRACE_ENABLED`.
This snippet should be adapted to work correctly with the production tracer configuration or
instruct clients to only include this code in a CI environment.
This affects all code snippets in this file.
-->
```ruby
require 'cucumber'
require 'datadog/ci'

# Only activates test instrumentation on CI
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # Configures the tracer to ensure results delivery
    c.ci.enabled = true

    # The name of the service or library under test
    c.service = 'my-ruby-app'

    # Enables the Cucumber instrumentation
    c.ci.instrument :cucumber
  end
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.
You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### Adding custom tags to tests

<div class="alert alert-info"><code>Datadog::CI</code> public API is available in <code>ddtrace</code> gem versions >= 1.17.0</div>

You can add custom tags to your tests by using the current active test:

```ruby
require 'datadog/ci'

# inside your test
Datadog::CI.active_test&.set_tag('test_owner', 'my_team')
# test continues normally
# ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][5] section of the Ruby custom instrumentation documentation.

### Adding custom metrics to tests

<div class="alert alert-info">The <code>Datadog::CI</code> public API is available in <code>ddtrace</code> gem versions >= 1.17.0</div>

Like tags, you can add custom metrics to your tests by using the current active test:

```ruby
require 'datadog/ci'

# inside your test
Datadog::CI.active_test&.set_metric('memory_allocations', 16)
# test continues normally
# ...
```

For more information on custom metrics, see the [Add Custom Metrics Guide][7].

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code by using a `Datadog.configure` block, or using environment variables:

`service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `$PROGRAM_NAME`<br/>
**Example**: `my-ruby-app`

`env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][9].

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

## Using additional instrumentation

It can be useful to have rich tracing information about your tests that includes time spent performing database operations or other external calls, as seen in the following flame graph:

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Test trace with Redis instrumented" >}}

To achieve this, configure additional instrumentation in your `configure` block:

```ruby
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    #  ... ci configs and instrumentation here ...
    c.tracing.instrument :redis
    c.tracing.instrument :pg
    # ... any other instrumentations supported by ddtrace gem ...
  end
end
```

Alternatively, you can enable automatic instrumentation in `test_helper/spec_helper`:

```ruby
require "ddtrace/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**Note**: In CI mode, these traces are submitted to CI Visibility, and they do **not** show up in Datadog APM.

For the full list of available instrumentation methods, see the [`ddtrace` documentation][8]

## WebMock

[WebMock][10]
is a popular Ruby library that stubs HTTP requests when running tests.
By default it fails when used together with datadog-ci as traces are being sent
to Datadog via HTTP calls.

In order to allow HTTP connections for Datadog backend you would need to configure
Webmock accordingly.

```ruby
# when using agentless mode (note to use the correct datadog site, e.g. datadoghq.com, datadoghq.eu, etc):
WebMock.disable_net_connect!(:allow => "citestcycle-intake.datadoghq.com")

# when using agent running locally:
WebMock.disable_net_connect!(:allow_localhost => true)

# or for more granular setting set your agent URL, for example:
WebMock.disable_net_connect!(:allow => "localhost:8126")
```

## Collecting Git metadata

{{% ci-git-metadata %}}

## Manual testing API

If you use RSpec, Minitest, or Cucumber, **do not use the manual testing API**, as CI Visibility automatically instruments them and sends the test results to Datadog. The manual testing API is **incompatible** with already supported testing frameworks.

Use the manual testing API only if you use an unsupported testing framework or have a different testing mechanism.
Full public API documentation is available on our [YARD site][11].

### Domain model

The API is based around four concepts: test session, test module, test suite, and test.

#### Test session

A test session represents a test command run.

To start a test session, call `Datadog::CI.start_test_session` and pass the Datadog service and tags (such as test framework
you are using).

When all your tests have finished, call `Datadog::CI::TestSession#finish`, which closes the session and sends the session
trace to the backend.

#### Test module

A test module represents a smaller unit of work within a session.
For supported test frameworks test module is always same as test session.
For your use case it could be a package in your componentized application.

To start a test module, call `Datadog::CI.start_test_module` and pass the name of the module.

When the module run has finished, call `Datadog::CI::TestModule#finish`.

#### Test Suite

A test suite comprises a set of tests that test similar functionality.
A single suite usually corresponds to a single file where tests are defined.

Create test suites by calling `Datadog::CI#start_test_suite` and passing the name of the test suite.

Call `Datadog::CI::TestSuite#finish` when all the related tests in the suite have finished their execution.

#### Test

A test represents a single test case that is executed as part of a test suite.
Usually it corresponds to a method that contains testing logic.

Create tests in a suite by calling `Datadog::CI#start_test` or `Datadog::CI.trace_test` and passing the name of the test and name of the
test suite (must be the same as name of the test suite started in previous step).

Call `datadog.trace.api.civisibility.DDTest#end` when a test has finished execution.

### Code example

The following code represents a simple usage of the API:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /tracing/trace_collection/dd_libraries/ruby/#installation
[5]: /tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[7]: /continuous_integration/guides/add_custom_metrics/?tab=ruby
[8]: /tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[9]: /getting_started/tagging/unified_service_tagging
[10]: https://github.com/bblimke/webmock
[11]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
