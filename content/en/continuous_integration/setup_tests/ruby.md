---
title: Ruby Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Supported Ruby interpreters:
* Ruby >= 2.1
* JRuby >= 9.2

Supported test frameworks:
* Cucumber >= 3.0
* RSpec >= 3.0.0

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the Ruby tracer

To install the Ruby tracer:

1. Add the `ddtrace` gem to your `Gemfile`:

    {{< code-block lang="ruby" filename="Gemfile" >}}
source 'https://rubygems.org'
gem 'ddtrace', ">=0.51.0"
{{< /code-block >}}

2. Install the gem by running `bundle install`

See the [Ruby tracer installation docs][2] for more details.

## Instrumenting your tests

{{< tabs >}}
{{% tab "Cucumber" %}}

The Cucumber integration traces executions of scenarios and steps when using the `cucumber` framework.

To activate your integration, add the following code to your application:

```ruby
require 'cucumber'
require 'datadog/ci'

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracer.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci_mode.enabled = true

  # Name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the Cucumber instrumentation
  c.use :cucumber
end
```

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{% tab "RSpec" %}}

The RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

```ruby
require 'rspec'
require 'datadog/ci'

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracer.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci_mode.enabled = true

  # Name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the RSpec instrumentation
  c.use :rspec
end
```

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}
{{< /tabs >}}

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

All other [Datadog Tracer configuration][3] options can also be used.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/ruby/#installation
[3]: /tracing/setup_overview/setup/ruby/?tab=containers#configuration
