---
title: Ruby Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

## Supported CI providers

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

The Datadog Agent must be accessible by the environment you're using to run your tests on. Get one-step installation commands from the [Datadog app][1].

## Installing tracing

To install the Ruby tracer:

1. Add the `ddtrace` gem to your `Gemfile` using the specified branch:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```
2. Install the gem by running `bundle install`

See the [Ruby tracer installation docs][2] for more details.

### Configuring Cucumber instrumentation

Cucumber integration traces executions of scenarios and steps when using the `cucumber` framework.

To activate your integration:

```ruby
require 'cucumber'
require 'ddtrace'

# Configure default Cucumber integration
Datadog.configure do |c|
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
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `enabled` | Specifies whether Cucumber tests should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Specifies the service name used for `cucumber` instrumentation. | `'cucumber'` |
| `operation_name` | Specifies an operation name used for `cucumber` instrumentation. Useful if you want rename automatic trace metrics in the form `trace.#{operation_name}.errors`. | `'cucumber.test'` |


See also the [Ruby trace library documentation for Cucumber][3].


## Configuring RSpec instrumentation

RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

```ruby
require 'rspec'
require 'ddtrace'

# Configure default RSpec integration
Datadog.configure do |c|
  c.use :rspec, options
  c.tracer writer_options: { buffer_size: 5000, flush_interval: 0.5 }
end
```

If you have many fast unit tests, you will need to adjust flushing settings. Enable `health_metrics` to send a metric called `datadog.tracer.queue.dropped.traces`.

```ruby
Datadog.configure do |c|
  c.use :rspec, options
  c.diagnostics.health_metrics.enabled = true
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `enabled` | Specifies whether RSpec tests should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Specifies the service name used for `rspec` instrumentation. | `'rspec'` |
| `operation_name` | Specifies an operation name used for `rspec` instrumentation. Useful if you want rename automatic trace metrics in the form `trace.#{operation_name}.errors`. | `'rspec.example'` |

See also the [Ruby trace library documentation for RSpec][4].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /tracing/setup_overview/setup/ruby/#installation
[3]: /tracing/setup_overview/setup/ruby/#cucumber
[4]: /tracing/setup_overview/setup/ruby/#rspec
