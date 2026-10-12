---
title: Ruby Feature Flags
description: Set up Datadog Feature Flags for Ruby applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/"
  tag: "Documentation"
  text: "Ruby Tracing"
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn about Application Performance Monitoring (APM)"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/feature_flags/guide/apm_trace_enrichment/"
  tag: "Guide"
  text: "Set Up APM Trace Enrichment for Feature Flags"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
---

## Overview

This page describes how to instrument your Ruby application with the Datadog Feature Flags SDK. The Ruby SDK integrates with [OpenFeature][3], an open standard for feature flag management, and receives flag updates through Remote Configuration in the Datadog Ruby tracer (`datadog` gem).

## Prerequisites

Before setting up the Ruby Feature Flags SDK, ensure you have:

- **Datadog Agent** version 7.55 or later with [Remote Configuration][1] enabled
- **Datadog [API key][4]** configured on the Agent
- **Datadog Ruby SDK** `datadog` version 2.24.0 or later
- **Ruby runtime** version 3.1 or later to use the full Datadog Feature Flags OpenFeature integration. The Ruby SDK does not support JRuby. For JRuby, see [Use the Java SDK on JRuby](#use-the-java-sdk-on-jruby).
- **OpenFeature Ruby SDK** `openfeature-sdk` version 0.5.1 or later for provider hooks, exposure logging, and flag evaluation metrics support
- **OpenTelemetry metrics gems** for [flag evaluation metrics][5]: `opentelemetry-metrics-sdk` version 0.8.0 or later, and `opentelemetry-exporter-otlp-metrics` version 0.4.0 or later
- **Service and environment configured** - Feature flags are targeted by service and environment
- **Supported operating system** - Production support is limited to [Linux operating systems][2]. macOS and Windows are not natively supported production targets, but Dockerized Linux environments running on those operating systems are. For local development on macOS, you can use a compatible prebuilt native artifact when one is available.

<div class="alert alert-info">The Datadog Ruby tracer supports older Ruby runtimes for APM. Applications on older Ruby versions, including Ruby 2.5, can continue to use Datadog APM, but cannot use Datadog Feature Flags through OpenFeature until they upgrade to Ruby 3.1 or later. The OpenFeature Ruby SDK versions that expose the provider hook surface required for complete Feature Flags telemetry require Ruby 3.1 or later.</div>

## Installing and initializing

Feature Flagging is provided by Application Performance Monitoring (APM). To integrate APM into your application with feature flagging support, install the required gems and configure Remote Configuration with OpenFeature support.

```shell
gem install datadog openfeature-sdk
```

To emit flag evaluation metrics, add the OpenTelemetry metrics gems to your application bundle:

```ruby
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
```

You can enable Feature Flags with environment variables:

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
```

<div class="alert alert-info">The <code>EXPERIMENTAL_</code> prefix is retained for backwards compatibility; the provider itself is stable.</div>

See <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Set Up Server-Side Flag Evaluation Metrics</a> to enable the experimental <code>feature_flag.evaluations</code> metric. See <a href="/feature_flags/concepts/flag_graphs/">Feature Flag Graphs</a> for more information on available graphing.

Or enable the provider in code:

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

INITIALIZATION_TIMEOUT = 30

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.remote.boot_timeout_seconds = INITIALIZATION_TIMEOUT
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider and wait for initialization
OpenFeature::SDK.configure do |config|
  config.set_provider_and_wait(
    Datadog::OpenFeature::Provider.new,
    timeout: INITIALIZATION_TIMEOUT
  )
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

Using `set_provider_and_wait` blocks your application from proceeding until the provider is fully initialized or the timeout is reached. This ensures flags are ready before your application starts handling requests. If you prefer non-blocking initialization, use `set_provider` instead. If you do, the client returns default values until Remote Configuration loads in the background.

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After creating the `OpenFeature` client, you can start reading flag values throughout your app. Flag evaluation uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a unique string _key_. Flags are evaluated using typed methods that return values matching the expected type. The SDK returns the default value if a flag doesn't exist or cannot be evaluated.

### Boolean flags

Use `fetch_boolean_value()` for flags that represent on/off or true/false conditions:

```ruby
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout-flow',
  default_value: false,
  evaluation_context: context
)

if enabled
  show_new_checkout
else
  show_legacy_checkout
end
```

### String flags

Use `fetch_string_value()` for flags that select between multiple variants or configuration strings:

```ruby
theme = client.fetch_string_value(
  flag_key: 'ui-theme',
  default_value: 'light',
  evaluation_context: context
)

case theme
when 'dark'
  set_dark_theme
when 'light'
  set_light_theme
else
  set_light_theme
end
```

### Number flags

For numeric flags, use `fetch_integer_value()` or `fetch_float_value()`. Ruby also provides `fetch_number_value()`, which returns the appropriate type based on the default value. These methods are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

```ruby
max_items = client.fetch_integer_value(
  flag_key: 'cart-max-items',
  default_value: 20,
  evaluation_context: context
)

discount_rate = client.fetch_float_value(
  flag_key: 'discount-rate',
  default_value: 0.0,
  evaluation_context: context
)

# Generic number method (type based on default)
batch_size = client.fetch_number_value(
  flag_key: 'batch-size',
  default_value: 100,  # Returns integer
  evaluation_context: context
)
```

### Object flags

For structured data, use `fetch_object_value()`. This method returns a hash. Object flags are useful for Remote Configuration scenarios where multiple properties need to be provided together.

```ruby
config = client.fetch_object_value(
  flag_key: 'feature-config',
  default_value: {
    'maxRetries' => 3,
    'timeout' => 30
  },
  evaluation_context: context
)

