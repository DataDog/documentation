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

Supported CI providers:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing tracing

To install the Ruby tracer:

1. Add the `ddtrace` gem (version 0.50.0 or above) to your `Gemfile`:


    {{< code-block lang="ruby" >}}
    source 'https://rubygems.org'
    gem 'ddtrace', ">=0.50.0"
    {{< /code-block >}}

2. Install the gem by running `bundle install`

See the [Ruby tracer installation docs][2] for more details.

## Instrumenting your tests
### Cucumber

The Cucumber integration traces executions of scenarios and steps when using the `cucumber` framework.

To activate your integration:

{{< code-block lang="ruby" >}}
require 'cucumber'
require 'datadog/ci'

# Configure default Cucumber integration
Datadog.configure do |c|
  c.ci_mode.enabled = true
  c.use :cucumber, options
end

# Attach tags from scenario to active span
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
{{< /code-block >}}

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `enabled` | Specifies whether Cucumber tests should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Specifies the service name used for `cucumber` instrumentation. | `'cucumber'` |
| `operation_name` | Specifies an operation name used for `cucumber` instrumentation. Useful if you want to rename automatic trace metrics in the form `trace.#{operation_name}.errors`. | `'cucumber.test'` |

See also the [Ruby trace library documentation for Cucumber][3].

### RSpec

The RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

{{< code-block lang="ruby" >}}
require 'rspec'
require 'datadog/ci'

# Configure default RSpec integration
Datadog.configure do |c|
  c.ci_mode.enabled = true
  c.use :rspec, options
end
{{< /code-block >}}

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `enabled` | Specifies whether RSpec tests should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Specifies the service name used for `rspec` instrumentation. | `'rspec'` |
| `operation_name` | Specifies an operation name used for `rspec` instrumentation. Useful if you want to rename automatic trace metrics in the form `trace.#{operation_name}.errors`. | `'rspec.example'` |

See also the [Ruby trace library documentation for RSpec][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/ruby/#installation
[3]: /tracing/setup_overview/setup/ruby/#cucumber
[4]: /tracing/setup_overview/setup/ruby/#rspec
