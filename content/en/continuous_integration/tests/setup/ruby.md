---
title: Ruby Tests
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/setup_tests/ruby
  - /continuous_integration/tests/ruby
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

<div class="alert alert-info">Ruby test instrumentation is in beta.
</div>

## Compatibility

Supported Ruby interpreters:

* Ruby >= 2.1
* JRuby >= 9.2

Supported test frameworks:

* RSpec >= 3.0.0
* Minitest >= 5.0.0
* Cucumber >= 3.0

## Configuring reporting method

To report test results to Datadog, you need to configure the `ddtrace` gem:

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in `ddtrace` gem versions >= 1.15.0</div>

{{% ci-agentless %}}

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

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the RSpec instrumentation
  c.ci.instrument :rspec
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

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  c.ci.instrument :minitest
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

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the Cucumber instrumentation
  c.ci.instrument :cucumber
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

You can add custom tags to your tests by using the current active span:

```ruby
require 'ddtrace'

# inside your test
Datadog::Tracing.active_span&.set_tag('test_owner', 'my_team')
# test continues normally
# ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][5] section of the Ruby custom instrumentation documentation.

### Adding custom metrics to tests

Like tags, you can add custom metrics to your tests by using the current active span:

```ruby
require 'ddtrace'

# inside your test
Datadog::Tracing.active_span&.set_metric('memory_allocations', 16)
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

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

## Collecting Git metadata

{{% ci-git-metadata %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /tracing/trace_collection/dd_libraries/ruby/#installation
[5]: /tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[7]: /continuous_integration/guides/add_custom_metrics/?tab=ruby