max_retries = config['maxRetries'] || 3
timeout = config['timeout'] || 30
```

### Flag evaluation details

When you need more than the flag value, use the `fetch_<type>_details` methods. These methods return both the evaluated value and metadata explaining the evaluation:

```ruby
details = client.fetch_boolean_details(
  flag_key: 'new-feature',
  default_value: false,
  evaluation_context: context
)

puts "Value: #{details.value}"
puts "Variant: #{details.variant}"
puts "Reason: #{details.reason}"
puts "Error Code: #{details.error_code}"
puts "Error Message: #{details.error_message}"
```

Flag details help you debug evaluation behavior and understand why a user received a given value.

## Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that don't require user-specific targeting:

```ruby
# Global feature flag - no context needed
maintenance_mode = client.fetch_boolean_value(
  flag_key: 'maintenance-mode',
  default_value: false
)

if maintenance_mode
  halt 503, { error: 'Service temporarily unavailable' }.to_json
end
```

## Testing

You can test against a dedicated Datadog test environment with the real `Datadog::OpenFeature::Provider`, or swap it for OpenFeature's `InMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `InMemoryProvider` ships with `openfeature-sdk`, so no additional gem is required.

The Ruby SDK's `InMemoryProvider` takes a plain hash of flag keys to values — variants and targeting rules are not supported. The OpenFeature provider is set on a process-global singleton, so tests that swap the provider must restore it in teardown to avoid leaking flag state across examples. An `around` hook handles setup, restoration, and exceptions cleanly in a single block.

```ruby
# spec/support/feature_flags.rb
require 'open_feature/sdk'
require 'open_feature/sdk/provider/in_memory_provider'

RSpec.configure do |config|
  config.around(:each, :feature_flags) do |example|
    original = OpenFeature::SDK::API.instance.provider
    OpenFeature::SDK.configure do |c|
      c.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(
        'new-checkout-flow' => true,
        'ui-theme' => 'dark',
        'discount-rate' => 0.15
      ))
    end
    example.run
  ensure
    OpenFeature::SDK.configure { |c| c.set_provider(original) } if original
  end
end

# spec/checkout_spec.rb
require 'spec_helper'

RSpec.describe Checkout, :feature_flags do
  let(:client) { OpenFeature::SDK.build_client }

  it 'returns the in-memory flag value' do
    expect(client.fetch_boolean_value(flag_key: 'new-checkout-flow', default_value: false)).to be true
  end

  it 'falls back to the default for unknown flags' do
    expect(client.fetch_boolean_value(flag_key: 'does-not-exist', default_value: false)).to be false
  end
end
```

To mutate flag state during a test, call `add_flag(flag_key:, value:)` on the provider instance. The same pattern applies to Minitest — replace the `around` hook with `setup`/`teardown` methods.

## Use the Java SDK on JRuby

The Ruby SDK does not support JRuby. On JRuby, the Ruby SDK writes a warning to the log and does not enable Feature Flags. Use the [Java SDK][6] instead. JRuby calls the Java SDK through its Java integration.

Use the versions in the [Java SDK compatibility requirements][7].

1. Get the `dd-openfeature` JAR file, the OpenFeature Java SDK JAR file, and their dependencies. For example, use Maven to copy them to a directory.
2. Load the JAR files in your application with `require`.
3. Start JRuby with `dd-java-agent`. Use the `-J` option to send the `-javaagent` option to the JVM.
4. Set the environment variables for your configuration source. See [Server SDK Configuration Sources][8].

```shell
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
# Use Agent Remote Configuration. Agentless delivery is the default.
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config

jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'datadog.trace.api.openfeature.Provider'

# Set the provider and wait for the first flag configuration
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

The JAR files alone do not enable flag delivery. The Datadog provider uses classes from `dd-java-agent`. If the JVM does not load `dd-java-agent`, the provider does not initialize. Flag evaluations then return the default values.

For provider events, error handling, and the evaluation methods, see the [Java SDK][6] page. JRuby uses the same classes and methods.

## Troubleshooting

### Feature flags always return default values

If feature flags unexpectedly always return default values, check the following:

- Verify that the application does not run on JRuby. The Ruby SDK does not support JRuby. See [Use the Java SDK on JRuby](#use-the-java-sdk-on-jruby).
- Verify Remote Configuration is enabled in your Datadog Agent configuration
- Ensure the service and environment are configured (either through `DD_SERVICE` and `DD_ENV` environment variables or `config.service` and `config.env` in Ruby)
- Check that `config.remote.enabled = true` and `config.open_feature.enabled = true` are set in your Ruby application's Datadog configuration
- Verify the `datadog` gem version includes OpenFeature support (2.24.0 or later)

### Remote Configuration connection issues

Check the Datadog Ruby tracer logs for Remote Configuration status:

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

Look for messages about:
- Remote Configuration worker starting
- Feature flags configuration being received
- OpenFeature component initialization

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /account_management/api-app-keys/#api-keys
[5]: /feature_flags/guide/server_flag_evaluation_metrics/
[6]: /feature_flags/server/java/
[7]: /feature_flags/server/java/#compatibility-requirements
[8]: /feature_flags/concepts/configuration_sources/
